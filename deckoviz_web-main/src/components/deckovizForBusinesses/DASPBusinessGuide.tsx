import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const guideSections = [
  {
    num: "01",
    tag: "Creation",
    title: "Core Generative Engine",
    subtitle: "Instant creation for physical environments",
    accent: ["#4338ca", "#6366f1"],
    emoji: "⚙️",
    body: [
      "At the heart of Deckoviz lies a powerful, enterprise-ready generative engine built specifically for large screens, public spaces, and branded environments.",
      "This engine enables businesses to generate:"
    ],
    list: [
      "Art, visuals, posters, signage, menus",
      "Product imagery and styled product shots",
      "Motion loops, ambient videos, and short films",
      "Audio-reactive visuals and music-driven experiences"
    ],
    bodyAfter: "All of this can be created in seconds, directly from prompts, brand assets, product photos, or simple descriptions, and displayed instantly on Deckoviz Frames.",
    useCases: [
      "A restaurant group updates daily specials across locations without printing menus",
      "A retail chain launches a campaign visually in every store the same morning",
      "A hotel replaces lobby art with evolving, seasonally adaptive visuals",
      "A real estate showroom generates localized visuals for each development"
    ],
    why: "Traditional content pipelines are slow, expensive, and brittle. They require designers, agencies, approvals, and production cycles that simply don't match the pace of modern business. Deckoviz collapses that entire pipeline into a living creative engine, giving enterprises speed, consistency, and creative freedom without sacrificing quality."
  },
  {
    num: "02",
    tag: "Products",
    title: "Product & Offering Display Enhancer",
    subtitle: "Make products feel desirable, alive, and premium",
    accent: ["#2563eb", "#3b82f6"],
    emoji: "🍱",
    body: [
      "How a product is presented shapes how it is valued. Deckoviz dramatically upgrades product and offering presentation through AI-enhanced visuals and animations.",
      "Businesses can take a single product photo and transform it into:"
    ],
    list: [
      "Professional, studio-quality imagery",
      "Contextual lifestyle visuals",
      "Subtle motion loops and cinematic animations",
      "Visual narratives showing usage, texture, and detail"
    ],
    bodyAfter: "No photoshoots. No models. No reshoots. No equipment.",
    useCases: [
      "A restaurant animates dishes gently, highlighting ingredients and plating",
      "A fashion store shows garments worn in different contexts without mannequins",
      "A hotel spa visualizes treatments through calming, abstract product stories",
      "A luxury retailer displays craftsmanship details dynamically on walls"
    ],
    why: "Static product displays fade into the background. Dynamic, tasteful motion draws attention naturally, without being intrusive. Deckoviz turns walls into silent sales assets that elevate perceived quality, reduce marketing friction, and let offerings speak for themselves."
  },
  {
    num: "03",
    tag: "Video",
    title: "AI Video Creation & Display Suite",
    subtitle: "Cinematic storytelling, without production overhead",
    accent: ["#1d4ed8", "#4f46e5"],
    emoji: "🎥",
    body: [
      "Video is the most powerful medium for storytelling, but also the most expensive and operationally complex. Deckoviz changes that.",
      "Enterprises can create and display:"
    ],
    list: [
      "In-store product ads and apple-esque video ads",
      "Brand films or origin stories",
      "Short lifestyle or usage videos",
      "Campaign visuals and launch content"
    ],
    bodyAfter: "These videos can be generated, refined, and looped directly within the platform, designed specifically for ambient, in-space viewing, not noisy advertising.",
    useCases: [
      "A café runs subtle, cinematic visuals of coffee being crafted",
      "A retail store plays brand films that set tone without demanding attention",
      "A hotel lobby shows slow, atmospheric destination stories",
      "A flagship store launches new collections visually overnight"
    ],
    why: "High-quality video used to be episodic. With Deckoviz, it becomes continuous, ambient, and adaptive, enhancing experience rather than interrupting it."
  },
  {
    num: "04",
    tag: "Ambiance",
    title: "Dynamic, Intelligent Ambiance & Mood Control",
    subtitle: "Spaces that adapt, not stagnate",
    accent: ["#7c3aed", "#8b5cf6"],
    emoji: "🕯️",
    body: [
      "Most spaces feel the same at 9am as they do at 9pm. Humans don't.",
      "Deckoviz allows enterprises to design time-aware, context-aware, persona-aware environments that shift automatically based on:"
    ],
    list: [
      "Time of day and day of week",
      "Seasonality and special occasions",
      "User personas and frequent visitors",
      "Events, holidays, and service phases"
    ],
    useCases: [
      "Restaurants shift from energetic brunch visuals to intimate dinner moods",
      "Hotels adjust lobby ambiance for arrivals, evenings, and late nights",
      "Retail stores adapt visuals based on traffic flow and promotions",
      "Offices create calmer evening environments and energetic mornings"
    ],
    why: "Ambiance affects behavior, dwell time, and emotional state. When done well, it feels invisible. When ignored, it feels off. Deckoviz makes ambiance a designed system, not a static setting."
  },
  {
    num: "05",
    tag: "Art",
    title: "Custom & Brand-Themed Generative Art",
    subtitle: "Art that belongs to your business",
    accent: ["#4338ca", "#818cf8"],
    emoji: "🎨",
    body: [
      "Generic decor signals generic thinking.",
      "Deckoviz enables enterprises to create custom generative art systems that reflect:"
    ],
    list: [
      "Brand colors and visual language",
      "Company ethos and values",
      "Location, culture, or architectural context",
      "Seasonal or campaign themes"
    ],
    bodyAfter: "These artworks evolve continuously while remaining unmistakably on-brand.",
    useCases: [
      "A hospitality group creates location-specific art for each property",
      "A brand visualizes its mission through evolving abstract systems",
      "A corporate lobby reflects company culture without logos or slogans",
      "A retail brand reinforces identity subtly through art, not ads"
    ],
    why: "Art communicates values faster than words. When it's authentic and intentional, it becomes a quiet differentiator."
  },
  {
    num: "06",
    tag: "Experience",
    title: "Immersive, Experiential Space Creation",
    subtitle: "Turning visits into journeys",
    accent: ["#3730a3", "#6366f1"],
    emoji: "🌠",
    body: [
      "Deckoviz enables enterprises to move from spaces to experiences.",
      "By combining visuals, motion, music, narration, and personalization, businesses can orchestrate environments that feel cinematic, intentional, engaging, immersive, and memorable."
    ],
    useCases: [
      "A restaurant takes guests through the story of its cuisine",
      "A hotel immerses guests in a sense of place from the moment they enter",
      "A retail store transforms shopping into exploration",
      "A flagship space becomes a destination, not just a store"
    ],
    why: "In an era of infinite choice, experience is what people remember, talk about, and return for. Deckoviz gives enterprises the tools to design memory, not just decor."
  },
  {
    num: "07",
    tag: "Mementos",
    title: "Personalized Guest & Customer Mementos",
    subtitle: "Turning moments into artifacts people keep",
    accent: ["#4f46e5", "#7c3aed"],
    emoji: "🖼️",
    body: [
      "Most customer experiences disappear the moment someone walks out the door.",
      "Deckoviz changes that by enabling enterprises to create personalized, shareable mementos for guests in real time.",
      "These are emotional artifacts."
    ],
    list: [
      "Personalized artworks featuring guests",
      "Stylized visuals of their visit, purchase, or meal",
      "Custom farewell visuals with messages",
      "Branded memory pieces shared instantly to phones"
    ],
    useCases: [
      "A restaurant creates a painterly artwork of a couple at their table",
      "A hotel gifts guests a visual memory of their stay on checkout",
      "A retail store shares a stylized image of a customer wearing their purchase",
      "A luxury brand sends a personalized visual after a flagship visit"
    ],
    why: "People forget transactions. They remember moments. These mementos extend the experience beyond the space, drive organic social sharing, build emotional attachment, and increase repeat visits without discounts. Deckoviz turns customers into carriers of your brand story."
  },
  {
    num: "08",
    tag: "Marketing",
    title: "AI Marketing & Campaign Material Creator",
    subtitle: "Marketing that updates itself",
    accent: ["#2563eb", "#4f46e5"],
    emoji: "📢",
    body: [
      "Marketing content in physical spaces is usually:"
    ],
    list: [
      "Expensive to produce",
      "Slow to update",
      "Visually inconsistent across locations"
    ],
    bodyAfter: "Deckoviz replaces this with a real-time, on-brand marketing creation system. Enterprises can instantly generate:",
    listTwo: [
      "Posters, menus, signage, and announcements",
      "Campaign visuals and launch materials",
      "Motion-based promotions and loops",
      "Text + visual combinations, fully branded"
    ],
    useCases: [
      "A retail chain launches localized promotions per store",
      "A restaurant updates menus instantly across locations",
      "A hotel promotes seasonal offers without printing anything",
      "A brand tests visual campaigns live, in-space"
    ],
    why: "Marketing becomes adaptive instead of static. Deckoviz enables enterprises to remove dependency on agencies, maintain brand consistency at scale, and respond to real-world conditions in real time."
  },
  {
    num: "09",
    tag: "Signage",
    title: "Dynamic, Intelligent Signage & Information Systems",
    subtitle: "From static signs to living information",
    accent: ["#0284c7", "#3b82f6"],
    emoji: "🪧",
    body: [
      "Static signage is blind. It cannot adapt, learn, or respond.",
      "Deckoviz replaces traditional signage with intelligent, evolving visual systems that can update instantly and adapt contextually."
    ],
    list: [
      "Menus and specials",
      "QR-driven interactions",
      "Event announcements",
      "Wayfinding and guidance",
      "Merchandising highlights"
    ],
    useCases: [
      "A restaurant highlights dishes based on time of day",
      "A hotel adapts signage based on occupancy and events",
      "A retail store updates merchandising visuals dynamically",
      "A corporate lobby displays live, branded information"
    ],
    why: "When information adapts, friction disappears. Deckoviz turns signage into a responsive interface, not a fixed message."
  },
  {
    num: "10",
    tag: "Vizzy",
    title: "AI Enterprise Assistant Suite (Vizzy)",
    subtitle: "From display to brand intelligence",
    accent: ["#6366f1", "#8b5cf6"],
    emoji: "🤖",
    body: [
      "This is where Deckoviz crosses a special threshold.",
      "The AI Enterprise Assistant Suite transforms Deckoviz from a visual platform into a multimodal, enterprise-aware intelligence layer that lives inside your space."
    ],
    list: [
      "Answer questions conversationally",
      "Explain products, dishes, or services",
      "Tell brand stories visually and verbally",
      "Entertain, guide, and assist guests",
      "Generate visuals dynamically during interactions"
    ],
    useCases: [
      "Hotel guests ask about amenities and receive visual explanations",
      "Retail customers get personalized recommendations",
      "Museums offer interactive, visual storytelling",
      "Corporate lobbies provide intelligent introductions"
    ],
    why: "This turns AI from a novelty into a living brand representative. Vizzy becomes your storyteller, your guide, your concierge, and your brand voice. At scale, this redefines customer engagement."
  },
  {
    num: "11",
    tag: "Avatars",
    title: "Avatars, Narration & Interactive Characters",
    subtitle: "Giving your brand a face and a voice",
    accent: ["#8b5cf6", "#d946ef"],
    emoji: "🗣️",
    body: [
      "Humans connect to personalities, not interfaces.",
      "Deckoviz enables enterprises to deploy avatars and narrators that represent the brand in expressive, interactive ways. These avatars can:"
    ],
    list: [
      "Greet and entertain guests",
      "Narrate collections or menus",
      "Guide, explain, or entertain",
      "Respond via voice, text, and visuals"
    ],
    bodyAfter: "Avatars can be human-like, mascots, stylized characters, or brand-specific creations.",
    useCases: [
      "A restaurant greets guests with a warm, branded character",
      "A hotel lobby uses narration for cultural storytelling",
      "A retail store educates customers interactively",
      "A family venue engages kids through playful avatars"
    ],
    why: "Avatars humanize technology. They transform screens into social entities, making interactions feel natural and memorable."
  },
  {
    num: "12",
    tag: "Ecosystem",
    title: "Enterprise Ecosystem & Advanced Capabilities",
    subtitle: "Everything else that makes it powerful at scale",
    accent: ["#4c1d95", "#6d28d9"],
    emoji: "🌐",
    body: [
      "Beyond the core suites, Deckoviz offers a growing ecosystem of advanced enterprise capabilities, including:"
    ],
    list: [
      "Guest persona profiles and memory across visits",
      "Social proof walls displaying reviews and testimonials",
      "AI-generated custom brand music and soundscapes",
      "Multisensory experiences with synced lighting and scent",
      "Interactive guest contribution walls via QR or app",
      "Marketplace inspiration and brand asset reuse",
      "Smart TV functionality for events and broadcasts",
      "Deckoviz Wall for fully immersive environments"
    ],
    useCases: [
      "Personalized recognition for repeat guests",
      "Immersive themed dining or retail experiences"
    ],
    why: ""
  }
];

