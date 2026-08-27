"use client";

import React from "react";

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

  "Deckoviz does."
];

const ForHomesThatMeanSomething: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden" style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}>
      {/* Enterprise Indigo Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99,102,241,0.22)" }} />
        <div className="absolute top-[30%] right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37,99,235,0.18)" }} />
        <div className="absolute bottom-[-60px] left-[20%] w-[700px] h-[350px] rounded-full blur-[120px]" style={{ background: "rgba(79,70,229,0.14)" }} />
      </div>
      <div
        className="relative z-10 max-w-3xl rounded-3xl px-8 py-12 md:px-14 md:py-16"
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.45)",
          borderTop: "1px solid rgba(255,255,255,0.75)",
          boxShadow: "0 20px 60px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.65)"
        }}
      >
        {/* Heading */}
        <h1
          className="
            text-3xl md:text-5xl mb-10 text-center
            font-semibold tracking-wide
            bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500
            bg-clip-text text-transparent
          "
        >
          For Homes That Mean Something
        </h1>

        {/* Manifesto */}
        <div className="space-y-4 text-center">
          {manifesto.map((line, index) => (
            <p
              key={index}
              className={`text-gray-700 leading-relaxed ${
                line.length < 30 ? "text-lg font-medium" : "text-base"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForHomesThatMeanSomething;
