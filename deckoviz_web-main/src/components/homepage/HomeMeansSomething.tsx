"use client";

import React, { useEffect, useRef } from "react";

const manifesto = ["",

"If This Is the Only Screen You Keep - For the Minimalists",

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

"",

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
"The one that earns its place, every single day.",
];

const HomeMeansSomething: React.FC = () => {
  const sparkLayer = useRef<HTMLDivElement>(null);
const [visibleLines, setVisibleLines] = React.useState(0);
const [typedText, setTypedText] = React.useState("");
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
  useEffect(() => {
  if (visibleLines >= manifesto.length) return;

  let charIndex = 0;
  const currentLine = manifesto[visibleLines];

  const typing = setInterval(() => {
    charIndex++;
    setTypedText(currentLine.slice(0, charIndex));

    if (charIndex >= currentLine.length) {
      clearInterval(typing);

      setTimeout(() => {
        setTypedText("");
        setVisibleLines((prev) => prev + 1);
      }, 700);
    }
  }, 20);

  return () => clearInterval(typing);
}, [visibleLines]);


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
          If This Is the Only Screen You Keep - For the Minimalists
        </h1>

        {/* Manifesto */}
        <div className="space-y-4 text-center">
          {manifesto.slice(0, visibleLines).map((line, index) => (
  <p
    key={index}
    className={`text-slate-800/90 ${
      line.length < 30 ? "text-lg font-semibold" : "text-base opacity-90"
    }`}
  >
    {line}
  </p>
))}

{visibleLines < manifesto.length && (
  <p
    className={`text-slate-800/90 ${
      manifesto[visibleLines].length < 30
        ? "text-lg font-semibold"
        : "text-base opacity-90"
    }`}
  >
    {typedText}
    <span className="animate-pulse">|</span>
  </p>
)}
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
