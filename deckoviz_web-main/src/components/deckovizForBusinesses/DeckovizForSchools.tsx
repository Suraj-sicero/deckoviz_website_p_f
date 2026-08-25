import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicImageGrid } from "../other/DynamicImageGrid";
import PartnerProgramSection from "./PartnerProgramSection";
import {
  Sparkles,
  GraduationCap,
  Heart,
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Layers,
  Users,
  BookOpen,
  Clock,
  HelpCircle,
  DollarSign,
  Cpu,
  Monitor,
  PhoneCall,
  ArrowRight,
  Zap,
  Globe,
  MessageSquare,
  Star,
  Check,
  Sliders,
  Volume2,
  Settings,
  Flame,
  LayoutGrid,
  Lock,
  Headphones,
  Compass
} from "lucide-react";

// --- School Showcase Images ---
const schoolImages = [
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_06 PM.png', tag: 'A Wall That Teaches' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_10 PM.png', tag: 'Visual Learning' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_12 PM.png', tag: 'Creative Companion' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_13 PM.png', tag: 'Gallery for Art' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_15 PM.png', tag: 'History Brought to Life' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_16 PM.png', tag: 'Dynamic Environment' },
];

const highlights = [
  { icon: "💡", title: "The Visual Learning Aid Every Classroom Deserves", desc: "Turn any lesson into a living visual. Diagrams, timelines, and concepts rendered beautifully, in real time, right where students are looking." },
  { icon: "🎨", title: "A Creative Companion for Art Class", desc: "Vizzy becomes a co-creator for young artists. Sketch an idea, describe a mood, watch it come alive on screen. Creativity gets a collaborator." },
  { icon: "📌", title: "The Notice Board Reinvented", desc: "Reception areas and common walls, transformed. Schedules, charts, reminders, and announcements, displayed with polish that makes people stop." },
  { icon: "🖼️", title: "A Gallery for Student Art", desc: "Every masterpiece deserves a spotlight. Rotate student artwork through the frame and give young creators the recognition they deserve." },
  { icon: "🏛️", title: "History, Brought to Life", desc: "No more flat timelines. History lessons become immersive visual narratives, students seeing the past instead of just reading about it." },
  { icon: "📐", title: "Math, Made Visual", desc: "Abstract concepts turned into stunning, interactive visuals generated in real time. Numbers start being understandable." },
  { icon: "🤖", title: "Personalised Learning Plans, On Autopilot", desc: "Vizzy tracks progress and tailors visual learning material to each student. A personal learning assistant for every teacher." },
  { icon: "🏆", title: "Your Walls, Telling Your Story", desc: "Mission statements, school legacy, and achievements, displayed dynamically instead of stuck in a static frame." },
  { icon: "🔬", title: "University Research, Visualised", desc: "Turn dense research and data into compelling visual stories for departments, labs, and open days. Make complex work instantly understandable." },
  { icon: "🗺️", title: "Campus Wayfinding and Event Boards", desc: "Lecture changes, campus events, and wayfinding, displayed dynamically across buildings. No more laminated A4 sheets taped to doors." },
  { icon: "📽️", title: "Lecture Halls That Feel Alive", desc: "University lectures get a visual upgrade. Complex theories and case studies, rendered as real-time visual material that holds attention." },
  { icon: "🎓", title: "Alumni and Legacy Walls", desc: "Celebrate your institution's history, and its graduates with a dynamic wall of achievement. Living heritage, not a dusty plaque." },
];

const benefits = [
  {
    title: "Bring Learning Off the Page",
    desc: "The more visual and immersive learning gets, the deeper it sticks. Deckoviz turns textbook content into experiences students actually remember."
  },
  {
    title: "Unlock Creativity in Every Student",
    desc: "Creativity isn't a subject, it's a skill for life, one of the most foundational ones in the age of AI. Deckoviz gives every student a canvas and a companion to bring their ideas out of their heads and onto the wall."
  },
  {
    title: "A Learning Assistant for Every Teacher",
    desc: "Vizzy creates visual material, narrations, and tailored content in real time. Teachers get a teaching partner who never clocks out, who pays infinite attention, helping the teacher deliver ever more engaging lessons."
  },
  {
    title: "Future-Proof Your Institution",
    desc: "Multi-sensory, immersive learning is where education is heading. Deckoviz gets you there today, not in five years."
  },
  {
    title: "Make School Genuinely Fun",
    desc: "Fun and rigor aren't opposites. Deckoviz makes classrooms, corridors, and common areas feel like places students want to be."
  },
  {
    title: "Context-Aware, Genuinely Personal",
    desc: "Because Vizzy holds context on all students over time, it becomes an increasingly sharp, increasingly useful assistant for every teacher on staff."
  },
  {
    title: "Develop the Most Important Skill of Tomorrow",
    desc: "Creativity is the skill that survives automation. Deckoviz makes cultivating it part of the daily environment, not an extracurricular afterthought."
  },
  {
    title: "Retire the Static Noticeboard for Good",
    desc: "Swap out laminated paper and thumbtacks for something dynamic, adaptive, and genuinely worth looking at."
  },
  {
    title: "Elevate Institutional Prestige",
    desc: "For serious schools & universities, first impressions matter enormously. A Deckoviz-equipped campus signals innovation before a single word is spoken."
  },
  {
    title: "Strengthen Admissions and Campus Tours",
    desc: "Prospective students and parents remember experiences, not brochures. Give your open days a moment that actually lands."
  }
];

const fits = [
  "Exam schedules, displayed clearly and updated instantly",
  "Staff rooms with mood-setting, calming visual environments",
  "Science labs visualising experiments and data in real time",
  "Language classes with immersive cultural visuals",
  "Cafeteria and canteen walls with rotating, appetising visual themes",
  "Library reading corners with mood-matched literary visuals",
  "Mindfulness and quiet corners with calming generative art",
  "Graduation ceremony backdrops and highlight reels",
  "Career fairs with dynamic company and pathway displays",
  "Parent-teacher meeting waiting areas with a polished first impression",
  "Dormitory and residence hall common rooms",
  "Research poster and thesis defense displays",
  "Guided campus tour visual storytelling",
  "Esports and gaming society spaces",
  "Sports team walls celebrating wins and milestones",
  "Alumni reunion and fundraising event backdrops",
  "Seasonal and festival decor across common areas",
  "Open day and orientation week welcome walls"
];

