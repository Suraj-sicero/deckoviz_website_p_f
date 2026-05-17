"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown, RotateCcw, Trophy, Zap, Star } from "lucide-react";
import { useOneWord } from "./lib/oneWordState";

const OneWordLeaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useOneWord();

  const absurdistWinner = [...state.players].sort((a, b) => b.absurdistVotes - a.absurdistVotes)[0];
  const ranked = [...state.players].sort((a, b) => totalPoints(b) - totalPoints(a));

  return (
    <div className="min-h-screen bg-[#040206] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: state.mood?.bgGradient ?? "#040206" }} />
      <div className="relative max-w-4xl mx-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/flagship-games/one-word")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Lobby
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl bg-gradient-to-b from-white via-pink-100 to-amber-200 bg-clip-text text-transparent">
            The writers' room exhales
          </h1>
          {absurdistWinner && absurdistWinner.absurdistVotes > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-300/40 text-amber-100"
            >
              <Crown size={14} /> Absurdist Crown · {absurdistWinner.name}
            </motion.div>
          )}
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
                <div className="text-xs text-white/50 mt-1 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1"><Zap size={11} /> {p.quickfire} quickfire</span>
                  <span className="inline-flex items-center gap-1"><Star size={11} /> {p.closers} closers</span>
                  <span className="inline-flex items-center gap-1"><Trophy size={11} /> {p.pivots} pivots</span>
                </div>
              </div>
              <div className="text-2xl font-serif text-white tabular-nums">{totalPoints(p)}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 max-w-3xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.3em] text-pink-200 mb-2">The archive</div>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {state.sentences.map((s) => (
              <p key={s.id} className={`font-serif text-sm leading-relaxed ${s.abandoned ? "text-white/40 italic" : "text-white/85"}`}>
                {s.index}. "{s.text}"
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
              navigate("/flagship-games/one-word");
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
          >
            <RotateCcw size={14} /> Play another
          </button>
        </div>
      </div>
    </div>
  );
};

function totalPoints(p: ReturnType<typeof useOneWord>["state"]["players"][number]): number {
  return p.quickfire + p.closers * 2 + p.pivots * 2 + p.absurdistVotes;
}

export default OneWordLeaderboard;
