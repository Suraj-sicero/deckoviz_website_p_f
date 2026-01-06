"use client";

import React from "react";
import { motion } from "framer-motion";

const content = [
  "Some things in life are meant to be completed.",
  "A painting. A book. A room.",

  "Deckoviz is not one of them.",

  "Deckoviz is a doorway.",
  "A living portal.",
  "A frame that keeps opening, and opening, and opening again.",

  "You don’t buy Deckoviz at version 1.",
  "You step into a system that keeps becoming.",

  "A system that grows as you grow.",
  "That changes as your life changes.",
  "That deepens as your stories deepen.",

  "Every week, something new arrives.",
  "New art.",
  "New music.",
  "New visual forms you did not know were possible.",
  "New ways to turn photos into living memories.",
  "New modes for calm, wonder, play, focus, love.",
  "New rituals.",
  "New games.",
  "New experiences.",
  "New little pieces of magic that quietly find their place in your home.",

  "Not once a year.",
  "Not behind big upgrades.",
  "Every week.",

  "Deckoviz is not shipped as a finished product.",
  "It is shipped as a beginning.",

  "Because a living thing should never be done.",

  "Vizzy, the intelligence behind Deckoviz, grows with you.",
  "It learns your rhythms.",
  "Your mornings and nights.",
  "Your celebrations and quiet days.",
  "Your taste in beauty.",
  "Your way of remembering.",
  "Your way of dreaming.",

  "Over time, it stops feeling like software.",
  "It starts feeling like presence.",

  "This is our promise:",
  "high velocity, always.",

  "Deckoviz evolves in public, with you.",

  "This is why a Deckoviz frame is never finished.",
  "Because your life is not finished.",

  "A portal of infinite goodness.",
  "Of endless memories and wonders.",
  "Of small, human moments turned into living art.",

  "Not a product you outgrow.",
  "A companion you grow into.",

  "A frame that, gently, beautifully, will never be finished."
];

const InfinitePortal: React.FC = () => {
  return (
    <section className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#fff1eb] via-[#ffe4d6] to-[#ffd6c9]
      px-6 py-24
    ">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="
          max-w-4xl w-full
          rounded-3xl
          bg-white/70 backdrop-blur-xl
          border border-rose-200/60
          px-10 md:px-16 py-16
          shadow-[0_40px_120px_rgba(251,113,133,0.35)]
        "
      >
        <h1 className="
          text-3xl md:text-4xl font-semibold mb-12 text-center
          bg-gradient-to-r from-rose-500 via-orange-400 to-pink-500
          bg-clip-text text-transparent
        ">
          A Frame That Will Never Be Finished
        </h1>

        <div className="space-y-4 text-gray-700 text-[17px] leading-relaxed text-center">
          {content.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
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

export default InfinitePortal;
