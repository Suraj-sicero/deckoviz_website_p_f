import React, { useEffect, useState } from "react";
import "./ElinityJoinUs.css";
import { motion, AnimatePresence } from "framer-motion";
import openrole from './ElinityOpenroles';
import OpenRolesDropdown from "./ElinityOpenRolesDropdown";
import ElinityNavbar from "./ElinityNavbar";
import ElinityFooter from "./ElinityFooter";

const JoinUs: React.FC = () => {
  const [showManifesto, setShowManifesto] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [showCareersFull, setShowCareersFull] = useState(false);
  const [showHiringDetails, setShowHiringDetails] = useState(false);
  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };  

  const YourSection = () => {
  const [showManifesto, setShowManifesto] = useState(false);
  }


  const [isLaptop, setIsLaptop] = React.useState(window.innerWidth >= 1024);

React.useEffect(() => {
  const handleResize = () => {
    setIsLaptop(window.innerWidth >= 1024);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const roles = [
  {
    id: 1,
    tab: "Growth",
    title: "Marketing, Growth, and Content Lead",
    subtitle: "Founding Growth Lead",
    about: "This role owns the story of Elinity in the world. This isn’t about ads (we are strongly against using ads for growth), nor growth hacks for their own sake. This is about story, culture, narrative, community, and momentum. You are the voice, the spark, and one of the primary architects of how Elinity enters public consciousness.This is earned growth. Creative growth. Human growth.",
    do: [
      "Architect and execute Elinity’s early growth stategy, starting with NYC and London, and expanding to major US and UK cities",
      "Help us get our first 50,000 passionate users who genuinely love the product.",
      "Build value-aligned partnerships with creators, universities, communities, brands, and cultural hubs.",
      "Build and own our content and storytelling engine, short-form and long-form",
      "Create narratives, campaigns, and series that make people feel something and act.",
      "Cultivate and nurture a founding community that carries Elinity’s ethos forward",
      "Run constant creative experiments: content formats, events, partnerships, referrals, guerrilla ideas, PR.",
    ],
    who: "A world-class storyteller with taste. High-agency, fast-moving, and obsessed with human connection.A strong feeler and a sharp thinker. Experienced in growth, content, or partnerships, but hungry to do it with meaning this time.Drawn to building something that matters more than chasing metrics.Deeply obsessed with human connection and the stories behind it."
  },
  {
    id: 2,
    tab: "Psychology",
    philosopherVariant: true,
    title: "Growth and Flourishing / Psychology Lead",
    subtitle: "Head of Experiences and Stories, Path to CREO",
    about: "This role sits at the heart of Elinity’s soul. You shape how our product feels, how it supports people, and how it genuinely helps humans flourish. This is not marketing in the traditional sense. This is experience design, psychology, meaning, and human truth translated into product, language, and interaction. This role may evolve into Chief Relations and Experience Officer.",
    do: [
      "Design and refine the emotional and psychological experience of Elinity.",
      "Work closely with product, AI, and content teams to shape user journeys.",
      "Bring deep insight into human relationships, attachment, motivation, and flourishing.",
      "Influence product decisions through a human-first lens.",
      "Help define how Elinity supports growth, intimacy, reflection, and long-term relationships",
      "Shape how our AI communicates, guides, and supports users.",
    ],
    who: "Exceptional taste in UX and Experience. Clear, compelling communicator. Deep passion for human flourishing.Strong background in psychology, human relationships, or consumer behavior.Deep passion for human flourishing.Comfortable operating at the intersection of emotion, design, and systems.Energized by responsibility and long-term impact."
  },
  {
    id: 3,
    tab: "AI Research",
    title: "Head of AI Research / AI Research Engineer",
    subtitle: "Frontier Intelligence",
    about: "This is where we explore new kinds of minds. We are not chasing scale for its own sake. We are exploring aligned-by-default, emotionally intelligent, neuromorphic approaches to intelligence that deeply understand humans.This role is about thinking, building, and questioning at the frontier.",
    do: [
      "Explore and develop new architectures for general and neuromorphic intelligence.",
      "Work on alignment, empathy, personality, and value embedding.",
      "Design not just AI behavior, but the structure of the AI mind itself.",
      "Collaborate closely with product and experience teams to embed these systems into Elinity.",
      "Push forward research in human-AI dynamics and alignment through practice."
    ],
    who: "Strong instincts for research, regardless of formal credentials.Background in AI, neuroscience, neuropsychology, or adjacent fields.Curious about minds, not just models.Comfortable questioning assumptions.Motivated by alignment and human flourishing, not benchmarks alone."
  },
  {
    id: 4,
    tab: "Engineering",
    title: "VP of Engineering / Senior SWE",
    subtitle: "AI-Native Builder",
    about: "This role is about building Elinity’s systems with speed, taste, and leverage. Much of the work will not be handwriting code line by line, but orchestrating AI agents, systems, and workflows to move an order of magnitude faster than traditional teams. \n \n This is 10x engineering, by design..",
    do: [
      "Architect and build Elinity’s core systems and infrastructure for v2.0 and beyond",
      "Lead engineering decisions with speed and clarity.",
      "Orchestrate agentic workflows and AI-native development pipelines",
      "Work closely with AI research and experience teams.",
      "Ship fast, iterate relentlessly, and maintain high standards."
    ],
    who: "Strong systems thinker.Comfortable with ambiguity and ownership.High agency, intrinsically motivated.Excellent taste in software and architecture.Excited by AI-augmented development rather than threatened by it."
  }
];

  return (
    <div className="joinus-page elinity-page"
    style={{
      
    }}>
      <ElinityNavbar />
      {/* 1. Hero / An Invitation */}
      <div className="pt-10"></div>
      <header className="hero container" style={{ marginTop: '50px' }}>
          
          {/* Typing Title */}
          <motion.h1
            style={{ fontSize: '45px' }}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.04
                }
              }
            }}
          >
            {"To Those Considering Joining Us on This Mission".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* BUTTON (UNCHANGED) */}
          <OpenRolesDropdown />

        </header>

        <div style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '60px',
          padding: '0 16px'
        }}>
          
          {/* Card animation */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(14px)',
              borderRadius: '22px',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 'clamp(22px, 5vw, 48px)',
              margin: '40px auto',
              maxWidth: '820px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
            }}
          >

            {/* heading */}
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                color: '#8b6bff',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: '22px'
              }}
            >
              Mission
            </motion.h4>

            {/* paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.35, duration: 0.8 }}
              style={{
                fontSize: 'clamp(16px, 4.2vw, 20px)',
                color: '#e4e4e7',
                lineHeight: '1.9',
                letterSpacing: '0.2px',
                margin: 0,
                fontWeight: '400'
              }}
            >
              <span style={{color:'#ffffff', fontWeight:500}}>
                Elinity exists for a simple reason:
              </span>
              <br/><br/>

              To help people live lives filled with love, intimacy, meaning, joy, purpose, passion, excitement, and depth.

              <br/><br/>
              We are building Elinity to help people find their most resonant people, build extraordinary relationships, and design and live their very best lives.

              <br/><br/>
              Lives that feel expansive rather than constrained. Lives where the highest, most meaningful connection is not a bonus, but the foundation.

              <br/><br/>
              That is the mission, in short.  
              But Elinity is also something more.
            </motion.p>

          </motion.div>
        </div>

      {/* 2 & 3. Mission & Startup Status */}
    <section style={{ padding: '80px 0', color: '#ffffff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* HEADLINE */}
<motion.h1 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} // Updated to a smoother "premium" expo ease
          style={{ 
            fontSize: 'clamp(36px, 5vw, 64px)', 
            fontWeight: '800', 
            letterSpacing: '-0.05em', // Slightly tighter for a more modern look
            lineHeight: '1.1', 
            marginBottom: '60px',
            // Elinity Brand: White to Royal Blue/Electric Indigo blend
            background: 'linear-gradient(to right, #ffffff 20%, #3B82F6 60%, #7B3FE4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 30px rgba(59, 130, 246, 0.2)', // Soft brand-colored glow
            textTransform: 'lowercase' // Aligning with the "elinity" lowercase brand standard
          }}
        >
          less a company, more a vehicle.
        </motion.h1>

        {/* FLEX CONTAINER */}
        <div className="flex-container" style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          <style>{`
            .flex-container > div { flex: 1 1 300px; width: 100%; }
            @media (max-width: 768px) {
              .flex-container { flex-direction: column !important; }
            }
          `}</style>

          {/* RIGHT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            <p style={{ 
              fontSize: '24px', 
              lineHeight: '1.4', 
              fontWeight: '500', 
              color: '#ffffff', 
              marginBottom: '32px' 
            }}>
              Elinity is not a mere startup. We genuinely do not think of it as one.
            </p>

            {/* BUTTON */}
            <div style={{ marginTop: '20px' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowManifesto(!showManifesto)}
                style={{ 
                  background: 'transparent',
                  border: '1px solid rgba(119, 89, 253, 0.4)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  width: '100%', 
                  maxWidth: '420px',
                  height: '70px',
                }} 
              >
                {showManifesto ? "− Hide Full Manifesto" : "+ Read Why We Are Building Elinity"}
              </motion.button>

              {/* COLLAPSIBLE MANIFESTO */}
              <AnimatePresence>
                {showManifesto && (
                  <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      marginTop: '32px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      paddingTop: '32px',
                      borderRadius: '16px',
                      background: 'transparent',
                      padding: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div style={{ color: '#b0b0b0', fontSize: '17px', lineHeight: '1.8' }}>
                      <h3 style={{  
                        color: '#ffffff', 
                        marginBottom: '20px',
                        fontSize: '24px',
                        background: 'linear-gradient(to right, #ffffff, #7759fd)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent' 
                      }}>
                        The Foundation of the Vehicle
                      </h3>
                      
                      <p style={{ marginBottom: '20px' }}>
                        Elinity is not a mere startup. We genuinely do not think of it as one. 
                        It is a vehicle, a conduit to an ideal, to a promise. An ideal that can be brought 
                        to life over a long arc.
                      </p>
                      
                      <p style={{ marginBottom: '20px' }}>
                        This is a 30, 50, maybe 100-year project. A calling in the truest sense. 
                        The confluence of everything I have lived, studied, felt, built, questioned, 
                        loved, and struggled with, distilled into one direction. We could not have 
                        picked a more meaningful or more urgent problem space if we tried.
                      </p>

                      <p style={{ marginBottom: '20px' }}>
                        Relationships shape everything. Our happiness. Our mental health. 
                        Our sense of self. Our willingness to hope. Our desire to build families. 
                        Our ability to flourish. And yet, they are the most under-designed, 
                        under-supported part of modern life.
                      </p>

                      <p style={{ height: '1px', padding : '30px 0' }}>
                        Elinity exists to change that.
                      </p>

                      <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '30px 0' }}></div>

                      <p style={{ marginBottom: '20px' }}>
                        Some of the things I say about Elinity would probably get me politely 
                        smiled at and quietly dismissed in certain conversations and investor meetings. 
                        Talking about relationship potential actualization. About meaning. 
                        About love as a serious design constraint.
                      </p>
                      
                      <p style={{ marginBottom: '30px' }}>
                        And it has. And that is fine. This mission is not meant to fit neatly into 
                        existing boxes. If it did, it would not be worth doing.
                      </p>

                      <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '30px 0' }}></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
            
    {/* 4 & 5. Meta-Problem & Founder Note */}
    <section style={{ padding: '120px 0', color: '#ffffff', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>

        {/* HEADER BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ marginBottom: '60px', padding: '0 4px' }}
        >
          <div style={{ position: 'relative' }}>

            {/* TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false }}
              transition={{ duration: 1.1 }}
              style={{ 
                fontSize: 'clamp(32px, 8.5vw, 72px)',
                fontWeight: '800', 
                letterSpacing: '-0.04em',
                lineHeight: '1.2', 
                marginBottom: '24px',
                color: '#ffffff',
                width: '100%',
                paddingBottom: '8px',
                boxSizing: 'border-box',
                textAlign: 'left'
              }}
            >
              A Meta Company for a <br/>
              <span style={{ 
                background: 'linear-gradient(to right, #7759fd, #b0a2f1)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                paddingRight: '4px'
              }}>
                Meta Moment
              </span>
            </motion.h2>

            {/* SUBTEXT */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.25, duration: 0.8 }}
              style={{ 
                fontSize: 'clamp(18px, 5vw, 24px)', 
                color: '#d1d1d1', 
                maxWidth: '600px', 
                fontWeight: '300',
                lineHeight: '1.5'
              }}
            >
              We are building Elinity at a strange and pivotal moment in history.
            </motion.p>

          </div>
        </motion.div>


        {/* STACKED CARDS */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* CARD 1 */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            whileHover={{ y: -8 }}
            style={{ 
              alignSelf: 'flex-start',
              maxWidth: '700px',
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '32px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#e0e0e0', margin: 0 }}>
              AI is accelerating fast. Culture is changing. Identity is shifting. Loneliness is rising. 
              Meaning is thinning. Work is transforming. Many of the old structures are cracking, 
              and very few new ones are being built with care. 
              <strong style={{ color: '#ffffff', display: 'block', marginTop: '16px' }}>
                Elinity sits at the intersection of all of this.
              </strong>
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            whileHover={{ y: -8 }}
            style={{ 
              alignSelf: 'flex-end',
              maxWidth: '650px',
              padding: '40px',
              background: 'rgba(119, 89, 253, 0.05)',
              border: '1px solid rgba(119, 89, 253, 0.2)',
              borderRadius: '32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
          >
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#ffffff', margin: 0 }}>
              We are building technology, yes. But we use technology as our <strong>vector to shape culture.</strong> 
              We are asking what human connection can be, what it should look like in a post-AGI world. 
              We are designing for the world not just as it is today, but as it may be in 2029, 2035, 2075.
            </p>
          </motion.div>


          {/* CENTER TEXT */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            style={{ 
              textAlign: 'center',
              color: 'white',
              fontSize: '16px',
              marginTop: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '24px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            This is a company with a wedge, but also a horizon
          </motion.p>


          {/* GRID SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            style={{ marginTop: '60px' }}
          >
            <p style={{ 
              textAlign: 'center',
              fontSize: '20px',
              color: '#7759fd',
              fontWeight: 'bold',
              marginBottom: '32px',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Strategic Architecture
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
              gap: '1px', 
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              
              {/* LEFT */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ background: '#08011a', padding: '48px 40px' }}
              >
                <h4 style={{ fontSize: '28px', marginBottom: '16px', color: '#ffffff' }}>
                  The wedge is simple
                </h4>
                <p style={{ color: '#a1a1a1', lineHeight: '1.6', fontSize: '16px' }}>
                  Help people find their best-fit people and build incredible relationships, 
                  using deeply personalized, emotionally intelligent AI.
                </p>
              </motion.div>

              {/* RIGHT */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ background: '#0c0224', padding: '48px 40px' }}
              >
                <h4 style={{ fontSize: '28px', marginBottom: '16px', color: '#7759fd' }}>
                  The Horizon is much larger
                </h4>
                <p style={{ color: '#a1a1a1', lineHeight: '1.6', fontSize: '16px' }}>
                  Become foundational infrastructure for human connection, meaning, 
                  and flourishing in the coming era.
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>  
      
    <section className="manifesto-section container">
      <span 
        className="label" 
        style={{
          marginBottom: '100px', 
          fontSize: '50px', 
          background: 'linear-gradient(to right, #e0dded, #b066fe)', // Your primary purple to a vibrant accent
          WebkitBackgroundClip: 'text', // Clips background to text (Chrome/Safari)
          WebkitTextFillColor: 'transparent', // Makes original text transparent to show gradient
          backgroundClip: 'text', // Standard property
          display: 'inline-block',
          textTransform: 'none',
          letterSpacing: '2px'
        }}
      >
        Our Values...
      </span>
              <div className="feature-grid values-hover-grid">
                
                {/* Value 1 */}
                <div className="value-card">
                  <div className="card-reveal">
                    <h3>Love & Duty</h3>
                    <p>
                      This is a love-centered mission, unironically. We believe deeply in humanity, 
                      not as an abstraction, but as individual people with inner worlds, longings, 
                      fears, and potential. From that love comes duty. A sense of responsibility 
                      to serve, to care, and to build something that genuinely improves lives.
                    </p>
                  </div>
                </div>

                {/* Value 2 */}
                <div className="value-card">
                  <div className="card-reveal">
                    <h3>Having Fun</h3>
                    <p>
                      The work we do is emotionally intense. The odds are stacked against us. 
                      The problems are hard. Which is exactly why this has to be an adventure. 
                      We want joy, humor, curiosity, and play woven into the work. Meaning 
                      without joy, with laughter, can only last so long. We are here for the long haul.
                    </p>
                  </div>
                </div>

                {/* Value 3 */}
                <div className="value-card">
                  <div className="card-reveal">
                    <h3>Human Actualization</h3>
                    <p>
                      We believe humans can live far richer, deeper, more meaningful lives than 
                      most currently do. Relationships, minds, inner worlds, communities, and 
                      cultures can all be elevated. AI, uniquely, can help make the hard work 
                      of growth feel engaging, supportive, and even fun.
                    </p>
                  </div>
                </div>
                
                {/* Value 4 */}
                <div className="value-card">
                  <div className="card-reveal">
                    <h3>Longtermism</h3>
                    <p>
                      We take the long view. Twenty-five years. One hundred years. Beyond 
                      our own lifetimes. We care about the world we are shaping for future 
                      generations, and we act accordingly.
                    </p>
                  </div>
                </div>

                {/* Value 5 */}
                <div className="value-card">
                  <div className="card-reveal">
                    <h3>Intensity</h3>
                    <p>
                      This is a hard mission, hard as it gets. Entropy is real. To have 
                      any shot at winning, we must be par excellent. Focused. Fast. 
                      Relentless in pursuit of quality, truth, and the very best of us, 
                      of humans. Across product, research, engineering, storytelling.
                    </p>
                  </div>
                </div>

                {/* Value 6 */}
                <div className="value-card">
                  <div className="card-reveal">
                    <h3>Meaning & Beauty</h3>
                    <p>
                      At a meta level, we believe one of humanity’s core directives is 
                      to create and spread meaning and beauty. Through what we build. 
                      How we treat each other. The choices we make. Elinity is an 
                      expression of that belief.
                    </p>
                  </div>
                </div>

              </div>
      </section>

      <section style={{ padding: '120px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#ffffff', overflow:'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

          {/* HEADLINE */}
          <motion.h2
            initial={{ opacity:0, y:80, filter:"blur(10px)" }}
            whileInView={{ opacity:1, y:0, filter:"blur(0px)" }}
            viewport={{ once:false, amount:0.5 }}
            transition={{ duration:1 }}
            style={{ 
              fontSize:'55px',
              fontWeight:'900',
              letterSpacing:'-0.04em',
              lineHeight:'1',
              marginBottom:'80px',
              background:'linear-gradient(to bottom,#ffffff 0%,#7759fd 100%)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent'
            }}
          >
            What We Are Building
          </motion.h2>

          <div style={{
            display:'flex',
            flexDirection: isLaptop ? 'row':'column',
            gap:'60px'
          }}>

            {/* LEFT SIDE GOALS */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once:false, amount:0.3 }}
              variants={{
                visible:{ transition:{ staggerChildren:0.18 } }
              }}
              style={{ flex:'1.2' }}
            >
              <div style={{ display:'flex', flexDirection:'column', gap:'48px' }}>
                {[
                  { title:"Matching", desc:"The world’s best people-matching platform." },
                  { title:"Relationships", desc:"The world’s best relationship-building platform." },
                  { title:"Aligned AI", desc:"Deeply aligned, emotionally intelligent AIs that serve people over years and decades." },
                  { title:"Companions", desc:"Personally aligned AI companions that help people design and live their best lives." },
                  { title:"Infrastructure", desc:"Foundational infrastructure for connection, collaboration, purpose, and relationship flourishing in a post-AGI world." }
                ].map((item,index)=>(
                  
                  <motion.div
                    key={index}
                    initial={{ opacity:0, x:-60 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:false }}
                    transition={{ duration:0.7, ease:"easeOut" }}
                    whileHover={{ x:10 }}
                    style={{ display:'flex', gap:'32px', alignItems:'flex-start' }}
                  >
                    <motion.span
                      initial={{ scale:0 }}
                      whileInView={{ scale:1 }}
                      transition={{ delay:0.1 }}
                      style={{
                        fontSize:'14px',
                        fontWeight:'800',
                        color:'#7759fd',
                        fontFamily:'monospace',
                        marginTop:'6px',
                        padding:'4px 8px',
                        background:'rgba(119,89,253,0.1)',
                        borderRadius:'4px'
                      }}
                    >
                      0{index+1}
                    </motion.span>

                    <div>
                      <h4 style={{ fontSize:'22px', fontWeight:'700', marginBottom:'8px' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize:'17px', color:'#a1a1a1', lineHeight:'1.6', margin:0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>

                ))}
              </div>
            </motion.div>


            {/* RIGHT PHILOSOPHY CARD */}
            <motion.div
              initial={{ opacity:0, y:100, scale:0.95 }}
              whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:false, amount:0.3 }}
              transition={{ duration:0.9 }}
              whileHover={{ y:-8 }}
              style={{ flex:'1', width:'100%' }}
            >
              <div style={{
                position:'relative',
                background:'rgba(255,255,255,0.03)',
                backdropFilter:'blur(20px)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'32px',
                padding:'clamp(24px,5vw,48px)',
                height:'fit-content'
              }}>

                <motion.h3
                  initial={{ opacity:0, y:30 }}
                  whileInView={{ opacity:1, y:0 }}
                  transition={{ delay:0.2 }}
                  style={{ fontSize:'28px', fontWeight:'700', marginBottom:'24px' }}
                >
                  North Stars
                </motion.h3>

                <motion.p
                  initial={{ opacity:0 }}
                  whileInView={{ opacity:1 }}
                  transition={{ delay:0.35 }}
                  style={{ fontSize:'16px', color:'#d1d1d1', lineHeight:'1.6', marginBottom:'32px' }}
                >
                  We are acutely aware that we are not building for everyone. Not yet. Not ever, perhaps.
                  Even at a massive scale, our users may number in the tens or hundreds of millions.
                  That is okay.
                </motion.p>

                {/* BULLETS */}
                <div style={{ marginBottom:'40px' }}>
                  {[
                    "We are building for depth, not dopamine extraction or riding on cultural trends.",
                    "Building for where the world could be, not just where it is."
                  ].map((bullet,i)=>(
                    <motion.div
                      key={i}
                      initial={{ opacity:0, x:40 }}
                      whileInView={{ opacity:1, x:0 }}
                      transition={{ delay:0.4 + i*0.15 }}
                      style={{
                        marginBottom:'20px',
                        fontSize:'16px',
                        color:'#ffffff',
                        display:'flex',
                        alignItems:'flex-start'
                      }}
                    >
                      <span style={{ color:'#7759fd', marginRight:'16px', fontSize:'20px' }}>•</span>
                      {bullet}
                    </motion.div>
                  ))}
                </div>

                {/* BIG GOAL */}
                <motion.div
                  initial={{ opacity:0, scale:0.95 }}
                  whileInView={{ opacity:1, scale:1 }}
                  transition={{ delay:0.6 }}
                  style={{ marginTop:'40px', paddingTop:'40px', borderTop:'1px solid rgba(255,255,255,0.1)' }}
                >
                  <p style={{ fontSize:'16px', color:'#d1d1d1', marginBottom:'20px' }}>
                    That said, one of our long-term north stars is bold:
                  </p>

                  <motion.p
                    animate={{ scale:[1,1.04,1] }}
                    transition={{ duration:4, repeat:Infinity }}
                    style={{
                      fontSize:'clamp(24px,5vw,30px)',
                      fontWeight:'900',
                      lineHeight:'1.1',
                      marginBottom:'12px',
                      color:'#ffffff'
                    }}
                  >
                    1 Billion <br/>Users Served
                  </motion.p>

                  <p style={{ fontSize:'14px', color:'#a1a1a1' }}>
                    not through shallow engagement, but through shifting culture and creating genuine counterfactual value.
                  </p>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 12, 13, 14. Talent & Philosophy */}
      <section style={{ padding: '60px 0', color: '#ffffff', overflow:'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

          {/* HEADLINE */}
          <motion.h2
            initial={{ opacity:0, y:60, filter:"blur(8px)" }}
            whileInView={{ opacity:1, y:0, filter:"blur(0px)" }}
            viewport={{ once:false, amount:0.5 }}
            transition={{ duration:1 }}
            style={{
              fontSize:'clamp(38px, 8vw, 60px)',
              fontWeight:'800',
              letterSpacing:'-0.04em',
              lineHeight:'1',
              marginBottom:'40px',
              background:'linear-gradient(to right,#ffffff,#7759fd)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent'
            }}
          >
            The People We Are Looking For
          </motion.h2>


          <div style={{ display:'flex', flexDirection:'column', gap:'48px' }}>

            {/* MAIN TEXT BLOCK */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once:false }}
              variants={{
                visible:{ transition:{ staggerChildren:0.15 } }
              }}
            >
              <motion.p
                variants={{ hidden:{opacity:0,y:30}, visible:{opacity:1,y:0} }}
                style={{
                  marginBottom:'1.5rem',
                  color:'rgba(255,255,255,0.7)',
                  fontSize:'18px',
                  lineHeight:'1.6'
                }}
              >
                This page exists for search engines too, so yes, this is technically our careers page.
                But we do not think in terms of careers. <strong>We think in terms of callings.</strong>
              </motion.p>


              {/* COLLAPSIBLE PHILOSOPHY */}
              <div style={{ marginBottom:'2rem' }}>

                <AnimatePresence>
                  {showCareersFull && (
                    <motion.div
                      initial={{ opacity:0, height:0 }}
                      animate={{ opacity:1, height:'auto' }}
                      exit={{ opacity:0, height:0 }}
                      transition={{ duration:0.6 }}
                      style={{ overflow:'hidden' }}
                    >
                      <motion.div
                        initial={{ opacity:0, y:30 }}
                        animate={{ opacity:1, y:0 }}
                        transition={{ delay:0.2 }}
                        style={{
                          marginBottom:'1.5rem',
                          padding:'1.5rem'
                        }}
                      >
                        <div style={{
                          fontSize:'16px',
                          lineHeight:'1.7',
                          color:'#d1d1d1',
                          border:'1px solid rgba(255,255,255,0.05)',
                          padding:'24px',
                          borderRadius:'16px',
                          background:'rgba(255,255,255,0.02)',
                          backdropFilter:'blur(10px)',
                          boxShadow:'0 10px 40px rgba(0,0,0,0.3)'
                        }}>

                          <p>
                            This is not for those looking to climb ladders. It is for those who feel pulled.
                            People for whom this mission resonates at a gut level.
                          </p>

                          <p>
                            People who believe that helping humans find each other, love better, and live more meaningful lives is one of the most important problems of our time.
                          </p>

                          <p style={{ marginTop:'1rem' }}>
                            We are not AI evangelists or AI-pilled.
                            <strong> We are human flourishing–pilled.</strong>
                          </p>

                          <p style={{ marginTop:'1rem' }}>
                            We believe AI, if designed with care and humility, has unprecedented potential
                            to help humanity thrive.. We are also deeply aware of the risks. That tension lives at the heart of our work.
                          </p>

                          <p style={{ marginTop:'1rem', fontStyle:'italic', color:'#ffffff' }}>
                            We are product-focused and research-driven. Mission-driven to our core.
                            Obsessed with taste, depth, and alignment.
                          </p>

                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>


                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale:1.05 }}
                  whileTap={{ scale:0.97 }}
                  transition={{ type:"spring", stiffness:300 }}
                  onClick={() => setShowCareersFull(!showCareersFull)}
                  style={{
                    background:'transparent',
                    border:'1px solid rgba(119,89,253,0.4)',
                    color:'#ffffff',
                    padding:'12px 24px',
                    borderRadius:'100px',
                    fontSize:'14px',
                    cursor:'pointer',
                    width: window.innerWidth < 768 ? '100%' : 'auto'
                  }}
                >
                  {showCareersFull ? "− Hide Philosophy" : "+ Read our thesis on Careers vs. Callings"}
                </motion.button>

              </div>
            </motion.div>


            {/* POST-AGI CARD */}
            <motion.div
              initial={{ opacity:0, y:80, scale:0.95 }}
              whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:false, amount:0.3 }}
              transition={{ duration:0.9 }}
              whileHover={{ y:-6 }}
              style={{
                background:'rgba(119,89,253,0.05)',
                backdropFilter:'blur(20px)',
                border:'1px solid rgba(119,89,253,0.2)',
                borderRadius:'32px',
                padding:'40px',
                position:'relative'
              }}
            >

              {/* subtle breathing glow */}
              <motion.div
                animate={{ opacity:[0.15,0.35,0.15] }}
                transition={{ duration:6, repeat:Infinity }}
                style={{
                  position:'absolute',
                  inset:0,
                  borderRadius:'32px',
                  background:'radial-gradient(circle at 30% 30%, rgba(119,89,253,0.3), transparent 70%)',
                  zIndex:0
                }}
              />

              <div style={{ position:'relative', zIndex:1 }}>
                <p style={{ fontSize:'17px', lineHeight:'1.6', marginBottom:'16px' }}>
                  We are building a <strong>Post-AGI Company</strong>. We want to build a different kind of company. A post-AGI company. One that imagines a world where work transcends pure economic necessity and moves closer to ikigai: passion, service, creativity, purpose, and yes, sustainable prosperity.
                </p>

                <p style={{ fontSize:'15px', opacity:0.8, lineHeight:'1.6', margin:0 }}>
                  As we grow and become less capital-constrained, we want to hire humans, not replace meaning with agents. Agents will have their place. But meaningful work should belong to people
                </p>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      <section className="manifesto-section container team-section" style={{ padding: "5rem 0", overflow:"hidden" }}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity:0, y:60 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:false, amount:0.4 }}
          transition={{ duration:0.9 }}
          className="section-header"
        >

<motion.h1
            className="Label"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              // Elinity Brand: Silver-White to Royal Blue/Electric Indigo
              background: 'linear-gradient(to right, #f5f5f7, #3B82F6, #7B3FE4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              textTransform: 'lowercase', // Standard for Elinity branding
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}
          >
            the team we are building next
          </motion.h1>

          <center>
            <motion.p
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              transition={{ delay:0.2 }}
              style={{ color:"rgba(255,255,255,0.7)", maxWidth:"600px", marginTop:"1rem" }}
            >
              For the next twelve months, we are ultra-focused. We will only be hiring across 
              four tightly intertwined domains:
            </motion.p>
          </center>
        </motion.div>


        {/* DOMAIN GRID */}
        <motion.div
          className="domain-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once:false }}
          variants={{
            visible:{ transition:{ staggerChildren:0.15 } }
          }}
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',
            gap:'20px',
            marginTop:'3rem'
          }}
        >

          {[
            {num:"01", text:"Storytelling, growth, partnerships, and people"},
            {num:"02", text:"Human experience, psychology, flourishing, and design"},
            {num:"03", text:"AI research and intelligence design"},
            {num:"04", text:"Software engineering and systems building"}
          ].map((item,i)=>(
            <motion.div
              key={i}
              variants={{
                hidden:{ opacity:0, y:60, scale:0.95 },
                visible:{ opacity:1, y:0, scale:1 }
              }}
              whileHover={{ y:-10, scale:1.03 }}
              transition={{ duration:0.6 }}
              className="domain-card"
              style={{
                position:'relative',
                overflow:'hidden'
              }}
            >

              {/* glow */}
              <motion.div
                animate={{ opacity:[0.15,0.35,0.15] }}
                transition={{ duration:5, repeat:Infinity }}
                style={{
                  position:'absolute',
                  inset:0,
                  background:'radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent 70%)',
                  zIndex:0
                }}
              />

              <div style={{ position:'relative', zIndex:1 }}>
                <span className="domain-num">{item.num}</span>
                <h4>{item.text}</h4>
              </div>

            </motion.div>
          ))}

        </motion.div>


        {/* COLLAPSIBLE SECTION */}
        <center>
        <div className="hiring-collapse-wrapper" style={{ marginTop:'3rem', maxWidth:'900px' }}>

          <AnimatePresence>
            {showHiringDetails && (
              <motion.div
                initial={{ opacity:0, height:0 }}
                animate={{ opacity:1, height:'auto' }}
                exit={{ opacity:0, height:0 }}
                transition={{ duration:0.6 }}
                style={{ overflow:'hidden' }}
              >

                <motion.div
                  initial={{ opacity:0, y:40 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.2 }}
                  className="hiring-deep-dive"
                >

                  {/* ROLES BOX */}
                  <div
                    style={{
                      background:'rgba(168,85,247,0.05)',
                      padding:'2rem',
                      borderRadius:'12px',
                      marginBottom:'2rem',
                      border:'1px solid rgba(168,85,247,0.2)'
                    }}
                  >
                    <h5 style={{ color:'#a855f7', marginBottom:'1rem', textTransform:'uppercase', fontSize:'0.8rem' }}>
                      Our first core hires include:
                    </h5>

                    <ul style={{ listStyle:'none', padding:0 }}>
                      {[
                        "Marketing, Growth, and Content Lead",
                        "Growth and Flourishing or Psychology Lead",
                        "VP of Engineering",
                        "Head of AI Research or AI Research Engineer"
                      ].map((role,i)=>(
                        <motion.li
                          key={i}
                          initial={{ opacity:0, x:-20 }}
                          animate={{ opacity:1, x:0 }}
                          transition={{ delay:i*0.1 }}
                          style={{ marginBottom:'0.8rem' }}
                        >
                          ● {role}
                        </motion.li>
                      ))}
                    </ul>
                  </div>


                  {/* MANIFESTO BOX */}
                  <motion.div
                    initial={{ opacity:0, scale:0.97 }}
                    animate={{ opacity:1, scale:1 }}
                    transition={{ delay:0.3 }}
                    className="agency-manifesto-box"
                  >

                    <p style={{ fontSize:'1.1rem', color:'#fff' }}>
                      We have set aside a <strong>generous equity pool</strong> for our first ten hires.
                      We want true partners, not just employees.
                    </p>

                    <motion.blockquote
                      initial={{ opacity:0, y:30 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ delay:0.4 }}
                      style={{
                        borderLeft:'2px solid #a855f7',
                        paddingLeft:'1.5rem',
                        margin:'2rem 0',
                        fontStyle:'italic',
                        color:'rgba(255,255,255,0.9)',
                        fontSize:'1.2rem',
                        background:'linear-gradient(to right, rgba(168,85,247,0.2), transparent)'
                      }}
                    >
                      "We do not worship credentials. We worship agency, taste, learning velocity, and depth.
                      The age of credentialism is ending. The age of agency has begun."
                    </motion.blockquote>

                    <p style={{ opacity:0.8, lineHeight:'1.6' }}>
                      Small, aligned teams can now do what once required institutions.
                    </p>

                  </motion.div>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* BUTTON */}
          <motion.button
            whileHover={{ scale:1.06 }}
            whileTap={{ scale:0.96 }}
            transition={{ type:"spring", stiffness:300 }}
            className="btn-text-toggle"
            onClick={() => setShowHiringDetails(!showHiringDetails)}
            style={{ marginTop:'20px' }}
          >
            {showHiringDetails ? "− Hide Hiring Details" : "+ View Specific Roles & Agency Manifesto"}
          </motion.button>

        </div>
        </center>

      </section>

<section className="manifesto-section container" style={{ 
    padding: 'clamp(40px, 8vw, 100px) 12px',
    color: '#fff',
    overflowX: 'hidden',
    boxSizing: 'border-box'
}}>

    <span className="label" style={{
        fontSize: 'clamp(30px, 8vw, 60px)',
        // Updated: White to Royal Blue and Electric Indigo
        background: 'linear-gradient(135deg, #ffffff 0%, #3B82F6 50%, #7B3FE4 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'block',
        textAlign: 'center',
        fontWeight: '800',
        marginBottom: '1rem',
        letterSpacing: '-0.04em',
        textTransform: 'lowercase', 
        width: '100%'
    }}>
        the first four
    </span>

    <p style={{
        opacity: 0.8,
        maxWidth: '100%', 
        width: '700px',   
        margin: '0 auto 3rem auto',
        fontSize: 'clamp(15px, 3.5vw, 18px)',
        lineHeight: '1.7',
        textAlign: 'center',
        fontWeight: '300',
        padding: '0 10px'
    }}>
        For the next twelve months, we are being intentionally narrow and disciplined about who we bring into this mission. We are only hiring for four core roles. These are not silos. They are four deeply intertwined domains that together form the engine of Elinity: sharing stories, crafting experiences, building systems, and research-previewing the future.
        <br /><br />
        If you join us in one of these roles, you will not be “doing your part” in isolation. You will be shaping the whole. These are founding roles in every sense of the word.
    </p>

    <div className="roles-interface" style={{ width: '100%', maxWidth: '1050px', margin: '0 auto', border:'none'}}>

        {/* RESPONSIVE TABS - Updated with Blue/Indigo active states */}
        <div className="roles-tab s" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '24px',
            width: '100%'
        }}>
            {roles.map((role) => (
                <button 
                    key={role.id}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px 24px',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        // Active state: Using Indigo with low opacity
                        background: activeRole === role.id ? 'rgba(123, 63, 228, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        // Border: Blue for active
                        border: activeRole === role.id ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: activeRole === role.id ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                        textAlign: 'center',
                        boxSizing: 'border-box'
                    }}
                    onClick={() => setActiveRole(role.id)}
                >
                    <span style={{ fontSize: '10px', opacity: 0.5, marginBottom: '4px', fontWeight: '700' }}>
                        0{role.id}
                    </span>
                    <span style={{ fontWeight: '600' }}>
                        {role.subtitle.split(',')[0].toLowerCase()}
                    </span>
                </button>
            ))}
        </div>

        {/* ROLE CONTENT */}
        {roles.map((role) => role.id === activeRole && (
            <div key={role.id} style={{
                padding: 'clamp(20px, 5vw, 45px)',
                borderRadius: '24px',
                background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                width: '100%',
                boxSizing: 'border-box'
            }}>

                <div style={{ marginBottom: '2rem' }}>
                    {/* Updated to Electric Indigo */}
                    <span style={{ color: '#7B3FE4', fontWeight: '700', fontSize: '11px', textTransform: 'lowercase', letterSpacing: '1.5px' }}>
                        {role.subtitle}
                    </span>
                    <h3 style={{ fontSize: 'clamp(24px, 5vw, 36px)', marginTop: '8px', fontWeight: '700', textTransform: 'lowercase' }}>
                        {role.title}
                    </h3>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '30px',
                    justifyContent: 'center'
                }}>
                    
                    <div style={{ width: '100%' }}>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#f5f5f7', fontWeight: '600', textTransform: 'lowercase' }}>
                            what this role is about
                        </h4>
                        <p style={{ opacity: 0.75, lineHeight: '1.7', fontSize: '15px' }}>{role.about}</p>

                        <h4 style={{ marginTop: '2rem', fontSize: '1.1rem', marginBottom: '1rem', color: '#f5f5f7', fontWeight: '600', textTransform: 'lowercase' }}>
                            who you are
                        </h4>
                        <p style={{ opacity: 0.75, lineHeight: '1.7', fontSize: '15px' }}>{role.who}</p>
                    </div>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '24px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        boxSizing: 'border-box',
                        width: '100%',
                        margin: '0 auto'
                    }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '1.2rem', fontWeight: '600', textTransform: 'lowercase' }}>
                            what you'll do
                        </h4>

                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {role.do.map((task, idx) => (
                                <li key={idx} style={{
                                    marginBottom: '14px',
                                    fontSize: '14px',
                                    lineHeight: '1.5',
                                    opacity: 0.85,
                                    display: 'flex',
                                    gap: '12px'
                                }}>
                                    {/* Bullet point updated to Royal Blue */}
                                    <span style={{ color: '#3B82F6' }}>●</span>
                                    <span>{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {role.philosopherVariant && (
                    <div style={{
                        marginTop: '3rem',
                        padding: '24px',
                        borderRadius: '20px',
                        // Updated to Royal Blue / Dark gradient
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0,0,0,0.2))',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        backdropFilter: 'blur(10px)',
                        boxSizing: 'border-box'
                    }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#3B82F6', fontWeight: '700', textTransform: 'lowercase' }}>
                            resident philosopher variant
                        </h3>
                        <p style={{ opacity: 0.9, lineHeight: '1.7', marginBottom: '1.2rem', fontSize: '15px' }}>
                            We are also open to a Resident Philosopher, or a combined Philosopher and Growth Flourishing Head, whose primary role is to think and communicate.
                        </p>
                        <ul style={{ paddingLeft: '4px', lineHeight: '1.8', listStyle: 'none', fontSize: '14px' }}>
                            {['Background in philosophy is required.', 'Background in psychology or neuroscience is strongly preferred.', 'You will help shape AI personality, product philosophy, content, culture, and long-term vision.', 'Work across teams influencing how Elinity thinks, speaks, and evolves.'].map((text, i) => (
                                <li key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                                    <span style={{ color: '#3B82F6' }}>✦</span> <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        ))}
    </div>

    {/* Bottom Note Section */}
    <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 'clamp(24px, 6vw, 40px)',
            borderRadius: '24px',
            borderBottomRightRadius: 'clamp(24px, 10vw, 60px)',
            backdropFilter: 'blur(12px)',
            maxWidth: '800px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <h3 style={{ fontSize: '1rem', color: '#fff', opacity: 0.9, marginBottom: '1rem', letterSpacing: '1.5px', textTransform: 'lowercase' }}>
                a quick note on these roles
            </h3>
            <p style={{ color: '#d1d5db', fontSize: '16px', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                We do not believe small teams are a limitation. AI can compress years of progress into months for people with strong learning curves. We believe small, deeply aligned teams can build things once thought impossible.
            </p>
            <p style={{ color: '#fff', fontSize: '16px', lineHeight: '1.7', fontWeight: '500', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                If one of these roles feels less like a job description and more like a mirror, that is intentional.
            </p>
        </div>
    </div>
</section>
          {/* 23. Final Word */}
        <section
  className="final-manifesto"
  style={{
    padding: "clamp(60px, 12vw, 150px) 20px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "40px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
    boxSizing: "border-box",
    boxShadow: "0 30px 70px rgba(92,43,75,0.4)",
  }}
>
  <div style={{ maxWidth: "800px", width: "100%" }}>

    {/* HEADER */}
    <motion.h2
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 1 }}
      style={{
        fontSize: "clamp(32px,6vw,48px)",
        fontWeight: "800",
        letterSpacing: "-0.03em",
        marginBottom: "3rem",
        background: "linear-gradient(180deg,#fff 0%,#7759fd 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      A Final Word
    </motion.h2>

    {/* CORE LINE */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      style={{
        fontSize: "clamp(18px,4vw,24px)",
        lineHeight: "1.5",
        fontWeight: "500",
        color: "#fff",
        marginBottom: "4rem",
        opacity: 0.95,
      }}
    >
      Elinity is an attempt to build a new social and emotional infrastructure for humanity.
    </motion.p>

    {/* IF STATEMENTS STAGGER */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        visible: { transition: { staggerChildren: 0.25 } },
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginBottom: "4rem",
        textAlign: "left",
        paddingLeft: "clamp(0px,5vw,40px)",
        borderLeft: "1px solid rgba(176,102,254,0.3)",
      }}
    >
      {[
        "If you have ever felt that modern life is missing something essential.",
        "If you believe relationships deserve better tools and more intentionality.",
        "If you believe AI can help us become more human, not less.",
        "If you want your work to matter deeply, not just economically.",
      ].map((text, i) => (
        <motion.p
          key={i}
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(15px,3.5vw,19px)",
            lineHeight: "1.6",
            opacity: 0.7,
            fontWeight: "300",
            margin: 0,
          }}
        >
          {text}
        </motion.p>
      ))}
    </motion.div>

    {/* TRANSITION LINE */}
    <motion.p
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        fontSize: "clamp(20px,4vw,28px)",
        fontWeight: "700",
        color: "#b066fe",
        marginBottom: "2rem",
      }}
    >
      Then this might be your place.
    </motion.p>

    {/* PROMISE CARD */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: "40px",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: "4rem",
      }}
    >
      <p style={{ fontSize: "clamp(16px,3.5vw,20px)", lineHeight: "1.8", margin: 0 }}>
        We are not promising certainty. <br />
        We are promising <strong>meaning, intensity, growth</strong>, and the chance to work on something that genuinely matters.
      </p>
    </motion.div>

    {/* FINAL CTA */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      style={{ maxWidth: "650px", margin: "0 auto" }}
    >
      <p
        style={{
          fontSize: "clamp(18px,4vw,22px)",
          lineHeight: "1.6",
          fontWeight: "400",
          marginBottom: "2.5rem",
          color: "#e0dded",
        }}
      >
        If this feels like a calling rather than a job, we would love to hear from you.
      </p>

      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.8",
          opacity: 0.5,
          fontStyle: "italic",
        }}
      >
        Let’s build something that helps the world connect more deeply, love more intentionally, play with more passion, and build with more alignment.
      </p>
    </motion.div>
  </div>
</section>

<div className="pt-16"></div>

          <footer className="final-word" style={{
              padding: 'clamp(40px, 8vw, 80px) 0px',
              background: '#06050b', // Base dark
              backgroundImage: 'linear-gradient(135deg, transparent  0%, #221752 100%)', // Subtle glow
              color: '#F8F9FA',
              borderTop: '0.5px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              overflow: 'hidden',
              boxSizing: 'border-box',
              borderRadius: '40px 40px 40px 40px'
          }}>
              <div className="container" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '1200px',
                  margin: '0 auto'
              }}>
                  <span className="label" style={{ 
                      fontSize: 'clamp(14px, 4vw, 24px)', 
                      color: '#b066fe', 
                      fontWeight: '600',
                      letterSpacing: '2px',
                      // textTransform: 'uppercase',
                      marginBottom: '1rem'
                  }}>
                      The Destination
                  </span>

                  <h2 style={{
                      color: '#F8F9FA',
                      fontSize: 'clamp(20px, 5vw, 32px)',
                      fontWeight: '400',
                      maxWidth: '600px',
                      lineHeight: '1.4',
                      marginBottom: '3rem',
                      opacity: 0.9
                  }}>
                      An emotional operating system for humanity.
                  </h2>
                  
                  {/* Glassmorphic Brand Section */}
                  <a href="#" className="lightning-wrapper" style={{ 
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                  }}>
                      <div style={{
                              background: 'rgba(255, 255, 255, 0.03)',
                              padding: 'clamp(20px, 5vw, 40px)',
                              borderRadius: '30px',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                              /* ADD THESE TWO LINES */
                              width: '100%', 
                              maxWidth: '500px' 
                          }}>
                          <h1 className="brand-title" style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontWeight: '900',
                              fontSize: 'clamp(32px, 8vw, 60px)',
                              letterSpacing: 'clamp(0.2rem, 2vw, 0.8rem)',
                              margin: '0',
                              textTransform: 'uppercase',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '20px',
                              /* Animated Gradient Logic */
                              background: 'linear-gradient(135deg, #fff 0%, #b066fe 50%, rgba(255,255,255,0.3) 100%)',
                              backgroundSize: '200% auto',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                          }}>
                              <img 
                                  src="https://res.cloudinary.com/dge1qccxs/image/upload/v1778672008/04235931-ebaa-4506-8551-d59bd86b6b26-removebg-preview_vyqdqe.png" 
                                  alt="Elinity Logo" 
                                  style={{
                                      height: 'clamp(40px, 10vw, 70px)',
                                      width: 'auto',
                                      filter: 'drop-shadow(0 0 10px rgba(176, 102, 254, 0.5))'
                                  }}
                              />
                              Elinity
                          </h1>
                      </div>
                  </a>
                  
                  <p className="label" style={{ 
                      marginTop: '3rem', 
                      border: 'none', 
                      fontSize: 'clamp(12px, 3vw, 15px)',
                      opacity: 0.6,
                      letterSpacing: '1px',
                      maxWidth: '90% '
                  }}>
                      Find your people. Build your tribe. Flourish together.
                  </p>
              </div>
          </footer>
          <br /><br />
          <ElinityFooter />
    </div>
  );
};

export default JoinUs;