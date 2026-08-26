export type Universe = "human" | "natural" | "made" | "whole" | "lab";

export interface UniverseMeta {
  id: Universe;
  name: string;
  blurb: string;
  bgGradient: string;
  posterGradient: string;
}

export const UNIVERSES: UniverseMeta[] = [
  {
    id: "human",
    name: "The Human Story",
    blurb: "History, philosophy, language, civilization.",
    bgGradient: "linear-gradient(180deg, #050810, #0a1830 50%, #050810)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(167,139,250,0.45), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(251,191,36,0.32), transparent 60%), linear-gradient(180deg, #050810, #0a1830, #050810)",
  },
  {
    id: "natural",
    name: "The Natural World",
    blurb: "Biology, space, physics, ecology.",
    bgGradient: "linear-gradient(180deg, #04140a, #08281a 50%, #04140a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(52,211,153,0.45), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(34,211,238,0.35), transparent 60%), linear-gradient(180deg, #04140a, #08281a, #04140a)",
  },
  {
    id: "made",
    name: "Made Things",
    blurb: "Technology, architecture, food, music.",
    bgGradient: "linear-gradient(180deg, #0a0810, #1a0a30 50%, #0a0810)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(244,114,182,0.45), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(96,165,250,0.32), transparent 60%), linear-gradient(180deg, #0a0810, #1a0a30, #0a0810)",
  },
  {
    id: "whole",
    name: "The Whole Board",
    blurb: "Mixed domains. Maximum unpredictability.",
    bgGradient: "linear-gradient(180deg, #08050a, #1c1410 50%, #08050a)",
    posterGradient:
      "radial-gradient(ellipse at 20% 30%, rgba(34,211,238,0.4), transparent 55%), radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.35), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(236,72,153,0.32), transparent 60%), linear-gradient(180deg, #08050a, #1c1410, #08050a)",
  },
  {
    id: "lab",
    name: "Vizzy's Lab",
    blurb: "A hidden thematic connection links every question. Theme revealed at game end.",
    bgGradient: "linear-gradient(180deg, #050a14, #0a1a30 50%, #050a14)",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(94,234,212,0.35), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(167,139,250,0.32), transparent 60%), linear-gradient(180deg, #050a14, #0a1a30, #050a14)",
  },
];

export interface StraightQuestion {
  id: string;
  universe: Universe;
  prompt: string;
  answer: string;
  contextAside: string;
  acceptable?: string[];
}

export interface ReasoningQuestion {
  id: string;
  universe: Universe;
  prompt: string;
  exemplar: string; // Vizzy's example of strong reasoning
}

export interface ConnectionQuestion {
  id: string;
  universe: Universe;
  items: [string, string, string, string];
  knownAnswer: string;
}

export interface MinorityQuestion {
  id: string;
  universe: Universe;
  prompt: string;
  popularAnswer: string;
  correctAnswer: string;
}

export interface QuestionBank {
  straight: StraightQuestion[];
  reasoning: ReasoningQuestion[];
  connection: ConnectionQuestion[];
  minority: MinorityQuestion[];
}

