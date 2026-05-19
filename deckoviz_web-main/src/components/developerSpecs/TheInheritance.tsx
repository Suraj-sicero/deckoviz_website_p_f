"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Archive, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Sparkles
} from "lucide-react";

const TheInheritance: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, item: string, from: string, type: 'material' | 'trait' | 'burden'}>>([
    { id: 1, item: "A love of storytelling.", from: "Grandmother", type: "trait" },
    { id: 2, item: "An old pocket watch.", from: "Grandfather", type: "material" },
    { id: 3, item: "A tendency to worry too much.", from: "Mother", type: "burden" }
  ]);
  const [newItem, setNewItem] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newType, setNewType] = useState<'material' | 'trait' | 'burden'>('trait');

  const addItem = () => {
    if (!newItem || !newFrom) return;
    setItems([...items, { id: items.length + 1, item: newItem, from: newFrom, type: newType }]);
    setNewItem("");
    setNewFrom("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-500/10 to-stone-900/30 border border-stone-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Archive size={32} className="text-stone-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Storytelling / Lineage / Reflection</span>
              <h1 className="text-4xl font-bold">The Inheritance</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Map what you have inherited—material objects, psychological traits, or emotional burdens.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {['material', 'trait', 'burden'].map((type) => (
              <div key={type} className="p-6 rounded-xl bg-black/40 border border-white/5">
                <h3 className="text-sm font-semibold text-stone-400 mb-4 uppercase tracking-wider capitalize">{type}s</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {items.filter(i => i.type === type).map((item) => (
                    <li key={item.id} className="flex flex-col">
                      <span className="text-white font-serif">"{item.item}"</span>
                      <span className="text-xs text-gray-600">From: {item.from}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Record Inheritance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Item/Trait</label>
                <input 
                  type="text" 
                  value={newItem} 
                  onChange={(e) => setNewItem(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">From Whom?</label>
                <input 
                  type="text" 
                  value={newFrom} 
                  onChange={(e) => setNewFrom(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Type</label>
                <select 
                  value={newType} 
                  onChange={(e) => setNewType(e.target.value as 'material' | 'trait' | 'burden')}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                >
                  <option value="material">Material</option>
                  <option value="trait">Trait</option>
                  <option value="burden">Burden</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={addItem}
                  disabled={!newItem || !newFrom}
                  className="w-full py-2 bg-stone-500 hover:bg-stone-600 rounded-lg text-sm font-bold text-white disabled:opacity-50"
                >
                  Add
                </button>
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

export default TheInheritance;
