import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/* ─── Content ─────────────────────────────────────────────────────── */
const sections = [
  {
    num: "01",
    emoji: "🎭",
    tag: "Ambiance",
    title: "Modes that set the scene",
    accent: ["#4338ca", "#6366f1"],
    highlight: "Romantic mode. Celebration mode. Deep mode. Playful mode.",
    body: [
      "Deckoviz has a suite of modes built around emotional and relational states. Romantic mode for an intimate evening - soft, atmospheric visuals, curated moodscapes, the right ambiance without any effort. Celebration mode when something worth marking has happened. Playful mode when the energy calls for lightness and fun. Deep mode for a conversation that deserves more than a distracted room.",
      "The environment you inhabit shapes the quality of the experience you have in it. Deckoviz gives you the ability to shape that environment intentionally, for the kind of moment you actually want to have.",
    ],
  },
  {
    num: "02",
    emoji: "🌊",
    tag: "Environment",
    title: "Moodscapes that transform your space",
    accent: ["#1d4ed8", "#4f46e5"],
    highlight: "Your environment is not neutral.",
    body: [
      "Beyond modes, Deckoviz's moodscapes bring the right sensory atmosphere into your home. Imagine an evening with your partner - candlelight visuals on the wall, a soundscape layered with soft classical music, the entire room oriented around presence and connection rather than distraction.",
      "Or a slow Sunday morning with your family, the frame cycling through warm, unhurried imagery, the sound of rain, the feeling of nowhere else to be. Deckoviz treats your environment as an active ingredient in the quality of your relationships.",
    ],
  },
  {
    num: "03",
    emoji: "🎮",
    tag: "Play",
    title: "Games with substance",
    accent: ["#7c3aed", "#6366f1"],
    highlight: "Games that create the kind of shared moments that become stories you tell for years.",
    body: [
      "Deckoviz carries a full creative games universe designed for couples, friends, and families. These are not mindless games. They are not dopamine-seeking, depletive, or built around passivity.",
      "They are interactive, generative, deeply personalized games designed to infuse joy, delight, depth, and genuine fun into your time together. Games that make you laugh hard and think deeply. Games that bring out sides of each other you have not seen before. Connection through play is one of the oldest human experiences, and Deckoviz is built to bring it back into the home in a form worthy of it.",
    ],
  },
  {
    num: "04",
    emoji: "🎨",
    tag: "Creation",
    title: "Co-creating together",
    accent: ["#4338ca", "#818cf8"],
    highlight: "When you create together, you know each other more.",
    body: [
      "There is something quietly profound about making something with another person. Co-creating art, co-creating posters, co-creating stories - the act of building something together draws people closer in ways that conversation alone sometimes cannot.",
      "Deckoviz gives you a shared creative canvas. Design a piece of art together. Build a visual that captures something true about your relationship. Write a story you then see displayed on your wall. Create a poster that means something only to the two of you. Creative actualization and relational actualization, it turns out, are deeply intertwined.",
    ],
  },
  {
    num: "05",
    emoji: "🕯️",
    tag: "Ritual",
    title: "Rituals that hold a relationship together",
    accent: ["#3730a3", "#6366f1"],
    highlight: "Small, recurring, intentional moments are the quiet architecture of a thriving relationship.",
    body: [
      "The research on long-term relationships is fairly consistent on one thing: rituals matter. Shared rituals are one of the primary ways that relationships maintain depth and warmth over time.",
      "Deckoviz has a rituals feature built for exactly this. A weekly deep talk ritual, prompted and held by the frame. A nightly check-in. A dinner ritual where the frame sets the right atmosphere and offers a question worth sitting with. A morning gratitude practice you share with your partner before the day begins. These are not grand gestures.",
    ],
  },
  {
    num: "06",
    emoji: "💌",
    tag: "Expression",
    title: "Notes, cards, and messages on the wall",
    accent: ["#4f46e5", "#7c3aed"],
    highlight: "Words have always been one of the primary currencies of love.",
    body: [
      "Send each other beautiful notes through the frame. Gratitude cards. Reminder cards that say something you want them to come home to. A message waiting for your partner when they wake up. An anniversary note displayed as art.",
      "Deckoviz gives words a canvas worthy of them - beautiful, living, yours.",
    ],
  },
  {
    num: "07",
    emoji: "👥",
    tag: "Community",
    title: "Not just for your partner",
    accent: ["#2563eb", "#4f46e5"],
    highlight: "Relational actualization is about the full texture of your social world.",
    body: [
      "Deckoviz is not only a tool for romantic relationships. The same features that deepen a partnership deepen every significant relationship in your life. Game nights with friends that have genuine depth to them. Family rituals that create the shared rhythms a household thrives on.",
      "Creative sessions with the people you love. A moodscape for a dinner with old friends that makes the evening feel like an occasion. Send gratitude cards or invite cards, or just something truly soul inspiring, to the frames in their homes.",
    ],
  },
  {
    num: "08",
    emoji: "🔗",
    tag: "Ecosystem",
    title: "The ecosystem working together",
    accent: ["#4338ca", "#6366f1"],
    highlight: "Relational actualization and creative actualization, feeding each other.",
    body: [
      "Elinity and Deckoviz were designed to work together seamlessly. Elinity finds you your most resonant people and gives you the tools to build extraordinary relationships with them. Deckoviz gives you the physical environment and creative infrastructure to live those relationships more fully, more beautifully, more intentionally.",
      "Relational actualization and creative actualization don't have to be separate destinations anymore. They can feed each other. And the Elinity-Deckoviz ecosystem was built with exactly that in mind.",
    ],
  },
];

