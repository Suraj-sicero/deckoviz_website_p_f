"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  FileText, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Quote
} from "lucide-react";

const HonestEulogy: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [eulogy, setEulogy] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const prompts = [
    "What did you genuinely care about, even if you didn't always show it?",
    "What were your most characteristic flaws that people loved anyway?",
    "What is the thing you would want people to remember most?"
  ];

  const saveEulogy = () => {
    if (!eulogy) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Your honest eulogy has been archived.");
    }, 1500);
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
              <Quote size={32} className="text-stone-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Storytelling / Identity / Existential</span>
              <h1 className="text-4xl font-bold">Honest Eulogy</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Write an honest eulogy for yourself. Not the sanitized version, but the one that captures your true contradictions, struggles, and loves.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {prompts.map((prompt, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400 font-serif">
                "{prompt}"
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <textarea 
              value={eulogy} 
              onChange={(e) => setEulogy(e.target.value)}
              placeholder="Begin writing your honest eulogy..."
              className="w-full bg-stone-800 border border-white/10 rounded-lg p-4 text-white text-sm min-h-[250px] font-serif"
            />

            <div className="flex justify-end">
              <button 
                onClick={saveEulogy}
                disabled={!eulogy || isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-stone-500 hover:bg-stone-600 text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isSaving ? "Archiving..." : "Archive Eulogy"} <Play size={14} />
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

export default HonestEulogy;
