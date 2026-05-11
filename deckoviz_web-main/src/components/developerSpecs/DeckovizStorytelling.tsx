"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion } from "framer-motion";
import { 
  Moon, Wind, Home, BookOpen, Clock, Sparkles, 
  ArrowRight, Code, Terminal, Zap, Palette, Sun,
  Compass, Sliders, Cloud, Users, FileText, Newspaper, Shield, Folder, MessageSquare, Lock, PenTool, Scale, Heart, Square
} from "lucide-react";

const tools = [
  {
    title: "The Nightly Ritual",
    category: "Mood-Setting / Evening / State Transition",
    description: "A fully designed ceremonial wind-down experience guiding your nervous system from activated to settled.",
    route: "/deckoviz-storytelling/nightly-ritual",
    icon: <Moon size={24} className="text-amber-400" />,
    color: "from-amber-500/20 to-purple-900/20",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "The Morning Architecture",
    category: "Mood-Setting / Morning / State Activation",
    description: "A designed entry point to build the cognitive and emotional conditions for a good day.",
    route: "/deckoviz-storytelling/morning-architecture",
    icon: <Sun size={24} className="text-yellow-400" />,
    color: "from-yellow-500/20 to-orange-900/20",
    borderColor: "group-hover:border-yellow-500/50"
  },
  {
    title: "The Story Seed",
    category: "Creative / Storytelling / Generative Narrative",
    description: "A daily creative writing ignition system that works by giving you the conditions in which stories spontaneously arise.",
    route: "/deckoviz-storytelling/story-seed",
    icon: <BookOpen size={24} className="text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-900/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "Deep Focus Field",
    category: "State-Setting / Focus / Cognitive Environment",
    description: "A scientifically informed visual environment designed to hold you in a state of sustained, low-distraction attention.",
    route: "/deckoviz-storytelling/deep-focus-field",
    icon: <Compass size={24} className="text-blue-400" />,
    color: "from-blue-500/20 to-indigo-900/20",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    title: "The Correspondence Room",
    category: "Creative / Storytelling / Epistolary",
    description: "A writing environment that creates the conditions for the particular quality of thought that emerges when you write a letter.",
    route: "/deckoviz-storytelling/correspondence-room",
    icon: <Home size={24} className="text-amber-400" />,
    color: "from-amber-500/20 to-orange-900/20",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "Mythology Engine",
    category: "Creative / Storytelling / Generative Myth",
    description: "A tool for generating original myths in the structural tradition of the great mythological systems.",
    route: "/deckoviz-storytelling/mythology-engine",
    icon: <Zap size={24} className="text-purple-400" />,
    color: "from-purple-500/20 to-indigo-900/20",
    borderColor: "group-hover:border-purple-500/50"
  },
  {
    title: "The Memory Palace Builder",
    category: "Creative / Cognitive / Spatial Memory",
    description: "A guided, visually rich environment in which you construct a personal memory palace room by room.",
    route: "/deckoviz-storytelling/memory-palace-builder",
    icon: <Palette size={24} className="text-rose-400" />,
    color: "from-rose-500/20 to-pink-900/20",
    borderColor: "group-hover:border-rose-500/50"
  },
  {
    title: "Parallel Lives",
    category: "Storytelling / Reflective / Speculative Fiction",
    description: "A reflective storytelling experience that takes a real decision from your past and constructs a detailed account of how your life might have unfolded if you had chosen differently.",
    route: "/deckoviz-storytelling/parallel-lives",
    icon: <Clock size={24} className="text-violet-400" />,
    color: "from-violet-500/20 to-indigo-900/20",
    borderColor: "group-hover:border-violet-500/50"
  },
  {
    title: "The Unsent Letter Archive",
    category: "Creative / Emotional / Therapeutic Storytelling",
    description: "A dedicated space for writing real unsent letters in all their particular weight and clarity, with a ritual sealing gesture.",
    route: "/deckoviz-storytelling/unsent-letter-archive",
    icon: <Wind size={24} className="text-stone-400" />,
    color: "from-stone-500/20 to-gray-900/20",
    borderColor: "group-hover:border-stone-500/50"
  },
  {
    title: "The World-Builder's Table",
    category: "Creative / Storytelling / Generative World Design",
    description: "A structured, visually beautiful environment designed specifically for the practice of world-building.",
    route: "/deckoviz-storytelling/world-builders-table",
    icon: <Sliders size={24} className="text-orange-400" />,
    color: "from-orange-500/20 to-amber-900/20",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    title: "Emotional Weather Report",
    category: "Mood-Setting / Self-Awareness / Daily Ritual",
    description: "A daily practice of emotional meteorology assessing your current emotional conditions using meteorological vocabulary.",
    route: "/deckoviz-storytelling/emotional-weather-report",
    icon: <Cloud size={24} className="text-sky-400" />,
    color: "from-sky-500/20 to-blue-900/20",
    borderColor: "group-hover:border-sky-500/50"
  },
  {
    title: "The Ancestor Table",
    category: "Storytelling / Reflective / Biographical",
    description: "A storytelling and reflection experience that begins to recover and honour what can be known, imagined, and felt about the people whose survival made yours possible.",
    route: "/deckoviz-storytelling/ancestor-table",
    icon: <Users size={24} className="text-stone-400" />,
    color: "from-stone-500/20 to-amber-900/20",
    borderColor: "group-hover:border-stone-500/50"
  },
  {
    title: "The Scenario Room",
    category: "Creative / Strategic Thinking / Speculative",
    description: "A guided, visually immersive strategic thinking environment helping you construct three fully detailed scenarios for how a situation might unfold.",
    route: "/deckoviz-storytelling/scenario-room",
    icon: <Sparkles size={24} className="text-gray-400" />,
    color: "from-gray-500/20 to-slate-900/20",
    borderColor: "group-hover:border-gray-500/50"
  },
  {
    title: "Last Words",
    category: "Storytelling / Reflective / Mortality",
    description: "A contemplative storytelling experience built around recorded final utterances and the practice of imagining your own.",
    route: "/deckoviz-storytelling/last-words",
    icon: <Moon size={24} className="text-gray-500" />,
    color: "from-gray-700/20 to-stone-900/20",
    borderColor: "group-hover:border-gray-500/50"
  },
  {
    title: "The Threshold",
    category: "Mood-Setting / State Transition / Ritual",
    description: "A versatile, customisable transition ritual for any threshold a person identifies as significant.",
    route: "/deckoviz-storytelling/the-threshold",
    icon: <Compass size={24} className="text-teal-400" />,
    color: "from-teal-500/20 to-emerald-900/20",
    borderColor: "group-hover:border-teal-500/50"
  },
  {
    title: "The Thousand-Year Question",
    category: "Storytelling / Intellectual / Philosophical Reflection",
    description: "Presents one perennial philosophical question each day for slow, spacious reflection, with optional historical voices.",
    route: "/deckoviz-storytelling/thousand-year-question",
    icon: <BookOpen size={24} className="text-indigo-400" />,
    color: "from-indigo-500/20 to-purple-900/20",
    borderColor: "group-hover:border-indigo-500/50"
  },
  {
    title: "The Character Witness",
    category: "Creative / Storytelling / Biographical Fiction",
    description: "Generates a portrait of you as a literary character, written by an imagined author who is deeply sympathetic but entirely clear-eyed.",
    route: "/deckoviz-storytelling/character-witness",
    icon: <Users size={24} className="text-amber-400" />,
    color: "from-amber-500/20 to-orange-900/20",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "The Rehearsal",
    category: "Creative / State-Setting / Preparation",
    description: "A guided preparation environment for any significant upcoming situation, helping you explore it from multiple angles and run soft simulations.",
    route: "/deckoviz-storytelling/the-rehearsal",
    icon: <Sliders size={24} className="text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-900/20",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "The Permission Slip",
    category: "Mood-Setting / Psychological / Self-Compassion",
    description: "A practice built around granting yourself explicit permission to do or feel something you've been waiting for, generated as a designed certificate.",
    route: "/deckoviz-storytelling/permission-slip",
    icon: <FileText size={24} className="text-amber-400" />,
    color: "from-amber-500/10 to-stone-900/30",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "The Living Manifesto",
    category: "Creative / Storytelling / Identity",
    description: "A guided process for writing your own manifesto - a declaration of what you believe, what you refuse, and what you are building.",
    route: "/deckoviz-storytelling/living-manifesto",
    icon: <Zap size={24} className="text-red-500" />,
    color: "from-red-500/10 to-stone-900/30",
    borderColor: "group-hover:border-red-500/50"
  },
  {
    title: "The Deathbed Editor",
    category: "Storytelling / Reflective / Life Narrative",
    description: "Generates a response written from the perspective of your ninety-year-old self looking back at your current life situation.",
    route: "/deckoviz-storytelling/deathbed-editor",
    icon: <Clock size={24} className="text-stone-400" />,
    color: "from-stone-500/10 to-zinc-900/30",
    borderColor: "group-hover:border-stone-500/50"
  },
  {
    title: "The Cartography of Longing",
    category: "Storytelling / Emotional / Poetic Mapping",
    description: "Translates the feeling of longing into a beautifully detailed visual map of your internal landscape using the conventions of old explorers' cartography.",
    route: "/deckoviz-storytelling/cartography-of-longing",
    icon: <Compass size={24} className="text-amber-600" />,
    color: "from-amber-600/10 to-stone-900/30",
    borderColor: "group-hover:border-amber-600/50"
  },
  {
    title: "The Inheritance",
    category: "Storytelling / Reflective / Intergenerational",
    description: "A guided process of naming and tracing the likely inheritance of unfinished emotional business, wounds, and gifts from your ancestors.",
    route: "/deckoviz-storytelling/the-inheritance",
    icon: <Users size={24} className="text-stone-400" />,
    color: "from-stone-500/10 to-amber-900/30",
    borderColor: "group-hover:border-stone-500/50"
  },
  {
    title: "Slow News",
    category: "Mood-Setting / Attention / Information Ritual",
    description: "A radical alternative information ritual delivering exactly three news items per day with full contextual briefing and no feed or engagement mechanics.",
    route: "/deckoviz-storytelling/slow-news",
    icon: <Newspaper size={24} className="text-blue-400" />,
    color: "from-blue-500/10 to-slate-900/30",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    title: "The Courage Inventory",
    category: "Mood-Setting / Psychological / Pre-Action Ritual",
    description: "A guided practice of remembering and documenting acts of courage to produce accurate self-knowledge and provide a resource for future challenges.",
    route: "/deckoviz-storytelling/courage-inventory",
    icon: <Shield size={24} className="text-orange-400" />,
    color: "from-orange-500/10 to-red-900/30",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    title: "The Unfinished Business Bureau",
    category: "Creative / Psychological / Resolution Practice",
    description: "A formal process for identifying, categorising, and resolving the things you're carrying with 'bureaucratic seriousness' to create productive distance.",
    route: "/deckoviz-storytelling/unfinished-business-bureau",
    icon: <Folder size={24} className="text-slate-400" />,
    color: "from-slate-500/10 to-stone-900/30",
    borderColor: "group-hover:border-slate-500/50"
  },
  {
    title: "The Sacred Ordinary",
    category: "Mood-Setting / Attention / Contemplative Practice",
    description: "A guided attention practice using ordinary objects in your environment to lead you through progressively deeper levels of presence.",
    route: "/deckoviz-storytelling/the-sacred-ordinary",
    icon: <Sun size={24} className="text-yellow-400" />,
    color: "from-yellow-500/10 to-stone-900/30",
    borderColor: "group-hover:border-yellow-500/50"
  },
  {
    title: "The Gratitude Archaeologist",
    category: "Mood-Setting / Psychological / Daily Practice",
    description: "Excavates the less obvious strata of good in your life through unusual prompts across 12 layers, moving away from rote 'three things' practice.",
    route: "/deckoviz-storytelling/gratitude-archaeologist",
    icon: <Compass size={24} className="text-lime-400" />,
    color: "from-lime-500/10 to-stone-900/30",
    borderColor: "group-hover:border-lime-500/50"
  },
  {
    title: "The Honest Eulogy",
    category: "Storytelling / Reflective / Identity",
    description: "A private practice of writing the eulogy you would actually want - a true account of who you were and what you actually valued.",
    route: "/deckoviz-storytelling/honest-eulogy",
    icon: <FileText size={24} className="text-stone-400" />,
    color: "from-stone-500/10 to-zinc-900/30",
    borderColor: "group-hover:border-stone-500/50"
  },
  {
    title: "The Conversation You've Been Avoiding",
    category: "Storytelling / Psychological / Relational Courage",
    description: "A guided excavation to help you understand the real reason you are avoiding a specific difficult conversation and prepare for it.",
    route: "/deckoviz-storytelling/avoided-conversation",
    icon: <MessageSquare size={24} className="text-rose-400" />,
    color: "from-rose-500/10 to-stone-900/30",
    borderColor: "group-hover:border-rose-500/50"
  },
  {
    title: "Time Capsule Studio",
    category: "Creative / Storytelling / Temporal",
    description: "A guided process for creating a time capsule of genuine interiority across six chambers, date-locked and inaccessible until the designated opening.",
    route: "/deckoviz-storytelling/time-capsule-studio",
    icon: <Lock size={24} className="text-violet-400" />,
    color: "from-violet-500/10 to-stone-900/30",
    borderColor: "group-hover:border-violet-500/50"
  },
  {
    title: "The Second Draft",
    category: "Creative / Storytelling / Narrative Reframing",
    description: "Helps you rewrite the story of a period in your life, reframing the same events to find a narrative that is most true rather than most habitual.",
    route: "/deckoviz-storytelling/the-second-draft",
    icon: <PenTool size={24} className="text-emerald-400" />,
    color: "from-emerald-500/10 to-stone-900/30",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "The Loving Adversary",
    category: "Creative / Intellectual / Steel-Manning Practice",
    description: "A practice of steel-manning: taking a position you disagree with and constructing the strongest, most honest version of it to test your own views.",
    route: "/deckoviz-storytelling/loving-adversary",
    icon: <Scale size={24} className="text-amber-400" />,
    color: "from-amber-500/10 to-stone-900/30",
    borderColor: "group-hover:border-amber-500/50"
  },
  {
    title: "The Inner Council",
    category: "Creative / Psychological / Parts Work",
    description: "A structured process for meeting, mapping, and negotiating with the distinct sub-personalities (parts) of yourself using a visual council chamber.",
    route: "/deckoviz-storytelling/inner-council",
    icon: <Users size={24} className="text-purple-400" />,
    color: "from-purple-500/10 to-stone-900/30",
    borderColor: "group-hover:border-purple-500/50"
  },
  {
    title: "The Last Good Day",
    category: "Storytelling / Gratitude / Present Tense Living",
    description: "A practice of anticipatory attention: identifying finite good things in your life to ensure they receive the quality of attention they deserve.",
    route: "/deckoviz-storytelling/last-good-day",
    icon: <Heart size={24} className="text-orange-400" />,
    color: "from-orange-500/10 to-stone-900/30",
    borderColor: "group-hover:border-orange-500/50"
  },
  {
    title: "The Forgiveness Lab",
    category: "Psychological / Emotional / Resolution Practice",
    description: "A structured, honest process for exploring forgiveness as a possible act of self-liberation, without condoning or forgetting.",
    route: "/deckoviz-storytelling/forgiveness-lab",
    icon: <Zap size={24} className="text-teal-400" />,
    color: "from-teal-500/10 to-stone-900/30",
    borderColor: "group-hover:border-teal-500/50"
  },
  {
    title: "The Fear Cartographer",
    category: "Psychological / Storytelling / Courageous Living",
    description: "A systematic process of mapping your actual fear landscape across 6 domains, creating a topographic navigation tool and a graduated exposure framework.",
    route: "/deckoviz-storytelling/fear-cartographer",
    icon: <Compass size={24} className="text-red-400" />,
    color: "from-red-500/10 to-stone-900/30",
    borderColor: "group-hover:border-red-500/50"
  },
  {
    title: "Letters to the Unknown Self",
    category: "Storytelling / Creative / Temporal Self-Relationship",
    description: "A practice of correspondence with your own unwitnessed selves - past, future, parallel, or in others' memories.",
    route: "/deckoviz-storytelling/letters-to-unknown-self",
    icon: <FileText size={24} className="text-stone-400" />,
    color: "from-stone-500/10 to-orange-900/20",
    borderColor: "group-hover:border-stone-500/50"
  },
  {
    title: "The Seasons of a Relationship",
    category: "Storytelling / Relational / Biographical",
    description: "Examines any significant relationship as a temporal arc with distinct seasonal chapters, turning points, and a current season assessment.",
    route: "/deckoviz-storytelling/relationship-seasons",
    icon: <Users size={24} className="text-sky-400" />,
    color: "from-sky-500/10 to-stone-900/30",
    borderColor: "group-hover:border-sky-500/50"
  },
  {
    title: "The Final Frame",
    category: "Mood-Setting / Existential / Completion",
    description: "A completion experience and meditation on the nature of endings, presenting real documented endings and prompting reflection on your own chapters.",
    route: "/deckoviz-storytelling/final-frame",
    icon: <Square size={24} className="text-stone-500" />,
    color: "from-stone-700/10 to-stone-900/30",
    borderColor: "group-hover:border-stone-700/50"
  }
];

