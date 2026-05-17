"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { StorySentence, Player } from "../lib/storyForgeState";

interface Props {
  sentences: StorySentence[];
  players: Player[];
  round: number;
  onVote: (id: string) => void;
  onSkip: () => void;
}

const ResonanceVote: React.FC<Props> = ({ sentences, players, round, onVote, onSkip }) => {
  const cards = sentences.filter((s) => s.round === round);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-violet-200/80 mb-1">
            ✶ Resonance Vote
          </div>
          <h4 className="font-serif text-white text-lg">Which line was most vivid?</h4>
        </div>
        <button
          type="button"
          onClick={onSkip}
          className="text-xs text-white/50 hover:text-white/90 transition-colors"
        >
          Continue →
        </button>
      </div>

      <div className="space-y-2.5">
        {cards.map((s) => {
          const player = players.find((p) => p.id === s.playerId);
          return (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => onVote(s.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 p-4 transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-black"
                  style={{ background: player?.color ?? "#fff" }}
                >
                  {player?.name?.slice(0, 1).toUpperCase() ?? "?"}
                </div>
                <p className="font-serif text-white/90 text-sm leading-relaxed flex-1">
                  {s.text}
                </p>
                <Sparkles
                  size={14}
                  className="text-violet-300 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ResonanceVote;