export default function DASPBusinessGuide() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    <div className="min-h-screen overflow-x-hidden pt-6 pb-20" style={{ background: "#080b1a" }}>
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

        .anim-up { opacity: 0; animation: fadeSlideUp 0.75s cubic-bezier(.22,1,.36,1) forwards; }

        .hero-gradient-text {
          background: linear-gradient(100deg, #e0e7ff 0%, #a5b4fc 30%, #60a5fa 55%, #c4b5fd 80%, #e0e7ff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 5s linear infinite;
        }
        .subtitle-text {
          background: linear-gradient(90deg, #a5b4fc, #93c5fd, #818cf8);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.45s cubic-bezier(.22,1,.36,1);
        }
        .section-glass:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border-color: rgba(99,102,241,0.25);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(59,130,246,0.1);
        }
        .num-badge {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(99,102,241,0.08));
          border: 1px solid rgba(99,102,241,0.2);
        }
        .tag-pill {
          background: rgba(37,99,235,0.12);
          border: 1px solid rgba(37,99,235,0.25);
          color: #93c5fd;
        }
        .dot-row {
          background-image: radial-gradient(rgba(59,130,246,0.15) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .hero-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(37,99,235,0.06) 50%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(24px);
        }
        .ul-bullets li::before {
          content: "-";
          color: #60a5fa;
          display: inline-block;
          width: 1.2rem;
          margin-left: -1.2rem;
        }
      `}</style>

      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-48 -left-48 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)", animation: "floatBlob 35s ease-in-out infinite" }} />
        <div className="absolute top-1/2 -right-48 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", animation: "floatBlob 40s ease-in-out infinite reverse" }} />
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", animation: "floatBlob 28s ease-in-out infinite 5s" }} />
        <div className="absolute inset-0 opacity-40 dot-row" />
      </div>

      <div className="relative z-20 px-6 sm:px-10 pt-4 pb-4 flex items-center justify-between max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-300/70 hover:text-blue-200 font-medium text-sm transition-all duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <div className="text-blue-400/50 text-[10px] tracking-[0.3em] uppercase font-medium">
          DASP Enterprise Guide
        </div>
      </div>

      <section className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-8 pt-8 pb-20">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" style={{ zIndex: -1 }} />

        <div className="anim-up flex justify-center mb-10" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/10 border border-blue-500/25 px-5 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-[10px] font-bold tracking-[0.25em] uppercase">Enterprise Masterclass</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        <div className="anim-up text-center mb-6" style={{ animationDelay: "0.15s" }}>
          <h1 className="guide-serif text-5xl sm:text-6xl md:text-[5.5rem] leading-[1.05] font-bold mb-4">
            <span className="hero-gradient-text">Deckoviz DASP</span>
            <br />
            <span className="text-white/95">Enterprise Guide</span>
          </h1>
        </div>

        <div className="anim-up text-center mb-16" style={{ animationDelay: "0.25s" }}>
          <p className="subtitle-text text-lg sm:text-xl font-medium tracking-wide">
            Designing Intelligent, Experiential, Brand-Infused Physical Spaces
          </p>
        </div>

        <div className="anim-up hero-card rounded-[2rem] p-8 sm:p-14 relative overflow-hidden" style={{ animationDelay: "0.35s" }}>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
          
          <div className="space-y-8 guide-body relative z-10">
            <p className="text-2xl sm:text-3xl font-light text-white/90 guide-serif leading-snug">
              Physical spaces are having an identity crisis.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-blue-100/70 text-[15px] sm:text-base leading-relaxed font-light">
              <div className="space-y-6">
                <p>
                  Screens are present, yet most say nothing meaningful. Walls are filled, yet generic and barely few are remembered. Ambiance exists, yet it rarely feels intentional or warm.
                </p>
                <p>
                  At the same time, enterprises are under more pressure than ever. Attention is shrinking and being pulled in all directions, while the desire for meaningful experiences is increasing. Digital convenience has raised expectations.
                </p>
                <p>
                  Customers, guests, and visitors no longer compare your space only to your competitors. They compare it to the best experiences they've had anywhere.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-blue-300 font-medium text-lg border-l-2 border-blue-500/50 pl-4 py-1">
                  Deckoviz was built for this moment.
                </p>
                <p>
                  Deckoviz is a Dynamic Art & Space Platform (DASP) for enterprises. It transforms physical environments into living, adaptive, brand-expressive systems that can create, curate, and orchestrate visuals, stories, ambiance, and interactive experiences in real time.
                </p>
                <p>
                  This is not merely smart digital signage or a content management system. It is a reimagined spatial intelligence layer designed to help businesses:
                </p>
                <ul className="pl-6 space-y-2 text-sm text-blue-200/80 ul-bullets">
                  <li>Tell richer brand stories</li>
                  <li>Create emotional resonance at scale</li>
                  <li>Increase dwell time and memorability</li>
                  <li>Reduce operational friction in content creation</li>
                  <li>Turn spaces into experiences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 mb-16">
        <div className="flex items-center justify-center gap-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/30" />
          <p className="text-blue-300/50 text-[11px] uppercase tracking-[0.2em] text-center font-bold">
            The 12 Enterprise Feature Suites
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-500/30" />
        </div>
      </div>

      <section className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-8 pb-20 space-y-10">
        {guideSections.map((s, i) => (
          <div key={i} className="guide-body section-glass rounded-[2rem] overflow-hidden" 
               style={{ animationDelay: `${0.05 * i}s` }}>
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${s.accent[0]}, ${s.accent[1]}, transparent)` }} />

            <div className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row gap-8">
                
                <div className="flex sm:flex-col items-center gap-4 sm:min-w-[80px]">
                  <div className="num-badge w-14 h-14 rounded-[1rem] flex items-center justify-center text-blue-300 text-lg font-bold">
                    {s.num}
                  </div>
                  <div className="text-4xl select-none hidden sm:block mt-2">{s.emoji}</div>
                  <div className="hidden sm:block flex-1 w-px bg-gradient-to-b from-blue-500/20 to-transparent mt-4" />
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="tag-pill text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                      {s.tag}
                    </span>
                    <span className="text-2xl sm:hidden">{s.emoji}</span>
                  </div>

                  <h2 className="guide-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                    {s.title}
                  </h2>
                  <h3 className="text-sm font-semibold tracking-wide uppercase mb-6" style={{ color: s.accent[1] }}>
                    {s.subtitle}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {s.body.map((para, j) => (
                      <p key={j} className="text-blue-100/70 leading-relaxed text-[15px] font-light">
                        {para}
                      </p>
                    ))}
                    
                    {s.list && (
                      <ul className="pl-6 space-y-2 mt-4 text-blue-200/80 text-[14px] ul-bullets">
                        {s.list.map((li, j) => <li key={j}>{li}</li>)}
                      </ul>
                    )}

                    {s.bodyAfter && (
                      <p className="text-blue-100/70 leading-relaxed text-[15px] font-light mt-4">
                        {s.bodyAfter}
                      </p>
                    )}

                    {s.listTwo && (
                      <ul className="pl-6 space-y-2 mt-4 text-blue-200/80 text-[14px] ul-bullets">
                        {s.listTwo.map((li, j) => <li key={j}>{li}</li>)}
                      </ul>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-blue-400/60 mb-3">
                        Use Cases
                      </h4>
                      <ul className="space-y-2 text-[13px] text-blue-100/60 leading-relaxed">
                        {s.useCases.map((uc, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-blue-500 mt-0.5 opacity-50">▪</span> 
                            <span>{uc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {s.why && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-blue-400/60 mb-3">
                          Why It Matters
                        </h4>
                        <p className="text-[13px] text-blue-100/60 leading-relaxed bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
                          {s.why}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="relative z-10 max-w-[800px] mx-auto px-6 pb-24">
        <div className="relative rounded-[2rem] overflow-hidden p-12 text-center" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(15,23,42,0.8))", border: "1px solid rgba(59,130,246,0.15)" }}>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <h2 className="guide-serif text-3xl md:text-4xl font-bold text-white mb-6">Closing Perspective</h2>
          <p className="text-xl text-blue-200/90 font-light mb-8 max-w-2xl mx-auto">
            Deckoviz is not about adding screens. It is about making spaces expressive, intelligent, and alive.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-10">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex gap-3 items-center">
              <span className="text-blue-400 text-xl">✦</span> <span className="text-sm text-blue-100/80">Stronger brand memory</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex gap-3 items-center">
              <span className="text-blue-400 text-xl">✦</span> <span className="text-sm text-blue-100/80">Deeper emotional connection</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex gap-3 items-center">
              <span className="text-blue-400 text-xl">✦</span> <span className="text-sm text-blue-100/80">Higher engagement without friction</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex gap-3 items-center">
              <span className="text-blue-400 text-xl">✦</span> <span className="text-sm text-blue-100/80">Experiences that scale seamlessly</span>
            </div>
          </div>

          <p className="text-lg text-white/50 italic guide-serif max-w-lg mx-auto">
            Physical spaces are no longer static. With Deckoviz, they finally behave like the living systems they were meant to be.
          </p>
        </div>
      </section>

    </div>
  );
}
