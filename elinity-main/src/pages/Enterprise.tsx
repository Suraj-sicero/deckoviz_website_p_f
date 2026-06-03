import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ElinityEnterprise: React.FC = () => {

  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsPhone(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  /* =========================
     GLOBAL ANIMATION VARIANTS
  ==========================*/
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -6, transition: { duration: 0.35, ease: "easeOut" } }
  };

  const floatingGlow = {
    animate: {
      y: [0, -25, 0],
      opacity: [0.4, 0.7, 0.4],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
    }
  };

  /* =========================
     STYLES
  ==========================*/
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: `
      radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(123, 63, 228, 0.15) 0%, transparent 50%),
      linear-gradient(180deg, #030014 0%, #0a0a23 100%)
    `,
    backgroundAttachment: 'fixed',
    color: '#ffffff',
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: isPhone ? '40px 16px' : '80px 20px',
    lineHeight: '1.7',
    overflowX: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
  };

  const glassStyle: React.CSSProperties = {
    background: 'rgba(123, 63, 228, 0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: isPhone ? '24px' : '40px',
    padding: isPhone ? '24px 16px' : '60px 40px',
    maxWidth: '1100px',
    margin: '0 auto 40px auto',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(123, 63, 228, 0.15) inset',
    boxSizing: 'border-box' as const,
    width: '100%',
  };

  const mainHeadingStyle: React.CSSProperties = {
    fontSize: isPhone ? 'clamp(2rem, 8vw, 2.8rem)' : 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 900,
    letterSpacing: '-0.04em',
    marginBottom: '0.5rem',
    background: 'linear-gradient(to right, #ffffff, #3B82F6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.1',
  };

  const subHeadingStyle: React.CSSProperties = {
    fontSize: isPhone ? 'clamp(1.1rem, 4vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: 400,
    color: '#a1a1a1',
    marginBottom: '2rem',
    letterSpacing: '-0.02em',
  };

  const offeringHeaderStyle: React.CSSProperties = {
    fontSize: isPhone ? '1.4rem' : '2rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#fff',
    lineHeight: '1.3',
  };

  const innerCard: React.CSSProperties = {
    maxWidth: '850px',
    margin: '0 auto',
    padding: isPhone ? '20px 16px' : '40px',
    borderRadius: isPhone ? '16px' : '24px',
    background: 'rgba(59, 130, 246, 0.04)',
    border: '1px solid rgba(59, 130, 246, 0.12)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
    boxSizing: 'border-box' as const,
    width: '100%',
  };

  const pillStyle: React.CSSProperties = {
    padding: isPhone ? '8px 14px' : '10px 20px',
    borderRadius: '999px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    background: 'rgba(59, 130, 246, 0.06)',
    fontSize: isPhone ? '0.85rem' : '0.95rem',
    color: '#d1d1d1',
  };

  const smallPillStyle: React.CSSProperties = {
    padding: isPhone ? '7px 12px' : '9px 18px',
    borderRadius: '999px',
    border: '1px solid rgba(59, 130, 246, 0.15)',
    background: 'rgba(59, 130, 246, 0.05)',
    color: '#d1d1d1',
    fontSize: isPhone ? '0.82rem' : '0.92rem',
  };

  const divider: React.CSSProperties = {
    height: '1px',
    background: 'rgba(59, 130, 246, 0.15)',
    margin: isPhone ? '24px 0' : '32px 0',
  };

  const sectionSpacing: React.CSSProperties = {
    marginTop: isPhone ? '24px' : '80px',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={containerStyle}
    >

      {/* Floating ambient glow */}
      <motion.div
        variants={floatingGlow}
        animate="animate"
        style={{
          position: "absolute",
          top: 100,
          left: "10%",
          width: isPhone ? 150 : 300,
          height: isPhone ? 150 : 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none"
        }}
      />

      <div style={{ paddingTop: isPhone ? '60px' : '128px' }}></div>

      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        style={{ textAlign: 'center', marginBottom: isPhone ? '40px' : '100px', padding: '0' }}
      >
        <motion.div variants={fadeInUp}>
          <h1 style={mainHeadingStyle}>Elinity for Enterprises</h1>
          <h2 style={subHeadingStyle}>Build teams that thrive - not just function</h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          whileHover={isPhone ? undefined : { scale: 1.01 }}
          style={glassStyle}
        >
          <p style={{
            fontSize: isPhone ? '1rem' : '1.25rem',
            color: '#d1d1d1',
            maxWidth: '800px',
            margin: '0 auto 24px auto',
            lineHeight: '1.7'
          }}>
            The companies that win in the next decade will not be the ones with the most resources.
            They'll be the ones with the most{' '}
            <span style={{ color: '#fff', fontWeight: 600 }}>
              aligned, emotionally intelligent, high-agency people.
            </span>
            <br /><br />
            <span style={{ color: '#fff', fontWeight: 600 }}>
              Elinity for Enterprises is built for exactly that.
            </span>
            <br /><br />
            We help you:
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px'
          }}>
            {[
              'find the most aligned, mission-driven people',
              'elevate the emotional intelligence of your team',
              'future-proof your human advantage in a post-AGI landscape',
              'build relationship quality as a strategic asset'
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={cardHover}
                initial="rest"
                whileHover={isPhone ? undefined : "hover"}
                style={{
                  ...pillStyle,
                  width: isPhone ? '100%' : 'auto',
                  textAlign: 'center',
                }}
              >
                • {item}
              </motion.div>
            ))}
          </div>

          <p style={{
            fontSize: isPhone ? '0.95rem' : '1.1rem',
            color: '#d1d1d1',
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            This is not recruitment software, or some HR wellness perk.
            <br />
            <span style={{ color: '#fff', fontWeight: 600 }}>
              This is relationship infrastructure.
            </span>
          </p>
        </motion.div>
      </motion.section>

<style>
        {`
          @keyframes glowPulse {
            0% { filter: drop-shadow(0px 4px 8px rgba(59, 130, 246, 0.3)); }
            50% { filter: drop-shadow(0px 4px 20px rgba(59, 130, 246, 0.6)); }
            100% { filter: drop-shadow(0px 4px 8px rgba(59, 130, 246, 0.3)); }
          },
.pill-hover {
  /* Hardware acceleration & smooth rendering */
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform: translateZ(0); 
  
  /* The "Fluid" Ease: A custom curve that starts slow, speeds up, and settles softly */
  transition: 
    transform 1s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.4s ease,
    box-shadow 0.4s ease;
  
  cursor: pointer;
  will-change: transform; /* Prepares the browser for movement */
}

.pill-hover:hover {
  /* scale(1.05) is smoother than 1.1; it feels less "jumpy" */
  transform: scale(1.05) translateY(-3px);
  
  background: rgba(59, 130, 246, 0.18) !important;
  
  /* Soft, layered shadow for a more natural depth */
  box-shadow: 
    0 10px 20px rgba(59, 130, 246, 0.15),
    0 4px 6px rgba(59, 130, 246, 0.05);
}

/* Optional: Smoothly return to state when mouse leaves */
.pill-hover:active {
  transform: scale(0.98) translateY(0); /* Subtle "press" effect */
  transition: transform 0.1s ease;
}
        `}
      </style>
      <h1
        style={{
          fontSize: isPhone ? '2.2rem' : '3.5rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 30%, #3B82F6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          lineHeight: '1.2',
          margin: isPhone ? '24px 0' : '48px 20px',
          // Applying the animation here:
          animation: 'glowPulse 4s ease-in-out infinite',
          display: 'block'
        }}
      >
        Our Offerings
      </h1>
      {/* SECTION 1: ELLARIS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        style={glassStyle}
      >
        <h2 style={{...offeringHeaderStyle,
                    background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',

        }}

        >Ellaris: Find Missionaries. Not Mercenaries.</h2>
        <p style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', color: '#a1a1a1', marginBottom: '32px' }}>
          Hiring is broken. <br />
          You pay brutal search costs.<br />
          You burn months interviewing.<br />
          You optimize for CVs and keywords.<br />
          You hope alignment magically appears after onboarding.<br /><br />
          And the real brutal cost you dare not consider?<br></br>
          The opportunity cost of not having the most amazing, deeply aligned people on your team. <br /><br />
          Imagine now if you did have those people in your team - how much of an accelerant the synergistic energy would be to your mission.
          <br /><br /> Ellaris helps you achieve that.
        </p>

        <h3 style={{ color: '#fff', fontSize: isPhone ? '1.1rem' : '1.25rem', marginBottom: '8px' ,
          background: 'linear-gradient(to right, #ffffff, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.1',
        }}>
          What is Ellaris?
        </h3>
        <p style={{ fontSize: isPhone ? '0.9rem' : '1rem', color: '#d1d1d1', marginBottom: '20px' }}>
          Ellaris repurposes the same deep modeling and matching engine that powers Elinity's relationship system - but for companies and talent.
          <br /><br />
          We match individuals to companies across:
        </p>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: isPhone ? '10px' : '20px',
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {[
            "values",
            "long-term vision and mission congruence",
            "temperament and personality",
            "cognitive strengths",
            "ambition profile",
            "cultural fit",
            "collaboration patterns and work style",
          ].map((trait) => (
            <div
              key={trait}
              onMouseEnter={() => setHoveredIndex(trait)}
  onMouseLeave={() => setHoveredIndex(null)}
              style={{
                
                width: isPhone ? '100%' : '200px',
                padding: isPhone ? '12px 16px' : '20px',
                borderRadius: '20px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                textAlign: 'center',
                boxSizing: 'border-box',
                cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth "pop"
    transform: hoveredIndex === trait ? 'scale(1.08)' : 'scale(1)',
    backgroundColor: hoveredIndex === trait ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.05)',
    boxShadow: hoveredIndex === trait 
      ? '0 10px 30px -10px rgba(59, 130, 246, 0.4)' 
      : '0 0px 0px rgba(0,0,0,0)',
    zIndex: hoveredIndex === trait ? 2 : 1, // Ensures it stays on top of neighbors
              }}
            >
              <span style={{ fontWeight: 600, fontSize: isPhone ? '0.9rem' : 'inherit' }}>{trait}</span>
            </div>
          ))}
        </div>

        <p style={{
          padding: isPhone ? '14px' : '20px',
          borderRadius: '20px',
          background: 'rgba(59, 130, 246, 0.05)',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          textAlign: 'center',
          margin: '20px 0',
          fontSize: isPhone ? '0.9rem' : 'inherit',
          color: '#d1d1d1',
        }}>
          This is not surface-level matching.<br />
          this is best-fit alignment across relevant dimensions
        </p>

        {/* We Connect */}
        <div style={sectionSpacing}>
          <div style={innerCard}>
            <h3 style={{
              fontSize: isPhone ? '0.95rem' : '1.1rem',
              letterSpacing: '2px',
              color: '#a1a1a1',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>We connect</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: isPhone ? '0.9rem' : '1rem',
              color: '#d1d1d1'
            }}>
              {[
                'Founders → founding team members',
                'Companies → high-conviction operators',
                'Mission-driven orgs → deeply aligned talent',
                'ambitious, culture shaping company\'s → talent that fits right at home'
              ].map((item, i) => (
                <li key={i} style={{
                  padding: isPhone ? '10px 14px' : '14px 18px',
                  borderRadius: '14px',
                  background: 'rgba(59, 130, 246, 0.04)',
                  border: '1px solid rgba(59, 130, 246, 0.08)',
                }}>
                  {item}
                </li>
              ))}
            </ul>
            <div style={divider} />
            <p style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', textAlign: 'center', color: '#d1d1d1', lineHeight: '1.7' }}>
              We help you find the people who believe in what you're building,
              who share your mission,
              and who are just as driven.
            </p>
          </div>
        </div>

        {/* Why It Matters Now */}
        <div style={sectionSpacing}>
          <div style={innerCard}>
            <h3 style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', letterSpacing: '2px', color: '#a1a1a1', textAlign: 'center', marginBottom: '1.5rem' }}>
              Why It Matters Now
            </h3>
            <div style={divider} />
            {[
              'In a post-AGI world, as technology commodifies, the bottleneck shifts to people. Human leverage becomes decisive.',
              'The difference between a good team and a truly aligned team compounds massively.',
              'Ellaris is designed to help you achieve that compounding, to help your mission become your alpha and your omega.'
            ].map((text, i) => (
              <p key={i} style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', textAlign: 'center', color: '#d1d1d1', lineHeight: '1.7' }}>{text}</p>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={sectionSpacing}>
          <div style={innerCard}>
            <h3 style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', letterSpacing: '2px', color: '#a1a1a1', textAlign: 'center', marginBottom: '1.5rem' }}>
              Pricing
            </h3>
            <div style={divider} />
            <p style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', textAlign: 'center', color: '#d1d1d1', lineHeight: '1.7' }}>
              We have an outcome-based pricing, where we only charge if you hire from us.
            </p>
            <p style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', textAlign: 'center', color: '#d1d1d1', lineHeight: '1.7' }}>
              Because we're confident you'll get the value.
            </p>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2: EMPLOYEES */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        style={glassStyle}
      >
        <h2 style={{...offeringHeaderStyle,
                    background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',

        }}>
          Elinity for Employees: Elevate the Relationship Layer
        </h2>
        <p style={{ fontSize: isPhone ? '0.95rem' : '1.1rem', color: '#a1a1a1', marginBottom: '32px' }}>
          Your most important asset is not capital - there is plenty of that going around <br />
          It's not software - not anymore. <br />
          It's not even strategy - soon, we will all have a Jobs-level strategist in our pockets.<br /><br />
          In this world, the most important asset becomes the emotional and relational health of your team.
        </p>

        <div style={{
          ...innerCard,
          maxWidth: '900px',
          margin: isPhone ? '20px auto' : '40px auto',
          padding: isPhone ? '20px 16px' : '50px 40px',
          borderRadius: isPhone ? '20px' : '28px',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: isPhone ? '1.1rem' : '1.4rem', color: '#fff', fontWeight: 600, marginBottom: '20px', letterSpacing: '-0.01em',
                      background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',

           }}>
            Relationship quality is the most powerful determinant of well-being.
          </h3>
          <p style={{ fontSize: isPhone ? '0.95rem' : '1.05rem', color: '#a1a1a1', marginBottom: '20px' }}>Well-being drives:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
            {['motivation', 'creativity', 'alignment', 'resilience', 'discretionary effort', 'long-term retention'].map((item, i) => (
              <div key={i} style={{...pillStyle,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredIndex === i ? 'scale(1.08)' : 'scale(1)',
                backgroundColor: hoveredIndex === i ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.05)',
                boxShadow: hoveredIndex === i 
                  ? '0 10px 30px -10px rgba(59, 130, 246, 0.4)' 
                  : '0 0px 0px rgba(0,0,0,0)',
                zIndex: hoveredIndex === i ? 2 : 1,
              }} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
              >{item}</div>
            ))}
          </div>
          <p style={{ fontSize: isPhone ? '0.9rem' : '1.05rem', color: '#d1d1d1', lineHeight: '1.8', maxWidth: '720px', margin: '0 auto' }}>
            In high-leverage environments, a single misalignment can cost millions.
            <br /><br />
            A single aligned team can create disproportionate value, and the kind of value beyond the financial,
            the kind that matters even more. <strong style={{ color: '#fff' }}>Much more.</strong>
          </p>
        </div>

        <div style={{
          ...innerCard,
          maxWidth: '950px',
          margin: isPhone ? '20px auto' : '40px auto',
          padding: isPhone ? '24px 16px' : '60px 45px',
          borderRadius: isPhone ? '20px' : '32px',
          textAlign: 'center',
          
        }}>
          <h2 style={{ fontSize: isPhone ? '1.3rem' : '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em' ,
                      background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',

          }}>
            What We Provide
          </h2>
          <p style={{ color: '#a1a1a1', marginBottom: '24px', fontSize: isPhone ? '0.9rem' : '1.05rem' }}>
            An Elinity package for your team that includes:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
            {[
              'relationship-flourishing OS access',
              'team compatibility insights',
              'communication and reflection prompts',
              'guided rituals for alignment',
              'shared intention tracking',
              'structured reflection cycles',
              'conflict-awareness frameworks',
              'emotional intelligence development tools'
            ].map((item, i) => (
              <div key={i} style={{...pillStyle}} className="pill-hover ml-2 mr-2">
                {item}
              </div>
            ))}
          </div>
          <div style={divider} />
          <h3 style={{ fontSize: isPhone ? '1.1rem' : '1.4rem', color: '#fff', fontWeight: 600, marginBottom: '12px',
                      background: 'linear-gradient(to right, #ffffff, #3B82F6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: '1.1',
           }}>
            A Work Flourishing Skills Coach for the Post-AGI Era
          </h3>
          <p style={{ color: '#a1a1a1', marginBottom: '24px', fontSize: isPhone ? '0.9rem' : '1.05rem' }}>
            As automation increases, the edge shifts to:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
            {['judgment', 'taste', 'trust', 'emotional regulation', 'clarity of thought', 'ethical reasoning', 'collaborative intelligence'].map((item, i) => (
<div 
  key={i} 
  className="pill-hover mr-2 ml-2" 
  style={{...pillStyle}}
>
  {item}
</div>
            ))}
          </div>
          <p style={{ fontSize: isPhone ? '0.9rem' : '1.05rem', color: '#d1d1d1', lineHeight: '1.8', maxWidth: '720px', margin: '0 auto' }}>
            We provide structured coaching modules inside the OS, with Ellegara,
            to help your team sharpen these skills, and become ever-prepared to win in any future.
          </p>
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        style={{ textAlign: 'center', padding: isPhone ? '0 0 40px 0' : '60px 20px' }}
      >
        <div style={{
          ...innerCard,
          maxWidth: '1000px',
          margin: isPhone ? '0 auto 40px auto' : '0 auto',
          padding: isPhone ? '24px 16px' : '65px 50px',
          borderRadius: isPhone ? '24px' : '34px',
          textAlign: 'left',
        }}>
          <h2 style={{ fontSize: isPhone ? '1.5rem' : '2rem', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '40px', letterSpacing: '-0.01em',
                      background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',

           }}>
            How It Works
          </h2>

          {/* STEP 1 */}
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ color: '#fff', fontSize: isPhone ? '1rem' : '1.25rem', marginBottom: '10px', background: 'linear-gradient(to right, #ffffff, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.1' }}>Step 1: Enterprise Package</h3>
            <p style={{ color: '#d1d1d1', marginBottom: '16px', lineHeight: '1.8', fontSize: isPhone ? '0.9rem' : 'inherit' }}>
              You choose an Elinity Enterprise package tailored to your team size and goals.<br />This includes access to:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Ellaris (if hiring)', 'The team relationship OS', 'Work flourishing human skills development system'].map((item, i) => (
                <div key={i} style={smallPillStyle} className='pill-hover mr-2 ml-2'>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ color: '#fff', fontSize: isPhone ? '1rem' : '1.25rem', marginBottom: '10px',           background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',
 }}>Step 2: Onboarding</h3>
            <p style={{ color: '#d1d1d1', marginBottom: '16px', lineHeight: '1.8', fontSize: isPhone ? '0.9rem' : 'inherit' }}>
              One of our team members conducts a live onboarding session with you and your team.<br />We walk you through:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                'how the system works',
                'how to use it daily, weekly or at your desired cadence',
                'how to integrate it into existing workflows',
                'how to measure relational health and growth'
              ].map((item, i) => (
                <div key={i} style={smallPillStyle} className='pill-hover mr-2 ml-2'>
                  {item}
                </div>
              ))}
            </div>
            <p style={{ color: '#a1a1a1', marginTop: '16px', lineHeight: '1.8', fontSize: isPhone ? '0.9rem' : 'inherit' }}>
              We make it practical, grounded, and focused on your team's needs.
            </p>
          </div>

          {/* STEP 3 */}
          <div>
            <h3 style={{ color: '#fff', fontSize: isPhone ? '1rem' : '1.25rem', marginBottom: '10px',
                        background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',
             }}>Step 3: Ongoing Integration</h3>
            <p style={{ color: '#d1d1d1', marginBottom: '16px', lineHeight: '1.8', fontSize: isPhone ? '0.9rem' : 'inherit' }}>
              Your team uses Elinity as a living layer:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              {[
                'onboarding new hires',
                'quarterly reflection cycles',
                'strengthening cross-functional collaboration',
                'leadership development',
                'resolving tension early',
                'reinforcing culture intentionally'
              ].map((item, i) => (
                <div key={i} style={smallPillStyle} className='pill-hover ml-2 mr-2'>
                  {item}
                </div>
              ))}
            </div>
            <p style={{ color: '#a1a1a1', lineHeight: '1.8', fontSize: isPhone ? '0.9rem' : 'inherit' }}>
              This goes beyond something like a one-time intervention into an ongoing relational infrastructure.
            </p>
          </div>
        </div>
      </motion.section>

      {/* WHY ENTERPRISES CHOOSE */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          ...innerCard,
          maxWidth: '1000px',
          margin: isPhone ? '0 auto 40px auto' : '0px auto 40px auto',
          padding: isPhone ? '24px 16px' : '70px 50px',
          borderRadius: isPhone ? '24px' : '36px',
        }}
      >
        <h2 style={{ fontSize: isPhone ? '1.5rem' : '2rem', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '32px', letterSpacing: '-0.01em',
                    background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',
         }}>
          Why Enterprises Choose Elinity
        </h2>

        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', lineHeight: '1.9', fontSize: isPhone ? '0.95rem' : '1.08rem', color: '#d1d1d1', marginBottom: '40px' }}>
          <p>Because the cost of misalignment is enormous.</p>
          <p>Because recruitment inefficiency compounds.</p>
          <p>Because culture is not a poster - it's a lived system.</p>
          <p>Because in a world where AI levels the technical playing field,</p>
          <p style={{ color: '#fff', fontWeight: 500,
            background: 'linear-gradient(to right, #ffffff, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.1',
           }}>human connection becomes the differentiator.</p>
        </div>

        <div style={{ height: '1px', background: 'rgba(59, 130, 246, 0.2)', margin: isPhone ? '24px auto' : '50px auto', maxWidth: '700px' }} />

        <h3 style={{ fontSize: isPhone ? '1.2rem' : '1.5rem', color: '#fff', textAlign: 'center', marginBottom: '16px', fontWeight: 600,
                    background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',
         }}>
          Built for the Post-AGI Landscape
        </h3>
        <p style={{ textAlign: 'center', color: '#a1a1a1', marginBottom: '24px', fontSize: isPhone ? '0.9rem' : '1.05rem' }}>
          We've imagined what teams need when:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
          {[
            'AI handles more and more operational work',
            'Most technical skills become commodities',
            'decision velocity increases as landscape change rate increases',
            'leverage per individual skyrockets',
            'trust and clarity become non-negotiable',
            'ROI - and opportunity costs - increase, as there is a lot more to gain, a lot more to lose'
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={isPhone ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.2 }}
              style={pillStyle}
              className='pill-hover ml-2 mr-2'
            >
              {item}
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto', lineHeight: '1.9', fontSize: isPhone ? '0.95rem' : '1.08rem', color: '#d1d1d1' }}>
          <p>We built Ellaris and the team OS together with that future in mind.</p>
          <p style={{ marginTop: '16px', color: '#fff', fontWeight: 600,
                      background: 'linear-gradient(to right, #ffffff, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1',
           }}>
            Elinity for Enterprises is about tomorrow's team architecture.
          </p>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        style={{ textAlign: 'center', padding: isPhone ? '40px 0 20px 0' : '80px 20px' }}
      >
        <h2 style={{ fontSize: isPhone ? '1.8rem' : '2.5rem', fontWeight: 800, marginBottom: '20px', lineHeight: '1.2',
                    background: 'linear-gradient(to right, #ffffff, #3B82F6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
         }}>
          Ready to Explore?
        </h2>

        <p style={{
          color: '#d1d1d1',
          fontSize: isPhone ? '0.95rem' : '1.1rem',
          maxWidth: '700px',
          margin: '0 auto 32px auto',
          lineHeight: '1.8'
        }}>
          For more information or to book a call with our team, email us at
        </p>

        <motion.a
          whileHover={isPhone ? undefined : { scale: 1.08, boxShadow: '0 0 45px rgba(59, 130, 246, 0.7)' }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(59,130,246,0)',
              '0 0 25px rgba(59,130,246,0.6)',
              '0 0 0px rgba(59,130,246,0)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          whileTap={{ scale: 0.95 }}
          href="mailto:enterprise@elinity.ai"
          style={{
            background: 'linear-gradient(to right, #ffffff, #3B82F6)',
            color: '#030014',
            padding: isPhone ? '14px 32px' : '20px 60px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: isPhone ? '1rem' : '1.2rem',
            display: 'inline-block',
            wordBreak: 'break-all',
          }}
        >
          enterprise@elinity.ai
        </motion.a>

        <p style={{
          marginTop: '32px',
          color: '#a1a1a1',
          fontSize: isPhone ? '0.9rem' : '1.05rem',
          maxWidth: '780px',
          marginInline: 'auto',
          lineHeight: '1.8'
        }}>
          Let's build teams and seed missions that flourish and actualize their fullest
          potential to create meaning and magic.
        </p>
      </motion.section>

    </motion.div>
  );
};

export default ElinityEnterprise;