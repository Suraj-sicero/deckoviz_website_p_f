"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Scroll, UserMinus, Trash2, BookOpen } from "lucide-react";
import { useInheritance } from "./lib/inheritanceState";

const InheritanceLobby: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, addPlayer } = useInheritance();
  const [name, setName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const hasArchive = !!state.archive;
  const canBegin = state.players.length >= 1;

  return (
    <div className="min-h-screen bg-[#0a0805] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #0a0805, #1f1610 50%, #0a0805)" }}
      />
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(180, 83, 9, 0.15)" }}
        animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/flagship-games")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Back to games
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-4">
            <Scroll size={12} /> The Inheritance
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            What gets inherited
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto italic">
            Not only objects - ways of loving, fearing, remembering, and leaving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            {hasArchive && state.archive && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-amber-300/30 bg-amber-500/10 backdrop-blur-md p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Returning family</div>
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="inline-flex items-center gap-1 text-[10px] text-rose-300/80 hover:text-rose-200"
                  >
                    <Trash2 size={11} /> Delete archive
                  </button>
                </div>
                <h3 className="font-serif text-2xl text-white">The {state.archive.surname} Family</h3>
                <div className="text-xs text-white/60 mt-1 italic">
                  {state.archive.chapters.length} chapter{state.archive.chapters.length === 1 ? "" : "s"} · {state.archive.members.length} member{state.archive.members.length === 1 ? "" : "s"} · {state.archive.heirlooms.length} heirloom{state.archive.heirlooms.length === 1 ? "" : "s"} · {state.archive.legacyPoints} Legacy
                </div>

                {confirmDelete && (
                  <div className="mt-3 rounded-xl border border-rose-300/40 bg-rose-500/10 p-3 text-xs text-white/80">
                    This will permanently remove the {state.archive.surname} family archive.
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          dispatch({ type: "DELETE_ARCHIVE" });
                          setConfirmDelete(false);
                        }}
                        className="px-3 py-1.5 rounded-full bg-rose-500/30 border border-rose-300/40 text-rose-100"
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/70"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {!hasArchive && (
              <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-2">First session</div>
                <h3 className="font-serif text-2xl text-white mb-2">Found a family</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Tonight, you'll answer a handful of questions together. Vizzy will name a surname, paint a founding portrait, and begin the archive.
                </p>
                <ul className="mt-3 text-xs text-white/50 space-y-1">
                  <li>· The family persists between sessions, permanently.</li>
                  <li>· Each session is a chapter: a marriage, a departure, a reckoning.</li>
                  <li>· Heirlooms and letters carry across chapters.</li>
                  <li>· No competitive scoring. Legacy Points unlock special chapters.</li>
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Players</h3>
                <span className="text-xs text-white/50">{state.players.length} / 5</span>
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
                    placeholder="Player"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button onClick={() => name.trim() && (addPlayer(name.trim()), setName(""))} className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
                    Add
                  </button>
                </div>
              )}

              {hasArchive ? (
                <div className="mt-6 space-y-2">
                  <button
                    disabled={!canBegin}
                    onClick={() => {
                      dispatch({ type: "GOTO", phase: "library" });
                      navigate("/flagship-games/inheritance/play");
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)", color: "white" }}
                  >
                    <BookOpen size={14} /> Open the archive
                  </button>
                  <button
                    disabled={!canBegin}
                    onClick={() => {
                      dispatch({ type: "GOTO", phase: "chapter-setup" });
                      navigate("/flagship-games/inheritance/play");
                    }}
                    className="w-full px-5 py-2.5 rounded-full border border-white/15 text-sm font-semibold text-white/90 disabled:opacity-40"
                  >
                    Begin a new chapter
                  </button>
                </div>
              ) : (
                <button
                  disabled={!canBegin}
                  onClick={() => {
                    dispatch({ type: "GOTO", phase: "founding" });
                    navigate("/flagship-games/inheritance/play");
                  }}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)", color: "white" }}
                >
                  <Scroll size={14} /> Found a family
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InheritanceLobby;
