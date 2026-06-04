import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  ArrowRight,
  Compass,
  Wand2,
  Gamepad2,
  BookOpen,
  Terminal,
  Grid,
  Zap,
  Bookmark,
  Volume2,
  HelpCircle,
  Eye,
  Filter,
  ArrowUp,
  Map,
  Smile,
  Heart,
  Music,
  User,
  Activity
} from "lucide-react";

interface FeatureItem {
  name: string;
  description: string;
  path: string;
  category: "Creative Tools" | "Art Modes & Simulations" | "Storytelling Spaces" | "Interactive Games" | "Core Platform";
  highlight?: boolean;
}

const CATEGORY_ICONS = {
  "Creative Tools": Wand2,
  "Art Modes & Simulations": Zap,
  "Storytelling Spaces": BookOpen,
  "Interactive Games": Gamepad2,
  "Core Platform": Compass,
};

const CATEGORY_COLORS = {
  "Creative Tools": "from-purple-500 to-pink-500 text-pink-300 border-pink-500/30 glow-pink",
  "Art Modes & Simulations": "from-cyan-500 to-blue-500 text-cyan-300 border-cyan-500/30 glow-cyan",
  "Storytelling Spaces": "from-amber-500 to-orange-500 text-amber-300 border-amber-500/30 glow-amber",
  "Interactive Games": "from-red-500 to-rose-500 text-rose-300 border-rose-500/30 glow-rose",
  "Core Platform": "from-emerald-500 to-teal-500 text-emerald-300 border-emerald-500/30 glow-emerald",
};

