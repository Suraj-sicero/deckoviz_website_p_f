import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  ArrowLeft,
  X,
  Award,
  Zap,
  Target,
  Clock,
  Check,
  Globe,
  TrendingUp,
  Volume2,
  Heart,
  Palette,
  MessageSquare,
  Flame,
  Monitor
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
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* Ambient Soft Light Glow Orbs */
const LightGlowOrb: React.FC<{
  color?: string;
  size?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
}> = ({
  color = "#ccfbf1",
  size = "650px",
  top,
  left,
  right,
  bottom,
  opacity = 0.45,
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
      filter: "blur(140px)",
      opacity,
    }}
    animate={{
      scale: [1, 1.1, 1],
      opacity: [opacity, opacity * 1.2, opacity],
    }}
    transition={{
      duration: 8,
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

/* ═══════════════ COMPLETE 51 LIFE SKILLS COURSES DATA ═══════════════ */
interface CourseItem {
  id: number;
  trackId: number;
  trackName: string;
  title: string;
  length: string;
  description: string;
  whyDeckoviz: string;
}

const curriculumTracks = [
  "All Tracks",
  "Track 1: Emotional Intelligence",
  "Track 2: Creativity & Expression",
  "Track 3: Thinking & Decision-Making",
  "Track 4: Communication & Relationships",
  "Track 5: Practical Life Skills",
  "Track 6: World, Culture & Ideas",
  "Track 7: Design, Invention & Creative Production",
  "Track 8: Deckoviz Special Experiences",
];

const lifeSkillsCourses: CourseItem[] = [
  // Track 1
  {
    id: 1,
    trackId: 1,
    trackName: "Track 1: Emotional Intelligence",
    title: "1. Understanding My Emotions",
    length: "5 classes, recurring yearly with increasing depth",
    description: "A foundational course helping young students name and recognise what they're feeling, moving beyond 'happy' and 'sad' into a genuinely useful emotional vocabulary. Each class centres on a small cluster of related emotions, exploring the physical sensations that accompany them, the situations that tend to trigger them, and healthy ways to express rather than suppress them. Early sessions focus on happy, sad, angry, scared, while later grades introduce disappointment, jealousy, pride, or embarrassment.",
    whyDeckoviz: "Emotions are abstract for young children. Deckoviz can generate a unique visual metaphor for each feeling in real time, turning 'frustration' into an image a six-year-old can point to and say 'that's what it feels like.' Visuals are generated fresh each session based on real classroom events."
  },
  {
    id: 2,
    trackId: 1,
    trackName: "Track 1: Emotional Intelligence",
    title: "2. Empathy in Action",
    length: "6 classes",
    description: "Moves beyond recognising one's own emotions into genuinely understanding others'. Uses perspective-taking exercises, guided storytelling told from another character's point of view, and scenario-based discussion where students sit with a situation from someone else's shoes before reacting.",
    whyDeckoviz: "Vizzy can generate a visual scene from a different character's perspective instantly, letting students literally see a situation change when the viewpoint changes, rendering the same conflict differently depending on whose eyes it's seen through."
  },
  {
    id: 3,
    trackId: 1,
    trackName: "Track 1: Emotional Intelligence",
    title: "3. Emotional Regulation Toolkit",
    length: "8 classes, with a lighter recurring refresher each year",
    description: "Teaches concrete, practical strategies for managing big emotions in the moment: breathing techniques, naming and reframing thoughts, grounding exercises, and simple calming rituals. Builds each student their own personal toolkit, testing different techniques under realistic pressure.",
    whyDeckoviz: "Generative visualisations and breathing-guide tools let each student develop a personalised calming visual sequence that is specifically theirs. Vizzy remembers what works for a student and proactively suggests their toolkit during difficult moments."
  },
  {
    id: 4,
    trackId: 1,
    trackName: "Track 1: Emotional Intelligence",
    title: "4. Mindfulness & Breath Awareness",
    length: "10 short classes, 15 to 20 minutes each",
    description: "A short, recurring practice woven through the week rather than a single long class, built around simple breathing and present-moment awareness exercises suited to realistic attention spans. Function as calming resets before tests or after recess.",
    whyDeckoviz: "Ambient, generative visuals paired with guided narration create an immersive mindfulness moment. The environment changes every session—a forest one day, a slow sunrise the next—keeping young attention engaged."
  },
  {
    id: 5,
    trackId: 1,
    trackName: "Track 1: Emotional Intelligence",
    title: "5. The Art of Meditation & Visualisation",
    length: "6 classes",
    description: "A gentle introduction to guided meditation and visualisation techniques: imagining a calm place in detail, visualising a personal goal, or picturing a difficult upcoming moment resolving well. Frames visualisation as a practical skill used by athletes and high achievers.",
    whyDeckoviz: "Vizzy renders a student's imagined 'calm place' or goal as an actual generated visual in the room, making internal practice external and shared, giving students a concrete visual anchor to return to."
  },
  {
    id: 6,
    trackId: 1,
    trackName: "Track 1: Emotional Intelligence",
    title: "6. Journaling as a Life Practice",
    length: "Ongoing, weekly, across all grades",
    description: "Builds the habit of reflection through age-appropriate prompts, evolving from simple daily highlights in early grades to deeper reflective writing examining patterns, values, and identity in later years. Functions as a lifelong habit.",
    whyDeckoviz: "Adaptive journaling layered with life-skills prompts. Vizzy remembers past entries over years, noticing patterns a student might not notice themselves and reflecting them back gently."
  },

  // Track 2
  {
    id: 7,
    trackId: 2,
    trackName: "Track 2: Creativity & Expression",
    title: "7. Appreciating Art",
    length: "5 classes per grade, recurring yearly",
    description: "Introduces students to looking at and understanding art—colour, composition, mood, meaning—growing from simple intuitive questions in early grades to real critical and historical analysis by secondary school.",
    whyDeckoviz: "Vizzy generates variations of an artwork on demand (different palettes, styles, eras), letting students watch a single scene transform from impressionist to cubist to minimalist in seconds."
  },
  {
    id: 8,
    trackId: 2,
    trackName: "Track 2: Creativity & Expression",
    title: "8. Creating Art",
    length: "5 classes per grade, recurring yearly",
    description: "A hands-on creative course where students co-create original artwork with Vizzy, developing their own visual voice over years rather than treating art as an isolated unit.",
    whyDeckoviz: "Vizzy acts as a creative collaborator, remembering a student's evolving style and past work across grades so creative progress compounds continuously."
  },
  {
    id: 9,
    trackId: 2,
    trackName: "Track 2: Creativity & Expression",
    title: "9. Appreciating Poetry",
    length: "4 classes",
    description: "Explores how poems work—rhythm, imagery, metaphor, emotion—through active engagement, reading poems chosen specifically for genuine relevance to students' actual lives.",
    whyDeckoviz: "Vizzy generates visuals for a poem's central image on the spot, making abstract metaphors concrete and giving struggling readers a visual entry point."
  },
  {
    id: 10,
    trackId: 2,
    trackName: "Track 2: Creativity & Expression",
    title: "10. Creating Poetry",
    length: "5 classes, recurring across grades",
    description: "Guides students through writing their own poetry, starting with structured forms (acrostics, haiku) and progressing to freer expression with Vizzy as a gentle creative coach.",
    whyDeckoviz: "Creative Companion mode nudges student poems forward with constructive feedback, then visualises the finished poem as displayable wall art."
  },
  {
    id: 11,
    trackId: 2,
    trackName: "Track 2: Creativity & Expression",
    title: "11. Music Appreciation & Creation",
    length: "6 classes",
    description: "Introduces musical structure, mood, and history through active listening paired with simple composition tools that don't require prior instrumental training.",
    whyDeckoviz: "Multisensory synchrony pairs visuals with sound, letting students see a piece of music rendered visually as it plays, connecting auditory and visual understanding."
  },
  {
    id: 12,
    trackId: 2,
    trackName: "Track 2: Creativity & Expression",
    title: "12. Storytelling & Narrative Craft",
    length: "8 classes",
    description: "Teaches the fundamentals of narrative craft—structure, character, tension, resolution, unreliable narrators, non-linear structure, show vs. tell—through analysis and creation.",
    whyDeckoviz: "Vizzy illustrates a student's story scene by scene as it develops, giving immediate visual feedback on narrative pacing and clarity."
  },

  // Track 3
  {
    id: 13,
    trackId: 3,
    trackName: "Track 3: Thinking & Decision-Making",
    title: "13. Decision-Making Fundamentals",
    length: "6 classes",
    description: "Teaches a practical framework for making good decisions: weighing options, considering consequences, and understanding values-based tradeoffs in real-life scenarios.",
    whyDeckoviz: "Vizzy visualises branching outcomes of decision scenarios in real time, allowing students to watch multiple possible futures play out side by side."
  },
  {
    id: 14,
    trackId: 3,
    trackName: "Track 3: Thinking & Decision-Making",
    title: "14. Critical Thinking & Questioning the World",
    length: "8 classes",
    description: "Builds the habit of questioning information, sources, and assumptions—media literacy woven with logic and reasoning to detect manipulated content and biases.",
    whyDeckoviz: "Generative visuals illustrate how misleading claims or doctored images work, showing side-by-side comparisons that teach media literacy instantly."
  },
  {
    id: 15,
    trackId: 3,
    trackName: "Track 3: Thinking & Decision-Making",
    title: "15. Moral Values & Ethics Through Stories",
    length: "10 classes across a year",
    description: "Explores core values—honesty, fairness, courage, kindness—through discussion of complex dilemmas with no clean single answer, encouraging active moral reasoning.",
    whyDeckoviz: "Vizzy generates values-based scenarios visually, allowing classes to explore how story paths unfold depending on ethical choices made."
  },
  {
    id: 16,
    trackId: 3,
    trackName: "Track 3: Thinking & Decision-Making",
    title: "16. Problem Solving & Creative Thinking",
    length: "6 classes",
    description: "Builds structured approaches to open-ended problems: reframing issues, breaking large tasks into components, and generating divergent candidate solutions.",
    whyDeckoviz: "Generates multiple wildly different visual solution directions to the same problem instantly, modelling divergent thinking in real time."
  },

  // Track 4
  {
    id: 17,
    trackId: 4,
    trackName: "Track 4: Communication & Relationships",
    title: "17. Communication Skills - Speaking & Listening",
    length: "6 classes",
    description: "Covers clear expression and active listening through structured conversation exercises, expressing ideas concisely and accurately repeating back peer meanings.",
    whyDeckoviz: "Vizzy's avatar and live interaction mode let students practise conversational dynamics with real-time feedback on clarity and pacing."
  },
  {
    id: 18,
    trackId: 4,
    trackName: "Track 4: Communication & Relationships",
    title: "18. Public Speaking & Presentation Skills",
    length: "5 classes",
    description: "Builds confidence speaking to groups through repeated low-stakes practice: structuring ideas, delivery, handling nerves, and using supporting visual material.",
    whyDeckoviz: "Connects to Public Speaking Coach mode, generating live visual presentation support during practice to mirror real speaking environments."
  },
  {
    id: 19,
    trackId: 4,
    trackName: "Track 4: Communication & Relationships",
    title: "19. Conflict Resolution & Negotiation",
    length: "6 classes",
    description: "Teaches active listening, finding common ground, and fair compromise through realistic role-play grounded in common school-age conflicts.",
    whyDeckoviz: "Vizzy acts as an adaptive role-play counterpart, adjusting difficulty and stance dynamically based on the student's conflict resolution approach."
  },
  {
    id: 20,
    trackId: 4,
    trackName: "Track 4: Communication & Relationships",
    title: "20. Building Real Friendships",
    length: "5 classes",
    description: "Explores trust, reciprocity, and handling friction in friendships across shifting age dynamics, treating peer relationship skills as learnable competencies.",
    whyDeckoviz: "Scenarios adapt to reflect situations genuinely relevant to a specific class's real social dynamics rather than generic textbook examples."
  },
  {
    id: 21,
    trackId: 4,
    trackName: "Track 4: Communication & Relationships",
    title: "21. Leadership & Teamwork",
    length: "8 classes",
    description: "Covers collaboration, delegation, listening to a team, and taking initiative as service and facilitation through hands-on group projects with rotating roles.",
    whyDeckoviz: "Vizzy facilitates group sessions, tracking participation and rotating leadership roles fairly so every student gets authentic leadership practice."
  },

  // Track 5
  {
    id: 22,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "22. Financial Literacy for Kids",
    length: "6 classes, primary level",
    description: "Introduces money basics—saving, spending, needs vs. wants—through story-based scenarios and budget decisions tailored to young learners.",
    whyDeckoviz: "Abstract money concepts become concrete as savings goals visually grow on classroom walls over time as students track progress."
  },
  {
    id: 23,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "23. Financial Literacy for Teens",
    length: "8 classes, secondary level",
    description: "Secondary-level financial skills: budgeting, compound interest, basic investing, and debt management using realistic numbers, jobs, and accounts.",
    whyDeckoviz: "Generates real-time visualisations of compound growth, budget breakdowns, and financial decision trees to make complex math intuitive."
  },
  {
    id: 24,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "24. Time Management & Focus",
    length: "5 classes",
    description: "Practical strategies for managing time, avoiding procrastination, and building focus amidst school loads, homework, and screen time distractions.",
    whyDeckoviz: "Provides a personalised, visual time-tracking companion that turns abstract productivity advice into an ongoing daily habit."
  },
  {
    id: 25,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "25. Goal Setting & Self-Motivation",
    length: "5 classes, with ongoing check-in",
    description: "Teaches setting achievable goals, sustaining effort when motivation dips, and tracking personal milestones on living vision boards.",
    whyDeckoviz: "Integrates with the Personal Growth Tracking Board, maintaining live, updating visual goals that stay visible and active over terms."
  },
  {
    id: 26,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "26. Resilience & Growth Mindset",
    length: "6 classes",
    description: "Explores responding productively to failure, building the belief that ability grows through effort using real examples of recovery from setbacks.",
    whyDeckoviz: "Vizzy revisits a student's own journal history and visually demonstrates their growth over time, making growth mindset personally provable."
  },
  {
    id: 27,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "27. Gratitude & Positive Psychology",
    length: "6 classes",
    description: "Introduces science-backed gratitude practices and positive reflection routines, grounding daily habits in psychological research on wellbeing.",
    whyDeckoviz: "A recurring gratitude visual evolves as students add reflections over time, creating a shared, tangible wall display to take pride in."
  },
  {
    id: 28,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "28. Body Literacy & Healthy Habits",
    length: "6 classes, age-appropriate per grade",
    description: "Covers bodily health, nutrition, sleep, and movement in a positive, non-judgmental frame focused on how habits foster energy and wellbeing.",
    whyDeckoviz: "Generates clear, engaging anatomical and physiological visualisations showing how habits impact the body without shaming frames."
  },
  {
    id: 29,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "29. Digital Wellness & AI Literacy",
    length: "6 classes",
    description: "Teaches healthy screen habits, digital footprints, and honest understanding of AI capabilities, biases, and limitations.",
    whyDeckoviz: "Vizzy acts as a meta-learning example, candidly explaining its own mechanics, capabilities, and boundaries live in the classroom."
  },
  {
    id: 30,
    trackId: 5,
    trackName: "Track 5: Practical Life Skills",
    title: "30. Career Exploration & Life Planning",
    length: "8 classes, secondary level",
    description: "Maps student strengths and interests to real career paths, exploring daily routines, skills, and pathways across modern industries.",
    whyDeckoviz: "Leverages years of longitudinal student interest history to offer tailored, specific career guidance rather than generic single quiz results."
  },

  // Track 6
  {
    id: 31,
    trackId: 6,
    trackName: "Track 6: World, Culture & Ideas",
    title: "31. Living History Immersion",
    length: "6 classes, tied to history curriculum",
    description: "Rebuilds historical events—Silk Road trade, treaty signings, ancient cities—as first-person visual environments students discuss from within.",
    whyDeckoviz: "Generates historically accurate, responsive visual scenes on demand that change as students ask 'what if' questions about decisions."
  },
  {
    id: 32,
    trackId: 6,
    trackName: "Track 6: World, Culture & Ideas",
    title: "32. World Cultures & Global Citizenship",
    length: "8 classes",
    description: "Travels visually and narratively across global traditions, art, and daily routines through the eyes of locals to build cultural empathy.",
    whyDeckoviz: "Vizzy generates respectful, immersive visual windows into daily life worldwide, taking classes on virtual cultural visits."
  },
  {
    id: 33,
    trackId: 6,
    trackName: "Track 6: World, Culture & Ideas",
    title: "33. Mythology & Legends Across Cultures",
    length: "6 classes",
    description: "Compares myths from Greek, Norse, West African, Indigenous, and Asian traditions to reveal universal human questions and values.",
    whyDeckoviz: "Renders each myth in authentic visual art styles matched to the specific tradition, making comparative folklore visually vivid."
  },
  {
    id: 34,
    trackId: 6,
    trackName: "Track 6: World, Culture & Ideas",
    title: "34. Philosophy for Young Minds",
    length: "8 classes",
    description: "Introduces big unresolved questions—fairness, purpose, knowledge—teaching students to sit with complex ideas and reason clearly.",
    whyDeckoviz: "Generates philosophical thought experiments as visual scenarios (Trolley Problem, Ship of Theseus) for active class debate."
  },
  {
    id: 35,
    trackId: 6,
    trackName: "Track 6: World, Culture & Ideas",
    title: "35. World Religions & Belief Systems",
    length: "6 classes",
    description: "A respectful, neutral comparative study of world religions, sacred spaces, core tenets, and cultural impacts for global literacy.",
    whyDeckoviz: "Visually renders sacrosanct art, architecture, and historical contexts with dignity, offering authentic visual anchors."
  },
  {
    id: 36,
    trackId: 6,
    trackName: "Track 6: World, Culture & Ideas",
    title: "36. Civic Engagement & Community Building",
    length: "6 classes",
    description: "Explores societal functioning, local council mechanics, civic duties, and advocacy through practical simulations.",
    whyDeckoviz: "Visualises civic structures and community impact scenarios, transforming civics from diagrams into active simulations."
  },

  // Track 7
  {
    id: 37,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "37. Design Thinking & Invention Lab",
    length: "8 classes",
    description: "Teaches the design thinking loop: empathy, problem framing, rapid ideation, prototyping, and testing on original inventions.",
    whyDeckoviz: "Vizzy renders student invention concepts at every design stage, showing ideas evolve from rough sketches to polished concepts."
  },
  {
    id: 38,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "38. Architecture & Spatial Imagination",
    length: "6 classes",
    description: "Introduces spatial reasoning and architectural concepts—how built spaces shape mood and community—by designing rooms and parks.",
    whyDeckoviz: "Renders student spatial concepts as walkable 3D-feeling visuals instantly, letting them refine spatial designs in real time."
  },
  {
    id: 39,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "39. Culinary Arts & Food Culture",
    length: "6 classes",
    description: "Explores food history, cultural traditions, flavor science, and conceptual dish creation as an artistic and social discipline.",
    whyDeckoviz: "Generates restaurant-grade dish photography and food origins visuals, turning culinary concepts into visual art."
  },
  {
    id: 40,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "40. Comic Book & Graphic Novel Studio",
    length: "8 classes",
    description: "Sustained project building an original graphic novel: character design, panel layout, pacing, and visual storytelling.",
    whyDeckoviz: "Generates panel-by-panel visuals matching student storyboards in real time, making graphic publishing accessible to all skill levels."
  },
  {
    id: 41,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "41. Film & Animation Storyboarding",
    length: "6 classes",
    description: "Covers cinematic visual language: shot framing, camera angles, lighting mood, and scene pacing through storyboard building.",
    whyDeckoviz: "Generates full visual sequences from written shot descriptions instantly, allowing students to direct and edit scenes visually."
  },
  {
    id: 42,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "42. Game Design Fundamentals",
    length: "8 classes",
    description: "Teaches core game mechanics: rules, challenge loops, feedback systems, and level design through original game conceptualisation.",
    whyDeckoviz: "Visualises game worlds, character sprites, and mechanics cards, bringing abstract game design documents to life."
  },
  {
    id: 43,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "43. Fashion & Personal Style Expression",
    length: "5 classes",
    description: "Explores clothing design, textile history, silhouette, and personal aesthetic expression as a creative identity tool.",
    whyDeckoviz: "Translates style mood-boards and garment concepts into rendered fashion collections on digital avatars."
  },
  {
    id: 44,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "44. Entrepreneurship & Pitching Big Ideas",
    length: "8 classes",
    description: "Covers market problem identification, solution design, business modeling, and pitch delivery for original student ideas.",
    whyDeckoviz: "Generates instant brand identities, product visual mockups, and pitch decks to give student ventures professional polish."
  },
  {
    id: 45,
    trackId: 7,
    trackName: "Track 7: Design, Invention & Creative Production",
    title: "45. Science Fiction & Worldbuilding",
    length: "6 classes",
    description: "Builds speculative worlds—geography, technology, social systems, ecosystems—fostering deep systems thinking and logic.",
    whyDeckoviz: "Renders speculative planetary visual environments that update as students define rules, ecosystems, and lore."
  },

  // Track 8
  {
    id: 46,
    trackId: 8,
    trackName: "Track 8: Deckoviz Special Experiences",
    title: "46. Astronomy & Cosmic Wonder",
    length: "6 classes",
    description: "Transforms classroom walls into planetarium windows: deep space scales, stellar lifecycles, planetary systems, and cosmic awe.",
    whyDeckoviz: "Delivers planetarium-grade cosmic visual simulations directly on classroom walls without requiring specialized astronomy domes."
  },
  {
    id: 47,
    trackId: 8,
    trackName: "Track 8: Deckoviz Special Experiences",
    title: "47. Cross-Generational Wisdom Exchange",
    length: "Ongoing termly events",
    description: "Connects students with elders and community leaders to capture oral histories, hard-won wisdom, and family heritage stories.",
    whyDeckoviz: "Enriches live intergenerational interviews with real-time historical visuals and generates archival digital keepsakes."
  },
  {
    id: 48,
    trackId: 8,
    trackName: "Track 8: Deckoviz Special Experiences",
    title: "48. Personal Identity & Self-Portrait Journey",
    length: "5 classes, at key transition years",
    description: "Explores evolving personal identity through collaborative self-portraits revisited across key milestones (grade 1, 5, 8, 12).",
    whyDeckoviz: "Maintains a multi-year visual archive of a student's evolving self-portraits and creative expressions over their school journey."
  },
  {
    id: 49,
    trackId: 8,
    trackName: "Track 8: Deckoviz Special Experiences",
    title: "49. The Legacy Project",
    length: "Single multi-session graduating capstone",
    description: "A capstone experience where graduating students synthesize their school journey into a lasting digital legacy video, letter, or artwork.",
    whyDeckoviz: "Weaves real memories, journal entries, and artwork from a student's full schooling history into a multimedia capstone."
  },
  {
    id: 50,
    trackId: 8,
    trackName: "Track 8: Deckoviz Special Experiences",
    title: "50. Humor, Wit & The Craft of Comedy",
    length: "5 classes",
    description: "Explores comedic timing, wordplay, observational humor, and satirical craft in a playful, low-stakes creative workshop.",
    whyDeckoviz: "Generates visual gags and cartoon illustrations live during comedic recitals to give instant visual feedback on comic timing."
  },
  {
    id: 51,
    trackId: 8,
    trackName: "Track 8: Deckoviz Special Experiences",
    title: "51. Nature Connection & Environmental Wonder",
    length: "6 classes",
    description: "Cultivates deep appreciation for ecosystems, seasonal cycles, and biodiversity, especially for urban schools with limited green spaces.",
    whyDeckoviz: "Brings living rainforests, coral reefs, and seasonal biome visual simulations directly into urban classrooms."
  }
];

/* V1 Feature Catalogue Tables */
const catalogueSections = [
  {
    id: "vizzy-ta",
    title: "I. Vizzy - Ultimate Teacher's Assistant",
    subtitle: "Tens of sub-tools, agents, and personas supporting every part of a teacher's day.",
    features: [
      { name: "Live Lesson Support", desc: "Present during class, generating visuals and material on the teacher's cue, in real time." },
      { name: "Lesson Prep Assistant", desc: "Builds lesson visuals, slides, and materials ahead of class, tailored to the teacher's style and pace." },
      { name: "Materials Creator", desc: "Generates worksheets, diagrams, handouts, and visual aids on demand, in any subject." },
      { name: "Grading & Feedback Support", desc: "Assists with review and feedback on student work, teacher remains in full control of final grading." },
      { name: "Substitute Bridge Mode", desc: "Runs a coherent backup lesson independently if a class is left without coverage." },
      { name: "Parent-Teacher Conference Prep", desc: "Assembles visual summaries of student progress ahead of meetings." },
      { name: "Curriculum Pacing Assistant", desc: "Tracks where a class is against the curriculum and flags upcoming topics worth prepping for." },
      { name: "Class Analytics Companion", desc: "Surfaces patterns in engagement, pace, and comprehension across a class." },
      { name: "Teacher Personalization Engine", desc: "Learns and adapts to each teacher's individual style, pacing, and preferences over time, growing more useful every term." },
    ]
  },
  {
    id: "vizzy-student",
    title: "II. Vizzy - Ultimate Student Learning Companion",
    subtitle: "Tens of sub-tools, agents, and personas, each a different way of learning with Vizzy.",
    features: [
      { name: "Socratic Tutor", desc: "Guides students toward answers through questions rather than direct delivery, building genuine reasoning skills." },
      { name: "Personalized Explainer", desc: "Adapts explanations to how each student specifically learns, visual, story-driven, hands-on, or logical." },
      { name: "Homework Companion", desc: "Patient, judgment-free support for independent work, without simply supplying answers." },
      { name: "Exam Prep Coach", desc: "Focused review sessions with adaptive recall practice ahead of tests." },
      { name: "Motivation & Confidence Coach", desc: "Builds intrinsic motivation and celebrates effort, not just correct answers." },
      { name: "Student Deep Personalization Engine", desc: "A single companion that learns and grows with a student across their entire schooling journey, deepening every year." },
    ]
  },
  {
    id: "session-types",
    title: "III. Structured Session Types",
    subtitle: "The core session formats Vizzy runs in a classroom setting.",
    features: [
      { name: "Interactive & Multimodal Learning Session", desc: "A live, teacher-led lesson where Vizzy generates images, video, narration, and posters in real time, sent straight to the frame." },
      { name: "Teacher's Live Assistant Session", desc: "Vizzy present with its own avatar during class, responding to teacher cues and generating support material instantly." },
      { name: "Group Learning Session", desc: "Small-group sessions (2–10 students) where Vizzy facilitates collaborative learning and balances participation." },
      { name: "Daily Study Journal Session", desc: "A short, adaptive daily reflection on what was learned, what was hard, and what stood out, evolving with the student over time." },
      { name: "Creative Companion - Create Anything", desc: "One-on-one creative collaboration, poetry, music, stories, art, scripts, even week-long projects, with Vizzy as coach." },
      { name: "Creative Companion & Coach - Whole Class Mode", desc: "The same creative coaching, run for an entire class or shared project." },
      { name: "Evaluation & Mapping Session", desc: "Personalised, AI-guided testing calibrated to the student, teacher-configured feedback timing, and detailed end-of-test analysis." },
    ]
  },
  {
    id: "learning-modes",
    title: "IV. Immersive & Multimodal Learning Modes",
    subtitle: "Turning the classroom itself into a responsive, generative environment.",
    features: [
      { name: "Art Class Mode", desc: "A live creative companion for art class, co-creating and helping students bring ideas to life visually." },
      { name: "Music Class Mode", desc: "Music appreciation and composition, paired with generated visual accompaniment." },
      { name: "Creative Class Mode", desc: "A dedicated space for storytelling, writing, and mixed creative disciplines." },
      { name: "Narrations Mode", desc: "Narrated, immersive audio-visual storytelling for any subject or story." },
      { name: "Storytelling Mode", desc: "Turns lessons and books into visual, unfolding narrative experiences." },
      { name: "Immersive Walls Mode", desc: "Intelligent classroom walls that adapt their entire visual identity to the subject, history, physics, English, or language class, rendered live." },
      { name: "Avatar Mode", desc: "Vizzy appears as a chosen on-screen avatar for live teaching, narration, and storytelling, a genuine presence in the room." },
      { name: "Language Learning Mode", desc: "Full immersion sessions conducted in the target language, reinforced with matching visuals." },
      { name: "Immersive Time & Place Journeys", desc: "First-person immersive experiences into another era or setting, for history, literature, and beyond." },
      { name: "Speak With Historical Figures", desc: "Interactive, in-character conversations with historical figures for deeper, more memorable learning." },
      { name: "Speak With a Book", desc: "Conversational exploration of a text's characters, themes, and ideas, directly with the material itself." },
    ]
  },
  {
    id: "life-skills-feature",
    title: "V. Life Skills & Enrichment",
    subtitle: "Structured course tracking and delivery for classrooms.",
    features: [
      { name: "Life Skills Curriculum (51+ Courses)", desc: "Structured courses across emotional intelligence, creativity, critical thinking, communication, and practical life skills, delivered live and personalised. New courses added every month." },
      { name: "Session Progress Tracking", desc: "Remembers exactly where a class or student left off in any course, resuming naturally." },
      { name: "Teacher Involvement Modes", desc: "Vizzy-Led, Co-Designed, or Teacher-Led options for every Life Skills session." },
    ]
  },
  {
    id: "testing-materials",
    title: "VI. Testing, Study Planning & Materials",
    subtitle: "Personalised assessments, study plans, and multimodal learning tools.",
    features: [
      { name: "Interactive Test Creation", desc: "Personalised, AI-generated assessments across any subject, calibrated to student level." },
      { name: "Personalized Study Plan Creation", desc: "Vizzy builds a study plan tailored to a student's goals, pace, and current strengths and gaps." },
      { name: "Multimodal Study Material Creation", desc: "Generates study guides, visual aids, and practice material combining images, text, and voice." },
    ]
  }
];

export default function SchoolsGeneralInfoPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"curriculum" | "hardware" | "catalogue">("curriculum");
  const [selectedTrack, setSelectedTrack] = useState("All Tracks");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = lifeSkillsCourses.filter((course) => {
    const matchesTrack = selectedTrack === "All Tracks" || course.trackName === selectedTrack;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.whyDeckoviz.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      {/* Soft Ambient Light Glow Effects */}
      <LightGlowOrb color="#ccfbf1" size="850px" top="-200px" left="-200px" opacity={0.5} />
      <LightGlowOrb color="#e0f2fe" size="750px" top="30%" right="-250px" opacity={0.45} />
      <LightGlowOrb color="#d1fae5" size="900px" bottom="5%" left="-300px" opacity={0.5} />

      {/* Subtle Mesh Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #0d9488 1px, transparent 1px), linear-gradient(to bottom, #0d9488 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          1. HEADER & TOP NAVIGATION
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          {/* Universal Go Back Button & Sub Badge */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-teal-800 hover:border-teal-300 text-xs font-semibold shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-teal-600" />
              <span>Go Back</span>
            </button>

            <span className="text-xs text-teal-800 font-bold uppercase tracking-widest bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full shadow-sm">
              Deckoviz For Schools & Universities
            </span>
          </div>

          <SectionEyebrow icon={BookOpen} text="FULL CATALOGUE & CURRICULUM SPECIFICATION" />

          {/* Page Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
            Deckoviz For Schools & Universities:{" "}
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Features, Modes & 51+ Life Skills Curriculum
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-12">
            The complete specification of Vizzy educational agents, multimodal learning modes, specialized classroom hardware, and the structured 51+ course Life Skills Curriculum.
          </p>

          {/* 3 Main View Tabs */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-200/80 border border-slate-300 shadow-inner flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`px-6 py-3 rounded-full text-xs font-extrabold transition-all relative ${
                activeTab === "curriculum"
                  ? "text-white"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {activeTab === "curriculum" && (
                <motion.div
                  layoutId="activeSchoolTab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>51+ Life Skills Curriculum</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("hardware")}
              className={`px-6 py-3 rounded-full text-xs font-extrabold transition-all relative ${
                activeTab === "hardware"
                  ? "text-white"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {activeTab === "hardware" && (
                <motion.div
                  layoutId="activeSchoolTab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span>Classroom Hardware & Sound</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("catalogue")}
              className={`px-6 py-3 rounded-full text-xs font-extrabold transition-all relative ${
                activeTab === "catalogue"
                  ? "text-white"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {activeTab === "catalogue" && (
                <motion.div
                  layoutId="activeSchoolTab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>V1 Complete Feature Catalogue</span>
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TAB 1: 51+ LIFE SKILLS CURRICULUM
         ════════════════════════════════════════════════════════════════ */}
      {activeTab === "curriculum" && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <SectionEyebrow icon={Heart} text="51 STRUCTURED COURSES ACROSS 8 TRACKS" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              The Deckoviz Life Skills Curriculum
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Structured, recurring courses designed for holistic, future-focused education across emotional intelligence, creativity, decision-making, digital wellness, global culture, and invention.
            </p>

            {/* Track Selector & Search Input */}
            <div className="mt-8 space-y-4 max-w-3xl mx-auto">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" />
                <input
                  type="text"
                  placeholder="Search 51 life skills courses..."
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
                {curriculumTracks.map((track) => (
                  <button
                    key={track}
                    onClick={() => setSelectedTrack(track)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedTrack === track
                        ? "bg-teal-600 text-white shadow-md shadow-teal-600/30"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-teal-50"
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
                          {course.trackName}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          {course.length}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {course.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                        {course.description}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-teal-900 block">Why Deckoviz:</span>
                      <p className="leading-relaxed">{course.whyDeckoviz}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
                  No courses found matching &quot;{searchQuery}&quot;.
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          TAB 2: CLASSROOM HARDWARE & SOUND SPECS
         ════════════════════════════════════════════════════════════════ */}
      {activeTab === "hardware" && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative space-y-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <SectionEyebrow icon={Monitor} text="THE HARDWARE & DELIVERY SYSTEM" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Designed Specifically For The Classroom
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Software alone can't deliver an immersive lesson. It needs a display large enough to fill a room, sound rich enough to carry a story, and a system built for the actual school day. That's what Deckoviz hardware is for.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold mb-4 shadow-sm">
                <Monitor className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Sized for the Room</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Classrooms aren't uniform, so the screen shouldn't be either. Smaller displays fit smaller classrooms, larger formats scale up for lecture halls and auditoriums. Every room gets hardware built for its scale, not a one-size-fits-all box mounted on the wall.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold mb-4 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Built for School, at Firmware Level</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every layer of hardware, down to firmware, is designed around how schools actually operate: content guardrails, age-appropriate boundaries, and compliance with school policy built in from the start rather than added as a settings toggle later.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold mb-4 shadow-sm">
                <Layers className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">One Screen, Every Modality</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Visuals, sound, music, and narration all move through the same display, so teachers aren't juggling a projector, a speaker system, and a separate device for every format. One piece of hardware carries the full experience.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold mb-4 shadow-sm">
                <Volume2 className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">16D Immersive Sound (Add-On)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For lessons that need to be felt as much as seen. Historical recreations, narration, music, and sonic storytelling delivered through an add-on 16D immersive sound system, turning a lecture into something closer to an experience than a slideshow.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          TAB 3: COMPLETE V1 FEATURE CATALOGUE
         ════════════════════════════════════════════════════════════════ */}
      {activeTab === "catalogue" && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 relative space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <SectionEyebrow icon={Layers} text="V1 FEATURE CATALOGUE FOR SCHOOLS" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Complete Feature Catalogue For Schools (V1)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Organized for internal reference and school docs across Vizzy Teacher's Assistant, Student Companion, session formats, learning modes, and assessment tools.
            </p>
          </div>

          <div className="space-y-12">
            {catalogueSections.map((section) => (
              <div key={section.id} className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{section.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">{section.subtitle}</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="py-3 px-4 font-extrabold text-slate-900 text-sm w-1/3">
                          Feature / Mode
                        </th>
                        <th className="py-3 px-4 font-extrabold text-slate-900 text-sm">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {section.features.map((feat, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-slate-50/40" : "bg-white"}>
                          <td className="py-3.5 px-4 font-bold text-teal-900">
                            {feat.name}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 leading-relaxed font-normal">
                            {feat.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          BOTTOM CTA & GO BACK
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 text-center">
        <div className="bg-gradient-to-b from-teal-50/60 via-white to-teal-50/40 border border-teal-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 max-w-4xl mx-auto">
          <SectionEyebrow icon={GraduationCap} text="REIMAGINE CLASSROOM LEARNING" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Ready to Bring Deckoviz to Your Classrooms?
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Book a live demo to see Vizzy, the 51+ Life Skills Curriculum, and multimodal learning modes running live.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-9 py-4 rounded-full font-bold text-base bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white shadow-xl shadow-teal-600/25 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-teal-200" />
              <span>Book a Demo</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-9 py-4 rounded-full font-bold text-base bg-white border border-teal-300 text-teal-800 hover:bg-teal-50 hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5 text-teal-700" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
