import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  Calendar,
  ArrowUp,
  Home,
  Sparkles,
  Heart,
  Users,
  Palette,
  Eye,
  Shield,
  Building2,
  Quote,
} from "lucide-react";

/* ================================================================
   SECTION DATA — drives both TOC and article body
   ================================================================ */
interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  paragraphs: string[];
}

const SECTIONS: Section[] = [
  {
    id: "the-room-that-already-knows",
    title: "The Room That Already Knows",
    icon: <Home size={20} />,
    paragraphs: [
      `You come home. Nobody has told the house anything, and yet the lights have already softened to something warmer than daylight; the atmosphere feels different too, intentional — calmer than the room you left this morning. There's a piece of art on the wall that wasn't there a few hours back, and it looks, unmistakably, like something made for you, for tonight, in this mood, at this exact moment in your life. And the sonic atmosphere is precisely designed to set you in the right space.`,
      `Nobody programmed this. Nobody opened an app. The house simply noticed, the way someone who has loved you for years notices, before you've said a word, exactly what kind of day you've had.`,
      `This isn't science fiction anymore. It's the direction every home will soon be moving toward, and the shift underway is bigger than "smart home, but smarter." It's a genuine change in what a home is. Not just smarter, but truly emotionally intelligent.`,
    ],
  },
  {
    id: "from-smart-to-sentient",
    title: "From Smart to Sentient, Alive Even: A Quiet Revolution Already in Motion",
    icon: <Sparkles size={20} />,
    paragraphs: [
      `For twenty years, "smart home" meant command and response. You said, "turn off the lights." The lights turned off. Impressive the first few times, and then, quietly, another interface to manage, another set of commands, another chore disguised as convenience.`,
      `That era is ending. What's replacing it is something researchers and technologists call ambient computing: homes that understand intent through subtle cues, tone of voice, timing, behavior, environmental context, and respond without being explicitly asked.`,
      `Industry analysts already describe 2025 as the year the emotionally intelligent home stopped being a luxury concept and started becoming a mainstream shift — homes where the lighting softens when a voice sounds tense, where a kitchen suggests water instead of another coffee when your smartwatch shows a rough night's sleep, where a home starts to feel less like a machine you operate and more like a presence that's paying attention.`,
      `The market numbers reflect just how seriously this is being taken. Autonomous AI in smart homes is projected to grow from roughly $18 billion in 2025 to over $171 billion by 2030, a nearly tenfold increase in a decade. That's not a niche product category. That's an entire industry betting that homes are about to become fundamentally different kinds of things than they've been before.`,
      `But here's what most of that industry still gets wrong: efficiency and convenience were never actually the point. A home that perfectly manages your thermostat and never once makes you feel something isn't the future anyone was actually dreaming about. The real opportunity, the one most worth building for deliberately, is a home that makes you feel more like yourself, more expressive, more deeply attuned to the people in your life, not merely more comfortable.`,
    ],
  },
  {
    id: "a-home-presence",
    title: "A Home Presence That Grows Into a Family Member",
    icon: <Users size={20} />,
    paragraphs: [
      `Think about what actually makes a place feel like home, versus merely a well-appointed space. It's the accumulated weight of a place knowing you — the chair that's yours, the smell that means safety, the walls that have quietly witnessed every version of who you've been while living inside them.`,
      `Now imagine a home with an intelligence — nay, presence — woven through it that actually remembers all of that, not just your thermostat preference or superficial stuff, but who you are, at the deepest level. Your moods and their patterns. The music that pulls you out of a bad day. The kind of art and experiences and themes that make you stop and actually look, rather than walk past without seeing. What Tuesday mornings tend to feel like for you, versus Friday nights. Not inferred once and locked in, but continually refined, the way any real relationship deepens with time rather than staying static.`,
      `This is the shift from smart home to something genuinely new: a home with an emotionally intelligent companion inside it, one that doesn't just execute your requests, but grows to understand your inner world well enough to occasionally create something before you even knew you wanted it. A home that becomes, quite literally, a member of the family — not because it pretends to be human, but because it holds a kind of continuity and attentiveness that was impossible to offer, even by other people.`,
    ],
  },
  {
    id: "walls-stop-being-static",
    title: "The Walls Stop Being Static",
    icon: <Palette size={20} />,
    paragraphs: [
      `For all of human history, walls have been passive. You hang something once, and it stays exactly as it was, for years, sometimes decades, slowly fading into invisibility the way anything unchanging eventually does. We stop seeing what we see every single day.`,
      `The home of 2030 doesn't accept that as inevitable. Walls become a living, evolving expression of the people living behind them — not decoration chosen once at a furniture store, but an ongoing creative dialogue between a home and the humans inside it. A piece of art that reflects an actual memory, reimagined beautifully. A poster that captures a mood nobody could quite put into words themselves, until the wall said it for them. A space that changes with the seasons, with milestones, with hopes and dreams, and yes, with losses and setbacks, with the quiet ebb and flow of an ordinary week, the way a garden changes rather than the way a photograph stays frozen.`,
      `This matters for a whole host of reasons. A home that reflects you back to yourself, consistently, beautifully, is a home that helps you know yourself better. There's real psychological weight in environment, and a space actively engaged in helping you process, celebrate, and express your own inner life is one of the oldest human needs, finally given a genuinely capable portal.`,
    ],
  },
  {
    id: "moments-of-magic",
    title: "Moments of Magic, Engineered With Care",
    icon: <Heart size={20} />,
    paragraphs: [
      `The most meaningful things that happen inside a home were never really about efficiency. They were about magic — the surprise anniversary moment, the exact right music at the exact right time, the ordinary Tuesday that somehow became a core memory for no describable reason at all, those many deliciously deep and delightful conversations and moments shared with the people in the house.`,
      `A home with genuine emotional intelligence doesn't just wait for those moments to happen by accident. It becomes an active participant in creating them — more often, more reliably, for more of the people living inside it. A quiet ritual that marks the end of a long week. A surprise piece of art or poster or montage waiting on an anniversary, built from years of shared memory rather than a store-bought card. A game invented for a rainy afternoon that becomes, without anyone planning it, a tradition the kids ask for by name for the next decade.`,
      `This is where a home's intelligence earns its keep — in helping the people inside a house connect more deeply with each other, and with themselves. The best technology in a home should make a family feel closer.`,
    ],
  },
  {
    id: "an-avatar-a-presence",
    title: "An Avatar, a Presence, a Voice in the Room",
    icon: <Eye size={20} />,
    paragraphs: [
      `As these systems mature, expect the interface itself to become more personal — less a disembodied voice from a speaker, more a genuine presence a household can relate to. An avatar. A character. Something with continuity and personality, present across the home's screens and surfaces, recognizable the way a family pet or a longtime housekeeper becomes recognizable — a fixture with its own gentle identity rather than an anonymous utility humming in the background.`,
      `Multimodality matters enormously here. Vision, voice, imagery, sound, working together rather than as separate, disconnected features, because a genuinely intelligent presence in a home should feel like one coherent, familiar someone — always slightly different day to day, always unmistakably itself.`,
    ],
  },
  {
    id: "when-guests-arrive",
    title: "When Guests Arrive, and Their AI Comes With Them",
    icon: <Users size={20} />,
    paragraphs: [
      `An interesting new social dynamic will soon emerge too — as personal AI companions become common, not just in homes but carried by individuals themselves, hosting a guest starts to mean something slightly different than it used to.`,
      `Imagine a friend arriving for dinner, their own AI companion carrying real context about who they are, what they love, what kind of evening would genuinely delight them. With permission, that context could be shared, briefly, respectfully, with your own home's Vizzy, letting your space create something closer to a genuinely personal welcome — an ambiance, a piece of art, a small detail that says, unmistakably, we thought about you specifically, before you even arrived.`,
      `This is hospitality's oldest, best instinct, delivered in an exciting new way. The great hosts throughout history were the ones who remembered exactly how you took your tea. Technology, done right here, doesn't replace that warmth. It extends the capacity for it to nearly everyone — not just those with a household staff to hold all those details in their heads.`,
    ],
  },
  {
    id: "adaptive-across-every-rhythm",
    title: "Adaptive Across Every Rhythm, Not Just the Day",
    icon: <Sparkles size={20} />,
    paragraphs: [
      `A home's intelligence shouldn't stop at daily rhythm — calmer in the evening, brighter in the morning — though that alone is already a meaningful shift from static living. The deeper opportunity is adapting across every rhythm a life actually moves through: the changing seasons, the quiet return of a familiar holiday, a birthday, an anniversary, a hard season that calls for something gentler, a joyful season that calls for something more alive.`,
      `A home that only ever looks the same regardless of what month it is, what's being celebrated, or what a family is actually going through, is a home quietly wasting one of its greatest possible gifts: the ability to hold and honor time.`,
    ],
  },
  {
    id: "designing-with-care",
    title: "A Note On Designing The Home With A Companion That Feels An Extension Of You",
    icon: <Shield size={20} />,
    paragraphs: [
      `A technology this intimate, one that understands your moods, your rhythms, your inner life, carries real responsibility alongside its promise. Privacy has to be a foundation, not an afterthought bolted on once trust has already been extended.`,
      `And there's a deeper question: a home this attentive should make you feel more genuinely known, not more watched — more connected to the people actually in the room with you, not more absorbed in a screen instead of them. The measure of whether any of this technology succeeds should never be how impressive it is in a demo. It should be simpler than that: did it help you feel more like yourself, and closer to the people you love, at the end of the day?`,
      `Done well, this is one of the most human uses imaginable for artificial intelligence. Done carelessly, it's just another technology competing for attention that used to belong to each other. The difference is entirely a matter of intention in the design.`,
    ],
  },
  {
    id: "for-those-designing",
    title: "For Those Designing the Homes of Tomorrow",
    icon: <Building2 size={20} />,
    paragraphs: [
      `A note for architects, interior designers, and real estate developers.`,
      `If you're in the business of designing, building, or shaping physical spaces, this shift changes something fundamental about what you're actually designing for. A home was always meant to serve the people living in it. Increasingly, it can do that through an active, ongoing intelligence layered into the space itself.`,
      `This is an extraordinary opportunity for it. A beautifully designed space with genuine emotional intelligence built in becomes a core part of a home that feels more homely with time — a home that keeps proving — and expanding — its value to the people living in it, every single week, long after the ribbon-cutting and the final walkthrough. For developers, it's a distinguishing amenity that deepens a buyer's relationship with a property well past the sale. For architects and interior designers, it's a chance to design not just a beautiful space, but a beautiful relationship, one your client will keep discovering for years.`,
      `The best spaces of the next decade will be the ones built with the understanding that a home is no longer merely a container for a life. It can be an active participant in it.`,
    ],
  },
  {
    id: "the-home-that-finally-catches-up",
    title: "The Home That Finally Catches Up",
    icon: <Heart size={20} />,
    paragraphs: [
      `Strip away the technology, and what's actually being described here is old and simple; it is the human wish for a home that truly knows us. Every culture that ever built a hearth, hung a portrait, kept a family altar, or passed down heirlooms was reaching for some version of this same thing — a home that holds memory, reflects identity, and marks the passage of time with something more meaningful than mere shelter.`,
      `What's new isn't the wish. It's that, for the first time in human history, we actually have the tools to build it properly. At Deckoviz, this is the home we're building for — not intelligence for its own sake, not novelty for novelty's sake, but a home with a genuine creative and emotional intelligence at its core, one that grows with a family across years and decades, turning the space into something alive, and turning an ordinary house into the truest possible expression of the people who live inside it.`,
      `The home of the future is defined by how well it understands and loves the people who live there — how well it expresses their inner worlds and hopes. That's always been the actual dream. We're simply, finally, close enough to bring the dream to life.`,
    ],
  },
];

