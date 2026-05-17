"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Type, UserMinus } from "lucide-react";
import { useOneWord } from "./lib/oneWordState";
import { MOODS } from "./lib/sessionMoods";

const OneWordLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useOneWord();
  const [name, setName] = useState("");

  const canStart = state.mood && state.players.length >= 2;

  return (
    <div className="min-h-screen bg-[#040206] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: state.mood ? 0.95 : 0.5 }}
        style={{ background: state.mood?.bgGradient ?? "linear-gradient(180deg, #0a0814, #1a0a2a, #0a0814)" }}
      />
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-pink-200 mb-4">
            <Type size={12} /> One Word At A Time
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-pink-100 to-pink-300 bg-clip-text text-transparent">
            Nobody knows where this sentence is going.
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto italic">
            One word per turn. Eight seconds. No edits. Vizzy may interrupt at any time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-white mb-4">Choose a session mood</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MOODS.map((m, i) => {
                const sel = state.mood?.id === m.id;
                return (
                  <motion.button
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                    onClick={() => dispatch({ type: "SET_MOOD", mood: m })}
                    className={`relative text-left rounded-2xl overflow-hidden border min-h-[9rem] ${sel ? "border-white/60 ring-2 ring-white/20" : "border-white/10 hover:border-white/30"}`}
                    style={{ background: m.posterGradient }}
                  >
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-lg text-white drop-shadow">{m.name}</h4>
                        <p className="text-[11px] text-white/70 italic mt-1">{m.tagline}</p>
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">{m.illustrationStyle}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Players</h3>
                <span className="text-xs text-white/50">{state.players.length} / 8</span>
              </div>
              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length === 0 && <p className="text-white/40 text-sm italic">2–8 players. Pass the device fast.</p>}
                {state.players.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: p.color }}>
                      {p.name.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="flex-1 text-sm">{p.name}</span>
                    <button onClick={() => dispatch({ type: "REMOVE_PLAYER", id: p.id })} className="text-white/40 hover:text-rose-400">
                      <UserMinus size={14} />
                    </button>
                  </div>
                ))}
              </div>
              {state.players.length < 8 && (
                <div className="flex items-center gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 24))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && name.trim()) {
                        addPlayer(name.trim());
                        setName("");
                      }
                    }}
                    placeholder="Player"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button onClick={() => name.trim() && (addPlayer(name.trim()), setName(""))} className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
                    Add
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white/50">
                <div>· 10 sentences · ~15–20 minutes</div>
                <div>· Quickfire word (&lt; 3s): +1</div>
                <div>· Closer (3-star ending): +1</div>
                <div>· Pivot Badge every 5 sentences</div>
                <div>· One REDIRECT per player</div>
                <div>· Vizzy interrupts whenever Vizzy wants</div>
              </div>

              <button
                disabled={!canStart}
                onClick={() => {
                  dispatch({ type: "START" });
                  navigate("/flagship-games/one-word/play");
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{
                  background: state.mood
                    ? `linear-gradient(135deg, ${state.mood.palette[0]}, ${state.mood.palette[1]})`
                    : "linear-gradient(135deg, #ec4899, #fbbf24)",
                  color: "white",
                }}
              >
                Begin the chaos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneWordLobby;
