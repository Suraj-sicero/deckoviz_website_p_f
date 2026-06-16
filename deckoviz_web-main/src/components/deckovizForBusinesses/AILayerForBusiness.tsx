import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Eye, 
  UserPlus, 
  Megaphone, 
  Waves
} from "lucide-react";

export default function AILayerForBusiness() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.2 } },
  };

  const features = [
    {
      title: "Generates infinite, on-brand visuals",
      desc: "Give it a theme, 'Cyber-Urban Tech,' 'Sustainable Summer,' and it creates unique, high-fidelity content continuously. Your space never repeats, but always feels exactly like you.",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      color: "from-indigo-500/10 to-blue-500/10",
      borderColor: "group-hover:border-indigo-400/50"
    },
    {
      title: "Reads the room and adapts in real time",
      desc: "Time of day, season, footfall, weather, occasion. The space's mood shifts automatically, optimising for resonance every hour.",
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      color: "from-blue-500/10 to-cyan-500/10",
      borderColor: "group-hover:border-blue-400/50"
    },
    {
      title: "Recognises and personalises",
      desc: "Regulars, anniversaries, VIPs get generative moments built for them. Loyalty, expressed through atmosphere, not just points.",
      icon: <UserPlus className="w-6 h-6 text-cyan-600" />,
      color: "from-cyan-500/10 to-teal-500/10",
      borderColor: "group-hover:border-cyan-400/50"
    },
    {
      title: "Powers your marketing, on-site and online",
      desc: "The same brand-aware engine produces in-store campaigns and social content from one creative brain, deployed instantly.",
      icon: <Megaphone className="w-6 h-6 text-indigo-600" />,
      color: "from-indigo-600/10 to-blue-600/10",
      borderColor: "group-hover:border-indigo-400/50"
    },
    {
      title: "Multisensory by design",
      desc: "Generative visuals paired with soundscapes and AI narration today. Scent, sensors, and gesture coming next.",
      icon: <Waves className="w-6 h-6 text-teal-600" />,
      color: "from-teal-500/10 to-emerald-500/10",
      borderColor: "group-hover:border-teal-400/50"
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-transparent overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-[70%] h-[70%] bg-blue-200/20 blur-[120px] rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-0 -right-1/4 w-[70%] h-[70%] bg-indigo-200/20 blur-[120px] rounded-full mix-blend-multiply"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10">
        
        {/* Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-indigo-100 mb-8 backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-indigo-900 uppercase">Deckoviz: AI, Built Into Your Space</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight text-[#182A4A] font-serif">
            The AI layer for physical business is coming. <br className="hidden md:block" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#182A4A]">Lead, or catch up later.</span>
          </motion.h2>

          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed font-medium mx-auto max-w-3xl text-left md:text-center">
            <motion.p variants={itemVariants}>
              Every other part of your business has already gone AI-native, your marketing, your CRM, your operations. Your physical space hasn't. It's still running on static signage, the same playlist, the same six images on loop since opening day.
            </motion.p>
            <motion.p variants={itemVariants}>
              Deckoviz changes that. It's a generative AI engine, Vizzy, built into your environment as a <span className="text-gray-900 font-bold">24/7 creative director, brand storyteller, concierge, and marketer</span>, all in one.
            </motion.p>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-[#182A4A]">What Vizzy does</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full opacity-50" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className={`group relative p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.08)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 overflow-hidden ${feature.borderColor}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white/90 border border-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#182A4A] mb-3 group-hover:text-indigo-700 transition-colors tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed font-medium mt-auto">
                    <span className="hidden md:inline text-indigo-300 mr-1">—</span> 
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing blocks */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Built to be block */}
          <motion.div variants={itemVariants} className="relative p-10 md:p-14 rounded-[3rem] bg-white/60 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(37,99,235,0.1)] mb-12 overflow-hidden text-center md:text-left">
             <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-200/50 blur-[80px] rounded-full pointer-events-none" />
             <h3 className="text-2xl md:text-3xl font-bold text-[#182A4A] mb-4 font-serif">Built to be the core AI layer of your business</h3>
             <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed relative z-10 mb-4">
               Not a screen. An intelligence layer that everything else plugs into, your POS, your CRM, your bookings, your loyalty program, getting smarter and more contextual over time.
             </p>
             <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed relative z-10">
               It's infrastructure that appreciates. Every model update makes your space more capable, automatically, over the cloud, no renovation required.
             </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center py-12 space-y-6">
            <h3 className="text-xl font-semibold text-gray-500 tracking-wide uppercase text-sm mb-6">For decision-makers who see where this is going</h3>
            <p className="text-xl md:text-2xl font-medium text-gray-800 leading-snug max-w-3xl mx-auto">
               If you believe AI belongs in every layer of a modern business, including the physical one, this is that layer. The differentiator that's obvious to every customer who walks in, and the foundation your competitors will be racing to retrofit.
            </p>
            <div className="pt-8">
              <p className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] via-indigo-600 to-blue-600 font-bold italic relative z-10 drop-shadow-sm mb-12">
                Deckoviz. AI, in the room with you.
              </p>
            </div>
            
            <motion.div variants={itemVariants} className="flex justify-center">
              <Link to="/ai-layer-for-business" className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-[#182A4A] to-indigo-700 hover:from-indigo-900 hover:to-indigo-800 text-white font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_rgba(37,99,235,0.4)] hover:-translate-y-1 group">
                Learn more about how Deckoviz becomes an AI layer for your business space
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
        
      </div>
    </section>
  );
}
