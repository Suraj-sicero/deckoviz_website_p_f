import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
     index: number;
}
interface Feature {
  title: string;
  description: string;
}
const getIconForFeature = (title: string) => {
  const map: Record<string, string> = {
    // Art / Creation
    "Your Personal Painter": "3dicons-brush-dynamic-color.png",
    "Reimagine Your Photos": "3dicons-camera-dynamic-color.png",
    "Iconic, Personalized Art": "3dicons-picture-dynamic-color.png",
    "Living Animations": "3dicons-video-camera-dynamic-color.png",
    "Dream Visualizer": "3dicons-magic-trick-dynamic-color.png",
    "Sketch to Masterpiece": "3dicons-paint-kit-dynamic-color.png",
    "Prompt to Art": "3dicons-brush-dynamic-color.png",
    "Innerscape Art": "3dicons-heart-dynamic-color.png",

    // Mood / Music
    "Multisensory Moodscapes": "3dicons-music-dynamic-color.png",
    "Music Generator": "3dicons-music-dynamic-color.png",
    "Music from Art": "3dicons-music-dynamic-color.png",

    // Home / Lifestyle
    "Smart Display Engine": "3dicons-home-dynamic-color.png",
    "Daily Curator Vizzy": "3dicons-home-dynamic-color.png",
    "Halo Backlights": "3dicons-home-dynamic-color.png",
    "Multi-Space Magic": "3dicons-home-dynamic-color.png",

    // Social
    "Co-Create Together": "3dicons-users-dynamic-color.png",
    "Family Co-Creation": "3dicons-users-dynamic-color.png",
    "Social Art Feed": "3dicons-users-dynamic-color.png",
    "Private Sharing": "3dicons-users-dynamic-color.png",
    "Social Art Universe": "3dicons-users-dynamic-color.png",

    // Kids / Learning
    "Storytelling for Kids": "3dicons-book-dynamic-color.png",
    "Kids’ Creative Suite": "3dicons-book-dynamic-color.png",
    "Learning Visuals": "3dicons-book-dynamic-color.png",
    "Book to Frames": "3dicons-book-dynamic-color.png",

    // Voice / Audio
    "Voice Control": "3dicons-microphone-dynamic-color.png",
    "Voice to Art": "3dicons-microphone-dynamic-color.png",
    "Narrated Collections": "3dicons-microphone-dynamic-color.png",
    "Visual Chat": "3dicons-microphone-dynamic-color.png",

    // Games
    "Games & Play": "3dicons-controller-dynamic-color.png",

    // Marketplace
    "Marketplace": "3dicons-shop-dynamic-color.png",
    "Creator Packs": "3dicons-shop-dynamic-color.png",

    // Defaults
    "Memory of the Day": "3dicons-heart-dynamic-color.png",
    "Event Visuals": "3dicons-notify-heart-dynamic-color.png",
  };

  return map[title] || "3dicons-picture-dynamic-color.png";
};

  const mainFeatures: Feature[] = [
    {
    title: "Your Personal Painter",
    description:
      "An AI artist that paints your dreams, moods, memories, and inner worlds into living art."
  },
  {
    title: "Reimagine Your Photos",
    description:
      "Turn everyday photos into timeless artworks in iconic and custom styles."
  },
  {
    title: "Iconic, Personalized Art",
    description:
      "Place yourself and your loved ones inside legendary masterpieces."
  },
  {
    title: "Living Animations",
    description:
      "Bring still images to life with subtle motion, loops, and cinematic magic."
  },
  {
    title: "Dream Visualizer",
    description:
      "See your dreams, thoughts, and subconscious landscapes as expressive art."
  },
  {
    title: "Sketch to Masterpiece",
    description:
      "Transform your sketches or your child’s drawings into gallery-worthy creations."
  },
  {
    title: "Prompt to Art",
    description:
      "Create stunning visuals from a thought, a chat, or your voice."
  },
  {
    title: "Innerscape Art",
    description:
      "Paint emotional and inner landscapes that reflect how you truly feel."
  }
];


