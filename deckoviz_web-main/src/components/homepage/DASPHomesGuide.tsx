"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    icon: "🎨",
    title: "The Core Generative Engine",
    subtitle: "Your personal painter, dream visualizer, and creative collaborator",
    gradient: "from-pink-500 via-rose-400 to-orange-400",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200/60",
    shadow: "shadow-pink-200/40",
    whatItDoes: [
      "Abstract, symbolic, emotional, and conceptual artworks",
      "Dreamlike inner landscapes that reflect moods, memories, or states of mind",
      "AI style transfer to transform your photos into your favorite artistic styles",
      "Sketch-to-art and sketch-to-video transformations",
      "Physics-based and generative artworks that evolve continuously over time",
      "Iterative artworks that change subtly day by day rather than looping",
      "Dynamic photo animations and image-to-video experiences",
      "Music-responsive visuals that move and breathe with sound",
      "Art generated from text, journal entries, poems, books, or even emotions",
      "Access iconic art or niche art from our ever-expanding library",
    ],
    uses: [
      "A calming abstract painting in the morning that slowly evolves throughout the day",
      "A symbolic artwork reflecting gratitude, intention, or focus",
      "A child's sketch transformed into a gallery-worthy artwork",
      "A photo from a special moment reimagined into a timeless piece of art",
      "A continuously evolving artwork that never repeats",
    ],
    why: "Art has always been a mirror of the inner world. Deckoviz makes that mirror personal, alive, and accessible every day. Instead of static decor, your home becomes a space that reflects who you are becoming.",
    canTurn: [
      "A memory into a painting",
      "A feeling into a visual language",
      "A song into a living artwork",
      "A chapter of a book into a cinematic visual sequence",
    ],
  },
  {
    number: "02",
    icon: "📖",
    title: "Visual Storytelling & Story Immersion",
    subtitle: "Stories you don't just read or watch, but stories live with and live in",
    gradient: "from-violet-500 via-violet-400 to-indigo-400",
    bg: "from-violet-50 to-indigo-50",
    border: "border-violet-200/60",
    shadow: "shadow-violet-200/40",
    whatItDoes: [
      "Real-time story visualization as you read",
      "Storyboards that unfold scene by scene",
      "Narrated visual art with voice, music, and imagery",
      "Visual audiobooks in your preferred voice",
      "Book-to-Frames mode, turning books into art collections",
      "Story Sequence Generator for dynamic visual narratives",
      "Comic-book and art-book creation tools",
      "Storyboard-to-short-film creation experiences",
      "Visual chat with books and stories",
      "Bedtime and learning stories, designed for kids",
    ],
    uses: [
      "Children watching a bedtime story gently come alive on the wall",
      "A novel visualized chapter by chapter as ambient art",
      "Learning history, mythology, or science through visual narratives",
      "Families co-creating story worlds together",
      "Turning personal life stories into visual memory books",
    ],
    why: "Stories shape identity, values, and imagination. Deckoviz restores storytelling to its ritualistic, shared, and immersive role in the home, beyond scrolling and passive consumption.",
  },
  {
    number: "03",
    icon: "🖼️",
    title: "Poster Creation & Visual Intention Tools",
    subtitle: "Your walls as reminders of your world, of who you want to be, of your dreams",
    gradient: "from-amber-500 via-orange-400 to-yellow-400",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200/60",
    shadow: "shadow-amber-200/40",
    whatItDoes: [
      "Quote posters and text-driven designs",
      "Affirmation posters that evolve over time",
      "Vision boards and dynamic moodboards",
      "Yearly goals, bucket lists, and personal rules",
      "Educational posters for kids",
      "Poem posters and literature-inspired designs",
      "Movie-style posters for personal moments or inspiration",
      "Smart quote posters that change based on mood or time",
    ],
    uses: [
      "A vision board that subtly shifts through the year",
      "A quote that appears only in the mornings",
      "Learning posters that adapt as a child grows",
      "Moodboards for creative workspaces",
      "Personal reminders that feel beautiful, not preachy",
    ],
    why: "Your environment shapes behavior. Deckoviz helps turn walls into gentle nudges toward intention, rather than noise or decoration without meaning.",
  },
  {
    number: "04",
    icon: "🎵",
    title: "Moodscapes & Music-Driven Experiences",
    subtitle: "Enter your desired state and immerse yourself in multisensory experiences",
    gradient: "from-cyan-500 via-teal-400 to-emerald-400",
    bg: "from-cyan-50 to-teal-50",
    border: "border-cyan-200/60",
    shadow: "shadow-cyan-200/40",
    whatItDoes: [
      "Sync visuals perfectly with your chosen music",
      "Generate original AI music tailored to your mood, dreams and life",
      "Create multisensory collections combining art and sound",
      "MoodSwingers that help you enter states like calm, gratitude, focus, romance, or energy",
      "Music-responsive generative art that reacts in real time",
    ],
    uses: [
      "A calming evening wind-down mode",
      "Energizing visuals synced with music in the morning",
      "Romantic ambiance for special nights",
      "Focus-enhancing visuals for work or study",
      "Gratitude or reflection moments at the end of the day",
    ],
    why: "Mood is not accidental. Deckoviz gives you agency over emotional states, turning your home into an active participant in wellbeing.",
  },
  {
    number: "05",
    icon: "📸",
    title: "Smart Art Photo Frame & Memory Surfaces",
    subtitle: "From your phone to your walls, intelligently, for our memories deserve the centerpiece",
    gradient: "from-rose-500 via-pink-400 to-fuchsia-400",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-200/60",
    shadow: "shadow-rose-200/40",
    whatItDoes: [
      "Displays photos as-is or transformed into your favourite art styles",
      "Creates intelligent AI montages from your photo library",
      "Surfaces memories automatically on birthdays, anniversaries, or meaningful dates",
      "Occasionally surprises you with moments \"just because\"",
      "Animates photos gently for dynamic displays",
      "Access photos from our ever-expanding library",
      "Enjoy photos of space, architecture, urbanscapes, nature, landscapes, history, portraits, and lots more",
    ],
    uses: [
      "A rotating family memory wall",
      "Artistic reinterpretations of personal photos",
      "Anniversary montages that appear automatically",
      "Daily moments of nostalgia and warmth",
    ],
    why: "Memories shape belonging. Deckoviz makes remembering effortless, emotional, and beautiful, without needing you to curate constantly.",
  },
  {
    number: "06",
    icon: "🎙️",
    title: "Narration-Based & Voice-Driven Experiences",
    subtitle: "Art that speaks, stories that listen",
    gradient: "from-blue-500 via-indigo-400 to-violet-400",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-200/60",
    shadow: "shadow-blue-200/40",
    whatItDoes: [
      "Narrated art experiences",
      "Poem and book narration in preferred voices",
      "Visual audiobooks paired with book-themed art",
      "Guided visualizations, meditation, and voice-based journeys",
      "Interactive storytelling with preferred voice",
    ],
    uses: [
      "Spoken poetry with evolving visuals",
      "Calm narrated experiences before sleep",
      "Learning through narrated visual content",
      "Interactive storytelling sessions with kids",
    ],
    why: "Voice adds intimacy. Combined with visuals, it creates experiences that feel human, warm, and present, rather than digital.",
  },
  {
    number: "07",
    icon: "🌅",
    title: "Rituals, Modes & Intelligent Scheduling",
    subtitle: "Turning time into meaning, adding anchors to your days",
    gradient: "from-orange-500 via-amber-400 to-yellow-400",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200/60",
    shadow: "shadow-orange-200/40",
    whatItDoes: [
      "Daily, weekly, monthly and yearly rituals",
      "Time-based modes that shift automatically or at your direction",
      "Lifestyle-aware scheduling that adapts over time",
      "Manual or proactive activation by Vizzy",
    ],
    modes: [
      "Creativity mode", "Study mode", "Celebration mode", "Romantic mode",
      "Energy mode", "Reflection mode", "Gratitude mode", "Calm / wind-down mode",
      "Focus mode", "Kids mode", "And 20+ evolving modes",
    ],
    uses: [
      "Morning intention visuals without reminders or alarms",
      "Evening wind-down rituals that feel sacred, not mechanical",
      "Automatic celebration modes for birthdays or anniversaries",
      "Creative modes that activate during your usual creative hours",
      "Study or focus modes for children at predictable times",
    ],
    why: "Ritual is how humans turn time into meaning. Deckoviz helps restore structure without rigidity, rhythm without pressure.",
  },
  {
    number: "08",
    icon: "🤝",
    title: "Social & Shared Creative Experiences",
    subtitle: "Art is better when it's shared",
    gradient: "from-fuchsia-500 via-pink-400 to-rose-400",
    bg: "from-fuchsia-50 to-pink-50",
    border: "border-fuchsia-200/60",
    shadow: "shadow-fuchsia-200/40",
    whatItDoes: [
      "Share art and collections with friends and family",
      "Send art as gifts directly to other Deckoviz frames",
      "Co-create artworks together in real time",
      "Family creative spaces",
      "A private social feed for Deckoviz users",
      "Shared generative experiences",
    ],
    uses: [
      "Grandparents sending art to their grandchildren's homes, and vice versa",
      "Friends gifting personalized artworks instead of objects",
      "Families creating shared visual memory collections",
      "Collaborative art creation across cities or countries",
    ],
    why: "Connection deepens when it's creative. Deckoviz turns social interaction into shared meaning and tapestry. Art can thus become a part of a family's traditions.",
  },
  {
    number: "09",
    icon: "🧠",
    title: "Vizzy, Your Home Companion & Curator",
    subtitle: "A quiet, friendly intelligence that learns your taste, your preferences, your hopes",
    gradient: "from-emerald-500 via-teal-400 to-cyan-400",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200/60",
    shadow: "shadow-emerald-200/40",
    whatItDoes: [
      "Learns your taste, preferences, lifestyle, hopes, dreams",
      "Understands family members individually",
      "Curates art, photos, and experiences intelligently",
      "Adapts visuals based on time of day, mood, and context",
      "Surfaces meaningful moments and creations proactively",
    ],
    signature: [
      "Art for the Day", "Quote for the Day", "Memory of the Day",
      "Knowledge for the Day", "Dynamic mood-aware curation", "Occasion-aware displays",
    ],
    uses: [
      "Calm visuals in the morning, richer ones at night",
      "Special memories resurfacing on meaningful dates",
      "Art that subtly matches your emotional rhythm",
      "A display that feels alive without being distracting",
    ],
    why: "Curation is an art. Vizzy makes your home feel considered, alive, and deeply personal, without effort. Over time, as its capabilities and attunement grows, so does its presence in your home in being your perfect home curator.",
  },
  {
    number: "10",
    icon: "🌱",
    title: "Learning, Kids, and Growth Experiences",
    subtitle: "Education without friction, with fun, and with frolic and creative flourish",
    gradient: "from-lime-500 via-green-400 to-emerald-400",
    bg: "from-lime-50 to-green-50",
    border: "border-lime-200/60",
    shadow: "shadow-lime-200/40",
    whatItDoes: [
      "Learning visualizers for concepts and subjects",
      "Story-driven education",
      "Dynamic educational posters",
      "Visual explanations for complex topics",
      "Creative learning games",
      "Safe, curiosity-driven exploration",
      "Create short films and videos to learn topics in an immersive way",
      "Visual chat with books – make the reading process more engaging, more immersive, more alive",
      "Vizzy as your tutor – engages in fun lessons with your favourite avatar",
      "Learn concepts by converting them into personalized songs",
      "Increase focus by activating study mode for visuals and soundscapes",
    ],
    uses: [
      "Kids learning through visual storytelling",
      "Educational posters that evolve with age",
      "Visual explanations for science, history, or art",
      "Creative games that encourage imagination, not addiction",
    ],
    why: "Learning sticks when it's beautiful, personalized, and vivid. Deckoviz makes education ambient, playful, and curiosity-led. It makes learning life-sized, by moving it from the small screen to the large portal to curiosity and wonder.",
  },
  {
    number: "11",
    icon: "🎮",
    title: "Games & Interactive Generative Experiences",
    subtitle: "Play as connection, not consumption, for depth, not distraction",
    gradient: "from-violet-500 via-violet-400 to-indigo-400",
    bg: "from-violet-50 to-violet-50",
    border: "border-violet-200/60",
    shadow: "shadow-violet-200/40",
    whatItDoes: [
      "50+ social generative games, with more added regularly",
      "Creativity-based games",
      "Story-driven experiences",
      "Collaborative play modes",
      "Family-friendly interactive modes",
    ],
    designedAround: ["Expression", "Connection", "Curiosity", "Creativity"],
    uses: [
      "Family game nights with creative twists",
      "Social play with friends remotely",
      "Games that spark conversation, not silence",
    ],
    why: "Play is fundamental to human flourishing. Deckoviz reclaims play as meaningful, shared, and imaginative. Reframing play as life-affirming, not mind-numbing.",
  },
  {
    number: "12",
    icon: "🛍️",
    title: "Marketplace, Personalization & Everything Else",
    subtitle: "The long tail of Deckoviz magic",
    gradient: "from-sky-500 via-blue-400 to-indigo-400",
    bg: "from-sky-50 to-blue-50",
    border: "border-sky-200/60",
    shadow: "shadow-sky-200/40",
    whatItDoes: [
      "Deckoviz marketplace to buy and sell art",
      "Discover artists and inspirations",
      "Personalized generative clock faces",
      "Use Deckoviz as a living clock or timepiece",
      "Individual profiles for each household member",
      "Deep personalization per person",
      "Continuous feature expansion",
    ],
    uses: [
      "A constantly evolving art marketplace on your wall",
      "A clock that feels like art, not utility",
      "Personalized experiences for every family member",
    ],
    why: "Deckoviz is not static. It is a platform that grows with you, expanding over years, not months.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: "easeOut" },
  }),
};

