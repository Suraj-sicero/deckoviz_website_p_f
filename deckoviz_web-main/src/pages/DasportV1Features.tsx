"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Home, Building2, GraduationCap, Bot, Layers, Compass, Music, Zap, Calendar,
  Palette, Gamepad2, Library, Mic, Brain, Tv, Flame, Volume2, ShieldCheck,
  Users, Sparkles, ChevronDown, ArrowLeft, ArrowRight, BookOpen, Eye, Star,
  MessageSquare, Globe, Headphones, Target, Lightbulb, PenTool, BarChart3,
  Clock, Award, Heart, Play, Image, Video, Type, Wand2, Layout, Monitor
} from "lucide-react"

/* ═══════════════════════════════════════════════════════════════
   DATA — HOMES
   ═══════════════════════════════════════════════════════════════ */

interface FeatureCard {
  title: string
  badge: string
  description: string
  icon: React.ReactNode
}

const homesCompactFeatures: FeatureCard[] = [
  {
    title: "Vizzy Generative Companion (VGC)",
    badge: "60+ Subagents & Capabilities",
    description: "60+ subagents, personas & capabilities: Personal Artist, Poster Creator, Curator, Ambiance/Vibe Setter, Story Buddy, Journal Buddy, Visual Chat Companion, Muse, and more",
    icon: <Bot className="w-6 h-6 text-[#2563EB]" />,
  },
  {
    title: "20+ Distinct Modes",
    badge: "Experience Modes",
    description: "Including Focus Mode, Calm & Reset Mode, Celebration Mode, Story Time Mode, Ritual Mode, Meditation & Visualisation Mode, Creative Muse Mode, and Family Memory Mode",
    icon: <Layers className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Get Curations Now",
    badge: "On-Demand",
    description: "On-demand personalised curation, art, photos, collections, music, posters",
    icon: <Compass className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Background Music & Soundscapes",
    badge: "Audio Moodscape",
    description: "Sets mood and atmosphere across the home",
    icon: <Music className="w-6 h-6 text-cyan-600" />,
  },
  {
    title: "Proactive Creation & Display",
    badge: "Autonomous AI",
    description: "Vizzy initiates experiences, doesn't just respond",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
  },
  {
    title: "Rituals & Scheduling",
    badge: "Automated Routines",
    description: "Recurring, automated experiences tied to time, mood, occasion",
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "55+ Conversational Canvas Modes",
    badge: "55+ Modes",
    description: "Chat-driven creative and experiential modes",
    icon: <Palette className="w-6 h-6 text-pink-600" />,
  },
  {
    title: "16+ Flagship Social & Creative Games",
    badge: "Interactive Gaming",
    description: "Flagship social and creative games",
    icon: <Gamepad2 className="w-6 h-6 text-violet-600" />,
  },
  {
    title: "12+ Flagship Dynamic, Live Art Modes",
    badge: "Live Generative Art",
    description: "Flagship dynamic, live art modes",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Smart Access Library",
    badge: "Instant Search",
    description: "Personal + global libraries, instantly searchable",
    icon: <Library className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Voice Mode",
    badge: "Hands-Free Control",
    description: "Full creation, curation, and display access hands-free",
    icon: <Mic className="w-6 h-6 text-emerald-600" />,
  },
  {
    title: "Vizzy Home Companion AI",
    badge: "Lifetime Intelligence",
    description: "Learns and grows with the household across years/decades; understands moods, preferences, lifestyle, goals, hopes; proactively creates experiences",
    icon: <Brain className="w-6 h-6 text-blue-700" />,
  },
  {
    title: "Google TV Built-In",
    badge: "Smart Entertainment",
    description: "Full smart TV functionality alongside the generative platform",
    icon: <Tv className="w-6 h-6 text-[#2563EB]" />,
  },
]

/* ═══════════════════════════════════════════════════════════════
   DATA — ENTERPRISES
   ═══════════════════════════════════════════════════════════════ */

const enterprisesCompactFeatures: FeatureCard[] = [
  {
    title: "Vizzy CMED Mode",
    badge: "30+ Business Subagents",
    description: "Chief Marketing, Experience & Design companion: smart, proactive, learning; full generative power across 30+ business-focused subagents, multimodal generation, collaborative & iterative creation, brand-attuned",
    icon: <Bot className="w-6 h-6 text-[#2563EB]" />,
  },
  {
    title: "20+ Distinct Modes",
    badge: "Business Modes",
    description: "Including Lunch Energy Mode, Dinner Intimacy Mode, Guest Arrival Mode, Celebration & Occasion Mode, Seasonal Campaign Mode, Brainstorm Mode, Meeting/Focus Mode, and Ambient Brand Mode",
    icon: <Layers className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Guest Management",
    badge: "Smart Recognition",
    description: "Recognises returning guests, remembers preferences, personalises experiences automatically",
    icon: <Users className="w-6 h-6 text-violet-600" />,
  },
  {
    title: "Get Curations Now",
    badge: "On-Demand",
    description: "On-demand branded content, art, and campaign material",
    icon: <Compass className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Background Music & Soundscapes",
    badge: "Audio Moodscape",
    description: "Sets mood and atmosphere across your space",
    icon: <Music className="w-6 h-6 text-cyan-600" />,
  },
  {
    title: "Proactive Creation & Display",
    badge: "Autonomous AI",
    description: "Vizzy generates and pushes content without being asked",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
  },
  {
    title: "Rituals & Scheduling",
    badge: "Automated Routines",
    description: "Recurring branded experiences, tied to time, occasion, or event",
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "12+ Flagship Dynamic Art Modes",
    badge: "Live Generative Art",
    description: "Vivid, living branded visuals",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Smart Access Library",
    badge: "Instant Search",
    description: "Brand + global library, instantly searchable",
    icon: <Library className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Voice Mode",
    badge: "Hands-Free Control",
    description: "Full hands-free creation, curation, and display",
    icon: <Mic className="w-6 h-6 text-emerald-600" />,
  },
  {
    title: "Google TV Built-In",
    badge: "Smart Entertainment",
    description: "Full smart TV functionality alongside the generative platform",
    icon: <Tv className="w-6 h-6 text-[#2563EB]" />,
  },
]

