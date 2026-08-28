import dotenv from "dotenv";
import { sequelize } from "../config/db.js";
import DeckovizCuration from "../models/DeckovizCuration.js";
import { MusicTrack } from "../models/MediaTracks.js";

dotenv.config();

// Sample curated artwork data (30 items total: 10 per collection)
const SAMPLE_ARTWORKS = [
  // Collection 1: Evolving Realism (10 items)
  {
    title: "Mona Lisa Reimagined",
    artist: "Leonardo AI",
    category: "Realism",
    style: "Digital Oil",
    imageUrl: "https://picsum.photos/id/1011/1200/800",
    description: "A modern digital interpretation of classic realism, focusing on soft light and complex expressions.",
    displayOrder: 1,
    isFeatured: true
  },
  {
    title: "Chasing Shadows",
    artist: "Sofia Ramirez",
    category: "Realism",
    style: "Impressionistic Realism",
    imageUrl: "https://picsum.photos/id/1015/1200/800",
    description: "Sunlight filtering through forest trees casting high contrast shadows on forest floor.",
    displayOrder: 2,
    isFeatured: false
  },
  {
    title: "Whispers of the Street",
    artist: "Marcus Aurel",
    category: "Realism",
    style: "Street Realism",
    imageUrl: "https://picsum.photos/id/1025/1200/800",
    description: "Rainy evening street scene capturing reflections of neon signs in puddles.",
    displayOrder: 3,
    isFeatured: false
  },
  {
    title: "The Silent Watcher",
    artist: "Elena Rostova",
    category: "Realism",
    style: "Classic Portraiture",
    imageUrl: "https://picsum.photos/id/1027/1200/800",
    description: "Stunning high-detail portrait of an elderly watchmaker at his wooden workbench.",
    displayOrder: 4,
    isFeatured: false
  },
  {
    title: "Rust and Ruin",
    artist: "David Vance",
    category: "Realism",
    style: "Industrial Realism",
    imageUrl: "https://picsum.photos/id/1031/1200/800",
    description: "Detailed textures of an abandoned railway station showing oxidation and overgrown flora.",
    displayOrder: 5,
    isFeatured: false
  },
  {
    title: "Morning Harbor",
    artist: "Claire Sterling",
    category: "Realism",
    style: "Maritime Realism",
    imageUrl: "https://picsum.photos/id/1035/1200/800",
    description: "Small fishing boats docked in a quiet harbor blanketed by thick morning fog.",
    displayOrder: 6,
    isFeatured: false
  },
  {
    title: "Gaze of the Jaguar",
    artist: "Rodrigo Silva",
    category: "Realism",
    style: "Wildlife Realism",
    imageUrl: "https://picsum.photos/id/1040/1200/800",
    description: "Intense closeup of a jaguar's eyes hidden behind tropical jungle foliage.",
    displayOrder: 7,
    isFeatured: false
  },
  {
    title: "Solitude in Concrete",
    artist: "Kaito Sato",
    category: "Realism",
    style: "Urban Realism",
    imageUrl: "https://picsum.photos/id/1043/1200/800",
    description: "A single cyclist navigating empty modernist architectural corridors in Tokyo.",
    displayOrder: 8,
    isFeatured: false
  },
  {
    title: "Harvest Festival",
    artist: "Amara Diop",
    category: "Realism",
    style: "Cultural Realism",
    imageUrl: "https://picsum.photos/id/1047/1200/800",
    description: "Warm, vibrant community portrait of dancers celebrating a seasonal harvest.",
    displayOrder: 9,
    isFeatured: false
  },
  {
    title: "The Architect's Desk",
    artist: "Julian Mercer",
    category: "Realism",
    style: "Still Life",
    imageUrl: "https://picsum.photos/id/1050/1200/800",
    description: "A curated layout of drafting tools, blueprint scrolls, and coffee cups in morning light.",
    displayOrder: 10,
    isFeatured: false
  },

  // Collection 2: Neo-Ambient Aesthetics (10 items)
  {
    title: "Ethereal Fields",
    artist: "Luna Moon",
    category: "Ambient",
    style: "Vaporwave Pastel",
    imageUrl: "https://picsum.photos/id/1053/1200/800",
    description: "Soft pink and blue color fields blending seamlessly into dreamlike horizons.",
    displayOrder: 11,
    isFeatured: true
  },
  {
    title: "Nebula Dreams",
    artist: "Caelum Star",
    category: "Ambient",
    style: "Cosmic Abstraction",
    imageUrl: "https://picsum.photos/id/1057/1200/800",
    description: "Glowing dust clouds and star clusters rendering in deep indigo and magenta shades.",
    displayOrder: 12,
    isFeatured: false
  },
  {
    title: "Fluid Motion",
    artist: "Iris Vance",
    category: "Ambient",
    style: "Liquid Art",
    imageUrl: "https://picsum.photos/id/1062/1200/800",
    description: "Swirling acrylic mixtures frozen in dynamic, calming oceanic turbulence patterns.",
    displayOrder: 13,
    isFeatured: false
  },
  {
    title: "Static Noise",
    artist: "Devin Grey",
    category: "Ambient",
    style: "Minimalist Grid",
    imageUrl: "https://picsum.photos/id/1069/1200/800",
    description: "A dark canvas layered with fine, light grey grain patterns and structural geometric outlines.",
    displayOrder: 14,
    isFeatured: false
  },
  {
    title: "Submerged Light",
    artist: "Marina Blue",
    category: "Ambient",
    style: "Aquatic Glow",
    imageUrl: "https://picsum.photos/id/1072/1200/800",
    description: "Ethereal rays of sunlight penetrating deep underwater spaces creating organic teal highlights.",
    displayOrder: 15,
    isFeatured: false
  },
  {
    title: "Over the Canopy",
    artist: "Taro Green",
    category: "Ambient",
    style: "Verdant Mist",
    imageUrl: "https://picsum.photos/id/1074/1200/800",
    description: "A sea of green treetops disappearing into low-hanging white fog and clouds.",
    displayOrder: 16,
    isFeatured: false
  },
  {
    title: "Dawn on the Ridge",
    artist: "Sierra Peak",
    category: "Ambient",
    style: "Warm Gradient",
    imageUrl: "https://picsum.photos/id/1080/1200/800",
    description: "Minimalist mountains silhouetted against a vibrant orange and yellow sky.",
    displayOrder: 17,
    isFeatured: false
  },
  {
    title: "Aurora Symphony",
    artist: "Nils Vorge",
    category: "Ambient",
    style: "Nordic Lights",
    imageUrl: "https://picsum.photos/id/1081/1200/800",
    description: "Vibrant ribbons of green and purple aurora borealis wrapping over arctic glacial peaks.",
    displayOrder: 18,
    isFeatured: false
  },
  {
    title: "Warm Hearth",
    artist: "Amber Glow",
    category: "Ambient",
    style: "Cozy Luminescence",
    imageUrl: "https://picsum.photos/id/1082/1200/800",
    description: "Extreme close up of burning embers glowing in warm comforting red and amber tones.",
    displayOrder: 19,
    isFeatured: false
  },
  {
    title: "Zen Garden",
    artist: "Soji Rake",
    category: "Ambient",
    style: "Monochrome Sand",
    imageUrl: "https://picsum.photos/id/1083/1200/800",
    description: "Hypnotic concentric circles raked into light grey sand surrounding a single dark basalt stone.",
    displayOrder: 20,
    isFeatured: false
  },

  // Collection 3: Abstract Generative (10 items)
  {
    title: "Fractal Horizons",
    artist: "Algo Synth",
    category: "Generative",
    style: "3D Mathematical",
    imageUrl: "https://picsum.photos/id/111/1200/800",
    description: "Intricate self-similar geometric patterns rising like mountains over infinity.",
    displayOrder: 21,
    isFeatured: true
  },
  {
    title: "Synaptic Web",
    artist: "Neural Flow",
    category: "Generative",
    style: "Network Node Art",
    imageUrl: "https://picsum.photos/id/124/1200/800",
    description: "Interconnected nodes glowing under simulated neurological signal patterns.",
    displayOrder: 22,
    isFeatured: false
  },
  {
    title: "Quantum Glitch",
    artist: "Byte Error",
    category: "Generative",
    style: "Glitch Art",
    imageUrl: "https://picsum.photos/id/133/1200/800",
    description: "Intentional signal disruption patterns rendering digital color channels offset.",
    displayOrder: 23,
    isFeatured: false
  },
  {
    title: "Chromatic Fields",
    artist: "Pixel Master",
    category: "Generative",
    style: "Suprematist Digital",
    imageUrl: "https://picsum.photos/id/145/1200/800",
    description: "Bold primary colored blocks layered mathematically to create geometric tension.",
    displayOrder: 24,
    isFeatured: false
  },
  {
    title: "Bessel Functions",
    artist: "Fourier Wave",
    category: "Generative",
    style: "Mathematical Vector",
    imageUrl: "https://picsum.photos/id/158/1200/800",
    description: "Complex harmonic coordinate wave mappings intersecting to create gorgeous line ripples.",
    displayOrder: 25,
    isFeatured: false
  },
  {
    title: "Cyberpunk Alleyway",
    artist: "Neon Blade",
    category: "Generative",
    style: "Synthwave Generative",
    imageUrl: "https://picsum.photos/id/160/1200/800",
    description: "A dark cyberpunk alley illuminated by glowing holographic advertisements and neon steam.",
    displayOrder: 26,
    isFeatured: false
  },
  {
    title: "Organic Matrix",
    artist: "Cellular Automata",
    category: "Generative",
    style: "Conway Generative",
    imageUrl: "https://picsum.photos/id/180/1200/800",
    description: "Living digital cells generating branching structures simulating biological life forms.",
    displayOrder: 27,
    isFeatured: false
  },
  {
    title: "The Glass Lattice",
    artist: "Prism Ray",
    category: "Generative",
    style: "Refractive Glassmorphism",
    imageUrl: "https://picsum.photos/id/195/1200/800",
    description: "Highly detailed raytraced glass shards bending light into sharp spectrum spikes.",
    displayOrder: 28,
    isFeatured: false
  },
  {
    title: "Perlin Terrain",
    artist: "Noise Vector",
    category: "Generative",
    style: "Heightmap Abstraction",
    imageUrl: "https://picsum.photos/id/200/1200/800",
    description: "Smooth topographical lines representing mathematical noise-fields stacked in perspective.",
    displayOrder: 29,
    isFeatured: false
  },
  {
    title: "Void Core",
    artist: "Black Hole",
    category: "Generative",
    style: "Deep Void",
    imageUrl: "https://picsum.photos/id/212/1200/800",
    description: "A massive central singularity drawing color bands and vector lines into its dark center.",
    displayOrder: 30,
    isFeatured: false
  }
];

