"use client";

import React, { useEffect, useRef } from "react";

export default function DASPGuide() {
  const sparkLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;
      if (Math.random() > 0.75) return;

      const dot = document.createElement("span");
      dot.className = "theme-spark";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const colors = ["#ec4899", "#d946ef", "#a855f7"];
      const picked = colors[Math.floor(Math.random() * colors.length)];
      dot.style.background = picked;
      dot.style.boxShadow = `0 0 18px ${picked}`;

      sparkLayer.current.appendChild(dot);
      setTimeout(() => dot.remove(), 1100);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      className="
        relative min-h-screen px-6 py-20 overflow-hidden
        bg-gradient-to-br from-[#fbcfe8] via-[#e9d5ff] to-[#f5d0fe]
      "
    >
      {/* Mouse sparks */}
      <div
        ref={sparkLayer}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Background fog */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-pink-200/40 blur-[75px]" />
        <div className="absolute top-20 left-28 h-[360px] w-[360px] rounded-full bg-fuchsia-200/40 blur-[85px]" />
        <div className="absolute -top-20 right-0 h-[520px] w-[520px] rounded-full bg-purple-200/40 blur-[90px]" />
        <div className="absolute -bottom-40 left-10 h-[520px] w-[520px] rounded-full bg-pink-300/35 blur-[95px]" />
      </div>

      {/* Floating shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-16 top-24 h-[220px] w-[220px] rounded-full bg-white/25" />
        <div className="absolute left-[45%] top-24 h-[90px] w-[90px] rounded-full bg-white/20" />
        <div className="absolute left-24 top-[52%] h-[120px] w-[120px] rotate-12 rounded-[36px] bg-white/15" />
        <div className="absolute right-20 top-[38%] h-[130px] w-[130px] rounded-full bg-white/18" />
        <div className="absolute right-24 top-44 h-[55px] w-[55px] rounded-full bg-fuchsia-300/50" />
      </div>
      {/* Glass container */}
      <div
        className="
          relative z-10
          max-w-5xl mx-auto
          rounded-[28px]
          px-8 sm:px-12 md:px-16 py-16
          bg-white/22 backdrop-blur-[24px]
          border border-white/35
          shadow-[0_60px_160px_rgba(88,28,135,0.18)]
        "
      >
        {/* Glass overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/25" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 via-transparent to-white/10" />

        {/* Top dots */}
        <div className="mb-10 flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        </div>

        <div className="max-w-4xl mx-auto space-y-20">
          <div className="max-w-4xl mx-auto space-y-20">

  <div className="space-y-6">
    <h1 className="text-4xl md:text-5xl font-bold text-center">
      The Deckoviz Thesis
    </h1>

    <p className="text-gray-700 font-medium">
      On Living Spaces, Emotional Design, and the Future of the Wall
    </p>

     <div className="h-12" />
  </div>

  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Cultural Thesis</h2>
    <h3 className="text-xl font-semibold">On Living Spaces</h3>

    <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
      <p>For centuries, walls have held static art.<br/>Frames preserved moments.<br/>Screens delivered content.</p>

      <p>Paintings were fixed.<br/>Photographs froze time.<br/>Televisions broadcast what others created.</p>

      <p>The wall has always been a surface of display.</p>

      <p>But human life is no longer static, no longer beholden to the limitations of yesterday.</p>

      <p>Our moods shift.<br/>Our tastes evolve.<br/>Our identities expand.<br/>Our memories accumulate.<br/>Our imagination moves constantly between past, present, and possible futures.</p>

      <p>We curate playlists that change by the hour.<br/>We refresh feeds that update by the minute.<br/>We capture thousands of moments that never make it to print.</p>

      <p>Yet the largest surfaces in our homes remain silent and still.</p>

      <p>We believed this cultural mismatch would not last.</p>

      <p>As life becomes more dynamic, the spaces that surround us must become dynamic too. The wall is not just architecture. It is atmosphere. It shapes how we feel without announcing itself. It influences energy, focus, calm, creativity, nostalgia, ambition.</p>

      <p>We built Deckoviz because walls should no longer be passive backdrops. They should move with us and they should move us.</p>

      <p>That is what Deckoviz is an emotionally intelligent canvas that learns, adapts, and evolves. Turning space into something alive.</p>

      <p>This is a portal, and the beginning of a new relationship between you and your space.</p>
    </div>

     <div className="h-12" />
  </div>

  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Mind Design & World Design Thesis</h2>
    <h3 className="text-xl font-semibold">Why We Built Deckoviz</h3>

    <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
      <p>Homes shape consciousness and experience more than we realize.</p>

      <p>Light affects mood.<br/>Color alters perception.<br/>Texture changes warmth.<br/>Imagery influences memory and emotion.</p>

      <p>Design is psychology embedded in space.</p>

      <p>And yet most homes rely on static visual anchors. A painting hung once. A photograph framed and forgotten. A television screen used only for consumption.</p>

      <p>We believe art should be dynamic, evolving, attuned to you.<br/>That personalization should be deep.<br/>And intelligence should be ambient, not intrusive.</p>

      <p>Intelligence in the home should not shout. It should not demand attention. It should quietly adapt with subtle shifts, gradual evolution, and emotional attunement.</p>

      <p>Deckoviz was created to merge art, storytelling, memories, an AI home companion, and design into a single living surface. As a canvas that learns your taste. A system that understands your patterns, your beliefs, and your aspirations. A frame that evolves with your life.</p>

      <p>Not as decoration, or as a display, or for content consumption, but as a living, growing, evolving canvas, becoming the emotional operating system of your home.</p>

      <p>As a surface that reflects your inner world back to you.<br/>As a space that breathes with your memories, moods, and imagination.</p>

      <p>We did not want to add another device to the home or merely upgrade the wall.<br/>We wanted to elevate the space itself.</p>
    </div>

     <div className="h-12" />
  </div>

  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Foundational Technology Thesis</h2>
    <h3 className="text-xl font-semibold">A New Category for the Wall</h3>

    <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
      <p>Technology has reshaped nearly every major object in modern life.</p>

      <p>Phones became smart.<br/>Cars became intelligent.<br/>Workspaces became connected.</p>

      <p>But the wall, the most expansive surface in the home, remained unchanged, unyielding, unmoving.</p>

      <p>It holds art. It holds screens. But it does not understand.</p>

      <p>We approached this from first principles.</p>

      <p>What if your walls could recognize your patterns, reflect your beliefs, and your moods?<br/>What if art could evolve with your emotional state?<br/>What if memory, storytelling, generative creativity, and ambient intelligence could coexist in one seamless form?</p>

      <p>From that inquiry emerged a new category the emotionally intelligent dynamic art frame.</p>

      <p>Deckoviz is the world's first emotionally intelligent dynamic art frame moving beyond the content display paradigm, into something that is an adaptive, evolving visual experience that responds to you.</p>

      <p>It integrates generative AI, deep personalization, storytelling systems, and refined design into one continuous living interface. It is ambient intelligence embedded into architecture.</p>

      <p>It is a shift from static surfaces to responsive environments.<br/>From passive walls to adaptive presence.</p>

      <p>This is the beginning of a broader transformation. Homes will not simply contain technology.<br/>They will sense, adapt, and co-create with us.</p>

      <p>Deckoviz is the first expression of that future of home living.</p>

       <div className="h-12" />

      <p>Innovation is easy to dismiss as novelty.</p>
      <p>But inevitability feels different.</p>

      <p>As life becomes more fluid, identity more layered, and creativity more accessible, the static wall will become an artifact of a slower era.</p>

      <p>Emotionally intelligent environments are not an indulgence. They are the natural next step in human-centered design.</p>

      <p>Deckoviz exists because the static wall and home were overdue for reinvention.</p>

      <p>And this is only the beginning the beginning of a world where our AIs, our space companions, reflect our hopes and dreams, our values and our concerns, and help us shape spaces, both internal and external, that lead to flourishing at our deepest core.</p>
    </div>
  </div>

  <div className="space-y-6">
    <h2 className="text-2xl font-bold">About Us</h2>
    <h3 className="text-xl font-semibold">We Are Building Living Environments</h3>

    <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
      <p>Most spaces are silent, static, indifferent.</p>

      <p>Walls do not evolve.<br/>Art does not adapt.<br/>Homes do not understand who you are becoming.</p>

      <p>We are changing that.</p>

      <p>Deckoviz exists to transform physical space into something alive.<br/>Responsive.<br/>Emotionally intelligent.<br/>Deeply personal.</p>

      <p>We believe the environments we inhabit shape our energy, our thinking, our relationships, and ultimately our lives.</p>

      <p>So we are building technology that does not just sit in your space.<br/>It collaborates with it.</p>
    </div>

     <div className="h-12" />
  </div>

  <div className="space-y-6">
    <h2 className="text-2xl font-bold">A New Category</h2>

    <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
      <p>Deckoviz is pioneering a new category AI-powered spatial intelligence.</p>

      <p>We are not building a screen.<br/>We are not building décor.<br/>We are building a living canvas that evolves with you.</p>

      <p>At the intersection of art, artificial intelligence, design, and emotional insight, our flagship product brings:</p>

      <ul className="list-disc pl-6 space-y-2 text-justify">
        <li>dynamic visual expression</li>
        <li>personalized generative art</li>
        <li>adaptive curation</li>
        <li>multisensory ambiance</li>
        <li>deep contextual intelligence</li>
      </ul>

      <p>into homes, offices, restaurants, hotels, wellness spaces, and beyond.</p>

      <p>Spaces should not just look beautiful.<br/>They should feel aligned.</p>
    </div>

     <div className="h-12" />
  </div>

  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Our Philosophy</h2>

    <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
      <p>Technology should elevate human experience.</p>

      <p>It should be beautiful.<br/>It should feel magical.<br/>It should enrich emotion.<br/>It should deepen intentional living.</p>

      <p>We believe that as AI becomes more powerful, taste matters more.<br/>As automation increases, meaning becomes more valuable.<br/>As the world accelerates, stillness and inspiration become strategic assets.</p>

      <p>We are building tools that help people live more expressively, more consciously, more joyfully.</p>
    </div>
  </div>
{/* ===================== What We Build ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">What We Build</h2>

   <div className="h-12" />

  <h3 className="text-2xl font-semibold">Deckoviz</h3>

  <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
    <p>
      Deckoviz is a personalized AI art frame that curates, creates, and evolves visual experiences based on your tastes, moods, goals, and inner world.
    </p>

    <p>
      It does not rotate static images.<br/>
      It evolves.
    </p>

    <p>
      It adapts hourly, daily, seasonally, or whenever you choose.
    </p>

    <p>
      It generates original artwork tuned to your aesthetic fingerprint.<br/>
      It curates collections that feel uncannily aligned.<br/>
      It transforms your walls into narrative, not decoration.
    </p>

    <p>Think of Deckoviz as:</p>

    <ul className="list-disc pl-6 space-y-2 text-justify">
      <li>art that grows with you</li>
      <li>ambiance that responds to you</li>
      <li>space that reflects your becoming</li>
    </ul>

    <p>
      Not static.<br/>
      Not generic.<br/>
      Not decorative for decoration’s sake.
    </p>

    <p>Alive.</p>
  </div>
</div>

{/* ===================== Our Technology ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">Our Technology</h2>

  <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
    <p>
      At the heart of Deckoviz lies a proprietary personalization architecture built to understand people, not just preferences.
    </p>

    <p>We model:</p>

    <ul className="list-disc pl-6 space-y-2 text-justify">
      <li>taste and aesthetic inclination</li>
      <li>emotional rhythms and moods</li>
      <li>intentions and goals</li>
      <li>creative impulses</li>
      <li>evolving identity</li>
    </ul>

    <p>
      Our AI does not just recommend.<br/>
      It learns.
    </p>

     <div className="h-12" />

    <p>
      It refines.<br/>
      It evolves alongside you.
    </p>

    <p>
      Through layered generative systems and adaptive curation engines, we:
    </p>

    <ul className="list-disc pl-6 space-y-2 text-justify">
      <li>generate original visuals</li>
      <li>create symbolic and abstract art</li>
      <li>adapt displays based on context</li>
      <li>pair visuals with atmosphere</li>
      <li>continuously refine personalization</li>
    </ul>

    <p>
      This is spatial intelligence designed for human depth.
    </p>
  </div>
</div>

{/* ===================== Beyond Deckoviz ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">Beyond Deckoviz</h2>

  <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
    <p>Deckoviz is the beginning.</p>

    <p>We are building an ecosystem.</p>

    <p>An ecosystem where:</p>

    <p>
      Homes become dynamic expressions of identity.<br/>
      Offices become environments of alignment and creativity.<br/>
      Restaurants and hotels become immersive emotional experiences.<br/>
      Public spaces become living storytelling mediums.
    </p>

    <p>
      We are expanding into modular visual walls, expressive robotic companions, dynamic sculptural forms, and next-generation ambient systems.
    </p>

    <p>Our ambition is generational.</p>

    <p>
      We are building a 100-year company focused on space, emotion, and human actualization.
    </p>
  </div>

   <div className="h-12" />
</div>

{/* ===================== Why This Matters ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">Why This Matters</h2>

  <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
    <p>
      In a world saturated with screens, we are designing meaning.
    </p>

    <p>
      In a world driven by productivity, we are elevating presence.
    </p>

     <div className="h-12" />

    <p>
      In a world where AI automates tasks, we are using AI to deepen humanity.
    </p>

    <p>
      We believe the future of technology is not colder.<br/>
      It is more expressive.<br/>
      More intentional.<br/>
      More alive.
    </p>
  </div>
</div>

{/* ===================== Who We Are ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">Who We Are</h2>

  <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
    <p>
      We are builders, designers, technologists, artists, and system thinkers.
    </p>

    <p>We care deeply about:</p>

    <ul className="list-disc pl-6 space-y-2 text-justify">
      <li>taste</li>
      <li>emotional intelligence</li>
      <li>long-term thinking</li>
      <li>product excellence</li>
      <li>human flourishing</li>
    </ul>

    <p>
      We are not optimizing for noise.<br/>
      We are building for depth.
    </p>
  </div>

   <div className="h-12" />
</div>

{/* ===================== The Future We See ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">The Future We See</h2>

  <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
    <p>We envision a world where:</p>

    <p>
      Your environment evolves with your growth.<br/>
      Your walls reflect your ambitions.<br/>
      Your space supports your relationships.<br/>
      Your home feels like a living extension of your inner world.
    </p>

    <p>
      Where technology and art are not separate.<br/>
      Where intelligence and beauty coexist.<br/>
      Where your surroundings participate in your story.
    </p>

    <p>
      We are building that world.
    </p>
  </div>

</div>
</div>
        </div>

              </div>

      {/* Spark styles */}
      <style>
        {`
          .theme-spark {
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            opacity: 0.85;
            animation: sparkFade 1.1s ease-out forwards;
          }

          @keyframes sparkFade {
            from { transform: scale(1); opacity: 0.9; }
            to { transform: scale(3.2); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
}
