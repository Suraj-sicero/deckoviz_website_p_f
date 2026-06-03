import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Replicate from "replicate";
import jwt from "jsonwebtoken";
import { fal } from "@fal-ai/client";
import VizzyChat from "../models/VizzyChat.js";
import VizzyImage from "../models/VizzyImage.js";
import { User } from "../models/User.js";
import { getActionCost } from "../config/tiers.js";
import { Op } from "sequelize";
import DeckovizCuration from "../models/DeckovizCuration.js";
import UserFavoritePrompt from "../models/UserFavoritePrompt.js";
import { MusicTrack, VideoClip } from "../models/MediaTracks.js";
import { MusicAttachment, MUSIC_TARGET_TYPES } from "../models/MusicAttachment.js";
import UserPersona from "../models/UserPersona.js";
import UserOnboarding from "../models/UserOnboarding.js";


// ── Vizzy 2.0 — Agentic Architecture Imports ──────────────────────────────
import { processAgentRequest } from "../agents/vizzyMasterAgent.js";
import { getCoreMemoryObject, distillMonthlyMemory } from "../services/memoryService.js";
import { seedSystemCards } from "../seeds/systemCardSeed.js";

const router = express.Router();

const GROQ_KEY = process.env.GROQ_API_KEY;
const RUNWARE_API_KEY = process.env.RUNWARE_API_KEY;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const FAL_KEY = process.env.FAL_KEY;
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

if (FAL_KEY) {
  fal.config({ credentials: FAL_KEY });
}

// Helper to get user from token
const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

