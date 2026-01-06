"use client";

import React from "react";

const DesignedForHumans: React.FC = () => {
  return (
    <section
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-cyan-50 via-sky-50 to-teal-50
        px-6 py-24
      "
    >
      <div
        className="
          max-w-3xl
          rounded-3xl
          bg-white/70 backdrop-blur-xl
          border border-cyan-200/60
          px-10 md:px-14 py-16
          shadow-[0_30px_90px_rgba(34,211,238,0.25)]
        "
      >
        {/* Heading */}
        <h1
          className="
            text-3xl md:text-4xl font-semibold mb-10 text-center
            bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500
            bg-clip-text text-transparent
          "
        >
          Designed for Humans, Not Attention
        </h1>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-[17px] leading-relaxed">
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

          <p className="font-medium text-gray-800">
            Deckoviz is a quiet rebellion against that.
          </p>

          <p>
            Anti-scroll. Anti-notification. Anti-algorithmic anxiety.
          </p>

          <p>
            A screen that refuses to become a feed. An intelligence that does
            not chase your dopamine. A presence that does not compete for your
            mind.
          </p>

          <p>
            Instead, it brings back what we have been losing.
          </p>

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

          <p>
            No feeds. No likes. No pressure to keep up.
          </p>

          <p>
            Just a living canvas, quietly keeping you company.
          </p>

          <p>
            We built Deckoviz to bring back intention to homes. To make walls
            mean something again. To turn rooms into places you want to linger
            in. To help you design days with more depth, more calm, more wonder.
          </p>

          <p>
            This is intelligence that respects your attention. That knows when
            to speak. And when to stay beautifully silent.
          </p>

          <p className="font-medium text-gray-800">
            Because the future of technology, at its best, does not pull you
            away from life. It gently brings you back to it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DesignedForHumans;
