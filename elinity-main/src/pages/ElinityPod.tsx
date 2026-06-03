import { correctBorderRadius } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─── Google Font Import ───────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";
document.head.appendChild(fontLink);

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = {
  primary:   "#3B82F6",
  accent:    "#7B3FE4",
  deep:      "#5B21B6",
  soft:      "#60A5FA",
  bg:        "#030014",
  bgDark:    "#0a0a23",
  bgMid:     "#181848",
  textLight: "#ede9ff",
  textMid:   "#9b91c8",
  textDim:   "#5a5278",
  textFaint: "#2e2a4a",
};

const gradText = {
  background: `linear-gradient(130deg, ${B.primary}, ${B.soft})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── Inject Keyframes ─────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("elinity-styles")) return;
  const s = document.createElement("style");
  s.id = "elinity-styles";
  s.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes floatBlob {
      0%,100% { transform: translateY(0) scale(1); }
      50%      { transform: translateY(-22px) scale(1.05); }
    }
    @keyframes floatBlob2 {
      0%,100% { transform: translateY(0) scale(1); }
      50%      { transform: translateY(18px) scale(0.97); }
    }
    @keyframes borderGlow {
      0%,100% { box-shadow: 0 0 0 rgba(59,130,246,0); }
      50%      { box-shadow: 0 0 40px rgba(59,130,246,0.38); }
    }
    .float-blob  { animation: floatBlob  8s ease-in-out infinite; }
    .float-blob2 { animation: floatBlob2 10s ease-in-out infinite; }
    .hover-card {
      transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                  box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .hover-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(59,130,246,0.18);
      border-color: rgba(59,130,246,0.35) !important;
    }
    .theme-cell { transition: background 0.25s ease; cursor: default; }
    .theme-cell:hover { background: rgba(59,130,246,0.06); }
    .reason-cell { transition: background 0.22s ease; }
    .reason-cell:hover { background: #0f0f2e !important; }
    .email-btn { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
    .email-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 52px rgba(59,130,246,0.44) !important;
      border-color: #3B82F6 !important;
      background: rgba(59,130,246,0.22) !important;
    }
    .cta-btn { transition: all 0.26s ease; }
    .cta-btn:hover {
      background: rgba(59,130,246,0.14) !important;
      border-color: #3B82F6 !important;
      box-shadow: 0 0 32px rgba(59,130,246,0.3) !important;
      transform: translateY(-2px);
    }
    .format-row { transition: border-bottom-color 0.22s ease; }
    .format-row:hover { border-bottom-color: rgba(59,130,246,0.3) !important; }
    .guest-row {
      transition: border-left-color 0.22s ease, color 0.22s ease;
    }
    .guest-row:hover {
      border-left-color: rgba(59,130,246,0.7) !important;
      color: #60A5FA !important;
    }
    .email-inline { transition: color 0.2s ease; }
    .email-inline:hover { color: #60A5FA !important; }
  `;
  document.head.appendChild(s);
};

// ─── Reveal on Scroll ─────────────────────────────────────────────────────────
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);   // when entering screen
        } else {
          setVisible(false);  // when leaving screen (so it can animate again)
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, style: extra = {} }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0px) scale(1)"
          : "translateY(40px) scale(0.96)",

        transition: `
          opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms
        `,
        willChange: "transform, opacity",
        ...extra,
      }}
    >
      {children}
    </div>
  );
}
// ─── Responsive ───────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const themes = [
  { title: "AI and Its Implications", body: "Technology, business, economy, space tech, material science, quantum computing. AI's impact on society, relationships, culture, economy, our sense of self. The nature of intelligence, emotions, empathy. AI alignment and the philosophy of building minds from silicon." },
  { title: "The Relationship Landscape", body: "From psychology, neuroscience, philosophy, and economics lenses. This is deliberately broad because we intend to have hundreds of conversations on this theme over the next few years with people who have spent considerable time studying and thinking about human connection." },
  { title: "The Socio-Cultural Landscape", body: "Meaning, human flourishing, purpose, wellbeing. The mental fitness landscape. Virtualization and parasocialization. What happens when simulacra become more compelling than reality? What does flourishing look like when everything is abundant, automated, at our fingertips?" },
  { title: "Human-AI Interaction", body: "The perception and psychology of and around AI. AI as companions, as actors in our world. The relationship between humans and AI, humans and technology. Human essence in silicon minds." },
  { title: "New Product Paradigms", body: "Emerging UX patterns. Generative experiences. Intelligent recommendation systems. Designing the perfect home companion from scratch. HX (Human Experience) rather than UX - looking at people not merely as users but holistically as complete beings that exist outside the context of your product." },
  { title: "Creativity and Expression", body: "Art and storytelling in the age of AI. New methods, innovations, personalization. The intersection of human creativity and machine capability." },
  { title: "Preparing for Transition", body: "What does the post-AGI world look like? When work as we know it disappears, when struggle dissipates, when purpose and passion become the main currencies, what fills the holes in our identities? How do we prepare for this now?" },
];

