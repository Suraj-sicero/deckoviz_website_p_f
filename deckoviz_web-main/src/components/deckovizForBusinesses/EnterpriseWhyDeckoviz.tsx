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
const IconClock = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconHeart = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconCheckSquare = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const IconBuilding = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
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
const EIGHT_LAYERS = [
  {
    number: "01", title: "A generative engine that thinks like your brand",
    body: "Our generative engine does not just display content. It creates it. Built on a combination of image models, poster agents, video generation models, and marketing agents, it produces custom art, menus, posters, and visual campaigns that are coherent with your brand guidelines, your ethos, and the specific moment in your space, whether that is a quiet Tuesday lunch or New Year's Eve.",
    iconBg: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
    accentColor: "#4f46e5", glowColor: "rgba(99,102,241,0.18)", Icon: IconPalette,
  },
  {
    number: "02", title: "Vizzy: an AI trained on your world",
    body: "Every business gets their own Vizzy, trained on their products, history, offerings, story, and brand personality. Vizzy becomes the intelligent layer between you and your guests in physical space, able to engage, inform, and delight in ways that generic digital displays simply cannot. Over time, Vizzy learns your preferences and grows more proactive, more creative, and more deeply yours.",
    iconBg: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    accentColor: "#2563eb", glowColor: "rgba(59,130,246,0.18)", Icon: IconBrain,
  },
  {
    number: "03", title: "Adaptive ambiance, not static content",
    body: "Content that does not adapt is just decoration. Deckoviz schedules and shifts your visual environment based on the time of day, the occasion, the season, and your guest profile. The atmosphere of a breakfast service and a late-night cocktail hour should feel different. With Deckoviz, they do, automatically and beautifully.",
    iconBg: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
    accentColor: "#7c3aed", glowColor: "rgba(139,92,246,0.18)", Icon: IconWaves,
  },
  {
    number: "04", title: "The moments guests actually remember",
    body: "Guests no longer want transactions. They want experiences with texture, with story, with feeling. Deckoviz gives your space a living, breathing visual identity that guests photograph, talk about, and return for. In an era where the atmosphere itself is increasingly the product, the businesses that invest in generative ambiance will be the ones people recommend.",
    iconBg: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    accentColor: "#db2777", glowColor: "rgba(236,72,153,0.18)", Icon: IconHeart,
  },
  {
    number: "05", title: "From ideation to screen in minutes",
    body: "Describe a campaign to Vizzy. Watch it generate options instantly. Iterate in conversation. Push to one screen or all of them with a single action. What used to require agencies, designers, and weeks of back and forth now takes a conversation.",
    iconBg: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    accentColor: "#059669", glowColor: "rgba(16,185,129,0.18)", Icon: IconSparkles,
  },
  {
    number: "06", title: "A platform that compounds over time",
    body: "This is the defensibility that most technology products cannot claim. The longer you use Deckoviz, the better it gets at understanding your business. Vizzy's creative and curatorial intelligence deepens with every interaction. You are not just buying some static software and hardware. You are building an asset that becomes smarter and more valuable the longer it runs in your space.",
    iconBg: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    accentColor: "#d97706", glowColor: "rgba(245,158,11,0.18)", Icon: IconClock,
  },
  {
    number: "07", title: "Visual coherence across every surface",
    body: "From the art on your walls to your in-store menus to seasonal campaign posters, every visual that Deckoviz produces is aligned with your brand identity. No inconsistency. No off-brand moments. Everything that your guests see feels considered and intentional, because it is.",
    iconBg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    accentColor: "#4f46e5", glowColor: "rgba(99,102,241,0.18)", Icon: IconCheckSquare,
  },
  {
    number: "08", title: "Built for the future of physical retail and hospitality",
    body: "The most successful restaurants, hotels, and retail environments of the next decade will not compete on product alone. They will compete on the entire sensory and emotional experience of being there. Adaptive custom art, AI-powered engagement, and generative ambiance are not differentiators for the future. They are the baseline.",
    iconBg: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
    accentColor: "#0284c7", glowColor: "rgba(14,165,233,0.18)", Icon: IconBuilding,
  },
];

