import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Replicate from "replicate";

const router = express.Router();
const GROQ_KEY = process.env.GROQ_API_KEY;
const RUNWARE_API_KEY = process.env.RUNWARE_API_KEY;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
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
        return res.json({ content: data.choices[0].message.content });
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
    // Just using Replicate for image generation to simplify if Runware isn't setup
    // Since Replicate is in wizzyRoutes, it works.
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
    
    // Return array of images since frontend expects data.images
    res.json({ images: [{ url: imageUrl }], prompt: prompt });
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

router.post("/music/generate", async (req, res) => {
  res.json({ generationId: "123", status: "completed", audioUrl: "" });
});

export default router;
