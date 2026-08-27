export type ExpeditionKind = "people" | "history" | "mythology" | "language" | "crisis" | "hidden";

export interface FoundingAnswers {
  worldShape: string;
  definingFeature: string;
  emotionalKind: string;
  collectiveFear: string;
  collectiveCelebration: string;
  greatUnansweredQuestion: string;
  morningSmell: string;
}

export interface MapLayer {
  id: string;
  kind: "coast" | "river" | "mountain" | "city" | "border" | "region" | "ruin" | "biome" | "event";
  label: string;
  // svg-ish coordinates (0..100) so the map renders procedurally
  x: number;
  y: number;
  size: number;
  hue: string;
}

export interface LoreEntry {
  id: string;
  kind: ExpeditionKind | "founding" | "event" | "contradiction";
  title: string;
  body: string;
  authorPlayerId: string | null;
  createdAt: number;
}

export interface OpenQuestion {
  id: string;
  text: string;
  origin: "vizzy" | "player";
  createdAt: number;
  pinned: boolean;
}

export interface Contradiction {
  id: string;
  newClaim: string;
  oldClaim: string;
  status: "open" | "resolved-new" | "resolved-old" | "canonized";
  createdAt: number;
}

export interface WorldEvent {
  id: string;
  title: string;
  description: string;
  generation: number;
  createdAt: number;
}

export interface Expedition {
  id: string;
  kind: ExpeditionKind;
  title: string;
  notes: string;
  loreIds: string[];
  questionIds: string[];
  layerIds: string[];
  createdAt: number;
}

export interface WorldArchive {
  id: string;
  name: string | null;
  founding: FoundingAnswers | null;
  layers: MapLayer[];
  lore: LoreEntry[];
  questions: OpenQuestion[];
  contradictions: Contradiction[];
  events: WorldEvent[];
  expeditions: Expedition[];
  depth: {
    geography: number;
    people: number;
    history: number;
    mythology: number;
    culture: number;
    mystery: number;
  };
  createdAt: number;
  updatedAt: number;
}

export interface Player {
  id: string;
  name: string;
  color: string;
}

export interface ExpeditionTemplate {
  kind: ExpeditionKind;
  label: string;
  description: string;
  questions: string[];
  affects: (keyof WorldArchive["depth"])[];
}

export const EXPEDITIONS: ExpeditionTemplate[] = [
  {
    kind: "people",
    label: "The People",
    description: "Cultures, societies, daily life.",
    questions: [
      "Who lives here?",
      "How do they love?",
      "What do they fear?",
      "What is ordinary life like?",
    ],
    affects: ["people", "culture"],
  },
  {
    kind: "history",
    label: "The History",
    description: "Wars, migrations, empires.",
    questions: [
      "What war divided this world?",
      "Which migration is still remembered?",
      "What empire ended here?",
      "What discovery changed everything?",
    ],
    affects: ["history", "geography"],
  },
  {
    kind: "mythology",
    label: "The Mythology",
    description: "Gods, rituals, forbidden stories.",
    questions: [
      "Who made the world, in the local telling?",
      "What ritual marks the new year?",
      "Which story is forbidden to tell aloud?",
      "Who is the hero that returns?",
    ],
    affects: ["mythology", "culture"],
  },
  {
    kind: "language",
    label: "The Language",
    description: "Sound, untranslatable concepts.",
    questions: [
      "What does the language sound like?",
      "What word here cannot translate?",
      "What concept exists only in this world?",
      "How do strangers greet one another?",
    ],
    affects: ["culture", "mystery"],
  },
  {
    kind: "crisis",
    label: "The Crisis",
    description: "An event that destabilizes everything.",
    questions: [
      "What is the crisis?",
      "Who is blamed?",
      "Who profits?",
      "What is forever lost?",
    ],
    affects: ["history", "people"],
  },
  {
    kind: "hidden",
    label: "The Hidden",
    description: "Secrets most inhabitants do not know.",
    questions: [
      "What is hidden in this world?",
      "Who knows?",
      "What protects it?",
      "What would happen if it were found?",
    ],
    affects: ["mystery", "mythology"],
  },
];

