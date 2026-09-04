import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicImageGrid } from "../other/DynamicImageGrid";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building2,
  Brain,
  Cpu,
  CheckCircle2,
  Compass,
  Layers,
  Presentation,
  Target,
  FileText,
  Clock,
  Users,
  ShieldCheck,
  TrendingUp,
  Search,
  Check,
  Award,
  Globe
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

/* ── school showcase images ── */
const schoolImages = [
  { src: "/images/school/ChatGPT Image Jul 11, 2026, 07_21_06 PM.png", tag: "A Wall That Teaches" },
  { src: "/images/school/ChatGPT Image Jul 11, 2026, 07_21_10 PM.png", tag: "Visual Learning" },
  { src: "/images/school/ChatGPT Image Jul 11, 2026, 07_21_12 PM.png", tag: "Creative Companion" },
  { src: "/images/school/ChatGPT Image Jul 11, 2026, 07_21_13 PM.png", tag: "Gallery for Art" },
  { src: "/images/school/ChatGPT Image Jul 11, 2026, 07_21_15 PM.png", tag: "History Brought to Life" },
  { src: "/images/school/ChatGPT Image Jul 11, 2026, 07_21_16 PM.png", tag: "Dynamic Environment" },
];

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

/* ═══════════════ REUSABLE VISUAL COMPONENTS ═══════════════ */

