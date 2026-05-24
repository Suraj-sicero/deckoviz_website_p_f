import express from "express";
import jwt from "jsonwebtoken";
import AgenticPreset from "../models/AgenticPreset.js";
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

// Seed default presets if none exist
const seedDefaultPresets = async () => {
  const count = await AgenticPreset.count({ where: { isPublic: true } });
  if (count === 0) {
    const defaults = [
      {
        name: "Agentic Green Galaxy",
        shapeType: "galaxy",
        primaryColor: "#2ee06a",
        secondaryColor: "#ffffff",
        backgroundColor: "#030303",
        spinSpeed: 0.08,
        ditherLevels: 6,
        starDensity: 0.5,
        shapeScale: 1.0,
        shapeDensity: 5.5,
        shapeParam: 2.0,
        gridOpacity: 0.15,
        isPublic: true,
      },
      {
        name: "Cyber Spirograph",
        shapeType: "spirograph",
        primaryColor: "#ff007f",
        secondaryColor: "#00f2fe",
        backgroundColor: "#05020a",
        spinSpeed: 0.12,
        ditherLevels: 12,
        starDensity: 0.3,
        shapeScale: 1.1,
        shapeDensity: 3.0,
        shapeParam: 5.0,
        gridOpacity: 0.1,
        isPublic: true,
      },
      {
        name: "Solar Pulse Rings",
        shapeType: "rings",
        primaryColor: "#ff4e00",
        secondaryColor: "#f9d423",
        backgroundColor: "#080100",
        spinSpeed: 0.18,
        ditherLevels: 8,
        starDensity: 0.7,
        shapeScale: 0.9,
        shapeDensity: 8.0,
        shapeParam: 1.0,
        gridOpacity: 0.2,
        isPublic: true,
      },
      {
        name: "Cosmic Star Rose",
        shapeType: "rose",
        primaryColor: "#b000ff",
        secondaryColor: "#00e1ff",
        backgroundColor: "#020108",
        spinSpeed: 0.04,
        ditherLevels: 10,
        starDensity: 0.4,
        shapeScale: 1.0,
        shapeDensity: 2.0,
        shapeParam: 6.0,
        gridOpacity: 0.12,
        isPublic: true,
      },
      {
        name: "Monochrome Ray Burst",
        shapeType: "starburst",
        primaryColor: "#ffffff",
        secondaryColor: "#333333",
        backgroundColor: "#000000",
        spinSpeed: 0.02,
        ditherLevels: 4,
        starDensity: 0.8,
        shapeScale: 1.2,
        shapeDensity: 4.0,
        shapeParam: 8.0,
        gridOpacity: 0.3,
        isPublic: true,
      },
    ];
    await AgenticPreset.bulkCreate(defaults);
  }
};

// GET /api/agentic-presets
router.get("/", async (req, res) => {
  try {
    await seedDefaultPresets();
    const userId = getOptionalUserId(req);

    const whereClause = { isPublic: true };
    if (userId) {
      // Return both public presets and user's custom presets
      const presets = await AgenticPreset.findAll({
        where: {
          [AgenticPreset.sequelize.Sequelize.Op.or]: [
            { isPublic: true },
            { userId: userId },
          ],
        },
        order: [["createdAt", "ASC"]],
      });
      return res.json(presets);
    } else {
      const presets = await AgenticPreset.findAll({
        where: whereClause,
        order: [["createdAt", "ASC"]],
      });
      return res.json(presets);
    }
  } catch (error) {
    console.error("Error fetching agentic presets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/agentic-presets (authenticated)
router.post("/", authenticateUser, async (req, res) => {
  try {
    const {
      name,
      shapeType,
      primaryColor,
      secondaryColor,
      backgroundColor,
      spinSpeed,
      ditherLevels,
      starDensity,
      shapeScale,
      shapeDensity,
      shapeParam,
      gridOpacity,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Preset name is required" });
    }

    const preset = await AgenticPreset.create({
      userId: req.user.id,
      name,
      shapeType: shapeType || "galaxy",
      primaryColor: primaryColor || "#2ee06a",
      secondaryColor: secondaryColor || "#ffffff",
      backgroundColor: backgroundColor || "#030303",
      spinSpeed: spinSpeed !== undefined ? parseFloat(spinSpeed) : 0.1,
      ditherLevels: ditherLevels !== undefined ? parseInt(ditherLevels) : 8,
      starDensity: starDensity !== undefined ? parseFloat(starDensity) : 0.5,
      shapeScale: shapeScale !== undefined ? parseFloat(shapeScale) : 1.0,
      shapeDensity: shapeDensity !== undefined ? parseFloat(shapeDensity) : 1.0,
      shapeParam: shapeParam !== undefined ? parseFloat(shapeParam) : 2.0,
      gridOpacity: gridOpacity !== undefined ? parseFloat(gridOpacity) : 0.15,
      isPublic: false,
    });

    res.status(201).json(preset);
  } catch (error) {
    console.error("Error creating agentic preset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/agentic-presets/:id (authenticated)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const preset = await AgenticPreset.findOne({
      where: { id, userId: req.user.id },
    });

    if (!preset) {
      return res.status(404).json({ error: "Preset not found or unauthorized" });
    }

    await preset.destroy();
    res.json({ success: true, message: "Preset deleted successfully" });
  } catch (error) {
    console.error("Error deleting agentic preset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
