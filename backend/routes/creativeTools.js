/**
 * routes/creativeTools.js
 * Backend API routes for the Creative Tools Hub
 *
 * Endpoints:
 *   POST /api/audiobook/generate
 *   GET  /api/audiobook/status/:jobId
 *   GET  /api/audiobook/download/:jobId
 *   POST /api/storybook/generate
 *   POST /api/music/generate
 *   POST /api/visual-journal/generate
 */

import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { Readable } from "node:stream";

// Node 18+ includes global fetch; if you are on Node 16, run: npm i node-fetch
// and add: import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

// Multer — memory storage for PDFs
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────────────

const GEMINI_KEY      = process.env.GEMINI_API_KEY;
const ELEVENLABS_KEY  = process.env.ELEVENLABS_API_KEY;
const HF_AUDIOBOOK_URL = "https://sudharsan051006-visual-audiobook-api.hf.space";

/**
 * Generic LLM call that supports Gemini, Groq, or Hugging Face.
 * Defaults to Gemini, falls back to Groq or HF if keys are provided.
 */
async function callLLM(prompt) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  const GROQ_KEY = process.env.GROQ_API_KEY;
  const HF_TOKEN = process.env.HF_TOKEN;

  // 1. Try Gemini (default)
  if (GEMINI_KEY && !process.env.USE_FALLBACK_LLM) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;
      const body = { contents: [{ parts: [{ text: prompt }] }] };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      }
      console.warn("Gemini failing, checking for fallbacks...");
    } catch (err) {
      console.error("Gemini Error:", err.message);
    }
  }

  // 2. Try Groq (Recommended for Testing - Fast & Free)
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
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices[0].message.content;
      }
      console.warn("Groq failing...");
    } catch (err) {
      console.error("Groq Error:", err.message);
    }
  }

  // 3. Try Hugging Face Inference API (Free)
  if (HF_TOKEN) {
    try {
      const model = "mistralai/Mistral-7B-Instruct-v0.3";
      const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 1000 } }),
      });

      if (res.ok) {
        const data = await res.json();
        // HF returns arrays or objects depending on the model
        return Array.isArray(data) ? data[0].generated_text : (data.generated_text || JSON.stringify(data));
      }
      console.warn("HF Inference failing...");
    } catch (err) {
      console.error("HF Error:", err.message);
    }
  }

  throw new Error("No LLM provider available or and all fallbacks failed. Check API keys.");
}

// ──────────────────────────────────────────────────────────────────────────────
// AUDIOBOOK ROUTES  (proxies to Hugging Face Space)
// ──────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/audiobook/generate
 * Forwards the PDF + params to the HF audiobook API and returns job_id
 */