const reasons = [
  { num: "01", title: "We want to start conversations and seed ideas.", body: "Not just have them, but seed them. Get people thinking about questions they haven't considered. Create space for ideas to spread and evolve." },
  { num: "02", title: "We're learning.", body: "We intend to serve hundreds of millions of users by 2030. That comes with enormous responsibility, especially since our ecosystem is designed to become a deeply embedded part of people's daily lives. We operate with deep humility - if we have this responsibility, we need to get the best possible answers by speaking with people who've thought about these themes far more deeply." },
  { num: "03", title: "Building better institutions for the future.", body: "Building the relationship infrastructure, meaning infrastructure and purpose infrastructure for the post-AGI world should be a collective effort. We want to build scaffolding around our products alongside people who have thought longer about the problems we're grappling with." },
  { num: "04", title: "We believe in the power of dialogue.", body: "The French salons during the Enlightenment are one of our core inspirations. Ideas spread through conversation, refined through debate, sharpened through exchange. We want to create that kind of intellectual space - a new age of enlightenment, focused more on wisdom, not just knowledge." },
  { num: "05", title: "Reaching people who value substance.", body: "Podcasts as user discovery, as provocation to deep thought and reflection, as a way to connect with potential users who value substance over surface." },
  { num: "06", title: "Personal curiosity.", body: "A particular genre we want to listen to is missing. Deeply techno-optimist but also grounded, cautious, cognizant of risks. Focused on the near future and the practical implications of AGI for human flourishing - always bringing it back to the individual, to how you actually navigate this changing world." },
];


const guestTypes = [
  "Thinkers about the long-term future and existential risks",
  "People working on risk mitigation at the intersection of society and technology",
  "Interdisciplinary approaches to complex problems",
  "People who have spent serious time studying relationships, social dynamics, human flourishing, meaning-making",
  "Builders creating the infrastructure for what comes next",
  "Researchers pushing boundaries",
  "Anyone with ideas worth spreading, questions worth asking, insights worth sharing",
];

