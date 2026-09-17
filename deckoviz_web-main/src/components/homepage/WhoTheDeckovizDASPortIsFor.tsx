import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Heart, 
  Sparkles, 
  Compass, 
  User, 
  BookOpen, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

interface Persona {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  haloRgb: string;
  points: string[];
}

const personas: Persona[] = [
  {
    id: "families",
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    badge: "Families & Kids",
    title: "For Families & Kids",
    subtitle: "Home is where some of the most beautiful memories happen. Deckoviz helps you remind yourself of the magic flowing through your home, and make new memories that keep on giving.",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderColor: "border-emerald-200/60 hover:border-emerald-400",
    haloRgb: "16, 185, 129",
    points: [
      "Social generative, game nights that light up the room and create moments of laughter and delight",
      "Creative sessions kids and parents build together, on screen, in real time",
      "Memory keeping that turns everyday photos that bring the spark of that moment back to life",
      "Storytelling modes and stories that grow with your family, chapter by chapter"
    ]
  },
  {
    id: "couples",
    icon: <Heart className="w-6 h-6 text-rose-600" />,
    badge: "Couples",
    title: "For Couples",
    subtitle: "A shared space deserves a homely feeling that keeps on growing with your love. Vizzy helps you build one.",
    gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
    borderColor: "border-rose-200/60 hover:border-rose-400",
    haloRgb: "244, 63, 94",
    points: [
      "Modes made for two, from quiet nights in to date-night energy",
      "Vizzy as your relational muse, sparking conversation, reflection, and connection",
      "Game nights built for couples, for moments of whimsy and laughter",
      "Shared narratives, your story together, told visually and kept",
      "Art and music for setting the mood, before a word is spoken"
    ]
  },
  {
    id: "creatives",
    icon: <Sparkles className="w-6 h-6 text-purple-600" />,
    badge: "Creatives",
    title: "For Creatives",
    subtitle: "Inspiration shouldn't be left to chance - now, it can live on your wall.",
    gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
    borderColor: "border-purple-200/60 hover:border-purple-400",
    haloRgb: "168, 85, 247",
    points: [
      "Vizzy as your creative companion, co-writing, co-designing, always in conversation",
      "A wall that evolves with whatever you're working through creatively - with your projects, your moods, your inspirations",
      "A space and a canvas to think out loud, visually, whenever the mood strikes, to find inspiration whenever you need it",
      "Original art, posters, music and more, generated with you, not just for you"
    ]
  },
  {
    id: "growth-seekers",
    icon: <Compass className="w-6 h-6 text-sky-600" />,
    badge: "Growth Seekers",
    title: "For The Growth Seekers",
    subtitle: "Most walls just hold decoration. Yours can hold intention and depth.",
    gradient: "from-sky-500/10 via-blue-500/5 to-transparent",
    borderColor: "border-sky-200/60 hover:border-sky-400",
    haloRgb: "14, 165, 233",
    points: [
      "Meditation and visualization modes for the moments you need to reset",
      "Vision boards built around what you're working toward",
      "Affirmations, present and visible, not buried in an app you forget to open",
      "Personal art for strength, joy, and beauty, chosen for exactly how you want to feel",
      "Grounding and inspiration posters, there when you need the reminder most"
    ]
  },
  {
    id: "solo-living",
    icon: <User className="w-6 h-6 text-amber-600" />,
    badge: "Solo Living",
    title: "For Solo Living",
    subtitle: "Your space, reflecting the rich contours of your inner being.",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    borderColor: "border-amber-200/60 hover:border-amber-400",
    haloRgb: "245, 158, 11",
    points: [
      "A wall that proactively reflects your taste, your preferences, and your inner world",
      "Daily creation, curation, and experiences that get more personally attuned to you specifically over time",
      "A companion presence that adapts to your emotional landscape, rhythm and lifestyle, without ever feeling like an empty room, bringing something new, something meaningful, every single day",
      "For home offices, focus-friendly atmospheres, visual and sonic, built for deep work"
    ]
  },
  {
    id: "enthusiasts",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    badge: "Art & Culture",
    title: "For Art, Book, Film & Culture Enthusiasts",
    subtitle: "For the people who live a little bit inside every story they love.",
    gradient: "from-indigo-500/10 via-violet-500/5 to-transparent",
    borderColor: "border-indigo-200/60 hover:border-indigo-400",
    haloRgb: "99, 102, 241",
    points: [
      "1000’s of iconic artworks from our global art library",
      "Art and posters inspired by favorite books, films, and cultural touchstones",
      "Deep-dive reference collections, from great works to the stories behind them"
    ]
  }
];

const WhoTheDeckovizDASPortIsFor: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-sky-200/40" />
        <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full blur-[120px] bg-indigo-200/35" />
        <div className="absolute bottom-0 left-10 w-[600px] h-[350px] rounded-full blur-[130px] bg-teal-100/50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-slate-200/80 shadow-sm backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-800 uppercase">
              Limitless Personal Expression
            </span>
          </div>

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who the <span className="bg-gradient-to-r from-indigo-900 via-blue-700 to-teal-700 bg-clip-text text-transparent italic">Deckoviz DASPort</span> Is For
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Deckoviz DASPort has been lovingly designed for various kinds of people to help express their worlds limitlessly. Here is a glimpse:
          </p>

          {/* Quick Category Badges Preview */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-6">
            {personas.map((p) => (
              <span 
                key={p.id}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
              >
                {p.icon}
                {p.badge}
              </span>
            ))}
          </div>

          {/* Toggle Expand Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-700 text-white font-medium text-base shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>{isExpanded ? "Minimize Persona Guide" : "Explore All Personas & Experiences"}</span>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-indigo-200 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 text-indigo-200 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Cards Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 pb-10">
                {personas.map((persona, index) => (
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`group relative rounded-3xl p-8 bg-white/70 backdrop-blur-xl border ${persona.borderColor} shadow-[0_10px_35px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition-all duration-500 flex flex-col justify-between overflow-hidden`}
                  >
                    {/* Background subtle gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      {/* Icon Header */}
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                        {persona.icon}
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-2xl font-bold text-slate-900 mb-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {persona.title}
                      </h3>

                      {/* Subtitle / Intro */}
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium italic border-l-2 border-indigo-400/60 pl-3">
                        "{persona.subtitle}"
                      </p>

                      {/* Bullet points */}
                      <ul className="space-y-3 text-slate-700 text-sm leading-relaxed">
                        {persona.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-indigo-600 font-bold mt-0.5 shrink-0">✦</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative z-10 pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Tailored Experience</span>
                      <span className="text-indigo-600 group-hover:translate-x-1 transition-transform">Explore →</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Collapse Button */}
              <div className="text-center pt-4 pb-8">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                  Minimize Section
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WhoTheDeckovizDASPortIsFor;
