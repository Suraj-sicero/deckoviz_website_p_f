"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, UserMinus } from "lucide-react";
import { useVerdict } from "./lib/verdictState";
import type { Difficulty } from "./lib/artworkDb";

const DIFFICULTIES: { id: Difficulty; label: string; blurb: string }[] = [
  { id: "curious", label: "Curious", blurb: "Famous works. Easy access. Good for newcomers." },
  { id: "initiated", label: "Initiated", blurb: "Mid-obscurity works, sharper bluffing." },
  { id: "deep-archive", label: "Deep Archive", blurb: "Rare works. Strange truths. Hard mode." },
];

const VerdictLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useVerdict();
  const [name, setName] = useState("");

  const canStart = state.players.length >= 3;

  return (
    <div className="min-h-screen bg-[#050208] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #08050b, #1c1410 50%, #08050b)" }} />
      {/* spotlight sweep */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(251, 146, 60, 0.15)" }}
        animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
          <div className="text-xs text-white/60">
            Gallery <span className="font-mono text-white tracking-wider">{state.roomCode}</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-4">
            <Eye size={12} /> Vizzy's Verdict
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            After-hours at the gallery
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto italic">
            One truth. Two lies per player. Confidence travels faster than fact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-serif text-xl text-white mb-3">Difficulty</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {DIFFICULTIES.map((d) => {
                  const sel = state.difficulty === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => dispatch({ type: "SET_DIFFICULTY", difficulty: d.id })}
                      className={`text-left rounded-2xl border px-4 py-3 transition ${sel ? "border-amber-300/60 bg-amber-500/10 ring-2 ring-amber-300/30" : "border-white/10 bg-white/[0.04] hover:border-white/30"}`}
                    >
                      <div className="font-serif text-lg text-white">{d.label}</div>
                      <div className="text-xs text-white/60 mt-0.5">{d.blurb}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5 text-sm text-white/70 space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">House rules</div>
              <div>· Each round: one player receives the true fact in private.</div>
              <div>· Everyone writes two convincing lies.</div>
              <div>· Vizzy may slip in their own bluff. Once per game.</div>
              <div>· Spot the truth: +2. Fool a player with a fake: +1 each.</div>
              <div>· All players fooled by your fake = Perfect Bluff (+3).</div>
              <div>· Double Down (once per game): risk it for double-or-minus-one.</div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Visitors</h3>
                <span className="text-xs text-white/50">{state.players.length} / 8</span>
              </div>
              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length < 3 && (
                  <p className="text-white/40 text-sm italic">Add at least three.</p>
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
                    placeholder="Visitor"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button
                    onClick={() => name.trim() && (addPlayer(name.trim()), setName(""))}
                    className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              )}

              <button
                disabled={!canStart}
                onClick={() => {
                  dispatch({ type: "START" });
                  navigate("/flagship-games/vizzys-verdict/play");
                }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)", color: "white" }}
              >
                Open the gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerdictLobby;
