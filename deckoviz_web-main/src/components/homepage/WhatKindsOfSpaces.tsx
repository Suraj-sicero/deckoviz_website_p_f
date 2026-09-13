import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  GraduationCap,
  Building2,
  Sparkles,
  Heart,
  BookOpen,
  Palette,
  Camera,
  Music,
  Smile,
  Zap,
  Users,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Compass,
  Star,
  Award,
  Globe,
  Feather,
  Clock
} from "lucide-react";

interface PointGroup {
  title: string;
  points: string[];
  icon: React.ElementType;
  gradient: string;
}

interface SpaceData {
  id: "homes" | "schools" | "hotels";
  label: string;
  badge: string;
  icon: React.ElementType;
  accentGradient: string;
  bgGlow: string;
  principlesTitle: string;
  principlesSubtitle: string;
  principles: PointGroup[];
  practiceTitle: string;
  practiceSubtitle: string;
  practice: PointGroup[];
}

const spacesData: SpaceData[] = [
  // ───────────────── HOMES ─────────────────
  {
    id: "homes",
    label: "Homes",
    badge: "Deckoviz for Homes",
    icon: Home,
    accentGradient: "from-indigo-600 via-purple-600 to-blue-600",
    bgGlow: "from-indigo-500/10 via-purple-500/10 to-blue-500/10",
    principlesTitle: "What Kinds of Homes Is Deckoviz For?",
    principlesSubtitle: "Designed for those who want more life in their living spaces, deeper emotional resonance, and walls that co-evolve with family life.",
    principles: [
      {
        title: "You want deeply meaningful art, not just whatever came with the walls.",
        icon: Palette,
        gradient: "from-indigo-600 to-purple-600",
        points: [
          "Choose from tens of thousands of artworks in Deckoviz's global library instead of settling for the same three prints everyone else has.",
          "Go further and create personal pieces with Vizzy, art that reflects your own taste, your own moments, your own aesthetic rather than someone else's idea of what belongs in a living room.",
          "Rotate through styles and moods as often as you like, so the art in your home stops being a one-time decorating decision and becomes something you actually curate."
        ]
      },
      {
        title: "Your home is built on memory and story, and you want that visible.",
        icon: Heart,
        gradient: "from-pink-600 to-rose-600",
        points: [
          "Turn the thousands of photos sitting on your phone into something you and your family actually see, instead of a backlog nobody scrolls through.",
          "Give family history and milestones a real place in the home: the people, the places, the moments that made this family what it is.",
          "Bring grandparents, kids, and everyone in between into the same story, a home that feels like it belongs to more than one generation at once."
        ]
      },
      {
        title: "You want your home to feel different depending on the day, mood, and life.",
        icon: Compass,
        gradient: "from-blue-600 to-cyan-600",
        points: [
          "Set a mood on purpose: calm for a Sunday morning, focused for a work session, warm for guests, instead of leaving the walls to say nothing at all.",
          "Build rituals around it: a morning mode, an evening wind-down, a specific state you want to step into when you walk in the door.",
          "Layer in music and sound alongside the visuals, so the room shifts on more than one sense at a time."
        ]
      },
      {
        title: "You want a home that's alive, personal, attuned, emotionally intelligent and a little bit new every day.",
        icon: Sparkles,
        gradient: "from-violet-600 to-indigo-600",
        points: [
          "Let Vizzy act as a creative companion, not just a display - someone to make something with, not just something to look at.",
          "Give hosting a different edge: a space that feels curated and considered the moment guests walk in, not just tidied up.",
          "Keep the home from ever fully settling into 'finished,' there's always another piece, another mood, another day's version of the space to discover."
        ]
      },
      {
        title: "You want a daily creative practice, not just something to admire on the wall.",
        icon: Feather,
        gradient: "from-emerald-600 to-teal-600",
        points: [
          "Use Vizzy as an actual creative muse: write a poem, sketch an idea, work through a piece together, instead of just browsing a gallery someone else filled.",
          "Build a small daily habit around it, a few minutes of self-expression that compounds over months and decades.",
          "Turn what makes your life into something real and visible, not a note left in a drawer or a photo buried three layers deep on your phone."
        ]
      },
      {
        title: "You want it to fit the actual shape of your life, not just your living room.",
        icon: Home,
        gradient: "from-amber-600 to-orange-600",
        points: [
          "Working from home, and want the room to feel different for a focused Tuesday than it does on a Friday afternoon.",
          "Living alone, and want the space to feel considered and yours.",
          "Sharing your life, you want the most photogenic, or most ridiculous, moments actually to show up somewhere."
        ]
      }
    ],
    practiceTitle: "How Homes Use Deckoviz, in Practice",
    practiceSubtitle: "Real-world rituals, everyday rhythms, and personal wall curation in practice.",
    practice: [
      {
        title: "Choose or create art that's actually yours.",
        icon: Palette,
        gradient: "from-indigo-600 to-purple-600",
        points: [
          "Pick from a massive, constantly expanding global art library instead of the same handful of prints everyone seems to have.",
          "Go further and create personal pieces with Vizzy, art built around your own taste, your own moments, your own aesthetic, not someone else's idea of what belongs on your wall.",
          "Rotate through styles and moods whenever you want, so the art in your home stops being a one-time decorating decision and becomes something you keep curating."
        ]
      },
      {
        title: "Turn memories into art, not backlog.",
        icon: Camera,
        gradient: "from-pink-600 to-rose-600",
        points: [
          "Bring the thousands of photos sitting on your phone into something you and your family actually see, instead of a folder nobody scrolls back through.",
          "Give family milestones and history an actual place in the home, the people, the places, the moments that made this family what it is.",
          "Let multiple generations show up in the same story, a home that feels like it belongs to grandparents and kids alike, not just whoever picked the decor."
        ]
      },
      {
        title: "Set the mood, and let it shift with your day.",
        icon: Clock,
        gradient: "from-blue-600 to-cyan-600",
        points: [
          "Set the room on purpose, calm for a slow morning, focused for a work session, warm for guests, instead of walls that say nothing no matter the hour.",
          "Build small rituals around it, a specific look and feel for winding down at night or starting the day right.",
          "Layer music in alongside the visuals, so the room shifts on more than one sense, sound and sight working together rather than one and not the other."
        ]
      },
      {
        title: "Make it a creative practice, not just a display.",
        icon: Zap,
        gradient: "from-violet-600 to-indigo-600",
        points: [
          "Use Vizzy as an actual creative partner, write a poem, sketch an idea, work through something together, instead of only browsing a gallery someone else filled.",
          "Build a small daily habit around it, a few minutes of self-expression that compounds over weeks, rather than a hobby that never quite starts.",
          "Turn what you make into something real and visible, not a note left in a drawer or buried three thousand photos deep on your phone."
        ]
      },
      {
        title: "Set the scene when you're hosting.",
        icon: Users,
        gradient: "from-amber-600 to-orange-600",
        points: [
          "Match the mood to the actual occasion, a holiday dinner, a game night, a quiet Sunday brunch, instead of a room that looks the same no matter who's coming over.",
          "Give guests something to notice the moment they walk in, a piece, a playlist, a visual that sets the tone for the evening.",
          "Make hosting feel considered without extra effort on the day itself, the space does part of the work for you."
        ]
      }
    ]
  },

  // ───────────────── SCHOOLS ─────────────────
  {
    id: "schools",
    label: "Schools",
    badge: "Deckoviz for Learning Spaces",
    icon: GraduationCap,
    accentGradient: "from-blue-600 via-teal-600 to-emerald-600",
    bgGlow: "from-blue-500/10 via-teal-500/10 to-emerald-500/10",
    principlesTitle: "What Kinds of Schools Is Deckoviz For?",
    principlesSubtitle: "Transforming classrooms and corridors into living canvases of creativity, curriculum immersion, and personalized student growth.",
    principles: [
      {
        title: "You want students' creativity actually seen, not filed away.",
        icon: Sparkles,
        gradient: "from-blue-600 to-teal-600",
        points: [
          "Give student work a real stage beyond the one bulletin board by the office, so more than a fraction of what kids make ever gets seen by anyone.",
          "Let creativity show up as part of the building itself, not just something handed back with a grade and forgotten.",
          "Make the walls reflect the students who actually walk them, not generic posters ordered from a catalog."
        ]
      },
      {
        title: "You want lessons to come alive, not stay stuck on a page.",
        icon: BookOpen,
        gradient: "from-teal-600 to-emerald-600",
        points: [
          "Bring history, art, and ideas into the room visually, so a lesson on ancient Rome or a unit on color theory has something real to look at while it's being taught.",
          "Use Deckoviz's multimodal generation to match what's being taught that week, instead of decor that never changes no matter what's on the curriculum.",
          "Add immersive sound where it helps a lesson land, a narrated moment, an atmosphere, not just images on a screen."
        ]
      },
      {
        title: "You're investing in who each student becomes, not just this semester's grades.",
        icon: Star,
        gradient: "from-indigo-600 to-blue-600",
        points: [
          "Give every student their own Vizzy, a learning companion with context that grows over the years instead of resetting every September.",
          "Let that companion notice patterns, interests, and growth over time, the kind of long-term picture one teacher juggling thirty kids can't fully hold onto alone.",
          "Make personalization the default, not a special accommodation only some students get."
        ]
      },
      {
        title: "You want to support your teachers, not just impress the people touring the building.",
        icon: ShieldCheck,
        gradient: "from-purple-600 to-indigo-600",
        points: [
          "Give teachers a real assistant, one that helps with prep and delivery instead of adding another tool to manage on top of everything else.",
          "Make the building itself say something to a new family walking in for the first time, before a single word is spoken in a tour.",
          "Let the school feel considered and alive rather than institutional, the kind of place that makes a stronger first impression than a clean hallway ever could."
        ]
      },
      {
        title: "You want school and home to feel like one continuous story, not two disconnected worlds.",
        icon: Globe,
        gradient: "from-cyan-600 to-blue-600",
        points: [
          "Give parents a real window into what's actually happening in the classroom, not just a grade report at the end of term.",
          "Let learning continue past the school day, without needing a completely separate app or system to make that happen.",
          "Make the connection feel like a natural part of how the school already communicates, not one more portal for parents to remember to check."
        ]
      },
      {
        title: "You need it to actually work inside a real school, not just look good in a demo.",
        icon: Layers,
        gradient: "from-slate-700 to-slate-900",
        points: [
          "Hardware sized for the room it's actually going in, larger displays for an auditorium, right-sized options for a standard classroom.",
          "Software and firmware built around school guardrails from day one, not bolted on after something goes wrong.",
          "Customization per school, so the platform fits your specific policies, culture, and curriculum instead of a one-size-fits-all rollout."
        ]
      }
    ],
    practiceTitle: "How Schools Use Deckoviz, in Practice",
    practiceSubtitle: "Actionable classroom integration, student showcases, and teacher empowerment in action.",
    practice: [
      {
        title: "Give student work a real stage.",
        icon: Sparkles,
        gradient: "from-blue-600 to-teal-600",
        points: [
          "Show far more student creativity than one bulletin board by the office was ever able to hold.",
          "Let creativity become part of the building itself, not just something handed back with a grade and forgotten in a backpack.",
          "Make the walls reflect the actual students who walk them, not generic posters ordered from a catalog."
        ]
      },
      {
        title: "Bring lessons to life, visually.",
        icon: BookOpen,
        gradient: "from-teal-600 to-emerald-600",
        points: [
          "Use Deckoviz's multimodal generation to match whatever's actually being taught that week, a history unit, a science concept, a piece of literature, instead of decor that never changes no matter the curriculum.",
          "Add immersive sound where it helps a lesson land, a narrated moment, an atmosphere, not just static images on a screen.",
          "Give teachers a way to make an idea visually real in the moment, instead of relying on a textbook illustration to do all the work."
        ]
      },
      {
        title: "Give every student a companion that grows with them.",
        icon: Star,
        gradient: "from-indigo-600 to-blue-600",
        points: [
          "Provide each student their own Vizzy, a learning companion with context that carries forward year to year instead of resetting every September.",
          "Let that companion notice patterns and growth over time, the kind of long-term picture one teacher juggling thirty students can't fully hold onto alone.",
          "Make personalization the default for every student, not a special accommodation reserved for a few."
        ]
      },
      {
        title: "Support teachers, don't just impress visitors.",
        icon: ShieldCheck,
        gradient: "from-purple-600 to-indigo-600",
        points: [
          "Give teachers a real assistant for prep and delivery, instead of one more tool competing for their attention.",
          "Size the hardware to the actual room, larger displays for an auditorium, right-sized options for a standard classroom, so it fits real school infrastructure, not a generic install.",
          "Build in the guardrails and customization schools actually need from day one, matched to your specific policies and curriculum rather than a one-size-fits-all rollout."
        ]
      },
      {
        title: "Connect the classroom to home.",
        icon: Globe,
        gradient: "from-cyan-600 to-blue-600",
        points: [
          "Give parents a genuine window into what's happening in class, not just a grade report at term's end.",
          "Let learning continue past the school day without requiring a whole separate app or login parents have to remember.",
          "Make that connection feel like a natural extension of how the school already communicates, not one more portal competing for attention."
        ]
      }
    ]
  },

  // ───────────────── HOTELS ─────────────────
  {
    id: "hotels",
    label: "Hotels",
    badge: "Deckoviz for Hospitality",
    icon: Building2,
    accentGradient: "from-amber-600 via-orange-600 to-rose-600",
    bgGlow: "from-amber-500/10 via-orange-500/10 to-rose-500/10",
    principlesTitle: "What Kinds of Hotels Is Deckoviz For?",
    principlesSubtitle: "Crafting memorable property identity, in-room personalization, destination storytelling, and sonic luxury.",
    principles: [
      {
        title: "You want your public spaces to say something the moment guests walk in.",
        icon: Building2,
        gradient: "from-amber-600 to-orange-600",
        points: [
          "Choose from a massive, constantly expanding global art library for the lobby, the restaurant, the spa, the corridors, so the whole property feels curated rather than furnished.",
          "Create custom art themed around your brand, your city, or the season, and refresh it for a holiday, an event, or a campaign without touching a wall.",
          "Extend the same visual identity consistently across every public space, so a guest moving from lobby to bar to breakfast room feels one continuous world, not a series of disconnected rooms."
        ]
      },
      {
        title: "Your hotel has a story, a heritage, a place in its city, and you want guests to feel it before they've unpacked.",
        icon: Award,
        gradient: "from-rose-600 to-pink-600",
        points: [
          "Show the history behind the building, the brand, or the destination itself, art and looping visuals that turn a lobby wait into part of the story rather than dead time.",
          "Give returning guests a sense of continuity, a property that clearly knows what it is and where it comes from, not one that could be swapped with any other hotel in the chain.",
          "Let heritage become atmosphere, not a plaque by the elevator that nobody reads."
        ]
      },
      {
        title: "You want every room to feel like it was set up for the person staying in it.",
        icon: Heart,
        gradient: "from-purple-600 to-indigo-600",
        points: [
          "Give each room its own personalized art frame, so what's on the wall reflects the guest, not a fixed print ordered for three hundred identical rooms.",
          "Put Vizzy in the room as a genuine companion, not just a screen, greeting the guest by name, adjusting to how they actually want to spend the stay, business trip, honeymoon, family vacation.",
          "Set the mood and ambiance to match the occasion automatically, quiet and warm for someone arriving late after a long flight, celebratory for an anniversary suite, calm and unhurried for a wellness stay.",
          "Layer sound in alongside the visuals, so the room feels considered on more than one sense, not just decorated.",
          "Make the greeting itself part of the experience, a room that feels like it was expecting them, rather than one they simply unlocked."
        ]
      },
      {
        title: "You want guests to feel your destination, not just occupy a room inside it.",
        icon: Globe,
        gradient: "from-teal-600 to-emerald-600",
        points: [
          "Bring local art, photography, and culture into both the common spaces and the rooms themselves, so the property feels rooted in where it actually is.",
          "Give guests a sense of place before they've left the building, the region's history, its landscape, its character, present the moment they arrive.",
          "Make cultural immersion consistent throughout the stay, not just a mural in the lobby that stops mattering the moment the elevator doors close."
        ]
      },
      {
        title: "You care about the whole stay guests remember, not just the room they slept in.",
        icon: Star,
        gradient: "from-indigo-600 to-blue-600",
        points: [
          "Carry the experience across the entire journey, arrival, room, common spaces, departure, as one considered arc instead of a single strong first impression that fades by day two.",
          "Make event spaces genuinely responsive, a wedding, a conference, a private dinner, each one actually feeling like its own occasion rather than the same ballroom with different chairs.",
          "Build toward the moment a guest tells someone else about the stay, the small, personal, unexpected touch that makes this hotel the one they mention, not just the one they booked."
        ]
      }
    ],
    practiceTitle: "How Hotels Use Deckoviz, in Practice",
    practiceSubtitle: "Operational implementation across public lobbies, guest suites, event ballrooms, and sonic spaces.",
    practice: [
      {
        title: "Choose or create the art that fits every space you have.",
        icon: Palette,
        gradient: "from-amber-600 to-orange-600",
        points: [
          "Pick from a massive, constantly expanding global art library for the lobby, the restaurant, the spa, the corridors, and every room, no more sourcing generic prints in bulk for three hundred identical walls.",
          "Create custom, themed art for your property specifically: your brand, your city, a seasonal campaign, a signature event, so the visual identity actually changes with the calendar instead of staying frozen the day the hotel opened.",
          "Keep one coherent aesthetic running across public spaces and private rooms alike, refined and minimal, warm and heritage-driven, bold and contemporary, whatever your brand is actually going for, so a guest never feels like they've walked into a different hotel between the lobby and their floor."
        ]
      },
      {
        title: "Give every room its own art, its own companion, its own welcome.",
        icon: Smile,
        gradient: "from-rose-600 to-pink-600",
        points: [
          "Put a personalized art frame in each room, reflecting the guest staying there rather than a fixed print ordered for the whole property.",
          "Give each room Vizzy as a real in-room companion, greeting the guest by name and adjusting to why they're actually there, a business trip, a honeymoon, a family vacation, a solo wellness stay.",
          "Set the room's mood automatically for the occasion: quiet and warm for a late arrival after a long flight, celebratory for an anniversary suite, calm and unhurried for a spa weekend.",
          "Layer music into the room alongside the visuals, so the space feels considered the moment the door opens, not just tidied and turned down."
        ]
      },
      {
        title: "Turn event spaces into whatever the occasion actually needs.",
        icon: Layers,
        gradient: "from-purple-600 to-indigo-600",
        points: [
          "Transform a ballroom or private room for a wedding, a conference, or a private dinner, no repainting, no rented decor, no extra labor to hand-build a mood that only lasts one night.",
          "Match the space to the specific energy of the event, romantic and slow for a wedding reception, sharp and energized for a corporate gathering, so it feels designed for that occasion rather than the same room with different linens.",
          "Turn genuinely great guest moments, a wedding first dance, a milestone celebration, into art the property can showcase elsewhere, the hospitality equivalent of a restaurant putting happy customers on the wall."
        ]
      },
      {
        title: "Set the mood with sound, not just sight, everywhere on the property.",
        icon: Music,
        gradient: "from-cyan-600 to-blue-600",
        points: [
          "Choose from a library of hundreds of thousands of tracks to build real sonic atmosphere in the lobby, the bar, the spa, and each individual room, not a single playlist piped through the whole building.",
          "Tune it to the moment: soft and unobtrusive in a spa, warm and social in a bar, calibrated to the guest's own occasion in-room.",
          "Treat sound as seriously as visuals. What envelops a guest acoustically shapes how a stay feels as much as anything on the walls does, and it's usually the most underused lever a property has."
        ]
      },
      {
        title: "Bring the destination into every space, common areas and rooms alike.",
        icon: Globe,
        gradient: "from-teal-600 to-emerald-600",
        points: [
          "Feature local art, photography, and culture throughout the property, so a guest feels genuinely placed in your city, not in an interchangeable box that could be anywhere.",
          "Extend that sense of place into the room itself, not just the lobby, so cultural immersion doesn't stop mattering the moment the elevator doors close.",
          "Let the destination's character carry the guest from arrival to departure, one continuous sense of place instead of a single mural near the front desk."
        ]
      }
    ]
  }
];

