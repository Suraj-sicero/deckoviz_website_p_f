import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animations ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

/* ─── SVG Icons ─── */
const IconWand = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
    <path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/>
    <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
  </svg>
);
const IconBrain = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0"/>
    <path d="M9 10a2 2 0 1 0-4 0c0 1.46.77 2.73 2 3.42V15h4v-1.58A4 4 0 0 0 9 10Z"/>
    <path d="M15 10a2 2 0 1 1 4 0c0 1.46-.77 2.73-2 3.42V15h-4v-1.58A4 4 0 0 1 15 10Z"/>
    <path d="M8 15v2a4 4 0 0 0 8 0v-2"/><path d="M12 2v3"/>
  </svg>
);
const IconSparkles = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
    <path d="M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z"/>
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z"/>
  </svg>
);
const IconPalette = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/>
    <circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);
const IconWaves = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
  </svg>
);
const IconSun = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
const IconHeart = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconLayers = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
    <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/>
    <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"/>
  </svg>
);
const IconHome = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconTV = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>
  </svg>
);
const IconFrame = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

/* ─── Data ─── */
const FOUR_LAYERS = [
  {
    number: "01", title: "Personalization", subtitle: "Vizzy learns who you are",
    body: "Your values, your beliefs, your aesthetic, your lifestyle, your moods, your hopes, your emotional rhythms. Through every interaction, Vizzy grows more attuned to the world you want to inhabit, and the experiences you want to feel in your own home. The longer it lives on your wall, the more it feels like it was made only for you. Because increasingly, it was.",
    iconBg: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
    accentColor: "#4f46e5", glowColor: "rgba(99,102,241,0.18)", Icon: IconBrain,
  },
  {
    number: "02", title: "Ambient Intelligence", subtitle: "Art & photos that arrives before you ask",
    body: "Vizzy does not wait to be told what to show. It creates and curates proactively - pulling artworks, posters and photos that match your current vibe, your state of mind, a birthday, an anniversary, a quiet Tuesday. The frame becomes a responsive environment, always one step ahead of what you were about to feel.",
    iconBg: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    accentColor: "#2563eb", glowColor: "rgba(59,130,246,0.18)", Icon: IconSparkles,
  },
  {
    number: "03", title: "Generative Studio", subtitle: "Create anything, then put it on your wall, instantly",
    body: "A rich and expanding suite of generative tools for producing stunning original artworks, mood boards, vision boards, affirmation boards, movie posters, quote posters, poem posters, and personalised art featuring your world, your face, your story. Abstract, figurative, painterly, graphic. If you can describe it, Vizzy can make it.",
    iconBg: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    accentColor: "#7c3aed", glowColor: "rgba(139,92,246,0.18)", Icon: IconPalette,
  },
  {
    number: "04", title: "Experience Layer", subtitle: "Beyond the visual, into the sensory",
    body: "The screen is only the beginning. Deckoviz adds narration to art, music to visuals, spoken stories to still images. We are building toward a fully multisensory ambiance - sound, light, and soon more, all orchestrated by Vizzy for the specific moment you are in. A frame that speaks. A frame that plays. A frame that breathes.",
    iconBg: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
    accentColor: "#4338ca", glowColor: "rgba(79,70,229,0.18)", Icon: IconWaves,
  },
];

const MOODS = [
  {
    Icon: IconSun, iconColor: "#d97706",
    iconBg: "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.1) 100%)",
    iconBorder: "rgba(245,158,11,0.3)",
    title: "Daily Rituals",
    body: "Set the tone for your mornings. Begin each day with art and affirmations thoughtfully chosen for you. Create evening rituals that slow you down. Dinner rituals that bring people together. Connection rituals that deepen the moments that matter most.",
  },
  {
    Icon: IconHeart, iconColor: "#db2777",
    iconBg: "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(244,114,182,0.1) 100%)",
    iconBorder: "rgba(236,72,153,0.3)",
    title: "Twenty Modes",
    body: "Focus. Creativity. Romantic. Gratitude. Meditation. And fifteen more. Each mode transforms the entire ambiance of your space - the art, the palette, the feeling. Not just a display setting. A shift in the atmosphere of your home, summoned in seconds.",
  },
];

