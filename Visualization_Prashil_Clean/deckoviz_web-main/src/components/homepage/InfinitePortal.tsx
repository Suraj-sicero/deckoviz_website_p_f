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

const content: React.ReactNode[] = [
  "Some things in life are meant to be completed.",
  "A painting. A book. A room.",
  "",
  <span className="font-bold text-white">Deckoviz is not one of them.</span>,
  "",
  "Deckoviz is a doorway.",
  "A living portal.",
  "A frame that keeps opening, and opening, and opening again.",
  "",
  "You don’t buy Deckoviz at version 1.",
  "You step into a system that keeps becoming.",
  "",
  "A system that grows as you grow.",
  "That changes as your life changes.",
  "That deepens as your stories deepen.",
  "",
  <span className="font-semibold text-blue-200">Every week, something new arrives.</span>,
  "New art.",
  "New music.",
  "New visual forms you did not know were possible.",
  "New ways to turn photos into living memories.",
  "New modes for calm, wonder, play, focus, love.",
  "New rituals.",
  "New games.",
  "New experiences.",
  "New little pieces of magic that quietly find their place in your home.",
  "",
  "Not once a year.",
  "Not behind big upgrades.",
  <span className="font-bold text-blue-300">Every week.</span>,
  "",
  "Deckoviz is not shipped as a finished product.",
  "It is shipped as a beginning.",
  "",
  <span className="font-medium italic text-indigo-200">Because a living thing should never be done.</span>,
  "",
  <><span className="font-bold text-blue-300">Vizzy</span>, the intelligence behind Deckoviz, grows with you.</>,
  "It learns your rhythms.",
  "Your mornings and nights.",
  "Your celebrations and quiet days.",
  "Your taste in beauty.",
  "Your way of remembering.",
  "Your way of dreaming.",
  "",
  "Over time, it stops feeling like software.",
  <span className="font-bold text-white">It starts feeling like presence.</span>,
  "",
  "This is our promise:",
  <span className="font-bold text-blue-300 uppercase tracking-wider">high velocity, always.</span>,
  "",
  "Deckoviz evolves in public, with you.",
  "",
  "This is why a Deckoviz frame is never finished.",
  "Because your life is not finished.",
  "",
  <span className="text-lg font-semibold text-white">A portal of infinite goodness.</span>,
  "Of endless memories and wonders.",
  "Of small, human moments turned into living art.",
  "",
  "Not a product you outgrow.",
  "A companion you grow into.",
  "",
  <span className="font-bold text-blue-200">A frame that, gently, beautifully, will never be finished.</span>,
];

const InfinitePortal: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  // Calm mouse tracker (premium + non-distracting)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.65) return;

      setSparks((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 4,
          color: ["#a855f7", "#6366f1", "#38bdf8"][Math.floor(Math.random() * 3)],
          dx: (Math.random() - 0.5) * 8,
          dy: (Math.random() - 0.5) * 8,
        },
      ]);

      setTimeout(() => {
        setSparks((prev) => prev.slice(1));
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="
        relative min-h-screen w-full overflow-hidden
        px-6 py-20 md:py-28
        bg-gradient-to-br from-[#182A4A] via-[#1E3A8A] to-[#2563EB]
      "
    >
      {/* Soft 3D blob background (like ref image) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[50px]" />
        <div className="absolute top-12 left-32 h-[220px] w-[220px] rounded-full bg-cyan-300/20 blur-[50px]" />
        <div className="absolute bottom-[-110px] right-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-[70px]" />

        {/* subtle grid dots like design */}
        <div className="absolute right-16 top-20 hidden md:block">
          <div className="grid grid-cols-4 gap-2 opacity-40">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/50" />
            ))}
          </div>
        </div>

        {/* soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#182A4A]/40 via-transparent to-[#182A4A]/20" />
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
              opacity: 0.75,
            }}
          />
        ))}
      </div>

      {/* Glass circle container like ref image */}
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-center">
        <div className="relative w-full max-w-5xl">
          {/* big glass circle */}
          <div
            className="
              relative mx-auto
              w-full max-w-[980px]
              rounded-[800px]
              border border-white/20
              bg-white/10
              backdrop-blur-3xl
              shadow-[0_40px_120px_rgba(0,0,0,0.5)]
              px-8 py-16 md:px-16 md:py-20
            "
          >
            {/* inner shine ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[999px] border border-white/20" />
            <div className="pointer-events-none absolute inset-0 rounded-[999px] bg-gradient-to-b from-white/10 via-transparent to-[#182A4A]/20" />

            {/* Header */}
            <div className="text-center">
              <h1
                className="
                  text-2xl md:text-2xl font-extrabold tracking-tight
                  text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]
                "
              >
A Portal of Infinite Goodness,
<br/>
 Endless Memories, 
 <br/>
 and a Frame That Will Never Be Finished
              </h1>


            </div>

            {/* Text body */}
            <div className="mt-12 flex flex-col items-center justify-center text-center">
              {content.map((line, i) => (
                line === "" ? (
                  <div key={i} className="h-6 w-full" />
                ) : (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, duration: 0.5 }}
                    className="
                      text-white/95 font-medium text-[15px] md:text-[16px]
                      leading-relaxed drop-shadow-sm mb-1
                    "
                  >
                    {line}
                  </motion.p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default InfinitePortal;
