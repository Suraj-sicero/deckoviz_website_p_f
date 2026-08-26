"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import type { Player } from "../lib/storyForgeState";

interface Props {
  activePlayer: Player | null;
  round: number;
  totalRounds: number;
  twist?: string | null;
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

const MAX_CHARS = 240;

const MobileInput: React.FC<Props> = ({
  activePlayer,
  round,
  totalRounds,
  twist,
  onSubmit,
  disabled = false,
}) => {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
  };

  const charLimit = Math.min(value.length, MAX_CHARS);
  const progress = (charLimit / MAX_CHARS) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {activePlayer && (
            <>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black"
                style={{ background: activePlayer.color }}
              >
                {activePlayer.name.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-white">
                {activePlayer.name}
                <span className="text-white/40 text-xs ml-1">· your turn</span>
              </span>
            </>
          )}
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
          Round {round} / {totalRounds}
        </div>
      </div>

      {twist && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-300/30 text-amber-100 text-xs">
          ✦ Twist in play: <span className="italic">{twist}</span>
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
        placeholder="One sentence. Make it count."
        rows={3}
        disabled={disabled}
        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-white text-base font-serif placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none disabled:opacity-50"
      />

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-white/40 w-12 text-right tabular-nums">
          {value.length}/{MAX_CHARS}
        </span>
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background:
              "linear-gradient(135deg, #a78bfa, #ec4899, #fbbf24, #ec4899, #a78bfa)",
            backgroundSize: "300% 300%",
            animation: "footerGradientFlow 5s ease infinite",
            color: "white",
          }}
        >
          <span>Submit</span>
          <Send size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default MobileInput;
