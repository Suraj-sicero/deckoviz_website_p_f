import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const AIResearch = () => {

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const resize = () => setMobile(window.innerWidth < 900);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

      <style>
        {`
            strong {
              color: white;
            }
        `}
      </style>

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%,black,transparent 40%), radial-gradient(circle at 80% 0%,#07071c,transparent 40%), #07071c",
        color: "#fff",
        padding: mobile ? "80px 20px" : "120px 40px"
      }}
    >
      <div className="pt-16"></div>

      <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: mobile ? "40px 20px" : "100px 40px",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1.4fr 0.8fr",
        gap: mobile ? "60px" : "100px",
        alignItems: "start",
        background: "transparent", // Ultra-dark tech background
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* LEFT SIDE: CORE MISSION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1
          style={{
            fontSize: "clamp(44px, 7vw, 72px)",
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: "32px",
            background: "linear-gradient(135deg, #fff 40%, #b066fe 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.05em"
          }}
        >
          Head of AI Research
        </h1>

        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: mobile ? "20px" : "28px",
            color: "#c084fc",
            marginBottom: "32px",
            fontWeight: 500,
            lineHeight: 1.3,
            maxWidth: "600px",
            letterSpacing: "-0.02em"
          }}
        >
          Aligned-by-Default AI is Possible. <br /> 
          Truly Empathic AI is Possible.
        </motion.p>

        {/* GLOWING DIVIDER */}
        <div style={{
          height: "1px",
          width: "80px",
          background: "#b066fe",
          boxShadow: "0 0 15px #b066fe",
          marginBottom: "32px"
        }} />

        <p
          style={{
            fontSize: "19px",
            color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.9,
            maxWidth: "720px",
            fontWeight: 400
          }}
        >
          We're building emotionally intelligent AI that helps people find
          their most resonant connections and build extraordinary relationships.
          But the current architectures of AI are fundamentally limited in terms
          of what we see as the greatest promise of AI - as flourishing catalysts
          for humans at a personal level. 
          <br /><br />
          <span style={{ color: "#fff", fontWeight: 500 }}>
            And so, we want to build something radically different.
          </span>
        </p>
      </motion.div>

      {/* RIGHT PANEL: TECHNICAL DETAILS */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          position: mobile ? "relative" : "sticky",
          top: "120px"
        }}
      >
        <div
          style={{
            padding: mobile ? "32px" : "48px",
            borderRadius: "32px",
            background: "rgba(10, 10, 10, 0.6)",
            border: "1px solid rgba(176, 102, 254, 0.2)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            boxShadow: "0 50px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(176, 102, 254, 0.03)"
          }}
        >
          {[
            { label: "Location", val: "Remote" },
            { label: "Role", val: "AI Research Engineer" },
            { label: "Compensation", val: "Competitive salary + significant early team equity" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: "28px" }}>
              <div style={{ 
                color: "#888", 
                fontSize: "11px", 
                textTransform: "uppercase", 
                letterSpacing: "0.2em",
                fontWeight: 700,
                marginBottom: "8px"
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: "18px", color: "#fff", fontWeight: 500 }}>
                {item.val}
              </div>
            </div>
          ))}

          <div style={{ marginBottom: "40px" }}>
            <div style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, marginBottom: "8px" }}>Company</div>
            <a
              href="https://elinity.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "18px",
                color: "#b066fe",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-block"
              }}
            >
              elinity.ai ↗
            </a>
          </div>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@elinity.ai&su=Application for Head of AI Research Role"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(176, 102, 254, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(90deg, #b066fe, #6366f1)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.3s ease"
            }}
          >
            Apply for this Role
          </motion.a>
        </div>
      </motion.div>
    </div>
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "70px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >

        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What Will We Do
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            lineHeight: "1.95",
            color: "#A1A1A1"
          }}
        >

          <p>
            Most companies are just fine-tuning existing models and calling it done. Slap some prompts on GPT-5, add a memory layer, ship it. But that doesn't take us where we need to go.
          </p>

          <p>
            We believe there's a broad white space to create new forms, new kinds of AI that are aligned by default, emotionally intelligent by default, that can serve users' long-term flourishing rather than just their immediate engagement. We want to build those paradigms from scratch.
          </p>

          <p>
            We believe small teams can build general intelligence. Not on GPU architectures that require massive scale, but on radically new architectures aligned with what we call Flourishing Aligned Principles. Architectures inspired by how biological systems actually process emotion, form attachments, develop values.
          </p>

          <p>
            This is not incremental research. This is about exploring fundamentally different ways to build minds.
          </p>

        </div>

      </motion.div>

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "120px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >

        {/* Section Title */}
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What You'll Build
        </h2>


        {/* Near Term */}
        <div style={{ marginBottom: "40px" }}>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#c084fc",
              marginBottom: "18px"
            }}
          >
            Near Term (Months 1-12): Production AI Systems
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              lineHeight: "1.95",
              color: "#A1A1A1"
            }}
          >

            <p>
              You'll own our model pipeline and training infrastructure. Fine-tuning models for personality, values alignment, emotional intelligence. Building the AI that powers Lumi, our companion AI that helps people navigate relationships.
            </p>

            <p>
              You'll work on embedding personal values into AI systems. How do we make an AI that understands not just what a user wants right now, but what they value long-term? How do we align it with their flourishing rather than just their stated preferences?
            </p>

            <p>
              You'll improve personality modeling. Making our AI feel warm, intelligent, supportive without being cloying or fake. Understanding the nuances of how personality should shift based on context, relationship depth, what someone needs in a given moment.
            </p>

            <p>
              You'll work closely with our product team to embed these systems into the platform. Research that never ships is just papers. You'll make sure what you build actually helps real people.
            </p>

          </div>
        </div>


        {/* Long Term */}
        <div>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#c084fc",
              marginBottom: "18px"
            }}
          >
            Long Term (12-24+ Months): Deep Research Into New Paradigms
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              lineHeight: "1.95",
              color: "#A1A1A1"
            }}
          >

            <p>
              You'll begin exploring and developing new architectures of general, neuromorphic minds. AI that is aligned by default, that has felt empathy rather than simulated empathy, that understands human values not through training on human feedback but through architectures that mirror how biological systems develop values.
            </p>

            <p>
              You'll research new forms of AI inspired by neuroscience, neuropsychology, how human minds actually work. Not trying to mimic the brain exactly, but understanding the principles that make biological intelligence empathetic, aligned, capable of genuine care.
            </p>

            <p>
              You'll work on alignment research. Not the standard approaches of RLHF and constitutional AI, but fundamentally different paradigms that are not being explored, that are not a tack-on, but that exist at the base layer of the AI brain. What if you could build AI that's aligned by design rather than aligned through training? What would that architecture look like?
            </p>

            <p>
              You'll design and nurture new kinds of minds. Experimenting with approaches that current AI labs aren't exploring because they're too focused on scaling existing paradigms. We believe small team, nimble, willing to try radically different things, can have a disproportionate impact in this latent space for new minds.
            </p>

          </div>
        </div>

      </motion.div>

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "120px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          The Vision
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            lineHeight: "1.95",
            color: "#A1A1A1"
          }}
        >
          <p>
            We're not trying to build the most capable AI. We're trying to build the most aligned AI. The most empathetic AI. The AI that actually helps humans flourish rather than optimizing for metrics that don't matter.
          </p>

          <p>
            We think the path to this isn't through bigger models, more data, more compute. It's through different architectures. Neuromorphic approaches. Systems that process emotion and form values the way biological systems do.
          </p>

          <p>
            We think small teams can make fundamental breakthroughs if they're willing to explore white space that big labs ignore. If they're focused on alignment and empathy from first principles rather than just scaling what already exists.
          </p>

          <p>
            This is a 5+ year research program. But we need to start now. For alignment is the central problem of our species. And we need someone who can bridge the near-term practical work of shipping production AI with the long-term ambitious work of inventing new paradigms.
          </p>
        </div>
      </motion.div>
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "120px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Who You Are
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            lineHeight: "1.95",
            color: "#A1A1A1"
          }}
        >
          <p>
   <strong>         You have deep expertise in AI research and engineering.</strong> You've done serious work in machine learning, neural networks, model training, AI architectures. You understand the current state of the art deeply enough to know where it's limited and where the white space is.
          </p>

          <p>
