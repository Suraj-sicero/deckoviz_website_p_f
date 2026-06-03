import { div } from 'framer-motion/m';
import { Check, Sparkles, Zap } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';


// Defines the pricing plans available to users. Each object contains details for a single plan.
const plans = [
  {
    name: 'Elinity Silver',
    description: 'A great start to grow your network. Get to know the Elinity trial basic features.',
    price: '$8',
    Aprice: '$90',
    priceNote: 'USD',
    featuresTitle: "What's included",
    features: [
      'Components',
      'Blocks',
      'Sections',
      'Auto layout',
      'Component properties',
      'Responsiveness support',
      'No updates',
    ],
    // Card: dark bg, light border
    cardClass: "bg-gradient-to-br from-[#ffffff] via-[#d1d5db] to-[#9ca3af] backdrop-blur-3xl border-t border-l border-white/50 border-r border-b border-gray-400/30 text-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-500",
    buttonClass: "bg-gradient-to-b from-[#f9fafb] via-[#e5e7eb] to-[#9ca3af] text-black-800 font-bold uppercase tracking-wider border border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:brightness-110 hover:shadow-[0_8px_25px_rgba(156,163,175,0.4)] hover:-translate-y-0.5 transition-all",
    featuresText: 'text-black-200',
    featuresTitleText: 'text-black-300',
    checkColor: 'text-blue-400',
  },
  {
    name: 'Elinity Gold',
    description: 'Take your Network to the next level with full access to the full features. Best for Elite Members.',
    price: '$16',
    Aprice: '$160',
    priceNote: 'USD',
    subNote: 'One time purchase',
    featuresTitle: 'Everything in Elinity Gold plus:',
    features: [
      'Full Figma Design',
      'Libraries',
      'Templates',
      'Icons System',
      'Free Lifetime updates',
      '1 user',
    ],
    // Card: blue gradient, white border
    cardClass: "bg-gradient-to-br from-[#fbf4cc] via-[#d4af37] to-[#996515] backdrop-blur-xl border border-[#f3cf7a]/50 text-[#3d2b01] shadow-[0_0_50px_rgba(212,175,55,0.2)] hover:shadow-[0_0_70px_rgba(212,175,55,0.35)] transition-all duration-500",
    buttonClass: "bg-gradient-to-b from-[#fef9c3] to-[#ca8a04] text-[#451a03] font-bold uppercase tracking-widest border-t border-white/40 shadow-lg hover:scale-105 hover:brightness-110 hover:shadow-[#eab308]/40 transition-all",
    featuresText: 'text-white',
    featuresTitleText: 'text-white',
    checkColor: 'text-blue-300',
  },
  {
    name: 'Elinity Diamond',
    description: 'Take your Network to the next level with full access to the full features. Best for Elite Members.',
    price: '$32',
    Aprice: '$240',
    priceNote: 'USD',
    subNote: 'One time purchase',
    featuresTitle: 'Everything in PREVIEW plus:',
    features: [
      'Full Figma Design',
      'Libraries',
      'Templates',
      'Icons System',
      'Free Lifetime updates',
      'Unlimited users',
    ],
    // Card: purple-pink gradient, white border
    cardClass: "bg-gradient-to-br from-[#ffffff]/90 via-[#e0f2fe]/80 to-[#f1f5f9]/90 backdrop-blur-3xl border border-white/60 text-[#0f172a] shadow-[0_20px_60px_rgba(186,230,253,0.3),inset_0_1px_4px_rgba(255,255,255,1)] hover:shadow-[0_20px_80px_rgba(186,230,253,0.5)] transition-all duration-700",
    buttonClass: "bg-gradient-to-r from-[#bae6fd] via-[#ffffff] to-[#bae6fd] text-[#0369a1] font-extrabold uppercase tracking-widest border border-white/50 shadow-[0_4px_20px_rgba(186,230,253,0.4)] hover:scale-105 hover:brightness-105 hover:shadow-[#7dd3fc]/60 transition-all",
    featuresText: 'text-white',
    featuresTitleText: 'text-white',
    checkColor: 'text-pink-200',
  },
];

const CheckIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 flex-shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

const GetStarted: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const handleChange = () => {
      setIsMobile(media.matches);
    };

    handleChange(); // initial check
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  /**
   * Handles the click event for the "Get it Now!" button.
   * For paid plans, it navigates to the payment page, passing the selected plan's data.
   * For free plans, it currently logs a message (can be updated for other actions).
   * @param plan - The selected plan object.
   */
  const handleGetStarted = (plan: any) => {
    if (plan.price === 'FREE') {
      // Handle free plan logic if necessary, maybe show a message or redirect to dashboard
      console.log("Free plan selected");
      return;
    }
    // Navigate to the payment page and pass the plan details in the route's state.
    navigate('/payment', { state: { plan } });
  };


  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardAnim = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#0a0a23] via-[#181848] to-[#3a185a]"
    >
      <div className="bg-gradient-to-b from-[#07071c] to-[#111133] text-white py-20 px-6 md:px-16 pt-64" >
        <motion.div
  variants={fadeUp}
  whileInView="visible"
  initial="hidden"
  viewport={{ once: false, amount: 0.2 }}
  className="max-w-4xl mx-auto text-center"
>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
           
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6" style={{background: 'linear-gradient(to right, White, #7759fd)', 
                      WebkitBackgroundClip: 'text', 
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',}}>
            Choose the depth of experience that matches how intentionally you want to live and connect
          </h2>
 
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              Elinity is built as a lifelong relationship and life-design companion. 
              The platform blends emotionally intelligent AI, deep personal modeling, 
              and practical tools for finding and nurturing the right people in your life.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Our subscription system is designed to be flexible, transparent, and aligned with 
              real usage patterns, so you can engage as lightly or as deeply as you wish.
            </p>

          </div>

        </motion.div>

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center pt-32"
          >
            <motion.div 
              variants={stagger}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-extrabold mb-6"
                style={{
                  background: 'linear-gradient(to right, White, #7759fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginTop: '60px'
                }}
              >
                How Elinity’s Credit + Tier System Works
              </motion.h2>

              <motion.p variants={fadeUp} className="text-gray-200 text-lg leading-relaxed mb-6">
                Elinity uses a hybrid structure:
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-300 text-lg leading-relaxed ml-4 mb-2">
                • Monthly plan tier unlocks features, limits, and recommendation depth
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-300 text-lg leading-relaxed ml-4 mb-2">
                • Credits function as a shared resource across conversations, games, journaling, experiences, searches, image and video tools, and more
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-300 text-lg leading-relaxed ml-4 mb-2">
                • Tokens, voice minutes, and recommendation allowances scale with each tier
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-300 text-lg leading-relaxed ml-4 mb-6">
                • Top-ups are always available if your month gets busy
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-300 text-lg leading-relaxed">
                This gives you freedom to use Elinity based on your current priorities. Some months you may lean into coaching and reflection. Other months you may explore matching, experiences, and social discovery.
              </motion.p>

            </motion.div>
          </motion.div>

      </div>

      <div className='pt-16'></div>
      <div 
      className="bg-gradient-to-t from-[#07071c] to-[#111133] text-white py-20 px-6 md:px-16"
      style={{
      border:'1px solid black', 
      borderRadius:'32px',
      margin:'0 auto',
      boxShadow: '0 20px 60px rgba(255,255,255,0.1), inset 0 1px 4px rgba(255,255,255,0.2)'
      
      }} >
      <div className="max-w-4xl mx-auto">
        <p
          className="text-center relative"
          style={{
            fontSize: "58px",
            fontWeight: "800",
            letterSpacing: "-1px",
            marginTop: "80px",
            background: "linear-gradient(90deg, #ffffff, #dcdcdc, #9f7aea, #6d5cff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 10px rgba(245, 242, 242, 0.2)",
          }}
        >
          Plans Overview

          {/* glow behind text */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              filter: "blur(22px)",
              opacity: 0.35,
              background: "linear-gradient(90deg,#ffffff,#8b7bff,#7759fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              zIndex: -1,
            }}
          >
            Plans Overview
          </span>
        </p>
      </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch",
                gap: "60px",
                marginTop: "80px",
                flexWrap: "wrap",
              }}
            >

              {/* CARD 1  SILVER */}
              <div className="relative group max-w-sm flex-1 min-w-[320px]">

                {/* outer glow */}
                <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-gray-300 via-white to-gray-400 opacity-40 blur-xl group-hover:opacity-70 transition duration-700"></div>

                {/* main silver card */}
                <div className="relative h-full 
                bg-gradient-to-br from-[#f8f8f8] via-[#dcdcdc] to-[#bfbfbf]
                backdrop-blur-2xl 
                border border-white/60 
                rounded-3xl p-8 
                text-gray-900 
                shadow-[0_10px_40px_rgba(192,192,192,0.45)]
                transition-all duration-500 
                group-hover:scale-[1.03] group-hover:shadow-[0_20px_60px_rgba(200,200,200,0.6)]">

                  {/* header */}
                  <div className="mb-8">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 rounded-full 
                      bg-gradient-to-r from-gray-300 to-gray-100 
                      border border-gray-300 
                      text-gray-800 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        Elinity Silver
                      </span>

                      <Zap size={20} className="text-gray-500 drop-shadow-md" />
                    </div>

                    {/* price */}
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">$8</span>
                      <span className="text-gray-600 text-sm">/month</span>
                    </div>

                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-gray-700">$90</span>
                      <span className="text-gray-500 text-sm">/year</span>
                    </div>

                    {/* button */}
                    <div className="pt-8"></div>
                    {plans.map((plan, idx) => (
                      idx === 0 && (
                        <button
                          key={idx}
                          onClick={() => handleGetStarted(plan)}
                          className="mt-4 mb-6 w-full py-3 rounded-xl font-bold 
                          bg-gradient-to-r from-gray-900 to-black 
                          text-white shadow-lg 
                          hover:scale-105 hover:shadow-xl 
                          transition-all duration-300"
                        >
                          Get it Now
                        </button>
                      )
                    ))}
                  </div>

                  {/* features */}
                  <div className="space-y-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
                      Capabilities
                    </p>

                    <ul className="space-y-3">
                      {[
                        { label: "Total Monthly Credits", val: "1,000" },
                        { label: "Voice/Audio Chats", val: "upto 1 hour" },
                        { label: "Total Tokens", val: "Standard usage" },
                        { label: "Daily AI Recommendations", val: "2" },
                        { label: "Daily Search Queries", val: "3" },
                      ].map((item, i) => (
                        <li key={i} className="flex text-sm">
                          <span className="w-2/3 text-gray-700 ">{item.label}</span>
                          <span className="w-1/3 text-black font-semibold text-right">
                            {item.val}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent my-6" />

                    <ul className="space-y-3">
                      {[
                        { label: "Games, Journaling, Experiences", val: "Included" },
                        { label: "Voice & Video Features", val: "Limited" },
                        { label: "Recommendation Depth", val: "Foundational" },
                        { label: "Early Feature Access", val: "—" },
                      ].map((item, i) => (
                        <li key={i} className="flex text-sm">
                          <span className="w-2/3 text-gray-700">{item.label}</span>
                          <span className="w-1/3 text-black font-semibold text-right">
                            {item.val}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* CARD 2  GOLD */}
              <div className="relative group max-w-sm flex-1 min-w-[320px]">

                {/* gold glow */}
                <div className="absolute -inset-[1.5px] rounded-3xl 
                bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-600 
                opacity-40 blur-xl group-hover:opacity-80 transition duration-700"></div>

                {/* main gold card */}
                <div className="relative h-full 
                bg-gradient-to-br from-[#fff8dc] via-[#f5d67b] to-[#caa94a]
                backdrop-blur-2xl border border-yellow-200/60
                rounded-3xl p-8 text-gray-900 
                shadow-[0_15px_50px_rgba(212,175,55,0.45)]
                transition-all duration-500 
                group-hover:scale-[1.03] 
                group-hover:shadow-[0_25px_80px_rgba(212,175,55,0.65)]">

                  {/* header */}
                  <div className="mb-8">
                    <div className="flex justify-between items-start">

                      <span className="px-3 py-1 rounded-full 
                      bg-gradient-to-r from-yellow-300 to-amber-200 
                      border border-yellow-400/50 
                      text-yellow-900 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        Elinity Gold
                      </span>

                      <Zap size={20} className="text-yellow-700 drop-shadow-md" />
                    </div>

                    {/* price */}
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight text-yellow-900">$16</span>
                      <span className="text-yellow-800/70 text-sm">/month</span>
                    </div>

                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-yellow-900">$160</span>
                      <span className="text-yellow-800/70 text-sm">/year</span>
                    </div>

                    {/* button */}
                    <div className="pt-8"></div>
                    {plans.map((plan, idx) => (
                      idx === 1 && (
                        <button
                          key={idx}
                          onClick={() => handleGetStarted(plan)}
                          className="mt-4 mb-6 w-full py-3 rounded-xl font-bold 
                          bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 
                          text-white shadow-lg 
                          hover:scale-105 hover:shadow-2xl 
                          transition-all duration-300"
                        >
                          Get it Now
                        </button>
                      )
                    ))}
                  </div>

                  {/* features */}
                  <div className="space-y-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-900/70 mb-2">
                      Capabilities
                    </p>

                    <ul className="space-y-3">
                      {[
                        { label: "Total Monthly Credits", val: "2,000" },
                        { label: "Voice/Audio Chats", val: "upto 3 hour" },
                        { label: "Total Tokens", val: "~ 300k tokens" },
                        { label: "Daily AI Recommendations", val: "5 (deeper insights)" },
                        { label: "Daily Search Queries", val: "5" },
                      ].map((item, i) => (
                        <li key={i} className="flex text-sm">
                          <span className="w-2/3 text-yellow-900/80">{item.label}</span>
                          <span className="w-1/3 text-yellow-950 font-semibold text-right">
                            {item.val}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="h-px bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent my-6" />

                    <ul className="space-y-3">
                      {[
                        { label: "Games, Journaling, Experiences", val: "Expanded usage" },
                        { label: "Voice & Video Features", val: "Expanded voice" },
                        { label: "Recommendation Depth", val: "Enhanced compatibility modeling" },
                        { label: "Early Feature Access", val: "—" },
                      ].map((item, i) => (
                        <li key={i} className="flex text-sm">
                          <span className="w-2/3 text-yellow-900/80">{item.label}</span>
                          <span className="w-1/3 text-yellow-950 font-semibold text-right">
                            {item.val}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* CARD 3  DIAMOND */}
              <div className="relative group max-w-sm flex-1 min-w-[320px]">
                <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-slate-200 via-sky-100 to-slate-300 opacity-60 blur-xl group-hover:opacity-90 transition duration-700"></div>
                  <div className="relative h-full bg-gradient-to-br from-[#F0F8FF] via-[#FFFFFF] to-[#E0EFFF] backdrop-blur-2xl border border-white/80 rounded-3xl p-8 text-gray-950 shadow-[0_15px_50px_rgba(200,220,255,0.6)] transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_25px_80px_rgba(200,220,255,0.8)]">
                    <div className="mb-8">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-black-300 text-[10px] font-bold uppercase tracking-widest">
                          Elinity Diamond
                        </span>
                        <Zap size={20} className="text-black-400 fill-[#F0F8FF]-400/20" />
                      </div>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-5xl font-bold tracking-tighter">$32</span>
                        <span className="text-black-100/40 text-sm">/month</span>
                      </div>

                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-2xl font-bold tracking-tighter">$240</span>
                        <span className="text-black-100/40 text-sm">/year</span>
                      </div>

                      <div className="pt-8"></div>
                      {plans.map((plan, idx) => (
                        idx === 2 && (
                          <button
                            key={idx}
                            onClick={() => handleGetStarted(plan)}
                          className="
                              mt-4 mb-6 w-full py-3 rounded-xl font-bold 
                              bg-gradient-to-r from-gray-900 to-black 
                              text-white shadow-lg 
                              hover:scale-105 hover:shadow-xl 
                              transition-all duration-300"
                        >
                            Get it Now!
                          </button>
                        )
                      ))}
                    </div>

                  {/* features */}
                    <div className="space-y-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black-900/70 mb-2">
                      Capabilities
                    </p>

                      <ul className="space-y-3">
                        {[
                          { label: "Total Monthly Credits", val: "3,000" },
                          { label: "Voice/Audio Chats", val: "Expanded voice + multimodal access" },
                          { label: "Total Tokens", val: "Highest allowance across modalities" },
                          { label: "Daily AI Recommendations", val: "8 (deep research enabled)" },
                          { label: "Daily Search Queries (LLM+NLS)", val: "10" },
                        ].map((item, i) => (
                        <li key={i} className="flex text-sm">
                          <span className="w-2/3 text-black-100/60">
                            {item.label}
                          </span>
                          <span className="w-1/3 text-black text-right">
                            {item.val}
                          </span>
                        </li>
                        ))}
                      </ul>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent my-6" />
                      <ul className="space-y-3">
                        {[
                          { label: "Games, Journaling, Experiences", val: "Full, high-volume access" },
                          { label: "Voice & Video Features", val: "Full multimodal (voice, image, video)" },
                          { label: "Recommendation Depth", val: "Deep multi-factor modeling" },
                          { label: "Early Feature Access", val: "First access to new capabilities" },
                        ].map((item, i) => (
                          <li key={i} className="flex text-sm">
                            <span className="w-2/3 text-black-100/60">
                              {item.label}
                            </span>
                            <span className="w-1/3 text-black text-right">
                              {item.val}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                </div>
              </div>  
          </div>

          </div>

          <div className='pt-16'></div>
          
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0}}
  transition={{ duration: 0.5, ease: "easeOut" }}
  style={{
    maxWidth: "900px",
    margin: isMobile ? "20px" : "80px auto", // fixed layout
    padding: isMobile ? "20px" : "40px",
    borderRadius: "28px",
    background: "rgba(10,10,30,0.55)",
    backdropFilter: "blur(10px)", // reduced blur
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    color: "white",
    willChange: "transform, opacity",
    transform: "translateZ(0)"
  }}
>

  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2, duration: 0.6 }}
    style={{
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "30px",
      letterSpacing: "1px"
    }}
  >
    Plan Details
  </motion.h2>

  {/* Silver */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3, duration: 0.6 }}
    style={{ marginBottom: "26px" }}
  >
    <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#c4b5fd" }}>
      Elinity Silver
    </h3>
    <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginTop: "6px" }}>
      A strong starting point for those who want consistent reflection, light exploration,
      and intentional connection without heavy usage. Ideal for daily journaling,
      occasional discovery, and foundational AI guidance.
    </p>
  </motion.div>

  {/* Gold */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.45, duration: 0.6 }}
    style={{ marginBottom: "26px" }}
  >
    <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fde68a" }}>
      Elinity Gold
    </h3>
    <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginTop: "6px" }}>
      Designed for users actively building relationships and exploring deeper compatibility
      insights. Expanded recommendations, richer AI analysis, longer voice sessions, and
      significantly more credits for experiences.
    </p>
  </motion.div>

  {/* Diamond */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.6, duration: 0.6 }}
  >
    <h3 style={{
      fontSize: "20px",
      fontWeight: "700",
      background: "linear-gradient(90deg,#67e8f9,#a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}>
      Elinity Diamond
    </h3>
    <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginTop: "6px" }}>
      Our most immersive tier for those who want the full Elinity ecosystem. Deep modeling,
      early feature access, expanded multimodal interaction, and the highest allowance for
      exploration across conversations, visuals, games, and long-form coaching.
    </p>
  </motion.div>

</motion.div>


<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  style={{
    maxWidth: "850px",
    margin: isMobile ? "20px" : "60px auto",
    padding: isMobile ? "20px":"36px 40px",
    borderRadius: "26px",
    background: "rgba(15, 10, 40, 0.55)",
    backdropFilter: "blur(10px)", // ↓ reduced
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)", // ↓ lighter
    color: "white",
    position: "relative",
    willChange: "transform, opacity",
    transform: "translateZ(0)"
  }}
>

  {/* subtle glow */}
  <div style={{
    position: "absolute",
    inset: "-1px",
    borderRadius: "26px",
    background: "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(99,102,241,0.25))",
    filter: "blur(8px)",
    opacity: 0.25,
    zIndex: 0
  }} />

  <motion.div
    style={{ position: "relative", zIndex: 1 }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.15 } }
    }}
  >
    
    <motion.h2
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
      style={{
        fontSize: "26px",
        fontWeight: "800",
        marginBottom: "12px",
        letterSpacing: "0.5px"
      }}
    >
      Need More Credits?
    </motion.h2>

    <motion.p
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
      style={{
        color: "rgba(255,255,255,0.75)",
        marginBottom: "22px",
        fontSize: "15px"
      }}
    >
      If you run out mid-cycle, you can add more instantly.
    </motion.p>

    {/* top up box */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 } ,
        visible: { opacity: 1, scale: 1 }
      }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "18px 22px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "18px"
      }}
    >
      <p style={{
        fontSize: "13px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.4)",
        marginBottom: "6px",
        fontWeight: "700"
      }}>
        Top-Up Example
      </p>

      <p style={{
        fontSize: "22px",
        fontWeight: "800",
        background: "linear-gradient(90deg,#a78bfa,#67e8f9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        $10 = 200 additional credits
      </p>
    </motion.div>

    <motion.p
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
      style={{
        color: "rgba(255,255,255,0.75)",
        lineHeight: "1.7",
        fontSize: "15px"
      }}
    >
      Credits can be applied anywhere across the platform, whether that means more
      discovery searches, longer conversations, additional experiences, or richer
      media creation.
    </motion.p>

    <motion.p
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: "14px",
        fontWeight: "600",
        color: "#c4b5fd"
      }}
    >
      No friction, no plan change required.
    </motion.p>

  </motion.div>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: false, amount: 0.25 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  style={{
    maxWidth: "850px",
    margin: isMobile ? "20px" : "60px auto",
    padding: "38px 42px",
    borderRadius: "26px",
    background: "rgba(12, 10, 35, 0.55)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
    color: "white",
    position: "relative",
    willChange: "transform, opacity",
  transform: "translateZ(0)"
  }}