export const WORLD_EVENT_BANK = [
  { title: "Volcanic Awakening", description: "A long-dormant peak in the south coughs ash for thirty days." },
  { title: "A Foreign Sail", description: "Three ships of a design nobody recognizes anchor off the coast." },
  { title: "The Quiet Plague", description: "A sickness arrives that does not kill but takes language for years." },
  { title: "Religious Schism", description: "The eastern and western temples disagree on a single word, irrevocably." },
  { title: "Mass Migration", description: "An entire valley empties between one autumn and the next." },
  { title: "The Sky Listened", description: "For a single afternoon, the stars are visible at noon." },
];

export const VIZZY_QUESTION_BANK = [
  "Why are there no birds in the eastern continent?",
  "Who built the underground towers?",
  "Why do maps disagree about the northern sea?",
  "What language do the children sing in that no adult understands?",
  "Why does the river change direction once a generation?",
  "What is the name nobody is willing to write down?",
];

export function generateLayersFromFounding(answers: FoundingAnswers): MapLayer[] {
  const layers: MapLayer[] = [];
  // a coastline (curved)
  layers.push({ id: `coast-${Date.now()}-1`, kind: "coast", label: "Western Coast", x: 8, y: 50, size: 70, hue: "#94a3b8" });
  // an iconic feature based on the defining-feature text
  const text = (answers.definingFeature || "").toLowerCase();
  if (/canyon|chasm/.test(text)) {
    layers.push({ id: `region-${Date.now()}-c`, kind: "region", label: "The Endless Canyon", x: 50, y: 50, size: 40, hue: "#7c2d12" });
  } else if (/ocean|sea|water/.test(text)) {
    layers.push({ id: `biome-${Date.now()}-o`, kind: "biome", label: "Living Ocean", x: 25, y: 30, size: 35, hue: "#0c4a6e" });
  } else if (/mountain|peak/.test(text)) {
    layers.push({ id: `mountain-${Date.now()}-m`, kind: "mountain", label: "Sky-Root Peaks", x: 55, y: 25, size: 30, hue: "#475569" });
  } else if (/desert|dune/.test(text)) {
    layers.push({ id: `biome-${Date.now()}-d`, kind: "biome", label: "Migrating Desert", x: 60, y: 60, size: 35, hue: "#a16207" });
  } else if (/storm|cloud/.test(text)) {
    layers.push({ id: `event-${Date.now()}-s`, kind: "event", label: "The Permanent Storm", x: 70, y: 35, size: 28, hue: "#0ea5e9" });
  } else {
    layers.push({ id: `region-${Date.now()}-x`, kind: "region", label: "Heartland", x: 50, y: 50, size: 25, hue: "#92400e" });
  }
  // a default city
  layers.push({ id: `city-${Date.now()}-1`, kind: "city", label: "First Settlement", x: 35, y: 55, size: 6, hue: "#fde68a" });
  // a river
  layers.push({ id: `river-${Date.now()}-1`, kind: "river", label: "The Long River", x: 30, y: 65, size: 50, hue: "#0c4a6e" });
  return layers;
}

export function generateLayerFromExpedition(kind: ExpeditionKind, seed: number): MapLayer {
  const palette: Record<ExpeditionKind, [MapLayer["kind"], string, string]> = {
    people: ["city", "Settlement", "#fbbf24"],
    history: ["ruin", "Ancient Ruin", "#78350f"],
    mythology: ["region", "Sacred Site", "#a78bfa"],
    language: ["region", "Tongue Region", "#34d399"],
    crisis: ["event", "Crisis Marker", "#dc2626"],
    hidden: ["ruin", "Buried Thing", "#1c1917"],
  };
  const [layerKind, baseLabel, hue] = palette[kind];
  return {
    id: `${layerKind}-${Date.now()}-${seed}`,
    kind: layerKind,
    label: `${baseLabel} ${seed + 1}`,
    x: 15 + (seed * 13) % 70,
    y: 18 + (seed * 31) % 64,
    size: layerKind === "city" ? 5 : layerKind === "ruin" ? 7 : 18,
    hue,
  };
}
