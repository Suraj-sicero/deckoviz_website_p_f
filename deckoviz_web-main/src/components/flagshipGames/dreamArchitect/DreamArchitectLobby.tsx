"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, UserMinus, Wand2, Users, Bot } from "lucide-react";
import { useDreamArchitect } from "./lib/dreamArchitectState";
import { SEEDS, rollVizzySeed, type WorldSeed } from "./lib/worldSeeds";

const DreamArchitectLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useDreamArchitect();
  const [name, setName] = useState("");
  const [customSeed, setCustomSeed] = useState("");

  const canStart =
    state.seed && ((state.mode === "multiplayer" && state.players.length >= 2) || state.mode === "solo");

  const begin = () => {
    if (!canStart) return;
    if (state.mode === "solo" && state.players.length === 0) {
      addPlayer("You");
    }
    dispatch({ type: "START" });
    navigate("/flagship-games/dream-architect/play");
  };

  const useCustom = () => {
    const trimmed = customSeed.trim();
    if (!trimmed) return;
    const base = SEEDS[0];
    const seed: WorldSeed = { ...base, id: `custom-${Date.now()}`, text: trimmed };
    dispatch({ type: "SET_SEED", seed });
    setCustomSeed("");
  };

  return (
    <div className="min-h-screen bg-[#020108] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: state.seed ? 0.9 : 0.5 }}
        style={{ background: state.seed?.bgGradient ?? "linear-gradient(180deg, #02141a, #0a2a3a 50%, #02141a)" }}
      />
      <div className="relative max-w-6xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-emerald-200 mb-4">
            <Sparkles size={12} /> Dream Architect
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
            Begin with a single line
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Choose a World Seed. Vizzy will paint as you describe.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1">
            <button onClick={() => dispatch({ type: "SET_MODE", mode: "multiplayer" })} className={`px-5 py-2 rounded-full text-sm inline-flex items-center gap-2 ${state.mode === "multiplayer" ? "bg-white text-black" : "text-white/60"}`}>
              <Users size={14} /> Multiplayer
            </button>
            <button onClick={() => dispatch({ type: "SET_MODE", mode: "solo" })} className={`px-5 py-2 rounded-full text-sm inline-flex items-center gap-2 ${state.mode === "solo" ? "bg-white text-black" : "text-white/60"}`}>
              <Bot size={14} /> Solo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-white">Choose a World Seed</h3>
              <button
                onClick={() => dispatch({ type: "SET_SEED", seed: rollVizzySeed() })}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white"
              >
                <Wand2 size={12} /> Let Vizzy suggest one
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEEDS.map((s, i) => {
                const sel = state.seed?.id === s.id;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    onClick={() => dispatch({ type: "SET_SEED", seed: s })}
                    className={`relative text-left rounded-2xl overflow-hidden border min-h-[10rem] ${sel ? "border-white/60 ring-2 ring-white/30" : "border-white/10 hover:border-white/30"}`}
                    style={{ background: s.posterGradient }}
                  >
                    <div className="p-5 h-full flex flex-col justify-between">
                      <p className="font-serif text-lg md:text-xl text-white leading-snug drop-shadow">"{s.text}"</p>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">{s.vibe}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Custom seed */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Or invent one</div>
              <div className="flex gap-2">
                <input
                  value={customSeed}
                  onChange={(e) => setCustomSeed(e.target.value.slice(0, 120))}
                  onKeyDown={(e) => e.key === "Enter" && useCustom()}
                  placeholder="A place where..."
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />
                <button onClick={useCustom} disabled={!customSeed.trim()} className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold disabled:opacity-40">
                  Use seed
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Architects</h3>
                <span className="text-xs text-white/50">{state.players.length} / 5</span>
              </div>
              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length === 0 && (
                  <p className="text-white/40 text-sm italic">2–5 players. Cozy is the goal.</p>
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

              {state.players.length < 5 && (
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
                    placeholder="Architect name"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button onClick={() => name.trim() && (addPlayer(name.trim()), setName(""))} className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
                    Add
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white/50">
                <div>· 4 phases: Geography → Atmosphere → Inhabitants → Secret</div>
                <div>· Vizzy paints after every contribution</div>
                <div>· Final cinematic naming + library save</div>
                <div>· No competition — only wonder</div>
              </div>

              <button
                disabled={!canStart}
                onClick={begin}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{
                  background: state.seed
                    ? `linear-gradient(135deg, ${state.seed.palette[0]}, ${state.seed.palette[1]})`
                    : "linear-gradient(135deg, #34d399, #22d3ee)",
                  color: "white",
                }}
              >
                <Sparkles size={14} /> Begin the dream
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamArchitectLobby;
