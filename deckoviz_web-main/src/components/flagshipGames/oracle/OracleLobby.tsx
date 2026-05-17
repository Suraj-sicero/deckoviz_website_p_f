"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircleQuestion, UserMinus } from "lucide-react";
import { useOracle } from "./lib/oracleState";
import { DEPTHS } from "./lib/depths";

const OracleLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useOracle();
  const [name, setName] = useState("");
  const sel = DEPTHS.find((d) => d.id === state.depth) ?? DEPTHS[1];
  const canStart = state.players.length >= 1;

  return (
    <div className="min-h-screen bg-[#02050a] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: sel.bgGradient }}
      />
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-teal-200 mb-4">
            <MessageCircleQuestion size={12} /> The Oracle
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-teal-100 to-teal-300 bg-clip-text text-transparent">
            The questions reveal you.
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto italic">
            Ask what you actually wonder. Stay anonymous. Listen to what the room thinks you'd say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-white mb-4">Choose a depth</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {DEPTHS.map((d) => {
                const isSel = state.depth === d.id;
                return (
                  <motion.button
                    key={d.id}
                    whileHover={{ y: -3 }}
                    onClick={() => dispatch({ type: "SET_DEPTH", depth: d.id })}
                    className={`relative text-left rounded-2xl overflow-hidden border min-h-[9rem] ${isSel ? "border-teal-300/60 ring-2 ring-teal-300/30" : "border-white/10 hover:border-white/30"}`}
                    style={{ background: d.posterGradient }}
                  >
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-xl text-white drop-shadow">{d.name}</h4>
                        <p className="text-xs text-white/70 italic mt-1">{d.tagline}</p>
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">{d.ambient}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Present</h3>
                <span className="text-xs text-white/50">{state.players.length} / 6</span>
              </div>
              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length === 0 && <p className="text-white/40 text-sm italic">Solo is welcome.</p>}
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
                    placeholder="Name"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button onClick={() => name.trim() && (addPlayer(name.trim()), setName(""))} className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
                    Add
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white/50">
                <div>· 7 questions · 35–50 minutes</div>
                <div>· No timers. No pressure.</div>
                <div>· One Pass-Back follow-up per session</div>
                <div>· Vizzy submits one observant question</div>
                <div>· Final question closes the room</div>
              </div>

              <button
                disabled={!canStart}
                onClick={() => {
                  dispatch({ type: "START" });
                  navigate("/flagship-games/oracle/play");
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #5eead4)", color: "white" }}
              >
                Begin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OracleLobby;