const ELSE_LIST = [
  "Static or pre-scheduled content only",
  "No brand intelligence or memory",
  "No generative creation capability",
  "No AI layer for guest engagement",
  "Requires agencies or designers",
  "Does not improve over time",
];
const DECKOVIZ_LIST = [
  "Generative, adaptive, real-time ambiance",
  "Trained on your brand, guidelines, story",
  "Creates custom art, posters, and campaigns",
  "Vizzy as your in-space AI personality",
  "Ideate to screen in a single conversation",
  "Gets smarter and more valuable over time",
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
      background: "rgba(255, 255, 255, 0.62)",
      backdropFilter: "blur(32px) saturate(180%)",
      WebkitBackdropFilter: "blur(32px) saturate(180%)",
      border: "1.5px solid rgba(255, 255, 255, 0.85)",
      boxShadow: "0 8px 32px rgba(79,70,229,0.1), 0 2px 8px rgba(79,70,229,0.06), inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(99,102,241,0.06)",
      ...style,
    }}
  >
    {/* Strong top-left white sheen — the glass highlight */}
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
      background: "rgba(255,255,255,0.72)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1.5px solid rgba(255,255,255,0.9)",
      boxShadow: "0 2px 12px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,1)",
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
        background: "rgba(255,255,255,0.72)",
        border: "1.5px solid rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 2px 8px rgba(79,70,229,0.1)",
      }}
    >
      {label}
    </span>
    <div className="h-px w-14 bg-gradient-to-l from-transparent to-indigo-300/70" />
  </motion.div>
);

