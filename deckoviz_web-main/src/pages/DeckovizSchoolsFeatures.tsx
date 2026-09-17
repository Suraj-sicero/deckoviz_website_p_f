"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import {
  GraduationCap, BookOpen, Bot, Heart, Target, Gamepad2, Compass, Music, Zap,
  Calendar, Flame, Library, Mic, Tv, ChevronDown, CheckCircle2,
  ArrowLeft, ArrowRight, Sparkles, Layers, ShieldCheck, Award, Users,
  Brain, Layout, Smile, Palette, Wand2, Clock, Globe, PenTool
} from "lucide-react"

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface FeatureCard {
  title: string
  badge: string
  description: string
  icon: React.ReactNode
}

interface LifeSkillsCourse {
  title: string
  duration: string
  description: string
  whyDeckoviz: string
}

interface LifeSkillsTrack {
  id: string
  number: number
  title: string
  icon: React.ReactNode
  badge: string
  summary: string
  courses: LifeSkillsCourse[]
}

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

/* ═══════════════════════════════════════════════════════════════
   1. HIGH-LEVEL COMPACT FEATURES DATA
   ═══════════════════════════════════════════════════════════════ */

const schoolsCompactFeatures: FeatureCard[] = [
  {
    title: "Vizzy Generative Platform",
    badge: "Purpose-Built for Classrooms",
    description: "Full multimodal generation, curation, and display, purpose-built for interactive learning environments",
    icon: <Bot className="w-6 h-6 text-[#2563EB]" />,
  },
  {
    title: "Teacher's Assistant Mode",
    badge: "Live & Proactive",
    description: "Generates lesson materials, visual aids, quiz ideas, and contextual diagrams in real time",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Student Learning Companion Mode",
    badge: "Lifetime Companion",
    description: "Personalised learning companion that grows with the student throughout school years and beyond at home",
    icon: <GraduationCap className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Life Skills Curriculum",
    badge: "51+ Courses",
    description: "51+ structured courses covering emotional intelligence, creativity, financial literacy, critical thinking, and civic awareness",
    icon: <Heart className="w-6 h-6 text-pink-600" />,
  },
  {
    title: "Test & Evaluation Modes",
    badge: "AI-Guided Evaluations",
    description: "Personalised, interactive, non-stressful AI-guided evaluations tailored to individual mastery levels",
    icon: <Target className="w-6 h-6 text-red-500" />,
  },
  {
    title: "Learning-Focused Games",
    badge: "Classroom Gaming",
    description: "Educational, highly engaging multiplayer and solo social-learning experiences built for classrooms",
    icon: <Gamepad2 className="w-6 h-6 text-violet-600" />,
  },
  {
    title: "Get Curations Now",
    badge: "On-Demand Visuals",
    description: "Instant lesson visuals, infographics, historic re-creations, and posters on any subject",
    icon: <Compass className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Background Music & Soundscapes",
    badge: "Classroom Atmosphere",
    description: "Binaural focus audio, calm ambient soundscapes, and activity atmospheres on demand",
    icon: <Music className="w-6 h-6 text-cyan-600" />,
  },
  {
    title: "Proactive Creation & Display",
    badge: "Autonomous AI",
    description: "Vizzy anticipates lesson topics and generates contextual supporting material without needing prompting",
    icon: <Zap className="w-6 h-6 text-amber-500" />,
  },
  {
    title: "Rituals & Scheduling",
    badge: "Automated Routines",
    description: "Automate recurring classroom routines, from morning check-ins and brain breaks to daily reflections",
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "12+ Dynamic Live Art Modes",
    badge: "Living Wall Art",
    description: "Vivid, living generative visuals that transform classrooms into immersive subject-matter environments",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Smart Access Library",
    badge: "Instant Search",
    description: "Curated personal, class, and school-wide asset library, instantly searchable by tags or concepts",
    icon: <Library className="w-6 h-6 text-teal-600" />,
  },
  {
    title: "Voice Mode",
    badge: "Hands-Free Control",
    description: "Natural hands-free voice interactions for teachers while presenting or walking around the room",
    icon: <Mic className="w-6 h-6 text-emerald-600" />,
  },
  {
    title: "Google TV Built-In",
    badge: "School-Grade Control",
    description: "Full smart learning app suite with institutional security, remote management, and parental/school controls",
    icon: <Tv className="w-6 h-6 text-[#2563EB]" />,
  },
]

/* ═══════════════════════════════════════════════════════════════
   2. LIFE SKILLS CURRICULUM DATA (7 TRACKS / 43 COURSES)
   ═══════════════════════════════════════════════════════════════ */

