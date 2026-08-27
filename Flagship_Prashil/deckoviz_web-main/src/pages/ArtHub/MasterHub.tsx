import React from 'react';
import { Link } from 'react-router-dom';

export default function MasterHub() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-300/30 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="z-10 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">Deckoviz <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">Art Portal</span></h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
          Explore our collection of procedurally generated dynamic artworks and data-driven visualization engines.
        </p>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        
        <Link to="/art-hub/visualizations" className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-10 hover:shadow-2xl hover:shadow-cyan-100 transition-all duration-500 hover:-translate-y-2 block">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-3xl font-semibold mb-4 text-slate-900">Visualization Tools</h2>
          <p className="text-slate-600 leading-relaxed text-lg relative z-10">
            Tools driven by external data, audio inputs, and system mechanics. These engines visualize the invisible forces around us.
          </p>
          <div className="mt-8 text-cyan-600 font-medium tracking-wide text-sm uppercase flex items-center gap-2 relative z-10">
            Explore Visualizations <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </Link>

        <Link to="/art-hub/dynamic-art" className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-10 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 hover:-translate-y-2 block">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-3xl font-semibold mb-4 text-slate-900">Dynamic Artworks</h2>
          <p className="text-slate-600 leading-relaxed text-lg relative z-10">
            Procedural, generative, and fluid art modes. Watch code organically bloom into mesmerizing, chaotic, and beautiful structures.
          </p>
          <div className="mt-8 text-purple-600 font-medium tracking-wide text-sm uppercase flex items-center gap-2 relative z-10">
            Explore Artworks <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </Link>

      </div>
    </div>
  );
}
