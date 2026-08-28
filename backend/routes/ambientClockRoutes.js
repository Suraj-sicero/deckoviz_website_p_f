import express from "express";
import jwt from "jsonwebtoken";
import Replicate from "replicate";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AmbientClockPreset from "../models/AmbientClockPreset.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

// Initialize APIs
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null;
const GROQ_KEY = process.env.GROQ_API_KEY;

// Curated stock backgrounds for fallbacks or quick generation
const CURATED_BACKGROUNDS = {
  cyberpunk: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600",
  minimal: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600",
  nature: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1600",
  luxury: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
  space: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1600",
  anime: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600",
  ocean: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600",
  retro: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1600",
  // Extended theme backgrounds
  fantasy: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600",
  darkForest: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600",
  darkAcademia: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1600",
  gothic: "https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?q=80&w=1600",
  samurai: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1600",
  fireplace: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600",
  steampunk: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600",
};

const getOptionalUserId = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded.id;
    }
  } catch (err) {
    // Ignore errors
  }
  return null;
};

// Seed default clocks if none exist
const seedDefaultClocks = async () => {
  try {
    const count = await AmbientClockPreset.count({ where: { isPublic: true } });
    if (count === 0) {
      const defaults = [
        {
          name: "Cyberpunk Tokyo 2AM",
          prompt: "Cyberpunk Tokyo at 2AM with neon rain and holographic billboards",
          imageUrl: CURATED_BACKGROUNDS.cyberpunk,
          style: "Cyberpunk",
          mood: "Creativity",
          handColor: "#00ffcc",
          secondHandColor: "#ff0077",
          dialColor: "#00ffff",
          numeralStyle: "none",
          handStyle: "neon",
          accentColor: "#7000ff",
          ambientSound: "rain",
          lore: "Time flows like neon rain through the concrete canyons of Shinjuku. The city whispers in code at 2 AM.",
          animationType: "rain",
          isPublic: true,
        },
        {
          name: "Scandinavian Beige",
          prompt: "Minimal Scandinavian beige aesthetic cozy living room with soft lighting",
          imageUrl: CURATED_BACKGROUNDS.minimal,
          style: "Scandinavian",
          mood: "Focus",
          handColor: "#8c7d70",
          secondHandColor: "#c2b280",
          dialColor: "#dcd6cd",
          numeralStyle: "minimal",
          handStyle: "wooden",
          accentColor: "#a89f91",
          ambientSound: "wind",
          lore: "A sanctuary of quiet textures. Here, the minutes drift gently like dust motes in a beam of afternoon sun.",
          animationType: "particles",
          isPublic: true,
        },
        {
          name: "Bioluminescent Abyss",
          prompt: "Deep ocean bioluminescent reef with glowing creatures and soft water rays",
          imageUrl: CURATED_BACKGROUNDS.ocean,
          style: "Nature",
          mood: "Meditation",
          handColor: "#00f0ff",
          secondHandColor: "#00ff88",
          dialColor: "#005577",
          numeralStyle: "abstract",
          handStyle: "fluid",
          accentColor: "#002244",
          ambientSound: "waves",
          lore: "Miles beneath the waves, life pulses to a slower, ancient rhythm. Glowing reefs mark the passing of deep time.",
          animationType: "particles",
          isPublic: true,
        },
        {
          name: "Cosmic Nebula",
          prompt: "Deep purple and gold cosmic nebula with floating space dust",
          imageUrl: CURATED_BACKGROUNDS.space,
          style: "Space",
          mood: "Calm",
          handColor: "#ffffff",
          secondHandColor: "#ffcc00",
          dialColor: "#ffaa00",
          numeralStyle: "roman",
          handStyle: "cosmic",
          accentColor: "#8800ff",
          ambientSound: "piano",
          lore: "The birth of stars captured in absolute silence. We are but temporary observers of a eternal cosmic dance.",
          animationType: "stars",
          isPublic: true,
        },
        {
          name: "Luxury Gold & Marble",
          prompt: "Luxury black marble wall clock with gold accents and warm lighting",
          imageUrl: CURATED_BACKGROUNDS.luxury,
          style: "Luxury",
          mood: "Focus",
          handColor: "#d4af37",
          secondHandColor: "#ffffff",
          dialColor: "#d4af37",
          numeralStyle: "roman",
          handStyle: "metallic",
          accentColor: "#1a1a1a",
          ambientSound: "vinyl",
          lore: "Precious metals and polished stone. A testament to structure, refinement, and the weight of elegance.",
          animationType: "breathing-gradient",
          isPublic: true,
        }
      ];
      await AmbientClockPreset.bulkCreate(defaults);
      console.log("✅ Seeded default ambient clock presets.");
    }
  } catch (err) {
    console.error("Error seeding default clocks:", err);
  }
};

