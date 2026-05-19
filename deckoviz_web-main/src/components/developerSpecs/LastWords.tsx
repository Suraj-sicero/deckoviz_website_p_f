"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  FileText, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Quote
} from "lucide-react";

const LastWords: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [lastWords, setLastWords] = useState<Array<{id: number, speaker: string, words: string, context: string}>>([
    { id: 1, speaker: "Oscar Wilde", words: "Either that wallpaper goes, or I do.", context: "In a hotel room in Paris." },
    { id: 2, speaker: "Leonardo da Vinci", words: "I have offended God and mankind because my work did not reach the quality it should have.", context: "On his deathbed." },
    { id: 3, speaker: "Emily Dickinson", words: "I must go in, for the fog is rising.", context: "To her brother." }
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [newSpeaker, setNewSpeaker] = useState("");
  const [newWords, setNewWords] = useState("");
  const [newContext, setNewContext] = useState("");

  const addLastWords = () => {
    if (!newSpeaker || !newWords) return;
    const newId = lastWords.length + 1;
    setLastWords([...lastWords, { id: newId, speaker: newSpeaker, words: newWords, context: newContext }]);
    setNewSpeaker("");
    setNewWords("");
    setNewContext("");
    setSelectedId(newId);
  };

  const current = lastWords.find(lw => lw.id === selectedId);

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
              <Quote size={20} className="text-gray-400" /> The Collection
            </h2>
            <div className="space-y-3">
              {lastWords.map((lw) => (
                <div 
                  key={lw.id}
                  onClick={() => setSelectedId(lw.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedId === lw.id 
                      ? "bg-white/10 border-white/20" 
                      : "bg-white/5 border-white/5 hover:border-white/10"
                  } border`}
                >
                  <span className="text-xs font-semibold text-gray-400">{lw.speaker}</span>
                  <p className="text-sm text-gray-300 truncate">"{lw.words}"</p>
                </div>
              ))}
            </div>

            {/* Add Form */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Add New</h3>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Speaker" 
                  value={newSpeaker} 
                  onChange={(e) => setNewSpeaker(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded p-1 text-xs text-white"
                />
                <input 
                  type="text" 
                  placeholder="Words" 
                  value={newWords} 
                  onChange={(e) => setNewWords(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded p-1 text-xs text-white"
                />
                <input 
                  type="text" 
                  placeholder="Context (optional)" 
                  value={newContext} 
                  onChange={(e) => setNewContext(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded p-1 text-xs text-white"
                />
                <button 
                  onClick={addLastWords}
                  disabled={!newSpeaker || !newWords}
                  className="w-full py-1 bg-gray-600 hover:bg-gray-700 rounded text-xs font-bold disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>

          {/* Featured View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 p-12 rounded-3xl bg-gradient-to-br from-gray-700/10 to-stone-900/30 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[400px]"
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
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    {current.speaker}
                  </span>
                  <p className="text-3xl font-serif text-white/90 leading-relaxed mb-6">
                    "{current.words}"
                  </p>
                  {current.context && (
                    <span className="text-sm text-gray-600 italic">
                      {current.context}
                    </span>
                  )}
                </motion.div>
              ) : (
                <div className="text-gray-500">Select a record to view.</div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
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

export default LastWords;