/* ─── Component ────────────────────────────────────────────────────── */
export default function ElinityDeckovizGuide() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Subtle particle canvas for hero */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.5 + 0.1,
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,140,248,${d.a})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#0c0a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

        .guide-body { font-family: 'Inter', sans-serif; }
        .guide-serif { font-family: 'Playfair Display', serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerText {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(4vw, 6vh) scale(1.05); }
          66%       { transform: translate(-3vw, 4vh) scale(0.97); }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .anim-up { opacity: 0; animation: fadeSlideUp 0.75s cubic-bezier(.22,1,.36,1) forwards; }

        .hero-gradient-text {
          background: linear-gradient(100deg, #e0e7ff 0%, #a5b4fc 30%, #818cf8 55%, #c4b5fd 80%, #e0e7ff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 6s linear infinite;
        }
        .subtitle-text {
          background: linear-gradient(90deg, #a5b4fc, #c4b5fd, #818cf8);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.45s cubic-bezier(.22,1,.36,1);
        }
        .section-glass:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
          border-color: rgba(129,140,248,0.25);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.08);
        }
        .num-badge {
          font-family: 'Playfair Display', serif;
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(129,140,248,0.08));
          border: 1px solid rgba(129,140,248,0.2);
        }
        .tag-pill {
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
        }
        .highlight-quote {
          background: linear-gradient(90deg, rgba(99,102,241,0.12), rgba(129,140,248,0.06), transparent);
          border-left: 2px solid;
        }
        .cta-glass {
          background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(79,70,229,0.10), rgba(124,58,237,0.08));
          border: 1px solid rgba(129,140,248,0.2);
          backdrop-filter: blur(20px);
        }
        .btn-primary {
          background: linear-gradient(135deg, #4338ca, #6366f1, #818cf8);
          box-shadow: 0 8px 32px rgba(99,102,241,0.4);
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          box-shadow: 0 12px 40px rgba(99,102,241,0.6);
          transform: translateY(-2px);
        }
        .btn-ghost {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: #c7d2fe;
          transition: all 0.3s ease;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(129,140,248,0.4);
          transform: translateY(-2px);
        }
        .dot-row {
          background-image: radial-gradient(rgba(129,140,248,0.18) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .hero-card {
          background: linear-gradient(135deg,
            rgba(255,255,255,0.06) 0%,
            rgba(99,102,241,0.08) 50%,
            rgba(255,255,255,0.03) 100%
          );
          border: 1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
      `}</style>

      {/* ── Background Blobs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)", animation: "floatBlob 30s ease-in-out infinite" }} />
        <div className="absolute top-1/2 -right-48 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", animation: "floatBlob 38s ease-in-out infinite reverse" }} />
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", animation: "floatBlob 25s ease-in-out infinite 5s" }} />
        {/* Fine grid texture */}
        <div className="absolute inset-0 opacity-30 dot-row" />
      </div>

      {/* ── Navbar strip ── */}
      <div className="relative z-20 px-6 sm:px-10 pt-8 pb-4 flex items-center justify-between max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-300/70 hover:text-indigo-200 font-medium text-sm transition-all duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <div className="text-indigo-400/50 text-[10px] tracking-[0.3em] uppercase font-medium">
          Elinity × Deckoviz
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pt-12 pb-24">

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" style={{ zIndex: -1 }} />

        {/* Top badge */}
        <div className="anim-up flex justify-center mb-10" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/10 border border-indigo-500/25 px-5 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animation: "softPulse 2s ease-in-out infinite" }} />
            <span className="text-indigo-300 text-[10px] font-bold tracking-[0.25em] uppercase">A Relational Guide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" style={{ animation: "softPulse 2s ease-in-out infinite 0.5s" }} />
          </div>
        </div>

        {/* Main headline */}
        <div className="anim-up text-center mb-6" style={{ animationDelay: "0.15s" }}>
          <h1 className="guide-serif text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] leading-[1.1] font-bold mb-3">
            <span className="hero-gradient-text">How Elinity Users</span>
            <br />
            <span className="text-white/90">Can Use </span>
            <span className="hero-gradient-text italic">Deckoviz</span>
            <br />
            <span className="text-white/90">to Deepen Their</span>
            <br />
            <span className="hero-gradient-text">Relationships</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="anim-up text-center mb-14" style={{ animationDelay: "0.25s" }}>
          <p className="subtitle-text text-base sm:text-lg font-medium tracking-wide">
            A guide to relational and creative actualization
          </p>
          <p className="subtitle-text text-sm opacity-80 mt-1">
            through the Elinity-Deckoviz ecosystem
          </p>
        </div>

        {/* Hero body card */}
        <div className="anim-up hero-card rounded-3xl p-8 sm:p-12 relative overflow-hidden" style={{ animationDelay: "0.35s" }}>
          {/* Top shimmer */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
          {/* Corner ornament */}
          <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-indigo-400/20 rounded-tr-2xl" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-violet-400/15 rounded-bl-2xl" />
          {/* Large bg emoji */}
          <div className="absolute -bottom-4 -right-4 text-[120px] opacity-5 select-none pointer-events-none">💞</div>

          <div className="grid sm:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="text-5xl sm:text-6xl select-none">💞</div>
            <div className="space-y-5">
              <p className="text-indigo-100/90 text-base sm:text-lg leading-relaxed font-light">
                The best relationships are deeply generative, built, tended, and deepened through{" "}
                <em className="text-white not-italic font-medium">shared experience, shared creation, shared presence.</em>{" "}
                They go from passivity into proactive co-creation - of moments, memories and magic.
              </p>
              <div className="h-px bg-gradient-to-r from-indigo-400/30 via-violet-400/20 to-transparent" />
              <p className="text-indigo-200/70 text-sm sm:text-base leading-relaxed font-light">
                That is the thread connecting{" "}
                <span className="text-indigo-300 font-medium">Elinity</span> and the{" "}
                <span className="text-indigo-300 font-medium">DASPort</span> - two products designed around a single conviction: that the conditions for a meaningful life can be designed for, and lived in, every single day. Here is how Elinity users can bring Deckoviz into their relationships to create more depth, more beauty, more aliveness in those connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section divider ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 mb-4">
        <div className="flex items-center gap-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="flex gap-1.5">
            {[0,1,2].map(i => (
              <div key={i} className={`rounded-full bg-indigo-400/60 ${i === 1 ? "w-2.5 h-2.5" : "w-1.5 h-1.5"}`} />
            ))}
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </div>
      </div>

      {/* ── Content Sections ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pb-12 space-y-6">
        {sections.map((s, i) => (
          <div key={i} className="guide-body section-glass rounded-3xl overflow-hidden"
            style={{ animationDelay: `${0.05 * i}s` }}>
            {/* Top accent bar */}
            <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${s.accent[0]}, ${s.accent[1]}, transparent)` }} />

            <div className="p-7 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">

                {/* Left column - number + emoji */}
                <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-4 sm:min-w-[80px]">
                  <div className="num-badge w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-300 text-lg font-bold guide-serif">
                    {s.num}
                  </div>
                  <div className="text-3xl sm:text-4xl select-none">{s.emoji}</div>
                  {/* Vertical line on desktop */}
                  <div className="hidden sm:block flex-1 w-px self-stretch mt-2" style={{ background: `linear-gradient(to bottom, ${s.accent[0]}40, transparent)` }} />
                </div>

                {/* Right column - content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="tag-pill text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                      {s.tag}
                    </span>
                  </div>

                  <h2 className="guide-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-5 leading-snug">
                    {s.title}
                  </h2>

                  {/* Highlight pull quote */}
                  <div className="highlight-quote rounded-r-xl px-5 py-3.5 mb-6 italic"
                    style={{ borderColor: s.accent[1] + "60" }}>
                    <p className="text-sm sm:text-base font-medium leading-relaxed"
                      style={{ color: s.accent[1] === "#818cf8" ? "#c7d2fe" : "#a5b4fc" }}>
                      "{s.highlight}"
                    </p>
                  </div>

                  {/* Body paragraphs */}
                  <div className="space-y-4">
                    {s.body.map((para, j) => (
                      <p key={j} className="text-indigo-100/60 leading-relaxed text-sm sm:text-[15px] font-light">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Closing ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pb-24">

        {/* Divider */}
        <div className="flex items-center gap-5 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
          <div className="text-indigo-400/40 text-xs tracking-[0.3em] uppercase">- fin -</div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </div>

        {/* CTA card */}
        <div className="cta-glass rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(30px)" }} />
          <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", filter: "blur(30px)" }} />

          <div className="relative">
            <div className="text-5xl mb-8 select-none">✨</div>
            <p className="guide-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-4 max-w-2xl mx-auto">
              The life you want to live with the people you love deserves more than good intentions.
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-indigo-400 to-violet-400 mx-auto my-6" />
            <p className="text-indigo-200/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-light mb-10">
              It deserves a designed environment, shared rituals, creative depth, and the right tools. That is what this ecosystem exists to give you.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="btn-primary px-9 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide"
              >
                Explore Deckoviz
              </button>
              <button
                onClick={() => navigate("/elinity")}
                className="btn-ghost px-9 py-3.5 rounded-xl font-semibold text-sm tracking-wide"
              >
                Discover Elinity
              </button>
            </div>
          </div>
        </div>

        {/* Footer mark */}
        <div className="text-center mt-14">
          <p className="text-indigo-400/30 text-[10px] tracking-[0.4em] uppercase">Elinity × Deckoviz · A living ecosystem for your relationships</p>
        </div>
      </section>
    </div>
  );
}
