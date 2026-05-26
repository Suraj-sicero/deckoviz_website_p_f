import React, { useState, useEffect, useRef } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";
import { 
  Play, Pause, Volume2, VolumeX, ShieldAlert, Headphones, Sparkles, 
  Layers, Plus, Save, Trash2, Sliders, Music, Radio, Sun, Moon, 
  Tv, Compass, RefreshCw, ChevronDown, Check, Link as LinkIcon
} from "lucide-react";

// Classical tracks categorized by composer
interface ClassicalTrack {
  id: string;
  title: string;
  composer: string;
  duration: string;
  audioUrl: string;
  thumbnail: string;
  moodTags: string[];
  category: string;
  waveformData: number[];
}

const CLASSICAL_TRACKS: ClassicalTrack[] = [
  {
    id: "chopin-nocturne-op9-no2",
    title: "Nocturne in E-Flat Major, Op. 9, No. 2",
    composer: "Chopin",
    duration: "4:30",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Frederic_Chopin_-_nocturne_op._9_no._2_in_e_flat_major.ogg",
    thumbnail: "🌸",
    moodTags: ["Romantic", "Calm", "Reflective"],
    category: "Solo Piano",
    waveformData: [12, 15, 22, 18, 25, 30, 24, 20, 18, 15, 25, 35, 42, 38, 20, 15, 22, 32, 28, 18, 12]
  },
  {
    id: "chopin-waltz-a-minor",
    title: "Waltz in A minor, B. 150",
    composer: "Chopin",
    duration: "2:11",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Chopin_Waltz_Op_posth_in_A_minor.ogg",
    thumbnail: "🍂",
    moodTags: ["Reflective", "Calm"],
    category: "Solo Piano",
    waveformData: [10, 14, 18, 15, 20, 22, 18, 12, 15, 25, 30, 28, 15, 10, 18, 22, 20, 14, 12, 8, 5]
  },
  {
    id: "chopin-prelude-e-minor",
    title: "Prelude in E Minor, Op. 28, No. 4",
    composer: "Chopin",
    duration: "2:30",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Chopin_Prelude_No._4_in_E_minor%2C_Op._28.ogg",
    thumbnail: "🎻",
    moodTags: ["Reflective", "Calm", "Romantic"],
    category: "Solo Piano",
    waveformData: [8, 10, 12, 14, 15, 18, 14, 12, 10, 15, 18, 22, 20, 15, 12, 10, 8, 6, 8, 10, 5]
  },
  {
    id: "chopin-fantaisie-impromptu",
    title: "Fantaisie-Impromptu in C-sharp minor, Op. 66",
    composer: "Chopin",
    duration: "5:12",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Chopin-fantaisie_impromptu.ogg",
    thumbnail: "⚡",
    moodTags: ["Inspired", "Creative", "Excited"],
    category: "Solo Piano",
    waveformData: [25, 45, 60, 55, 70, 75, 65, 50, 40, 30, 55, 68, 72, 60, 45, 30, 50, 65, 55, 40, 25]
  },
  {
    id: "debussy-clair-de-lune",
    title: "Clair de Lune",
    composer: "Debussy",
    duration: "5:05",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Claude_Debussy_-_Clair_de_Lune.ogg",
    thumbnail: "🌙",
    moodTags: ["Calm", "Reflective", "Romantic"],
    category: "Impressionist",
    waveformData: [5, 8, 12, 15, 20, 22, 18, 15, 12, 18, 25, 32, 28, 20, 15, 12, 18, 22, 18, 12, 8]
  },
  {
    id: "debussy-reverie",
    title: "Rêverie",
    composer: "Debussy",
    duration: "4:15",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Claude_Debussy_-_R%C3%AAverie.ogg",
    thumbnail: "🌌",
    moodTags: ["Calm", "Reflective", "Focused"],
    category: "Impressionist",
    waveformData: [8, 12, 15, 18, 22, 25, 20, 18, 15, 22, 28, 30, 25, 18, 15, 12, 18, 22, 18, 12, 8]
  },
  {
    id: "beethoven-moonlight-sonata-1",
    title: "Moonlight Sonata (1st Movement)",
    composer: "Beethoven",
    duration: "6:00",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Beethoven_Moonlight_Sonata_-_1st_movement.ogg",
    thumbnail: "🌒",
    moodTags: ["Calm", "Reflective", "Focused"],
    category: "Classical",
    waveformData: [10, 12, 15, 14, 16, 18, 16, 14, 12, 15, 18, 20, 18, 16, 14, 12, 15, 18, 15, 12, 10]
  },
  {
    id: "beethoven-symphony-5",
    title: "Symphony No. 5 (Allegro con brio)",
    composer: "Beethoven",
    duration: "7:25",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Beethoven%27s_5th_Symphony%2C_Op._67_-_I._Allegro_con_brio.ogg",
    thumbnail: "⚡",
    moodTags: ["Inspired", "Celebratory", "Excited"],
    category: "Symphonic",
    waveformData: [60, 85, 95, 70, 40, 88, 92, 50, 30, 85, 90, 60, 40, 88, 95, 75, 45, 90, 85, 60, 30]
  },
  {
    id: "beethoven-symphony-9",
    title: "Symphony No. 9 (Ode to Joy theme)",
    composer: "Beethoven",
    duration: "3:40",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/Beethoven_-_Symphony_9%2C_movement_4_snippet.ogg",
    thumbnail: "☀️",
    moodTags: ["Celebratory", "Inspired", "Excited"],
    category: "Symphonic",
    waveformData: [30, 45, 55, 60, 65, 70, 75, 68, 60, 55, 65, 75, 80, 72, 60, 50, 65, 70, 68, 55, 40]
  },
  {
    id: "beethoven-fur-elise",
    title: "Für Elise",
    composer: "Beethoven",
    duration: "2:50",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Beethoven_-_F%C3%BCr_Elise.ogg",
    thumbnail: "🌹",
    moodTags: ["Reflective", "Romantic", "Calm"],
    category: "Classical",
    waveformData: [12, 18, 15, 20, 22, 18, 14, 16, 25, 28, 20, 15, 18, 22, 20, 15, 12, 18, 15, 12, 10]
  },
  {
    id: "mozart-symphony-40",
    title: "Symphony No. 40 (Molto allegro)",
    composer: "Mozart",
    duration: "8:10",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Wolfgang_Amadeus_Mozart_-_Symphony_40_in_G_minor%2C_K._550_-_1._Molto_allegro.ogg",
    thumbnail: "🕊️",
    moodTags: ["Focused", "Inspired", "Creative"],
    category: "Symphonic",
    waveformData: [20, 35, 48, 42, 55, 50, 40, 35, 30, 45, 52, 48, 38, 32, 42, 50, 45, 38, 30, 25, 15]
  },
  {
    id: "mozart-figaro-overture",
    title: "The Marriage of Figaro (Overture)",
    composer: "Mozart",
    duration: "4:00",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Mozart_Figaro_Overture.ogg",
    thumbnail: "🎭",
    moodTags: ["Celebratory", "Excited", "Inspired"],
    category: "Orchestral",
    waveformData: [25, 40, 52, 58, 62, 60, 48, 35, 45, 55, 65, 58, 42, 35, 50, 62, 58, 45, 35, 28, 20]
  },
  {
    id: "mozart-rondo-alla-turca",
    title: "Rondo alla Turca",
    composer: "Mozart",
    duration: "3:30",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Mozart_Piano_Sonata_K_331_Rondo_Alla_Turca.ogg",
    thumbnail: "🐎",
    moodTags: ["Excited", "Creative", "Inspired"],
    category: "Solo Piano",
    waveformData: [15, 25, 35, 42, 48, 40, 30, 25, 38, 46, 52, 44, 32, 28, 36, 45, 40, 32, 25, 18, 12]
  },
  {
    id: "mozart-sonata-k545-1",
    title: "Piano Sonata No. 16 in C major (1st Mvt)",
    composer: "Mozart",
    duration: "4:12",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Mozart_Piano_Sonata_No_16_in_C_major_K_545_1st_movement.ogg",
    thumbnail: "☀️",
    moodTags: ["Focused", "Creative", "Calm"],
    category: "Solo Piano",
    waveformData: [10, 15, 22, 28, 32, 26, 20, 15, 22, 30, 35, 28, 18, 15, 20, 26, 22, 18, 12, 10, 8]
  },
  {
    id: "bach-air-on-g",
    title: "Air on the G String",
    composer: "Bach",
    duration: "5:20",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Orchestral_Suite_No._3_in_D_major%2C_BWV_1068_-_II._Air.ogg",
    thumbnail: "🎻",
    moodTags: ["Calm", "Reflective", "Gratitude", "Intimate"],
    category: "Baroque",
    waveformData: [6, 10, 14, 18, 22, 24, 20, 18, 16, 22, 25, 28, 24, 20, 18, 15, 18, 22, 18, 14, 10]
  },
  {
    id: "bach-goldberg-aria",
    title: "Goldberg Variations (Aria)",
    composer: "Bach",
    duration: "4:45",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Johann_Sebastian_Bach_-_Goldberg_Variations_BWV_988_-_01_Aria.ogg",
    thumbnail: "🔑",
    moodTags: ["Calm", "Focused", "Reflective"],
    category: "Baroque",
    waveformData: [8, 12, 15, 14, 18, 20, 16, 14, 12, 16, 20, 22, 18, 14, 12, 10, 14, 18, 15, 12, 8]
  },
  {
    id: "bach-cello-suite-1",
    title: "Cello Suite No. 1 (Prelude)",
    composer: "Bach",
    duration: "2:50",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Bach_Cello_Suite_1_-_1._Prelude.ogg",
    thumbnail: "🎻",
    moodTags: ["Focused", "Calm", "Reflective", "Creative"],
    category: "Solo Instrumental",
    waveformData: [14, 18, 25, 28, 32, 26, 20, 18, 24, 30, 34, 28, 20, 16, 22, 28, 25, 20, 14, 12, 8]
  },
  {
    id: "tchaikovsky-sugar-plum",
    title: "Dance of the Sugar Plum Fairy",
    composer: "Tchaikovsky",
    duration: "2:10",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Tchaikovsky_-_Nutcracker_-_Dance_of_the_Sugar_Plum_Fairy.ogg",
    thumbnail: "🧚",
    moodTags: ["Creative", "Excited", "Inspired"],
    category: "Romantic Ballet",
    waveformData: [8, 15, 24, 20, 12, 18, 26, 18, 10, 14, 22, 20, 12, 16, 25, 18, 10, 15, 22, 14, 8]
  },
  {
    id: "tchaikovsky-swan-lake",
    title: "Swan Lake (Scene)",
    composer: "Tchaikovsky",
    duration: "3:05",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Tchaikovsky_Swan_Lake_Suite_-_Scene.ogg",
    thumbnail: "🦢",
    moodTags: ["Romantic", "Reflective", "Inspired"],
    category: "Romantic Ballet",
    waveformData: [12, 20, 30, 42, 55, 48, 35, 25, 38, 50, 60, 52, 38, 28, 42, 55, 48, 35, 28, 20, 12]
  },
  {
    id: "vivaldi-spring-1",
    title: "The Four Seasons: Spring (1st Mvt)",
    composer: "Vivaldi",
    duration: "3:30",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vivaldi_-_Spring_mvt_1_Allegro_-_John_Harrison_with_Wichita_State_University_Chamber_Players.ogg",
    thumbnail: "🌱",
    moodTags: ["Inspired", "Celebratory", "Creative"],
    category: "Baroque Concerto",
    waveformData: [25, 42, 55, 62, 58, 45, 38, 48, 58, 64, 55, 40, 35, 48, 58, 52, 42, 35, 28, 22, 15]
  }
];

