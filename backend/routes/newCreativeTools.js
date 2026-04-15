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
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
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

async function generateImage(prompt) {
  const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_TOKEN) return null;

  try {
    const replicate = new Replicate({ auth: REPLICATE_TOKEN });
    // Using SDXL Lightning for speed
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          prompt,
          negative_prompt: "blurry, low quality, deformed, text, watermark",
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
// 11. BEFORE-AND-AFTER POSTCARD GENERATOR  (Premium AI Pipeline)
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Step 1 — Analyze the uploaded room photo with Gemini Vision.
 * Returns structured JSON about the interior style, wall, palette, lighting,
 * and business vibe so every downstream prompt is context-aware.
 */
async function analyzeRoomWithVision(imageBuffer) {
  const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!GEMINI_KEY) {
    console.warn("No Gemini key — falling back to default room analysis");
    return null;
  }

  try {
    const base64Image = imageBuffer.toString("base64");
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

    const body = {
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },
            {
              text: `You are a professional interior design analyst. Analyze this room photo and return ONLY valid JSON with exactly these keys (no markdown, no explanation):

{
  "interiorStyle": "one of: modern, rustic, luxury, cozy, industrial, minimalist, bohemian, scandinavian, traditional, eclectic",
  "wallColor": "the dominant wall color as a descriptive name, e.g. warm beige, cool grey, off-white",
  "wallTexture": "one of: smooth painted, textured plaster, brick, wood paneling, concrete, wallpaper, stone",
  "colorPalette": ["list 4-5 dominant colors in the scene as descriptive names"],
  "lightingType": "one of: warm natural, cool natural, warm artificial, cool artificial, mixed ambient, dramatic spotlight",
  "lightingDirection": "one of: left, right, overhead, diffused, window-left, window-right",
  "roomType": "e.g. living room, office, café, restaurant, bedroom, lobby, gallery",
  "mood": "one of: sophisticated, cozy, energetic, serene, dramatic, playful, professional",
  "bestWallForFrame": "describe the largest empty wall area suitable for hanging a frame",
  "artworkRecommendation": "describe the ideal artwork style and colors that would complement this specific interior"
}`,
            },
          ],
        },
      ],
      generationConfig: { responseMimeType: "application/json" },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const parsed = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] || "{}");
      console.log("[postcard] Room analysis:", JSON.stringify(parsed, null, 2));
      return parsed;
    }
    console.warn("[postcard] Gemini Vision failed:", await res.text());
  } catch (err) {
    console.error("[postcard] Room analysis error:", err.message);
  }
  return null;
}

/**
 * Build the default room analysis when Gemini Vision is unavailable.
 */
function getDefaultRoomAnalysis() {
  return {
    interiorStyle: "modern",
    wallColor: "warm beige",
    wallTexture: "smooth painted",
    colorPalette: ["warm beige", "soft white", "charcoal", "natural wood", "sage green"],
    lightingType: "warm natural",
    lightingDirection: "diffused",
    roomType: "living room",
    mood: "sophisticated",
    bestWallForFrame: "the main wall behind the seating area",
    artworkRecommendation: "abstract contemporary art with warm earth tones and gold accents",
  };
}

/**
 * Step 2 — Generate a gallery-quality artwork via text-to-image that
 * matches the analysed interior style, palette, and mood.
 */
