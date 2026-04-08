import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── Tool Data ───────────────────────────────────────────────────────────────

const toolCategories = [
  {
    id: "audio-story",
    label: "Audio & Story Creation",
    emoji: "🎙️",
    color: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    tools: [
      {
        id: "audiobook",
        title: "Audiobook Creator",
        description: "Upload any PDF and transform it into a rich, listenable audiobook with natural AI voice narration.",
        icon: "🎧",
        route: "/tools/audiobook",
        badge: "Live",
        accent: "violet",
      },
      {
        id: "storybook",
        title: "Storybook Creator",
        description: "Type your story idea and watch Gemini craft illustrated pages with vivid AI-generated artwork.",
        icon: "📖",
        route: "/tools/storybook",
        badge: "Beta",
        accent: "purple",
      },
    ],
  },
  {
    id: "personal-expression",
    label: "Personal Expression",
    emoji: "🖼️",
    color: "from-pink-500 to-rose-600",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    tools: [
      {
        id: "visual-journal",
        title: "Visual Journal",
        description: "Write your thoughts, feelings and mood — Vizzy converts them into personalized AI visual art cards.",
        icon: "🌸",
        route: "/tools/visual-journal",
        badge: "New",
        accent: "pink",
      },
    ],
  },
  {
    id: "sound-music",
    label: "Sound & Music",
    emoji: "🎵",
    color: "from-cyan-500 to-teal-600",
    bg: "from-cyan-50 to-teal-50",
    border: "border-cyan-200",
    tools: [
      {
        id: "music",
        title: "Music Creator",
        description: "Describe a mood or scene and let Vizzy compose an original AI music track just for you.",
        icon: "🎼",
        route: "/tools/music",
        badge: "Beta",
        accent: "cyan",
      },
    ],
  },
];

// Accent colour maps for Tailwind
const accentMap: Record<string, { btn: string; ring: string; glow: string }> = {
  violet: {
    btn: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500",
    ring: "ring-violet-400",
    glow: "shadow-violet-200",
  },
  purple: {
    btn: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
    ring: "ring-purple-400",
    glow: "shadow-purple-200",
  },
  pink: {
    btn: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500",
    ring: "ring-pink-400",
    glow: "shadow-pink-200",
  },
  cyan: {
    btn: "bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500",
    ring: "ring-cyan-400",
    glow: "shadow-cyan-200",
  },
};

