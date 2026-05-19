"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Zap, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Shield
} from "lucide-react";

const TheThreshold: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [step, setStep] = useState(0);

  const steps = [
    "Pause. You are standing at a threshold.",
    "Behind you is what was. The familiar, the completed, the past.",
    "Before you is what will be. The unknown, the potential, the future.",
    "Take a breath. Acknowledge the transition.",
    "When you are ready, step forward."
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0); // Reset or complete
    }
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-teal-500/10 to-stone-900/30 border border-teal-500/20 backdrop-blur-md min-h-[400px] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center space-x-4 mb-6 absolute top-8 left-8">
            <div className="p-3 rounded-2xl bg-white/5">
              <Shield size={24} className="text-teal-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block text-left">Mood-Setting / Transition</span>
              <h1 className="text-2xl font-bold text-left">The Threshold</h1>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl"
            >
              <p className="text-3xl font-serif text-white/90 leading-relaxed mb-12">
                {steps[step]}
              </p>

              <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-teal-500 hover:bg-teal-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(20,184,166,0.3)] mx-auto"
              >
                {step === steps.length - 1 ? "Reset" : "Continue"} <ArrowRight size={18} />
              </button>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 text-xs text-gray-600">
            Step {step + 1} of {steps.length}
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

export default TheThreshold;
