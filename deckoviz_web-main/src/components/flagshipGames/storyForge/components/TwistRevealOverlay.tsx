"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import type { Twist } from "../lib/twistEngine";
import { playSting } from "../lib/audio";

interface Props {
  twist: Twist;
  onContinue: () => void;
}

const CATEGORY_ICON: Record<string, string> = {
  mystery: "❖",
  emotional: "❤︎",
  cosmic: "✺",
  betrayal: "✦",
  weather: "❄︎",
  horror: "▼",
  fantasy: "✧",
  psychological: "◐",
};

const TwistRevealOverlay: React.FC<Props> = ({ twist, onContinue }) => {
  useEffect(() => {
    playSting("twist");
  }, [twist.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center"
      style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.6), rgba(0,0,0,0.92))" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateX: -10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[22rem] md:w-[28rem] rounded-3xl border border-amber-300/40 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(124,58,237,0.4), rgba(20,10,40,0.95))",
          boxShadow: "0 30px 80px -20px rgba(251,191,36,0.4), inset 0 0 60px rgba(251,191,36,0.15)",
        }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(251,191,36,0.25), transparent 60%)",
          }}
        />
        <div className="relative p-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200/80 mb-4">
            ✦ Twist Card ✦
          </div>
          <div className="text-5xl mb-5 text-amber-200">
            {CATEGORY_ICON[twist.category] ?? "✦"}
          </div>
          <div className="font-serif text-white text-xl md:text-2xl leading-snug mb-2">
            {twist.text}
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-3">
            {twist.category}
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mt-7 px-6 py-2.5 rounded-full text-sm font-semibold text-black bg-amber-200 hover:bg-amber-100 transition-colors"
          >
            Weave it into the story
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TwistRevealOverlay;