const AMBIENT_CATEGORIES = {
  "Nature": ["Rain", "Thunderstorm", "Ocean Waves", "Waterfall", "Forest", "Wind", "Bird Songs", "River Flow", "Fireplace"],
  "City": ["Café ambience", "Library ambience", "Keyboard typing", "Tokyo night", "Train ambience", "Airport ambience"],
  "Fantasy / Cinematic": ["Space ambience", "Dreamscape", "Cyberpunk rain", "Sci-fi hum", "Alien atmosphere"],
  "Wellness Noise": ["White noise", "Brown noise", "Pink noise"]
};

// Preset Moodscapes
interface MoodscapeConfig {
  name: string;
  gradient: string;
  textColor: string;
  particlesColor: string;
  particleSpeed: number;
  particlesCount: number;
  glowColor: string;
  ambientLayers: Record<string, number>;
  classicalTrackId: string | null;
  binauralEnabled: boolean;
  binauralCarrier: number;
  binauralBeat: number; // brainwave freq
  binauralVolume: number;
  binauralWaveform: string;
  description: string;
  activeVisualizer?: string;
}

const MOODSCAPES: Record<string, MoodscapeConfig> = {
  Focused: {
    name: "Focused Space",
    gradient: "from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a]",
    textColor: "text-blue-100",
    particlesColor: "rgba(96, 165, 250, 0.4)",
    particleSpeed: 0.5,
    particlesCount: 15,
    glowColor: "rgba(37, 99, 235, 0.2)",
    ambientLayers: { "Brown noise": 0.5, "Keyboard typing": 0.15 },
    classicalTrackId: "bach-goldberg-aria",
    binauralEnabled: true,
    binauralCarrier: 200,
    binauralBeat: 10, // Alpha (10Hz)
    binauralVolume: 0.25,
    binauralWaveform: "sine",
    description: "Deep alpha focus field, soft keys, brown noise and baroque clarity."
  },
  Romantic: {
    name: "Romantic Glow",
    gradient: "from-[#2b0f1a] via-[#4a1228] to-[#1a0812]",
    textColor: "text-rose-100",
    particlesColor: "rgba(251, 113, 133, 0.4)",
    particleSpeed: 1.0,
    particlesCount: 30,
    glowColor: "rgba(225, 29, 72, 0.25)",
    ambientLayers: { "Rain": 0.4, "Fireplace": 0.4 },
    classicalTrackId: "chopin-nocturne-op9-no2",
    binauralEnabled: true,
    binauralCarrier: 220,
    binauralBeat: 5, // Theta (5Hz)
    binauralVolume: 0.15,
    binauralWaveform: "sine",
    description: "Cozy warmth, rain on window, fireside crackle and Chopin's melodies."
  },
  Creative: {
    name: "Creative Drift",
    gradient: "from-[#1a0f30] via-[#2d124d] to-[#0f0720]",
    textColor: "text-purple-100",
    particlesColor: "rgba(192, 132, 252, 0.5)",
    particleSpeed: 1.5,
    particlesCount: 25,
    glowColor: "rgba(147, 51, 234, 0.25)",
    ambientLayers: { "Café ambience": 0.35, "Cyberpunk rain": 0.3 },
    classicalTrackId: "debussy-clair-de-lune",
    binauralEnabled: true,
    binauralCarrier: 180,
    binauralBeat: 7, // Theta (7Hz)
    binauralVolume: 0.2,
    binauralWaveform: "sine",
    description: "Espresso vibe, rainy neon lights, theta wave stimulation and Debussy."
  },
  Calm: {
    name: "Calm Refuge",
    gradient: "from-[#081c15] via-[#1b4332] to-[#081c15]",
    textColor: "text-emerald-100",
    particlesColor: "rgba(52, 211, 153, 0.3)",
    particleSpeed: 0.4,
    particlesCount: 20,
    glowColor: "rgba(5, 150, 105, 0.2)",
    ambientLayers: { "Forest": 0.5, "Bird Songs": 0.3, "River Flow": 0.25 },
    classicalTrackId: "bach-air-on-g",
    binauralEnabled: true,
    binauralCarrier: 150,
    binauralBeat: 3, // Delta (3Hz)
    binauralVolume: 0.3,
    binauralWaveform: "sine",
    description: "Forest trails, soothing rivers, birdsong and delta sleep waves."
  },
  Inspired: {
    name: "Inspiration Field",
    gradient: "from-[#1b263b] via-[#3b82f6] to-[#1e3a8a]",
    textColor: "text-cyan-100",
    particlesColor: "rgba(103, 232, 249, 0.5)",
    particleSpeed: 2.0,
    particlesCount: 35,
    glowColor: "rgba(6, 182, 212, 0.3)",
    ambientLayers: { "Space ambience": 0.4, "Wind": 0.2 },
    classicalTrackId: "beethoven-symphony-9",
    binauralEnabled: true,
    binauralCarrier: 240,
    binauralBeat: 12, // High Alpha/Beta (12Hz)
    binauralVolume: 0.2,
    binauralWaveform: "sine",
    description: "Wind in sails, starlight hum, brain spark waves and uplifting orchestral."
  },
  Gratitude: {
    name: "Gratitude Grounding",
    gradient: "from-[#2d1a10] via-[#5c3d2e] to-[#2d1a10]",
    textColor: "text-amber-100",
    particlesColor: "rgba(251, 191, 36, 0.4)",
    particleSpeed: 0.6,
    particlesCount: 18,
    glowColor: "rgba(217, 119, 6, 0.2)",
    ambientLayers: { "Ocean Waves": 0.4, "Wind": 0.15 },
    classicalTrackId: "beethoven-fur-elise",
    binauralEnabled: true,
    binauralCarrier: 200,
    binauralBeat: 8, // Alpha/Theta border (8Hz)
    binauralVolume: 0.2,
    binauralWaveform: "sine",
    description: "Tidal breath, gentle breeze, sunset gold tones and reflective solo piano."
  },
  Celebratory: {
    name: "Celebratory Rise",
    gradient: "from-[#3c0919] via-[#881337] to-[#4c0519]",
    textColor: "text-rose-100",
    particlesColor: "rgba(244, 63, 94, 0.6)",
    particleSpeed: 2.5,
    particlesCount: 40,
    glowColor: "rgba(225, 29, 72, 0.4)",
    ambientLayers: { "Tokyo night": 0.3, "Waterfall": 0.15 },
    classicalTrackId: "vivaldi-spring-1",
    binauralEnabled: false,
    binauralCarrier: 200,
    binauralBeat: 15,
    binauralVolume: 0.1,
    binauralWaveform: "sine",
    description: "Bustling energies, waterfall spray, neon sparks and soaring baroque violins."
  },
  Intimate: {
    name: "Intimate Whisper",
    gradient: "from-[#110c11] via-[#2d1b2d] to-[#110c11]",
    textColor: "text-pink-100",
    particlesColor: "rgba(244, 114, 182, 0.3)",
    particleSpeed: 0.6,
    particlesCount: 15,
    glowColor: "rgba(219, 39, 119, 0.2)",
    ambientLayers: { "Rain": 0.3, "Fireplace": 0.3, "White noise": 0.1 },
    classicalTrackId: "chopin-prelude-e-minor",
    binauralEnabled: true,
    binauralCarrier: 210,
    binauralBeat: 4.5, // Theta (4.5Hz)
    binauralVolume: 0.15,
    binauralWaveform: "sine",
    description: "Soft static, candle warmth, rain patter, deep heart waves and melancholic cello."
  },
  Reflective: {
    name: "Reflective Horizon",
    gradient: "from-[#0c0f1d] via-[#1e293b] to-[#0c0f1d]",
    textColor: "text-slate-200",
    particlesColor: "rgba(148, 163, 184, 0.4)",
    particleSpeed: 0.5,
    particlesCount: 22,
    glowColor: "rgba(71, 85, 105, 0.2)",
    ambientLayers: { "Ocean Waves": 0.4, "Wind": 0.25, "Space ambience": 0.2 },
    classicalTrackId: "chopin-waltz-a-minor",
    binauralEnabled: true,
    binauralCarrier: 190,
    binauralBeat: 6.5, // Theta (6.5Hz)
    binauralVolume: 0.2,
    binauralWaveform: "sine",
    description: "Horizon swell, wind currents, quiet synth space, daydream beats and solo waltz."
  },
  Excited: {
    name: "Excited Pulse",
    gradient: "from-[#1e1b4b] via-[#311042] to-[#111827]",
    textColor: "text-fuchsia-200",
    particlesColor: "rgba(232, 121, 249, 0.6)",
    particleSpeed: 2.8,
    particlesCount: 45,
    glowColor: "rgba(217, 70, 239, 0.35)",
    ambientLayers: { "Tokyo night": 0.4, "Train ambience": 0.3 },
    classicalTrackId: "chopin-fantaisie-impromptu",
    binauralEnabled: true,
    binauralCarrier: 300,
    binauralBeat: 20, // Beta (20Hz)
    binauralVolume: 0.15,
    binauralWaveform: "sine",
    description: "City rails, sparkling street grids, beta focus frequency and lightning finger piano."
  }
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-demo.onrender.com";

const SoundscapesTool: React.FC = () => {
  const { token, user } = useAuth();

  // Audio Context & State
  const audioContextRef = useRef<AudioContext | null>(null);
  const [engineInitialized, setEngineInitialized] = useState(false);

  // Audio Nodes References
  const masterGainRef = useRef<GainNode | null>(null);
  const classicalGainRef = useRef<GainNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const binauralGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  // Classical Music Player State & Ref
  const classicalAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingClassical, setIsPlayingClassical] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<ClassicalTrack | null>(null);
  const [classicalVolume, setClassicalVolume] = useState(0.5);
  const [classicalLoop, setClassicalLoop] = useState(true);
  const [classicalShuffle, setClassicalShuffle] = useState(false);
  const [composerFilter, setComposerFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [accordionOpen, setAccordionOpen] = useState<Record<string, boolean>>({
    Chopin: true, Debussy: true, Beethoven: false, Mozart: false, Bach: false, Tchaikovsky: false
  });

  // Ambient sound procedural generation state
  // Stores active nodes for ambient sources
  const ambientNodesRef = useRef<Record<string, { source: AudioNode; gain: GainNode; extraNodes?: AudioNode[] }>>({});
  const [ambientVolumes, setAmbientVolumes] = useState<Record<string, number>>({});
  const [ambientCategoryFilter, setAmbientCategoryFilter] = useState<string>("All");

  // Binaural Beat Generator state
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const [binauralEnabled, setBinauralEnabled] = useState(false);
  const [binauralCarrier, setBinauralCarrier] = useState(200);
  const [binauralBeat, setBinauralBeat] = useState(10); // brainwave freq
  const [binauralVolume, setBinauralVolume] = useState(0.2);
  const [binauralWaveform, setBinauralWaveform] = useState<OscillatorType>("sine");

  // Master Levels & Mixer
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [masterMuted, setMasterMuted] = useState(false);

  // Moodscape Configuration
  const [currentMood, setCurrentMood] = useState<string>("Calm");
  const [customPresetName, setCustomPresetName] = useState("");
  const [savedPresets, setSavedPresets] = useState<any[]>([]);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  // Visualizer Canvas Ref & Mode
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeVisualizer, setActiveVisualizer] = useState<string>("waveform");

  // Deckoviz Mock integration
  const [attachedFrame, setAttachedFrame] = useState<string | null>(null);
  const [frameNotification, setFrameNotification] = useState("");

  // Accessibility Warnings / Motion
  const [headphonePrompt, setHeadphonePrompt] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Composers list
  const composers = ["All", "Chopin", "Debussy", "Beethoven", "Mozart", "Bach", "Tchaikovsky"];

  // Initialize Web Audio Engine
  const initializeEngine = () => {
    if (audioContextRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Master Analyser
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = masterVolume;
      masterGainRef.current = masterGain;

      // Layer Gains
      const classicalGain = ctx.createGain();
      classicalGain.gain.value = classicalVolume;
      classicalGainRef.current = classicalGain;

      const ambientGain = ctx.createGain();
      ambientGain.gain.value = 0.8; // Default submix
      ambientGainRef.current = ambientGain;

      const binauralGain = ctx.createGain();
      binauralGain.gain.value = binauralVolume;
      binauralGainRef.current = binauralGain;

      // Route layout
      // Classical Player Element
      const audioEl = new Audio();
      audioEl.crossOrigin = "anonymous";
      audioEl.loop = classicalLoop;
      classicalAudioRef.current = audioEl;

      const classicalSource = ctx.createMediaElementSource(audioEl);
      classicalSource.connect(classicalGain);

      // Connect Layer Gains to Master Gain
      classicalGain.connect(masterGain);
      ambientGain.connect(masterGain);
      binauralGain.connect(masterGain);

      // Connect Master to Analyser to Destination
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);

      setEngineInitialized(true);
      console.log("Deckoviz Audio Engine Initialized.");

      // Start canvas animation loop
      requestAnimationFrame(renderVisuals);
    } catch (err) {
      console.error("Failed to initialize Web Audio API:", err);
    }
  };

  // Fetch presets from DB
  const fetchPresets = async () => {
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(`${BACKEND_URL}/api/soundscapes`, { headers });
      if (res.ok) {
        const data = await res.json();
        setSavedPresets(data);
      }
    } catch (e) {
      console.error("Failed to fetch presets", e);
    }
  };

  useEffect(() => {
    fetchPresets();
  }, [token]);

  // Handle HTML Classical Audio Syncing
  useEffect(() => {
    if (!classicalAudioRef.current) return;
    classicalAudioRef.current.loop = classicalLoop;
  }, [classicalLoop]);

  useEffect(() => {
    if (!classicalGainRef.current) return;
    classicalGainRef.current.gain.value = classicalVolume;
  }, [classicalVolume]);

  useEffect(() => {
    if (!masterGainRef.current) return;
    masterGainRef.current.gain.value = masterMuted ? 0 : masterVolume;
  }, [masterVolume, masterMuted]);

  // Clean up nodes on unmount
  useEffect(() => {
    return () => {
      // Stop classical
      if (classicalAudioRef.current) {
        classicalAudioRef.current.pause();
      }
      // Stop binaural
      stopBinaural();
      // Stop all ambient synthesizers
      Object.keys(ambientNodesRef.current).forEach(stopAmbientSynth);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // --- BINAURAL SYNTHESIZER ---
  const startBinaural = () => {
    if (!audioContextRef.current || !binauralGainRef.current) return;
    
    stopBinaural(); // stop old nodes

    const ctx = audioContextRef.current;
    
    // Left Osc
    const leftOsc = ctx.createOscillator();
    leftOsc.type = binauralWaveform;
    leftOsc.frequency.value = binauralCarrier;

    // Right Osc
    const rightOsc = ctx.createOscillator();
    rightOsc.type = binauralWaveform;
    rightOsc.frequency.value = binauralCarrier + binauralBeat;

    // Panners to split channels
    const leftPanner = ctx.createStereoPanner();
    leftPanner.pan.value = -1.0; // fully left

    const rightPanner = ctx.createStereoPanner();
    rightPanner.pan.value = 1.0; // fully right

    // Connections
    leftOsc.connect(leftPanner);
    leftPanner.connect(binauralGainRef.current);

    rightOsc.connect(rightPanner);
    rightPanner.connect(binauralGainRef.current);

    // Start
    leftOsc.start(0);
    rightOsc.start(0);

    leftOscRef.current = leftOsc;
    rightOscRef.current = rightOsc;
  };

  const stopBinaural = () => {
    if (leftOscRef.current) {
      try { leftOscRef.current.stop(); } catch(e) {}
      leftOscRef.current.disconnect();
      leftOscRef.current = null;
    }
    if (rightOscRef.current) {
      try { rightOscRef.current.stop(); } catch(e) {}
      rightOscRef.current.disconnect();
      rightOscRef.current = null;
    }
  };

  // Sync binaural oscillator details live
  useEffect(() => {
    if (binauralEnabled && engineInitialized) {
      startBinaural();
    } else {
      stopBinaural();
    }
  }, [binauralEnabled, binauralCarrier, binauralBeat, binauralWaveform]);

  useEffect(() => {
    if (!binauralGainRef.current) return;
    binauralGainRef.current.gain.value = binauralVolume;
  }, [binauralVolume]);


  // --- PROCEDURAL AMBIENT SYNTHESIS ENGINES ---
  const startAmbientSynth = (name: string, vol: number) => {
    if (!audioContextRef.current || !ambientGainRef.current) return;
    if (ambientNodesRef.current[name]) {
      // update volume only
      ambientNodesRef.current[name].gain.gain.setTargetAtTime(vol, audioContextRef.current.currentTime, 0.1);
      return;
    }

    const ctx = audioContextRef.current;
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0, ctx.currentTime);
    subGain.connect(ambientGainRef.current);
    subGain.gain.setTargetAtTime(vol, ctx.currentTime, 0.5); // Fade in

    let sourceNode: AudioNode;
    let extraNodes: AudioNode[] = [];

    // Procedural noise engines
    const createNoiseBuffer = (type: "white" | "pink" | "brown") => {
      const sampleRate = ctx.sampleRate;
      const bufferSize = 2 * sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      if (type === "white") {
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      } else if (type === "pink") {
        let b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          let white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          data[i] *= 0.11; // compensate gain
          b6 = white * 0.115926;
        }
      } else if (type === "brown") {
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          let white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5; // compensate volume loss
        }
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      return source;
    };

    if (name === "White noise" || name === "Brown noise" || name === "Pink noise") {
      const type = name.split(" ")[0].toLowerCase() as "white" | "pink" | "brown";
      const noise = createNoiseBuffer(type);
      noise.connect(subGain);
      noise.start(0);
      sourceNode = noise;
    } 
    else if (name === "Rain" || name === "Cyberpunk rain") {
      const noise = createNoiseBuffer("white");
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = name === "Cyberpunk rain" ? 1800 : 1200;
      filter.Q.value = 1.0;
      
      noise.connect(filter);
      filter.connect(subGain);
      noise.start(0);
      sourceNode = noise;
      extraNodes = [filter];
    }
    else if (name === "Wind" || name === "Forest") {
      // Filtered noise modulated by an LFO to simulate gusts
      const noise = createNoiseBuffer("pink");
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 400;
      filter.Q.value = 2.0;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08; // 12-second gusts
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 250;

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(0);

      noise.connect(filter);
      filter.connect(subGain);
      noise.start(0);

      sourceNode = noise;
      extraNodes = [filter, lfo, lfoGain];
    }
    else if (name === "Fireplace") {
      // Crackle generator: Pink noise low pass + random clicks
      const noise = createNoiseBuffer("pink");
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;

      // Click generator
      const clicks = ctx.createBufferSource();
      const clickBufSize = 0.5 * ctx.sampleRate;
      const clickBuf = ctx.createBuffer(1, clickBufSize, ctx.sampleRate);
      const clickData = clickBuf.getChannelData(0);
      for (let i = 0; i < clickBufSize; i++) {
        // sporadic clicks
        if (Math.random() < 0.0008) {
          clickData[i] = Math.random() * 2 - 1;
        }
      }
      clicks.buffer = clickBuf;
      clicks.loop = true;

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = "highpass";
      clickFilter.frequency.value = 2000;

      noise.connect(filter);
      filter.connect(subGain);
      noise.start(0);

      clicks.connect(clickFilter);
      clickFilter.connect(subGain);
      clicks.start(0);

      sourceNode = noise;
      extraNodes = [filter, clicks, clickFilter];
    }
    else if (name === "Sci-fi hum" || name === "Alien atmosphere" || name === "Space ambience") {
      // Layer detuned low sine oscillators
      const osc1 = ctx.createOscillator();
      osc1.frequency.value = name === "Sci-fi hum" ? 60 : 50;
      osc1.type = "sine";

      const osc2 = ctx.createOscillator();
      osc2.frequency.value = name === "Sci-fi hum" ? 120.4 : 75.8;
      osc2.type = "triangle";

      const lowGain = ctx.createGain();
      lowGain.gain.value = 0.6;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 150;

      osc1.connect(lowGain);
      osc2.connect(lowGain);
      lowGain.connect(filter);
      filter.connect(subGain);

      osc1.start(0);
      osc2.start(0);

      sourceNode = osc1;
      extraNodes = [osc2, lowGain, filter];
    }
    else {
      // Fallback synthesizer: a gentle evolving sine wave layer
      const osc = ctx.createOscillator();
      osc.type = "sine";
      // Pick a random comfortable harmonic freq
      const freqs = [150, 200, 220, 300, 440];
      osc.frequency.value = freqs[Math.floor(Math.random() * freqs.length)];

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 5;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(0);

      osc.connect(subGain);
      osc.start(0);

      sourceNode = osc;
      extraNodes = [lfo, lfoGain];
    }

    ambientNodesRef.current[name] = { source: sourceNode, gain: subGain, extraNodes };
  };

  const stopAmbientSynth = (name: string) => {
    const nodeObj = ambientNodesRef.current[name];
    if (!nodeObj) return;

    const ctx = audioContextRef.current;
    if (ctx) {
      // Fade out smoothly
      nodeObj.gain.gain.cancelScheduledValues(ctx.currentTime);
      nodeObj.gain.gain.setValueAtTime(nodeObj.gain.gain.value, ctx.currentTime);
      nodeObj.gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    }

    setTimeout(() => {
      // Disconnect and stop sources
      try {
        if ((nodeObj.source as any).stop) {
          (nodeObj.source as any).stop();
        }
      } catch (e) {}
      nodeObj.source.disconnect();

      if (nodeObj.extraNodes) {
        nodeObj.extraNodes.forEach(extra => {
          try {
            if ((extra as any).stop) (extra as any).stop();
          } catch(e) {}
          extra.disconnect();
        });
      }
      nodeObj.gain.disconnect();
      delete ambientNodesRef.current[name];
    }, 900);
  };

  // Adjust ambient levels on demand
  const handleAmbientVolumeChange = (name: string, vol: number) => {
    if (!engineInitialized) initializeEngine();
    
    setAmbientVolumes(prev => ({ ...prev, [name]: vol }));

    if (vol > 0) {
      startAmbientSynth(name, vol);
    } else {
      stopAmbientSynth(name);
    }
  };

  // Turn off all ambient channels
  const clearAllAmbient = () => {
    Object.keys(ambientNodesRef.current).forEach(name => {
      stopAmbientSynth(name);
    });
    setAmbientVolumes({});
  };


  // --- CLASSICAL MUSIC CONTROLLERS ---
  const playClassicalTrack = (track: ClassicalTrack) => {
    if (!engineInitialized) initializeEngine();
    
    // Check state initialization
    setTimeout(() => {
      if (!classicalAudioRef.current) return;
      
      setCurrentTrack(track);
      classicalAudioRef.current.src = track.audioUrl;
      classicalAudioRef.current.play()
        .then(() => setIsPlayingClassical(true))
        .catch(err => {
          console.warn("Autoplay / load issue with track, playing synthesizer melody fallback.", err);
          // Synthesize fallback!
          playSynthPianoFallback();
        });
    }, 100);
  };

  // Plays beautiful synthetic arpeggiated piano chords using Web Audio Oscillators
  // in case Wikimedia's CORS or loading fails
  const playSynthPianoFallback = () => {
    if (!audioContextRef.current || !classicalGainRef.current) return;
    const ctx = audioContextRef.current;
    
    // Play a sequence of minor/major arpeggios
    const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63]; // C Major
    let index = 0;
    
    const interval = setInterval(() => {
      if (!isPlayingClassical) {
        clearInterval(interval);
        return;
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(notes[index], ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(classicalGainRef.current!);
      
      osc.start(0);
      osc.stop(ctx.currentTime + 1.3);
      
      index = (index + 1) % notes.length;
    }, 400);
    
    setIsPlayingClassical(true);
  };

  const toggleClassicalPlay = () => {
    if (!classicalAudioRef.current) {
      if (currentTrack) playClassicalTrack(currentTrack);
      return;
    }

    if (isPlayingClassical) {
      classicalAudioRef.current.pause();
      setIsPlayingClassical(false);
    } else {
      if (currentTrack) {
        classicalAudioRef.current.play()
          .then(() => setIsPlayingClassical(true))
          .catch(() => playSynthPianoFallback());
      } else if (CLASSICAL_TRACKS.length > 0) {
        playClassicalTrack(CLASSICAL_TRACKS[0]);
      }
    }
  };

  const shuffleClassical = () => {
    const randomIdx = Math.floor(Math.random() * CLASSICAL_TRACKS.length);
    playClassicalTrack(CLASSICAL_TRACKS[randomIdx]);
  };

  const nextClassicalTrack = () => {
    if (classicalShuffle) {
      shuffleClassical();
      return;
    }
    const currentIdx = currentTrack ? CLASSICAL_TRACKS.findIndex(t => t.id === currentTrack.id) : -1;
    const nextIdx = (currentIdx + 1) % CLASSICAL_TRACKS.length;
    playClassicalTrack(CLASSICAL_TRACKS[nextIdx]);
  };


  // --- MOODSCAPES ENGINE ---
  const applyMoodscape = (moodName: string) => {
    const config = MOODSCAPES[moodName];
    if (!config) return;

    setCurrentMood(moodName);
    
    if (!engineInitialized) initializeEngine();

    // 1. Setup ambient layers
    clearAllAmbient();
    setTimeout(() => {
      const nextAmbientVols: Record<string, number> = {};
      Object.entries(config.ambientLayers).forEach(([name, vol]) => {
        nextAmbientVols[name] = vol;
        startAmbientSynth(name, vol);
      });
      setAmbientVolumes(nextAmbientVols);
    }, 150);

    // 2. Play music track
    if (config.classicalTrackId) {
      const track = CLASSICAL_TRACKS.find(t => t.id === config.classicalTrackId);
      if (track) {
        playClassicalTrack(track);
      }
    } else {
      if (classicalAudioRef.current) {
        classicalAudioRef.current.pause();
        setIsPlayingClassical(false);
      }
    }

    // 3. Setup Binaural settings
    setBinauralEnabled(config.binauralEnabled);
    setBinauralCarrier(config.binauralCarrier);
    setBinauralBeat(config.binauralBeat);
    setBinauralVolume(config.binauralVolume);
    setBinauralWaveform(config.binauralWaveform as OscillatorType);

    // 4. Update Visualizer selection
    if (config.activeVisualizer) {
      setActiveVisualizer(config.activeVisualizer);
    }
  };


  // --- VISUALIZER DRAWING ---
  const renderVisuals = () => {
    if (!canvasRef.current || !analyserRef.current) {
      requestAnimationFrame(renderVisuals);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Dynamic color setup based on selected moodscape
    const activeMood = MOODSCAPES[currentMood];
    const fillGlow = activeMood ? activeMood.glowColor : "rgba(139, 92, 246, 0.25)";
    const strokeColor = activeMood ? activeMood.particlesColor.replace(/[\d.]+\)$/, "0.8)") : "rgba(139, 92, 246, 0.8)";

    if (activeVisualizer === "waveform") {
      // Render beautiful oscilloscope curve
      const timeData = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(timeData);

      ctx.lineWidth = 3;
      ctx.strokeStyle = strokeColor;
      ctx.shadowBlur = 15;
      ctx.shadowColor = strokeColor;
      ctx.beginPath();

      const sliceWidth = w / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = timeData[i] / 128.0;
        const y = (v * h) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    } 
    else if (activeVisualizer === "circular") {
      // Circular expanding heartbeat pulse react to amplitude
      const center = { x: w / 2, y: h / 2 };
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
      const avg = sum / bufferLength;
      
      const baseRadius = Math.min(w, h) * 0.22;
      const targetRadius = baseRadius + (avg * 0.45);

      // outer glowing ring
      ctx.shadowBlur = 30;
      ctx.shadowColor = strokeColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(center.x, center.y, targetRadius, 0, Math.PI * 2);
      ctx.stroke();

      // inner semi-transparent aura
      ctx.fillStyle = fillGlow;
      ctx.beginPath();
      ctx.arc(center.x, center.y, targetRadius - 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    } 
    else if (activeVisualizer === "spectrum") {
      // Neon spectrum bar peaks
      const barWidth = (w / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 0.85;

        const grad = ctx.createLinearGradient(0, h, 0, h - barHeight);
        grad.addColorStop(0, fillGlow);
        grad.addColorStop(1, strokeColor);

        ctx.fillStyle = grad;
        ctx.fillRect(x, h - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    }
    else if (activeVisualizer === "glow") {
      // Atmospheric ambient reactive background pulse
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
      const amplitude = sum / bufferLength;

      const radialGrad = ctx.createRadialGradient(
        w / 2, h / 2, 20, 
        w / 2, h / 2, Math.max(w, h) * (0.3 + (amplitude / 255) * 0.4)
      );
      radialGrad.addColorStop(0, strokeColor);
      radialGrad.addColorStop(0.5, fillGlow);
      radialGrad.addColorStop(1, "transparent");

      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, w, h);
    }
    else {
      // Floating Reacting Particles
      ctx.fillStyle = strokeColor;
      const count = 30;
      for (let i = 0; i < count; i++) {
        const val = dataArray[i % bufferLength];
        const radius = 2 + (val * 0.08);
        const px = (w / count) * i + (Math.sin(Date.now() * 0.001 + i) * 15);
        const py = h / 2 + (Math.cos(Date.now() * 0.001 + i * 2) * (val * 0.5));
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = strokeColor;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(renderVisuals);
  };


  // --- SAVE & ATTACH DECKOVIZ FRAME ACTIONS ---
  const handleSavePreset = async () => {
    if (!token) {
      alert("Please login to save custom soundscape presets.");
      return;
    }
    if (!customPresetName.trim()) {
      alert("Please specify a preset name.");
      return;
    }

    const payload = {
      name: customPresetName,
      mood: currentMood,
      description: `Custom layer containing: ${Object.keys(ambientVolumes).join(", ") || "No ambient elements"}.`,
      ambientLayers: ambientVolumes,
      classicalTrackId: currentTrack ? currentTrack.id : null,
      musicVolume: classicalVolume,
      binauralCarrier,
      binauralBeat,
      binauralVolume,
      binauralWaveform,
      binauralEnabled,
      gradientPreset: currentMood,
      activeVisualizer
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/soundscapes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setCustomPresetName("");
        alert("Soundscape session saved successfully.");
        fetchPresets();
      } else {
        const err = await res.json();
        alert(`Failed to save: ${err.error || "Server error"}`);
      }
    } catch (e) {
      alert("Failed to save preset. Check network connection.");
    }
  };

  const handleDeletePreset = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) return;
    if (!confirm("Are you sure you want to delete this custom preset?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/soundscapes/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchPresets();
      } else {
        alert("Failed to delete preset.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyPreset = (preset: any) => {
    if (!engineInitialized) initializeEngine();
    
    // Apply configurations
    setCurrentMood(preset.gradientPreset || preset.mood || "Calm");
    setCustomPresetName("");

    // Ambient layers
    clearAllAmbient();
    setTimeout(() => {
      try {
        const layers = typeof preset.ambientLayers === "string" ? JSON.parse(preset.ambientLayers) : preset.ambientLayers;
        const nextVols: Record<string, number> = {};
        Object.entries(layers).forEach(([name, vol]) => {
          const vNum = Number(vol);
          nextVols[name] = vNum;
          startAmbientSynth(name, vNum);
        });
        setAmbientVolumes(nextVols);
      } catch (e) {
        console.error("Failed to parse ambient layers preset", e);
      }
    }, 150);

    // Music
    if (preset.classicalTrackId) {
      const track = CLASSICAL_TRACKS.find(t => t.id === preset.classicalTrackId);
      if (track) playClassicalTrack(track);
    } else {
      if (classicalAudioRef.current) {
        classicalAudioRef.current.pause();
        setIsPlayingClassical(false);
      }
    }

    // Binaural
    setBinauralEnabled(preset.binauralEnabled);
    setBinauralCarrier(preset.binauralCarrier);
    setBinauralBeat(preset.binauralBeat);
    setBinauralVolume(preset.binauralVolume);
    setBinauralWaveform(preset.binauralWaveform);

    // Visualizer
    setActiveVisualizer(preset.activeVisualizer || "waveform");
  };

  const handleAttachToFrame = (frameId: string) => {
    setAttachedFrame(frameId);
    setFrameNotification(`Connected current soundscape to Deckoviz Frame: ${frameId}`);
    setTimeout(() => setFrameNotification(""), 4500);
  };


  // Filtered tracks
  const filteredClassicalTracks = CLASSICAL_TRACKS.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          track.composer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesComposer = composerFilter === "All" || track.composer === composerFilter;
    return matchesSearch && matchesComposer;
  });

  return (
    <ToolLayout
      icon="🔮"
      title="Deckoviz Soundscapes"
      subtitle="Intelligent audio environment engine for creativity, focus, deep relaxation, and visual storytelling."
      gradient="from-slate-900 via-indigo-950 to-slate-950 text-white border-b border-indigo-950/40"
    >
      {/* ───────────────── GLASS OS CONTAINER ───────────────── */}
      <div className={`relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-br ${MOODSCAPES[currentMood]?.gradient || MOODSCAPES.Calm.gradient} border border-white/10 shadow-2xl transition-all duration-1000`}>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {!reducedMotion && [...Array(MOODSCAPES[currentMood]?.particlesCount || 20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: MOODSCAPES[currentMood]?.particlesColor || "rgba(139, 92, 246, 0.4)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatUp ${8 / (MOODSCAPES[currentMood]?.particleSpeed || 1)}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Global Keyframes styling for particles */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatUp {
            0% { transform: translateY(100%) scale(1); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
          }
        `}} />

        {/* --- TITLE & SYSTEM OVERVIEW --- */}
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-black text-indigo-400 bg-indigo-900/40 border border-indigo-500/20 px-2.5 py-1 rounded-md">
              Ambiance Engine v1.4
            </span>
            <h2 className="text-2xl font-black text-white mt-2 flex items-center gap-2">
              {MOODSCAPES[currentMood]?.name || "Custom Ambiance"}
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              {MOODSCAPES[currentMood]?.description}
            </p>
          </div>

          {/* Engine Init Alert */}
          {!engineInitialized ? (
            <button
              onClick={initializeEngine}
              className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 animate-bounce"
            >
              <Compass className="w-4 h-4" />
              Activate Audio Engine
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Engine Online
            </div>
          )}
        </div>

        {/* --- MOOD SELECTOR SECTION --- */}
        <div className="mb-8">
          <h3 className="text-xs font-black tracking-wider text-white/50 uppercase mb-3 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> 1. Select a Moodscape
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {Object.keys(MOODSCAPES).map(moodName => (
              <button
                key={moodName}
                onClick={() => applyMoodscape(moodName)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex-shrink-0 flex items-center gap-1.5 ${
                  currentMood === moodName 
                    ? "bg-white text-slate-900 shadow-md font-black" 
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: MOODSCAPES[moodName].particlesColor.replace(/[\d.]+\)$/, "1)") }} />
                {moodName}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN MODULES GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* LEFT COLUMN: AMBIENT MIXER + BINAURAL BEATS */}
          <div className="space-y-6">
            
            {/* 1. Ambient Sounds Mixer */}
            <div className="rounded-2xl bg-black/30 border border-white/5 p-5 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Ambient Mixing Layers
                </h4>
                <button
                  onClick={clearAllAmbient}
                  className="text-[10px] text-white/40 hover:text-white/80 transition-colors uppercase font-bold"
                >
                  Clear Mix
                </button>
              </div>

              {/* Category tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-white/5">
                {["All", "Nature", "City", "Cinematic", "Noise"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setAmbientCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      ambientCategoryFilter === cat 
                        ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/20" 
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Slider Layers */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {Object.entries(AMBIENT_CATEGORIES).map(([catName, sounds]) => {
                  // Category filter checks
                  if (ambientCategoryFilter !== "All") {
                    if (ambientCategoryFilter === "Nature" && catName !== "Nature") return null;
                    if (ambientCategoryFilter === "City" && catName !== "City") return null;
                    if (ambientCategoryFilter === "Noise" && catName !== "Wellness Noise") return null;
                    if (ambientCategoryFilter === "Cinematic" && catName !== "Fantasy / Cinematic") return null;
                  }

                  return (
                    <div key={catName} className="space-y-3">
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-1">{catName}</div>
                      
                      {sounds.map(sound => {
                        const curVol = ambientVolumes[sound] || 0;
                        return (
                          <div key={sound} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/5 transition-colors">
                            <span className="text-xs font-bold text-white/80 w-28 truncate">{sound}</span>
                            
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={curVol}
                              onChange={(e) => handleAmbientVolumeChange(sound, parseFloat(e.target.value))}
                              className="flex-1 accent-indigo-500 h-1 rounded-full cursor-pointer bg-white/10"
                            />
                            
                            <span className="text-[10px] text-white/40 font-mono w-8 text-right">
                              {Math.round(curVol * 100)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Binaural Beats Generator */}
            <div className="rounded-2xl bg-black/30 border border-white/5 p-5 backdrop-blur-xl relative overflow-hidden">
              {/* Headphone Prompt Info */}
              {headphonePrompt && (
                <div className="absolute top-2 right-2 bg-indigo-500/20 border border-indigo-500/40 rounded-xl p-2 max-w-[180px] z-10 text-[10px] text-indigo-300 flex items-start gap-1">
                  <Headphones className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Headphones Recommended</span>
                    <p className="opacity-75 mt-0.5">Binaural beats require stereo separation to work.</p>
                  </div>
                  <button onClick={() => setHeadphonePrompt(false)} className="hover:text-white ml-auto">×</button>
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-purple-400" />
                  Binaural Brainwave Generator
                </h4>

                {/* Enable toggle */}
                <button
                  onClick={() => {
                    if (!engineInitialized) initializeEngine();
                    setBinauralEnabled(!binauralEnabled);
                  }}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${
                    binauralEnabled 
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/30" 
                      : "bg-white/5 text-white/40 border border-white/10"
                  }`}
                >
                  {binauralEnabled ? "ON" : "OFF"}
                </button>
              </div>

              {/* Freq settings */}
              <div className="space-y-4">
                
                {/* Brainwave Presets */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: "Delta (Deep sleep)", val: 2.5 },
                    { label: "Theta (Relax)", val: 6.0 },
                    { label: "Alpha (Focus)", val: 10.0 },
                    { label: "Beta (Alert)", val: 18.0 }
                  ].map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setBinauralBeat(preset.val);
                        if (!binauralEnabled) setBinauralEnabled(true);
                      }}
                      className={`py-1.5 px-1 rounded-lg text-[9px] font-bold text-center border transition-all ${
                        Math.abs(binauralBeat - preset.val) < 0.5 && binauralEnabled
                          ? "bg-purple-900/40 text-purple-300 border-purple-500/30 font-black"
                          : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Carrier Slider */}
                <div>
                  <div className="flex justify-between text-[10px] text-white/60 mb-1">
                    <span>Carrier Frequency (Center)</span>
                    <span className="font-mono text-purple-400 font-bold">{binauralCarrier} Hz</span>
                  </div>
                  <input
                    type="range" min="100" max="600" step="5"
                    value={binauralCarrier}
                    onChange={(e) => setBinauralCarrier(parseInt(e.target.value))}
                    className="w-full accent-purple-500 h-1 rounded-full cursor-pointer bg-white/10"
                  />
                  <div className="flex justify-between text-[8px] text-white/30 mt-0.5">
                    <span>Deep Low (100Hz)</span>
                    <span>Comfortable pitch</span>
                    <span>High Harmonic (600Hz)</span>
                  </div>
                </div>

                {/* Beat Slider */}
                <div>
                  <div className="flex justify-between text-[10px] text-white/60 mb-1">
                    <span>Beat Frequency (Pulse)</span>
                    <span className="font-mono text-purple-400 font-bold">+{binauralBeat} Hz</span>
                  </div>
                  <input
                    type="range" min="1" max="30" step="0.5"
                    value={binauralBeat}
                    onChange={(e) => setBinauralBeat(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 h-1 rounded-full cursor-pointer bg-white/10"
                  />
                  <div className="flex justify-between text-[8px] text-white/30 mt-0.5">
                    <span>Delta (1Hz)</span>
                    <span>Alpha (10Hz)</span>
                    <span>Beta (30Hz)</span>
                  </div>
                </div>

                {/* Waveform Selector & Volume */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-[10px] text-white/60 mb-1">Waveform</label>
                    <select
                      value={binauralWaveform}
                      onChange={(e) => setBinauralWaveform(e.target.value as OscillatorType)}
                      className="w-full bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 rounded-xl px-2.5 py-1.5 focus:outline-none"
                    >
                      <option value="sine" className="bg-slate-900 text-white">Sine (Smooth)</option>
                      <option value="triangle" className="bg-slate-900 text-white">Triangle (Soft)</option>
                      <option value="sawtooth" className="bg-slate-900 text-white">Sawtooth (Buzz)</option>
                      <option value="square" className="bg-slate-900 text-white">Square (Beep)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/60 mb-1">Binaural Volume</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range" min="0" max="0.5" step="0.05"
                        value={binauralVolume}
                        onChange={(e) => setBinauralVolume(parseFloat(e.target.value))}
                        className="flex-1 accent-purple-500 h-1 rounded-full cursor-pointer bg-white/10"
                      />
                      <span className="text-[10px] text-white/50 font-mono w-6 text-right">
                        {Math.round(binauralVolume * 200)}%
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CLASSICAL MUSIC LIBRARY + REAL-TIME VISUALIZER */}
          <div className="space-y-6">
            
            {/* 3. Classical Music Library */}
            <div className="rounded-2xl bg-black/30 border border-white/5 p-5 backdrop-blur-xl">
              
              {/* Library Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-emerald-400" />
                  Classical Masterworks
                </h4>
                
                {/* Search query */}
                <input
                  type="text"
                  placeholder="Search composer / track..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 text-[10px] border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-white/30 w-full sm:w-44"
                />
              </div>

              {/* Composer Filter Pills */}
              <div className="flex gap-1 overflow-x-auto pb-3 mb-3 border-b border-white/5">
                {composers.map(comp => (
                  <button
                    key={comp}
                    onClick={() => setComposerFilter(comp)}
                    className={`px-3 py-1 rounded-lg text-[9px] font-bold ${
                      composerFilter === comp
                        ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/20"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>

              {/* Accordion List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {/* Composers Accordion */}
                {["Chopin", "Debussy", "Beethoven", "Mozart", "Bach", "Tchaikovsky"].map(composerName => {
                  const composerTracks = filteredClassicalTracks.filter(t => t.composer === composerName);
                  if (composerTracks.length === 0) return null;

                  const isOpen = accordionOpen[composerName] || false;

                  return (
                    <div key={composerName} className="border border-white/5 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setAccordionOpen(prev => ({ ...prev, [composerName]: !isOpen }))}
                        className="w-full flex justify-between items-center bg-white/5 px-3 py-2 text-xs font-bold text-white hover:bg-white/10 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          {composerName} ({composerTracks.length})
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isOpen && (
                        <div className="bg-black/20 p-2 space-y-1.5">
                          {composerTracks.map(track => {
                            const isCurrent = currentTrack?.id === track.id;
                            return (
                              <div
                                key={track.id}
                                onClick={() => playClassicalTrack(track)}
                                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                                  isCurrent 
                                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                                    : "bg-white/5 hover:bg-white/10 text-white/70"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  <span className="text-base">{track.thumbnail}</span>
                                  <div className="truncate">
                                    <p className="text-[11px] font-bold truncate">{track.title}</p>
                                    <p className="text-[9px] opacity-60 font-medium">{track.category}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {isCurrent && isPlayingClassical ? (
                                    <span className="flex gap-0.5 items-end h-3">
                                      <span className="w-0.5 h-2 bg-emerald-400 animate-pulse" />
                                      <span className="w-0.5 h-3 bg-emerald-400 animate-pulse" style={{ animationDelay: "150ms" }} />
                                      <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse" style={{ animationDelay: "300ms" }} />
                                    </span>
                                  ) : null}
                                  <span className="text-[9px] font-mono opacity-50">{track.duration}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Music Vol Slider */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3 mt-4">
                <Music className="w-4 h-4 text-emerald-400" />
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={classicalVolume}
                  onChange={(e) => setClassicalVolume(parseFloat(e.target.value))}
                  className="flex-1 accent-emerald-500 h-1 rounded-full cursor-pointer bg-white/10"
                />
                <span className="text-[10px] text-white/50 font-mono w-8 text-right">
                  {Math.round(classicalVolume * 100)}%
                </span>
              </div>
            </div>

            {/* 4. Canvas Real-time Visualizer */}
            <div className="rounded-2xl bg-black/30 border border-white/5 p-5 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  Aesthetic Visualizer
                </h4>

                {/* Visualizer Type selectors */}
                <div className="flex gap-1">
                  {[
                    { label: "Oscilloscope", val: "waveform" },
                    { label: "Pulse", val: "circular" },
                    { label: "Bars", val: "spectrum" },
                    { label: "Aura", val: "glow" }
                  ].map(viz => (
                    <button
                      key={viz.val}
                      onClick={() => setActiveVisualizer(viz.val)}
                      className={`px-2 py-1 rounded-md text-[9px] font-bold ${
                        activeVisualizer === viz.val
                          ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/20"
                          : "bg-white/5 text-white/50"
                      }`}
                    >
                      {viz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas viewport */}
              <div className="relative h-[160px] bg-slate-950/80 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width="400"
                  height="160"
                  className="w-full h-full block"
                />

                {!engineInitialized && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 text-center p-4">
                    <p className="text-xs text-white/40">Visualizer Offline</p>
                    <p className="text-[10px] text-white/30 mt-1">Activate the Audio Engine above to enable visual rendering</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* --- DECKOVIZ FRAMES & STORYTELLING INTEGRATION --- */}
        <div className="rounded-2xl bg-black/30 border border-white/5 p-5 backdrop-blur-xl mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <Tv className="w-4 h-4 text-cyan-400" />
              Deckoviz Frame Integration
            </h4>
            
            {attachedFrame && (
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-lg text-cyan-400">
                Linked Frame: {attachedFrame}
              </span>
            )}
          </div>

          <p className="text-xs text-white/60 mb-4">
            Cast the active soundscape configuration directly to your physical or digital Deckoviz display frame. The visualizer and gradient ambient themes will reactive sync in real time.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "Living-Room-Canvas", title: "Living Room Frame", thumb: "🖼️" },
              { id: "Work-Desk-Display", title: "Workspace Panel", thumb: "💻" },
              { id: "Creative-Studio-Wall", title: "Gallery Screen", thumb: "🎨" },
              { id: "Therapy-Ambient-Deck", title: "Wellness Frame", thumb: "🌿" }
            ].map(frame => (
              <div 
                key={frame.id}
                onClick={() => handleAttachToFrame(frame.id)}
                className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                  attachedFrame === frame.id 
                    ? "bg-cyan-500/10 border-cyan-400/80 scale-[1.02] shadow-md shadow-cyan-500/10" 
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-xl mb-1">{frame.thumb}</div>
                <div className="text-[10px] font-bold text-white truncate">{frame.title}</div>
                <div className="text-[8px] text-white/40 truncate mt-0.5">Attach Soundscape</div>
              </div>
            ))}
          </div>

          {frameNotification && (
            <div className="mt-3 p-3 bg-cyan-900/40 border border-cyan-500/30 rounded-xl text-cyan-300 text-xs flex items-center gap-2 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{frameNotification}</span>
            </div>
          )}
        </div>

        {/* --- DOCK PANEL: MASTER CONTROL & PRESETS SAVE --- */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/80 border border-white/15 p-4 rounded-2xl backdrop-blur-2xl">
          
          {/* Master Volume Controller */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setMasterMuted(!masterMuted)}
              className="p-2 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
            >
              {masterMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            <input
              type="range" min="0" max="1" step="0.05"
              value={masterVolume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              disabled={masterMuted}
              className="w-32 md:w-44 accent-indigo-500 h-1 rounded-full cursor-pointer bg-white/10"
            />
            
            <span className="text-[10px] text-white/50 font-mono w-10">
              {masterMuted ? "MUTED" : `${Math.round(masterVolume * 100)}%`}
            </span>
          </div>

          {/* Preset Saving controls */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Save custom preset..."
              value={customPresetName}
              onChange={(e) => setCustomPresetName(e.target.value)}
              className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500 flex-1 md:w-48"
            />
            <button
              onClick={handleSavePreset}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 hover:scale-105"
              title="Save Preset"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>

          {/* Saved Presets Dropdown */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="w-full md:w-auto px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-between md:justify-start gap-2"
            >
              <span>Saved Sessions ({savedPresets.length})</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showPresetsMenu && (
              <div className="absolute right-0 bottom-12 w-64 bg-slate-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-2 z-30">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2.5 py-1.5 border-b border-white/5">
                  Select Custom Presets
                </div>
                {savedPresets.length === 0 ? (
                  <div className="text-center py-4 text-[10px] text-white/30">
                    No custom presets saved.
                  </div>
                ) : (
                  <div className="max-h-[200px] overflow-y-auto space-y-1 py-1">
                    {savedPresets.map(preset => (
                      <div
                        key={preset.id}
                        onClick={() => {
                          handleApplyPreset(preset);
                          setShowPresetsMenu(false);
                        }}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer text-left transition-colors"
                      >
                        <div className="truncate">
                          <p className="text-[11px] font-bold text-white truncate">{preset.name}</p>
                          <p className="text-[8px] text-white/40 truncate">{preset.mood || "Calm"} Moodscape</p>
                        </div>
                        <button
                          onClick={(e) => handleDeletePreset(preset.id, e)}
                          className="p-1 hover:bg-rose-500/20 text-white/40 hover:text-rose-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* --- EXTRA INFORMATION ON HEALTH AND SAFETY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-950/90 border border-indigo-950/30 rounded-2xl p-5 text-center shadow-xl backdrop-blur-md">
          <div className="text-2xl mb-2">🎧</div>
          <h4 className="font-bold text-slate-100 text-sm mb-1">Low Latency Engine</h4>
          <p className="text-xs text-slate-400">Procedural audio generators render local waveforms directly on-device using Web Audio nodes for zero network delay.</p>
        </div>
        <div className="bg-slate-950/90 border border-indigo-950/30 rounded-2xl p-5 text-center shadow-xl backdrop-blur-md">
          <div className="text-2xl mb-2">🧠</div>
          <h4 className="font-bold text-slate-100 text-sm mb-1">Binaural Theory</h4>
          <p className="text-xs text-slate-400">Slightly shifted sine frequencies played separately in left/right channels trigger cognitive frequencies in the brain.</p>
        </div>
        <div className="bg-slate-950/90 border border-indigo-950/30 rounded-2xl p-5 text-center shadow-xl backdrop-blur-md">
          <div className="text-2xl mb-2">🌿</div>
          <h4 className="font-bold text-slate-100 text-sm mb-1">Volume Normalization</h4>
          <p className="text-xs text-slate-400">Master gains automatically normalize layered channels to preserve auditory comfort and target healthy decibel bands.</p>
        </div>
      </div>

    </ToolLayout>
  );
};

export default SoundscapesTool;
