"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Folder, BookOpen, PenTool, RefreshCw, ArrowRight, Play, FileText, Trash2
} from "lucide-react";

const UnsentLetterArchive: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [letters, setLetters] = useState<Array<{id: number, recipient: string, excerpt: string, date: string, body: string}>>([
    { id: 1, recipient: "To the one who left", excerpt: "I never got to say goodbye...", date: "2025-12-01", body: "I never got to say goodbye properly. There was so much left unsaid, and now it floats in the silence between us." },
    { id: 2, recipient: "To my younger self", excerpt: "Don't be so hard on yourself...", date: "2026-01-15", body: "Don't be so hard on yourself. You are doing the best you can with what you know. It gets better, I promise." },
    { id: 3, recipient: "To the job I didn't get", excerpt: "I thought we were a perfect match...", date: "2026-03-20", body: "I thought we were a perfect match. I put so much energy into that application. But maybe it's for the best." }
  ]);
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [newRecipient, setNewRecipient] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addLetter = () => {
    if (!newRecipient || !newBody) return;
    const newId = letters.length + 1;
    setLetters([
      { 
        id: newId, 
        recipient: newRecipient, 
        excerpt: newBody.substring(0, 30) + "...", 
        date: new Date().toISOString().split('T')[0],
        body: newBody
      },
      ...letters
    ]);
    setNewRecipient("");
    setNewBody("");
    setIsAdding(false);
  };

  const deleteLetter = (id: number) => {
    setLetters(letters.filter(l => l.id !== id));
    if (selectedLetter === id) setSelectedLetter(null);
  };

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
          {/* Letter List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md max-h-[600px] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Folder size={20} className="text-stone-400" />
                <h2 className="text-xl font-bold">The Archive</h2>
              </div>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="text-xs text-stone-400 hover:text-white border border-stone-500/20 px-2 py-1 rounded"
              >
                {isAdding ? "Cancel" : "Add New"}
              </button>
            </div>

            <div className="space-y-4">
              {letters.map((letter) => (
                <div 
                  key={letter.id}
                  onClick={() => setSelectedLetter(letter.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedLetter === letter.id 
                      ? "bg-stone-500/20 border-stone-500/50" 
                      : "bg-white/5 border-white/5 hover:border-white/10"
                  } border`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-stone-300 truncate max-w-[120px]">{letter.recipient}</span>
                    <span className="text-xs text-gray-600">{letter.date}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{letter.excerpt}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reading/Writing Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-stone-500/10 to-stone-900/30 border border-stone-500/20 backdrop-blur-md min-h-[500px]"
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div
                  key="adding"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-4">Compose Unsent Letter</h2>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1">Recipient:</label>
                    <input 
                      type="text" 
                      value={newRecipient} 
                      onChange={(e) => setNewRecipient(e.target.value)}
                      placeholder="e.g., To the version of me that didn't go"
                      className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1">Letter:</label>
                    <textarea 
                      value={newBody} 
                      onChange={(e) => setNewBody(e.target.value)}
                      placeholder="Write what was never sent..."
                      className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[200px]"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={addLetter}
                      disabled={!newRecipient || !newBody}
                      className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-stone-500 hover:bg-stone-600 text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Archive Letter <Play size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : selectedLetter !== null ? (
                <motion.div
                  key="reading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Recipient</span>
                      <h2 className="text-2xl font-bold">{letters.find(l => l.id === selectedLetter)?.recipient}</h2>
                      <span className="text-sm text-gray-500">{letters.find(l => l.id === selectedLetter)?.date}</span>
                    </div>
                    <button 
                      onClick={() => deleteLetter(selectedLetter)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-lg font-serif text-white/90 leading-relaxed whitespace-pre-wrap">
                    {letters.find(l => l.id === selectedLetter)?.body}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center text-gray-500"
                >
                  <FileText size={48} className="text-gray-700 mb-4" />
                  <p>Select a letter from the archive to read, or compose a new one.</p>
                </motion.div>
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

export default UnsentLetterArchive;
