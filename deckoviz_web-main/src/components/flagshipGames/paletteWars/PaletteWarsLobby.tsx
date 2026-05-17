"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, UserMinus, Users, Zap, Bot } from "lucide-react";
import { usePaletteWars } from "./lib/paletteWarsState";
import { MOODS } from "./lib/moods";

const PaletteWarsLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = usePaletteWars();
  const [name, setName] = useState("");

  const minPlayers = state.gameMode === "solo" ? 1 : 2;
  const canStart = state.mood && state.players.length >= minPlayers;

  const beginGame = () => {
    if (!canStart) return;
    if (state.gameMode === "solo" && !state.players.some((p) => p.id === "vizzy-ai")) {
      // add Vizzy as a soft companion (no scoring)
    }
    dispatch({ type: "START" });
    navigate("/flagship-games/palette-wars/play");
  };

  return (
    <div className="min-h-screen bg-[#040209] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: state.mood ? 0.9 : 0.5 }}
        style={{ background: state.mood?.bgGradient ?? "linear-gradient(180deg, #050214, #0a0814, #050214)" }}
      />
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
          <div className="text-xs text-white/60">
            Room <span className="font-mono text-white tracking-wider">{state.roomCode}</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-rose-200 mb-4">
            <Sparkles size={12} /> Palette Wars
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
            Step into the gallery
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Vizzy paints. You interpret. The room votes for the response that does the most with the least.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1">
            {(["standard", "party", "solo"] as const).map((m) => (
              <button
                key={m}
                onClick={() => dispatch({ type: "SET_MODE", mode: m })}
                className={`px-5 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-all ${
                  state.gameMode === m ? "bg-white text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {m === "standard" && <Users size={14} />}
                {m === "party" && <Zap size={14} />}
                {m === "solo" && <Bot size={14} />}
                <span className="capitalize">{m}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-white">Choose an art mood</h3>
              {state.mood && <span className="text-xs text-white/50 italic">{state.mood.tagline}</span>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MOODS.map((m, i) => {
                const sel = state.mood?.id === m.id;
                return (
                  <motion.button
                    key={m.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    onClick={() => dispatch({ type: "SET_MOOD", mood: m })}
                    className={`relative text-left rounded-2xl overflow-hidden border transition-all min-h-[10rem] ${
                      sel ? "border-white/60 ring-2 ring-white/30" : "border-white/10 hover:border-white/30"
                    }`}
                    style={{ background: m.posterGradient }}
                  >
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-1">
                          {m.tagline}
                        </div>
                        <h4 className={`text-lg font-semibold drop-shadow ${m.fontMood === "serif" ? "font-serif" : ""}`}>
                          {m.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-white/70 leading-snug">{m.description}</p>
                    </div>
                    {sel && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-semibold">
                        Selected
                      </div>
                    )}
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
                {state.players.length === 0 && (
                  <p className="text-white/40 text-sm italic">Add at least two players to begin.</p>
                )}
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
                    placeholder="Player name"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button
                    onClick={() => {
                      if (name.trim()) {
                        addPlayer(name.trim());
                        setName("");
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white/50">
                <div>· {state.roundLimit} rounds</div>
                <div>· 90s writing window</div>
                <div>· Vizzy's Pick + Joy Points</div>
                <div>· One Swap per game</div>
                <div>· Every 3rd round: theme constraint</div>
              </div>

              <button
                disabled={!canStart}
                onClick={beginGame}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{
                  background: state.mood
                    ? `linear-gradient(135deg, ${state.mood.palette[0]}, ${state.mood.palette[2]})`
                    : "linear-gradient(135deg, #ec4899, #fbbf24)",
                  color: "white",
                  boxShadow: "0 10px 40px -10px rgba(236,72,153,0.5)",
                }}
              >
                <Sparkles size={14} /> Enter the gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteWarsLobby;