async function generateContextAwareArtwork(roomAnalysis) {
  const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_TOKEN) return null;

  // Map interior styles to art styles
  const artStyleMap = {
    modern:       "contemporary abstract expressionism with bold geometric forms",
    rustic:       "impressionist landscape painting with rich earth tones and natural textures",
    luxury:       "large-scale abstract art with metallic gold leaf, deep jewel tones, and sweeping brushstrokes",
    cozy:         "warm toned impressionist still life with soft edges and intimate lighting",
    industrial:   "urban contemporary mixed media art with raw textures and metallic elements",
    minimalist:   "zen-inspired minimal abstract with negative space and subtle ink wash",
    bohemian:     "vibrant mixed-media collage with rich patterns and warm saturated colors",
    scandinavian: "Nordic abstract with muted pastels, clean lines, and organic shapes",
    traditional:  "classical oil painting style with rich depth, warm glazing and dramatic chiaroscuro",
    eclectic:     "bold pop-art inspired contemporary piece with vivid complementary colors",
  };

  const artStyle = artStyleMap[roomAnalysis.interiorStyle] || artStyleMap.modern;
  const paletteStr = (roomAnalysis.colorPalette || []).join(", ");

  const artworkPrompt = `A stunning gallery-quality fine art painting, ${artStyle}. Color palette complements ${paletteStr}. Masterful technique, museum-worthy, richly textured with visible brushstrokes, ${roomAnalysis.mood} atmosphere. Professional art photography of the painting, perfectly lit, ultra high resolution, 8K detail. No frame, no wall, just the artwork itself on a clean background.`;

  try {
    console.log("[postcard] Generating context-aware artwork...");
    const replicate = new Replicate({ auth: REPLICATE_TOKEN });
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          prompt: artworkPrompt,
          negative_prompt: "blurry, low quality, deformed, text, watermark, frame, wall, room, ugly, amateur, generic clip art",
          width: 1024,
          height: 768,
        },
      }
    );
    const url = Array.isArray(output) ? output[0] : output;
    console.log("[postcard] Artwork generated:", url);
    return url;
  } catch (err) {
    console.error("[postcard] Artwork generation error:", err.message);
  }
  return null;
}

/**
 * Step 3 — Enhanced Image-to-Image transformation with a context-aware
 * prompt built from the room analysis. Uses lower prompt_strength to
 * preserve the room while adding the frame + backlighting convincingly.
 */