// ── Onboarding & Deep Persona Endpoints ─────────────────────────────────────
router.get("/onboarding/status", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const [onboarding] = await UserOnboarding.findOrCreate({
      where: { userId: user.id },
      defaults: { completed: false, answers: "{}" }
    });

    const persona = await UserPersona.findOne({
      where: { userId: user.id }
    });

    res.json({
      completed: onboarding.completed,
      hasPersona: !!persona,
      persona: persona ? {
        id: persona.id,
        personaSummary: persona.personaSummary,
        preferencesCard: JSON.parse(persona.preferencesCard || "{}")
      } : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/onboarding/start", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const chat = await VizzyChat.create({
      userId: user.id,
      title: "Vizzy Onboarding",
      messages: JSON.stringify([
        {
          id: `onb-${Date.now()}`,
          role: "assistant",
          content: "Hello! I'm Vizzy, your AI companion. I'd love to chat for a few minutes to get to know you, your home, and what moves you, so we can curate your personalized Deckoviz art frame and ambient sounds. To begin... what is your name, and what should I call you?",
          timestamp: Date.now()
        }
      ]),
      activeAgent: "onboarding",
      mode: "onboarding"
    });

    res.json({ chat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/onboarding/complete", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { persona } = req.body;
    if (!persona) return res.status(400).json({ error: "Persona JSON required" });

    // Save/Upsert UserPersona
    const personaSummary = persona.meta?.session_notes || 
      (persona.aesthetics?.sensibility_notes ? `Aesthetic: ${persona.aesthetics.sensibility_notes}` : "User onboarding persona profile");
    
    const [userPersona] = await UserPersona.findOrCreate({
      where: { userId: user.id },
      defaults: {
        personaSummary,
        preferencesCard: JSON.stringify(persona)
      }
    });
    userPersona.personaSummary = personaSummary;
    userPersona.preferencesCard = JSON.stringify(persona);
    await userPersona.save();

    // Mark onboarding as completed
    const [onbRecord] = await UserOnboarding.findOrCreate({
      where: { userId: user.id },
      defaults: { completed: true }
    });
    onbRecord.completed = true;
    onbRecord.answers = JSON.stringify(persona);
    await onbRecord.save();

    res.json({ success: true, persona: userPersona });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Atomically check + deduct credits for a paid action.
// Returns { ok: true, remaining } on success, or { ok: false, status, error }
// on failure (e.g. 401 unauthenticated, 402 insufficient credits).
const chargeCredits = async (req, action, count = 1) => {
  const tokenUser = getUserFromToken(req);
  if (!tokenUser) {
    return { ok: false, status: 401, error: "Sign in to use this feature." };
  }
  const cost = getActionCost(action, count);
  if (cost === 0) return { ok: true, remaining: null, user: tokenUser };

  const user = await User.findByPk(tokenUser.id);
  if (!user) {
    return { ok: false, status: 401, error: "User not found." };
  }
  if ((user.credits ?? 0) < cost) {
    return {
      ok: false,
      status: 402,
      error: `Not enough credits. This action costs ${cost} credits; you have ${user.credits}.`,
      required: cost,
      balance: user.credits,
    };
  }
  user.credits -= cost;
  await user.save();
  return { ok: true, remaining: user.credits, charged: cost, user: tokenUser };
};

router.post("/chat", async (req, res) => {
  try {
    const { messages, chatId } = req.body;
    const user = getUserFromToken(req);

    if (!GROQ_KEY) {
      return res.status(500).json({ error: "Groq API key missing" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || "Chat failed" });
    }
    const content = data.choices[0].message.content;

    // Persist the chat session. If chatId is provided, update that session.
    // Otherwise create a new one and return its id so the client can continue
    // appending to it.
    let savedChatId = chatId || null;
    if (user) {
      try {
        const title = messages[0]?.content?.substring(0, 60) || "New Chat";
        if (chatId) {
          const chat = await VizzyChat.findOne({
            where: { id: chatId, userId: user.id },
          });
          if (chat) {
            chat.messages = JSON.stringify(messages);
            if (!chat.title || chat.title === "New Chat") chat.title = title;
            await chat.save();
          }
        } else {
          const created = await VizzyChat.create({
            userId: user.id,
            title,
            messages: JSON.stringify(messages),
          });
          savedChatId = created.id;
        }
      } catch (dbErr) {
        console.error("Failed to save chat to DB:", dbErr);
      }
    }

    return res.json({ content, chatId: savedChatId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a fresh empty chat session (used by the "New chat" button so the
// client gets an id to attach future messages to).
router.post("/chats", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const chat = await VizzyChat.create({
      userId: user.id,
      title: "New Chat",
      messages: "[]",
    });
    res.json({ chat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single chat session by id (so the client can resume a past session)
router.get("/chats/:id", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const chat = await VizzyChat.findOne({
      where: { id: req.params.id, userId: user.id },
    });
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const json = chat.toJSON();
    res.json({
      chat: { ...json, messages: JSON.parse(json.messages || "[]") },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a chat session
router.delete("/chats/:id", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const deleted = await VizzyChat.destroy({
      where: { id: req.params.id, userId: user.id },
    });
    if (!deleted) return res.status(404).json({ error: "Chat not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aspect ratio → SDXL dimensions (must be multiples of 8, total ~1MP)
const ASPECT_DIMENSIONS = {
  "1:1": { width: 1024, height: 1024 },
  "16:9": { width: 1344, height: 768 },
  "9:16": { width: 768, height: 1344 },
  "3:2": { width: 1216, height: 832 },
  "2:3": { width: 832, height: 1216 },
  "4:3": { width: 1152, height: 896 },
};

router.post("/generate", async (req, res) => {
  try {
    const { prompt, num_results = 1, aspect_ratio = "1:1" } = req.body;
    const numOutputs = Math.min(Math.max(parseInt(num_results, 10) || 1, 1), 4);

    const charge = await chargeCredits(req, "image", numOutputs);
    if (!charge.ok) return res.status(charge.status).json({ error: charge.error });
    const user = charge.user;

    const dims = ASPECT_DIMENSIONS[aspect_ratio] || ASPECT_DIMENSIONS["1:1"];

    const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          prompt,
          negative_prompt: "deformed, blurry, ugly, low quality",
          width: dims.width,
          height: dims.height,
          num_outputs: numOutputs,
        },
      }
    );

    const urls = Array.isArray(output) ? output.map(String) : [String(output)];

    if (user) {
      try {
        await Promise.all(
          urls.map((url) =>
            VizzyImage.create({ userId: user.id, imageUrl: url, prompt })
          )
        );
      } catch (dbErr) {
        console.error("Failed to save images to DB:", dbErr);
      }
    }

    res.json({
      images: urls.map((url) => ({ url })),
      prompt,
      aspect_ratio,
      creditsRemaining: charge.remaining,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New routes
router.get("/images", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    
    const images = await VizzyImage.findAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/chats", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    
    const chats = await VizzyChat.findAll({
      where: { userId: user.id },
      order: [['updatedAt', 'DESC']]
    });
    
    // Parse messages
    const parsedChats = chats.map(chat => {
      const chatJson = chat.toJSON();
      return {
        ...chatJson,
        messages: JSON.parse(chatJson.messages)
      };
    });
    
    res.json({ chats: parsedChats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Image-to-image edit via Replicate SDXL img2img. The user uploads an image
// and supplies a prompt describing the desired change; we transform the whole
// image (not masked inpaint) which is the simplest robust path.
router.post("/inpaint", async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;
    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Missing imageUrl or prompt" });
    }
    if (!REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: "Replicate token missing" });
    }

    const charge = await chargeCredits(req, "inpaint");
    if (!charge.ok) return res.status(charge.status).json({ error: charge.error });
    const user = charge.user;

    const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });
    const output = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      {
        input: {
          image: imageUrl,
          prompt,
          prompt_strength: 0.65,
          num_outputs: 1,
          negative_prompt: "deformed, blurry, ugly, low quality",
        },
      }
    );

    const urls = Array.isArray(output) ? output.map(String) : [String(output)];
    const editedUrl = urls[0];

    if (user) {
      try {
        await VizzyImage.create({
          userId: user.id,
          imageUrl: editedUrl,
          prompt: `[edit] ${prompt}`,
        });
      } catch (dbErr) {
        console.error("Failed to save edited image to DB:", dbErr);
      }
    }

    res.json({
      editedImage: { url: editedUrl },
      prompt,
      creditsRemaining: charge.remaining,
    });
  } catch (err) {
    console.error("[inpaint] error:", err);
    res.status(500).json({ error: err.message || "Inpaint failed" });
  }
});

// Neural Style Transfer endpoint using Replicate SDXL img2img
router.post("/style-transfer", async (req, res) => {
  try {
    const { imageUrl, style } = req.body;
    if (!imageUrl || !style) {
      return res.status(400).json({ error: "Missing imageUrl or style" });
    }
    if (!REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: "Replicate token missing" });
    }

    const charge = await chargeCredits(req, "style_transfer");
    if (!charge.ok) return res.status(charge.status).json({ error: charge.error });
    const user = charge.user;

    const stylePrompts = {
      "Van Gogh (Impressionism)": "in the style of Vincent van Gogh, oil on canvas, starry night aesthetic, thick impasto brushstrokes, vibrant swirling colors, masterpiece painting",
      "Picasso (Cubism)": "in the style of Pablo Picasso cubism, abstract geometric shapes, fragmented forms, multi-perspective modern art masterpiece",
      "Claude Monet (Impressionism)": "in the style of Claude Monet impressionism, dappled light, soft pastel brushstrokes, outdoor atmospheric rendering, water lilies style painting",
      "Salvador Dali (Surrealism)": "in the style of Salvador Dali surrealism, melting objects, dreamlike landscape, bizarre juxtaposition, highly detailed surrealist painting",
      "Andy Warhol (Pop Art)": "in the style of Andy Warhol pop art, silkscreen print, vibrant high-contrast neon colors, screenprint halftone, retro modernism",
      "Katsushika Hokusai (Ukiyo-e)": "in the style of Katsushika Hokusai, classic Ukiyo-e Japanese woodblock print, bold outlines, oceanic waves, Mount Fuji aesthetic",
      "Edvard Munch (Expressionism)": "in the style of Edvard Munch expressionism, swirling brushstrokes of the Scream, intense emotional colors, flowing lines, haunting beauty",
      "Jackson Pollock (Abstract Expressionism)": "in the style of Jackson Pollock action painting, abstract expressionism, paint splatters, chaotic drips, layered texture",
      "Gustav Klimt (Art Nouveau)": "in the style of Gustav Klimt, golden phase, ornamental art nouveau, rich gold leaf detailing, intricate mosaic patterns",
      "Henri Matisse (Fauvism)": "in the style of Henri Matisse fauvism, bold simplified shapes, vibrant raw colors, paper cut-out style, expressive modern art",
      "Michelangelo (Renaissance)": "in the style of Michelangelo, classic high Renaissance fresco painting, Sistine Chapel style, muscular dynamic figures, classical antiquity",
      "Jean-Michel Basquiat (Neo-Expressionism)": "in the style of Jean-Michel Basquiat, neo-expressionism, raw street art, graffiti writing, expressive sketch lines, crown motif",
      "Piet Mondrian (De Stijl)": "in the style of Piet Mondrian, De Stijl, abstract grid pattern, primary colors red blue yellow, black thick lines, minimalist modern art",
      "Roy Lichtenstein (Comic Book)": "in the style of Roy Lichtenstein comic book pop art, Ben-Day dots, bold ink outlines, vintage retro comic book style",
      "William Morris (Arts & Crafts)": "in the style of William Morris, detailed arts and crafts movement, elegant floral wallpaper pattern, medieval aesthetic, intricate nature design",
      "Yayoi Kusama (Polka Dots)": "in the style of Yayoi Kusama, infinite polka dot pattern, hypnotic repetition, bright contrasting colors, modern installation art",
      "Keith Haring (Street Art)": "in the style of Keith Haring, vibrant street art, bold black outlines, dancing radiant figures, pop art iconographic style",
      "Georgia O'Keeffe (Modernist Flower)": "in the style of Georgia O'Keeffe modernist painting, close-up magnified organic flowers, soft gradients, abstract natural forms",
      "Wassily Kandinsky (Abstract)": "in the style of Wassily Kandinsky abstract art, geometric lines, colorful circles and shapes, musical rhythm composition",
      "M.C. Escher (Surreal Mathematical)": "in the style of M.C. Escher, mathematical tessellations, impossible architecture, paradoxical structures, detailed lithography"
    };

    const stylePrompt = stylePrompts[style] || `in the style of ${style}, artistic rendering, masterpiece`;
    const prompt = `neurally style transferred image, ${stylePrompt}`;

    const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });
    const output = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      {
        input: {
          image: imageUrl,
          prompt,
          prompt_strength: 0.65, // balance between original structure and selected art style
          num_outputs: 1,
          negative_prompt: "deformed, blurry, ugly, low quality, photorealistic, photo, camera photograph",
        },
      }
    );

    const urls = Array.isArray(output) ? output.map(String) : [String(output)];
    const transferredUrl = urls[0];

    if (user) {
      try {
        await VizzyImage.create({
          userId: user.id,
          imageUrl: transferredUrl,
          prompt: `[Style Transfer - ${style}]`,
        });
      } catch (dbErr) {
        console.error("Failed to save style transferred image to DB:", dbErr);
      }
    }

    res.json({
      transferredImage: { url: transferredUrl },
      style,
      creditsRemaining: charge.remaining,
    });
  } catch (err) {
    console.error("[style-transfer] error:", err);
    res.status(500).json({ error: err.message || "Style transfer failed" });
  }
});

// Image analysis via Gemini vision. Returns a short description of what
// landed in the generated image so the chat can offer follow-up tweaks.
router.post("/analyze-image", async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "Missing imageUrl" });
    }
    const googleKey = process.env.GOOGLE_API_KEY;
    if (!googleKey) {
      return res.json({
        analysis: "Image generated successfully.",
      });
    }

    // Fetch the image and base64-encode for inline_data
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      return res.json({ analysis: "Image generated successfully." });
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const mimeType = imgRes.headers.get("content-type") || "image/png";
    const base64 = buf.toString("base64");

    const genAI = new GoogleGenerativeAI(googleKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = prompt
      ? `The user asked for: "${prompt}". Briefly describe (1-2 sentences) what is shown in the image and suggest one concrete refinement they could try next. Keep it warm and conversational.`
      : `Briefly describe (1-2 sentences) what is shown in this image and suggest one concrete refinement.`;

    const result = await model.generateContent([
      systemPrompt,
      { inlineData: { mimeType, data: base64 } },
    ]);

    const analysis = result.response.text().trim();
    res.json({ analysis });
  } catch (err) {
    console.error("[analyze-image] error:", err);
    res.json({ analysis: "Image generated successfully." });
  }
});

// Toggle favorite flag on a generated image
router.patch("/images/:id/favorite", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const image = await VizzyImage.findOne({
      where: { id: req.params.id, userId: user.id },
    });
    if (!image) return res.status(404).json({ error: "Image not found" });

    image.isFavorited = !image.isFavorited;
    await image.save();
    res.json({ image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a generated image
router.delete("/images/:id", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const deleted = await VizzyImage.destroy({
      where: { id: req.params.id, userId: user.id },
    });
    if (!deleted) return res.status(404).json({ error: "Image not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/narrate", async (req, res) => {
  try {
    const { text, provider = "elevenlabs", voiceId } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    if (provider === "murf") {
      const apiKey = process.env.MURF_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Murf API key missing" });
      }

      const response = await fetch("https://api.murf.ai/v1/speech/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          text: text,
          voiceId: voiceId || "en-US-natalie", // Default voice
          format: "MP3",
        }),
      });

      if (!response.ok) {
        throw new Error(`Murf API error: ${await response.text()}`);
      }

      const data = await response.json();
      return res.json({ audioUrl: data.audioUrl }); // Murf returns URL
    } else {
      const defaultVoiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel
      const finalVoiceId = voiceId || defaultVoiceId;
      const apiKey = process.env.ELEVENLABS_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "ElevenLabs API key missing" });
      }

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${finalVoiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${await response.text()}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const base64Audio = Buffer.from(audioBuffer).toString("base64");
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

      return res.json({ audioUrl });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/music/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const musicKey = process.env.REPLICATE_API_TOKEN;
    if (!musicKey) return res.status(500).json({ error: "Replicate token missing" });

    const charge = await chargeCredits(req, "music");
    if (!charge.ok) return res.status(charge.status).json({ error: charge.error });

    const musicPrompt = `${prompt}, professional recording, high quality`;
    
    const createRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${musicKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
        input: { prompt: musicPrompt, duration: 30 },
      }),
    });

    if (!createRes.ok) {
      throw new Error(`Failed to create prediction: ${await createRes.text()}`);
    }

    let prediction = await createRes.json();
    const predictionId = prediction.id;

    let attempts = 0;
    while (prediction.status !== "succeeded" && prediction.status !== "failed" && attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          Authorization: `Token ${musicKey}`,
        },
      });
      if (pollRes.ok) {
        prediction = await pollRes.json();
      }
      attempts++;
    }

    if (prediction.status === "succeeded") {
      const audioUrl = prediction.output?.[0] || prediction.output;
      return res.json({
        generationId: predictionId,
        status: "completed",
        audioUrl: audioUrl,
        creditsRemaining: charge.remaining,
      });
    } else {
      return res.status(500).json({ error: "Music generation failed or timed out" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Video generation — temporary: Google Veo 2 via Gemini API REST.
// TODO: swap back to fal.ai/ltx-video once FAL_KEY is provisioned (the fal
// integration above is preserved in git history).
//
// Veo notes:
//   - Endpoint: /v1beta/models/veo-2.0-generate-001:predictLongRunning
//   - Returns an operation { name }; poll via /v1beta/{name}
//   - Requires the GOOGLE_API_KEY's project to have Veo enabled (preview tier)
//   - Pricing is ~$0.35/sec — much more than fal LTX. Plan to swap.
const VEO_MODEL = "veo-2.0-generate-001";
const VEO_BASE = "https://generativelanguage.googleapis.com/v1beta";

const veoUrl = (path) =>
  `${VEO_BASE}${path}?key=${encodeURIComponent(process.env.GOOGLE_API_KEY || "")}`;

router.post("/video/generate", async (req, res) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: "GOOGLE_API_KEY not configured" });
    }

    const { prompt, imageUrl } = req.body;
    if (!prompt && !imageUrl) {
      return res
        .status(400)
        .json({ error: "Provide either a prompt or an imageUrl" });
    }

    const charge = await chargeCredits(req, "video");
    if (!charge.ok) return res.status(charge.status).json({ error: charge.error });

    // Veo accepts an optional `image` field for image-to-video (b64 or GCS URI).
    // For URL inputs we fetch + base64-encode inline.
    let imageInline = null;
    if (imageUrl) {
      try {
        const imgRes = await fetch(imageUrl);
        if (imgRes.ok) {
          const buf = Buffer.from(await imgRes.arrayBuffer());
          imageInline = {
            bytesBase64Encoded: buf.toString("base64"),
            mimeType: imgRes.headers.get("content-type") || "image/png",
          };
        }
      } catch (e) {
        console.warn("[video/generate] failed to fetch source image:", e.message);
      }
    }

    const instance = {
      prompt: prompt || "subtle ambient motion",
      ...(imageInline ? { image: imageInline } : {}),
    };

    const body = {
      instances: [instance],
      parameters: {
        aspectRatio: "16:9",
        durationSeconds: 5,
        numberOfVideos: 1,
        personGeneration: "allow_adult",
      },
    };

    const opRes = await fetch(veoUrl(`/models/${VEO_MODEL}:predictLongRunning`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const opData = await opRes.json();
    if (!opRes.ok) {
      console.error("[video/generate] Veo error:", opData);
      return res.status(opRes.status).json({
        error:
          opData?.error?.message ||
          "Video generation failed. Veo may not be enabled on this Google API key.",
      });
    }

    return res.json({
      requestId: opData.name, // operation name, e.g. "models/veo-.../operations/..."
      model: VEO_MODEL,
      status: "in_queue",
      prompt,
      creditsRemaining: charge.remaining,
    });
  } catch (err) {
    console.error("[video/generate] error:", err);
    res.status(500).json({ error: err.message || "Video generation failed" });
  }
});

// Poll status / fetch result. Veo operation names contain "/" so we accept
// them via `?op=...` query param instead of a path param.
router.get("/video/status", async (req, res) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: "GOOGLE_API_KEY not configured" });
    }

    const operationName = req.query.op;
    if (!operationName) {
      return res.status(400).json({ error: "Missing op query param" });
    }

    const pollRes = await fetch(veoUrl(`/${operationName}`), { method: "GET" });
    const op = await pollRes.json();

    if (!pollRes.ok) {
      console.error("[video/:id] poll error:", op);
      return res.status(pollRes.status).json({
        error: op?.error?.message || "Status check failed",
      });
    }

    if (!op.done) {
      return res.json({
        requestId: operationName,
        status: "in_progress",
      });
    }

    // Done — extract video URI/bytes from the response
    const videos =
      op.response?.generateVideoResponse?.generatedSamples ||
      op.response?.videos ||
      [];
    const first = videos[0];
    let videoUrl =
      first?.video?.uri ||
      first?.uri ||
      first?.videoUri ||
      first?.video?.fileData?.fileUri;

    // Veo returns video URIs that require the API key as a query param
    if (videoUrl && !videoUrl.includes("key=")) {
      videoUrl += (videoUrl.includes("?") ? "&" : "?") + `key=${encodeURIComponent(process.env.GOOGLE_API_KEY)}`;
    }

    if (!videoUrl) {
      return res.json({
        requestId: operationName,
        status: "failed",
        error: op.error?.message || "No video URL in response",
      });
    }

    return res.json({
      requestId: operationName,
      status: "completed",
      videoUrl,
    });
  } catch (err) {
    console.error("[video/:id] error:", err);
    res.status(500).json({ error: err.message || "Video status check failed" });
  }
});

