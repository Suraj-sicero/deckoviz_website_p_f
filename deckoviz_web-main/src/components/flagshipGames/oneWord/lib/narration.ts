import type { SessionMood } from "./sessionMoods";
import type { Word } from "./oneWordState";

const VIZZY_INTERJECTIONS = [
  "suddenly,",
  "regrettably,",
  "anyway",
  "however",
  "honestly",
  "meanwhile",
  "again",
  "alas",
  "nevertheless,",
  "regardless",
];

export function narrate(sentence: string, mood: SessionMood): string {
  // Light decoration so it sounds 'narrated' in the chosen tone
  const cleaned = sentence.replace(/\s+/g, " ").trim();
  const trailers: Record<SessionMood["narrationTone"] | "default", string> = {
    "Theatrical, overcommitted, slightly chaotic": ` - Vizzy delivers this with the full weight of unearned conviction.`,
    "Poetic, lifted, breath-y": ` - Vizzy lets the pause that follows speak.`,
    "Low, observational, faintly amused": ` - Vizzy lights a cigarette nobody actually lit.`,
    "Sighing, slow, audiobook-warm": ` - Vizzy's voice cracks on the last word, just slightly.`,
    "Bold, propulsive, breathless": ` - Vizzy delivers this like a film trailer running out of breath.`,
    "Mercurial · changes every sentence": ` - Vizzy seems to mean it. Probably.`,
    default: ` - Vizzy lets the silence land.`,
  };
  return `${cleaned}${trailers[mood.narrationTone as keyof typeof trailers] ?? trailers.default}`;
}

export function pickVizzyInterruptWord(): string {
  return VIZZY_INTERJECTIONS[Math.floor(Math.random() * VIZZY_INTERJECTIONS.length)];
}

/**
 * Rate how 'satisfying' a sentence ending is.
 * Heuristics: longer sentences with closer of >= 6 words, ending after a noun-like
 * word (capitalized or longer than 4 chars), get more stars.
 */
export function rateCloser(sentence: string, words: Word[]): 0 | 1 | 2 | 3 {
  if (words.length < 4) return 0;
  const last = words[words.length - 1]?.text ?? "";
  let stars: 0 | 1 | 2 | 3 = 1;
  if (last.length > 4) stars = 2;
  if (sentence.length > 60) stars = 3;
  if (last.length <= 2) stars = 0;
  if (words.length >= 8 && stars > 0 && stars < 3) stars = 3;
  return stars;
}

const STYLE_PALETTES: Record<SessionMood["illustrationStyle"], [string, string, string]> = {
  noir: ["#0c4a6e", "#e2e8f0", "#0a0a0a"],
  watercolor: ["#a78bfa", "#fbcfe8", "#0a0814"],
  comic: ["#fbbf24", "#1d4ed8", "#10b981"],
  romance: ["#fbcfe8", "#9f1239", "#0a0408"],
  adventure: ["#fbbf24", "#10b981", "#1c1917"],
  abstract: ["#22d3ee", "#ec4899", "#1a0a2a"],
};

export function illustrateSentence(mood: SessionMood, sentenceText: string) {
  const [a, b, c] = STYLE_PALETTES[mood.illustrationStyle];
  const seed = Math.abs(hash(sentenceText)) % 100;
  const background = `
    radial-gradient(ellipse at ${20 + (seed % 60)}% ${30 + ((seed * 2) % 50)}%, ${a}bb 0%, transparent 55%),
    radial-gradient(ellipse at ${70 + (seed % 30)}% ${60 - (seed % 30)}%, ${b}88 0%, transparent 60%),
    linear-gradient(160deg, ${c}, #000 90%)
  `;
  const overlay = "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)";
  return { background, overlay };
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}
