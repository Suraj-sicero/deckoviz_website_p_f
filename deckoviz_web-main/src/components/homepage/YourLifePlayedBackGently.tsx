"use client";

import React from "react";
import { motion } from "framer-motion";

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
  "played back gently."
];

const YourLifePlayedBackGently: React.FC = () => {
  return (
    <section className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br from-rose-50 via-pink-50 to-red-50
      px-6 py-24
    ">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          max-w-4xl w-full
          rounded-3xl
          bg-white/70 backdrop-blur-xl
          border border-rose-200/60
          px-10 md:px-16 py-16
          shadow-[0_40px_120px_rgba(244,63,94,0.25)]
        "
      >
        <h1 className="
          text-3xl md:text-4xl font-semibold mb-12 text-center
          bg-gradient-to-r from-rose-500 via-red-500 to-pink-500
          bg-clip-text text-transparent
        ">
          Your Life, Played Back Gently
        </h1>

        <div className="space-y-4 text-gray-700 text-[17px] leading-relaxed text-center">
          {content.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default YourLifePlayedBackGently;