>

  {/* glow */}
  <div
    style={{
      position: "absolute",
      inset: "-1px",
      borderRadius: "26px",
      background:
        "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(99,102,241,0.25))",
      filter: "blur(20px)",
      opacity: 0.25,
      zIndex: 0,
      willChange: "transform, opacity",
  transform: "translateZ(0)"
    }}
  />

 <motion.div
  style={{
    position: "relative",
    zIndex: 1,
    willChange: "transform, opacity",
    transform: "translateZ(0)"
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>

  <motion.h2
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    style={{
      fontSize: "26px",
      fontWeight: "800",
      marginBottom: "18px",
      letterSpacing: "0.5px"
    }}
  >
    Payment Options & Flexibility
  </motion.h2>

  <motion.ul style={{ lineHeight: "1.9", fontSize: "15px" }}>
    {[
      "Monthly and annual plans available",
      "Annual subscriptions provide meaningful savings",
      "You can pause or cancel anytime",
      "Your data and relationship history remain secure and accessible if you return",
    ].map((text, i) => (
      <motion.li
        key={i}
        variants={{
          hidden: { opacity: 0, x: -15 },
          visible: { opacity: 1, x: 0 }
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
          color: "rgba(255,255,255,0.8)"
        }}
      >
        <span
          style={{
            height: "6px",
            width: "6px",
            borderRadius: "50%",
            background: "linear-gradient(90deg,#a78bfa,#67e8f9)",
            display: "inline-block"
          }}
        />
        {text}
      </motion.li>
    ))}
  </motion.ul>

  <motion.p
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    style={{
      marginTop: "18px",
      fontWeight: "600",
      fontSize: "15px",
      background: "linear-gradient(90deg,#c4b5fd,#67e8f9)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}
  >
    Our goal is sustained growth and trust, not lock-in.
  </motion.p>

</motion.div>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 60 }} 
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  style={{
    maxWidth: "850px",
    margin: isMobile ? "20px" : "60px auto",
    padding: "40px 42px",
    borderRadius: "26px",
    background: "rgba(12, 10, 35, 0.55)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
    color: "white",
    position: "relative",
    willChange: "transform, opacity",
  transform: "translateZ(0)"
  }}
>
            {/* glow */}
            <div
              style={{
                position: "absolute",
                inset: "-1px",
                borderRadius: "26px",
                background:
                  "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(99,102,241,0.25))",
                filter: "blur(22px)",
                opacity: 0.25,
                zIndex: 0,
                willChange: "transform, opacity",
  transform: "translateZ(0)"
              }}
            />

 <motion.div 
  style={{ position: "relative", zIndex: 1,
    willChange: "transform, opacity",
  transform: "translateZ(0)"
   }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  }}
>             
 <motion.h2
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }}
  transition={{ duration: 0.6 }}
  style={{
    fontSize: "26px",
    fontWeight: "800",
    marginBottom: "18px",
    letterSpacing: "0.5px",
    willChange: "transform, opacity",
  transform: "translateZ(0)"
  }}
