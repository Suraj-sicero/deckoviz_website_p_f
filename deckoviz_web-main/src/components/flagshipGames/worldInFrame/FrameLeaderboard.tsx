"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { useFrame } from "./lib/frameState";

const FrameLeaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFrame();
  const ranked = [...state.players].sort((a, b) => b.points - a.points);
  const steadyVoice = state.players.filter((p) => p.steadyVoiceCount === state.roundLimit);

  return (
    <div className="min-h-screen bg-[#040506] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: state.style?.bgGradient ?? "#040506" }} />
      <div className="relative max-w-4xl mx-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/flagship-games/world-in-frame")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Lobby
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            What we made, one sentence at a time
          </h1>
        </motion.div>

        <div className="space-y-3 mb-10">
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
                <div className="text-xs text-white/50 mt-1 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1"><Trophy size={11} /> {p.points} pts</span>
                  {p.vizzyPicks > 0 && <span className="inline-flex items-center gap-1 text-violet-200"><Award size={11} /> {p.vizzyPicks} Vizzy Pick{p.vizzyPicks === 1 ? "" : "s"}</span>}
                  {p.haikuPoints > 0 && <span className="inline-flex items-center gap-1 text-amber-200"><Sparkles size={11} /> {p.haikuPoints} Haiku</span>}
                </div>
              </div>
              <div className="text-2xl font-serif text-white tabular-nums">{p.points}</div>
            </motion.div>
          ))}
        </div>

        {steadyVoice.length > 0 && (
          <div className="mb-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 text-center">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Steady Voice Badge</div>
            <p className="font-serif text-white">
              {steadyVoice.map((p) => p.name).join(", ")} - at least one vote every round.
            </p>
          </div>
        )}

        {state.finalReturnSentences.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 mb-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-3">The Return · final collaborative piece</div>
            <div className="space-y-2">
              {state.finalReturnSentences.map((s) => {
                const p = state.players.find((pl) => pl.id === s.playerId);
                return (
                  <div key={s.id}>
                    <p className="font-serif text-white text-base leading-relaxed">"{s.text}"</p>
                    <div className="text-[10px] text-white/40 italic">- {p?.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              navigate("/flagship-games/world-in-frame");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
          >
            <RotateCcw size={14} /> Another quiet hour
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameLeaderboard;
