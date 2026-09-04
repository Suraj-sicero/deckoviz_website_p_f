import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Compass,
  Cpu,
  ShieldCheck,
  Search,
  CheckCircle2,
  Brain,
  Layers,
  Presentation,
  Microscope,
  FileText,
  Building2,
  ArrowRight,
  X,
  Award,
  Zap,
  Target,
  Clock,
  Check,
  Globe,
  TrendingUp
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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ═══════════════ BACKGROUND & LIGHTING EFFECTS ═══════════════ */

/* Dynamic Floating Teal Particles */
const DynamicTealParticles: React.FC<{ count?: number }> = ({ count = 35 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    dur: Math.random() * 9 + 7,
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
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* Interactive Cursor Spotlight Glow */
const CursorSpotlight: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 148, 136, 0.06), transparent 80%)`,
      }}
    />
  );
};

/* Soft Glow Orb */
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

export default function DeckovizForUniversities() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [campusWaysCategory, setCampusWaysCategory] = useState<string>("All");
  const [vizzyActiveTab, setVizzyActiveTab] = useState<"student" | "faculty">("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    role: "Faculty",
    message: "",
  });

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setDemoModalOpen(false);
      setFormData({ name: "", email: "", institution: "", role: "Faculty", message: "" });
    }, 2800);
  };

  /* 12 Core Use Cases Data */
  const coreUseCases = [
    {
      id: 1,
      title: "Live Lecture Visualisation",
      desc: "Complex theories and case studies rendered as real-time visual material that actually holds attention.",
      icon: Presentation,
    },
    {
      id: 2,
      title: "Research Data Visualisation",
      desc: "Months of research turned into clear, compelling visuals for a defense, a conference, or a paper.",
      icon: Microscope,
    },
    {
      id: 3,
      title: "The Student Academic Companion",
      desc: "Personalised support that tracks a student's actual course load, goals, and progress across their entire degree.",
      icon: Brain,
    },
    {
      id: 4,
      title: "TA & Faculty Support Mode",
      desc: "Live-generated material for sections, office hours, and grading support, without replacing academic judgment.",
      icon: Cpu,
    },
    {
      id: 5,
      title: "Career Exploration & Pitch Practice",
      desc: "Realistic interview and pitch rehearsal, with generated support material tailored to a student's field.",
      icon: Target,
    },
    {
      id: 6,
      title: "Campus Wayfinding & Event Boards",
      desc: "Lecture changes, campus events, and building navigation, displayed dynamically, no laminated signage.",
      icon: Building2,
    },
    {
      id: 7,
      title: "Admissions & Open Day Storytelling",
      desc: "A visual, immersive introduction to campus life that a printed brochure could never deliver.",
      icon: Sparkles,
    },
    {
      id: 8,
      title: "Legacy & Alumni Walls",
      desc: "A university's history, achievements, and notable graduates, brought to life dynamically.",
      icon: Award,
    },
    {
      id: 9,
      title: "Research Group Collaboration Spaces",
      desc: "Shared visual workspaces for labs and project teams to think and build together.",
      icon: Users,
    },
    {
      id: 10,
      title: "Reflective Check-In Sessions",
      desc: "A private, adaptive space for students to process academic stress and workload, always pointing toward real support when needed.",
      icon: ShieldCheck,
    },
    {
      id: 11,
      title: "Cohort & Study Group Facilitation",
      desc: "Structured, Vizzy-supported group study sessions that balance participation and keep momentum.",
      icon: BookOpen,
    },
    {
      id: 12,
      title: "Cross-Campus Consistency",
      desc: "The same intelligence and identity, running consistently across multiple buildings, departments, or campuses.",
      icon: Layers,
    },
  ];

  /* 30 More Ways Deckoviz Fits Your Campus Data */
  const campusWays = [
    { title: "Immersive visualisation of historical or scientific events for large lecture courses", category: "Lecture & STEM" },
    { title: "Philosophy and humanities seminars built around live, reshaping thought experiments", category: "Humanities & Seminar" },
    { title: "Language department immersion rooms for advanced language study", category: "Humanities & Seminar" },
    { title: "Architecture and design studio critique spaces with generated concept visuals", category: "Design & Studio" },
    { title: "Business school pitch and case study practice with realistic scenario generation", category: "Professional Schools" },
    { title: "Medical and life sciences visualisation of complex biological processes", category: "Medical & Life Sciences" },
    { title: "Engineering and physics visualisation of systems too complex to sketch by hand", category: "Lecture & STEM" },
    { title: "Debate and moot court practice with an AI opponent that never repeats an argument", category: "Professional Schools" },
    { title: "Music and fine arts departments, generative accompaniment and creative collaboration", category: "Humanities & Seminar" },
    { title: "Film and media studies storyboarding and visual concept development", category: "Design & Studio" },
    { title: "Data science and statistics visualisation for complex, multi-variable datasets", category: "Lecture & STEM" },
    { title: "Graduate research group presentation and defense preparation support", category: "Graduate & Research" },
    { title: "Undergraduate research symposium visual support", category: "Graduate & Research" },
    { title: "Career fair and recruiting event dynamic signage and company spotlights", category: "Student Life & Career" },
    { title: "Study abroad and international programs, immersive destination storytelling", category: "Campus & Admissions" },
    { title: "First-generation student support, patient, judgment-free academic guidance", category: "Student Success" },
    { title: "International student orientation and cultural adjustment support", category: "Student Success" },
    { title: "Residence hall common area ambiance and community-building displays", category: "Student Life & Career" },
    { title: "Student union and campus center dynamic event and club promotion", category: "Campus & Admissions" },
    { title: "Athletics department game-day energy and achievement walls", category: "Campus & Admissions" },
    { title: "Greek life and student organisation legacy and recruitment displays", category: "Student Life & Career" },
    { title: "Library research assistance and digital collection visualisation", category: "Graduate & Research" },
    { title: "Academic advising session support with visual degree-planning tools", category: "Student Success" },
    { title: "Mental health and wellness resource awareness campaigns, tastefully delivered", category: "Student Success" },
    { title: "Entrepreneurship and startup incubator pitch development support", category: "Professional Schools" },
    { title: "Alumni relations and fundraising event storytelling", category: "Campus & Admissions" },
    { title: "Multi-campus and satellite campus identity consistency", category: "Campus & Admissions" },
    { title: "Commencement and graduation ceremony visual storytelling", category: "Campus & Admissions" },
    { title: "Faculty research showcase and department open house support", category: "Graduate & Research" },
    { title: "New student orientation, delivered as an immersive, memorable welcome", category: "Campus & Admissions" },
  ];

  const campusCategories = ["All", "Lecture & STEM", "Humanities & Seminar", "Professional Schools", "Graduate & Research", "Student Success", "Campus & Admissions"];

  const filteredCampusWays = campusWays.filter((way) => {
    const matchesSearch = way.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (campusWaysCategory === "All") return matchesSearch;
    return matchesSearch && way.category === campusWaysCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Scroll Indicator Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 z-[150] origin-left shadow-sm"
        style={{ scaleX }}
      />

      {/* Dynamic Interactive Effects */}
      <CursorSpotlight />
      <DynamicTealParticles count={40} />
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
          1. HERO SECTION (LIGHT THEME LUXURY GRADIENT & PULSE CTA)
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div variants={fadeUp} custom={0}>
            <SectionEyebrow icon={GraduationCap} text="DECKOVIZ FOR HIGHER EDUCATION" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-8"
          >
            The Living Learning Portal for Universities:{" "}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Bring Curiosity, Depth, Delight, and Immersion
            </span>{" "}
            to Every Class.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 font-normal leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            A living, thinking, adaptive platform for immersive and interactive teaching, research, learning, and a full campus life, present from the lecture hall to the dorm room, growing sharper with every student it serves.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-60 blur-md group-hover:opacity-90 transition duration-500 group-hover:duration-200 animate-pulse" />
              <button
                onClick={() => setDemoModalOpen(true)}
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

            <Link
              to="/schools-general-info"
              className="px-9 py-4 rounded-full font-bold text-base bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100/80 hover:scale-105 transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-teal-700" />
              <span>Full Features Catalogue</span>
            </Link>
          </motion.div>

          {/* Quick Sub-navigation */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex items-center justify-center gap-3 flex-wrap mt-8"
          >
            {[
              { label: "Full Features Catalogue", icon: BookOpen, path: "/schools-general-info" },
              { label: "Deckoviz for Schools", icon: GraduationCap, path: "/deckoviz-for-schools" },
              { label: "Sponsorship Program", icon: Building2, path: "/sponsorship" },
            ].map((link) => {
              const IconComp = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-teal-300 hover:bg-teal-50/70 hover:text-teal-900 transition-all duration-300"
                >
                  <IconComp className="w-3.5 h-3.5 text-teal-600" />
                  <span>{link.label}</span>
                  <span className="text-xs opacity-70 transition-transform duration-300 group-hover:translate-x-1">➔</span>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. SHORT INTRO (ORGANIC LIGHT STREAM WITH GLOWING BULB)
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
            Deckoviz for Higher Education brings a generative, multimodal display and Vizzy, an AI that assists in teaching, research, and support, into every corner of campus life: lecture halls, labs, libraries, residence halls, and the walls that carry your institution&apos;s own educational philosophy. It&apos;s the first platform built for the full complexity of university life, not a classroom tool stretched to fit a bigger campus.
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. LONGER INTRO (ANIMATED DEEP-DIVE STAGGER)
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="bg-gradient-to-b from-slate-50 to-teal-50/40 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg space-y-8 text-slate-700 text-lg sm:text-xl leading-relaxed">
          <SectionEyebrow icon={Globe} text="LONGER INTRO" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-l-2 border-slate-300 pl-6"
          >
            A university isn&apos;t one learning environment. It&apos;s dozens, running at once. A first-year lecture hall. A graduate research lab. A late-night study session in a dorm. A career fair in the student union. A prospective student touring campus for the first time. Most technology built for education picks one of these and ignores the rest.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-900 font-semibold text-xl sm:text-2xl border-l-4 border-teal-600 pl-6 py-2 bg-white/70 rounded-r-xl shadow-sm"
          >
            Deckoviz doesn&apos;t. It&apos;s built around a simple recognition: campus life is where research, learning, identity, and community all happen in the same buildings, often the same week, sometimes the same day.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-l-2 border-slate-300 pl-6"
          >
            Picture a lecture that renders a live visualisation the moment a student asks an unexpected question. A research group turning months of data into a single, striking visual for a defense or a conference. A first-generation student getting genuine, patient support at 1am, from a companion that already knows their coursework, their goals, and where they&apos;ve struggled. A campus tour that finally shows prospective students what studying here will actually feel like, not just a brochure promise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative pt-6 border-t border-teal-200 text-teal-900 font-semibold text-lg sm:text-xl leading-relaxed"
          >
            That&apos;s what Deckoviz for Higher Education is. This isn’t merely a smart, generative display for your lecture halls. It is a comprehensive platform for research, teaching, student life, institutional identity, a multimodal experience, a teaching and research assistant, and a personalised companion for every student, working together across your entire campus.
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
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: 6 }}
            className="relative pl-6 sm:pl-8 group transition-all"
          >
            <div className="absolute -left-[31px] sm:-left-[55px] top-0 w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-125 transition-transform">
              01
            </div>
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-teal-300 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                1. Multimodal Generation, For Every Discipline
              </h3>
              <p className="text-base font-semibold text-teal-700 mb-4">
                From lecture halls to labs, create and display anything a subject needs.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-3xl">
                Complex theories, data visualisations, case studies, historical scenes, scientific models, generated live and displayed with the scale and polish a university lecture deserves. No static slide deck built months ago can keep pace with where a real seminar discussion actually goes.
              </p>
              <div className="space-y-3">
                {[
                  "Real-time visual generation across every discipline, STEM, humanities, arts, and professional schools alike",
                  "Full multimodal range: image, video, sound, narration, data visualisation",
                  "Built for lecture halls, seminar rooms, and labs alike, not just a single classroom format",
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: 6 }}
            className="relative pl-6 sm:pl-8 group transition-all"
          >
            <div className="absolute -left-[31px] sm:-left-[55px] top-0 w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-125 transition-transform">
              02
            </div>
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-teal-300 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                2. The Student&apos;s Companion, Through Every Year
              </h3>
              <p className="text-base font-semibold text-teal-700 mb-4">
                Through an entire degree, and the transition beyond it.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-3xl">
                University students face a different kind of complexity than younger learners, heavier academic load, less structure, more independence, and real stakes attached to how well they manage all of it. Every student gets their own Vizzy, built for exactly that.
              </p>
              <div className="space-y-3">
                {[
                  "A single companion that carries context across semesters, majors, and years",
                  "Understands course load, deadlines, and academic goals, not just individual assignments",
                  "Supports genuine independence, helping students build their own systems, not depending on constant hand-holding",
                  "Supports multidimensional, multimodal, adaptive learning",
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: 6 }}
            className="relative pl-6 sm:pl-8 group transition-all"
          >
            <div className="absolute -left-[31px] sm:-left-[55px] top-0 w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-125 transition-transform">
              03
            </div>
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-teal-300 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                3. The Faculty & TA Assistant
              </h3>
              <p className="text-base font-semibold text-teal-700 mb-4">
                Real support for lectures, research, and grading, without replacing academic judgment.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-3xl">
                Vizzy generates lecture visuals, research aids, and supporting material in real time, and assists teaching assistants running sections, office hours, and grading support, all while leaving pedagogy and academic rigor exactly where they belong, with faculty.
              </p>
              <div className="space-y-3">
                {[
                  "Live-generated lecture visuals and supporting material, on demand",
                  "Research visualisation support for faculty and graduate students alike",
                  "TA support for sections, review sessions, and office hours",
                  "Assists in personalized, higher dimensional testing and evaluation for each student",
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pillar 4 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: 6 }}
            className="relative pl-6 sm:pl-8 group transition-all"
          >
            <div className="absolute -left-[31px] sm:-left-[55px] top-0 w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:scale-125 transition-transform">
              04
            </div>
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-teal-300 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                4. Campus Life, Research & Unique Experiences
              </h3>
              <p className="text-base font-semibold text-teal-700 mb-4">
                Capabilities no lecture hall or student union wall could offer before.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-3xl">
                From immersive research visualisation to genuinely useful career exploration to a student union wall that finally reflects the life of the students who pass through it, Deckoviz already includes dozens of experiences built specifically for higher education, and we add new ones every week.
              </p>
              <div className="space-y-3">
                {[
                  "Research visualisation: turning complex data and findings into presentation-ready visuals",
                  "Career & professional development: pitch practice, interview prep, career exploration",
                  "Campus identity: legacy walls, event boards, wayfinding, admissions storytelling",
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
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
          {[
            {
              title: "Smart Research & Course Library",
              desc: "lecture materials, research visuals, and reference content, stored and instantly retrievable across a student's entire degree",
              icon: BookOpen,
            },
            {
              title: "Thesis & Dissertation Visualisation Support",
              desc: "turning research findings into clear, presentation-grade visuals for defenses and publications",
              icon: Microscope,
            },
            {
              title: "Interactive, Multimodal Assessment Suite",
              desc: "AI-supported review sessions and practice assessments, calibrated to course level, with faculty oversight throughout",
              icon: FileText,
            },
            {
              title: "Academic Progress & Workload Mapping",
              desc: "a living picture of course load, deadlines, and academic standing, not just a transcript",
              icon: Clock,
            },
            {
              title: "Group & Cohort Study Tools",
              desc: "Vizzy-facilitated study sessions for study groups, lab teams, and project cohorts",
              icon: Users,
            },
            {
              title: "Reflective Check-Ins",
              desc: "an adaptive space for students to process academic stress, workload, and transition, never a static wellness app",
              icon: ShieldCheck,
            },
            {
              title: "Faculty & Student Dashboards",
              desc: "one home for schedules, materials, research, and Vizzy, always accessible",
              icon: Layers,
            },
            {
              title: "Career Readiness Tracker",
              desc: "session-by-session continuity across interview prep, pitch practice, and career exploration",
              icon: Target,
            },
          ].map((item, index) => {
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
          {coreUseCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.id}
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
          7. 30 MORE WAYS DECKOVIZ FITS YOUR CAMPUS
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow icon={Building2} text="30 MORE WAYS DECKOVIZ FITS YOUR CAMPUS" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            30 More Ways Deckoviz Fits Your Campus
          </h2>

          {/* Search Input & Category Pills */}
          <div className="mt-8 space-y-4 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />
              <input
                type="text"
                placeholder="Search 30 campus implementations..."
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

            <div className="flex flex-wrap justify-center gap-2">
              {campusCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCampusWaysCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    campusWaysCategory === cat
                      ? "bg-teal-600 text-white font-bold shadow-md shadow-teal-600/30"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-teal-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Tag Stream */}
        <motion.div layout className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          <AnimatePresence>
            {filteredCampusWays.length > 0 ? (
              filteredCampusWays.map((way) => (
                <motion.div
                  key={way.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="px-4 py-2.5 rounded-full bg-white border border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-xs text-slate-800 shadow-sm transition-all flex items-center gap-2 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  <span>{way.title}</span>
                </motion.div>
              ))
            ) : (
              <div className="py-8 text-slate-500 text-sm">
                No matching implementations found for &quot;{searchQuery}&quot;.
              </div>
            )}
          </AnimatePresence>
        </motion.div>
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
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-slate-200 pb-3">
              Primary Institutional Benefits
            </h3>
            {[
              {
                title: "Stronger Admissions & Enrollment Conversion",
                desc: "an open day and campus tour experience prospective students actually remember",
              },
              {
                title: "Elevated Institutional Prestige",
                desc: "a campus that feels genuinely at the forefront, not just well-equipped",
              },
              {
                title: "Deeper Student Engagement & Retention",
                desc: "visual, immersive learning and genuine academic support that improves outcomes and reduces attrition",
              },
              {
                title: "Significant Faculty & TA Time Saved",
                desc: "hours of prep and support work handed back every week",
              },
              {
                title: "Stronger Research Output & Presentation Quality",
                desc: "data and findings turned into genuinely compelling visual material",
              },
              {
                title: "Consistent Campus-Wide Identity",
                desc: "one platform, running consistently across every building and department",
              },
            ].map((benefit, i) => (
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
            {[
              "Faster, campus-wide communication with zero printing delay",
              "A meaningful competitive edge in an increasingly crowded higher-ed market",
              "Organic word of mouth from students, faculty, and visiting families",
              "Stronger career outcomes data institutions can point to in recruiting",
              "Richer, longitudinal insight into student academic wellbeing for student affairs teams",
            ].map((text, idx) => (
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
          9. VIZZY FOR HIGHER EDUCATION (INTERACTIVE CANVAS SWITCHER)
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow icon={Brain} text="VIZZY FOR HIGHER EDUCATION" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            Vizzy for Higher Education
          </h2>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-200/80 border border-slate-300 mt-8 shadow-inner">
            <button
              onClick={() => setVizzyActiveTab("student")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all relative ${
                vizzyActiveTab === "student" ? "text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {vizzyActiveTab === "student" && (
                <motion.div
                  layoutId="vizzyTabLight"
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">For Every Student</span>
            </button>

            <button
              onClick={() => setVizzyActiveTab("faculty")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all relative ${
                vizzyActiveTab === "faculty" ? "text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {vizzyActiveTab === "faculty" && (
                <motion.div
                  layoutId="vizzyTabLight"
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">For Faculty & TAs</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {vizzyActiveTab === "student" ? (
            <motion.div
              key="student"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-teal-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-5"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Every Student Gets Their Own Vizzy.</h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
                A genuinely personal academic companion, not a generic chatbot, present from orientation week to commencement, and beyond, growing sharper and more attuned with every semester.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Tracks course load, deadlines, and goals across an entire degree, not just one class",
                  "Adapts to how each student learns best, and to the specific demands of their major",
                  "Supports genuine independence and self-management, the core skill university is meant to build",
                  "A steady, non-judgmental presence during the hardest stretches of a degree",
                  "Continues to matter well past graduation, career support doesn't end at commencement",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-teal-800 font-bold text-base pt-2 border-t border-slate-100">
                This is the difference between an app a student downloads and forgets, and a companion that&apos;s actually there for the whole degree.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="faculty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-teal-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-5"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Every Faculty Member & TA Gets Support, Too.</h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
                An assistant built around how this specific course, lab, or section actually runs, not a generic tool shared campus-wide.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Deep context on a course's material, pace, and pedagogical approach",
                  "Generates lecture visuals and research support material in real time",
                  "Supports TAs running sections, review sessions, and office hours",
                  "Learns what's worked in past semesters, and gets sharper with every one that follows",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-teal-800 font-bold text-base pt-2 border-t border-slate-100">
                One companion for every student. Real support for every instructor. A campus that finally feels like it&apos;s keeping pace with the people in it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          10. THE FUTURE OF HIGHER EDUCATION, ARRIVING NOW
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 text-left sm:text-center space-y-8">
        <SectionEyebrow icon={Compass} text="THE FUTURE OF HIGHER EDUCATION, ARRIVING NOW" />
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          The Future of Higher Education, Arriving Now
        </h2>
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-lg space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
          <p>
            Today&apos;s students have grown up with technology that adapts to them instantly, in every other part of their lives. Then they walk into a 100-person lecture hall built for an entirely different era.
          </p>
          <p>
            That gap is exactly what&apos;s driving enrollment pressure, retention challenges, and a growing sense that higher education needs to prove its value in a way it never had to before. Institutions that make this shift now are building genuinely AI-native graduates, students who leave prepared to work and thrive alongside AI as a matter of course.
          </p>
          <p className="font-bold text-teal-800 text-xl border-t border-slate-100 pt-4">
            This is what a modern university is supposed to feel like. Not a bigger, better-funded version of the traditional lecture hall but a fundamentally new kind of academic infrastructure, one that gets more valuable, more personal, and more essential to your institution with every cohort it serves.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          11. CLOSING & CTA
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 text-center">
        <div className="bg-gradient-to-b from-teal-50/60 via-white to-teal-50/40 border border-teal-200 rounded-3xl p-8 sm:p-14 shadow-xl space-y-8 max-w-4xl mx-auto">
          <SectionEyebrow icon={GraduationCap} text="CLOSING" />

          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            <p>
              Deckoviz for Higher Education is a comprehensive platform, four core pillars, dozens of growing experiences, and companions for every student and instructor, working together to make research sharper, teaching stronger, and campus life genuinely worth being part of.
            </p>
            <p className="font-bold text-teal-900 text-xl">
              The institutions that bring this in now won&apos;t just teach differently - they&apos;ll feel like they belong to the world their students are actually building their futures in.
            </p>
          </div>

          <div className="border-t border-teal-200 pt-10">
            <h3 className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-2">BRING YOUR CAMPUS TO LIFE</h3>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Bring Your Campus to Life.</p>
            <p className="text-base text-slate-600 max-w-2xl mx-auto mb-10">
              See what a university looks like when research, teaching, and student life finally run on the same intelligent platform.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-60 blur-md group-hover:opacity-90 transition duration-500 animate-pulse" />
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="relative px-9 py-4 rounded-full font-bold text-base bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white shadow-xl shadow-teal-600/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-teal-200" />
                  <span>Book a Demo</span>
                </button>
              </div>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="px-9 py-4 rounded-full font-bold text-base bg-white border border-teal-300 text-teal-800 hover:bg-teal-50 hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
              >
                <Users className="w-5 h-5 text-teal-700" />
                <span>Talk to Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          12. DEMO MODAL
         ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDemoModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl z-10 overflow-hidden text-slate-900"
            >
              <button
                onClick={() => setDemoModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-2 rounded-full bg-slate-100 border border-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-700 mx-auto animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Demo Request Received!</h3>
                  <p className="text-sm text-slate-600">
                    Our Higher Education team will reach out within 24 hours to schedule a personalized demo for your university.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <SectionEyebrow icon={GraduationCap} text="UNIVERSITY DEMO REQUEST" />
                    <h3 className="text-2xl font-bold text-slate-900">Book a Demo for Your University</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      See what a university looks like when research, teaching, and student life run on the same platform.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional Email</label>
                        <input
                          type="email"
                          required
                          placeholder="e.vance@university.edu"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Position</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                        >
                          <option value="Faculty">Faculty Member / Professor</option>
                          <option value="Dean">Dean / Department Chair</option>
                          <option value="IT">CIO / IT Leadership</option>
                          <option value="StudentAffairs">Student Affairs / Residence</option>
                          <option value="Student">Student Leader / Researcher</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">University / Institution Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Stanford University / Oxford / MIT"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Notes</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your campus goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white shadow-lg shadow-teal-600/25 hover:scale-[1.01] transition-all mt-4"
                    >
                      Submit Demo Request
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
