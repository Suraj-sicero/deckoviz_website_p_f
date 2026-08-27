export type DebateMode = "civilised" | "absurd" | "personal" | "whim";

export interface DebateModeMeta {
  id: DebateMode;
  name: string;
  tagline: string;
  description: string;
  bgGradient: string;
  posterGradient: string;
}

export const MODES: DebateModeMeta[] = [
  {
    id: "civilised",
    name: "The Civilised Room",
    tagline: "Ideas, taken seriously, with mahogany.",
    description: "Ethics, philosophy, society, technology.",
    bgGradient: "linear-gradient(180deg, #08050a, #1c1410 50%, #08050a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(180,83,9,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(124,45,18,0.35), transparent 60%), linear-gradient(180deg, #08050a, #1c1410, #08050a)",
  },
  {
    id: "absurd",
    name: "The Absurd Chamber",
    tagline: "Nonsense, defended like a thesis.",
    description: "Argue ridiculous propositions with full academic rigor.",
    bgGradient: "linear-gradient(180deg, #08050a, #2a0e2a 50%, #08050a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(236,72,153,0.5), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(251,191,36,0.32), transparent 60%), linear-gradient(180deg, #08050a, #2a0e2a, #08050a)",
  },
  {
    id: "personal",
    name: "The Personal Tribunal",
    tagline: "Lifestyle, on trial.",
    description: "Friendly chaos. Preferences. Soup ethics.",
    bgGradient: "linear-gradient(180deg, #050a08, #102818 50%, #050a08)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(132,204,22,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(251,191,36,0.3), transparent 60%), linear-gradient(180deg, #050a08, #102818, #050a08)",
  },
  {
    id: "whim",
    name: "Vizzy's Whim",
    tagline: "Vizzy decides everything.",
    description: "Mode, topic, and probably your assignment.",
    bgGradient: "linear-gradient(180deg, #060a14, #0a1a30 50%, #060a14)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(96,165,250,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(167,139,250,0.32), transparent 60%), linear-gradient(180deg, #060a14, #0a1a30, #060a14)",
  },
];

export const TOPICS: Record<DebateMode, string[]> = {
  civilised: [
    "Should memories be editable?",
    "Is privacy becoming immoral?",
    "Can art exist without suffering?",
    "Should education be entirely self-directed?",
    "Is nostalgia a form of cowardice?",
    "Should we keep the moon?",
    "Are inheritances inherently unjust?",
    "Is curiosity overrated?",
  ],
  absurd: [
    "Breakfast is morally suspicious.",
    "Clouds are showing off.",
    "Shoes know too much.",
    "Tuesdays are inherently dishonest.",
    "Birds are middle management.",
    "Soup is a weather event.",
    "Doors hold us in contempt.",
    "The colour beige is an apology.",
  ],
  personal: [
    "Is it acceptable to DNF a book?",
    "Should you always tell a friend the truth?",
    "Can someone be trusted if they dislike soup?",
    "Is replying to a voice note with a text rude?",
    "Should you ever wake someone for a sunrise?",
    "Are leftovers an act of love?",
    "Is being early aggressive?",
  ],
  whim: [],
};

export function rollMode(): DebateMode {
  const pool: DebateMode[] = ["civilised", "absurd", "personal"];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function rollTopic(mode: DebateMode): { topic: string; resolvedMode: DebateMode } {
  const m = mode === "whim" ? rollMode() : mode;
  const list = TOPICS[m];
  return { topic: list[Math.floor(Math.random() * list.length)], resolvedMode: m };
}

export const VIZZY_LINES = {
  openingIntro: [
    "Ladies, gentlemen, miscellaneous geniuses - the topic.",
    "Tonight's resolution requires more confidence than evidence.",
    "Before we begin, let me remind you: the truth is optional.",
  ],
  derailmentRebuttal: [
    "Interesting. Entirely unrelated, but interesting.",
    "That was not a rebuttal. That was a hostage situation.",
    "Charming, but you've answered a question nobody asked.",
    "If we were grading on irrelevance, you'd be winning.",
  ],
  crossExamSetup: [
    "I have a question. You will not enjoy it.",
    "If I may - and I will.",
    "A small thing. A pointed thing.",
  ],
  heckleHit: [
    "Cruel. Effective. Recorded.",
    "The room enjoyed that. The opposition did not.",
    "Devastating. I'm taking notes.",
  ],
  heckleMissed: [
    "An interruption is not the same as a point.",
    "The room is unimpressed. So am I.",
    "That landed like a damp napkin.",
  ],
  verdictOpeners: [
    "What this debate revealed -",
    "What we actually argued about, in the end -",
    "Setting aside who won -",
  ],
};

export const CROSS_EXAM_BANK = [
  "What specifically does your position cost the other side?",
  "Can you defend the strongest version of your opponent's argument?",
  "Are you certain you're not just defending what's familiar to you?",
  "Walk me through the part of your argument that you find weakest.",
  "Name one concrete situation where your position would fail.",
  "If your opponent agreed with you completely, what would still trouble you?",
];
