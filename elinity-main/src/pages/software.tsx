import React from "react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const Software: React.FC = () => {

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#050505",
    color: "#FFFFFF",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, sans-serif",
    padding: "80px 24px",
    lineHeight: "1.6",
    position: "relative",
    overflow: "hidden"
  };

  const contentWrapper: React.CSSProperties = {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "60px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
    margin: "0 0 16px 0",
    background: "linear-gradient(90deg,#ffffff,#b066fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const missionSection: React.CSSProperties = {
    fontSize: "20px",
    color: "#A1A1A1",
    marginBottom: "60px",
    maxWidth: "800px",
    borderLeft: "2px solid #b066fe",
    paddingLeft: "30px",
  };

  const sidebarStyle: React.CSSProperties = {
    position: "sticky",
    top: "40px",
    height: "fit-content",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "32px",
    border: "1px solid rgba(176,102,254,0.3)",
    boxShadow: "0 20px 60px rgba(176,102,254,0.15)"
  };

  const labelStyle: React.CSSProperties = {
    color: "#777",
    fontSize: "13px",
    textTransform: "uppercase",
    marginBottom: "4px",
    display: "block",
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: 500,
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg,#b066fe,#7c3aed)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px"
  };

  return (
    <div style={containerStyle}>
      <div className="pt-16"></div>

      {/* floating glow */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle,#b066fe44,transparent)",
          filter: "blur(120px)",
          top: "-200px",
          left: "-200px"
        }}
      />

      <div style={contentWrapper}>

        {/* Main */}
        <motion.main
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.15 } }
          }}
        >

          <motion.div variants={fadeUp}>

            <h1 style={titleStyle}>Software Engineer</h1>

            <p style={{ fontSize: "24px", color: "#888" }}>
              At Elinity
            </p>
          </motion.div>

          <motion.section style={missionSection} variants={fadeUp}>
            <h3 style={{ color: "#FFF", fontSize: "22px", marginBottom: "12px" }}>
              Building Relationship Infrastructure for the Post-AGI World
            </h3>

            <p>
              We're building emotionally intelligent AI that helps people
              find their most resonant connections and build extraordinary
              relationships.
            </p>
          </motion.section>

          <motion.section variants={fadeUp}>
            <h2 style={{ fontSize: "28px", marginBottom: "24px" }}>
              The Mission
            </h2>

            <p style={{ color: "#A1A1A1", fontSize: "18px" }}>
              As a Software Engineer at Elinity, you aren't just shipping
              features - you're architecting the way humans interact with
              AI and each other in the coming decade.
            </p>
          </motion.section>

        </motion.main>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={sidebarStyle}>

            <div style={{ marginBottom: "24px" }}>
              <span style={labelStyle}>Location</span>
              <span style={valueStyle}>Remote (Global)</span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <span style={labelStyle}>Type</span>
              <span style={valueStyle}>Full-Time</span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <span style={labelStyle}>Compensation</span>
              <span style={valueStyle}>
                Competitive Salary + Early Equity
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <span style={labelStyle}>Company Home</span>
              <a
                href="https://elinity.ai"
                style={{ ...valueStyle, color: "#b066fe" }}
              >
                elinity.ai
              </a>
            </div>

            <motion.button
              style={buttonStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@elinity.ai&su=Application for Software Engineer Role"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                }}
              >
                Apply for this Role
              </a>
            </motion.button>

          </div>
        </motion.aside>

      </div>

      <style>{`
        @media (max-width: 768px){
          div[style*="grid-template-columns"]{
            grid-template-columns:1fr !important;
          }
        }
      `}</style>

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "1200px",   // reduced width
          margin: "10px auto", // center horizontally
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px",
            fontWeight: 700,
            background: "linear-gradient(90deg,#ffffff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What You Will Do
        </h2>

        <p style={{ color: "#A1A1A1", fontSize: "18px", lineHeight: "1.8", marginBottom: "20px" }}>
          Most SWE roles are still being done the old way: hand-writing most code,
          spending hours debugging syntax, manually implementing features line by
          line. But work is evolving, and fast.
        </p>

        <p style={{ color: "#A1A1A1", fontSize: "18px", lineHeight: "1.8", marginBottom: "20px" }}>
          We're building in the age of AI coding agents. Which means you'll spend
          most of your time orchestrating Claude, Cursor, and other AI tools rather
          than hand-writing code. Your job is to be the architect, the conductor,
          the 10x engineer who knows how to leverage AI to build faster and better
          than teams 5x our size.
        </p>

        <p style={{ color: "#A1A1A1", fontSize: "18px", lineHeight: "1.8" }}>
          If we can't ship features in hours that used to take days, test and build
          in weeks what used to take months and years, we're doing it wrong.
        </p>
    </motion.div>

    <div className="pt-6"></div>

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
      style={{
        maxWidth: "1200px",
        margin: "80px auto",
        padding: "42px",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(176,102,254,0.25)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.65)"
      }}
    >
      <h2
        style={{
          fontSize: "30px",
          fontWeight: 800,
          marginBottom: "28px",
          background: "linear-gradient(90deg,#fff,#b066fe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        What You'll Actually Build
      </h2>

      {/* CORE PRODUCT */}
      <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "20px" }}>
        The Core Product
      </h3>

      <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "18px" }}>
        An emotionally intelligent social and relationship platform with AI that
        actually understands people. Connection-oriented games, smart voice
        journaling, reflections and AI coaching. Tools not just to match people
        but to help relationships thrive over time.
      </p>

      <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "18px" }}>
        You'll build the systems that power Lumi, our AI companion. The memory
        architecture that lets it understand context deeply. The inference engines
        that generate insights about relationships and compatibility. Conversation
        flows that feel natural and warm rather than robotic.
      </p>

      <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "30px" }}>
        You'll also develop features that help people connect - sophisticated
        matching algorithms, communication tools, shared experiences, and rituals
        that deepen bonds.
      </p>

      {/* AI LAYER */}
      <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "20px" }}>
        The AI Layer
      </h3>

      <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "18px" }}>
        AI is core to everything we build. You'll work with LLMs, design agentic
        systems, build memory architectures, and create prompting strategies that
        actually work at scale.
      </p>

      <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "30px" }}>
        You'll build systems that understand emotion, context, and relationships -  
        generating meaningful insights rather than generic advice, and pushing the
        boundaries of what modern AI can do.
      </p>

      {/* INFRASTRUCTURE */}
      <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "20px" }}>
        The Infrastructure
      </h3>

      <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "18px" }}>
        Fast, reliable systems capable of supporting millions of users. Real-time
        communication, voice processing, and privacy-respecting data pipelines that
        enable deep personalization.
      </p>

      <p style={{ color: "#A1A1A1", lineHeight: "1.85" }}>
        You'll make architectural decisions that matter - selecting the right
        technologies, designing scalable abstractions, and building systems that
        evolve as we learn what works and what doesn’t.
      </p>
    </motion.div>

    <div className="pt-6"></div>
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "42px",
          borderRadius: "22px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.65)"
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            fontWeight: 800,
            marginBottom: "28px",
            background: "linear-gradient(90deg,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          How You'll Actually Work
        </h2>

        {/* Orchestrating AI Agents */}
        <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "20px" }}>
          Orchestrating AI Agents
        </h3>

        <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "18px" }}>
          You'll spend most of your time directing AI coding agents rather than writing code yourself. Using Cursor, Claude, Copilot, and whatever new tools emerge. Describing what you want built, reviewing generated code, iterating quickly, shipping fast.
        </p>

        <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "28px" }}>
          You're not a code monkey. You're an architect who happens to have
          incredibly capable assistants. Your value is in knowing what to build,
          how it should work, and what good looks like - while AI handles the
          tedious implementation details.<br></br><br></br>
          This means you can ship 5-10x more than traditional engineers. Features that would take a team of five engineers a month, you can prototype and ship in a week. That's the pace we need
        </p>

        {/* Thinking, Not Just Typing */}
        <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "20px" }}>
          Thinking, Not Just Typing
        </h3>

        <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "18px" }}>
          The bottleneck is no longer how fast you can type code. It's how fast you
          can think through problems, design solutions, and make strong architectural
          decisions.
        </p>

        <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "28px" }}>
          You'll spend more time thinking about product, talking to users, understanding requirements, designing systems than you will actually writing code. Because the code writing part is increasingly automated. The thinking part is where the real work happens.
        </p>

        {/* Moving Fast */}
        <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "20px" }}>
          Moving Fast, Iterating Quickly
        </h3>

        <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "18px" }}>
          We'll be iterating based on user feedback constantly. We need to be able to ship new features, test ideas, learn what works, and pivot fast.
        </p>

        <p style={{ color: "#A1A1A1", lineHeight: "1.85", marginBottom: "28px" }}>
          You need to be comfortable with speed, with uncertainty, with building things that might change completely next week. You're not optimizing for perfect code. You're optimizing for learning fast and shipping things that work
        </p>

        {/* Direct Impact */}
        <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "20px" }}>
          Working Directly on Impact
        </h3>

        <p style={{ color: "#A1A1A1", lineHeight: "1.85" }}>
          Small team means you're working on things that matter immediately. No getting lost in some microservice that nobody uses. No spending months on infrastructure that supports someone else's work.
          <br></br><br></br>
          You're building the features users interact with. The AI they talk to. The experiences that shape their relationships. Your code has direct impact on whether this works or not.
        </p>
      </motion.div>

    <div className="pt-16"></div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
          style={{
            maxWidth: "1200px",
            margin: "80px auto",
            padding: "42px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(176,102,254,0.25)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.65)"
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 800,
              marginBottom: "28px",
              background: "linear-gradient(90deg,#fff,#b066fe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Who You Are
          </h2>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color: "white" }}>You're a 10x engineer</strong>- not because you're 10x smarter, but because you
            know how to leverage AI to be dramatically more productive. You already
            work heavily with AI coding agents like Claude, Cursor, and Copilot,
            prompting them effectively, reviewing their output, iterating quickly,
            and shipping fast.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color : "white"}}>You have exceptionally strong fundamentals.</strong> This is not a vibe-coding
            role. You can explain everything you build from first principles. You
            understand computer science deeply - algorithms, systems design,
            software architecture, and why systems behave the way they do.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color : "white"}}>You know design patterns, computational complexity, distributed systems,
            and database theory. </strong>AI lets you move faster, but your understanding of
            fundamentals ensures you're moving in the right direction.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong  style={{ color : "white"}}>When AI generates code, you can read it critically, understand the logic,
            detect subtle bugs, and recognize when the solution is actually correct
            versus simply sounding plausible.</strong> You treat AI as a force multiplier for
            expertise - not a replacement for it.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong  style={{ color : "white"}}>You hold yourself to extremely high standards.</strong> Faster development means
            higher standards, not lower ones. You take pride in what you ship.
            Fast doesn't mean sloppy - it means you iterate quickly until the
            solution is truly right.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong  style={{ color : "white"}}>You take ownership.</strong> Every line of code that goes into production is
            something you're accountable for. Even if AI helped generate it,
            you're responsible for the result.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{color:'white'}}>You're product-minded.</strong> You care about what you're building and why.
            You think about users, their experiences, and whether the system
            actually solves meaningful problems for real people.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{color:'white'}}>You're comfortable moving fast, shipping early, and iterating constantly.</strong>
            You don't get stuck overthinking decisions. You build, test, learn,
            and improve continuously.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{color:'white'}}>You're full-stack or close to it.</strong> You can operate across the system -
            frontend, backend, infrastructure, and AI layers. You might specialize
            in some areas, but you're capable across the stack.
          </p>