const DeckovizStorytelling: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Pixelated Background */}
      <PixelatedBackground variant={variant} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Caveat cursive sub-label */}
            <p className="font-caveat text-amber-400/80 text-2xl mb-2 tracking-wide">
              Deckoviz — Spaces that evolve with you.
            </p>

            {/* Playfair Display serif main heading */}
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent mb-4 leading-tight">
              Storytelling, Creativity,<br />
              <span className="italic">Mood Setting</span> &{" "}
              <span className="italic">State Setting</span> Modes
            </h1>

            <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              Explore advanced tools designed for deep mood setting, state transition, and creative exploration — where every space becomes a story.
            </p>

            {/* Background Controls */}
            <div className="flex justify-center space-x-4 mb-8">
              {[
                { id: 'glacial', label: 'Glacial', color: 'bg-blue-500' },
                { id: 'volcano', label: 'Volcano', color: 'bg-red-500' },
                { id: 'forest', label: 'Forest', color: 'bg-green-500' },
                { id: 'nebula', label: 'Nebula', color: 'bg-purple-500' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setVariant(item.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition-all duration-300 flex items-center space-x-2 ${
                    variant === item.id
                      ? 'bg-white text-black scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Centered Flex Layout */}
        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((tool, index) => (
            <motion.a
              key={index}
              href={tool.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${tool.borderColor} overflow-hidden w-full sm:w-[350px]`}
            >
              {/* Card Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  {tool.icon}
                </div>
                <span className="font-caveat text-base text-amber-400/80 mb-1 block">
                  {tool.category}
                </span>
                <h3 className="font-playfair text-xl font-bold mb-2 group-hover:text-white transition-colors leading-snug">
                  {tool.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
                  {tool.description}
                </p>
                <div className="flex items-center text-xs font-semibold text-amber-400 group-hover:text-white transition-colors">
                  <span>EXPLORE MODE</span>
                  <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>


        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center border-t border-white/10 pt-10"
        >
          <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
            <Code size={16} />
            <span>Built with Deckoviz Engine v2.0</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeckovizStorytelling;