>
  Why a Credit-Based System?
</motion.h2>

              <motion.p
  variants={{
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  }}
  transition={{ duration: 0.6 }}
  style={{
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.8",
    fontSize: "15px",
    marginBottom: "16px"
  }}
>
                Connection is dynamic. Some weeks call for reflection and coaching. Others
                involve meeting new people, planning shared experiences, or diving deep into
                compatibility insights.
              </motion.p>

<motion.p
  variants={{
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  }}
  transition={{ duration: 0.6, delay: 0.1 }}
  style={{
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.8",
    fontSize: "15px"
  }}
>
                A unified credit system lets you direct your usage toward what matters most in
                that moment, without forcing a rigid structure.
              </motion.p>

            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }} 
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              maxWidth: "900px",
              margin: isMobile ? "20px" : "70px auto",
              padding: "42px",
              borderRadius: "28px",
              background: "rgba(14, 10, 40, 0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
              color: "white",
              position: "relative",
              overflow: "hidden"
            }}
          >

            {/* soft glow */}
            <div

              style={{
                position: "absolute",
                inset: "-1px",
                borderRadius: "28px",
                background:
                  "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(99,102,241,0.25))",
                filter: "blur(22px)",
                opacity: 0.25,
                zIndex: 0
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              
              {/* Heading */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                style={{
                  fontSize: "26px",
                  fontWeight: "800",
                  marginBottom: "16px",
                  letterSpacing: "0.5px"
                }}
              >
                Coming Soon: Expanded Plans
              </motion.h2>

              {/* Intro */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "15px",
                  marginBottom: "22px"
                }}
              >
                We are developing tailored subscription bundles for:
              </motion.p>

              {/* List */}
              <motion.ul 
              variants={{
                hidden: { opacity: 0, y: 25},
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              style={{ lineHeight: "2", fontSize: "15px" }}>
                {[
                  "Universities and students",
                  "Couples and families",
                  "Therapists and coaches",
                  "Founders and collaboration networks",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: "8px"
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "linear-gradient(90deg,#a78bfa,#67e8f9)",
                        display: "inline-block"
                      }}
                    ></span>
                    {item}
                  </li>
                ))}
              </motion.ul>

              {/* Footer */}
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "15px",
                  lineHeight: "1.8",
                  background: "linear-gradient(90deg,#c4b5fd,#67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "600"
                }}
              >
                Each will include specialized tools for their specific relational context.
              </p>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              maxWidth: "900px",
              margin: isMobile ? "20px": "70px auto",
              padding: "42px",
              borderRadius: "28px",
              background: "rgba(14, 10, 40, 0.55)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
              color: "white",
              position: "relative",
              overflow: "hidden"
            }}
          >

            {/* glow */}
            <div
              style={{
                position: "absolute",
                inset: "-1px",
                borderRadius: "28px",
                background:
                  "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(99,102,241,0.25))",
                filter: "blur(22px)",
                opacity: 0.25,
                zIndex: 0
              }}
            />

