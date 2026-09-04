import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  Calendar,
  ArrowUp,
  UtensilsCrossed,
  Sparkles,
  Users,
  Eye,
  Music,
  Palette,
  TrendingUp,
  UserCheck,
  Building2,
  Trophy,
  Quote,
} from "lucide-react";

/* ================================================================
   SECTION DATA
   ================================================================ */
interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  paragraphs: string[];
}

const SECTIONS: Section[] = [
  {
    id: "the-uncomfortable-truth",
    title: "The Uncomfortable Truth About Food",
    icon: <UtensilsCrossed size={20} />,
    paragraphs: [
      `Something no chef wants to hear, and every restaurant owner needs to sit with anyway, is that food is becoming a commodity. This is because the tools for consistently excellent execution are increasingly becoming available to everyone at once.`,
      `The data backs this up starkly. The global restaurant automation market is projected to hit $37 billion by 2025. Robotic kitchen systems, from Miso Robotics' burger-flipping Flippy to Chipotle's AI-driven tortilla chip line, are already deployed at scale across White Castle, Wendy's, Sweetgreen, and beyond, delivering perfect consistency, precise portion control, and zero variance between the first plate of the night and the last. The AI restaurant technology market itself is growing at a 23% compound annual rate through 2030.`,
      `What this means is that the ceiling on "good food, cooked well and consistently" is dropping toward the floor. When a system executes the exact same dish to the exact same specification every single time, "consistently well-executed" stops being a competitive advantage, and it becomes literal table stakes — the entry fee just to be considered a serious restaurant at all.`,
      `So the real question becomes — once execution is commoditized, what does a restaurant actually compete on and set itself apart on?`,
    ],
  },
  {
    id: "three-things",
    title: "Three Things That Can't Be Automated Away",
    icon: <Sparkles size={20} />,
    paragraphs: [
      `The answer, and it's an exciting one for anyone who loves hospitality, is threefold: service, ambiance, and experience — all of them intertwined with each other.`,
      `These three things are fundamentally about how a human being feels in a space, in the presence of other humans, at this specific moment in their life. A perfectly cooked lasagna is a technical achievement. A perfectly remembered anniversary, a room that shifts its energy exactly when a celebration needs it to, a server who somehow knows tonight matters more than most nights — that's an emotional achievement, and emotional achievements are what people actually pay a premium for, return for, and tell their friends about.`,
      `This isn't a defensive read of where the industry is headed. It's the opposite. It's the best news the hospitality side of this industry has had in years, because it means the parts of running a restaurant that actually require taste, warmth, and genuine creativity are about to matter more than they ever have.`,
    ],
  },
  {
    id: "personalization",
    title: "Personalization Stops Being a Perk and Becomes the Point",
    icon: <Users size={20} />,
    paragraphs: [
      `Right now, most restaurant "personalization" is shallow: a birthday candle on the check, a server told in advance that it's someone's anniversary. AI-enhanced systems are already starting to go deeper, analyzing past orders, dietary needs, and real-time feedback to recommend dishes tailored to an individual guest — the same logic McDonald's already applies at scale by adjusting menu recommendations based on weather and time of day.`,
      `Push that logic further, and something new and exciting becomes possible: a restaurant's AI that actually knows a guest, not from a single visit, but as an ongoing relationship. What they ordered last time and loved. What they didn't finish. The wine that surprised them. Whether they're the type who wants a quiet corner table or the one who lights up in the middle of the room's energy.`,
      `Now imagine that guest already has a personal AI companion, one that understands their tastes, their mood that evening, and what kind of night they're actually looking for. With permission, that companion can interface directly with the restaurant's own AI before a guest even arrives, letting the restaurant curate something close to a genuinely perfect experience before the first course is ever ordered. A meal, and an evening, shaped around this specific person, on this specific night, whether that night calls for quiet intimacy, celebratory energy, or something else entirely.`,
      `There's a layer of personalization even deeper than atmosphere, one that reaches the food itself. A guest's own AI can share context with the restaurant's — the kind of detail nobody actually says out loud to a server, because it's simply too much to explain in the thirty seconds of ordering. A texture they've quietly disliked since childhood. The exact way they take their steak, three degrees more specific than "medium." A spice they can handle in theory but never actually enjoy in practice. Years of accumulated food history, preference, and nuance, communicated instantly and completely, so the kitchen isn't guessing from a table's small talk; it's working from genuine understanding.`,
      `And the same channel carries more than taste alone; a guest's visual and sonic preferences travel with them too, so the room itself can be tuned before they've even sat down. The meal arrives already fitted to the person eating it, not because they explained themselves at length, but because, for the first time, they finally didn't have to.`,
    ],
  },
  {
    id: "immersive-dining",
    title: "The Immersive Dining Experience Is Already Being Designed",
    icon: <Eye size={20} />,
    paragraphs: [
      `This isn't speculative futurism. Industry forecasts for 2026 already point directly at what's coming: hyper-personalization at scale, dining experiences tailored not just to taste but to context, time of day, and occasion — and immersive dining experiences, AI-driven ambiance that creates interactive, adaptive, themed environments matched to the meal itself.`,
      `Picture what that actually looks like on a given night. A date night table that shifts to warmer light and softer visual motion, sounds, and visuals as the evening progresses. An anniversary dinner where the walls themselves seem to acknowledge the occasion. A celebratory birthday party where the room's energy rises with the group's own. A solo quiet dinner where the space simply, respectfully, gets out of the way and lets someone eat in peace — or helps them immerse in the culture of the dish. The same restaurant, the same kitchen, delivering entirely different emotional experiences depending on who's in the room and why they came.`,
    ],
  },
  {
    id: "turning-the-wait",
    title: "Turning the Wait Into Part of the Story",
    icon: <Palette size={20} />,
    paragraphs: [
      `One of the most overlooked opportunities in hospitality is the dead time — the wait for a table, the pause between courses, the moment a guest is simply sitting with nothing to look at but a phone. The restaurant of the future treats that time as an opportunity, not a gap.`,
      `Imagine waiting guests immersed in the actual journey of their meal: the chef's story unfolding visually while they wait, a look into where tonight's ingredients actually came from, the cultural or personal history behind a signature dish, told as something to watch and feel, not read off a laminated card nobody picks up. Food becomes not just something eaten, but something experienced as story, as art, as cultural emotion, before it ever reaches the table.`,
    ],
  },
  {
    id: "cultural-hubs",
    title: "Restaurants as Local Cultural Hubs",
    icon: <Building2 size={20} />,
    paragraphs: [
      `As dining becomes more experience-led, restaurants have a genuine opportunity to become something more than a place to eat — a cultural anchor for their neighborhood or city.`,
      `A Japanese restaurant doesn't have to settle for generic minimalist decor borrowed from a hundred other Japanese restaurants. Its walls can carry the actual aesthetic loops, seasonal motifs, food preparation artistry, and cultural storytelling that make the cuisine feel genuinely rooted rather than borrowed. A restaurant built around a specific neighborhood's history can bring that history to life on its walls, turning a meal into a small act of place-making. This is brand storytelling and cultural immersion working together, and it's precisely the kind of differentiation that becomes more valuable as the actual cooking becomes more uniform across restaurants.`,
    ],
  },
  {
    id: "multi-sensory",
    title: "Multi-Sensory, Not Just Visual",
    icon: <Music size={20} />,
    paragraphs: [
      `The most sophisticated version of this experience layer doesn't stop at what's on the wall. Visuals, sound, and atmosphere working together, adaptively, intelligently, over the course of an evening, create something meaningfully richer than any single sense could deliver alone.`,
      `A room's soundscape shifting subtly as the evening moves from arrival to main course to dessert. Visual motion pacing itself to match the natural rhythm of a meal rather than staying static or looping obliviously in the background. The goal isn't spectacle. It's atmosphere that elevates conversation rather than competing with it — present enough to be felt, restrained enough to never be the reason a table stops talking to each other.`,
    ],
  },
  {
    id: "beauty-as-strategy",
    title: "Why Beauty Becomes a Genuine Business Strategy",
    icon: <TrendingUp size={20} />,
    paragraphs: [
      `There's a temptation to treat ambiance and art as decoration — nice to have, hard to justify on a spreadsheet. That's a mistake, and it's about to become a more expensive one. In a market with hundreds of restaurants competing for the same guests, when food quality converges toward a shared high floor, beauty and vibe become measurable business drivers, not aesthetic indulgences.`,
      `The restaurants building genuine loyalty over the next decade won't just be the ones with the best kitchen technology; everyone will eventually have access to comparable kitchen technology. They'll be the ones that consistently deliver moments of magic and moments of delight — the specific, personal, emotionally resonant instances a guest actually remembers and repeats to other people. Loyalty in an experience economy isn't built on consistency of food alone. It's built on the accumulated weight of moments a restaurant made someone feel genuinely seen.`,
      `They will carry evolving art that speaks to the customers, that fits the energy and the ethos of the restaurant, that adapts to the customer.`,
    ],
  },
  {
    id: "what-this-means-for-staff",
    title: "What This Means for Staff, and Why That's Good News",
    icon: <UserCheck size={20} />,
    paragraphs: [
      `A necessary clarification, because this can easily be misread as "AI and robots eat restaurants." It's closer to the opposite. As automation and AI absorb the repetitive, precision-dependent parts of food preparation and service — freeing kitchen and floor staff from the tasks that currently consume most of their energy — the humans in the room get to spend more of their time on exactly the things that actually build loyalty: warmth, curation, storytelling, genuine hospitality, the parts of the job that made great servers and chefs fall in love with the industry in the first place.`,
      `The restaurants that thrive in this future will be the ones that use technology to give their people more room to be exceptional.`,
    ],
  },
  {
    id: "where-deckoviz-fits",
    title: "Where Deckoviz Fits Into This Future",
    icon: <Sparkles size={20} />,
    paragraphs: [
      `Everything described above requires an actual delivery layer — a way to bring ambiance, storytelling, aesthetics, and personalization to life in a physical space, in real time, without needing a team. This is exactly the role Deckoviz is built to play.`,
      `As an ambience, art, and aesthetics platform, Deckoviz shifts a room's visual and sonic energy automatically, matching the rhythm of a service — from a bright, energetic lunch to an intimate, low-lit dinner — without a single manual adjustment. Powered by a large and growing Global Library of Art and Media.`,
      `As a design and storytelling platform, it turns blank walls into a living expression of a restaurant's cuisine, culture, and history — whether that's Japanese aesthetic loops for a sushi bar or a neighborhood's own visual legacy for a local institution.`,
      `As a personalization platform, Vizzy remembers returning guests, their preferences, their past visits, and can shape an evening's visual and sonic atmosphere around a specific occasion — a date night, a birthday, a quiet solo dinner — often before a single word is exchanged with staff.`,
      `As a guest experience platform, it turns waiting time into storytelling — a dish's origin, a chef's inspiration, the journey of tonight's ingredients — and sends guests home with something to remember the night by — a personalized artwork, a table portrait, a keepsake that quietly keeps the restaurant present in a guest's life long after the check is paid.`,
      `None of this replaces a kitchen's craft or a server's warmth. It's the layer that makes both of those things land harder, more consistently, for more of the guests who walk through the door.`,
    ],
  },
  {
    id: "restaurants-that-win",
    title: "The Restaurants That Win the Next Decade",
    icon: <Trophy size={20} />,
    paragraphs: [
      `The pattern across every serious industry forecast points to the same direction: that hyper-personalization, immersive ambiance, and experience-led differentiation aren't a niche trend for high-end tasting menus. They will soon become the baseline expectation across the entire category — the same way personalization already is fast becoming in hospitality and retail.`,
      `The restaurants that will win are the ones that understand a simple, honest truth about their own industry: people have always gone out to eat for more than the food. What's changing is that, for the first time, restaurants finally have the tools to make the "more than the food" part exceptional — and just as intentional, just as consistent, and just as memorable as the meal itself.`,
      `That's the actual opportunity sitting in front of the restaurant industry right now. A chance, finally, to make the special part scale.`,
    ],
  },
];

