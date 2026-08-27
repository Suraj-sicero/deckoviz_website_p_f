"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, BookOpen, PenTool, RefreshCw, ArrowRight, Play, MessageSquare
} from "lucide-react";

const TheRehearsal: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [exchanges, setExchanges] = useState<Array<{say: string, respond: string}>>([
    { say: "I think we need to talk about our workload distribution.", respond: "I didn't realize you felt it was uneven. Tell me more." }
  ]);
  const [newSay, setNewSay] = useState("");
  const [newRespond, setNewRespond] = useState("");

  const addExchange = () => {
    if (!newSay || !newRespond) return;
    setExchanges([...exchanges, { say: newSay, respond: newRespond }]);
    setNewSay("");
    setNewRespond("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-stone-900/30 border border-emerald-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <MessageSquare size={32} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Storytelling / Relational / Preparation</span>
              <h1 className="text-4xl font-bold">The Rehearsal</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Rehearse difficult conversations. Map out what you want to say and anticipate potential responses.
          </p>

          <div className="space-y-6 mb-8">
            {exchanges.map((exchange, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/10">
                  <span className="text-xs font-semibold text-emerald-400 uppercase">You:</span>
                  <p className="text-sm text-gray-300 mt-1">"{exchange.say}"</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Response (Anticipated):</span>
                  <p className="text-sm text-gray-400 mt-1">"{exchange.respond}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Exchange</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">What you want to say</label>
                <textarea 
                  value={newSay} 
                  onChange={(e) => setNewSay(e.target.value)}
                  placeholder="Type your lines..."
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm min-h-[60px]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">How they might respond</label>
                <textarea 
                  value={newRespond} 
                  onChange={(e) => setNewRespond(e.target.value)}
                  placeholder="Anticipate their reaction..."
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm min-h-[60px]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={addExchange}
                disabled={!newSay || !newRespond}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-black transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                Add to Rehearsal <Play size={14} />
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

export default TheRehearsal;
