import type { MuseumTheme } from "./themes";
import type { Artwork, Player } from "./museumState";

/**
 * Compose an artwork's visual: a tinted gradient + soft layered radials,
 * loosely coloured by the medium and theme.
 */
export function generateArtworkVisual(input: {
  theme: MuseumTheme;
  medium: Artwork["medium"];
  seed: number;
}): { background: string; overlay: string } {
  const { theme } = input;
  const angle = (input.seed * 47) % 360;
  const palettes: Record<string, [string, string, string]> = {
    Painting: ["#7c2d12", "#fde68a", "#1c1917"],
    Sculpture: ["#52525b", "#e5e5e5", "#1c1917"],
    Photograph: ["#1c1917", "#404040", "#fafafa"],
    Textile: ["#9f1239", "#fbcfe8", "#1f2937"],
    "Found Object": ["#92400e", "#fde68a", "#0c0a09"],
    Installation: ["#3730a3", "#a78bfa", "#0c0a09"],
    "Film Still": ["#1e293b", "#cbd5e1", "#020617"],
    "Ceramic Piece": ["#7c2d12", "#fef3c7", "#1c1917"],
    "Sketchbook Page": ["#fef3c7", "#cbd5e1", "#1c1917"],
  };
  const [a, b, c] = palettes[input.medium] ?? ["#a78bfa", "#fbcfe8", "#1c1917"];
  const background = `
    radial-gradient(ellipse at ${20 + (angle % 60)}% ${30 + ((angle * 2) % 50)}%, ${a}cc 0%, transparent 55%),
    radial-gradient(ellipse at ${70 + ((angle * 3) % 30)}% ${60 - (angle % 30)}%, ${b}aa 0%, transparent 60%),
    linear-gradient(160deg, ${c}, ${theme.bgGradient.split(",")[1] ?? c})
  `;
  const overlay = `radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)`;
  return { background, overlay };
}

export function pickPrompt(theme: MuseumTheme, round: number): string {
  return theme.promptPool[round % theme.promptPool.length];
}

export function generateVizzyArtwork(theme: MuseumTheme, artworks: Artwork[]): Artwork {
  // Look at the corpus for recurring sentiment
  const corpus = artworks.map((a) => a.description).join(" ").toLowerCase();
  const sentiment =
    corpus.includes("rain") || corpus.includes("water")
      ? "the way rain meant something specific in your house"
      : corpus.includes("light")
      ? "a particular kind of late-afternoon light"
      : corpus.includes("silence") || corpus.includes("quiet")
      ? "a silence three people in this room described as familiar"
      : "the colour everyone in this room kept reaching for tonight";
  const title = "Something I noticed.";
  const description = `A small piece about ${sentiment}.`;
  const visual = generateArtworkVisual({
    theme,
    medium: "Painting",
    seed: Date.now() % 1000,
  });
  return {
    id: `vizzy-${Date.now()}`,
    playerId: "vizzy",
    round: 99,
    prompt: "Vizzy's contribution",
    title,
    medium: "Painting",
    description,
    anonymous: false,
    art: visual,
    createdAt: Date.now(),
  };
}

const MUSEUM_NAME_PATTERNS = [
  (theme: string) => `The Quiet ${theme} Museum`,
  (theme: string) => `Museum of Tender ${theme}`,
  (theme: string) => `A Small Room for ${theme}`,
  (theme: string) => `${theme}: A Loaned Exhibition`,
  (theme: string) => `Museum of Things We Almost Forgot`,
];

export function suggestMuseumNames(theme: MuseumTheme): string[] {
  return MUSEUM_NAME_PATTERNS.map((p) => p(theme.name));
}

/**
 * Build a poetic curator's note from the session.
 */
export function writeCuratorNote(input: {
  theme: MuseumTheme;
  artworks: Artwork[];
  players: Player[];
}): string {
  const { theme, artworks, players } = input;
  const mediums = new Set(artworks.map((a) => a.medium));
  const playerCount = players.length;
  const presence = players.reduce((sum, p) => sum + p.presenceMoments, 0);

  const openings = [
    `Tonight, ${playerCount} people returned to rooms they had not entered in years.`,
    `In one evening, ${playerCount} small museums lived in the same room.`,
    `Tonight, the exhibition called ${theme.name} held more than it asked to.`,
  ];
  const middles = [
    `Someone named a painting after a memory they thought was gone.`,
    `Three people described the same kind of silence and didn't notice.`,
    `One title arrived late and stayed all evening.`,
    `Among the ${mediums.size} mediums shown, the photographs did most of the carrying.`,
  ];
  const closings = [
    `${presence > 0 ? `${presence} small moments were quietly marked as true.` : `Some moments were not marked, and that is its own kind of presence.`}`,
    `Curatorially, the collection is honest.`,
    `The light has been turned off gently.`,
  ];

  return [
    openings[Math.floor(Math.random() * openings.length)],
    middles[Math.floor(Math.random() * middles.length)],
    closings[Math.floor(Math.random() * closings.length)],
  ].join(" ");
}

export function presenceObservations(state: { players: Player[]; artworks: Artwork[] }): string[] {
  const out: string[] = [];
  const totalPresence = state.players.reduce((s, p) => s + p.presenceMoments, 0);
  if (totalPresence > 0) out.push(`${totalPresence} moments were marked as true tonight.`);
  const mediums = new Set(state.artworks.filter((a) => a.playerId !== "vizzy").map((a) => a.medium));
  if (mediums.size >= 3) out.push(`The collection breathes across ${mediums.size} mediums.`);
  if (state.artworks.length > 0)
    out.push("Someone named a painting after a memory they thought was gone.");
  return out;
}