<motion.div
  style={{
    position: "relative",
    zIndex: 1,
    willChange: "transform, opacity",
    transform: "translateZ(0)"
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.12
      }
    }
  }}
>

  {/* Heading */}
  <motion.h2
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    style={{
      fontSize: "26px",
      fontWeight: "800",
      marginBottom: "14px",
      letterSpacing: "0.5px"
    }}
  >
    Considering a Free Tier?
  </motion.h2>

  {/* Paragraph */}
  <p
    style={{
      color: "rgba(255,255,255,0.85)",
      fontSize: "15px",
      lineHeight: "1.8",
      marginBottom: "14px"
    }}
  >
    Our current focus is depth, safety, and high-quality personalized AI.
    A limited free tier may be introduced in the future to allow lighter
    exploration with restricted recommendations or credits.
  </p>

  {/* Highlight */}
  <p
    style={{
      fontSize: "15px",
      fontWeight: "600",
      background: "linear-gradient(90deg,#c4b5fd,#67e8f9)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}
  >
    we have designed the platform around intentional connection and use, rather than infinite engagement.
  </p>

</motion.div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  style={{
    maxWidth: "950px",
    margin: isMobile ? "20px" : "80px auto",
    padding: "48px",
    borderRadius: "30px",
    background: "rgba(14, 10, 40, 0.55)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    color: "white",
    position: "relative",
    overflow: "hidden"
  }}
>

  {/* ✅ glow (NOT motion.div) */}
  <div
    style={{
      position: "absolute",
      inset: "-1px",
      borderRadius: "30px",
      background:
        "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(99,102,241,0.25))",
      filter: "blur(10px)",
      opacity: 0.25,
      zIndex: 0,
      pointerEvents: "none"
    }}
  />

  {/* ✅ content */}
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.15 }
      }
    }}
    style={{ position: "relative", zIndex: 1 }}
  >

    <motion.h2
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      style={{
        fontSize: "28px",
        fontWeight: "800",
        marginBottom: "18px"
      }}
    >
      Start With a 2-Week Discounted Trial
    </motion.h2>

    <motion.p
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
      }}
      style={{
        color: "rgba(255,255,255,0.85)",
        lineHeight: "1.9",
        fontSize: "16px",
        marginBottom: "16px"
      }}
    >
      Every paid tier begins with a two-week discounted trial so you can explore the full experience before committing long-term. Use the time to test the matching engine, journaling, AI coaching, games, and conversation features in your real day-to-day life.
    </motion.p>

    <motion.p
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
      }}
      style={{
        color: "rgba(255,255,255,0.85)",
        lineHeight: "1.9",
        fontSize: "16px"
      }}
    >
If at any point you need more usage than your plan includes, you can top up credits instantly without changing your subscription
    </motion.p>

  </motion.div>
</motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }} 
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='pt-16'
          style={{
              maxWidth: "950px",
              margin: isMobile? "20px" : "80px auto",
              padding: "48px",
              borderRadius: "30px",
              background: "rgba(14, 10, 40, 0.55)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
              color: "white",
              position: "relative",
              overflow: "hidden"
            }}>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                style={{
                  marginTop: "20px",
                  fontSize: "17px",
                  fontWeight: "600",
                  background: "linear-gradient(90deg,#c4b5fd,#67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                You are investing in the quality of your relationships, your
                self-understanding, and the trajectory of your life.
              </motion.p>
              {/* support */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                style={{
                  marginTop: "18px",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "15px"
                }}
              >
                If you want help choosing the right tier or estimating your usage,
                reach out anytime at{" "}
                <span
                  style={{
                    color: "#a78bfa",
                    fontWeight: "600"
                  }}
                >
                  support@elinity.ai
                </span>
              </motion.p>

            </motion.div>
    </motion.div>
  );
};

export default GetStarted; 