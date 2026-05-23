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
<section 
  className="relative py-24 overflow-visible bg-white"
>
      {/* Blue Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-cyan-100"></div>
        <div className="absolute top-0 -left-1/4 w-[70%] h-[70%] bg-blue-400/20 blur-[100px] rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-0 -right-1/4 w-[70%] h-[70%] bg-cyan-400/20 blur-[100px] rounded-full mix-blend-multiply"></div>
      </div>

      {/* Subtle overlay to ensure the same transparent look */}
      <div className="absolute inset-0 z-0 bg-white/10 backdrop-blur-[4px]"></div>

      {/* SHINY GLASS OVERLAY covering the entire section (optional, similar to enterprise) */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{
             background: "linear-gradient(115deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 15%, transparent 30%, transparent 80%, rgba(255,255,255,0.1) 100%)",
           }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-6">
        


        {/* Enhanced heading with better spacing and animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16 relative z-10"
        >
          {/* Soft white halo to ensure the text stands out from the background image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[60%] h-[160%] bg-white/80 blur-[60px] rounded-[100%] pointer-events-none z-[-1]" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight relative z-10" style={{ fontFamily: "'Playfair Display', serif" }}>
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
              className="italic bg-gradient-to-r from-indigo-950 to-blue-600 bg-clip-text text-transparent inline-block"
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
            className="text-gray-900 font-medium text-center text-lg max-w-3xl mx-auto leading-relaxed relative z-10 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
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
                  bg-white/10 backdrop-blur-xl
                  border border-white/20
                  shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-500
                  transform-gpu
                  text-center
                  group
                  overflow-hidden
                "
                style={{
                  background: "linear-gradient(115deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 25%, transparent 40%, rgba(255,255,255,0.05) 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(255,255,255,0.3)",
                }}
              >
                {/* Back-glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                  style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 75%)" }}
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

                <div className="relative mb-5 mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                    bg-white/40 backdrop-blur-md
                    border border-white/50
                    shadow-[0_4px_16px_rgba(0,0,0,0.1)]
                    group-hover:shadow-[0_6px_24px_rgba(255,255,255,0.4)]
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-500">
                  {benefit.icon}
                </div>

                {/* Title with refined typography */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-violet-900 transition-colors duration-400 leading-snug">
                  {benefit.title}
                </h3>

                {/* Description with better readability */}
                <p className="text-sm font-medium text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors duration-400">
                  {benefit.description}
                </p>

                {/* Elegant bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[2rem]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)", boxShadow: "0 0 20px 4px rgba(255,255,255,0.5)" }}
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
              bg-white/20 backdrop-blur-xl
              border border-white/40
              shadow-[0_12px_40px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.6)]
              hover:shadow-[0_24px_70px_rgba(255,255,255,0.3),inset_0_2px_4px_rgba(255,255,255,0.8)]
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
              <span className="text-3xl font-bold text-gray-900 drop-shadow-md leading-tight group-hover:scale-105 transition-transform duration-300">
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
