"use client";

import React from "react";
import { motion } from "framer-motion";
import { GENRES, type Genre } from "../lib/genres";

interface Props {
  selectedId: string | null;
  onSelect: (genre: Genre) => void;
}

const GenreCarousel: React.FC<Props> = ({ selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {GENRES.map((g, i) => {
        const isSelected = g.id === selectedId;
        return (
          <motion.button
            key={g.id}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(g)}
            className={`relative text-left rounded-2xl overflow-hidden border transition-all duration-300 ${
              isSelected
                ? "border-white/60 ring-2 ring-white/40 shadow-[0_20px_60px_-20px_rgba(255,255,255,0.4)]"
                : "border-white/10 hover:border-white/30"
            }`}
            style={{ background: g.posterGradient, minHeight: "9.5rem" }}
          >
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.18), transparent 60%)",
              }}
            />
            <div className="relative p-4 h-full flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
                  {g.mood.split(",")[0]}
                </div>
                <h4
                  className={`text-lg font-semibold drop-shadow text-white ${
                    g.fontMood === "fantasy" || g.fontMood === "serif"
                      ? "font-serif"
                      : ""
                  }`}
                >
                  {g.name}
                </h4>
              </div>
              <p className="text-[11px] text-white/70 leading-snug line-clamp-2">
                {g.description}
              </p>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-semibold">
                Selected
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default GenreCarousel;