// --- COMPLETE FEATURE DIRECTORY DATA ---
const featureDirectory = {
  teacherAssistant: [
    { title: "Lesson Content Creator", desc: "Generates visual, text, video, or narrated material for any lesson topic on demand." },
    { title: "Adaptive Study Plan Builder", desc: "Builds individualised or small-group study plans that respond to real, ongoing student progress." },
    { title: "Interactive Assessment Designer", desc: "Creates evaluations beyond standard written tests - verbal, visual, project-based formats." },
    { title: "Differentiated Worksheet Generator", desc: "The same topic, generated at multiple levels of complexity simultaneously." },
    { title: "Smart Content Organiser", desc: "A natural-language searchable library of everything a teacher has created or uploaded." },
    { title: "Progress Analytics Dashboard", desc: "Class-wide view of who's excelling, who's struggling, and by which topic." },
    { title: "Substitute Teacher Briefing Agent", desc: "Briefs a cover teacher on exactly where a class left off." },
    { title: "Marking & Feedback Assistant", desc: "Supports grading and generates constructive, specific feedback for student work." },
    { title: "Lesson Planning Companion", desc: "Helps structure a full lesson or unit, sequencing content and pacing." },
    { title: "Curriculum Mapping Assistant", desc: "Links generated material directly to specific syllabus points and standards." },
    { title: "Parent Communication Drafting Tool", desc: "Helps draft clear, warm progress updates and communications for parents." },
    { title: "Classroom Management Advisor", desc: "Offers strategies and content suited to specific classroom dynamics or challenges." },
    { title: "Professional Development Companion", desc: "Surfaces teaching techniques, research, and ideas relevant to a teacher's subject and style." }
  ],
  studentCompanion: [
    { title: "Socratic Tutor", desc: "Engages students through guided questioning rather than direct answers, building genuine understanding." },
    { title: "Struggle Detection & Support Agent", desc: "Notices when a student is stuck and offers scaffolded help, not shortcuts." },
    { title: "Personal Progress Companion", desc: "Tracks and reflects a student's growth back to them, visually and non-judgementally." },
    { title: "Passion & Interest Discovery Agent", desc: "Notices what genuinely excites a specific child over time and helps nurture it." },
    { title: "Motivation & Encouragement Agent", desc: "Nudges and celebrates progress in a way calibrated to the individual child." },
    { title: "Revision & Exam Prep Companion", desc: "Builds targeted, adaptive revision plans ahead of assessments." },
    { title: "Homework Companion Mode", desc: "Socratic-style support for independent work, designed against dependency." },
    { title: "Concept Re-Explainer", desc: "Generates alternative explanations or visual metaphors when the first one hasn't landed." },
    { title: "Reading Companion", desc: "Supports comprehension and engagement with assigned or independent reading." },
    { title: "Goal-Setting & Reflection Agent", desc: "Helps students set, track, and reflect on their own learning goals over time." }
  ],
  sessionTypes: [
    { title: "Interactive & Multimodal Learning Session", desc: "Combined image, video, narration, and text delivered together for a single concept or lesson." },
    { title: "Teacher's Live Assistant Session", desc: "Real-time support for a teacher during an active lesson - generating material or answering a need on the spot." },
    { title: "Group Learning Session", desc: "A shared, collaborative session for a small group working on the same material together." },
    { title: "Daily Study Journal Session", desc: "A reflective daily or weekly log of what a student learned, explored, or found challenging." },
    { title: "Creative Companion - Create Anything", desc: "An open-ended creative session for art, writing, music, or any student-led creative work." },
    { title: "Creative Companion & Coach - Whole Class Mode", desc: "A shared creative session facilitated across an entire class simultaneously." },
    { title: "Evaluation & Mapping Session", desc: "A structured session for assessing a student's current understanding and mapping next steps." },
    { title: "Student Learning Space", desc: "A persistent, personal digital environment for each student's ongoing work, reflections, and creations." }
  ],
  subjectModes: [
    { title: "Art Class Mode", desc: "A dedicated creative environment for visual art instruction and co-creation." },
    { title: "Music Class Mode", desc: "A dedicated environment for music instruction, composition, and co-creation." },
    { title: "Creative Class Mode", desc: "A broader creative environment spanning multiple creative disciplines together." },
    { title: "Language Learning Mode", desc: "Immersive visual and conversational environments for language acquisition, with pronunciation and conversational practice." },
    { title: "Narrations Mode", desc: "Narrated content delivery for any subject, using AI voice, a teacher's own recorded voice, or character voices." },
    { title: "Speak With & Learn From Historical Figures", desc: "Live, generative dialogue with historically grounded figures relevant to the curriculum." },
    { title: "Speak With a Book", desc: "Conversational engagement directly with the content, characters, and ideas of a specific text." },
    { title: "Immersive Time & Space Journeys", desc: "Full immersive environments transporting a class into a historical period, literary world, or scientific context." }
  ],
  generationTools: [
    { title: "Multimodal Generation Engine", desc: "The underlying capability generating image, video, voice, avatar, and text content across the platform." },
    { title: "Interactive & Personalised Test Creation", desc: "Assessments generated dynamically, matched to individual or class needs." },
    { title: "Personalised Study Plan Creation", desc: "Individualised plans generated and adapted based on real student progress." },
    { title: "Multimodal Study Material Creation", desc: "Any material - visual, text, video, or narrated - generated on demand for any topic." },
    { title: "Avatar Mode", desc: "Vizzy appears as a chosen visual avatar for live teaching, narration, storytelling, or lesson delivery." }
  ],
  gamesAndSkills: [
    { title: "Learning Games Modes", desc: "A growing library of educational games spanning subjects and age groups." },
    { title: "Life Skills Modes & Experiences (51+)", desc: "A dedicated library of experiences building skills beyond the academic curriculum - resilience, empathy, focus, collaboration, self-awareness, and more." }
  ],
  personalisationMemory: [
    { title: "Student Deep Personalisation", desc: "Vizzy grows continuously with each student, adapting to their learning style, pace, and needs across their entire schooling journey." },
    { title: "Teacher Personalisation", desc: "Vizzy adapts to each teacher's individual style, growing to complement and support how they specifically teach." }
  ],
  accessOrganisation: [
    { title: "Smart Access Library", desc: "A fully searchable, natural-language-accessible library of all materials, past sessions, and generated content across the school." }
  ]
};

