"use client";

import React, { useEffect, useRef } from "react";

const manifesto = [
  "Not just homes that look good in photos.",
  "Homes that feel good when you live in them.",

  "Homes that hold laughter in the walls.",
  "And quiet in the corners.",
  "Homes that remember who you are, and make space for who you’re becoming.",

  "Deckoviz is designed for…",

  "Homes where memories are cherished, and self-expression is nurtured.",
  "Where photos are not buried in clouds, but live on the walls.",
  "Where stories are replayed gently   as art, as montages, as moments that matter.",

  "Homes where art, wonder, beauty, and depth are prioritized.",
  "Not as décor.",
  "As daily nourishment.",
  "Where walls surprise you, move you, slow you down.",

  "Homes where conversations matter.",
  "Where dinners turn into stories.",
  "Where visuals spark questions, laughter, reflection.",
  "Where the room itself invites people to connect.",

  "Homes where kids create.",
  "Where drawings become paintings.",
  "Stories become worlds.",
  "And imagination is taken seriously.",

  "Homes where silence is respected.",
  "Where nothing blinks for attention.",
  "Where beauty can simply be there.",
  "Where calm is not empty, but full.",

  "Homes where growth is intentional.",
  "Where visions live on the wall.",
  "Where rituals shape mornings and evenings.",
  "Where becoming is part of the design.",

  "Homes that feel lived in, not staged.",
  "Not perfect.",
  "Not frozen.",
  "Warm, human, evolving.",
  "With traces of real life everywhere.",

  "Homes where depth, alignment, conversation, and beauty are cherished.",
  "Where what you care about shows up in the space you live in.",
  "Every day.",

  "Homes that feel alive.",
  "Dynamic, changing with moods, seasons, light, and life.",
  "Not static.",
  "Not passive.",
  "Never dull.",

  "This is what Deckoviz is for.",

  "Because Deckoviz is not just a frame on your wall.",
  "It becomes a signature of your taste.",
  "A reflection of your values.",
  "A quiet declaration of what matters to you.",

  "It says:",
  "Beauty matters here.",
  "Meaning matters here.",
  "People matter here.",

  "Your home already tells a story.",
  "Deckoviz helps it tell your story.",

  "A home that feels alive.",
  "A home that grows with you.",
  "A home that means something.",
];

const HomeMeansSomething: React.FC = () => {
  const sparkLayer = useRef<HTMLDivElement>(null);

  /* Mouse particles (theme match: cyan + purple + pink) */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;
      if (Math.random() > 0.7) return;

      const dot = document.createElement("span");
      dot.className = "theme-spark";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const colors = ["#67e8f9", "#a78bfa", "#fb7185"];
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
        bg-gradient-to-br from-[#53bdd5] via-[#a08edc] to-[#f2a1c5]
      "
    >
      {/* Mouse Spark Layer */}
      <div ref={sparkLayer} className="absolute inset-0 pointer-events-none z-20" />

      {/* Background fog */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/30 blur-[75px]" />
        <div className="absolute top-20 left-28 h-[360px] w-[360px] rounded-full bg-purple-200/35 blur-[85px]" />
        <div className="absolute -top-20 right-0 h-[520px] w-[520px] rounded-full bg-sky-200/35 blur-[90px]" />
        <div className="absolute -bottom-40 left-10 h-[520px] w-[520px] rounded-full bg-pink-200/35 blur-[95px]" />
      </div>

      {/* Floating translucent shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-16 top-24 h-[220px] w-[220px] rounded-full bg-white/25 blur-[1px]" />
        <div className="absolute left-[45%] top-24 h-[90px] w-[90px] rounded-full bg-white/20 blur-[1px]" />
        <div className="absolute left-24 top-[52%] h-[120px] w-[120px] rotate-12 rounded-[36px] bg-white/15 blur-[2px]" />
        <div className="absolute right-20 top-[38%] h-[130px] w-[130px] rounded-full bg-white/18 blur-[2px]" />
        <div className="absolute right-28 top-40 h-[55px] w-[55px] rounded-full bg-pink-400/40 blur-[0.5px]" />
      </div>

      {/* Glass manifesto card */}
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
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          For Homes That Mean Something
        </h1>

        {/* Manifesto */}
        <div className="space-y-4 text-center">
          {manifesto.map((line, index) => (
            <p
              key={index}
              className={`text-slate-800/90 ${
                line.length < 30 ? "text-lg font-semibold" : "text-base opacity-90"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Inline styles */}
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
            to { transform: scale(3.2); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default HomeMeansSomething;
