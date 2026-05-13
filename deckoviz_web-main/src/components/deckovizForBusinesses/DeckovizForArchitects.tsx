import React from 'react';
import { 
  Building, 
  Sparkles, 
  Palette, 
  Home, 
  Briefcase, 
  ShoppingBag,
  MonitorPlay,
  Lightbulb,
  Sun,
  LayoutDashboard,
  Layers,
  ArrowRight,
  Handshake,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ARCHITECT_IMG = '/images/h1.png';

const DeckovizArchitectsLanding = () => {
  const navigate = useNavigate();

  const handlePartnerClick = () => {
    navigate('/contact');
  };

  return (
    <div className="bg-[#0f0f13] min-h-screen text-gray-100 font-sans selection:bg-violet-500/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[150px] mix-blend-screen" 
          />

          {/* Curved Grid Pattern - Blueprint aesthetic */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <g stroke="#ffffff" strokeWidth="1" fill="none">
              {Array.from({ length: 40 }).map((_, i) => (
                <line key={`v-${i}`} x1={(i / 39) * 1000} y1="0" x2={(i / 39) * 1000} y2="800" />
              ))}
              {Array.from({ length: 32 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={(i / 31) * 800} x2="1000" y2={(i / 31) * 800} />
              ))}
            </g>
          </svg>

          {/* Vignette overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(15,15,19,1)_80%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wider text-violet-200 uppercase">Deckoviz For Architects and Interior Designers</span>
          </motion.div>
          
          {/* Hero Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] font-semibold mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            The Future of Spatial Design:<br className="hidden md:block" />
            <span className="text-white">From Static Walls</span>{" "}
            <motion.span 
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-pink-500 bg-[length:200%_auto]"
            >
              to Living Environments
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-16 leading-relaxed tracking-wide"
          >
            An Architectural Partnership for the Era of{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300">Intelligent Spaces.</span>
          </motion.p>

          {/* Story Cards — break up the dense text */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {[
              {
                delay: 0.5,
                label: "The Problem",
                icon: "◈",
                color: "border-violet-500/30 bg-violet-500/5",
                accent: "text-violet-400",
                quote: "For decades, one of the most significant elements of a space has remained stubbornly static:",
                highlight: "the walls."
              },
              {
                delay: 0.65,
                label: "The Paradox",
                icon: "◉",
                color: "border-indigo-500/30 bg-indigo-500/5",
                accent: "text-indigo-400",
                quote: "While the life within a building is dynamic — evolving through hours, seasons, and moods — the surfaces have remained",
                highlight: "frozen."
              },
              {
                delay: 0.8,
                label: "The Platform",
                icon: "◆",
                color: "border-pink-500/30 bg-pink-500/5",
                accent: "text-pink-400",
                quote: "Deckoviz provides the world's first Generative Ambiance and Visual Platform (GAVP) — an architectural infrastructure with an AI-powered",
                highlight: "Experience Layer."
              },
              {
                delay: 0.95,
                label: "For You",
                icon: "◇",
                color: "border-violet-500/30 bg-violet-500/5",
                accent: "text-violet-400",
                quote: "For every professional who views a room not just as a floor plan, but as an",
                highlight: "emotional sanctuary."
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: card.delay, ease: "easeOut" }}
                className={`relative p-6 rounded-2xl border backdrop-blur-md ${card.color} group hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className={`flex items-center gap-2 mb-3 ${card.accent}`}>
                  <span className="text-lg">{card.icon}</span>
                  <span className="text-xs font-bold tracking-widest uppercase">{card.label}</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">
                  {card.quote}{" "}
                  <span className="text-white font-semibold italic">{card.highlight}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Platform Section */}
      <section className="py-24 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                The Emotionally Intelligent Layer: <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">The GAVP Platform</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed mb-10">
                <p>
                  Deckoviz functions as a multi-dimensional system designed to complement premium interiors. It is a Mood and Ritual Engine, an Ambient Intelligence Layer, and a Storytelling Surface, all housed within a beautifully crafted hardware unit with minimalist wooden frames and halo backlighting.
                </p>
                <p>
                  At the heart of the platform is Vizzy, our proprietary AI. Vizzy acts as a 24/7 Creative Director, learning the aesthetic of a space and generating unique, high-fidelity art and visuals and ambiance that ensures the atmosphere is always in perfect sync with the moment.
                </p>
              </div>
            </motion.div>
            
            {/* Visual Showcase - Static Architect Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-indigo-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-xl shadow-2xl">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  <img
                    src={ARCHITECT_IMG}
                    alt="Deckoviz Architect Experience"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-3 text-violet-400 mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-semibold tracking-wider uppercase">Living Canvas</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Highlights Across Every Vertical */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Key Highlights Across Every Vertical</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#4f46e5] to-[#2563EB] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: 'For the Modern Home',
                subtitle: 'The Living Canvas',
                icon: <Home className="w-8 h-8 text-violet-400" />,
                desc: 'In residential design, Deckoviz becomes a member of the family. It moves beyond "décor" to become a ritual-driven centerpiece.',
                points: [
                  'Circadian Rhythm Sync: Visuals and light frequencies that shift from morning clarity to evening warmth.',
                  'The Ritual Engine: Automatically activate "Focus Mode" for home offices or "Celebration Mode" for family gatherings.',
                  'Emotional Resonance and Resilience: A space that adapts to the mood of the inhabitants, providing calm when needed and energy when desired.'
                ]
              },
              {
                id: 2,
                title: 'For Business Spaces',
                subtitle: 'Professional Narrative',
                icon: <Briefcase className="w-8 h-8 text-indigo-400" />,
                desc: 'In the corporate world, the environment must signal competence and vision.',
                points: [
                  'Dynamic Brand Identity: Replace generic office art with generative visuals that reflect the company\'s core values and real-time achievements.',
                  'The Intelligent Lobby: A first impression that moves, evolves, and communicates the "Future-Ready" nature of the firm.',
                  'Productivity Optimization: Using specific color palettes and generative rhythms to reduce employee stress and enhance deep work.'
                ]
              },
              {
                id: 3,
                title: 'For Customer-Facing Spaces',
                subtitle: 'The Experience Destination',
                icon: <ShoppingBag className="w-8 h-8 text-pink-400" />,
                desc: 'For retail, hospitality, and wellness, atmosphere is the primary product.',
                points: [
                  'The Social Magnet: Naturally photogenic "Instagram moments" that turn guests into brand advocates.',
                  'Immersive Storytelling: Use visuals and synchronized soundscapes to narrate the journey of a brand or the origin of a product.',
                  'Zero-Friction Transformation: Change the entire "vibe" of a restaurant or boutique for an event with a single voice command.'
                ]
              }
            ].map((vertical, idx) => (
              <motion.div 
                key={vertical.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="p-4 bg-black/50 rounded-2xl border border-white/5 w-fit mb-6 group-hover:scale-110 transition-transform duration-500">
                    {vertical.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-1 text-white">{vertical.title}</h3>
                  <h4 className="text-lg font-medium mb-4 text-violet-300">{vertical.subtitle}</h4>
                  <p className="text-gray-400 leading-relaxed mb-6">{vertical.desc}</p>
                  
                  <ul className="space-y-4 mt-auto">
                    {vertical.points.map((point, pIdx) => {
                      const [title, desc] = point.split(': ');
                      return (
                        <li key={pIdx} className="flex gap-3 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                          <p className="text-sm text-gray-300 leading-relaxed">
                            <strong className="text-white font-semibold">{title}:</strong> {desc}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Professionals Use Cases */}
      <section className="py-24 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Design Professionals: <br/>Use Cases for Your Own Practice
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Before recommending Deckoviz to a client, many architects and designers integrate the platform into their own creative workflows and personal spaces.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { title: 'The Digital Moodboard', desc: 'Use a large-scale Deckoviz unit in your studio to display rotating textures, inspirations, and project renders in high fidelity.', icon: <LayoutDashboard /> },
              { title: 'Portfolio Showcase', desc: 'Transform your office walls into a living portfolio that highlights your best work to visiting clients.', icon: <MonitorPlay /> },
              { title: 'Atmospheric Testing', desc: 'Use the generative art engine to test how different light frequencies and visual tones interact with the physical materials and lighting of your studio.', icon: <Lightbulb /> },
              { title: 'The "Vibe" Control', desc: 'Use Deckoviz in your own home to experience the same "Ambient Intelligence" you recommend to your clients.', icon: <Sparkles /> },
            ].map((useCase, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                  {React.cloneElement(useCase.icon as React.ReactElement, { size: 24 })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{useCase.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{useCase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 4 More Possibilities */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-['Playfair_Display'] font-semibold mb-8 text-center text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              4 More of The Many Possibilities
            </h3>
            
            <div className="space-y-6">
              {[
                { title: 'Dynamic Material & Texture Simulation', icon: <Layers />, desc: 'Use Deckoviz as a high-fidelity mood board in your studio. Instead of static samples, display generative visuals of flowing silks, rough stone, or shifting wood grains at a 1:1 scale. This allows you to see how different textures and colors interact with the natural light of your office throughout the day before committing to a final material palette.' },
                { title: 'The "Atmospheric Blueprint" for Client Presentations', icon: <MonitorPlay />, desc: 'During a project pitch, use Deckoviz to display the "soul" of your design. Rather than showing a 2D render on a laptop, have the Deckoviz unit on the wall cycle through the intended morning, afternoon, and evening "vibes" of the space you are building. It helps the client visualize the emotional life of the room, not just the furniture layout.' },
                { title: 'Lighting & Shadow Studies', icon: <Sun />, desc: 'Since Deckoviz features customizable halo backlighting and high-contrast visuals, you can use it to study how different light temperatures affect the surrounding paint and architectural details. It acts as a secondary light source that can be tuned to match the specific Kelvin temperature of your lighting plan, ensuring the art and the architecture are in perfect harmony.' },
                { title: 'Post-Handover Aesthetic Curation', icon: <Palette />, desc: 'Designers can offer "Atmospheric Curation" as an ongoing service. You can remotely manage the collections on your client\'s Deckoviz units, updating their home or office art seasonally or for special events. This keeps your design hand present in the space long after the physical construction is finished, ensuring the environment always looks as good as the day you handed over the keys.' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-300 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="p-4 bg-black/40 rounded-xl text-indigo-400 shrink-0">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3 text-white">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-base">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Partnership Model */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-black border border-violet-500/20 rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4f46e5] to-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6 text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  The Partnership Model
                </h2>
                <h3 className="text-2xl text-violet-300 font-medium mb-6">Effortless Value, Generous Rewards</h3>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  We believe that those who shape the physical world should be the ones to lead its digital evolution. We have designed a low-friction, high-reward partnership specifically for architects and interior designers who care about long-term value.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* How it Works */}
                <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                  <h4 className="text-2xl font-semibold mb-8 text-white border-b border-white/10 pb-4">How the Partnership Works</h4>
                  <p className="text-gray-400 mb-6 italic">This is a referral-based model designed to respect your time and your relationship with your clients.</p>
                  <ul className="space-y-6">
                    {[
                      { step: 'The Introduction', text: 'You refer an interested client (homeowner or business) to Deckoviz.' },
                      { step: 'The Hand-off', text: 'That is the extent of your involvement. There are no sales pitches to learn, no demos to run, and no operational burdens.' },
                      { step: 'The Reward', text: 'For every Deckoviz unit purchased through your referral, you receive 5% of the device value as a commission.' },
                      { step: 'The Fulfillment', text: 'We handle the demos, the technical integration, the shipping, and the white-glove setup.' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 font-bold text-sm border border-violet-500/30">
                          {i + 1}
                        </div>
                        <div>
                          <strong className="text-white block mb-1">{item.step}</strong>
                          <span className="text-gray-400 text-sm leading-relaxed">{item.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why it Makes Sense */}
                <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                  <h4 className="text-2xl font-semibold mb-8 text-white border-b border-white/10 pb-4">Why This Partnership Makes Sense</h4>
                  <ul className="space-y-6">
                    {[
                      { title: 'Trust-Based Influence', text: 'You already have the trust of your clients. You influence their decisions on design, ambiance, materials, lighting, and layout. Deckoviz is the next logical extension.' },
                      { title: 'Ongoing Revenue', text: 'Create a new revenue stream that requires zero inventory, zero follow-up, and no ongoing support obligations.' },
                      { title: 'Priority Access', text: 'Receive priority access to our team for custom integrations, early software updates, and dedicated support.' },
                      { title: 'Transparent Processing', text: 'Once a sale is confirmed, you receive an automated confirmation and prompt payment. Clean, professional, transparent.' }
                    ].map((item, i) => (
                      <li key={i} className="flex flex-col gap-1">
                        <strong className="text-indigo-300 font-semibold text-lg flex items-center gap-2">
                          <Heart className="w-4 h-4" /> {item.title}
                        </strong>
                        <span className="text-gray-400 text-sm leading-relaxed pl-6">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Pathways to Partnership */}
              <div className="mt-16">
                <h4 className="text-3xl font-['Playfair_Display'] font-semibold mb-8 text-center text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Pathways to Partnership</h4>
                <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">Flexibility for Your Practice. Whether you are working on a boutique residential renovation or a massive commercial development, Deckoviz fits into your workflow.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Diverse Client Portfolio', desc: 'Refer Deckoviz to both residential and business clients. Transformative in a private living room, corporate lobby, or retail store.' },
                    { title: 'Real Estate Developer Synergy', desc: 'A high-value "smart home" or "smart building" upgrade. Differentiate new developments in a competitive market.' },
                    { title: 'New and Legacy Relationships', desc: 'Not limited to new projects. Reach back into your portfolio of existing clients to offer an aesthetic and technological upgrade.' },
                    { title: 'Personal Integration & Mastery', desc: 'Get a unit for your own studio or home. Gain a professional tool to set creative moods, test lighting, or show clients what "Ambient Intelligence" feels like.' }
                  ].map((path, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-6">
                      <h5 className="text-lg font-semibold text-white mb-2">{path.title}</h5>
                      <p className="text-gray-400 text-sm">{path.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-black/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-semibold mb-8 text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Spaces Should Evolve <br/>and Adapt
            </h2>
            <div className="space-y-6 text-xl text-gray-300 font-light mb-12 leading-relaxed">
              <p>
                The era of the static interior is coming to a close. Clients are no longer just looking for a "look": they are looking for a feeling. They want spaces that respond to them, inspire them, and grow with them.
              </p>
              <p>
                Deckoviz is the tool that allows you to deliver that future today. It is a win-win: your clients get the most unique, intelligent design feature on the market, and you enhance your reputation as a forward-thinking designer while receiving a generous share of the value created.
              </p>
              <p className="font-semibold text-violet-300 italic text-2xl py-6">
                Great design is about more than what people see. It is about how they live.
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-10 max-w-2xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-semibold text-white mb-6">Join the Architectural Partnership Program</h3>
              <p className="text-gray-300 mb-8">Ready to bring ambient intelligence into your next project?</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePartnerClick}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)] transition-all duration-400 mb-6"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
                <a href="mailto:partners@deckoviz.com" className="hover:text-violet-400 transition-colors">📩 partners@deckoviz.com</a>
                <span className="hidden sm:inline">•</span>
                <a href="https://www.deckoviz.com" className="hover:text-violet-400 transition-colors">🌐 www.deckoviz.com</a>
              </div>
            </div>
            
            <p className="mt-12 text-gray-500 font-serif italic text-xl">
              Invite the future into your designs. Let the walls begin to tell the story.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default DeckovizArchitectsLanding;