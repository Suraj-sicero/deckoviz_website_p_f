"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Sun, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Heart
} from "lucide-react";

const TheLastGoodDay: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, thing: string, quality: number}>>([
    { id: 1, thing: "My child wanting to hold my hand in public.", quality: 9 },
    { id: 2, thing: "The specific view from my current office window.", quality: 7 },
    { id: 3, thing: "A friendship that still feels easy and unearned.", quality: 8 }
  ]);
  const [newThing, setNewThing] = useState("");
  const [newQuality, setNewQuality] = useState(5);

  const addItem = () => {
    if (!newThing) return;
    setItems([...items, { id: items.length + 1, thing: newThing, quality: newQuality }]);
    setNewThing("");
    setNewQuality(5);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 to-stone-900/30 border border-orange-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Sun size={32} className="text-orange-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Storytelling / Gratitude / Present Tense Living</span>
              <h1 className="text-4xl font-bold">The Last Good Day</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Practice anticipatory attention: identify the good things in your current life that are finite and temporary. Give them the quality of attention they deserve.
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Heart size={16} className="text-orange-400 flex-shrink-0" />
                  <span className="text-sm text-white font-serif">
                    {item.thing}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Attention Required:</span>
                  <span className="text-xs font-bold text-orange-300">{item.quality}/10</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Temporary Good Thing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">The Good Thing</label>
                <input 
                  type="text" 
                  value={newThing} 
                  onChange={(e) => setNewThing(e.target.value)}
                  placeholder="What is finite and temporary?"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Quality of Attention ({newQuality}/10)</label>
                <div className="flex space-x-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={newQuality} 
                    onChange={(e) => setNewQuality(Number(e.target.value))}
                    className="flex-1 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-orange-500 mt-3"
                  />
                  <button 
                    onClick={addItem}
                    disabled={!newThing}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-bold text-white disabled:opacity-50 self-center"
                  >
                    Add
                  </button>
                </div>
              </div>
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

export default TheLastGoodDay;
