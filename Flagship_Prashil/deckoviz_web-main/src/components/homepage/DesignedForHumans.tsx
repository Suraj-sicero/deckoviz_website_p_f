"use client";

import React, { useEffect, useRef } from "react";

const DesignedForHumans: React.FC = () => {
  const sparkLayer = useRef<HTMLDivElement>(null);

  // Mouse sparks (cyan/sky/teal theme)
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;
      if (Math.random() > 0.7) return;

      const dot = document.createElement("span");
      dot.className = "theme-spark";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const colors = ["#22d3ee", "#38bdf8", "#2dd4bf"]; // cyan / sky / teal
      const picked = colors[Math.floor(Math.random() * colors.length)];
      dot.style.background = picked;
      dot.style.boxShadow = `0 0 18px ${picked}`;

      sparkLayer.current.appendChild(dot);
      setTimeout(() => dot.remove(), 1100);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center px-6 py-20
        overflow-hidden
        bg-gradient-to-br from-[#7be7ff] via-[#9fe7ff] to-[#b9fff6]
      "
    >
      {/* Mouse sparks layer */}
      <div ref={sparkLayer} className="absolute inset-0 pointer-events-none z-20" />

      {/* Background fog */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />

        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/30 blur-[75px]" />
        <div className="absolute top-20 left-28 h-[360px] w-[360px] rounded-full bg-cyan-200/35 blur-[85px]" />
        <div className="absolute -top-20 right-0 h-[520px] w-[520px] rounded-full bg-sky-200/35 blur-[90px]" />
        <div className="absolute -bottom-40 left-10 h-[520px] w-[520px] rounded-full bg-teal-200/35 blur-[95px]" />
      </div>

      {/* Floating translucent shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-16 top-24 h-[220px] w-[220px] rounded-full bg-white/25 blur-[1px]" />
        <div className="absolute left-[45%] top-24 h-[90px] w-[90px] rounded-full bg-white/20 blur-[1px]" />
        <div className="absolute left-24 top-[52%] h-[120px] w-[120px] rotate-12 rounded-[36px] bg-white/15 blur-[2px]" />
        <div className="absolute right-20 top-[38%] h-[130px] w-[130px] rounded-full bg-white/18 blur-[2px]" />
        <div className="absolute right-24 top-44 h-[55px] w-[55px] rounded-full bg-cyan-300/50 blur-[0.5px]" />
      </div>

      {/* Glass card */}
      <div
        className="
          relative z-10
          w-full max-w-4xl
          rounded-[26px]
          px-10 md:px-16 py-14 md:py-16
          bg-white/18 backdrop-blur-[22px]
          border border-white/35
          shadow-[0_60px_160px_rgba(0,0,0,0.14)]
        "
      >
        {/* subtle glass overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/25" />
        <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-b from-white/25 via-transparent to-white/10" />

        {/* Top dots */}
        <div className="mb-8 flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        </div>

        {/* Heading */}
        <h1
          className="
            text-center mb-12
            text-3xl md:text-5xl font-extrabold tracking-tight
            text-slate-900/90
          "
        >
          Designed for Humans, Not Attention
        </h1>

        {/* Content */}
        <div className="space-y-6 text-slate-800/90 text-[16px] leading-relaxed">
          <p>
            Deckoviz was not built to shout. It does not blink red. It does not
            buzz. It does not beg.
          </p>

          <p>
            It waits. Not in your pocket. Not in your hand. On your wall. In your
            space. In the background of your life, where the best things usually
            are.
          </p>

          <p>
            Deckoviz does not demand your attention. It earns it, softly. And
            often, it does its best work when you barely notice it at all.
          </p>

          <p>
            We live in a world of scrolls and pings. Of feeds that never end. Of
            algorithms that tug at your sleeve every few seconds, whispering,
            just one more. A world designed to keep you hooked, hurried, and
            half-present.
          </p>

          <p className="font-semibold text-slate-900/90">
            Deckoviz is a quiet rebellion against that.
          </p>

          <p>Anti-scroll. Anti-notification. Anti-algorithmic anxiety.</p>

          <p>
            A screen that refuses to become a feed. An intelligence that does
            not chase your dopamine. A presence that does not compete for your
            mind.
          </p>

          <p>Instead, it brings back what we have been losing.</p>

          <p>
            Beauty that lingers. Moments that breathe. Rituals that anchor.
            Spaces that feel sacred again.
          </p>

          <p>
            Deckoviz is for slow mornings. For long evenings. For the pause
            between things. For the glance that makes you smile without knowing
            why.
          </p>

          <p>
            It is a statement against the slop. Against endless, shallow
            consumption. Against the treadmill of fast, forgettable content.
            Against the idea that every screen must shout to matter.
          </p>

          <p>
            Here, art evolves. Light softens. Music drifts in, then out. Your
            memories glow for a while, then make space for new ones.
          </p>

          <p>No feeds. No likes. No pressure to keep up.</p>

          <p>Just a living canvas, quietly keeping you company.</p>

          <p>
            We built Deckoviz to bring back intention to homes. To make walls
            mean something again. To turn rooms into places you want to linger
            in. To help you design days with more depth, more calm, more wonder.
          </p>

          <p>
            This is intelligence that respects your attention. That knows when
            to speak. And when to stay beautifully silent.
          </p>

          <p className="font-semibold text-slate-900/90">
            Because the future of technology, at its best, does not pull you
            away from life. It gently brings you back to it.
          </p>
        </div>
      </div>

      {/* Inline spark styles */}
      <style>
        {`
          .theme-spark {
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            opacity: 0.8;
            animation: sparkFade 1.1s ease-out forwards;
          }

          @keyframes sparkFade {
            from { transform: scale(1); opacity: 0.85; }
            to { transform: scale(3.1); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default DesignedForHumans;
