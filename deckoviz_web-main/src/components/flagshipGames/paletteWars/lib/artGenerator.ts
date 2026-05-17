import type { ArtMood } from "./moods";

/**
 * Procedural abstract artwork. Each call returns a self-contained SVG markup
 * shaped by the mood's palette and visual style. Designed to be swapped for a
 * real image-gen provider behind the same interface.
 */

export interface Artwork {
  id: string;
  svg: string;
  prompt: string;
  moodId: string;
  seed: number;
}

export interface ArtProvider {
  generate(input: { mood: ArtMood; round: number }): Promise<Artwork>;
}

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function rawArt(mood: ArtMood, r: () => number): string {
  const [a, b, c, d, e] = mood.palette;
  const strokes = Array.from({ length: 7 }, () => {
    const x1 = r() * 100;
    const y1 = r() * 100;
    const x2 = r() * 100;
    const y2 = r() * 100;
    const w = 4 + r() * 18;
    const col = [a, b, c, d, e][Math.floor(r() * 5)];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${0.55 + r() * 0.4}"/>`;
  }).join("");
  const blobs = Array.from({ length: 4 }, () => {
    const cx = r() * 100;
    const cy = r() * 100;
    const rx = 10 + r() * 30;
    const ry = 10 + r() * 30;
    const col = [a, b, c, d, e][Math.floor(r() * 5)];
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${col}" opacity="${0.3 + r() * 0.4}" filter="url(#blur)"/>`;
  }).join("");
  return `${blobs}${strokes}`;
}

function dreamArt(mood: ArtMood, r: () => number): string {
  const [a, b, c, d] = mood.palette;
  const circles = Array.from({ length: 12 }, () => {
    const cx = r() * 100;
    const cy = r() * 100;
    const radius = 8 + r() * 35;
    const col = [a, b, c, d][Math.floor(r() * 4)];
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${col}" opacity="${0.15 + r() * 0.35}" filter="url(#blur)"/>`;
  }).join("");
  const wave = `M0,${50 + r() * 15} C${20 + r() * 10},${30 + r() * 30} ${50 + r() * 10},${60 + r() * 20} 100,${40 + r() * 20}`;
  return `${circles}<path d="${wave}" stroke="${c}" stroke-width="1.5" fill="none" opacity="0.7"/>`;
}

function geoArt(mood: ArtMood, r: () => number): string {
  const [a, b, c, d, e] = mood.palette;
  const shapes = Array.from({ length: 9 }, () => {
    const x = r() * 80;
    const y = r() * 80;
    const w = 10 + r() * 35;
    const h = 10 + r() * 35;
    const col = [a, b, c, d, e][Math.floor(r() * 5)];
    const rot = r() * 360;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" transform="rotate(${rot} ${x + w / 2} ${y + h / 2})" opacity="${0.7 + r() * 0.3}"/>`;
  }).join("");
  const lines = Array.from({ length: 4 }, () => {
    const y = r() * 100;
    return `<line x1="0" y1="${y}" x2="100" y2="${y + (r() - 0.5) * 30}" stroke="${e}" stroke-width="0.6" opacity="0.5"/>`;
  }).join("");
  return `${shapes}${lines}`;
}

function quietArt(mood: ArtMood, r: () => number): string {
  const [a, b, c, d] = mood.palette;
  const fields = Array.from({ length: 3 }, (_, i) => {
    const y = 25 + i * 25 + r() * 8;
    const h = 6 + r() * 12;
    const col = [a, b, c, d][i % 4];
    return `<rect x="-5" y="${y}" width="110" height="${h}" fill="${col}" opacity="${0.3 + r() * 0.25}" filter="url(#blur)"/>`;
  }).join("");
  const dots = Array.from({ length: 18 }, () => {
    const cx = r() * 100;
    const cy = r() * 100;
    const col = [a, b, c, d][Math.floor(r() * 4)];
    return `<circle cx="${cx}" cy="${cy}" r="${0.4 + r() * 1}" fill="${col}" opacity="${0.4 + r() * 0.4}"/>`;
  }).join("");
  return `${fields}${dots}`;
}

function buildSvg(mood: ArtMood, content: string): string {
  const [a, b] = mood.palette;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="${a}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${b}" stop-opacity="0.9"/>
      </radialGradient>
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.4"/>
      </filter>
      <filter id="grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0"/>
      </filter>
    </defs>
    <rect width="100" height="100" fill="url(#bg)"/>
    ${content}
    <rect width="100" height="100" fill="transparent" filter="url(#grain)"/>
  </svg>`;
}

const STYLE_TO_RENDERER: Record<ArtMood["visualStyle"], (m: ArtMood, r: () => number) => string> = {
  raw: rawArt,
  dream: dreamArt,
  geo: geoArt,
  quiet: quietArt,
};

const PROMPTS = [
  "Something falling apart, gently.",
  "A memory the canvas refuses to clarify.",
  "Three colours that argued and made up.",
  "The opposite of an exit.",
  "What the dust was trying to say.",
  "A field, but the wrong one.",
  "Someone leaving and someone arriving, at once.",
  "A noise you can almost see.",
  "Light, but only the part that hurts.",
  "Everything you didn't write down.",
];

export const mockArtProvider: ArtProvider = {
  async generate({ mood, round }) {
    await new Promise((res) => setTimeout(res, 600 + Math.random() * 400));
    const seed = Math.floor(Math.random() * 1_000_000) + round * 13;
    const r = rng(seed);
    const renderer = STYLE_TO_RENDERER[mood.visualStyle];
    const content = renderer(mood, r);
    const svg = buildSvg(mood, content);
    const prompt = PROMPTS[Math.floor(r() * PROMPTS.length)];
    return { id: `art-${seed}`, svg, prompt, moodId: mood.id, seed };
  },
};