// ─── ToolCard Component ──────────────────────────────────────────────────────

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  route: string;
  badge?: string;
  accent: string;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  title,
  description,
  route,
  badge,
  accent,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const colors = accentMap[accent] ?? accentMap.violet;

  return (
    <div
      className="relative group bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-6 shadow-lg transition-all duration-500 cursor-pointer overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        boxShadow: hovered
          ? `0 20px 60px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(139,92,246,0.1)`
          : `0 4px 24px -4px rgba(0,0,0,0.08)`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          accent === "violet"
            ? "from-violet-50/60 to-purple-50/60"
            : accent === "purple"
            ? "from-purple-50/60 to-indigo-50/60"
            : accent === "pink"
            ? "from-pink-50/60 to-rose-50/60"
            : "from-cyan-50/60 to-teal-50/60"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
      />

      {/* Badge */}
      {badge && (
        <span
          className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-white ${
            badge === "Live"
              ? "bg-emerald-500"
              : badge === "New"
              ? "bg-pink-500"
              : "bg-amber-500"
          }`}
        >
          {badge}
        </span>
      )}

      {/* Icon */}
      <div
        className={`relative text-4xl mb-4 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${
          accent === "violet"
            ? "from-violet-100 to-purple-100"
            : accent === "purple"
            ? "from-purple-100 to-indigo-100"
            : accent === "pink"
            ? "from-pink-100 to-rose-100"
            : "from-cyan-100 to-teal-100"
        } transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>

        {/* CTA */}
        <Link
          to={route}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 ${colors.btn} shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]`}
        >
          Open Tool
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

// ─── Floating Orb ────────────────────────────────────────────────────────────

const FloatingOrb: React.FC<{
  x: string; y: string; size: string; color: string; delay: string;
}> = ({ x, y, size, color, delay }) => (
  <div
    className="absolute rounded-full blur-3xl opacity-20 animate-float pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color, animationDelay: delay }}
  />
);

// ─── Particle ────────────────────────────────────────────────────────────────

const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    className="absolute w-1 h-1 rounded-full bg-purple-400 opacity-60 animate-float pointer-events-none"
    style={style}
  />
);

// ─── Main Page ───────────────────────────────────────────────────────────────

const CreativeStudio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const parallaxX = (mousePos.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePos.y - window.innerHeight / 2) * 0.02;

  const particles = Array.from({ length: 16 }, (_, i) => ({
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    },
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaff] via-white to-[#f5f0ff] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Background orbs */}
        <FloatingOrb x="5%" y="10%" size="500px" color="radial-gradient(circle, #c4b5fd, #a78bfa)" delay="0s" />
        <FloatingOrb x="70%" y="5%" size="400px" color="radial-gradient(circle, #fbcfe8, #f472b6)" delay="1s" />
        <FloatingOrb x="40%" y="60%" size="350px" color="radial-gradient(circle, #a5f3fc, #22d3ee)" delay="2s" />
        <FloatingOrb x="80%" y="75%" size="300px" color="radial-gradient(circle, #bbf7d0, #34d399)" delay="0.5s" />

        {/* Particles */}
        {particles.map((p, i) => <Particle key={i} style={p.style} />)}

        {/* Interactive glow follower */}
        <div
          className="fixed w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, #8b5cf6, #ec4899)",
            transform: `translate(${mousePos.x - 192}px, ${mousePos.y - 192}px)`,
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 text-center max-w-5xl mx-auto"
          style={{ transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)` }}
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-purple-100 shadow-md mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-purple-700">Powered by Vizzy AI · 4 Creative Tools</span>
          </div>

          {/* Title */}
          <h1
            className="font-black leading-none mb-6"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 30%, #ec4899 60%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Fun Creation Studio
            <br />
            <span style={{ fontSize: "0.7em" }}>with Vizzy</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl font-medium text-gray-400 mb-4 tracking-widest uppercase"
            style={{ letterSpacing: "0.3em" }}
          >
            create · play · express
          </p>

          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Your all-in-one AI creative studio. From audio stories to visual journals, music to illustrated books — Vizzy brings your ideas to life.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#tools"
              className="px-8 py-4 rounded-2xl text-white font-bold text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-300"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
                boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
              }}
            >
              🚀 Start Creating
            </a>
            <a
              href="#tools"
              className="px-8 py-4 rounded-2xl font-bold text-base border-2 border-purple-200 text-purple-700 bg-white/70 backdrop-blur hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            >
              🔭 Explore Tools
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs font-medium text-gray-400 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── TOOLS GRID ───────────────────────────────────────────────────── */}
      <section id="tools" className="px-6 py-24 max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-500 mb-3">Available Now</p>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Choose Your Canvas
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Each tool is a full creative workflow — from a blank idea to a finished, shareable creation.
          </p>
        </div>

        {/* Tool categories */}
        <div className="space-y-16">
          {toolCategories.map((category) => (
            <div key={category.id}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{category.emoji}</span>
                <h3
                  className="text-xl font-bold text-gray-800"
                >
                  {category.label}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
              </div>

              {/* Cards */}
              <div
                className={`grid gap-6 ${
                  category.tools.length === 1
                    ? "grid-cols-1 max-w-md"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {category.tools.map((tool, idx) => (
                  <ToolCard
                    key={tool.id}
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    route={tool.route}
                    badge={tool.badge}
                    accent={tool.accent}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="px-6 py-24 bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 relative overflow-hidden">
        {/* BG decoration */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-300 mb-3">Universal Flow</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16" style={{ letterSpacing: "-0.02em" }}>
            Every Tool. One Flow.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "✍️", label: "Input", desc: "Text, mood, PDF, or idea" },
              { step: "02", icon: "⚡", label: "AI Process", desc: "Gemini + specialized APIs" },
              { step: "03", icon: "✨", label: "Output", desc: "Audio, visuals, or stories" },
              { step: "04", icon: "💾", label: "Save & Share", desc: "Download or send to Deckoviz" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/10 text-center hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/30 z-10" />
                )}
                <div className="text-3xl mb-3">{item.icon}</div>
                <span className="text-xs font-bold text-purple-300 tracking-widest">{item.step}</span>
                <h4 className="text-lg font-bold text-white mt-1 mb-1">{item.label}</h4>
                <p className="text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POWERED BY ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10">Powered By</p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "Google Gemini", icon: "🧠", color: "from-blue-50 to-indigo-50 border-blue-200 text-blue-700" },
            { name: "ElevenLabs", icon: "🎙️", color: "from-violet-50 to-purple-50 border-violet-200 text-violet-700" },
            { name: "Stable Diffusion", icon: "🎨", color: "from-orange-50 to-amber-50 border-orange-200 text-orange-700" },
            { name: "MusicGen AI", icon: "🎵", color: "from-cyan-50 to-teal-50 border-cyan-200 text-teal-700" },
          ].map((api) => (
            <div
              key={api.name}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-semibold text-sm bg-gradient-to-br ${api.color} transition-transform hover:scale-105`}
            >
              <span className="text-xl">{api.icon}</span>
              {api.name}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
      <section className="px-6 pb-24 text-center">
        <div
          className="max-w-3xl mx-auto p-12 rounded-4xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)",
            boxShadow: "0 40px 100px -20px rgba(124,58,237,0.5)",
            borderRadius: "2rem",
          }}
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Your creativity has no limits.
            </h2>
            <p className="text-white/75 text-lg mb-8">
              Pick a tool, bring your idea, and let Vizzy do the magic.
            </p>
            <a
              href="#tools"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-700 font-bold text-base hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              ✨ Start Creating Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeStudio;
