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
  "Where stories are replayed gently — as art, as montages, as moments that matter.",

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
  "A home that means something."
];
const HomeMeansSomething: React.FC = () => {
  const sparkLayer = useRef<HTMLDivElement>(null);

  /* 🌸 Soft pink mouse particles */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;

      const dot = document.createElement("span");
      dot.className = "pink-spark";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      sparkLayer.current.appendChild(dot);
      setTimeout(() => dot.remove(), 1200);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center px-6
        bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50
        overflow-hidden
      "
    >
      {/* Floating particles */}
      <div ref={sparkLayer} className="absolute inset-0 pointer-events-none z-0" />

      {/* Glass manifesto card */}
      <div
        className="
          relative z-10
          max-w-4xl
          rounded-3xl
          px-8 py-14 md:px-14
          bg-white/70 backdrop-blur-xl
          border border-pink-300/60
          shadow-[0_30px_80px_rgba(236,72,153,0.25)]
        "
      >
        {/* Heading */}
        <h1
          className="
            text-center mb-12
            text-3xl md:text-5xl font-semibold tracking-wide
            bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500
            bg-clip-text text-transparent
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
              className={`text-gray-700 ${
                line.length < 30
                  ? "text-lg font-medium"
                  : "text-base opacity-90"
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
          .pink-spark {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(236,72,153,0.7);
            box-shadow: 0 0 10px rgba(236,72,153,0.6);
            animation: sparkFade 1.2s ease-out forwards;
          }

          @keyframes sparkFade {
            from { transform: scale(1); opacity: 1; }
            to { transform: scale(3); opacity: 0; }
          }

          @keyframes softFloat {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          .animate-soft-float {
            animation: softFloat 6s ease-in-out infinite;
          }
            
  @keyframes softFloatInner {
    0% { transform: translateY(0); }
    50% { transform: translateY(-14px); }
    100% { transform: translateY(0); }
  }

  .animate-soft-float-inner {
    animation: softFloatInner 7s ease-in-out infinite;
  }
    @keyframes glowBreathe {
  0% { box-shadow: 0 30px 80px rgba(236,72,153,0.18); }
  50% { box-shadow: 0 40px 100px rgba(236,72,153,0.32); }
  100% { box-shadow: 0 30px 80px rgba(236,72,153,0.18); }
}

.animate-glow-breathe {
  animation: glowBreathe 6s ease-in-out infinite;
}

        `}
      </style>
    </section>
  );
};

export default HomeMeansSomething;
