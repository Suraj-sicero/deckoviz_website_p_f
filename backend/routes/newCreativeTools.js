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
async function blendImageWithRunware(compositeBuffer, prompt = "a professional photograph of a digital art frame on a wall inside a room, realistic shadows, natural lighting") {
  const apiKey = process.env.RUNWARE_API_KEY;
  if (!apiKey) return null;

  try {
    const crypto = await import("crypto");
    const uploadTaskUUID = crypto.randomUUID();
    const inferenceTaskUUID = crypto.randomUUID();
    
    // We resize the composite buffer to avoid extra-large upload
    const resizedComposite = await sharp(compositeBuffer)
      .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    const dataUri = `data:image/jpeg;base64,${resizedComposite.toString("base64")}`;

    console.log("[Runware Blend] Uploading composite image...");
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
        }
      ])
    });

    if (!res.ok) {
      console.warn("[Runware Blend] Upload request failed with status:", res.status);
      return null;
    }

    const uploadRes = await res.json();
    const imageUUID = uploadRes.data?.[0]?.imageUUID;
    if (!imageUUID) {
      console.warn("[Runware Blend] No imageUUID returned:", uploadRes);
      return null;
    }

    console.log("[Runware Blend] Image uploaded. UUID:", imageUUID);

    // Call imageInference with strength 0.15 (very low to keep frame content intact but blend lighting/shadows)
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
          "model": "runware:100@1", // Standard SD 1.5
          "positivePrompt": prompt,
          "negativePrompt": "blurry, low quality, deformed, extra frames, change layout, text, watermark",
          "seedImage": imageUUID,
          "strength": 0.15,
          "width": 1024,
          "height": 1024,
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

