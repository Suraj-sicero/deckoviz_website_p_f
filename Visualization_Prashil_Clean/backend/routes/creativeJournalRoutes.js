import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Replicate from "replicate";
import dotenv from "dotenv";
import { authenticateUser } from "../middleware/auth.js";
import Folder from "../models/Folder.js";
import CreativeJournal from "../models/CreativeJournal.js";

dotenv.config();

const router = express.Router();

// Initialize LLM APIs
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null;
const GROQ_KEY = process.env.GROQ_API_KEY;

/**
 * Generic LLM call with Gemini & Groq fallback
 */
async function callLLM(messages, systemInstruction) {
  // 1. Try Gemini
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash"
      });

      // Filter and map for Gemini format (Gemini does not expect "system" in contents)
      const contents = messages.filter(m => m.role !== "system").map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const result = await model.generateContent({
        contents,
        systemInstruction: systemInstruction || "You are a creative brainstorming assistant.",
      });

      return result.response.text();
    } catch (err) {
      console.warn("⚠️ Gemini failed in CreativeJournal, trying Groq fallback...", err.message);
    }
  }

  // 2. Try Groq Fallback
  if (GROQ_KEY) {
    try {
      const groqMessages = [
        { role: "system", content: systemInstruction },
        ...messages
      ];
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices[0].message.content;
      }
      const errText = await res.text();
      console.warn("⚠️ Groq failing in CreativeJournal...", errText);
    } catch (err) {
      console.error("Groq Error in CreativeJournal:", err.message);
    }
  }

  throw new Error("All LLM providers failed. Check Gemini/Groq keys and quota.");
}

// ────────────────────────────────────────────────────────────────────────
// FOLDERS ENDPOINTS
// ────────────────────────────────────────────────────────────────────────

// Get folders
router.get("/folders", authenticateUser, async (req, res) => {
  try {
    const folders = await Folder.findAll({
      where: { userId: req.user.id },
      order: [["name", "ASC"]],
    });
    res.json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ error: "Failed to fetch folders" });
  }
});

// Create folder
router.post("/folders", authenticateUser, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Folder name is required" });
    }
    const folder = await Folder.create({
      userId: req.user.id,
      name,
    });
    res.status(201).json(folder);
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ error: "Failed to create folder" });
  }
});

// Delete folder
router.delete("/folders/:id", authenticateUser, async (req, res) => {
  try {
    const folder = await Folder.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }
    await folder.destroy();

    // Set folderId of associated journals to null so they don't get orphaned/lost
    await CreativeJournal.update(
      { folderId: null },
      { where: { folderId: req.params.id, userId: req.user.id } }
    );

    res.json({ success: true, message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ error: "Failed to delete folder" });
  }
});

// ────────────────────────────────────────────────────────────────────────
// JOURNALS ENDPOINTS
// ────────────────────────────────────────────────────────────────────────

// Get all journals (grouped/filtered)
router.get("/journals", authenticateUser, async (req, res) => {
  try {
    const journals = await CreativeJournal.findAll({
      where: { userId: req.user.id },
      order: [["updatedAt", "DESC"]],
    });
    res.json(journals);
  } catch (error) {
    console.error("Error fetching journals:", error);
    res.status(500).json({ error: "Failed to fetch journals" });
  }
});

// Get single journal details
router.get("/journals/:id", authenticateUser, async (req, res) => {
  try {
    const journal = await CreativeJournal.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }
    res.json(journal);
  } catch (error) {
    console.error("Error fetching journal:", error);
    res.status(500).json({ error: "Failed to fetch journal" });
  }
});

// Create a new journal
router.post("/journals", authenticateUser, async (req, res) => {
  try {
    const { title, folderId, template } = req.body;
    const journal = await CreativeJournal.create({
      userId: req.user.id,
      title: title || "Untitled Journal",
      folderId: folderId || null,
      template: template || "custom",
      content: "",
      chatHistory: "[]",
      isStarred: false,
    });
    res.status(201).json(journal);
  } catch (error) {
    console.error("Error creating journal:", error);
    res.status(500).json({ error: "Failed to create journal" });
  }
});