const FEATURES_DATA: FeatureItem[] = [
  {
    name: "AI Dream Worlds",
    description: "Neural visual simulations of abstract dreamscapes, morphing in real time.",
    path: "/developer-specs/ai-dream-worlds",
    category: "Art Modes & Simulations"
  },
  {
    name: "Ambient Clock",
    description: "A generative, artistic clock that paints time through evolving colors and shapes.",
    path: "/developer-specs/ambient-clock",
    category: "Art Modes & Simulations"
  },
  {
    name: "Ambient Ritual",
    description: "Calibrates visual and sound frequencies to guide morning and evening transitions.",
    path: "/developer-specs/ambient-ritual",
    category: "Art Modes & Simulations"
  },
  {
    name: "Ancestor Table",
    description: "A generative genealogical space mapping lineage, memories, and inheritance.",
    path: "/deckoviz-storytelling/ancestor-table",
    category: "Storytelling Spaces"
  },
  {
    name: "Ancient Trade Routes",
    description: "Visual cartography simulating historical merchant paths and global exchange flows.",
    path: "/developer-specs/trade-atlas",
    category: "Art Modes & Simulations"
  },
  {
    name: "Agentic Shape Vortex",
    description: "An interactive vortex where intelligent agent particles react to music and movement.",
    path: "/developer-specs/agentic-shape-vortex",
    category: "Art Modes & Simulations"
  },
  {
    name: "Argument Sculptor",
    description: "Visualizes intellectual debates and logical constructs as 3D geometric shapes.",
    path: "/developer-specs/argument-sculptor",
    category: "Art Modes & Simulations"
  },
  {
    name: "Audio Waves",
    description: "Converts your microphone or audio input into beautiful, responsive kinetic ripples.",
    path: "/developer-specs/audio-waves",
    category: "Art Modes & Simulations"
  },
  {
    name: "Audiobook Creator",
    description: "Turn scripts, stories, or documents into rich, atmospheric audiobooks with voice.",
    path: "/tools/audiobook",
    category: "Creative Tools",
    highlight: true
  },
  {
    name: "Avoided Conversation",
    description: "An interactive canvas guiding you through words left unspoken to find closure.",
    path: "/deckoviz-storytelling/avoided-conversation",
    category: "Storytelling Spaces"
  },
  {
    name: "Bioluminescent Abyss",
    description: "Generative deep-ocean lifeforms glowing and reacting in dark volumetric waters.",
    path: "/developer-specs/bioluminescent-abyss",
    category: "Art Modes & Simulations"
  },
  {
    name: "Book to Frames",
    description: "Ingests books or documents and projects key conceptual frames onto your space.",
    path: "/features",
    category: "Creative Tools"
  },
  {
    name: "Brilliant Minds",
    description: "Cooperative puzzle strategy game featuring historical geniuses and custom challenges.",
    path: "/flagship-games/brilliant-minds",
    category: "Interactive Games"
  },
  {
    name: "Cartographers",
    description: "Draw maps, explore fantasy realms, and build worlds dynamically with friends.",
    path: "/flagship-games/cartographers",
    category: "Interactive Games"
  },
  {
    name: "Cartography of Longing",
    description: "A personal geography mapping emotional distances and core memories.",
    path: "/deckoviz-storytelling/cartography-of-longing",
    category: "Storytelling Spaces"
  },
  {
    name: "Celestial Cosmos",
    description: "A real-time simulation of galaxies, nebulae, and stellar orbital mechanics.",
    path: "/developer-specs/celestial-cosmos",
    category: "Art Modes & Simulations"
  },
  {
    name: "Character Witness",
    description: "Prompt-driven roleplay canvas examining perspective, identity, and truth.",
    path: "/deckoviz-storytelling/character-witness",
    category: "Storytelling Spaces"
  },
  {
    name: "City Pulse",
    description: "Transforms real-time global city feeds into abstract, rhythmic generative tapestries.",
    path: "/developer-specs/city-pulse",
    category: "Art Modes & Simulations"
  },
  {
    name: "Comic Creator",
    description: "Craft multi-panel graphic novels and comic strips using AI art and custom layouts.",
    path: "/tools/comic",
    category: "Creative Tools"
  },
  {
    name: "Constellation Builder",
    description: "Draw lines across stars to map your own stories and meanings on the night sky.",
    path: "/developer-specs/constellation-builder",
    category: "Art Modes & Simulations"
  },
  {
    name: "Conversational Studio (VCS)",
    description: "Engage with Vizzy's intelligent master mode to co-create across all mediums.",
    path: "/conversational-studio",
    category: "Creative Tools",
    highlight: true
  },
  {
    name: "Correspondence Room",
    description: "A digital archive of letters, messages, and memories crossing space and time.",
    path: "/deckoviz-storytelling/correspondence-room",
    category: "Storytelling Spaces"
  },
  {
    name: "Cosmic Background",
    description: "Generates atmospheric ambient art inspired by cosmic microwave radiation.",
    path: "/developer-specs/cosmic-background",
    category: "Art Modes & Simulations"
  },
  {
    name: "Courage Inventory",
    description: "Reflective journaling exercise mapping fears, boundaries, and brave moments.",
    path: "/deckoviz-storytelling/courage-inventory",
    category: "Storytelling Spaces"
  },
  {
    name: "Create World",
    description: "Describe a world, preview concept art, and step into a real 3D Gaussian Splat.",
    path: "/create-world",
    category: "Core Platform"
  },
  {
    name: "Creative Journal",
    description: "Reflective daily writing transformed into live illustrations, color palettes, and music.",
    path: "/creative-journal",
    category: "Creative Tools",
    highlight: true
  },
  {
    name: "Creative Studio",
    description: "Your central creative dashboard launching all visual, textual, and audio tools.",
    path: "/creative-studio",
    category: "Core Platform"
  },
  {
    name: "Daily Curator",
    description: "Curates daily visual sets, poetry, and ambient soundscapes matching your mood.",
    path: "/daily-curator",
    category: "Core Platform"
  },
  {
    name: "Daily Inspiration",
    description: "Provides bespoke prompts, sensory quotes, and quick-start ideas every morning.",
    path: "/tools/daily",
    category: "Creative Tools"
  },
  {
    name: "Data As Art",
    description: "Transforms complex data feeds, system metrics, and logs into gorgeous abstract visuals.",
    path: "/developer-specs/data-as-art",
    category: "Art Modes & Simulations"
  },
  {
    name: "Deathbed Editor",
    description: "A philosophical, high-stakes writing tool for expressing ultimate truths.",
    path: "/deckoviz-storytelling/deathbed-editor",
    category: "Storytelling Spaces"
  },
  {
    name: "Debating Society",
    description: "Multiplayer argument builder pitting ideas against each other in friendly verbal arenas.",
    path: "/flagship-games/debating-society",
    category: "Interactive Games"
  },
  {
    name: "Decay Bloom",
    description: "Simulates botanical life cycles, showing growth, decay, and regeneration.",
    path: "/developer-specs/decay-bloom",
    category: "Art Modes & Simulations"
  },
  {
    name: "Deep Focus Field",
    description: "A serene distraction-free zone for writing and contemplation with ambient audio.",
    path: "/deckoviz-storytelling/deep-focus-field",
    category: "Storytelling Spaces"
  },
  {
    name: "Dream Architect",
    description: "Build abstract, impossible spaces and explore them in real time with others.",
    path: "/flagship-games/dream-architect",
    category: "Interactive Games"
  },
  {
    name: "Dream Architecture",
    description: "Visualizes impossible buildings, optical illusions, and architectural dreams.",
    path: "/developer-specs/dream-architecture",
    category: "Art Modes & Simulations"
  },
  {
    name: "Dream Logic",
    description: "Generates shifting scenes governed by subconscious association and logic.",
    path: "/developer-specs/dream-logic",
    category: "Art Modes & Simulations"
  },
  {
    name: "Dream Taxonomy",
    description: "A visual cataloging tool classifying recurring dreams, symbols, and motifs.",
    path: "/developer-specs/dream-taxonomy",
    category: "Art Modes & Simulations"
  },
  {
    name: "Emotion Alchemy",
    description: "Select and combine core feelings to generate a representative color, tone, and art.",
    path: "/developer-specs/emotion-alchemy",
    category: "Art Modes & Simulations"
  },
  {
    name: "Emotional Weather Report",
    description: "Translates your current internal mood state into ambient weather visuals.",
    path: "/deckoviz-storytelling/emotional-weather-report",
    category: "Storytelling Spaces"
  },
  {
    name: "Exoplanet Weather",
    description: "Generates atmospheric weather simulations of distant, alien worlds.",
    path: "/developer-specs/exoplanet-weather",
    category: "Art Modes & Simulations"
  },
  {
    name: "Experimental Art Modes",
    description: "Launchpad for cutting-edge, speculative interactive graphics and simulations.",
    path: "/experimental-art-modes",
    category: "Art Modes & Simulations"
  },
  {
    name: "Extinct Color",
    description: "A visual gallery and generator utilizing colors and pigments lost to time.",
    path: "/developer-specs/extinct-color",
    category: "Art Modes & Simulations"
  },
  {
    name: "Fear Cartographer",
    description: "Visualize and trace fears, identifying triggers and pathways to courage.",
    path: "/deckoviz-storytelling/fear-cartographer",
    category: "Storytelling Spaces"
  },
  {
    name: "Fermenting World",
    description: "An organic growth simulation depicting microscopic bacterial and yeast cultures.",
    path: "/developer-specs/fermenting-world",
    category: "Art Modes & Simulations"
  },
  {
    name: "Field Painter",
    description: "Paint flow fields and vector grids that dynamically control particle physics.",
    path: "/developer-specs/field-painter",
    category: "Art Modes & Simulations"
  },
  {
    name: "Fluid Dreams",
    description: "Highly responsive fluid dynamics paint simulation reacting to touch and mouse.",
    path: "/developer-specs/fluid-dreams",
    category: "Art Modes & Simulations"
  },
  {
    name: "Forgiveness Lab",
    description: "Guided writing prompts designed for sorting out resentment and releasing grudges.",
    path: "/deckoviz-storytelling/forgiveness-lab",
    category: "Storytelling Spaces"
  },
  {
    name: "Fractal Worlds",
    description: "Explore infinite Mandelbrot, Julia, and custom mathematical fractal structures.",
    path: "/developer-specs/fractal-worlds",
    category: "Art Modes & Simulations"
  },
  {
    name: "Gratitude Archaeologist",
    description: "Dig deep into your history to uncover forgotten moments of gratitude.",
    path: "/deckoviz-storytelling/gratitude-archaeologist",
    category: "Storytelling Spaces"
  },
  {
    name: "Gratitude Cards",
    description: "Generate personalized, beautifully framed postcards showing appreciation.",
    path: "/tools/gratitude-card",
    category: "Creative Tools"
  },
  {
    name: "Greeting Card Tool",
    description: "Design animated, customizable holiday and milestone greeting cards with AI.",
    path: "/tools/greeting-card",
    category: "Creative Tools"
  },
  {
    name: "Grief Cartographer",
    description: "Interactive visual map mapping paths through loss, memory, and healing.",
    path: "/developer-specs/grief-cartographer",
    category: "Art Modes & Simulations"
  },
  {
    name: "Haptic Memory",
    description: "Abstract textures and touch-responsive waves simulating remembered tactile sensations.",
    path: "/developer-specs/haptic-memory",
    category: "Art Modes & Simulations"
  },
  {
    name: "Honest Eulogy",
    description: "Draft genuine, raw reflections of life, emphasizing true connection over platitudes.",
    path: "/deckoviz-storytelling/honest-eulogy",
    category: "Storytelling Spaces"
  },
  {
    name: "Human Connectivity",
    description: "Interactive node-graph mapping social ties, conversations, and human webs.",
    path: "/developer-specs/human-connectivity",
    category: "Art Modes & Simulations"
  },
  {
    name: "Infinite Wormhole",
    description: "A mesmerizing hyperspace tunnel simulation with custom speed, colors, and audio.",
    path: "/developer-specs/infinite-wormhole",
    category: "Art Modes & Simulations"
  },
  {
    name: "Inheritance",
    description: "A strategic roleplay game exploring legacy, decisions, and generational paths.",
    path: "/flagship-games/inheritance",
    category: "Interactive Games"
  },
  {
    name: "Inner Council",
    description: "Consult different facets of your subconscious to make complex life decisions.",
    path: "/deckoviz-storytelling/inner-council",
    category: "Storytelling Spaces"
  },
  {
    name: "Internet Heartbeat",
    description: "Transforms real-time web traffic and connectivity spikes into a glowing pulse.",
    path: "/developer-specs/internet-heartbeat",
    category: "Art Modes & Simulations"
  },
  {
    name: "Language Memorial",
    description: "A kinetic typography installation celebrating endangered and historical languages.",
    path: "/developer-specs/language-memorial",
    category: "Art Modes & Simulations"
  },
  {
    name: "Last Good Day",
    description: "Record and preserve the details of beautiful, perfect days in full sensory memory.",
    path: "/deckoviz-storytelling/last-good-day",
    category: "Storytelling Spaces"
  },
  {
    name: "Last Light",
    description: "Sunset color field simulation generating calming gradients for relaxation.",
    path: "/developer-specs/last-light",
    category: "Art Modes & Simulations"
  },
  {
    name: "Last Words",
    description: "Create an immutable visual scroll of final thoughts, advice, and signatures.",
    path: "/deckoviz-storytelling/last-words",
    category: "Storytelling Spaces"
  },
  {
    name: "Learning Book",
    description: "Turn difficult academic or technical topics into structured, illustrated study guides.",
    path: "/tools/learning-book",
    category: "Creative Tools"
  },
  {
    name: "Learning Portal",
    description: "Interactive hub converting prompt requests into interactive lessons and visuals.",
    path: "/tools/learning-portal",
    category: "Creative Tools"
  },
  {
    name: "Letters to Unknown Self",
    description: "Write letters to your future, past, or alternative selves with timed delivery.",
    path: "/deckoviz-storytelling/letters-to-unknown-self",
    category: "Storytelling Spaces"
  },
  {
    name: "Life Book Creator",
    description: "Chronicle your biography, family trees, and memories in a unified digital ledger.",
    path: "/tools/life-book",
    category: "Creative Tools"
  },
  {
    name: "Living Manifesto",
    description: "Create a fluid, visual declaration of core values that grows and changes with you.",
    path: "/deckoviz-storytelling/living-manifesto",
    category: "Storytelling Spaces"
  },
  {
    name: "Living Maps",
    description: "Interactive geographical maps overlaying art, vibes, and localized memories.",
    path: "/developer-specs/living-maps",
    category: "Art Modes & Simulations"
  },
  {
    name: "Living Paintings",
    description: "Breathes subtle movement and cinematic animation into classic masterworks.",
    path: "/developer-specs/living-paintings",
    category: "Art Modes & Simulations"
  },
  {
    name: "Loving Adversary",
    description: "An AI dialogue partner that gently challenges your assumptions to help you grow.",
    path: "/deckoviz-storytelling/loving-adversary",
    category: "Storytelling Spaces"
  },
  {
    name: "Material Simulations",
    description: "Simulate glass, metal, fabric, and water physics in beautiful responsive windows.",
    path: "/developer-specs/material-simulations",
    category: "Art Modes & Simulations"
  },
  {
    name: "Memory Landscapes",
    description: "Transforms text journals and nostalgic memories into abstract topographic art.",
    path: "/developer-specs/memory-landscapes",
    category: "Art Modes & Simulations"
  },
  {
    name: "Memory Palace Builder",
    description: "Construct a virtual 3D room to link spatial navigation with memory recall.",
    path: "/deckoviz-storytelling/memory-palace-builder",
    category: "Storytelling Spaces"
  },
  {
    name: "Microscope World",
    description: "Generative cell structures, cellular division, and micro-life simulations.",
    path: "/developer-specs/microscope-world",
    category: "Art Modes & Simulations"
  },
  {
    name: "Mirror Painter",
    description: "Draw mirrored, symmetrical particle trails with complex, kaleidoscopic brush patterns.",
    path: "/developer-specs/mirror-painter",
    category: "Art Modes & Simulations"
  },
  {
    name: "Morning Architecture",
    description: "A calming ambient planner designed to structure your day's mental framework.",
    path: "/deckoviz-storytelling/morning-architecture",
    category: "Storytelling Spaces"
  },
  {
    name: "Motion Art",
    description: "Speculative kinetic visual generator displaying geometric choreographies.",
    path: "/developer-specs/motion-art",
    category: "Art Modes & Simulations"
  },
  {
    name: "Murmuration Engine",
    description: "Boids flocking simulation replicating the mesmerizing flight of bird swarms.",
    path: "/developer-specs/murmuration-engine",
    category: "Art Modes & Simulations"
  },
  {
    name: "Museum of Us",
    description: "Cooperative memory exhibition game displaying items and stories of your group.",
    path: "/flagship-games/museum-of-us",
    category: "Interactive Games"
  },
  {
    name: "Music Creator",
    description: "Compose customized theme music, loops, and instrumental tracks with AI prompts.",
    path: "/tools/music",
    category: "Creative Tools"
  },
  {
    name: "Music Responsive Art",
    description: "Vibrant geometric visualizer that reacts instantly to sound and mic input.",
    path: "/developer-specs/music-responsive-art",
    category: "Art Modes & Simulations"
  },
  {
    name: "Mythology Engine",
    description: "Generates personal folklore, archetypes, and origin stories from user prompts.",
    path: "/deckoviz-storytelling/mythology-engine",
    category: "Storytelling Spaces"
  },
  {
    name: "Nature Systems",
    description: "Simulates trees growing, wind blowing, and weather weathering natural landscapes.",
    path: "/developer-specs/nature-systems",
    category: "Art Modes & Simulations"
  },
  {
    name: "Neural Firestorm",
    description: "A high-intensity simulation depicting electrical impulses traveling down axons.",
    path: "/developer-specs/neural-firestorm",
    category: "Art Modes & Simulations"
  },
  {
    name: "Nightly Ritual",
    description: "A winding-down space designed to release daily stress and prepare for rest.",
    path: "/deckoviz-storytelling/nightly-ritual",
    category: "Storytelling Spaces"
  },
  {
    name: "One Word",
    description: "A minimalist word-association game generating cooperative stories and poetry.",
    path: "/flagship-games/one-word",
    category: "Interactive Games"
  },
  {
    name: "Oracle",
    description: "Ask deep questions and receive poetic, symbolic readings with custom cards.",
    path: "/flagship-games/oracle",
    category: "Interactive Games"
  },
  {
    name: "Oral History Fire",
    description: "Gather around a simulated virtual hearth to transcribe and share spoken folklore.",
    path: "/developer-specs/oral-history-fire",
    category: "Art Modes & Simulations"
  },
  {
    name: "Organism Sim",
    description: "Simulates autonomous artificial lifeforms feeding, reproducing, and evolving.",
    path: "/developer-specs/organism-sim",
    category: "Art Modes & Simulations"
  },
  {
    name: "Palette Wars",
    description: "Competitive canvas-painting strategy game using color grids and territory capture.",
    path: "/flagship-games/palette-wars",
    category: "Interactive Games"
  },
  {
    name: "Parallel Lives",
    description: "Explore hypothetical paths and see where alternative life decisions might lead.",
    path: "/deckoviz-storytelling/parallel-lives",
    category: "Storytelling Spaces"
  },
  {
    name: "Particle Galaxy",
    description: "High-performance particle system simulating cosmic gravity and star clusters.",
    path: "/developer-specs/particle-galaxy",
    category: "Art Modes & Simulations"
  },
  {
    name: "Permission Slip",
    description: "Guided workshop to write slips authorizing yourself to rest, fail, or start fresh.",
    path: "/deckoviz-storytelling/permission-slip",
    category: "Storytelling Spaces"
  },
  {
    name: "Physics Sandbox",
    description: "Gravity, drag, collision, and bouncing-ball simulator with customizable forces.",
    path: "/developer-specs/physics-sandbox",
    category: "Art Modes & Simulations"
  },
  {
    name: "Postcard Tool",
    description: "Quick before-and-after image postcard designer for sharing special moments.",
    path: "/tools/postcard",
    category: "Creative Tools"
  },
  {
    name: "Protein Fold",
    description: "Interactive visualizer displaying complex folding structures and bio-shapes.",
    path: "/developer-specs/protein-fold",
    category: "Art Modes & Simulations"
  },
  {
    name: "Quantum Foam",
    description: "Simulates subatomic particle-antiparticle annihilation at the Planck scale.",
    path: "/developer-specs/quantum-foam",
    category: "Art Modes & Simulations"
  },
  {
    name: "Quote Poster",
    description: "Design gorgeous typographic posters using custom quotes, colors, and layout.",
    path: "/tools/quote-poster",
    category: "Creative Tools"
  },
  {
    name: "Relationship Seasons",
    description: "Chart and reflect on the seasonal ebbs and flows of key relationships.",
    path: "/deckoviz-storytelling/relationship-seasons",
    category: "Storytelling Spaces"
  },
  {
    name: "Scenario Room",
    description: "A hypothetical scenario simulator for debating choices and exploring paths.",
    path: "/deckoviz-storytelling/scenario-room",
    category: "Storytelling Spaces"
  },
  {
    name: "Seismic Memory",
    description: "Converts geological activity feeds and tremors into pulsing sound and ripples.",
    path: "/developer-specs/seismic-memory",
    category: "Art Modes & Simulations"
  },
  {
    name: "Shadow Puppetry",
    description: "Generates interactive hand-shadow art overlaying lights, walls, and screens.",
    path: "/developer-specs/shadow-puppetry",
    category: "Art Modes & Simulations"
  },
  {
    name: "Short Story Creator",
    description: "Collaborative text editor that writes, formats, and illustrates short fiction.",
    path: "/tools/short-story",
    category: "Creative Tools"
  },
  {
    name: "Silence Architecture",
    description: "A calming minimal layout designed to block sound waves and induce focus.",
    path: "/developer-specs/silence-architecture",
    category: "Art Modes & Simulations"
  },
  {
    name: "Signal Interception",
    description: "A sci-fi radar visualizer decoding abstract noise into words and images.",
    path: "/developer-specs/signal-interception",
    category: "Art Modes & Simulations"
  },
  {
    name: "Slime Mould",
    description: "A simulation of Physarum polycephalum finding shortest paths to food nodes.",
    path: "/developer-specs/slime-mould",
    category: "Art Modes & Simulations"
  },
  {
    name: "Slow News",
    description: "A news feed focusing only on multi-decade scales, history, and deep time trends.",
    path: "/deckoviz-storytelling/slow-news",
    category: "Storytelling Spaces"
  },
  {
    name: "Sky Chronometer",
    description: "Visualizes sun angles, moon phases, and zodiac rotations in a radial widget.",
    path: "/developer-specs/sky-chronometer",
    category: "Art Modes & Simulations"
  },
  {
    name: "Solar Wind Painter",
    description: "Dynamic aurora borealis strokes painted by solar data streams.",
    path: "/developer-specs/solar-wind-painter",
    category: "Art Modes & Simulations"
  },
  {
    name: "Song Creator",
    description: "Turn lyrics and genres into fully realized audio compositions with AI vocals.",
    path: "/tools/song",
    category: "Creative Tools"
  },
  {
    name: "Sound Archaeology",
    description: "Spectrogram visualizer isolating ambient field recordings and historical echo.",
    path: "/developer-specs/sound-archaeology",
    category: "Art Modes & Simulations"
  },
  {
    name: "Soundscapes",
    description: "Curated ambient atmospheres (rain, cafe, spacecraft) with adjustable sliders.",
    path: "/soundscapes",
    category: "Creative Tools"
  },
  {
    name: "Story Forge",
    description: "Interactive collaborative card game generating unpredictable narrative trees.",
    path: "/flagship-games/story-forge",
    category: "Interactive Games",
    highlight: true
  },
  {
    name: "Story Seed",
    description: "Plant short written prompts and watch them branch into complex lore structures.",
    path: "/deckoviz-storytelling/story-seed",
    category: "Storytelling Spaces"
  },
  {
    name: "Storybook Creator",
    description: "Write and illustrate children's stories with friendly cartoon illustrations.",
    path: "/tools/storybook",
    category: "Creative Tools"
  },
  {
    name: "Storybook Studio",
    description: "Advanced workspace for multi-chapter children's books and sequence layout.",
    path: "/tools/storybook-studio",
    category: "Creative Tools"
  },
  {
    name: "Symmetry Crystals",
    description: "Generates infinite crystalline shapes through symmetrical geometry growth.",
    path: "/developer-specs/symmetry-crystals",
    category: "Art Modes & Simulations"
  },
  {
    name: "Symmetry Machine",
    description: "Draw canvas lines that mirror in radial, linear, or grid formats.",
    path: "/developer-specs/symmetry-machine",
    category: "Art Modes & Simulations"
  },
  {
    name: "Synesthesia Engine",
    description: "Fuses sight and sound, generating colors for notes and sound for paint stroke.",
    path: "/developer-specs/synesthesia-engine",
    category: "Art Modes & Simulations"
  },
  {
    name: "Tidal Rooms",
    description: "A calming simulation of water tides slowly filling and receding from the screen.",
    path: "/developer-specs/tidal-rooms",
    category: "Art Modes & Simulations"
  },
  {
    name: "The Final Frame",
    description: "Design the closing visual moment, scene, or quote of your legacy archive.",
    path: "/deckoviz-storytelling/final-frame",
    category: "Storytelling Spaces"
  },
  {
    name: "The Inheritance",
    description: "A journaling workspace mapping lessons, advice, and values to bequeath.",
    path: "/deckoviz-storytelling/the-inheritance",
    category: "Storytelling Spaces"
  },
  {
    name: "The Rehearsal",
    description: "Practice difficult conversations, announcements, or speeches in a safe space.",
    path: "/deckoviz-storytelling/the-rehearsal",
    category: "Storytelling Spaces"
  },
  {
    name: "The Sacred Ordinary",
    description: "An appreciation board highlighting small, everyday details (e.g. coffee, shadows).",
    path: "/deckoviz-storytelling/the-sacred-ordinary",
    category: "Storytelling Spaces"
  },
  {
    name: "The Second Draft",
    description: "Take a rough life memory and rewrite the narrative from a wiser perspective.",
    path: "/deckoviz-storytelling/the-second-draft",
    category: "Storytelling Spaces"
  },
  {
    name: "The Threshold",
    description: "A contemplative visual gate separating busy workdays from peaceful evening.",
    path: "/deckoviz-storytelling/the-threshold",
    category: "Storytelling Spaces"
  },
  {
    name: "Thousand Year Question",
    description: "Write questions for future generations, stored in a digital capsule.",
    path: "/deckoviz-storytelling/thousand-year-question",
    category: "Storytelling Spaces"
  },
  {
    name: "Thought Weaver",
    description: "Connect concepts, quotes, and research nodes in a starry semantic web.",
    path: "/developer-specs/thought-weaver",
    category: "Art Modes & Simulations"
  },
  {
    name: "Time Capsule Studio",
    description: "Pack digital files, audio recordings, and text to lock and open years later.",
    path: "/deckoviz-storytelling/time-capsule-studio",
    category: "Storytelling Spaces"
  },
  {
    name: "Typography Art",
    description: "Draw paths and watch fonts wrap, scale, and dance along your lines.",
    path: "/developer-specs/typography-art",
    category: "Art Modes & Simulations"
  },
  {
    name: "Unfinished Business Bureau",
    description: "Write, catalog, and check off unresolved emotional or administrative tasks.",
    path: "/deckoviz-storytelling/unfinished-business-bureau",
    category: "Storytelling Spaces"
  },
  {
    name: "Unsent Letter Archive",
    description: "Write letters that you cannot send, releasing their weight into a starry vault.",
    path: "/deckoviz-storytelling/unsent-letter-archive",
    category: "Storytelling Spaces"
  },
  {
    name: "Verdict App",
    description: "Play the role of judge and jury in historical or fictional court trials.",
    path: "/flagship-games/vizzys-verdict",
    category: "Interactive Games"
  },
  {
    name: "Visual Audiobook",
    description: "Read stories that dynamically change illustration frames based on text progress.",
    path: "/tools/visual-audiobook",
    category: "Creative Tools"
  },
  {
    name: "Visual Book",
    description: "Turn scripts or logs into structured coffee-table books with gorgeous AI art.",
    path: "/tools/visual-book",
    category: "Creative Tools"
  },
  {
    name: "Visual Book Companion",
    description: "An interactive reading assistant that draws style imagery as you read.",
    path: "/tools/visual-book-companion",
    category: "Creative Tools"
  },
  {
    name: "Visual Journal",
    description: "Reflective drawing and collage builder for logging daily emotions.",
    path: "/tools/visual-journal",
    category: "Creative Tools"
  },
  {
    name: "Vizzy Creation Canvas",
    description: "The full-screen visual canvas hosting multiple AI modules and frames.",
    path: "/vizzy-canvas",
    category: "Core Platform",
    highlight: true
  },
  {
    name: "Vizzy Library",
    description: "Explore, organize, edit, and share your generated artworks and stories.",
    path: "/gallery",
    category: "Core Platform"
  },
  {
    name: "Vizzy Profile Page",
    description: "Manage your creations, account settings, credits, and profile details.",
    path: "/profile",
    category: "Core Platform"
  },
  {
    name: "Vizzy Subscription Page",
    description: "View available plans, active tiers, and buy additional generation credits.",
    path: "/subscription",
    category: "Core Platform"
  },
  {
    name: "Weather Simulations",
    description: "Generates highly detailed atmospheric storms, blizzards, and sunny spells.",
    path: "/developer-specs/weather-simulations",
    category: "Art Modes & Simulations"
  },
  {
    name: "Wizzy Generative Chat",
    description: "Chat directly with the core AI engine, generating instant visual prompts.",
    path: "/wizzy",
    category: "Core Platform",
    highlight: true
  },
  {
    name: "World Builders Table",
    description: "A multiplayer spatial table designed to lay out lore, timelines, and world rules.",
    path: "/deckoviz-storytelling/world-builders-table",
    category: "Storytelling Spaces"
  },
  {
    name: "World in Frame",
    description: "Cooperative framing game aligning visual viewpoints to capture stories.",
    path: "/flagship-games/world-in-frame",
    category: "Interactive Games"
  },
  {
    name: "Zen Garden",
    description: "Slowly rake digital gravel, grow bamboo, and design stone formations.",
    path: "/developer-specs/zen-garden",
    category: "Art Modes & Simulations"
  }
];

