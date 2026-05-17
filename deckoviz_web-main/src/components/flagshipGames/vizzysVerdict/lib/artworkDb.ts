export type Difficulty = "curious" | "initiated" | "deep-archive";

export interface ArtworkRecord {
  id: string;
  title: string;
  artist: string;
  year: string;
  movement: string;
  difficulty: Difficulty;
  opener: string; // poetic one-liner Vizzy reads at reveal
  truths: string[]; // pool of real facts (one picked + handed to a player)
  context: string; // long-form context Vizzy narrates after reveal
  poster: string; // gradient backdrop (procedural museum render)
}

const gradient = (a: string, b: string, c: string) =>
  `radial-gradient(ellipse at 30% 40%, ${a}aa, transparent 55%), radial-gradient(ellipse at 70% 70%, ${b}aa, transparent 60%), linear-gradient(160deg, ${c}, #000 90%)`;

export const ARTWORK_DB: ArtworkRecord[] = [
  /* ---------- Curious (recognizable) ---------- */
  {
    id: "starry-night",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    movement: "Post-Impressionism",
    difficulty: "curious",
    opener: "Some paintings ask questions. This one keeps repainting itself in the room.",
    truths: [
      "It was painted from the window of an asylum room in Saint-Rémy-de-Provence.",
      "Van Gogh painted it during the day from memory of the night sky he saw at night.",
      "The cypress tree in the foreground was a motif he associated with death.",
      "It was not particularly admired during his lifetime.",
    ],
    context:
      "Painted from a barred window in the asylum at Saint-Rémy, the view existed — the village did not. Van Gogh added it.",
    poster: gradient("#1d4ed8", "#fbbf24", "#0c1a3a"),
  },
  {
    id: "scream",
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    movement: "Expressionism",
    difficulty: "curious",
    opener: "An entire century's anxiety, compressed into a face.",
    truths: [
      "Munch wrote in his diary that the sky turning red gave him the original sensation.",
      "There are four versions: two paintings, two pastels.",
      "One version was stolen in broad daylight from the Munch Museum in 2004.",
      "The figure is not screaming — it is hearing a scream pass through nature.",
    ],
    context:
      "The figure is not the one screaming. Munch wrote that he heard 'a scream pass through nature' on a walk near Oslo.",
    poster: gradient("#ea580c", "#fde047", "#1c1917"),
  },
  {
    id: "girl-pearl",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "c. 1665",
    movement: "Dutch Golden Age",
    difficulty: "curious",
    opener: "She has been turning to look at us for three hundred and sixty years.",
    truths: [
      "It is technically a tronie — a study, not a portrait of a real sitter.",
      "The earring may not be a pearl at all but polished tin.",
      "The painting was sold for two guilders in 1881.",
      "Vermeer used ultramarine made from ground lapis lazuli for the headscarf.",
    ],
    context:
      "Not a portrait — a tronie, an idealized study. The 'pearl' is too large to be real and may be polished tin.",
    poster: gradient("#0e7490", "#fde68a", "#1e1b4b"),
  },
  {
    id: "persistence",
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: "1931",
    movement: "Surrealism",
    difficulty: "curious",
    opener: "Time, here, is no longer in the mood to be punctual.",
    truths: [
      "Dalí said the soft clocks were inspired by a wheel of camembert melting in the sun.",
      "The cliffs in the background are the coast of Catalonia, where Dalí grew up.",
      "The painting is unusually small — about 24 by 33 centimeters.",
      "The ants on the bronze clock symbolize decay.",
    ],
    context:
      "Painted in a single afternoon. Dalí credited a half-melted wheel of camembert with the central image of the soft clocks.",
    poster: gradient("#fbbf24", "#9333ea", "#0c0a09"),
  },

  /* ---------- Initiated (mid-obscurity) ---------- */
  {
    id: "olympia",
    title: "Olympia",
    artist: "Édouard Manet",
    year: "1863",
    movement: "Realism",
    difficulty: "initiated",
    opener: "She looks back at the viewer like she has been waiting for them to be late.",
    truths: [
      "Critics in 1865 had to be physically restrained from attacking the painting.",
      "The model, Victorine Meurent, was herself an accomplished painter.",
      "The black cat at the foot of the bed was inserted as deliberate provocation.",
      "Manet's friend Zola wrote a vigorous defense of the work.",
    ],
    context:
      "When it was finally exhibited in 1865, the Paris Salon hung it high on the wall and posted guards to prevent visitors from striking it with their canes.",
    poster: gradient("#7c2d12", "#f59e0b", "#0c0a08"),
  },
  {
    id: "rothko",
    title: "No. 14, 1960",
    artist: "Mark Rothko",
    year: "1960",
    movement: "Abstract Expressionism",
    difficulty: "initiated",
    opener: "Rothko asked viewers to stand thirty centimetres away. We rarely listen.",
    truths: [
      "Rothko insisted his paintings be hung low, almost touching the floor.",
      "He refused a Four Seasons commission and returned the fee after seeing the dining room.",
      "Many of Rothko's late works developed cracks within decades due to experimental media.",
      "He considered his work to be about tragedy, ecstasy, and doom — not colour.",
    ],
    context:
      "Rothko was furious when 'No. 14' was first hung — too high, too brightly lit, and across from a Pollock that he felt 'argued' with it.",
    poster: gradient("#dc2626", "#1e3a8a", "#0a0a0a"),
  },
  {
    id: "bauhaus",
    title: "Senecio",
    artist: "Paul Klee",
    year: "1922",
    movement: "Bauhaus",
    difficulty: "initiated",
    opener: "A face that, depending on the light, might also be a small worried planet.",
    truths: [
      "Klee taught at the Bauhaus when he painted this.",
      "The title refers to an old man, but the painting reads more like a moon.",
      "Klee filled thirty-four notebooks with theory during his Bauhaus years.",
      "He was dismissed from his teaching post by the Nazis in 1933.",
    ],
    context:
      "Klee, who taught form and design at the Bauhaus, kept thousands of pages of theoretical notebooks — many never translated into English in his lifetime.",
    poster: gradient("#facc15", "#ea580c", "#1c1917"),
  },

  /* ---------- Deep Archive (obscure) ---------- */
  {
    id: "saudade",
    title: "Saudade",
    artist: "Almeida Júnior",
    year: "1899",
    movement: "Brazilian Realism",
    difficulty: "deep-archive",
    opener: "A grief so specific the Portuguese had to invent a separate word for it.",
    truths: [
      "Almeida Júnior was murdered the year after he completed this painting.",
      "The Portuguese word 'saudade' has no direct English translation.",
      "He is considered the father of regionalism in Brazilian painting.",
      "The model is unknown — possibly a friend's daughter from Itu, São Paulo.",
    ],
    context:
      "Almeida Júnior was a celebrated 19th-century Brazilian painter, murdered in 1899 in Piracicaba by the husband of a woman he had been involved with.",
    poster: gradient("#7c2d12", "#facc15", "#1c1917"),
  },
  {
    id: "yayoi-early",
    title: "Pacific Ocean",
    artist: "Yayoi Kusama",
    year: "1959",
    movement: "Infinity Net",
    difficulty: "deep-archive",
    opener: "Look at it long enough and the entire room begins to repeat.",
    truths: [
      "Kusama painted Infinity Nets obsessively for weeks at a time, sleeping at the easel.",
      "The pattern was a way of processing the visual hallucinations she had since childhood.",
      "Donald Judd, then a critic, bought her first Infinity Net painting.",
      "She has voluntarily lived in a psychiatric hospital in Tokyo since 1977.",
    ],
    context:
      "Donald Judd, before he was famous, was the first person to publicly review Kusama's New York show in 1959. He bought one of the paintings.",
    poster: gradient("#f1f5f9", "#94a3b8", "#0c0a09"),
  },
  {
    id: "borduas",
    title: "3+4+1",
    artist: "Paul-Émile Borduas",
    year: "1956",
    movement: "Automatistes",
    difficulty: "deep-archive",
    opener: "A Québécois manifesto written, eventually, in white paint.",
    truths: [
      "Borduas was the lead author of the 1948 'Refus Global' manifesto.",
      "The manifesto cost him his teaching position at the École du Meuble.",
      "He spent his final years in Paris, painting almost only in black and white.",
      "The numbers in the title refer to forms in the composition, not dates.",
    ],
    context:
      "Borduas authored 'Refus Global' (1948), a manifesto attacking the suffocating influence of the Catholic Church on Québécois cultural life. He lost his teaching position within months.",
    poster: gradient("#e2e8f0", "#0c0a09", "#1c1917"),
  },
];

