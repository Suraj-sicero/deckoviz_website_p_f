"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CITIES = [
  { id: "nyc", name: "New York", center: { x: 50, y: 50 }, traffic: 0.8, parks: [{ x: 50, y: 35, r: 15 }] },
  { id: "tokyo", name: "Tokyo", center: { x: 50, y: 50 }, traffic: 0.9, parks: [{ x: 45, y: 45, r: 10 }, { x: 60, y: 55, r: 8 }] },
  { id: "london", name: "London", center: { x: 50, y: 50 }, traffic: 0.7, parks: [{ x: 35, y: 40, r: 12 }, { x: 65, y: 45, r: 10 }] },
  { id: "mumbai", name: "Mumbai", center: { x: 50, y: 50 }, traffic: 0.95, parks: [{ x: 50, y: 20, r: 20 }] },
];

const CityPulse: React.FC = () => {
  const [city, setCity] = useState(CITIES[0]);
  const [time, setTime] = useState(new Date());
  const [activeLayers, setActiveLayers] = useState({ traffic: true, parks: true, financial: true });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="relative w-full h-screen bg-[#05070a] overflow-hidden flex flex-col items-center justify-center font-mono">
      {/* Background Organic Flow */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute w-full h-full"
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 20%, #06b6d4 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #ec4899 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, #06b6d4 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #06b6d4 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl aspect-video bg-black/40 border border-white/5 rounded-3xl backdrop-blur-2xl overflow-hidden shadow-2xl shadow-blue-500/5">
        
        {/* Map Header */}
        <div className="absolute top-8 left-8 z-20">
          <h1 className="text-3xl font-black text-white/90 tracking-tighter uppercase italic">Invisible City Pulse</h1>
          <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.4em] mt-1">Real-time Biometric Urban Overlay • {city.name}</p>
        </div>

        {/* Layer Controls */}
        <div className="absolute top-8 right-8 z-20 flex gap-2">
          {Object.entries(activeLayers).map(([key, val]) => (
            <button 
              key={key}
              onClick={() => setActiveLayers(prev => ({ ...prev, [key]: !val }))}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${val ? 'bg-white/10 text-white' : 'bg-white/5 text-white/20'}`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* SVG Map Visualization */}
        <svg viewBox="0 0 100 60" className="w-full h-full">
          {/* Arterial Roads (Traffic) */}
          {activeLayers.traffic && (
            <g className="roads">
              <motion.path 
                d="M0,30 L100,30 M50,0 L50,60 M20,10 L80,50 M20,50 L80,10" 
                stroke="#ef4444" 
                strokeWidth="0.2" 
                strokeOpacity="0.3"
                fill="none"
              />
              <motion.path 
                d="M0,30 L100,30 M50,0 L50,60 M20,10 L80,50 M20,50 L80,10" 
                stroke="#f97316" 
                strokeWidth="0.4" 
                fill="none"
                strokeDasharray="2, 5"
                animate={{ strokeDashoffset: [-20, 0] }}
                transition={{ duration: 2 / city.traffic, repeat: Infinity, ease: "linear" }}
                filter="url(#glow)"
              />
            </g>
          )}

          {/* Parks (Breathing) */}
          {activeLayers.parks && city.parks.map((p, i) => (
            <motion.circle 
              key={i}
              cx={p.x} cy={p.y} 
              fill="#14b8a6" 
              fillOpacity="0.2"
              animate={{ r: [p.r, p.r * 1.1, p.r] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              filter="url(#glow)"
            />
          ))}

          {/* Financial Zones (Heat) */}
          {activeLayers.financial && (
            <motion.circle 
              cx="55" cy="35" 
              r="8" 
              fill="url(#heatGrad)" 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}

          {/* Filters */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="heatGrad">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* HUD Metadata */}
        <div className="absolute bottom-400 left-8 flex gap-8">
          <div className="text-left">
            <div className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Density</div>
            <div className="text-xl font-bold text-white">{(city.traffic * 100).toFixed(0)}%</div>
          </div>
          <div className="text-left">
            <div className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Status</div>
            <div className="text-xl font-bold text-emerald-400">ACTIVE</div>
          </div>
          <div className="text-left">
            <div className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Time</div>
            <div className="text-xl font-bold text-blue-400">{time.toLocaleTimeString()}</div>
          </div>
        </div>

        {/* City Selector */}
        <div className="absolute bottom-400 right-8 flex gap-2">
          {CITIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCity(c)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${city.id === c.id ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => window.history.back()}
        className="mt-12 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all text-xs tracking-widest uppercase"
      >
        Return to Terminal
      </button>

      {/* Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </div>
  );
};

export default CityPulse;