// ══════════════════════════════════════════════════════════════════════════
// ══ VIZZY 2.0 — AGENTIC ENDPOINTS (additive, existing routes untouched) ══
// ══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// POST /agent
// The unified entry point for the DASPort 1.2 / Vizzy 2.0 architecture.
//
// This single endpoint replaces the client-side intent classifier chain.
// The Vizzy Master Agent handles:
//   • LLM-based intent classification
//   • Sub-agent selection (transparent to the user)
//   • Memory retrieval (core + extended)
//   • System card injection (modular, per-agent)
//   • Media pipeline delegation (image/video/music — to existing endpoints)
//
// The frontend calls this endpoint for ALL conversational requests.
// The backend routes intelligently. The user experiences one intelligence.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/agent", async (req, res) => {
  try {
    const { messages = [], chatId, mode = "home", userContext } = req.body;
    const tokenUser = getUserFromToken(req);
    const userId = tokenUser?.id || null;

    // Extract the latest user message
    const userMessages = messages.filter((m) => m.role === "user");
    const userInput = userMessages[userMessages.length - 1]?.content || "";

    if (!userInput.trim()) {
      return res.status(400).json({ error: "No user message provided" });
    }

    // ── Run the Vizzy Master Agent ───────────────────────────────────────
    const result = await processAgentRequest({
      userId,
      messages,
      chatId,
      mode,
      userInput,
    });

    // ── Media pipeline delegation ─────────────────────────────────────────
    // The master agent signals when a request needs the media pipelines.
    // We return the intent so the frontend knows which pipeline to call.
    if (result.delegateToMedia) {
      return res.json({
        delegateToMedia: true,
        intent: result.intent,
        // Frontend uses intent to pick the right existing endpoint:
        //   image_generation  → POST /generate
        //   image_editing     → POST /inpaint
        //   music_generation  → POST /music/generate
        //   video_generation  → POST /video/generate
        agentUsed: "vizzy_pipeline",
      });
    }

    // ── Persist chat session (same as existing /chat endpoint) ────────────
    let savedChatId = chatId || null;
    if (userId) {
      try {
        const title = userInput.substring(0, 60) || "New Chat";
        if (chatId) {
          const chat = await VizzyChat.findOne({
            where: { id: chatId, userId },
          });
          if (chat) {
            chat.messages = JSON.stringify(messages);
            chat.activeAgent = result.agentUsed;
            if (!chat.title || chat.title === "New Chat") chat.title = title;
            await chat.save();
          }
        } else {
          const created = await VizzyChat.create({
            userId,
            title,
            messages: JSON.stringify(messages),
            activeAgent: result.agentUsed,
            mode,
          });
          savedChatId = created.id;
        }
      } catch (dbErr) {
        console.error("[/agent] Failed to persist chat:", dbErr.message);
      }
    }

    // ── Check if onboarding JSON is produced ──────────────────────────────
    let onboardingCompleted = false;
    let personaData = null;
    if (mode === "onboarding" && result.content && userId) {
      let jsonString = null;
      const jsonMatch = result.content.match(/```json\s*([\s\S]*?)\s*```/) || result.content.match(/```\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1].trim();
      } else {
        const lastBrace = result.content.lastIndexOf("{");
        const endBrace = result.content.lastIndexOf("}");
        if (lastBrace !== -1 && endBrace !== -1 && endBrace > lastBrace) {
          jsonString = result.content.substring(lastBrace, endBrace + 1).trim();
        }
      }

      if (jsonString) {
        try {
          const parsed = JSON.parse(jsonString);
          if (parsed && (parsed.meta || parsed.identity || parsed.aesthetics)) {
            // Save/Upsert UserPersona
            const personaSummary = parsed.meta?.session_notes || 
              (parsed.aesthetics?.sensibility_notes ? `Aesthetic: ${parsed.aesthetics.sensibility_notes}` : "User onboarding persona profile");
            
            const [userPersona] = await UserPersona.findOrCreate({
              where: { userId },
              defaults: {
                personaSummary,
                preferencesCard: JSON.stringify(parsed)
              }
            });
            userPersona.personaSummary = personaSummary;
            userPersona.preferencesCard = JSON.stringify(parsed);
            await userPersona.save();

            // Mark onboarding as completed
            const [onbRecord] = await UserOnboarding.findOrCreate({
              where: { userId },
              defaults: { completed: true }
            });
            onbRecord.completed = true;
            onbRecord.answers = JSON.stringify(parsed);
            await onbRecord.save();

            onboardingCompleted = true;
            personaData = parsed;
          }
        } catch (jsonErr) {
          console.error("Failed to parse onboarding JSON:", jsonErr.message);
        }
      }
    }

    return res.json({
      content: result.content,
      intent: result.intent,
      agentUsed: result.agentUsed,
      chatId: savedChatId,
      onboardingCompleted,
      persona: personaData,
    });
  } catch (err) {
    console.error("[/agent] Error:", err.message);
    res.status(500).json({ error: err.message || "Agent request failed" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /memory/core
// Returns the user's core memory object for frontend personalization.
// Used by the welcome screen to greet the user with context-aware suggestions.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/memory/core", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const memory = await getCoreMemoryObject(tokenUser.id);
    res.json({ memory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /admin/seed-system-cards
// Seeds all 15 system card sections into the DB.
// Safe to run multiple times (upsert). Dev + production admin use.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/admin/seed-system-cards", async (req, res) => {
  try {
    await seedSystemCards();
    res.json({ success: true, message: "System cards seeded successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /admin/distill-memory
// Manually triggers monthly memory distillation for the authenticated user.
// In production, this would be triggered by a monthly cron job.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/admin/distill-memory", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    await distillMonthlyMemory(tokenUser.id);
    res.json({ success: true, message: "Memory distillation complete." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /chats/:id/favorite
// Toggles the isFavorited boolean flag on a chat session.
// ─────────────────────────────────────────────────────────────────────────────
router.patch("/chats/:id/favorite", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const chat = await VizzyChat.findOne({
      where: { id: req.params.id, userId: tokenUser.id },
    });
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    chat.isFavorited = !chat.isFavorited;
    await chat.save();

    res.json({ success: true, isFavorited: chat.isFavorited });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /chats/deleted
// Retrieves all soft-deleted chat sessions for the authenticated user.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/chats/deleted", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const chats = await VizzyChat.findAll({
      where: {
        userId: tokenUser.id,
        deletedAt: { [Op.ne]: null },
      },
      paranoid: false, // Forces returning soft-deleted rows
      order: [["deletedAt", "DESC"]],
    });

    const parsed = chats.map((chat) => {
      const json = chat.toJSON();
      return { ...json, messages: JSON.parse(json.messages || "[]") };
    });

    res.json({ chats: parsed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /chats/:id/restore
// Restores a soft-deleted chat session.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/chats/:id/restore", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const chat = await VizzyChat.findOne({
      where: { id: req.params.id, userId: tokenUser.id },
      paranoid: false,
    });
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    await chat.restore();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /images/deleted
// Retrieves all soft-deleted images for the authenticated user.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/images/deleted", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const images = await VizzyImage.findAll({
      where: {
        userId: tokenUser.id,
        deletedAt: { [Op.ne]: null },
      },
      paranoid: false,
      order: [["deletedAt", "DESC"]],
    });

    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /images/:id/restore
// Restores a soft-deleted image.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/images/:id/restore", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const img = await VizzyImage.findOne({
      where: { id: req.params.id, userId: tokenUser.id },
      paranoid: false,
    });
    if (!img) return res.status(404).json({ error: "Image not found" });

    await img.restore();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /prompts/favorite
// Retrieves the list of favorite prompt template IDs for the user.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/prompts/favorite", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const favorites = await UserFavoritePrompt.findAll({
      where: { userId: tokenUser.id },
    });

    res.json({ favoritePromptIds: favorites.map((f) => f.templateId) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /prompts/favorite
// Toggles the favorite status of a prompt template ID.
// ─────────────────────────────────────────────────────────────────────────────
router.post("/prompts/favorite", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const { templateId } = req.body;
    if (!templateId) return res.status(400).json({ error: "Missing templateId" });

    const existing = await UserFavoritePrompt.findOne({
      where: { userId: tokenUser.id, templateId },
    });

    if (existing) {
      await existing.destroy();
      res.json({ success: true, isFavorited: false });
    } else {
      await UserFavoritePrompt.create({ userId: tokenUser.id, templateId });
      res.json({ success: true, isFavorited: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /curations (Task 1)
// Lists curated artworks.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/curations", async (req, res) => {
  try {
    const curations = await DeckovizCuration.findAll({
      order: [["displayOrder", "ASC"], ["createdAt", "DESC"]],
    });
    res.json({ curations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /curations/:id (Task 1)
// Retrieves details of a single curated artwork.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/curations/:id", async (req, res) => {
  try {
    const curation = await DeckovizCuration.findByPk(req.params.id);
    if (!curation) return res.status(404).json({ error: "Curation not found" });
    res.json({ curation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /music
// Retrieves all system-wide and user-specific music tracks.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/music", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    const userIdClause = tokenUser ? { [Op.or]: [{ userId: null }, { userId: tokenUser.id }] } : { userId: null };

    const tracks = await MusicTrack.findAll({
      where: userIdClause,
      order: [["createdAt", "DESC"]],
    });

    res.json({ tracks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /music/system
// Retrieves only public, system-seeded classical and ambient audio tracks.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/music/system", async (req, res) => {
  try {
    const tracks = await MusicTrack.findAll({
      where: { userId: null },
      order: [["category", "ASC"], ["title", "ASC"]],
    });

    res.json({ tracks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 🎵 MUSIC ATTACHMENT ROUTES (attach a track to a collection / artwork / curation)
// ============================================================

// POST /api/vizzy-canvas/music/attach — attach (or replace) the music on an item
// body: { targetType, targetId, musicTrackId }
router.post("/music/attach", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const { targetType, targetId, musicTrackId } = req.body;

    if (!targetType || !targetId || !musicTrackId) {
      return res
        .status(400)
        .json({ error: "targetType, targetId and musicTrackId are required" });
    }
    if (!MUSIC_TARGET_TYPES.includes(targetType)) {
      return res.status(400).json({
        error: `Invalid targetType. Must be one of: ${MUSIC_TARGET_TYPES.join(", ")}`,
      });
    }

    // Make sure the track exists and is usable by this user (system or own).
    const track = await MusicTrack.findByPk(musicTrackId);
    if (!track) {
      return res.status(404).json({ error: "Music track not found" });
    }
    if (track.userId && track.userId !== tokenUser.id) {
      return res.status(403).json({ error: "You cannot use this music track" });
    }

    // One track per item: update the existing attachment or create a new one.
    const existing = await MusicAttachment.findOne({
      where: { userId: tokenUser.id, targetType, targetId },
    });

    let attachment;
    if (existing) {
      existing.musicTrackId = musicTrackId;
      await existing.save();
      attachment = existing;
    } else {
      attachment = await MusicAttachment.create({
        userId: tokenUser.id,
        targetType,
        targetId,
        musicTrackId,
      });
    }

    res.json({ success: true, attachment, track });
  } catch (err) {
    console.error("❌ Error attaching music:", err);
    res.status(500).json({ error: "Failed to attach music" });
  }
});

// DELETE /api/vizzy-canvas/music/attach — remove the music from an item
// query or body: { targetType, targetId }
router.delete("/music/attach", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const targetType = req.body.targetType || req.query.targetType;
    const targetId = req.body.targetId || req.query.targetId;

    if (!targetType || !targetId) {
      return res
        .status(400)
        .json({ error: "targetType and targetId are required" });
    }

    const deleted = await MusicAttachment.destroy({
      where: { userId: tokenUser.id, targetType, targetId },
    });

    res.json({ success: true, removed: deleted });
  } catch (err) {
    console.error("❌ Error detaching music:", err);
    res.status(500).json({ error: "Failed to detach music" });
  }
});

// GET /api/vizzy-canvas/music/attach?targetType=&targetId= — get the track on one item
router.get("/music/attach", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const { targetType, targetId } = req.query;
    if (!targetType || !targetId) {
      return res
        .status(400)
        .json({ error: "targetType and targetId are required" });
    }

    const attachment = await MusicAttachment.findOne({
      where: { userId: tokenUser.id, targetType, targetId },
    });

    if (!attachment) {
      return res.json({ success: true, attachment: null, track: null });
    }

    const track = await MusicTrack.findByPk(attachment.musicTrackId);
    res.json({ success: true, attachment, track });
  } catch (err) {
    console.error("❌ Error fetching music attachment:", err);
    res.status(500).json({ error: "Failed to fetch music attachment" });
  }
});

// GET /api/vizzy-canvas/music/attachments — all of the user's attachments (track hydrated)
// optional query: ?targetType=collection  to filter
router.get("/music/attachments", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req);
    if (!tokenUser) return res.status(401).json({ error: "Unauthorized" });

    const where = { userId: tokenUser.id };
    if (req.query.targetType) where.targetType = req.query.targetType;

    const attachments = await MusicAttachment.findAll({
      where,
      order: [["updatedAt", "DESC"]],
    });

    // Hydrate the tracks in a single query and map them onto each attachment.
    const trackIds = [...new Set(attachments.map((a) => a.musicTrackId))];
    const tracks = trackIds.length
      ? await MusicTrack.findAll({ where: { id: trackIds } })
      : [];
    const trackById = Object.fromEntries(tracks.map((t) => [t.id, t]));

    const result = attachments.map((a) => ({
      ...a.toJSON(),
      track: trackById[a.musicTrackId] || null,
    }));

    res.json({ success: true, attachments: result });
  } catch (err) {
    console.error("❌ Error fetching music attachments:", err);
    res.status(500).json({ error: "Failed to fetch music attachments" });
  }
});

export default router;