<p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
  <strong style={{ color: "#ffffff" }}>
    You understand AI deeply.
  </strong>{" "}
  You've worked with LLMs, built or experimented
  with agentic systems, designed prompting strategies, and understand the
  capabilities and limitations of modern models.
</p>

<p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
  <strong style={{ color: "#ffffff" }}>
    Most importantly, you care about the mission.
  </strong>{" "}
  You're excited about using
  technology and AI to strengthen human relationships and help people
  build deeper connections. You're comfortable working in ambiguity,
  adapting quickly as we learn and grow.
</p>
      </motion.div>
    
    <div className="pt-16"></div>
    
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      style={{
        maxWidth: "1200px",
        margin: "80px auto",
        padding: "42px",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(176,102,254,0.25)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.65)"
      }}
    >
      <h2
        style={{
          fontSize: "30px",
          fontWeight: 800,
          marginBottom: "28px",
          background: "linear-gradient(90deg,#fff,#b066fe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        What You Don't Need to Be
      </h2>

      <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
        <strong>You don't need 5 years of experience.</strong> If you're young but fast and know
        how to leverage AI, you'll outship engineers with decades of traditional
        experience. We care about velocity and impact, not years in industry.
      </p>

      <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
        <strong>You don't need a CS degree.</strong> If you can build great software using AI
        agents, we don't care how you learned. Bootcamp, self-taught, traditional
        degree - it doesn't matter.
      </p>

      <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
        <strong>You don't need to be an expert in our specific stack.</strong> If you're a fast
        learner who knows how to use AI to get up to speed quickly, you'll be
        productive in days rather than months.
      </p>

      <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
        <strong>You don't need to hand-write perfect code.</strong> AI-generated code with strong
        architecture and fast iteration beats hand-written perfect code that
        ships slowly.
      </p>
    </motion.div>

    <div className="pt-16"></div>

    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      style={{
        maxWidth: "720px",
        margin: "80px auto",
        padding: "42px",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(176,102,254,0.25)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.65)"
      }}
    >
      <h2
        style={{
          fontSize: "30px",
          fontWeight: 800,
          marginBottom: "28px",
          background: "linear-gradient(90deg,#fff,#b066fe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        The Tech
      </h2>

      <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "22px" }}>
        We're using modern tools that work well with AI agents and fast
        iteration:
      </p>

      <div style={{ marginBottom: "22px", lineHeight: "1.9", color: "#A1A1A1" }}>
        <p><strong style={{ color: "#fff" }}>Frontend:</strong> React, React Native, TypeScript</p>
        <p><strong style={{ color: "#fff" }}>Backend:</strong> FastAPI, Django, Python for AI/ML</p>
        <p><strong style={{ color: "#fff" }}>Database:</strong> Postgres, vector databases for semantic search</p>
        <p><strong style={{ color: "#fff" }}>AI:</strong> Claude, GPT-n, Gemini - whatever works best for the use case</p>
        <p><strong style={{ color: "#fff" }}>Infrastructure:</strong> Modern cloud stack with serverless where possible</p>
        <p><strong style={{ color: "#fff" }}>AI Dev Tools:</strong> Cursor, Claude Code, Copilot, and anything that helps you ship faster</p>
      </div>

      <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
        But honestly, the specific stack matters less than your ability to learn
        and ship quickly. If you're using AI agents effectively, you can become
        productive in almost any stack within days.
      </p>
    </motion.div>

    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      style={{
        maxWidth: "1200px",
        margin: "100px auto",
        padding: "50px",
        borderRadius: "24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(176,102,254,0.25)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.65)"
      }}
    >
      <h2
        style={{
          fontSize: "34px",
          fontWeight: 800,
          marginBottom: "40px",
          textAlign: "center",
          background: "linear-gradient(90deg,#fff,#b066fe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        What You Get
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "28px"
        }}
      >

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Early Team Equity</h3>
          <p style={{ color: "#A1A1A1", lineHeight: "1.8" }}>
            Founding engineer-level ownership in something that could reshape how
            billions of people connect.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Real Impact</h3>
          <p style={{ color: "#A1A1A1", lineHeight: "1.8" }}>
            You're not employee #500. You're among the first engineers. The things
            you build will be core to the product for years.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Autonomy</h3>
          <p style={{ color: "#A1A1A1", lineHeight: "1.8" }}>
            You're trusted to make decisions. You don't need permission to ship or
            approval for every technical choice.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Learning</h3>
          <p style={{ color: "#A1A1A1", lineHeight: "1.8" }}>
            Work at the frontier of AI-assisted development using the newest AI
            tools and paradigms.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Mission That Matters</h3>
          <p style={{ color: "#A1A1A1", lineHeight: "1.8" }}>
            Help people find their people and build extraordinary relationships.
            Use AI to enhance human connection.
          </p>
        </div>

        <div>
          <h3 style={{ color: "#fff", marginBottom: "8px" }}>Speed</h3>
          <p style={{ color: "#A1A1A1", lineHeight: "1.8" }}>
            You'll ship more in 3 months here than you would in a year at a big
            company. If you love building and hate bureaucracy, you'll thrive.
          </p>
        </div>

      </div>
    </motion.div>

    <div className="pt-16"></div>

    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
          style={{
            maxWidth: "1200px",
            margin: "20px auto",
            padding: "50px",
            borderRadius: "24px",
            background: "linear-gradient(180deg, rgba(176,102,254,0.08), rgba(0,0,0,0.65))",
            border: "1px solid rgba(176,102,254,0.35)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.7)"
          }}        >
          <h2
            style={{
              fontSize: "34px",
              fontWeight: 800,
              marginBottom: "36px",
              textAlign: "center",
              background: "linear-gradient(90deg,#ffffff,#b066fe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            The Reality
          </h2>

          <div
  style={{
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center"
  }}
><p
  style={{
    color: "#A1A1A1",
    fontSize: "18px",
    lineHeight: "1.9",
    marginBottom: "24px",
    marginLeft: "auto",
    marginRight: "auto"
  }}
>
              This will be intense. We'll be iterating constantly. We need to move fast,
              learn fast, and ship fast. Sometimes that means long hours, high pressure,
              and navigating uncertainty.
            </p>
<p
  style={{
    color: "#A1A1A1",
    fontSize: "18px",
    lineHeight: "1.9",
    marginBottom: "24px",
    marginLeft: "auto",
    marginRight: "auto"
  }}
>
              We’ve taken on one of the biggest problems imaginable. We might fail -  
              realistically, we might. But if we succeed, you will have helped build
              the relationship infrastructure for the post-AGI world.
            </p>
<p
  style={{
    color: "#A1A1A1",
    fontSize: "18px",
    lineHeight: "1.9",
    marginBottom: "24px",
    marginLeft: "auto",
    marginRight: "auto"
  }}
>
              You'll work directly with the founding and growth teams, shipping features
              that users interact with immediately. You'll see the impact of your work
              in real time and have genuine ownership over core product decisions.
            </p>
          </div>
        </motion.div>

    <div className="pt-16"></div>

 <motion.div
   variants={fadeUp}
   initial="hidden"
   whileInView="show"
   viewport={{ once: true, margin: "-120px" }}
  style={{
    maxWidth: "1200px",
    margin: "120px auto",
    padding: "60px 50px",
    borderRadius: "28px",
    textAlign: "center",
    background:
      "linear-gradient(180deg, rgba(176,102,254,0.18), rgba(0,0,0,0.7))",
    border: "1px solid rgba(176,102,254,0.4)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 50px 140px rgba(0,0,0,0.7)"
  }}
>
  <h2
    style={{
      fontSize: "38px",
      fontWeight: 900,
      marginBottom: "36px",
      background: "linear-gradient(90deg,#ffffff,#b066fe)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }}
  >
    If This Resonates
  </h2>

  <div style={{ maxWidth: "900px", margin: "0 auto" }}>
    <p style={{ color: "#A1A1A1", fontSize: "18px", lineHeight: "1.9", marginBottom: "24px" }}>
      If you're already using AI to 10x your productivity, if you care about
      shipping with heart while still outshipping the pretenders, if you want
      to build AI that actually helps people connect and flourish, and if
      you're comfortable with speed, uncertainty, and high stakes - we need to
      talk.
    </p>

    <p style={{ color: "#A1A1A1", fontSize: "18px", lineHeight: "1.9", marginBottom: "24px" }}>
      This role requires working at the frontier. Using tools that are still
      evolving. Building things that haven't been built before. Moving at a
      pace that feels almost reckless until you realize everyone else is just
      moving too slowly.
    </p>

    <p style={{ color: "#A1A1A1", fontSize: "18px", lineHeight: "1.9", marginBottom: "28px" }}>
      But if you read this and think “yes - this is how engineering should be
      done,” if you want to build something that genuinely matters while
      becoming 10x more effective than you are today, this might be exactly
      what you've been looking for.
    </p>

    <h3
      style={{
        fontSize: "26px",
        marginTop: "30px",
        marginBottom: "18px",
        background: "linear-gradient(90deg,#fff,#b066fe)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      🌀 Elinity. Find your people. Build your tribe. Flourish in your relationships.
    </h3>

    <p style={{ color: "#A1A1A1", marginBottom: "18px" }}>
      For more information visit:{" "}
      <a
        href="https://elinity.ai"
        style={{ color: "#b066fe", textDecoration: "none", fontWeight: "600" }}
      >
        elinity.ai
      </a>
    </p>

    <p style={{ color: "#A1A1A1", fontSize: "17px" }}>
      We're building fast with a small team of exceptional engineers.
      If you join now, you'll help shape the technical foundation of everything
      we build.
    </p>
  </div>
</motion.div>
    </div>
  );
};

export default Software;