export default function DASPHomesGuide() {
  const sparkLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;
      if (Math.random() > 0.78) return;
      const dot = document.createElement("span");
      dot.className = "dasp-spark";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      const colors = ["#ec4899", "#a855f7", "#6366f1", "#f59e0b"];
      const c = colors[Math.floor(Math.random() * colors.length)];
      dot.style.background = c;
      dot.style.boxShadow = `0 0 16px ${c}`;
      sparkLayer.current.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 25%, #ede9fe 50%, #e0f2fe 75%, #f0fdf4 100%)",
      }}
    >
      {/* Spark layer */}
      <div ref={sparkLayer} className="pointer-events-none fixed inset-0 z-50" />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-pink-200/40 blur-[100px]" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-200/35 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-16 pb-24">

        {/* ── HERO HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6"
            style={{
              background: "linear-gradient(135deg, #9333ea 0%, #ec4899 40%, #f59e0b 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DASP Guide for Homes
          </h1>

          <p className="text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A Living Canvas for Life, Meaning, and Expression
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px max-w-xs mx-auto mb-12 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #a855f7, #ec4899, transparent)",
          }}
        />

        {/* ── INTRO ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative rounded-3xl border border-white/60 bg-white/60 backdrop-blur-xl shadow-xl shadow-violet-100/50 px-8 py-10 mb-16"
        >
          <div className="absolute -top-3 left-10 px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-bold tracking-wider shadow-md">
            A comprehensive guide to the Deckoviz DASP
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-5 mt-3">
            Most screens in our lives are <span className="font-semibold text-violet-700">extractive</span>. They ask for attention, fragment
            it, and give very little back.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mb-5">
            Deckoviz was born from a radically different lens altogether: <em>What if the largest
            visual surface in your home didn't demand attention, but returned meaning? What if your
            walls could help you reflect, feel, learn, create, remember, and grow?</em>
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mb-5">
            Deckoviz is not just a digital frame. It is not just generative art. It is not just a
            smart display. It is a <span className="font-semibold text-pink-600">living visual system for your home</span>, designed to
            evolve with you, adapt to your rhythms, and quietly elevate everyday life.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            At its core, Deckoviz Dynamic Art &amp; Story Portal combines generative AI, storytelling,
            music, rituals, curation, and adaptive intelligence into a single, beautifully integrated
            home experience.
          </p>

          <div className="mt-8 pt-6 border-t border-violet-100">
            <p className="text-center text-gray-600 font-medium">
              Below is a deep dive into the <span className="text-violet-700 font-bold">12 core pillars</span> of Deckoviz for homes,
              each representing an entire universe of features, use cases, and everyday magic.
            </p>
          </div>
        </motion.div>

        {/* ── PILLARS ── */}
        <div className="space-y-10">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              custom={idx}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`relative rounded-3xl border ${pillar.border} bg-gradient-to-br ${pillar.bg} backdrop-blur-md shadow-lg ${pillar.shadow} overflow-hidden`}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.gradient}`} />

              <div className="px-7 sm:px-10 py-9">
                {/* Pillar header */}
                <div className="flex items-start gap-5 mb-7">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md bg-gradient-to-br ${pillar.gradient}`}
                  >
                    {pillar.icon}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`text-xs font-bold tracking-[0.2em] uppercase mb-1.5 bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
                    >
                      Pillar {pillar.number}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mb-1">
                      {pillar.title}
                    </h2>
                    <p className="text-sm text-gray-500 italic">{pillar.subtitle}</p>
                  </div>
                </div>

                {/* ── What it does ── */}
                <div className="mb-6">
                  <h3
                    className={`text-xs font-bold tracking-widest uppercase mb-3 bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
                  >
                    What it does
                  </h3>
                  <ul className="space-y-2">
                    {pillar.whatItDoes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-700 text-[15px] leading-snug">
                        <span
                          className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${pillar.gradient}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── Can turn (pillar 01 only) ── */}
                {pillar.canTurn && (
                  <div className="mb-6 rounded-2xl bg-white/70 border border-white/80 px-5 py-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">You can turn:</p>
                    <ul className="space-y-1.5">
                      {pillar.canTurn.map((t, i) => (
                        <li key={i} className="text-gray-600 text-[14px] flex items-start gap-2">
                          <span className="text-pink-400 mt-0.5">✦</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ── Modes (pillar 07 only) ── */}
                {pillar.modes && (
                  <div className="mb-6">
                    <h3
                      className={`text-xs font-bold tracking-widest uppercase mb-3 bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
                    >
                      Built-in modes include
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pillar.modes.map((m, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${pillar.gradient} shadow-sm`}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Signature features (pillar 09) ── */}
                {pillar.signature && (
                  <div className="mb-6">
                    <h3
                      className={`text-xs font-bold tracking-widest uppercase mb-3 bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
                    >
                      Signature features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pillar.signature.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 border border-emerald-200 text-emerald-700 shadow-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Designed around (pillar 11) ── */}
                {pillar.designedAround && (
                  <div className="mb-6">
                    <h3
                      className={`text-xs font-bold tracking-widest uppercase mb-3 bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
                    >
                      Designed around
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pillar.designedAround.map((d, i) => (
                        <span
                          key={i}
                          className={`px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r ${pillar.gradient} shadow`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Use cases ── */}
                <div className="mb-6">
                  <h3
                    className={`text-xs font-bold tracking-widest uppercase mb-3 bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
                  >
                    Some uses in the home
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {pillar.uses.map((use, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-xl bg-white/60 border border-white/80 px-4 py-2.5 text-[14px] text-gray-700"
                      >
                        <span className="text-violet-400 font-bold mt-0.5 flex-shrink-0">→</span>
                        {use}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Why it matters ── */}
                <div
                  className={`rounded-2xl bg-gradient-to-r ${pillar.gradient} px-6 py-4 text-white`}
                >
                  <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-80">Why it matters</p>
                  <p className="text-sm leading-relaxed opacity-95">{pillar.why}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CLOSING SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-3xl border border-white/60 bg-white/60 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          <div
            className="h-2 w-full"
            style={{
              background: "linear-gradient(90deg, #9333ea, #ec4899, #f59e0b, #10b981, #6366f1)",
            }}
          />
          <div className="px-8 sm:px-14 py-12 text-center">
            <div className="text-4xl mb-6">✨</div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-6"
              style={{
                background: "linear-gradient(135deg, #9333ea, #ec4899, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The Bigger Picture
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              <em>(Pun Intended 😄)</em>
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-5 max-w-3xl mx-auto">
              Deckoviz is not about screens. It is about{" "}
              <span className="font-semibold text-violet-700">spaces</span>, it is about{" "}
              <span className="font-semibold text-pink-600">souls</span>, and it is about the soul of your space.
            </p>

            <div className="grid sm:grid-cols-5 gap-4 max-w-2xl mx-auto my-10">
              {["Feel more", "Remember more", "Create more", "Learn more", "Love more"].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-md"
                  style={{
                    background: [
                      "linear-gradient(135deg,#9333ea,#ec4899)",
                      "linear-gradient(135deg,#ec4899,#f59e0b)",
                      "linear-gradient(135deg,#10b981,#6366f1)",
                      "linear-gradient(135deg,#0ea5e9,#a855f7)",
                      "linear-gradient(135deg,#f43f5e,#9333ea)",
                    ][i],
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-5 max-w-3xl mx-auto">
              Your home is the most important interface you have — it's your sacred space. Deckoviz
              exists to make that interface{" "}
              <span className="font-semibold text-violet-700">alive</span>,{" "}
              <span className="font-semibold text-pink-600">intentional</span>, and{" "}
              <span className="font-semibold text-amber-600">beautiful</span>.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
              Beyond merely decorating walls, Deckoviz is about designing the emotional and
              experiential fabric of daily life.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Spark styles */}
      <style>{`
        .dasp-spark {
          position: fixed;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.85;
          pointer-events: none;
          animation: daspSparkFade 1s ease-out forwards;
        }
        @keyframes daspSparkFade {
          from { transform: scale(1); opacity: 0.9; }
          to   { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
