"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, Sun, Wind, RefreshCw, ArrowRight, Play, Sliders
} from "lucide-react";

const EmotionalWeatherReport: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [calm, setCalm] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [focus, setFocus] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState("");

  const generateReport = () => {
    setIsGenerating(true);
    setReport("");
    
    // Simulate API call
    setTimeout(() => {
      let condition = "Partly Cloudy";
      if (calm > 70 && energy < 40) condition = "Clear and Still";
      if (energy > 70 && calm < 40) condition = "Storm Brewing";
      if (focus > 70) condition = "High Visibility";
      
      const generatedReport = `Today's emotional weather is ${condition}. With a calm level of ${calm}%, energy at ${energy}%, and focus at ${focus}%, the forecast suggests a period of internal stability with occasional gusts of creative energy. Visibility is moderate. Expect a quiet evening.`;
      setReport(generatedReport);
      setIsGenerating(false);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-sky-500/10 to-stone-900/30 border border-sky-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Cloud size={32} className="text-sky-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Psychological / State Setting / Reflection</span>
              <h1 className="text-4xl font-bold">Emotional Weather Report</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Map your current emotional state using sliders to generate a personalized weather report.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Calm Slider */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <Sun size={14} className="text-yellow-400" /> Calm
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={calm} 
                onChange={(e) => setCalm(Number(e.target.value))}
                className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Anxious</span>
                <span>{calm}%</span>
                <span>Serene</span>
              </div>
            </div>

            {/* Energy Slider */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <RefreshCw size={14} className="text-orange-400" /> Energy
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={energy} 
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Depleted</span>
                <span>{energy}%</span>
                <span>Hyper</span>
              </div>
            </div>

            {/* Focus Slider */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <Sliders size={14} className="text-emerald-400" /> Focus
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={focus} 
                onChange={(e) => setFocus(Number(e.target.value))}
                className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Scattered</span>
                <span>{focus}%</span>
                <span>Laser</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <button 
              onClick={generateReport}
              disabled={isGenerating}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-sky-500 hover:bg-sky-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(56,189,248,0.3)] disabled:opacity-50"
            >
              {isGenerating ? (
                <>Generating... <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Generate Report <Play size={18} /></>
              )}
            </button>
          </div>

          <AnimatePresence>
            {report && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-8 rounded-xl bg-black/60 border border-sky-500/20"
              >
                <h3 className="text-sm font-semibold text-sky-400 mb-4 uppercase tracking-wider">Weather Forecast</h3>
                <p className="text-xl font-serif text-white/90 leading-relaxed">
                  {report}
                </p>
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

export default EmotionalWeatherReport;