export const BANK: QuestionBank = {
  straight: [
    {
      id: "s1",
      universe: "human",
      prompt: "Which sea is bordered by the Suez Canal at its southern end?",
      answer: "Red Sea",
      contextAside:
        "The canal opened in 1869, twenty years after the British surveys first proved a sea-level route was feasible.",
      acceptable: ["the red sea"],
    },
    {
      id: "s2",
      universe: "natural",
      prompt: "What's the only mammal capable of true flight?",
      answer: "Bat",
      contextAside:
        "There are over 1,400 bat species - about a fifth of all mammals on Earth are bats.",
      acceptable: ["bats", "the bat"],
    },
    {
      id: "s3",
      universe: "made",
      prompt: "Which architect designed the Sydney Opera House?",
      answer: "Jørn Utzon",
      contextAside: "Utzon resigned mid-construction in 1966 and never returned to Australia to see it finished.",
      acceptable: ["jorn utzon", "utzon"],
    },
    {
      id: "s4",
      universe: "human",
      prompt: "Whose 1922 novel begins 'Stately, plump Buck Mulligan came from the stairhead'?",
      answer: "James Joyce",
      contextAside: "Ulysses takes place in a single day - June 16, 1904, now celebrated as Bloomsday.",
      acceptable: ["joyce"],
    },
    {
      id: "s5",
      universe: "natural",
      prompt: "Which planet has the longest day in our solar system?",
      answer: "Venus",
      contextAside: "A Venusian day is longer than its year - 243 Earth days versus 225.",
    },
    {
      id: "s6",
      universe: "made",
      prompt: "Who invented the World Wide Web in 1989?",
      answer: "Tim Berners-Lee",
      contextAside: "He gave the spec away for free. CERN supported the decision.",
      acceptable: ["berners-lee", "tim berners lee"],
    },
  ],
  reasoning: [
    {
      id: "r1",
      universe: "human",
      prompt:
        "A village's water source has been polluted. They can move the village, decontaminate the source over months, or import bottled water indefinitely. Which is the most ethically defensible choice, and why?",
      exemplar:
        "Decontamination respects the place, the people's ties to it, and avoids creating downstream waste - but it must include short-term imports.",
    },
    {
      id: "r2",
      universe: "natural",
      prompt:
        "A bird species evolves to mimic the song of a predator. What pressures might lead to this, and what trade-offs would it face?",
      exemplar:
        "Mimicry deters competitors but risks attracting actual predators and confusing mates - useful only in narrow ecological windows.",
    },
    {
      id: "r3",
      universe: "made",
      prompt:
        "You're designing a city block. The land is half park, half housing. Which goes where, and why?",
      exemplar:
        "Park along the south edge maximizes light for housing; mixed-use ground floor housing along park edge increases passive surveillance.",
    },
  ],
  connection: [
    {
      id: "c1",
      universe: "whole",
      items: ["Halley's Comet", "Mark Twain", "1835", "1910"],
      knownAnswer: "Mark Twain was born and died with Halley's Comet (1835 and 1910).",
    },
    {
      id: "c2",
      universe: "human",
      items: ["The Sistine Chapel", "Tobacco", "Pope Julius II", "1508"],
      knownAnswer: "Tobacco reached Europe ~1500; the Sistine Chapel ceiling commission began in 1508 under Julius II.",
    },
    {
      id: "c3",
      universe: "natural",
      items: ["Octopus", "Three hearts", "Blue blood", "Camouflage"],
      knownAnswer: "All true of the octopus.",
    },
  ],
  minority: [
    {
      id: "m1",
      universe: "human",
      prompt: "Who wrote 'Frankenstein'?",
      popularAnswer: "Mary Shelley",
      correctAnswer: "Mary Shelley", // popular and correct happen to align - placeholder
    },
    {
      id: "m2",
      universe: "natural",
      prompt: "Which mammal lays eggs?",
      popularAnswer: "Platypus",
      correctAnswer: "Echidna",
    },
    {
      id: "m3",
      universe: "human",
      prompt: "Which country has the most native UNESCO World Heritage Sites?",
      popularAnswer: "Italy",
      correctAnswer: "Italy", // current record-holder; trick is in volume not the surprise
    },
  ],
};

export function pickStraight(uni: Universe, excludeIds: string[] = []): StraightQuestion {
  const pool = BANK.straight.filter((q) => (uni === "whole" || uni === "lab" ? true : q.universe === uni) && !excludeIds.includes(q.id));
  const list = pool.length ? pool : BANK.straight;
  return list[Math.floor(Math.random() * list.length)];
}
export function pickReasoning(uni: Universe): ReasoningQuestion {
  const pool = BANK.reasoning.filter((q) => uni === "whole" || uni === "lab" ? true : q.universe === uni);
  return (pool.length ? pool : BANK.reasoning)[Math.floor(Math.random() * (pool.length || BANK.reasoning.length))];
}
export function pickConnection(uni: Universe): ConnectionQuestion {
  const pool = BANK.connection.filter((q) => uni === "whole" || uni === "lab" ? true : q.universe === uni);
  return (pool.length ? pool : BANK.connection)[Math.floor(Math.random() * (pool.length || BANK.connection.length))];
}
export function pickMinority(uni: Universe): MinorityQuestion {
  const pool = BANK.minority.filter((q) => uni === "whole" || uni === "lab" ? true : q.universe === uni);
  return (pool.length ? pool : BANK.minority)[Math.floor(Math.random() * (pool.length || BANK.minority.length))];
}

export const RABBIT_HOLES = [
  {
    title: "Why honey never spoils",
    body:
      "Bee enzymes lower honey's pH and strip water from any microbes that try to colonize it. Honey found in 3,000-year-old Egyptian tombs was still edible.",
  },
  {
    title: "The Voynich manuscript",
    body:
      "An early-15th-century book in an undeciphered script with no clear linguistic match. Recent statistical analysis suggests it follows real linguistic structure - but nobody has cracked it.",
  },
  {
    title: "Why we have eyebrows",
    body:
      "Beyond keeping sweat out of eyes, eyebrows are the most expressive part of the face. Patients post-Botox have measurably worse social outcomes when their brows can't move.",
  },
];

export const WILD_CARD_TEMPLATES = [
  {
    label: "Analogy chain",
    prompt: "Complete: 'A library is to a librarian as a forest is to ___.' Explain.",
  },
  {
    label: "Memory chain",
    prompt: "Name three things invented before electricity that are still used today, and why.",
  },
  {
    label: "Creative leap",
    prompt: "If silence had a smell, what would it smell like, and where would you find it?",
  },
];
