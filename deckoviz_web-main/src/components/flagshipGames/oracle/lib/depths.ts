export type Depth = "surface" | "middle" | "deep";

export interface DepthMeta {
  id: Depth;
  name: string;
  tagline: string;
  bgGradient: string;
  posterGradient: string;
  ambient: string;
  vizzyQuestionPool: string[];
}

export const DEPTHS: DepthMeta[] = [
  {
    id: "surface",
    name: "Surface",
    tagline: "Light and playful.",
    bgGradient: "linear-gradient(180deg, #04141a, #0a3848 50%, #04141a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(94,234,212,0.28), transparent 60%), linear-gradient(180deg, #04141a, #0a3848, #04141a)",
    ambient: "Distant ocean. Slow piano.",
    vizzyQuestionPool: [
      "What's a small lie this room would forgive?",
      "What does the group reach for first when there's nothing to do?",
      "Whose taste do you all secretly trust?",
    ],
  },
  {
    id: "middle",
    name: "Middle Earth",
    tagline: "Thoughtful and honest.",
    bgGradient: "linear-gradient(180deg, #04060e, #0c1428 50%, #04060e)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(94,234,212,0.35), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(30,27,75,0.4), transparent 60%), linear-gradient(180deg, #04060e, #0c1428, #04060e)",
    ambient: "Rain on glass. Deep drone.",
    vizzyQuestionPool: [
      "What's a place this group describes the same way without realizing?",
      "Who in this room is most generous, and how?",
      "What gets unspoken that everyone here already knows?",
    ],
  },
  {
    id: "deep",
    name: "The Deep",
    tagline: "Completely open.",
    bgGradient: "linear-gradient(180deg, #02050a, #060a18 50%, #02050a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(56,189,248,0.28), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(167,139,250,0.22), transparent 60%), linear-gradient(180deg, #02050a, #060a18, #02050a)",
    ambient: "Soft drone. Slow piano. Room tone.",
    vizzyQuestionPool: [
      "What kind of silence has this group already learned to share?",
      "Whose absence would change this room the most?",
      "What does each of you protect when nobody is watching?",
    ],
  },
];

export const SEED_QUESTIONS: Record<Depth, string[]> = {
  surface: [
    "What's an irrational hill you'll die on?",
    "What's secretly overrated?",
    "What's a smell that takes you somewhere immediately?",
    "What's the worst-titled book you actually loved?",
  ],
  middle: [
    "What kind of person are you afraid of becoming?",
    "When did you last change your mind about something important?",
    "What do you wish your younger self had been told gently?",
    "When did silence say more than the words around it?",
  ],
  deep: [
    "What do you think people misunderstand about you?",
    "What's the hardest thing you've never said out loud?",
    "What's something you've forgiven that you haven't told anyone?",
    "What's a fear you've grown into rather than out of?",
  ],
};

export const COURAGE_HINTS = [
  "It asked you to look directly at something you usually look past.",
  "It admitted what most people only hint at.",
  "It was the kind of question that costs something to ask out loud.",
];
