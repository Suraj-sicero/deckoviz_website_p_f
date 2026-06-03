import React, { useState, useEffect } from 'react';

const ElinityManifesto = ({ onClose }) => {
  // Local responsive check for standalone usage or resizing
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      color: "#fff",
      /* Adjusted padding for mobile vs laptop */
      padding: isMobile ? "30px 10px" : "50px 40px",
      fontFamily: "'Inter', sans-serif",
      background: "transparent",
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        {/* Section 1: Definition */}
        <section style={{ marginBottom: isMobile ? "30px" : "50px" }}>
          <h2 style={{
            fontSize: isMobile ? "16px" : "22px",
            letterSpacing: "1px",
            color: "rgba(255, 255, 255, 0.4)",
            marginBottom: "20px",
            fontWeight: 600
          }}>
            what is elinity
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{
              fontSize: isMobile ? "20px" : "26px",
              fontWeight: 300,
              lineHeight: 1.3,
              background: "linear-gradient(to right, #fff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              elinity exists for people who believe connection is the foundation of a good life.
            </p>

            <p style={{
              fontSize: isMobile ? "15px" : "17px",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 300,
              lineHeight: 1.6
            }}>
              it’s an emotionally intelligent ai platform that helps you meet deeply aligned people and build meaningful relationships over time.
            </p>
          </div>
        </section>

        {/* Section 2: Core Explanation */}
        <section style={{ marginBottom: isMobile ? "30px" : "50px", display: "flex", flexDirection: "column", gap: "28px" }}>
          <p style={{
            fontSize: isMobile ? "14px" : "15px",
            lineHeight: 1.7,
            color: "rgba(255, 255, 255, 0.8)"
          }}>
            whether you’re looking for love, friendship, collaborators, or simply richer human connection, elinity brings everything into one coherent space. it understands who you are, what you’re seeking, and how you connect, then introduces you to people who feel like a natural yes.
          </p>

          <p style={{
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: 500,
            borderLeft: "2px solid #7c3aed",
            paddingLeft: isMobile ? "14px" : "20px",
            paddingTop: "4px",
            paddingBottom: "4px",
            color: "#a78bfa"
          }}>
            this is about better matches, not more, and the tools to turn connection into something real.
          </p>
        </section>

        {/* Section 3: What it helps you do */}
        <section style={{ marginBottom: isMobile ? "30px" : "50px" }}>
          <h2 style={{
            fontSize: isMobile ? "16px" : "22px",
            letterSpacing: "0.5px",
            color: "rgba(255, 255, 255, 0.4)",
            marginBottom: "28px",
            fontWeight: 500
          }}>
            what elinity actually helps you do.
          </h2>

          <ul style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            {[
              "elinity is about people, your people.",
              "it’s about better matches, not more.",
              "it’s about better conversations, not more.",
              "it’s about more signal, not noise."
            ].map((item, index) => (
              <li key={index} style={{
                fontSize: isMobile ? "15px" : "20px",
                fontWeight: 300,
                fontStyle: "italic",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                color: "rgba(255, 255, 255, 0.9)"
              }}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: Promise */}
        <section style={{
          background: "rgba(255, 255, 255, 0.03)",
          padding: isMobile ? "20px" : "32px",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.08)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            <p style={{ fontSize: isMobile ? "15px" : "17px", lineHeight: 1.5, color: "#fff" }}>
              we help you find people you can build incredible relationships with
            </p>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "10px",
              rowGap: "4px",
              color: "#a78bfa",
              fontWeight: 600,
              fontSize: isMobile ? "12px" : "14px"
            }}>
              {[
                "for love,",
                "friendship,",
                "leisure,",
                "collaboration,",
                "creativity,",
                "and life"
              ].map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>

            <p style={{
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.5,
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.7)"
            }}>
              and then we help you actually nurture those relationships over time
            </p>
          </div>
        </section>

        {/* Bottom Close Button */}
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <button 
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "rgba(255, 255, 255, 0.5)",
              padding: "10px 28px",
              borderRadius: "100px",
              cursor: "pointer",
              fontSize: "13px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#fff";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            back to the site    
          </button>
        </div>

      </div>
    </div>
  );
};

export default ElinityManifesto;