// Help call LLM for generating clock configurations
async function callLLM(prompt, isJson = false) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: isJson ? { responseMimeType: "application/json" } : undefined
      });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.warn("⚠️ Clock Route Gemini failed, trying Groq...", err.message);
    }
  }

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
    } catch (err) {
      console.error("Clock Route Groq Error:", err.message);
    }
  }

  throw new Error("No LLM provider available");
}

// Generate single image using Replicate SDXL Lightning
async function generateImage(prompt) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return null;

  try {
    const replicate = new Replicate({ auth: token });
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      {
        input: {
          prompt: `${prompt}, ambient wallpaper, high dynamic range, cinematic, 8k, digital art`,
          negative_prompt: "deformed, blurry, ugly, text, numbers, clock hands, clock, watch, clock face, watermarks"
        }
      }
    );

    if (Array.isArray(output)) return String(output[0]);
    return String(output);
  } catch (err) {
    console.error("Clock Replicate generation failed:", err);
    return null;
  }
}

// GET /api/ambient-clock - Get all clocks (seeded defaults + user private clocks)
router.get("/", async (req, res) => {
  try {
    await seedDefaultClocks();
    const userId = getOptionalUserId(req);

    let clocks;
    if (userId) {
      clocks = await AmbientClockPreset.findAll({
        where: {
          [AmbientClockPreset.sequelize.Sequelize.Op.or]: [
            { isPublic: true },
            { userId: userId },
          ],
        },
        order: [["createdAt", "DESC"]],
      });
    } else {
      clocks = await AmbientClockPreset.findAll({
        where: { isPublic: true },
        order: [["createdAt", "DESC"]],
      });
    }

    return res.json(clocks);
  } catch (error) {
    console.error("Error fetching clocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/ambient-clock - Create/Save a custom clock preset manually (authenticated)
router.post("/", authenticateUser, async (req, res) => {
  try {
    const {
      name,
      prompt,
      imageUrl,
      style,
      mood,
      handColor,
      secondHandColor,
      dialColor,
      numeralStyle,
      handStyle,
      accentColor,
      ambientSound,
      lore,
      animationType,
      isPublic
    } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ error: "Name and background image URL are required" });
    }

    const clock = await AmbientClockPreset.create({
      userId: req.user.id,
      name,
      prompt: prompt || "",
      imageUrl,
      style: style || "Minimal",
      mood: mood || "Calm",
      handColor: handColor || "#ffffff",
      secondHandColor: secondHandColor || "#ff0077",
      dialColor: dialColor || "#ffffff",
      numeralStyle: numeralStyle || "minimal",
      handStyle: handStyle || "minimal",
      accentColor: accentColor || "#888888",
      ambientSound: ambientSound || "none",
      lore: lore || "",
      animationType: animationType || "particles",
      isPublic: !!isPublic
    });

    res.status(201).json(clock);
  } catch (error) {
    console.error("Error saving clock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/ambient-clock/generate - Generate custom clock parameters and background from prompt
router.post("/generate", async (req, res) => {
  try {
    const { prompt, style = "Minimal", mood = "Calm", city = "", uploadedPhotoUrl = "" } = req.body;
    if (!prompt && !uploadedPhotoUrl) {
      return res.status(400).json({ error: "Prompt or photo is required" });
    }

    console.log(`Generating clock: Prompt="${prompt}", Style="${style}", Mood="${mood}"`);

    // 1. Let Gemini/Groq design the FULL clock identity — hands, markers, motifs, materials, atmosphere
    const designPrompt = `
      You are an expert generative art director and clock designer for Deckoviz, a platform where AI generates
      complete artistic clock identities — not just backgrounds, but the ENTIRE clock as a living artwork.

      The user wants: "${prompt || "Photo-based ambient scenery"}"
      Style: "${style}" | Mood: "${mood}" ${city ? `| City: "${city}"` : ""}

      YOUR TASK: Design a COMPLETE thematic clock identity where the background, the clock face structure,
      the hand shapes, the hour markers, and the motion ALL feel like they were born from the same creative universe.

      The user should never feel "a clock was placed on an image."
      They should feel "the image itself evolved into a clock."

      Think deeply about the THEME. For example:
      - "Harry Potter" → wand-shaped hands, glowing rune hour markers, spell-circle pivot, magical particle trails
      - "Cyberpunk" → holographic neon blade hands, glitch-symbol markers, plasma energy second hand
      - "Ocean" → coral-shaped hour hand, flowing water minute hand, bioluminescent dot markers
      - "Samurai" → katana hour hand, brushstroke minute hand, Japanese seal markers
      - "Space" → black hole ring hour hand, cosmic plasma beam minute hand, orbiting star markers
      - "Dark Academia" → antique brass needle hands, Roman numerals engraved on parchment markers

      Return ONLY a valid JSON object. No markdown, no extra text.

      JSON keys required:
      - "name": Artistic title for this clock identity (max 4 words)
      - "handColor": Primary hand color in hex (themed to the world, e.g. #ffd700 for gold/magic)
      - "secondHandColor": Second hand accent color in hex
      - "dialColor": Hour marker / tick color in hex
      - "accentColor": Supporting accent color in hex (pivot, glow, etc.)
      - "handStyle": Choose the hand visual style: "wooden" | "neon" | "metallic" | "glowing" | "fluid" | "cosmic" | "minimal"
      - "numeralStyle": Choose the marker type: "minimal" | "roman" | "arabic" | "none" | "abstract"
      - "handTheme": A 1-sentence description of what the hands look like (e.g. "Elder wand with golden magical engravings and trailing ember particles")
      - "markerTheme": A 1-sentence description of what the hour markers look like (e.g. "Floating magical rune symbols glowing with warm amber light")
      - "pivotTheme": A 1-sentence description of the clock center (e.g. "A rotating magical energy orb with Hogwarts crest filigree")
      - "ambientSound": "rain" | "forest" | "waves" | "vinyl" | "piano" | "city" | "fireplace" | "wind" | "lo-fi" | "none"
      - "lore": Poetic 1-2 sentence world lore (max 30 words)
      - "animationType": "rain" | "fog" | "particles" | "stars" | "flowing-ink" | "breathing-gradient"
      - "imageGenerationPrompt": Ultra-detailed SDXL prompt for the background world — NO clocks, NO hands, NO text, NO faces. Describe only the environment, atmosphere, lighting, and materials that match the theme.
    `;

    let config = {};
    try {
      const response = await callLLM(designPrompt, true);
      const cleaned = response.replace(/```json/gi, "").replace(/```/g, "").trim();
      config = JSON.parse(cleaned);
    } catch (llmErr) {
      console.warn("LLM config extraction failed, using heuristic fallback:", llmErr.message);
      
      // Heuristic fallback based on selected style
      const s = (style || "minimal").toLowerCase();
      if (s.includes("cyberpunk") || s.includes("sci-fi") || s.includes("futuristic")) {
        config = {
          name: "Cyberpunk Dreamscape",
          handColor: "#00ffcc",
          secondHandColor: "#ff0077",
          dialColor: "#00ffff",
          accentColor: "#7000ff",
          handStyle: "neon",
          numeralStyle: "none",
          ambientSound: "rain",
          lore: "Time echoes in neon lines through a rainy futuristic megalopolis.",
          animationType: "rain",
          imageGenerationPrompt: "Cyberpunk futuristic cityscape, neon lights, rain reflections, high details"
        };
      } else if (s.includes("nature") || s.includes("forest") || s.includes("zen") || s.includes("scandinavian")) {
        config = {
          name: "Zen Woodland",
          handColor: "#c2b280",
          secondHandColor: "#8c7d70",
          dialColor: "#dcd6cd",
          accentColor: "#a89f91",
          handStyle: "wooden",
          numeralStyle: "minimal",
          ambientSound: "forest",
          lore: "Whispers of the forest captured in organic light and stillness.",
          animationType: "particles",
          imageGenerationPrompt: "Sunny forest path, sun rays breaking through leaves, morning mist"
        };
      } else if (s.includes("luxury") || s.includes("metal") || s.includes("marble")) {
        config = {
          name: "Luxury Gilded Time",
          handColor: "#d4af37",
          secondHandColor: "#ffffff",
          dialColor: "#d4af37",
          accentColor: "#111111",
          handStyle: "metallic",
          numeralStyle: "roman",
          ambientSound: "vinyl",
          lore: "A polished black marble slab embedded with golden veins of timeless luxury.",
          animationType: "breathing-gradient",
          imageGenerationPrompt: "Luxury black marble texture with golden veins, smooth studio lighting"
        };
      } else {
        config = {
          name: "Ambient Timepiece",
          handColor: "#ffffff",
          secondHandColor: "#ff0077",
          dialColor: "#ffffff",
          accentColor: "#888888",
          handStyle: "minimal",
          numeralStyle: "minimal",
          ambientSound: "lo-fi",
          lore: "An elegant, atmospheric portal where time moves beautifully.",
          animationType: "particles",
          imageGenerationPrompt: "Soft abstract gradient background, smooth color transition, ambient backdrop"
        };
      }
    }

    // 2. Generate or extract background image
    let imageUrl = uploadedPhotoUrl;
    if (!imageUrl) {
      try {
        console.log("Generating image with prompt:", config.imageGenerationPrompt);
        imageUrl = await generateImage(config.imageGenerationPrompt || prompt);
      } catch (imgErr) {
        console.error("Image generation failed:", imgErr);
      }
      
      // If image generation failed or Replicate is not configured, pick a curated stock fallback.
      // Match against BOTH the style tag AND the raw prompt text for broad coverage.
      if (!imageUrl) {
        const lowerStyle = (style + " " + prompt).toLowerCase();
        if (lowerStyle.includes("cyberpunk") || lowerStyle.includes("neon") || lowerStyle.includes("holographic") || lowerStyle.includes("sci-fi") || lowerStyle.includes("futuristic"))
          imageUrl = CURATED_BACKGROUNDS.cyberpunk;
        else if (lowerStyle.includes("harry potter") || lowerStyle.includes("hogwarts") || lowerStyle.includes("wizard") || lowerStyle.includes("magic") || lowerStyle.includes("fantasy") || lowerStyle.includes("enchanted") || lowerStyle.includes("spell") || lowerStyle.includes("rune") || lowerStyle.includes("potion"))
          imageUrl = CURATED_BACKGROUNDS.darkForest;
        else if (lowerStyle.includes("gothic") || lowerStyle.includes("castle") || lowerStyle.includes("vampire") || lowerStyle.includes("dark academia") || lowerStyle.includes("academia") || lowerStyle.includes("library") || lowerStyle.includes("parchment"))
          imageUrl = CURATED_BACKGROUNDS.darkAcademia;
        else if (lowerStyle.includes("samurai") || lowerStyle.includes("katana") || lowerStyle.includes("japanese") || lowerStyle.includes("ninja") || lowerStyle.includes("feudal"))
          imageUrl = CURATED_BACKGROUNDS.samurai;
        else if (lowerStyle.includes("steampunk") || lowerStyle.includes("victorian") || lowerStyle.includes("clockwork") || lowerStyle.includes("brass") || lowerStyle.includes("gear"))
          imageUrl = CURATED_BACKGROUNDS.steampunk;
        else if (lowerStyle.includes("nature") || lowerStyle.includes("forest") || lowerStyle.includes("zen") || lowerStyle.includes("woodland") || lowerStyle.includes("garden"))
          imageUrl = CURATED_BACKGROUNDS.nature;
        else if (lowerStyle.includes("scandinavian") || lowerStyle.includes("beige") || lowerStyle.includes("minimal") || lowerStyle.includes("nordic") || lowerStyle.includes("cozy"))
          imageUrl = CURATED_BACKGROUNDS.minimal;
        else if (lowerStyle.includes("space") || lowerStyle.includes("galaxy") || lowerStyle.includes("nebula") || lowerStyle.includes("cosmic") || lowerStyle.includes("star"))
          imageUrl = CURATED_BACKGROUNDS.space;
        else if (lowerStyle.includes("luxury") || lowerStyle.includes("gold") || lowerStyle.includes("marble") || lowerStyle.includes("elite"))
          imageUrl = CURATED_BACKGROUNDS.luxury;
        else if (lowerStyle.includes("anime") || lowerStyle.includes("ghibli") || lowerStyle.includes("manga") || lowerStyle.includes("kawaii"))
          imageUrl = CURATED_BACKGROUNDS.anime;
        else if (lowerStyle.includes("ocean") || lowerStyle.includes("sea") || lowerStyle.includes("water") || lowerStyle.includes("coral") || lowerStyle.includes("bioluminescent"))
          imageUrl = CURATED_BACKGROUNDS.ocean;
        else
          imageUrl = CURATED_BACKGROUNDS.fantasy; // generic fallback is now a fantasy/mystic scene
      }
    }

    // Return the generated clock config
    return res.json({
      name: config.name || "Custom ChronoScape",
      prompt: prompt || "Photo-based environment",
      imageUrl,
      style,
      mood,
      handColor: config.handColor || "#ffffff",
      secondHandColor: config.secondHandColor || "#ff0077",
      dialColor: config.dialColor || "#ffffff",
      numeralStyle: config.numeralStyle || "minimal",
      handStyle: config.handStyle || "minimal",
      accentColor: config.accentColor || "#888888",
      ambientSound: config.ambientSound || "none",
      lore: config.lore || "An ambient escape synchronized with time.",
      animationType: config.animationType || "particles",
      handTheme: config.handTheme || "",
      markerTheme: config.markerTheme || "",
      pivotTheme: config.pivotTheme || "",
    });

  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({ error: "Failed to generate clock face: " + error.message });
  }
});

// POST /api/ambient-clock/remix - Remix an existing clock config with a tweak prompt
router.post("/remix", async (req, res) => {
  try {
    const { clock, remixPrompt } = req.body;
    if (!clock || !remixPrompt) {
      return res.status(400).json({ error: "Clock config and remix prompt are required" });
    }

    console.log(`Remixing clock "${clock.name}" with prompt: "${remixPrompt}"`);

    // Let Gemini morph the properties
    const morphPrompt = `
      You are an expert generative art director.
      I have an existing ambient clock config:
      ${JSON.stringify(clock)}

      The user wants to remix/tweak it with this instruction: "${remixPrompt}"
      Modify the colors, styles, sound, animation, and lore to reflect this remix instruction.
      Generate a new image generation prompt for Stable Diffusion (SDXL) that incorporates the changes to the background.
      
      Return ONLY a valid JSON object. Do not include markdown wraps (like \`\`\`json).
      JSON keys required:
      - "name": A tweaked premium name (max 4 words)
      - "handColor": hex color
      - "secondHandColor": hex color
      - "dialColor": hex color
      - "accentColor": hex color
      - "handStyle": "wooden" | "neon" | "metallic" | "glowing" | "fluid" | "cosmic" | "minimal"
      - "numeralStyle": "minimal" | "roman" | "arabic" | "none" | "abstract"
      - "ambientSound": "rain" | "forest" | "cafe" | "waves" | "vinyl" | "piano" | "city" | "fireplace" | "wind" | "lo-fi" | "none"
      - "lore": A tweaked poetic worldbuilding lore (max 30 words)
      - "animationType": "rain" | "fog" | "particles" | "stars" | "flowing-ink" | "breathing-gradient"
      - "imageGenerationPrompt": "An updated detailed background prompt for Stable Diffusion reflecting the remix instructions, without any clocks or clock hands."
    `;

    let config = {};
    try {
      const response = await callLLM(morphPrompt, true);
      const cleaned = response.replace(/```json/gi, "").replace(/```/g, "").trim();
      config = JSON.parse(cleaned);
    } catch (llmErr) {
      console.warn("Remix LLM failed, returning original with minor tweak:", llmErr.message);
      config = { ...clock, name: `${clock.name} Remixed` };
    }

    let imageUrl = clock.imageUrl;
    // Generate new background image reflecting the remix instruction
    if (config.imageGenerationPrompt) {
      try {
        const newUrl = await generateImage(config.imageGenerationPrompt);
        if (newUrl) imageUrl = newUrl;
      } catch (imgErr) {
        console.error("Remix image generation failed, keeping original:", imgErr);
      }
    }

    return res.json({
      name: config.name || `${clock.name} (Remixed)`,
      prompt: remixPrompt,
      imageUrl,
      style: clock.style,
      mood: clock.mood,
      handColor: config.handColor || clock.handColor,
      secondHandColor: config.secondHandColor || clock.secondHandColor,
      dialColor: config.dialColor || clock.dialColor,
      numeralStyle: config.numeralStyle || clock.numeralStyle,
      handStyle: config.handStyle || clock.handStyle,
      accentColor: config.accentColor || clock.accentColor,
      ambientSound: config.ambientSound || clock.ambientSound,
      lore: config.lore || clock.lore,
      animationType: config.animationType || clock.animationType,
    });

  } catch (error) {
    console.error("Remix error:", error);
    res.status(500).json({ error: "Failed to remix clock: " + error.message });
  }
});

// DELETE /api/ambient-clock/:id - Delete a saved clock preset (authenticated)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const clock = await AmbientClockPreset.findOne({
      where: { id, userId: req.user.id },
    });

    if (!clock) {
      return res.status(404).json({ error: "Clock preset not found or unauthorized" });
    }

    await clock.destroy();
    res.json({ success: true, message: "Clock preset deleted successfully" });
  } catch (error) {
    console.error("Error deleting clock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