const HARDWARE_DESIGN = [
  {
    number: "01", title: "Firmware engineered for intelligence",
    body: "Most smart displays run generic TV firmware patched together with a few apps. We went deeper. Our custom firmware optimisation on Google TV is built specifically to run Deckoviz's AI agents and avatars natively and seamlessly: the proactive art agent, the poster creation agent, the ambient curation engine, and more. \nThe result is an experience that feels fluid, responsive, and alive in a way that off-the-shelf hardware simply cannot deliver.",
    iconBg: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    accentColor: "#059669", glowColor: "rgba(16,185,129,0.18)", Icon: IconBrain,
  },
  {
    number: "02", title: "Halo backlights that breathe with your art",
    body: "Deckoviz's signature halo backlights are an extension of the artwork itself. You can sync the halo lights dynamically to whatever is on screen; they pull the colours, mood, and energy of each piece out beyond the frame and into the room around it. \nWhen the art shifts, the light shifts with it. Your entire space becomes part of the canvas.",
    iconBg: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    accentColor: "#d97706", glowColor: "rgba(245,158,11,0.18)", Icon: IconSun,
  },
  {
    number: "03", title: "A frame as individual as you are",
    body: "The frame you hang on your wall should feel like yours. With Deckoviz, it is. Choose your materials, your finish, your colour. Select design motifs that reflect your aesthetic. \nAnd if you want, go further: have your favourite quote, a family motto, or a line that means something to you engraved intricately into the frame itself. No two Deckoviz frames are identical. That is entirely the point.",
    iconBg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    accentColor: "#4f46e5", glowColor: "rgba(99,102,241,0.18)", Icon: IconFrame,
  },
];

const PHILOSOPHY_LAYERS = [
  {
    number: "01", title: "Designed to be a lifelong companion",
    body: "Most products are designed to be used for a few years and then replaced. We designed Deckoviz for the opposite. One of the foundational principles behind everything we build is that Deckoviz should be a true lifelong companion: something that travels with you through different seasons, different homes, different chapters of your life. This isn't a gadget you will grow out of, but a portal that will grow with you. \n\nVizzy will evolve with you over the years and decades, learning who you are becoming, not just who you were when you first switched it on. Think of it as your creative OS, your artistic canvas, your home's emotionally intelligent presence, and a companion for the long arc of your life.",
    iconBg: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
    accentColor: "#4f46e5", glowColor: "rgba(99,102,241,0.18)", Icon: IconHeart,
  },
  {
    number: "02", title: "A personal portal built for your world, not the average user",
    body: "We do not build for a hypothetical average user. We build for you. If there is a feature, a mode, an experience, or a type of content you want and we can reasonably make it happen, we will, even if you are the only person who has ever asked for it.\n\nJust send us a message. That is not a marketing line. It is how we work. We see every DASPort as a personal portal, and a portal should open onto the world its owner actually wants to inhabit, not a world designed by committee.",
    iconBg: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    accentColor: "#2563eb", glowColor: "rgba(59,130,246,0.18)", Icon: IconLayers,
  },
  {
    number: "03", title: "Built for flourishing, not for clicks",
    body: "Most modern technology is optimised for engagement, for attention, for dopamine. We have made a deliberate choice to go in a different direction. Our north star in every design decision is eudaimonia: long-term human flourishing. \n\nEvery feature we ship, every experience we build, every interaction we design is evaluated against a single question: does this contribute to the user's genuine wellbeing and growth over time, or does it merely pull them back to the screen? It is a harder standard to build to. We think it is the only one worth holding. For Vizzy is designed to serve you and your creative spirit and your soul not for mere months, but for decades.",
    iconBg: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    accentColor: "#7c3aed", glowColor: "rgba(139,92,246,0.18)", Icon: IconSparkles,
  },
];



