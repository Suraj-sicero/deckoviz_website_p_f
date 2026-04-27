import express from "express";
import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

router.post("/dream/generate", async (req, res) => {
  const { prompt, style, seed = Math.floor(Math.random() * 1000000) } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const fullPrompt = `${style} style, ${prompt}, surreal, dream-like, high resolution, 4k`;

  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      console.warn("⚠️ No REPLICATE_API_TOKEN found. Using mock frames.");
      // Return mock images from Unsplash or similar
      const mockFrames = [
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=512&h=512&fit=crop",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=512&h=512&fit=crop",
        "https://images.unsplash.com/photo-1550684847-75bdda21ce95?w=512&h=512&fit=crop",
        "https://images.unsplash.com/photo-1533134486753-c81769835c68?w=512&h=512&fit=crop"
      ];
      return res.json({ frames: mockFrames, seed });
    }

    // Generate 4 frames (keyframes)
    // To keep it fast, we can run them in parallel or use a model that supports multiple outputs
    const framePromises = [0, 1, 2, 3].map((i) => {
      return replicate.run(
        "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
        {
          input: {
            prompt: fullPrompt,
            seed: seed + i,
            width: 512,
            height: 512,
            num_inference_steps: 4
          },
        }
      );
    });

    const results = await Promise.all(framePromises);
    const frames = results.map(res => String(Array.isArray(res) ? res[0] : res));

    res.json({ frames, seed });
  } catch (error) {
    console.error("Dream Generation Error:", error);
    res.status(500).json({ error: "Failed to generate dream frames." });
  }
});

export default router;
