import React from 'react';
import { 
  Building, 
  Sparkles, 
  Home, 
  Briefcase, 
  MonitorPlay,
  Sun,
  LayoutDashboard,
  Layers,
  ArrowRight,
  Coffee,
  MapPin,
  TrendingUp,
  Award,
  ChevronRight,
  CheckCircle2,
  Gem,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BUILDING_IMG = '/images/realestatenavbar.png';

const DeckovizForRealEstate = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="bg-[#050f0c] min-h-screen text-gray-100 font-sans selection:bg-emerald-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-emerald-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-teal-900/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-black/50 blur-[100px] rounded-full" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-semibold tracking-widest text-emerald-300 uppercase">Deckoviz For Real Estate Developers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-['Playfair_Display'] font-semibold mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Welcome To The Future Of{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-teal-200 to-emerald-500">Living</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mb-10 leading-relaxed">
              <span className="text-white font-medium">The Intelligent Development.</span>{" "}
              Transforming <span className="text-white">Static Properties</span> into{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Living, Generative Environments.</span>
            </p>

            {/* Story cards — break up dense paragraphs */}
            <div className="space-y-3 max-w-xl mb-10">
              {[
                {
                  delay: 0.4,
                  label: "The New Luxury",
                  color: "border-emerald-500/30 bg-emerald-500/5",
                  accent: "text-emerald-400",
                  icon: "◆",
                  text: "Luxury is no longer defined by the quality of materials or a prestigious zip code. It is defined by the",
                  highlight: "Experience."
                },
                {
                  delay: 0.55,
                  label: "The Buyer",
                  color: "border-teal-500/30 bg-teal-500/5",
                  accent: "text-teal-400",
                  icon: "◈",
                  text: "Modern buyers seek a space that understands them, responds to them, and",
                  highlight: "enhances their daily lives."
                },
                {
                  delay: 0.7,
                  label: "The Offer",
                  color: "border-cyan-500/30 bg-cyan-500/5",
                  accent: "text-cyan-400",
                  icon: "◉",
                  text: "With Deckoviz GAVP, you move beyond selling a physical asset and begin selling a",
                  highlight: "Future-Ready Lifestyle."
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: card.delay, ease: "easeOut" }}
                  className={`p-4 rounded-xl border backdrop-blur-md ${card.color} flex items-start gap-3 group hover:scale-[1.02] transition-transform duration-300`}
                >
                  <span className={`text-base mt-0.5 shrink-0 ${card.accent}`}>{card.icon}</span>
                  <div>
                    <span className={`text-[10px] font-bold tracking-widest uppercase block mb-1 ${card.accent}`}>{card.label}</span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {card.text}{" "}
                      <span className="text-white font-semibold italic">{card.highlight}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 text-emerald-950 rounded-full font-semibold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Integrate Deckoviz</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Hero Visual - Static Building Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ perspective: 1000 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 blur-[80px] rounded-full translate-x-10 translate-y-10" />
            
            <div className="relative aspect-[3/4] rounded-t-full rounded-b-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-emerald-900/50 p-2 bg-black/40 backdrop-blur-xl">
              <div className="w-full h-full rounded-t-full rounded-b-[2.5rem] overflow-hidden relative">
                <img
                  src={BUILDING_IMG}
                  alt="Deckoviz Real Estate"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f0c] via-transparent to-transparent" />
                <div className="absolute bottom-10 left-0 w-full text-center px-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-300 text-sm font-semibold tracking-wider uppercase">Living Sanctuary</span>
                      <Sparkles className="w-5 h-5 text-teal-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -left-12 bg-[#0a1a14] border border-emerald-500/30 rounded-2xl p-4 shadow-xl flex items-center gap-4 backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Gem className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Premium Value</p>
                <p className="text-emerald-400/80 text-xs">High-margin upsell</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Intelligence Layer Section */}
      <section className="py-32 relative z-10 border-t border-white/5 bg-[#030907]/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-semibold mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              The Intelligence Layer <br/>
              <span className="text-emerald-400 text-3xl md:text-4xl">Why Deckoviz is a No-Brainer</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Deckoviz is a multi-sensory infrastructure that combines AI-driven creation, mood engineering, and architectural design into one elegant package.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Differentiate Your Development', desc: 'In a crowded market, Deckoviz provides a visible, high-tech "wow factor" that separates your project from legacy developments.', icon: <Sparkles className="text-emerald-400" /> },
              { title: 'Enhance Perceived Value', desc: 'Integrating ambient intelligence adds a layer of sophisticated luxury that justifies premium pricing without the need for structural changes.', icon: <TrendingUp className="text-teal-400" /> },
              { title: 'The Vizzy AI Engine', desc: 'Our proprietary AI acts as a 24/7 creative curator for the homeowner, generating unique, high-fidelity art and atmospheric visuals that ensure the home never feels stagnant.', icon: <MonitorPlay className="text-emerald-300" /> },
              { title: 'Architectural Synergy', desc: 'Designed with minimalist wooden frames and halo backlighting, Deckoviz units are built to complement high-end interior design, not distract from it.', icon: <Layers className="text-teal-300" /> },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] p-10 hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-500">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-emerald-300 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Core Use Cases - Staggered Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6 text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                8 Core Use Cases
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6" />
              <p className="text-gray-400 text-lg leading-relaxed">
                From the moment a resident enters the lobby to the privacy of their own sanctuary, Deckoviz orchestrates the environment.
              </p>
            </div>
            <div className="hidden md:block">
              <Award className="w-20 h-20 text-emerald-500/20" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'The Living Reception and Lobby', desc: 'First impressions are everything. Replace static signage with a GAVP unit that adjusts energy: calm in the morning, vibrant during evening arrivals.', icon: <Building /> },
              { title: 'Immersive Apartment Staging', desc: 'Help buyers "feel" the life they could lead. Cycle through living rituals (Morning Yoga, Evening Lounge) to visualize the space\'s versatility.', icon: <Home /> },
              { title: 'Digital Concierge & Community', desc: 'Blend high-end art with essential community info, announcements, or local weather, ensuring utility never compromises aesthetics.', icon: <LayoutDashboard /> },
              { title: 'Amenity Space Ambiance', desc: 'Elevate shared gyms, spas, and lounges with synchronized visuals matching the activity, from high-intensity energy to meditative calm.', icon: <Coffee /> },
              { title: 'Corridor & Transition Energy', desc: 'Remove the "dead space" feel of hallways. Create a gallery-like experience that makes the walk to an apartment part of the premium journey.', icon: <MapPin /> },
              { title: 'Sales Center Storytelling', desc: 'Narrate the development\'s brand story, architectural inspiration, and future vision through generative visuals during the pre-sale phase.', icon: <Briefcase /> },
              { title: 'Circadian Well-being', desc: 'Position your development as wellness-first by syncing light and visual frequencies with the circadian rhythm, promoting better sleep.', icon: <Sun /> },
              { title: 'Seasonal & Cultural Adaptation', desc: 'Keep common areas fresh. Instantly update visual themes for holidays, local festivals, or seasonal changes with a single tap.', icon: <Sparkles /> },
            ].map((useCase, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="group relative p-8 bg-[#0a1510] border border-white/5 rounded-3xl hover:bg-[#0c1f17] hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full"
                style={{
                  transform: `translateY(${idx % 2 === 1 ? '2rem' : '0'})`
                }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-300 border border-emerald-500/20">
                  {React.cloneElement(useCase.icon as React.ReactElement, { size: 20 })}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{useCase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{useCase.desc}</p>
                <div className="mt-6 flex justify-end">
                  <ChevronRight className="w-5 h-5 text-emerald-500/0 group-hover:text-emerald-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Utility */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-[#030907]/50 backdrop-blur-3xl overflow-hidden mt-16">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-emerald-900/10 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 mb-6">
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">For Your Firm</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6 text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Internal Utility: <br/>Deckoviz for Your Own Work
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl">
                Real estate firms can use Deckoviz within their own headquarters and creative studios to optimize their professional environment and impress investors.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'Interactive Portfolio Displays', desc: 'Showcase your past developments and future renders in high-fidelity, living detail to visiting investors and partners.' },
                  { title: 'The Dynamic Boardroom', desc: 'Shift the energy of your meeting spaces based on the objective: "Deep Work" mode for planning or "Celebration" mode for closing a deal.' },
                  { title: 'Brand Narrative Hub', desc: 'Maintain a consistent, high-end brand aesthetic across your offices, managed from one central cloud dashboard.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-5 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle2 size={24} className="opacity-80 group-hover:opacity-100" />
                    </div>
                    <div>
                      <strong className="text-white block mb-2 text-xl font-medium">{item.title}</strong>
                      <span className="text-gray-400 leading-relaxed block">{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:h-[700px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-emerald-500/5 border border-white/10 rounded-[3rem] transform rotate-3 scale-105" />
              <div className="relative w-full aspect-[4/5] lg:h-full rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl z-10">
                <img src={BUILDING_IMG} alt="Real Estate Presentation" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f0c] via-transparent to-transparent flex items-end p-10">
                  <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-6 w-full">
                    <div className="flex items-center gap-3 mb-2 text-emerald-300">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="font-semibold tracking-wide">Professional Edge</span>
                    </div>
                    <p className="text-white text-lg font-light">Transforming your headquarters into a showcase of future living.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Partnership Model */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6 text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              The Partnership Model
            </h2>
            <h3 className="text-2xl text-emerald-400 font-medium mb-6">Flexible, Commercial, Future-Facing</h3>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              We offer multiple high-leverage ways for real estate developers to integrate Deckoviz into their commercial strategy, creating new revenue streams and unparalleled differentiation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {/* Connecting lines for visual structure */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            {[
              {
                num: '01',
                title: 'Premium Gift for Buyers',
                desc: 'Position your development as a thoughtful, experience-led brand by including a Deckoviz unit as a move-in gift. This can be a single unit for the main living area or a "Full Home Package" for luxury penthouses. It ensures the first night in their new home is unforgettable.'
              },
              {
                num: '02',
                title: 'Premium Add-On and Upsell',
                desc: 'Offer Deckoviz as a paid ambiance upgrade during the customization phase. Homeowners can choose to "AI-enable" specific rooms or the entire apartment. This creates a high-margin revenue stream for the developer while providing the client with a future-proof home.'
              },
              {
                num: '03',
                title: 'Referral-Based Revenue Share',
                desc: 'For a lighter-touch approach, developers can refer their buyers and existing residents to the Deckoviz platform.\n\n• The Reward: For every unit sold, receive 5% of the device value.\n• The Logistics: No inventory, no fulfillment. We handle white-glove setup.'
              },
              {
                num: '04',
                title: 'Bulk Deployment Across Phases',
                desc: 'Standardize intelligence across your entire portfolio. We offer scalable bulk pricing for developers looking to include Deckoviz as a standard feature in every unit of a new building or phase, ensuring "Ambient Intelligence" becomes a core part of your brand\'s DNA.'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2.5rem] p-10 hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute -right-8 -top-8 text-[120px] font-bold text-white/[0.02] group-hover:text-emerald-500/[0.05] transition-colors duration-500 font-serif leading-none">
                  {item.num}
                </div>
                
                <h4 className="text-2xl font-semibold mb-6 text-white relative z-10 flex items-center gap-4">
                  <span className="text-emerald-400 text-lg font-mono">{item.num}.</span>
                  {item.title}
                </h4>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line relative z-10 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050f0c] to-[#020604] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-emerald-900/10 to-transparent blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] font-semibold mb-10 text-white leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Homes Should Be Intelligent. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 italic">And Now, They Are.</span>
            </h2>
            
            <div className="space-y-6 text-xl md:text-2xl text-gray-300 font-light mb-16 leading-relaxed max-w-3xl mx-auto">
              <p>
                A home is no longer just a collection of walls and furniture. It is a living, breathing entity that should adapt, respond, and evolve with the people inside it.
              </p>
              <p>
                Deckoviz GAVP is the easiest, most impactful way to bridge the gap between physical real estate and digital intelligence.
              </p>
              <div className="py-8 my-8 border-y border-white/10">
                <p className="font-semibold text-white tracking-wide">
                  Most things you build fill space; <span className="text-emerald-400">Deckoviz shapes how your residents live and feel within it.</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl rounded-[3rem] p-12 max-w-2xl mx-auto shadow-[0_0_100px_rgba(16,185,129,0.1)]">
              <h3 className="text-3xl font-semibold text-white mb-4">Invite the Future into Your Development</h3>
              <p className="text-gray-300 mb-10 text-lg">Ready to transform your properties into intelligent environments?</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContactClick}
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-5 rounded-full font-semibold text-lg text-[#050f0c] bg-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.3)] hover:shadow-[0_0_60px_rgba(52,211,153,0.5)] hover:bg-emerald-300 transition-all duration-400 mb-8"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base text-gray-400 font-medium">
                <a href="mailto:partners@deckoviz.com" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">📩</div> 
                  partners@deckoviz.com
                </a>
                <span className="hidden sm:inline text-white/20">|</span>
                <a href="https://www.deckoviz.com" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">🌐</div> 
                  www.deckoviz.com
                </a>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default DeckovizForRealEstate;