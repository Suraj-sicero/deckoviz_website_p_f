"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Palette, Zap, Music, Image as ImageIcon, Target, Box, 
  Sprout, Cloud, Type, Thermometer, Wind, Shield, 
  Activity, BarChart3, Mountain, Star, Gem, Building2, 
  Microscope, Flame, ArrowRight, Code, Sun, Droplets,
  MessageSquare, Dna, Brain, MapPin, Leaf, Snowflake,
  Compass, Volume2, Bird, Moon, Maximize2, Users,
  Atom, BrainCircuit, Scale, Hand
} from "lucide-react";

const developerTools = [
  {
    title: "Fluid Dreams",
    description: "Interactive fluid simulation with real-time physics",
    route: "/developer-specs/fluid-dreams",
    icon: <Palette size={24} className="text-blue-500" />,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    title: "Particle Galaxy",
    description: "GPU-accelerated cosmic particle simulation",
    route: "/developer-specs/particle-galaxy",
    icon: <Zap size={24} className="text-yellow-500" />,
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "group-hover:border-yellow-500/50"
  },
  {
    title: "Audio Waves",
    description: "Elegant sound visualization with frequency analysis",
    route: "/developer-specs/audio-waves",
    icon: <Music size={24} className="text-pink-500" />,
    color: "from-pink-500/20 to-purple-500/20",
    borderColor: "group-hover:border-pink-500/50"
  },
  {
    title: "Living Paintings",
    description: "Generative art that evolves and breathes slowly",
    route: "/developer-specs/living-paintings",
    icon: <ImageIcon size={24} className="text-orange-500" />,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    title: "Fractal Worlds",
    description: "Explore infinite mathematical zoom universes",
    route: "/developer-specs/fractal-worlds",
    icon: <Target size={24} className="text-emerald-500" />,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "Physics Sandbox",
    description: "Interactive playground with tactile physics objects",
    route: "/developer-specs/physics-sandbox",
    icon: <Box size={24} className="text-indigo-500" />,
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "group-hover:border-indigo-500/50"
  },
  {
    title: "Generative Nature",
    description: "Algorithmic systems simulating biological growth",
    route: "/developer-specs/nature-systems",
    icon: <Sprout size={24} className="text-emerald-500" />,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "AI Dream Worlds",
    description: "Neural network-driven dream-like interpolations",
    route: "/developer-specs/ai-dream-worlds",
    icon: <Cloud size={24} className="text-sky-500" />,
    color: "from-sky-500/20 to-blue-500/20",
    borderColor: "group-hover:border-sky-500/50"
  },
  {
    title: "Typography Art",
    description: "Dynamic text deformation using SDF techniques",
    route: "/developer-specs/typography-art",
    icon: <Type size={24} className="text-cyan-500" />,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "group-hover:border-cyan-500/50"
  },
  {
    title: "Weather Sims",
    description: "Procedural atmospheric environments and effects",
    route: "/developer-specs/weather-simulations",
    icon: <Thermometer size={24} className="text-sky-500" />,
    color: "from-sky-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-sky-500/50"
  },
  {
    title: "Zen Garden",
    description: "Meditative sand patterns with tactile interaction",
    route: "/developer-specs/zen-garden",
    icon: <Wind size={24} className="text-orange-300" />,
    color: "from-orange-300/20 to-yellow-500/20",
    borderColor: "group-hover:border-orange-300/50"
  },
  {
    title: "Symmetry Machine",
    description: "Create complex mathematical mandalas in real-time",
    route: "/developer-specs/symmetry-machine",
    icon: <Shield size={24} className="text-cyan-400" />,
    color: "from-cyan-400/20 to-blue-400/20",
    borderColor: "group-hover:border-cyan-400/50"
  },
  {
    title: "Motion Art",
    description: "Interactive visuals driven by body movement",
    route: "/developer-specs/motion-art",
    icon: <Activity size={24} className="text-pink-500" />,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "group-hover:border-pink-500/50"
  },
  {
    title: "Data As Art",
    description: "Beautiful generative visualizations of complex data",
    route: "/developer-specs/data-as-art",
    icon: <BarChart3 size={24} className="text-indigo-400" />,
    color: "from-indigo-400/20 to-purple-400/20",
    borderColor: "group-hover:border-indigo-400/50"
  },
  {
    title: "Memory Landscapes",
    description: "Terrain generation based on neural patterns",
    route: "/developer-specs/memory-landscapes",
    icon: <Mountain size={24} className="text-emerald-400" />,
    color: "from-emerald-400/20 to-teal-400/20",
    borderColor: "group-hover:border-emerald-400/50"
  },
  {
    title: "Celestial Cosmos",
    description: "Procedurally generated stars and planetary systems",
    route: "/developer-specs/celestial-cosmos",
    icon: <Star size={24} className="text-yellow-300" />,
    color: "from-yellow-300/20 to-orange-300/20",
    borderColor: "group-hover:border-yellow-300/50"
  },
  {
    title: "Material Simulations",
    description: "Study of complex light and matter interactions",
    route: "/developer-specs/material-simulations",
    icon: <Gem size={24} className="text-blue-400" />,
    color: "from-blue-400/20 to-indigo-400/20",
    borderColor: "group-hover:border-blue-400/50"
  },
  {
    title: "Dream Architecture",
    description: "Impossible and surreal spatial structures",
    route: "/developer-specs/dream-architecture",
    icon: <Building2 size={24} className="text-purple-400" />,
    color: "from-purple-400/20 to-pink-400/20",
    borderColor: "group-hover:border-purple-400/50"
  },
  {
    title: "Organism Sim",
    description: "Simulation of digital biological evolution",
    route: "/developer-specs/organism-sim",
    icon: <Microscope size={24} className="text-lime-400" />,
    color: "from-lime-400/20 to-green-400/20",
    borderColor: "group-hover:border-lime-400/50"
  },
  {
    title: "The Last Light",
    description: "Visualize the journey of a single photon traveling from a stellar event across space",
    route: "/developer-specs/last-light",
    icon: <Sun size={24} className="text-yellow-400" />,
    color: "from-yellow-400/20 to-orange-400/20",
    borderColor: "group-hover:border-yellow-400/50"
  },
  {
    title: "Fermenting World",
    description: "Slow, looping microscopic visualization of meditative fermentation processes",
    route: "/developer-specs/fermenting-world",
    icon: <Droplets size={24} className="text-amber-500" />,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "Language Memorial",
    description: "A silent, immersive memorial representing extinct languages through visual worlds and fading scripts",
    route: "/developer-specs/language-memorial",
    icon: <MessageSquare size={24} className="text-slate-400" />,
    color: "from-slate-400/20 to-zinc-400/20",
    borderColor: "group-hover:border-slate-400/50"
  },
  {
    title: "Bioluminescent Abyss",
    description: "Deep-sea ecosystem where bioluminescent creatures evolve and emit light in total darkness",
    route: "/developer-specs/bioluminescent-abyss",
    icon: <Droplets size={24} className="text-cyan-500" />,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "group-hover:border-cyan-500/50"
  },
  {
    title: "Dream Logic",
    description: "First-person immersive experience of impossible architecture and spatial paradoxes",
    route: "/developer-specs/dream-logic",
    icon: <Box size={24} className="text-stone-400" />,
    color: "from-stone-400/20 to-amber-400/20",
    borderColor: "group-hover:border-stone-400/50"
  },
  {
    title: "Protein Fold Theatre",
    description: "Real-time 3D animation of protein chains folding into structures with synchronized sound",
    route: "/developer-specs/protein-fold",
    icon: <Dna size={24} className="text-blue-400" />,
    color: "from-blue-400/20 to-emerald-400/20",
    borderColor: "group-hover:border-blue-400/50"
  },
  {
    title: "Extinct Colours",
    description: "Full-screen immersive experience reconstructing historical pigments with narrative context",
    route: "/developer-specs/extinct-color",
    icon: <Palette size={24} className="text-pink-500" />,
    color: "from-pink-500/20 to-purple-500/20",
    borderColor: "group-hover:border-pink-500/50"
  },
  {
    title: "Thought Weaver",
    description: "A living knowledge graph that expands and behaves like a thinking mind",
    route: "/developer-specs/thought-weaver",
    icon: <Brain size={24} className="text-purple-400" />,
    color: "from-purple-400/20 to-pink-400/20",
    borderColor: "group-hover:border-purple-400/50"
  },
  {
    title: "Sound Archaeology",
    description: "Transform audio into culturally-inspired visual artifacts from ancient civilizations",
    route: "/developer-specs/sound-archaeology",
    icon: <Music size={24} className="text-orange-400" />,
    color: "from-orange-400/20 to-stone-400/20",
    borderColor: "group-hover:border-orange-400/50"
  },
  {
    title: "Mirror Painter",
    description: "Dual-canvas drawing system where an autonomous mirror interprets your strokes",
    route: "/developer-specs/mirror-painter",
    icon: <Palette size={24} className="text-pink-400" />,
    color: "from-pink-400/20 to-blue-400/20",
    borderColor: "group-hover:border-pink-400/50"
  },
  {
    title: "Signal Interception",
    description: "Realistic CRT-style simulation of oscilloscope, spectrogram, and radar signals",
    route: "/developer-specs/signal-interception",
    icon: <Activity size={24} className="text-emerald-500" />,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "Invisible City Pulse",
    description: "Transform urban data into a living organism-like visualization layered over city maps",
    route: "/developer-specs/city-pulse",
    icon: <MapPin size={24} className="text-cyan-400" />,
    color: "from-cyan-400/20 to-blue-400/20",
    borderColor: "group-hover:border-cyan-400/50"
  },
  {
    title: "Decay & Bloom",
    description: "A slow, meditative lifecycle simulation of organic objects through growth and rest",
    route: "/developer-specs/decay-bloom",
    icon: <Leaf size={24} className="text-emerald-500" />,
    color: "from-emerald-500/20 to-amber-500/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "Constellation Myth",
    description: "Connect stars to create figures and generate ancient celestial mythologies",
    route: "/developer-specs/constellation-builder",
    icon: <Star size={24} className="text-indigo-400" />,
    color: "from-indigo-400/20 to-blue-400/20",
    borderColor: "group-hover:border-indigo-400/50"
  },
  {
    title: "Microscope World",
    description: "An infinite zoom experience through layered microscopic structures and materials",
    route: "/developer-specs/microscope-world",
    icon: <Microscope size={24} className="text-emerald-400" />,
    color: "from-emerald-400/20 to-teal-400/20",
    borderColor: "group-hover:border-emerald-400/50"
  },
  {
    title: "Tidal Rooms",
    description: "Minimal architectural spaces that subtly breathe with real-world ocean tides",
    route: "/developer-specs/tidal-rooms",
    icon: <Building2 size={24} className="text-stone-300" />,
    color: "from-stone-300/20 to-blue-300/20",
    borderColor: "group-hover:border-stone-300/50"
  },
  {
    title: "Emotion Alchemy",
    description: "Convert emotions and memories into deterministic molecular diagrams",
    route: "/developer-specs/emotion-alchemy",
    icon: <Microscope size={24} className="text-blue-400" />,
    color: "from-blue-400/20 to-purple-400/20",
    borderColor: "group-hover:border-blue-400/50"
  },
  {
    title: "Living Maps",
    description: "Generative topographic maps that evolve with geological events",
    route: "/developer-specs/living-maps",
    icon: <Mountain size={24} className="text-stone-500" />,
    color: "from-stone-500/20 to-emerald-500/20",
    borderColor: "group-hover:border-stone-500/50"
  },
  {
    title: "Field Painter",
    description: "Interactive electromagnetic field simulation with real-time line tracing",
    route: "/developer-specs/field-painter",
    icon: <Zap size={24} className="text-yellow-400" />,
    color: "from-yellow-400/20 to-orange-400/20",
    borderColor: "group-hover:border-yellow-400/50"
  },
  {
    title: "Shadow Puppetry",
    description: "Cinematic silhouettes morphing on a glowing backlit paper screen",
    route: "/developer-specs/shadow-puppetry",
    icon: <Star size={24} className="text-amber-500" />,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "Ambient Ritual",
    description: "Meditative and atmospheric visual loops",
    route: "/developer-specs/ambient-ritual",
    icon: <Flame size={24} className="text-orange-500" />,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    title: "Solar Wind Painter",
    description: "Physically-responsive aurora visualization driven by real-time solar wind data from DSCOVR",
    route: "/developer-specs/solar-wind-painter",
    icon: <Wind size={24} className="text-cyan-400" />,
    color: "from-cyan-400/20 to-emerald-400/20",
    borderColor: "group-hover:border-cyan-400/50"
  },
  {
    title: "Neural Firestorm",
    description: "Stable, emergent spiking neural network exhibiting coherent wave dynamics and brain states",
    route: "/developer-specs/neural-firestorm",
    icon: <Brain size={24} className="text-purple-500" />,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "group-hover:border-purple-500/50"
  },
  {
    title: "The Grief Cartographer",
    description: "Translate unspoken thoughts into a subtle, evolving 3D emotional landscape system",
    route: "/developer-specs/grief-cartographer",
    icon: <Mountain size={24} className="text-emerald-400" />,
    color: "from-emerald-500/20 to-stone-500/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "Supercooled Symmetry",
    description: "Physically-plausible crystallisation system with 6-fold hexagonal growth and dissolution",
    route: "/developer-specs/symmetry-crystals",
    icon: <Snowflake size={24} className="text-blue-300" />,
    color: "from-blue-300/20 to-cyan-300/20",
    borderColor: "group-hover:border-blue-300/50"
  },
  {
    title: "Ancient Trade Atlas",
    description: "Living historical system where trade networks evolve and flow across time (3000 BCE - 1500 CE)",
    route: "/developer-specs/trade-atlas",
    icon: <Compass size={24} className="text-amber-700" />,
    color: "from-amber-700/20 to-orange-700/20",
    borderColor: "group-hover:border-amber-700/50"
  },
  {
    title: "Synesthesia Engine",
    description: "Immersive perceptual field mapping sound into spatial colour landscapes across multiple modes",
    route: "/developer-specs/synesthesia-engine",
    icon: <Volume2 size={24} className="text-pink-400" />,
    color: "from-pink-400/20 to-purple-400/20",
    borderColor: "group-hover:border-pink-400/50"
  },
  {
    title: "Murmuration Engine",
    description: "Large-scale coherent flock simulation exhibiting realistic starling murmuration dynamics",
    route: "/developer-specs/murmuration-engine",
    icon: <Bird size={24} className="text-blue-400" />,
    color: "from-blue-400/20 to-indigo-400/20",
    borderColor: "group-hover:border-blue-400/50"
  },
  {
    title: "Seismic Memory Wall",
    description: "Living seismic memorial transforming earthquake data into a continuously evolving visual record",
    route: "/developer-specs/seismic-memory",
    icon: <Activity size={24} className="text-orange-500" />,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    title: "The Dream Taxonomy",
    description: "Living, evolving personal constellation of dreams where symbolic patterns emerge over time",
    route: "/developer-specs/dream-taxonomy",
    icon: <Moon size={24} className="text-purple-400" />,
    color: "from-purple-400/20 to-indigo-400/20",
    borderColor: "group-hover:border-purple-400/50"
  },
  {
    title: "Cosmic Background Portrait",
    description: "Minimal, meditative cosmic viewing experience presenting the Planck CMB map as a living artifact",
    route: "/developer-specs/cosmic-background",
    icon: <Maximize2 size={24} className="text-cyan-400" />,
    color: "from-cyan-400/20 to-black/40",
    borderColor: "group-hover:border-cyan-400/50"
  },
  {
    title: "Six Degrees of Humanity",
    description: "Cinematic, evolving network revealing the structure of global human connectivity and community clusters",
    route: "/developer-specs/human-connectivity",
    icon: <Users size={24} className="text-blue-500" />,
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    title: "Quantum Foam",
    description: "Non-repeating, sub-perceptual dynamic surface simulating the chaotic fluctuations of space-time",
    route: "/developer-specs/quantum-foam",
    icon: <Atom size={24} className="text-cyan-500" />,
    color: "from-cyan-500/20 to-slate-900/40",
    borderColor: "group-hover:border-cyan-500/50"
  },
  {
    title: "Oral History Fire",
    description: "Living fire-driven storytelling system where text emerges from and dissolves into the flame",
    route: "/developer-specs/oral-history-fire",
    icon: <Flame size={24} className="text-orange-500" />,
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    title: "Slime Mould Intelligence",
    description: "High-performance Physarum simulation producing realistic network optimization behavior and route reinforcement",
    route: "/developer-specs/slime-mould",
    icon: <BrainCircuit size={24} className="text-amber-500" />,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "Sky Chronometer",
    description: "Physically grounded sky-light simulation reflecting real-world solar conditions and Kelvin temperatures",
    route: "/developer-specs/sky-chronometer",
    icon: <Sun size={24} className="text-yellow-400" />,
    color: "from-yellow-400/20 to-blue-400/20",
    borderColor: "group-hover:border-yellow-400/50"
  },
  {
    title: "Argument Sculptor",
    description: "Structurally meaningful 3D system where logical relationships directly affect physical stability and form",
    route: "/developer-specs/argument-sculptor",
    icon: <Scale size={24} className="text-blue-400" />,
    color: "from-blue-400/20 to-slate-800/40",
    borderColor: "group-hover:border-blue-400/50"
  },
  {
    title: "Exoplanet Weather Station",
    description: "Scientifically grounded atmospheric renderer where visual behavior is directly tied to real planetary data",
    route: "/developer-specs/exoplanet-weather",
    icon: <Cloud size={24} className="text-cyan-400" />,
    color: "from-cyan-400/20 to-indigo-900/40",
    borderColor: "group-hover:border-cyan-400/50"
  },
  {
    title: "Internet Heartbeat",
    description: "Living global system where internet infrastructure and data flow behave like a biological circulatory network",
    route: "/developer-specs/internet-heartbeat",
    icon: <Activity size={24} className="text-teal-400" />,
    color: "from-teal-400/20 to-emerald-900/40",
    borderColor: "group-hover:border-teal-400/50"
  },
  {
    title: "Haptic Memory Theatre",
    description: "Slow, sensory-driven material experience where surfaces evoke tactile memory through raking light and PBR detail",
    route: "/developer-specs/haptic-memory",
    icon: <Hand size={24} className="text-amber-500" />,
    color: "from-amber-500/20 to-stone-900/40",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "Silence Between Notes",
    description: "Temporal composition system where silence becomes structured visual architecture through real-time audio analysis",
    route: "/developer-specs/silence-architecture",
    icon: <Music size={24} className="text-blue-400" />,
    color: "from-blue-400/20 to-slate-900/40",
    borderColor: "group-hover:border-blue-400/50"
  },
];

const ExperimentalArtModes: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
              Experimental Art Modes
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A collection of advanced generative art experiments and developer utilities pushing the boundaries of digital expression.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {developerTools.map((tool, index) => (
            <motion.a
              key={index}
              href={tool.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${tool.borderColor} overflow-hidden`}
            >
              {/* Card Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
                  {tool.description}
                </p>
                <div className="flex items-center text-xs font-semibold text-purple-400 group-hover:text-white transition-colors">
                  <span>ACTIVATE MODE</span>
                  <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 text-center border-t border-white/10 pt-10"
        >
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <Code size={16} />
            <span>Built with Deckoviz Engine v2.0</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperimentalArtModes;