const CANVAS_TAGS = [
  "Mood boards","Vision boards","Affirmations","Quote posters","Poem posters",
  "Movie posters","Abstract art","Figurative art","Personal portraits","Daily to-do walls","Story art",
];
const SAMSUNG_LIST = [
  "Shows curated art when the TV is off. That is it.",
  "Fixed catalogue, no generative capabilities",
  "No personalisation, no memory of you",
  "No AI layer, no intelligence",
  "No rituals, moods, or modes",
  "No multisensory experience",
  "Does not learn, does not grow",
  "Passive display, not a companion",
];
const DECKOVIZ_LIST = [
  "Generative ambiance platform built around your life",
  "Create original art, posters, boards, and visuals",
  "Deep personalisation that deepens over time",
  "Vizzy: an AI that knows you and grows with you",
  "Daily rituals, 20 modes, proactive curation",
  "Art with music, narration, and evolving multisensory layers",
  "Gets better, more personal, and more beautiful over time",
  "Your creative companion, every single day",
];

/* ─── White Glass Card ─── */
const Glass: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = "", style }) => (
  <div
    className={`relative rounded-3xl overflow-hidden ${className}`}
    style={{
      background: "rgba(255, 255, 255, 0.35)",
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      border: "1.5px solid rgba(255, 255, 255, 0.55)",
      boxShadow: "0 8px 32px rgba(79,70,229,0.15), 0 2px 8px rgba(79,70,229,0.1), inset 0 1.5px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(99,102,241,0.06)",
      ...style,
    }}
  >
    {/* Strong top-left white sheen - the glass highlight */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 20%, transparent 45%)",
      }}
    />
    {children}
  </div>
);

/* ─── Badge pill ─── */
const Badge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
    style={{
      background: "rgba(255,255,255,0.45)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1.5px solid rgba(255,255,255,0.6)",
      boxShadow: "0 2px 12px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
    }}
  >
    <span className="text-indigo-500 flex-shrink-0" style={{ lineHeight: 0 }}>{icon}</span>
    <span className="text-indigo-600 text-[11px] font-bold uppercase tracking-[0.22em]">{label}</span>
  </div>
);