router.post("/audiobook/generate", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing PDF file" });

    const { frames = "5", style = "calm-warm" } = req.body;

    // Build FormData to forward to HF Space
    const { Blob } = await import("node:buffer");
    const formFile = new File([req.file.buffer], req.file.originalname, { type: "application/pdf" });
    const form = new FormData();
    form.append("pdf", formFile);
    form.append("frames", frames);
    form.append("style", style);

    const hfRes = await fetch(`${HF_AUDIOBOOK_URL}/generate`, {
      method: "POST",
      body: form,
    });

    if (!hfRes.ok) {
      const txt = await hfRes.text();
      return res.status(502).json({ error: `HF Space error: ${txt}` });
    }

    const data = await hfRes.json();
    return res.json(data); // { job_id: "..." }
  } catch (err) {
    console.error("[audiobook/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/audiobook/status/:jobId
 * Polls the HF Space for job completion
 */
router.get("/audiobook/status/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const hfRes = await fetch(`${HF_AUDIOBOOK_URL}/result/${jobId}`);
    if (!hfRes.ok) return res.status(502).json({ error: "HF Space poll error" });
    const data = await hfRes.json();
    return res.json(data);
  } catch (err) {
    console.error("[audiobook/status]", err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/audiobook/download/:jobId
 * Streams the ZIP download from HF Space to the client
 */
router.get("/audiobook/download/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const hfRes = await fetch(`${HF_AUDIOBOOK_URL}/download/${jobId}`);
    if (!hfRes.ok) return res.status(502).json({ error: "Download failed" });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="visual_audiobook.zip"`);
    
    // Node.js 18+ fetch returns a Web ReadableStream. Express res needs a Node stream.
    if (hfRes.body) {
      Readable.fromWeb(hfRes.body).pipe(res);
    } else {
      res.status(502).end();
    }
  } catch (err) {
    console.error("[audiobook/download]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// STORYBOOK ROUTE
// ──────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/storybook/generate
 * Uses Gemini to write a multi-page story  + generates image prompts per page
 */
router.post("/storybook/generate", async (req, res) => {
  try {
    const { idea, genre = "fantasy", ageGroup = "children" } = req.body;
    if (!idea?.trim()) return res.status(400).json({ error: "Missing story idea" });

    const prompt = `
You are a creative children's storybook author. Write a ${genre} story (${ageGroup} audience) based on this idea:
"${idea}"

OUTPUT RULES:
- Write exactly 5 pages
- Each page: 2-4 sentences, vivid and age-appropriate
- Return ONLY valid JSON (no markdown, no explanation)

JSON FORMAT:
{
  "title": "Story Title",
  "pages": [
    {
      "page": 1,
      "text": "...",
      "imagePrompt": "Detailed visual scene for an illustrator: ..."
    }
  ]
}
`.trim();

    const raw = await callLLM(prompt);

    // Extract JSON from Gemini response (Gemini sometimes wraps in markdown)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Gemini returned invalid format");

    const parsed = JSON.parse(jsonMatch[0]);
    return res.json(parsed);
  } catch (err) {
    console.error("[storybook/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// MUSIC ROUTE
// ──────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/music/generate
 * Uses Gemini to enhance the music prompt, then calls MusicGen / Stable Audio
 *
 * NOTE: Replace MUSIC_API with your actual provider (Suno, Replicate, etc.)
 */
router.post("/music/generate", async (req, res) => {
  try {
    const { description, mood = "calm", genre = "ambient", duration = 30 } = req.body;
    if (!description?.trim()) return res.status(400).json({ error: "Missing description" });

    // Step 1: Enhance prompt with Gemini
    const enhancePrompt = `
You are a music director. Transform this user music request into a rich, technical music prompt for an AI music generation API.

User request: "${description}"
Mood: ${mood}
Genre: ${genre}
Duration: ${duration} seconds

Return ONLY a JSON object:
{
  "enhancedPrompt": "...",
  "title": "...",
  "bpm": 90,
  "key": "C major"
}
`.trim();

    const raw = await callLLM(enhancePrompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const meta = jsonMatch ? JSON.parse(jsonMatch[0]) : { enhancedPrompt: description, title: "Your Track", bpm: 90 };

    // Step 2: Call your music API (placeholder — swap with real API)
    // Currently returns a demo response structure
    // TODO: Replace with Suno / Stable Audio / MusicGen API call

    const musicApiKey = process.env.MUSIC_API_KEY;

    let audioUrl = null;

    if (musicApiKey) {
      // Example: Replicate MusicGen
      const replicateRes = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${musicApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
          input: {
            prompt: meta.enhancedPrompt,
            duration: duration,
          },
        }),
      });

      if (replicateRes.ok) {
        const predData = await replicateRes.json();
        audioUrl = predData.output?.[0] ?? null;
      }
    }

    return res.json({
      title: meta.title || "AI Generated Track",
      prompt: meta.enhancedPrompt,
      duration: `${duration}s`,
      bpm: meta.bpm,
      key: meta.key,
      audioUrl,
    });
  } catch (err) {
    console.error("[music/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// VISUAL JOURNAL ROUTE
// ──────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/visual-journal/generate
 * Gemini analyses emotion → returns art card data + optional image URL
 */
router.post("/visual-journal/generate", async (req, res) => {
  try {
    const { entry, style = "watercolor" } = req.body;
    if (!entry?.trim()) return res.status(400).json({ error: "Missing journal entry" });

    const analysisPrompt = `
You are an emotion analyst and art director. Analyse this journal entry and return structured JSON.

Journal Entry: "${entry}"
Art Style: ${style}

Return ONLY valid JSON:
{
  "mood": "one word (happy/sad/calm/anxious/inspired/nostalgic/etc.)",
  "moodScore": 0-100,
  "colors": ["#hex1", "#hex2", "#hex3"],
  "caption": "A short poetic sentence that captures the feeling (max 15 words)",
  "imagePrompt": "A detailed ${style} art image prompt that visually captures the emotion of this journal entry. Include lighting, composition, color palette, and atmosphere."
}
`.trim();

    const raw = await callLLM(analysisPrompt);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid Gemini response");

    const analysed = JSON.parse(jsonMatch[0]);

    // Optional: Call image generation API (Stable Diffusion / DALL·E / Runware)
    let imageUrl = null;
    const imageApiKey = process.env.IMAGE_API_KEY;
    const imageProvider = process.env.IMAGE_PROVIDER || "runware"; // or "openai", "stability"

    if (imageApiKey && analysed.imagePrompt) {
      try {
        if (imageProvider === "runware") {
          const rwRes = await fetch("https://api.runware.ai/v1", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${imageApiKey}` },
            body: JSON.stringify([{
              taskType: "imageInference",
              taskUUID: `journal-${Date.now()}`,
              positivePrompt: analysed.imagePrompt,
              width: 768,
              height: 512,
              model: "runware:100@1",
              numberResults: 1,
            }]),
          });
          if (rwRes.ok) {
            const rwData = await rwRes.json();
            imageUrl = rwData.data?.[0]?.imageURL ?? null;
          }
        } else if (imageProvider === "openai") {
          const oaiRes = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${imageApiKey}` },
            body: JSON.stringify({
              model: "dall-e-3",
              prompt: analysed.imagePrompt,
              size: "1792x1024",
              quality: "standard",
              n: 1,
            }),
          });
          if (oaiRes.ok) {
            const oaiData = await oaiRes.json();
            imageUrl = oaiData.data?.[0]?.url ?? null;
          }
        }
      } catch (imgErr) {
        console.error("[visual-journal] Image generation error:", imgErr);
        // Non-fatal — proceed without image
      }
    }

    return res.json({ ...analysed, imageUrl });
  } catch (err) {
    console.error("[visual-journal/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
