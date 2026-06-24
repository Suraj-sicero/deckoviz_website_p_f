export type TwistCategory =
  | "mystery"
  | "emotional"
  | "cosmic"
  | "betrayal"
  | "weather"
  | "horror"
  | "fantasy"
  | "psychological";

export interface Twist {
  id: string;
  category: TwistCategory;
  text: string;
  intensity: 1 | 2 | 3;
}

const TWIST_POOL: Record<TwistCategory, string[]> = {
  mystery: [
    "A child appears who knows everyone's real name.",
    "Someone finds a photograph of the group, taken yesterday.",
    "A door that was locked is now open. A door that was open is now gone.",
    "There is a thirteenth person in the room. There were only twelve.",
    "The map updates itself when no one is looking.",
  ],
  emotional: [
    "Someone confesses something they meant to keep forever.",
    "An old letter arrives - addressed to a name nobody used to know.",
    "A song plays that only one of them remembers.",
    "The youngest of them begins to cry without knowing why.",
    "A long-dead promise asks to be kept.",
  ],
  cosmic: [
    "The sky turns the colour of old copper.",
    "Time slips backward for thirty-seven seconds.",
    "Every shadow points the wrong way.",
    "A second moon appears, kind and unwelcome.",
    "Gravity politely excuses itself for a moment.",
  ],
  betrayal: [
    "One of the characters is lying.",
    "The trusted one knows more than they have said.",
    "A name written in the journal has been crossed out.",
    "Someone is wearing a face that isn't quite theirs.",
    "A vow is broken in a language nobody understands.",
  ],
  weather: [
    "Snow begins to fall, although it shouldn't.",
    "A warm wind brings the scent of a place they've never been.",
    "The rain begins to fall upward.",
    "A fog rolls in carrying voices.",
    "Lightning paints a single word across the sky.",
  ],
  horror: [
    "Something in the corner is breathing in their rhythm.",
    "The reflection blinks first.",
    "A clock starts ticking that has no hands.",
    "The walls remember being trees.",
    "Their shadows step away to confer.",
  ],
  fantasy: [
    "A talking creature offers a single, dangerous favor.",
    "An object in the room hums when it is told the truth.",
    "A door appears that has always been there.",
    "The smallest one in the room finds magic in their pocket.",
    "A bird drops a key only one of them recognizes.",
  ],
  psychological: [
    "One of them is dreaming. They don't know who.",
    "Memory bends. A shared past begins to disagree with itself.",
    "Someone forgets the name of someone they love.",
    "An old fear, kept private, becomes visible to everyone.",
    "A choice rewinds and asks to be made again.",
  ],
};

const CATEGORIES = Object.keys(TWIST_POOL) as TwistCategory[];

export interface TwistEngineOptions {
  bias?: string[]; // genre's preferred categories
  usedIds?: Set<string>;
  intensity?: 1 | 2 | 3;
}

export function generateTwist(opts: TwistEngineOptions = {}): Twist {
  const { bias = [], usedIds = new Set(), intensity = 2 } = opts;

  const pool: TwistCategory[] =
    bias.length > 0
      ? [...bias.filter((b) => CATEGORIES.includes(b as TwistCategory)) as TwistCategory[], ...CATEGORIES]
      : CATEGORIES;

  for (let attempts = 0; attempts < 20; attempts++) {
    const cat = pool[Math.floor(Math.random() * pool.length)];
    const options = TWIST_POOL[cat];
    const text = options[Math.floor(Math.random() * options.length)];
    const id = `${cat}:${text}`;
    if (!usedIds.has(id)) {
      return { id, category: cat, text, intensity };
    }
  }
  const fallbackCat = pool[0];
  const fallbackText = TWIST_POOL[fallbackCat][0];
  return {
    id: `${fallbackCat}:${fallbackText}:${Date.now()}`,
    category: fallbackCat,
    text: fallbackText,
    intensity,
  };
}