// Update a journal (autosave content, title, stars, folder, history)
router.put("/journals/:id", authenticateUser, async (req, res) => {
  try {
    const journal = await CreativeJournal.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    const { title, content, folderId, isStarred, template, chatHistory } = req.body;

    if (title !== undefined) journal.title = title;
    if (content !== undefined) journal.content = content;
    if (folderId !== undefined) journal.folderId = folderId;
    if (isStarred !== undefined) journal.isStarred = isStarred;
    if (template !== undefined) journal.template = template;
    if (chatHistory !== undefined) {
      journal.chatHistory = typeof chatHistory === "string" ? chatHistory : JSON.stringify(chatHistory);
    }

    await journal.save();
    res.json(journal);
  } catch (error) {
    console.error("Error updating journal:", error);
    res.status(500).json({ error: "Failed to update journal" });
  }
});

// Delete journal
router.delete("/journals/:id", authenticateUser, async (req, res) => {
  try {
    const journal = await CreativeJournal.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }
    await journal.destroy();
    res.json({ success: true, message: "Journal deleted successfully" });
  } catch (error) {
    console.error("Error deleting journal:", error);
    res.status(500).json({ error: "Failed to delete journal" });
  }
});

// ────────────────────────────────────────────────────────────────────────
// AI CHAT & VISUAL GENERATION
// ────────────────────────────────────────────────────────────────────────

// Contextual AI chat
router.post("/journals/:id/chat", authenticateUser, async (req, res) => {
  try {
    const journal = await CreativeJournal.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!journal) {
      return res.status(404).json({ error: "Journal not found" });
    }

    const { message, highlightedText } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Parse existing history
    let messages = [];
    try {
      messages = JSON.parse(journal.chatHistory || "[]");
    } catch (e) {
      messages = [];
    }

    // Format user request, incorporating highlighted text if present
    let formattedUserMsg = message;
    if (highlightedText && highlightedText.trim().length > 0) {
      formattedUserMsg = `[Highlighted Text Context: "${highlightedText.trim()}"]\n\nUser Message: ${message}`;
    }

    // Push new message to history
    messages.push({ role: "user", content: formattedUserMsg, timestamp: new Date().toISOString() });

    // Build the contextual system prompt
    const systemPrompt = `You are a futuristic, highly creative AI muse and brainstorming assistant embedded in the "Creative Journal".
The user is working on a creative project. Below is the current text from their writing canvas:

--- WRITING CANVAS CONTENT ---
${journal.content || "(The writing canvas is currently empty. Encourage the user to start writing!)"}
------------------------------

Use this writing canvas content as your contextual source of truth. Always keep it in mind. Help them brainstorm ideas, critique their style, write next sections, edit prose, suggest characters, or outline plots.
If the user provided "Highlighted Text Context" above, focus your feedback specifically on that text while retaining awareness of the rest of the canvas.
Keep your tone inspiring, cinematic, and professional. Provide rich formatting in markdown, using headers, bullet points, or code blocks if necessary. Keep responses engaging and helpful.`;

    // Call LLM
    const responseText = await callLLM(messages, systemPrompt);

    // Save assistant response to history
    messages.push({ role: "assistant", content: responseText, timestamp: new Date().toISOString() });

    // Update journal's chatHistory
    journal.chatHistory = JSON.stringify(messages);
    await journal.save();

    res.json({
      reply: responseText,
      chatHistory: messages,
    });
  } catch (error) {
    console.error("Error in journal AI chat:", error);
    res.status(500).json({ error: "Failed to generate AI response: " + error.message });
  }
});

// Image Generation for journals (embedded media helper)
router.post("/generate-image", authenticateUser, async (req, res) => {
  try {
    const { prompt, style } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: "Replicate API Token not configured" });
    }

    // Enhance prompt based on selected template style
    let enhancedPrompt = prompt;
    if (style) {
      enhancedPrompt = `Highly detailed ${style} artwork. ${prompt}. Stunning composition, cinematic lighting, masterfully rendered, 8k resolution.`;
    } else {
      enhancedPrompt = `Highly detailed creative artwork. ${prompt}. Stunning composition, cinematic lighting, masterfully rendered, 8k resolution.`;
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Run SDXL Lightning
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          prompt: enhancedPrompt,
          negative_prompt: "deformed, blurry, ugly, low quality, texts, signatures, watermarks",
        }
      }
    );

    let imageUrl = String(output);
    if (Array.isArray(output)) {
      imageUrl = String(output[output.length - 1]);
    }

    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Error in visual generation:", error);
    res.status(500).json({ error: "Failed to generate image: " + error.message });
  }
});

export default router;
