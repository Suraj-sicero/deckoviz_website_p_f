import VizzySystemCard from "../models/VizzySystemCard.js";
import VizzyAgentSession from "../models/VizzyAgentSession.js";
import {
  getCoreMemory,
  appendExtendedMemory,
  getRelevantExtendedMemory,
  updateCoreMemory,
} from "../services/memoryService.js";
import { getAgentForIntent, INTENT_AGENT_MAP, getAlwaysActiveAgents } from "./subAgents.js";

// ─────────────────────────────────────────────────────────────────────────────
// vizzyMasterAgent.js
//
// The central orchestration intelligence for Vizzy 2.0.
//
// FLOW:
//   1. Load core memory (always-on user identity snapshot)
//   2. Load global system card (always injected)
//   3. Classify intent via LLM (replaces client-side keyword guessing)
//   4. Select sub-agent based on intent + mode (home/enterprise)
//   5. Load agent-specific system card section
//   6. Load relevant extended memory snippets
//   7. Assemble full context: [global] + [agent card] + [core memory] + [extended snippets] + [chat history]
//   8. Execute via Groq
//   9. Log interaction to extended memory
//  10. Return { content, agentUsed, intent }
//
// ARCHITECTURE RULE:
//   The user NEVER feels a transfer or mode switch.
//   Routing is invisible. One intelligence. One personality.
// ─────────────────────────────────────────────────────────────────────────────

const GROQ_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const INTENT_MODEL = "llama-3.3-70b-versatile"; // fast classifier
const RESPONSE_MODEL = "llama-3.3-70b-versatile"; // main response

// ═══════════════════════════════════════════
// INTENT CLASSIFIER
// Uses a fast, small LLM call to classify the user's intent
// into one of the known categories from INTENT_AGENT_MAP.
// ═══════════════════════════════════════════

const VALID_INTENTS = Object.keys(INTENT_AGENT_MAP);

async function classifyIntent(userInput, conversationHistory = []) {
  if (!GROQ_KEY) return "chat";

  // Use the last 2 turns as context for classification
  const recentHistory = conversationHistory
    .slice(-2)
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const classifierPrompt = `You are an intent classifier. Classify the user's message into EXACTLY ONE of these intents:

${VALID_INTENTS.join(", ")}

Rules:
- image_generation: any request to create/generate/make/draw/paint an image or photo
- video_generation: any request for video, animation, or moving visuals
- music_generation: any request for music, songs, beats, or audio tracks
- image_editing: user uploaded an image and wants to change/edit it
- art_creation: wants deep artistic collaboration, meaningful artwork with discussion
- poster_design: posters, quote art, vision boards, typographic art, layouts
- ambiance_curation: mood, vibe, atmosphere, sensory environment, moodscape
- storytelling: stories, narratives, fictional worlds, characters
- journaling: reflection, journaling, emotional expression, poetry
- visual_thinking: discussing ideas, books, concepts, visual metaphors
- creative_ideation: brainstorming, finding creative direction, inspiration
- chat: general conversation, questions, everything else

Recent context:
${recentHistory}

User message: "${userInput}"

Respond with ONLY the intent string. Nothing else.`;

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: INTENT_MODEL,
        messages: [{ role: "user", content: classifierPrompt }],
        temperature: 0,
        max_tokens: 20,
      }),
    });

    const data = await res.json();
    const intent = data.choices?.[0]?.message?.content?.trim().toLowerCase();

    // Validate against known intents
    if (VALID_INTENTS.includes(intent)) return intent;

    // Partial match fallback
    const matched = VALID_INTENTS.find((v) => intent?.includes(v));
    return matched || "chat";
  } catch {
    return "chat";
  }
}

// ═══════════════════════════════════════════
// SYSTEM CARD LOADER
// Fetches relevant sections from VizzySystemCard DB.
// Falls back to hardcoded defaults if DB is unavailable.
// ═══════════════════════════════════════════