const lifeSkillsTracks: LifeSkillsTrack[] = [
  {
    id: "track-1",
    number: 1,
    title: "Emotional Intelligence & Mental Well-Being",
    badge: "6 Courses",
    icon: <Smile className="w-6 h-6 text-pink-500" />,
    summary: "Build self-awareness, emotional regulation, resilience, and empathy using interactive visual scenarios and reflection tools.",
    courses: [
      {
        title: "Course 1: Introduction to Emotional Awareness",
        duration: "15–20 mins / session",
        description: "Helps students identify, name, and understand their emotions. Covers the basic emotion wheel, physical sensations tied to feelings, and simple reflection techniques.",
        whyDeckoviz: "Vizzy generates dynamic visual representations of emotions (e.g. calm blue waves vs stormy red clouds) and guides interactive mood check-ins on screen."
      },
      {
        title: "Course 2: Managing Stress and Anxiety",
        duration: "15–20 mins / session",
        description: "Teaches practical tools to recognize stress triggers, practice calming breathing exercises, and reframe anxious thoughts before tests or presentations.",
        whyDeckoviz: "Displays immersive calming soundscapes, bio-feedback inspired visualizations, and guided breathing cues right on the classroom wall display."
      },
      {
        title: "Course 3: Building Resilience & Coping Strategies",
        duration: "20 mins / session",
        description: "Focuses on growth mindset, learning from mistakes, and building healthy coping mechanisms when facing academic or personal setbacks.",
        whyDeckoviz: "Vizzy tells interactive stories where characters navigate failure and success, allowing students to vote on choices and reflect on outcomes."
      },
      {
        title: "Course 4: Developing Empathy & Compassion",
        duration: "15–20 mins / session",
        description: "Explores perspective-taking, active listening, and understanding others' feelings across diverse situations and backgrounds.",
        whyDeckoviz: "Creates visual scenarios and role-play prompts on screen where students analyze facial expressions, body language, and context clues."
      },
      {
        title: "Course 5: Self-Regulated Mindfulness",
        duration: "10–15 mins / session",
        description: "Short daily or weekly mindfulness practices to improve focus, grounding, and self-control during busy school routines.",
        whyDeckoviz: "Provides automatic scheduled ambient visualizers paired with soft background music to transform classroom energy in seconds."
      },
      {
        title: "Course 6: Positive Self-Talk and Self-Esteem",
        duration: "15 mins / session",
        description: "Guides students to identify negative self-talk, reframe inner dialogues, and celebrate personal progress and unique strengths.",
        whyDeckoviz: "Generates daily personalized affirmation artwork and interactive gratitude walls for students to contribute to."
      }
    ]
  },
  {
    id: "track-2",
    number: 2,
    title: "Creativity, Art & Self-Expression",
    badge: "6 Courses",
    icon: <Palette className="w-6 h-6 text-purple-500" />,
    summary: "Unlock artistic confidence, creative writing, design thinking, and multimedia storytelling through generative co-creation.",
    courses: [
      {
        title: "Course 7: Visual Storytelling & Digital Art",
        duration: "20–30 mins / session",
        description: "Teaches visual composition, color theory, prompt crafting, and narrative framing using generative art tools.",
        whyDeckoviz: "Students input creative ideas and watch Vizzy generate high-resolution illustrations, comic panels, and digital gallery pieces live on display."
      },
      {
        title: "Course 8: Generative Creative Writing",
        duration: "20 mins / session",
        description: "Fosters poetry, short story creation, and character development using collaborative prompts and AI co-writing tools.",
        whyDeckoviz: "Vizzy acts as a non-judgmental co-writer, suggesting story branches, vivid adjectives, and illustrating scene descriptions in real time."
      },
      {
        title: "Course 9: Music Appreciation & Ambient Soundscapes",
        duration: "15–20 mins / session",
        description: "Explores musical genres, instruments, acoustic moods, and how sound influences human emotion and productivity.",
        whyDeckoviz: "Allows students to composite custom soundscapes by blending nature sounds, classical harmonies, and ambient synth layers."
      },
      {
        title: "Course 10: Design Thinking and Ideation",
        duration: "25–30 mins / session",
        description: "Introduces the 5-stage design thinking framework: Empathize, Define, Ideate, Prototype, and Test through real-world challenges.",
        whyDeckoviz: "Serves as an interactive digital whiteboard that clusters student ideas, generates quick prototype concepts, and displays solution boards."
      },
      {
        title: "Course 11: Cultural Art History Exploration",
        duration: "20 mins / session",
        description: "A virtual gallery tour through historical art movements—from Renaissance frescoes to modern digital movement art.",
        whyDeckoviz: "Renders ultra-high-definition masterpieces with interactive zoom, style-blending modes, and contextual historical audio narratives."
      },
      {
        title: "Course 12: Personal Portfolio & Gallery Building",
        duration: "30 mins / session",
        description: "Teaches students how to curate, document, and present their creative work in structured digital portfolios.",
        whyDeckoviz: "Offers dedicated student portfolio galleries accessible directly on the DASPort wall canvas or mobile web views."
      }
    ]
  },
  {
    id: "track-3",
    number: 3,
    title: "Critical Thinking, Logic & Decision-Making",
    badge: "4 Courses",
    icon: <Brain className="w-6 h-6 text-blue-500" />,
    summary: "Empower students with analytical reasoning, media literacy, ethical AI understanding, and structured problem-solving skills.",
    courses: [
      {
        title: "Course 13: Problem-Solving with AI",
        duration: "20–25 mins / session",
        description: "Teaches how to break complex problems into smaller components, formulate hypothesis tests, and leverage AI responsibly.",
        whyDeckoviz: "Vizzy presents interactive branching puzzles where students test logic trees and analyze step-by-step problem breakdowns."
      },
      {
        title: "Course 14: Media Literacy & Information Evaluation",
        duration: "20 mins / session",
        description: "Trains students to evaluate sources, spot deepfakes or misinformation, recognize cognitive biases, and verify facts online.",
        whyDeckoviz: "Presents real vs generated media challenges and guides students through systematic source-verification checklists."
      },
      {
        title: "Course 15: Ethical Decision-Making & AI Ethics",
        duration: "20–25 mins / session",
        description: "Explores ethical dilemmas around privacy, data, fairness, environment, and automated decision-making systems.",
        whyDeckoviz: "Runs interactive debate scenarios on screen where students vote on ethics cases and see instant group consensus breakdowns."
      },
      {
        title: "Course 16: Logical Reasoning & Puzzle Solving",
        duration: "15–20 mins / session",
        description: "Engages students in deductive logic, pattern recognition, spatial puzzles, and riddle solving to boost cognitive agility.",
        whyDeckoviz: "Displays dynamic logic puzzles that adapt in difficulty based on class responses and team solving speed."
      }
    ]
  },
  {
    id: "track-4",
    number: 4,
    title: "Communication, Collaboration & Relationships",
    badge: "5 Courses",
    icon: <Users className="w-6 h-6 text-teal-500" />,
    summary: "Cultivate public speaking, active listening, conflict resolution, digital etiquette, and group team dynamics.",
    courses: [
      {
        title: "Course 17: Effective Public Speaking & Presentation",
        duration: "20–25 mins / session",
        description: "Covers voice modulation, body language, slide-free visual storytelling, and structuring persuasive arguments.",
        whyDeckoviz: "Acts as a live presentation backdrop—generating dynamic, auto-advancing visual slides responsive to the speaker's voice."
      },
      {
        title: "Course 18: Active Listening & Empathetic Communication",
        duration: "15–20 mins / session",
        description: "Focuses on listening without interrupting, paraphrasing speaker points, asking clarifying questions, and validating emotions.",
        whyDeckoviz: "Provides conversational practice modes where Vizzy simulates diverse dialogue scenarios for paired student exercises."
      },
      {
        title: "Course 19: Conflict Resolution & Mediation",
        duration: "20 mins / session",
        description: "Teaches win-win negotiation techniques, identifying root needs vs positions, and de-escalating interpersonal disputes.",
        whyDeckoviz: "Displays interactive scenario trees showing outcomes of aggressive, passive, and collaborative responses."
      },
      {
        title: "Course 20: Team Collaboration & Group Dynamics",
        duration: "25–30 mins / session",
        description: "Explores team roles (leader, recorder, timekeeper, presenter), group ideation, compromise, and peer appreciation.",
        whyDeckoviz: "Facilitates live group brainstorming sessions with multi-user input and real-time canvas synthesis."
      },
      {
        title: "Course 21: Digital Etiquette & Responsible Online Presence",
        duration: "15–20 mins / session",
        description: "Covers cyberbullying prevention, digital footprint awareness, respectful online discourse, and protecting personal data.",
        whyDeckoviz: "Renders illustrative case studies highlighting digital permanence and constructive online engagement."
      }
    ]
  },
  {
    id: "track-5",
    number: 5,
    title: "Practical Life Skills & Financial Literacy",
    badge: "9 Courses",
    icon: <Award className="w-6 h-6 text-amber-500" />,
    summary: "Prepare students for adulthood with money management, time organization, health wellness, civics, and career planning.",
    courses: [
      {
        title: "Course 22: Basic Financial Literacy & Money Management",
        duration: "20 mins / session",
        description: "Introduces budgeting, saving, understanding interest, distinguishing needs vs wants, and basic banking concepts.",
        whyDeckoviz: "Runs interactive budget simulations where students manage virtual allowances across living scenario choices."
      },
      {
        title: "Course 23: Time Management & Goal Setting",
        duration: "15–20 mins / session",
        description: "Teaches task prioritization (Eisenhower Matrix), SMART goal setting, homework scheduling, and overcoming procrastination.",
        whyDeckoviz: "Offers visual schedule planners and countdown timers designed specifically for group study or focus blocks."
      },
      {
        title: "Course 24: Health, Nutrition & Personal Wellness",
        duration: "15–20 mins / session",
        description: "Explores balanced nutrition, sleep hygiene, physical movement, hydration, and maintaining physical energy.",
        whyDeckoviz: "Renders interactive nutrition visualizers, meal builder games, and movement break prompts on the wall display."
      },
      {
        title: "Course 25: Basic First Aid & Safety Awareness",
        duration: "15–20 mins / session",
        description: "Covers essential emergency protocols, basic first aid steps, fire safety, emergency contacts, and personal protection.",
        whyDeckoviz: "Provides step-by-step interactive emergency simulation flowcharts and clear animated safety procedures."
      },
      {
        title: "Course 26: Career Exploration & Future Planning",
        duration: "25–30 mins / session",
        description: "Introduces diverse career fields, skills required for future industries, resume basics, and passion mapping.",
        whyDeckoviz: "Vizzy generates interactive career path visualizations, day-in-the-life profiles, and required skills roadmaps."
      },
      {
        title: "Course 27: Environmental Sustainability & Eco-Habits",
        duration: "20 mins / session",
        description: "Teaches waste reduction, energy conservation, carbon footprints, circular economy, and community green initiatives.",
        whyDeckoviz: "Visualizes local climate impacts, ecosystem connections, and tracks classroom sustainability challenges."
      },
      {
        title: "Course 28: Digital Organization & Productivity Tools",
        duration: "15–20 mins / session",
        description: "Guides file management, folder structures, email etiquette, cloud storage navigation, and digital desktop hygiene.",
        whyDeckoviz: "Displays interactive clean-desk walkthroughs and organizing framework diagrams for school devices."
      },
      {
        title: "Course 29: Everyday Problem-Solving & Home Skills",
        duration: "20 mins / session",
        description: "Covers basic practical skills like reading manual instructions, troubleshooting household tools, and basic maintenance.",
        whyDeckoviz: "Provides interactive diagnostic flowcharts that guide students through step-by-step practical fixes."
      },
      {
        title: "Course 30: Understanding Rights, Responsibilities & Civics",
        duration: "20–25 mins / session",
        description: "Explores community governance, voting basics, civic duties, human rights, and active community volunteering.",
        whyDeckoviz: "Renders historical governance models, interactive town hall simulations, and community impact trees."
      }
    ]
  },
  {
    id: "track-6",
    number: 6,
    title: "World, Culture & Global Citizenship",
    badge: "6 Courses",
    icon: <Globe className="w-6 h-6 text-emerald-500" />,
    summary: "Expand student horizons through geography, cultural traditions, living history timelines, and global ecological awareness.",
    courses: [
      {
        title: "Course 31: Global Cultures & Traditions",
        duration: "20 mins / session",
        description: "Explores festivals, art, attire, cuisines, and social customs across continents to foster global respect.",
        whyDeckoviz: "Generates rich 360-degree cultural visual showcases, festival atmospheres, and traditional ambient music."
      },
      {
        title: "Course 32: World Geography & Living Ecosystems",
        duration: "20 mins / session",
        description: "Examines biomes, mountain ranges, river systems, climate zones, and animal habitats around Earth.",
        whyDeckoviz: "Displays interactive living world maps with real-time weather simulations and wildlife habit layers."
      },
      {
        title: "Course 33: World Religions & Philosophy Basics",
        duration: "20 mins / session",
        description: "An objective, respectful overview of major world philosophies, ethics systems, and foundational wisdom traditions.",
        whyDeckoviz: "Provides visual timeline connections showing shared ethical principles and historical roots across cultures."
      },
      {
        title: "Course 34: Language & Linguistic Curiosity",
        duration: "15–20 mins / session",
        description: "Introduces language families, common phrases, etymology, and how language shapes perception.",
        whyDeckoviz: "Vizzy speaks and displays phrases in dozens of languages with native phonetics and visual flashcard prompts."
      },
      {
        title: "Course 35: History Through Living Timelines",
        duration: "25 mins / session",
        description: "Moves away from dry memorization to explore cause-and-effect relationships across key historical epochs.",
        whyDeckoviz: "Renders interactive living timelines where students tap events to see generated historical scenes come alive."
      },
      {
        title: "Course 36: Global Environmental Challenges",
        duration: "20 mins / session",
        description: "Examines ocean plastic, deforestation, renewable energy transitions, and global conservation treaties.",
        whyDeckoviz: "Displays real-world data maps and interactive ecosystem balance simulations on the classroom display."
      }
    ]
  },
  {
    id: "track-7",
    number: 7,
    title: "Design, Invention & Creative Production",
    badge: "7 Courses",
    icon: <PenTool className="w-6 h-6 text-indigo-500" />,
    summary: "Equip students with hands-on maker skills: generative prototyping, UI/UX, spatial design, sound production, and world-building.",
    courses: [
      {
        title: "Course 37: Introduction to Generative Design",
        duration: "25 mins / session",
        description: "Teaches algorithmic creativity, parametric patterns, prompt engineering for physical objects, and digital modeling.",
        whyDeckoviz: "Students input design rules and watch Vizzy generate hundreds of architectural and product variations instantly."
      },
      {
        title: "Course 38: Prototyping & Invention Lab",
        duration: "30 mins / session",
        description: "Guides students from rough sketch idea to functional concept blueprint using rapid prototyping frameworks.",
        whyDeckoviz: "Converts student hand sketches into clean, formatted engineering blueprints and 3D concept previews."
      },
      {
        title: "Course 39: UI/UX & Human-Centered Design",
        duration: "25 mins / session",
        description: "Covers user research, wireframing, color accessibility, user journeys, and testing software interfaces.",
        whyDeckoviz: "Allows classes to design digital interfaces on the DASPort canvas and test live click-through wireframes."
      },
      {
        title: "Course 40: Interactive Media & Story World Creation",
        duration: "30 mins / session",
        description: "Explores world-building for books, games, and film—crafting lore, geography, magic/technology rules, and characters.",
        whyDeckoviz: "Vizzy organizes world lore into searchable visual wikis with generated maps, character portraits, and item cards."
      },
      {
        title: "Course 41: Environmental & Spatial Design",
        duration: "25 mins / session",
        description: "Teaches architecture basics, interior space planning, lighting design, and public park urban planning.",
        whyDeckoviz: "Transforms classroom wall into immersive 3D room render previewer with lighting shifts."
      },
      {
        title: "Course 42: Sustainable Product Design",
        duration: "25 mins / session",
        description: "Focuses on material selection, lifecycle analysis, repairability, and bio-degradable manufacturing alternatives.",
        whyDeckoviz: "Renders product disassembly exploded-views showing material sourcing and recycling path ratings."
      },
      {
        title: "Course 43: Sound Design & Audio Production",
        duration: "20–25 mins / session",
        description: "Teaches Foley sound creation, audio editing basics, podcasting setups, and balancing voice over background audio.",
        whyDeckoviz: "Provides built-in multi-track ambient audio studio for recording student podcasts and audio storybooks."
      }
    ]
  }
]