/* ─── Section label ─── */
const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-12">
    <div className="h-px w-14 bg-gradient-to-r from-transparent to-indigo-300/70" />
    <span
      className="text-[11px] font-bold uppercase tracking-[0.26em] px-3 py-1.5 rounded-full"
      style={{
        color: "#4f46e5",
        background: "rgba(255,255,255,0.35)",
        border: "1.5px solid rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 2px 8px rgba(79,70,229,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
    >
      {label}
    </span>
    <div className="h-px w-14 bg-gradient-to-l from-transparent to-indigo-300/70" />
  </motion.div>
);

/* ═══════ MAIN SECTION ═══════ */
const WhyDeckoviz: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.04 });

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
      /* White → indigo gradient base */
      style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0f3ff 20%, #e0e7ff 40%, #c7d2fe 65%, #818cf8 85%, #6366f1 100%)" }}
    >
      {/* ── Bold indigo/violet color blobs - clearly visible behind glass ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large violet top-left */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.55) 0%, rgba(129,140,248,0.25) 45%, transparent 70%)", filter: "blur(50px)" }} />
        {/* Blue top-right */}
        <div className="absolute -top-24 right-0 w-[550px] h-[550px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(96,165,250,0.2) 45%, transparent 70%)", filter: "blur(55px)" }} />
        {/* Cyan mid-left */}
        <div className="absolute top-1/3 -left-16 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 65%)", filter: "blur(60px)" }} />
        {/* Indigo center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(79,70,229,0.2) 0%, transparent 60%)", filter: "blur(70px)" }} />
        {/* Blue bottom-right */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.45) 0%, rgba(14,165,233,0.2) 45%, transparent 70%)", filter: "blur(55px)" }} />
        {/* Violet bottom-left */}
        <div className="absolute -bottom-20 -left-10 w-[500px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 65%)", filter: "blur(60px)" }} />
      </div>

      {/* ── Subtle dot grid (indigo dots on light bg) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ════ HERO HEADER ════ */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-24">
          <div className="flex justify-center mb-7">
            <Badge icon={<IconWand size={14} />} label="Why Deckoviz" />
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-7"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-gray-900">What Makes It </span>
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0ea5e9 100%)" }}>
              Special
            </span>
            <br />
            <span className="text-gray-900">and What Sets It </span>
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)" }}>
              Apart
            </span>
          </h2>

          <p className="text-gray-800 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4 font-medium">
            Your home has always been waiting for something like this. What makes Deckoviz special is the core. The heart. The essence.
          </p>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Deckoviz moves beyond the traditional paradigms of art frames, smart displays, and smart decor. It is a{" "}
            <strong className="text-indigo-700 font-semibold">living, learning, generative presence</strong>{" "}
            in your home - one that grows more attuned to you with every passing day, and fills your space with art, stories, and feeling that is entirely, irreducibly yours.
          </p>
        </motion.div>

        {/* ════ FOUR LAYERS ════ */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-24">
          <SectionLabel label="The Four Layers" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FOUR_LAYERS.map((layer) => (
              <motion.div key={layer.number} variants={fadeUp}>
                <Glass
                  className="p-7 md:p-8 group cursor-default transition-all duration-500 hover:-translate-y-2"
                  style={{ boxShadow: `0 8px 32px ${layer.glowColor}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1.5px 0 rgba(255,255,255,1)` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(ellipse at 25% 0%, ${layer.glowColor} 0%, transparent 65%)` }}
                  />
                  <div className="relative z-10 flex items-start gap-5">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                      style={{ background: layer.iconBg, boxShadow: `0 4px 16px ${layer.glowColor}` }}
                    >
                      <layer.Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-[11px] font-black tracking-[0.2em] uppercase" style={{ color: layer.accentColor }}>
                          {layer.number}
                        </span>
                        <span className="w-5 h-px bg-indigo-200" />
                        <span className="text-[11px] uppercase tracking-[0.14em] font-bold" style={{ color: layer.accentColor, opacity: 0.65 }}>
                          {layer.title}
                        </span>
                      </div>
                      <h4 className="text-gray-900 text-lg font-bold mb-2.5 leading-snug">{layer.subtitle}</h4>
                      <p className="text-gray-600 text-[13.5px] leading-relaxed">{layer.body}</p>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ════ MODES & RITUALS ════ */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-24">
          <SectionLabel label="Modes and Rituals" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOODS.map((mood) => (
              <motion.div key={mood.title} variants={fadeUp}>
                <Glass className="p-10 group hover:-translate-y-2 transition-all duration-500 text-center">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 60%)" }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-105 transition-transform duration-300"
                      style={{ background: mood.iconBg, border: `1px solid ${mood.iconBorder}`, color: mood.iconColor }}
                    >
                      <mood.Icon size={28} />
                    </div>
                    <h4 className="text-gray-900 text-xl font-bold mb-3">{mood.title}</h4>
                    <p className="text-gray-600 text-[13.5px] leading-relaxed">{mood.body}</p>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ════ VIZZY CREATION CANVAS ════ */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-24">
          <Glass
            className="p-10 md:p-14"
            style={{
              background: "rgba(255,255,255,0.35)",
              boxShadow: "0 12px 48px rgba(79,70,229,0.14), 0 2px 8px rgba(79,70,229,0.07), inset 0 1.5px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(99,102,241,0.1) 0%, transparent 55%)" }}
            />
            <div
              className="absolute top-0 left-12 right-12 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(59,130,246,0.4), transparent)" }}
            />
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="flex justify-center mb-5">
                  <Badge icon={<IconLayers size={14} />} label="The Vizzy Creation Canvas" />
                </div>
                <h3 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  One Space To Create and Display Everything
                </h3>
                <p className="text-gray-600 text-[13.5px] max-w-2xl mx-auto leading-relaxed">
                  Mood boards, vision boards, affirmation boards, to-do lists beautiful enough to live on your wall, quote posters, poem posters, movie posters, and deeply personal art in any style - abstract, figurative, portrait, or something entirely new. Everything you make goes straight from Vizzy's canvas to your frame.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                {CANVAS_TAGS.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.07, y: -2 }}
                    className="px-4 py-2 rounded-full text-[13px] font-semibold cursor-default transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.75)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1.5px solid rgba(255,255,255,0.9)",
                      color: "#4338ca",
                      boxShadow: "0 2px 10px rgba(79,70,229,0.1), inset 0 1px 0 rgba(255,255,255,1)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* ════ HARDWARE DESIGN ════ */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-24">
          <SectionLabel label="Hardware Design" />
          <div className="text-center mb-10">
            <h3 className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl mx-auto leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
              3 more things on the hardware-design side that puts the DASPort in a class of its own
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {HARDWARE_DESIGN.map((layer) => (
              <motion.div key={layer.number} variants={fadeUp}>
                <Glass
                  className="p-7 group cursor-default transition-all duration-500 hover:-translate-y-2"
                  style={{ boxShadow: `0 8px 32px ${layer.glowColor}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1.5px 0 rgba(255,255,255,0.8)` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(ellipse at 25% 0%, ${layer.glowColor} 0%, transparent 65%)` }}
                  />
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                      style={{ background: layer.iconBg, boxShadow: `0 4px 16px ${layer.glowColor}` }}
                    >
                      <layer.Icon size={20} />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-black tracking-[0.2em] uppercase" style={{ color: layer.accentColor }}>
                          {layer.number}
                        </span>
                        <span className="w-5 h-px bg-indigo-200" />
                      </div>
                      <h4 className="text-gray-900 text-lg font-bold mb-2 leading-snug">{layer.title}</h4>
                      <div className="relative overflow-hidden transition-all duration-700 ease-in-out md:max-h-[4.5rem] md:group-hover:max-h-[800px] md:[mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] md:group-hover:[mask-image:none]">
                        <p className="text-gray-600 text-[13.5px] leading-relaxed whitespace-pre-line pb-2">
                          {layer.body.split('\n').filter(Boolean).join('\n\n')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ════ OUR DESIGN PHILOSOPHY ════ */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-24">
          <SectionLabel label="Our Design Philosophy" />
          <div className="text-center mb-10">
            <h3 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Or: What we believe about the things we build
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PHILOSOPHY_LAYERS.map((layer) => (
              <motion.div key={layer.number} variants={fadeUp}>
                <Glass
                  className="p-7 group cursor-default transition-all duration-500 hover:-translate-y-2"
                  style={{ boxShadow: `0 8px 32px ${layer.glowColor}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1.5px 0 rgba(255,255,255,0.8)` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(ellipse at 25% 0%, ${layer.glowColor} 0%, transparent 65%)` }}
                  />
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                      style={{ background: layer.iconBg, boxShadow: `0 4px 16px ${layer.glowColor}` }}
                    >
                      <layer.Icon size={20} />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-black tracking-[0.2em] uppercase" style={{ color: layer.accentColor }}>
                          {layer.number}
                        </span>
                        <span className="w-5 h-px bg-indigo-200" />
                      </div>
                      <h4 className="text-gray-900 text-lg font-bold mb-2 leading-snug">{layer.title}</h4>
                      <div className="relative overflow-hidden transition-all duration-700 ease-in-out md:max-h-[4.5rem] md:group-hover:max-h-[800px] md:[mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)] md:group-hover:[mask-image:none]">
                        <p className="text-gray-600 text-[13.5px] leading-relaxed whitespace-pre-line pb-2">
                          {layer.body.split('\n').filter(Boolean).join('\n\n')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ════ COMPARISON ════ */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-24">
          <div className="text-center mb-12">
            <SectionLabel label="How We Compare" />
            <h3
              className="font-bold mb-4 -mt-4 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-gray-900 text-xl sm:text-2xl md:text-3xl">
                The Samsung Frame TV is the closest thing.
              </span>
              <br />
              <span className="bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl inline-block mt-1"
                style={{ backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0ea5e9 100%)" }}>
                It is still worlds away.
              </span>
            </h3>
            <p className="text-gray-600 text-[13.5px] max-w-2xl mx-auto leading-relaxed">
              Samsung's Frame TV is a beautiful product. When you are not watching television, it shows art. That is where it ends and where Deckoviz begins. We are a complete generative ambiance platform, a creative studio, a personalised daily life companion, and an intelligent ambient presence - all in one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Samsung */}
            <Glass className="p-8"
              style={{ background: "rgba(255,255,255,0.25)", boxShadow: "0 4px 20px rgba(0,0,0,0.06), inset 0 1.5px 0 rgba(255,255,255,0.6)" }}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm text-gray-400"
                    style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.95)" }}>
                    <IconTV size={18} />
                  </div>
                  <div>
                    <h4 className="text-gray-700 font-bold text-base">Samsung Frame TV</h4>
                    <p className="text-gray-400 text-xs font-medium mt-0.5">and everything else</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {SAMSUNG_LIST.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(254,242,242,0.9)", border: "1px solid rgba(252,165,165,0.5)", color: "#ef4444" }}>
                        <IconX />
                      </span>
                      <span className="text-gray-500 text-[13.5px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Glass>

            {/* Deckoviz */}
            <Glass className="p-8"
              style={{
                background: "rgba(238,242,255,0.35)",
                border: "1.5px solid rgba(199,210,254,0.45)",
                boxShadow: "0 12px 40px rgba(79,70,229,0.18), 0 2px 8px rgba(79,70,229,0.1), inset 0 1.5px 0 rgba(255,255,255,0.8)",
              }}
            >
              <div
                className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(59,130,246,0.6), transparent)" }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #6366f1 0%, #2563eb 100%)", boxShadow: "0 4px 16px rgba(79,70,229,0.4)" }}
                  >
                    <IconFrame size={18} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-base">Deckoviz</h4>
                    <p className="text-indigo-600 text-xs font-semibold mt-0.5">The living canvas</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {DECKOVIZ_LIST.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(238,242,255,0.9)", border: "1px solid rgba(99,102,241,0.4)", color: "#6366f1" }}>
                        <IconCheck />
                      </span>
                      <span className="text-gray-800 text-[13.5px] leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Glass>
          </div>
        </motion.div>

        {/* ════ CLOSING ════ */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <Glass
            className="p-10 md:p-16 text-center"
            style={{
              background: "rgba(245,247,255,0.35)",
              border: "1.5px solid rgba(199,210,254,0.45)",
              boxShadow: "0 20px 60px rgba(79,70,229,0.18), 0 4px 16px rgba(79,70,229,0.08), inset 0 1.5px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div
              className="absolute top-0 left-16 right-16 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(59,130,246,0.5), transparent)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ background: "radial-gradient(ellipse at 50% -5%, rgba(99,102,241,0.1) 0%, transparent 55%)" }}
            />

            <div className="relative z-10">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-7 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #2563eb 60%, #0ea5e9 100%)",
                  boxShadow: "0 12px 40px rgba(79,70,229,0.4), 0 4px 12px rgba(79,70,229,0.25)",
                }}
              >
                <IconHome size={36} />
              </div>

              <h3
                className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                This isn't a product you buy once.
                <br />
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0ea5e9 100%)" }}>
                  This is a companion that grows with you.
                </span>
              </h3>

              <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-5">
                The intent behind every feature, every mode, every tool we have built is that Deckoviz becomes part of your daily life in the way that only the most meaningful things do. Something that inspires you. Calms you. Moves you. Makes you think deeply and feel deeply. Helps you connect more intentionally with the people you love.
              </p>
              <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-12">
                As Vizzy learns more about who you are and what you value, it becomes your world-exploration companion, your creative companion, your growth companion. The art on your walls will never be the same. Neither will the way you feel inside them.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/place-order"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-white font-semibold text-base transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0ea5e9 100%)",
                    boxShadow: "0 8px 28px rgba(79,70,229,0.45), 0 2px 8px rgba(79,70,229,0.25)",
                  }}
                >
                  Order yours <IconArrow />
                </motion.a>
                <motion.a
                  href="/vizzy-canvas"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1.5px solid rgba(255,255,255,0.95)",
                    color: "#4f46e5",
                    boxShadow: "0 4px 16px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,1)",
                  }}
                >
                  See what Vizzy creates <IconArrow />
                </motion.a>
              </div>
            </div>
          </Glass>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyDeckoviz;
