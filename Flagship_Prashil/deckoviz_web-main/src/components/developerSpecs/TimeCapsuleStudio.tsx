"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Archive, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Sparkles
} from "lucide-react";

const TimeCapsuleStudio: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, item: string, note: string}>>([
    { id: 1, item: "A photo of my desk.", note: "To remember where I spent most of my time." },
    { id: 2, item: "A copy of today's newspaper.", note: "To capture the world's chaos." }
  ]);
  const [newItem, setNewItem] = useState("");
  const [newNote, setNewNote] = useState("");

  const addItem = () => {
    if (!newItem) return;
    setItems([...items, { id: items.length + 1, item: newItem, note: newNote }]);
    setNewItem("");
    setNewNote("");
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-500/10 to-stone-900/30 border border-violet-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Archive size={32} className="text-violet-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Storytelling / Legacy / Temporal</span>
              <h1 className="text-4xl font-bold">Time Capsule Studio</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Create a time capsule for your future self or for others. List the items you want to include and why.
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-lg bg-black/40 border border-white/5 flex flex-col"
              >
                <span className="text-sm font-semibold text-violet-400">{item.item}</span>
                <p className="text-xs text-gray-400 mt-1 font-serif">"{item.note}"</p>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Item to Capsule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Item</label>
                <input 
                  type="text" 
                  value={newItem} 
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="What are you putting in?"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Note/Reason</label>
                <input 
                  type="text" 
                  value={newNote} 
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Why this item?"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={addItem}
                disabled={!newItem}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-violet-500 hover:bg-violet-600 text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                Add to Capsule <Play size={14} />
              </button>
            </div>
          </div>
        </motion.div>
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

export default TimeCapsuleStudio;