async function warpImage(srcBuffer, srcWidth, srcHeight, dstWidth, dstHeight, dstCorners) {
  const src = [
    [100, 100],
    [900, 100],
    [900, 550],
    [100, 550]
  ];

  const coeffs = getInverseHomography(src, dstCorners);
  if (!coeffs) {
    console.warn("Warping failed: singular homography matrix.");
    return null;
  }
  const [a, b, c, d, e, f, g, h] = coeffs;

  let minX = Math.floor(Math.min(...dstCorners.map(p => p[0])));
  let maxX = Math.ceil(Math.max(...dstCorners.map(p => p[0])));
  let minY = Math.floor(Math.min(...dstCorners.map(p => p[1])));
  let maxY = Math.ceil(Math.max(...dstCorners.map(p => p[1])));

  const margin = Math.ceil(Math.max(maxX - minX, maxY - minY) * 0.3);
  minX = Math.max(0, minX - margin);
  maxX = Math.min(dstWidth - 1, maxX + margin);
  minY = Math.max(0, minY - margin);
  maxY = Math.min(dstHeight - 1, maxY + margin);

  const dstBuffer = Buffer.alloc(dstWidth * dstHeight * 4);
  const fadeMargin = 80;

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
    const { businessName } = req.body;
    const file = req.files?.image?.[0];
    const frameFile = req.files?.frameImage?.[0];

    if (!file) return res.status(400).json({ error: "Missing space/room image upload" });
    if (!businessName?.trim()) return res.status(400).json({ error: "Missing business name" });

    console.log("Postcard generation started for:", businessName);

    // Step 1: Analyze room with Gemini Vision for optimal 3D frame placement
    const visionPrompt = `
      Analyze this room image for optimal placement of a Deckoviz premium 16:9 digital art frame.
      
      You must treat this room image as a 3D space, taking into account the depth and perspective angles of the walls.
      
      CRITICAL PLACEMENT RULES:
      1. SOLID WALL ONLY: You MUST place the frame on a solid, flat wall surface (e.g., drywall, concrete, or brick wall segments).
      2. 3D PERSPECTIVE WARP CORNERS: Since the selected wall may be angled relative to the camera (perspective), you must specify the EXACT 4 corners where the frame's BEZEL should lie flat against that wall surface.
         - If the wall recedes to the right (perspective), the right edge must be vertically shorter than the left edge, and the top/bottom lines must slope towards the vanishing point.
         - If the wall recedes to the left, the left edge must be vertically shorter than the right edge.
         - If the wall faces the camera directly (orthogonal/flat wall), the corners should form a perfect, untilted 16:9 rectangle. The top_left and top_right Y-coordinates MUST be identical (exactly equal, e.g., both y=380, no tilt). The bottom_left and bottom_right Y-coordinates MUST be identical (exactly equal). The left edge X-coordinates must be equal, and the right edge X-coordinates must be equal.
         - DO NOT introduce slight random tilts, rotations, or offsets. Keeping the painting horizontally leveled on flat walls is critical.
      3. STRICTLY AVOID WINDOWS & BLINDS: Never place the frame over windows, glass panels, window blinds, curtains, or doorways. The frame must not overlap them at all.
      4. NO FURNITURE CLASH: Do not overlap tables, chairs, plants, lamps, or decorative items. The frame should hang cleanly on the wall *above* any furniture, at a natural eye level.
      5. STRICT BOUNDARIES: Ensure the entire frame quadrilateral fits ENTIRELY within the boundaries of the chosen wall segment. Leave some padding on all sides so it does not touch the edges of the wall, window frames, or ceiling.
      6. SCALING: Choose a realistic size. Typically the width should be between 20% to 32% of the total image width.

      Return ONLY valid JSON (normalized 0-1000 scale where x=0 to 1000 and y=0 to 1000 relative to the image size):
      {
        "top_left": [x, y],
        "top_right": [x, y],
        "bottom_right": [x, y],
        "bottom_left": [x, y],
        "backlight_color": "hex_color_curated_for_room",
        "reasoning": "Explain exactly which wall segment was chosen, how the 3D perspective tilt/slope was calculated to align with the wall angle, and how we avoided overlap."
      }
    `.trim();

    const visionRaw = await callVisionLLM(visionPrompt, file.buffer, true);
    const placement = extractJSON(visionRaw) || {};
    console.log("Placement detected:", placement);

    // Step 2: Obtain frame artwork (uploaded image or generated)
    let artBuffer;
    if (frameFile) {
      artBuffer = frameFile.buffer;
    } else {
      const artThemes = ["luxury minimalist abstract", "geometric vector landscape", "flat oil wash texture", "modern graphic glass art"];
      const chosenTheme = artThemes[Math.floor(Math.random() * artThemes.length)];
      
      const artPrompt = `A high-end FLAT 2D VECTOR ${chosenTheme} digital art, museum quality, professional graphic design, flat colors, NO perspective, NO depth, NO rooms, NO furniture, NO windows, 16:9 aspect ratio, 8k resolution, flat 2D style.`;
      const artNegativePrompt = "room, interior, furniture, window, portal, 3D, depth, perspective, realistic scene, person, lamp, couch, bed, wall, floor, ceiling, architecture, blurry, distorted";
      
      const artworkUrl = await generateImage(artPrompt, artNegativePrompt);
      if (!artworkUrl) throw new Error("Failed to generate frame artwork.");
      
      const artRes = await fetch(artworkUrl);
      artBuffer = Buffer.from(await artRes.arrayBuffer());
    }

    // Step 3: Prepare Dimensions
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
      const cx = placement.center_x || 500;
      const cy = placement.center_y || 500;
      const w = placement.width || 250;
      const h = (w * 9) / 16;
      top_left = [cx - w/2, cy - h/2];
      top_right = [cx + w/2, cy - h/2];
      bottom_right = [cx + w/2, cy + h/2];
      bottom_left = [cx - w/2, cy + h/2];
    }

    const dstCorners = [
      [ (top_left[0] / 1000) * roomWidth, (top_left[1] / 1000) * roomHeight ],
      [ (top_right[0] / 1000) * roomWidth, (top_right[1] / 1000) * roomHeight ],
      [ (bottom_right[0] / 1000) * roomWidth, (bottom_right[1] / 1000) * roomHeight ],
      [ (bottom_left[0] / 1000) * roomWidth, (bottom_left[1] / 1000) * roomHeight ]
    ];

    // Step 4: Create the Premium Frame elements in flat space (size: 1000 x 650)
    const backlightColor = placement.backlight_color || "#ffaa44";

    const glowSvg = `
      <svg width="1000" height="650">
        <filter id="glow">
          <feGaussianBlur stdDeviation="55" />
        </filter>
        <rect x="100" y="100" width="800" height="450" fill="${backlightColor}" filter="url(#glow)" opacity="0.5" />
      </svg>
    `;

    const shadowSvg = `
      <svg width="1000" height="650">
        <filter id="shadow">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <rect x="100" y="100" width="800" height="450" rx="30" fill="rgba(0,0,0,0.75)" filter="url(#shadow)" />
      </svg>
    `;

    const bezelSvg = `
      <svg width="800" height="450">
        <defs>
          <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3d2b1f;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#1e140d;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3d2b1f;stop-opacity:1" />
          </linearGradient>
          <filter id="innerDepth">
            <feOffset dx="0" dy="5" />
            <feGaussianBlur stdDeviation="8" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood flood-color="black" flood-opacity="0.8" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>
        <rect x="0" y="0" width="800" height="450" rx="32" fill="url(#woodGrad)" stroke="#5c4033" stroke-width="2" />
        <rect x="24" y="24" width="752" height="402" rx="20" fill="black" filter="url(#innerDepth)" />
      </svg>
    `;

    const resizedArt = await sharp(artBuffer)
      .resize(752, 402, { fit: "cover" })
      .toBuffer();

    const flatFrameComposite = await sharp({
      create: {
        width: 1000,
        height: 650,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([
      { input: Buffer.from(glowSvg), top: 0, left: 0 },
      { input: Buffer.from(shadowSvg), top: 0, left: 0 },
      { input: Buffer.from(bezelSvg), top: 100, left: 100 },
      { input: resizedArt, top: 124, left: 124 }
    ])
    .raw()
    .toBuffer();

    // Step 5: Perspective Warp the flat composite into the 3D room space
    console.log("Warping frame into 3D perspective...");
    const warpedBuffer = await warpImage(flatFrameComposite, 1000, 650, roomWidth, roomHeight, dstCorners);
    if (!warpedBuffer) throw new Error("Perspective warping failed.");

    let afterImageBuffer = await sharp(file.buffer)
      .composite([
        {
          input: warpedBuffer,
          raw: {
            width: roomWidth,
            height: roomHeight,
            channels: 4
          },
          top: 0,
          left: 0
        }
      ])
      .jpeg({ quality: 95 })
      .toBuffer();

    // Step 5.5: Seamlessly blend using Runware if API key is present
    if (process.env.RUNWARE_API_KEY) {
      try {
        console.log("Blending composite image using Runware...");
        const blendedUrl = await blendImageWithRunware(afterImageBuffer);
        if (blendedUrl) {
          const blendedRes = await fetch(blendedUrl);
          if (blendedRes.ok) {
            afterImageBuffer = Buffer.from(await blendedRes.arrayBuffer());
            console.log("Successfully replaced composite with Runware-blended version.");
          }
        }
      } catch (blendErr) {
        console.error("Runware blend failed, falling back to sharp composite:", blendErr.message);
      }
    }

    // Step 6: Create the Final Postcard (Side-by-Side)
    const canvasWidth = 1920;
    const canvasHeight = 1080;
    const halfWidth = canvasWidth / 2;

    const beforePart = await sharp(file.buffer)
      .resize(halfWidth, canvasHeight, { fit: "cover" })
      .toBuffer();
    
    const afterPart = await sharp(afterImageBuffer)
      .resize(halfWidth, canvasHeight, { fit: "cover" })
      .toBuffer();

    const escapedName = businessName.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[m]));

    const labelsSvg = `
      <svg width="${canvasWidth}" height="${canvasHeight}">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&amp;family=Dancing+Script:wght@700&amp;display=swap');
          .title { fill: white; font-family: 'Comfortaa', sans-serif; font-size: 64px; font-weight: 700; text-anchor: middle; filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.5)); }
          .tagline { fill: white; font-family: 'Dancing Script', cursive; font-size: 32px; text-anchor: middle; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5)); }
          .label { fill: white; font-family: sans-serif; font-size: 24px; font-weight: bold; text-anchor: middle; }
          .label-bg { fill: rgba(0,0,0,0.6); rx: 12; }
          .brand-bg { fill: rgba(0,0,0,0.3); filter: blur(15px); }
        </style>
        
        <rect x="${canvasWidth/2 - 450}" y="15" width="900" height="150" class="brand-bg" rx="20" />
        <text x="${canvasWidth/2}" y="85" class="title">Deckoviz</text>
        <text x="${canvasWidth/2}" y="130" class="tagline">${escapedName}, experience your space transformed with Deckoviz DASP</text>

        <rect x="40" y="${canvasHeight - 80}" width="140" height="50" class="label-bg" />
        <text x="110" y="${canvasHeight - 45}" class="label">BEFORE</text>

        <rect x="${canvasWidth - 180}" y="${canvasHeight - 80}" width="140" height="50" class="label-bg" />
        <text x="${canvasWidth - 110}" y="${canvasHeight - 45}" class="label">AFTER</text>

        <rect x="0" y="0" width="${canvasWidth}" height="${canvasHeight}" fill="none" stroke="white" stroke-width="15" opacity="0.2" />
      </svg>
    `;

    const finalBuffer = await sharp({
      create: { width: canvasWidth, height: canvasHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } }
    })
    .composite([
      { input: beforePart, top: 0, left: 0 },
      { input: afterPart, top: 0, left: halfWidth },
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
    // Resize before buffer for consistency in slider
    const beforeBuffer = await sharp(file.buffer).jpeg({ quality: 95 }).toBuffer();
    fs.writeFileSync(path.join(publicDir, beforeFileName), beforeBuffer);

    const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;
    return res.json({
      success: true,
      imageUrl: `${baseUrl}/generated/${fileName}`,
      afterUrl: `${baseUrl}/generated/${afterFileName}`,
      beforeUrl: `${baseUrl}/generated/${beforeFileName}`,
      reasoning: placement.reasoning
    });
  } catch (err) {
    console.error("[postcard/generate]", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;

