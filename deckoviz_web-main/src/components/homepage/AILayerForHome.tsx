import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Sun, 
  Coffee, 
  Users, 
  Palette, 
  MessageCircle, 
  TrendingUp 
} from "lucide-react";

export default function AILayerForHome() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.2 } },
  };

  const features = [
    {
      title: "Sets the mood, proactively",
      desc: "reads the room and shifts light, art, and sound before you've had to ask. Walk in tense, the room softens. Long week, Sunday arrives with exactly the stillness you needed.",
      icon: <Sun className="w-6 h-6 text-sky-500" />,
      color: "from-sky-500/10 to-blue-500/10",
      borderColor: "group-hover:border-sky-400/50"
    },
    {
      title: "Designs your state, not just your space",
      desc: "calm, focus, creativity, connection, shaped through coordinated visuals, sound, and narrative. Like a film score for your day.",
      icon: <Palette className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-500/10 to-blue-500/10",
      borderColor: "group-hover:border-indigo-400/50"
    },
    {
      title: "Builds your rituals",
      desc: "morning routines, wind-downs, family dinners. The small repeated moments that quietly become the architecture of your life.",
      icon: <Coffee className="w-6 h-6 text-emerald-500" />,
      color: "from-emerald-500/10 to-teal-500/10",
      borderColor: "group-hover:border-emerald-400/50"
    },
    {
      title: "Knows everyone in the home",
      desc: "your patterns, your partner's, your kids'. Shared mood when you're together, individual context when you're not. One intelligence, tuned to all of you.",
      icon: <Users className="w-6 h-6 text-cyan-500" />,
      color: "from-cyan-500/10 to-blue-500/10",
      borderColor: "group-hover:border-cyan-400/50"
    },
    {
      title: "Talks to you",
      desc: "a voice and avatar you choose, playful and warm. Reminds you of your day, narrates the art on your walls, starts a bedtime story, drops into a focus soundscape the moment you sit down to work.",
      icon: <MessageCircle className="w-6 h-6 text-teal-500" />,
      color: "from-teal-500/10 to-cyan-500/10",
      borderColor: "group-hover:border-teal-400/50"
    },
    {
      title: "Creates, constantly",
      desc: "original art generated from your conversations, your moods, your memories. The frame never goes stale, because it's always making something new, for you.",
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
      color: "from-blue-500/10 to-indigo-500/10",
      borderColor: "group-hover:border-blue-400/50"
    },
    {
      title: "Gets smarter over time",
      desc: "not a product you configure, a presence that learns you the way someone who's lived with you for years would.",
      icon: <TrendingUp className="w-6 h-6 text-teal-600" />,
      color: "from-teal-600/10 to-emerald-600/10",
      borderColor: "group-hover:border-teal-500/50"
    }
  ];

  return (
    <section className="relative py-32 bg-white overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/40"></div>
        <div className="absolute top-0 -left-1/4 w-[70%] h-[70%] bg-blue-200/40 blur-[120px] rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-0 -right-1/4 w-[70%] h-[70%] bg-cyan-200/40 blur-[120px] rounded-full mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[400px] bg-indigo-100/40 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 tilt-12" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10">
        
        {/* Intro Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-32"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-indigo-100 mb-8 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-indigo-900 uppercase">The AI Layer For Your Home</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight text-gray-900 font-serif">
            Every home is about to get an AI layer. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 italic font-medium">This is the one worth having.</span>
          </motion.h2>

          <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed font-medium mx-auto max-w-3xl text-left md:text-center">
            <motion.p variants={itemVariants}>
              Smart homes gave us switches, schedules, and thermostats that learn your temperature. Useful, but none of it actually knows you.
            </motion.p>
            <motion.p variants={itemVariants}>
              Deckoviz is different: an <span className="text-gray-900 font-bold">emotionally intelligent, context-aware AI presence</span> at the centre of your home, the layer that adapts to your moods, your days, and everyone who lives there.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base md:text-lg font-serif italic text-indigo-900/90 mt-8 border-l-4 md:border-l-0 border-indigo-300 pl-4 md:pl-0 bg-indigo-50/50 md:bg-transparent rounded-r-xl py-2 md:py-0">
              This is the heart and the hearth of your home. The thing "smart" always promised and never delivered.
            </motion.p>
          </div>
        </motion.div>

        {/* What Vizzy Does Grid Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-32"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-gray-900">What <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Vizzy</span> does</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full opacity-50" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {features.slice(0, 3).map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className={`group relative p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 overflow-hidden ${feature.borderColor}`}
              >
                {/* Internal Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 border border-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                    {feature.title}
                  </h4>
                  
                  <p className="text-gray-700 leading-relaxed font-medium mt-auto">
                    <span className="hidden md:inline text-indigo-300 mr-1">-</span> 
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.slice(3).map((feature, idx) => (
              <motion.div 
                key={idx + 3} 
                variants={itemVariants}
                className={`group relative p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 overflow-hidden ${feature.borderColor}`}
              >
                {/* Internal Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 border border-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                    {feature.title}
                  </h4>
                  
                  <p className="text-gray-700 leading-relaxed font-medium mt-auto">
                    <span className="hidden md:inline text-indigo-300 mr-1">-</span> 
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conclusion / Outro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Built to grow block */}
          <motion.div variants={itemVariants} className="relative p-10 md:p-14 rounded-[3rem] bg-white/60 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(37,99,235,0.1)] mb-12 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-200/50 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-serif">Built to grow with you</h3>
            <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed relative z-10">
              Every new capability we add, every interaction you have, plugs into the same intelligence, making the whole home more attuned, automatically, over time. In doing so, it becomes a lifelong companion to your home.
            </p>
          </motion.div>

          {/* Epic finish */}
          <motion.div variants={itemVariants} className="text-center py-16 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-500 tracking-wide uppercase text-sm mb-6">For people who see where this is going</h3>
            <p className="text-xl md:text-3xl font-medium text-gray-800 leading-snug max-w-3xl mx-auto">
              If you want a home that's proactive, emotionally intelligent, and unmistakably yours, not reactive, not generic, this is that layer.
            </p>
            <div className="pt-8 relative mb-12">
              <p className="text-2xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-700 font-bold italic relative z-10 drop-shadow-sm">
                The heart and the hearth of your home, powered by AI that actually knows you.
              </p>
            </div>

            <motion.div variants={itemVariants} className="mt-8 flex justify-center">
              <Link to="/ai-layer-for-home" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 group">
                Learn More About How Deckoviz Becomes The AI Layer For Your Home
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