/* ================================================================
   PULL QUOTE
   ================================================================ */
const PULL_QUOTE = {
  text: `People have always gone out to eat for more than the food. What's changing is that, for the first time, restaurants finally have the tools to make the "more than the food" part exceptional.`,
  afterSection: 4,
};

/* ================================================================
   STAT CALLOUTS
   ================================================================ */
const STATS = [
  { value: "$37B", label: "Restaurant automation by 2025" },
  { value: "23%", label: "AI restaurant tech CAGR" },
  { value: "2030", label: "Experience-led baseline" },
];

/* ================================================================
   COMPONENT
   ================================================================ */
export default function RestaurantOf2030() {
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
            "linear-gradient(90deg, #7c2d12, #ea580c, #f59e0b)",
          boxShadow: "0 0 20px rgba(234,88,12,0.5)",
        }}
      />

      {/* ═══ Ambient Background ═══ */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fdf8f0] via-[#fef3e2] to-[#fef9f0]" />
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7c2d12 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="fixed top-[-200px] right-[-100px] w-[600px] h-[600px] bg-orange-200/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-200px] left-[-100px] w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[130px] pointer-events-none" />

      {/* ═══ Hero Header ═══ */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="relative min-h-[520px] md:min-h-[560px] flex items-end">
          {/* Gradient hero background — warm restaurant tones */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0e05] via-[#2d1a0a] to-[#3d1f0d]" />
          {/* Warm ambient glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(234,88,12,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 80%, rgba(245,158,11,0.25) 0%, transparent 60%)",
            }}
          />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
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
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-white/10 backdrop-blur-md border border-white/15 mb-5">
              <UtensilsCrossed size={12} />
              Thought Piece · Hospitality
            </span>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Restaurant of 2030:{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                Designing for an Experience-Led Future
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/50 max-w-2xl mb-6 leading-relaxed italic">
              A thought piece for restaurant owners, operators, and hospitality leaders
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-5">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  DSL
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">
                    Deckoviz Space Labs
                  </p>
                  <p className="text-[11px] text-white/40">
                    9,137 followers
                  </p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar size={14} className="text-amber-400" />
                <span>August 27, 2026</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Clock size={14} className="text-amber-400" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* Bottom fade into page bg */}
          <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-[#fdf8f0] to-transparent" />
        </div>
      </div>

      {/* ═══ Stats Bar ═══ */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_4px_20px_rgba(124,45,18,0.06)]"
            >
              <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#7c2d12] to-[#ea580c] bg-clip-text text-transparent">
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
            <div className="relative rounded-[2rem] backdrop-blur-2xl bg-white/65 border border-white/80 shadow-[0_8px_60px_rgba(124,45,18,0.06),0_2px_4px_rgba(0,0,0,0.02)] px-6 py-10 sm:px-10 md:px-16 md:py-14 overflow-hidden">
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
                      className="scroll-mt-28 flex items-center gap-3 text-xl md:text-2xl font-bold text-[#1a0e05] mt-14 mb-6 first:mt-0"
                      style={{
                        fontFamily:
                          "'Playfair Display', Georgia, serif",
                      }}
                    >
                      <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c2d12] to-[#ea580c] flex items-center justify-center text-white shadow-md">
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
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="w-1 h-1 rounded-full bg-amber-200" />
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                      </div>
                    )}

                    {/* Pull quote after designated section */}
                    {sIdx === PULL_QUOTE.afterSection && (
                      <div className="relative my-12 py-8 px-8 md:px-12 rounded-2xl bg-gradient-to-br from-[#1a0e05] to-[#3d1f0d] text-white overflow-hidden">
                        <div className="absolute top-4 left-6 text-amber-400/20">
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
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-[60px]" />
                      </div>
                    )}
                  </div>
                ))}
              </article>
            </div>

            {/* ═══ Author Card ═══ */}
            <div className="mt-10 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 p-8 shadow-[0_8px_40px_rgba(124,45,18,0.06)]">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                  DSL
                </div>
                <div>
                  <h3 className="font-bold text-[#1a0e05] text-lg">
                    Deckoviz Space Labs
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Exploring the future of spaces, experiences, and how technology can make physical environments more alive, more personal, and more human.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">9,137 followers</p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ Sticky Table of Contents ═══ */}
          <aside className="hidden xl:block w-[280px] shrink-0">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 p-6 shadow-[0_8px_40px_rgba(124,45,18,0.06)]">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7c2d12] to-[#ea580c] rounded-t-2xl" />
                {/* Glass overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 30%)",
                  }}
                />

                <p className="relative z-10 text-[10px] font-black text-[#7c2d12]/50 uppercase tracking-[0.2em] mb-5">
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
                            ? "text-[#ea580c] font-bold bg-orange-50/80 border-l-[3px] border-[#ea580c] -ml-[3px]"
                            : "text-slate-500 hover:text-[#7c2d12] hover:bg-white/60 border-l-[3px] border-transparent -ml-[3px]"
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
                <div className="mt-6 pt-4 border-t border-orange-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Reading Progress
                    </span>
                    <span className="text-[11px] font-bold text-[#ea580c]">
                      {Math.round(readProgress)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${readProgress}%`,
                        background:
                          "linear-gradient(90deg, #7c2d12, #ea580c)",
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
          background: "linear-gradient(135deg, #7c2d12, #ea580c)",
          boxShadow: "0 8px 30px rgba(124,45,18,0.4)",
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
