import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const router = express.Router();

// Initialize Gemini (Free Tier)
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null;

// Chat Ideation Route (using Gemini)
router.post("/chat", async (req, res) => {
  console.log("✅ Chat endpoint hit! Messages received:", req.body.messages?.length);
  try {
    const { messages } = req.body;
    if (!genAI) throw new Error("Google API Key / Gemini not configured");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Filter and map only user/model messages
    const contents = messages.filter(m => m.role !== "system").map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    console.log("Calling model.generateContent...");
    const result = await model.generateContent({
      contents,
      systemInstruction: "You are Wizzy, a creative storytelling assistant helping users create comic books and visual storybooks. Guide the user to define characters, world, theme, and story flow.",
    });
    console.log("generateContent finished!", result.response.text());

    const payload = JSON.stringify({ message: { role: "assistant", content: result.response.text() } });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(payload);
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to generate response: " + error.message });
  }
});

// Story Structure Generation Route (using Gemini)
router.post("/generate-structure", async (req, res) => {
  try {
    const { history } = req.body;
    if (!genAI) throw new Error("Google API Key / Gemini not configured");

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Based on the following conversation, generate a structured story JSON with title, character descriptions, style, and 5-8 pages with scene descriptions. 

STRICT JSON format:
{
  "title": "string",
  "characters": [{ "name": "string", "description": "consistent visual description" }],
  "style": "string (e.g., anime, cinematic, comic)",
  "pages": [{ "pageNumber": number, "description": "scene description" }]
}

NOT TEXT, ONLY JSON.

History:
${JSON.stringify(history)}`;

    const result = await model.generateContent(prompt);
    const content = result.response.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(content);
  } catch (error) {
    console.error("Structure Error:", error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({ error: "Failed to generate story structure: " + error.message }));
  }
});

// Image Generation Route (using Replicate)
router.post("/generate-image", async (req, res) => {
  try {
    const { characterDescription, style, sceneDescription } = req.body;
    if (!process.env.REPLICATE_API_TOKEN) throw new Error("Replicate API Token not configured");

    const prompt = `Highly detailed ${style} art. Character: ${characterDescription}. Scene: ${sceneDescription}. Consistent features, high resolution, cinematic lighting. Masterpiece.`;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
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
      imageUrl = String(output[output.length - 1]); // typically it returns an array of urls/streams
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ url: imageUrl }));
  } catch (error) {
    console.error("Image Generation Error:", error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({ error: "Failed to generate image: " + error.message }));
  }
});

export default router;