const processSteps = [
  { num: "01", title: "Reach out", body: "Simple. \n \n Fill out the form below or email us at podcasts@elinity.ai" },
  { num: "02", title: "Quick pre-call", body: "We'll do a quick 15–30 minute call about two weeks before the actual podcast. This establishes ground rules, builds some chemistry, and helps ensure that when we dive into the actual conversation, we can produce something exciting enough to get people's intellects and souls engaged." },
  { num: "03", title: "The conversation", body: "We're starting in May 2025. If you're interested in having a conversation with our team, if you have thoughts to share that align with what we're exploring here, reach out." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ElinityPodcast() {
  injectStyles();
  const bp = useBreakpoint();
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const isDesktop = bp === "desktop";

  const F = "'Plus Jakarta Sans', sans-serif";
  const px       = isMobile ? "20px" : isTablet ? "40px" : "60px";
  const sY       = isMobile ? "64px" : isTablet ? "80px" : "104px";
  const bodyFs   = isMobile ? "15px" : "17px";

  const sec: React.CSSProperties = {
  position: "relative",
  padding: "60px 40px",
  borderRadius: "24px",
  margin:'32px',

  background: "rgba(255, 255, 255, 0.04)", // glass transparency
  backdropFilter: "blur(18px)",             // main glass blur
  WebkitBackdropFilter: "blur(18px)",

  border: "1px solid rgba(59, 130, 246, 0.18)", // brand blue border

  boxShadow: `
    0 10px 40px rgba(59, 130, 246, 0.15),
    inset 0 1px 0 rgba(255,255,255,0.06)
  `,

  overflow: "hidden",
};

  const labelStyle = (center = false) => ({
    fontSize: "10px", letterSpacing: "0.36em",
    textTransform: "uppercase", color: B.textDim,
    fontFamily: F, fontWeight: 600,
    marginBottom: isMobile ? "36px" : "52px",
    display: "flex", alignItems: "center",
    justifyContent: center ? "center" : "flex-start",
    gap: "16px",
  });

  const labelLine = { flex: 1, height: "1px", background: "rgba(59,130,246,0.15)", maxWidth: "200px" };

  const h2Style = (extra = {}) => ({
    fontSize: isMobile ? "clamp(24px,7vw,34px)" : isTablet ? "clamp(28px,5vw,42px)" : "clamp(30px,3.8vw,48px)",
    fontFamily: F, fontWeight: 300,
    lineHeight: 1.18, color: B.textLight,
    marginBottom: "24px", letterSpacing: "-0.025em",
    ...extra,
  });

  const bodyStyle = (extra = {}) => ({
    fontSize: bodyFs, lineHeight: 1.82,
    color: B.textMid, fontFamily: F,
    fontWeight: 300, marginBottom: "18px",
    ...extra,
  });

  const divider = {
    height: "1px", margin: `0 ${px}`,
    background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.22) 35%, rgba(123,63,228,0.22) 65%, transparent)",
  };

  return (
    <div style={{ fontFamily: F, background: B.bg, color: B.textLight, minHeight: "100vh", overflowX: "hidden" }}>

      {/* Fixed ambient glow */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:`radial-gradient(ellipse 80% 55% at 75% 8%, rgba(59,130,246,0.09) 0%, transparent 65%),
                   radial-gradient(ellipse 55% 45% at 15% 85%, rgba(123,63,228,0.07) 0%, transparent 65%)` }} />

      {/* ══ HERO ══ */}
      <div
  style={{
    paddingTop: isMobile ? "100px" : isTablet ? "136px" : "168px",
    paddingBottom: isMobile ? "72px" : "120px",
    paddingLeft: px,
    paddingRight: px,
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",

    display: "flex",                // ⭐ CENTER FIX
    justifyContent: "center",       // horizontal center
    alignItems: "center",
    textAlign: "center",            // text center
  }}
>
  {/* blobs */}
  <div
    className="float-blob"
    style={{
      position: "absolute",
      top: "20px",
      right: isMobile ? "-80px" : "-140px",
      width: isMobile ? "280px" : isTablet ? "460px" : "700px",
      height: isMobile ? "280px" : isTablet ? "460px" : "700px",
      background:
        "radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, rgba(123,63,228,0.06) 40%, transparent 70%)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />

  <div
    className="float-blob2"
    style={{
      position: "absolute",
      bottom: "-40px",
      left: "-100px",
      width: "280px",
      height: "280px",
      background:
        "radial-gradient(ellipse, rgba(123,63,228,0.08) 0%, transparent 70%)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />

  {/* ⭐ centered content column */}
  <div
    style={{
      position: "relative",
      zIndex: 1,
      maxWidth: "760px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div
      style={{
        animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.36em",
          textTransform: "uppercase",
          color: B.textDim,
          fontFamily: F,
          fontWeight: 600,
          marginBottom: "28px",
        }}
      ></div>
    </div>

    <div
      style={{
        animation: "fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.18s both",
      }}
    >
      <h1
        style={{
          fontSize: isMobile
            ? "clamp(36px,10vw,52px)"
            : isTablet
            ? "clamp(48px,8vw,72px)"
            : "clamp(56px,7vw,98px)",
          fontFamily: F,
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: B.textLight,
          margin: 0,
        }}
      >
        The Elinity Podcast
        <em></em>
      </h1>
    </div>

    <div
      style={{
        animation: "fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.33s both",
      }}
    >
      <p
        style={{
          fontSize: isMobile ? "18px" : "22px",
          lineHeight: 1.6,
          color: B.soft,
          maxWidth: "600px",
          marginTop: "28px",
          marginBottom: "14px",
          fontFamily: F,
          fontWeight: 300,
          fontStyle: "italic",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Conversations for Shaping Our Future
      </p>

      <p
        style={{
          fontSize: isMobile ? "15px" : "17px",
          lineHeight: 1.78,
          color: B.textDim,
          maxWidth: "560px",
          marginBottom: isMobile ? "44px" : "56px",
          fontFamily: F,
          fontWeight: 300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Exploring the questions that will shape our world. From AI and
        relationships to human flourishing in a post-AGI future - diving deep
        into topics about building the future humanity deserves.
      </p>
    </div>

    <div
      style={{
        animation: "fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.48s both",
      }}
    >
      <a
        href="#contact"
        className="cta-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: isMobile ? "12px 28px" : "15px 40px",
          border: "1px solid rgba(59,130,246,0.42)",
          color: B.primary,
          fontSize: "11px",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          fontFamily: F,
          fontWeight: 600,
          cursor: "pointer",
          textDecoration: "none",
          background: "rgba(59,130,246,0.05)",
        }}
      >
        Become a Guest <span style={{ fontSize: "16px" }}>→</span>
      </a>
    </div>
  </div>
</div>

      <div style={divider} />

      {/* ══ WHAT WE'RE BUILDING ══ */}
<section style={sec}>

  {/* Glow background */}
  <div
    style={{
      position: "absolute",
      width: "420px",
      height: "420px",
      background:
        "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
      top: "-120px",
      right: "-120px",
      filter: "blur(60px)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />

  {/* Content wrapper */}
  <div
    style={{
      position: "relative",
      zIndex: 1,
      maxWidth: "900px",        // ⭐ keeps content centered
      margin: "0 auto",
      textAlign: "center",
    }}
  >

    {/* Heading */}
    <Reveal delay={60}>
      <h2
        style={{
          color: "white",
          marginBottom: isMobile ? "24px" : "32px",
        }}
      >
        What We're Building Here
      </h2>
    </Reveal>

    {/* Paragraphs */}
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <Reveal delay={90}>
        <p style={bodyStyle()}>
          The Elinity Podcast is where we will invite thinkers, researchers,
          academics, domain experts, creators, and builders for conversations
          about where we're going. Not shallow, in-the-moment commentary, but
          discussions that will still be relevant a year from now. Even longer.
        </p>
      </Reveal>

      <Reveal delay={130}>
        <p style={bodyStyle()}>
          We talk about the post-AGI world and the challenges we should get ahead
          of. The intersection of AI and relationships. Designing products,
          experiences, and companies for a radically different future that's
          almost here. How to be your own person in a world of abundant
          intelligence and forces pulling you in all directions. How to protect
          yourself and thrive when the rules are upended and when it's the wild
          west once again.
        </p>
      </Reveal>

      <Reveal delay={170}>
        <p style={bodyStyle()}>
          We also talk about how we're building Elinity itself: the decisions we
          make, the trade-offs we navigate, the choices that shape what
          relationship infrastructure looks like for the next generation, and all
          the ones after. We're building in public because we're building for the
          public, and for people who don't exist yet but are constantly in our
          minds.
        </p>
      </Reveal>

      <Reveal delay={210}>
        <p style={bodyStyle()}>
          In one sense, this podcast is exactly what Elinity is designed to
          enable: deeper conversations. Between strangers who become close.
          Between partners, friends, family. Between you and yourself, prompted
          and guided by thoughtful questions with your EI thinking buddy. If
          Elinity is the ultimate conversation platform, this podcast is us
          practicing what we preach.
        </p>
      </Reveal>
    </div>
  </div>
</section>  

      <div style={divider} />

      {/* ══ WHY WE'RE DOING THIS ══ */}
      <section style={sec}>
        <Reveal><div style={labelStyle()}> <span style={labelLine} /></div></Reveal>
        <Reveal delay={60}>
          <h2 style={h2Style({ maxWidth:"520px", marginBottom: isMobile ? "36px" : "52px" })}>
            Why We're Doing This
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"2px", background:"rgba(59,130,246,0.07)", border:"1px solid rgba(59,130,246,0.1)" }}>
          {reasons.map((r, i) => (
            <Reveal key={r.num} delay={50 + i * 55}>
              <div className="reason-cell" style={{ background:B.bgDark, padding: isMobile ? "28px 22px" : "38px 34px", borderBottom:"1px solid rgba(59,130,246,0.07)", height:"100%", boxSizing:"border-box" }}>
                <span style={{ fontSize:"10px", letterSpacing:"0.24em", color:B.accent, fontFamily:F, fontWeight:600, marginBottom:"14px", display:"block" }}>{r.num}</span>
                <div style={{ fontSize:"16px", fontFamily:F, color:B.soft, marginBottom:"10px", fontWeight:500 }}>{r.title}</div>
                <div style={{ fontSize:"14px", lineHeight:1.78, color:"white", fontFamily:F, fontWeight:300 }}>{r.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ THEMES ══ */}
      <div
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",

          border: "1px solid rgba(59,130,246,0.12)",
          borderRadius: "24px",
          margin:'32px',

          boxShadow: `
            0 20px 60px rgba(59,130,246,0.12),
            inset 0 1px 0 rgba(255,255,255,0.05)
          `,

          padding: `${sY} 0`,
          overflow: "hidden",
        }}
      >

        {/* 🔮 Glow layer (EMPTY  do not put content inside) */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, transparent 70%)",
            top: "-200px",
            left: "-150px",
            filter: "blur(70px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* 🧠 Content layer */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: `0 ${px}`,
          }}
        >

          <Reveal>
            <div style={labelStyle()}>
              <span style={labelLine} />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h2
              style={h2Style({
                fontSize: isMobile
                  ? "clamp(26px,8vw,36px)"
                  : isTablet
                  ? "clamp(30px,6vw,50px)"
                  : "clamp(32px,4.5vw,56px)",
                marginBottom: "16px",
              })}
            >
              The Themes We Explore
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p style={bodyStyle({ marginBottom: "44px", maxWidth: "560px" })}>
              These aren't rigid categories. They're starting points for conversation,
              questions that lead to other questions, ideas that connect in unexpected ways.
            </p>
          </Reveal>

          {/* grid */}
          <div
            style={{
              borderTop: "1px solid rgba(59,130,246,0.1)",
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                ? "1fr 1fr"
                : "repeat(3,1fr)",
            }}
          >
            {themes.map((t, i) => {
              const cols = isMobile ? 1 : isTablet ? 2 : 3;
              const lastInRow = (i + 1) % cols === 0;

              return (
                <Reveal key={t.title} delay={50 + i * 55}>
                  <div
                    className="theme-cell"
                    style={{
                      padding: isMobile ? "28px 0" : "24px",
                      borderBottom: "1px solid rgba(59,130,246,0.1)",
                      borderRight:
                        lastInRow || isMobile
                          ? "none"
                          : "1px solid rgba(59,130,246,0.1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontFamily: F,
                        color: B.soft,
                        marginBottom: "10px",
                        fontStyle: "italic",
                        fontWeight: 400,
                      }}
                    >
                      {t.title}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.8,
                        color: "white",
                        fontFamily: F,
                        fontWeight: 300,
                      }}
                    >
                      {t.body}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>  
{/* ══ FORMAT ══ */}
<section
  style={{
    position: "relative",
    padding: `${sY} 0`,
  }}
>
  <div
    style={{
      maxWidth: "900px", // centered readable width
      margin: "0 auto",
      padding: `0 ${px}`,
    }}
  >
    {/* Header */}
    <Reveal>
      <div
        style={{
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "70px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: isMobile ? "26px" : "34px",
            fontWeight: 500,
            letterSpacing: "0.4px",
          }}
        >
          The Format <span style={labelLine} />
        </div>
      </div>
    </Reveal>

    {/* Content */}
    <div
      style={{
        maxWidth: "760px",
        margin: "0 auto",   // ⭐ center content
      }}
    >
      <Reveal delay={80}>
        <p style={{ ...bodyStyle(), marginBottom: "28px" }}>
          <strong>More conversation, less interview.</strong> We're interested in dialogue, in ideas building on ideas, in genuine exploration rather than rehearsed talking points.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <p style={{ ...bodyStyle(), marginBottom: "28px" }}>
          <strong>Depth over breadth.</strong> Minimum time is one hour. We're happy to go three hours and beyond. There's so much richness in depth, in following ideas wherever they lead, in not being constrained by arbitrary time limits.
        </p>
      </Reveal>

      <Reveal delay={160}>
        <p style={{ ...bodyStyle(), marginBottom: "28px" }}>
          <strong>Variety in structure.</strong> Sometimes single guests, sometimes recurring conversations with the same person as ideas develop. Sometimes multiple guests exploring a topic from different angles. Sometimes series diving deep into specific themes.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <p style={bodyStyle()}>
          <strong>Company conversations.</strong> We'll also do podcasts discussing our products, their impact, their philosophy, their platonic ideal. Not just among team members, but with subject matter experts in AI, design, tech, psychology. Interesting people who can help us think through what we're building.
        </p>
      </Reveal>
    </div>
  </div>
</section>
      {/* ══ WHO WE WANT TO TALK TO ══ */}
      <section
        style={{
          position: "relative",
          padding: `${sY} 0`,
          overflow: "hidden"
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
            top: "-200px",
            right: "-120px",
            filter: "blur(80px)",
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: `0 ${px}`,
            position: "relative"
          }}
        >
          {/* header */}
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 70 }}>
              <div style={{
                color:'white',
                fontSize:'32px'
              }}>
                Who We Want to Talk To <span style={labelLine} />
              </div>
            </div>
          </Reveal>

{/* cards grid */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",   // ⭐ centers last row always
    gap: isMobile ? "16px" : "22px",
    marginBottom: "60px",

    width: "100%",
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto"
  }}
>
  {guestTypes.map((g, i) => (
    <Reveal key={i} delay={60 + i * 60}>
      <div
        className="guest-card"
        style={{
          width: "280px",          // ⭐ fixed width = perfect centering
          minHeight: "140px",      // ⭐ all cards same height baseline

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",

          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: "16px",
          padding: isMobile ? "18px 20px" : "22px 24px",

          fontSize: bodyFs,
          lineHeight: 1.7,
          color: B.textMid,
          fontFamily: F,
          fontWeight: 300,

          backdropFilter: "blur(8px)",
          transition: "all .35s ease"
        }}
      >
        {g}
      </div>
    </Reveal>
  ))}
</div>
          {/* closing text */}
          <Reveal delay={120}>
            <p
              style={{
                ...bodyStyle({
                  maxWidth: "720px",
                  margin: "0 auto",
                  textAlign: "center",
                  paddingTop:'40px'
                }),
                fontSize: isMobile ? "15px" : "17px",
                color: B.soft
              }}
            >
              If these themes resonate with you, if you believe you have interesting
              ideas to contribute to these conversations, we want to hear from you.
            </p>
          </Reveal>
        </div>
      </section>
{/* ══ THE PROCESS ══ */}
<section
  style={{
    padding: isMobile ? "80px 20px" : "120px 40px",
    background: "linear-gradient(180deg,#0b0b1a,#030014)",
    color: "white",
    position: "relative"
  }}
>
  <Reveal>
    <div
      style={{
        fontSize: "34px",
        textAlign: "center",
        marginBottom: "70px",
        fontWeight: 500,
        letterSpacing: "0.5px"
      }}
    >
      The Process <span style={labelLine} />
    </div>
  </Reveal>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "1fr 1fr"
        : "repeat(3,1fr)",
      gap: "40px",
      position: "relative"
    }}
  >
    {processSteps.map((s, i) => (
      <Reveal key={s.num} delay={60 + i * 80}>
        <div
          className="hover-card"
          style={{
            padding: "40px 30px",
            borderRadius: "18px",
            background:
              "linear-gradient(145deg, rgba(20,20,45,0.9), rgba(12,12,30,0.7))",
            border: "1px solid rgba(59,130,246,0.18)",
            transition: "all 0.3s ease",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}
        >
          {/* Step number */}
          <span
            style={{
              fontSize: "52px",
              fontWeight: 300,
              color: "rgba(59,130,246,0.25)",
              fontStyle: "italic",
              lineHeight: 1
            }}
          >
            {s.num}
          </span>

          {/* Title */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#d9d9ff"
            }}
          >
            {s.title}
          </div>

          {/* Body */}
          <div
            style={{
              fontSize: "14px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.75)"
            }}
          >
            {s.body}
          </div>
        </div>
      </Reveal>
    ))}
  </div>

  <Reveal delay={120}>
    <p
      style={{
        maxWidth: "650px",
        margin: "70px auto 0",
        textAlign: "center",
        fontSize: "15px",
        lineHeight: 1.8,
        padding: "28px",
        borderRadius: "20px",
        background:
          "linear-gradient(145deg, rgba(20,20,45,0.8), rgba(10,10,25,0.6))",
        border: "1px solid rgba(59,130,246,0.18)"
      }}
    >
      In the spirit of Elinity, which is fundamentally about enabling deeper
      human connection, we want to have more conversations with people. Get
      people thinking. Get people discussing. Spread ideas that matter.
    </p>
  </Reveal>
</section>
      {/* ══ WHY THIS MATTERS ══ */}
      <div style={{ background:B.bgMid, borderTop:"1px solid rgba(59,130,246,0.1)", borderBottom:"1px solid rgba(59,130,246,0.1)", padding:`${sY} 0` }}>
        <div style={{ maxWidth:"740px", margin:"0 auto", padding:`0 ${px}` }}>
          <Reveal><div style={{
            color:'white',
            fontSize:'32px',
            paddingBottom:'20px '
          }}>A Note on Why This Matters <span style={labelLine} /></div></Reveal>
          <Reveal delay={60}><p style={bodyStyle({ fontSize: isMobile ? "17px" : "20px", lineHeight:1.9, marginBottom:"24px" })}>We're trying to help shape the landscape of relationships and social life by building the infrastructure for extraordinary relationships and purposeful lives. The social and relational infrastructure for the post-AGI world.</p></Reveal>
          <Reveal delay={110}><p style={bodyStyle({ fontSize: isMobile ? "17px" : "20px", lineHeight:1.9, marginBottom:"28px" })}>We want to do this by involving people who believe in that bright future: actualized humans aided by their aligned AIs, following their passions, living lives of purpose, with deeply meaningful relationships.</p></Reveal>
          <Reveal delay={160}><p style={{ fontSize: isMobile ? "17px" : "20px", lineHeight:1.9, fontStyle:"italic", fontFamily:F, fontWeight:300, ...gradText, margin:0 }}>If you believe in that future, if you want to help shape it through conversation and ideas, if you have something to contribute to these questions we're all grappling with, let's talk.</p></Reveal>
        </div>
      </div>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding:`${sY} ${px}`, maxWidth: isMobile ? "100%" : "680px", margin:"0 auto", textAlign:"center" }}>
        {/* <Reveal><div style={labelStyle(true)}>Get In Touch</div></Reveal> */}
        <Reveal delay={60}>
          <h2 style={h2Style({ marginBottom:"16px" })}>
            Interested in being{" "}
            <em style={{ fontStyle:"italic", ...gradText }}>a guest?</em>
          </h2>
          <p style={bodyStyle({ maxWidth:"460px", margin:"0 auto 40px" })}>Tell us about yourself and what you'd like to discuss.</p>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ background:B.bgDark, border:"1px solid rgba(59,130,246,0.14)", padding: isMobile ? "40px 24px" : "58px 52px", textAlign:"center", boxShadow:"0 0 80px rgba(59,130,246,0.07)" }}>

            {/* Glowing icon */}
            <div style={{ width:"58px", height:"58px", margin:"0 auto 28px", border:"1px solid rgba(59,130,246,0.32)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(59,130,246,0.07)", fontSize:"22px", animation:"borderGlow 3.5s ease-in-out infinite" }}>✉</div>            <p style={{ fontSize:"13px", color:B.textDim, fontFamily:F, fontWeight:300, marginBottom:"36px" }}>
              We read every message and respond to those that are a good fit.
            </p>

            {/* Primary button */}
            <a
              href="mailto:podcasts@elinity.ai?subject=Guest%20Application%20%E2%80%94%20Elinity%20Podcast&body=Hi%20Elinity%20team%2C%0A%0AMy%20name%20is%20...%0A%0AI%20would%20love%20to%20be%20a%20guest%20on%20the%20podcast.%20Here%E2%80%99s%20a%20bit%20about%20me%20and%20what%20I%E2%80%99d%20like%20to%20discuss%3A%0A%0A..."
              className="email-btn"
              style={{
                display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"12px",
                width:"100%", padding: isMobile ? "16px 20px" : "18px 28px",
                border:"1px solid rgba(59,130,246,0.44)",
                background:"rgba(59,130,246,0.09)",
                color:B.textLight, fontSize: isMobile ? "14px" : "15px",
                fontFamily:F, fontWeight:500,
                cursor:"pointer", textDecoration:"none",
                boxSizing:"border-box", marginBottom:"16px",
              }}
            >
              <span style={{ fontSize:"18px" }}>✉</span>
              Email podcasts@elinity.ai
              <span style={{ fontSize:"16px", color:B.primary }}>→</span>
            </a>
            <div>
              <p>
                The Elinity Podcast. Find the conversations that matter. Help shape the future we're building.  
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}