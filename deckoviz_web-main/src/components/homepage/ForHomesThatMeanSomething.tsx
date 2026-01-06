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
    <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-[#f8fafc] via-[#faf7ff] to-[#ffffff]">
      <div
        className="
          max-w-3xl
          rounded-3xl
          px-8 py-12 md:px-14 md:py-16
          bg-white/70 backdrop-blur-xl
          border border-purple-200/50
          shadow-[0_30px_80px_rgba(124,58,237,0.18)]
        "
      >
        {/* Heading */}
        <h1
          className="
            text-3xl md:text-5xl mb-10 text-center
            font-semibold tracking-wide
            bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500
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
