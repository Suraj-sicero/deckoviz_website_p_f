export interface WorldSeed {
  id: string;
  text: string;
  vibe: string;
  palette: string[];
  bgGradient: string;
  posterGradient: string;
  weatherHint: "rain" | "snow" | "mist" | "embers" | "dust" | "aurora" | "pollen";
  ambient: string;
}

export const SEEDS: WorldSeed[] = [
  {
    id: "rain-up",
    text: "A city where it rains upward.",
    vibe: "Soft sci-fi, melancholic, glittering",
    palette: ["#22d3ee", "#a78bfa", "#0c4a6e", "#fde68a"],
    bgGradient: "linear-gradient(180deg, #02101a, #0a2a3a 50%, #02101a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 50%, rgba(34,211,238,0.5), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(167,139,250,0.4), transparent 60%), linear-gradient(180deg, #02101a, #0a2a3a, #02101a)",
    weatherHint: "rain",
    ambient: "Wet stone, distant chimes, low hum",
  },
  {
    id: "forest-night",
    text: "A forest that moves at night.",
    vibe: "Mythic, hushed, glowing",
    palette: ["#10b981", "#fde047", "#064e3b", "#1e3a8a"],
    bgGradient: "linear-gradient(180deg, #02100a, #093a1a 50%, #02100a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 60%, rgba(16,185,129,0.5), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(253,224,71,0.4), transparent 60%), linear-gradient(180deg, #02100a, #093a1a, #02100a)",
    weatherHint: "pollen",
    ambient: "Crickets, leaves, deep breath of trees",
  },
  {
    id: "market-edge",
    text: "A market at the edge of the known world.",
    vibe: "Spice, dust, lantern-warm",
    palette: ["#f59e0b", "#dc2626", "#7c2d12", "#fde68a"],
    bgGradient: "linear-gradient(180deg, #0a0604, #2a1208 50%, #0a0604)",
    posterGradient:
      "radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.55), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(220,38,38,0.4), transparent 60%), linear-gradient(180deg, #0a0604, #2a1208, #0a0604)",
    weatherHint: "dust",
    ambient: "Voices, copper bells, frying oil",
  },
  {
    id: "dying-star",
    text: "A station orbiting a dying star.",
    vibe: "Vast, golden, mournful",
    palette: ["#fbbf24", "#dc2626", "#0c0a1f", "#a78bfa"],
    bgGradient: "linear-gradient(180deg, #01010a, #0a0a2a 50%, #01010a)",
    posterGradient:
      "radial-gradient(ellipse at 80% 30%, rgba(251,191,36,0.55), transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(220,38,38,0.4), transparent 60%), linear-gradient(180deg, #01010a, #0a0a2a, #01010a)",
    weatherHint: "embers",
    ambient: "Reactor pulse, solar wind, distant alarms",
  },
  {
    id: "sleeping-creature",
    text: "A kingdom built inside a sleeping creature.",
    vibe: "Surreal, biological, holy",
    palette: ["#ec4899", "#a78bfa", "#7c2d12", "#fef3c7"],
    bgGradient: "linear-gradient(180deg, #100214, #2a0a30 50%, #100214)",
    posterGradient:
      "radial-gradient(ellipse at 30% 50%, rgba(236,72,153,0.5), transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(167,139,250,0.4), transparent 60%), linear-gradient(180deg, #100214, #2a0a30, #100214)",
    weatherHint: "mist",
    ambient: "Heartbeat, low cellos, breath",
  },
  {
    id: "aurora-monastery",
    text: "A monastery beneath an endless aurora.",
    vibe: "Sacred, cold, luminous",
    palette: ["#34d399", "#a78bfa", "#155e75", "#fde68a"],
    bgGradient: "linear-gradient(180deg, #02141a, #0a2a3a 50%, #02141a)",
    posterGradient:
      "radial-gradient(ellipse at 50% 30%, rgba(52,211,153,0.5), transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(167,139,250,0.4), transparent 60%), linear-gradient(180deg, #02141a, #0a2a3a, #02141a)",
    weatherHint: "aurora",
    ambient: "Choir drones, wind, single distant bell",
  },
];

export const VIZZY_SEED_SUGGESTIONS = [
  "A library where the books grow back.",
  "A river that only flows when someone is listening.",
  "A village inhabited entirely by lighthouse keepers.",
  "A floating ruin that hums when the moon is full.",
  "A glass desert beneath a permanently overcast sky.",
];

export function rollVizzySeed(): WorldSeed {
  const text = VIZZY_SEED_SUGGESTIONS[Math.floor(Math.random() * VIZZY_SEED_SUGGESTIONS.length)];
  // start from a random base for palette/vibe
  const base = SEEDS[Math.floor(Math.random() * SEEDS.length)];
  return { ...base, id: `vizzy-${Date.now()}`, text };
}