/* ================================================================
   PULL QUOTE — callout in the middle of the article
   ================================================================ */
const PULL_QUOTE = {
  text: `The home of the future is defined by how well it understands and loves the people who live there — how well it expresses their inner worlds and hopes.`,
  afterSection: 4,
};

/* ================================================================
   STAT CALLOUTS
   ================================================================ */
const STATS = [
  { value: "$171B", label: "Projected market by 2030" },
  { value: "~10×", label: "Growth in a single decade" },
  { value: "2025", label: "The inflection year" },
];

/* ================================================================
   COMPONENT
   ================================================================ */
export default function HomeOf2030() {
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTocId, setActiveTocId] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── scroll tracking ────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(
        Math.min((window.scrollY / totalHeight) * 100, 100)
      );
      setShowScrollTop(window.scrollY > 600);

      const headingEls = document.querySelectorAll("h2[id]");
      let currentId = "";
      headingEls.forEach((el) => {
        if (el.getBoundingClientRect().top <= 150) currentId = el.id;
      });
      setActiveTocId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── scroll to top on mount ─────────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ── estimated read time ────────────────────────────── */
  const readTime = useMemo(() => {
    const totalWords = SECTIONS.reduce(
      (acc, s) => acc + s.paragraphs.join(" ").split(/\s+/).length,
      0
    );
    return `${Math.max(1, Math.round(totalWords / 220))} min read`;
  }, []);

  return (
    <div className="min-h-screen text-gray-900 relative" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>
      {/* ═══ Reading progress bar ═══ */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[60] transition-all duration-150"
        style={{
          width: `${readProgress}%`,
          background:
            "linear-gradient(90deg, #182a4a, #2563EB, #06b6d4)",
          boxShadow: "0 0 20px rgba(37,99,235,0.5)",
        }}
      />

      {/* ═══ Ambient Background ═══ */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#e8eeff] to-[#dbeafe]" />
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #182A4A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="fixed top-[-200px] right-[-100px] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-200px] left-[-100px] w-[500px] h-[500px] bg-indigo-300/15 rounded-full blur-[130px] pointer-events-none" />

      {/* ═══ Hero Header ═══ */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="relative min-h-[520px] md:min-h-[560px] flex items-end">
          {/* Gradient hero background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#132040] to-[#1a3a6e]" />
          {/* Animated mesh */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(37,99,235,0.4) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(6,182,212,0.3) 0%, transparent 60%)",
            }}
          />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Back button */}
          <div className="absolute top-6 left-6 z-20">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back
            </Link>
          </div>

          {/* Hero content */}
          <div className="relative z-10 px-6 sm:px-10 md:px-16 pb-14 pt-32 max-w-4xl">
            {/* Tag */}
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-white/10 backdrop-blur-md border border-white/15 mb-5">
              <Home size={12} />
              Essay · Future of Living
            </span>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Home of 2030:{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Your Home Learns to Love You Back
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/50 max-w-2xl mb-6 leading-relaxed italic">
              An essay on the future of the home and the homes of the future
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-5">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  SP
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">
                    Suraj Pandya
                  </p>
                  <p className="text-[11px] text-white/40">
                    Building Deckoviz
                  </p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar size={14} className="text-cyan-400" />
                <span>August 27, 2026</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Clock size={14} className="text-cyan-400" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* Bottom fade into page bg */}
          <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-[#f0f4ff] to-transparent" />
        </div>
      </div>

      {/* ═══ Stats Bar ═══ */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_4px_20px_rgba(24,42,74,0.06)]"
            >
              <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#182a4a] to-[#2563EB] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Main Content Area ═══ */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-10">
          {/* Article Body */}
          <div className="flex-1 min-w-0" ref={contentRef}>
            <div className="relative rounded-[2rem] backdrop-blur-2xl bg-white/65 border border-white/80 shadow-[0_8px_60px_rgba(24,42,74,0.08),0_2px_4px_rgba(0,0,0,0.02)] px-6 py-10 sm:px-10 md:px-16 md:py-14 overflow-hidden">
              {/* Glass shine overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[2rem]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.15) 100%)",
                }}
              />

              <article className="max-w-none relative z-10">
                {SECTIONS.map((section, sIdx) => (
                  <div key={section.id}>
                    {/* Section heading */}
                    <h2
                      id={section.id}
                      className="scroll-mt-28 flex items-center gap-3 text-xl md:text-2xl font-bold text-[#0f172a] mt-14 mb-6 first:mt-0"
                      style={{
                        fontFamily:
                          "'Playfair Display', Georgia, serif",
                      }}
                    >
                      <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-md">
                        {section.icon}
                      </span>
                      {section.title}
                    </h2>

                    {/* Paragraphs */}
                    {section.paragraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-[15px] md:text-base leading-[1.85] text-gray-700 mb-5"
                      >
                        {para}
                      </p>
                    ))}

                    {/* Section divider */}
                    {sIdx < SECTIONS.length - 1 && (
                      <div className="flex items-center gap-3 my-10">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                        <div className="w-1 h-1 rounded-full bg-blue-200" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                      </div>
                    )}

                    {/* Pull quote after designated section */}
                    {sIdx === PULL_QUOTE.afterSection && (
                      <div className="relative my-12 py-8 px-8 md:px-12 rounded-2xl bg-gradient-to-br from-[#182a4a] to-[#1a3a6e] text-white overflow-hidden">
                        <div className="absolute top-4 left-6 text-cyan-400/20">
                          <Quote size={56} />
                        </div>
                        <p
                          className="relative z-10 text-lg md:text-xl font-medium leading-relaxed italic text-white/90"
                          style={{
                            fontFamily:
                              "'Playfair Display', Georgia, serif",
                          }}
                        >
                          "{PULL_QUOTE.text}"
                        </p>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-[60px]" />
                      </div>
                    )}
                  </div>
                ))}
              </article>
            </div>

            {/* ═══ Author Card ═══ */}
            <div className="mt-10 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 p-8 shadow-[0_8px_40px_rgba(24,42,74,0.06)]">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                  SP
                </div>
                <div>
                  <h3 className="font-bold text-[#0f172a] text-lg">
                    Suraj Pandya
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Building Deckoviz to bring spaces to life · Bringing Elinity to life to actualize connection potential · Building platforms to enhance the scope of human consciousness · Towards better questions & deeper alignment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Sticky Table of Contents ═══ */}
          <aside className="hidden xl:block w-[280px] shrink-0">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 p-6 shadow-[0_8px_40px_rgba(24,42,74,0.06)]">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#182a4a] to-[#2563EB] rounded-t-2xl" />
                {/* Glass overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 30%)",
                  }}
                />

                <p className="relative z-10 text-[10px] font-black text-[#182a4a]/50 uppercase tracking-[0.2em] mb-5">
                  Table of Contents
                </p>

                <ul className="relative z-10 space-y-1 max-h-[55vh] overflow-y-auto pr-1">
                  {SECTIONS.map((s) => {
                    const isActive = activeTocId === s.id;
                    return (
                      <li
                        key={s.id}
                        className={`cursor-pointer text-[12px] leading-snug py-1.5 px-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "text-[#2563EB] font-bold bg-blue-50/80 border-l-[3px] border-[#2563EB] -ml-[3px]"
                            : "text-slate-500 hover:text-[#182a4a] hover:bg-white/60 border-l-[3px] border-transparent -ml-[3px]"
                        }`}
                        onClick={() =>
                          document
                            .getElementById(s.id)
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            })
                        }
                      >
                        {s.title.length > 45
                          ? s.title.slice(0, 45) + "…"
                          : s.title}
                      </li>
                    );
                  })}
                </ul>

                {/* Progress indicator */}
                <div className="mt-6 pt-4 border-t border-gray-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Reading Progress
                    </span>
                    <span className="text-[11px] font-bold text-[#2563EB]">
                      {Math.round(readProgress)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${readProgress}%`,
                        background:
                          "linear-gradient(90deg, #182a4a, #2563EB)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ═══ Scroll to Top ═══ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-500 ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #182a4a, #2563EB)",
          boxShadow: "0 8px 30px rgba(24,42,74,0.4)",
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
