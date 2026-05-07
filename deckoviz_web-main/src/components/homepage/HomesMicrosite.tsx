import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface HomesMicrositeProps {
  onClose: () => void;
}

const HomesMicrosite: React.FC<HomesMicrositeProps> = ({ onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black text-white font-sans selection:bg-violet-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-violet-900/20 to-transparent blur-3xl opacity-50" />
        <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full bg-pink-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 -right-1/4 w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-blue-900/5 blur-[150px] pointer-events-none" />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:rotate-90"
        aria-label="Close microsite"
      >
        <X size={24} />
      </button>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-24">
          
          {/* Header Section */}
          <motion.div variants={fadeUp} className="text-center space-y-6 mb-20">
            <div className="inline-block px-4 py-1.5 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              The Problem It Solves
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-100 to-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Deckoviz for Homes
            </h1>
            <p className="text-xl md:text-2xl text-violet-200/80 font-light italic">
              From static walls to living, adaptive spaces
            </p>
          </motion.div>

          {/* Section: The quiet limitation */}
          <motion.div variants={fadeUp} className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-semibold text-white mb-6 border-b border-white/10 pb-4">The quiet limitation of modern homes</h2>
            <p className="text-gray-300 leading-relaxed">
              We spend an incredible amount of effort designing our homes. We choose the right furniture. We think about lighting. We invest in textures, materials, and layouts. Every element is considered, refined, and carefully placed.
            </p>
            <p className="text-gray-300 leading-relaxed">
              And then, at some point, everything stops.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The walls freeze. The environment stabilises. What once felt intentional slowly becomes background. A painting that once felt meaningful becomes invisible. A photo frame blends into the wall. Over time, the very surfaces that dominate our space stop contributing anything at all.
            </p>
            <p className="text-gray-300 leading-relaxed font-medium text-violet-200">
              This isn’t because we designed poorly. It’s because the systems we use to design spaces are fundamentally static.
            </p>
          </motion.div>

          {/* Section: Static spaces */}
          <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white mb-4">Static spaces shape static experiences</h2>
            <p className="text-xl text-gray-200 font-medium mb-6 italic">There’s a simple truth most people overlook: <br/><span className="text-pink-300">We design our spaces, and then our spaces design us.</span></p>
            <p className="text-gray-400 leading-relaxed">
              When your environment stays the same, your sensory inputs stay the same. The emotional texture of your day flattens out. What once felt beautiful becomes normal. What once felt meaningful becomes routine. And gradually, without noticing, your space stops influencing you.
            </p>
            <p className="text-gray-400 leading-relaxed mt-4">
              This is not a failure of aesthetics. It’s a limitation of what static environments can do.
            </p>
          </motion.div>

          {/* Section: The real problem */}
          <motion.div variants={fadeUp} className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-semibold text-white mb-6 border-b border-white/10 pb-4">The real problem is how we use art</h2>
            <p className="text-gray-300 leading-relaxed">
              Art, at its core, is one of the most powerful tools we have to shape how we feel. It influences mood, memory, imagination, and identity. It helps us process our inner world and connect with something deeper.
            </p>
            <p className="text-gray-300 leading-relaxed">
              But in most homes today, art has been reduced to decoration. It is:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>fixed in time</li>
              <li>disconnected from our current life</li>
              <li>created for someone else, not for us</li>
              <li>unable to evolve as we evolve</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-6">
              And because of that, even something as powerful as art slowly fades into irrelevance. As has been observed in the thinking behind Deckoviz, art hasn’t disappeared from our lives, it has simply become static and detached from who we are in the present moment.
            </p>
          </motion.div>

          {/* Section: A new way to think */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-6">A new way to think about space</h2>
              <p className="text-gray-300 leading-relaxed mb-4">What if your home wasn’t static?</p>
              <p className="text-gray-300 leading-relaxed mb-6">What if your walls could adapt to you - not once, but continuously?</p>
              <p className="text-gray-400">Imagine a space that understands:</p>
              <ul className="mt-4 space-y-3">
                {['your moods', 'your rhythms', 'your preferences', 'your memories', 'your inner world'].map((item, i) => (
                  <li key={i} className="flex items-center text-violet-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-violet-500/20 rounded-3xl p-8 backdrop-blur-md">
              <p className="text-xl text-gray-200 leading-relaxed italic">
                "A space that shifts through the day. That evolves across seasons. That reflects your life as it changes, instead of freezing a single version of it in time."
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm tracking-widest text-violet-300 uppercase font-bold">This is the shift from designed spaces to living spaces.</p>
              </div>
            </div>
          </motion.div>

          {/* Section: Why Deckoviz exists */}
          <motion.div variants={fadeUp} className="text-center bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold text-white mb-6">Why Deckoviz exists</h2>
            <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 font-medium mb-8">
              Your space should give something back.
            </p>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Not just sit there and look good once, or as a backdrop. But actively participate in your daily life. At its core, Deckoviz transforms a wall into an intelligent, evolving surface - one that can create, curate, and adapt visuals based on your life and context. It learns your style and evolves with you over time, turning your environment into something far more personal and dynamic.
            </p>
            <p className="text-gray-300 mt-6 font-medium">This is not just about displaying content. It is about building a system that continuously shapes how your space feels.</p>
          </motion.div>

          {/* Section: What this changes */}
          <motion.div variants={fadeUp} className="space-y-12">
            <h2 className="text-3xl font-semibold text-white text-center border-b border-white/10 pb-6">What this changes in everyday life</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Your environment is no longer repetitive", desc: "Instead of seeing the same thing every day, your space evolves. Art changes. Visuals shift. Themes adapt. Your home feels fresh without requiring constant effort or redesign." },
                { title: "Your space becomes emotionally responsive", desc: "Your environment begins to align with your state instead of ignoring it. Calm when you need stillness. Warmth when you need comfort. Energy when you need movement. Reflection when you need depth. This is not decoration. It is subtle emotional infrastructure." },
                { title: "Your memories return to your life", desc: "Photos are no longer buried in your phone. They resurface at the right moments. They are reinterpreted, reimagined, and experienced again. They become part of your daily environment instead of something you occasionally scroll through." },
                { title: "Creativity becomes part of your everyday", desc: "Instead of consuming content, you begin creating it. You can generate art from ideas, build visual stories, explore themes, experiment with styles, and express yourself in ways that were previously inaccessible." },
                { title: "Your home becomes a shared experience", desc: "For families, this creates entirely new dynamics. Shared storytelling. Creative rituals. Moments of delight. A space that invites participation rather than passive use. The wall becomes a point of connection." },
                { title: "Your space evolves with your life", desc: "Your environment adapts to time of day, seasons, occasions, and personal milestones. Instead of staying fixed, it moves with you." }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 rounded-2xl p-6">
                  <h3 className="text-xl font-medium text-violet-200 mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section: The power of art */}
          <motion.div variants={fadeUp} className="prose prose-invert prose-lg max-w-none text-center">
            <h2 className="text-3xl font-semibold text-white mb-8">The power of personal, always-available art</h2>
            <p className="text-gray-300 leading-relaxed mb-6">For the first time, art becomes:</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Personal, not generic', 'Dynamic, not static', 'Contextual, not random', 'Continuous, not occasional'].map((tag, i) => (
                <span key={i} className="px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-200 text-sm">{tag}</span>
              ))}
            </div>
            <p className="text-xl text-white font-medium italic">
              It is no longer something you hang and forget.<br/>
              <span className="text-pink-300">It becomes something you live with.</span>
            </p>
          </motion.div>

          {/* Section: The future */}
          <motion.div variants={fadeUp} className="bg-gradient-to-r from-violet-900/50 via-pink-900/30 to-indigo-900/50 border border-white/20 rounded-3xl p-10 md:p-16 text-center shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">The future of homes</h2>
              <p className="text-gray-300 mb-6">We believe homes are entering a new phase.</p>
              
              <div className="space-y-4 mb-10 text-lg md:text-xl font-medium text-violet-200">
                <p>From <span className="text-white">static</span> to <span className="text-pink-400">adaptive</span>.</p>
                <p>From <span className="text-white">aesthetic</span> to <span className="text-pink-400">experiential</span>.</p>
                <p>From <span className="text-white">designed once</span> to <span className="text-pink-400">evolving continuously</span>.</p>
              </div>

              <p className="text-gray-300 max-w-2xl mx-auto mb-12">
                The future home is not just well-designed. It is responsive, expressive, and alive. As the broader vision around Deckoviz suggests, spaces are beginning to shift from passive environments into systems that actively influence mood, storytelling, and daily experience.
              </p>

              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
                <p className="text-gray-400 text-lg mb-4">Most things you bring into your home stay the same.</p>
                <p className="text-2xl font-bold text-white mb-6">Deckoviz doesn’t.</p>
                <div className="flex justify-center gap-4 mb-8 text-pink-300 font-medium">
                  <span>It learns.</span>
                  <span>•</span>
                  <span>It adapts.</span>
                  <span>•</span>
                  <span>It evolves.</span>
                </div>
                <div className="text-2xl md:text-3xl font-['Playfair_Display'] italic text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-pink-200">
                  A home that doesn’t just look like you.<br/>
                  A home that keeps becoming you.
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default HomesMicrosite;
