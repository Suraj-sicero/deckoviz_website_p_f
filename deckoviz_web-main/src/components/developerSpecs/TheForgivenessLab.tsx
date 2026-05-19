"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Zap, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Shield
} from "lucide-react";

const TheForgivenessLab: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [step, setStep] = useState(0);
  const [harm, setHarm] = useState("");
  const [cost, setCost] = useState("");
  const [release, setRelease] = useState("");

  const steps = [
    { title: "The Harm", description: "Describe what happened and the impact it had.", value: harm, setter: setHarm },
    { title: "The Cost", description: "What is it costing you to continue carrying this debt?", value: cost, setter: setCost },
    { title: "The Release", description: "What would it look like to release the debt claim?", value: release, setter: setRelease }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      alert("Forgiveness Lab session complete. The work continues.");
      setStep(0);
      setHarm("");
      setCost("");
      setRelease("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-teal-500/10 to-stone-900/30 border border-teal-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Shield size={32} className="text-teal-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Psychological / Emotional / Resolution Practice</span>
              <h1 className="text-4xl font-bold">The Forgiveness Lab</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            A private internal act of releasing the ongoing debt claim. Work through the steps to explore forgiveness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-lg border transition-colors ${
                  step === idx ? "bg-teal-500/10 border-teal-500" : "bg-black/20 border-white/5"
                }`}
              >
                <span className="text-xs font-semibold text-teal-400 uppercase">Step {idx + 1}</span>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">{steps[step].title}</h2>
              <p className="text-gray-400 text-sm">{steps[step].description}</p>
              <textarea 
                value={steps[step].value} 
                onChange={(e) => steps[step].setter(e.target.value)}
                placeholder="Write your reflections here..."
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[150px]"
              />

              <div className="flex justify-end">
                <button 
                  onClick={nextStep}
                  disabled={!steps[step].value}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {step === steps.length - 1 ? "Complete Lab" : "Next Step"} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
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

export default TheForgivenessLab;
