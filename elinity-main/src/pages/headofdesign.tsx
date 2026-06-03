import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 }
  }
};

const DesignHead = () => {

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth < 900);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: mobile ? "80px 20px" : "120px 20px",
        background:
          "radial-gradient(circle at 20% 20%,black,transparent 40%), radial-gradient(circle at 80% 0%,black,transparent 40%), #07071c",
        color: "#fff"
      }}
    >

      <div className="pt-16"></div>

      <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: mobile ? "40px 20px" : "80px 40px",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1.3fr 0.7fr",
        gap: mobile ? "60px" : "100px",
        alignItems: "start",
        background: "transparent", // Deep black background
        color: "#fff",
        fontFamily: "Inter, system-ui, sans-serif"
      }}
    >
      {/* LEFT SIDE - CONTENT */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 84px)",
            fontWeight: 900,
            lineHeight: 0.95,
            marginBottom: "40px",
            background: "linear-gradient(135deg, #fff 30%, #b066fe 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.04em"
          }}
        >
          Head of Design <br /> & Experiences
        </h1>

        <div style={{ maxWidth: "720px" }}>
          <p
            style={{
              fontSize: mobile ? "22px" : "26px",
              color: "rgba(255,255,255,0.9)",
              lineHeight: "1.5",
              marginBottom: "32px",
              fontWeight: 500,
              letterSpacing: "-0.01em"
            }}
          >
            We're building the future of human connection. We need someone who
            can see that future and help people experience it.
          </p>

          <p
            style={{
              fontSize: "19px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: "1.8",
              fontWeight: 400
            }}
          >
            We're building emotionally intelligent AI that helps people find
            their most resonant connections and build extraordinary
            relationships. We need someone who can design the entire
            experience - from product to partnerships to how we show up in
            the world.
          </p>
        </div>
      </motion.div>

      {/* RIGHT PANEL - SIDEBAR */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{
          position: mobile ? "relative" : "sticky",
          top: mobile ? "0px" : "120px"
        }}
      >
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            padding: mobile ? "32px" : "48px",
            borderRadius: "32px",
            background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(176,102,254,0.3)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8), inset 0 0 20px rgba(176,102,254,0.05)"
          }}
        >
          {[
            { label: "Location", value: "New York City or London" },
            { label: "Type", value: "Full-Time" },
            { label: "Compensation", value: "Competitive salary + equity" },
          ].map((item, index) => (
            <div key={index} style={{ marginBottom: "32px" }}>
              <div style={{ 
                color: "#b066fe", 
                fontSize: "11px", 
                textTransform: "uppercase", 
                letterSpacing: "0.15em",
                fontWeight: 800,
                marginBottom: "8px"
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: "20px", fontWeight: 500, color: "#fff" }}>
                {item.value}
              </div>
            </div>
          ))}

          <div style={{ marginBottom: "40px" }}>
            <div style={{ color: "#b066fe", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 800, marginBottom: "8px" }}>Company</div>
            <a
              href="https://elinity.ai"
              style={{
                fontSize: "20px",
                color: "#fff",
                textDecoration: "none",
                borderBottom: "1px solid #b066fe",
                paddingBottom: "2px",
                transition: "opacity 0.3s"
              }}
              onMouseOver={(e) => e.target.style.opacity = 0.7}
              onMouseOut={(e) => e.target.style.opacity = 1}
            >
              elinity.ai
            </a>
          </div>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@elinity.ai&su=Application for Head of Design and Experiences Role"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(90deg, #b066fe, #7c3aed)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "17px",
              cursor: "pointer",
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              boxShadow: "0 20px 40px rgba(124, 58, 237, 0.3)",
              transition: "box-shadow 0.3s ease"
            }}
          >
            Apply for this Role
          </motion.a>
        </motion.div>
      </motion.div>
    </div>

      {/* SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "1200px",
          margin: "60px auto",
          padding: mobile ? "30px" : "50px",
          borderRadius: "26px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)"
        }}
      >
        <h2
          style={{
            fontSize: mobile ? "28px" : "34px",
            fontWeight: 800,
            marginBottom: "26px",
            background: "linear-gradient(90deg,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What This Role Is
        </h2>

        <p
          style={{
            color: "#A1A1A1",
            fontSize: "18px",
            lineHeight: "1.9",
            marginBottom: "22px"
          }}
        >
          You'll be our Head of Design and Experiences. Which means you own how
          Elinity is designed - from product interfaces to partnership
          ecosystems to the stories we tell. You're the design mind shaping
          everything we build and how we show up in the world.
        </p>

        <p
          style={{
            color: "#A1A1A1",
            fontSize: "18px",
            lineHeight: "1.9"
          }}
        >
          This is design in the fullest sense. Not just making things look
          good, but designing the entire experience of what Elinity is and
          feels like. Product design, conversational design, ecosystem design,
          content design, partnership design - everything.
        </p>
      </motion.div>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "1200px",
          margin: "20px auto",
          padding: mobile ? "40px 24px" : "70px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(176,102,254,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: mobile ? "32px" : "40px",
            fontWeight: 900,
            marginBottom: "20px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What You'll Actually Do
        </h2>

        {/* DESIGN EVERYTHING */}
        <div style={{ marginBottom: "70px" }}>
          <h3 style={{ fontSize: "26px", marginBottom: "20px", color: "#b066fe" }}>
            Design Everything
          </h3>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            You're the design mind behind Elinity. Not just product design, but design
            in the broadest, most ambitious sense.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color: "#fff" }}>Product Design:</strong>
            <br></br>
            You'll design the interfaces, flows, and interactions that make up the Elinity experience. The onboarding journey, the chat interfaces with Lumi, the games and activities, the journaling experience. Every screen, every interaction, every moment someone spends in the product. You have exceptional taste for what makes digital experiences feel intuitive, warm, alive.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color: "#fff" }}>AI UX Design:</strong>
            <br></br>
            You'll design how our AI thinks, speaks, and shows up. The conversational flows that feel natural rather than robotic. The personality that comes through in every interaction. How Lumi asks questions, offers insights, holds space for people. This is frontier territory - designing interactions with emotionally intelligent AI where the rules are still being written.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color: "#fff" }}>
              Conversational and Podcast Design:
            </strong>{" "}
            <br></br>
            You'll design the shape of conversations, both within the product and in our podcast series. How do we create dialogues that feel generative rather than transactional? What makes a conversation transformative versus merely informative? You understand the architecture of meaningful exchange.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color: "#fff" }}>Ecosystem Design:</strong>
            <br></br>
            You'll design how the entire Elinity ecosystem fits together. The relationship between different features, how they reinforce each other, how someone's journey evolves over time. Not just individual touchpoints but the entire system of experiences.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color: "#fff" }}>Content Design:</strong> 
            <br></br>
            You'll shape how we communicate through content. The visual language of our brand. The structure of our storytelling. How ideas are presented, framed, made compelling. Design and content aren't separate - they're unified expressions of what we're building.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            <strong style={{ color: "#fff" }}>Partnership Design:</strong> 
            <br></br>
            You'll design how we show up in partnerships. What does it mean for Elinity to collaborate with a university, a community, a thought leader? How do we structure these relationships so they're generative rather than transactional? How do we design alliance ecosystems that amplify our mission?
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
            <strong style={{ color: "#fff" }}>Future Product Design:</strong> 
            <br></br>
            You'll think ahead. What does relationship technology look like in 2027? 2030? How do we design for a world where AI companions are ubiquitous? What new paradigms of interaction become possible? You're designing not just for today but for the trajectory we're on.
            <br></br> 
            You're designing the future of how humans relate to each other in the post AI world, and to AIs, and how we interface with human tech. That's the scope of the canvas.
          </p>
        </div>

        {/* HOLISTIC EXPERIENCE */}
        <div style={{ marginBottom: "70px" }}>
          <h3 style={{ fontSize: "26px", marginBottom: "20px", color: "#b066fe" }}>
            Design Holistic Experiences
          </h3>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            You'll work with the product team to craft the entire human experience, not just the product interface. How does someone feel when they interact with Lumi? What journey do they take from discovery to deep integration in their relational life? How does the experience evolve as the relationship with our AI deepens?
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            You have exceptional design taste and strong intuition for elite UX. You understand that design isn't just about interfaces but about the entire emotional arc of human experience. You know the difference between something that functions and something that truly resonates.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
            You'll think about the AI's personality, how it communicates, how it holds space for people. The shape of interactions, the rhythm of engagement, the moments that matter. Not just making things work, but making things feel meaningful
          </p>
        </div>

        {/* NARRATIVES */}
        <div style={{ marginBottom: "70px" }}>
          <h3 style={{ fontSize: "26px", marginBottom: "20px", color: "#b066fe" }}>
            Craft Compelling Narratives
          </h3>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            You'll work in tandem with our Content and Growth team to build Elinity's storytelling engine. How do we communicate what we're building to people who've never experienced anything like it? How do we shift cultural narratives around AI, around relationships, around what technology should do for humans?
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
            You're exceptional at communicating complex ideas in ways that move people. You can take sophisticated concepts about human connection, AI, and flourishing and make them accessible, compelling, emotionally resonant. You can write, you can speak, you can craft narratives that change how people think.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
            You'll shape our voice, our messaging, our presence in the world. The stories we tell about what we're building and why it matters. The way we position ourselves culturally. The conversations we start and the ideas we spread.
          </p>
        </div>

        {/* PARTNERSHIPS */}
        <div style={{ marginBottom: "70px" }}>
          <h3 style={{ fontSize: "26px", marginBottom: "20px", color: "#b066fe" }}>
            Build Strategic Partnerships
          </h3>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9", marginBottom: "18px" }}>
            You'll lead our expansion into new cities, form alliances with communities and organizations that share our values, connect with universities, researchers, thought leaders, and cultural influencers. You'll find the people and groups who will benefit most from what we're building and create meaningful partnerships with them.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
            This isn't just business development. It's about building a movement, creating a network of aligned people and organizations who share our vision for more conscious, meaningful connection.
          </p>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
            You'll represent Elinity in the world. At events, in conversations with potential partners, in the communities we're trying to reach. You'll be a key voice and face of what we're building.
          </p>
        </div>

        {/* CULTURE */}
        <div style={{marginBottom:'0px'}}>
          <h3 style={{ fontSize: "26px", marginBottom: "0px", color: "#b066fe" }}>
            Shape Culture
          </h3>

          <p style={{ color: "#A1A1A1", lineHeight: "1.9" }}>
            You'll think actively about how our products, content, and partnerships can shift culture. You're not content to follow trends. You want to create them, bend them, redirect them toward better futures. Toward more intentional relationships, more conscious use of technology, more human flourishing.
            <br></br><br></br>
            You understand that companies building transformative products don't just respond to culture. They shape it. You'll be the person making sure we're doing that thoughtfully and strategically.
          </p>
        </div>
      </motion.section>
    
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "1200px",
          margin: "0px auto",
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
            marginBottom: "40px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Who You Are
        </h2>

        <div
          style={{
            fontSize: "18px",
            lineHeight: "1.95",
            color: "#A1A1A1",
            display: "flex",
            flexDirection: "column",
            gap: "22px"
          }}
        >
          <p><strong style={{color:'white'}}>You're an exceptional designer.</strong> This is your core capability. You have elite taste and a strong portfolio demonstrating sophisticated design thinking. You understand product design, interaction design, visual design, systems design. You know the difference between something that looks good and something that works beautifully. You can design interfaces that feel intuitive, experiences that feel meaningful, systems that feel coherent.</p>

          <p><strong style={{color:'white'}}>You understand design at multiple levels:</strong> <br></br>the micro (individual interactions, visual details, UI components) and the macro (entire ecosystems, long-term journeys, cultural positioning). You can zoom in to refine a specific interaction and zoom out to see how everything fits together.</p>

          <p><strong style={{color:'white'}}>You're fluent in modern design tools (Figma, etc.)</strong> but more importantly, you're fluent in design thinking. You can articulate why certain design choices work, how form shapes experience, what makes something resonate emotionally versus just function correctly.</p>

          <p><strong style={{color:'white'}}>You understand that design isn't just aesthetics.</strong> It's about shaping behavior, creating meaning, enabling certain kinds of experiences while making others impossible. You know design is power, and you use it thoughtfully.</p>

          <p><strong style={{color:'white'}}>You're a world-class storyteller. </strong>You know how to make people feel something real through narrative. You can craft stories that stick, that spread, that change minds. You understand the power of good storytelling to shift culture and inspire action.</p>

          <p><strong style={{color:'white'}}>You understand humans deeply. </strong>You have real knowledge of human psychology, relationships, meaning-making, behavior. Ideally a background in design, psychology, or related fields. You know why people connect, what makes relationships work, what conditions enable flourishing. This isn't just theoretical. You have intuition for human experience.</p>

          <p><strong style={{color:'white'}}>You're strategic about partnerships. </strong>You know how to identify the right partners, build meaningful relationships, create alliances that serve the mission. You're comfortable representing the company, making connections, opening doors.</p>

          <p><strong style={{color:'white'}}>You're passionate about human flourishing. </strong>This is not just a professional interest. You genuinely care about helping people live better, more connected, more meaningful lives. You see technology as a tool for amplifying our human essence, our humanity.</p>

          <p><strong style={{color:'white'}}>You can think philosophically when needed.</strong> While this isn't primarily a philosophy role, you're comfortable engaging with deeper questions about consciousness, meaning, values, human experience. You can think rigorously about why we're building what we're building and what it means for people.</p>

          <p><strong style={{color:'white'}}>You want to shape culture. </strong>You're not content to build products in a vacuum. You want to shift how people think about relationships, about AI, about what technology should do. You see this as an opportunity to influence culture at scale.</p>

          <p><strong style={{color:'white'}}>You're an exceptional communicator.</strong> In writing, in speaking, in person. You can represent complex ideas compellingly. You could eventually become a C-level executive because you have the communication skills and strategic thinking to operate at that level.</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
  viewport={{ once: true, margin: "-120px" }}

        style={{
          maxWidth: "1200px",
          margin: "20px auto",
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
            marginBottom: "40px",
            background: "linear-gradient(to right,#fff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          What This Looks Like Day to Day
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
          <p>You're designing the interface for a new feature that helps people reflect on their relationships. You're thinking about the flow, the questions we ask, how the AI responds, what insights get surfaced, how the entire experience feels. You're wireframing in Figma, iterating on interactions, testing different approaches.</p>

          <p>You're designing Lumi's conversational personality for different contexts. How should it respond when someone's excited about a new connection? When they're processing a difficult breakup? When they're uncertain about taking a next step? You're crafting the language, the tone, the rhythm of conversation that makes these interactions feel supportive rather than algorithmic.</p>

          <p>You're designing our podcast experience. Not just the content, but the entire format. How do we structure conversations to be generative? What's the rhythm of a great dialogue? How do we design the experience of listening so it's engaging, thought-provoking, transformative?</p>

          <p>You're working with product on the onboarding journey. What's the first experience someone has with Elinity? How do we design those initial interactions so they understand what we're building and feel excited to engage? You're thinking about every screen, every question, every moment.</p>

          <p>You're designing a partnership with a university's psychology department. How do we structure this collaboration? What does it look like? How do we design the relationship so it's mutually beneficial and aligned with our mission?</p>

          <p>You're working with the content team, crafting narratives. Writing pieces that explain our vision, creating campaigns that resonate, developing the voice and messaging that defines how people understand what we're building.</p>

          <p>You're thinking about our design system. The components, patterns, and principles that make our product feel coherent. The visual language that carries through every touchpoint.</p>

          <p>You're designing for the future. Sketching what relationship technology might look like in three years. Prototyping new interaction paradigms. Thinking about how AI UX evolves as the technology gets more sophisticated.</p>

          <p>You're on calls with potential partners. Universities who want to collaborate, communities aligned with our values, thought leaders who could help spread our ideas.</p>

          <p>You're thinking about expansion. What does it mean to launch in a new city? How do we enter communities thoughtfully? What partnerships make sense?</p>

          <p>You're shaping the philosophy and principles that guide everything we do. Not as a pure philosopher, but as someone who can articulate the values embedded in our product and the vision of human flourishing we're working toward.</p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
  viewport={{ once: true, margin: "-120px" }}

        style={{
          maxWidth: "1200px",
          margin: "20px auto",
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
          The Path Forward
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
            This role has a clear trajectory. You start as Head of Experiences and
            Storytelling. You build the experiential and narrative foundation of
            everything we do. You become essential to how we show up in the world,
            how we communicate our vision, how we grow our reach.
          </p>

          <p>
            Over time, you become our Chief Relations and Experience Officer (CREO).
            You own the entire domain of how humans experience Elinity, how we
            position ourselves culturally, how we build partnerships and expand our
            impact. You're a key voice in strategic decisions, a public face of the
            company, a thought leader in the space.
          </p>

          <p>
            You could become one of the defining voices in how we think about AI and
            human relationships. This is a space that needs serious, thoughtful
            communication, and almost nobody is doing it well. You could be the
            person who shapes these conversations for the next decade.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
  viewport={{ once: true, margin: "-120px" }}

        style={{
          maxWidth: "1200px",
          margin: "20px auto",
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
            color: "#A1A1A1"
          }}
        >
          <p>
            Early team equity. Founding-level ownership in something that could
            reshape how billions of people connect and build relationships.
          </p>

          <p>
            Creative freedom. Real autonomy to craft experiences, shape narratives,
            build partnerships. We need someone who can think independently and
            execute with taste, not someone who needs every decision approved by
            committee.
          </p>

          <p>
            Impact at scale. If we're right about this, you'll help shape how
            hundreds of millions of people think about relationships and AI. The
            experiences you design and stories you tell could influence culture at a
            massive scale.
          </p>

          <p>
            Interdisciplinary work. You'll engage with design, psychology,
            technology, culture, relationships. You'll work with thinkers and
            builders and researchers. You'll be in conversation with interesting
            questions and interesting people.
          </p>

          <p>
            A mission that matters. Helping people find their people and build
            extraordinary relationships. Shaping how AI can serve human flourishing
            rather than undermine it. Building the social infrastructure for a world
            that's changing faster than most people realize.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"  viewport={{ once: true, margin: "-120px" }}

        style={{
          maxWidth: "1200px",
          margin: "20px auto",
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
          The Context
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
            We have built a suite of modules for discovery, matching, relationships
            flourishing, with connection-oriented games, smart voice journaling,
            reflections, AI coaching built in. We're not just matching people - we're
            helping them thrive together over time.
          </p>

          <p>
            We're trying to build something radically different from existing social
            and dating platforms. Slower, deeper, more conscious. AI that actually
            understands you rather than just optimizing for engagement. Tools for
            nurturing relationships, not just facilitating initial connections.
          </p>

          <p>
            The social landscape is breaking down. Loneliness is epidemic. Current
            platforms are optimized for metrics that don't serve human wellbeing.
            We're building the alternative to all of this.
          </p>

          <p>
            This is hard. Most attempts to build something genuinely different fail.
            But we're trying anyway, because the world needs it more than ever, and
            nothing matters more than this mission. For nothing matters more than the
            quality of our relationships.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        style={{
          maxWidth: "1200px",
          margin: "20px auto",
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
          Why This Role Matters
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
            Most companies building social and relationship platforms think about
            marketing and design as separate, downstream functions. Build the
            product, then figure out how to market it. Design the features, then wrap
            them in a decent UI.
          </p>

          <p>
            We think that's backwards. The experience and the story are not separate
            from the product. They're core to what the product is. How people feel
            when they interact with us, what narratives they encounter, what
            cultural position we occupy, these things fundamentally shape what we're
            building and whether it works.
          </p>

          <p>
            You'll help us avoid the failure modes that plague other platforms. The
            design that feels functional but soulless. The marketing that sounds like
            every other tech company. The growth that optimizes for metrics over
            meaning.
          </p>

          <p>
            You'll help us build something that feels different because it is
            different. That communicates clearly why it matters. That reaches the
            people who will benefit most. That shapes culture toward more conscious
            connection rather than just riding existing cultural currents.
          </p>
        </div>
      </motion.div>

      <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"  viewport={{ once: true, margin: "-120px" }}
          style={{
            maxWidth: "950px",
            margin: "75px auto",
            padding: mobile ? "48px 26px" : "70px",
            borderRadius: "32px",
            background:
              "linear-gradient(180deg, rgba(176,102,254,0.18), rgba(0,0,0,0.65))",
            border: "1px solid rgba(176,102,254,0.35)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 60px 160px rgba(0,0,0,0.7)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
      >
          {/* subtle glow */}
          <motion.div
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle,#b066fe55,transparent 70%)",
              filter: "blur(120px)",
              top: -200,
              left: -120,
              zIndex: 0
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <h2
              style={{
                fontSize: mobile ? "34px" : "44px",
                fontWeight: 900,
                marginBottom: "30px",
                background: "linear-gradient(to right,#fff,#c084fc)",
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
                lineHeight: "1.9",
                color: "#E5E5E5",
                marginBottom: "36px"
              }}
            >
              <p>
                If you're exceptional at storytelling and design, if you understand
                human psychology and relationships deeply, if you can build strategic
                partnerships and represent a company in the world, if you want to work
                on shaping how people think about AI and connection and flourishing,
                let’s talk.
              </p>

              <p>
                This role requires serious creative and strategic horsepower. It
                requires caring deeply about human well-being while being realistic
                about how hard it is to build things that actually help. It requires
                being comfortable at the frontier, in the space where we're still
                figuring out what works and what doesn't.
              </p>

              <p>
                But if that describes you, if you read this and see an opportunity to
                design experiences and craft stories and build partnerships around
                something that could genuinely matter, then this might be exactly what
                you've been looking for.
              </p>

              <p style={{ fontWeight: 600 }}>
                🌀 Elinity. Find your people. Build your tribe. Flourish in your
                relationships.
              </p>

              <p>
                This is one of our most critical hires. The person who fills this role
                will shape how millions of people experience and understand what we're
                building.
              </p>
            </div>

            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@elinity.ai&su=Application for Head of Design and Experiences Role" target="_blank"  rel="noopener noreferrer">
              <button
                style={{
                  padding: "16px 36px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(90deg,#b066fe,#7c3aed)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0 10px 40px rgba(176,102,254,0.4)"
                }}
              >
                Apply for this Role
              </button>
            </a>
          </div>
        </motion.div>
    </div>
  );
};

export default DesignHead;