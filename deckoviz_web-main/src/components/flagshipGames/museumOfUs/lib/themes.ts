export interface MuseumTheme {
  id: string;
  name: string;
  invitation: string;
  introNarration: string;
  bgGradient: string;
  posterGradient: string;
  halo: string;
  fontMood: "serif" | "modern";
  promptPool: string[];
}

export const THEMES: MuseumTheme[] = [
  {
    id: "childhood",
    name: "Childhood",
    invitation: "Rooms you walked through before you knew they were rooms.",
    introNarration:
      "Tonight, the museum keeps a small light on for childhood. Take your time.",
    bgGradient: "linear-gradient(180deg, #0c0a08, #1a1410 50%, #0c0a08)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(251,191,36,0.35), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(244,114,182,0.25), transparent 60%), linear-gradient(180deg, #0c0a08, #1a1410, #0c0a08)",
    halo: "rgba(251, 191, 36, 0.45)",
    fontMood: "serif",
    promptPool: [
      "Title an artwork after the smell of your childhood home.",
      "Create a painting named after the game only you remember.",
      "Name a sculpture after the adult you feared and the one you loved.",
      "Create an artwork titled after the best afternoon of your childhood.",
      "Name a textile after a sound that meant safety.",
      "Title a sketchbook page after the chair nobody else sat in.",
    ],
  },
  {
    id: "solitude",
    name: "Solitude",
    invitation: "The quiet that taught you something.",
    introNarration:
      "We've kept a wing of the museum empty on purpose. Walk slowly.",
    bgGradient: "linear-gradient(180deg, #050709, #0c1218 50%, #050709)",
    posterGradient:
      "radial-gradient(ellipse at 30% 50%, rgba(148,163,184,0.35), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(254,243,199,0.18), transparent 60%), linear-gradient(180deg, #050709, #0c1218, #050709)",
    halo: "rgba(226, 232, 240, 0.4)",
    fontMood: "serif",
    promptPool: [
      "Title a photograph after the night you stopped waiting.",
      "Name a film still after the hour when you became yourself.",
      "Create an installation about the room you returned to alone.",
      "Title a found object after a Tuesday that mattered.",
      "Name a sculpture after the company of a window.",
    ],
  },
  {
    id: "love-loss",
    name: "Love & Loss",
    invitation: "The weight of having loved at all.",
    introNarration:
      "This wing is for what stayed when the person could not.",
    bgGradient: "linear-gradient(180deg, #0a050a, #1c0a14 50%, #0a050a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(244,114,182,0.35), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(251,113,133,0.25), transparent 60%), linear-gradient(180deg, #0a050a, #1c0a14, #0a050a)",
    halo: "rgba(244, 114, 182, 0.4)",
    fontMood: "serif",
    promptPool: [
      "Name a painting after something you lost but never spoke about.",
      "Title a textile after the last time you held someone's hand.",
      "Create a ceramic piece about a name you still don't say aloud.",
      "Title a photograph after the song that broke at the wrong moment.",
      "Name an installation about a Sunday that ended too quietly.",
    ],
  },
  {
    id: "left-unsaid",
    name: "Things Left Unsaid",
    invitation: "The sentences that stayed in your mouth.",
    introNarration:
      "We've made room for the sentences nobody got. They are art here.",
    bgGradient: "linear-gradient(180deg, #08080c, #1a1424 50%, #08080c)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(167,139,250,0.32), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(94,234,212,0.22), transparent 60%), linear-gradient(180deg, #08080c, #1a1424, #08080c)",
    halo: "rgba(167, 139, 250, 0.4)",
    fontMood: "serif",
    promptPool: [
      "Title a sculpture after the conversation that almost happened.",
      "Name a photograph after the apology you rehearsed.",
      "Create a film still about the call you didn't answer.",
      "Title a painting after the word you swallowed at dinner.",
    ],
  },
  {
    id: "roads-not-taken",
    name: "The Roads Not Taken",
    invitation: "Versions of you still walking elsewhere.",
    introNarration:
      "Each artwork here is a door you didn't open. We thank you for showing them anyway.",
    bgGradient: "linear-gradient(180deg, #060a10, #102030 50%, #060a10)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(96,165,250,0.32), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(45,212,191,0.22), transparent 60%), linear-gradient(180deg, #060a10, #102030, #060a10)",
    halo: "rgba(96, 165, 250, 0.4)",
    fontMood: "serif",
    promptPool: [
      "Title a sculpture after the version of yourself you left behind.",
      "Name a painting after the city you almost moved to.",
      "Create an installation about the job you didn't take.",
      "Title a textile after a love you stepped away from.",
    ],
  },
  {
    id: "ordinary-miracles",
    name: "Ordinary Miracles",
    invitation: "The small kindnesses you didn't expect to remember.",
    introNarration:
      "Tonight's exhibition is grateful for unremarkable Tuesdays.",
    bgGradient: "linear-gradient(180deg, #08100a, #182812 50%, #08100a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(132,204,22,0.32), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(251,191,36,0.22), transparent 60%), linear-gradient(180deg, #08100a, #182812, #08100a)",
    halo: "rgba(132, 204, 22, 0.4)",
    fontMood: "serif",
    promptPool: [
      "Title a photograph after the stranger who held the door.",
      "Name a painting after the morning the light surprised you.",
      "Create a textile about the meal someone made when you couldn't.",
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude",
    invitation: "Quiet thank-yous, archived.",
    introNarration: "We brought lamps for the people you don't quite know how to thank.",
    bgGradient: "linear-gradient(180deg, #0c0a08, #20180a 50%, #0c0a08)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(251,191,36,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(254,205,170,0.28), transparent 60%), linear-gradient(180deg, #0c0a08, #20180a, #0c0a08)",
    halo: "rgba(251, 191, 36, 0.45)",
    fontMood: "serif",
    promptPool: [
      "Title a painting after the teacher you forgot to thank.",
      "Name a sculpture after the friend who stayed up that night.",
      "Create a film still about the kindness that arrived late.",
    ],
  },
];

export const MEDIUMS = [
  "Painting",
  "Sculpture",
  "Photograph",
  "Textile",
  "Found Object",
  "Installation",
  "Film Still",
  "Ceramic Piece",
  "Sketchbook Page",
] as const;

export type Medium = (typeof MEDIUMS)[number];