/* ═══════ MAIN SECTION ═══════ */
const EnterpriseWhyDeckoviz: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.04 });

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden mt-16 md:mt-24"
      /* White → indigo gradient base */
      style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0f3ff 20%, #e0e7ff 40%, #c7d2fe 65%, #818cf8 85%, #6366f1 100%)" }}
    >
      {/* ── Bold indigo/violet color blobs — clearly visible behind glass ── */}
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

          <p className="text-gray-800 text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-4 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            There is nothing quite like this.<br/>
            <span className="text-indigo-600">And that is the point.</span>
          </p>
          <div className="w-20 h-px bg-indigo-200 mx-auto mb-6" />
          
          <div className="space-y-5 text-gray-700 text-base md:text-lg max-w-4xl mx-auto leading-relaxed font-medium">
            <p>
              Deckoviz is not a screen, or a media player with a nice haloed frame around it. It is the first generative ambiance and experience platform built specifically for businesses that understand what hospitality, atmosphere, and memorable moments actually mean. The category did not exist before us.
            </p>
            <p>
              We created it, because we see the world shifting. Because the boring ways of the old do not and will not cut it anymore. The customer facing businesses that want to thrive in the changing world increasingly realize the value of narratives, adaptive experiences, personal moments, and delightful moments that their guests can take away.
            </p>
            <p>
              The future is <strong className="text-indigo-700">narrative-based, experiential, adaptive, immersive, interactive</strong>, and with Deckoviz, it’s finally here.
            </p>
          </div>
        </motion.div>

        {/* ════ EIGHT LAYERS ════ */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-24">
          <SectionLabel label="The Secret Sauce" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EIGHT_LAYERS.map((layer) => (
              <motion.div key={layer.number} variants={fadeUp}>
                <Glass
                  className="p-7 md:p-8 h-full group cursor-default transition-all duration-500 hover:-translate-y-2"
                  style={{ boxShadow: `0 8px 32px ${layer.glowColor}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1.5px 0 rgba(255,255,255,1)` }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(ellipse at 25% 0%, ${layer.glowColor} 0%, transparent 65%)` }}
                  />
                  <div className="relative z-10 flex flex-col gap-5 h-full">
                    <div className="flex items-center gap-4">
                      <div
                        className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                        style={{ background: layer.iconBg, boxShadow: `0 4px 16px ${layer.glowColor}` }}
                      >
                        <layer.Icon size={22} />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[14px] font-black tracking-[0.2em] uppercase" style={{ color: layer.accentColor }}>
                          {layer.number}
                        </span>
                        <span className="w-8 h-px bg-indigo-200" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-gray-900 text-xl font-bold mb-3 leading-snug">{layer.title}</h4>
                      <p className="text-gray-600 text-[14.5px] leading-relaxed">{layer.body}</p>
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
            <h3
              className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why there is nothing{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0ea5e9 100%)" }}>
                else like this
              </span>
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Conventional digital screens loop pre-made media. Smart TVs display static playlists. Generic AI art tools generate one-off images with no memory of your brand and no relationship with your business. None of them create. None of them learn. None of them adapt in real time to the specific character and needs of your space. Deckoviz is the first platform to combine generative creation, brand intelligence, contextual scheduling, and a trained AI personality into a single, seamless experience layer for physical spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Everything Else */}
            <Glass className="p-8 md:p-10"
              style={{ background: "rgba(255,255,255,0.5)", boxShadow: "0 4px 20px rgba(0,0,0,0.06), inset 0 1.5px 0 rgba(255,255,255,1)" }}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-gray-400"
                    style={{ background: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.95)" }}>
                    <IconTV size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-500 font-bold tracking-widest uppercase text-sm">Everything Else</h4>
                  </div>
                </div>
                <ul className="space-y-4">
                  {ELSE_LIST.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-0.5 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(254,242,242,0.9)", border: "1px solid rgba(252,165,165,0.5)", color: "#ef4444" }}>
                        <IconX />
                      </span>
                      <span className="text-gray-600 text-[14.5px] leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Glass>

            {/* Deckoviz */}
            <Glass className="p-8 md:p-10"
              style={{
                background: "rgba(238,242,255,0.72)",
                border: "1.5px solid rgba(199,210,254,0.7)",
                boxShadow: "0 12px 40px rgba(79,70,229,0.18), 0 2px 8px rgba(79,70,229,0.1), inset 0 1.5px 0 rgba(255,255,255,1)",
              }}
            >
              <div
                className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(59,130,246,0.6), transparent)" }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #6366f1 0%, #2563eb 100%)", boxShadow: "0 4px 16px rgba(79,70,229,0.4)" }}
                  >
                    <IconFrame size={20} />
                  </div>
                  <div>
                    <h4 className="text-indigo-600 font-bold tracking-widest uppercase text-sm">Deckoviz</h4>
                  </div>
                </div>
                <ul className="space-y-4">
                  {DECKOVIZ_LIST.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-0.5 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(238,242,255,0.9)", border: "1px solid rgba(99,102,241,0.4)", color: "#6366f1" }}>
                        <IconCheck />
                      </span>
                      <span className="text-gray-900 text-[14.5px] leading-relaxed font-bold">{item}</span>
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
              background: "rgba(245,247,255,0.72)",
              border: "1.5px solid rgba(199,210,254,0.65)",
              boxShadow: "0 20px 60px rgba(79,70,229,0.18), 0 4px 16px rgba(79,70,229,0.08), inset 0 1.5px 0 rgba(255,255,255,1)",
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

            <div className="relative z-10 flex flex-col items-center">
              <h3
                className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug max-w-4xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "The atmosphere & ambiance itself are increasingly the products, the experience the service."
              </h3>

              <div className="w-16 h-px bg-indigo-300 mx-auto my-8" />
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-white font-semibold text-base transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0ea5e9 100%)",
                  boxShadow: "0 8px 28px rgba(79,70,229,0.45), 0 2px 8px rgba(79,70,229,0.25)",
                }}
              >
                Talk to us about your space <IconArrow />
              </motion.a>
            </div>
          </Glass>
        </motion.div>

      </div>
    </section>
  );
};

export default EnterpriseWhyDeckoviz;
