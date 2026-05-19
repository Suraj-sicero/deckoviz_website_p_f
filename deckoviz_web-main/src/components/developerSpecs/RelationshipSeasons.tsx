"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, Sun, Wind, RefreshCw, ArrowRight, Play, Heart
} from "lucide-react";

const RelationshipSeasons: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [seasons, setSeasons] = useState<Array<{name: string, description: string, intensity: number}>>([
    { name: "Spring", description: "Discovery and possibility. Everything is new and unearned.", intensity: 8 },
    { name: "Summer", description: "Dependability and routine. The relationship deepens into structure.", intensity: 6 },
    { name: "Autumn", description: "Transformation or decline. Facing the first real tests.", intensity: 7 },
    { name: "Winter", description: "Dormancy or ending. Renewal or completion.", intensity: 5 }
  ]);
  const [selectedSeason, setSelectedSeason] = useState("Spring");

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
              <Heart size={32} className="text-sky-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Storytelling / Relational / Biographical</span>
              <h1 className="text-4xl font-bold">The Seasons of a Relationship</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Every significant relationship has seasons. Map the periods of distinct quality and emotional climate in your important relationships.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {seasons.map((season) => (
              <div 
                key={season.name}
                onClick={() => setSelectedSeason(season.name)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedSeason === season.name 
                    ? "bg-sky-500/20 border-sky-500" 
                    : "bg-black/20 border-white/5 hover:border-white/10"
                } border text-center`}
              >
                <h3 className="text-sm font-bold text-white">{season.name}</h3>
                <span className="text-xs text-gray-500">Intensity: {season.intensity}/10</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSeason}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-xl bg-black/60 border border-sky-500/20"
            >
              <h3 className="text-xl font-bold text-sky-400 mb-2">{selectedSeason}</h3>
              <p className="text-lg font-serif text-white/90 leading-relaxed">
                {seasons.find(s => s.name === selectedSeason)?.description}
              </p>
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

export default RelationshipSeasons;
