"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Frame, UserMinus } from "lucide-react";
import { useMuseum } from "./lib/museumState";
import { THEMES } from "./lib/themes";

const MuseumLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useMuseum();
  const [name, setName] = useState("");

  const canStart = state.theme && state.players.length >= 1;

  return (
    <div className="min-h-screen bg-[#040209] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: state.theme ? 0.95 : 0.55 }}
        style={{ background: state.theme?.bgGradient ?? "linear-gradient(180deg, #0c0a08, #1a1410, #0c0a08)" }}
      />
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-4">
            <Frame size={12} /> The Museum of Us
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
            Choose tonight's wing
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto italic">
            We don't rush here. We don't compete. Pick a theme and we'll keep a light on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-white mb-4">Museum themes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {THEMES.map((t, i) => {
                const sel = state.theme?.id === t.id;
                return (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                    onClick={() => dispatch({ type: "SET_THEME", theme: t })}
                    className={`relative text-left rounded-2xl overflow-hidden border min-h-[9rem] ${sel ? "border-white/60 ring-2 ring-white/20" : "border-white/10 hover:border-white/30"}`}
                    style={{ background: t.posterGradient }}
                  >
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-xl text-white drop-shadow">{t.name}</h4>
                        <p className="text-xs text-white/70 italic mt-1">{t.invitation}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Visitors</h3>
                <span className="text-xs text-white/50">{state.players.length} / 6</span>
              </div>
              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length === 0 && (
                  <p className="text-white/40 text-sm italic">Anyone is welcome here.</p>
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

              {state.players.length < 6 && (
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
                    placeholder="Visitor name"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button onClick={() => name.trim() && (addPlayer(name.trim()), setName(""))} className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
                    Add
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white/50">
                <div>· 4 rounds · no timer pressure</div>
                <div>· One anonymous round per session</div>
                <div>· Vizzy contributes one piece at the end</div>
                <div>· No scoring — only Presence Moments</div>
              </div>

              <button
                disabled={!canStart}
                onClick={() => {
                  dispatch({ type: "START" });
                  navigate("/flagship-games/museum-of-us/play");
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{
                  background: state.theme ? `linear-gradient(135deg, ${state.theme.halo}, rgba(255,255,255,0.12))` : "linear-gradient(135deg, #fbbf24, #f472b6)",
                  color: "white",
                }}
              >
                <Frame size={14} /> Open the museum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumLobby;
