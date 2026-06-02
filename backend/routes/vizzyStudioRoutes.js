import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Replicate from "replicate";
import dotenv from "dotenv";
import VizzyStudioSession from "../models/VizzyStudioSession.js";
import FilmProject from "../models/FilmProject.js";
import { renderVideo } from "../services/VideoRenderService.js";
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

// ── GET FILM PROJECTS ──
router.get("/films", authenticateUser, async (req, res) => {
  try {
    const projects = await FilmProject.findAll({
      where: { userId: req.user.id },
      order: [["updatedAt", "DESC"]],
    });

    const parsedProjects = projects.map(p => ({
      id: p.id,
      title: p.title,
      styleReferenceImage: p.styleReferenceImage,
      scenes: JSON.parse(p.scenes || "[]"),
      transitionDuration: p.transitionDuration,
      narrationFile: p.narrationFile,
      musicFile: p.musicFile,
      narrationVolume: p.narrationVolume,
      musicVolume: p.musicVolume,
      status: p.status,
      outputVideo: p.outputVideo,
      updatedAt: p.updatedAt,
    }));

    res.json({ projects: parsedProjects });
  } catch (error) {
    console.error("Error fetching Film Projects:", error);
    res.status(500).json({ error: "Failed to load film projects" });
  }
});

// ── GET SINGLE FILM PROJECT ──
router.get("/films/:id", authenticateUser, async (req, res) => {
  try {
    const project = await FilmProject.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({ error: "Film Project not found" });
    }

    res.json({
      id: project.id,
      title: project.title,
      styleReferenceImage: project.styleReferenceImage,
      scenes: JSON.parse(project.scenes || "[]"),
      transitionDuration: project.transitionDuration,
      narrationFile: project.narrationFile,
      musicFile: project.musicFile,
      narrationVolume: project.narrationVolume,
      musicVolume: project.musicVolume,
      status: project.status,
      outputVideo: project.outputVideo,
      updatedAt: project.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to load project" });
  }
});

// ── START NEW FILM PROJECT ──
router.post("/films/start", authenticateUser, async (req, res) => {
  try {
    const { title, styleReferenceImage, styleTemplate } = req.body;

    const project = await FilmProject.create({
      userId: req.user.id,
      title: title || "Untitled Film",
      styleReferenceImage: styleReferenceImage || null,
      scenes: "[]",
      transitionDuration: 5,
      narrationVolume: 100,
      musicVolume: 100,
      status: "draft",
    });

    res.status(201).json({
      id: project.id,
      title: project.title,
      styleReferenceImage: project.styleReferenceImage,
      scenes: [],
      transitionDuration: project.transitionDuration,
      status: project.status,
    });
  } catch (error) {
    console.error("Error starting Film Project:", error);
    res.status(500).json({ error: "Failed to start project" });
  }
});

// ── UPDATE FILM PROJECT ──
router.put("/films/:id", authenticateUser, async (req, res) => {
  try {
    const {
      title,
      styleReferenceImage,
      scenes,
      transitionDuration,
      narrationFile,
      musicFile,
      narrationVolume,
      musicVolume,
      status,
      outputVideo
    } = req.body;

    const project = await FilmProject.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({ error: "Film Project not found" });
    }

    if (title !== undefined) project.title = title;
    if (styleReferenceImage !== undefined) project.styleReferenceImage = styleReferenceImage;
    if (scenes !== undefined) project.scenes = JSON.stringify(scenes);
    if (transitionDuration !== undefined) project.transitionDuration = transitionDuration;
    if (narrationFile !== undefined) project.narrationFile = narrationFile;
    if (musicFile !== undefined) project.musicFile = musicFile;
    if (narrationVolume !== undefined) project.narrationVolume = narrationVolume;
    if (musicVolume !== undefined) project.musicVolume = musicVolume;
    if (status !== undefined) project.status = status;
    if (outputVideo !== undefined) project.outputVideo = outputVideo;

    await project.save();

    res.json({
      id: project.id,
      title: project.title,
      styleReferenceImage: project.styleReferenceImage,
      scenes: JSON.parse(project.scenes || "[]"),
      transitionDuration: project.transitionDuration,
      narrationFile: project.narrationFile,
      musicFile: project.musicFile,
      narrationVolume: project.narrationVolume,
      musicVolume: project.musicVolume,
      status: project.status,
      outputVideo: project.outputVideo,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// ── GENERATE FILM SCENE OPTIONS ──
router.post("/films/generate-scene", authenticateUser, async (req, res) => {
  try {
    const { prompt, styleReferenceImage, styleTemplate, previousSelectedImage } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Style presets helper
    const stylePresets = {
      anime: ", in anime illustration style, high quality anime artwork, colorful, detailed lineart, visual novel key visual",
      realistic: ", photorealistic portrait, photograph, highly realistic, 8k resolution, highly detailed, professional lighting",
      watercolor: ", watercolor painting style, soft colors, ink splashes, textured paper, artistic",
      "oil painting": ", classical oil painting style, visible brush strokes, rich colors, textured canvas",
      "comic book": ", comic book illustration, bold lines, retro shading, hand-drawn, graphic novel style",
      cinematic: ", cinematic film still, dramatic lighting, high contrast, depth of field, 35mm photograph, movie scene",
      fantasy: ", high fantasy artwork, magical atmosphere, detailed digital painting, vibrant colors",
      "sci-fi": ", futuristic science fiction artwork, cyberpunk details, glowing neon, high-tech environment, concept art"
    };

    let finalPrompt = prompt;
    if (styleTemplate && stylePresets[styleTemplate.toLowerCase()]) {
      finalPrompt += stylePresets[styleTemplate.toLowerCase()];
    }

    console.log(`[VCS Film] Generating 2 scene variations in parallel for prompt: "${finalPrompt}"`);

    const generateFn = async (seedOffset) => {
      if (styleReferenceImage && replicate) {
        // SDXL with style reference
        const output = await replicate.run(
          "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
          {
            input: {
              image: styleReferenceImage,
              prompt: finalPrompt,
              prompt_strength: 0.7,
              negative_prompt: "deformed, blurry, ugly, low quality, disfigured, text, watermark, bad hands",
              seed: Math.floor(Math.random() * 1000000) + seedOffset
            }
          }
        );
        return Array.isArray(output) ? String(output[output.length - 1]) : String(output);
      } else if (replicate) {
        // SDXL Lightning
        const output = await replicate.run(
          "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
          {
            input: {
              prompt: finalPrompt,
              negative_prompt: "deformed, blurry, ugly, low quality, disfigured, text, watermark, bad hands",
              seed: Math.floor(Math.random() * 1000000) + seedOffset
            }
          }
        );
        return Array.isArray(output) ? String(output[output.length - 1]) : String(output);
      } else {
        // Fallback mockup image if Replicate token is not set, to ensure demo readiness
        return `https://picsum.photos/seed/${Math.floor(Math.random() * 100000) + seedOffset}/1280/720`;
      }
    };

    // Execute both generations in parallel
    const [imageOption1, imageOption2] = await Promise.all([
      generateFn(1),
      generateFn(2)
    ]);

    res.json({
      options: [imageOption1, imageOption2]
    });
  } catch (error) {
    console.error("Error generating scene options:", error);
    res.status(500).json({ error: "Failed to generate image variations" });
  }
});

// ── RENDER FILM PROJECT ──
router.post("/films/:id/render", authenticateUser, async (req, res) => {
  try {
    const project = await FilmProject.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!project) {
      return res.status(404).json({ error: "Film Project not found" });
    }

    const scenes = JSON.parse(project.scenes || "[]");
    if (!scenes.length) {
      return res.status(400).json({ error: "Cannot render project: scene queue is empty" });
    }

    // Extract selected images from scenes
    const images = scenes.map(s => s.selectedImage).filter(Boolean);
    if (!images.length) {
      return res.status(400).json({ error: "Cannot render project: no selected images found in scenes" });
    }

    project.status = "rendering";
    await project.save();

    // Trigger async rendering so we don't timeout the HTTP response
    renderVideo({
      images,
      transitionDuration: project.transitionDuration,
      narration: project.narrationFile,
      music: project.musicFile,
      narrationVolume: project.narrationVolume,
      musicVolume: project.musicVolume
    }).then(async (videoUrl) => {
      project.outputVideo = videoUrl;
      project.status = "completed";
      await project.save();
      console.log(`[VideoRenderService] Project ${project.id} rendered successfully: ${videoUrl}`);
    }).catch(async (renderErr) => {
      project.status = "failed";
      await project.save();
      console.error(`[VideoRenderService] Project ${project.id} render failed:`, renderErr);
    });

    res.json({
      id: project.id,
      status: "rendering"
    });
  } catch (error) {
    console.error("Error starting film render:", error);
    res.status(500).json({ error: "Failed to start video rendering" });
  }
});

// ── DIRECT MONTAGE RENDER ──
router.post("/render-montage", authenticateUser, async (req, res) => {
  try {
    const { images, transitionDuration, narration, music, narrationVolume, musicVolume } = req.body;

    if (!images || !images.length) {
      return res.status(400).json({ error: "Images are required for rendering" });
    }

    console.log(`[VideoRenderService] Rendering direct montage with ${images.length} images`);

    const videoUrl = await renderVideo({
      images,
      transitionDuration,
      narration,
      music,
      narrationVolume,
      musicVolume
    });

    res.json({
      success: true,
      videoUrl
    });
  } catch (error) {
    console.error("Montage rendering failed:", error);
    res.status(500).json({ error: "Failed to render montage video" });
  }
});

export default router;
