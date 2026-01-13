"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
};

const content = [
  "Your life is not a folder.",
  "It is not a timeline.",
  "It is not a grid of tiny squares you scroll past in a hurry.",

  "It is a living thing.",
  "Seasons. Faces. Rooms. Light.",
  "Moments that keep changing shape as you carry them forward.",

  "Deckoviz was built to live with your memories, not to trap them.",

  "Photos become evolving art.",
  "A summer afternoon softens into brushstrokes.",
  "A birthday smile glows like a painting.",
  "A quiet evening turns into something that feels more like a feeling than an image.",

  "Your memories breathe.",
  "They move.",
  "They grow with you.",

  "Not everything needs to be archived.",
  "Some things deserve to be lived with.",

  "Vizzy, your companion, learns what matters.",
  "It remembers without being told.",
  "Anniversaries. Birthdays. Holidays. Firsts.",

  "And on those days, without a reminder, your wall changes.",

  "A wedding photo returns on its own, not as a pop-up, but as a warm presence.",
  "A childhood picture surfaces when the house feels like family.",
  "A travel memory appears when the rain hits the window just right.",

  "No digging.",
  "No searching.",
  "No “remember this?” notifications.",

  "Just the right memory, at the right moment.",

  "You can keep your photos just as they are.",
  "Honest. Raw. Real.",

  "Or you can let them transform.",
  "Into watercolours.",
  "Into cinematic scenes.",
  "Into dreamlike interpretations in your favourite styles.",

  "Your life, retold through art, without losing its truth.",

  "Deckoviz does not flood you with the past.",
  "It does not drown you in nostalgia.",

  "It lets memories arrive like guests.",
  "Gently.",
  "One at a time.",
  "When they have something to say.",

  "A season of your life might play out over weeks.",
  "A few moments in the morning.",
  "A different one in the evening.",
  "Then it fades, making room for what’s next.",

  "Because memories are not meant to be hoarded.",
  "They are meant to keep you company.",

  "This is not about saving everything.",
  "It is about honoring what shaped you.",

  "About letting your walls whisper,",
  "“You were here. You lived this. And it mattered.”",

  "Your life,",
  "played back gently.",
];

const YourLifePlayedBackGently: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.65) return;

      setSparks((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 7 + 4,
          color: ["#34d399", "#a3e635", "#facc15"][Math.floor(Math.random() * 3)],
          dx: (Math.random() - 0.5) * 8,
          dy: (Math.random() - 0.5) * 8,
        },
      ]);

      setTimeout(() => {
        setSparks((prev) => prev.slice(1));
      }, 900);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      className="
        relative min-h-screen w-full overflow-hidden
        flex items-center justify-center
        px-6 py-20 md:py-28
        bg-gradient-to-br from-[#d9f99d] via-[#a7f3d0] to-[#bfdbfe]
      "
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />

        <div className="absolute -top-24 -left-24 h-[340px] w-[340px] rounded-full bg-emerald-200/40 blur-[40px]" />
        <div className="absolute -top-16 -left-10 h-[170px] w-[170px] rounded-full bg-lime-200/45 blur-[35px]" />

        <div className="absolute -top-16 right-10 h-[280px] w-[280px] rounded-full bg-yellow-100/50 blur-[45px]" />
        <div className="absolute top-24 right-44 h-[160px] w-[160px] rounded-full bg-emerald-100/50 blur-[35px]" />

        <div className="absolute -bottom-20 left-10 h-[240px] w-[240px] rounded-full bg-teal-200/45 blur-[45px]" />
        <div className="absolute -bottom-24 right-8 h-[320px] w-[320px] rounded-full bg-lime-100/45 blur-[55px]" />

        {/* Dots */}
        <div className="absolute left-12 top-16 hidden md:block">
          <div className="grid grid-cols-4 gap-2 opacity-60">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/70" />
            ))}
          </div>
        </div>

        <div className="absolute right-14 bottom-16 hidden md:block">
          <div className="grid grid-cols-4 gap-2 opacity-60">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/70" />
            ))}
          </div>
        </div>
      </div>

      {/* Mouse sparks */}
      <div className="pointer-events-none fixed inset-0 z-40">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="absolute rounded-full"
            style={{
              left: spark.x,
              top: spark.y,
              width: spark.size,
              height: spark.size,
              background: spark.color,
              boxShadow: `0 0 18px ${spark.color}`,
              transform: `translate(${spark.dx}px, ${spark.dy}px)`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Main glass panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.05, ease: "easeOut" }}
        className="
          relative z-10
          w-full max-w-5xl
          rounded-[34px]
          bg-white/22 backdrop-blur-2xl
          border border-white/40
          shadow-[0_45px_140px_rgba(16,185,129,0.22)]
          px-10 md:px-16 py-14 md:py-16
        "
      >
        <div className="pointer-events-none absolute inset-0 rounded-[34px] border border-white/25" />
        <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-b from-white/30 via-transparent to-white/10" />

        {/* Title + Subtitle CENTER */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Your Life,
            <br/>
             Played Back Gently
          </h1>

        </div>

        {/* CONTENT CENTER + DARKER TEXT */}
        <div className="mt-12 space-y-4 text-center text-slate-800 text-[15px] md:text-[16px] leading-relaxed">
          {content.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02, duration: 0.45 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default YourLifePlayedBackGently;