/* ═══════════════════════════════════════════════════════════════
   3. FEATURE CATALOGUE DATA (8 CATEGORIES)
   ═══════════════════════════════════════════════════════════════ */

const schoolsCatalogueCategories: CatalogueCategory[] = [
  {
    id: "platform",
    numeral: "01",
    title: "Vizzy Generative Learning Platform",
    subtitle: "Multimodal generative AI tailored specifically for institutional education",
    icon: <Bot className="w-5 h-5 text-[#2563EB]" />,
    entries: [
      { name: "Multimodal Visual Engine", description: "Generates high-resolution diagrams, historical scenes, scientific illustrations, and concept maps in seconds." },
      { name: "Age-Appropriate Safety Guardrails", description: "Built-in real-time filtering, institutional policy enforcement, and topic boundary locks." },
      { name: "Teacher Co-Pilot Assistant", description: "Proactively suggests lesson extensions, pop quizzes, visual aids, and discussion starters based on current topic." },
      { name: "Continuous Learning Memory", description: "Remembers class progression, previous topics covered, and individual student learning profiles securely." },
      { name: "Multi-Display Canvas Sync", description: "Syncs content seamlessly across front-of-room displays, student tablets, and home DASPort portals." }
    ]
  },
  {
    id: "teacher-tools",
    numeral: "02",
    title: "Teacher Experience & Classroom Tools",
    subtitle: "Empowering educators with instant lesson generation and administrative relief",
    icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
    entries: [
      { name: "Instant Lesson Materials", description: "Generate lesson decks, printable worksheets, and visual slides in under 30 seconds." },
      { name: "Voice-Activated Presentation", description: "Hands-free voice control allows teachers to navigate, generate, or query Vizzy while moving around the room." },
      { name: "Automated Attendance & Check-In", description: "Interactive morning check-in rituals that capture student attendance and baseline mood." },
      { name: "Differentiated Content Generator", description: "Instantly creates beginner, intermediate, and advanced versions of the same lesson concept." },
      { name: "Sub-Teacher Ready Plans", description: "One-click generation of comprehensive substitute teacher lesson plans with step-by-step display prompts." }
    ]
  },
  {
    id: "student-experience",
    numeral: "03",
    title: "Student Companion & Personal Growth",
    subtitle: "Personalized companion that supports each student's unique learning journey",
    icon: <GraduationCap className="w-5 h-5 text-teal-600" />,
    entries: [
      { name: "Personalized Learning Pace", description: "Adapts explanation complexity and visual representations to match student comprehension." },
      { name: "Home-to-School Continuity", description: "Seamless transition between classroom learning and home study through student DASPort profiles." },
      { name: "Socratic Curiosity Guide", description: "Encourages deeper questioning by asking guiding questions rather than simply giving immediate answers." },
      { name: "Creative Project Showcase", description: "Dedicated digital portfolio space for students to store and exhibit their artwork, essays, and projects." },
      { name: "Peer Collaboration Rooms", description: "Facilitates small-group visual brainstorming and shared canvas co-creation." }
    ]
  },
  {
    id: "lifeskills-engine",
    numeral: "04",
    title: "Life Skills & Character Curriculum Engine",
    subtitle: "51+ structured modular courses covering practical, emotional, and social development",
    icon: <Heart className="w-5 h-5 text-pink-600" />,
    entries: [
      { name: "7 Core Track Pathways", description: "Structured tracks in EQ, Creativity, Logic, Communication, Finance/Life Skills, Civics, and Design." },
      { name: "Scenario-Based Interactive Simulations", description: "Immersive branching scenarios where students make choices and observe realistic social outcomes." },
      { name: "Daily Reflection & Journaling", description: "Guided audio and visual journal prompts encouraging self-reflection and gratitude practice." },
      { name: "Gamified Mastery Badges", description: "Rewards student progress across life skills competencies with digital achievement tokens." },
      { name: "Parent Progress Briefings", description: "Summary updates sent to parents highlighting key life skill topics discussed in class." }
    ]
  },
  {
    id: "evaluations",
    numeral: "05",
    title: "Interactive Evaluations & Test Modes",
    subtitle: "Low-stress, adaptive assessment formats designed to measure true understanding",
    icon: <Target className="w-5 h-5 text-red-500" />,
    entries: [
      { name: "Adaptive Micro-Quizzes", description: "Short, non-intimidating checks for understanding that adjust difficulty in real time." },
      { name: "Visual Concept Association Tests", description: "Evaluates mastery by asking students to connect diagrams, scenes, and core concepts." },
      { name: "Classroom Live Polling", description: "Instant anonymous voting on questions with real-time chart generation on the main display." },
      { name: "Constructive Feedback Loop", description: "Provides immediate, gentle, constructive feedback pointing students toward improvement areas." },
      { name: "Teacher Mastery Dashboard", description: "Aggregates real-time class understanding metrics without manual grading burden." }
    ]
  },
  {
    id: "environment",
    numeral: "06",
    title: "Classroom Atmosphere & Environmental Control",
    subtitle: "Dynamic visual and sound design to optimize classroom focus and calm",
    icon: <Music className="w-5 h-5 text-cyan-600" />,
    entries: [
      { name: "Focus & Reset Soundscapes", description: "Curated soundscapes engineered to enhance concentration or quiet down energetic rooms." },
      { name: "Living Ambient Art Walls", description: "Transforms idle screens into beautiful, slow-shifting art displays relevant to current subjects." },
      { name: "Transition & Break Timers", description: "Visual countdown clocks paired with soft audio cues for smooth classroom transitions." },
      { name: "Circadian Room Lighting Cues", description: "Visual color tone adjustments matching natural daytime light cycles to sustain energy." },
      { name: "Noise-Level Sensitivity Cues", description: "Subtle visual alerts on display when room chatter exceeds target decibel thresholds." }
    ]
  },
  {
    id: "library",
    numeral: "07",
    title: "Smart Educational Library & Content Hub",
    subtitle: "Comprehensive curriculum-aligned digital assets and template repository",
    icon: <Library className="w-5 h-5 text-teal-600" />,
    entries: [
      { name: "Curriculum-Aligned Template Bank", description: "Thousands of pre-built lesson templates spanning K-12 and university subjects." },
      { name: "Global Asset Exchange", description: "Secure platform for teachers to share custom visual templates and lesson prompts." },
      { name: "Instant Semantic Search", description: "Find any visual asset, audio clip, or lesson outline instantly using natural language queries." },
      { name: "Multi-Language Support", description: "Instant translation of visual terms, captions, and lesson audio into 40+ global languages." },
      { name: "Offline Mode Resilience", description: "Caches core lesson materials locally so learning continues even during internet outages." }
    ]
  },
  {
    id: "admin",
    numeral: "08",
    title: "Institutional Admin, Safety & Compliance",
    subtitle: "Enterprise-grade controls designed for district admins, IT leads, and school boards",
    icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
    entries: [
      { name: "FERPA & COPPA Compliant", description: "Strict data privacy standards ensuring student data is never sold, trained on public models, or exposed." },
      { name: "Centralized Fleet Management", description: "IT administrators can manage all DASPort hardware units across classrooms and campuses from one dashboard." },
      { name: "Role-Based Access Control", description: "Granular permissions for teachers, students, sub-teachers, and school administrators." },
      { name: "Institutional Content Filtering", description: "Customizable keyword, topic, and imagery filters aligned with school district policies." },
      { name: "Google Workspace & LTI Integration", description: "Seamless SSO login and LMS integration with Canvas, Google Classroom, and Schoology." }
    ]
  }
]

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT (MATCHING DASPORT V1 LIGHT THEME)
   ═══════════════════════════════════════════════════════════════ */

