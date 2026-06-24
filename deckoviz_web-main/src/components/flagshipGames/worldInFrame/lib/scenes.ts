export interface SceneStyle {
  id: string;
  name: string;
  tagline: string;
  palette: string[];
  bgGradient: string;
  posterGradient: string;
  font: "serif";
  ambient: string;
}

export const SCENE_STYLES: SceneStyle[] = [
  {
    id: "documentary",
    name: "Documentary & Human",
    tagline: "People being people, observed.",
    palette: ["#1c1917", "#fde68a", "#78350f", "#fef3c7"],
    bgGradient: "linear-gradient(180deg, #060709, #161a1f 50%, #060709)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(254,243,199,0.25), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(120,53,15,0.32), transparent 60%), linear-gradient(180deg, #060709, #161a1f, #060709)",
    font: "serif",
    ambient: "Distant city, kitchen tape hiss, breath",
  },
  {
    id: "surreal",
    name: "Surreal & Dreamlike",
    tagline: "What the room remembers instead.",
    palette: ["#a78bfa", "#f472b6", "#0f0a1f", "#22d3ee"],
    bgGradient: "linear-gradient(180deg, #050214, #1a0e3a 50%, #050214)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(167,139,250,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(244,114,182,0.32), transparent 60%), linear-gradient(180deg, #050214, #1a0e3a, #050214)",
    font: "serif",
    ambient: "Reversed strings, music-box, slow water",
  },
  {
    id: "natural",
    name: "Natural World",
    tagline: "Light through leaves. Light without us.",
    palette: ["#10b981", "#fde047", "#064e3b", "#1e3a8a"],
    bgGradient: "linear-gradient(180deg, #02100a, #093a1a 50%, #02100a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(16,185,129,0.35), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(253,224,71,0.25), transparent 60%), linear-gradient(180deg, #02100a, #093a1a, #02100a)",
    font: "serif",
    ambient: "Wind, distant birds, river",
  },
  {
    id: "urban",
    name: "Urban Poetry",
    tagline: "Concrete that has been kind, once.",
    palette: ["#0c4a6e", "#fbbf24", "#0a0a14", "#e2e8f0"],
    bgGradient: "linear-gradient(180deg, #04060a, #0a1830 50%, #04060a)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(12,74,110,0.35), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(251,191,36,0.22), transparent 60%), linear-gradient(180deg, #04060a, #0a1830, #04060a)",
    font: "serif",
    ambient: "Distant traffic, neon hum, vinyl crackle",
  },
  {
    id: "historical",
    name: "Historical & Imagined",
    tagline: "A century the photograph forgot.",
    palette: ["#92400e", "#fde68a", "#1c1917", "#7c2d12"],
    bgGradient: "linear-gradient(180deg, #0c0a08, #2a1408 50%, #0c0a08)",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(146,64,14,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(254,243,199,0.22), transparent 60%), linear-gradient(180deg, #0c0a08, #2a1408, #0c0a08)",
    font: "serif",
    ambient: "Vinyl, fireplace, distant clock",
  },
];

export type FormatId = "caption" | "headline" | "last-line" | "first-thought" | "letter-opening";

export interface WritingFormat {
  id: FormatId;
  label: string;
  prompt: string;
}

export const FORMATS: WritingFormat[] = [
  { id: "caption", label: "Caption", prompt: "Write the caption for this photograph." },
  { id: "headline", label: "Headline", prompt: "Write the newspaper headline for the story happening here." },
  { id: "last-line", label: "Last Line", prompt: "Write the final line of the novel this image belongs to." },
  { id: "first-thought", label: "First Thought", prompt: "Write the first thought of the person in this scene." },
  { id: "letter-opening", label: "Letter Opening", prompt: "Write the first line of the letter someone here is about to write." },
];

/* Real scene library - each item is a paragraph description that drives a procedural
   gradient backdrop. The mock provider builds a poster from these. */

export interface SceneRecord {
  id: string;
  styleId: string;
  description: string;
  background: string;
}

const gradient = (a: string, b: string, c: string, angle = 160) =>
  `radial-gradient(ellipse at 30% 40%, ${a}aa, transparent 55%), radial-gradient(ellipse at 70% 70%, ${b}aa, transparent 60%), linear-gradient(${angle}deg, ${c}, #000 90%)`;

export const SCENES: SceneRecord[] = [
  {
    id: "train-letter",
    styleId: "documentary",
    description: "A woman reading a letter in a train station, lit from above.",
    background: gradient("#fde68a", "#78350f", "#1c1917"),
  },
  {
    id: "forest-edge",
    styleId: "natural",
    description: "A child standing at the edge of a forest, holding nothing.",
    background: gradient("#10b981", "#fde047", "#02100a"),
  },
  {
    id: "empty-meal",
    styleId: "documentary",
    description: "A meal half-eaten at an empty table. Two chairs.",
    background: gradient("#fef3c7", "#92400e", "#0c0a08"),
  },
  {
    id: "flooded-bookstore",
    styleId: "surreal",
    description: "A flooded bookstore at dawn. The water has not decided yet which way to leave.",
    background: gradient("#22d3ee", "#a78bfa", "#050214"),
  },
  {
    id: "luggage",
    styleId: "documentary",
    description: "A man asleep beside packed luggage. The lamp is still on.",
    background: gradient("#fde68a", "#7c2d12", "#0c0a08"),
  },
  {
    id: "neon-diner",
    styleId: "urban",
    description: "A neon diner at 3 a.m., one customer at the counter, one in the parking lot.",
    background: gradient("#fbbf24", "#0c4a6e", "#04060a"),
  },
  {
    id: "old-photograph",
    styleId: "historical",
    description: "A family photograph from 1923, the smallest child missing from the frame.",
    background: gradient("#fde68a", "#7c2d12", "#0c0a08"),
  },
  {
    id: "aurora-window",
    styleId: "surreal",
    description: "A window opening onto an aurora that isn't supposed to be there.",
    background: gradient("#a78bfa", "#34d399", "#050214"),
  },
  {
    id: "river-bridge",
    styleId: "natural",
    description: "Two people on opposite ends of a stone bridge, neither walking.",
    background: gradient("#10b981", "#1e3a8a", "#02100a"),
  },
  {
    id: "concert-hall",
    styleId: "urban",
    description: "An empty concert hall after the audience has left. One velvet seat still folded down.",
    background: gradient("#0c4a6e", "#fbbf24", "#04060a"),
  },
];

export function pickScene(styleId: string, exclude: string[] = []): SceneRecord {
  const pool = SCENES.filter((s) => s.styleId === styleId && !exclude.includes(s.id));
  const fallback = SCENES.filter((s) => !exclude.includes(s.id));
  const list = pool.length > 0 ? pool : fallback;
  return list[Math.floor(Math.random() * list.length)] ?? SCENES[0];
}

export function pickFormat(round: number): WritingFormat {
  return FORMATS[round % FORMATS.length];
}