async function generatePremiumTransformation(imageBuffer, roomAnalysis, artworkDescription) {
  const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_TOKEN) return null;

  try {
    console.log("[postcard] Starting premium img2img transformation...");
    const replicate = new Replicate({ auth: REPLICATE_TOKEN });

    // Resize for SDXL
    const resizedBuffer = await sharp(imageBuffer)
      .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();

    const dataUri = `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;

    // Build a richly detailed, context-aware transformation prompt
    const prompt = [
      `A photorealistic interior photograph of the exact same ${roomAnalysis.roomType} with identical furniture and layout,`,
      `but now featuring a premium Deckoviz DASP digital art frame mounted naturally on ${roomAnalysis.bestWallForFrame || "the main wall"}.`,
      `The frame has sleek ${roomAnalysis.interiorStyle === "rustic" ? "natural oak" : roomAnalysis.interiorStyle === "luxury" ? "brushed gold" : "matte black"} edges with modern premium finish, realistic 3D depth, subtle cast shadows.`,
      `Inside the frame: a breathtaking ${artworkDescription || "gallery-quality contemporary abstract artwork with sophisticated colors"}.`,
      `Behind the frame: soft warm ambient LED backlighting creating a cinematic ${roomAnalysis.lightingType === "cool natural" ? "cool-white" : "warm golden"} glow that diffuses naturally onto the ${roomAnalysis.wallColor} ${roomAnalysis.wallTexture} wall.`,
      `The wall has slightly richer texture, the room lighting feels warmer and more cinematic with enhanced depth and contrast.`,
      `The overall atmosphere is ${roomAnalysis.mood}, luxurious, high-end interior design magazine quality.`,
      `${roomAnalysis.lightingDirection} lighting with natural shadows. Photorealistic, 8K quality, architectural photography.`,
    ].join(" ");

    const output = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      {
        input: {
          image: dataUri,
          prompt,
          prompt_strength: 0.38,
          negative_prompt: "blurry, low quality, deformed, text, watermark, distorted furniture, changed room layout, extra windows, multiple frames, cartoon, painting style, oversaturated, overexposed, different room, different furniture arrangement, people, animals",
          num_outputs: 1,
          guidance_scale: 8.5,
          num_inference_steps: 40,
        },
      }
    );

    const url = Array.isArray(output) ? output[0] : output;
    console.log("[postcard] Premium transformation complete:", url);
    return url;
  } catch (err) {
    console.error("[postcard] Premium transformation error:", err);
  }
  return null;
}

/**
 * Step 4 — Post-process the "After" image with Sharp:
 *  • Slightly boost warmth and contrast for a cinematic luxury feel
 *  • Enhance saturation subtly
 *  • Apply gentle sharpening for perceived quality
 */
async function postProcessAfterImage(afterBuffer) {
  try {
    return await sharp(afterBuffer)
      // Subtle warmth boost: shift toward golden amber tones
      .modulate({
        brightness: 1.04,    // +4% brightness
        saturation: 1.12,    // +12% saturation for richer colors
      })
      // Linear contrast bump
      .linear(1.08, -(128 * 0.08))   // gentle S-curve equivalent
      // Sharpen for perceived crispness
      .sharpen({
        sigma: 0.8,
        m1: 0.6,   // flat areas
        m2: 1.2,   // jagged areas (edges)
      })
      .jpeg({ quality: 95 })
      .toBuffer();
  } catch (err) {
    console.warn("[postcard] Post-processing failed, using raw buffer:", err.message);
    return afterBuffer;
  }
}

router.post("/postcard/generate", upload.single("image"), async (req, res) => {
  try {
    const { businessName } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "Missing image upload" });
    if (!businessName?.trim()) return res.status(400).json({ error: "Missing business name" });

    console.log(`\n[postcard] ═══════════════════════════════════════`);
    console.log(`[postcard] Starting premium pipeline for "${businessName}"`);
    console.log(`[postcard] ═══════════════════════════════════════\n`);

    // ── Step 1: Analyze the room with Gemini Vision ────────────────────────
    console.log("[postcard] Step 1/5 — Analyzing room with AI Vision...");
    let roomAnalysis = await analyzeRoomWithVision(file.buffer);
    if (!roomAnalysis || !roomAnalysis.interiorStyle) {
      console.log("[postcard] Vision unavailable, using intelligent defaults");
      roomAnalysis = getDefaultRoomAnalysis();
    }

    // ── Step 2: Generate context-aware artwork ─────────────────────────────
    console.log("[postcard] Step 2/5 — Generating gallery-quality artwork...");
    const artworkUrl = await generateContextAwareArtwork(roomAnalysis);
    const artworkDescription = roomAnalysis.artworkRecommendation ||
      `${roomAnalysis.interiorStyle} abstract art with sophisticated textures`;

    // ── Step 3: Premium img2img transformation ─────────────────────────────
    console.log("[postcard] Step 3/5 — Applying premium AI transformation...");
    const afterImageUrl = await generatePremiumTransformation(
      file.buffer,
      roomAnalysis,
      artworkDescription
    );
    if (!afterImageUrl) throw new Error("Failed to generate 'After' image transformation.");

    // ── Step 4: Post-process for cinematic warmth ──────────────────────────
    console.log("[postcard] Step 4/5 — Post-processing for cinematic quality...");
    const rawAfterRes = await fetch(afterImageUrl);
    const rawAfterBuffer = Buffer.from(await rawAfterRes.arrayBuffer());
    const enhancedAfterBuffer = await postProcessAfterImage(rawAfterBuffer);

    // ── Step 5: Compose the final postcard ─────────────────────────────────
    console.log("[postcard] Step 5/5 — Composing final premium postcard...");
    const width = 1920;
    const height = 1080;
    const halfWidth = width / 2;

    // Resize original and enhanced-after to fit halves
    const beforePart = await sharp(file.buffer)
      .resize(halfWidth, height, { fit: "cover" })
      .toBuffer();

    const afterPart = await sharp(enhancedAfterBuffer)
      .resize(halfWidth, height, { fit: "cover" })
      .toBuffer();

    // Escape business name for SVG
    const escapedBusinessName = businessName
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    // Premium SVG overlay with elegant design
    const labelsSvg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(0,0,0,0.6)" />
            <stop offset="100%" stop-color="rgba(0,0,0,0)" />
          </linearGradient>
          <linearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(0,0,0,0)" />
            <stop offset="100%" stop-color="rgba(0,0,0,0.5)" />
          </linearGradient>
          <linearGradient id="dividerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(255,255,255,0)" />
            <stop offset="30%" stop-color="rgba(255,255,255,0.7)" />
            <stop offset="70%" stop-color="rgba(255,255,255,0.7)" />
            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        
        <!-- Top gradient overlay for text readability -->
        <rect x="0" y="0" width="${width}" height="180" fill="url(#topGrad)" />
        
        <!-- Bottom gradient overlay for labels -->
        <rect x="0" y="${height - 120}" width="${width}" height="120" fill="url(#bottomGrad)" />

        <!-- Center divider line -->
        <rect x="${halfWidth - 1}" y="0" width="2" height="${height}" fill="url(#dividerGrad)" />

        <!-- Branding Top Center -->
        <text x="${width / 2}" y="55" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="bold" text-anchor="middle" filter="url(#glow)" letter-spacing="6">DECKOVIZ</text>
        <text x="${width / 2}" y="90" fill="rgba(255,255,255,0.85)" font-family="Georgia, serif" font-size="20" font-style="italic" text-anchor="middle">${escapedBusinessName} — Reimagined with Deckoviz DASP</text>

        <!-- Before Label -->
        <rect x="30" y="${height - 75}" width="130" height="44" rx="22" fill="rgba(0,0,0,0.5)" />
        <text x="95" y="${height - 46}" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="3">BEFORE</text>

        <!-- After Label -->
        <rect x="${width - 160}" y="${height - 75}" width="130" height="44" rx="22" fill="rgba(212,175,55,0.7)" />
        <text x="${width - 95}" y="${height - 46}" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="3">AFTER</text>

        <!-- Subtle inner border with rounded corners -->
        <rect x="8" y="8" width="${width - 16}" height="${height - 16}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" rx="8" />
      </svg>
    `;

    // Final composition
    const finalBuffer = await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    })
      .composite([
        { input: beforePart, top: 0, left: 0 },
        { input: afterPart, top: 0, left: halfWidth },
        { input: Buffer.from(labelsSvg), top: 0, left: 0 },
      ])
      .jpeg({ quality: 95 })
      .toBuffer();

    // Save to local public folder
    const publicDir = path.join(__dirname, "../public/generated");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

    const fileName = `postcard_${Date.now()}.jpg`;
    const filePath = path.join(publicDir, fileName);
    fs.writeFileSync(filePath, finalBuffer);

    const baseUrl = process.env.BACKEND_URL || "http://localhost:5000";

    console.log(`\n[postcard] ✅ Premium postcard ready: ${fileName}`);
    console.log(`[postcard] Room style detected: ${roomAnalysis.interiorStyle}`);
    console.log(`[postcard] Mood: ${roomAnalysis.mood}`);
    console.log(`[postcard] ═══════════════════════════════════════\n`);

    return res.json({
      success: true,
      imageUrl: `${baseUrl}/generated/${fileName}`,
      afterImageUrl: afterImageUrl,
      artworkUrl: artworkUrl || null,
      roomAnalysis: {
        style: roomAnalysis.interiorStyle,
        mood: roomAnalysis.mood,
        wallColor: roomAnalysis.wallColor,
        roomType: roomAnalysis.roomType,
        palette: roomAnalysis.colorPalette,
      },
    });
  } catch (err) {
    console.error("[postcard/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
