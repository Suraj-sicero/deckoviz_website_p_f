"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Shield
} from "lucide-react";

const TheFinalFrame: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [step, setStep] = useState(0);

  const steps = [
    "The last image from a discontinued space mission, fading into static.",
    "The last entry in the journals of a great writer, ending mid-sentence.",
    "The final broadcast of a radio station that ran for fifty years.",
    "The awareness of ending is not loss, but completion.",
    "Every story that has ever been told has ended. This one does too."
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-700/10 to-stone-900/30 border border-stone-500/20 backdrop-blur-md min-h-[400px] flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center space-x-4 mb-6 absolute top-8 left-8">
            <div className="p-3 rounded-2xl bg-white/5">
              <Shield size={24} className="text-stone-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block text-left">Mood-Setting / Existential</span>
              <h1 className="text-2xl font-bold text-left">The Final Frame</h1>
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
                "{steps[step]}"
              </p>

              <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-stone-700 hover:bg-stone-800 text-white transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(120,113,108,0.3)] mx-auto"
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
    </div>
  );
};

export default TheFinalFrame;
