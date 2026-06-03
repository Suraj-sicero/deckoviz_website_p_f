import { useState, useEffect } from 'react';
import { motion } from "framer-motion";


export default function AboutUs() {
  const [stars, setStars] = useState([]);

  
  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18 }
    }
  };

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.1,
          delay: Math.random() * 5
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  const starPositions = [
    { top: '10%', left: '15%', delay: 0.5 },
    { top: '25%', left: '80%', delay: 1.2 },
    { top: '40%', left: '50%', delay: 2.0 },
    { top: '65%', left: '10%', delay: 0.8 },
    { top: '85%', left: '75%', delay: 1.5 },
    { top: '15%', left: '45%', delay: 2.2 },
    { top: '55%', left: '90%', delay: 0.3 },
    { top: '75%', left: '30%', delay: 1.8 },
  ];

  const missionPoints = [
    "Find partners, friends, and collaborators who truly fit them",
    "Understand themselves better, so they can show up more honestly",
    "Build skills for communication, vulnerability, and repair",
    "Maintain and deepen relationships across years, not just moments",
    "Create shared meaning, projects, and lives together"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0A12] px-0 pb-16 space-y-16 overflow-x-hidden">
      {/* About Us Card */}
 <div 
    className="w-full relative overflow-hidden text-center shadow-xl"
    style={{ 
      padding: 'clamp(60px, 12vw, 120px) 24px',
      // Updated: Deep Space to Royal Blue/Indigo transition
      background: 'radial-gradient(ellipse at 80% 0%, #3B82F6 0%, #1D4ED8 15%, #1E1B4B 40%, #030014 80%)',
      borderRadius: '0px'
    }}
>
  {/* Twinkling Stars Background */}
  <div className="absolute inset-0 pointer-events-none">
    {stars.map((star, index) => (
      <div 
        key={index}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{ 
          top: star.top, 
          left: star.left, 
          opacity: star.opacity,
          animation: `twinkle ${2 + star.delay}s infinite ease-in-out`
        }}
      />
    ))}
  </div>
<br></br>
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.25 }}
  variants={stagger}
  className="relative z-10 max-w-4xl mx-auto"