const ADDITIONAL_FEATURES : Feature[] = [
  {
    title: "Dynamic Abstracts",
    description:
      "Ever-evolving abstract art that subtly changes, like a living canvas."
  },
  {
    title: "Symbolic Art Engine",
    description:
      "Personal symbols and meanings woven into generative, shifting artworks."
  },
  {
    title: "Create Collections",
    description:
      "Curate themed journeys of art, music, and memories for every mood."
  },
  {
    title: "Multisensory Moodscapes",
    description:
      "Perfectly synced art, music, and soundscapes for deep immersion."
  },
  {
    title: "Smart Display Engine",
    description:
      "Your wall adapts to time, weather, season, mood, and life moments."
  },
  {
    title: "Daily Curator Vizzy",
    description:
      "Your personal AI curator that learns your taste and surprises you daily."
  },
  {
    title: "Mood & Vibe Search",
    description:
      "Find art by feeling. Calm, joy, mystery, romance, wonder."
  },
  {
    title: "Vision Boards",
    description:
      "Set your tone with evolving moodboards and intention walls."
  },
  {
    title: "Ritual Moments",
    description:
      "Design morning, evening, family, couple, and life rituals with art and light."
  },
  {
    title: "Storytelling for Kids",
    description:
      "Turn stories into magical visual journeys for learning and bonding."
  },
  {
    title: "Co-Create Together",
    description:
      "Create art with your partner, family, and friends in shared moments."
  },
  {
    title: "Halo Backlights",
    description:
      "Soft ambient glow that syncs with visuals and transforms your space."
  },
  {
    title: "Animated Stories",
    description: "Turn photos and ideas into cinematic story sequences."
  },
  {
    title: "Narrated Collections",
    description: "Add AI or human voice to memories, poems, and visual journeys."
  },
  {
    title: "Art from Journals",
    description: "Transform your reflections and diary entries into meaningful art."
  },
  {
    title: "Book to Frames",
    description: "Turn books and PDFs into visual story collections on your wall."
  },
  {
    title: "Poems to Art",
    description: "Watch poetry become living visuals, line by line."
  },
  {
    title: "Art to Poetry",
    description: "Let your favorite visuals inspire beautiful words."
  },
  {
    title: "AI Montage Maker",
    description: "Create stunning visual montages from memories and moments."
  },
  {
    title: "Poster Creator",
    description: "Design quotes, affirmations, reminders, and aesthetic posters."
  },
  {
    title: "Text as Art",
    description: "Visualize thoughts and ideas as expressive typographic art."
  },
  {
    title: "Learning Visuals",
    description: "Generate diagrams, posters, and visuals for learning and curiosity."
  },
  {
    title: "Real-Time Story Art",
    description: "Narrate live and see visuals appear instantly as you speak."
  },
  {
    title: "Generative Clock",
    description: "A designer clock that blends time with living art."
  },
  {
    title: "Memory of the Day",
    description: "Relive a special moment, every day, chosen just for you."
  },
  {
    title: "Moodboard Studio",
    description: "Manual, dynamic, and evolving boards for dreams and goals."
  },
  {
    title: "Visual Search",
    description: "Upload an image and discover similar art instantly."
  },
  {
    title: "Trending Discovery",
    description: "Explore what the world is loving right now."
  },
  {
    title: "Social Art Feed",
    description: "Share, follow, and explore a universe of visual creators."
  },
  {
    title: "Private Sharing",
    description: "Send collections and creations to people who matter."
  },
  {
    title: "Marketplace",
    description: "Discover, buy, and sell digital and physical art."
  },
  {
    title: "Creator Packs",
    description: "Curated mood packs, lifestyle packs, and art bundles."
  },
  {
    title: "Voice Control",
    description: "Just say “Hey Vizzy” and change your world hands-free."
  },
  {
    title: "Voice to Art",
    description: "Create visuals by simply speaking your imagination."
  },
  {
    title: "Music Generator",
    description: "Create AI music and soundscapes to match your art."
  },
  {
    title: "Music from Art",
    description: "Let visuals inspire the perfect soundtrack automatically."
  },
  {
    title: "Smart Scheduling",
    description: "Plan art for mornings, evenings, weeks, and special days."
  },
  {
    title: "Event Visuals",
    description: "Birthdays, anniversaries, festivals, made beautiful."
  },
  {
    title: "Interactive Meditation",
    description: "Guided visual meditations for calm and clarity."
  },
  {
    title: "Interactive Visualization",
    description: "See your future, your goals, your growth."
  },
  {
    title: "Family Co-Creation",
    description: "Create together across generations."
  },
  {
    title: "Kids’ Creative Suite",
    description: "Stories, art, imagination, learning, all for little minds."
  },
  {
    title: "Visual Chat",
    description: "Talk with art. Watch conversations turn visual."
  },
  {
    title: "Dynamic Generative Art",
    description: "Abstract and symbolic art that never repeats."
  },
  {
    title: "Programmatic Art",
    description: "Rule-based evolving art for true living walls."
  },
  {
    title: "2D to 3D Art",
    description: "Turn flat art into dimensional, sculptural visuals."
  },
  {
    title: "Smart TV Mode",
    description: "Yes, it’s also Google TV for Netflix, YouTube, and more."
  },
  {
    title: "Custom Frames",
    description: "Handcrafted wooden frames with personal engravings."
  },
  {
    title: "Multi-Space Magic",
    description: "Different moods for every room in your home."
  },
  {
    title: "Room Palette Match",
    description: "Match art to your room’s colors and style."
  },
  {
    title: "Live Stream Mode",
    description: "Instantly stream evolving visuals in real time."
  },
  {
    title: "Artbooks & Comics",
    description: "Create your own visual books and stories."
  },
  {
    title: "Short Film Studio",
    description: "Turn storyboards into cinematic Deckoviz films."
  },
  {
    title: "Games & Play",
    description: "Interactive creative and social experiences for fun nights."
  },
  {
    title: "Social Art Universe",
    description: "Your own visual world, connected to others."
  },
  {
    title: "Rapidly Growing Library",
    description: "Thousands of new artworks, added every week."
  },
  {
    title: "Always Evolving",
    description: "New features, new modes, new magic, constantly."
  }
];
const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  index,
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: -200,
      rotate: Math.random() * 10 - 5,
      scale: 0.8,
    }}
    animate={{
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
    }}
    transition={{
      delay: index * 0.04,
      type: "spring",
      stiffness: 120,
      damping: 14,
    }}
    className="group relative rounded-2xl p-8 pt-16
    bg-white/60 backdrop-blur-xl
    border border-white/30
    shadow-[0_20px_40px_rgba(168,85,247,0.15)]
    hover:shadow-[0_30px_60px_rgba(168,85,247,0.25)]
    hover:scale-105 hover:-rotate-1
    transition-all duration-500 cursor-pointer"
  >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Icon */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
          <img src={`/images/${getIconForFeature(title)}`} 

          alt="Feature Icon"
          className="w-16 h-16 object-contain transform -rotate-12
    group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-1
    transition-all duration-500
    drop-shadow-[0_10px_25px_rgba(168,85,247,0.6)]"

        />
      </div>

      <div className="flex flex-col items-center text-center relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight
                      group-hover:bg-gradient-to-r group-hover:from-purple-600
                      group-hover:to-pink-500 group-hover:bg-clip-text
                      group-hover:text-transparent transition-all duration-500">
          {title}
        </h3>

        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
};

