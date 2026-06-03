import React from "react";
import { motion } from "framer-motion";
import { file } from "googleapis/build/src/apis/file";
import { filter } from "framer-motion/m";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

const line = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const reveal = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" }
  }
};


const glowCard = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

const FoundingGrowthRole: React.FC = () => {

const text = [
    `If you've ever dreamed of building something that will change how the world loves, befriends, bonds, creates, and collaborates, this is your shot.`,

    `We're creating a new emotional operating system for how humans connect and flourish together. The old systems are broken. The new ones haven't been built yet. This is that liminal moment where everything is possible, where a small team with the right vision and execution can shape what comes next for billions of people.`,

    `This role is for a person with a special set of attributes - the person who reads this and feels it in their chest. Who recognizes that this is exactly what they've been waiting for or preparing for. Who sees the enormity of what we're attempting and thinks: "yes, this, now."`
  ];

const points = [
    `<strong>You're a world-class storyteller.</strong> Not just good at it, but someone who loves connecting with people through stories. You're comfortable picking up a camera and captivating audiences. You have strong taste and aesthetics. Everything else in this role is downstream of this.`,

    `<strong>You're deeply creative. </strong> The market is saturated.There are infinite products, infinite stories. We need lateral thinking, divergent approaches. Creative content strategies and growth strategies. Smart user acquisition tactics that don't rely on paid marketing. Creativity is not optional here. It's the core requirement.`,

    `<strong>You understand the gravity of this moment. </strong> You're deeply passionate about the problem space we're tackling. You feel it in your bones that if we don't get this right now, we might never get the chance to get it right again. You bring urgency, energy, and passion to the table every day. For you, this is more than work. This is a mission you own deeply.`,

    `<strong>You're intrinsically motivated.  </strong>Not purely by the financial aspect, though that matters. But by the deeply human impact we could create if we actualize this vision. You own the work, the mission, and you move with conviction.`,

    `<strong>You're obsessed with human connection. </strong>Romantic, platonic, collaborative. You love the stories behind relationships and the idea of fostering deeply meaningful connections between people. You love people, and you can’t get enough of the beauty of the human soul.`,

    `<strong>You're a deep-feeler and sharp thinker. </strong>You understand emotion, behavior, meaning-making, and energy. You believe in the potential of aligned AI to help people live more conscious, connected lives.`,

    `<strong>You've done growth before. </strong>User acquisition, partnerships, content. But you want to do it with heart this time. You're full of drive, ideas, energy, and execution chops. You don't wait for permission.`,

    `<strong>You'd rather build something that matters deeply than just chase metrics.</strong> You're ready to break rules, not follow them.`
  ];

   const paragraphs = [
    `We're launching in 15 days across NYC and London. We're planning to fundraise in one to two months. The moment is serious. Tectonic shifts are happening, and we might be trending toward dystopic futures - pardon the seeming hyperbole. This is urgent. It has never been more so.`,

    `Elinity moves beyond the traditional connection paradigm into something people will use as their relationship flourishing buddy for years to come. We have a suite of connection-oriented games, smart voice journaling, reflections, and AI coaching built in. We're not just matching people. We're helping them thrive together over time.`,

    `The world is breaking down socially. Loneliness and low relationship satisfaction are epidemic. Algorithms are shallow. Tech is anxiety-inducing - even parasitic. UX is hijacking our dopamine systems, frying our meaning circuitry, pushing us toward a simulacra.`,

    `We're building the antidote. A place where depth wins over breadth. Where meaning wins over metrics. Where conscious connection wins over mindless consumption.`
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%,#1a103d,transparent 40%), radial-gradient(circle at 80% 0%,black,transparent 40%), #07071c",
        color: "#fff",
        padding: "100px 20px",
        overflow: "hidden"
      }}
    >
      {/* floating gradient orb */}
            <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          position: "fixed",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle,#7c3aed55,transparent)",
          filter: "blur(120px)",
          top: -150,
          left: -150,
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="show"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={container}
        style={{
          maxWidth: 900,
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        <div className="pt-32"></div>
<motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{
        scale: 1.015,
        translateY: -5,
        borderColor: "rgba(176, 102, 254, 0.5)",
        boxShadow: "0 40px 120px rgba(176, 102, 254, 0.15), 0 0 0 1px rgba(176, 102, 254, 0.2)"
      }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        padding: "70px 60px",
        borderRadius: "40px",
        background: "radial-gradient(circle at top left, rgba(176, 102, 254, 0.08), transparent 40%), linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
        maxWidth: "900px",
        margin: "0 auto 60px auto",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
      }}
    >
      {/* GLOW DECORATION */}
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-10%",
        width: "300px",
        height: "300px",
        background: "rgba(176, 102, 254, 0.05)",
        filter: "blur(100px)",
        borderRadius: "50%",
        pointerEvents: "none"
      }} />

      {/* TITLE */}
      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 850,
          lineHeight: 1.05,
          marginBottom: "26px",
          background: "linear-gradient(135deg, #fff 40%, #b066fe 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.04em",
          textShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}
      >
        Founding Growth and <br /> Content Lead - Elinity
      </h1>

      {/* INTRO */}
      <p
        style={{
          fontSize: "20px",
          color: "rgba(255,255,255,0.85)",
          lineHeight: "1.8",
          marginBottom: "40px",
          fontWeight: "400",
          maxWidth: "780px",
          letterSpacing: "-0.01em"
        }}
      >
        We're building the first truly intelligent social and relationship
        platform, powered by emotionally intelligent AI that understands you
        in all your richness. And we need someone who recognizes the gravity
        of this moment.
      </p>

      {/* DIVIDER */}
      <div
        style={{
          height: "1px",
          width: "100%",
          background: "linear-gradient(to right, rgba(176, 102, 254, 0.6), rgba(176, 102, 254, 0.1) 50%, rgba(255,255,255,0.02) 100%)",
          margin: "48px 0"
        }}
      />

      {/* META INFO GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "32px",
        }}
      >
        {[
          { label: "📍 Location", val: "New York City (Hybrid)" },
          { label: "🕒 Type", val: "Full-Time" },
          { label: "🏠 Home", val: "elinity.ai" }
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                color: "#b066fe",
                letterSpacing: "0.2em",
                fontWeight: "800",
                opacity: 0.9
              }}
            >
              {item.label.split(" ")[1]}
            </span>
            <span style={{ fontSize: "16px", color: "#fff", fontWeight: "600", opacity: 0.95 }}>
              {item.val}
            </span>
          </div>
        ))}
      </div>

      {/* APPLY BUTTON */}
      <div style={{ marginTop: "64px", textAlign: "left", zIndex: 2, position: "relative" }}> 
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@elinity.ai&su=Application for Founding Growth and Content Lead"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: "0 15px 50px rgba(176,102,254,0.6)" }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: "20px 48px",
            borderRadius: "100px",
            background: "linear-gradient(90deg, #b066fe, #8b5cf6)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "17px",
            textDecoration: "none",
            boxShadow: "0 12px 40px rgba(176,102,254,0.3)",
            display: "inline-block",
            transition: "all 0.3s ease",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          Apply for this Role
        </motion.a>
      </div>
    </motion.div>
        {/* SECTION CARDS */}
        {[
          {
            title: "The Mission That Matters The Most",
            text: `Help seed the most important mission of all: helping people find their most resonant people and build extraordinary relationships.

In a time of social breakdown, loneliness, shallow algorithms, tech anxiety, and dopamine-hijacking UX, we're crafting something radically different. A place for meaning-making, not mindless swiping. An AI that knows you deeply, not just your surface self, so it can serve you deeply. Tools not just to match but to nurture, sustain, and grow relationships with our relationship thriving suite.

We're creating a new emotional operating system for how humans connect and flourish together. From romantic connections to collaborators and lifelong friends, Elinity helps people find their tribe and flourish together. This isn't another connection app. This is a movement, a platform, and a reimagining of how humans find each other and build deeply fulfilling relationships across love, leisure, and collaborations.

A new rhythm of connection: slower, deeper, more conscious, more human.`
          },
          {
            title: "Why This Role Is Mission-Critical",
            text: `
This is our first hire. There are only two core functions in any company. Building the thing you want to serve people with. And reaching the people so you can actually serve them. You'll own the second function.

The nature of reaching people has fundamentally changed. It's no longer about marketing campaigns or ad spend or traditional PR. It's about storytelling - the better our stories, in terms of cultural congruence, the better our growth outcomes. For us, content and growth aren't separate functions. They're the same thing. Because we plan to grow almost entirely organically. No Meta ads, no Google ads, no paid marketing playbook. Just pure, earned, creative, community-driven growth. Hence why we have combined the growth and content roles into one.

Your job is to help Elinity reach our first 500,000 users through the power of compelling stories, creative strategy, and passionate execution. 
`
          }
        ].map((sec, i) => (
          <motion.div
            key={i}
            variants={glowCard}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{ scale: 1.02 }}
            style={{
              marginBottom: 60,
              padding: 40,
              borderRadius: 26,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
            }}
          >
            <h2 style={{ fontSize: 26, marginBottom: 16,
              
      background: "linear-gradient(to right, #fff 30%, #b066fe 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
             }}>{sec.title}</h2>
            <p style={{ lineHeight: 1.9, opacity: 0.9, whiteSpace: "pre-line" }}>
              {sec.text}
            </p>
          </motion.div>
        ))}

        {/* SECTION CARDS */}
        {[
          {
            title: "How Do We Get To Our First 500k ",
            text: `
<strong style="color:white; font-size:20px">User Acquisition & Early Growth Strategy </strong>

Architect and execute our user acquisition plan across NYC and major US cities beyond. Hustle, test, and creatively break through the noise to get our first 100K passionate users who genuinely love what we're building. Leverage post-grad student hubs, communities, offline events, partnerships, and influencer relationships. Get scrappy. Get creative. Get it done.

<strong style="color:white; font-size:20px">Influencer & Partnership Marketing</strong>

Identify and collaborate with creators in the relationships, psychology, and storytelling spaces. Form value-aligned partnerships with communities, brands, universities, events, and content networks. Find the people who share our vision and turn them into evangelists.

<strong style="color:white; font-size:20px">Content & Storytelling</strong>

Build and own Elinity's early content and storytelling engine, both short-form and long-form. Create magnetic narratives, campaigns, and series that make people feel something real and act on it. Craft social stories, reels, experiments, and narratives that make waves.

Here's what's different: we're not creating playful content or fun content or entertainment content. A lot of our content is going to be deeply thought-provoking. We want to create provocative content that seeds ideas, gets people asking questions, discussing possibilities. We want high-quality signal in a world drowning in hype slop, and doom slop.

Our sci-fi-esque content about the near future will pose real questions, not the sensationalist exaggerated threats, the way, say, a Black Mirror does it. Where are we headed? What are the risks we face? What kind of world do we want to build? What do we need to build that world? Talking about the real concerns that we must get ahead of. 

<strong style="color:white; font-size:20px">The Elinity Podcast Series</strong>

A key part of our content strategy is the Elinity Podcast, where we'll invite thinkers and builders to discuss ideas we feel more and more people should think about. We will have a frequent in-person company pod, for conversations about how we're building the company, the decisions we make, the choices that shape the future of relationship infrastructure. We're building in public because we're building for the public, and for generations that don't exist yet but are constantly in our minds.

We'll talk about the post-AGI world and the challenges we should get ahead of. The intersection of AI and relationships. Flourishing and designing companies for the future. How to be your own person in a world of strong forces pulling you in all directions. You'll occasionally co-facilitate these conversations, both with people inside the company and thought leaders beyond it who share our perspective

<strong style="color:white; font-size:20px">Creative Experiments & Growth Hacking</strong>

Be an idea machine. Launch weekly creative experiments, both offline and online. Test formats, copy, videos, voice drops, referral loops, guerrilla activations, creative PR. Go wild. The old playbook doesn't work, and we're not interested in following it anyway. Distribution has become the biggest bottleneck, and we don’t intend to grow through ads, period, so your job is to crack it through pure creativity.

<strong style="color:white; font-size:20px">Brand Evangelism & Community Cultivation</strong>

Be a living embodiment of Elinity's ethos: intentional connection, depth, care, and human aliveness. Build and nurture a founding community that spreads Elinity's vibe like wildfire. This is earned growth, not bought growth. Community-driven, not algorithm-driven.
`
          }
        ].map((sec, i) => (
          <motion.div
            key={i}
            variants={glowCard}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{ scale: 1.02 }}
            style={{
              marginBottom: 60,
              padding: 40,
              borderRadius: 26,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
            }}
          >
            <h2 style={{ fontSize: 36, marginBottom: 16,
              
      background: "linear-gradient(to right, #fff 30%, #b066fe 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
             }}><strong>{sec.title}</strong></h2>
<p
  style={{ lineHeight: 1.9, opacity: 0.9, whiteSpace: "pre-line" }}
  dangerouslySetInnerHTML={{ __html: sec.text }}
/>
          </motion.div>
        ))}


        <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={container}
      style={{
        maxWidth: "900px",
        margin: "120px auto",
        padding: "60px 30px",
        borderRadius: "28px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        color: "#fff"
      }}
    >
      {/* title */}
      <motion.h2
        variants={line}
        style={{
          fontSize: "clamp(28px,5vw,44px)",
          fontWeight: 700,
          marginBottom: 60,
          lineHeight: 1.15,  
          background: "linear-gradient(to right,#fff,#b066fe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Who You Are (And This Is Non-Negotiable)
      </motion.h2>

      {/* paragraphs */}
      {points.map((text, i) => (
        <motion.p
          key={i}
          variants={line}
          style={{
            fontSize: "18px",
            lineHeight: "1.9",
            marginBottom: "28px",
            opacity: 0.9
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ))}
    </motion.section>


       <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      variants={container}
      style={{
        position: "relative",
        maxWidth: "950px",
        margin: "140px auto",
        padding: "80px 40px",
        borderRadius: "32px",
        background:
          "linear-gradient(180deg, rgba(176,102,254,0.12), rgba(0,0,0,0.6))",
        border: "1px solid rgba(176,102,254,0.3)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 60px 160px rgba(0,0,0,0.7)",
        color: "#fff",
        overflow: "hidden"
      }}
    >
      {/* subtle glowing background pulse */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle,#7c3aed44,transparent 70%)",
          top: -200,
          right: -200,
          filter: "blur(120px)",
          zIndex: 0
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Title */}
        <motion.h2
          variants={reveal}
          style={{
            fontSize: "clamp(30px,5vw,48px)",
            fontWeight: 900,
            marginBottom: 50,
            lineHeight: 1.2,
            background: "linear-gradient(to right,#ffffff,#b066fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          The Context You Need
        </motion.h2>

        {/* Paragraphs */}
        {paragraphs.map((text, i) => (
          <motion.p
            key={i}
            variants={reveal}
            style={{
              fontSize: "19px",
              lineHeight: "1.9",
              marginBottom: "32px",
              opacity: 0.92
            }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </motion.section>

    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={container}
      style={{
        position: "relative",
        maxWidth: 950,
        margin: "140px auto",
        padding: "80px 40px",
        borderRadius: 34,
        background:
          "linear-gradient(180deg, rgba(176,102,254,0.18), rgba(0,0,0,0.65))",
        border: "1px solid rgba(176,102,254,0.35)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 70px 180px rgba(0,0,0,0.7)",
        color: "#fff",
        overflow: "hidden"
      }}
    >
      {/* glow aura */}
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle,#b066fe55,transparent 70%)",
          filter: "blur(120px)",
          top: -250,
          right: -200,
          zIndex: 0
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* title */}
        <motion.h2
          variants={reveal}
          style={{
            fontSize: "clamp(32px,5vw,52px)",
            fontWeight: 900,
            marginBottom: 50,
            lineHeight: 1.15,
            background: "linear-gradient(to right,#ffffff,#c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Why Now? Why This?
        </motion.h2>

        {/* paragraphs */}
        {text.map((t, i) => (
          <motion.p
            key={i}
            variants={reveal}
            style={{
              fontSize: "19px",
              lineHeight: 1.95,
              marginBottom: 34,
              opacity: 0.95
            }}
          >
            {t}
          </motion.p>
        ))}
      </div>
    </motion.section>


        {/* FINAL BLOCK */}
<motion.div
  variants={glowCard}
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.35 }}
  whileHover={{ scale: 1.015 }}
  style={{
    position: "relative",
    padding: 60,
    borderRadius: 32,
    background:
      "linear-gradient(180deg,rgba(176,102,254,0.18),rgba(0,0,0,0.6))",
    border: "1px solid rgba(176,102,254,0.35)",
    marginBottom: 100,
    overflow: "hidden",
    boxShadow: "0 40px 120px rgba(0,0,0,0.6)"
  }}
>
  {/* animated glow pulse */}
  <motion.div
    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
    transition={{ duration: 6, repeat: Infinity }}
    style={{
      position: "absolute",
      width: 500,
      height: 500,
      borderRadius: "50%",
      background: "radial-gradient(circle,#b066fe55,transparent 70%)",
      filter: "blur(120px)",
      top: -200,
      left: -150,
      zIndex: 0
    }}
  />

  <div style={{ position: "relative", zIndex: 2 }}>
    <h2
      style={{
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 800,
        background: "linear-gradient(to right,#fff,#c084fc)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      Let's Build the Most Meaningful Movement of Our Generation
    </h2>

    <p style={{ lineHeight: 1.9, opacity: 0.95, fontSize: 18 }}>
      We're not interested in incremental improvements to broken systems - that won’t work. We see the damage in optimizing engagement metrics at the expense of human wellbeing, in apps that extract value from users' attention and relationships. Now is the moment to take a stand. 
    </p>
    <p style={{ lineHeight: 1.9, opacity: 0.95, fontSize: 18 }}>
      We're interested in fundamentally reimagining how humans find each other in a world where the old social structures have collapsed, and the new ones haven't emerged yet, pregnant with the potential to be shaped for long-term flourishing. We're interested in building tools that help people flourish together, not just match. We're interested in creating something that makes the world more connected, more conscious, more alive.
    </p>
    <p style={{ lineHeight: 1.9, opacity: 0.95, fontSize: 18 }}>
      This is earned growth. Creative growth. Community-driven growth. Growth with integrity and soul. Growth that comes from telling stories so compelling, building experiences so valuable, creating a vision so clear that people can't help but want to be part of it.
    </p>
    <p style={{ lineHeight: 1.9, opacity: 0.95, fontSize: 18 }}>
      If that's the kind of growth you want to do, if that's the kind of story you want to tell, if that's the kind of mission you want to own, then we need to talk.
    </p>
  </div>
</motion.div>
        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          style={{
            textAlign: "center",
            padding: 60,
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.03)"
          }}
        >
          <h2
            style={{
              fontSize: 34,
              marginBottom: 20,
              background: "linear-gradient(to right,#fff,#b066fe)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            🌀 Elinity. Find your people. Build your tribe.
          </h2>

          <p style={{ opacity: 0.85 }}>
            This is our first hire. Our most mission-critical role. The person who joins us here will shape how millions of people discover Elinity, understand what we're building, and decide to become part of this movement. That's not just a job - that's a legacy, and it could be yours.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FoundingGrowthRole;