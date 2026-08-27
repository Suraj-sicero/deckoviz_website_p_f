"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Player } from "../lib/storyForgeState";

interface Props {
  players: Player[];
  activeIdx: number;
}

const PlayerHud: React.FC<Props> = ({ players, activeIdx }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {players.map((p, i) => {
        const active = i === activeIdx;
        return (
          <motion.div
            key={p.id}
            animate={{
              scale: active ? 1.05 : 1,
              opacity: active ? 1 : 0.6,
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
              active
                ? "border-white/40 bg-white/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
              style={{ background: p.color }}
            >
              {p.name.slice(0, 1).toUpperCase()}
            </div>
            <span className="text-white/90 font-medium">{p.name}</span>
            <span className="text-white/40">·</span>
            <span className="text-violet-200 tabular-nums">{p.resonance}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PlayerHud;