/* ═══════════════════════════════════════════════════════════════
   DATA — SCHOOLS (COMPACT)
   ═══════════════════════════════════════════════════════════════ */

const schoolsCompactFeatures: FeatureCard[] = [
  {
    title: "Vizzy Generative Platform",
    badge: "Purpose-Built for Classrooms",
    description: "Full multimodal generation, curation, and display, purpose-built for classrooms",
    icon: <Bot className="w-6 h-6 text-[#2563EB]" />,
  },
  {
    title: "Teacher's Assistant Mode",
    badge: "Live & Proactive",
    description: "Live, proactive, generates lesson materials in real time",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Student Learning Companion Mode",
    badge: "Lifetime Companion",
    description: "Personalised, grows with the student throughout their entire schooling years, and beyond, at home",
    icon: <GraduationCap className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Life Skills Curriculum",
    badge: "51+ Courses",
    description: "51+ structured courses covering emotional intelligence, creativity, financial literacy, critical thinking, and dozens more",
    icon: <Heart className="w-6 h-6 text-pink-600" />,
  },
  {
    title: "Test Modes",
    badge: "AI-Guided Evaluations",
    description: "Personalised, interactive, AI-guided evaluations",
    icon: <Target className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Learning-Focused Games",
    badge: "Classroom Gaming",
    description: "Educational, engaging, built for the classroom",
    icon: <Gamepad2 className="w-6 h-6 text-violet-600" />,
  },
  {
    title: "Get Curations Now",
    badge: "On-Demand",
    description: "Instant lesson visuals, posters, and learning material",
    icon: <Compass className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Background Music & Soundscapes",
    badge: "Classroom Atmosphere",
    description: "Focus, calm, and classroom atmosphere on demand",
    icon: <Music className="w-6 h-6 text-cyan-600" />,
  },
  {
    title: "Proactive Creation & Display",
    badge: "Autonomous AI",
    description: "Vizzy generates supporting material without being asked",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
  },
  {
    title: "Rituals & Scheduling",
    badge: "Automated Routines",
    description: "Recurring classroom routines, from morning check-ins to daily reflection",
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "12+ Flagship Dynamic Art Modes",
    badge: "Live Generative Art",
    description: "Vivid, living visuals for lessons and learning spaces",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Smart Access Library",
    badge: "Instant Search",
    description: "Personal, class, and global library",
    icon: <Library className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Voice Mode",
    badge: "Hands-Free Control",
    description: "Hands-free access for teachers and students alike",
    icon: <Mic className="w-6 h-6 text-emerald-600" />,
  },
  {
    title: "Google TV Built-In",
    badge: "School Controls",
    description: "Smart learning apps and video-based learning, with school-level controls",
    icon: <Tv className="w-6 h-6 text-[#2563EB]" />,
  },
]

/* ═══════════════════════════════════════════════════════════════
   DATA — SCHOOLS FEATURE CATALOGUE (Tables)
   ═══════════════════════════════════════════════════════════════ */

interface CatalogueEntry {
  name: string
  description: string
}

interface CatalogueCategory {
  id: string
  numeral: string
  title: string
  subtitle: string
  icon: React.ReactNode
  entries: CatalogueEntry[]
}

