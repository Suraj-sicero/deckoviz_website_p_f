export interface SessionMood {
  id: string;
  name: string;
  tagline: string;
  palette: string[];
  bgGradient: string;
  posterGradient: string;
  font: "serif" | "modern" | "fantasy";
  narrationTone: string;
  illustrationStyle: "noir" | "watercolor" | "comic" | "romance" | "adventure" | "abstract";
  particles: "ink" | "petals" | "sparks" | "fog";
}

export const MOODS: SessionMood[] = [
  {
    id: "absurdist",
    name: "Absurdist",
    tagline: "Logic optional. Beauty likely.",
    palette: ["#ec4899", "#fbbf24", "#22d3ee", "#a78bfa"],
    bgGradient: "linear-gradient(180deg, #0a0814, #1a0a2a 50%, #0a0814)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(236,72,153,0.55), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(251,191,36,0.4), transparent 60%), linear-gradient(180deg, #0a0814, #1a0a2a, #0a0814)",
    font: "modern",
    narrationTone: "Theatrical, overcommitted, slightly chaotic",
    illustrationStyle: "abstract",
    particles: "sparks",
  },
  {
    id: "lyrical",
    name: "Lyrical",
    tagline: "Slow vowels. Fast laughs.",
    palette: ["#a78bfa", "#f472b6", "#fde68a", "#0f0a1f"],
    bgGradient: "linear-gradient(180deg, #050214, #1d1240 50%, #050214)",
    posterGradient:
      "radial-gradient(ellipse at 30% 50%, rgba(167,139,250,0.5), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(244,114,182,0.4), transparent 60%), linear-gradient(180deg, #050214, #1d1240, #050214)",
    font: "serif",
    narrationTone: "Poetic, lifted, breath-y",
    illustrationStyle: "watercolor",
    particles: "petals",
  },
  {
    id: "noir",
    name: "Tense & Noir",
    tagline: "Rain. Neon. Suspect everyone.",
    palette: ["#e2e8f0", "#0c4a6e", "#0c0a09", "#dc2626"],
    bgGradient: "linear-gradient(180deg, #050510, #0a0a1a 50%, #050510)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(226,232,240,0.18), transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(220,38,38,0.25), transparent 60%), linear-gradient(180deg, #050510, #0a0a1a, #050510)",
    font: "serif",
    narrationTone: "Low, observational, faintly amused",
    illustrationStyle: "noir",
    particles: "fog",
  },
  {
    id: "romantic",
    name: "Romantic",
    tagline: "Soft light. Hard hearts.",
    palette: ["#fbcfe8", "#fde68a", "#9f1239", "#1c1917"],
    bgGradient: "linear-gradient(180deg, #0a0408, #1c0a14 50%, #0a0408)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(251,207,232,0.32), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(159,18,57,0.32), transparent 60%), linear-gradient(180deg, #0a0408, #1c0a14, #0a0408)",
    font: "serif",
    narrationTone: "Sighing, slow, audiobook-warm",
    illustrationStyle: "romance",
    particles: "petals",
  },
  {
    id: "adventure",
    name: "Adventure",
    tagline: "Maps. Magnets. Mistakes.",
    palette: ["#fbbf24", "#1d4ed8", "#10b981", "#1c1917"],
    bgGradient: "linear-gradient(180deg, #050a14, #0a1a30 50%, #050a14)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(251,191,36,0.4), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(29,78,216,0.4), transparent 60%), linear-gradient(180deg, #050a14, #0a1a30, #050a14)",
    font: "modern",
    narrationTone: "Bold, propulsive, breathless",
    illustrationStyle: "comic",
    particles: "sparks",
  },
  {
    id: "vizzys-whim",
    name: "Vizzy's Whim",
    tagline: "Vizzy decides per sentence.",
    palette: ["#22d3ee", "#fbbf24", "#ec4899", "#a78bfa"],
    bgGradient: "linear-gradient(180deg, #05050a, #15151a 50%, #05050a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(34,211,238,0.4), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(236,72,153,0.4), transparent 60%), linear-gradient(180deg, #05050a, #15151a, #05050a)",
    font: "modern",
    narrationTone: "Mercurial · changes every sentence",
    illustrationStyle: "abstract",
    particles: "ink",
  },
];

export const getMood = (id: string) => MOODS.find((m) => m.id === id) ?? MOODS[0];

export function rollMoodPerSentence(base: SessionMood, idx: number): SessionMood {
  if (base.id !== "vizzys-whim") return base;
  const pool = MOODS.filter((m) => m.id !== "vizzys-whim");
  return pool[idx % pool.length];
}
