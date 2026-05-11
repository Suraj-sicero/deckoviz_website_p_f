import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null;
const GROQ_KEY = process.env.GROQ_API_KEY;

/**
 * Generic LLM call for Wizzy Chat (supports Gemini & Groq fallback)
 */
async function callWizzyLLM(messages, isJson = false) {
  // 1. Try Gemini
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: isJson ? { responseMimeType: "application/json" } : undefined
      });

      // Filter and map for Gemini format
      const contents = messages.filter(m => m.role !== "system").map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const systemInstruction = messages.find(m => m.role === "system")?.content || "";

      const result = await model.generateContent({
        contents,
        systemInstruction: systemInstruction || "You are Wizzy, a creative storytelling assistant.",
      });

      return result.response.text();
    } catch (err) {
      console.warn("⚠️ Gemini failed, trying Groq fallback...", err.message);
    }
  }

  // 2. Try Groq Fallback
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
          messages: messages, // Groq uses standard OpenAI format (role: user/assistant/system)
          temperature: 0.7,
          response_format: isJson ? { type: "json_object" } : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices[0].message.content;
      }
      const errText = await res.text();
      console.warn("⚠️ Groq failing...", errText);
    } catch (err) {
      console.error("Groq Error:", err.message);
    }
  }

  throw new Error("All LLM providers failed. Check Gemini/Groq keys and quota.");
}


// Chat Ideation Route (using Gemini)
router.post("/chat", async (req, res) => {
  console.log("✅ Chat endpoint hit! Messages received:", req.body.messages?.length);
  try {
    const { messages } = req.body;
    const systemInstruction = "You are Wizzy, a creative storytelling assistant helping users create comic books and visual storybooks. Guide the user to define characters, world, theme, and story flow.";
    
    // Prepare full message list including system instruction
    const fullMessages = [
      { role: "system", content: systemInstruction },
      ...messages
    ];

    const responseText = await callWizzyLLM(fullMessages);
    const payload = JSON.stringify({ message: { role: "assistant", content: responseText } });
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

    const responseText = await callWizzyLLM([
      { role: "system", content: "You are a JSON generator. Return ONLY valid JSON." },
      { role: "user", content: prompt }
    ], true);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(responseText);
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

// Specialized Distillation Endpoint for Visual Book Companion
router.post("/companion/distill", async (req, res) => {
  try {
    const { text, style, additionalInstructions } = req.body;
    
    const prompt = `
      You are an expert visual storyteller. I have a long section of a fiction book.
      Your task is to:
      1. Distill this section into a 1-sentence "Visual Summary" that captures the core narrative beat.
      2. Generate a professional AI image generation prompt (SDXL style) that illustrates this beat.
      
      Style Preference: ${style}
      Additional Instructions: ${additionalInstructions}
      
      Text Section:
      "${text}"
      
      Return ONLY valid JSON:
      {
        "visualSummary": "The 1-sentence narrative beat",
        "imagePrompt": "Detailed technical prompt for AI generation"
      }
    `;

    const responseText = await callWizzyLLM([
      { role: "system", content: "You are a visual narrative analyst. Return ONLY valid JSON." },
      { role: "user", content: prompt }
    ], true);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(responseText);
  } catch (error) {
    console.error("Distillation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
