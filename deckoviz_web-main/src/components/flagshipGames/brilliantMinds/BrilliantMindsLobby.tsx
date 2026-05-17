"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, UserMinus, Users } from "lucide-react";
import { useMinds } from "./lib/mindsState";
import { UNIVERSES } from "./lib/questions";

const BrilliantMindsLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useMinds();
  const [name, setName] = useState("");
  const canStart = state.players.length >= 1;
  const sel = UNIVERSES.find((u) => u.id === state.universe) ?? UNIVERSES[0];

  return (
    <div className="min-h-screen bg-[#020610] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: sel.bgGradient }}
        animate={{ opacity: 0.95 }}
      />
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-sky-200 mb-4">
            <Brain size={12} /> Brilliant Minds
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            Curiosity is a spectator sport.
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto italic">
            Reasoning over recall. Connections over memorization. Wrong answers still earn fascinating asides.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-xl text-white">Choose a knowledge universe</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {UNIVERSES.map((u) => {
                const isSel = state.universe === u.id;
                return (
                  <motion.button
                    key={u.id}
                    whileHover={{ y: -3 }}
                    onClick={() => dispatch({ type: "SET_UNIVERSE", universe: u.id })}
                    className={`relative text-left rounded-2xl overflow-hidden border min-h-[9rem] ${isSel ? "border-sky-300/60 ring-2 ring-sky-300/30" : "border-white/10 hover:border-white/30"}`}
                    style={{ background: u.posterGradient }}
                  >
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-xl text-white drop-shadow">{u.name}</h4>
                        <p className="text-xs text-white/70 italic mt-1">{u.blurb}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-lg text-white">Players</h3>
                <button onClick={() => dispatch({ type: "TOGGLE_TEAMS" })} className={`text-[10px] uppercase tracking-[0.25em] px-2 py-0.5 rounded-full ${state.teamMode ? "bg-sky-500/20 text-sky-100 border border-sky-300/40" : "bg-white/5 border border-white/10 text-white/60"}`}>
                  <Users size={11} className="inline mr-1" />
                  {state.teamMode ? "Teams on" : "Teams off"}
                </button>
              </div>
              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length === 0 && <p className="text-white/40 text-sm italic">Solo or up to 8.</p>}
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
                <div>· 5 rounds: Straight, Reasoning, Connection, Minority, Wild Card</div>
                <div>· One Rabbit Hole per player</div>
                <div>· One Challenge per player</div>
                <div>· Wrong answers still get fascinating Vizzy asides</div>
              </div>

              <button
                disabled={!canStart}
                onClick={() => {
                  dispatch({ type: "START" });
                  navigate("/flagship-games/brilliant-minds/play");
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #22d3ee)", color: "white" }}
              >
                Take the stage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrilliantMindsLobby;