/* Dynamic Floating Teal Particles */
const TealParticles: React.FC<{ count?: number }> = ({ count = 35 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    color: i % 3 === 0 ? "#0d9488" : i % 3 === 1 ? "#0284c7" : "#059669",
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.25,
            filter: "blur(1px)",
          }}
          animate={{ y: [-15, 15, -15], x: [-6, 6, -6], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

/* Soft Glow Orb */
const GlowOrb: React.FC<{ color?: string; size?: string; top?: string; left?: string; right?: string; bottom?: string; opacity?: number; blur?: string }> = ({
  color = "#ccfbf1", size = "650px", top, left, right, bottom, opacity = 0.45, blur = "140px",
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none z-0"
    style={{ width: size, height: size, top, left, right, bottom, background: color, filter: `blur(${blur})`, opacity }}
    animate={{ scale: [1, 1.12, 1], opacity: [opacity, opacity * 1.25, opacity] }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* Section Eyebrow Badge */
const SectionEyebrow: React.FC<{ icon: React.FC<{ className?: string }>; text: string }> = ({ icon: Icon, text }) => (
  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-6 bg-teal-50 border border-teal-200 text-teal-800 shadow-sm backdrop-blur-md">
    <Icon className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
    <span>{text}</span>
    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping ml-1" />
  </div>
);

/* ═══════════════ DATA STRUCTURES ═══════════════ */

const pillars = [
  {
    number: "01",
    title: "Multimodal Generation & Display",
    sub: "Create and display anything a lesson needs, instantly.",
    body: "Images, videos, music, narration, posters, interactive diagrams, whatever a moment calls for, generated live and displayed beautifully on the frame. No pre-built slide deck can keep up with an actual classroom conversation. Deckoviz can.",
    points: [
      "Real-time visual generation for any subject, any grade level",
      "Full multimodal range: image, video, sound, narration, all in one platform",
      "Sent straight to the frame, no exporting, no fumbling with files mid-lesson"
    ],
  },
  {
    number: "02",
    title: "The Student's Long-Term Learning Companion",
    sub: "Not just in class but throughout their entire school journey.",
    body: "Every student gets their own Vizzy, one that doesn't reset each term. It remembers what a student struggled with in September and how they've grown by June, then carries that understanding into next year, and the year after that.",
    points: [
      "A single companion that grows with a student from their first year to their last",
      "Learns how each student learns best, and adapts experiences, materials and explanations accordingly",
      "Builds genuine self-motivation and love of learning, and fun in learning; this is not designed for task completion or rote learning but as a core pillar of holistic, future-focused education",
      "Manage learning and progress on the students dashboard"
    ],
  },
  {
    number: "03",
    title: "The Teacher's Assistant",
    sub: "A real second presence in the classroom, not another app to manage.",
    body: "Vizzy generates lesson visuals, materials, and assessments in real time, live, in front of the class, on the teacher's cue. It reduces prep work without ever replacing the teacher's judgment or voice or presence. It also allows teachers to manage students more effectively, flag issues, track progress and growth, and thus pay more deeper, more deliberate attention to each child’s learning journeys.",
    points: [
      "Live-generated visuals and materials, on demand, mid-lesson",
      "Deep context on each teacher's style, pace, and subject",
      "Hours of prep time given back, every single week",
      "Manage students and their progress on the teachers dashboard"
    ],
  },
  {
    number: "04",
    title: "80+ Unique Experiences, Skills & Modes",
    sub: "Things a traditional classroom simply couldn't offer before.",
    body: "From full life skills courses to immersive language immersion rooms to experiences like a planetarium or immersive experience on your classroom wall, Deckoviz already includes more than 80 distinct experiences built specifically for schools, and we add new ones every week.",
    points: [
      "Life skills courses: emotional intelligence, financial literacy, resilience, and more",
      "Immersive experiences: living history, astronomy, mythology across cultures",
      "Creative studios: comic book creation, storytelling, music, poetry, worldbuilding"
    ],
  },
];

const platformFeatures = [
  { title: "Interactive, Multimodal Test Creation Suite", desc: "Teacher-guided, AI-generated assessments across any subject, calibrated to the student, with detailed post-test analysis", icon: FileText },
  { title: "Strength & Weakness Mapping", desc: "A living, evolving picture of each student's progress, not a single test score", icon: Target },
  { title: "Progress Tracking, Longitudinal", desc: "Growth visualised across terms and years, not just within one", icon: TrendingUp },
  { title: "Class & Group Facilitation Tools", desc: "Vizzy-led group learning sessions for small groups, up to ten students, with balanced participation", icon: Users },
  { title: "Daily Study Journal", desc: "An adaptive, reflective check-in that evolves with each student, never a static template", icon: BookOpen },
  { title: "Teacher & Student Dashboards", desc: "One home for schedules, materials, progress, and Vizzy, always accessible", icon: Layers },
  { title: "Life Skills Progress Tracker", desc: "Session-by-session continuity across every enrichment course, resumable at any time", icon: Compass },
  { title: "Smart Access Library", desc: "Every lesson, material, and piece of student work stored and instantly retrievable, searchable, and reusable across classes and years", icon: BookOpen },
];

const useCases = [
  { title: "Real-Time Visual and Multimodal Learning", desc: "Turns any lesson into a living diagram or scene, generated as the class discusses it, not prepared the night before.", icon: Presentation },
  { title: "Personalised Learning Plans", desc: "Vizzy tracks each student's progress and tailors material to how they specifically learn.", icon: Brain },
  { title: "The Creative Companion", desc: "A genuine creative partner for art, poetry, music, and writing, nudging students rather than just producing for them.", icon: Sparkles },
  { title: "Storytelling for History & Math", desc: "Abstract lessons become immersive visual narratives students can actually see unfold.", icon: Globe },
  { title: "The Student Art Gallery", desc: "Rotating, dignified display of student work, always fresh, never stuck to a fridge.", icon: Award },
  { title: "Live Teaching Assistant Mode", desc: "Vizzy present in class with its own avatar, generating support material on the teacher's cue.", icon: Cpu },
  { title: "Evaluation & Mapping Sessions", desc: "Personalised, AI-guided testing with detailed strengths and gaps analysis at the end.", icon: Target },
  { title: "Life Skills Curriculum", desc: "50+ structured courses in emotional intelligence, creativity, and critical thinking, delivered live.", icon: GraduationCap },
  { title: "Group Learning Sessions", desc: "Small-group facilitation that balances participation and builds genuine peer learning.", icon: Users },
  { title: "Daily Study Journal", desc: "A short, adaptive daily reflection that deepens as it learns each student over time.", icon: Clock },
  { title: "Dynamic Boards", desc: "Schedules, reminders, and announcements displayed with real polish, updated instantly, on dynamic notice boards.", icon: Building2 },
  { title: "Campus-Wide Wayfinding & Legacy Walls", desc: "Mission statements, achievements, and event boards, dynamic instead of laminated.", icon: ShieldCheck },
];

const thirtyMore = [
  { text: "Immersive field trips to places the class could never physically visit" },
  { text: "Astronomy sessions that turn a classroom wall into a planetarium" },
  { text: "Language immersion rooms conducted entirely in the target language" },
  { text: "Living history scenes students can explore and question in real time" },
  { text: "Mythology and world culture sessions with art style matched to each tradition" },
  { text: "Philosophy discussions built around live, reshaping thought experiments" },
  { text: "Debate mode with an AI opponent that never repeats an argument" },
  { text: "Comic book and graphic novel creation studio for storytelling-minded students" },
  { text: "Music composition and appreciation, paired with generated visual accompaniment" },
  { text: "Public speaking and presentation coaching with live generated support material" },
  { text: "Career exploration sessions mapped to a student's real interests" },
  { text: "Financial literacy courses for both younger students and teens" },
  { text: "Design thinking and invention labs for hands-on problem solvers" },
  { text: "Architecture and spatial imagination exercises for young designers" },
  { text: "Game design fundamentals, taught as a real creative discipline" },
  { text: "Film and animation storyboarding for visual storytellers" },
  { text: "Entrepreneurship and pitching practice for aspiring founders" },
  { text: "Science fiction and worldbuilding projects that build systems thinking" },
  { text: "Conflict resolution and negotiation practice through live role-play" },
  { text: "Leadership and teamwork sessions with fairly rotated group roles" },
  { text: "Mindfulness and breathing practice woven naturally into the school day" },
  { text: "Gratitude and positive psychology built as a lasting, visible habit" },
  { text: "Resilience and growth mindset lessons grounded in a student's own history" },
  { text: "Digital wellness and honest AI literacy, taught by the AI itself" },
  { text: "Substitute teacher bridge mode, keeping a class on track with no coverage gap" },
  { text: "Parent-teacher conference prep, visual progress summaries built automatically" },
  { text: "Cross-class time capsule projects building school-wide belonging" },
  { text: "New student orientation, delivered as a warm, visual welcome" },
  { text: "End-of-year growth retrospectives, personal and genuinely meaningful" },
  { text: "University research visualisation and campus event boards for higher ed" },
];

const coreBenefits = [
  { title: "Holistic Learning Journeys", desc: "for all dimensions of a child's comprehensive education - creativity, thinking skills, metalearning skills, life skills, values, love of learning and more" },
  { title: "The Cutting Edge of Education", desc: "make your school and your educational experience adapt to the future proactively" },
  { title: "Make Your Students AI-Ready", desc: "Designed for the AI-world and the world that comes after" },
  { title: "Stronger Institutional Brand", desc: "a campus that feels genuinely forward-thinking, not just well-equipped" },
  { title: "Deeper Student Engagement", desc: "visual, immersive learning that measurably improves retention; help kids develop a deep joy of learning" },
  { title: "Significant Teacher Time Saved", desc: "hours of prep work handed back every week, so more time can be spent on personal one-to-one with students" },
  { title: "Genuine Personalisation at Scale", desc: "every student gets tailored material and evaluations and progress journeys, without multiplying teacher workload" },
  { title: "Higher Enrollment & Admissions Conversion", desc: "an open day experience families actually remember" },
];

const secondaryBenefits = [
  "A meaningful competitive edge in an increasingly crowded schools market",
  "Organic word of mouth from parents and students who've experienced it firsthand",
  "A future-ready AI literacy and life skills foundation, built into daily school life rather than bolted on",
  "Richer, longitudinal insight into student growth for staff and leadership",
];

const DeckovizSchoolsLanding: React.FC = () => {
  const navigate = useNavigate();
  const [showAllThirty, setShowAllThirty] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const displayedThirty = showAllThirty
    ? thirtyMore
    : thirtyMore.slice(0, 15);

  const filteredThirty = displayedThirty.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      {/* Background Lighting & Particles */}
      <TealParticles count={40} />
      <GlowOrb color="#ccfbf1" size="800px" top="-150px" left="-200px" opacity={0.5} />
      <GlowOrb color="#e0f2fe" size="700px" top="35%" right="-250px" opacity={0.45} />
      <GlowOrb color="#d1fae5" size="900px" bottom="5%" left="-300px" opacity={0.5} />

      {/* Subtle Mesh Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #0d9488 1px, transparent 1px), linear-gradient(to bottom, #0d9488 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO SECTION
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div variants={fadeUp} custom={0}>
            <SectionEyebrow icon={GraduationCap} text="DECKOVIZ FOR SCHOOLS" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-8"
          >
            Where{" "}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Learning Comes Alive
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 font-normal leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            A living, thinking, adaptive learning platform - multimodal display plus learning companion, present in every classroom, personalised to every student, every teacher, every class,{" "}
            <span className="text-teal-800 font-semibold">growing sharper every single day.</span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-60 blur-md group-hover:opacity-90 transition duration-500 animate-pulse" />
              <button
                onClick={() => navigate("/contact")}
                className="relative px-9 py-4 rounded-full font-bold text-base bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white shadow-xl shadow-teal-600/25 hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-teal-200 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Book a Demo</span>
              </button>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("short-intro");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-9 py-4 rounded-full font-bold text-base bg-white border border-teal-300 text-teal-800 hover:bg-teal-50 hover:border-teal-400 hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <span>See It In Action</span>
              <ArrowRight className="w-5 h-5 text-teal-600" />
            </button>

            <button
              onClick={() => navigate("/schools-general-info")}
              className="px-9 py-4 rounded-full font-bold text-base bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100/80 hover:scale-105 transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-teal-700" />
              <span>Full Features Catalogue</span>
            </button>
          </motion.div>

          {/* Quick Sub-navigation */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {[
              { label: "Full Features Catalogue", icon: BookOpen, path: "/schools-general-info" },
              { label: "Colleges & Universities", icon: GraduationCap, path: "/deckoviz-for-universities" },
              { label: "Sponsorship Program", icon: Building2, path: "/sponsorship" },
            ].map((link) => {
              const IconComp = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-teal-300 hover:bg-teal-50/70 hover:text-teal-900 transition-all duration-300"
                >
                  <IconComp className="w-3.5 h-3.5 text-teal-600" />
                  <span>{link.label}</span>
                  <span className="text-xs opacity-70 transition-transform duration-300 group-hover:translate-x-1">➔</span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SCROLLING SHOWCASE GALLERY
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 py-6">
        <DynamicImageGrid
          imageSources={schoolImages}
          sectionTitle="Classrooms Reimagined"
          sectionDescription="Visuals that adapt. Learning that feels less like a lecture and more like a conversation."
          isLightMode={true}
        />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. SHORT INTRO
         ════════════════════════════════════════════════════════════════ */}
      <section id="short-intro" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-white border border-teal-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-teal-900/5 backdrop-blur-md"
        >
          <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs shadow-md">
            SHORT INTRO
          </div>
          <p className="text-xl sm:text-2xl text-slate-800 leading-relaxed font-normal tracking-wide pt-2">
            Deckoviz for Schools brings together a generative, multimodal display and Vizzy, an AI that teaches, assists, and grows alongside every student and every teacher in your school. It's the first platform genuinely built for immersive, interactive, multimodal learning, not a mere display repurposed for the classroom.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. LONGER INTRO
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="bg-gradient-to-b from-slate-50 to-teal-50/40 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg space-y-8 text-slate-700 text-lg sm:text-xl leading-relaxed">
          <SectionEyebrow icon={Globe} text="LONGER INTRO" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              A <span className="bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">Different Category</span> of Learning
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-l-2 border-slate-300 pl-6"
          >
            Most education technology has historically solved a distribution problem. It takes something that already exists - a worksheet, a textbook, a slideshow, a video - and makes it easier to deliver, access, or organise. That is useful. But fundamentally, it is still the same education travelling through a better pipe.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-900 font-semibold text-xl sm:text-2xl border-l-4 border-teal-600 pl-6 py-2 bg-white/70 rounded-r-xl shadow-sm"
          >
            Deckoviz starts from a different question: what becomes possible to teach when a classroom has genuine generative intelligence, multimodal interaction, and a display designed not merely to show information, but to let students experience it?
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-l-2 border-slate-300 pl-6"
          >
            The answer is an entirely new category of learning experience. A philosophy discussion that evolves around the questions a student actually asks. A history lesson that doesn't simply describe ancient Rome, but lets an entire class walk through it. A science lesson that can move from an abstract concept to a visual simulation the moment a student struggles to understand it. A creative exercise that adapts itself to the imagination, ability and curiosity of every student in the room. And a learning companion that can grow with a child - remembering where they struggled, what fascinated them, how they learn, and what they were capable of yesterday - from their earliest years of school through their adolescence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative pt-6 border-t border-teal-200 text-teal-900 font-semibold text-lg sm:text-xl leading-relaxed"
          >
            That is what Deckoviz for Schools is building. Not a smart display with educational content loaded onto it, but a comprehensive learning ecosystem: a generative display, an AI teaching assistant, and a personalised learning companion, working together as one platform and becoming a persistent part of the classroom itself.
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. THE FOUR CORE PILLARS
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionEyebrow icon={Layers} text="THE FOUR CORE PILLARS" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            The Four Core Pillars
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-12 space-y-16 border-l-2 border-teal-300">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ x: 6 }}
              className="relative pl-6 sm:pl-8 group transition-all"
            >
              <div className="absolute -left-[31px] sm:-left-[55px] top-0 w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-125 transition-transform">
                {pillar.number}
              </div>
              <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-teal-300 transition-all">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-base font-semibold text-teal-700 mb-4">
                  {pillar.sub}
                </p>
                <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-3xl">
                  {pillar.body}
                </p>
                <div className="space-y-3">
                  {pillar.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. MORE BUILT INTO THE PLATFORM
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionEyebrow icon={Sparkles} text="MORE BUILT INTO THE PLATFORM" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">More Built Into The Platform</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {platformFeatures.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -3 }}
                className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          6. 12 CORE USE CASES
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionEyebrow icon={Compass} text="12 CORE USE CASES" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">12 Core Use Cases</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-white border border-slate-200/80 hover:border-teal-400 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 mb-4 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {useCase.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. 30 MORE WAYS DECKOVIZ FITS YOUR SCHOOL
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow icon={Building2} text="30 MORE WAYS DECKOVIZ FITS YOUR SCHOOL" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            30 More Ways Deckoviz Fits Your School
          </h2>

          <div className="mt-8 space-y-4 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />
              <input
                type="text"
                placeholder="Search school implementations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:border-teal-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <motion.div layout className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          <AnimatePresence>
            {filteredThirty.length > 0 ? (
              filteredThirty.map((item, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="px-4 py-2.5 rounded-full bg-white border border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-xs text-slate-800 shadow-sm transition-all flex items-center gap-2 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  <span>{item.text}</span>
                </motion.div>
              ))
            ) : (
              <div className="py-8 text-slate-500 text-sm">
                No matching implementations found for &quot;{searchQuery}&quot;.
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {!showAllThirty && !searchQuery && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllThirty(true)}
              className="px-6 py-2.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-all shadow-sm"
            >
              Show All 30 Ways ↓
            </button>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════════════
          8. CORE BENEFITS
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionEyebrow icon={TrendingUp} text="CORE BENEFITS" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Core Benefits</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Primary Benefits */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-slate-200 pb-3">
              Primary Institutional Benefits
            </h3>
            {coreBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-teal-300 transition-all"
              >
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{benefit.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Secondary Benefits */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-slate-200 pb-3">
              Secondary Benefits
            </h3>
            {secondaryBenefits.map((text, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CLOSING & CTA
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 text-center">
        <div className="bg-gradient-to-b from-teal-50/60 via-white to-teal-50/40 border border-teal-200 rounded-3xl p-8 sm:p-14 shadow-xl space-y-8 max-w-4xl mx-auto">
          <SectionEyebrow icon={GraduationCap} text="CLOSING" />

          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            <p className="font-bold text-teal-900 text-2xl">
              Bring Learning to Life in Every Classroom.
            </p>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              See what a school looks like when multimodal visual generation, teaching assistants, and student companions work together as one.
            </p>
          </div>

          <div className="border-t border-teal-200 pt-10">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-60 blur-md group-hover:opacity-90 transition duration-500 animate-pulse" />
                <button
                  onClick={() => navigate("/contact")}
                  className="relative px-9 py-4 rounded-full font-bold text-base bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white shadow-xl shadow-teal-600/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-teal-200" />
                  <span>Book a Demo</span>
                </button>
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="px-9 py-4 rounded-full font-bold text-base bg-white border border-teal-300 text-teal-800 hover:bg-teal-50 hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
              >
                <Users className="w-5 h-5 text-teal-700" />
                <span>Talk to Our Team</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-6 border-t border-slate-200 pt-8 flex-wrap">
              {[
                { label: "Full Features Catalogue", icon: BookOpen, path: "/schools-general-info" },
                { label: "Colleges & Universities", icon: GraduationCap, path: "/deckoviz-for-universities" },
                { label: "Sponsorship Program", icon: Building2, path: "/sponsorship" },
              ].map((link, i) => {
                const IconComp = link.icon;
                return (
                  <React.Fragment key={link.path}>
                    {i > 0 && <div className="w-1.5 h-1.5 rounded-full bg-teal-300 hidden sm:block" />}
                    <button
                      onClick={() => navigate(link.path)}
                      className="group flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-800 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-sm">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span>{link.label}</span>
                      <span className="text-xs opacity-70 transition-transform duration-300 group-hover:translate-x-1">➔</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DeckovizSchoolsLanding;