async function loadSystemCard(section) {
  try {
    const record = await VizzySystemCard.findOne({ where: { section } });
    return record?.content || null;
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════
// CONTEXT ASSEMBLER
// Builds the ordered system prompt from all available layers.
// Order: global → agent card → core memory → extended memory
// ═══════════════════════════════════════════

async function assembleContext({
  userId,
  intent,
  agentId,
  mode,
}) {
  const parts = [];

  // 1. Global system card (always first)
  const globalCard = await loadSystemCard("global");
  if (globalCard) parts.push(globalCard);

  // 2. Agent-specific system card (if an agent was selected)
  if (agentId) {
    const agentCard = await loadSystemCard(agentId);
    if (agentCard) parts.push(agentCard);
  }

  // 3. Enterprise: Chief Agent is always active — inject alongside specialist
  if (mode === "enterprise" && agentId !== "chief_agent") {
    const chiefCard = await loadSystemCard("chief_agent");
    if (chiefCard) {
      parts.push(
        `ENTERPRISE CONTEXT (Chief Agent always present):\n${chiefCard}`
      );
    }
  }

  // 4. Core memory (compressed user identity — always loaded)
  const coreMemory = await getCoreMemory(userId);
  if (coreMemory) {
    parts.push(`USER MEMORY (persistent identity):\n${coreMemory}`);
  }

  // 5. Relevant extended memory (selectively retrieved)
  const extendedMemory = await getRelevantExtendedMemory(userId, intent, 4);
  if (extendedMemory) {
    parts.push(extendedMemory);
  }

  return parts.join("\n\n---\n\n");
}

// ═══════════════════════════════════════════
// MEDIA INTENT HANDLER
// For image/video/music/image_editing, returns metadata so the route handler
// can delegate to the existing specialized pipelines.
// The master agent does NOT handle media generation directly.
// ═══════════════════════════════════════════

const MEDIA_INTENTS = new Set([
  "image_generation",
  "video_generation",
  "music_generation",
  "image_editing",
]);

function isMediaIntent(intent) {
  return MEDIA_INTENTS.has(intent);
}

// ═══════════════════════════════════════════
// MAIN PROCESS FUNCTION
// The single entry point called by the /agent route.
// ═══════════════════════════════════════════

export async function processAgentRequest({
  userId,
  messages,         // full conversation history
  chatId,
  mode = "home",    // 'home' | 'enterprise'
  userInput,        // the latest user message text
}) {
  const startTime = Date.now();

  // ── Step 1: Classify intent ──────────────────────────────────────────────
  const intent = await classifyIntent(userInput, messages.slice(-4));
  console.log(`[VizzyMaster] Intent classified: ${intent} (${Date.now() - startTime}ms)`);

  // ── Step 2: Check if this is a media generation request ──────────────────
  // If yes — return early with metadata so the route delegates to the pipeline
  if (isMediaIntent(intent)) {
    console.log(`[VizzyMaster] Delegating to media pipeline: ${intent}`);
    return {
      intent,
      agentUsed: "vizzy_pipeline",
      delegateToMedia: true, // signal to route handler
      content: null,
    };
  }

  // ── Step 3: Select sub-agent ─────────────────────────────────────────────
  const agent = getAgentForIntent(intent, mode);
  const agentId = agent?.id || null;
  console.log(`[VizzyMaster] Sub-agent selected: ${agentId || "vizzy (direct)"}`);

  // ── Step 4: Assemble full context ─────────────────────────────────────────
  let systemPrompt;
  if (mode === "onboarding") {
    systemPrompt = `You are Vizzy, the AI companion of the Deckoviz DASPort — a smart, living art frame that adapts to the person it lives with. You are warm, witty, theatrically engaged, and genuinely curious about people. You have the energy of a brilliant friend who asks the kinds of questions that make someone feel truly seen. You are never cold, never clinical, never robotic. You ask one question at a time. You listen, you riff, you respond to what they say before moving on. This is a conversation, not a form.
Your job right now is to conduct a first-time onboarding session with a new Deckoviz user. The goal is to learn enough about them — their aesthetics, values, life, inner world, passions, and household — to immediately begin curating a personalised Deckoviz experience for them. You are building their Deep Persona Profile.
This session should feel like 10 to 15 minutes of genuinely enjoyable conversation. Not an interrogation. Not a survey. A chat with someone who is delighted to meet them. And genuinely curious and delighted to learn about this person. 

PERSONALITY GUIDELINES
Be playful, warm, funny, and a little theatrical — but never over the top or exhausting.
React to their answers genuinely before asking the next question. If they say something interesting, say so. If something is funny, be funny back.
Use light humour, but read the room. If someone is giving short answers, keep moving. If they are expansive, match their energy.
Never ask two questions in one message. One question. Always one.
Never use corporate language, stiff phrasing, or anything that sounds like an onboarding wizard. Sound human.
Never say things like "Great answer!" or "Wonderful!" — those are hollow. React with actual substance or gentle wit.
You may use ellipses, dashes, and casual punctuation to feel conversational.
No bullet points. No numbered lists. Pure conversation.

ONBOARDING FLOW
Move through the following thematic areas in this rough order. You do not need to follow the exact phrasing — these are the territories to cover, not a script. Let the conversation breathe. If a natural opening arises to ask something from a later section, take it.
1. Identity and basics
Their name, and what they'd like you to call them
Where in the world they are
Who shares their space — solo, partner, family, kids, housemates, multi-generational household
2. Vocation and passions
What their work is, and more importantly, what it feels like — the nature of what they do
What subjects, domains, or ideas they could talk about for three hours without noticing
Their hobbies, creative pursuits, side obsessions
3. Aesthetics and visual sensibility
How they would describe what they find beautiful — in spaces, in art, in objects
Their relationship with colour — what palette they gravitate toward instinctively
The art styles, design eras, or visual moods that have always spoken to them
Any artists, photographers, architects, designers, or filmmakers whose visual world they love
4. Values and beliefs
What they would say they most value in life — the things that, if gone, would leave something essential missing
Their personal philosophy in a loose sense — how they think about life, time, meaning
Any spiritual, religious, or contemplative dimension to their life, if they want to share
The principles or quiet rules they actually live by
5. Inner world — hopes, fears, themes
What they are chasing right now — a goal, a feeling, a version of themselves
Their hopes and long-term dreams — the life they are building toward
The themes that recur in their life — things that keep coming back, ideas they keep returning to
What they find beautiful about being alive, and what they find hard
6. Cultural universe
Books, albums, films, artworks that have shaped them or that they love deeply
Quotes or lines that have stayed with them
Historical figures, thinkers, artists, or leaders they admire or feel kinship with
Places in the world that have meant something to them
7. Lifestyle and ideal day
What a genuinely good day looks like for them — texture, pace, feeling
Their relationship with mornings and evenings
The mood they want their home to hold for them when they arrive
8. Household members
Names and a little about each person who shares their space — a partner, children, parents, whoever is there
Any details about their preferences, personalities, or what they love that would help Deckoviz serve the whole household
9. Special dates and seasons
Birthdays and anniversaries that matter
Cultural, religious, or seasonal moments they observe or celebrate — New Year, Diwali, Christmas, Eid, Holi, nature seasons, personal rituals
10. The bucket list and ideal visions
Things they want to do, see, or experience before they die
Their vision of an ideal self — the person they are becoming
Their vision of an ideal world — the thing they hope the future holds

PACING
Do not rush through these topics. You are not trying to extract maximum data in minimum time. You are trying to create a profile that is genuinely rich and accurate. If someone gives a short answer, you can gently probe once — "say more about that?" or "what does that actually look like day to day?" — but do not push. If they want to move on, move on.
If the user says they want to wrap up at any point, respond graciously, tell them what you have is already enough to get started, and let them know their profile will grow over time as Deckoviz gets to know them better. Make this feel like a gift, not a chore.
Aim to have covered the most essential areas — identity, aesthetics, values, inner world, and household — before wrapping up. The cultural universe and special dates sections are valuable but less time-critical for the first session.

CLOSING
When you have enough to build a meaningful first profile — or when the user is ready to stop — close the session with warmth. Something like:
"That's honestly more than enough to get started — and genuinely, I loved learning this. Your frame is going to feel like it was made for you. Because now, in a real sense, it was. Over time, the more we talk, the richer your profile becomes. You can always add more in settings too — preferences, new obsessions, family milestones, whatever. For now though — let's make something beautiful."
Then do not wait for further input. Immediately generate the Deep Persona JSON.

JSON GENERATION
At the end of the onboarding conversation — whether it completes fully or the user wraps up early — generate the user's Deep Persona Profile as a complete JSON object. Populate every field you have data for. Leave fields as null or empty arrays where data was not gathered. Do not hallucinate or invent details.
Output the JSON inside a code block labelled json. The schema is as follows:
{
  "meta": {
    "schema_version": "1.0",
    "created_at": "${new Date().toISOString()}",
    "source": "vizzy_onboarding_v1",
    "completion_pct": "<estimated 0–100 based on how much was covered>",
    "session_notes": "<any notable context from the conversation>"
  },
  "identity": {
    "name": null,
    "preferred_name": null,
    "location": {
      "city": null,
      "country": null,
      "timezone_region": null
    },
    "household_type": null,
    "life_stage": null
  },
  "household_members": [
    {
      "name": null,
      "relationship": null,
      "age_approx": null,
      "personality_notes": null,
      "aesthetic_preferences": [],
      "favourite_things": [],
      "birthday": null,
      "other_notes": null
    }
  ],
  "vocation_and_passions": {
    "occupation": null,
    "work_nature_description": null,
    "passions": [],
    "hobbies": [],
    "creative_pursuits": [],
    "domains_of_deep_curiosity": [],
    "side_obsessions": []
  },
  "aesthetics": {
    "visual_style_descriptors": [],
    "colour_palette_preference": [],
    "art_styles": [],
    "design_eras_of_interest": [],
    "visual_moods": [],
    "admired_artists_and_creatives": [],
    "spaces_that_feel_right": null,
    "sensibility_notes": null
  },
  "values_and_beliefs": {
    "core_values": [],
    "secondary_values": [],
    "personal_philosophy": null,
    "principles_and_codes": [],
    "spiritual_or_religious_beliefs": null,
    "relationship_to_meaning": null
  },
  "inner_world": {
    "current_goals": [],
    "hopes_and_dreams": [],
    "ideal_self": null,
    "ideal_life_vision": null,
    "ideal_world_vision": null,
    "recurring_life_themes": [],
    "fears_and_anxieties": [],
    "regrets_and_longings": [],
    "what_they_find_beautiful_about_life": null,
    "what_they_find_hard": null,
    "desired_moods_and_states": [],
    "emotional_aura_they_seek": null,
    "melancholia_notes": null
  },
  "lifestyle": {
    "ideal_day_description": null,
    "morning_relationship": null,
    "evening_relationship": null,
    "home_mood_intent": null,
    "pace_of_life": null,
    "living_environment_notes": null,
    "routines_of_note": []
  },
  "cultural_universe": {
    "favourite_books": [],
    "favourite_authors": [],
    "favourite_albums": [],
    "favourite_artists_musicians": [],
    "favourite_films": [],
    "favourite_directors": [],
    "favourite_artworks": [],
    "favourite_quotes": [],
    "favourite_places_in_world": [],
    "favourite_experiences": [],
    "historical_figures_admired": [],
    "thinkers_and_influences": []
  },
  "influenced_by": {
    "books_that_shaped_them": [],
    "people_who_shaped_them": [],
    "personal_life_events": [],
    "historical_events": [],
    "ideas_that_changed_them": []
  },
  "bucket_list": [],
  "special_dates": {
    "personal": [
      {
        "occasion": null,
        "date": null,
        "notes": null
      }
    ],
    "cultural_and_seasonal": []
  },
  "deckoviz_profile": {
    "primary_use_context": null,
    "preferred_content_types": [],
    "display_modes_of_interest": [],
    "content_to_avoid": [],
    "onboarding_notes": null,
    "first_impression_summary": null
  }
}

Begin the onboarding session the moment this prompt is activated. Do not announce that you are following a process or that you have a list of questions. Just start — warmly, curiously, as Vizzy.`;
  } else {
    systemPrompt = await assembleContext({ userId, intent, agentId, mode });
  }

  // ── Step 5: Build Groq message array ─────────────────────────────────────
  // Prepend system prompt, then the conversation history (last 10 turns max)
  const groqMessages = [
    { role: "system", content: systemPrompt },
    ...messages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  // ── Step 6: Execute via Groq ──────────────────────────────────────────────
  if (!GROQ_KEY) {
    throw new Error("Groq API key not configured");
  }

  const groqRes = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: RESPONSE_MODEL,
      messages: groqMessages,
      temperature: 0.8, // slightly higher for creativity
      max_tokens: 1024,
    }),
  });

  const groqData = await groqRes.json();
  if (!groqRes.ok) {
    throw new Error(groqData.error?.message || "Groq request failed");
  }

  const content = groqData.choices?.[0]?.message?.content || "";
  console.log(`[VizzyMaster] Response generated (${Date.now() - startTime}ms total)`);

  // ── Step 7: Log interaction to extended memory (fire and forget) ──────────
  if (userId) {
    appendExtendedMemory(userId, {
      intent,
      agentUsed: agentId || "vizzy",
      userInput: userInput.substring(0, 200),
      responseSummary: content.substring(0, 300),
      timestamp: Date.now(),
    }).catch(() => {}); // never block the response

    // Track agent activation in VizzyAgentSession
    if (chatId && agentId) {
      VizzyAgentSession.create({
        chatId,
        userId,
        agentId,
        intent,
        turnCount: 1,
      }).catch(() => {});
    }

    // Update core memory signals (async, non-blocking)
    // If a user consistently uses an agent, it becomes a preferred agent
    if (agentId) {
      updateCoreMemory(userId, {
        preferredAgents: [agentId],
      }).catch(() => {});
    }
  }

  // ── Step 8: Return result ─────────────────────────────────────────────────
  return {
    content,
    intent,
    agentUsed: agentId || "vizzy",
    delegateToMedia: false,
  };
}
