import type { WorldSeed } from "./worldSeeds";
import type { Contribution, Phase } from "./dreamArchitectState";

/**
 * Compose a TV-frame backdrop that gets denser as the world grows.
 * Each contribution adds a soft "layer" to the composite background.
 */
export interface WorldRender {
  background: string;
  overlay: string;
  particles: WorldSeed["weatherHint"];
  detailLayers: number;
}

export function renderWorld(seed: WorldSeed, contributions: Contribution[], phase: Phase): WorldRender {
  const [a, b, c, d] = seed.palette;
  const layers: string[] = [];
  layers.push(`radial-gradient(ellipse at 30% ${30 + Math.min(contributions.length, 8) * 4}%, ${a}99 0%, transparent 55%)`);
  layers.push(`radial-gradient(ellipse at 70% ${70 - Math.min(contributions.length, 8) * 3}%, ${b}88 0%, transparent 60%)`);
  if (contributions.some((c) => c.phase === "atmosphere")) {
    layers.push(`radial-gradient(ellipse at 50% 20%, ${c}66 0%, transparent 50%)`);
  }
  if (contributions.some((c) => c.phase === "inhabitants")) {
    layers.push(`radial-gradient(ellipse at 50% 90%, ${d}66 0%, transparent 50%)`);
  }
  if (contributions.some((c) => c.phase === "secret")) {
    layers.push(`radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 60%)`);
  }
  layers.push(seed.bgGradient);

  const overlay =
    phase === "secret"
      ? "radial-gradient(circle at 50% 50%, transparent 25%, rgba(0,0,0,0.55) 80%)"
      : "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)";

  return {
    background: layers.join(", "),
    overlay,
    particles: seed.weatherHint,
    detailLayers: contributions.length,
  };
}
