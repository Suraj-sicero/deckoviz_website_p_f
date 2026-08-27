import React from 'react';
import { Link } from 'react-router-dom';

const visualizations = [
  { name: 'Aurora Ledger', path: '/aurora-ledger.html', description: 'A weather-driven Aurora Borealis simulation.' },
  { name: 'Resonance', path: '/resonance.html', description: 'An audio-reactive frequency visualizer that brings soundwaves to life.' },
];

export default function VisualizationsHub() {
  return (
    <div className="min-h-screen bg-black text-white p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link to="/art-hub" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-12 transition-colors">
          <span className="mr-2">←</span> Back to Hub
        </Link>
        
        <h1 className="text-5xl font-light tracking-tight mb-4 text-white">Visualization Tools</h1>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl">
          Data-driven and system-reactive visualization engines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizations.map(vis => (
            <a key={vis.path} href={vis.path} className="group rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all hover:border-cyan-500/50 block hover:-translate-y-1">
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">{vis.name}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {vis.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
