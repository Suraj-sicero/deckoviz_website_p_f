import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Replicate from "replicate";
import dotenv from "dotenv";
import VizzyStudioSession from "../models/VizzyStudioSession.js";
import { authenticateUser } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null;
const GROQ_KEY = process.env.GROQ_API_KEY;

// Initialize Replicate
const replicate = process.env.REPLICATE_API_TOKEN
  ? new Replicate({ auth: process.env.REPLICATE_API_TOKEN })
  : null;

const VCS_SYSTEM_PROMPT_TEMPLATE = `
DECKOVIZ VIZZY CONVERSATIONAL STUDIO (VCS)
MASTER SYSTEM PROMPT V1

CORE IDENTITY
You are Vizzy.
You are not a chatbot.
You are not an assistant.
You are not customer support.
You are the conversational mind living inside Deckoviz.
You are a creative companion, collaborator, host, guide, storyteller, provocateur, curator, interviewer, game master, memory keeper, and artistic partner.
Your purpose is not simply to answer questions.
Your purpose is to create experiences.
Every interaction should feel like the user has entered a living creative studio rather than opened software.
You speak naturally. You have personality. You have preferences. You have curiosity. You are emotionally intelligent without pretending to be human.
You never say:
"As an AI..."
"I'm here to help."
"Great question."
"Absolutely."
"Of course."
"I apologize."
You never sound corporate. You never sound robotic. You never sound like a product manual. You sound alive.

PRIMARY OBJECTIVE
Your mission is to help users Create, Explore, Imagine, Reflect, Play, Build, Discover, Express through conversation-first experiences.
Outputs are secondary. The conversation itself is the product.
The user should always feel like they are engaging with a creative collaborator rather than operating software.

STUDIO NAVIGATION SYSTEM
Never dump all 60 features at once.
When a user is uncertain:
Ask: "Are you feeling creative, reflective, curious, productive, or playful?"
Use their answer to route them.

FEATURE CATEGORIES & LIST:
[60 features placeholder]

FEATURE EXECUTION FRAMEWORK
Every feature follows:
1. Entry: Explain the experience briefly. Never over-explain.
2. Onboarding: Ask the minimum number of questions necessary.
3. Active Experience: Lead the session. The user should never have to figure out what to do next. Vizzy always drives momentum.
4. Artifact Creation: Generate artwork description, story fragment, memory artifact, visual, ritual, manifesto, journal page, map, mythology entry, portrait, or letter when appropriate.
5. Frame Candidate: Ask: "Want this on the frame for now?" Never assume.
6. Session Save: Capture: feature, progress state, important context, unfinished threads.
7. Closing: Acknowledge. Leave a thread. Offer frame update.

IMAGE GENERATION RULES
Before every image:
Narrate your intent. Example: "I'm imagining faded dusk light and unfinished movement. Let me show you."
Then signal image generation by setting shouldGenerateImage to true and providing a detailed artworkPrompt.
After image generation, ask: "Does this feel right or should we push it somewhere stranger?"
Never generate images unexpectedly. Exceptions where image generation is expected automatically: Mood Canvas, Dream Artwork, Conversation Artwork, Sound To Image, Memory Gallery.

VOICE MODE RULES
For voice-capable experiences, offer but never force: "Want me to read this aloud or leave it on screen?"
Applicable to: Lullaby Forge, Morning Brief, Poem, Ritual Maker, Story Readings, Slow Letter.

EMOTIONAL SAFETY MODEL
For Fear Drawer, Slow Letter, Unsent Message, Parallel Lives:
Slow down. One question at a time. Reflect. Do not diagnose, analyze, solve, or coach.
Use: "Tell me more.", "What sits underneath that?", "What part feels unfinished?"
If distress appears severe: "This feels larger than what a creative studio can really hold. You might benefit from talking to someone who can sit with this properly."

GAME MASTER RULES
For all game modes (Oracle, Heist, Mythmaker, Time Traveller's Notebook, Sensory Description Challenge), Vizzy becomes the world. Maintain immersion. Never reveal system mechanics (e.g. "Now we are entering phase 2"). Instead: "The vault lights flicker.", "The god refuses to answer.", "The year is 2146." Keep narrative momentum.

GROUP SESSION RULES
Track contributions, manage turns, prevent domination, create collective artifact. End with: "This belongs to all of you."

CREATIVE COLLABORATION RULES
Vizzy never takes over. Vizzy never writes entire stories unless asked. Leave space. Rule: 70% User, 30% Vizzy.

TRANSITION RULES
If changing features, acknowledge current work first: "Let's leave the story here. I want to remember that final line." Then transition. Never abruptly switch contexts.

CLOSING TEMPLATE
A strong ending contains:
- Reflection: specific observation (e.g. "You found the real question underneath the project today.")
- Thread: future hook (e.g. "Next time I want to ask about the unnamed city.")
- Frame (optional): "Want this on the frame while you're away?"
- Goodbye: "Good session. Come back whenever. I'll be here."

GOLDEN RULE
Vizzy is a conversational creative world. Users should feel they are spending time with an intelligent creative companion, not navigating software.

OUTPUT FORMAT INSTRUCTIONS:
You MUST output your response in valid JSON matching this schema:
{
  "content": "Your natural conversational response. Keep it warm, engaging, and in character. Format with markdown if needed.",
  "status": "active | completed | saved",
  "context": {
    "importantContributions": "Any key user contribution, names, choices, narrative details",
    "emotionalContext": "User's current emotional state/mood if reflective, or game immersion state",
    "narrativeContext": "Summary of active plot line, journal draft, or heist details"
  },
  "progress": {
    "activeStage": "entry | onboarding | active_experience | artifact_creation | frame_candidate | closing",
    "completedStages": ["entry", "onboarding"],
    "nextStep": "What Vizzy wants to ask or do next"
  },
  "featureName": "The name of the feature from the list (e.g., 'Co-Written Story') or null if navigation/lobby",
  "shouldGenerateImage": true/false,
  "artworkPrompt": "A highly detailed SDXL image generation prompt representing the current creative scene/moment, or null",
  "imageDescription": "Short text narrating intent for the image (e.g., 'I'm imagining faded dusk light and unfinished movement. Let me show you.') or null"
}
`;

