"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Archive, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Scissors
} from "lucide-react";

const UnfinishedBusinessBureau: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, business: string, status: 'pending' | 'resolved' | 'abandoned'}>>([
    { id: 1, business: "The apology I never sent to Mark.", status: 'pending' },
    { id: 2, business: "Finishing the painting in the garage.", status: 'pending' },
    { id: 3, business: "The conversation with my boss about a raise.", status: 'resolved' }
  ]);
  const [newBusiness, setNewBusiness] = useState("");

  const addItem = () => {
    if (!newBusiness) return;
    setItems([...items, { id: items.length + 1, business: newBusiness, status: 'pending' }]);
    setNewBusiness("");
  };

  const setStatus = (id: number, status: 'pending' | 'resolved' | 'abandoned') => {
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-500/10 to-stone-900/30 border border-slate-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Archive size={32} className="text-slate-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Storytelling / Resolution / Organization</span>
              <h1 className="text-4xl font-bold">Unfinished Business Bureau</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Catalog the things you have left unfinished. Decide whether to pursue them, resolve them, or consciously abandon them.
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-lg bg-black/40 border transition-colors flex items-center justify-between ${
                  item.status === 'resolved' ? "border-emerald-500/20" :
                  item.status === 'abandoned' ? "border-red-500/20 opacity-50" :
                  "border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${item.status === 'abandoned' ? "line-through text-gray-500" : "text-white"}`}>
                    {item.business}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setStatus(item.id, 'resolved')}
                    className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                      item.status === 'resolved' ? "bg-emerald-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    Resolve
                  </button>
                  <button 
                    onClick={() => setStatus(item.id, 'abandoned')}
                    className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                      item.status === 'abandoned' ? "bg-red-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    Abandon
                  </button>
                  <button 
                    onClick={() => setStatus(item.id, 'pending')}
                    className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                      item.status === 'pending' ? "bg-slate-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Unfinished Business</h3>
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={newBusiness} 
                onChange={(e) => setNewBusiness(e.target.value)}
                placeholder="What is left unfinished?"
                className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
              <button 
                onClick={addItem}
                disabled={!newBusiness}
                className="px-4 py-2 bg-slate-500 hover:bg-slate-600 rounded-lg text-sm font-bold text-white disabled:opacity-50"
              >
                Add
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

export default UnfinishedBusinessBureau;
