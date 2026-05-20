/**
 * routes/newCreativeTools.js
 * Backend API routes for the NEW Creative Tools
 *
 * Endpoints:
 *   POST /api/short-story/generate
 *   POST /api/greeting-card/generate
 *   POST /api/comic/generate
 *   POST /api/life-book/generate
 *   POST /api/song/generate
 *   POST /api/learning-book/generate
 *   POST /api/learning-portal/chat
 *   POST /api/visual-book/generate
 *   POST /api/storybook-studio/generate
 *   POST /api/storybook-studio/regenerate-image
 *   POST /api/daily/generate
 */

import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Replicate from "replicate";

dotenv.config();
const router = express.Router();

// Frame style definitions — rendered programmatically via SVG/Sharp (no PNG assets)
const FRAME_STYLES = {
  frame1: {
    name: "Classic Walnut",
    // 16:9 cinematic widescreen canvas at 1920×1080
    canvasW: 1920,
    canvasH: 1080,
    // Bezel thickness as fraction of canvas width/height (outer → inner)
    bezelFraction: 0.045,        // ~86px at 1920px wide — thick luxury walnut bezel
    cornerRadius: 12,
    // Wood grain colours (dark walnut)
    bezelGradient: {
      stops: [
        { offset: 0,   color: '#3d2b1f' },
        { offset: 0.35, color: '#5c3d28' },
        { offset: 0.65, color: '#4a3020' },
        { offset: 1,    color: '#2e1e12' }
      ]
    },
    // Inner matte border between bezel and screen (thin dark reveal)
    matteColor: '#1a1008',
    matteFraction: 0.008,
    backlight_color: '#4a7fb5',  // ambient LED hue cast on wall
    glowOpacity: 0.55,
    glowBlur: 38,
    shadowBlur: 22,
    shadowOpacity: 0.7
  },
  frame2: {
    name: "Sleek Charcoal",
    canvasW: 1920,
    canvasH: 1080,
    bezelFraction: 0.028,        // ~54px — slim modern metal bezel
    cornerRadius: 6,
    bezelGradient: {
      stops: [
        { offset: 0,    color: '#1c1c1e' },
        { offset: 0.4,  color: '#2e2e30' },
        { offset: 0.6,  color: '#242426' },
        { offset: 1,    color: '#111113' }
      ]
    },
    matteColor: '#0a0a0b',
    matteFraction: 0.005,
    backlight_color: '#e8753a',
    glowOpacity: 0.5,
    glowBlur: 42,
    shadowBlur: 20,
    shadowOpacity: 0.72
  },
  frame3: {
    name: "Natural Oak",
    canvasW: 1920,
    canvasH: 1080,
    bezelFraction: 0.042,
    cornerRadius: 10,
    bezelGradient: {
      stops: [
        { offset: 0,    color: '#c8a96e' },
        { offset: 0.3,  color: '#b8996a' },
        { offset: 0.7,  color: '#c4a56b' },
        { offset: 1,    color: '#a8915a' }
      ]
    },
    matteColor: '#6b4c2a',
    matteFraction: 0.007,
    backlight_color: '#d4a843',
    glowOpacity: 0.48,
    glowBlur: 35,
    shadowBlur: 18,
    shadowOpacity: 0.65
  },
  frame4: {
    name: "Modern Maple",
    canvasW: 1920,
    canvasH: 1080,
    bezelFraction: 0.038,
    cornerRadius: 8,
    bezelGradient: {
      stops: [
        { offset: 0,    color: '#8b6340' },
        { offset: 0.4,  color: '#a07548' },
        { offset: 0.6,  color: '#956d3f' },
        { offset: 1,    color: '#7a5635' }
      ]
    },
    matteColor: '#3d2410',
    matteFraction: 0.006,
    backlight_color: '#b87d4a',
    glowOpacity: 0.52,
    glowBlur: 36,
    shadowBlur: 19,
    shadowOpacity: 0.68
  }
};

// Map old frontend frameStyle keys to new definitions
const FRAME_CONFIGS = {
  frame1: FRAME_STYLES.frame1,
  frame2: FRAME_STYLES.frame2,
  frame3: FRAME_STYLES.frame3,
  frame4: FRAME_STYLES.frame4,
  // frontend sends slugs like "Classic Walnut" too — handle both
  'frame_walnut':   FRAME_STYLES.frame1,
  'frame_charcoal': FRAME_STYLES.frame2,
  'frame_oak':      FRAME_STYLES.frame3,
  'frame_maple':    FRAME_STYLES.frame4,
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer for image uploads (Visual Book Creator)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per image
});

// ──────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS (duplicated so this file is self-contained)
// ──────────────────────────────────────────────────────────────────────────────

async function callLLM(prompt, isJson = false) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const GROQ_KEY = process.env.GROQ_API_KEY;

  // 1. Try Gemini
  if (GEMINI_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
      const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: isJson ? { responseMimeType: "application/json" } : undefined,
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
      console.warn("Gemini failing:", await res.text());
    } catch (err) {
      console.error("Gemini Error:", err.message);
    }
  }

  // 2. Fallback to Groq
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_KEY}`,
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
    } catch (err) {
      console.error("Groq Error:", err.message);
    }
  }

  throw new Error("No LLM provider available. Check API keys.");
}

function extractJSON(raw) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("LLM returned invalid JSON format");
  return JSON.parse(match[0]);
}

async function callVisionLLM(prompt, imageBuffer, isJson = false) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!GEMINI_KEY) throw new Error("Gemini API key is required for vision tasks.");

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
    const body = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageBuffer.toString("base64"),
              },
            },
          ],
        },
      ],
      generationConfig: isJson ? { responseMimeType: "application/json" } : undefined,
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
    const errorText = await res.text();
    console.warn("Gemini Vision failing:", errorText);
    throw new Error(`Gemini Vision Error: ${errorText}`);
  } catch (err) {
    console.error("Vision Error:", err.message);
    throw err;
  }
}

async function generateImage(prompt, negPrompt = "") {
  const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_TOKEN) return null;

  try {
    const replicate = new Replicate({ auth: REPLICATE_TOKEN });
    const finalNeg = negPrompt || "blurry, low quality, deformed, text, watermark";
    // Using SDXL Lightning for speed
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          prompt,
          negative_prompt: finalNeg,
        },
      }
    );
    return Array.isArray(output) ? output[0] : output;
  } catch (err) {
    console.error("Image generation error:", err.message);
  }
  return null;
}

/**
 * Image-to-Image generation using SDXL or similar on Replicate
 * To accurately add a frame while keeping the background identical
 */
async function generateImageToImage(imageBuffer, prompt) {
  const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_TOKEN) {
    console.error("Missing REPLICATE_API_TOKEN");
    return null;
  }

  try {
    console.log("Starting Image-to-Image generation with Replicate SDK...");
    const replicate = new Replicate({ auth: REPLICATE_TOKEN });
    
    // Resize image before sending to Replicate to avoid CUDA Out of Memory
    // 1024px is a good balance for SDXL
    const resizedBuffer = await sharp(imageBuffer)
        .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();

    const dataUri = `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;

    const output = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      {
        input: {
          image: dataUri,
          prompt,
          prompt_strength: 0.45,
          negative_prompt: "blurry, low quality, deformed, text, watermark, distorted furniture, changed room layout, extra windows, multiple frames",
          num_outputs: 1,
          guidance_scale: 7.5,
        },
      }
    );

    console.log("Generation output received:", output);
    return Array.isArray(output) ? output[0] : output;
  } catch (err) {
    console.error("Image-to-Image Error:", err);
  }
  return null;
}

// ──────────────────────────────────────────────────────────────────────────────
// 1. SHORT STORY GENERATOR
// ──────────────────────────────────────────────────────────────────────────────

const LENGTH_MAP = {
  short: "~300 words (flash fiction)",
  medium: "~800 words (short story)",
  long: "~1500 words (long short story)",
};

