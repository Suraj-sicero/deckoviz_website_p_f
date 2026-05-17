import type { Genre } from "./genres";
import type { Twist } from "./twistEngine";

/**
 * Provider abstractions. Mocks return cinematic content built locally so the
 * game ships demo-ready. Real providers can be plugged into the same interface
 * later (Replicate / OpenAI / ElevenLabs / etc.).
 */

export interface SceneIllustration {
  id: string;
  background: string;
  overlay: string;
  particleHint: string;
  prompt: string;
}

export interface NarrationChunk {
  text: string;
  delayMs: number;
}

export interface ImageProvider {
  generateScene(input: {
    genre: Genre;
    storySoFar: string[];
    round: number;
    twist?: Twist | null;
  }): Promise<SceneIllustration>;
}

export interface NarrationProvider {
  narrate(input: {
    text: string;
    genre: Genre;
    type: "sentence" | "twist" | "summary" | "ending" | "intro";
  }): AsyncIterable<NarrationChunk>;
}

/* ---------- Mock Image Provider ---------- */

const SCENE_PALETTES: Record<string, [string, string, string]> = {
  "dark-fable": ["#3b0764", "#1e1b4b", "#fbbf24"],
  "space-opera": ["#0c4a6e", "#0f172a", "#22d3ee"],
  "quiet-village": ["#7c2d12", "#1c1917", "#fde68a"],
  "mythic-quest": ["#7c2d12", "#0c0a09", "#fbbf24"],
  "urban-mystery": ["#831843", "#0a0a14", "#22d3ee"],
  "surreal-dream": ["#5b21b6", "#0e0a1f", "#f472b6"],
  "childrens-wonder": ["#155e75", "#082f49", "#fde68a"],
};

export const mockImageProvider: ImageProvider = {
  async generateScene({ genre, storySoFar, round, twist }) {
    await wait(450 + Math.random() * 350);
    const [a, b, c] = SCENE_PALETTES[genre.id] ?? ["#1e1b4b", "#050505", "#a78bfa"];
    const seed = (round * 37 + (twist?.id?.length ?? 0)) % 100;
    const angle1 = 20 + (seed % 40);
    const angle2 = 60 + (seed % 30);

    const background = `
      radial-gradient(ellipse at ${angle1}% ${angle2}%, ${a}cc 0%, transparent 55%),
      radial-gradient(ellipse at ${100 - angle1}% ${100 - angle2}%, ${c}66 0%, transparent 60%),
      linear-gradient(160deg, ${b}, #000 80%)
    `;

    const overlay = `radial-gradient(circle at 50% 50%, transparent 0%, ${b}66 70%, ${b}cc 100%)`;
    return {
      id: `scene-${round}-${Date.now()}`,
      background,
      overlay,
      particleHint: genre.particles,
      prompt: synthPrompt(storySoFar, genre, twist),
    };
  },
};

function synthPrompt(story: string[], genre: Genre, twist?: Twist | null) {
  const last = story.slice(-2).join(" ");
  const twistLine = twist ? ` Twist in play: ${twist.text}` : "";
  return `Cinematic ${genre.name} illustration, mood: ${genre.mood}. Story beat: ${last}.${twistLine}`;
}

/* ---------- Mock Narration Provider ---------- */

export const mockNarrationProvider: NarrationProvider = {
  async *narrate({ text, type }) {
    const segments = chunkSentence(text);
    const baseDelay = type === "ending" ? 110 : type === "twist" ? 90 : 70;
    for (const segment of segments) {
      yield { text: segment, delayMs: baseDelay + Math.random() * 40 };
    }
  },
};

function chunkSentence(text: string): string[] {
  // Split into small word groups so the typewriter feels paced like narration.
  const words = text.split(/\s+/);
  const out: string[] = [];
  let buf: string[] = [];
  for (const w of words) {
    buf.push(w);
    if (buf.length >= 2 + Math.floor(Math.random() * 3)) {
      out.push(buf.join(" "));
      buf = [];
    }
  }
  if (buf.length) out.push(buf.join(" "));
  return out;
}

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

/* ---------- Story-level mocks (titles, endings, archetypes) ---------- */

export async function generateStoryTitle(
  storyLines: string[],
  genre: Genre,
): Promise<string> {
  await wait(400);
  const seed =
    storyLines.find((l) => l.length > 12)?.split(/[,.]/)[0] ?? "An Unwritten Hour";
  const titles = [
    `The ${pickNoun(seed)} of ${genre.name.split(" ")[0]}`,
    `Where the ${pickNoun(seed)} Goes`,
    `A ${genre.name} for the ${pickNoun(seed)}`,
    `The Last ${pickNoun(seed)}`,
    `On the Night of the ${pickNoun(seed)}`,
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function pickNoun(line: string): string {
  const candidates = line
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 4)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
  if (candidates.length === 0) return "Lantern";
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export async function generateEnding(input: {
  storyLines: string[];
  tone: "triumphant" | "ambiguous" | "tragic" | "surprising";
  genre: Genre;
}): Promise<string> {
  await wait(600);
  const { tone } = input;
  const tail =
    tone === "triumphant"
      ? "And though the road behind them was long, the road ahead was finally theirs."
      : tone === "tragic"
      ? "And the world, indifferent, kept its slow turning, as worlds do."
      : tone === "surprising"
      ? "And what came next, no one — not even the storyteller — had quite imagined."
      : "And whether it was an ending at all, none of them could say for certain.";

  const closer = `In the quiet that followed, the ${input.genre.name.toLowerCase()} held its breath. ${tail}`;
  return closer;
}

export interface ArchetypeAssignment {
  playerId: string;
  archetype: string;
  reason: string;
}

const ARCHETYPES = [
  { name: "The Architect", reason: "built scaffolding the story leaned on" },
  { name: "The Wildcard", reason: "kept changing the shape of the night" },
  { name: "The Poet", reason: "left language people will quote later" },
  { name: "The Plot Twister", reason: "bent every twist towards the unexpected" },
  { name: "The Anchor", reason: "held the emotional center when it mattered" },
  { name: "The Cartographer", reason: "kept the world coherent even as it shifted" },
];

export async function assignArchetypes(
  contributions: { playerId: string; lines: string[] }[],
): Promise<ArchetypeAssignment[]> {
  await wait(350);
  return contributions.map((c, i) => {
    const a = ARCHETYPES[i % ARCHETYPES.length];
    return { playerId: c.playerId, archetype: a.name, reason: a.reason };
  });
}
