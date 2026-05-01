import express from "express";
import axios from "axios";
const router = express.Router();

const MARBLE_API   = "https://api.worldlabs.ai/marble/v1";
const MARBLE_KEY   = process.env.MARBLE_KEY;

function marbleHeaders() {
  return { "WLT-Api-Key": MARBLE_KEY, "Content-Type": "application/json" };
}

/**
 * Dual-strategy poll:
 * 1. Watch operation endpoint for done:true (primary)
 * 2. Watch world endpoint for assets != null (fallback — Marble sometimes
 *    populates the world before flipping done:true on the operation)
 * Returns the world object with assets.
 */
async function pollForWorld(operationId, worldId) {
  const TIMEOUT  = 15 * 60 * 1000; // 15 min
  const INTERVAL = 8000;            // 8 s
  const deadline = Date.now() + TIMEOUT;

  while (Date.now() < deadline) {
    // Check operation
    try {
      const { data: op } = await axios.get(
        `${MARBLE_API}/operations/${operationId}`,
        { headers: marbleHeaders(), timeout: 10000 }
      );

      // Grab world_id from metadata if we don't have it yet
      if (!worldId && op?.metadata?.world_id) {
        worldId = op.metadata.world_id;
      }

      const status = op?.metadata?.progress?.status ?? (op?.done ? 'DONE' : 'IN_PROGRESS');
      console.log(`[Marble] op=${operationId} done=${op.done} status=${status} world=${worldId}`);

      if (op.error) throw new Error(`Marble op error: ${JSON.stringify(op.error)}`);

      if (op.done && op.response) {
        console.log('[Marble] Operation done via response field');
        return op.response;
      }
    } catch (e) {
      console.warn(`[Marble] Operation poll error: ${e.message}`);
    }

    // Fallback: poll world directly for assets
    if (worldId) {
      try {
        const { data: wd } = await axios.get(
          `${MARBLE_API}/worlds/${worldId}`,
          { headers: marbleHeaders(), timeout: 10000 }
        );
        // API returns flat object: { world_id, assets, ... } (no wrapper)
        const world = wd.world || wd;
        const hasAssets = world?.assets != null &&
          (world.assets.splats != null || world.assets.thumbnail_url != null);
        
        if (hasAssets) {
          console.log('[Marble] ✅ World assets ready via world endpoint!');
          return world;
        }
      } catch (e) {
        console.warn(`[Marble] World poll error: ${e.message}`);
      }
    }

    await new Promise(r => setTimeout(r, 5000)); // Poll every 5s
  }

  throw new Error("Marble world generation timed out after 15 minutes");
}

/**
 * POST /api/generate-world
 * Body: { prompt: string, imageUrl?: string }
 *
 * Flow:
 *  1. If imageUrl provided  → use image+text prompt (marble-1.1-plus)
 *  2. Otherwise             → text-only prompt (marble-1.1)
 *  3. Poll until done
 *  4. Return spz_urls, thumbnail_url, pano_url, caption, world_marble_url
 */
router.post("/generate-world", async (req, res) => {
  const { prompt, imageUrl } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });
  if (!MARBLE_KEY) return res.status(500).json({ error: "MARBLE_KEY not configured" });

  console.log(`[Marble] Starting world generation — prompt: "${prompt.slice(0,80)}" | image: ${imageUrl ? "yes" : "no"}`);

  try {
    // ── Step 1: Submit generation request ─────────────────────────────────────
    const worldPrompt = imageUrl
      ? {
          type: "image",
          text_prompt: prompt,
          image_prompt: { source: "uri", uri: imageUrl },
        }
      : {
          type: "text",
          text_prompt: prompt,
        };

    const model = imageUrl ? "marble-1.1-plus" : "marble-1.1";

    const { data: generateData } = await axios.post(
      `${MARBLE_API}/worlds:generate`,
      {
        display_name: prompt.slice(0, 60),
        model,
        world_prompt: worldPrompt,
      },
      { headers: marbleHeaders() }
    );

    const { operation_id } = generateData;
    // Extract world_id early from the generate response if present
    const earlyWorldId = generateData?.metadata?.world_id || null;
    console.log(`[Marble] operation_id=${operation_id} early_world_id=${earlyWorldId}`);

    // ── Step 2: Poll for completion (dual-strategy) ───────────────────────────
    const world = await pollForWorld(operation_id, earlyWorldId);

    const assets = world.assets || {};
    const spzUrls = assets.splats?.spz_urls || {};
    // API uses world_id (flat) OR id (from operation.response)
    const wid = world.world_id || world.id || worldId;

    console.log(`[Marble] Done! world_id=${wid} spz_500k=${spzUrls["500k"] ? "✓" : "✗"} pano=${assets.imagery?.pano_url ? "✓" : "✗"}`);

    return res.json({
      success: true,
      world_id:          wid,
      world_marble_url:  world.world_marble_url,
      thumbnail_url:     assets.thumbnail_url || null,
      pano_url:          assets.imagery?.pano_url || null,
      caption:           assets.caption || null,
      spz_urls: {
        "100k":    spzUrls["100k"]    || null,
        "150k":    spzUrls["150k"]    || null,
        "500k":    spzUrls["500k"]    || null,
        full_res:  spzUrls["full_res"]|| null,
      },
      collider_mesh_url: assets.mesh?.collider_mesh_url || null,
    });

  } catch (err) {
    console.error("[Marble] Error:", err.message);
    return res.status(500).json({
      error: err.message || "World generation failed",
    });
  }
});

/**
 * GET /api/world/:id
 * Fetch a previously generated world by ID
 */
router.get("/world/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${MARBLE_API}/worlds/${req.params.id}`,
      { headers: marbleHeaders() }
    );
    res.json({ success: true, world: data.world });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
