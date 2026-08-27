"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, RotateCcw, Trophy } from "lucide-react";
import { useMinds } from "./lib/mindsState";

const BrilliantMindsLeaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useMinds();
  const ranked = [...state.players].sort((a, b) => b.points - a.points);
  return (
    <div className="min-h-screen bg-[#020610] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #020610, #0a1830 60%, #020610)" }} />
      <div className="relative max-w-4xl mx-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/flagship-games/brilliant-minds")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Lobby
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Brain className="inline-block text-sky-200 mb-2" size={20} />
          <h1 className="font-serif text-4xl md:text-5xl bg-gradient-to-b from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            What we connected
          </h1>
        </motion.div>
        <div className="space-y-3">
          {ranked.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 flex items-center gap-5"
            >
              <div className="text-2xl font-serif text-white/40 w-8 text-center">{i + 1}</div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-black" style={{ background: p.color }}>
                {p.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold">{p.name}</div>
                <div className="text-xs text-white/50 mt-1 inline-flex items-center gap-1"><Trophy size={11} /> {p.points} pts</div>
              </div>
              <div className="text-2xl font-serif text-white tabular-nums">{p.points}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              navigate("/flagship-games/brilliant-minds");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
          >
            <RotateCcw size={14} /> Play again
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrilliantMindsLeaderboard;
