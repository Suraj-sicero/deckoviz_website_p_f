import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Replicate from "replicate";
import jwt from "jsonwebtoken";
import VizzyChat from "../models/VizzyChat.js";
import VizzyImage from "../models/VizzyImage.js";

const router = express.Router();
const GROQ_KEY = process.env.GROQ_API_KEY;
const RUNWARE_API_KEY = process.env.RUNWARE_API_KEY;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

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

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const user = getUserFromToken(req);
    
    // Use Groq
    if (GROQ_KEY) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messages,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const content = data.choices[0].message.content;
        
        // Save chat if user is authenticated
        if (user) {
          try {
            const existingChat = await VizzyChat.findOne({
              where: { userId: user.id },
              order: [['updatedAt', 'DESC']]
            });
            
            if (existingChat && messages.length > 1) {
              // Update existing
              existingChat.messages = JSON.stringify(messages);
              await existingChat.save();
            } else {
              // Create new
              await VizzyChat.create({
                userId: user.id,
                title: messages[0]?.content?.substring(0, 30) || "New Chat",
                messages: JSON.stringify(messages)
              });
            }
          } catch (dbErr) {
            console.error("Failed to save chat to DB:", dbErr);
          }
        }
        
        return res.json({ content });
      }
    }
    res.status(500).json({ error: "Failed to generate response" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/generate", async (req, res) => {
  try {
    const { prompt, num_results = 1, aspect_ratio = "1:1" } = req.body;
    const user = getUserFromToken(req);
    
    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN,
    });
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          prompt: prompt,
          negative_prompt: "deformed, blurry, ugly, low quality",
        }
      }
    );
    let imageUrl = String(output);
    if (Array.isArray(output)) {
      imageUrl = String(output[output.length - 1]);
    }
    
    // Save image if user is authenticated
    if (user) {
      try {
        await VizzyImage.create({
          userId: user.id,
          imageUrl: imageUrl,
          prompt: prompt
        });
      } catch (dbErr) {
        console.error("Failed to save image to DB:", dbErr);
      }
    }
    
    res.json({ images: [{ url: imageUrl }], prompt: prompt });
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

router.post("/inpaint", async (req, res) => {
  res.json({ editedImage: { url: "https://via.placeholder.com/512" } });
});

router.post("/analyze-image", async (req, res) => {
  res.json({ analysis: "This is an AI generated image based on the prompt." });
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
        audioUrl: audioUrl 
      });
    } else {
      return res.status(500).json({ error: "Music generation failed or timed out" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
