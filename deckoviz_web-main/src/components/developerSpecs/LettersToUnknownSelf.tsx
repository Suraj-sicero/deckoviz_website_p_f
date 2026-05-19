"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Archive, ArrowRight, PenTool, Save, Edit3, Plus, ChevronLeft, Sparkles
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Letter {
  id: number;
  target: string;
  prompt: string;
  body: string;
  savedAt?: string;
}

// ─── Guiding prompts per recipient ───────────────────────────────────────────
const PROMPTS: Record<string, string[]> = {
  default: [
    "What do you wish I knew right now?",
    "What can you see from where you are that I cannot yet see?",
    "What would you tell me to stop worrying about?",
    "What are you proud of that I haven't done yet?",
  ],
};

const getPrompt = (target: string): string => {
  const key = Object.keys(PROMPTS).find((k) =>
    target.toLowerCase().includes(k.toLowerCase())
  );
  const list = key ? PROMPTS[key] : PROMPTS.default;
  return list[Math.floor(Math.random() * list.length)];
};

// ─── Seed letters ────────────────────────────────────────────────────────────
const SEED_LETTERS: Letter[] = [
  {
    id: 1,
    target: "The Three-Year-Old Me",
    prompt: "What do you wish I knew right now?",
    body: "I wish I could remember the world through your eyes, before language made everything fit into neat boxes. You experienced things purely — the warmth of sunlight, the smell of rain on concrete, laughter without reason. I have inherited so much from you that I cannot see.",
    savedAt: "May 9, 2025",
  },
  {
    id: 2,
    target: "The Ninety-Year-Old Me",
    prompt: "What can you see from where you are that I cannot yet see?",
    body: "I hope you are looking back at me now and smiling at how much I worried about things that didn't matter. Tell me what mattered. Tell me where I was wrong. I am listening.",
    savedAt: "May 10, 2025",
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────
const LettersToUnknownSelf: React.FC = () => {
    const navigate = useNavigate();
  const [letters, setLetters] = useState<Letter[]>(SEED_LETTERS);
  const [view, setView] = useState<"list" | "compose" | "read">("list");
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [newTarget, setNewTarget] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);

  // ─── Open a saved letter for reading ─────────────────────────────────────
  const openLetter = (letter: Letter) => {
    setSelectedLetter(letter);
    setView("read");
  };

  // ─── Start composing a new letter ────────────────────────────────────────
  const startCompose = (letter?: Letter) => {
    if (letter) {
      // Edit existing
      setSelectedLetter(letter);
      setDraftBody(letter.body);
      setCurrentPrompt(letter.prompt);
    } else {
      // Brand new
      if (!newTarget.trim()) return;
      const prompt = getPrompt(newTarget);
      const newDraft: Letter = {
        id: Date.now(),
        target: newTarget.trim(),
        prompt,
        body: "",
      };
      setSelectedLetter(newDraft);
      setDraftBody("");
      setCurrentPrompt(prompt);
      setShowNewForm(false);
      setNewTarget("");
    }
    setView("compose");
  };

  // ─── Save the letter ─────────────────────────────────────────────────────
  const saveLetter = () => {
    if (!selectedLetter || !draftBody.trim()) return;

    const saved: Letter = {
      ...selectedLetter,
      body: draftBody,
      savedAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setLetters((prev) => {
      const exists = prev.find((l) => l.id === saved.id);
      if (exists) return prev.map((l) => (l.id === saved.id ? saved : l));
      return [saved, ...prev];
    });

    setSelectedLetter(saved);
    setView("read");
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <PixelatedBackground variant="nebula" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back link */}
        <div className="mb-8">
          <a
            href="/deckoviz-storytelling"
            className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors text-sm"
          >
            <ArrowRight size={14} className="rotate-180" /> Back to Storytelling
          </a>
        </div>

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/5">
              <Archive size={28} className="text-stone-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                Storytelling / Creative / Temporal Self-Relationship
              </span>
              <h1 className="text-3xl font-bold">Letters to the Unknown Self</h1>
            </div>
          </div>

          {/* New letter button */}
          {view === "list" && (
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-700 hover:bg-stone-600 text-sm font-semibold text-white transition-all"
            >
              <Plus size={15} /> New Letter
            </button>
          )}

          {view !== "list" && (
            <button
              onClick={() => {
                setView("list");
                setSelectedLetter(null);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-400 hover:text-white transition-all"
            >
              <ChevronLeft size={15} /> All Letters
            </button>
          )}
        </div>

        {/* ── LIST VIEW ────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              {/* New letter form */}
              <AnimatePresence>
                {showNewForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3 tracking-wider">
                        Address Your Letter To…
                      </h3>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newTarget}
                          onChange={(e) => setNewTarget(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && startCompose()}
                          placeholder="e.g., The version of me in 10 years"
                          autoFocus
                          className="flex-1 bg-stone-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-stone-500"
                        />
                        <button
                          onClick={() => startCompose()}
                          disabled={!newTarget.trim()}
                          className="px-5 py-2.5 bg-stone-600 hover:bg-stone-500 text-sm font-bold text-white rounded-xl disabled:opacity-40 transition-colors"
                        >
                          Begin Writing
                        </button>
                        <button
                          onClick={() => {
                            setShowNewForm(false);
                            setNewTarget("");
                          }}
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-sm text-gray-400 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Letters grid */}
              {letters.length === 0 ? (
                <div className="text-center py-24 text-gray-600">
                  <Archive size={40} className="mx-auto mb-4 opacity-30" />
                  <p>No letters yet. Begin your first correspondence.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {letters.map((letter) => (
                    <motion.div
                      key={letter.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-stone-500/40 hover:bg-white/[0.07] cursor-pointer transition-all duration-300"
                      onClick={() => openLetter(letter)}
                    >
                      {/* Edit button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDraftBody(letter.body);
                          setCurrentPrompt(letter.prompt);
                          startCompose(letter);
                        }}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-600 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Edit3 size={13} />
                      </button>

                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest block mb-2">
                        To:
                      </span>
                      <h3 className="text-lg font-serif text-white mb-3 leading-snug">
                        {letter.target}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 font-serif">
                        {letter.body || (
                          <span className="italic text-gray-700">Draft — not yet written.</span>
                        )}
                      </p>
                      {letter.savedAt && (
                        <span className="text-xs text-gray-700 mt-4 block">
                          Archived {letter.savedAt}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── COMPOSE VIEW ─────────────────────────────────────────── */}
          {view === "compose" && selectedLetter && (
            <motion.div
              key="compose"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left — guiding sidebar */}
              <div className="lg:col-span-1 space-y-5">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest block mb-1">
                    Writing to:
                  </span>
                  <h2 className="text-xl font-serif text-white">{selectedLetter.target}</h2>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-700/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-stone-400" />
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                      Guiding Prompt
                    </span>
                  </div>
                  <p className="text-base font-serif text-gray-300 leading-relaxed italic">
                    "{currentPrompt}"
                  </p>
                  <button
                    onClick={() => setCurrentPrompt(getPrompt(selectedLetter.target))}
                    className="mt-3 text-xs text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    ↻ Different prompt
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-600 font-serif leading-relaxed">
                  This is a private letter. It doesn't need to be good. It only needs to be honest.
                </div>
              </div>

              {/* Right — letter canvas */}
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-white/10 overflow-hidden">
                  {/* Letter header */}
                  <div className="px-8 pt-8 pb-4 border-b border-white/5">
                    <p className="text-sm text-gray-600 font-serif mb-1">Dear {selectedLetter.target},</p>
                  </div>

                  {/* Writing area */}
                  <textarea
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    placeholder={`Begin your letter here…\n\nLet it be whatever it needs to be.`}
                    autoFocus
                    className="w-full bg-transparent px-8 py-6 text-white font-serif text-base leading-8 min-h-[380px] resize-none focus:outline-none placeholder-stone-700"
                  />

                  {/* Footer */}
                  <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-serif">
                      {draftBody.length > 0
                        ? `${draftBody.split(/\s+/).filter(Boolean).length} words`
                        : "Start writing..."}
                    </span>
                    <button
                      onClick={saveLetter}
                      disabled={!draftBody.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-600 hover:bg-stone-500 text-sm font-bold text-white disabled:opacity-40 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Save size={14} /> Archive Letter
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── READ VIEW ────────────────────────────────────────────── */}
          {view === "read" && selectedLetter && (
            <motion.div
              key="read"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="max-w-3xl mx-auto"
            >
              <div className="rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-white/10 overflow-hidden shadow-2xl">
                {/* Letter head */}
                <div className="px-10 pt-10 pb-6 border-b border-white/5">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-1">
                    A letter to:
                  </span>
                  <h2 className="text-2xl font-serif text-white">{selectedLetter.target}</h2>
                  {selectedLetter.savedAt && (
                    <span className="text-xs text-gray-700 mt-1 block">
                      Archived {selectedLetter.savedAt}
                    </span>
                  )}
                </div>

                {/* Guiding prompt */}
                <div className="px-10 py-5 bg-stone-900/40 border-b border-white/5">
                  <p className="text-sm font-serif text-stone-500 italic">
                    "{selectedLetter.prompt}"
                  </p>
                </div>

                {/* Letter body */}
                <div className="px-10 py-8">
                  <p className="text-sm text-gray-500 font-serif mb-4">
                    Dear {selectedLetter.target},
                  </p>
                  <div className="font-serif text-base text-gray-200 leading-9 whitespace-pre-wrap">
                    {selectedLetter.body || (
                      <span className="italic text-gray-700">This letter has not been written yet.</span>
                    )}
                  </div>
                </div>

                {/* Footer actions */}
                <div className="px-10 pb-8 flex gap-3">
                  <button
                    onClick={() => {
                      setDraftBody(selectedLetter.body);
                      setCurrentPrompt(selectedLetter.prompt);
                      setView("compose");
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-700 hover:bg-stone-600 text-sm font-semibold text-white transition-all"
                  >
                    <Edit3 size={14} /> Edit Letter
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-400 hover:text-white transition-all"
                  >
                    <Archive size={14} /> All Letters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    
      {/* ALWAYS VISIBLE EXIT BUTTON */}
      <div className="absolute top-8 right-24 pointer-events-auto z-[9999]">
        <button 
          onClick={() => {
            if (typeof navigate !== 'undefined') {
              navigate('/experimental-art-modes');
            } else {
              window.location.href = '/experimental-art-modes';
            }
          }}
          className="p-3.5 bg-black/20 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
          title="Exit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
</div>
  );
};

export default LettersToUnknownSelf;
