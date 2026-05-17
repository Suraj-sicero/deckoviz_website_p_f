// Pricing tiers and per-action credit costs.
// Tier definitions match the UI on /subscription.

export const TIERS = {
  starter: {
    name: "Starter",
    monthlyCredits: 50,
    priceCents: 0,
    perActionMultiplier: 1,
  },
  creator: {
    name: "Creator",
    monthlyCredits: 500,
    priceCents: 1200,
    perActionMultiplier: 1,
  },
  studio: {
    name: "Studio",
    monthlyCredits: 2500,
    priceCents: 3900,
    perActionMultiplier: 1,
  },
};

// Credit cost per generation action. Free actions are listed for clarity.
export const ACTION_COST = {
  image: 1,         // text-to-image
  imageBatch: 1,    // multiplied by num_outputs in code
  inpaint: 2,       // img2img edit
  music: 5,         // ~30s clip
  video: 10,        // ~5s LTX clip
  chat: 0,          // free
  analyze: 0,       // free (Gemini Flash is cheap)
  narrate: 0,       // free
};

export function getActionCost(action, count = 1) {
  const base = ACTION_COST[action] ?? 0;
  return base * Math.max(count, 1);
}