export default function MasterSuiteOfFeatures() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sort alphabetically just in case, though defined alphabetically
  const sortedFeatures = useMemo(() => {
    return [...FEATURES_DATA].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter features
  const filteredFeatures = useMemo(() => {
    return sortedFeatures.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sortedFeatures, searchQuery, selectedCategory]);

  // Group features by starting letter
  const groupedFeatures = useMemo(() => {
    const groups: Record<string, FeatureItem[]> = {};
    filteredFeatures.forEach((f) => {
      const letter = f.name.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(f);
    });
    return groups;
  }, [filteredFeatures]);

  // Active letters in the filtered list
  const activeLetters = useMemo(() => {
    return Object.keys(groupedFeatures).sort();
  }, [groupedFeatures]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-section-${letter}`);
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const categories = ["All", "Creative Tools", "Art Modes & Simulations", "Storytelling Spaces", "Interactive Games", "Core Platform"];

  return (
    <div className="min-h-screen bg-[#05060f] text-white overflow-hidden selection:bg-purple-500/40 relative font-sans">
      {/* Background radial gradients */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] opacity-70 animate-pulse" />
        <div className="absolute top-[30%] right-1/4 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-[160px] opacity-60" />
        <div className="absolute bottom-0 left-1/3 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[180px] opacity-50" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center justify-center px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-full mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-purple-400 mr-2 animate-pulse" />
            <span className="text-purple-300 font-bold text-xs uppercase tracking-widest">Master Registry</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200"
          >
            Master Suite of Features
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300/80 leading-relaxed font-light px-4"
          >
            This page contains every single feature on our platform for your quick reference. Welcome to{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Vizzyverse
            </span>
            , where each jump takes you to something magical.
          </motion.p>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-20 z-40 bg-[#05060f]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-4 md:p-6 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-6">
            {/* Search Input */}
            <div className="relative group w-full">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-20 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
              <div className="relative bg-[#0d0e1b] border border-white/10 rounded-2xl p-1 flex items-center transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search among 140+ immersive features (e.g. 'dream', 'journal', 'game')…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-3 text-base text-white placeholder:text-slate-500 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-4 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1.5 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filters:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-300 flex-shrink-0 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "bg-[#0d0e1b] text-slate-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* main layout grid */}
        <div className="flex gap-8 relative">
          {/* Alphabet Index (Quick Jump) - Desktop Sidebar */}
          <div className="hidden lg:block w-16 sticky top-80 h-fit flex-shrink-0 z-30">
            <div className="flex flex-col items-center gap-1.5 bg-[#0d0e1b]/40 border border-white/5 rounded-2xl py-4 backdrop-blur-md">
              <span className="text-[10px] text-slate-500 font-bold uppercase mb-2">A-Z</span>
              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Z"].map((letter) => {
                const isActive = activeLetters.includes(letter);
                return (
                  <button
                    key={letter}
                    disabled={!isActive}
                    onClick={() => scrollToLetter(letter)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                      isActive
                        ? "text-slate-200 hover:bg-purple-600 hover:text-white cursor-pointer"
                        : "text-slate-600/40 cursor-not-allowed"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features Grid Area */}
          <div ref={containerRef} className="flex-1">
            {/* Quick stats banner */}
            <div className="text-sm text-slate-400 mb-8 flex items-center justify-between">
              <span>
                Showing <strong className="text-white">{filteredFeatures.length}</strong> of{" "}
                <strong className="text-purple-400">{FEATURES_DATA.length}</strong> features
              </span>
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Empty state */}
            {filteredFeatures.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-[#0d0e1b]/20 border border-white/5 rounded-3xl"
              >
                <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-300 mb-2">No features found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Try searching for another keyword or select a different category filter.
                </p>
              </motion.div>
            )}

            {/* Grouped alphabetically */}
            <div className="space-y-16">
              {activeLetters.map((letter) => (
                <div key={letter} id={`letter-section-${letter}`} className="scroll-mt-40">
                  {/* Group header */}
                  <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-2">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                      {letter}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {groupedFeatures[letter].map((feature, idx) => {
                      const Icon = CATEGORY_ICONS[feature.category];
                      const catStyle = CATEGORY_COLORS[feature.category];
                      return (
                        <motion.div
                          key={feature.name}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                          className={`group relative rounded-2xl p-6 bg-[#0a0b14]/50 border transition-all duration-300 flex flex-col justify-between h-[210px] ${
                            feature.highlight 
                              ? "border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.08)] bg-gradient-to-b from-[#0e0f1d] to-[#0a0b14]" 
                              : "border-white/5 hover:border-white/10"
                          } hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:bg-[#0c0d1a]`}
                        >
                          {/* Inner glow on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                          <div>
                            {/* Card Header (Category tag + icon) */}
                            <div className="flex justify-between items-start mb-4">
                              <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border bg-[#0d0e1b] ${catStyle}`}>
                                {feature.category}
                              </span>
                              <div className="p-2 bg-white/5 border border-white/5 rounded-lg text-slate-400 group-hover:text-white transition-colors duration-300">
                                <Icon className="w-4 h-4" />
                              </div>
                            </div>

                            {/* Feature Name */}
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
                              {feature.name}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                              {feature.description}
                            </p>
                          </div>

                          {/* Jump Link */}
                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end">
                            <Link
                              to={feature.path}
                              className="text-xs font-bold text-slate-400 group-hover:text-purple-400 flex items-center gap-1 transition-all duration-300"
                            >
                              <span>Jump In</span>
                              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 p-3 bg-purple-600 hover:bg-purple-500 border border-purple-400/30 text-white rounded-full transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