export default function WhatKindsOfSpaces() {
  const [activeSpaceId, setActiveSpaceId] = useState<"homes" | "schools" | "hotels">("homes");
  const [viewMode, setViewMode] = useState<"principles" | "practice">("principles");

  const currentSpace = spacesData.find((s) => s.id === activeSpaceId) || spacesData[0];
  const IconComp = currentSpace.icon;

  const currentGroups = viewMode === "principles" ? currentSpace.principles : currentSpace.practice;
  const sectionTitle = viewMode === "principles" ? currentSpace.principlesTitle : currentSpace.practiceTitle;
  const sectionSubtitle = viewMode === "principles" ? currentSpace.principlesSubtitle : currentSpace.practiceSubtitle;

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] via-[#f4f3ff] to-[#eff6ff]">
      {/* Background Soft Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-indigo-300/20 via-purple-300/15 to-blue-300/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-tl from-emerald-300/15 via-teal-300/15 to-indigo-300/20 rounded-full blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP TAB CONTROLS (HOMES / SCHOOLS / HOTELS) */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm text-xs font-bold text-indigo-950 uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Tailored For Every Living Environment</span>
          </div>

          {/* Space Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-full bg-white/60 backdrop-blur-2xl border border-white/90 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_10px_30px_rgba(37,99,235,0.06)] max-w-xl mx-auto mb-8">
            {spacesData.map((space) => {
              const TabIcon = space.icon;
              const isActive = activeSpaceId === space.id;
              return (
                <button
                  key={space.id}
                  onClick={() => setActiveSpaceId(space.id)}
                  className={`flex-1 min-w-[120px] inline-flex items-center justify-center gap-2.5 py-3 px-6 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${space.accentGradient} text-white shadow-md shadow-indigo-600/20 scale-105 border border-white/30`
                      : "text-slate-700 hover:text-indigo-900 hover:bg-white/60"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{space.label}</span>
                </button>
              );
            })}
          </div>

          {/* VIEW MODE TOGGLE (Principles vs In Practice) */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-200/70 border border-white/80 text-xs font-bold shadow-inner">
            <button
              onClick={() => setViewMode("principles")}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                viewMode === "principles"
                  ? "bg-white text-indigo-950 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Core Principles & Purpose
            </button>
            <button
              onClick={() => setViewMode("practice")}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                viewMode === "practice"
                  ? "bg-white text-indigo-950 shadow-sm border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              In Practice & Usage
            </button>
          </div>
        </div>

        {/* DYNAMIC CONTENT BLOCK WITH ANIMATION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSpaceId}-${viewMode}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* SECTION HEADER */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 border border-white/90 shadow-sm text-indigo-900 mb-4`}>
                <IconComp className="w-3.5 h-3.5 text-indigo-600" />
                {currentSpace.badge}
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-slate-900 leading-tight mb-5 font-medium">
                {sectionTitle}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {sectionSubtitle}
              </p>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentGroups.map((group, idx) => {
                const HeaderIcon = group.icon;
                return (
                  <div
                    key={idx}
                    className="group relative rounded-[2.2rem] p-7 sm:p-8 bg-white/65 backdrop-blur-2xl border border-white/90 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_18px_45px_rgba(37,99,235,0.07)] hover:shadow-[inset_0_2.5px_5px_rgba(255,255,255,1),0_28px_65px_rgba(37,99,235,0.16)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Glow Accent */}
                    <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${group.gradient} opacity-5 group-hover:opacity-15 rounded-bl-[100px] transition-opacity duration-500 pointer-events-none`} />

                    <div>
                      {/* Card Header Icon & Badge */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${group.gradient} flex items-center justify-center text-white shadow-md border border-white/80 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shrink-0 p-3`}>
                          <HeaderIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 shadow-sm">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Main Group Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 leading-snug group-hover:text-indigo-900 transition-colors">
                        {group.title}
                      </h3>

                      {/* Points List */}
                      <ul className="space-y-3.5">
                        {group.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            <div className="mt-1 w-4 h-4 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                            </div>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Accent Bar */}
                    <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-indigo-700 transition-colors">
                      <span>{currentSpace.label} Pillar 0{idx + 1}</span>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