>

  {/* Main Title */}
  <motion.h1
    variants={fadeUp}
    className="text-5xl sm:text-7xl font-bold text-white mb-8 tracking-tight"
    style={{  }} // Consistent with Elinity brand
  >
    About us
  </motion.h1>

  {/* Intro */}
  <motion.div variants={fadeUp} className="mb-12">
    <p className="text-xl sm:text-3xl text-white font-medium leading-tight">
      The Future of Connection. Rooted in Who We Are,
    </p>
    <p className="text-xl sm:text-3xl text-white font-medium leading-tight">
      And Who We Are Becoming.
    </p>
  </motion.div>

  <div className="max-w-2xl mx-auto">

    {/* Primary Narrative */}
    <motion.p
      variants={fadeUp}
      className="text-white text-lg sm:text-xl font-light leading-relaxed mb-8"
    >
      At <strong>Elinity</strong>, we believe that the most important thing in life is{" "}
      <strong className="font-semibold text-white">
        who we walk it with.
      </strong>
    </motion.p>

    {/* Structured List */}
    <motion.div
      variants={fadeUp}
      className="text-white/90 text-base sm:text-lg mb-10 space-y-2"
    >
      <p>The people we love.</p>
      <p style={{ paddingLeft: "15px" }}>The people we grow alongside.</p>
      <p style={{ paddingLeft: "15px" }}>
        The people we create with, struggle with, and build with.
      </p>
      <p className="italic text-white" style={{ paddingLeft: "15px" }}>
        The people who see us clearly, and choose us anyway.
      </p>
    </motion.div>

    {/* Context */}
    <motion.p
      variants={fadeUp}
      className="text-gray-400 text-base leading-relaxed mb-12"
    >
      And yet, despite how central relationships are to a good life, most of
      us are left to chance, when it comes to finding them, nurturing them,
      and sustaining them. We rely on luck, proximity, outdated social
      structures, and tools that optimize for{" "}
      <span className="text-white">engagement rather than outcomes</span>.
      The result is a world that is more connected on the surface, and more
      fragmented underneath.
    </motion.p>

    {/* Gradient Punch - Updated to Royal Blue / Indigo */}
    <motion.p
      variants={fadeUp}
      className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12"
      style={{
        background: "linear-gradient(to right, #3B82F6, #7B3FE4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      Elinity exists to change that.
    </motion.p>

    {/* Highlight Box - Updated Border/Glow to Indigo */}
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="p-8 border border-white/10 bg-white/5 rounded-2xl"
      style={{ 
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(123, 63, 228, 0.2)" // Indigo border
      }}
    >
      <p className="text-white text-lg leading-relaxed font-medium mb-2">
        We are building Elinity{" "}
        <span className="text-[#3B82F6]">for your people.</span>
      </p>
      <p className="text-gray-300">For the ones you are meant to find.</p>
      <p className="text-gray-300">For the ones you already have.</p>
      <p className="text-gray-500 italic mt-4 text-sm">
        And for the version of you that is still unfolding.
      </p>
    </motion.div>

  </div>
</motion.div>

</div>

<section style={{ padding: '60px 0', overflow: 'hidden' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        variants={stagger}
        style={{ 
          width: '90%',           
          maxWidth: '800px',      
          margin: '0 auto', 
          padding: '0 10px', 
          position: 'relative', 
          zIndex: 1 
        }}
      >
        
        {/* TITLE - Updated with Royal Blue to Electric Indigo Gradient */}
        <motion.h2 
          variants={fadeUp}
          style={{ 
            fontSize: 'clamp(32px, 8vw, 48px)', 
            fontWeight: '800', 
            letterSpacing: '-0.04em', 
            marginBottom: '32px',
            lineHeight: '1.1',
            background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'left',
            textTransform: 'lowercase' 
          }}
        >
          what elinity is
        </motion.h2>

        {/* DEFINITION CARD */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '24px',
            borderRadius: '24px',
            backdropFilter: 'blur(10px)',
            marginBottom: '40px'
          }}
        >
          <p style={{ 
            fontSize: 'clamp(16px, 4vw, 18px)',
            lineHeight: '1.6', 
            margin: 0, 
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '400'
          }}>
            Elinity is not just a matchmaking app. It is a <span style={{ color: '#3B82F6', fontWeight: '600' }}>lifelong social connection ecosystem</span>, 
            designed to help you build the best relationships of your life across romance, friendship, collaboration, and shared purpose.
          </p>
        </motion.div>

        {/* CORE MECHANIC */}
        <motion.p
          variants={fadeUp}
          style={{ 
            fontSize: 'clamp(14px, 3.5vw, 16px)', 
            lineHeight: '1.8', 
            marginBottom: '48px', 
            color: 'rgba(255,255,255,0.7)',
            padding: '0 4px'
          }}
        >
          At its core, Elinity is powered by emotionally intelligent, deeply personalized AI that learns who you are, what you value, how you relate, and where you are headed. It helps you find people who are aligned with you at a deeper level, and then helps you <span style={{ color: '#ffffff', fontWeight: '500' }}>actually build something real with them over time.</span>
        </motion.p>

        {/* FOUR IDENTITIES - Updated with Electric Indigo Accents */}
        <motion.div 
          variants={stagger}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '16px', 
            marginBottom: '56px'
          }}
        >
          {[
            { label: "A mirror", context: "when you need clarity." },
            { label: "A guide", context: "when you feel stuck." },
            { label: "A companion", context: "when relationships get complex." },
            { label: "A catalyst", context: "when something meaningful wants to begin." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              style={{
                padding: '20px',
                background: 'rgba(123, 63, 228, 0.05)',
                borderLeft: '3px solid #7B3FE4',
                borderRadius: '4px 16px 16px 4px'
              }}
            >
              <p style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#ffffff', textTransform: 'lowercase' }}>
                {item.label}
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                {item.context}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* FOOTER - Updated with Royal Blue Accent */}
        <motion.div
          variants={fadeUp}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '40px',
            textAlign: 'center'
          }}
        >
          <p style={{ 
            fontSize: 'clamp(18px, 5vw, 20px)', 
            fontWeight: '500', 
            lineHeight: '1.5', 
            color: '#ffffff',
            margin: 0
          }}>
            We believe technology should not replace human connection. <br />
            It should <span style={{ color: '#3B82F6', fontWeight: '700' }}>amplify it</span>, protect it, and help it flourish.
          </p>
        </motion.div>

      </motion.div>
    </section>

<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={stagger}
      className="w-full max-w-4xl mx-auto px-4 py-12"
    >
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10"
        style={{ backgroundColor: '#030014' }} // Deepened for better contrast with brand colors
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.35 }}
      >

        {/* Glow orb animation - Updated to Electric Indigo */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px]"
          style={{ backgroundColor: '#7B3FE4' }}
        />

        <div className="relative z-10 p-8 sm:p-16">

          {/* Header - Updated to Royal Blue to Indigo Gradient */}
          <motion.div variants={fadeUp} className="mb-10">
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                // textTransform: 'lowercase'
                lineHeight: '1.1'
              }}
            >
              Why We Exist
            </h1>
          </motion.div>

          {/* Content */}
          <motion.div variants={stagger} className="space-y-8">

            <motion.p
              variants={fadeUp}
              className="text-xl sm:text-2xl text-white font-semibold leading-snug"
            >
              Modern relationship tools are fundamentally misaligned.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="grid gap-6 text-white/70 text-lg leading-relaxed font-light"
            >
              <p>
                They optimize for swipes, novelty, and short-term engagement. They fragment attention,
                commodify people, and leave the hardest parts of connection entirely unsupported.
                Even when we meet someone compatible, we are given almost no help in navigating
                communication, repair, growth, or the long arc of being close to another human being.
              </p>

              {/* Updated Border to Royal Blue */}
              <p className="italic border-l-2 border-blue-500/40 pl-6 py-2">
                At the same time, loneliness, relational burnout, and disconnection are quietly
                becoming the default state for millions.
              </p>
            </motion.div>

            {/* Pivot */}
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/5 backdrop-blur-sm"
            >
              <p className="text-xl text-white/90 mb-4">
                We don’t believe this is a human failure.
              </p>

              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-3xl sm:text-4xl font-black text-white tracking-tighter"
              >
                {/* Updated Span to Royal Blue */}
                We believe it is a <span className="text-[#3B82F6]">design failure.</span>
              </motion.p>
            </motion.div>

            {/* Closing */}
            <motion.p
              variants={fadeUp}
              className="text-xl text-white font-medium pt-4 border-t border-white/10"
            >
              Elinity exists because we believe relationships are <strong>too important to leave to chance</strong>,
              and too complex to be handled by shallow tools.
            </motion.p>

          </motion.div>
        </div>
      </motion.div>
    </motion.div>


