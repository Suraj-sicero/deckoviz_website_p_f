import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import HomesMicrosite from "./HomesMicrosite";

/* ================= BENEFITS DATA ================= */

export const benefitsData = [
  /* =====================================================
     MAIN FEATURES (VISIBLE ON HOME + EXPLORE MORE)
     ===================================================== */

  {
    icon: "✨",
    title: "A Living, Breathing Home",
    description:
      "Your walls evolve with your day. Morning calm. Afternoon focus. Evening warmth. Deckoviz turns your space into a living environment that moves with your rhythms, moods, and moments.",
    showOnHome: true
  },
  {
    icon: "🎨",
    title: "Infinite Personal Art",
    description:
      "Your photos. Your dreams. Your thoughts. Your inner worlds. An endless stream of art that is deeply personal, never repeated, and always meaningful.",
    showOnHome: true
  },
  {
    icon: "🌸",
    title: "More Presence, Less Noise",
    description:
      "Rituals, moodscapes, meditations, and visual calm help you slow down and feel grounded, present, and at home in your own space.",
    showOnHome: true
  },
  {
    icon: "❤️",
    title: "Deeper Family & Relationships",
    description:
      "From bedtime stories to couple rituals to shared creations, Deckoviz becomes a quiet bridge for bonding, intimacy, play, and togetherness.",
    showOnHome: true
  },
  {
    icon: "💡",
    title: "A Spark for Creativity",
    description:
      "Ideas flow when your space inspires you. Deckoviz nudges you to imagine more, create more, and see beauty where you didn’t before.",
    showOnHome: true
  },
  {
    icon: "🌍",
    title: "A Window to Wonder",
    description:
      "Explore art, cultures, dreams, stories, and worlds far beyond your walls keeping curiosity alive and your home feeling expansive.",
    showOnHome: true
  },
  {
    icon: "🔮",
    title: "One Frame, A Thousand Roles",
    description:
      "Art gallery. Memory wall. Vision board. Meditation space. Storybook. TV. One intelligent presence replaces clutter.",
    showOnHome: true
  },
  {
    icon: "🌱",
    title: "Always Fresh, Always Growing",
    description:
      "New art. New modes. New features. Every week. Deckoviz never gets old because it keeps becoming more.",
    showOnHome: true
  },

  /* =====================================================
     REMAINING BENEFITS (VISIBLE ONLY ON EXPLORE MORE)
     ===================================================== */

  {
    icon: "🧠",
    title: "Your space starts working with you, not against you",
    description:
      "Instead of static walls and idle screens, your home begins to respond to your mood, your time, your rituals, and your energy. The environment supports how you want to feel and who you want to become.",
    showOnHome: false
  },
  {
    icon: "🎭",
    title: "You stop choosing between beauty and utility",
    description:
      "Deckoviz replaces art, photo frames, posters, mood lighting, music systems, and inspiration boards with a single evolving canvas. Fewer objects. Far richer experiences.",
    showOnHome: false
  },
  {
    icon: "📸",
    title: "Your memories stop fading into folders",
    description:
      "Photos, moments, and stories refuse to stay archived. They evolve into art and become part of your daily life instead of something you scroll through once a year.",
    showOnHome: false
  },
  {
    icon: "🎈",
    title: "Creativity becomes lighter, faster, and more playfu",
    description:
      "You create more without friction paintings, posters, music, stories, rituals not because you schedule time, but because your space invites it.",
    showOnHome: false
  },
  {
    icon: "🧘",
    title: "Your home gains emotional intelligence",
    description:
      "Morning calm feels different from evening warmth. Celebrations feel distinct from reflection. The space adapts quietly, without you managing it.",
    showOnHome: false
  },
  {
    icon: "🕯️",
    title: "You build rituals without effort",
    description:
      "Daily grounding. Weekly reflection. Monthly celebrations. Deckoviz remembers, prepares, and sets the tone making reflection feel natural.",
    showOnHome: false
  },
  {
    icon: "📵",
    title: "Your relationship with technology becomes healthier",
    description:
      "Less scrolling. Less noise. More ambience. More presence. Technology shifts from demanding attention to shaping atmosphere.",
    showOnHome: false
  },
  {
    icon: "🌱",
    title: " Your Personal Growth Stays Visible",
    description:
      "Goals, affirmations, visions, and intentions remain present. Not buried in apps. Not forgotten. Gently seen, every day.",
    showOnHome: false
  },
  {
    icon: "🏡",
    title: "A Home More Expressive Than Your Social Feed",
    description:
      "Your home reflects who you are now, not who you were the last time you updated a profile.",
    showOnHome: false
  },
  {
    icon: "💫",
    title: "A Space That Feels Alive",
    description:
      "Not animated for the sake of it. Alive in a quiet, intentional way. Subtle. Responsive. Human.",
    showOnHome: false
  },
  {
    icon: "🧩",
    title: "One Frame Replaces Many Devices",
    description:
      "Art. TV. Music. Ambience. Memory display. Creative tool. All in one.",
    showOnHome: false
  },
  {
    icon: "♾️",
    title: "Infinite Visuals Without Ongoing Purchases",
    description:
      "No buying prints. No replacing frames. No clutter. Your canvas evolves endlessly.",
    showOnHome: false
  },
  {
    icon: "⚙️",
    title: "Personalization Without Complexity",
    description:
      "Deckoviz learns you over time without constant inputs or micromanagement.",
    showOnHome: false
  },
  {
    icon: "🚀",
    title: "Designed to Last",
    description:
      "Weekly software evolution. Expanding features. A platform that grows with you, not something you outgrow.",
    showOnHome: false
  },
    {
    icon: "🧘🏼‍♀️",
    title: "Your space starts reflecting your inner life",
    description:
      " Not perfectly. Not constantly. But enough to feel seen. And that changes how you live in it.",
    showOnHome: false
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 60,
    x: index % 2 === 0 ? -50 : 50,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ================= COMPONENT ================= */

const Benefits = () => {
  const navigate = useNavigate();
  const [showHomesMicrosite, setShowHomesMicrosite] = useState(false);

  return (
    <>
<section className="relative py-24 bg-gradient-to-b from-slate-50 via-violet-50/20 to-pink-50/20 overflow-visible">

      {/* Enhanced floating decorative elements with softer colors */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-20 w-40 h-40 bg-gradient-to-br from-violet-200/30 to-pink-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-20 w-56 h-56 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-indigo-200/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-rose-200/25 to-orange-200/25 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-6">
        
        {/* Top Floating Buttons Container */}
        <div className="flex items-center justify-between mb-16 relative z-30">
          
          {/* Homes Microsite Trigger Button - Premium Aesthetic */}
          <div className="relative group">
            {/* Outer Glow Aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 rounded-full blur-md opacity-40 group-hover:opacity-75 group-hover:blur-lg transition-all duration-500" />
            
            <button
              onClick={() => setShowHomesMicrosite(true)}
              className="relative flex items-center gap-4 p-2 pr-6 bg-gray-900 border border-white/10 rounded-full shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(168,85,247,0.4)]"
            >
              {/* Subtle gradient background inside button */}
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/40 via-violet-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />
              
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 flex items-center justify-center text-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
                ✨
              </div>

              <div className="text-left relative z-10 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                    Deckoviz For Homes
                  </p>
                </div>
                <p className="text-white font-medium text-sm md:text-base leading-tight tracking-wide group-hover:text-fuchsia-100 transition-colors">
                  Why Deckoviz, & the problem it solves
                </p>
              </div>
              
              <div className="ml-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </button>
          </div>

          {/* 🌸 Infinite Portal Button with enhanced styling */}
          <motion.button
            onClick={() => navigate("/infinite-portal")}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="
              hidden lg:flex
              max-w-[460px]
              px-6 py-3
              rounded-full
              text-left

              bg-gradient-to-r 
              from-violet-500 
              via-indigo-500 
              to-violet-600

              text-white

              shadow-[0_0_50px_rgba(99,102,241,0.5)]
              hover:shadow-[0_0_70px_rgba(99,102,241,0.7)]

              transition-all duration-500
              animate-[float_7s_ease-in-out_infinite]
            "
          >
            <span className="text-sm font-medium leading-snug">
              A Portal of Infinite Goodness, Endless Memories,  
              and a Frame That Will Never Be Finished 
            </span>
          </motion.button>
        </div>

        {/* Enhanced heading with better spacing and animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            <motion.span 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-800"
            >
              How
            </motion.span>{" "}
            <motion.span 
              initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7, type: "spring", bounce: 0.4 }}
              className="italic bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent inline-block"
            >
              Deckoviz
            </motion.span>{" "}
            <motion.span 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-800"
            >
              Brings Your Space to
            </motion.span>{" "}
            <motion.span 
              initial={{ opacity: 0, scale: 0.7, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.7, type: "spring", bounce: 0.4 }}
              className="italic bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent inline-block"
            >
              Life
            </motion.span>
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-gray-600 text-center text-lg max-w-3xl mx-auto leading-relaxed"
          >
            A living canvas, a creative companion, and a quiet presence that makes
            your space feel more like you.
          </motion.p>
        </motion.div>

        {/* Enhanced benefit cards with refined aesthetics */}
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
>
          {benefitsData
            .filter((benefit) => benefit.showOnHome)
            .map((benefit, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -16,
                  scale: 1.03,
                  transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 20 }
                }}
                className="
                  relative
                  p-5 sm:p-8 rounded-[2rem]
                  bg-white/80 backdrop-blur-sm
                  border border-blue-100/50
                  shadow-[0_12px_40px_rgba(59,130,246,0.25)]
                  hover:shadow-[0_24px_70px_rgba(59,130,246,0.45)]
                  hover:-translate-y-2
                  transition-all duration-500
                  transform-gpu
                  text-center
                  group
                  overflow-hidden
                "
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-pink-50/60 to-indigo-50/80 rounded-[2rem] -z-10"
                />
                
                {/* Soft glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -inset-1 bg-gradient-to-br from-violet-200/20 via-pink-200/20 to-indigo-200/20 rounded-[2rem] blur-xl -z-20"
                />

                {/* Floating sparkles */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className="absolute top-6 right-6 w-2 h-2 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full"
                />
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    delay: index * 0.3 + 0.5
                  }}
                  className="absolute top-10 right-10 w-1.5 h-1.5 bg-gradient-to-br from-pink-300 to-indigo-300 rounded-full"
                />

                {/* Emoji with enhanced animation */}
                <motion.div
                  whileHover={{ 
                    scale: 1.4,
                    rotate: [0, -12, 12, -8, 8, 0],
                    y: -8,
                    transition: { 
                      scale: { type: "spring", stiffness: 400, damping: 15 },
                      rotate: { duration: 0.6 },
                      y: { type: "spring", stiffness: 300 }
                    }
                  }}
                  className="text-6xl mb-5 inline-block filter drop-shadow-lg"
                >
                  {benefit.icon}
                </motion.div>

                {/* Title with refined typography */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-violet-700 transition-colors duration-400 leading-snug">
                  {benefit.title}
                </h3>

                {/* Description with better readability */}
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-400">
                  {benefit.description}
                </p>

                {/* Elegant bottom accent */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-violet-300 to-transparent rounded-full"
                />
              </motion.div>
            ))}

          {/* 9th Grid Cell: See More Magic Button Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              y: -16,
              scale: 1.03,
              transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 20 }
            }}
            className="
              relative
              rounded-[2rem]
              bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-800
              shadow-[0_12px_40px_rgba(79,70,229,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)]
              hover:shadow-[0_24px_70px_rgba(79,70,229,0.6),inset_0_2px_4px_rgba(255,255,255,0.5)]
              hover:-translate-y-2
              transition-all duration-500
              overflow-hidden
              group
              flex items-center justify-center
              min-h-[200px] sm:min-h-[250px]
            "
          >
            <Link to="/benefits" className="absolute inset-0 flex flex-col items-center justify-center w-full h-full p-8 z-10 text-center">
              <motion.span
                animate={{ 
                  rotate: [0, 14, -14, 0],
                  scale: [1, 1.2, 1.2, 1]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4 drop-shadow-xl inline-block filter"
              >
                ✨
              </motion.span>
              <span className="text-3xl font-bold text-white drop-shadow-md leading-tight group-hover:scale-105 transition-transform duration-300">
                See More<br/>Magic
              </span>
            </Link>
            
            {/* Shimmer effect */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%" }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-0"
            />
          </motion.div>
        </motion.div>
      </div>
      
      <style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
`}</style>

    </section>
    {showHomesMicrosite && (
      <HomesMicrosite onClose={() => setShowHomesMicrosite(false)} />
    )}
    </>
  );
};

export default Benefits;
