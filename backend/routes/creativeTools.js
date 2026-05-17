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
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 200 * 1024 * 1024 } });

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────────────

const GEMINI_KEY      = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const ELEVENLABS_KEY  = process.env.ELEVENLABS_API_KEY;
const HF_AUDIOBOOK_URL = "https://sudharsan051006-visual-audiobook-api.hf.space";

async function callLLM(prompt, isJson = false) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const GROQ_KEY = process.env.GROQ_API_KEY;

  // 1. Try Gemini (Primary now that paid key is available)
  if (GEMINI_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_KEY}`;
      const body = { 
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: isJson ? { responseMimeType: "application/json" } : undefined
      };
      
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      }
      console.warn("Gemini failing, checking for fallbacks...", await res.text());
    } catch (err) {
      console.error("Gemini Error:", err.message);
    }
  }

  // 2. Try Groq (Fallback)
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
          response_format: isJson ? { type: "json_object" } : undefined,
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

  throw new Error("No LLM provider available or all fallbacks failed. Check API keys.");
}

async function generateSingleImage(prompt) {
  const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_TOKEN) return null;

  try {
    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", // SDXL Lightning
        input: { prompt, negative_prompt: "blurry, low quality, deformed" },
      }),
    });

    if (res.ok) {
      let pred = await res.json();
      // Poll for result (Lightning is usually fast enough that we might need 1-2 polls)
      const pollUrl = pred.urls.get;
      for (let i = 0; i < 10; i++) {
        await new Promise(r => setTimeout(r, 1500));
        const pollRes = await fetch(pollUrl, {
          headers: { Authorization: `Token ${REPLICATE_TOKEN}` },
        });
        pred = await pollRes.json();
        if (pred.status === "succeeded") return pred.output?.[0];
        if (pred.status === "failed") break;
      }
    }
  } catch (err) {
    console.error("Image Generation Error:", err.message);
  }
  return null;
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

    const { frames = "5", style = "british-male" } = req.body;

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

    const raw = await callLLM(prompt, true);

    // Extract JSON from Gemini response (Gemini sometimes wraps in markdown)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Gemini returned invalid format");

    const parsed = JSON.parse(jsonMatch[0]);
    const murfKey = process.env.MURF_API_KEY;

    // Generate images for each page (background)
    // We only generate for the first 3 pages to avoid extreme timeouts
    for (let i = 0; i < Math.min(parsed.pages.length, 3); i++) {
        const page = parsed.pages[i];
        if (page.imagePrompt) {
            page.imageUrl = await generateSingleImage(`${page.imagePrompt}, ${genre} style, high quality children book illustration`);
        }
    }

    // Generate audio for each page using Murf.ai if available
    if (murfKey) {
      for (let i = 0; i < parsed.pages.length; i++) {
        const page = parsed.pages[i];
        if (page.text) {
          try {
            const response = await fetch("https://api.murf.ai/v1/speech/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": murfKey,
              },
              body: JSON.stringify({
                text: page.text,
                voiceId: "en-US-natalie", // Default voice
                format: "MP3",
              }),
            });

            if (response.ok) {
              const data = await response.json();
              page.audioUrl = data.audioUrl; // Murf returns URL
            }
          } catch (err) {
            console.error(`[storybook/generate] Murf error on page ${i}:`, err.message);
          }
        }
      }
    }

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

    const raw = await callLLM(enhancePrompt, true);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const meta = jsonMatch ? JSON.parse(jsonMatch[0]) : { enhancedPrompt: description, title: "Your Track", bpm: 90 };

    // Step 2: Call your music API (placeholder — swap with real API)
    // Currently returns a demo response structure
    // TODO: Replace with Suno / Stable Audio / MusicGen API call

    const musicApiKey = process.env.MUSIC_API_KEY || process.env.REPLICATE_API_TOKEN;

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

    const raw = await callLLM(analysisPrompt, true);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid Gemini response");

    const analysed = JSON.parse(jsonMatch[0]);

    // Optional: Call image generation API (Stable Diffusion / DALL·E / Runware)
    let imageUrl = null;
    if (analysed.imagePrompt) {
      imageUrl = await generateSingleImage(analysed.imagePrompt);
    }

    return res.json({ ...analysed, imageUrl });
  } catch (err) {
    console.error("[visual-journal/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
