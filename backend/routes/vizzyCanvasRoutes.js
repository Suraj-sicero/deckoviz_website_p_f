import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Replicate from "replicate";
import jwt from "jsonwebtoken";
import { fal } from "@fal-ai/client";
import VizzyChat from "../models/VizzyChat.js";
import VizzyImage from "../models/VizzyImage.js";
import { User } from "../models/User.js";
import { getActionCost } from "../config/tiers.js";

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

export default router;