// --- COMPLETE COMPREHENSIVE FAQ DATA ---
const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "What exactly is Deckoviz for Schools?",
        a: "An AI-powered platform that gives every teacher a personal teaching assistant and every student a personal learning companion, while making classroom spaces themselves adaptive to whatever's being taught. It runs on Deckoviz hardware - a smart display unit - combined with Vizzy, our education-specific AI."
      },
      {
        q: "Is this a replacement for teachers?",
        a: "No. Deckoviz is built explicitly to support and extend what a teacher can do, not replace them - handling content creation, progress tracking at a scale no single person can manage alone, and personalisation, while leaving the human relationship, judgement, and mentorship entirely with the teacher."
      },
      {
        q: "Does this work for all age groups?",
        a: "Yes - the platform adapts its complexity, tone, and content to the age and stage of the student, from early years through to secondary and beyond."
      }
    ]
  },
  {
    category: "Setup & Technical",
    questions: [
      {
        q: "What do we need to get started?",
        a: "A stable network connection per unit, wall-mounting or stand placement for each display, and an initial setup session with our team to configure school, teacher, and student accounts."
      },
      {
        q: "How long does installation and onboarding take?",
        a: "Hardware installation is typically completed within days. Full teacher onboarding and confident classroom use is usually reached within the first two weeks, with our team actively supporting that ramp-up."
      },
      {
        q: "Can we start with just a few classrooms before rolling out school-wide?",
        a: "Yes - many schools begin with a pilot in one department or year group and expand once they've seen it in action."
      }
    ]
  },
  {
    category: "AI, Safety & Data",
    questions: [
      {
        q: "How do you prevent students from becoming dependent on AI or using it to avoid genuine learning?",
        a: "This is one of our most important design priorities. Vizzy is built to act as a companion when a student is stuck, not a shortcut that completes work for them - with built-in detection for answer-seeking behaviour and a design philosophy that treats unblocking a student's own thinking as the goal, not doing the thinking for them."
      },
      {
        q: "What data do you collect on students, and how is it protected?",
        a: "Student data is used specifically to power personalisation and progress tracking within the platform, handled under strict data protection and privacy compliance, with parental consent flows where required. We're happy to walk your data protection officer through our full data handling policy directly."
      },
      {
        q: "Do teachers have oversight of what Vizzy generates or assesses?",
        a: "Yes - AI-generated assessments and material can be routed through teacher review and approval, according to your school's own policies."
      }
    ]
  },
  {
    category: "Subscription & Credits",
    questions: [
      {
        q: "How does the credit system work?",
        a: "Every generative action - image, video, voice/narration, avatar, or text-based generation - draws from your school's credit pool. Your tier determines your available credits; heavier usage (video, avatar-based experiences) draws more than lighter usage (posters, text-based study plans)."
      },
      {
        q: "What happens if we run out of credits?",
        a: "You can upgrade to a higher tier at any point to increase your available credits - this can typically be handled quickly without disrupting your existing setup."
      },
      {
        q: "Is pricing based on the whole school or per classroom?",
        a: "Pricing is per-seat, based on the number of students and teachers actively using the platform - so a pilot in one department costs proportionally less than a full school-wide rollout. Our team will build the exact structure with you on a call."
      }
    ]
  },
  {
    category: "Customisation",
    questions: [
      {
        q: "Can Vizzy be trained on our specific teaching philosophy?",
        a: "Yes - we offer custom Vizzy training built around your school's specific educational approach and values, so the AI reflects how your school already believes education should work, rather than a generic model."
      },
      {
        q: "Can we get custom-branded or custom-designed frames?",
        a: "Yes - frame design, material, and finish can be customised to your school's identity."
      },
      {
        q: "Can we request features that aren't currently on the platform?",
        a: "Yes - we build in direct conjunction with the schools we work with, and genuine feature requests are often shippable within days."
      }
    ]
  },
  {
    category: "Pedagogy & Learning Outcomes",
    questions: [
      {
        q: "Will this actually improve academic outcomes, or is it just engagement?",
        a: "Both are genuinely intended outcomes, and they're connected - engagement is a precondition for learning, not a separate goal. The platform is built to increase genuine time-on-task, deepen conceptual understanding through visualisation, and catch struggling students earlier, all of which are established drivers of academic outcomes, not just novelty."
      },
      {
        q: "How does Vizzy know if a student actually understands something versus just getting the right answer?",
        a: "Vizzy tracks patterns over time, not single data points - how a student engages with a concept, where they hesitate, whether they can apply an idea in a different context, not just whether one answer was correct. This is part of why continuous, cross-year memory matters so much to how the platform actually assesses understanding."
      },
      {
        q: "Does this work for students with additional learning needs or different learning styles?",
        a: "Yes - deep personalisation is core to the platform's design, meaning pace, format, and approach can all be adapted per student. Specific accommodations should be discussed directly with our team so we can confirm fit for your particular context and any statutory requirements you need to meet."
      },
      {
        q: "How does this fit with our existing curriculum and exam board requirements?",
        a: "Deckoviz is designed to support and enrich existing curriculum delivery, not replace it - content generation and immersive experiences are built around what's actually being taught, mapped to your syllabus. We'll walk through your specific curriculum and exam board alignment during onboarding."
      }
    ]
  },
  {
    category: "Teacher Adoption",
    questions: [
      {
        q: "What if some of our teachers aren't comfortable with new technology?",
        a: "The interface is fully conversational - teachers interact with Vizzy in natural language, not a complex dashboard. Our onboarding includes hands-on sessions specifically designed to build confidence quickly, and our team stays involved well beyond the first call to support teachers who need more time."
      },
      {
        q: "Does this add to teacher workload, at least initially?",
        a: "There's a short initial learning curve, like any new tool, but the platform is explicitly built to reduce ongoing workload - instant content creation, automated organisation, and progress tracking that would otherwise take hours of manual effort. Most teachers find the platform nets out as significant time saved within the first few weeks."
      },
      {
        q: "Can teachers opt out of certain features they're not comfortable using?",
        a: "Yes - teachers can use as much or as little of the platform's capability as suits their style and comfort level. Nothing is forced; the assistant adapts to how a teacher wants to work, not the other way around."
      }
    ]
  },
  {
    category: "Technical & Infrastructure",
    questions: [
      {
        q: "What internet/network requirements does each unit have?",
        a: "A stable broadband connection per unit is required for generative features and live functionality. We'll confirm exact bandwidth recommendations for your specific setup during technical onboarding."
      },
      {
        q: "What happens if our internet goes down?",
        a: "Previously generated and cached content remains viewable without connectivity; live generation and real-time features require an active connection. Our team can advise on offline-resilience options for your specific infrastructure."
      },
      {
        q: "Do you integrate with our existing school management system (SIMS, etc.)?",
        a: "Integration capability varies by system - this is worth raising directly with our team so we can confirm compatibility with whatever platform your school currently uses."
      },
      {
        q: "Who's responsible for hardware maintenance and support?",
        a: "Deckoviz hardware comes with standard warranty coverage, and our support team handles technical troubleshooting. Specifics on maintenance responsibilities are covered in your service agreement."
      }
    ]
  },
  {
    category: "Safeguarding & Governance",
    questions: [
      {
        q: "Who has access to student data within our school?",
        a: "Access is role-based and configurable by your school admin - teachers typically see their own students' data; broader access can be restricted to designated safeguarding or admin leads, per your policies."
      },
      {
        q: "Can parents see their child's progress or interactions with Vizzy?",
        a: "A parent-facing progress summary can be enabled where your school chooses to offer it - simplified and jargon-free, without exposing full raw interaction data."
      },
      {
        q: "What content moderation exists for younger students?",
        a: "Age-appropriate content filtering is applied per grade band, and generation guardrails are calibrated to what's appropriate for the age group using the platform."
      },
      {
        q: "Is this compliant with UK GDPR / relevant data protection regulation in our region?",
        a: "Yes - we maintain compliance with relevant data protection regulations, and we're glad to have a direct conversation with your data protection officer or equivalent to walk through specifics for your jurisdiction."
      }
    ]
  },
  {
    category: "Commercial & Procurement",
    questions: [
      {
        q: "Do you offer a pilot or trial period before a full commitment?",
        a: "Many schools begin with a pilot in one department or year group specifically to evaluate fit before a wider rollout - this is something to structure directly with our team."
      },
      {
        q: "What's the typical contract length?",
        a: "Contract terms are discussed directly with our team based on your school's procurement process and preferences."
      },
      {
        q: "Do you work with school budgets/procurement cycles, including multi-year funding commitments?",
        a: "Yes - we're used to working within standard school procurement timelines and can structure commercial terms around your budget cycle."
      },
      {
        q: "Is there support for schools seeking grant funding or external financing for this kind of technology investment?",
        a: "We're happy to discuss this directly - including pointing to relevant funding routes where we're aware of them, and our Sponsorship Program for schools where cost is the primary barrier."
      }
    ]
  }
];

const DeckovizSchoolsLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [openFaqCategory, setOpenFaqCategory] = useState<string>("General");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [activeFeatureTab, setActiveFeatureTab] = useState<string>("teacherAssistant");

  return (
    <div className="bg-[#0A0A0B] min-h-screen text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* ── 1. Immersive Hero ── */}
      <div className="relative pt-32 pb-20 overflow-hidden lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-blue-600/20 via-indigo-500/10 to-transparent blur-[40px] animate-[floatLeft_6s_ease-in-out_infinite]" />
          <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/15 via-indigo-400/10 to-transparent blur-[50px] animate-[floatCenter_8s_ease-in-out_infinite]" />
          <div className="absolute top-1/2 left-0 w-3/5 h-1/2 bg-gradient-to-r from-blue-500/10 via-indigo-400/5 to-transparent blur-[60px] animate-[floatBottom_10s_ease-in-out_infinite]" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/20 via-indigo-400/10 to-transparent blur-[50px] animate-[floatRight_7s_ease-in-out_infinite]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-semibold text-sm tracking-wide mb-6 shadow-sm backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            Deckoviz for Schools, Universities & Learning Centres
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-tight font-serif">
            Welcome to the Future of <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 text-transparent bg-clip-text">Learning Centres</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            Picture this. <br className="hidden md:block"/><br className="hidden md:block"/>
            <strong className="text-white drop-shadow-md">A wall that teaches.</strong> <br className="hidden md:block"/><br className="hidden md:block"/>
            <strong className="text-white drop-shadow-md">A frame that listens.</strong> <br className="hidden md:block"/><br className="hidden md:block"/>
            A space that grows <strong className="text-blue-300">smarter every single day</strong>, right alongside your students, instilling their learning with more <strong className="text-blue-300">excitement and deeper engagement</strong>, helping them become more <strong className="text-blue-300">creative</strong>, and shaping their learning in ways that will stick, for the best learning is the kind where you are <strong className="text-white">having fun while exploring new landscapes</strong>.
            <br className="mb-4" />
            That's the <strong className="text-blue-400">Deckoviz GeDiPort / GAVPort</strong>, the learning companion for your classrooms.
            <br className="mb-4" />
            A living, learning surface for the next generation of learning centres.
          </p>

          {/* Quick Sub-Navigation Bar */}
          <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto mt-8 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl">
            {[
              { id: "overview", label: "Classroom Vision", icon: <Sparkles className="w-4 h-4" /> },
              { id: "sponsorship", label: "Sponsorship Program", icon: <Heart className="w-4 h-4 text-pink-400" /> },
              { id: "hardware", label: "Setup & Hardware", icon: <Monitor className="w-4 h-4 text-cyan-400" /> },
              { id: "pricing", label: "Subscription & Pricing", icon: <DollarSign className="w-4 h-4 text-emerald-400" /> },
              { id: "directory", label: "Feature Directory", icon: <LayoutGrid className="w-4 h-4 text-indigo-400" /> },
              { id: "faq", label: "Comprehensive FAQ", icon: <HelpCircle className="w-4 h-4 text-amber-400" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Dynamic Image Grid ── */}
      <div className="relative z-20 pb-16">
        <DynamicImageGrid 
          imageSources={schoolImages}
          sectionTitle="Classrooms Reimagined"
          sectionDescription="Visuals that adapt. Learning that feels less like a lecture and more like a conversation."
        />
      </div>

      {/* ── 2. The Longer Story ── */}
      <section id="overview" className="py-24 bg-[#08101a] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white mb-6">Something is about to break in education.<br/><span className="text-blue-400">In a good way.</span></h2>
          </motion.div>
          <motion.div 
            className="prose prose-lg prose-indigo mx-auto text-gray-400 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl leading-relaxed cursor-default hover:text-white transition-colors duration-300">
              By 2027, the kids sitting in your classrooms will have grown up <strong className="text-blue-300">talking to AI</strong> the way past generations grew up talking to search engines. <br/><br/>
              They'll expect <strong className="text-white">content that responds to them</strong>. Visuals that adapt. Learning that feels less like a lecture and more like a <strong className="text-white">conversation</strong>.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-white transition-colors duration-300">
              And then they'll walk into class and open a textbook.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-white transition-colors duration-300">
              <strong className="text-white">Think about the gap.</strong> These are kids who can generate a video, remix a song, or get a <strong className="text-blue-300">personalised answer</strong> to any question in seconds. <br/><br/>
              Then they sit down for history and get a photocopied worksheet. They sit down for art and get a box of pastels and a bell that rings in forty minutes. <br/><br/>
              The <strong className="text-blue-400">tools they use to learn</strong> haven't caught up to the tools they use to live.
            </p>
            <motion.p 
              className="text-xl leading-relaxed font-medium text-white border-l-4 border-blue-500 pl-6 my-8"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              That gap doesn't close on its own. It has to be built.
            </motion.p>
            <p className="text-xl leading-relaxed cursor-default hover:text-white transition-colors duration-300">
              Classrooms built for the age of AI won't look like classrooms built for the age of chalk. <br/><br/>
              They'll be <strong className="text-white">visual, responsive, and alive</strong>, generating material in real time instead of reheating the same slides year after year. <br/><br/>
              The schools that make this shift early won't just teach better. They'll feel like they belong to the world their students are actually growing up in.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-white transition-colors duration-300">
              Every learning space has walls. <strong className="text-white">Most of them are wasted.</strong> <br/><br/>
              Faded posters. Outdated timetables. A notice board nobody's updated since last term. <br/><br/>
              Meanwhile, the kids on the other side of those walls are growing up on TikTok, YouTube, and interactive everything. The gap between how they learn and how your walls look has never been wider. 
              <strong className="text-blue-300"> Deckoviz closes these gaps - gaps that can prevent students from reaching their fullest potential.</strong>
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-white transition-colors duration-300">
              It's an <strong className="text-blue-400">AI-powered Dynamic Art and Storytelling Portal</strong>, running Vizzy, your always-on creative and learning companion. <br/><br/>
              Point it at a history lesson and it becomes a <strong className="text-white">storyteller</strong>. <br/>
              Point it at art class and it becomes a <strong className="text-white">canvas</strong>. <br/>
              Point it at your reception and it becomes the most <strong className="text-white">compelling first impression</strong> your school has ever made.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-white transition-colors duration-300 font-medium">
              The DASPort helps teach, inspire, and remember, in ways that keep getting better with every class, every student, every day.
              <br/><br/>
              This is what a 2027 learning environment is supposed to feel like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3. 12 Key Highlights & Use Cases ── */}
      <section className="py-24 bg-[#0A0A0B]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-300 font-bold tracking-wider uppercase text-sm">Possibilities</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold font-serif text-white">12 Key Highlights & Use Cases</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 relative overflow-hidden group/card hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:-translate-y-2 hover:border-[#2563EB]/40 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="text-4xl mb-6 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05)] w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#182A4A] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="group-hover:grayscale brightness-200 group-hover:drop-shadow-md transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Core Benefits ── */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.15),_transparent_40%),_radial-gradient(circle_at_top_right,_rgba(24,42,74,0.3),_transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <motion.div 
              className="col-span-1 lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">Core Benefits</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Develop the most important skill of tomorrow. Creativity is the skill that survives automation. Deckoviz makes cultivating it part of the daily environment, not an extracurricular afterthought.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </motion.div>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx} 
                  className="relative group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-blue-400 font-bold text-sm group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    {idx + 1}
                  </div>
                  <div className="pl-12 group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 18 More Ways Deckoviz Fits Your Space ── */}
      <section className="relative py-32 bg-[#050b14] overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">18 More Ways Deckoviz Fits Your Space</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {fits.map((fit, idx) => (
            <motion.div 
              key={idx} 
              className="relative group px-6 py-3.5 bg-white/5 border border-white/10 rounded-full text-gray-300 font-medium hover:bg-white/10 hover:border-blue-500/50 hover:text-white hover:-translate-y-1 transition-all duration-300 text-sm md:text-base backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (Math.min(idx, 15)) * 0.05 }}
            >
              <div className="relative z-10 flex items-center gap-2">
                <span className="text-yellow-400">✨</span> 
                <span>{fit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════════
          NEW PAGE 1: THE SPONSORSHIP PROGRAM
          ════════════════════════════════════════════════════════════════════════════ */}
      <section id="sponsorship" className="py-28 relative bg-gradient-to-b from-[#0A0A0B] via-[#0D1527] to-[#0A0A0B] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.15),_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header Badge & Title */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-bold text-sm tracking-wider uppercase mb-6 shadow-lg shadow-pink-500/10">
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
              The Sponsorship Program
            </span>
            <h2 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6 leading-tight">
              Bringing the Future of Learning to Every Classroom - <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-indigo-400 text-transparent bg-clip-text">Not Just the Ones That Can Afford It</span>
            </h2>
          </div>

          {/* Block 1: WHAT IS DECKOVIZ FOR SCHOOLS? */}
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl pointer-events-none" />
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-pink-400 mb-6 flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-pink-400" />
              WHAT IS DECKOVIZ FOR SCHOOLS?
            </h3>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
              Deckoviz GeDiPort is an AI-powered learning platform that turns classroom walls into living, adaptive learning surfaces - and gives every teacher and every student their own dedicated AI companion, designed specifically for education. It brings AI-powered, personalised, immersive, interactive, experiential learning to every classroom in your school.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-300 font-bold text-lg mb-4">
                  1
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Every Student Gets a Personal Learning Companion</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  One that genuinely grows with them, from one grade to the next, holding deep, continuous context about how they learn, where they struggle, and what excites them. Not a new tool every September. The same companion, growing up alongside the child, across their entire schooling journey.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-lg mb-4">
                  2
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Every Teacher Gets a Personal Teaching Assistant</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  One that adapts to their specific teaching style, and can create, curate, and display any material they need, instantly and in any format: visual, text, video, or narrated. It builds adaptive study plans, flags struggling students before a gap becomes a real problem, and takes an enormous amount of manual content-creation work off a teacher's plate.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold text-lg mb-4">
                  3
                </div>
                <h4 className="text-lg font-bold text-white mb-3">The Room Itself Becomes Part of the Curriculum</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  And the class becomes interactive, immersive, and fun. A physics lesson doesn't just get taught - the whole space becomes physics, visually and atmospherically. History, English, chemistry, art - each one transforms the room into something that reflects exactly what's being learned, generated fresh, every single day.
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: WHY THIS IS AN ABSOLUTE REVOLUTION IN EDUCATION */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-white text-center mb-12">
              WHY THIS IS AN <span className="text-blue-400">ABSOLUTE REVOLUTION</span> IN EDUCATION
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "It solves education's oldest structural problem",
                  desc: "No teacher, however brilliant, can hold the complete learning profile of thirty different children in their head - how each one learns, where each one is stuck, what each one needs, every day, across every subject. This has never been a failure of teachers. It's a limit on human attention. Deckoviz removes that limit."
                },
                {
                  title: "It makes the impossible-to-teach genuinely visible",
                  desc: "Physics, chemistry, and maths have always been hardest not because of intelligence required, but because of abstraction - a force nobody can see, a molecule nobody can touch. Deckoviz brings these concepts off the page and onto the wall, in motion, at a scale no textbook ever could offer. For the students who have always struggled with abstraction, this is very often the first time a concept genuinely clicks."
                },
                {
                  title: "It personalises learning at a level previously impossible at scale",
                  desc: "The child who needs more time gets more time. The child who's ready to move faster gets material that keeps pace with their curiosity. The same platform, genuinely different for every child - instead of the same cookie-cutter pace applied to an entire classroom regardless of who's actually in it."
                },
                {
                  title: "It remembers",
                  desc: "Because Vizzy has effectively unbounded memory, its understanding of a child accumulates across their entire time in school - not reset every year, not lost when they move up a grade. A companion that actually grows up alongside a child is something no classroom in the history of education has ever had access to before."
                },
                {
                  title: "It makes learning fun",
                  desc: "And we believe that's half the entire problem in education solved. Kids thrive on novelty. Classrooms that look and feel different every day, subjects that come alive rather than sit flat on a page, creative co-creation with an AI that helps a child find their own imagination - this is what makes a child actually love learning, rather than endure it."
                },
                {
                  title: "It's built with real guardrails",
                  desc: "We take the question of AI dependency in education extremely seriously. Vizzy is designed to be a companion for the struggle, not a shortcut around it - sparking curiosity and unblocking effort, never replacing a child's own thinking."
                }
              ].map((rev, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center mb-5">
                    0{idx + 1}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 font-serif">{rev.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{rev.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 3: WHY THE SPONSORSHIP PROGRAM */}
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900/80 border border-indigo-500/30 mb-20 shadow-2xl relative">
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
              WHY THE <span className="text-pink-400">SPONSORSHIP PROGRAM</span>
            </h3>
            <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
              <p>
                Here's the uncomfortable truth about almost every genuine leap forward in education technology: it reaches wealthy schools first, and it often stays there.
              </p>
              <p>
                The schools that can afford to pilot new technology are, disproportionately, the schools that already have the smallest classes, the most resourced teachers, and the least urgent need for something like this. Meanwhile, the schools where a personal learning companion for every child would matter most - where classes are large, where teachers are stretched thinnest, where the gap between a struggling student and the support they need is widest - are almost always the schools that can least afford to be early adopters of anything.
              </p>
              <p className="font-semibold text-white text-xl border-l-4 border-pink-500 pl-4 py-1">
                We built the Deckoviz for Schools Sponsorship Program to break that pattern deliberately.
              </p>
              <p>
                The program exists to bring the full platform - the classroom portal, the personal AI companion for every student, the personal teaching assistant for every teacher - into schools that would never otherwise have access to it. Not a stripped-down version but the real thing, sponsored, so that the schools and the students who stand to gain the most from this are never the ones left waiting.
              </p>
              <p>
                We're inviting individuals, families, and businesses who believe in this mission to sponsor a classroom, a school, or a program of schools - and to be part of bringing this directly to the children who need it most.
              </p>
            </div>
          </div>

          {/* Block 4: WHY THIS IS THE MOST MEANINGFUL GIFT YOU CAN GIVE A CHILD */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-pink-400 font-bold uppercase tracking-widest text-sm">Transformative Impact</span>
              <h3 className="text-3xl md:text-5xl font-bold font-serif text-white mt-2">
                WHY THIS IS THE MOST MEANINGFUL GIFT YOU CAN GIVE A CHILD
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "You are not giving a child a single moment of joy",
                  desc: "You are giving them a companion for their entire education. A Deckoviz sponsorship doesn't fund a single lesson, a single term, a single school year. It funds a relationship - a learning companion that will grow with that specific child from the grade they're in now through to the day they leave school - and even beyond - understanding them more deeply with every year that passes."
                },
                {
                  title: "You are giving a struggling child the thing they may never have had: to be truly seen",
                  desc: "In an overcrowded classroom, the child who's quietly falling behind is often the child a teacher, however caring, simply doesn't have the bandwidth to catch in time. This sponsorship gives that child a system built specifically to notice, to flag, to adapt - before that gap becomes something they carry with them for the rest of their education."
                },
                {
                  title: "You are giving a gifted child room to actually fly",
                  desc: "The child who's bored, coasting, capable of so much more than a uniform curriculum lets them reach for - this sponsorship gives them material that moves at the pace of their own curiosity, instead of waiting for a room to catch up."
                },
                {
                  title: "You are giving every child in that classroom the chance to fall in love with learning itself",
                  desc: "Not compliance with school, but an actual, felt love of learning - the kind that shapes a life, a career, a sense of who someone becomes. We believe, without exaggeration, that this is one of the most valuable things it is possible to give a child."
                },
                {
                  title: "And you are doing it at the exact moment it matters most",
                  desc: "Childhood education is not a cause you can retroactively fund. The window in which a child's relationship with learning gets formed is narrow, and it closes. A sponsorship today reaches a child inside that window - not after it, when the shape of their relationship with school has already been set."
                },
                {
                  title: "This is not charity in the sense of relief from hardship",
                  desc: "It is investment in a child's entire relationship with their own mind - their curiosity, their creativity, their resilience, their sense of what they're capable of. We can think of very few gifts that offer more lasting, more compounding, more genuinely transformative value than that."
                }
              ].map((gift, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-pink-500/40 transition-all flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-300 font-bold flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 font-serif">{gift.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{gift.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Block 5: HOW TO GET INVOLVED CTA */}
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient-circle_at_center,_rgba(255,255,255,0.2),_transparent_70%]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-bold font-serif text-white mb-6">
                HOW TO GET INVOLVED
              </h3>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                We're looking for individuals, families, and organisations who want to sponsor a classroom, a full school, or a program across several schools - bringing Deckoviz GAVPort to students and teachers who would otherwise never have access to it.
              </p>
              <p className="text-base text-blue-200 mb-10">
                If this resonates with you, we'd love to talk - about which schools are ready, what a sponsorship actually funds, and how you can be part of bringing this to the children who need it most.
              </p>
              <button
                onClick={() => window.location.href = "/contact"}
                className="px-10 py-5 rounded-full bg-white text-blue-900 font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:scale-105 inline-flex items-center gap-3"
              >
                <span>Deckoviz Space Labs - Sponsor a School</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════════
          NEW PAGE 2: GENERAL INFORMATION, SETUP, SUBSCRIPTION & PRICING
          ════════════════════════════════════════════════════════════════════════════ */}
      
      {/* ── GETTING STARTED WITH DECKOVIZ ── */}
      <section className="py-24 bg-[#0A0A0B] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">Implementation & Practicalities</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mt-3 mb-6">
              GETTING STARTED WITH DECKOVIZ FOR SCHOOLS
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Deckoviz GAVPort brings AI-powered, personalised, immersive, interactive, experiential learning to every classroom in your school - a personal teaching assistant for every teacher, a personal learning companion for every student, and a space that adapts to whatever's being taught.
            </p>
            <p className="text-base text-gray-400 leading-relaxed mb-8">
              This page covers the practical details: how setup works, subscription structure, hardware options, and answers to the questions we hear most from schools.
            </p>
            <div className="p-6 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-blue-200 inline-block text-sm md:text-base">
              For a live demo, a walkthrough tailored to your school, and precise pricing, <button onClick={() => window.location.href='/contact'} className="underline font-bold text-white hover:text-blue-300">get in touch with our team</button> - pricing and subscription specifics are shared directly on a call, not published here, so we can build a plan that actually fits your school's size and needs.
            </div>
          </div>

          {/* HARDWARE OPTIONS */}
          <div id="hardware" className="pt-12 mb-24">
            <div className="text-center mb-12">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Physical Experience</span>
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mt-2">HARDWARE OPTIONS</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { size: '43"', fit: 'smaller classrooms, offices, staff rooms' },
                { size: '55"', fit: 'standard classrooms' },
                { size: '65"', fit: 'larger classrooms, common areas' },
                { size: '75"', fit: 'libraries, assembly spaces, science labs' },
                { size: '85"', fit: 'halls, larger communal areas' },
                { size: '95"', fit: 'auditoriums, main reception, flagship installations' }
              ].map((hw, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-2xl flex items-center justify-center flex-shrink-0 font-serif">
                    {hw.size}
                  </div>
                  <div>
                    <div className="text-xs uppercase text-cyan-400 font-bold tracking-wider mb-1">Display Size</div>
                    <div className="text-white font-medium text-base">{hw.fit}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3 font-serif">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  Custom Frame Options
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Frame design, materials, colour, and finish can be customised to match your school's identity, branding, or the character of a specific space - from a science lab to a school library to a main reception area.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3 font-serif">
                  <Volume2 className="w-5 h-5 text-indigo-400" />
                  Sound Capabilities
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  An optional 16D immersive sound system is available as an add-on - recommended for spaces where narrated experiences, historical figure dialogues, ambient soundscapes, or multisensory immersion will be used most (libraries, humanities classrooms, assembly halls).
                </p>
              </div>
            </div>
          </div>

          {/* HOW SCHOOLS TYPICALLY SET IT UP */}
          <div className="mb-24 p-10 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-6">
              HOW SCHOOLS TYPICALLY SET IT UP
            </h3>
            <p className="text-gray-300 text-base mb-8">
              There's no single required configuration - Deckoviz is built to flex around your school's layout and budget - but our recommended starting setup for schools getting the most out of the platform is:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-bold text-blue-300 mb-2">1. One unit per classroom</h4>
                <p className="text-gray-300 text-sm">Enabling subject-adaptive theming and full teacher/student companion functionality in every regular lesson.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-bold text-indigo-300 mb-2">2. Additional units in specialist spaces</h4>
                <p className="text-gray-300 text-sm">Art rooms, science labs, and music rooms, where immersive and creative capabilities are used most intensively.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-bold text-purple-300 mb-2">3. A unit in the library</h4>
                <p className="text-gray-300 text-sm">Ideal for storytelling, book visualisation, and quieter immersive/narrative experiences.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-lg font-bold text-cyan-300 mb-2">4. A unit in common areas or reception</h4>
                <p className="text-gray-300 text-sm">For school-wide announcements, culture and values display, event content, and first impressions for visitors and prospective families.</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm italic">
              Schools can start smaller - a single classroom or department as a pilot - and expand from there. Our team will help you sequence this based on budget, priority subjects, and where you expect to see the fastest impact.
            </p>
          </div>

          {/* SUBSCRIPTION & PRICING TABLE SECTION */}
          <div id="pricing" className="pt-8 mb-24">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Transparent Structure</span>
              <h3 className="text-3xl md:text-5xl font-bold font-serif text-white mt-2 mb-4">
                SUBSCRIPTION & PRICING
              </h3>
              <p className="text-gray-300 text-base">
                Deckoviz for Schools is priced on a per-seat subscription, combined with a credit-based compute allowance for generative features. You choose how many student and teacher seats to activate, and select a tier based on expected usage. Hardware is priced separately from the subscription.
              </p>
            </div>

            {/* High Level Mechanics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
              {[
                { title: "Per-seat pricing", desc: "Subscription scales with active student/teacher profiles so cost tracks actual usage and school size." },
                { title: "Credit-based compute", desc: "Generative actions (image, video, voice, avatar, text) draw from a shared monthly credit pool." },
                { title: "Tiered plans", desc: "Select a tier based on expected usage; upgrade at any point without restructuring accounts." },
                { title: "Flexible scaling", desc: "As your school expands from pilot to school-wide, subscription scales effortlessly alongside." }
              ].map((mech, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-bold text-emerald-300 mb-2 font-serif">{mech.title}</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">{mech.desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing Tiers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { tier: "Pilot", best: "A single department, year group, or classroom trial", students: "Up to 30", teachers: "Up to 5", credits: "15,000", price: "[Contact us]" },
                { tier: "Growth", best: "A full year group or multiple departments", students: "Up to 150", teachers: "Up to 20", credits: "75,000", price: "[Contact us]", popular: true },
                { tier: "School-Wide", best: "Full-school rollout, primary or secondary", students: "Up to 600", teachers: "Up to 60", credits: "300,000", price: "[Contact us]" },
                { tier: "Multi-Site", best: "School groups, academy trusts, multiple campuses", students: "Custom", teachers: "Custom", credits: "Custom", price: "[Contact us]" }
              ].map((t, idx) => (
                <div key={idx} className={`p-8 rounded-3xl bg-white/5 border relative flex flex-col justify-between ${t.popular ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 bg-emerald-950/20' : 'border-white/10'}`}>
                  {t.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2 font-serif">{t.tier}</h4>
                    <p className="text-gray-400 text-xs mb-6 min-h-[36px]">{t.best}</p>
                    <div className="space-y-3 mb-8 border-t border-b border-white/10 py-6 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Student Seats:</span>
                        <strong className="text-white">{t.students}</strong>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Teacher Seats:</span>
                        <strong className="text-white">{t.teachers}</strong>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Monthly Credits*:</span>
                        <strong className="text-emerald-400">{t.credits}</strong>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.href = "/contact"}
                    className={`w-full py-3 rounded-full font-bold text-sm transition-all ${
                      t.popular
                        ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {t.price} - Book Demo
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mb-12 max-w-4xl mx-auto text-center italic">
              *Monthly credits are a pooled allowance shared across all active seats on your account. Unused credits do not currently roll over month to month; ask your account representative about annual pooling options for multi-term or seasonal usage patterns.
            </p>

            {/* Inclusions per Tier */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 mb-16">
              <h4 className="text-xl font-bold text-white mb-6 font-serif">WHAT'S INCLUDED IN SUBSCRIPTION TIERS</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">All tiers include:</h5>
                  <ul className="space-y-2.5 text-xs text-gray-300">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Full access to Vizzy - Teacher's Assistant and Student Learning Companion</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Subject-adaptive room theming</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Smart content library and organisation</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Real-time progress tracking and reporting</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Standard onboarding and support</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">Growth tier and above additionally include:</h5>
                  <ul className="space-y-2.5 text-xs text-gray-300">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> Multi-classroom/department content sharing and coordination</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> Extended progress analytics and reporting depth</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /> Priority support response times</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-4">School-Wide & Multi-Site additionally include:</h5>
                  <ul className="space-y-2.5 text-xs text-gray-300">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Custom-trained Vizzy on your school's educational philosophy</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Dedicated account management</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Custom hardware and frame options</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> White-glove, hands-on onboarding across the full rollout</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Credit Usage Relative Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h4 className="text-xl font-bold text-white mb-6 font-serif">CREDIT USAGE - WHAT DRAWS FROM ALLOWANCE</h4>
                <div className="space-y-4 text-sm">
                  {[
                    { action: "Text/conversation (Q&A, tutoring, feedback)", cost: "Low" },
                    { action: "Image generation (art, diagrams, posters)", cost: "Low-Medium" },
                    { action: "Voice/narration generation", cost: "Medium" },
                    { action: "Video generation", cost: "Medium-High" },
                    { action: "Avatar-mode live sessions", cost: "High" }
                  ].map((c, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-300">{c.action}</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">{c.cost}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-6 italic">
                  Viewing existing content, browsing the library, and standard dashboard use do not consume credits - only new generation does.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-6 font-serif">UPGRADING & FLEXIBILITY</h4>
                  <ul className="space-y-4 text-sm text-gray-300">
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Upgrade at any time:</strong> Move to a higher tier as usage grows, without disrupting existing rosters, Vizzy profiles, or content history.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Start small, scale up:</strong> Most schools begin with a Pilot or Growth tier in one department before expanding school-wide.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">No penalty for growth:</strong> Upgrading is designed to be fast and low-friction, typically actioned within days.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 text-xs text-gray-400">
                  Hardware is priced separately. Volume discounts and financing options provided directly on call.
                </div>
              </div>
            </div>

            {/* How Our Team Works With You */}
            <div className="p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30">
              <h4 className="text-2xl font-bold text-white mb-6 font-serif">HOW OUR TEAM WORKS WITH YOU</h4>
              <p className="text-gray-300 text-sm mb-8">
                Getting the most out of Deckoviz isn't a single onboarding call, and then you're on your own. Our team stays actively involved through the first several weeks of your rollout, and beyond:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Pre-installation planning", desc: "Helping you decide which rooms get units first, what sizes make sense per space, and how to sequence a rollout if starting with a pilot." },
                  { title: "Installation & technical setup", desc: "Hardware installation, network configuration, and account setup handled directly with your IT team." },
                  { title: "Teacher onboarding sessions", desc: "Hands-on walkthroughs for teaching staff, not just a manual to read." },
                  { title: "Custom Vizzy training support", desc: "Helping configure Vizzy around your school's specific educational philosophy and teaching approach." },
                  { title: "Weekly / bi-weekly check-ins", desc: "During the first month, making sure teachers are using the platform confidently and troubleshooting." },
                  { title: "Direct feature request channel", desc: "If there's something specific your school needs, our team can often turn requests around within days." },
                  { title: "Ongoing account support", desc: "A continued point of contact well beyond the initial rollout, not a one-time implementation that goes quiet." }
                ].map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h5 className="text-base font-bold text-blue-300 mb-2">{step.title}</h5>
                    <p className="text-gray-300 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── COMPLETE FEATURE DIRECTORY SECTION ── */}
          <div id="directory" className="pt-8 mb-24">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Exhaustive Capability</span>
              <h3 className="text-3xl md:text-5xl font-bold font-serif text-white mt-2 mb-4">
                COMPLETE FEATURE DIRECTORY
              </h3>
              <p className="text-gray-300 text-sm">
                Organized list - for internal use and for sharing with schools. New modes, tools, and experiences are added monthly.
              </p>

              {/* Directory Category Selector Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {[
                  { id: "teacherAssistant", label: "Teacher's Assistant" },
                  { id: "studentCompanion", label: "Student Companion" },
                  { id: "sessionTypes", label: "Session Types & Modes" },
                  { id: "subjectModes", label: "Subject & Immersion Modes" },
                  { id: "generationTools", label: "Generation & Creation" },
                  { id: "gamesAndSkills", label: "Games & Life Skills" },
                  { id: "personalisationMemory", label: "Personalisation & Memory" },
                  { id: "accessOrganisation", label: "Access & Organisation" }
                ].map((fTab) => (
                  <button
                    key={fTab.id}
                    onClick={() => setActiveFeatureTab(fTab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeFeatureTab === fTab.id
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {fTab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featureDirectory[activeFeatureTab as keyof typeof featureDirectory] || []).map((feat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/40 transition-all hover:-translate-y-1">
                  <h4 className="text-lg font-bold text-white mb-2 font-serif flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                    {feat.title}
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── FREQUENTLY ASKED QUESTIONS & EXTENDED FAQ ── */}
          <div id="faq" className="pt-8 mb-20">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Clarity & Governance</span>
              <h3 className="text-3xl md:text-5xl font-bold font-serif text-white mt-2 mb-4">
                FREQUENTLY ASKED QUESTIONS
              </h3>
              <p className="text-gray-300 text-sm">
                Everything you need to know about pedagogy, technical setup, safeguarding, data privacy, and commercial terms.
              </p>

              {/* FAQ Category Pills */}
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setOpenFaqCategory(cat.category);
                      setExpandedFaqIndex(0);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      openFaqCategory === cat.category
                        ? "bg-amber-500 text-slate-950 shadow-lg font-bold"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List - Expand on Hover */}
            <div className="max-w-4xl mx-auto space-y-4">
              {(faqData.find(c => c.category === openFaqCategory)?.questions || []).map((faq, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setExpandedFaqIndex(idx)}
                    onMouseLeave={() => setExpandedFaqIndex(null)}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                      isExpanded
                        ? "bg-white/10 border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.15)] -translate-y-1"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="w-full p-6 text-left font-bold text-white text-base md:text-lg flex justify-between items-center gap-4">
                      <span className={`transition-colors duration-300 ${isExpanded ? "text-amber-300" : "text-white"}`}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-amber-400 transition-transform duration-300 shrink-0 ${
                          isExpanded ? "rotate-180 scale-110" : ""
                        }`}
                      />
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/10 pt-4 bg-black/20">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── 5.5. Education Partner Program Section ── */}
      <PartnerProgramSection />

      {/* ── 6. The Bottom Line (CTA) ── */}
      <section className="py-32 relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-blue-100/50 -z-10" />
        <motion.div 
          className="max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-8">The Bottom Line</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed font-medium cursor-default">
            Your students are growing up in a world where learning is about to be transformed dramatically. Your walls shouldn't be the one place learning stands still.
            <br/><br/>
            Deckoviz turns every classroom, corridor, and common area into a space that teaches, inspires, and evolves. It's infrastructure for how learning happens next.
            <br/><br/>
            The schools and universities that adopt this now won't just look different. They'll feel different, shaping an environment that brings the joy of learning alive for every student who walks through the door. And they’ll help shape confident kids who are ready and excited for tomorrow’s challenges and possibilities.
          </p>
          <motion.button 
            onClick={() => window.location.href='/contact'} 
            className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-white/10 hover:from-blue-500 hover:to-indigo-500 rounded-full font-bold text-lg hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-[#182A4A]/20 flex items-center justify-center mx-auto gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Bring your learning centre into the future today. Book a demo with our team.
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
};

export default DeckovizSchoolsLanding;
