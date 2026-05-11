"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Archive
} from "lucide-react";

const LettersToUnknownSelf: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [letters, setLetters] = useState<Array<{id: number, target: string, body: string}>>([
    { id: 1, target: "The Three-Year-Old Me", body: "I wish I could remember the world through your eyes, before language made everything fit into neat boxes." },
    { id: 2, target: "The Ninety-Year-Old Me", body: "I hope you are looking back at me now and smiling at how much I worried about things that didn't matter." }
  ]);
  const [newTarget, setNewTarget] = useState("");
  const [newBody, setNewBody] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const addLetter = () => {
    if (!newTarget || !newBody) return;
    const newId = letters.length + 1;
    setLetters([...letters, { id: newId, target: newTarget, body: newBody }]);
    setNewTarget("");
    setNewBody("");
    setSelectedId(newId);
  };

  const current = letters.find(l => l.id === selectedId);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <PixelatedBackground variant={variant} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <a href="/deckoviz-storytelling" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowRight size={16} className="transform rotate-180" /> Back to Storytelling
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md max-h-[500px] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Archive size={20} className="text-stone-400" /> The Correspondence
            </h2>
            <div className="space-y-3">
              {letters.map((l) => (
                <div 
                  key={l.id}
                  onClick={() => setSelectedId(l.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedId === l.id 
                      ? "bg-stone-500/20 border-stone-500/50" 
                      : "bg-white/5 border-white/5 hover:border-white/10"
                  } border`}
                >
                  <span className="text-xs font-semibold text-stone-300 truncate block">{l.target}</span>
                </div>
              ))}
            </div>

            {/* Add Form */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">New Correspondence</h3>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="To Whom? (e.g., The version of me in 10 years)" 
                  value={newTarget} 
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded p-1 text-xs text-white"
                />
                <textarea 
                  placeholder="The message..." 
                  value={newBody} 
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded p-1 text-xs text-white min-h-[60px]"
                />
                <button 
                  onClick={addLetter}
                  disabled={!newTarget || !newBody}
                  className="w-full py-1 bg-stone-500 hover:bg-stone-600 rounded text-xs font-bold disabled:opacity-50"
                >
                  Archive Letter
                </button>
              </div>
            </div>
          </motion.div>

          {/* Reading View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 p-12 rounded-3xl bg-gradient-to-br from-stone-700/10 to-stone-900/30 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-xl"
                >
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 block">
                    To: {current.target}
                  </span>
                  <p className="text-2xl font-serif text-white/90 leading-relaxed">
                    "{current.body}"
                  </p>
                </motion.div>
              ) : (
                <div className="text-gray-500">Select a correspondence to read.</div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LettersToUnknownSelf;