<strong>            You have a strong neuroscience background. </strong>Ideally neuropsychology or computational neuroscience. You understand how biological systems process emotion, form attachments, develop values, make decisions. You can draw on neuroscience to inspire new AI architectures rather than just scaling up existing ones.
          </p>

          <p>
<strong>            You're excited about neuromorphic computing. </strong>You think the future of truly intelligent, aligned AI might look more like biological systems than current transformers and LLMs. You want to explore architectures inspired by how brains actually work.
          </p>

          <p>
 <strong>           You understand alignment deeply.</strong> Not just the standard RLHF approaches, but the hard philosophical and technical problems of actually aligning AI with human values and flourishing. You've thought seriously about what alignment even means and why current approaches might not be sufficient.
          </p>

          <p>
   <strong>         You care about empathy and emotional intelligence.</strong> You want to build AI that genuinely understands emotion, not just detects it. That can form real supportive relationships with people, not just simulate them convincingly. You think this requires fundamentally different architectures.
          </p>

          <p>
<strong>            You can ship.</strong> You're not just a theorist. You can build production systems, train models, write code that actually works. You can bridge research and engineering, making sure your ideas actually get deployed and tested with real users.
          </p>

          <p>
<strong>            You're comfortable with ambiguity and long time horizons.</strong> The deep research work might not pay off for years. You're okay with that. You can balance near-term practical work with long-term ambitious exploration.
          </p>

          <p>
