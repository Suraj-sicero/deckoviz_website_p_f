import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Brain, Home, Sparkles, BookOpen, Image as ImageIcon, Leaf, MessageSquare, Frame, Palette, Heart, Clock, Wand2, BookMarked, ArrowRight } from "lucide-react";

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
};


/* ===== Core Reading Content ===== */

const coreReadings = [
  {
    title: "Who Is Deckoviz For?",
    slug: "who-is-deckoviz-for",
    description:
      "A clear, values-first look at the kinds of people, homes, and lives Deckoviz is designed to support. Less demographics, more mindset, intention, and taste."
  },
  {
    title: "Who Is Deckoviz For – And How It Gently Becomes Part of Your Life",
    slug: "who-is-deckoviz-for",
    description:
      "A deeper companion piece that explores how Deckoviz doesn’t arrive as a feature checklist, but slowly integrates into routines, rituals, and spaces."
  },
  {
    title: "Vizzy for Your Home",
    slug: "the-vizzy-magic-for-homes-and-businesses",
    description:
      "An introduction to Vizzy, your quiet AI companion. How it curates, learns, adapts, and supports without demanding attention or control."
  },
  {
    title: "DASP User’s Guide",
    slug: "dasp-users-guide",
    description:
      "A practical guide to living with Deckoviz: modes, rituals, personalization, memories, posters, and how it all fits together over time."
  },
  {
    title: "Looking to Buy a Smart TV?",
    slug: "why-deckoviz-dasp-is-the-last-screen",
    description:
      "Why Deckoviz DASP might be the last screen you’ll ever need. A grounded comparison explaining why Deckoviz replaces more than ads."
  },
  {
    title: "A Day in the Life With Deckoviz",
    slug: "a-day-in-the-life-with-deckoviz",
    description:
      "A narrative walkthrough of how different people actually use Deckoviz across a full day   from morning rituals to evening wind-down."
  },
  {
    title: "A Portal to Your Inner Worlds",
    slug: "a-portal-to-your-inner-worlds",
    description:
      "Exploring Deckoviz as a space for reflection, imagination, journaling, dreams, and inner life   not productivity theatre."
  },
  {
    title: "When Walls Stop Repeating Themselves",
    slug: "when-walls-stop-repeating-themselves",
    description:
      "Why static art and frozen frames quietly fail over time   and what changes when your walls are allowed to evolve."
  },
  {
    title: "Dynamic Posters, Moodboards, and Vision Boards",
    slug: "dynamic-posters-moodboards-and-vision-boards",
    description:
      "How posters become living signals for intention, memory, focus, and emotional alignment."
  },
  {
    title: "Designed for Humans. Not Feeds.",
    slug: "designed-for-humans-not-feeds",
    description:
      "The philosophy behind building something deliberately anti-scroll, anti-notification, and anti-algorithmic anxiety."
  },
  {
    title: "What If Your Home Had a Nervous System?",
    slug: "what-if-your-home-had-a-nervous-system",
    description:
      "A simple explanation of how Deckoviz becomes time-aware, mood-aware, and context-aware   without dashboards or micromanagement."
  },
  {
    title: "A Frame That’s Never Finished",
    slug: "a-frame-thats-never-finished",
    description:
      "Why Deckoviz is built as a platform that keeps evolving, learning, and growing with you long after it’s on your wall."
  }
];

/* ===== Card UI ===== */
const icons = [Brain, Home, Sparkles, BookOpen, ImageIcon, Leaf, MessageSquare, Frame, Palette, Heart, Clock, Wand2];

const ReadingCard = ({ title, description, slug, index }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${slug}`)}
      className="group relative rounded-2xl p-8 pt-14 bg-gradient-to-br from-teal-50/95 to-cyan-50/95 backdrop-blur-xl border border-teal-200/60
      shadow-[0_0_25px_rgba(37,99,235,0.25)]
      hover:shadow-[0_0_45px_rgba(37,99,235,0.45)]
      hover:scale-[1.03] transition-all duration-500 cursor-pointer"
    >

      {/* Icon Badge */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#2563EB] to-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_8px_16px_rgba(37,99,235,0.25)] border-[3px] border-white/90 group-hover:-translate-y-1 group-hover:shadow-[0_12px_24px_rgba(37,99,235,0.4)] group-hover:rotate-3 transition-all duration-500">
        {React.createElement(icons[index % icons.length], { className: "w-6 h-6 text-white" })}
      </div>

      <h3 className="text-xl font-bold mb-3 text-[#2563EB] group-hover:text-blue-800 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
/* ===== Page ===== */

export default function CoreReading() {
    const navigate = useNavigate();
const [sparks, setSparks] = useState<Spark[]>([]);
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (Math.random() > 0.5) return;

    setSparks(prev => [
      ...prev,
      ...Array.from({ length: 6 }).map(() => ({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 6,
        color: ["#ffffff","#facc15","#a855f7","#ec4899","#38bdf8"][
          Math.floor(Math.random() * 5)
        ],
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
      }))
    ]);

    setTimeout(() => {
      setSparks(prev => prev.slice(6));
    }, 600);
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);


  return (
    
    
    <section className="min-h-screen px-6 py-24 relative overflow-hidden
      bg-gradient-to-br from-teal-50 via-teal-100/40 to-cyan-50">

    <div className="pointer-events-none fixed inset-0 z-50">
  {sparks.map(spark => (
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
        transform: `translate(${spark.dx}px, ${spark.dy}px)`
      }}
    />
  ))}
</div>


      {/* Glow blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif italic text-gray-900 relative inline-block font-medium">
            <span className="relative z-10">Core Reading</span>
            <span className="absolute bottom-2 left-[-10px] right-[-10px] h-4 bg-teal-300/80 -z-10 -rotate-2 rounded-sm" />
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            These aren’t meant to be read all at once.  
            They’re meant to be dipped into, bookmarked, returned to.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {coreReadings.map((item, i) => (
  <ReadingCard key={i} index={i} {...item} />
))}

        </div>

        {/* Icon Divider */}
        <div className="flex justify-center mb-8 mt-4">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-[#2563EB] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.25)] border-4 border-white/80">
            <BookMarked className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-700 max-w-xl mx-auto font-medium">
          If Deckoviz resonates, you’ll feel it somewhere between the words.
        </p>
        
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 px-8 py-3.5 font-bold text-white bg-gradient-to-r from-[#2563EB] to-indigo-600 rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.45)] hover:-translate-y-1 transition-all duration-300 group"
          >
            Explore the Deckoviz Journal
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>


      </div>
      
    </section>
    
  );
  
}