const schoolsCatalogue: CatalogueCategory[] = [
  {
    id: "teachers-assistant",
    numeral: "I",
    title: "Vizzy — Ultimate Teacher's Assistant",
    subtitle: "Tens of sub-tools, agents, and personas supporting every part of a teacher's day.",
    icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
    entries: [
      { name: "Live Lesson Support", description: "Present during class, generating visuals and material on the teacher's cue, in real time." },
      { name: "Lesson Prep Assistant", description: "Builds lesson visuals, slides, and materials ahead of class, tailored to the teacher's style and pace." },
      { name: "Materials Creator", description: "Generates worksheets, diagrams, handouts, and visual aids on demand, in any subject." },
      { name: "Grading & Feedback Support", description: "Assists with review and feedback on student work, teacher remains in full control of final grading." },
      { name: "Substitute Bridge Mode", description: "Runs a coherent backup lesson independently if a class is left without coverage." },
      { name: "Parent-Teacher Conference Prep", description: "Assembles visual summaries of student progress ahead of meetings." },
      { name: "Curriculum Pacing Assistant", description: "Tracks where a class is against the curriculum and flags upcoming topics worth prepping for." },
      { name: "Class Analytics Companion", description: "Surfaces patterns in engagement, pace, and comprehension across a class." },
      { name: "Teacher Personalization Engine", description: "Learns and adapts to each teacher's individual style, pacing, and preferences over time, growing more useful every term." },
    ],
  },
  {
    id: "student-companion",
    numeral: "II",
    title: "Vizzy — Ultimate Student Learning Companion",
    subtitle: "Tens of sub-tools, agents, and personas, each a different way of learning with Vizzy.",
    icon: <GraduationCap className="w-5 h-5 text-teal-600" />,
    entries: [
      { name: "Socratic Tutor", description: "Guides students toward answers through questions rather than direct delivery, building genuine reasoning skills." },
      { name: "Personalized Explainer", description: "Adapts explanations to how each student specifically learns — visual, story-driven, hands-on, or logical." },
      { name: "Homework Companion", description: "Patient, judgment-free support for independent work, without simply supplying answers." },
      { name: "Exam Prep Coach", description: "Focused review sessions with adaptive recall practice ahead of tests." },
      { name: "Motivation & Confidence Coach", description: "Builds intrinsic motivation and celebrates effort, not just correct answers." },
      { name: "Student Deep Personalization Engine", description: "A single companion that learns and grows with a student across their entire schooling journey, deepening every year." },
    ],
  },
  {
    id: "session-types",
    numeral: "III",
    title: "Structured Session Types",
    subtitle: "The core session formats Vizzy runs in a classroom setting.",
    icon: <Layout className="w-5 h-5 text-blue-600" />,
    entries: [
      { name: "Interactive & Multimodal Learning Session", description: "A live, teacher-led lesson where Vizzy generates images, video, narration, and posters in real time, sent straight to the frame." },
      { name: "Teacher's Live Assistant Session", description: "Vizzy present with its own avatar during class, responding to teacher cues and generating support material instantly." },
      { name: "Group Learning Session", description: "Small-group sessions (2–10 students) where Vizzy facilitates collaborative learning and balances participation." },
      { name: "Daily Study Journal Session", description: "A short, adaptive daily reflection on what was learned, what was hard, and what stood out — evolving with the student over time." },
      { name: "Creative Companion — Create Anything", description: "One-on-one creative collaboration — poetry, music, stories, art, scripts, even week-long projects — with Vizzy as coach." },
      { name: "Creative Companion & Coach — Whole Class Mode", description: "The same creative coaching, run for an entire class or shared project." },
      { name: "Evaluation & Mapping Session", description: "Personalised, AI-guided testing calibrated to the student, teacher-configured feedback timing, and detailed end-of-test analysis." },
    ],
  },
  {
    id: "immersive-modes",
    numeral: "IV",
    title: "Immersive & Multimodal Learning Modes",
    subtitle: "Turning the classroom itself into a responsive, generative environment.",
    icon: <Eye className="w-5 h-5 text-purple-600" />,
    entries: [
      { name: "Art Class Mode", description: "A live creative companion for art class, co-creating and helping students bring ideas to life visually." },
      { name: "Music Class Mode", description: "Music appreciation and composition, paired with generated visual accompaniment." },
      { name: "Creative Class Mode", description: "A dedicated space for storytelling, writing, and mixed creative disciplines." },
      { name: "Narrations Mode", description: "Narrated, immersive audio-visual storytelling for any subject or story." },
      { name: "Storytelling Mode", description: "Turns lessons and books into visual, unfolding narrative experiences." },
      { name: "Immersive Walls Mode", description: "Intelligent classroom walls that adapt their entire visual identity to the subject — history, physics, English, or language class — rendered live." },
      { name: "Avatar Mode", description: "Vizzy appears as a chosen on-screen avatar for live teaching, narration, and storytelling — a genuine presence in the room." },
      { name: "Language Learning Mode", description: "Full immersion sessions conducted in the target language, reinforced with matching visuals." },
      { name: "Immersive Time & Place Journeys", description: "First-person immersive experiences into another era or setting, for history, literature, and beyond." },
      { name: "Speak With Historical Figures", description: "Interactive, in-character conversations with historical figures for deeper, more memorable learning." },
      { name: "Speak With a Book", description: "Conversational exploration of a text's characters, themes, and ideas — directly with the material itself." },
    ],
  },
  {
    id: "life-skills",
    numeral: "V",
    title: "Life Skills & Enrichment",
    subtitle: "Structured courses and enrichment delivered live and personalised.",
    icon: <Heart className="w-5 h-5 text-pink-600" />,
    entries: [
      { name: "Life Skills Curriculum (51+ Courses)", description: "Structured courses across emotional intelligence, creativity, critical thinking, communication, and practical life skills — delivered live and personalised. New courses added every month." },
      { name: "Session Progress Tracking", description: "Remembers exactly where a class or student left off in any course, resuming naturally." },
      { name: "Teacher Involvement Modes", description: "Vizzy-Led, Co-Designed, or Teacher-Led options for every Life Skills session." },
    ],
  },
  {
    id: "testing-study",
    numeral: "VI",
    title: "Testing, Study Planning & Materials",
    subtitle: "Personalised evaluation and study tools powered by AI.",
    icon: <Target className="w-5 h-5 text-red-500" />,
    entries: [
      { name: "Interactive Test Creation", description: "Personalised, AI-generated assessments across any subject, calibrated to student level." },
      { name: "Personalized Study Plan Creation", description: "Vizzy builds a study plan tailored to a student's goals, pace, and current strengths and gaps." },
      { name: "Multimodal Study Material Creation", description: "Generates study guides, visual aids, and practice material combining text, image, and audio." },
      { name: "Strength & Weakness Mapping", description: "A living, evolving picture of student progress across subjects, not a single test score." },
    ],
  },
  {
    id: "games-spaces",
    numeral: "VII",
    title: "Learning Games & Student Spaces",
    subtitle: "Interactive games and personal learning environments.",
    icon: <Gamepad2 className="w-5 h-5 text-violet-600" />,
    entries: [
      { name: "Learning Games Modes", description: "A growing library of educational games built specifically for classroom use." },
      { name: "Student Learning Space", description: "A personalised digital home base for each student's materials, progress, and companion." },
    ],
  },
  {
    id: "infrastructure",
    numeral: "VIII",
    title: "Infrastructure & Access",
    subtitle: "The backbone that powers every classroom experience.",
    icon: <Monitor className="w-5 h-5 text-slate-600" />,
    entries: [
      { name: "Smart Access Library", description: "Every lesson, material, and piece of student work stored and instantly retrievable, spanning personal, classroom, and global content." },
      { name: "Background Music & Soundscapes", description: "Ambient sound tuned for focus, calm transitions, or energised group work." },
      { name: "Rituals & Scheduling", description: "Recurring classroom routines — morning check-ins, reflection journals, weekly Life Skills sessions — run automatically." },
      { name: "Proactive Generation", description: "Vizzy anticipates lesson needs and offers relevant visuals and materials without being asked." },
      { name: "Voice Mode", description: "Full creation, curation, and display access by voice, for teachers and students alike." },
      { name: "Google TV Integration, With School Controls", description: "Access to smart learning apps and video-based learning, configured with school-appropriate controls from the start." },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════
   TABS CONFIG
   ═══════════════════════════════════════════════════════════════ */

type Segment = "homes" | "enterprises" | "schools"

const tabs: { id: Segment; label: string; emoji: string; icon: React.ReactNode }[] = [
  { id: "homes", label: "For Homes", emoji: "🏠", icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: "enterprises", label: "For Enterprises", emoji: "🏢", icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { id: "schools", label: "For Schools", emoji: "🎓", icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" /> },
]

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/** Reusable feature card grid */
function CompactGrid({ features }: { features: FeatureCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {features.map((item, i) => (
        <div
          key={i}
          className="group/card relative p-5 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_16px_40px_rgba(37,99,235,0.14)] hover:border-blue-200/60 hover:-translate-y-1 transition-all duration-400 flex flex-col"
        >
          {/* Top edge reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 pointer-events-none rounded-t-2xl" />

          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 group-hover/card:bg-blue-100 flex items-center justify-center transition-colors duration-300">
              {item.icon}
            </div>
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50/90 text-[#2563EB] border border-blue-100/80 leading-none">
              {item.badge}
            </span>
          </div>

          <h4 className="text-[15px] sm:text-base font-bold text-gray-900 mb-1.5 group-hover/card:text-[#2563EB] transition-colors duration-300 leading-snug">
            {item.title}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed flex-grow">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}

/** Long-form prose section heading */
function ProseHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xl sm:text-2xl lg:text-[1.7rem] font-bold text-gray-900 mt-10 mb-3 leading-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {children}
    </h3>
  )
}

/** Long-form prose paragraph */
function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] sm:text-base text-gray-700 leading-[1.8] mb-5">{children}</p>
}

/** Section label badge */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(37,99,235,0.10)] text-[10px] sm:text-xs font-bold text-indigo-900 uppercase tracking-widest mb-6">
      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
      <span>{children}</span>
    </div>
  )
}

/** Divider line */
function Divider() {
  return <div className="my-10 sm:my-14 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
}

/** Schools accordion category */
function CatalogueAccordion({ category, isOpen, onToggle }: { category: CatalogueCategory; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-400 overflow-hidden ${
        isOpen
          ? "bg-white/65 backdrop-blur-2xl border-blue-200/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_16px_40px_rgba(37,99,235,0.10)]"
          : "bg-white/40 backdrop-blur-xl border-white/70 hover:bg-white/55 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_6px_16px_rgba(0,0,0,0.03)]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 sm:px-7 py-4 sm:py-5 text-left flex items-center justify-between gap-3 focus:outline-none cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-white shadow-sm flex items-center justify-center shrink-0">
            {category.icon}
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-0.5">
              {category.numeral}
            </span>
            <h4 className="text-sm sm:text-lg font-bold text-gray-900 leading-snug truncate">
              {category.title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-xs text-gray-500 font-medium">
            {category.entries.length} features
          </span>
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-400 ${
              isOpen
                ? "bg-gradient-to-r from-indigo-900 to-blue-600 text-white rotate-180 shadow-md"
                : "bg-white/70 text-gray-600"
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-7 pb-5 sm:pb-7 pt-1 border-t border-gray-200/40 animate-fadeIn">
          <p className="text-xs sm:text-sm text-gray-600 italic mb-4">{category.subtitle}</p>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200/60 bg-white/70 backdrop-blur-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200/60 bg-gradient-to-r from-indigo-50/60 to-blue-50/60">
                  <th className="px-4 sm:px-5 py-3 text-xs font-bold text-indigo-900 uppercase tracking-wider w-[30%] sm:w-[28%]">Feature</th>
                  <th className="px-4 sm:px-5 py-3 text-xs font-bold text-indigo-900 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                {category.entries.map((entry, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-100/60 last:border-b-0 hover:bg-blue-50/30 transition-colors duration-200 ${
                      i % 2 === 0 ? "bg-white/40" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-4 sm:px-5 py-3 sm:py-3.5 font-semibold text-gray-900 text-[13px] sm:text-sm align-top leading-snug">
                      {entry.name}
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-gray-600 text-[13px] sm:text-sm leading-relaxed">
                      {entry.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LONG-FORM CONTENT — HOMES
   ═══════════════════════════════════════════════════════════════ */

function HomesLongForm() {
  return (
    <div className="max-w-4xl">
      <ProseHeading>Vizzy, Your Home's Generative Companion</ProseHeading>
      <Prose>
        At the center of everything is VGC, the Vizzy Generative Companion, a single, unified AI that quietly holds more than 60 major subagents, personas, and capabilities behind one simple conversation. Talk to Vizzy the way you'd talk to someone who genuinely knows your home, and it becomes whatever the moment needs.
      </Prose>
      <Prose>
        Ask, and Vizzy becomes your Personal Artist and Poster Creator, generating original artwork or a striking poster in seconds, in any style you describe. It's a Style Transfer engine, reimagining your own photos in iconic artistic styles, and a Dream Visualiser, turning a half-remembered dream into something you can actually see. Upload a photo of your room and it becomes a Colour Palette Matcher, generating art tuned precisely to your space. It's your Mood Board, Vision Board, Affirmations Board, and Goals Board Creator, turning intention into something visual you'll actually look at every day, and your Daily and Weekly To-Do Poster Creator, keeping the everyday a little more beautiful. Ask for a poster of a favourite film, quote, poem, or song, and it appears, styled and ready. It's a Narration Creator and Audiobook Creator, a guide for Interactive Visualisation and Interactive Meditation, and a genuine creative partner for Sketch Enhancement, turning a rough doodle into a detailed artwork, or animating that same sketch into video. It becomes a Story Sequence Generator, a Real-Time Story Visualiser narrating as it renders, a tool to turn journal entries into Artwork From Journal, and a way to Visualise Poems and Books as full visual journeys. It composes original music, builds Generative Abstract Art that shifts with time and mood, creates montages and short videos from a prompt, and even designs custom AI Clock Faces. And this is genuinely a fraction of what's inside — twenty, thirty of the most-loved capabilities, all reachable through one conversation with Vizzy.
      </Prose>

      {/* VGC loved capabilities pill list */}
      <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-blue-50/40 border border-indigo-100/50">
        <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">Among the 20-30 most loved</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Personal Artist", "Poster Creator", "Style Transfer", "Dream Visualiser",
            "Photo-Based Style Transfer", "Colour Palette Matcher", "Mood Board Creator",
            "Vision Board Creator", "Affirmations Board Creator", "Goals Board Creator",
            "To-Do List Poster Creator", "Quote & Lyric Poster Creator", "Movie Poster Creator",
            "Narration Creator", "Audiobook Creator", "Interactive Visualiser",
            "Interactive Meditation Guide", "Sketch Enhancer", "Sketch-to-Video Animator",
            "Story Sequence Generator", "Real-Time Story Visualiser", "Journal-to-Artwork Creator",
            "Poem & Book Visualiser", "Music Composer", "Generative Abstract Art Creator",
            "Montage Creator", "AI Clock Face Designer", "and lots more"
          ].map((cap, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-white/80 border border-indigo-100/60 text-xs sm:text-[13px] font-medium text-indigo-900 shadow-sm">
              {cap}
            </span>
          ))}
        </div>
      </div>

      <ProseHeading>20+ Modes, Each Its Own World</ProseHeading>
      <Prose>
        Deckoviz doesn't collapse everything into one generic chat. It's organised into more than twenty distinct modes, each built around its own tools and rhythm. Step into Focus Mode for deep, quiet concentration. Shift into Calm & Reset Mode after a hard day. Light up Celebration Mode for a birthday or milestone. Settle into Story Time Mode for a child's bedtime. Let Ritual Mode run your recurring home rhythms automatically. Sink into Meditation & Visualisation Mode for stillness. Open up Creative Muse Mode when you're stuck on an idea. Or drift through Family Memory Mode, reliving old photos reimagined as art. Every mode feels purpose-built, because it is.
      </Prose>

      <ProseHeading>Get Curations Now</ProseHeading>
      <Prose>
        Whenever you want something new on your walls, one tap brings you a fresh, personalised curation — art, photos, collections, music, and posters — assembled by Vizzy specifically for you, in that moment.
      </Prose>

      <ProseHeading>Background Music & Soundscapes</ProseHeading>
      <Prose>
        Sound is part of the canvas. Deckoviz can layer in background music and ambient soundscapes that elevate your home's atmosphere, setting the state of a room as deliberately as its visuals.
      </Prose>

      <ProseHeading>Vizzy, Proactive by Design</ProseHeading>
      <Prose>
        Vizzy doesn't wait to be asked. It initiates, creates, and displays experiences on its own, learning the rhythms of your home well enough to know when a moment calls for something new — before you've thought to request it.
      </Prose>

      <ProseHeading>Rituals & Scheduling</ProseHeading>
      <Prose>
        Build recurring, automated experiences into your home's rhythm — a calming visual every evening, a celebratory moment every birthday, a specific mood for Sunday mornings — all scheduled and running quietly in the background.
      </Prose>

      <ProseHeading>55+ Conversational Canvas Modes</ProseHeading>
      <Prose>
        More than fifty-five distinct conversational experiences live inside the platform, each a different way of creating, exploring, or simply talking with Vizzy through the canvas itself.
      </Prose>

      <ProseHeading>16+ Flagship Creative & Social Games</ProseHeading>
      <Prose>
        A growing suite of original, generative games built for the whole household — creative, social, and genuinely fun — turning the frame into something the family gathers around, not just looks at.
      </Prose>

      <ProseHeading>12+ Flagship Dynamic Art Modes</ProseHeading>
      <Prose>
        Stunning, living art that moves, evolves, and breathes — twelve-plus flagship modes showcasing just how vivid and alive generative art on your wall can actually be.
      </Prose>

      <ProseHeading>Smart Access Library</ProseHeading>
      <Prose>
        Every piece of art, every photo, every collection — personal and from Deckoviz's global library — lives in one smart, instantly searchable library, always at your fingertips.
      </Prose>

      <ProseHeading>Voice Mode, Fully Multimodal</ProseHeading>
      <Prose>
        Everything — creation, curation, display — is fully accessible by voice. Just ask, and Vizzy handles the rest.
      </Prose>

      <ProseHeading>Vizzy: Your Home's Emotional Intelligence & Creative OS</ProseHeading>
      <Prose>
        This is the meta-feature underlying everything else. Vizzy is your home's companion AI, learning and growing with you and your family, not for a season, but across years and decades. It becomes increasingly attuned to your moods, your states, your preferences, your desires, your lifestyle, your goals, your hopes — even your beliefs — and it uses that understanding to create experiences for your space that feel less like software and more like something genuinely thoughtful. This is your home's emotionally intelligent companion, and its creative operating system, all in one.
      </Prose>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LONG-FORM CONTENT — ENTERPRISES
   ═══════════════════════════════════════════════════════════════ */

function EnterprisesLongForm() {
  return (
    <div className="max-w-4xl">
      <ProseHeading>Vizzy CMED: Your Chief Marketing, Experience & Design Companion</ProseHeading>
      <Prose>
        At the center of the enterprise platform is CMED — smart, proactive, and constantly learning your brand. It carries the same generative depth found across Deckoviz — dozens of specialised subagents, full multimodal generation, collaborative and iterative creation — but every output is attuned specifically to your business, your voice, your offerings, and your customers.
      </Prose>
      <Prose>
        Ask, and CMED becomes your Poster Creator for sales, specials, products, and dishes, and your Seasonal & Occasion Poster Creator for the days and campaigns that matter most. It's a Product or Dish Video Creator and Visual Creator, turning a quick phone photo into something worthy of a campaign. It's your Custom Business Artwork Creator, generating restaurant-themed, location-themed, brand-themed, history-themed, and legacy-themed pieces for your walls. It becomes a Guest Keepsake Creator, producing a personalised memento a customer actually wants to keep, and a Narration-Based Experience Creator, layering story into any moment. It's a Content Creator, Marketing Manager, and Copywriter all at once, a QR Code Creator for seamless guest interaction, and a Menu and Offerings Poster Creator that updates instantly — no reprinting required. It generates Short Videos telling the story behind a dish or product, tracks guest preferences as a Guest Memory Engine, visualises your Loyalty Story as something worth showing off, and plans entire Campaigns from a single conversation. And this is only a portion of what's inside — twenty, thirty of the most valuable capabilities, all run through one conversation with your CMED.
      </Prose>

      {/* CMED capabilities pill list */}
      <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-blue-50/40 border border-indigo-100/50">
        <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">Among the 20-30 most valuable</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Sales & Specials Poster Creator", "Seasonal & Occasion Poster Creator",
            "Product/Dish Video Creator", "Product/Dish Visual Creator",
            "Custom Business Artwork Creator", "Location-Themed Art Creator",
            "Brand-Themed Art Creator", "Legacy & History Art Creator",
            "Guest Keepsake Creator", "Narration-Based Experience Creator",
            "Content Creator", "Marketing Manager", "Copywriter", "QR Code Creator",
            "Menu & Offerings Poster Creator", "Short Video Creator",
            "Guest Memory Engine", "Loyalty Story Visualiser", "Campaign Planner",
            "Ambiance & Mood Setter", "Brand Storytelling Engine", "and lots more"
          ].map((cap, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-white/80 border border-indigo-100/60 text-xs sm:text-[13px] font-medium text-indigo-900 shadow-sm">
              {cap}
            </span>
          ))}
        </div>
      </div>

      <ProseHeading>20+ Modes, Each Built for a Different Moment</ProseHeading>
      <Prose>
        The enterprise platform runs on more than twenty distinct modes, each tuned to a different part of your business's day. Shift naturally from Lunch Energy Mode into Dinner Intimacy Mode as the day turns to evening. Welcome every guest with Guest Arrival Mode. Light up Celebration & Occasion Mode for birthdays, anniversaries, and private events. Launch Seasonal Campaign Mode the moment a new season or promotion begins. Open Brainstorm Mode when your team needs fresh ideas fast. Set the room with Meeting/Focus Mode for offices and boardrooms. Or let Ambient Brand Mode run quietly in the background, keeping your space feeling considered at all times.
      </Prose>

      <ProseHeading>Guest Management, Built In</ProseHeading>
      <Prose>
        Vizzy remembers. Returning guests are recognised, their preferences quietly recalled, and their experience personalised automatically — the small details that make a business feel like it genuinely knows the people who walk through its doors.
      </Prose>

      <ProseHeading>Get Curations Now</ProseHeading>
      <Prose>
        Fresh, on-demand branded content, campaign material, seasonal art, and promotional visuals — generated instantly and ready to display — no waiting on a creative team's calendar.
      </Prose>

      <ProseHeading>Background Music & Soundscapes</ProseHeading>
      <Prose>
        Sound shapes a space as much as visuals do. Layer in background music and ambient soundscapes that elevate atmosphere and reinforce mood — from a bustling lunch service to a quiet evening lounge.
      </Prose>

      <ProseHeading>Proactive by Design</ProseHeading>
      <Prose>
        Just as at home, Vizzy doesn't wait to be asked. It notices opportunities — an upcoming season, a quiet Tuesday worth a promotion, a returning guest worth a personal touch — and creates and displays content proactively, in real time.
      </Prose>

      <ProseHeading>Rituals & Scheduling</ProseHeading>
      <Prose>
        Recurring branded experiences — tied to service times, seasons, or events — run automatically once set, keeping your space feeling considered every single day without manual upkeep.
      </Prose>

      <ProseHeading>12+ Flagship Dynamic Art Modes</ProseHeading>
      <Prose>
        The same stunning, living, vivid art available at home — reimagined for business spaces — elevating ambiance, branding, and guest experience simultaneously.
      </Prose>

      <ProseHeading>Smart Access Library & Full Voice Access</ProseHeading>
      <Prose>
        Every asset — brand-specific and from the global library — lives in one searchable system, and every part of it — creation, curation, and display — is fully accessible by voice for your team.
      </Prose>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LONG-FORM CONTENT — SCHOOLS
   ═══════════════════════════════════════════════════════════════ */

function SchoolsLongForm() {
  return (
    <div className="max-w-4xl">
      <ProseHeading>The Teacher's Assistant</ProseHeading>
      <Prose>
        Vizzy shows up in the classroom as a live, proactive assistant — generating lesson visuals and materials in real time, on a teacher's cue, and learning that teacher's own style and pace well enough to become genuinely useful, not just responsive.
      </Prose>

      <ProseHeading>The Student's Learning Companion, For Life</ProseHeading>
      <Prose>
        Every student gets their own Vizzy — one that doesn't reset at the end of a term or a school year. It grows with a student across their entire schooling journey, and its relationship with them doesn't have to end at the school gate either — the same companion can continue supporting a student's learning at home.
      </Prose>

      <ProseHeading>51+ Life Skills Courses</ProseHeading>
      <Prose>
        A growing curriculum of structured courses covering emotional intelligence, creativity, financial literacy, critical thinking, and dozens more — delivered live, personalised, and immersive — skills most schools have never had the capacity to teach well until now.
      </Prose>

      <ProseHeading>Personalised, Interactive Test Modes</ProseHeading>
      <Prose>
        AI-guided evaluations, calibrated to each student's level, run with the teacher present and in control — ending in a detailed, genuinely useful analysis rather than a single score.
      </Prose>

      <ProseHeading>Learning-Focused Games</ProseHeading>
      <Prose>
        Educational games built specifically for the classroom — turning practice and review into something students actually want to engage with.
      </Prose>

      <ProseHeading>Get Curations Now</ProseHeading>
      <Prose>
        Instant lesson visuals, posters, and learning material — drawn from a smart library and generated on the spot — ready the moment a lesson calls for them.
      </Prose>

      <ProseHeading>Background Music & Soundscapes</ProseHeading>
      <Prose>
        Ambient sound tuned for the classroom — focus-supporting soundscapes for independent work, calming tones for transitions, energising atmosphere for group activities.
      </Prose>

      <ProseHeading>Proactive by Design</ProseHeading>
      <Prose>
        Vizzy doesn't wait to be told what a lesson needs. It anticipates, offering relevant visuals and material as a class discussion naturally unfolds.
      </Prose>

      <ProseHeading>Rituals & Scheduling</ProseHeading>
      <Prose>
        Recurring classroom routines — a morning check-in, a daily reflection journal, a weekly life skills session — run automatically once set, becoming a dependable part of the school day.
      </Prose>

      <ProseHeading>12+ Flagship Dynamic Art Modes</ProseHeading>
      <Prose>
        Vivid, living visuals that bring lessons and learning spaces alike to life — the same flagship art technology behind Deckoviz's most striking home and enterprise experiences — reimagined for learning.
      </Prose>

      <ProseHeading>Smart Access Library</ProseHeading>
      <Prose>
        Every lesson, material, and piece of student work lives in one searchable library — spanning personal, classroom, and global content — always ready to retrieve or reuse.
      </Prose>

      <ProseHeading>Voice Mode, Fully Multimodal</ProseHeading>
      <Prose>
        Everything — creation, curation, and display — is fully accessible by voice, for teachers and students alike.
      </Prose>

      <ProseHeading>Google TV Built-In, With School Controls</ProseHeading>
      <Prose>
        Full access to smart learning apps and video-based learning through platforms like YouTube — configured from the start with school-appropriate controls in place.
      </Prose>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function DasportV1Features() {
  const [activeTab, setActiveTab] = useState<Segment>("homes")
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(["teachers-assistant"]))

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      />

      <section
        className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.18)" }} />
          <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.16)" }} />
          <div className="absolute top-[50%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.12)" }} />
          <div className="absolute top-[60%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.14)" }} />
          <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.10)" }} />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

          {/* ─── BACK LINK ─── */}
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-[#2563EB] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Pricing
          </Link>

          {/* ─── PAGE HEADER ─── */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/15 border border-blue-300/30 text-xs font-bold text-indigo-900 uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              Revised • Fully Standalone
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-gray-900">Deckoviz Portal V1</span>{" "}
              <span className="italic bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
                Core Feature Set
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Everything that ships inside your Deckoviz Portal — for homes, enterprises, and schools — in one place.
            </p>
          </div>

          {/* ─── SEGMENT TABS ─── */}
          <div className="flex justify-center mb-10 sm:mb-14">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(37,99,235,0.10)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white shadow-lg shadow-blue-600/20"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════
              HOMES TAB
              ════════════════════════════════════════════════ */}
          {activeTab === "homes" && (
            <div className="animate-fadeIn">
              {/* Compact section */}
              <SectionBadge>🏠 Sales Quick Reference — Compact</SectionBadge>

              <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-100/50 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Deckoviz DASPort V1</strong> is designed from the ground up as a complete standalone home generative companion & portal. Below is the quick-reference feature matrix included in your experience.
                </p>
              </div>

              <CompactGrid features={homesCompactFeatures} />

              <Divider />

              {/* Long-form section */}
              <SectionBadge>Website / Long-Form Version</SectionBadge>
              <HomesLongForm />
            </div>
          )}

          {/* ════════════════════════════════════════════════
              ENTERPRISES TAB
              ════════════════════════════════════════════════ */}
          {activeTab === "enterprises" && (
            <div className="animate-fadeIn">
              {/* Compact section */}
              <SectionBadge>🏢 Sales Quick Reference — Compact</SectionBadge>

              <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-100/50 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Deckoviz Enterprise Platform</strong> brings the full generative power of Vizzy to your business — every output attuned to your brand, your voice, and your customers.
                </p>
              </div>

              <CompactGrid features={enterprisesCompactFeatures} />

              <Divider />

              {/* Long-form section */}
              <SectionBadge>Website / Long-Form Version</SectionBadge>
              <EnterprisesLongForm />
            </div>
          )}

          {/* ════════════════════════════════════════════════
              SCHOOLS TAB
              ════════════════════════════════════════════════ */}
          {activeTab === "schools" && (
            <div className="animate-fadeIn">
              {/* Compact section */}
              <SectionBadge>🎓 Sales Quick Reference — Compact</SectionBadge>

              <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-100/50 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Deckoviz for Schools</strong> — full multimodal generation, curation, and display, purpose-built for classrooms, with a dedicated learning companion for every student and assistant for every teacher.
                </p>
              </div>

              <CompactGrid features={schoolsCompactFeatures} />

              <Divider />

              {/* Long-form section */}
              <SectionBadge>Website / Long-Form Version</SectionBadge>
              <SchoolsLongForm />

              <Divider />

              {/* Feature Catalogue */}
              <SectionBadge>Complete Feature Catalogue</SectionBadge>

              <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/60 to-teal-50/40 border border-indigo-100/50 flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  Organized for both internal reference and the school-facing feature doc. Grouped by category, each with a name and a brief description. <strong className="text-gray-900">More being added every month.</strong>
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {schoolsCatalogue.map((cat) => (
                  <CatalogueAccordion
                    key={cat.id}
                    category={cat}
                    isOpen={openCategories.has(cat.id)}
                    onToggle={() => toggleCategory(cat.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ─── FOOTER CTA ─── */}
          <div className="mt-14 sm:mt-20 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_16px_50px_rgba(37,99,235,0.12)]">
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Ready to bring this to your space?
                </h3>
                <p className="text-sm text-gray-600">Experience everything above, from day one.</p>
              </div>
              <Link
                to="/place-order"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#182A4A] to-[#2563EB] hover:from-[#13223B] hover:to-[#1D4ED8] text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Get DASPort Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}</style>
    </>
  )
}
