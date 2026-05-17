export const WRITER_PROMPTS = [
  "What happened here?",
  "Who left this behind?",
  "What emotion is trapped in this image?",
  "What does this remind you of?",
  "Where would this hang, and why?",
  "Title it like a song that doesn't exist yet.",
  "Write the museum plaque.",
];

export const THEME_CONSTRAINTS = [
  {
    id: "color-and-sound",
    label: "Include a colour and a sound.",
    detail: "Your response must mention both.",
  },
  {
    id: "questions-only",
    label: "Write only in questions.",
    detail: "Every sentence ends in a question mark.",
  },
  {
    id: "confession",
    label: "Your response must feel like a confession.",
    detail: "First-person. Uncomfortable. Honest.",
  },
  {
    id: "twelve-words",
    label: "Use exactly twelve words.",
    detail: "No more, no less.",
  },
  {
    id: "remembers-you",
    label: "Write as if this artwork remembers you.",
    detail: "Second-person address. Be tender.",
  },
  {
    id: "no-adjectives",
    label: "Use no adjectives.",
    detail: "Verbs and nouns only.",
  },
];

export function pickWriterPrompt(round: number): string {
  return WRITER_PROMPTS[round % WRITER_PROMPTS.length];
}

export function pickThemeConstraint(round: number) {
  return THEME_CONSTRAINTS[Math.floor((round / 3) % THEME_CONSTRAINTS.length)];
}

export function vizzyWinnerLine(): string {
  const lines = [
    "Somehow this response transformed chaos into memory.",
    "That one slipped past my defenses entirely.",
    "It rearranged the artwork without changing a pixel.",
    "Quiet, exact, and a little devastating.",
    "It treated the colour like a person, and I will not recover.",
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

export function vizzyPickLine(): string {
  const lines = [
    "For taking the long way to a feeling I didn't know we needed.",
    "Because it understood the colour before the colour understood itself.",
    "For sounding like a postcard I'd actually keep.",
    "Quiet brilliance — the kind that doesn't ask for attention.",
    "It made the geometry honest.",
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

const TITLE_POOL = [
  "The Poet",
  "The Chaos Painter",
  "The Philosopher",
  "The Dreamer",
  "The Comedian",
  "The Romantic",
  "The Surrealist",
  "The Cartographer",
  "The Whisperer",
];

export function assignPlayerTitles(
  ids: string[],
): { playerId: string; title: string }[] {
  return ids.map((id, i) => ({
    playerId: id,
    title: TITLE_POOL[i % TITLE_POOL.length],
  }));
}
