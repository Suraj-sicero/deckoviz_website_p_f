export interface Genre {
  id: string;
  name: string;
  mood: string;
  description: string;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
    overlay: string;
  };
  illustrationKey: string;
  particles: "rain" | "dust" | "fog" | "embers" | "snow" | "sparks" | "petals";
  narrationTone: string;
  fontMood: "serif" | "fantasy" | "modern" | "whimsical";
  ambient: string;
  twistBias: string[];
  openingPrompt: string;
  posterGradient: string;
}

export const GENRES: Genre[] = [
  {
    id: "dark-fable",
    name: "Dark Fable",
    mood: "Gothic, melancholy, beautiful menace",
    description: "Lanterns in the fog. A village that whispers about a forest.",
    themeColors: {
      primary: "#7c3aed",
      secondary: "#1e1b4b",
      accent: "#f59e0b",
      bgGradient: "linear-gradient(180deg, #050314, #160c2e 50%, #050314)",
      overlay: "rgba(124,58,237,0.18)",
    },
    illustrationKey: "dark-fable",
    particles: "fog",
    narrationTone: "Hushed, theatrical, with the weight of an old fairy tale",
    fontMood: "serif",
    ambient: "Distant wind, low cellos, occasional crow",
    twistBias: ["mystery", "horror", "psychological", "betrayal"],
    openingPrompt:
      "It was the kind of night that made you believe in things you'd given up on.",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(124,58,237,0.6), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(245,158,11,0.35), transparent 65%), linear-gradient(180deg, #060418, #1a103a, #060418)",
  },
  {
    id: "space-opera",
    name: "Space Opera",
    mood: "Vast, hopeful, neon-tinged grandeur",
    description: "Two ships, a derelict station, and a signal nobody can place.",
    themeColors: {
      primary: "#06b6d4",
      secondary: "#0f172a",
      accent: "#a78bfa",
      bgGradient: "linear-gradient(180deg, #02020a, #0a1a3a 50%, #02020a)",
      overlay: "rgba(6,182,212,0.18)",
    },
    illustrationKey: "space-opera",
    particles: "sparks",
    narrationTone: "Sweeping, cinematic, awe-struck",
    fontMood: "modern",
    ambient: "Synth pads, deep sub-bass hums, distant signal blips",
    twistBias: ["cosmic", "mystery", "betrayal"],
    openingPrompt:
      "The signal was older than the station, and the station was older than the war.",
    posterGradient:
      "radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.5), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(167,139,250,0.4), transparent 60%), linear-gradient(180deg, #01010a, #0a1a3a, #01010a)",
  },
  {
    id: "quiet-village",
    name: "Quiet Village",
    mood: "Cozy, intimate, lantern-lit",
    description: "Tea on a wooden porch. Letters from a faraway daughter.",
    themeColors: {
      primary: "#f59e0b",
      secondary: "#1c1917",
      accent: "#10b981",
      bgGradient: "linear-gradient(180deg, #0f0a05, #221608 50%, #0f0a05)",
      overlay: "rgba(245,158,11,0.16)",
    },
    illustrationKey: "quiet-village",
    particles: "petals",
    narrationTone: "Warm, conversational, like reading aloud at bedtime",
    fontMood: "serif",
    ambient: "Hearth crackle, distant brook, a wind chime",
    twistBias: ["emotional", "mystery", "weather"],
    openingPrompt:
      "Mira hadn't planned on staying. The village hadn't planned on letting her leave.",
    posterGradient:
      "radial-gradient(ellipse at 30% 70%, rgba(245,158,11,0.55), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(16,185,129,0.35), transparent 65%), linear-gradient(180deg, #0f0a05, #1a1108, #0f0a05)",
  },
  {
    id: "mythic-quest",
    name: "Mythic Quest",
    mood: "Heroic, sweeping, golden-hour epic",
    description: "A blade, a map, and three companions who do not trust each other yet.",
    themeColors: {
      primary: "#ea580c",
      secondary: "#0c0a09",
      accent: "#fbbf24",
      bgGradient: "linear-gradient(180deg, #0a0604, #2a1408 50%, #0a0604)",
      overlay: "rgba(234,88,12,0.16)",
    },
    illustrationKey: "mythic-quest",
    particles: "embers",
    narrationTone: "Bardic, rolling, weighty as legend",
    fontMood: "fantasy",
    ambient: "Slow drums, low horns, wind across stone",
    twistBias: ["fantasy", "betrayal", "emotional", "cosmic"],
    openingPrompt:
      "On the morning of the third autumn, the road finally chose a direction.",
    posterGradient:
      "radial-gradient(ellipse at 30% 30%, rgba(234,88,12,0.55), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(251,191,36,0.4), transparent 60%), linear-gradient(180deg, #0a0604, #28140a, #0a0604)",
  },
  {
    id: "urban-mystery",
    name: "Urban Mystery",
    mood: "Rain-streaked neon, noir cool",
    description: "A diner at 3 AM. A photograph that shouldn't exist.",
    themeColors: {
      primary: "#ec4899",
      secondary: "#0a0a14",
      accent: "#22d3ee",
      bgGradient: "linear-gradient(180deg, #050510, #18162a 50%, #050510)",
      overlay: "rgba(236,72,153,0.18)",
    },
    illustrationKey: "urban-mystery",
    particles: "rain",
    narrationTone: "Cool, observational, faintly amused",
    fontMood: "modern",
    ambient: "Distant traffic, neon hum, vinyl crackle",
    twistBias: ["mystery", "betrayal", "psychological"],
    openingPrompt:
      "The address on the napkin didn't exist on any map I'd ever owned.",
    posterGradient:
      "radial-gradient(ellipse at 30% 40%, rgba(236,72,153,0.5), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(34,211,238,0.35), transparent 60%), linear-gradient(180deg, #050510, #1a1830, #050510)",
  },
  {
    id: "surreal-dream",
    name: "Surreal Dream",
    mood: "Liquid logic, soft impossibility",
    description: "Stairways that exhale. A coastline that remembers your name.",
    themeColors: {
      primary: "#a78bfa",
      secondary: "#0e0a1f",
      accent: "#f472b6",
      bgGradient: "linear-gradient(180deg, #08051a, #1d1240 50%, #08051a)",
      overlay: "rgba(167,139,250,0.18)",
    },
    illustrationKey: "surreal-dream",
    particles: "dust",
    narrationTone: "Soft, slow, half-whispered, half-poem",
    fontMood: "whimsical",
    ambient: "Reversed strings, music-box echoes, breath",
    twistBias: ["psychological", "cosmic", "emotional"],
    openingPrompt:
      "When the door opened, it opened into a memory I hadn't made yet.",
    posterGradient:
      "radial-gradient(ellipse at 30% 50%, rgba(167,139,250,0.5), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(244,114,182,0.4), transparent 60%), linear-gradient(180deg, #08051a, #1d1240, #08051a)",
  },
  {
    id: "childrens-wonder",
    name: "Children's Wonder",
    mood: "Bright, kind, magical and silly",
    description: "A fox in spectacles. A button that summons rainbows.",
    themeColors: {
      primary: "#22d3ee",
      secondary: "#082f49",
      accent: "#fde68a",
      bgGradient: "linear-gradient(180deg, #061a26, #0a3a4a 50%, #061a26)",
      overlay: "rgba(34,211,238,0.18)",
    },
    illustrationKey: "childrens-wonder",
    particles: "snow",
    narrationTone: "Gentle, twinkling, eyes-wide",
    fontMood: "whimsical",
    ambient: "Glockenspiel, soft pizzicato, distant laughter",
    twistBias: ["fantasy", "emotional", "weather"],
    openingPrompt:
      "Nobody had told the rabbit it was supposed to be afraid.",
    posterGradient:
      "radial-gradient(ellipse at 30% 60%, rgba(34,211,238,0.5), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(253,230,138,0.4), transparent 60%), linear-gradient(180deg, #061a26, #0a3a4a, #061a26)",
  },
];

export const getGenre = (id: string): Genre =>
  GENRES.find((g) => g.id === id) ?? GENRES[0];
