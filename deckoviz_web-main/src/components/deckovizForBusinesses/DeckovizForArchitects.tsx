import React from 'react';
import { 
  Building, 
  Sparkles, 
  Palette, 
  Home, 
  Briefcase, 
  ShoppingBag,
  Layers,
  ArrowRight,
  CheckCircle2,
  Box,
  SunMedium
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ARCHITECT_IMG = '/images/h1.png';

const DeckovizArchitectsLanding = () => {
  const navigate = useNavigate();

  const handlePartnerClick = () => {
    navigate('/contact');
  };

  return (
    <div 
      className="relative min-h-screen text-[#0E2438] overflow-x-hidden selection:bg-[#5CD9C4] selection:text-[#071B2C]"
      style={{
        background: `
          radial-gradient(ellipse 60% 45% at 15% 0%, #DDF6F0 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at 100% 15%, rgba(14, 169, 155, 0.10) 0%, transparent 55%),
          linear-gradient(180deg, #F6FAF9 0%, #EDF6F4 100%)
        `,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-fraunces {
          font-family: 'Fraunces', serif;
        }

        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 25px) scale(1.05); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -35px) scale(1.1); }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0.6); }
          70% { box-shadow: 0 0 0 9px rgba(14, 169, 155, 0); }
          100% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0); }
        }
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        .animate-float-a { animation: floatA 22s ease-in-out infinite; }
        .animate-float-b { animation: floatB 26s ease-in-out infinite; }
        .animate-float-c { animation: floatC 30s ease-in-out infinite; }
        .animate-pulse-dot { animation: pulseDot 2.2s infinite; }

        .grad-text {
          background: linear-gradient(100deg, #0EA99B, #1B4C79, #2FC2AE);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradShift 7s linear infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.56);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow: 0 20px 60px -25px rgba(11, 42, 69, 0.25);
        }
      `}</style>

      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[38vw] h-[38vw] top-[-8%] left-[-10%] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle,#9BE8DB,transparent_70%)] animate-float-a" />
        <div className="absolute w-[34vw] h-[34vw] top-[8%] right-[-8%] rounded-full blur-[90px] opacity-32 bg-[radial-gradient(circle,#5CD9C4,transparent_70%)] animate-float-b" />
        <div className="absolute w-[30vw] h-[30vw] bottom-[6%] left-[20%] rounded-full blur-[90px] opacity-16 bg-[radial-gradient(circle,#1B4C79,transparent_72%)] animate-float-c" />
      </div>

      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-sm font-semibold text-[#0A8378] tracking-tight mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
              DECKOVIZ FOR ARCHITECTS AND INTERIOR DESIGNERS
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-[1.1] tracking-tight"
            >
              The Future of Spatial Design:<br />
              From Static Walls <span className="grad-text">to Living Environments</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-[#4C6A83] font-normal max-w-3xl mx-auto leading-relaxed"
            >
              An Architectural Partnership for the Era of <em className="italic text-[#0B2A45] font-medium">Intelligent Spaces.</em>
            </motion.p>
          </div>

          {/* Story Cards Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-16">
            {[
              {
                label: "The Problem",
                icon: "◈",
                quote: "For decades, one of the most significant elements of a space has remained stubbornly static:",
                highlight: "the walls."
              },
              {
                label: "The Paradox",
                icon: "◉",
                quote: "While the life within a building is dynamic - evolving through hours, seasons, and moods - the surfaces have remained",
                highlight: "frozen."
              },
              {
                label: "The Platform",
                icon: "◆",
                quote: "Deckoviz provides the world's first Generative Ambiance and Visual Platform (GAVP) - an architectural infrastructure with an AI-powered",
                highlight: "Experience Layer."
              },
              {
                label: "For You",
                icon: "◇",
                quote: "For every professional who views a room not just as a floor plan, but as an",
                highlight: "emotional sanctuary."
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-3xl border border-white/80 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-3 text-[#0EA99B]">
                  <span className="text-xl">{card.icon}</span>
                  <span className="text-xs font-bold tracking-widest uppercase">{card.label}</span>
                </div>
                <p className="text-[#4C6A83] leading-relaxed text-base">
                  {card.quote}{" "}
                  <span className="text-[#0B2A45] font-semibold italic">{card.highlight}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Platform Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight mb-6">
                  The Emotionally Intelligent Layer:<br />
                  <span className="grad-text">The GAVP Platform</span>
                </h2>
                <div className="space-y-6 text-[#4C6A83] text-lg leading-relaxed mb-8">
                  <p>
                    Deckoviz functions as a multi-dimensional system designed to complement premium interiors. It is a Mood and Ritual Engine, an Ambient Intelligence Layer, and a Storytelling Surface, all housed within a beautifully crafted hardware unit with minimalist wooden frames and halo backlighting.
                  </p>
                  <p>
                    At the heart of the platform is Vizzy, our proprietary AI. Vizzy acts as a 24/7 Creative Director, learning the aesthetic of a space and generating unique, high-fidelity art and visuals and ambiance that ensures the atmosphere is always in perfect sync with the moment.
                  </p>
                </div>
                <button
                  onClick={handlePartnerClick}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white font-semibold text-base shadow-xl shadow-[#0EA99B]/30 hover:scale-105 transition-all duration-300"
                >
                  Partner with Deckoviz
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <div className="glass-card rounded-3xl p-4 shadow-2xl border border-white/80">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                    <img
                      src={ARCHITECT_IMG}
                      alt="Deckoviz Architect Experience"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B2A45]/90 to-transparent">
                      <div className="flex items-center gap-3 text-[#5CD9C4]">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-semibold tracking-wider uppercase">Living Spatial Canvas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights Verticals */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium mb-4">
                Key Highlights Across Every Vertical
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#2FC2AE] to-[#1B4C79] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'For the Modern Home',
                  subtitle: 'The Living Canvas',
                  icon: <Home className="w-8 h-8 stroke-[#0EA99B]" />,
                  desc: 'In residential design, Deckoviz becomes a member of the family. It moves beyond "décor" to become a ritual-driven centerpiece.',
                  points: [
                    'Circadian Rhythm Sync: Visuals and light frequencies that shift from morning clarity to evening warmth.',
                    'The Ritual Engine: Automatically activate "Focus Mode" for home offices or "Celebration Mode" for family gatherings.',
                    'Emotional Resilience: A space that adapts to the mood of the inhabitants, providing calm when needed and energy when desired.'
                  ]
                },
                {
                  title: 'For Business Spaces',
                  subtitle: 'Professional Narrative',
                  icon: <Briefcase className="w-8 h-8 stroke-[#0EA99B]" />,
                  desc: 'In the corporate world, the environment must signal competence and vision.',
                  points: [
                    'Dynamic Brand Identity: Replace generic office art with generative visuals that reflect company core values.',
                    'The Intelligent Lobby: A first impression that moves, evolves, and communicates future-readiness.',
                    'Productivity Optimization: Generative rhythms to reduce employee stress and enhance deep focus.'
                  ]
                },
                {
                  title: 'For Experience Spaces',
                  subtitle: 'The Destination',
                  icon: <ShoppingBag className="w-8 h-8 stroke-[#0EA99B]" />,
                  desc: 'For retail, hospitality, and wellness, atmosphere is the primary product.',
                  points: [
                    'The Social Magnet: Photogenic shareable moments that turn guests into brand advocates.',
                    'Immersive Storytelling: Visuals and synchronized soundscapes to narrate brand heritage.',
                    'Zero-Friction Transformation: Change room vibe for events with voice commands.'
                  ]
                }
              ].map((vertical, idx) => (
                <div 
                  key={idx} 
                  className="glass-card rounded-3xl p-8 border border-white/80 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm mb-6">
                      {vertical.icon}
                    </div>
                    <h3 className="font-fraunces text-2xl text-[#0B2A45] font-medium mb-1">{vertical.title}</h3>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-[#0EA99B] mb-4">{vertical.subtitle}</h4>
                    <p className="text-[#4C6A83] text-base leading-relaxed mb-6">{vertical.desc}</p>
                    
                    <div className="space-y-3">
                      {vertical.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 stroke-[#0EA99B] mt-1 flex-shrink-0" />
                          <p className="text-[#4C6A83] text-sm leading-relaxed">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="py-12 px-4 text-center text-[#7C93A6] text-sm relative z-10 border-t border-[#0B2A45]/10">
        <div className="font-fraunces italic font-medium text-xl text-[#0B2A45] flex items-center justify-center gap-2 mb-2">
          Deckoviz <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#2FC2AE] to-[#1B4C79]" />
        </div>
        <p>Deckoviz Space Labs — Spatial Design & Architecture Platform.</p>
      </footer>
    </div>
  );
};

export default DeckovizArchitectsLanding;