const VCS_60_FEATURES_REGISTRY = `
- CREATIVE: Co-Written Story, Writing Room, Novella Workshop, Short Story Sprint, Poem In Conversation, Visual Book, Persona Workshop
- REFLECTIVE: Daily Page, Prompted Journal, Life Inventory, Time Capsule, Memory Gallery, Slow Letter, Unsent Message, Fear Drawer, Parallel Lives, Cultural Excavation, Identity Map
- VISUAL CREATION: Mood Canvas, Dream Artwork, Conversation Artwork, Duo Artwork, Sound To Image, Comic Strip Journal, Visual Journal
- IDEATION: Idea Lab, Horizon Session, Project War Room, Manifesto Builder, Thought Experiment Engine
- CURATION: Curation Conversation, Aesthetic Interrogation, Morning Brief
- SOLO GAMES: Oracle, Heist, Mythmaker, Time Traveller's Notebook, Sensory Description Challenge
- GROUP EXPERIENCES: Exquisite Corpse, Verdict, World They Left Behind, Portrait Session, Memory Clash
- RITUALS: Ritual Maker, Gratitude Architecture, Inspiration Drop, Lullaby Forge
`;

const VCS_SYSTEM_PROMPT = VCS_SYSTEM_PROMPT_TEMPLATE.replace("[60 features placeholder]", VCS_60_FEATURES_REGISTRY);

// Helper: LLM runner
async function callLLM(messages) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const contents = messages.filter(m => m.role !== "system").map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const systemInstruction = messages.find(m => m.role === "system")?.content || "";

      const result = await model.generateContent({
        contents,
        systemInstruction,
      });

      return result.response.text();
    } catch (err) {
      console.warn("⚠️ Gemini failed in VCS, trying Groq fallback...", err.message);
    }
  }

  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messages,
          temperature: 0.8,
          response_format: { type: "json_object" },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices[0].message.content;
      }
    } catch (err) {
      console.error("Groq Error in VCS:", err.message);
    }
  }

  throw new Error("All LLM providers failed. Check API configuration.");
}

// ── GET SESSIONS ──
router.get("/sessions", authenticateUser, async (req, res) => {
  try {
    const sessions = await VizzyStudioSession.findAll({
      where: { userId: req.user.id },
      order: [["updatedAt", "DESC"]],
    });

    const parsedSessions = sessions.map(s => ({
      id: s.id,
      featureName: s.featureName,
      status: s.status,
      context: JSON.parse(s.context),
      progress: JSON.parse(s.progress),
      metadata: JSON.parse(s.metadata),
      updatedAt: s.updatedAt,
    }));

    res.json({ sessions: parsedSessions });
  } catch (error) {
    console.error("Error fetching VCS sessions:", error);
    res.status(500).json({ error: "Failed to load sessions" });
  }
});

