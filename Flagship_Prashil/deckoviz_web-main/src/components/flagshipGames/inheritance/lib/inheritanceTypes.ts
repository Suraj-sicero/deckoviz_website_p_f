export interface FamilyMember {
  id: string;
  name: string;
  generation: number;
  parents: string[]; // member ids
  spouse: string | null;
  birthYear: string | null;
  deathYear: string | null;
  isBlackSheep: boolean;
  notes: string;
  portrait: { background: string; overlay: string };
}

export interface FoundingAnswers {
  surname: string;
  origin: string;
  values: string;
  wound: string;
  craft: string;
  relationToBeauty: string;
}

export interface Chapter {
  id: string;
  title: string;
  type: ChapterType;
  theme: string;
  prompts: { question: string; answer: string }[];
  archivalEntry: string;
  heirloomIds: string[];
  letterId: string | null;
  illustration: { background: string; overlay: string };
  legacyPointsAwarded: number;
  participatingMemberIds: string[];
  createdAt: number;
}

export interface Heirloom {
  id: string;
  name: string;
  kind: "Object" | "Phrase" | "Tradition" | "Ritual" | "Recipe" | "Song" | "Photograph";
  description: string;
  introducedInChapterId: string;
  referencedInChapterIds: string[];
}

export interface Letter {
  id: string;
  fromMemberId: string | null;
  toMemberId: string | null;
  acrossYears: string; // "1947 → 1991" etc
  text: string;
  chapterId: string;
}

export type ChapterType =
  | "marriage"
  | "departure"
  | "reunion"
  | "discovery"
  | "inheritance"
  | "betrayal"
  | "reckoning"
  | "disappearance"
  | "celebration"
  | "funeral"
  | "golden-age"
  | "the-end";

export interface FamilyArchive {
  id: string;
  surname: string;
  founding: FoundingAnswers | null;
  foundingPortrait: { background: string; overlay: string } | null;
  members: FamilyMember[];
  chapters: Chapter[];
  heirlooms: Heirloom[];
  letters: Letter[];
  legacyPoints: number;
  createdAt: number;
  updatedAt: number;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  privateNotes: string[];
}

export const PORTRAIT_PALETTES: [string, string, string][] = [
  ["#92400e", "#fde68a", "#1c1917"],
  ["#7c2d12", "#fef3c7", "#0c0a09"],
  ["#1e293b", "#fde68a", "#020617"],
  ["#5b21b6", "#fbcfe8", "#1c1917"],
  ["#064e3b", "#fde68a", "#0c0a08"],
];

export function generatePortrait(seed: number): { background: string; overlay: string } {
  const palette = PORTRAIT_PALETTES[seed % PORTRAIT_PALETTES.length];
  const [a, b, c] = palette;
  const angle = 145 + (seed % 30);
  const background = `radial-gradient(ellipse at 35% 30%, ${a}cc 0%, transparent 55%), radial-gradient(ellipse at 65% 75%, ${b}88 0%, transparent 60%), linear-gradient(${angle}deg, ${c}, #000 90%)`;
  const overlay = "radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)";
  return { background, overlay };
}

export const CHAPTER_LIBRARY: { type: ChapterType; title: string; theme: string; prompts: string[] }[] = [
  {
    type: "marriage",
    title: "A Marriage",
    theme: "Two lineages decide to share a roof, a name, a quarrel.",
    prompts: [
      "Who is marrying whom?",
      "What does the older generation refuse to attend?",
      "What is said in private the night before?",
      "What is gifted that nobody understands?",
    ],
  },
  {
    type: "departure",
    title: "A Departure",
    theme: "One family member leaves for years.",
    prompts: [
      "Who is leaving?",
      "What do they take?",
      "What do they leave behind?",
      "What remains unsaid at the door?",
      "Who waits for them, openly or otherwise?",
    ],
  },
  {
    type: "reunion",
    title: "A Reunion",
    theme: "Bodies in the same room after too long.",
    prompts: [
      "Who has returned?",
      "What is the room pretending not to remember?",
      "Who speaks first?",
      "What old joke fails this time?",
    ],
  },
  {
    type: "discovery",
    title: "A Discovery",
    theme: "Something is found that was supposed to stay hidden.",
    prompts: [
      "Who finds it?",
      "Where was it?",
      "Who knew already?",
      "What is decided about it?",
    ],
  },
  {
    type: "inheritance",
    title: "An Inheritance",
    theme: "A will. A reading. A reckoning.",
    prompts: [
      "Who is reading the will aloud?",
      "What was left to the wrong person?",
      "What was left to the right person who did not want it?",
      "What was withheld?",
    ],
  },
  {
    type: "betrayal",
    title: "A Betrayal",
    theme: "A small fracture or a large one.",
    prompts: [
      "Who broke what?",
      "Was it intended?",
      "Who covers for them?",
      "Who will never forget?",
    ],
  },
  {
    type: "reckoning",
    title: "The Reckoning",
    theme: "An old wound is finally addressed out loud.",
    prompts: [
      "Whose wound?",
      "Who calls the conversation?",
      "What has changed by morning?",
    ],
  },
  {
    type: "disappearance",
    title: "A Disappearance",
    theme: "Someone is no longer there.",
    prompts: [
      "Who is gone?",
      "Who was last with them?",
      "What is the first sign?",
      "Who refuses to admit it?",
    ],
  },
  {
    type: "celebration",
    title: "A Celebration",
    theme: "Good news arrives, briefly.",
    prompts: [
      "What is being celebrated?",
      "Who is not invited?",
      "What sneaks into the toast?",
    ],
  },
  {
    type: "funeral",
    title: "A Funeral",
    theme: "Grief, attended by everyone the deceased ever loved.",
    prompts: [
      "Who has died?",
      "Who refuses to come?",
      "Who speaks at the service?",
      "What heirloom is buried with them?",
    ],
  },
  {
    type: "golden-age",
    title: "The Golden Age",
    theme: "A flourishing the family will tell stories about for fifty years.",
    prompts: [
      "What is going well?",
      "What does the family build?",
      "What is everyone too happy to notice?",
    ],
  },
  {
    type: "the-end",
    title: "The End",
    theme: "The final generation. The closing chapter of the family.",
    prompts: [
      "Who carries the last name?",
      "What is preserved?",
      "What is finally let go?",
      "What is the very last sentence?",
    ],
  },
];

export function pickChapterTemplate(type?: ChapterType) {
  if (type) return CHAPTER_LIBRARY.find((c) => c.type === type) ?? CHAPTER_LIBRARY[0];
  const free = CHAPTER_LIBRARY.filter((c) => c.type !== "golden-age" && c.type !== "the-end");
  return free[Math.floor(Math.random() * free.length)];
}
