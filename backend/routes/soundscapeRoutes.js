import express from "express";
import jwt from "jsonwebtoken";
import SoundscapePreset from "../models/SoundscapePreset.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

// Helper to optionally parse user ID from token without failing if unauthorized
const getOptionalUserId = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded.id;
    }
  } catch (err) {
    // Ignore errors for optional auth
  }
  return null;
};

// Seed default premium presets if none exist
const seedDefaultPresets = async () => {
  const count = await SoundscapePreset.count({ where: { isPublic: true } });
  if (count === 0) {
    const defaults = [
      {
        name: "Zen Forest Focus",
        mood: "Focused",
        description: "A calming blend of brown noise, gentle forest birds, and soft piano chords to keep you locked in.",
        ambientLayers: JSON.stringify({ "Forest": 0.4, "Bird Songs": 0.3, "Brown noise": 0.5 }),
        classicalTrackId: "chopin-nocturne-op9-no2",
        musicVolume: 0.4,
        binauralCarrier: 200,
        binauralBeat: 10, // Alpha (10 Hz)
        binauralVolume: 0.25,
        binauralWaveform: "sine",
        binauralEnabled: true,
        gradientPreset: "Focused",
        activeVisualizer: "circular",
        isPublic: true,
      },
      {
        name: "Midnight Cafe Writer",
        mood: "Creative",
        description: "Subtle café chatter layered with cyberpunk rain, alpha binaural beats, and a touch of Debussy.",
        ambientLayers: JSON.stringify({ "Café ambience": 0.5, "Cyberpunk rain": 0.4, "Keyboard typing": 0.2 }),
        classicalTrackId: "debussy-clair-de-lune",
        musicVolume: 0.3,
        binauralCarrier: 180,
        binauralBeat: 6, // Theta (6 Hz)
        binauralVolume: 0.2,
        binauralWaveform: "sine",
        binauralEnabled: true,
        gradientPreset: "Creative",
        activeVisualizer: "waveform",
        isPublic: true,
      },
      {
        name: "Rainy Cozy Cabin",
        mood: "Romantic",
        description: "Rain beating on the roof, a crackling fireplace, warm strings, and theta waves for intimate comfort.",
        ambientLayers: JSON.stringify({ "Rain": 0.6, "Fireplace": 0.5, "Wind": 0.2 }),
        classicalTrackId: "beethoven-moonlight-sonata-1",
        musicVolume: 0.35,
        binauralCarrier: 220,
        binauralBeat: 5, // Theta (5 Hz)
        binauralVolume: 0.15,
        binauralWaveform: "sine",
        binauralEnabled: true,
        gradientPreset: "Romantic",
        activeVisualizer: "glow",
        isPublic: true,
      },
      {
        name: "Celestial Dreamscape",
        mood: "Calm",
        description: "Alien atmosphere, soft wind, pink noise, and delta waves designed for deep restorative meditation.",
        ambientLayers: JSON.stringify({ "Space ambience": 0.5, "Alien atmosphere": 0.3, "Pink noise": 0.4 }),
        classicalTrackId: "bach-air-on-g-string",
        musicVolume: 0.3,
        binauralCarrier: 150,
        binauralBeat: 2.5, // Delta (2.5 Hz)
        binauralVolume: 0.3,
        binauralWaveform: "sine",
        binauralEnabled: true,
        gradientPreset: "Calm",
        activeVisualizer: "particles",
        isPublic: true,
      },
    ];
    await SoundscapePreset.bulkCreate(defaults);
  }
};

// GET /api/soundscapes
router.get("/", async (req, res) => {
  try {
    await seedDefaultPresets();
    const userId = getOptionalUserId(req);

    let presets;
    if (userId) {
      presets = await SoundscapePreset.findAll({
        where: {
          [SoundscapePreset.sequelize.Sequelize.Op.or]: [
            { isPublic: true },
            { userId: userId },
          ],
        },
        order: [["createdAt", "DESC"]],
      });
    } else {
      presets = await SoundscapePreset.findAll({
        where: { isPublic: true },
        order: [["createdAt", "DESC"]],
      });
    }
    return res.json(presets);
  } catch (error) {
    console.error("Error fetching soundscape presets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/soundscapes (authenticated)
router.post("/", authenticateUser, async (req, res) => {
  try {
    const {
      name,
      mood,
      description,
      ambientLayers,
      classicalTrackId,
      musicVolume,
      binauralCarrier,
      binauralBeat,
      binauralVolume,
      binauralWaveform,
      binauralEnabled,
      gradientPreset,
      activeVisualizer,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Preset name is required" });
    }

    const preset = await SoundscapePreset.create({
      userId: req.user.id,
      name,
      mood: mood || "Calm",
      description: description || "",
      ambientLayers: ambientLayers ? (typeof ambientLayers === "string" ? ambientLayers : JSON.stringify(ambientLayers)) : "{}",
      classicalTrackId: classicalTrackId || null,
      musicVolume: musicVolume !== undefined ? parseFloat(musicVolume) : 0.5,
      binauralCarrier: binauralCarrier !== undefined ? parseFloat(binauralCarrier) : 200,
      binauralBeat: binauralBeat !== undefined ? parseFloat(binauralBeat) : 10,
      binauralVolume: binauralVolume !== undefined ? parseFloat(binauralVolume) : 0.2,
      binauralWaveform: binauralWaveform || "sine",
      binauralEnabled: binauralEnabled !== undefined ? !!binauralEnabled : false,
      gradientPreset: gradientPreset || "Calm",
      activeVisualizer: activeVisualizer || "waveform",
      isPublic: false,
    });

    res.status(201).json(preset);
  } catch (error) {
    console.error("Error creating soundscape preset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/soundscapes/:id (authenticated)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const preset = await SoundscapePreset.findOne({
      where: { id, userId: req.user.id },
    });

    if (!preset) {
      return res.status(404).json({ error: "Preset not found or unauthorized" });
    }

    await preset.destroy();
    res.json({ success: true, message: "Preset deleted successfully" });
  } catch (error) {
    console.error("Error deleting soundscape preset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
