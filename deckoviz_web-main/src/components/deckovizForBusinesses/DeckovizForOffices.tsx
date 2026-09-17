import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Zap, 
  Heart, 
  Volume2, 
  Users, 
  Brain
} from 'lucide-react';

const highlights = [
  { icon: "🔄", title: "Dynamic Focus and Break Cycles", desc: "Immersive visuals for deep work, energising sequences for breaks. Deckoviz shifts intelligently through the day to sustain flow and head off burnout." },
  { icon: "🏛️", title: "The Company Values Wall", desc: "Your mission, milestones, and values, rendered as evolving art. Culture made visible instead of laminated." },
  { icon: "💡", title: "Creative Brainstorm Mode", desc: "Feed Vizzy a project theme and watch it generate a full visual thoughtscape, images, moods, and quotes designed to spark ideas." },
  { icon: "🎉", title: "Team Rituals and Highlights", desc: "Birthdays, weekly wins, shoutouts, turned into art and posters. Syncs with Slack, Notion, and the tools your team already lives in." },
  { icon: "💚", title: "Mood Check-ins and Visual Feedback", desc: "Anonymous sentiment tracking, translated into ambient visuals that reflect the real emotional temperature of the room." },
  { icon: "🧘", title: "Mental Health and Reset Mode", desc: "Dedicated well-being corners with calming multisensory visuals and guided breathing sequences, scent and light integrations optional." },
  { icon: "🎯", title: "Dynamic Meeting Spaces", desc: "Switch a room between Focus, Brainstorm, or Vision mode instantly. Visuals and soundscapes tailored to whatever the meeting actually needs." },
  { icon: "🎨", title: "The Creative Collab Canvas", desc: "A living artboard where teams drop ideas, reflections, and wins. A shared visual memory of the work as it happens." },
  { icon: "🤝", title: "Client-Facing First Impressions", desc: "Reception and lobby walls that tell visitors exactly what kind of company they're walking into, before anyone says a word." },
  { icon: "✨", title: "Creative Studio Inspiration Mode", desc: "For design and creative teams, a constantly evolving visual mood board that keeps the room feeling like a place ideas want to happen." },
  { icon: "🌐", title: "Coworking Community Walls", desc: "Shared spaces that showcase member work, events, and community milestones, giving coworking spaces an identity beyond the wifi password." },
  { icon: "🎵", title: "Personalised Flow Modes", desc: "Individuals and teams set their own mode, Calm, Motivate, Inspire, Reflect, and Deckoviz curates the visual and sonic rhythm around it." },
  { icon: "⚡", title: "Instant Multimodal Generation, On Demand", desc: "Type a prompt, describe a mood, or hum an idea, and Vizzy generates it, such as company-themed art instantly, in any style, for any wall, on the spot." },
  { icon: "👤", title: "Employee-Generated Visuals", desc: "Let your team submit their own ideas, sketches, or prompts and watch them become real, gallery-quality art on the office walls, made by the people who work there." },
  { icon: "🎧", title: "Multisensory Focus Music", desc: "Adaptive soundscapes and focus-tuned music, synced to the visuals on screen, turning any corner of the office into a deep-work zone in seconds." },
  { icon: "🌿", title: "Wellbeing and Focus Art Series", desc: "A rotating library of calming, focus-enhancing visuals designed around attention and emotional regulation, not just aesthetics, for the moments a team needs to reset." }
];

const benefits = [
  { title: "Boost Focus and Creativity", desc: "Environments designed for how the mind actually works, not just how a floor plan looks." },
  { title: "Strengthen Culture, Visibly", desc: "Shared rituals and aesthetic storytelling that make culture something people see and feel daily, not something buried in a handbook." },
  { title: "Improve Emotional Climate", desc: "Ambient visuals that respond to real sentiment, reducing cognitive fatigue across the team." },
  { title: "Increase Retention and Performance", desc: "People stay longer and do better work in spaces they genuinely want to be in." },
  { title: "Elevate Your Employer Brand", desc: "For offices and coworking spaces competing for talent, the room itself becomes part of the pitch." },
  { title: "A Creative Partner That Never Clocks Out", desc: "Vizzy generates fresh visual material on demand, no repeats, no stale décor, ever." },
  { title: "Multisensory, Not Just Visual", desc: "Synchronised visuals, sound, and light, with optional scent, built for focus, flow, or recovery depending on the moment." }
];

const DeckovizForOffices = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
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

      {/* Decorative Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[38vw] h-[38vw] top-[-8%] left-[-10%] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle,#9BE8DB,transparent_70%)] animate-float-a" />
        <div className="absolute w-[34vw] h-[34vw] top-[8%] right-[-8%] rounded-full blur-[90px] opacity-32 bg-[radial-gradient(circle,#5CD9C4,transparent_70%)] animate-float-b" />
        <div className="absolute w-[30vw] h-[30vw] bottom-[6%] left-[20%] rounded-full blur-[90px] opacity-16 bg-[radial-gradient(circle,#1B4C79,transparent_72%)] animate-float-c" />
      </div>

      <main className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-sm font-semibold text-[#0A8378] tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
              DECKOVIZ FOR OFFICES & WORKSPACES
            </div>

            <h1 className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-tight">
              Inspire Productivity & <span className="grad-text">Culture in Your Workspace</span>
            </h1>

            <p className="text-[#4C6A83] text-lg sm:text-2xl font-normal max-w-3xl mx-auto leading-relaxed">
              Transform corporate HQs, focus rooms, and lobbies into intelligent ambient environments that drive focus, collaboration, and team well-being.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card rounded-3xl p-7 border border-white/80 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-fraunces text-xl text-[#0B2A45] font-medium mb-3">{item.title}</h3>
                  <p className="text-sm text-[#4C6A83] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="glass-card rounded-[32px] p-8 sm:p-14 border border-white/80 shadow-2xl space-y-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium mb-4">
                Unrivaled Workspace Benefits
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#2FC2AE] to-[#1B4C79] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {benefits.map((ben, idx) => (
                <div key={idx} className="flex items-start gap-4 py-4 border-b border-[#0B2A45]/10">
                  <CheckCircle2 className="w-6 h-6 stroke-[#0EA99B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-fraunces text-lg text-[#0B2A45] font-medium mb-1">{ben.title}</h4>
                    <p className="text-sm text-[#4C6A83] leading-relaxed">{ben.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6">
              <button
                onClick={handleDemoClick}
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white font-semibold text-base shadow-xl shadow-[#0EA99B]/30 hover:scale-105 transition-all duration-300"
              >
                Schedule Your Office Ambiance Demo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DeckovizForOffices;