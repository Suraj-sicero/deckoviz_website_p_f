export interface ArtMood {
  id: string;
  name: string;
  tagline: string;
  description: string;
  palette: string[];
  bgGradient: string;
  posterGradient: string;
  fontMood: "serif" | "modern" | "fantasy";
  particles: "ink" | "geometry" | "stillness" | "embers" | "haze";
  visualStyle: "raw" | "dream" | "geo" | "quiet";
  promptStyle: string;
  ambientNote: string;
  vizzyTone: string;
}

export const MOODS: ArtMood[] = [
  {
    id: "raw-emotive",
    name: "Raw & Emotive",
    tagline: "Bruised brushstrokes, honest colour",
    description:
      "Heavy paint, unforgiving edges, palettes that feel almost too true.",
    palette: ["#ef4444", "#7c2d12", "#fde68a", "#1c1917", "#f97316"],
    bgGradient: "linear-gradient(180deg, #0a0405, #240a0a 50%, #0a0405)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(239,68,68,0.55), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(249,115,22,0.45), transparent 60%), linear-gradient(180deg, #0a0405, #2a0a0a, #0a0405)",
    fontMood: "serif",
    particles: "ink",
    visualStyle: "raw",
    promptStyle: "Confessional, urgent, alive",
    ambientNote: "Cellos, distant rain, breath",
    vizzyTone: "Tender, unsparing, beautiful",
  },
  {
    id: "dreamlike-surreal",
    name: "Dreamlike & Surreal",
    tagline: "Where edges forget themselves",
    description: "Soft impossibilities, hazy logic, sleep-coloured palettes.",
    palette: ["#a78bfa", "#f472b6", "#22d3ee", "#fde68a", "#0f0a1f"],
    bgGradient: "linear-gradient(180deg, #050214, #1a0d3a 50%, #050214)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(167,139,250,0.55), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(244,114,182,0.4), transparent 60%), linear-gradient(180deg, #050214, #2a1a4a, #050214)",
    fontMood: "fantasy",
    particles: "haze",
    visualStyle: "dream",
    promptStyle: "Whispered, half-remembered, half-imagined",
    ambientNote: "Reversed strings, music-box echoes",
    vizzyTone: "Slow, half-asleep, lyrical",
  },
  {
    id: "bold-geometric",
    name: "Bold & Geometric",
    tagline: "Hard lines, loud opinions",
    description: "Saturated planes, knife-edge geometry, modernist swagger.",
    palette: ["#0ea5e9", "#fbbf24", "#ef4444", "#10b981", "#f1f5f9"],
    bgGradient: "linear-gradient(180deg, #04101a, #0a1830 50%, #04101a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(14,165,233,0.55), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(251,191,36,0.5), transparent 60%), linear-gradient(180deg, #04101a, #0a2840, #04101a)",
    fontMood: "modern",
    particles: "geometry",
    visualStyle: "geo",
    promptStyle: "Declarative, certain, glossy",
    ambientNote: "Bright synth pulses, taut percussion",
    vizzyTone: "Confident, gallery-cool, witty",
  },
  {
    id: "quiet-contemplative",
    name: "Quiet & Contemplative",
    tagline: "Pale, patient, still",
    description: "Empty rooms, low contrast, breath in the canvas.",
    palette: ["#94a3b8", "#e2e8f0", "#d1d5db", "#fef3c7", "#0f172a"],
    bgGradient: "linear-gradient(180deg, #060709, #161a1f 50%, #060709)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(148,163,184,0.4), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(254,243,199,0.3), transparent 60%), linear-gradient(180deg, #060709, #1a1d23, #060709)",
    fontMood: "serif",
    particles: "stillness",
    visualStyle: "quiet",
    promptStyle: "Spare, sincere, slow",
    ambientNote: "Felt piano, room tone, distant traffic",
    vizzyTone: "Hushed, kind, observant",
  },
  {
    id: "vizzy-decides",
    name: "Let Vizzy Decide",
    tagline: "Surprise yourselves",
    description: "Vizzy picks the mood for each round. Anything is possible.",
    palette: ["#a78bfa", "#22d3ee", "#fbbf24", "#f472b6", "#10b981"],
    bgGradient: "linear-gradient(180deg, #050214, #1c1c30 50%, #050214)",
    posterGradient:
      "radial-gradient(ellipse at 20% 20%, rgba(167,139,250,0.5), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(34,211,238,0.45), transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(251,191,36,0.35), transparent 60%), linear-gradient(180deg, #050214, #181828, #050214)",
    fontMood: "modern",
    particles: "ink",
    visualStyle: "raw",
    promptStyle: "Whatever the moment asks for",
    ambientNote: "Adaptive · evolves per round",
    vizzyTone: "Mercurial, playful, varied",
  },
];

export const getMood = (id: string): ArtMood => MOODS.find((m) => m.id === id) ?? MOODS[0];

export function rollMoodFor(round: number, base: ArtMood): ArtMood {
  if (base.id !== "vizzy-decides") return base;
  const choices = MOODS.filter((m) => m.id !== "vizzy-decides");
  return choices[round % choices.length];
}
