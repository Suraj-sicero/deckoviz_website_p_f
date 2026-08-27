"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, UserMinus } from "lucide-react";
import { useDebate } from "./lib/debateState";
import { MODES, rollMode, rollTopic } from "./lib/topics";

const DebateLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useDebate();
  const [name, setName] = useState("");
  const canStart = state.players.length >= 2;
  const selectedMode = MODES.find((m) => m.id === state.mode) ?? MODES[0];

  const begin = () => {
    if (!canStart) return;
    dispatch({ type: "ASSIGN_SIDES" });
    const m = state.mode === "whim" ? rollMode() : state.mode;
    const { topic, resolvedMode } = rollTopic(m);
    dispatch({ type: "START_TOPIC", topic, resolvedMode });
    navigate("/flagship-games/debating-society/play");
  };

  return (
    <div className="min-h-screen bg-[#040206] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: 0.95 }}
        style={{ background: selectedMode.bgGradient }}
      />
      {/* spotlight */}
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(180, 83, 9, 0.18)" }}
        animate={{ opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
          <div className="text-xs text-white/60">
            Society <span className="font-mono text-white tracking-wider">{state.roomCode}</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-4">
            <Mic size={12} /> The Debating Society
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            The chamber is quiet for the moment.
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto italic">
            Persuasion is judged. Sincerity is optional. Wit is mandatory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-white mb-4">Choose a chamber</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MODES.map((m, i) => {
                const sel = state.mode === m.id;
                return (
                  <motion.button
                    key={m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                    onClick={() => dispatch({ type: "SET_MODE", mode: m.id })}
                    className={`relative text-left rounded-2xl overflow-hidden border min-h-[9rem] ${sel ? "border-amber-300/60 ring-2 ring-amber-300/30" : "border-white/10 hover:border-white/30"}`}
                    style={{ background: m.posterGradient }}
                  >
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-xl text-white drop-shadow">{m.name}</h4>
                        <p className="text-xs text-white/70 italic mt-1">{m.tagline}</p>
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">{m.description}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Debaters</h3>
                <span className="text-xs text-white/50">{state.players.length} / 8</span>
              </div>
              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length < 2 && <p className="text-white/40 text-sm italic">Two voices, minimum.</p>}
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
                    placeholder="Debater"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button onClick={() => name.trim() && (addPlayer(name.trim()), setName(""))} className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
                    Add
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white/50">
                <div>· 60s opening / 45s rebuttal / 30s cross-exam / 45s closing</div>
                <div>· One Heckle Token per player</div>
                <div>· One Pivot per game (switch sides mid-debate)</div>
                <div>· One Conscience Clause per game</div>
                <div>· Vizzy delivers a final verdict</div>
              </div>

              <button
                disabled={!canStart}
                onClick={begin}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)", color: "white" }}
              >
                Bang the gavel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateLobby;
