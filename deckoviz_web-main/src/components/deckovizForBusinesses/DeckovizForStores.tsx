import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Sparkles, Zap, Clock, Users, Leaf, Globe, 
  MonitorPlay, Shield, Heart, ArrowRight, TrendingUp, Palette
} from 'lucide-react';
import { RetailUseCasesJourney } from './DeckovizForRetailStores';

const retailImages = ["/images/retail-images/ChatGPT Image May 18, 2026, 12_58_36 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_58_45 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_58_49 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_58_53 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_58_57 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_59_01 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_59_05 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_59_12 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_59_17 AM.png","/images/retail-images/ChatGPT Image May 18, 2026, 12_59_20 AM.png"];

const retailGalleryPaths = [
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_58_36 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_58_45 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_58_49 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_58_53 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_58_57 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_59_01 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_59_05 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_59_12 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_59_17 AM.png",
  "/images/retail-images/ChatGPT Image May 18, 2026, 12_59_20 AM.png"
];

const DeckovizForRetail = () => {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevImg(currentImg);
      setFading(true);
      setTimeout(() => {
        setCurrentImg(i => (i + 1) % retailImages.length);
        setFading(false);
        setPrevImg(null);
      }, 600);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentImg]);

  const handleDemoClick = () => {
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
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-12 overflow-hidden z-10">
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
            Deckoviz For Retail & Showrooms
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-fraunces text-5xl md:text-7xl lg:text-8xl font-medium text-[#0B2A45] leading-tight"
          >
            The Retail Renaissance: <br className="hidden md:block" />
            <span className="grad-text">Beyond the Transaction</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-3xl text-[#4C6A83] font-normal max-w-4xl mx-auto leading-relaxed"
          >
            Turning Physical Stores into <span className="italic text-[#0B2A45] font-medium">Intelligent, Generative Experiences</span>.
          </motion.p>

          <div className="glass-card rounded-3xl p-8 md:p-12 max-w-5xl mx-auto text-left border border-white/80 shadow-xl space-y-4 text-[#4C6A83] text-lg leading-relaxed">
            <p>
              The physical store is not dying; it is being reborn. In an era where every product is available with a click, the purpose of a physical location has fundamentally shifted. It is a destination to experience a brand.
            </p>
            <p>
              Your walls are the most underutilized assets in your business. Deckoviz transforms those surfaces into a Generative Ambiance and Visual Platform (GAVP), creating a living, breathing infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="py-16 relative z-10 overflow-hidden">
        <div className="relative z-10">
          <motion.div
            className="flex w-max items-center gap-5 md:gap-7"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
          >
            {[...retailGalleryPaths, ...retailGalleryPaths].map((img, idx) => {
              const isFeature = idx % 5 === 1 || idx % 5 === 3;
              return (
                <div key={idx} className="shrink-0 py-4">
                  <div
                    className={`glass-card rounded-[2rem] p-2 border border-white/80 shadow-xl overflow-hidden ${
                      isFeature ? "w-[76vw] max-w-[600px] md:w-[540px]" : "w-[68vw] max-w-[480px] md:w-[420px]"
                    }`}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[1.55rem]">
                      <img
                        src={img}
                        alt="Retail Visual"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 01. The AI Layer */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 space-y-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#0EA99B] font-mono text-xl">01.</span>
              <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">The AI Layer: Integrating Intelligence</h2>
            </div>
            <p className="text-xl text-[#4C6A83] max-w-3xl">Deckoviz is a creative intelligence engine that lives inside your architecture.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Introducing Vizzy: Your 24/7 Creative Intelligence', desc: 'Vizzy acts as your on-site Creative Director. It understands your brand’s color palettes, seasonal vibes, and core values to generate unique art.', icon: <Sparkles className="w-6 h-6 text-[#0EA99B]" /> },
              { title: 'Generative Brand Synthesis', desc: 'Input a theme like "Sustainable Summer" and the GAVP generates an infinite stream of unique visuals matching that exact mood.', icon: <Palette className="w-6 h-6 text-[#0EA99B]" /> },
              { title: 'The Intelligence of Adaptation', desc: 'By integrating with your store’s rhythm, the AI layer identifies the visual cadences that resonate most with customer traffic.', icon: <TrendingUp className="w-6 h-6 text-[#0EA99B]" /> },
              { title: 'The Zero-Friction Campaign', desc: 'If a trend goes viral at 10:00 AM, your walls reflect that trend in your brand aesthetic by 10:05 AM. End of static retail.', icon: <Zap className="w-6 h-6 text-[#0EA99B]" /> }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }} className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF6F0] flex items-center justify-center mb-6 shadow-sm">{item.icon}</div>
                <h3 className="font-fraunces text-2xl font-medium text-[#0B2A45] mb-3">{item.title}</h3>
                <p className="text-[#4C6A83] leading-relaxed text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. The Experience & Ambiance Layer */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[#0EA99B] font-mono text-xl">02.</span>
                <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">The Experience Layer</h2>
              </div>
              <p className="text-xl text-[#4C6A83]">
                People do not return to stores because of the prices; they return because of how the space made them feel.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Atmospheric Infrastructure', desc: 'Frames blend into premium interiors, creating a halo glow that shifts room mood.' },
                  { title: 'Multisensory Storytelling', desc: 'Integrate high-end generative art with curated soundscapes and narration.' },
                  { title: 'Visual Resonance over Visual Noise', desc: 'Enhance product beauty and guest comfort instead of harsh ads screaming for attention.' },
                  { title: 'Psychological Anchoring', desc: 'Color frequencies and generative patterns help lower customer stress and increase discovery.' }
                ].map((item, idx) => (
                  <div key={idx} className="glass-card rounded-2xl p-5 border border-white/80 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#DDF6F0] text-[#0EA99B] flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-fraunces text-lg font-medium text-[#0B2A45] mb-1">{item.title}</h4>
                      <p className="text-[#4C6A83] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="glass-card rounded-[3rem] p-4 border border-white/80 shadow-2xl">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                <img src={retailImages[currentImg]} alt="Deckoviz retail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A45]/80 via-transparent to-transparent flex items-end p-8">
                  <div className="glass-card rounded-2xl p-6 border border-white/80 text-white w-full">
                    <div className="flex items-center gap-3 text-[#5CD9C4] mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-xs font-semibold tracking-wider uppercase">Designing Human Ambiance</span>
                    </div>
                    <p className="font-fraunces text-xl font-medium text-white">Transforming retail into immersive destinations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 03. 8 Core Use Cases */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-3">
              <span className="text-[#0EA99B] font-mono text-xl">03.</span>
              <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">8 Core Use Cases</h2>
            </div>
            <p className="text-xl text-[#4C6A83]">For the Modern Retailer</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'The Living Storefront', desc: 'Replace static windows with a portal to your brand\'s soul.', icon: <MonitorPlay /> },
              { title: 'Product Origin Narratives', desc: 'Tell farm-to-fabric stories through visual loops behind featured items.', icon: <Leaf /> },
              { title: 'Real-Time Seasonal Metamorphosis', desc: 'Instantly redecorate for Spring or holidays with a tap.', icon: <Sparkles /> },
              { title: 'Lifestyle Staging for Apparel', desc: 'Show apparel in front of generative misty mountain morning visuals.', icon: <ShoppingBag /> },
              { title: 'Interactive Launch Countdown', desc: 'Create hype for product drops with visual timers taking over the ambiance.', icon: <Clock /> },
              { title: 'The VIP Personalization Suite', desc: 'In styling rooms, let VIP customers choose their own visual mood.', icon: <Users /> },
              { title: 'Global Brand Synchronization', desc: 'Manage the Experience Layer of hundreds of stores centrally.', icon: <Globe /> },
              { title: 'Customer Celebration', desc: 'Display curated community mementos and UGC art to build belonging.', icon: <Heart /> },
            ].map((useCase, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }} className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg hover:-translate-y-1.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF6F0] text-[#0EA99B] flex items-center justify-center mb-4">
                  {React.cloneElement(useCase.icon as React.ReactElement, { size: 22 })}
                </div>
                <h4 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-2">{useCase.title}</h4>
                <p className="text-sm text-[#4C6A83] leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. 12 Massive Benefits */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-3">
              <span className="text-[#0EA99B] font-mono text-xl">04.</span>
              <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">12 Massive Benefits</h2>
            </div>
            <p className="text-xl text-[#4C6A83]">The Hard ROI of Intelligent Walls</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Increased Dwell Time', desc: 'Immersive environments keep customers in-store up to 25% longer.', icon: <Clock /> },
              { title: 'Significant Cost Elimination', desc: 'Remove annual costs for printing, shipping, and installing static signage.', icon: <TrendingUp /> },
              { title: 'Higher Average Order Value', desc: 'Visual upselling guides customers toward high-margin accessories.', icon: <ShoppingBag /> },
              { title: 'Zero Operational Friction', desc: 'Staff focus on customers while updates happen in seconds centrally.', icon: <Zap /> },
              { title: 'Brand Perception Elevation', desc: 'Position your stores as premium category leaders.', icon: <Sparkles /> },
              { title: 'Rapid Campaign Agility', desc: 'Launch global marketing instantly and test visual themes in real time.', icon: <Globe /> },
              { title: 'Reduced Purchase Anxiety', desc: 'Immersive storytelling builds trust and confidence in buying.', icon: <Shield /> },
              { title: 'Talent Attraction', desc: 'A beautiful, high-tech store improves morale and staff retention.', icon: <Users /> },
              { title: 'Sustainability Leadership', desc: 'Dramatically reduce carbon footprint by eliminating paper and vinyl waste.', icon: <Leaf /> },
              { title: 'Organic Social Amplification', desc: 'Create Instagrammable spaces that customers naturally share.', icon: <Heart /> },
              { title: 'Optimized Floor Space', desc: 'Lives on walls, providing marketing impact without losing shelf space.', icon: <MonitorPlay /> },
              { title: 'Future-Proof Platform', desc: 'Continually improves through central software updates.', icon: <Zap /> },
            ].map((benefit, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }} className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#DDF6F0] text-[#0EA99B] flex items-center justify-center shrink-0">
                  {React.cloneElement(benefit.icon as React.ReactElement, { size: 20 })}
                </div>
                <div>
                  <h4 className="font-fraunces text-lg font-medium text-[#0B2A45] mb-1">{benefit.title}</h4>
                  <p className="text-sm text-[#4C6A83] leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive into Use Cases Journey */}
      <RetailUseCasesJourney onDemo={handleDemoClick} />

      {/* 05. The Future of Retail */}
      <section className="py-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
            <h2 className="font-fraunces text-4xl sm:text-6xl font-medium text-[#0B2A45] leading-tight">
              The Future of Retail is <br/><span className="grad-text italic">Ambiently Intelligent</span>
            </h2>
            
            <p className="text-[#4C6A83] text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
              Static walls are a relic of the past. <strong className="text-[#0B2A45]">Deckoviz GAVP</strong> is the easiest upgrade you can make to your retail business with the highest emotional and financial return.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDemoClick}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-[#0EA99B] to-[#123C63] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Schedule Your Private Retail Demo</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeckovizForRetail;