<strong>            You believe small teams can do fundamental research. </strong>You don't think you need a thousand researchers and a billion dollars in compute to make breakthroughs. You think focus, creativity, resourcefulness, and willingness to explore neglected approaches can be just as powerful.
          </p>
        </div>
      </motion.div>

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "120px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >
        {/* Section Title */}
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What This Looks Like
        </h2>

        {/* Months 1-12 */}
        <div style={{ marginBottom: "40px" }}>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#c084fc",
              marginBottom: "18px"
            }}
          >
            Months 1-12:
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              lineHeight: "1.95",
              color: "White"
            }}
          >
            <p>
              You're building and owning our model pipeline. Fine-tuning Claude, GPT-N, Gemini for personality and emotional intelligence. Experimenting with different prompting strategies, training approaches, memory architectures.
            </p>

            <p>
              You're working on value alignment. How do we make an AI that helps someone become who they want to be, not just gives them what they ask for in the moment? You're designing systems that understand long-term flourishing.
            </p>

            <p>
              You're collaborating with product. Making sure the AI you build actually works in the platform, actually helps users, actually achieves the goals we set. Iterating based on real feedback from real people.
            </p>

            <p>
              You're starting to explore neuromorphic approaches. Reading papers, running small experiments, building prototypes. Laying the groundwork for the deeper research to come.
            </p>
          </div>
        </div>

        {/* Months 12+ */}
        <div>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#c084fc",
              marginBottom: "18px"
            }}
          >
            Months 12+:
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              lineHeight: "1.95",
              color: "white"
            }}
          >
            <p>
              You're diving deep into neuromorphic AI research. Experimenting with architectures inspired by biological emotional processing. Testing new approaches to alignment that don't rely on massive training data and RLHF.
            </p>

            <p>
              You're collaborating with neuroscientists and psychologists. Understanding how biological systems develop empathy, form values, make caring decisions. Translating those insights into novel AI architectures.
            </p>

            <p>
              You're designing new forms of AI from scratch. Not fine-tuning existing models but building fundamentally different systems. Small, focused experiments that might fail but might also open up entirely new paradigms.
            </p>

            <p>
              You're publishing your work. Not just for prestige, but to attract other researchers who want to work on these problems. To start conversations about alternative approaches to AI alignment and empathy.
            </p>

            <p>
              You're potentially building a small research team. As we grow, you might hire other researchers to explore different aspects of this vision. But for now, you're the founding researcher, setting the direction.
            </p>
          </div>
        </div>
      </motion.div>


