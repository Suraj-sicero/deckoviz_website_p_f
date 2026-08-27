"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Smile, Award, RotateCcw } from "lucide-react";
import { usePaletteWars } from "./lib/paletteWarsState";

const PaletteWarsLeaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePaletteWars();

  if (!state.mood) {
    navigate("/flagship-games/palette-wars");
    return null;
  }

  const ranked = [...state.players].sort((a, b) => b.points - a.points);
  const mood = state.mood;

  return (
    <div className="min-h-screen bg-[#020108] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: mood.bgGradient }} />
      <div className="relative max-w-4xl mx-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/flagship-games/palette-wars")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Lobby
          </button>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{mood.name}</div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl bg-gradient-to-b from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
            The exhibition closes
          </h1>
          <p className="text-white/60 mt-3">A warm thank-you to everyone who saw something.</p>
        </motion.div>

        <div className="space-y-4">
          {ranked.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 flex items-center gap-5"
            >
              <div className="text-2xl font-serif text-white/40 w-8 text-center">{i + 1}</div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-black" style={{ background: p.color }}>
                {p.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{p.name}</span>
                  {p.title && (
                    <span className="text-[10px] uppercase tracking-[0.25em] text-rose-200 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-300/30">
                      {p.title}
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/50 mt-1 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1"><Trophy size={11} /> {p.points} pts</span>
                  <span className="inline-flex items-center gap-1"><Award size={11} /> {p.vizzyPicks} Vizzy Pick{p.vizzyPicks === 1 ? "" : "s"}</span>
                  <span className="inline-flex items-center gap-1"><Smile size={11} /> {p.joyPoints} Joy</span>
                </div>
              </div>
              <div className="text-2xl font-serif text-white tabular-nums">{p.points}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              navigate("/flagship-games/palette-wars");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
          >
            <RotateCcw size={14} /> Hang another exhibition
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaletteWarsLeaderboard;
