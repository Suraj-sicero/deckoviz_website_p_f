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
  const systemPrompt = await assembleContext({ userId, intent, agentId, mode });

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