<div className='pt-16'></div>
        {/* Our Mission Card */}
<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={stagger}
      className="relative overflow-hidden text-left sm:text-left"
      style={{
        padding: 'clamp(24px, 5vw, 64px)',
        // Updated: Deep navy base for the new brand contrast
        background: 'linear-gradient(135deg, #030014 0%, #0c0a25 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        borderRadius: '24px',
        border: '1px solid rgba(59, 130, 246, 0.1)', // Royal Blue subtle border
        margin: '0 12px'
      }}
    >
      {/* Subtle glow animation - Updated to Electric Indigo */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[110px]"
        style={{ background: '#7B3FE4' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Title - Updated to Blue-Indigo Gradient */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // textTransform: 'lowercase'
          }}
        >
          Our Mission
        </motion.h2>

        {/* Main Statement */}
        <motion.p
          variants={fadeUp}
          className="text-white text-lg sm:text-xl font-bold mb-6 leading-snug"
        >
          Our mission is to help every person experience meaningful, aligned, and extraordinary human connection.
        </motion.p>

        {/* Intro */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-base sm:text-lg mb-4"
        >
          That means helping people:
        </motion.p>

        {/* Bullet points - Custom marker styling */}
        <motion.ul
          variants={stagger}
          className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 mb-10 sm:mb-12 list-none"
        >
          {[
            "Find partners, friends, and collaborators who truly fit them",
            "Understand themselves better, so they can show up more honestly",
            "Build skills for communication, vulnerability, and repair",
            "Maintain and deepen relationships across years, not just moments",
            "Create shared meaning, projects, and lives together"
          ].map((text, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              whileHover={{ x: 6, color: '#ffffff' }}
              transition={{ duration: 0.2 }}
              className="flex items-start group"
            >
              {/* Royal Blue Glow Marker */}
              <span className="mr-4 mt-2 h-2 w-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6] flex-shrink-0 transition-transform group-hover:scale-125" />
              {text}
            </motion.li>
          ))}
        </motion.ul>

        {/* Final box - Indigo Border Accent */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-8"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(123, 63, 228, 0.2)' // Electric Indigo accent
          }}
        >
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            We are here to redesign how people find each other, see each other, and stay connected,
            using intelligence that is patient, humane, and deeply attuned to human complexity.
          </p>
        </motion.div>

      </div>
    </motion.div>
<br></br>

<div className='pt-16'></div>
      {/* Our Vision Card */}
<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={stagger}
      className="relative overflow-hidden text-left"
      style={{
        padding: 'clamp(24px, 6vw, 64px)',
        // Updated: Deep navy to midnight indigo
        background: 'linear-gradient(135deg, #030014 0%, #0c0a25 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        borderRadius: '24px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        margin: '0 12px'
      }}
    >
      {/* Ambient glow - Updated to Electric Indigo */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[120px]"
        style={{ background: '#7B3FE4' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Title - Updated to Blue-Indigo Gradient */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // textTransform: 'lowercase'
          }}
        >
          Our Vision
        </motion.h2>

        {/* Bold Statement */}
        <motion.p
          variants={fadeUp}
          className="text-white text-lg sm:text-xl font-bold mb-6 leading-snug"
        >
          We imagine a world where no one has to navigate relationships alone.
        </motion.p>

        {/* Narrative */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
        >
          A world where loneliness is not normalized. Where depth is not rare. 
          Where people are seen in their full complexity, not reduced to profiles or metrics.
        </motion.p>

        {/* Accent block - Updated to Royal Blue */}
        <motion.div
          variants={fadeUp}
          whileHover={{ x: 6 }}
          className="border-l-2 border-[#3B82F6]/40 pl-4 sm:pl-6 mb-10 sm:mb-12"
        >
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Our long-term vision is an ecosystem of AI-powered relationship tools that walk with you through the seasons of your life. From finding love and building friendships to navigating the everyday realities of being close to someone.
          </p>
        </motion.div>

        {/* Highlight card */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-8 mb-10 sm:mb-12"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(59, 130, 246, 0.15)'
          }}
        >
          <p className="text-gray-400 text-sm sm:text-lg mb-4">
            A world where everyone has access to emotionally attuned guides—AI companions, coaches, and guides that help them:
          </p>

          <motion.div
            variants={stagger}
            className="flex flex-wrap items-center gap-x-3 gap-y-3 text-white font-bold text-lg sm:text-2xl"
          >
            {["Reflect","Grow","Repair","Choose better","Love better","Create more","Explore deeper"]
              .map((item, i, arr) => (
              <motion.span
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                {/* Alternate between White and Royal Blue */}
                <span className={i % 2 === 0 ? "text-white" : "text-[#3B82F6]"}>
                  {item.toLowerCase()}
                </span>

                {i !== arr.length - 1 && (
                  <span className="ml-3 opacity-20 text-white font-light hidden xs:inline">
                    |
                  </span>
                )}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          variants={fadeUp}
          className="border-white/10 mb-8 sm:mb-10"
        />

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          className="text-white text-base sm:text-lg font-medium leading-relaxed italic"
        >
          Not by telling people what to do, but by helping them understand themselves and each other more clearly.
        </motion.p>

      </div>
    </motion.div>

<div className='pt-16'></div>
<br></br>
<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={stagger}
      className="relative overflow-hidden text-left"
      style={{
        padding: 'clamp(24px, 6vw, 64px)',
        // Updated: Midnight Navy theme
        background: 'linear-gradient(135deg, #030014 0%, #0c0a25 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        borderRadius: '24px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        margin: '0 12px'
      }}
    >
      {/* Ambient animated glow - Updated to Royal Blue */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[120px]"
        style={{ background: '#3B82F6' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Title - Updated to Blue-Indigo Gradient */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // textTransform: 'lowercase'
            lineHeight: '1.2'
          }}
        >
          Our Philosophy on AI
        </motion.h2>

        {/* Bold statement */}
        <motion.p
          variants={fadeUp}
          className="text-white text-lg sm:text-xl font-bold mb-6 leading-snug"
        >
          We believe AI is one of the most powerful tools humanity has ever created. What matters now is <strong>how we choose to use it</strong>.
        </motion.p>

        {/* Narrative */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
        >
          At Elinity, we believe AI is at its best when it amplifies the human spirit rather than replacing it. When it supports our drives to connect, create, learn, grow, and explore. When it helps us become more conscious, not more distracted.
        </motion.p>

        {/* Accent block - Updated to Royal Blue */}
        <motion.div
          variants={fadeUp}
          whileHover={{ x: 6 }}
          className="border-l-2 border-[#3B82F6]/40 pl-4 sm:pl-6 mb-10 sm:mb-12"
        >
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            One of our core meta-directives to accomplish our goals is building aligned AI that is
            focused on long-term wellbeing, and designed for depth rather than dependency.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.hr variants={fadeUp} className="border-white/10 mb-8 sm:mb-10" />

        {/* Grid list - Updated indicators to Blue */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {[
            "Emotionally intelligent",
            "Aligned with long-term human wellbeing",
            "Designed for depth rather than dependency",
            "Built to reinforce human-to-human connection"
          ].map((text, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#3B82F6]/30 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6] mt-2 shrink-0" />
              <p className="text-gray-300 text-sm sm:text-base leading-snug">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlight card - Updated to Electric Indigo theme */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-8 mb-10 sm:mb-12 mt-10"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(123, 63, 228, 0.2)'
          }}
        >
          <p className="text-gray-400 text-sm sm:text-lg mb-2 sm:mb-4">
            AI shouldn't be a substitute.
          </p>

          <motion.h3
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-xl sm:text-3xl font-bold text-white leading-tight"
          >
            It is <span className="text-[#3B82F6]">scaffolding</span> for better, deeper human-to-human connection.
          </motion.h3>
        </motion.div>

      </div>
    </motion.div>

<div className='pt-16'></div>

<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={stagger}
      className="relative overflow-hidden text-left"
      style={{
        padding: 'clamp(40px, 8vw, 64px)',
        // Updated: Midnight Navy base
        background: 'linear-gradient(135deg, #030014 0%, #0c0a25 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        borderRadius: '24px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        margin: '0 12px'
      }}
    >
      {/* Ambient glow - Updated to Electric Indigo */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.18, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-28 -right-28 w-80 h-80 rounded-full blur-[120px]"
        style={{ background: '#7B3FE4' }}
      />

      <div className="max-w-3xl relative z-10">

        {/* Title - Updated to Blue-Indigo Gradient */}
        <motion.h2
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold text-white mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // textTransform: 'lowercase'
            lineHeight: '1.2'
          }}
        >
          What We’re Building Toward
        </motion.h2>

        {/* Bold statement */}
        <motion.p
          variants={fadeUp}
          className="text-white text-xl font-bold mb-6"
        >
          Elinity is being built as a long-term company, not a short-term product.
        </motion.p>

        {/* Narrative */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-lg leading-relaxed mb-10"
        >
          We are not optimizing for quick wins or surface-level engagement. We are building relationship infrastructure for the future, with the belief that strong relationships are the foundation of individual flourishing and collective wellbeing.
        </motion.p>

        {/* Belief card - Updated Border to Indigo */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="p-8 mb-12"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(123, 63, 228, 0.2)'
          }}
        >
          <p className="text-gray-400 text-lg mb-6">We believe:</p>

          <motion.div variants={stagger} className="space-y-6">
            {[
              "Everyone deserves to find their people",
              "Everyone deserves to be understood",
              "Everyone deserves a life rich in love, friendship, purpose, and belonging"
            ].map((text, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 group"
              >
                {/* Royal Blue Glow Dot */}
                <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6] shrink-0" />
                <p className="text-white text-lg sm:text-xl font-semibold leading-relaxed group-hover:text-[#3B82F6] transition-colors">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          variants={fadeUp}
          className="border-white/10 mb-10"
        />

        {/* Footer - Updated Accent to Royal Blue */}
        <motion.p
          variants={fadeUp}
          className="text-white text-lg font-medium leading-relaxed"
        >
          And we believe that connecting the right people, at the right time, with the right support, is{" "}
          <span className="text-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">one of the greatest unlocks</span> available to humanity.
        </motion.p>

      </div>
    </motion.div>

<div className='pt-16'></div>

<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={stagger}
      className="relative overflow-hidden text-left"
      style={{
        padding: 'clamp(24px, 6vw, 64px)',
        // Updated: Deep navy to midnight indigo base
        background: 'linear-gradient(135deg, #030014 0%, #0c0a25 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        borderRadius: '24px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        margin: '0 12px'
      }}
    >

      {/* Subtle animated glow - Updated to Electric Indigo */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.18, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-28 -right-28 w-72 h-72 rounded-full blur-[120px]"
        style={{ background: '#7B3FE4' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Title - Updated to Royal Blue Gradient */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // textTransform: 'lowercase'
          }}
        >
          Who we’re for
        </motion.h2>

        {/* Bold statement */}
        <motion.p
          variants={fadeUp}
          className="text-white text-lg sm:text-xl font-bold mb-6 leading-snug"
        >
          Elinity is for people who care about depth.
        </motion.p>

        {/* Narrative */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
        >
          People who want real connection, not endless choice.
          <br className="hidden sm:block" />
          People who want to grow, not perform.
          <br className="hidden sm:block" />
          People who believe relationships are a craft worth learning, not a gamble to endure.
        </motion.p>

        {/* Card - Updated to subtle Indigo/Blue accents */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-8 mb-10 sm:mb-12"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(123, 63, 228, 0.2)'
          }}
        >
          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-sm sm:text-lg mb-4 sm:mb-6"
          >
            It is for:
          </motion.p>

          {/* Role tags - Updated to Royal Blue hover effects */}
          <motion.div variants={stagger} className="flex flex-wrap gap-2 sm:gap-3">
            {["Users", "Builders", "Researchers", "Designers", "Investors"].map((role, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                whileHover={{ 
                  y: -3, 
                  scale: 1.05, 
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)' 
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 text-white text-xs sm:text-sm font-medium bg-white/5 transition-colors cursor-default"
              >
                {role.toLowerCase()}
              </motion.span>
            ))}
          </motion.div>

          <motion.h3
            variants={fadeUp}
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-lg sm:text-2xl font-bold text-white mt-6 sm:mt-8 leading-tight"
          >
            Who believe technology can still be used to make us{" "}
            <span className="text-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">more human</span>, not less.
          </motion.h3>
        </motion.div>

        {/* Divider */}
        <motion.hr
          variants={fadeUp}
          className="border-white/10 mb-2"
        />

      </div>
    </motion.div>

<div className='pt-16'></div>

<motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={stagger}
      className="relative overflow-hidden text-left"
      style={{
        padding: 'clamp(24px, 6vw, 64px)',
        // Updated: Midnight Navy base
        background: 'linear-gradient(135deg, #030014 0%, #0c0a25 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        borderRadius: '24px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        margin: '0 12px'
      }}
    >
      {/* Ambient glow - Updated to Electric Indigo */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-28 -right-28 w-80 h-80 rounded-full blur-[120px]"
        style={{ background: '#7B3FE4' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Title - Updated to Blue-Indigo Gradient */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-5xl font-bold text-white mb-6 sm:mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #3B82F6, #7B3FE4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // textTransform: 'lowercase'
            lineHeight: '1.2'
          }}
        >
          Where we’re going
        </motion.h2>

        {/* Bold line */}
        <motion.p
          variants={fadeUp}
          className="text-white text-lg sm:text-xl font-bold mb-6 italic leading-snug"
        >
          We are early. Intentionally so.
        </motion.p>

        {/* Narrative */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
        >
          We are building something that will take time, care, and courage. Something that will evolve as people evolve. Something that aims to last decades, not cycles.
        </motion.p>

        {/* Highlight card - Updated Border to Indigo */}
        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-8 mb-10 sm:mb-12"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(123, 63, 228, 0.2)'
          }}
        >
          <motion.h3
            variants={fadeUp}
            className="text-xl sm:text-3xl font-bold text-white leading-tight mb-4"
          >
            Elinity is our attempt to contribute to a{" "}
            <span className="text-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">better relational future.</span>
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-sm sm:text-lg leading-relaxed"
          >
            One where technology helps us find each other, choose each other, and keep choosing each other, with clarity, care, and intention.
          </motion.p>
        </motion.div>

        {/* Divider */}
        <motion.hr variants={fadeUp} className="border-white/10 mb-8 sm:mb-10" />

        {/* Footer - Updated Accent to Royal Blue */}
        <motion.div variants={stagger} className="space-y-4">
          <motion.p
            variants={fadeUp}
            className="text-white text-base sm:text-lg font-medium"
          >
            This is the future of connection we are working toward.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-center sm:gap-6 space-y-1 sm:space-y-0"
          >
            <p className="text-[#3B82F6] font-semibold tracking-wide text-sm sm:text-base">
              Rooted in who we are.
            </p>
            <p className="text-gray-500 font-light italic text-sm sm:text-base">
              Guided by who we are becoming.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
    
    </div>
  );
}