"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Palette, Compass, User, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

interface PersonaCardProps {
  title: string;
  tagline: string;
  bullets: string[];
  icon: React.ReactNode;
  gradient: string;
  bgGradient: string;
  index: number;
}

const personaData = [
  {
    title: "For Families & Kids",
    tagline: "Home is where some of the most beautiful memories happen. Deckoviz helps you remind yourself of the magic flowing through your home, and make new memories that keep on giving.",
    bullets: [
      "Social generative, game nights that light up the room and create moments of laughter and delight",
      "Creative sessions kids and parents build together, on screen, in real time",
      "Memory keeping that turns everyday photos that bring the spark of that moment back to life",
      "Storytelling modes and stories that grow with your family, chapter by chapter"
    ],
    icon: <Users className="w-6 h-6 text-white" />,
    gradient: "from-amber-500 via-rose-500 to-pink-500",
    bgGradient: "radial-gradient(ellipse at top left, #fff7ed 0%, #fef2f2 40%, #ffffff 100%)"
  },
  {
    title: "For Couples",
    tagline: "A shared space deserves a homely feeling that keeps on growing with your love. Vizzy helps you build one.",
    bullets: [
      "Modes made for two, from quiet nights in to date-night energy",
      "Vizzy as your relational muse, sparking conversation, reflection, and connection",
      "Game nights built for couples, for moments of whimsy and laughter",
      "Shared narratives, your story together, told visually and kept",
      "Art and music for setting the mood, before a word is spoken"
    ],
    icon: <Heart className="w-6 h-6 text-white" />,
    gradient: "from-rose-500 via-pink-500 to-indigo-600",
    bgGradient: "radial-gradient(ellipse at top right, #fff1f2 0%, #f5f3ff 40%, #ffffff 100%)"
  },
  {
    title: "For Creatives",
    tagline: "Inspiration shouldn't be left to chance - now, it can live on your wall.",
    bullets: [
      "Vizzy as your creative companion, co-writing, co-designing, always in conversation",
      "A wall that evolves with whatever you're working through creatively - with your projects, your moods, your inspirations",
      "A space and a canvas to think out loud, visually, whenever the mood strikes, to find inspiration whenever you need it",
      "Original art, posters, music and more, generated with you, not just for you"
    ],
    icon: <Palette className="w-6 h-6 text-white" />,
    gradient: "from-purple-600 via-violet-600 to-pink-500",
    bgGradient: "radial-gradient(ellipse at bottom left, #faf5ff 0%, #fcf5ff 40%, #ffffff 100%)"
  },
  {
    title: "For The Growth Seekers",
    tagline: "Most walls just hold decoration. Yours can hold intention and depth.",
    bullets: [
      "Meditation and visualization modes for the moments you need to reset",
      "Vision boards built around what you're working toward",
      "Affirmations, present and visible, not buried in an app you forget to open",
      "Personal art for strength, joy, and beauty, chosen for exactly how you want to feel",
      "Grounding and inspiration posters, there when you need the reminder most"
    ],
    icon: <Compass className="w-6 h-6 text-white" />,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    bgGradient: "radial-gradient(ellipse at center, #ecfdf5 0%, #f0fdfa 40%, #ffffff 100%)"
  },
  {
    title: "For Solo Living",
    tagline: "Your space, reflecting the rich contours of your inner being.",
    bullets: [
      "A wall that proactively reflects your taste, your preferences, and your inner world",
      "Daily creation, curation, and experiences that get more personally attuned to you specifically over time",
      "A companion presence that adapts to your emotional landscape, rhythm and lifestyle, without ever feeling like an empty room, bringing something new, something meaningful, every single day",
      "For home offices, focus-friendly atmospheres, visual and sonic, built for deep work"
    ],
    icon: <User className="w-6 h-6 text-white" />,
    gradient: "from-blue-600 via-indigo-600 to-sky-600",
    bgGradient: "radial-gradient(ellipse at top left, #eff6ff 0%, #e0e7ff 40%, #ffffff 100%)"
  },
  {
    title: "For Art, Book, Film & Culture Enthusiasts",
    tagline: "For the people who live a little bit inside every story they love.",
    bullets: [
      "1000’s of iconic artworks from our global art library",
      "Art and posters inspired by favorite books, films, and cultural touchstones",
      "Deep-dive reference collections, from great works to the stories behind them"
    ],
    icon: <BookOpen className="w-6 h-6 text-white" />,
    gradient: "from-indigo-600 via-violet-700 to-purple-600",
    bgGradient: "radial-gradient(ellipse at bottom right, #f5f3ff 0%, #ede9fe 40%, #ffffff 100%)"
  }
];

const PersonaCard: React.FC<PersonaCardProps> = ({
  title,
  tagline,
  bullets,
  icon,
  gradient,
  bgGradient,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-[2rem] p-7 md:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-white/80 shadow-[0_15px_35px_rgba(37,99,235,0.08)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.18)]"
      style={{
        background: bgGradient,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div>
        {/* Header Badge */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 border border-white/40`}>
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
            {title}
          </h3>
        </div>

        {/* Tagline */}
        <p className="text-sm md:text-base text-slate-700 italic font-medium leading-relaxed mb-6 pl-1 border-l-2 border-indigo-400/40">
          "{tagline}"
        </p>

        {/* Bullets */}
        <ul className="space-y-3 mb-4">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-700 leading-relaxed">
              <span className="mt-1 p-0.5 rounded-full bg-indigo-100 text-indigo-700 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative sparkle icon in top right */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
        <Sparkles className="w-6 h-6 text-indigo-600" />
      </div>
    </motion.div>
  );
};

export default function WhoTheDASPortIsFor() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}>
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-[-10%] w-[650px] h-[650px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.15)" }} />
        <div className="absolute bottom-10 right-[-10%] w-[650px] h-[650px] rounded-full blur-[120px]" style={{ background: "rgba(37, 99, 235, 0.15)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-xs font-bold text-indigo-900 uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Designed For Every Life & Space</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Who the Deckoviz{" "}
            <span className="italic bg-gradient-to-r from-indigo-950 via-indigo-800 to-blue-600 bg-clip-text text-transparent">
              DASPort Is For
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed font-normal">
            Deckoviz DASPort has been lovingly designed for various kinds of people to help express their worlds limitlessly. Here is a glimpse:
          </p>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {personaData.map((persona, index) => (
            <PersonaCard key={persona.title} {...persona} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
