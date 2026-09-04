import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Sparkles,
  ArrowRight,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  ShieldCheck,
  Zap,
  Globe,
  Building2
} from "lucide-react";

/* ═══════════════ LIGHT TEAL & EMERALD DESIGN SYSTEM ═══════════════ */
const LightTheme = {
  bg: "#f8fafc",
  bgSubtle: "#f1f5f9",
  cardBg: "#ffffff",
  textDark: "#0f172a",
  textMuted: "#475569",
  tealPrimary: "#0d9488",
  tealLight: "#14b8a6",
  tealSoft: "#ccfbf1",
  emeraldPrimary: "#059669",
  emeraldSoft: "#d1fae5",
  cyanPrimary: "#0284c7",
  cyanSoft: "#e0f2fe",
  borderLight: "#e2e8f0",
};

/* Animation Variants */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* Soft Glow Orb Component */
const GlowOrb: React.FC<{
  color?: string;
  size?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  blur?: string;
}> = ({
  color = "#ccfbf1",
  size = "650px",
  top,
  left,
  right,
  bottom,
  opacity = 0.45,
  blur = "140px",
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none z-0"
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      bottom,
      background: color,
      filter: `blur(${blur})`,
      opacity,
    }}
    animate={{
      scale: [1, 1.12, 1],
      opacity: [opacity, opacity * 1.25, opacity],
    }}
    transition={{
      duration: 9,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/* Section Eyebrow Badge */
const SectionEyebrow: React.FC<{ icon: React.FC<{ className?: string }>; text: string }> = ({
  icon: Icon,
  text,
}) => (
  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-6 bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
    <Icon className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
    <span>{text}</span>
    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping ml-1" />
  </div>
);

const SponsorshipPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      {/* Background Lighting Effects */}
      <GlowOrb color="#ccfbf1" size="800px" top="-150px" left="-200px" opacity={0.5} />
      <GlowOrb color="#e0f2fe" size="700px" top="35%" right="-250px" opacity={0.45} />
      <GlowOrb color="#d1fae5" size="900px" bottom="5%" left="-300px" opacity={0.5} />

      {/* Subtle Mesh Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #0d9488 1px, transparent 1px), linear-gradient(to bottom, #0d9488 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Top Hero Header Section ── */}
      <div className="relative pt-32 pb-16 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Navigation Breadcrumb & Universal Back Button */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-teal-800 hover:border-teal-300 text-xs font-semibold shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-teal-600" />
              <span>Go Back</span>
            </button>

            <span className="text-xs text-teal-800 font-bold uppercase tracking-widest bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full shadow-sm">
              Deckoviz Space Labs Division
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Header Badge */}
            <SectionEyebrow icon={Heart} text="THE SPONSORSHIP PROGRAM" />

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Bringing the Future of Learning to Every Classroom — <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-transparent bg-clip-text">
                Not Just the Ones That Can Afford It
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
              We built the Deckoviz Sponsorship Program to deliberately break the pattern of educational inequality. 
              Join individuals, families, and organizations in sponsoring AI-powered visual learning surfaces and dedicated companions for classrooms in need.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Sponsorship Content ── */}
      <section className="py-12 relative z-10 max-w-7xl mx-auto px-6 space-y-16">

        {/* Block 1: WHAT IS DECKOVIZ FOR SCHOOLS? */}
        <div className="p-8 md:p-14 rounded-3xl bg-white border border-teal-200/80 shadow-xl shadow-teal-900/5 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-sm">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
              WHAT IS DECKOVIZ FOR SCHOOLS?
            </h2>
          </div>

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-10 font-normal">
            Deckoviz GeDiPort is an AI-powered learning platform that turns classroom walls into living, adaptive learning surfaces — and gives every teacher and every student their own dedicated AI companion, designed specifically for education. It brings AI-powered, personalised, immersive, interactive, experiential learning to every classroom in your school.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 hover:bg-white transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white font-bold text-lg mb-6 flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Every Student Gets a Personal Learning Companion</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                One that genuinely grows with them, from one grade to the next, holding deep, continuous context about how they learn, where they struggle, and what excites them. Not a new tool every September. The same companion, growing up alongside the child across their schooling journey.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 hover:bg-white transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white font-bold text-lg mb-6 flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Every Teacher Gets a Personal Teaching Assistant</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                One that adapts to their specific teaching style, and can create, curate, and display any material they need instantly in any format: visual, text, video, or narrated. It builds adaptive study plans, flags struggling students, and takes manual content creation off their plate.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 hover:bg-white transition-all shadow-sm group">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white font-bold text-lg mb-6 flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">The Room Itself Becomes Part of the Curriculum</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The class becomes interactive, immersive, and fun. A physics lesson doesn't just get taught — the whole space becomes physics, visually and atmospherically. History, English, chemistry, art — each one transforms the room into living knowledge.
              </p>
            </div>
          </div>
        </div>

        {/* Block 2: WHY THIS IS AN ABSOLUTE REVOLUTION IN EDUCATION */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionEyebrow icon={Zap} text="TRANSFORMATIVE PARADIGM" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              WHY THIS IS AN <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">ABSOLUTE REVOLUTION</span> IN EDUCATION
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "It solves education's oldest structural problem",
                desc: "No teacher, however brilliant, can hold the complete learning profile of thirty different children in their head — how each one learns, where each one is stuck, what each one needs every day. Deckoviz removes that human attention limit."
              },
              {
                title: "It makes the impossible-to-teach genuinely visible",
                desc: "Physics, chemistry, and maths are hardest because of abstraction. Deckoviz brings these concepts off the page and onto the wall, in motion, at a scale no textbook ever could offer."
              },
              {
                title: "It personalises learning at scale",
                desc: "The child who needs more time gets more time. The child who's ready to move faster gets material that keeps pace with their curiosity. The same platform, genuinely different for every child."
              },
              {
                title: "It remembers",
                desc: "Because Vizzy has effectively unbounded memory, its understanding of a child accumulates across their entire time in school — not reset every year. A companion that grows alongside a child."
              },
              {
                title: "It makes learning fun",
                desc: "Kids thrive on novelty. Classrooms that look and feel different every day make students love learning rather than endure it."
              },
              {
                title: "It's built with real guardrails",
                desc: "We take AI dependency in education extremely seriously. Vizzy is designed to be a companion for the struggle, sparking curiosity and unblocking effort without replacing thinking."
              }
            ].map((rev, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold flex items-center justify-center mb-5 font-mono text-sm shadow-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{rev.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{rev.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3: WHY THE SPONSORSHIP PROGRAM */}
        <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-b from-teal-50/60 via-white to-teal-50/40 border border-teal-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <SectionEyebrow icon={Heart} text="OUR MISSION" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">
            WHY THE <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">SPONSORSHIP PROGRAM</span>
          </h2>
          <div className="space-y-6 text-slate-700 text-lg leading-relaxed max-w-5xl">
            <p>
              Here's the uncomfortable truth about almost every genuine leap forward in education technology: it reaches wealthy schools first, and it often stays there.
            </p>
            <p>
              The schools that can afford to pilot new technology are, disproportionately, the schools that already have the smallest classes, the most resourced teachers, and the least urgent need for something like this. Meanwhile, the schools where a personal learning companion for every child would matter most — where classes are large, where teachers are stretched thinnest, where the gap between a struggling student and the support they need is widest — are almost always the schools that can least afford to be early adopters.
            </p>
            <p className="font-bold text-slate-900 text-xl border-l-4 border-teal-600 pl-6 py-2 bg-white/80 rounded-r-2xl shadow-sm">
              We built the Deckoviz for Schools Sponsorship Program to break that pattern deliberately.
            </p>
            <p>
              The program exists to bring the full platform — the classroom portal, the personal AI companion for every student, the personal teaching assistant for every teacher — into schools that would never otherwise have access to it. Not a stripped-down version but the real thing, sponsored, so that the schools and the students who stand to gain the most are never the ones left waiting.
            </p>
            <p className="text-teal-900 font-bold">
              We're inviting individuals, families, and businesses who believe in this mission to sponsor a classroom, a school, or a program of schools — and to be part of bringing this directly to the children who need it most.
            </p>
          </div>
        </div>

        {/* Block 4: WHY THIS IS THE MOST MEANINGFUL GIFT YOU CAN GIVE A CHILD */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionEyebrow icon={Award} text="TRANSFORMATIVE IMPACT" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              WHY THIS IS THE MOST MEANINGFUL GIFT YOU CAN GIVE A CHILD
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "You are not giving a child a single moment of joy",
                desc: "You are giving them a companion for their entire education. A Deckoviz sponsorship doesn't fund a single lesson or term. It funds a relationship — a learning companion that will grow with that specific child through the day they leave school."
              },
              {
                title: "You give a struggling child what they never had: to be truly seen",
                desc: "In an overcrowded classroom, the child quietly falling behind is often the one a teacher simply doesn't have bandwidth to catch. This sponsorship gives that child a system built specifically to notice and adapt before gaps widen."
              },
              {
                title: "You are giving a gifted child room to actually fly",
                desc: "The child who's bored, coasting, and capable of so much more — this sponsorship gives them material that moves at the pace of their own curiosity, instead of waiting for a room to catch up."
              },
              {
                title: "You give every child the chance to fall in love with learning",
                desc: "Not compliance with school, but an actual, felt love of learning — the kind that shapes a life, a career, and a sense of who someone becomes. One of the most valuable gifts possible."
              },
              {
                title: "And you are doing it at the exact moment it matters most",
                desc: "Childhood education is not a cause you can retroactively fund. The window in which a child's relationship with learning gets formed is narrow. A sponsorship today reaches a child inside that window."
              },
              {
                title: "This is a compounding investment in a child's mind",
                desc: "It is an investment in a child's entire relationship with their own mind — their curiosity, creativity, resilience, and potential. Few gifts offer more lasting value."
              }
            ].map((gift, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-6 h-6 text-teal-600 fill-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{gift.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{gift.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Options Tiers */}
        <div className="pt-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionEyebrow icon={Building2} text="SPONSORSHIP TIERS" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              HOW YOU CAN SPONSOR A SCHOOL OR CLASSROOM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-teal-300 transition-all">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs uppercase tracking-wider shadow-sm">
                  Classroom Sponsor
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-2">Sponsor 1 Classroom</h3>
                <p className="text-slate-600 text-xs mb-6 leading-relaxed">Equip a complete classroom with 1 display hardware unit, teacher assistant seat, and up to 30 student companion seats.</p>
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="w-full py-4 rounded-full font-bold text-sm bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Sponsor a Classroom</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tier 2 (Highlighted) */}
            <div className="p-8 rounded-3xl bg-white border-2 border-teal-600 shadow-xl flex flex-col justify-between ring-4 ring-teal-600/10">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md">
                  Most Impactful
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-2">Sponsor an Entire Grade</h3>
                <p className="text-slate-600 text-xs mb-6 leading-relaxed">Support multiple classrooms across an entire age group, creating a synchronized cohort learning environment.</p>
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="w-full py-4 rounded-full font-bold text-sm bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white transition-all shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>Sponsor a Grade Level</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-teal-300 transition-all">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider shadow-sm">
                  Full Institution
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-2">Sponsor a Whole School</h3>
                <p className="text-slate-600 text-xs mb-6 leading-relaxed">Transform an entire school or community center with school-wide Deckoviz GeDiPort hardware and software coverage.</p>
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="w-full py-4 rounded-full font-bold text-sm bg-slate-900 hover:bg-[#182a4a] text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Sponsor Full School</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Block 5: HOW TO GET INVOLVED CTA */}
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              HOW TO GET INVOLVED
            </h2>
            <p className="text-lg md:text-xl text-teal-50 mb-8 leading-relaxed font-normal">
              We're looking for individuals, families, and organisations who want to sponsor a classroom, a full school, or a program across several schools — bringing Deckoviz GAVPort to students and teachers who would otherwise never have access to it.
            </p>
            <p className="text-base text-teal-100 mb-10">
              If this resonates with you, we'd love to talk — about which schools are ready, what a sponsorship actually funds, and how you can be part of bringing this to the children who need it most.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="px-10 py-5 rounded-full bg-white text-teal-900 font-extrabold text-lg hover:bg-teal-50 transition-all duration-300 shadow-2xl hover:scale-105 inline-flex items-center gap-3"
            >
              <span>Deckoviz Space Labs — Sponsor a School</span>
              <ArrowRight className="w-5 h-5 text-teal-800" />
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};

export default SponsorshipPage;