export function pickArtwork(difficulty: Difficulty, exclude: string[] = []): ArtworkRecord {
  const pool = ARTWORK_DB.filter((a) => a.difficulty === difficulty && !exclude.includes(a.id));
  const list = pool.length > 0 ? pool : ARTWORK_DB.filter((a) => !exclude.includes(a.id));
  return list[Math.floor(Math.random() * list.length)] ?? ARTWORK_DB[0];
}

export function pickTruth(artwork: ArtworkRecord): string {
  return artwork.truths[Math.floor(Math.random() * artwork.truths.length)];
}

/* Generate a believable Vizzy bluff for this artwork (rule-of-thumb mock). */
const VIZZY_BLUFF_TEMPLATES = [
  (a: ArtworkRecord) =>
    `${a.artist} reportedly destroyed two earlier versions before settling on this composition.`,
  (a: ArtworkRecord) =>
    `${a.artist} is said to have painted this in fewer than ${10 + Math.floor(Math.random() * 30)} hours.`,
  (a: ArtworkRecord) =>
    `An X-ray reveals an entirely different figure beneath the visible surface of the canvas.`,
  (a: ArtworkRecord) =>
    `The work was once misattributed to one of ${a.artist.split(" ").slice(-1)[0]}'s students before being reattributed in the 1980s.`,
  (a: ArtworkRecord) =>
    `${a.artist} kept ${a.title.split(" ").slice(-1)[0].toLowerCase()} in a private collection for ${5 + Math.floor(Math.random() * 20)} years before exhibiting it.`,
];

export function generateVizzyBluff(artwork: ArtworkRecord): string {
  return VIZZY_BLUFF_TEMPLATES[Math.floor(Math.random() * VIZZY_BLUFF_TEMPLATES.length)](artwork);
}