export default function DeckovizSchoolsFeatures() {
  const [activeTab, setActiveTab] = useState<string>("features")
  const [expandedTracks, setExpandedTracks] = useState<Record<string, boolean>>({
    "track-1": true,
    "track-2": false,
    "track-3": false,
    "track-4": false,
    "track-5": false,
    "track-6": false,
    "track-7": false
  })
  const [expandedCat, setExpandedCat] = useState<string | null>("platform")

  const toggleTrack = (trackId: string) => {
    setExpandedTracks(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }))
  }

  const toggleCat = (catId: string) => {
    setExpandedCat(prev => (prev === catId ? null : catId))
  }

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -120
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen text-gray-800 font-sans antialiased selection:bg-blue-600 selection:text-white relative">
        <Navbar />

        {/* Main Background Wrapper matching DASPort V1 Features theme */}
        <section
          className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
        >
          {/* Soft background glow blobs */}
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
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-[#2563EB] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Pricing
              </Link>
              <Link
                to="/dasport-v1-features"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors bg-white/60 px-3 py-1.5 rounded-full border border-white/80 shadow-sm"
              >
                <span>DASPort V1 Feature Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* ─── PAGE HERO HEADER ─── */}
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/15 border border-blue-300/30 text-xs font-bold text-indigo-900 uppercase tracking-wider mb-4 shadow-sm">
                <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                Deckoviz for Schools & Universities
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className="text-gray-900">Institutional Learning</span>{" "}
                <span className="italic bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
                  & Life Skills Platform
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-normal">
                Transform classrooms into dynamic generative learning environments with Vizzy AI, our 51+ course Life Skills Curriculum, proactive lesson assistance, and comprehensive atmosphere controls.
              </p>
            </div>

            {/* ─── STICKY SEGMENTED SECTION NAV ─── */}
            <div className="sticky top-20 z-40 flex justify-center mb-12">
              <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(37,99,235,0.12)]">
                {[
                  { id: "features", label: "Highlights & Overview", icon: Sparkles },
                  { id: "canvas", label: "Learning Canvas", icon: Layout },
                  { id: "lifeskills", label: "Life Skills (51+ Courses)", icon: Heart },
                  { id: "catalogue", label: "Feature Catalogue", icon: Layers }
                ].map(tab => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white shadow-md shadow-blue-600/20"
                          : "text-gray-700 hover:text-gray-900 hover:bg-white/60"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── SECTION 1: HIGH-LEVEL FEATURES & HIGHLIGHTS ── */}
            <section id="features" className="mb-16 scroll-mt-32">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Sales Quick Reference
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Classroom Features & Highlights
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Loaded with classroom-first generative capabilities built to assist teachers and inspire students.
                </p>
              </div>

              {/* 14 Compact Grid Cards (Matching DasportV1 Light Glass Theme) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
                {schoolsCompactFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl p-6 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.08)] hover:bg-white/90 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 group-hover:scale-105 transition-transform">
                          {feat.icon}
                        </div>
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-900">
                          {feat.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#2563EB] transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Long-Form Marketing Copy Card */}
              <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-8 sm:p-12 shadow-[0_16px_50px_rgba(37,99,235,0.10)] relative overflow-hidden">
                <div className="max-w-4xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2 block">
                    The Deckoviz Educational Philosophy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Replacing Static Chalkboards with Living, Proactive Learning Canvases
                  </h3>
                  
                  <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                    <p>
                      Traditional classrooms rely on static blackboards or static slideshow presentation screens that require constant manual prep work from exhausted teachers. Deckoviz fundamentally rearchitects the classroom display into an active, intelligent partner.
                    </p>
                    <p>
                      Powered by Vizzy AI, the DASPort display listens, learns, and generates contextual visual aids in real time as the teacher speaks. When a history lesson mentions Ancient Alexandria, Vizzy seamlessly transitions the wall into a live, generated 3D architectural reconstruction. When a science class discusses photosynthesis, Vizzy renders dynamic, interactive cellular energy diagrams.
                    </p>
                    <p>
                      Beyond subject academics, Deckoviz places character, resilience, and emotional intelligence at the center of education with our comprehensive 51+ course Life Skills Curriculum—giving students the lifelong tools they need to thrive in a rapidly shifting modern world.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200/80">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">80% Less Prep Time</h4>
                        <p className="text-xs text-gray-600">Vizzy generates visual lesson materials instantly.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">3x Classroom Engagement</h4>
                        <p className="text-xs text-gray-600">Living art and interactive games keep focus high.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Lifelong Continuity</h4>
                        <p className="text-xs text-gray-600">Companion grows with students from K-12 to University.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 2: THE GENERATIVE LEARNING CANVAS ── */}
            <section id="canvas" className="mb-16 scroll-mt-32">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">
                  <Layout className="w-3.5 h-3.5 text-indigo-600" />
                  Multimodal Workspace
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Generative Learning Canvas
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  An infinite, multimodal digital canvas where teachers and students co-create, visualize concepts, and run interactive simulations side-by-side.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card 1: Overview */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl p-7 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.08)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-5">
                      <Layout className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">1. Canvas Overview</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      The Generative Learning Canvas bridges the gap between spoken concepts and visual understanding. It responds to voice, touch, stylus, and remote prompts simultaneously.
                    </p>
                    <ul className="space-y-2 text-xs text-gray-700 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        <span>Infinite pan, zoom, and multi-layer vector canvas</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        <span>Real-time voice-to-diagram generation engine</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        <span>Multi-device student tablet synchronization</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Card 2: What's Possible */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl p-7 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.08)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 mb-5">
                      <Wand2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">2. What's Possible</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      Transform any subject into an interactive visual experiment:
                    </p>
                    <div className="space-y-2.5 text-xs text-gray-700">
                      <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                        <strong className="text-blue-900 block mb-0.5">STEM & Physics:</strong>
                        <span>Simulate gravity fields, molecular bonds, and electrical circuits on screen.</span>
                      </div>
                      <div className="bg-teal-50/70 p-3 rounded-xl border border-teal-100">
                        <strong className="text-teal-900 block mb-0.5">Humanities:</strong>
                        <span>Map character relationship trees and generate scene storyboards on demand.</span>
                      </div>
                      <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100">
                        <strong className="text-purple-900 block mb-0.5">Mathematics:</strong>
                        <span>Convert equations into dynamic 3D geometric shapes that respond to touch.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: How This Matters */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl p-7 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.08)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-600 mb-5">
                      <Brain className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">3. How This Matters</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                      Educational research consistently shows that visual co-creation dramatically enhances retention and critical thinking.
                    </p>
                    <ul className="space-y-2.5 text-xs text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span><strong>Inclusive Learning:</strong> Supports visual, auditory, and kinesthetic learners simultaneously.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span><strong>Active Participation:</strong> Shifts students from passive consumers to active creators.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span><strong>Reduced Anxiety:</strong> Non-judgmental AI environment encourages exploration.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 3: THE LIFE SKILLS CURRICULUM ── */}
            <section id="lifeskills" className="mb-16 scroll-mt-32">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-bold text-pink-900 uppercase tracking-wider mb-2">
                  <Heart className="w-3.5 h-3.5 text-pink-600" />
                  51+ Structured Courses Across 7 Tracks
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Deckoviz Life Skills Curriculum
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Equipping students with emotional regulation, financial literacy, creative production, and critical thinking skills essential for the modern world.
                </p>
              </div>

              {/* Tracks Accordion List */}
              <div className="space-y-4 max-w-5xl mx-auto">
                {lifeSkillsTracks.map(track => {
                  const isExpanded = !!expandedTracks[track.id]
                  return (
                    <div
                      key={track.id}
                      className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl shadow-[0_8px_25px_rgba(37,99,235,0.06)] overflow-hidden transition-all duration-200"
                    >
                      {/* Track Header */}
                      <button
                        onClick={() => toggleTrack(track.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/60 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-pink-50 border border-pink-100 shrink-0">
                            {track.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                Track 0{track.number}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 border border-pink-200 text-pink-800">
                                {track.badge}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">{track.title}</h3>
                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{track.summary}</p>
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-gray-600 shrink-0">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      {/* Course Cards Grid */}
                      {isExpanded && (
                        <div className="p-6 border-t border-slate-200/60 bg-blue-50/30 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {track.courses.map((course, cIdx) => (
                              <div
                                key={cIdx}
                                className="bg-white/90 border border-slate-200/80 rounded-xl p-5 shadow-sm hover:border-blue-400/50 transition-all flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="text-sm font-bold text-gray-900 leading-snug">
                                      {course.title}
                                    </h4>
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 whitespace-nowrap shrink-0 flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-pink-600" />
                                      <span>{course.duration}</span>
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                    {course.description}
                                  </p>
                                </div>

                                {/* Why Deckoviz Callout */}
                                <div className="bg-gradient-to-r from-pink-50/80 via-purple-50/60 to-slate-50 border border-pink-200/70 rounded-lg p-3 mt-1">
                                  <div className="flex items-center gap-1.5 text-xs font-bold text-pink-900 mb-1">
                                    <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                                    <span>Why Deckoviz & Vizzy AI:</span>
                                  </div>
                                  <p className="text-xs text-gray-700 leading-relaxed">
                                    {course.whyDeckoviz}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ── SECTION 4: COMPLETE FEATURE CATALOGUE ── */}
            <section id="catalogue" className="mb-16 scroll-mt-32">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-xs font-bold text-teal-900 uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  Institutional Specification
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Institutional Feature Catalogue
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Comprehensive breakdown of features built for classroom management, security compliance, administration, and learning optimization.
                </p>
              </div>

              <div className="max-w-5xl mx-auto space-y-3">
                {schoolsCatalogueCategories.map(cat => {
                  const isOpen = expandedCat === cat.id
                  return (
                    <div
                      key={cat.id}
                      className="bg-white/70 backdrop-blur-xl border border-white/90 rounded-2xl shadow-[0_8px_25px_rgba(37,99,235,0.06)] overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleCat(cat.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/60 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-xs font-mono font-bold text-[#2563EB]">
                            {cat.numeral}
                          </span>
                          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB]">
                            {cat.icon}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-gray-900">{cat.title}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{cat.subtitle}</p>
                          </div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-gray-600">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-200/60 bg-white/80 p-6">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                              <thead>
                                <tr className="border-b-2 border-slate-200 text-xs text-gray-900 uppercase tracking-wider font-bold">
                                  <th className="pb-3 font-extrabold w-1/3">Feature Name</th>
                                  <th className="pb-3 font-extrabold w-2/3">Institutional Description</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {cat.entries.map((entry, eIdx) => (
                                  <tr key={eIdx} className={eIdx % 2 === 0 ? "bg-slate-50/40" : "bg-white"}>
                                    <td className="py-3 px-3 font-bold text-[#2563EB]">
                                      {entry.name}
                                    </td>
                                    <td className="py-3 px-3 text-gray-700 leading-relaxed font-normal">
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
                })}
              </div>
            </section>

            {/* ── FOOTER CTA ── */}
            <div className="mt-14 sm:mt-20 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/90 shadow-[0_16px_50px_rgba(37,99,235,0.12)] w-full">
                <div className="text-center sm:text-left max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Ready to bring Deckoviz to your classrooms?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Book a live demo to see Vizzy, the 51+ Life Skills Curriculum, and multimodal learning modes running live.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#182A4A] to-[#2563EB] hover:from-[#13223B] hover:to-[#1D4ED8] text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>Schedule School Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>

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