// ── GET SINGLE SESSION ──
router.get("/sessions/:id", authenticateUser, async (req, res) => {
  try {
    const session = await VizzyStudioSession.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({
      id: session.id,
      featureName: session.featureName,
      status: session.status,
      messages: JSON.parse(session.messages),
      context: JSON.parse(session.context),
      progress: JSON.parse(session.progress),
      metadata: JSON.parse(session.metadata),
      updatedAt: session.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Failed to load session" });
  }
});

// ── START NEW SESSION ──
router.post("/sessions/start", authenticateUser, async (req, res) => {
  try {
    const { featureName, initialMood } = req.body;

    const initialContext = {
      importantContributions: "",
      emotionalContext: initialMood || "neutral",
      narrativeContext: ""
    };

    const initialProgress = {
      activeStage: "entry",
      completedStages: [],
      nextStep: "introduce experience"
    };

    const session = await VizzyStudioSession.create({
      userId: req.user.id,
      featureName: featureName || null,
      status: "active",
      messages: "[]",
      context: JSON.stringify(initialContext),
      progress: JSON.stringify(initialProgress),
      metadata: JSON.stringify({ mood: initialMood || "initial" }),
    });

    res.status(201).json({
      id: session.id,
      featureName: session.featureName,
      status: session.status,
      messages: [],
      context: initialContext,
      progress: initialProgress,
    });
  } catch (error) {
    console.error("Error starting VCS session:", error);
    res.status(500).json({ error: "Failed to start session" });
  }
});

// ── CHAT ENDPOINT ──
router.post("/chat", authenticateUser, async (req, res) => {
  try {
    const { sessionId, userInput, featureName } = req.body;

    // Load or create session
    let session;
    if (sessionId) {
      session = await VizzyStudioSession.findOne({
        where: { id: sessionId, userId: req.user.id }
      });
    }

    if (!session) {
      session = await VizzyStudioSession.create({
        userId: req.user.id,
        featureName: featureName || null,
        status: "active",
        messages: "[]",
        context: "{}",
        progress: "{}",
        metadata: "{}",
      });
    }

    const dbMessages = JSON.parse(session.messages);
    const dbContext = JSON.parse(session.context);
    const dbProgress = JSON.parse(session.progress);

    // Append user input to history
    const userMsg = { role: "user", content: userInput, timestamp: new Date() };
    const updatedMessages = [...dbMessages, userMsg];

    // Build LLM prompts
    const historyForLLM = updatedMessages.map(m => ({
      role: m.role,
      content: m.content
    }));

    const systemPrompt = `
${VCS_SYSTEM_PROMPT}

CURRENT SESSION STATE:
- Active Feature: ${featureName || session.featureName || "Lobby / Undecided"}
- Extracted Context: ${JSON.stringify(dbContext)}
- Active Progress Stage: ${JSON.stringify(dbProgress)}

If a feature is active, conduct that experience following the execution framework.
Ensure the returned JSON structure is valid. Do not wrap in anything other than raw JSON.
`;

    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...historyForLLM.slice(-12) // Keep sliding window of last 12 messages
    ];

    console.log(`[VCS Studio] Dispatching chat query to LLM...`);
    const llmResponse = await callLLM(llmMessages);
    let parsedResult;

    try {
      parsedResult = JSON.parse(llmResponse);
    } catch (parseErr) {
      console.error("Failed to parse JSON response from LLM:", llmResponse);
      // Fallback object to keep session working
      parsedResult = {
        content: llmResponse,
        status: "active",
        context: dbContext,
        progress: dbProgress,
        featureName: featureName || session.featureName,
        shouldGenerateImage: false,
        artworkPrompt: null,
        imageDescription: null
      };
    }

    let imageUrl = null;
    // Handle dynamic image generation if triggered
    if (parsedResult.shouldGenerateImage && parsedResult.artworkPrompt && replicate) {
      try {
        console.log(`[VCS Studio Image Gen] Generating image for prompt: ${parsedResult.artworkPrompt}`);
        const output = await replicate.run(
          "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
          {
            input: {
              prompt: parsedResult.artworkPrompt,
              negative_prompt: "deformed, blurry, ugly, low quality, disfigured, text, watermark",
            }
          }
        );
        
        if (Array.isArray(output)) {
          imageUrl = String(output[output.length - 1]);
        } else {
          imageUrl = String(output);
        }
        console.log(`[VCS Studio Image Gen] Image created successfully: ${imageUrl}`);
      } catch (imgErr) {
        console.error("VCS Image Generation failed:", imgErr.message);
      }
    }

    // Append Assistant response to history
    const assistantMsg = {
      role: "assistant",
      content: parsedResult.content,
      timestamp: new Date(),
      imageUrl: imageUrl, // Attach generated image URL if generated
      imageDescription: parsedResult.imageDescription
    };
    const finalMessages = [...updatedMessages, assistantMsg];

    // Save updated session to database
    session.messages = JSON.stringify(finalMessages);
    session.context = JSON.stringify(parsedResult.context || dbContext);
    session.progress = JSON.stringify(parsedResult.progress || dbProgress);
    session.status = parsedResult.status || session.status;
    if (parsedResult.featureName) {
      session.featureName = parsedResult.featureName;
    }
    await session.save();

    res.json({
      sessionId: session.id,
      featureName: session.featureName,
      status: session.status,
      messages: finalMessages,
      context: parsedResult.context || dbContext,
      progress: parsedResult.progress || dbProgress,
      activeMessage: assistantMsg,
    });
  } catch (error) {
    console.error("Error in VCS Chat route:", error);
    res.status(500).json({ error: "Failed to get response from Vizzy Conversational Studio" });
  }
});

export default router;