router.post("/short-story/generate", async (req, res) => {
  try {
    const { prompt, genre = "drama", length = "medium" } = req.body;
    if (!prompt?.trim()) return res.status(400).json({ error: "Missing story prompt" });

    const targetLength = LENGTH_MAP[length] || LENGTH_MAP.medium;

    const llmPrompt = `
You are a professional fiction writer. Write a compelling ${genre} short story based on this prompt:
"${prompt}"

Target length: ${targetLength}

REQUIREMENTS:
- Engaging opening that hooks immediately
- Well-developed characters with distinct voices
- Proper story arc: setup, conflict, resolution
- Vivid descriptions and sensory details
- Strong, memorable ending

Return ONLY valid JSON (no markdown):
{
  "title": "Story Title",
  "genre": "${genre}",
  "story": "The full story text with paragraph breaks...",
  "wordCount": 800,
  "readTime": "5 min read"
}
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    return res.json(parsed);
  } catch (err) {
    console.error("[short-story/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 2. GREETING CARD CREATOR
// ──────────────────────────────────────────────────────────────────────────────

router.post("/greeting-card/generate", async (req, res) => {
  try {
    const { recipient, occasion, tone = "warm", extra = "" } = req.body;
    if (!recipient?.trim()) return res.status(400).json({ error: "Missing recipient name" });

    const llmPrompt = `
You are a master greeting card writer. Create a personalized greeting card message.

Details:
- Recipient: ${recipient}
- Occasion: ${occasion}
- Tone: ${tone}
- Personal details: ${extra || "None provided"}

Write a heartfelt, personalized message (3–5 sentences). Make it feel genuinely personal, not generic.

Return ONLY valid JSON:
{
  "subject": "${recipient}",
  "occasion": "${occasion}",
  "tone": "${tone}",
  "message": "The full card message here...",
  "imagePrompt": "A beautiful ${tone} greeting card visual for ${occasion}, ${tone} style, warm colors, elegant, no text"
}
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    // Generate card image
    if (parsed.imagePrompt) {
      parsed.imageUrl = await generateImage(parsed.imagePrompt);
    }

    return res.json(parsed);
  } catch (err) {
    console.error("[greeting-card/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 3. COMIC BOOK CREATOR
// ──────────────────────────────────────────────────────────────────────────────

router.post("/comic/generate", async (req, res) => {
  try {
    const { idea, style = "superhero", panels = 6 } = req.body;
    if (!idea?.trim()) return res.status(400).json({ error: "Missing story idea" });

    const panelCount = Math.min(Math.max(parseInt(panels) || 6, 4), 12);

    const llmPrompt = `
You are a professional comic book writer. Create a ${style} style comic book based on this idea:
"${idea}"

Write exactly ${panelCount} panels. Each panel needs:
- A scene description (setting, action)
- Dialogue (1-2 lines max, punchy comic-style)
- An image prompt for AI image generation

Return ONLY valid JSON:
{
  "title": "Comic Title",
  "panels": [
    {
      "panel": 1,
      "scene": "Brief scene description for the artist",
      "dialogue": "Character: Dialog here! OR empty string if no dialogue",
      "imagePrompt": "Detailed ${style} comic art panel: [description], comic book style, bold lines, vivid colors"
    }
  ]
}
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    // Generate images for panels in parallel (limit to avoid extreme overhead)
    if (parsed.panels && Array.isArray(parsed.panels)) {
      const panelLimit = Math.min(parsed.panels.length, 4);
      const imagePromises = parsed.panels.slice(0, panelLimit).map(async (panel) => {
        if (panel.imagePrompt) {
          panel.imageUrl = await generateImage(panel.imagePrompt);
        }
      });
      await Promise.allSettled(imagePromises);
    }

    return res.json(parsed);
  } catch (err) {
    console.error("[comic/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 4. LIFE BOOK
// ──────────────────────────────────────────────────────────────────────────────

router.post("/life-book/generate", async (req, res) => {
  try {
    const { memories, authorName = "" } = req.body;
    if (!memories || memories.length < 2) {
      return res.status(400).json({ error: "At least 2 memories are required" });
    }

    const memorySummary = memories
      .map((m, i) => `Memory ${i + 1}${m.title ? ` - ${m.title}` : ""}${m.year ? ` (${m.year})` : ""}: ${m.description}`)
      .join("\n");

    const llmPrompt = `
You are a memoir writer helping someone organize their life memories into a beautiful book.

${authorName ? `Author: ${authorName}` : ""}

Memories provided:
${memorySummary}

Your task: Organize these memories into meaningful life chapters with rich narrative prose.

Return ONLY valid JSON:
{
  "bookTitle": "A poetic title for the life book",
  "chapters": [
    {
      "chapter": 1,
      "title": "Chapter title (e.g. 'The Beginning', 'Years of Wonder')",
      "timeframe": "Time period or age range",
      "theme": "One of: childhood, youth, adventure, love, growth, wisdom",
      "narrative": "Rich 2-3 paragraph narrative combining the related memories. Write in first or third person, poetically and with warmth."
    }
  ]
}

Group related memories into 3-5 meaningful chapters. Use poetic, literary prose.
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    return res.json(parsed);
  } catch (err) {
    console.error("[life-book/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 5. PERSONALIZED SONG CREATOR
// ──────────────────────────────────────────────────────────────────────────────

router.post("/song/generate", async (req, res) => {
  try {
    const { theme, mood = "uplifting", genre = "pop", recipient = "" } = req.body;
    if (!theme?.trim()) return res.status(400).json({ error: "Missing song theme" });

    const llmPrompt = `
You are a professional songwriter. Write a complete, original song.

Theme: "${theme}"
${recipient ? `Dedicated to: ${recipient}` : ""}
Mood: ${mood}
Genre: ${genre}

Requirements:
- Complete song structure: [Verse 1] [Chorus] [Verse 2] [Chorus] [Bridge] [Final Chorus]
- Rhyme scheme appropriate for genre
- Emotionally resonant lyrics that feel personal
- Chorus should be catchy and repeatable

Return ONLY valid JSON:
{
  "title": "Song Title",
  "genre": "${genre}",
  "mood": "${mood}",
  "structure": "Verse-Chorus-Verse-Chorus-Bridge-Chorus",
  "lyrics": "Full song with section headers like [Verse 1], [Chorus], etc."
}
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    // Attempt music generation via Replicate MusicGen (if API key available)
    const musicKey = process.env.MUSIC_API_KEY || process.env.REPLICATE_API_TOKEN;
    let audioUrl = null;

    if (musicKey) {
      try {
        const musicPrompt = `${genre} song, ${mood} mood, ${theme.substring(0, 100)}, professional recording, high quality`;
        const replicateRes = await fetch("https://api.replicate.com/v1/predictions", {
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
        if (replicateRes.ok) {
          const predData = await replicateRes.json();
          audioUrl = predData.output?.[0] ?? null;
        }
      } catch (e) {
        console.warn("Music gen failed:", e.message);
      }
    }

    return res.json({ ...parsed, audioUrl });
  } catch (err) {
    console.error("[song/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 6. VISUAL LEARNING BOOK
// ──────────────────────────────────────────────────────────────────────────────

router.post("/learning-book/generate", async (req, res) => {
  try {
    const { topic, level = "beginner", chapters = 5 } = req.body;
    if (!topic?.trim()) return res.status(400).json({ error: "Missing topic" });

    const chapterCount = Math.min(Math.max(parseInt(chapters) || 5, 3), 10);

    const llmPrompt = `
You are an expert educator and textbook author. Create a comprehensive learning book about:
"${topic}"

Target audience: ${level} level learner
Number of chapters: ${chapterCount}

Return ONLY valid JSON:
{
  "bookTitle": "The Complete Guide to [Topic]",
  "topic": "${topic}",
  "introduction": "2-3 paragraph introduction to the topic and what the reader will learn",
  "chapters": [
    {
      "chapter": 1,
      "title": "Chapter title",
      "summary": "One sentence summary",
      "content": "3-4 paragraphs of educational content appropriate for ${level} level. Clear, engaging, with examples.",
      "keyPoints": ["Key takeaway 1", "Key takeaway 2", "Key takeaway 3"],
      "visualPrompt": "Description of a helpful diagram or infographic that would illustrate this chapter's main concept"
    }
  ]
}

Write educational prose that is engaging, clear, and appropriate for ${level} level understanding.
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    return res.json(parsed);
  } catch (err) {
    console.error("[learning-book/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 7. VISUAL LEARNING PORTAL (CHAT)
// ──────────────────────────────────────────────────────────────────────────────

router.post("/learning-portal/chat", async (req, res) => {
  try {
    const { topic, message, history = [] } = req.body;
    if (!message?.trim()) return res.status(400).json({ error: "Missing message" });

    const isQuizRequest = /quiz|test|question|practice/i.test(message);
    const isRoadmapRequest = /roadmap|plan|path|steps|how to learn|where to start/i.test(message);

    let llmPrompt;

    if (isQuizRequest) {
      llmPrompt = `
You are Vizzy, an AI tutor teaching "${topic}". The user asked: "${message}"

Generate an interactive quiz question about ${topic}.

Return ONLY valid JSON:
{
  "type": "quiz",
  "content": "Here's a quiz question for you!",
  "quiz": {
    "question": "The quiz question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "The exact correct option text",
    "explanation": "Clear explanation of why the answer is correct"
  }
}
`.trim();
    } else if (isRoadmapRequest) {
      llmPrompt = `
You are Vizzy, an AI tutor teaching "${topic}". The user asked: "${message}"

Create a structured learning roadmap for ${topic}.

Return ONLY valid JSON:
{
  "type": "roadmap",
  "content": "Here's your personalized learning roadmap for ${topic}:",
  "roadmap": {
    "topic": "${topic}",
    "steps": [
      {
        "step": 1,
        "title": "Step title",
        "duration": "Estimated time (e.g. '1 week')",
        "resources": ["Resource or activity suggestion"]
      }
    ]
  }
}

Include 5-7 steps from beginner to proficient.
`.trim();
    } else {
      const historyText = history.slice(-6)
        .map((h) => `${h.role}: ${h.content}`)
        .join("\n");

      llmPrompt = `
You are Vizzy, an expert and friendly AI tutor specializing in "${topic}". 

Previous conversation:
${historyText}

Student's question: "${message}"

Provide a clear, helpful, engaging response. If explaining a concept:
- Use simple language appropriate for all levels
- Give examples when helpful
- Use **bold** for key terms
- Keep response focused and concise (3-5 paragraphs max)

Return ONLY valid JSON:
{
  "type": "explanation",
  "content": "Your educational response here..."
}
`.trim();
    }

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    return res.json(parsed);
  } catch (err) {
    console.error("[learning-portal/chat]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 8. VISUAL BOOK CREATOR (upload images)
// ──────────────────────────────────────────────────────────────────────────────

router.post("/visual-book/generate", upload.array("images", 10), async (req, res) => {
  try {
    const files = req.files;
    const style = req.body.style || "memoir";

    if (!files || files.length < 2) {
      return res.status(400).json({ error: "At least 2 images are required" });
    }

    const imageDescriptions = files.map((f, i) =>
      `Photo ${i + 1}: ${f.originalname} (${(f.size / 1024).toFixed(0)}KB)`
    );

    const llmPrompt = `
You are a creative storyteller who creates visual books from photo collections.

The user has uploaded ${files.length} photos:
${imageDescriptions.join("\n")}

Style: ${style}

Create a visual book where each photo becomes a page with:
- A poetic caption (1 sentence, evocative)
- A story paragraph (2-3 sentences weaving this into the larger narrative)

Return ONLY valid JSON:
{
  "title": "A beautiful, evocative title for this visual story",
  "introduction": "2-3 sentence introduction that sets the tone of the entire visual book",
  "pages": [
    {
      "page": 1,
      "caption": "Short, poetic caption for this photo",
      "story": "2-3 sentences weaving this photo into the larger story narrative"
    }
  ]
}

Return exactly ${files.length} pages. Write in ${style} style. Make each page feel connected to the others.
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    return res.json(parsed);
  } catch (err) {
    console.error("[visual-book/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 9. STORYBOOK STUDIO
// ──────────────────────────────────────────────────────────────────────────────

router.post("/storybook-studio/generate", async (req, res) => {
  try {
    const { idea, genre = "fantasy" } = req.body;
    if (!idea?.trim()) return res.status(400).json({ error: "Missing story idea" });

    const llmPrompt = `
You are a children's storybook author and illustrator. Write a ${genre} story for the Storybook Studio editor.

Story idea: "${idea}"

Write exactly 6 pages. Each page: 3-4 sentences, vivid and age-appropriate.

Return ONLY valid JSON:
{
  "title": "Story Title",
  "pages": [
    {
      "page": 1,
      "text": "The page text...",
      "imagePrompt": "Detailed ${genre} illustration for this page: [scene description], children's book illustration style, warm colors, whimsical, high quality"
    }
  ]
}
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    // Generate images for pages in parallel
    if (parsed.pages && Array.isArray(parsed.pages)) {
      const pageLimit = Math.min(parsed.pages.length, 3);
      const imagePromises = parsed.pages.slice(0, pageLimit).map(async (page) => {
        if (page.imagePrompt) {
          page.imageUrl = await generateImage(page.imagePrompt);
        }
      });
      await Promise.allSettled(imagePromises);
    }

    return res.json(parsed);
  } catch (err) {
    console.error("[storybook-studio/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/storybook-studio/regenerate-image", async (req, res) => {
  try {
    const { imagePrompt, genre = "fantasy" } = req.body;
    if (!imagePrompt?.trim()) return res.status(400).json({ error: "Missing image prompt" });

    const enhancedPrompt = `${imagePrompt}, ${genre} illustration style, children's book art, beautiful, high quality`;
    const imageUrl = await generateImage(enhancedPrompt);

    return res.json({ imageUrl });
  } catch (err) {
    console.error("[storybook-studio/regenerate-image]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 10. DAILY INSPIRATION ENGINE
// ──────────────────────────────────────────────────────────────────────────────

router.post("/daily/generate", async (req, res) => {
  try {
    const { theme = "general" } = req.body;
    const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

    const llmPrompt = `
You are Vizzy, a daily inspiration curator. Generate today's complete inspiration package.

Date: ${today}
Theme: ${theme}

Return ONLY valid JSON:
{
  "date": "${today}",
  "quote": {
    "text": "An inspiring quote appropriate to the ${theme} theme (can be real or AI-generated)",
    "author": "Author name or 'Vizzy AI' if original",
    "imagePrompt": "Beautiful visual poster for this quote about ${theme}, minimalist design, typography art, no text, warm aesthetic"
  },
  "poem": {
    "title": "Poem title",
    "text": "A short original poem (3-4 stanzas, 4 lines each) inspired by the ${theme} theme. Use \\n\\n between stanzas.",
    "imagePrompt": "Dreamy artistic visual for a poem about ${theme}, watercolor painting style, ethereal, beautiful"
  },
  "book": {
    "title": "Book title",
    "author": "Author name",
    "genre": "Genre",
    "reason": "2-3 sentences explaining why this book is perfect for the ${theme} theme today"
  },
  "movie": {
    "title": "Movie title",
    "year": "Release year",
    "genre": "Genre",
    "reason": "2-3 sentences explaining why this film is perfect for the ${theme} theme today"
  }
}

Choose real books and movies that exist. Make everything feel curated and personal.
`.trim();

    const raw = await callLLM(llmPrompt, true);
    const parsed = extractJSON(raw);

    // Generate images for quote and poem (run in parallel)
    const imagePromises = [];
    if (parsed.quote?.imagePrompt) {
      imagePromises.push(
        generateImage(parsed.quote.imagePrompt).then((url) => { parsed.quote.imageUrl = url; })
      );
    }
    if (parsed.poem?.imagePrompt) {
      imagePromises.push(
        generateImage(parsed.poem.imagePrompt).then((url) => { parsed.poem.imageUrl = url; })
      );
    }
    await Promise.allSettled(imagePromises);

    return res.json(parsed);
  } catch (err) {
    console.error("[daily/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// 11. BEFORE-AND-AFTER POSTCARD GENERATOR
// ──────────────────────────────────────────────────────────────────────────────

// Helper for Runware blending
/**
 * Edit/synthesize a room photo with Gemini 2.5 Flash Image (Nano Banana).
 * - primaryBuffer: the room photo (required)
 * - referenceBuffers: array of additional reference image buffers (artwork, style frames, etc.)
 * - prompt: instruction text
 * Returns a Buffer of the edited JPEG/PNG.
 */
async function editImageWithGemini(prompt, primaryBuffer, referenceBuffers = []) {
  const KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!KEY) throw new Error("GOOGLE_API_KEY is required for Gemini image edit.");

  // Normalise primary to JPEG (Gemini handles large images, but normalise to avoid weird formats)
  const primaryJpeg = await sharp(primaryBuffer)
    .resize(1536, 1536, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 92 })
    .toBuffer();

  const parts = [
    { text: prompt },
    {
      inline_data: {
        mime_type: "image/jpeg",
        data: primaryJpeg.toString("base64"),
      },
    },
  ];

  // Accept either a single Buffer (legacy) or an array of Buffers
  const refs = Array.isArray(referenceBuffers)
    ? referenceBuffers.filter(Boolean)
    : referenceBuffers
    ? [referenceBuffers]
    : [];

  for (const buf of refs) {
    const refJpeg = await sharp(buf)
      .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 92 })
      .toBuffer();
    parts.push({
      inline_data: {
        mime_type: "image/jpeg",
        data: refJpeg.toString("base64"),
      },
    });
  }

  // Try the current Nano Banana model, with a preview fallback.
  const models = ["gemini-2.5-flash-image", "gemini-2.5-flash-image-preview"];
  let lastErr = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`;
    const body = {
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        temperature: 0.05,
      },
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        lastErr = new Error(`Gemini ${model} ${res.status}: ${await res.text()}`);
        console.warn("[Gemini Image Edit]", lastErr.message);
        continue;
      }

      const data = await res.json();
      const candidateParts = data.candidates?.[0]?.content?.parts || [];
      const imagePart = candidateParts.find((p) => p.inlineData || p.inline_data);
      const inline = imagePart?.inlineData || imagePart?.inline_data;
      if (!inline?.data) {
        lastErr = new Error(`Gemini ${model} returned no image. Raw: ${JSON.stringify(data).slice(0, 400)}`);
        console.warn("[Gemini Image Edit]", lastErr.message);
        continue;
      }
      return Buffer.from(inline.data, "base64");
    } catch (err) {
      lastErr = err;
      console.warn(`[Gemini Image Edit] ${model} threw:`, err.message);
    }
  }

  throw lastErr || new Error("Gemini image edit failed with no specific error.");
}

async function blendImageWithRunware(compositeBuffer, maskBuffer, prompt, strength = 0.18) {
  const apiKey = process.env.RUNWARE_API_KEY;
  if (!apiKey) return null;

  try {
    const crypto = await import("crypto");
    const uploadTaskUUID = crypto.randomUUID();
    const uploadMaskTaskUUID = crypto.randomUUID();
    const inferenceTaskUUID = crypto.randomUUID();
    
    // We resize the composite buffer to 1248x832 to match the desired model resolution
    const resizedComposite = await sharp(compositeBuffer)
      .resize(1248, 832, { fit: "cover" })
      .jpeg({ quality: 90 })
      .toBuffer();

    const resizedMask = await sharp(maskBuffer)
      .resize(1248, 832, { fit: "cover" })
      .png()
      .toBuffer();

    const dataUri = `data:image/jpeg;base64,${resizedComposite.toString("base64")}`;
    const maskDataUri = `data:image/png;base64,${resizedMask.toString("base64")}`;

    console.log("[Runware Blend] Uploading composite and mask images...");
    const res = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          "taskType": "authentication",
          "apiKey": apiKey
        },
        {
          "taskType": "imageUpload",
          "taskUUID": uploadTaskUUID,
          "image": dataUri
        },
        {
          "taskType": "imageUpload",
          "taskUUID": uploadMaskTaskUUID,
          "image": maskDataUri
        }
      ])
    });

    if (!res.ok) {
      console.warn("[Runware Blend] Upload request failed with status:", res.status);
      return null;
    }

    const uploadRes = await res.json();
    const uploadData = uploadRes.data || [];
    const compositeItem = uploadData.find(d => d.taskUUID === uploadTaskUUID);
    const maskItem = uploadData.find(d => d.taskUUID === uploadMaskTaskUUID);

    const imageUUID = compositeItem?.imageUUID;
    const maskUUID = maskItem?.imageUUID;

    if (!imageUUID || !maskUUID) {
      console.warn("[Runware Blend] No imageUUID or maskUUID returned:", uploadRes);
      return null;
    }

    console.log("[Runware Blend] Images uploaded. UUIDs:", { imageUUID, maskUUID });

    // Call imageInference using FLUX Kontext Dev
    const inferRes = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          "taskType": "authentication",
          "apiKey": apiKey
        },
        {
          "taskType": "imageInference",
          "taskUUID": inferenceTaskUUID,
          "model": "runware:106@1", // FLUX.1 Kontext Dev
          "positivePrompt": prompt,
          "negativePrompt": "blurry, low quality, deformed, extra frames, changed furniture, changed room layout, changed walls, changed ceiling, text, watermark",
          "seedImage": imageUUID,
          "maskImage": maskUUID,
          "strength": strength,
          "cfgScale": 4.5,
          "width": 1248,
          "height": 832,
          "numberResults": 1
        }
      ])
    });

    if (!inferRes.ok) {
      console.warn("[Runware Blend] Inference request failed with status:", inferRes.status);
      return null;
    }

    const inferData = await inferRes.json();
    const finalUrl = inferData.data?.[0]?.imageURL;
    console.log("[Runware Blend] Runware blend completed. URL:", finalUrl);
    return finalUrl;
  } catch (err) {
    console.error("[Runware Blend] Error during Runware blending:", err.message);
  }
  return null;
}

function solveSystem(A, B) {
  const n = 8;
  const M = A.map((row, i) => [...row, B[i]]);

  for (let i = 0; i < n; i++) {
    let maxEl = Math.abs(M[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > maxEl) {
        maxEl = Math.abs(M[k][i]);
        maxRow = k;
      }
    }

    if (maxRow !== i) {
      const temp = M[maxRow];
      M[maxRow] = M[i];
      M[i] = temp;
    }

    if (Math.abs(M[i][i]) < 1e-9) {
      return null; // Singular matrix
    }

    for (let k = i + 1; k < n; k++) {
      const c = -M[k][i] / M[i][i];
      for (let j = i; j <= n; j++) {
        if (i === j) {
          M[k][j] = 0;
        } else {
          M[k][j] += c * M[i][j];
        }
      }
    }
  }

  const X = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    X[i] = M[i][n] / M[i][i];
    for (let k = i - 1; k >= 0; k--) {
      M[k][n] -= M[k][i] * X[i];
    }
  }
  return X;
}

function getInverseHomography(src, dst) {
  const A = [];
  const B = [];

  for (let i = 0; i < 4; i++) {
    const [x, y] = dst[i];
    const [u, v] = src[i];

    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    B.push(u);

    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
    B.push(v);
  }

  return solveSystem(A, B);
}

function bilinearSample(buffer, width, height, channels, u, v) {
  if (u < 0 || u >= width - 1 || v < 0 || v >= height - 1) {
    return [0, 0, 0, 0];
  }

  const u0 = Math.floor(u);
  const u1 = u0 + 1;
  const v0 = Math.floor(v);
  const v1 = v0 + 1;

  const wu1 = u - u0;
  const wu0 = 1 - wu1;
  const wv1 = v - v0;
  const wv0 = 1 - wv1;

  const idx00 = (v0 * width + u0) * channels;
  const idx10 = (v0 * width + u1) * channels;
  const idx01 = (v1 * width + u0) * channels;
  const idx11 = (v1 * width + u1) * channels;

  const res = [];
  for (let c = 0; c < channels; c++) {
    const val =
      wu0 * wv0 * buffer[idx00 + c] +
      wu1 * wv0 * buffer[idx10 + c] +
      wu0 * wv1 * buffer[idx01 + c] +
      wu1 * wv1 * buffer[idx11 + c];
    res.push(Math.round(val));
  }
  return res;
}

async function warpImage(srcBuffer, srcWidth, srcHeight, dstWidth, dstHeight, dstCorners, srcCorners) {
  const coeffs = getInverseHomography(srcCorners, dstCorners);
  if (!coeffs) return null;
  const [a, b, c, d, e, f, g, h] = coeffs;

  let minX = Math.floor(Math.min(...dstCorners.map(p => p[0])));
  let maxX = Math.ceil(Math.max(...dstCorners.map(p => p[0])));
  let minY = Math.floor(Math.min(...dstCorners.map(p => p[1])));
  let maxY = Math.ceil(Math.max(...dstCorners.map(p => p[1])));

  const margin = Math.ceil(Math.max(maxX - minX, maxY - minY) * 0.35);
  minX = Math.max(0, minX - margin);
  maxX = Math.min(dstWidth - 1, maxX + margin);
  minY = Math.max(0, minY - margin);
  maxY = Math.min(dstHeight - 1, maxY + margin);

  const dstBuffer = Buffer.alloc(dstWidth * dstHeight * 4);
  const fadeMargin = 40;

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const den = g * x + h * y + 1;
      if (Math.abs(den) < 1e-6) continue;
      const u = (a * x + b * y + c) / den;
      const v = (d * x + e * y + f) / den;

      if (u >= 0 && u < srcWidth - 1 && v >= 0 && v < srcHeight - 1) {
        const color = bilinearSample(srcBuffer, srcWidth, srcHeight, 4, u, v);
        let fade = 1.0;
        if (u < fadeMargin) fade *= (u / fadeMargin);
        else if (srcWidth - 1 - u < fadeMargin) fade *= ((srcWidth - 1 - u) / fadeMargin);
        if (v < fadeMargin) fade *= (v / fadeMargin);
        else if (srcHeight - 1 - v < fadeMargin) fade *= ((srcHeight - 1 - v) / fadeMargin);

        const dstIdx = (y * dstWidth + x) * 4;
        dstBuffer[dstIdx] = color[0];
        dstBuffer[dstIdx + 1] = color[1];
        dstBuffer[dstIdx + 2] = color[2];
        dstBuffer[dstIdx + 3] = Math.round(color[3] * fade);
      }
    }
  }
  return dstBuffer;
}

router.post("/postcard/generate", upload.fields([{ name: "image", maxCount: 1 }, { name: "frameImage", maxCount: 1 }]), async (req, res) => {
  try {
    const { businessName, frameStyle = "frame1" } = req.body;
    const file = req.files?.image?.[0];
    const frameFile = req.files?.frameImage?.[0];

    if (!file) return res.status(400).json({ error: "Missing space/room image upload" });
    if (!businessName?.trim()) return res.status(400).json({ error: "Missing business name" });

    // Mode determination
    const isMode1 = !!frameFile;
    console.log(`Postcard generation started for: ${businessName} (Mode: ${isMode1 ? 'Mode 1 (Custom Artwork)' : 'Mode 2 (AI Auto Showcase)'}, Frame Style: ${frameStyle})`);

    // Frame style → on-screen content guidance (only the screen content is style-driven; hardware stays premium)
    const STYLE_GUIDE = {
      frame1: { bezel: "rich dark walnut wood with subtle grain", glow: "cool ambient blue glow" },
      frame2: { bezel: "matte charcoal aluminum with brushed finish", glow: "warm sunset orange glow" },
      frame3: { bezel: "light natural oak wood with soft grain", glow: "soft golden ambient glow" },
      frame4: { bezel: "warm maple wood with subtle reddish tone", glow: "bronze ambient accent glow" },
    };
    const styleCfg = STYLE_GUIDE[frameStyle] || STYLE_GUIDE.frame1;

    // ─── Load ONE Decoviz example frame as a style reference ───────────────
    // Sending many reference images pushes Nano Banana into compositing mode
    // (it regenerates the whole scene). One small style reference is enough
    // to convey bezel + halo + shadow without overriding the room photo.
    const FRAME_STYLE_TO_FILE = {
      frame1: "frame1.png",
      frame2: "frame2.png",
      frame3: "frame3.png",
      frame4: "frame4.png",
    };
    const styleFileName = FRAME_STYLE_TO_FILE[frameStyle] || "frame1.png";
    const frameRefBuffers = [];
    try {
      const refPath = path.join(__dirname, "../../deckoviz_web-main/public/frames", styleFileName);
      if (fs.existsSync(refPath)) {
        frameRefBuffers.push(await fs.promises.readFile(refPath));
      }
    } catch (_e) { /* ignore */ }
    console.log(`[postcard/generate] Loaded ${frameRefBuffers.length} Decoviz style reference frame(s).`);

    // ─── Build a focused edit prompt for Gemini 2.5 Flash Image ─────────────
    // Image order:
    //   #1 = room photo (ground truth)
    //   #2 = (Mode 1 only) user artwork to show on screen
    //   LAST = Decoviz hardware style reference (bezel + halo + edges ONLY)
    const styleImageIndex = isMode1 ? 3 : 2;
    const onScreenLine = isMode1
      ? `The screen of the display must show the SECOND image (the user's artwork) as its on-screen content — fit cleanly into the 16:9 screen area.`
      : `The screen of the display shows a tasteful cinematic landscape or abstract artwork (no text, no logos).`;

    const styleRefLine = `IMAGE #${styleImageIndex} is a STYLE REFERENCE ONLY for the Decoviz hardware look — copy ONLY its bezel material/shape, its outer rounded-corner profile, and its warm wide halo backlight. DO NOT copy its room, its wall, its scene, or its on-screen content. The room and scene in the output MUST come entirely from IMAGE #1.`;

    const editPrompt = `Take the first photo (the room in IMAGE #1) and return THE SAME PHOTO unchanged, with one single addition: a wall-mounted Decoviz smart frame mounted on the empty wall. This is a localized inpaint — only the wall region behind the new frame may change.

Keep everything else pixel-identical to IMAGE #1: same camera angle, same crop, same aspect ratio, same dimensions, same furniture in the exact same positions and colors, same windows, same doors, same floor, same ceiling, same wall paint, same lighting and time-of-day, same decor. Do NOT redesign, restyle, modernize, or "improve" the room. Do NOT move, replace, recolor, add or remove any furniture, window, door, plant, or decor item.

${styleRefLine}

The Decoviz frame to add:
- Landscape 16:9 orientation (width ≈ 1.78 × height). Never portrait, never square.
- Premium ${styleCfg.bezel} bezel with clearly visible wood grain (if wooden), about 4-6 cm thick — chunky enough to read as a real picture frame, not a thin TV bezel.
- OUTER corners of the bezel are softly ROUNDED (visible curved corners on all 4 outside corners), matching the reference style.
- A wide, soft, warm ${styleCfg.glow} HALO backlight glowing behind the frame and bleeding 20-40 cm out onto the surrounding wall on ALL FOUR sides. The halo is diffuse and ambient — denser right behind the bezel and fading outward smoothly. Subtly tint the surrounding wall with the glow color. Not neon, not an outline, not a bloom.
- A short soft contact shadow under the bezel consistent with the room's existing light direction.
- Mounted FLUSH and level on the wall — not floating, not tilted.

Frame size and placement:
- Size: width roughly 45-60% of the visible wall width — the frame is a clear focal point on the wall, NOT a tiny TV. Maintain its 16:9 proportions.
- Place it at natural eye level on the most prominent clear wall segment, horizontally centered on that segment when possible.
- Never overlap windows, doors, blinds, mirrors, light fixtures, existing art, or furniture.
- Follow the wall's perspective so it looks physically mounted.

${onScreenLine}

CRITICAL OUTPUT FORMAT: Output ONE photorealistic image with the EXACT SAME aspect ratio, EXACT SAME width:height proportions, and EXACT SAME crop/framing as IMAGE #1. Do NOT change the aspect ratio. Do NOT output a square image if the input is wide. Do NOT output a wide image if the input is tall. Do NOT add padding or letterboxing. Do NOT zoom in or out. Match IMAGE #1's aspect ratio precisely. Do not add a second frame. If no suitable empty wall exists in IMAGE #1, return IMAGE #1 unchanged.`;

    console.log("[postcard/generate] Calling Gemini 2.5 Flash Image to render Decoviz display in-place...");
    let afterImageBuffer = null;
    let reasoningText = "";
    try {
      // Image order sent to Gemini:
      //   Mode 1: [room, user-artwork, decoviz-style-reference]
      //   Mode 2: [room, decoviz-style-reference]
      // The style reference is ONE small frame image, explicitly described in
      // the prompt as STYLE-ONLY so Nano Banana doesn't composite it as a scene.
      const refBuffers = isMode1
        ? [frameFile.buffer, ...frameRefBuffers]
        : [...frameRefBuffers];
      afterImageBuffer = await editImageWithGemini(
        editPrompt,
        file.buffer,
        refBuffers
      );
      reasoningText = `Decoviz display rendered onto the most suitable wall with matching perspective and ${styleCfg.glow}, while preserving the original room photo.`;
      console.log("[postcard/generate] Gemini image edit succeeded.");
    } catch (geminiErr) {
      console.error("[postcard/generate] Gemini image edit failed:", geminiErr.message);
      return res.status(502).json({ error: `AI render failed: ${geminiErr.message}` });
    }

    // Gemini sometimes returns the edited image at a different aspect ratio
    // (e.g. 1:1) than the input — that makes the before/after slider crop the
    // original. Force the AFTER image to match the BEFORE image's exact
    // dimensions so both sides of the comparison line up perfectly.
    const beforeMeta = await sharp(file.buffer).metadata();
    const roomWidth = beforeMeta.width;
    const roomHeight = beforeMeta.height;

    afterImageBuffer = await sharp(afterImageBuffer)
      .resize(roomWidth, roomHeight, { fit: "cover", position: "centre" })
      .jpeg({ quality: 95 })
      .toBuffer();
    const afterMeta = await sharp(afterImageBuffer).metadata();

    // Some legacy variables below were referenced by removed code; keep a stub
    // for compatibility with the postcard-composition step further down.
    const placement = { reasoning: reasoningText };

    /* LEGACY_BLOCK_START
      Analyze this room image for optimal placement of a Deckoviz premium 16:9 cinematic widescreen digital art frame.
      Analyze this room image for optimal placement of a Deckoviz premium 16:9 cinematic widescreen digital art frame.
      
      You must treat this room image as a 3D space, taking into account the depth and perspective angles of the walls.
      
      CRITICAL PLACEMENT RULES:
      1. SOLID WALL ONLY: You MUST place the frame on a solid, flat wall surface (e.g., drywall, concrete, or brick wall segments).
      2. 3D PERSPECTIVE WARP CORNERS: Since the selected wall may be angled relative to the camera (perspective), you must specify the EXACT 4 corners where the frame's BEZEL should lie flat against that wall surface.
         - If the wall recedes to the right (perspective), the right edge must be vertically shorter than the left edge, and the top/bottom lines must slope towards the vanishing point.
         - If the wall recedes to the left, the left edge must be vertically shorter than the right edge.
         - If the wall faces the camera directly (orthogonal/flat wall), the corners should form a perfect, untilted 16:9 widescreen rectangle. The top_left and top_right Y-coordinates MUST be identical (exactly equal, e.g., both y=380, no tilt). The bottom_left and bottom_right Y-coordinates MUST be identical (exactly equal). The left edge X-coordinates must be equal, and the right edge X-coordinates must be equal. The width of the rectangle must be exactly 1.77 times its height (i.e. top_right_x - top_left_x equals 1.77 * (bottom_left_y - top_left_y)).
         - DO NOT introduce slight random tilts, rotations, or offsets. Keeping the painting horizontally leveled on flat walls is critical.
      3. STRICTLY AVOID WINDOWS & BLINDS: Never place the frame over windows, glass panels, window blinds, curtains, or doorways. The frame must not overlap them at all.
      4. NO FURNITURE CLASH: Do not overlap tables, chairs, plants, lamps, or decorative items. The frame should hang cleanly on the wall *above* any furniture, at a natural eye level.
      5. STRICT BOUNDARIES: Ensure the entire frame quadrilateral fits ENTIRELY within the boundaries of the chosen wall segment. Leave some padding on all sides so it does not touch the edges of the wall, window frames, or ceiling.
      6. SCALING: Choose a realistic size. Typically the width should be between 25% to 38% of the total image width (with height scaled to 16:9 ratio).

      Return ONLY valid JSON (normalized 0-1000 scale where x=0 to 1000 and y=0 to 1000 relative to the image size):
      {
        "top_left": [x, y],
        "top_right": [x, y],
        "bottom_right": [x, y],
        "bottom_left": [x, y],
        "reasoning": "Explain exactly which wall segment was chosen, how the 3D perspective tilt/slope was calculated to align with the wall angle, and how we avoided overlap."
      }
    `.trim();

    let placement = {};
    try {
      const visionRaw = await callVisionLLM(visionPrompt, file.buffer, true);
      placement = extractJSON(visionRaw) || {};
      console.log("Placement detected:", placement);
    } catch (visionErr) {
      console.warn("Vision LLM failed, using fallback coordinates:", visionErr.message);
    }

    // Step 2: Prepare Dimensions
    const metadata = await sharp(file.buffer).metadata();
    const roomWidth = metadata.width;
    const roomHeight = metadata.height;

    // Fallback mapping if corners are missing
    let top_left = placement.top_left;
    let top_right = placement.top_right;
    let bottom_right = placement.bottom_right;
    let bottom_left = placement.bottom_left;

    if (!top_left || !top_right || !bottom_right || !bottom_left) {
      console.log("Missing corners in Vision response, using center/width fallback...");
      const cx = 500;
      const cy = 400;
      const w = 280;
      const h = (w * 9) / 16;
      top_left = [cx - w/2, cy - h/2];
      top_right = [cx + w/2, cy - h/2];
      bottom_right = [cx + w/2, cy + h/2];
      bottom_left = [cx - w/2, cy + h/2];
    }

    // Scale the detected normalized coordinates to pixel coordinates
    const pTL = [ (top_left[0] / 1000) * roomWidth, (top_left[1] / 1000) * roomHeight ];
    const pTR = [ (top_right[0] / 1000) * roomWidth, (top_right[1] / 1000) * roomHeight ];
    const pBR = [ (bottom_right[0] / 1000) * roomWidth, (bottom_right[1] / 1000) * roomHeight ];
    const pBL = [ (bottom_left[0] / 1000) * roomWidth, (bottom_left[1] / 1000) * roomHeight ];

    // Calculate center of the quadrilateral
    const cx = (pTL[0] + pTR[0] + pBR[0] + pBL[0]) / 4;
    const cy = (pTL[1] + pTR[1] + pBR[1] + pBL[1]) / 4;

    // Calculate current width and height in pixels
    const wTop = Math.hypot(pTR[0] - pTL[0], pTR[1] - pTL[1]);
    const wBottom = Math.hypot(pBR[0] - pBL[0], pBR[1] - pBL[1]);
    const avgW = (wTop + wBottom) / 2;

    const hLeft = Math.hypot(pBL[0] - pTL[0], pBL[1] - pTL[1]);
    const hRight = Math.hypot(pBR[0] - pTR[0], pBR[1] - pTR[1]);
    const avgH = (hLeft + hRight) / 2;

    // Correct height to maintain 16:9 widescreen aspect ratio on the wall (avgW / avgH = 16 / 9)
    const targetH = (avgW * 9) / 16;
    const scaleY = targetH / avgH;
    pTL[1] = cy + (pTL[1] - cy) * scaleY;
    pTR[1] = cy + (pTR[1] - cy) * scaleY;
    pBR[1] = cy + (pBR[1] - cy) * scaleY;
    pBL[1] = cy + (pBL[1] - cy) * scaleY;

    // Boundary check: if any corner falls outside the image, scale the quadrilateral down from its center
    let minY = Math.min(pTL[1], pTR[1], pBR[1], pBL[1]);
    let maxY = Math.max(pTL[1], pTR[1], pBR[1], pBL[1]);
    let minX = Math.min(pTL[0], pTR[0], pBR[0], pBL[0]);
    let maxX = Math.max(pTL[0], pTR[0], pBR[0], pBL[0]);

    let fitScale = 1.0;
    if (minY < 10) fitScale = Math.min(fitScale, (cy - 10) / (cy - minY));
    if (maxY > roomHeight - 10) fitScale = Math.min(fitScale, (roomHeight - 10 - cy) / (maxY - cy));
    if (minX < 10) fitScale = Math.min(fitScale, (cx - 10) / (cx - minX));
    if (maxX > roomWidth - 10) fitScale = Math.min(fitScale, (roomWidth - 10 - cx) / (maxX - cx));

    if (fitScale < 1.0) {
      console.log(`Scaling frame down by factor of ${fitScale.toFixed(3)} to safely fit inside room boundaries...`);
      pTL[0] = cx + (pTL[0] - cx) * fitScale;
      pTL[1] = cy + (pTL[1] - cy) * fitScale;
      pTR[0] = cx + (pTR[0] - cx) * fitScale;
      pTR[1] = cy + (pTR[1] - cy) * fitScale;
      pBR[0] = cx + (pBR[0] - cx) * fitScale;
      pBR[1] = cy + (pBR[1] - cy) * fitScale;
      pBL[0] = cx + (pBL[0] - cx) * fitScale;
      pBL[1] = cy + (pBL[1] - cy) * fitScale;
    }

    const dstCorners = [pTL, pTR, pBR, pBL];

    let artworkBuffer;
    if (isMode1) {
      artworkBuffer = frameFile.buffer;
    } else {
      console.log("Mode 2: AI Auto Showcase (generating premium artwork)...");
      try {
        const artPrompt = "A luxury gallery-quality abstract painting, contemporary fine art style, vibrant Pantone color palette, 16:9 aspect ratio";
        const artUrl = await generateImage(artPrompt);
        if (artUrl) {
          const artRes = await fetch(artUrl);
          if (artRes.ok) {
            artworkBuffer = Buffer.from(await artRes.arrayBuffer());
            console.log("Successfully generated showcase artwork via Replicate.");
          }
        }
      } catch (artErr) {
        console.warn("Failed to generate artwork via Replicate, using default showcase:", artErr.message);
      }

      if (!artworkBuffer) {
        const fallbackPath = path.join(__dirname, "../../deckoviz_web-main/public/images/about3.png");
        if (fs.existsSync(fallbackPath)) {
          artworkBuffer = await fs.promises.readFile(fallbackPath);
          console.log("Using default local showcase artwork about3.png");
        } else {
          artworkBuffer = await sharp({
            create: {
              width: 1500,
              height: 800,
              channels: 3,
              background: { r: 212, g: 175, b: 55 }
            }
          }).png().toBuffer();
        }
      }
    }

    // ─── Build frame programmatically (no PNG assets) ──────────────────────────
    const cfg = FRAME_CONFIGS[frameStyle] || FRAME_CONFIGS.frame1;
    const W = cfg.canvasW;  // 1200
    const H = cfg.canvasH;  // 1200
    const pad = 120;        // 120px padding on all sides for glow and shadow bleed (no clipping!)
    const svgW = W + 2 * pad;
    const svgH = H + 2 * pad;

    const bz = Math.round(cfg.bezelFraction * W);          // outer bezel thickness in px
    const mt = Math.round(cfg.matteFraction * W);          // matte reveal thickness in px
    const cr = cfg.cornerRadius;                           // corner radius for bezel rect

    // Artwork area (inner screen) — centred in canvas with bezel + matte insets + padding
    const screenX  = pad + bz + mt;
    const screenY  = pad + bz + mt;
    const screenW  = W - 2 * (bz + mt);
    const screenH  = H - 2 * (bz + mt);

    console.log(`Drawing programmatic square frame (${cfg.name}) — canvas ${W}×${H}, bezel ${bz}px, screen ${screenW}×${screenH}...`);

    // 1. Scale + crop artwork to fill the screen region exactly
    const artResized = await sharp(artworkBuffer)
      .resize(screenW, screenH, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 93 })
      .toBuffer();

    // 2. Build linear gradient stops SVG string for the bezel
    const gStops = cfg.bezelGradient.stops
      .map(s => `<stop offset="${s.offset}" stop-color="${s.color}"/>`)
      .join('');

    // 3. Assemble the full frame SVG layers
    //    Layer order (bottom to top):
    //      a) transparent background
    //      b) drop shadow behind bezel
    //      c) outer bezel rect (wood/metal gradient)
    //      d) inner highlight strip (top edge specular)
    //      e) matte reveal rect (dark inner border)
    //      f) artwork  ← composited separately as a PNG because SVG can't embed Buffer
    //      g) thin inset gloss border
    //      h) backlight LED glow halo (outside bezel, blurred)

    const shadowBleed = Math.round(bz * 0.6);
    const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}">
  <defs>
    <!-- Bezel wood/metal gradient (left → right) -->
    <linearGradient id="bz" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      ${gStops}
    </linearGradient>
    <!-- Specular sheen on top edge -->
    <linearGradient id="spec" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
    <!-- Inner screen matte gradient (dark vignette at edges) -->
    <radialGradient id="vign" cx="50%" cy="50%" r="50%">
      <stop offset="75%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.35)"/>
    </radialGradient>
    <!-- Drop shadow filter behind bezel -->
    <filter id="dsf" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="${Math.round(bz * 0.4)}" stdDeviation="${cfg.shadowBlur}" flood-color="rgba(0,0,0,${cfg.shadowOpacity})"/>
    </filter>
    <!-- Backlight ambient glow filter -->
    <filter id="gwf" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${cfg.glowBlur}"/>
    </filter>
  </defs>

  <!-- Backlight LED halo — sits BEHIND the bezel, bleeds outward into the padding region -->
  <rect
    x="${pad - shadowBleed}" y="${pad - shadowBleed}"
    width="${W + shadowBleed * 2}" height="${H + shadowBleed * 2}"
    rx="${cr + bz}" ry="${cr + bz}"
    fill="${cfg.backlight_color}" opacity="${cfg.glowOpacity}"
    filter="url(#gwf)"
  />

  <!-- Outer bezel + drop shadow -->
  <rect
    x="${pad + bz * 0.5}" y="${pad + bz * 0.5}"
    width="${W - bz}" height="${H - bz}"
    rx="${cr}" ry="${cr}"
    fill="url(#bz)"
    filter="url(#dsf)"
  />

  <!-- Specular top-edge highlight on bezel -->
  <rect
    x="${pad + bz * 0.5}" y="${pad + bz * 0.5}"
    width="${W - bz}" height="${bz * 1.2}"
    rx="${cr}" ry="${cr}"
    fill="url(#spec)"
  />

  <!-- Matte reveal inner border (thin dark frame around screen) -->
  <rect
    x="${pad + bz}" y="${pad + bz}"
    width="${W - 2 * bz}" height="${H - 2 * bz}"
    rx="${Math.max(1, cr - 2)}" ry="${Math.max(1, cr - 2)}"
    fill="${cfg.matteColor}"
  />
</svg>`;

    // 4. Render the base frame (without artwork yet)
    const baseFramePng = await sharp(Buffer.from(frameSvg))
      .png()
      .toBuffer();

    // 5. Vignette overlay on screen
    const vignSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${screenW}" height="${screenH}">
  <defs>
    <radialGradient id="v" cx="50%" cy="50%" r="70%">
      <stop offset="70%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.28)"/>
    </radialGradient>
  </defs>
  <rect width="${screenW}" height="${screenH}" fill="url(#v)"/>
</svg>`;

    // 6. Composite: base frame → artwork → vignette → thin gloss border
    const glossBorderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}">
  <rect x="${screenX - 1}" y="${screenY - 1}"
    width="${screenW + 2}" height="${screenH + 2}"
    fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"
    rx="2" ry="2"/>
</svg>`;

    const flatFrameComposite = await sharp(baseFramePng)
      .composite([
        // Artwork fills the screen area exactly
        { input: artResized,                          top: screenY, left: screenX },
        // Vignette darkens screen edges slightly
        { input: Buffer.from(vignSvg),                top: screenY, left: screenX },
        // Subtle gloss border around screen
        { input: Buffer.from(glossBorderSvg),         top: 0,       left: 0 }
      ])
      .png()
      .toBuffer();

    // ─── Perspective-warp the flat composite onto the room wall ─────────────────
    // src corners = the outer bezel corners in the padded SVG coordinates
    console.log("Warping flat frame composite with shadows and glow to room perspective...");
    const srcCorners = [
      [pad, pad],
      [pad + W, pad],
      [pad + W, pad + H],
      [pad, pad + H]
    ];

    const flatFrameCompositeRaw = await sharp(flatFrameComposite).ensureAlpha().raw().toBuffer();
    const warpedDisplayRaw = await warpImage(
      flatFrameCompositeRaw,
      svgW,
      svgH,
      roomWidth,
      roomHeight,
      dstCorners,
      srcCorners
    );

    // Paste onto the room image
    const compositeBuffer = await sharp(file.buffer)
      .composite([
        {
          input: warpedDisplayRaw,
          raw: { width: roomWidth, height: roomHeight, channels: 4 },
          top: 0,
          left: 0
        }
      ])
      .jpeg({ quality: 95 })
      .toBuffer();

    // Inpainting Prompt & Strength for the Runware blend
    const inpaintingPrompt = `You are an advanced interior visualization AI for Decoviz Space Labs.

Your task is to intelligently generate and place a premium Decoviz smart frame/device naturally onto the wall of the uploaded room image.

IMPORTANT:
The uploaded room image is the PRIMARY source of truth and must remain almost completely unchanged.

====================================================
CRITICAL FRAME GENERATION RULE
====================================================

DO NOT directly copy, paste, recreate, or distort the provided reference frame images.

The provided frame examples are ONLY style references.

You must:
- understand the design language
- understand the premium frame style
- understand the hardware aesthetics
- understand the glowing ambient border style

Then generate a NEW realistic Decoviz frame/device naturally matching that design language.

DO NOT:
- stretch the reference image
- squash the frame
- distort aspect ratio
- directly paste the reference example
- create warped displays
- create miniature frames
- recreate the entire showcase image

The final generated frame should look:
- clean
- premium
- realistic
- proportional
- physically believable

====================================================
MAIN GOAL
====================================================

Generate a luxury wall-mounted Decoviz smart display that feels naturally integrated into the uploaded room.

The final output should resemble:
- premium Samsung Frame TV marketing
- luxury smart display visualization
- high-end architectural photography

NOT:
- AI collage
- pasted overlay
- distorted mockup
- stretched image

====================================================
STRICT ROOM PRESERVATION RULES
====================================================

Preserve:
- room architecture
- walls
- floor
- lighting
- furniture
- textures
- shadows
- room geometry
- camera perspective
- decor
- ceiling
- windows

The room itself must remain almost identical.

DO NOT redesign the room.

====================================================
ONLY ALLOWED MODIFICATION
====================================================

The ONLY allowed modification:
- adding a premium Decoviz frame naturally onto the wall

Nothing else should change.

====================================================
FRAME DESIGN REQUIREMENTS
====================================================

The generated Decoviz frame should:

- look premium and modern
- have realistic hardware thickness
- have elegant rounded corners
- have a clean luxury border
- include subtle warm ambient backlighting
- appear like a real mounted smart display
- maintain proper proportions
- maintain realistic aspect ratio
- look physically manufactured
- look high-end and cinematic

The frame should resemble:
- luxury smart TV
- premium digital artwork display
- modern architectural display system

====================================================
FRAME POSITIONING RULES
====================================================

The frame must:
- be centered naturally on the wall
- appear at realistic viewing height
- avoid ceilings
- avoid corners
- avoid awkward placements
- follow wall perspective
- follow room depth
- follow room lighting

====================================================
IMPORTANT PERSPECTIVE RULES
====================================================

The frame must:
- align naturally with wall angle
- match perspective correctly
- cast realistic contact shadows
- appear physically attached to the wall
- integrate naturally into the environment

DO NOT:
- create floating appearance
- create distorted perspective
- create stretched geometry

====================================================
REFERENCE IMAGE RULES
====================================================

The provided Decoviz example images are ONLY inspiration references.

Extract ONLY:
- style
- hardware aesthetics
- glow style
- premium look
- border design

DO NOT:
- reuse the full reference image
- paste the showcase scene
- recreate the sample room
- distort the example frame

Generate a NEW clean premium frame inspired by the references.

====================================================
VISUAL QUALITY TARGET
====================================================

The output should be:
- photorealistic
- cinematic
- physically believable
- architecturally accurate
- luxury-grade

The result should look indistinguishable from a professionally photographed real interior.

====================================================
NEGATIVE INSTRUCTIONS
====================================================

Avoid:
- stretched frames
- distorted displays
- pasted overlays
- floating frames
- tiny displays
- oversized displays
- warped geometry
- fake lighting
- room redesign
- CGI look
- cartoon look
- blurry output
- low-quality rendering
- duplicated reference images
- distorted aspect ratio
- malformed hardware

====================================================
FINAL BEHAVIOR
====================================================

The AI should behave like:
- a luxury architectural visualization system
- an intelligent smart-display placement engine

NOT:
- a generic image generator
- a collage creator
- a room redesign AI

The generated Decoviz frame should feel naturally built into the uploaded room while preserving the original environment almost perfectly.`.trim();
    // Higher strength so FLUX has enough creative latitude to generate a clean
    // premium frame rather than just edge-blending the warped composite
    const strength = 0.35;

    // Step 3: Create dilated mask for Runware Inpainting
    const roomPolyPoints = `${dstCorners[0][0]},${dstCorners[0][1]} ${dstCorners[1][0]},${dstCorners[1][1]} ${dstCorners[2][0]},${dstCorners[2][1]} ${dstCorners[3][0]},${dstCorners[3][1]}`;
    const roomMaskSvg = `
      <svg width="${roomWidth}" height="${roomHeight}">
        <polygon points="${roomPolyPoints}" fill="white" stroke="white" stroke-width="80" stroke-linejoin="round" />
      </svg>
    `;
    const roomMaskBuffer = await sharp({
      create: {
        width: roomWidth,
        height: roomHeight,
        channels: 3,
        background: { r: 0, g: 0, b: 0 }
      }
    })
    .composite([{ input: Buffer.from(roomMaskSvg), top: 0, left: 0 }])
    .png()
    .toBuffer();

    let afterImageBuffer = compositeBuffer;

    // Step 4: Seamlessly blend/generate using Runware
    if (process.env.RUNWARE_API_KEY) {
      try {
        console.log(`Generating frame using Runware inpainting (strength: ${strength})...`);
        const blendedUrl = await blendImageWithRunware(compositeBuffer, roomMaskBuffer, inpaintingPrompt, strength);
        if (blendedUrl) {
          const blendedRes = await fetch(blendedUrl);
          if (blendedRes.ok) {
            afterImageBuffer = Buffer.from(await blendedRes.arrayBuffer());
            console.log("Successfully retrieved AI-generated frame from Runware.");
          }
        }
      } catch (blendErr) {
        console.error("Runware frame generation failed, falling back to sharp composite:", blendErr.message);
      }
    } else {
      console.warn("RUNWARE_API_KEY not found. Frame could not be generated.");
    }
    LEGACY_BLOCK_END */

    // Step 5: Create the Final Postcard (Side-by-Side, uncropped)
    const postcardHeight = 1080;
    const postcardHalfWidth = Math.round(postcardHeight * (roomWidth / roomHeight));
    const postcardWidth = postcardHalfWidth * 2;

    const beforePart = await sharp(file.buffer)
      .resize(postcardHalfWidth, postcardHeight)
      .toBuffer();
    
    const afterPart = await sharp(afterImageBuffer)
      .resize(postcardHalfWidth, postcardHeight)
      .toBuffer();

    const escapedName = businessName.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[m]));

    const labelsSvg = `
      <svg width="${postcardWidth}" height="${postcardHeight}">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght=700&amp;family=Dancing+Script:wght@700&amp;display=swap');
          .title { fill: white; font-family: 'Comfortaa', sans-serif; font-size: 64px; font-weight: 700; text-anchor: middle; filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.5)); }
          .tagline { fill: white; font-family: 'Dancing Script', cursive; font-size: 32px; text-anchor: middle; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5)); }
          .label { fill: white; font-family: sans-serif; font-size: 24px; font-weight: bold; text-anchor: middle; }
          .label-bg { fill: rgba(0,0,0,0.6); rx: 12; }
          .brand-bg { fill: rgba(0,0,0,0.3); filter: blur(15px); }
        </style>
        
        <rect x="${postcardWidth/2 - 450}" y="15" width="900" height="150" class="brand-bg" rx="20" />
        <text x="${postcardWidth/2}" y="85" class="title">Deckoviz</text>
        <text x="${postcardWidth/2}" y="130" class="tagline">${escapedName}, experience your space transformed with Deckoviz DASP</text>

        <rect x="40" y="${postcardHeight - 80}" width="140" height="50" class="label-bg" />
        <text x="110" y="${postcardHeight - 45}" class="label">BEFORE</text>

        <rect x="${postcardWidth - 180}" y="${postcardHeight - 80}" width="140" height="50" class="label-bg" />
        <text x="${postcardWidth - 110}" y="${postcardHeight - 45}" class="label">AFTER</text>

        <rect x="0" y="0" width="${postcardWidth}" height="${postcardHeight}" fill="none" stroke="white" stroke-width="15" opacity="0.2" />
      </svg>
    `;

    const finalBuffer = await sharp({
      create: { width: postcardWidth, height: postcardHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } }
    })
    .composite([
      { input: beforePart, top: 0, left: 0 },
      { input: afterPart, top: 0, left: postcardHalfWidth },
      { input: Buffer.from(labelsSvg), top: 0, left: 0 }
    ])
    .jpeg({ quality: 95 })
    .toBuffer();

    const publicDir = path.join(__dirname, "../public/generated");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    const timestamp = Date.now();
    const fileName = `postcard_premium_${timestamp}.jpg`;
    const afterFileName = `after_${timestamp}.jpg`;
    const beforeFileName = `before_${timestamp}.jpg`;

    fs.writeFileSync(path.join(publicDir, fileName), finalBuffer);
    fs.writeFileSync(path.join(publicDir, afterFileName), afterImageBuffer);
    const beforeBuffer = await sharp(file.buffer).jpeg({ quality: 95 }).toBuffer();
    fs.writeFileSync(path.join(publicDir, beforeFileName), beforeBuffer);

    const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
    return res.json({
      success: true,
      imageUrl: `${baseUrl}/generated/${fileName}`,
      afterUrl: `${baseUrl}/generated/${afterFileName}`,
      beforeUrl: `${baseUrl}/generated/${beforeFileName}`,
      reasoning: placement.reasoning || "Using fallback placement coordinates."
    });
  } catch (err) {
    console.error("[postcard/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