export default function AllFeatures() {
    const [sparks, setSparks] = useState<Spark[]>([]);



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // optional throttle for premium feel
      if (Math.random() > 0.7) return;

      const id = Date.now();

      setSparks((prev) => [
  ...prev,
  ...Array.from({ length: 6 }).map(() => ({
    id: Math.random(),
    x: e.clientX,
    y: e.clientY,
    size: Math.random() * 8 + 6,
    color: [
      "#ffffff",
      "#facc15",
      "#a855f7",
      "#ec4899",
      "#38bdf8",
    ][Math.floor(Math.random() * 5)],
    dx: (Math.random() - 0.5) * 10,
    dy: (Math.random() - 0.5) * 10,
  })),
]);



      setTimeout(() => {
       setTimeout(() => {
  setSparks((prev) => prev.slice(6)); // remove oldest sparks
}, 600);

     }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
<section className="min-h-screen px-6 py-20 relative overflow-hidden
  bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
{/* Background glow blobs */}
<div className="absolute inset-0 -z-10">
  <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px]" />
  <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-[120px]" />
</div>

        {/* Mouse sparkles */}
<div className="pointer-events-none fixed inset-0 z-50">
  {sparks.map((spark) => (
    <span
  key={spark.id}
  className="absolute rounded-full animate-spark"
  style={{
    left: spark.x,
    top: spark.y,
    width: spark.size,
    height: spark.size,
    background: spark.color,
    boxShadow: `0 0 20px ${spark.color}`,
    transform: `translate(${spark.dx}px, ${spark.dy}px)`,
    ["--dx" as any]: `${spark.dx * 12}px`,
    ["--dy" as any]: `${spark.dy * 12}px`,
  }}
/>

  ))}
</div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900">
            All Deckoviz Features
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Everything your walls can become.
          </p>
        </div>

        {/* Main Features */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12">
            Core Experiences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {mainFeatures.map((feature, index) => (
  <FeatureCard
    key={`main-${index}`}
    index={index}
    title={feature.title}
    description={feature.description}
  />
))}

          </div>
        </div>

        {/* Additional Features */}
        <div>
          <h2 className="text-3xl font-bold mb-12">
            Extended Universe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {ADDITIONAL_FEATURES.map((feature, index) => (
  <FeatureCard
    key={`additional-${index}`}
    index={index + mainFeatures.length}
    title={feature.title}
    description={feature.description}
  />
))}

          </div>
        </div>

      </div>
    </section>
  );
}
