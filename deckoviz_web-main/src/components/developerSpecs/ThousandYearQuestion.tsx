"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, PenTool, RefreshCw, ArrowRight, Play, Globe
} from "lucide-react";

const ThousandYearQuestion: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [answer, setAnswer] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const mockAnswers = [
    "I hope they remember that we tried, even when we failed.",
    "That love was the only thing that actually mattered.",
    "To look at the stars and remember we are part of them."
  ];

  const sendAnswer = () => {
    if (!answer) return;
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      alert("Your answer has been sent across time.");
    }, 2000);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-stone-900/30 border border-indigo-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <BookOpen size={32} className="text-indigo-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Creative / Storytelling / Temporal</span>
              <h1 className="text-4xl font-bold">The Thousand-Year Question</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            What is the one thing you want to tell someone living a thousand years from now?
          </p>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <textarea 
                  value={answer} 
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your message to the future..."
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-4 text-white text-lg font-serif min-h-[200px]"
                />

                <div className="flex justify-end">
                  <button 
                    onClick={sendAnswer}
                    disabled={!answer || isSending}
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-indigo-500 hover:bg-indigo-600 text-white transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>Sending... <RefreshCw size={18} className="animate-spin" /></>
                    ) : (
                      <>Send to Future <Play size={18} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Globe size={48} className="text-indigo-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Message Transmitted</h2>
                <p className="text-gray-400 mb-8">Your words have been recorded and sent across the threshold of time.</p>

                <div className="max-w-md mx-auto text-left bg-black/40 border border-white/5 p-6 rounded-xl">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4">Other transmissions:</h3>
                  <div className="space-y-4">
                    {mockAnswers.map((a, idx) => (
                      <p key={idx} className="text-sm font-serif text-gray-300">
                        "{a}"
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

export default ThousandYearQuestion;
