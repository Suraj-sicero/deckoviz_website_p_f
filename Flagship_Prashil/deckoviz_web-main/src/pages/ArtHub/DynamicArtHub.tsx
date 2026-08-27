import React from 'react';
import { Link } from 'react-router-dom';

const artworks = [
  { name: 'Gravity', path: '/gravity.html', description: 'Massive swarming fluid nebula with dynamic velocity coloring.' },
  { name: 'Reverie', path: '/reverie.html', description: 'Psychedelic fluid flow with Topographical and Smooth Vivid styles.' },
  { name: 'Ink Tide', path: '/ink-tide.html', description: 'Procedural watercolor ink bleeding and diffusion.' },
  { name: 'Murmuration', path: '/murmuration.html', description: 'Boids-based flocking simulation.' },
  { name: 'Coral Bloom', path: '/coral-bloom.html', description: 'Procedural organic L-system coral generation.' },
  { name: 'Ripple', path: '/ripple.html', description: 'Interactive water physics and fluid displacement.' },
];

export default function DynamicArtHub() {
  return (
    <div className="min-h-screen bg-black text-white p-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link to="/art-hub" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-12 transition-colors">
          <span className="mr-2">←</span> Back to Hub
        </Link>
        
        <h1 className="text-5xl font-light tracking-tight mb-4 text-white">Dynamic Artworks</h1>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl">
          Procedural, generative, and fluid art modes. Click any card to launch the live simulation full-screen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map(art => (
            <a key={art.path} href={art.path} className="group rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all hover:border-purple-500/50 block hover:-translate-y-1">
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">{art.name}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {art.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
