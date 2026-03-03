import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
const emojis = ["🧠","🏡","✨","📘","🖼️","🌿","💭","🪟","🎨","🧘","⏳","🪄"];

const ReadingCard = ({ title, description, slug, index }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${slug}`)}
      className="group relative rounded-2xl p-8 pt-14 bg-white/60 backdrop-blur-xl border border-white/30
      shadow-[0_20px_40px_rgba(168,85,247,0.15)]
      hover:shadow-[0_30px_60px_rgba(168,85,247,0.25)]
      hover:scale-105 transition-all duration-500 cursor-pointer"
    >

      {/* Emoji */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">
        {emojis[index % emojis.length]}
      </div>

      <h3 className="text-xl font-bold mb-3 text-gray-900
        group-hover:bg-gradient-to-r group-hover:from-purple-600
        group-hover:to-pink-500 group-hover:bg-clip-text
        group-hover:text-transparent transition-all">
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
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

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
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-400/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900">
            Core Reading
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

        {/* Emoji Divider */}
        <div className="text-center text-5xl mb-12">
          📖
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-700 max-w-xl mx-auto">
          If Deckoviz resonates, you’ll feel it somewhere between the words.
        </p>
<p
  onClick={() => navigate("/blog")}
  className="text-center mt-4 font-semibold text-purple-600 cursor-pointer hover:underline"
>
  → Explore the Deckoviz Journal
</p>


      </div>
      
    </section>
    
  );
  
}
