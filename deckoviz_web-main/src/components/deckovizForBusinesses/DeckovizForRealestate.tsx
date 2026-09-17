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
    <div 
      className="relative min-h-screen text-[#0E2438] overflow-x-hidden selection:bg-[#5CD9C4] selection:text-[#071B2C]"
      style={{
        background: `
          radial-gradient(ellipse 60% 45% at 15% 0%, #DDF6F0 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at 100% 15%, rgba(14, 169, 155, 0.10) 0%, transparent 55%),
          linear-gradient(180deg, #F6FAF9 0%, #EDF6F4 100%)
        `,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-fraunces {
          font-family: 'Fraunces', serif;
        }

        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 25px) scale(1.05); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -35px) scale(1.1); }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0.6); }
          70% { box-shadow: 0 0 0 9px rgba(14, 169, 155, 0); }
          100% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0); }
        }
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        .animate-float-a { animation: floatA 22s ease-in-out infinite; }
        .animate-float-b { animation: floatB 26s ease-in-out infinite; }
        .animate-float-c { animation: floatC 30s ease-in-out infinite; }
        .animate-pulse-dot { animation: pulseDot 2.2s infinite; }

        .grad-text {
          background: linear-gradient(100deg, #0EA99B, #1B4C79, #2FC2AE);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradShift 7s linear infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.56);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow: 0 20px 60px -25px rgba(11, 42, 69, 0.25);
        }
      `}</style>

      {/* Decorative Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[38vw] h-[38vw] top-[-8%] left-[-10%] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle,#9BE8DB,transparent_70%)] animate-float-a" />
        <div className="absolute w-[34vw] h-[34vw] top-[8%] right-[-8%] rounded-full blur-[90px] opacity-32 bg-[radial-gradient(circle,#5CD9C4,transparent_70%)] animate-float-b" />
        <div className="absolute w-[30vw] h-[30vw] bottom-[6%] left-[20%] rounded-full blur-[90px] opacity-16 bg-[radial-gradient(circle,#1B4C79,transparent_72%)] animate-float-c" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
              Deckoviz For Real Estate Developers
            </div>
            
            <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-tight">
              Welcome To The Future Of <span className="grad-text italic">Living</span>
            </h1>
            
            <p className="text-[#4C6A83] text-xl md:text-2xl font-normal leading-relaxed">
              <span className="text-[#0B2A45] font-medium">The Intelligent Development.</span> Transforming <span className="text-[#0B2A45] font-medium">Static Properties</span> into <span className="grad-text font-medium">Living, Generative Environments.</span>
            </p>

            {/* Story cards */}
            <div className="space-y-3 max-w-xl">
              {[
                {
                  delay: 0.4,
                  label: "The New Luxury",
                  text: "Luxury is no longer defined solely by materials or ZIP code. It is defined by the",
                  highlight: "Experience."
                },
                {
                  delay: 0.55,
                  label: "The Buyer",
                  text: "Modern buyers seek a space that understands them, responds to them, and",
                  highlight: "enhances their daily lives."
                },
                {
                  delay: 0.7,
                  label: "The Offer",
                  text: "With Deckoviz, you move beyond selling a physical asset and begin selling a",
                  highlight: "Future-Ready Lifestyle."
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: card.delay, ease: "easeOut" }}
                  className="glass-card p-4 rounded-2xl border border-white/80 flex items-start gap-3 hover:translate-x-1 transition-transform duration-300"
                >
                  <span className="text-[#0EA99B] font-bold mt-0.5 shrink-0">◆</span>
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase block mb-1 text-[#0A8378]">{card.label}</span>
                    <p className="text-[#4C6A83] text-sm leading-relaxed">
                      {card.text}{" "}
                      <span className="text-[#0B2A45] font-semibold italic">{card.highlight}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>Integrate Deckoviz</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="glass-card rounded-[3rem] p-4 border border-white/80 shadow-2xl">
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden">
                <img
                  src={BUILDING_IMG}
                  alt="Deckoviz Real Estate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A45]/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-6 right-6">
                  <div className="glass-card rounded-2xl p-5 border border-white/80 shadow-lg text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-semibold tracking-wider uppercase">Living Sanctuary</span>
                      <Sparkles className="w-5 h-5 text-[#5CD9C4]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 -left-8 glass-card rounded-2xl p-4 shadow-xl flex items-center gap-4 border border-white/90"
            >
              <div className="w-10 h-10 rounded-xl bg-[#DDF6F0] flex items-center justify-center text-[#0EA99B]">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[#0B2A45] font-semibold text-sm">Premium Value</p>
                <p className="text-[#4C6A83] text-xs">High-margin upsell</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Intelligence Layer Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium text-[#0B2A45] leading-tight">
              The Intelligence Layer <br/>
              <span className="grad-text">Why Deckoviz is a No-Brainer</span>
            </h2>
            <p className="text-[#4C6A83] text-lg sm:text-xl font-normal leading-relaxed">
              Deckoviz is a multi-sensory infrastructure combining AI creation, mood engineering, and architectural design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Differentiate Your Development', desc: 'In a crowded market, Deckoviz provides a visible, high-tech "wow factor" that separates your project from legacy developments.', icon: <Sparkles className="text-[#0EA99B]" /> },
              { title: 'Enhance Perceived Value', desc: 'Integrating ambient intelligence adds a layer of sophisticated luxury that justifies premium pricing without structural changes.', icon: <TrendingUp className="text-[#0EA99B]" /> },
              { title: 'The Vizzy AI Engine', desc: 'Our proprietary AI acts as a 24/7 creative curator for the homeowner, generating unique, high-fidelity art and atmospheric visuals.', icon: <MonitorPlay className="text-[#0EA99B]" /> },
              { title: 'Architectural Synergy', desc: 'Designed with minimalist wooden frames and halo backlighting, Deckoviz units are built to complement high-end interior design.', icon: <Layers className="text-[#0EA99B]" /> },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center mb-6 shadow-sm">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 26 })}
                </div>
                
                <h3 className="font-fraunces text-2xl font-medium text-[#0B2A45] mb-3">{feature.title}</h3>
                <p className="text-[#4C6A83] text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Core Use Cases */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <div className="max-w-2xl space-y-3">
              <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">
                8 Core Use Cases
              </h2>
              <p className="text-[#4C6A83] text-lg leading-relaxed">
                From the moment a resident enters the lobby to the privacy of their own sanctuary, Deckoviz orchestrates the environment.
              </p>
            </div>
            <Award className="w-16 h-16 text-[#0EA99B]/30 hidden md:block" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'The Living Reception & Lobby', desc: 'First impressions are everything. Replace static signage with a GAVP unit that adjusts energy from morning calm to evening arrivals.', icon: <Building /> },
              { title: 'Immersive Apartment Staging', desc: 'Help buyers feel the life they could lead. Cycle through living rituals (Morning Yoga, Evening Lounge) to show space versatility.', icon: <Home /> },
              { title: 'Digital Concierge & Community', desc: 'Blend high-end art with essential community info, announcements, or local weather without compromising aesthetics.', icon: <LayoutDashboard /> },
              { title: 'Amenity Space Ambiance', desc: 'Elevate shared gyms, spas, and lounges with synchronized visuals matching the activity, from energy to meditative calm.', icon: <Coffee /> },
              { title: 'Corridor & Transition Energy', desc: 'Remove dead hallway space. Create a gallery-like experience that makes the walk to an apartment part of the premium journey.', icon: <MapPin /> },
              { title: 'Sales Center Storytelling', desc: 'Narrate the development\'s brand story, architectural inspiration, and vision through generative visuals during pre-sale.', icon: <Briefcase /> },
              { title: 'Circadian Well-being', desc: 'Position your development as wellness-first by syncing light and visual frequencies with natural circadian rhythms.', icon: <Sun /> },
              { title: 'Seasonal & Cultural Adaptation', desc: 'Keep common areas fresh. Instantly update visual themes for holidays, local festivals, or seasonal changes with a tap.', icon: <Sparkles /> },
            ].map((useCase, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 text-[#0EA99B] flex items-center justify-center mb-5 shadow-sm">
                    {React.cloneElement(useCase.icon as React.ReactElement, { size: 22 })}
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-3">{useCase.title}</h3>
                  <p className="text-[#4C6A83] text-sm leading-relaxed">{useCase.desc}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <ChevronRight className="w-5 h-5 text-[#0EA99B]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Utility */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wider uppercase">
                For Your Firm
              </div>
              
              <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45] leading-tight">
                Internal Utility: <br/>Deckoviz for Your Own Work
              </h2>
              <p className="text-[#4C6A83] text-lg leading-relaxed max-w-xl">
                Real estate firms can use Deckoviz within their own headquarters and creative studios to optimize their professional environment and impress investors.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Interactive Portfolio Displays', desc: 'Showcase your past developments and future renders in high-fidelity, living detail to visiting investors and partners.' },
                  { title: 'The Dynamic Boardroom', desc: 'Shift meeting space energy based on objective: "Deep Work" for planning or "Celebration" for closing a deal.' },
                  { title: 'Brand Narrative Hub', desc: 'Maintain a consistent, high-end brand aesthetic across your offices, managed from one central cloud dashboard.' }
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 border border-white/80 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#DDF6F0] text-[#0EA99B] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-fraunces text-lg font-medium text-[#0B2A45] mb-1">{item.title}</h4>
                      <p className="text-[#4C6A83] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-[3rem] p-4 border border-white/80 shadow-2xl"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                <img src={BUILDING_IMG} alt="Real Estate Presentation" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A45]/80 via-transparent to-transparent flex items-end p-8">
                  <div className="glass-card rounded-2xl p-6 border border-white/80 text-white w-full">
                    <div className="flex items-center gap-3 mb-2 text-[#5CD9C4]">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="font-semibold text-sm tracking-wide">Professional Edge</span>
                    </div>
                    <p className="text-white text-base font-light">Transforming your headquarters into a showcase of future living.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Partnership Model */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">
              The Partnership Model
            </h2>
            <h3 className="text-xl text-[#0EA99B] font-semibold">Flexible, Commercial, Future-Facing</h3>
            <p className="text-[#4C6A83] text-lg font-normal leading-relaxed">
              We offer multiple high-leverage ways for real estate developers to integrate Deckoviz into their commercial strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Premium Gift for Buyers',
                desc: 'Position your development as a thoughtful, experience-led brand by including a Deckoviz unit as a move-in gift. This ensures the first night in their new home is unforgettable.'
              },
              {
                num: '02',
                title: 'Premium Add-On and Upsell',
                desc: 'Offer Deckoviz as a paid ambiance upgrade during customization. Homeowners can choose to "AI-enable" specific rooms or the entire apartment.'
              },
              {
                num: '03',
                title: 'Referral-Based Revenue Share',
                desc: 'Refer buyers to the Deckoviz platform. Receive 5% of device value for every unit sold, with zero inventory management or fulfillment hassle.'
              },
              {
                num: '04',
                title: 'Bulk Deployment Across Phases',
                desc: 'Standardize intelligence across your portfolio. Scalable bulk pricing for developers including Deckoviz as standard in every unit.'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg relative overflow-hidden"
              >
                <div className="text-4xl font-fraunces font-bold text-[#0EA99B]/30 mb-4">{item.num}</div>
                <h4 className="font-fraunces text-2xl font-medium text-[#0B2A45] mb-3">{item.title}</h4>
                <p className="text-[#4C6A83] leading-relaxed text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-fraunces text-4xl sm:text-6xl font-medium text-[#0B2A45] leading-tight">
              Homes Should Be Intelligent. <br/>
              <span className="grad-text italic">And Now, They Are.</span>
            </h2>
            
            <p className="text-[#4C6A83] text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
              A home is no longer just a collection of walls and furniture. Deckoviz GAVP is the easiest, most impactful way to bridge physical real estate and digital intelligence.
            </p>

            <div className="glass-card rounded-3xl p-10 max-w-2xl mx-auto border border-white/80 shadow-2xl space-y-6">
              <h3 className="font-fraunces text-3xl font-medium text-[#0B2A45]">Invite the Future into Your Development</h3>
              <p className="text-[#4C6A83] text-base">Ready to transform your properties into intelligent environments?</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-[#0EA99B] to-[#123C63] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#4C6A83] font-medium pt-4">
                <a href="mailto:partners@deckoviz.com" className="hover:text-[#0EA99B] transition-colors flex items-center gap-2">
                  <span>📩 partners@deckoviz.com</span>
                </a>
                <span className="hidden sm:inline text-[#7C93A6]">|</span>
                <a href="https://www.deckoviz.com" className="hover:text-[#0EA99B] transition-colors flex items-center gap-2">
                  <span>🌐 www.deckoviz.com</span>
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