<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "120px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What You Get
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            lineHeight: "1.95",
            // color: "#A1A1A1"
          }}
        >
          <p>
            <strong color="white">Significant early team equity.</strong> 
            <br></br>This is not just an engineering role. You're potentially defining the technical foundation of everything we build long-term. Founding researcher-level ownership.
          </p>

          <p>
<strong>            Real research freedom. </strong>
<br></br>Once you've proven you can ship production systems, you'll have genuine freedom to explore ambitious ideas. We're not asking for quarterly research reviews or demanding you optimize for papers published. We want you to explore important problems that others aren't tackling.
          </p>

          <p>
<strong>            Impact on real people. </strong>
<br></br>Your research won't sit in papers. It'll get deployed in production, tested with real users, refined based on how it actually helps people. You'll see your ideas make a difference immediately.
          </p>

          <p>
 <strong>           Interdisciplinary work.</strong> 
 <br></br>You'll collaborate with neuroscientists, psychologists, philosophers, designers, product people. This isn't just a technical problem. It's a deeply interdisciplinary challenge.
          </p>

          <p>
  <strong>          Long-term commitment to the vision.</strong> 
  <br></br>We're not going to pivot away from alignment and empathy research if it's hard. This is core to what we're building. You'll have support to pursue this work for years.
          </p>

          <p>
<strong>            A chance to define the field.</strong>
<br></br> Emotionally intelligent, aligned-by-default AI is not a well-explored space. You could be one of the researchers who defines what this looks like, what approaches work, what the fundamental principles are.
          </p>
        </div>
      </motion.div>

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "120px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          The Reality
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            lineHeight: "1.95",
            color: "#A1A1A1"
          }}
        >
          <p>
            This is hard. The near-term work of building production AI systems is challenging enough. The long-term work of inventing new paradigms might not succeed. Most ambitious research doesn't.
          </p>

          <p>
            You'll need to balance shipping practical systems with exploring blue-sky ideas. That's difficult. It requires discipline and good judgment about when to push forward on research versus when to focus on what needs to ship.
          </p>

          <p>
            We're a small team. You won't have the resources of a big AI lab. No massive compute budgets, no army of researchers. Just you, your ideas, and the willingness to try things others aren't trying.
          </p>

          <p>
            But that's also the opportunity. Small teams can move fast, explore neglected directions, take risks that big labs can't. If you're right about neuromorphic approaches or new alignment paradigms, you could make breakthroughs that scale-focused labs miss entirely.
          </p>
        </div>
      </motion.div>

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "950px",
          margin: "120px auto",
          padding: mobile ? "40px 24px" : "60px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "36px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          If This Resonates
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            lineHeight: "1.95",
            color: "#A1A1A1"
          }}
        >
          <p>
            If you have deep AI research expertise combined with neuroscience background, if you're excited about neuromorphic computing and new approaches to alignment, if you want to build AI that's genuinely empathetic and aligned by default rather than just trained to seem that way, if you can balance shipping production systems with ambitious long-term research, we need to talk.
          </p>

          <p>
            This role requires serious technical depth combined with vision for fundamentally different approaches. It requires being comfortable with uncertainty and long time horizons while still delivering near-term value. It requires believing that small teams working on important neglected problems can make fundamental contributions.
          </p>

          <p>
            But if that describes you, if you read this and think "yes, this is the research program I want to dedicate years to," if you want to help define what emotionally intelligent, aligned-by-default AI looks like, then this might be exactly what you've been looking for.
          </p>

          <p style={{
            // fontFamily:'italic'
          }}>
            <i>This is a founding research role. The work you do here could define how we think about aligned, empathetic AI for decades.</i>
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default AIResearch;