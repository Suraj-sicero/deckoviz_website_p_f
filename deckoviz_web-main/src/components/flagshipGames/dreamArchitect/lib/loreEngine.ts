import type { Contribution } from "./dreamArchitectState";
import type { WorldSeed } from "./worldSeeds";

export const PHASE_DETAILS = {
  geography: {
    label: "Geography",
    title: "Phase I · The Shape of the Place",
    description: "Describe the bones of the world: terrain, structures, weather, distances.",
    examples: [
      "A river runs through the centre and never freezes.",
      "The towers lean toward each other like they are whispering.",
      "The streets are carved into giant tree roots.",
    ],
    ambientNote: "Wide. Slow. Cartographer's quiet.",
  },
  atmosphere: {
    label: "Atmosphere",
    title: "Phase II · The Feeling of the Air",
    description: "Smells, sounds, light, temperature, the time-of-day feeling.",
    examples: [
      "At dusk the city smells like burned sugar and rain.",
      "There is always a low musical hum.",
      "The air tastes metallic before storms.",
    ],
    ambientNote: "Halos, particles, slow shifting light.",
  },
  inhabitants: {
    label: "Inhabitants",
    title: "Phase III · The Ones Who Live Here",
    description: "Cultures, rituals, beliefs, creatures, languages, daily life.",
    examples: [
      "People never say goodbye here.",
      "Children wear bells so the city remembers them.",
      "The oldest citizens slowly become transparent.",
    ],
    ambientNote: "Distant voices, small ceremonies, footprints.",
  },
  secret: {
    label: "The Secret",
    title: "Phase IV · The Hidden Truth",
    description: "Each player adds one strange, hidden, or unsettling secret.",
    examples: [
      "The river is not water.",
      "The city itself is alive.",
      "Nobody here remembers the sky correctly.",
    ],
    ambientNote: "Hush. Heart-rate. Reveal.",
  },
} as const;

export type PhaseKey = keyof typeof PHASE_DETAILS;

/**
 * Compose a paragraph-length poetic description of the finished world by
 * weaving phase contributions. Mock substitute for an LLM finisher.
 */
export function describeWorld(seed: WorldSeed, contributions: Contribution[]): string {
  const grouped: Record<PhaseKey, string[]> = {
    geography: [],
    atmosphere: [],
    inhabitants: [],
    secret: [],
  };
  for (const c of contributions) grouped[c.phase].push(c.text);

  const lead = `${seed.text}`;
  const geo = grouped.geography[0]
    ? ` Here, ${decap(grouped.geography[0])}`
    : "";
  const atm = grouped.atmosphere[0]
    ? ` ${grouped.atmosphere[0]}`
    : "";
  const inh = grouped.inhabitants[0]
    ? ` Those who live here believe that ${decap(grouped.inhabitants[0])}`
    : "";
  const sec = grouped.secret[0]
    ? ` And, though nobody speaks of it: ${decap(grouped.secret[0])}`
    : "";

  return `${lead}${geo}${atm}${inh}${sec}`;
}

function decap(s: string): string {
  const trimmed = s.trim();
  if (!trimmed) return trimmed;
  return trimmed[0].toLowerCase() + trimmed.slice(1);
}

/**
 * Name the world by pulling distinctive nouns from contributions + seed.
 */
export function nameWorld(seed: WorldSeed, contributions: Contribution[]): string {
  const corpus = [seed.text, ...contributions.map((c) => c.text)].join(" ");
  const nouns = corpus
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 5);
  const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : "Place");
  const pick = () => cap(nouns[Math.floor(Math.random() * nouns.length)] ?? "Hollow");
  const patterns = [
    () => `The ${pick()} of ${pick()}`,
    () => `${pick()}'s ${pick()}`,
    () => `The Last ${pick()}`,
    () => `Where ${pick()} Waits`,
    () => `Beneath the ${pick()}`,
  ];
  return patterns[Math.floor(Math.random() * patterns.length)]();
}

export function chooseSecret(contributions: Contribution[]): Contribution | null {
  const secrets = contributions.filter((c) => c.phase === "secret");
  if (secrets.length === 0) return null;
  // pick the longest secret as "most visually compelling"
  return [...secrets].sort((a, b) => b.text.length - a.text.length)[0];
}

const BADGES = ["Visionary", "Architect of Mysteries", "Lorekeeper", "Dreamshaper"] as const;

export function awardBadges(
  players: { id: string; name: string; contributions: Record<PhaseKey, number> }[],
): { playerId: string; badge: string }[] {
  // simple rule: top contributor in each phase gets a badge; remaining players get Dreamshaper
  const result: { playerId: string; badge: string }[] = [];
  const phases: PhaseKey[] = ["geography", "atmosphere", "inhabitants", "secret"];
  const awarded = new Set<string>();
  phases.forEach((phase, i) => {
    const sorted = [...players].sort(
      (a, b) => (b.contributions[phase] ?? 0) - (a.contributions[phase] ?? 0),
    );
    const top = sorted.find((p) => !awarded.has(p.id) && p.contributions[phase] > 0);
    if (top) {
      awarded.add(top.id);
      result.push({ playerId: top.id, badge: BADGES[i] });
    }
  });
  for (const p of players) {
    if (!awarded.has(p.id)) result.push({ playerId: p.id, badge: "Dreamshaper" });
  }
  return result;
}
