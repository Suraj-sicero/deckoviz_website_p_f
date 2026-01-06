"use client";

import React, { useEffect, useRef } from "react";

const manifesto = [
  "Some people want more screens.",
  "Some want fewer things.",
  "Better things.",

  "Deckoviz is for the second kind.",

  "It is the one screen that earns its place.",
  "Not because it does more.",
  "Because it replaces more.",

  "One frame, where many used to be.",
  "The prints you kept changing.",
  "The photos you never framed.",
  "The mood board on your wall.",
  "The TV that dominated the room.",
  "The posters, clocks, reminders, notes.",

  "Deckoviz gathers them into one quiet presence.",
  "A single surface.",
  "A thousand possibilities.",

  "Art when you want beauty.",
  "Photos when you want memory.",
  "A vision board when you want direction.",
  "A story when you want warmth.",
  "A calm canvas when you want nothing at all.",
  "And yes, your Smart TV, when you want to watch.",

  "No clutter.",
  "No visual noise.",
  "No stack of frames competing for attention.",

  "Just one object.",
  "Always right.",

  "For minimalists, space is not empty.",
  "It is intentional.",
  "Every object has to justify itself.",
  "Every line has to matter.",

  "Deckoviz does.",

  "With its thin, handcrafted wooden frame.",
  "With synced halo backlights that glow only when they should.",
  "With visuals that change instead of piling up.",
  "With intelligence that adapts instead of demanding.",

  "It lets you own less.",
  "But live with more.",

  "More beauty.",
  "More meaning.",
  "More variety.",
  "More life.",

  "You do not decorate around Deckoviz.",
  "You let it become the calm center of the room.",

  "One frame.",
  "One screen.",
  "One quiet companion.",

  "If you were to keep just one screen in your home,",
  "make it the one that replaces all the others.",

  "The one that evolves.",
  "The one that disappears when it should.",
  "The one that earns its place, every single day."
];

const MinimalistScreen: React.FC = () => {
  const sparkLayer = useRef<HTMLDivElement>(null);

  /* ⭐ Neon-green STAR mouse sparks */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;

      const spark = document.createElement("span");
      spark.className = "neon-star";
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;

      sparkLayer.current.appendChild(spark);
      setTimeout(() => spark.remove(), 1200);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center px-6
        bg-gradient-to-br from-[#ecfdf3] via-[#f0fdf4] to-[#e7fbe9]
        overflow-hidden
      "
    >
      {/* ⭐ Stars */}
<div
  ref={sparkLayer}
  className="fixed inset-0 pointer-events-none z-50"
/>


      {/* 🪟 Pale Green Glass Card */}
      <div
        className="
          relative z-10
          max-w-4xl
          rounded-3xl
          px-8 py-12 md:px-14 md:py-16
          backdrop-blur-xl
          bg-[#e6f7ec]/70
          border border-[#86efac]/60
          shadow-[0_0_40px_rgba(34,197,94,0.25)]
          animate-neon-breathe
        "
      >
        {/* 🌿 Neon Heading */}
        <h1
          className="
            text-3xl md:text-5xl mb-12 text-center
            font-semibold tracking-wide
            text-[#14532d]
            neon-text
          "
        >
          IF THIS IS THE ONLY SCREEN YOU KEEP
        </h1>

        {/* 📜 Manifesto */}
        <div className="space-y-4 text-center">
          {manifesto.map((line, index) => (
            <p
              key={index}
              className={`
                text-[#14532d]
                leading-relaxed
                ${
                  line.length < 30
                    ? "text-lg font-medium"
                    : "text-base opacity-90"
                }
              `}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* 🎨 Inline styles */}
      <style>
        {`
          .neon-text {
            text-shadow:
              0 0 6px rgba(34,197,94,0.5),
              0 0 14px rgba(34,197,94,0.4),
              0 0 28px rgba(34,197,94,0.25);
          }

          .neon-star {
            position: absolute;
            width: 12px;
height: 12px;

            background: #22c55e;
            clip-path: polygon(
              50% 0%,
              61% 35%,
              100% 50%,
              61% 65%,
              50% 100%,
              39% 65%,
              0% 50%,
              39% 35%
            );
            box-shadow:
  0 0 8px #22c55e,
  0 0 18px #22c55e,
  0 0 32px #22c55e;
            pointer-events: none;
            animation: star-fade 1.2s ease-out forwards;
          }

          @keyframes star-fade {
            0% {
              transform: scale(0.8) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: scale(3) rotate(45deg);
              opacity: 0;
            }
          }

          @keyframes neon-breathe {
            0% {
              box-shadow: 0 0 28px rgba(34,197,94,0.25);
            }
            50% {
              box-shadow: 0 0 48px rgba(34,197,94,0.45);
            }
            100% {
              box-shadow: 0 0 28px rgba(34,197,94,0.25);
            }
          }

          .animate-neon-breathe {
            animation: neon-breathe 5s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default MinimalistScreen;