// Sample music tracks (10 tracks total: 5 classical pieces & 5 nature sound effects)
const SAMPLE_MUSIC = [
  // Classical Masterworks (5 tracks)
  {
    title: "Symphony No. 9 in D minor (Choral)",
    prompt: "Epic orchestral masterpiece with full chorus and triumphant movements, ideal for deep focus.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "classical",
    duration: 360,
    isFavorited: true
  },
  {
    title: "Requiem in D minor (Lacrimosa)",
    prompt: "Sorrowful, soaring choral harmonies and slow movements composed by Wolfgang Amadeus Mozart.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    category: "classical",
    duration: 210,
    isFavorited: false
  },
  {
    title: "Cello Suite No. 1 in G major",
    prompt: "Solo cello performance, rich wood textures and resonant low pitches by Johann Sebastian Bach.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    category: "classical",
    duration: 180,
    isFavorited: false
  },
  {
    title: "Nocturne in E-flat major, Op. 9 No. 2",
    prompt: "Relaxing piano piece, gentle high-pitch melodies and warm pacing by Frédéric Chopin.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    category: "classical",
    duration: 245,
    isFavorited: false
  },
  {
    title: "The Four Seasons (Spring - Allegro)",
    prompt: "Vibrant high-speed violin solos representing the rejuvenation of nature, by Antonio Vivaldi.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    category: "classical",
    duration: 195,
    isFavorited: false
  },

  // Nature Sounds (5 tracks)
  {
    title: "Ocean Waves Ambient",
    prompt: "Rhythmic crashing of sea waves against sand with light wind and seagull calls in the distance.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    category: "ambient",
    duration: 600,
    isFavorited: true
  },
  {
    title: "Mountain Waterfall",
    prompt: "Constant white noise rushing waterfall sound layered with light mountain bird chirps.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    category: "ambient",
    duration: 480,
    isFavorited: false
  },
  {
    title: "Morning Bird Song",
    prompt: "Bright forest canopy filled with diverse morning songbirds and rustling leaves in light wind.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    category: "ambient",
    duration: 300,
    isFavorited: false
  },
  {
    title: "Gentle Thunderstorm",
    prompt: "Soft rain drumming on window panes with distant low rumbles of thunder, cozy and relaxing.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    category: "ambient",
    duration: 540,
    isFavorited: false
  },
  {
    title: "Forest Wind Whispers",
    prompt: "Deep rustling sound of wind blowing through pine needles and swaying tall birch tree trunks.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    category: "ambient",
    duration: 420,
    isFavorited: false
  }
];

async function seed() {
  console.log("🚀 Starting database seeding for Curations & Music...");
  try {
    await sequelize.authenticate();
    console.log("✅ Database authenticated.");

    console.log("🔄 Synchronizing database tables...");
    await sequelize.sync({ alter: true });
    console.log("✅ Database tables synchronized.");

    // Clean existing seed data
    console.log("🧹 Clearing old curations and system music...");
    await DeckovizCuration.destroy({ where: {} });
    await MusicTrack.destroy({ where: { userId: null } });

    // Seed curations
    console.log("🎨 Seeding 30 Curations divided into 3 categories...");
    for (let item of SAMPLE_ARTWORKS) {
      await DeckovizCuration.create(item);
    }
    console.log(`✅ Successfully seeded ${SAMPLE_ARTWORKS.length} artworks.`);

    // Seed music tracks
    console.log("🎵 Seeding 10 system Music/Audio Tracks (5 classical, 5 nature)...");
    for (let track of SAMPLE_MUSIC) {
      await MusicTrack.create(track);
    }
    console.log(`✅ Successfully seeded ${SAMPLE_MUSIC.length} music tracks.`);

    console.log("\n✨ Database seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
