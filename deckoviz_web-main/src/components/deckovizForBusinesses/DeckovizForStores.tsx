import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Sparkles, Zap, Clock, Users, Leaf, Globe, 
  MonitorPlay, Shield, Heart, ArrowRight, TrendingUp, Palette
} from 'lucide-react';
import { RetailUseCasesJourney } from './DeckovizForRetailStores';

const retailImages = Array.from({ length: 15 }, (_, i) => `/images/h${(i % 5) + 1}.png`); // Placeholder images

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
    <div className="bg-[#0f0f13] min-h-screen text-gray-100 font-sans selection:bg-violet-500/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, -50, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/20 rounded-full blur-[150px] mix-blend-screen" 
          />
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
            <span className="text-sm font-medium tracking-wider text-violet-200 uppercase">Deckoviz For Retail Stores</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] font-semibold mb-8 leading-tight tracking-tight"
          >
            The Retail Renaissance: <br className="hidden md:block" />
            <motion.span 
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-500 bg-[length:200%_auto]"
            >
              Beyond the Transaction
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Turning Physical Stores into <span className="italic text-white">Intelligent, Generative Experiences</span>.
          </motion.p>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-5xl mx-auto text-left shadow-2xl">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              The physical store is not dying; it is being reborn. In an era where every product is available with a click, the purpose of a physical location has fundamentally shifted. It is no longer a place to simply store inventory. It is a destination to experience a brand.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Your walls are the most underutilized assets in your business. Deckoviz transforms those surfaces into a Generative Ambiance and Visual Platform (GAVP), creating a living, breathing infrastructure that reacts to your brand, your customers, and your goals in real time.
            </p>
          </div>
        </div>
      </section>

      {/* 01. The AI Layer */}
      <section className="py-24 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-violet-400 font-mono text-xl">01.</span>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold text-white">The AI Layer: Integrating Intelligence</h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl">Deckoviz is not digital signage; it is a creative intelligence engine that lives inside your architecture.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Introducing Vizzy: Your 24/7 Creative Intelligence', desc: 'Most retail teams are bottlenecked by design timelines. Vizzy acts as your on-site Creative Director. It understands your brand’s color palettes, seasonal vibes, and core values to generate unique, high-fidelity art and marketing visuals on demand.', icon: <Sparkles className="w-8 h-8 text-violet-400" /> },
              { title: 'Generative Brand Synthesis', desc: 'Input a theme like "Sustainable Summer" and the GAVP generates an infinite stream of unique visuals that match that exact mood. Your store never looks the same twice, yet always feels perfectly on-brand.', icon: <Palette className="w-8 h-8 text-fuchsia-400" /> },
              { title: 'The Intelligence of Adaptation', desc: 'This is a platform that learns. By integrating with your store’s rhythm, the AI layer identifies the visual cadences that resonate most with your traffic, optimising emotional resonance every hour.', icon: <TrendingUp className="w-8 h-8 text-amber-400" /> },
              { title: 'The Zero-Friction Campaign', desc: 'Move at the speed of culture. If a trend goes viral at 10:00 AM, your walls reflect that trend, styled in your brand\'s aesthetic, by 10:05 AM. The end of the "static" retail era.', icon: <Zap className="w-8 h-8 text-rose-400" /> }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: idx * 0.15 }} className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-6">
                  <div className="p-4 bg-black/50 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. The Experience & Ambiance Layer */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-fuchsia-400 font-mono text-xl">02.</span>
                <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-2 leading-tight">The Experience Layer</h2>
              </div>
              <p className="text-xl text-gray-300 mb-12 font-light">
                People do not return to stores because of the prices; they return because of how the space made them feel.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'Atmospheric Infrastructure', desc: 'We view light and visuals as architectural materials. Our frames blend into premium interiors, creating a glow that shifts the entire mood of the room.' },
                  { title: 'Multisensory Storytelling', desc: 'Retail is a sensory game. Integrate high-end generative art with curated soundscapes and narration. This is total immersion.' },
                  { title: 'Visual Resonance over Visual Noise', desc: 'Traditional digital ads scream for attention. Deckoviz creates Visual Resonance, enhancing the beauty of the product and comfort of the guest.' },
                  { title: 'Psychological Anchoring', desc: 'Specific color frequencies and generative patterns help lower customer stress, increase "Discovery Mode", and naturally raise conversion and AOV.' }
                ].map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }} className="flex gap-4 items-start">
                    <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-amber-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-xl">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  {prevImg !== null && (
                    <img key={`prev-${prevImg}`} src={retailImages[prevImg]} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.6s ease' }} />
                  )}
                  <img key={`curr-${currentImg}`} src={retailImages[currentImg]} alt="Deckoviz retail" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: fading ? 1 : 1, transition: 'opacity 0.6s ease' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-3 text-amber-400 mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-semibold tracking-wider uppercase">Designing Human State-of-Being</span>
                    </div>
                    <p className="text-xl text-white font-['Playfair_Display']">Transforming retail into immersive destinations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 03. 8 Core Use Cases */}
      <section className="py-24 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16 text-center">
             <div className="inline-flex items-center justify-center gap-4 mb-4">
              <span className="text-amber-400 font-mono text-xl">03.</span>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold text-white">8 Core Use Cases</h2>
            </div>
            <p className="text-xl text-gray-400">For the Modern Retailer</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'The Living Storefront', desc: 'Replace static windows with a portal to your brand\'s soul, changing based on weather or traffic.', icon: <MonitorPlay /> },
              { title: 'Product Origin Narratives', desc: 'Tell "Farm-to-Fabric" stories through beautiful, high-definition visual loops behind featured items.', icon: <Leaf /> },
              { title: 'Real-Time Seasonal Metamorphosis', desc: 'Instantly redecorate for Spring or Black Friday with a voice command. No waste, no labor.', icon: <Sparkles /> },
              { title: '"Lifestyle Staging" for Apparel', desc: 'A jacket in front of a generative misty Alpine morning becomes a powerful lifestyle choice.', icon: <ShoppingBag /> },
              { title: 'Interactive Launch Countdown', desc: 'Create massive hype for drops with visual timers and reveal art taking over the atmosphere.', icon: <Clock /> },
              { title: 'The VIP Personalization Suite', desc: 'In private styling rooms, let customers choose their own "Vibe" like a sunset gala simulation.', icon: <Users /> },
              { title: 'Global Brand Synchronization', desc: 'Manage the Experience Layer of 500 stores centrally while allowing local cultural nuances.', icon: <Globe /> },
              { title: 'Customer Celebration', desc: 'Display curated community mementos and UGC art to build a deep, local sense of belonging.', icon: <Heart /> },
            ].map((useCase, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }} className="group p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  {React.cloneElement(useCase.icon as React.ReactElement, { size: 20 })}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{useCase.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. 12 Massive Benefits */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16 text-center">
             <div className="inline-flex items-center justify-center gap-4 mb-4">
              <span className="text-rose-400 font-mono text-xl">04.</span>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold text-white">12 Massive Benefits</h2>
            </div>
            <p className="text-xl text-gray-400">The Hard ROI of Intelligent Walls</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { title: 'Increased Dwell Time', desc: 'Immersive environments keep customers in-store up to 25% longer. More time equals higher basket sizes.', icon: <Clock /> },
              { title: 'Significant Cost Elimination', desc: 'Remove massive annual costs for printing, shipping, and installing signage. It pays for itself.', icon: <TrendingUp /> },
              { title: 'Higher Average Order Value', desc: 'Visual Upselling guides customers toward high-margin accessories or pairings effortlessly.', icon: <ShoppingBag /> },
              { title: 'Zero Operational Friction', desc: 'Staff focus on customers, not posters. Updates happen in seconds via simple voice commands.', icon: <Zap /> },
              { title: 'Brand Perception Elevation', desc: 'An AI-driven Experience Layer positions you as a premium "Category of One" brand.', icon: <Sparkles /> },
              { title: 'Rapid Campaign Agility', desc: 'Launch global marketing instantly. Test different visual styles across regions in real time.', icon: <Globe /> },
              { title: 'Reduced Purchase Anxiety', desc: 'Immersive storytelling builds trust. Understanding the "Why" leads to committing to the "Buy".', icon: <Shield /> },
              { title: 'Talent Attraction', desc: 'A high-tech, beautiful store improves morale and reduces staff turnover.', icon: <Users /> },
              { title: 'Sustainability Leadership', desc: 'Dramatically reduce carbon footprint. No more vinyl, ink, or shipping heavy posters.', icon: <Leaf /> },
              { title: 'Organic Social Amplification', desc: 'Create Instagrammable spaces. Customers become your free marketing department.', icon: <Heart /> },
              { title: 'Optimized Floor Space', desc: 'Deckoviz lives on walls, providing massive marketing impact without losing shelf space.', icon: <MonitorPlay /> },
              { title: 'Future-Proof Infrastructure', desc: 'A platform that gets smarter every month through software and new AI capabilities.', icon: <Zap /> },
            ].map((benefit, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all duration-300">
                  {React.cloneElement(benefit.icon as React.ReactElement, { size: 20 })}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-rose-300 transition-colors">{benefit.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive into Use Cases Journey */}
      <RetailUseCasesJourney onDemo={handleDemoClick} />

      {/* 05. The Future of Retail */}
      <section className="py-32 relative z-10 bg-gradient-to-b from-black/40 to-[#0a0a10]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center justify-center gap-4 mb-8">
              <span className="text-white/50 font-mono text-xl">05.</span>
              <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-semibold text-white">The Future of Retail is Ambiently Intelligent</h2>
            </div>
            
            <div className="space-y-6 text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-16">
              <p>Step into the era of Intelligent Hospitality and Retail.</p>
              <p>Static walls are a relic of the past. Your competitors are already optimizing their websites with AI; it is time you optimized your physical reality. Deckoviz GAVP is the easiest upgrade you can make to your retail business with the highest emotional and financial return.</p>
              <p>Most things you buy fill space; <strong className="text-white font-normal">Deckoviz shapes how your customers live and feel within it.</strong></p>
              <p>In a world of generic shopping, give your customers a space that finally speaks to them.</p>
              <p>The product is what they buy. <strong className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400 font-semibold">The atmosphere is why they come back.</strong></p>
              <p className="text-3xl text-white font-['Playfair_Display'] italic pt-8">Stop managing a store. Start curating an experience.</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDemoClick}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-all duration-300"
            >
              <span>Experience the GAVP - Schedule Your Private Retail Demo</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeckovizForRetail;