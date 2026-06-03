import React, { useState, useEffect, useRef } from 'react';
import ElinityManifesto from './morecontent';
import { createPortal } from 'react-dom';

export default function ElinityLandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Handlers ---
  const handleOpenModal = () => {
    setIsExpanding(true);
    setTimeout(() => {
      setIsModalOpen(true);
      setIsExpanding(false);
    }, 400); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCollapsed(true);
  };

  // --- Scroll Lock Logic ---
  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isModalOpen]);

  // --- Responsive Logic ---
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Animation Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShowCard(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: isMobile ? "20px" : "80px 40px",
      backgroundColor: "#03000a", 
      backgroundImage: `radial-gradient(circle at 50% -20%, #7B3FE422 0%, transparent 50%), 
                        radial-gradient(circle at 0% 100%, #030014 0%, transparent 40%)`,
      fontFamily: "'Inter', system-ui, sans-serif", color: 'white', overflowX: "hidden"
    }}>
      
      {/* Background Glow updated to Bright Cyan/Indigo mix */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '70%', height: '400px', background: 'radial-gradient(ellipse at center, rgba(0, 210, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0
      }} />

      <div ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative", zIndex: 10, maxWidth: "1100px", width: "100%",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          background: "rgba(255, 255, 255, 0.015)",
          border: "1px solid rgba(123, 63, 228, 0.15)", // Electric Indigo tint
          borderRadius: isMobile ? "32px" : "48px",
          padding: isMobile ? "45px 24px" : "80px",
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out",
          transform: showCard ? "translateY(0)" : "translateY(80px)",
          opacity: showCard ? 1 : 0,
          boxShadow: "0 40px 100px -20px rgba(0, 0, 0, 0.7)",
          overflow: 'hidden'
        }}>
        
        {/* Interactive Spotlight (Desktop only) */}
        {!isMobile && (
          <div style={{
            pointerEvents: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 40%)`,
            zIndex: 1
          }} />
        )}

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Header Section */}
          <div style={{ textAlign: isMobile ? 'left' : 'center', marginBottom: '60px' }}>
            <h1 style={{
              fontSize: isMobile ? "42px" : "72px", fontWeight: 800, marginBottom: "24px", 
              lineHeight: 0.95, letterSpacing: "-0.05em",
              background: "linear-gradient(180deg, #fff 30%, #3B82F6 100%)", // Royal Blue mix
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>say hello to elinity:</h1>

            <p style={{
              fontSize: isMobile ? "16px" : "19px", lineHeight: "1.6",
              color: "rgba(255,255,255,0.7)", fontWeight: 400, maxWidth: "780px", 
              margin: isMobile ? "0" : "0 auto", letterSpacing: '-0.01em'
            }}>
              your social life, <span style={{color: '#00D2FF', fontWeight: 600}}>leveled up like never before.</span> let’s be real - modern connecting is kind of broken. between the endless scrolling and jumping, the swipe nightmare, and the growing vacuum of depth, finding - and actually keeping - meaningful relationships feels harder than ever.
            </p>
          </div>

          {/* Banner Quote */}
          <div style={{
            fontSize: isMobile ? "14px" : "17px", color: "#e2e8f0", marginBottom: "60px",
            padding: "30px", background: "linear-gradient(145deg, rgba(123, 63, 228, 0.08), rgba(0,0,0,0))",
            borderRadius: "24px", border: "1px solid rgba(0, 210, 255, 0.1)", 
            lineHeight: "1.6", textAlign: 'center'
          }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '18px' }}>elinity is here to fix the big glitch.</strong> we're a holistic app built to help you find your <span style={{color: '#3B82F6', fontWeight: 600}}>"best-fit" humans</span> and turn connections into legendary, lifelong relationships.
          </div>

          {/* Features Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '40px',
            alignItems: 'start'
          }}>
            
            {/* Resonance Engine */}
            <div style={{ paddingRight: isMobile ? '0' : '20px' }}>
              <span style={{ fontSize: "20px", color: "#7B3FE4", fontWeight: 800, letterSpacing: '1px'}}>how we do it:</span>
              <h3 style={{ fontSize: "28px", color: "#fff", margin: "12px 0 16px", fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '12px', filter: 'drop-shadow(0 0 8px #7B3FE4)' }}>⚡</span> the resonance engine :
              </h3>
              <p style={{ color: 'rgba(0, 210, 255, 0.5)', fontSize: '12px', marginBottom: '16px', fontWeight: 500 }}>(finding your people)</p>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#94a3b8" }}>
                forget mindless swiping. our ai doesn't just look at your bio; it models your values, goals, and quirks to find your most resonant matches across <span style={{color: '#fff', fontWeight: 500}}>love, leisure, and collaboration.</span> our goal? get you off the screen and meeting your people in record time. yup, our north star is to reduce the time it takes to get you to your people.
              </p>
              <div style={{ 
                marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(123, 63, 228, 0.15)', 
                textAlign: 'center' 
              }}>
                <p style={{ 
                  color: '#94a3b8', fontSize: '14px', fontStyle: 'italic',
                  maxWidth: '450px', margin: '0 auto', lineHeight: 1.7,
                display: isMobile ? 'none' : 'block' 
                }}>
                  <b style={{ color: '#fff', fontWeight: 800, fontStyle: 'normal' }}>our mission is simple:</b>  to help you find your tribe and build relationships so good, they feel like a cheat code for life. as they are meant to be!
                </p>
              </div>
            </div>

            {/* Flourishing Suite */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '32px',
              padding: '35px', position: 'relative',
              boxShadow: 'inset 0 0 20px rgba(0, 210, 255, 0.05)'
            }}>
              <h3 style={{ 
                fontSize: '24px', marginBottom: '4px', 
                background: 'linear-gradient(to right, #fff, #00D2FF)', 
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700
              }}>the flourishing suite : </h3>
              <p style={{ color: '#3B82F6', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '20px'}}>(thriving in your relationships)</p>
              
              <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                once you’ve met, the magic begins. we give you a portal to make relationships actually <i>thrive</i>. think:
              </p>

              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  { title: "relationship coaching", desc: "to navigate the tricky bits." },
                  { title: 'a "life book"', desc: "to track your shared journey." },
                  { title: "connection games", desc: "designed for pure whimsy and delight." },
                  { title: "a walled-garden social network", desc: "- all the connection, none of the noise." }
                ].map((item, i) => (
                  <div key={i} style={{ 
                    padding: '14px 20px', background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '18px', border: '1px solid rgba(123, 63, 228, 0.1)',
                    transition: 'border 0.3s ease'
                  }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '14px', display: 'block' }}>{item.title}</span>
                    <p style={{ color: '#64748b', margin: '4px 0 0 0', fontSize: '12px' }}>{item.desc}</p>
                  </div>
                ))}
                <p style={{ color: '#00D2FF', margin: '4px 0 0 0', fontSize: '16px', paddingLeft: '20px' }}>and more</p>
              </div>
            </div>
              <div style={{ 
                marginTop: '20px', paddingTop: '40px', borderTop: '1px solid rgba(123, 63, 228, 0.15)', 
                textAlign: 'center',
                display: isMobile ? 'block' : 'none' 
              }}>
                <p style={{ 
                  color: '#94a3b8', fontSize: '14px', fontStyle: 'italic',
                  maxWidth: '450px', margin: '0 auto', lineHeight: 1.7 
                }}>
                  <b style={{ color: '#fff', fontWeight: 800, fontStyle: 'normal' }}>our mission is simple:</b>  to help you find your tribe and build relationships so good, they feel like a cheat code for life. as they are meant to be!
                </p>
              </div>
          </div>
          <div style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleOpenModal}
              style={{
                padding: isMobile ? "16px 32px" : "20px 48px",
                borderRadius: "100px",
                border: "none",
                background: "linear-gradient(90deg, #7B3FE4, #3B82F6)",
                color: "white",
                fontSize: isMobile ? "15px" : "18px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(123, 63, 228, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(123, 63, 228, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(123, 63, 228, 0.3)";
              }}
            >
              more about elinity
            </button>
          </div>

          <style>
{`
/* Chrome, Edge, Safari */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-scroll:hover::-webkit-scrollbar {
  opacity: 1;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #7B3FE4, #00D2FF);
  border-radius: 10px;
  border: 2px solid rgba(255,255,255,0.05);
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #3B82F6, #00D2FF);
}

/* Firefox */
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #7B3FE4 transparent;
}
`}
</style>
            {(isModalOpen || isExpanding) && createPortal(
              <div
                onClick={handleCloseModal}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%", 
                  height: "100%",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isModalOpen ? "rgba(3,0,20,0.85)" : "rgba(3,0,10,0)",
                  backdropFilter: isModalOpen ? "blur(20px)" : "blur(0px)",
                  WebkitBackdropFilter: isModalOpen ? "blur(20px)" : "blur(0px)",
                  transition: "all 0.4s ease",
                  padding: isMobile ? "16px" : "40px",
                  boxSizing: "border-box"
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="custom-scroll"
                  style={{
                    width: "100%",
                    maxWidth: "700px",
                    maxHeight: "75vh",
                    overflowY: "auto",
                    position: "relative",
                    borderRadius: "28px",
                    padding: isMobile ? "32px 20px" : "48px",
                    background: "linear-gradient(180deg, #0a0a1f, #030014)",
                    border: "1px solid rgba(123, 63, 228, 0.2)",
                    boxShadow: "0 60px 140px rgba(0,0,0,0.9)",
                    opacity: isModalOpen ? 1 : 0,
                    transform: isModalOpen ? "scale(1)" : "scale(0.95)",
                    transformOrigin: "center center", 
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease"
                  }}
                >
                  <button
                    onClick={handleCloseModal}
                    style={{
                      position: "fixed",
                      top: "20px",
                      right: "20px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(123, 63, 228, 0.2)",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      zIndex: 10
                    }}
                  >
                    ✕
                  </button>
                  <ElinityManifesto onClose={handleCloseModal} />
                </div>
              </div>,
              document.body 
            )} 
          </div>
      </div>
    </div>
  );
}