"use client";

import React, { useEffect, useRef } from "react";

export default function DASPBusinessGuide() {
  const sparkLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;
      if (Math.random() > 0.75) return;

      const dot = document.createElement("span");
      dot.className = "theme-spark";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const colors = ["#22d3ee", "#38bdf8", "#6366f1"];
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
    <section className="relative min-h-screen px-6 py-20 overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#ecfeff] to-[#eef2ff]">

      {/* Mouse sparks */}
      <div ref={sparkLayer} className="absolute inset-0 pointer-events-none z-20" />

      {/* Glass container */}
      <div
        className="
          relative z-10
          max-w-5xl mx-auto
          rounded-[28px]
          px-8 sm:px-12 md:px-16 py-16
          bg-white/40 backdrop-blur-2xl
          border border-white/50
          shadow-[0_80px_180px_rgba(30,64,175,0.15)]
        "
      >
        {/* Glass overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/30" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/35 via-transparent to-white/10" />

        {/* Top dots */}
        <div className="mb-10 flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/65" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        </div>

        {/* CONTENT */}
        <div className="max-w-3xl mx-auto text-gray-900 space-y-16 leading-relaxed">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">Deckoviz DASP Enterprise Guide</h1>

          <p className="text-xl font-medium">
            Designing Intelligent, Experiential, Brand-Infused Physical Spaces
          </p>

          <p className="text-lg text-slate-700 leading-relaxed">Physical spaces are having an identity crisis.</p>

          <p className="text-lg text-slate-700 leading-relaxed">
            Screens are present, yet most say nothing meaningful.<br />
            Walls are filled, yet generic and barely few are remembered.<br />
            Ambiance exists, yet it rarely feels intentional or warm.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed">
            At the same time, enterprises are under more pressure than ever.
            Attention is shrinking and being pulled in all directions, while the desire
            for meaningful experiences is increasing. Digital convenience has raised
            expectations. Customers, guests, and visitors no longer compare your space
            only to your competitors. They compare it to the best experiences they’ve
            had anywhere.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed">Deckoviz was built for this moment.</p>

          <p className="text-lg text-slate-700 leading-relaxed">
            Deckoviz is a Dynamic Art & Space Platform (DASP) for enterprises.
            It transforms physical environments into living, adaptive, brand-expressive
            systems that can create, curate, and orchestrate visuals, stories, ambiance,
            and interactive experiences in real time.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed">
            This is not merely smart digital signage or a content management system,
            or a static display network.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed">
            Deckoviz is a reimagined spatial intelligence layer for enterprises,
            a generative, intelligent layer for physical spaces, designed to help
            businesses:
          </p>

          <ul className="space-y-3 pl-4">
            <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Tell richer brand stories</li>
            <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Create emotional resonance at scale</li>
            <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Increase dwell time and memorability</li>
            <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Reduce operational friction in content creation</li>
            <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Turn spaces into experiences</li>
          </ul>

          <p className="text-lg text-slate-700 leading-relaxed">
            Below is a deep dive into the 12 core enterprise feature suites or pillars,
            with real, high-leverage use cases that show how Deckoviz changes not just
            how spaces look, but how they work and how they feel.
          </p>

        {/* ===================== 1 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">1. Core Generative Engine</h2>
        <p className="font-semibold">Instant creation for physical environments</p>

        <p className="text-lg text-slate-700 leading-relaxed">
          At the heart of Deckoviz lies a powerful, enterprise-ready generative engine
          built specifically for large screens, public spaces, and branded environments.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">This engine enables businesses to generate:</p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Art, visuals, posters, signage, menus</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Product imagery and styled product shots</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Motion loops, ambient videos, and short films</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Audio-reactive visuals and music-driven experiences</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">
          All of this can be created in seconds, directly from prompts, brand assets,
          product photos, or simple descriptions, and displayed instantly on Deckoviz Frames.
        </p>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A restaurant group updates daily specials across locations without printing menus</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail chain launches a campaign visually in every store the same morning</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel replaces lobby art with evolving, seasonally adaptive visuals</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A real estate showroom generates localized visuals for each development</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Traditional content pipelines are slow, expensive, and brittle. They require designers,
          agencies, approvals, and production cycles that simply don’t match the pace of modern
          business.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
          Deckoviz collapses that entire pipeline into a living creative engine, giving enterprises
          speed, consistency, and creative freedom without sacrificing quality.
        </p>

        {/* ===================== 2 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">2. Product & Offering Display Enhancer</h2>
        <p className="font-semibold">Make products feel desirable, alive, and premium</p>

        <p className="text-lg text-slate-700 leading-relaxed">
          How a product is presented shapes how it is valued.
          Deckoviz dramatically upgrades product and offering presentation through AI-enhanced
          visuals and animations.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">Businesses can take a single product photo and transform it into:</p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Professional, studio-quality imagery</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Contextual lifestyle visuals</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Subtle motion loops and cinematic animations</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Visual narratives showing usage, texture, and detail</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">
          No photoshoots. No models. No reshoots. No equipment.
        </p>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A restaurant animates dishes gently, highlighting ingredients and plating</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A fashion store shows garments worn in different contexts without mannequins</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel spa visualizes treatments through calming, abstract product stories</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A luxury retailer displays craftsmanship details dynamically on walls</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Static product displays fade into the background. Dynamic, tasteful motion draws
          attention naturally, without being intrusive.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
          Deckoviz turns walls into silent sales assets that elevate perceived quality,
          reduce marketing friction, and let offerings speak for themselves.
        </p>
        {/* ===================== 3 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">3. AI Video Creation & Display Suite</h2>
        <p className="font-semibold">Cinematic storytelling, without production overhead</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Video is the most powerful medium for storytelling, but also the most expensive
        and operationally complex.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">Deckoviz changes that.</p>

        <p className="text-lg text-slate-700 leading-relaxed">Enterprises can create and display:</p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>In-store product ads and apple-esque video ads</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Brand films or origin stories</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Short lifestyle or usage videos</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Campaign visuals and launch content</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">
        These videos can be generated, refined, and looped directly within the platform,
        designed specifically for ambient, in-space viewing, not noisy advertising.
        </p>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A café runs subtle, cinematic visuals of coffee being crafted</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail store plays brand films that set tone without demanding attention</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel lobby shows slow, atmospheric destination stories</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A flagship store launches new collections visually overnight</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        High-quality video used to be episodic. With Deckoviz, it becomes continuous,
        ambient, and adaptive, enhancing experience rather than interrupting it.
        </p>

        {/* ===================== 4 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">4. Dynamic, Intelligent Ambiance & Mood Control</h2>
        <p className="font-semibold">Spaces that adapt, not stagnate</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Most spaces feel the same at 9am as they do at 9pm. Humans don’t.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz allows enterprises to design time-aware, context-aware, persona-aware
        environments that shift automatically based on:
        </p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Time of day and day of week</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Seasonality and special occasions</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>User personas and frequent visitors</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Events, holidays, and service phases</li>
        </ul>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Restaurants shift from energetic brunch visuals to intimate dinner moods</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Hotels adjust lobby ambiance for arrivals, evenings, and late nights</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Retail stores adapt visuals based on traffic flow and promotions</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Offices create calmer evening environments and energetic mornings</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        Ambiance affects behavior, dwell time, and emotional state. When done well,
        it feels invisible. When ignored, it feels off.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz makes ambiance a designed system, not a static setting.
        </p>

        {/* ===================== 5 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">5. Custom & Brand-Themed Generative Art</h2>
        <p className="font-semibold">Art that belongs to your business</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Generic decor signals generic thinking.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz enables enterprises to create custom generative art systems that reflect:
        </p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Brand colors and visual language</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Company ethos and values</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Location, culture, or architectural context</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Seasonal or campaign themes</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">
        These artworks evolve continuously while remaining unmistakably on-brand.
        </p>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hospitality group creates location-specific art for each property</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A brand visualizes its mission through evolving abstract systems</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A corporate lobby reflects company culture without logos or slogans</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail brand reinforces identity subtly through art, not ads</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        Art communicates values faster than words. When it’s authentic and intentional,
        it becomes a quiet differentiator.
        </p>

        {/* ===================== 6 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">6. Immersive, Experiential Space Creation</h2>
        <p className="font-semibold">Turning visits into journeys</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz enables enterprises to move from spaces to experiences.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        By combining visuals, motion, music, narration, and personalization,
        businesses can orchestrate environments that feel cinematic, intentional,
        engaging, immersive, and memorable.
        </p>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A restaurant takes guests through the story of its cuisine</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel immerses guests in a sense of place from the moment they enter</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail store transforms shopping into exploration</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A flagship space becomes a destination, not just a store</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        In an era of infinite choice, experience is what people remember,
        talk about, and return for.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz gives enterprises the tools to design memory, not just decor.
        </p>

        {/* ===================== 7 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">7. Personalized Guest & Customer Mementos</h2>
        <p className="font-semibold">Turning moments into artifacts people keep</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Most customer experiences disappear the moment someone walks out the door.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz changes that by enabling enterprises to create personalized,
        shareable mementos for guests in real time.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">These are emotional artifacts.</p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Personalized artworks featuring guests</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Stylized visuals of their visit, purchase, or meal</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Custom farewell visuals with messages</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Branded memory pieces shared instantly to phones</li>
        </ul>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A restaurant creates a painterly artwork of a couple at their table</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel gifts guests a visual memory of their stay on checkout</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail store shares a stylized image of a customer wearing their purchase</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A luxury brand sends a personalized visual after a flagship visit</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        People forget transactions. They remember moments.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        These mementos extend the experience beyond the space,
        drive organic social sharing, build emotional attachment,
        and increase repeat visits without discounts.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz turns customers into carriers of your brand story.
        </p>

        {/* ===================== 8 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">8. AI Marketing & Campaign Material Creator</h2>
        <p className="font-semibold">Marketing that updates itself</p>

        <p className="text-lg text-slate-700 leading-relaxed">Marketing content in physical spaces is usually:</p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Expensive to produce</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Slow to update</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Visually inconsistent across locations</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz replaces this with a real-time, on-brand marketing creation system.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">Enterprises can instantly generate:</p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Posters, menus, signage, and announcements</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Campaign visuals and launch materials</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Motion-based promotions and loops</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Text + visual combinations, fully branded</li>
        </ul>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail chain launches localized promotions per store</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A restaurant updates menus instantly across locations</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel promotes seasonal offers without printing anything</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A brand tests visual campaigns live, in-space</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        Marketing becomes adaptive instead of static.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz enables enterprises to remove dependency on agencies,
        maintain brand consistency at scale,
        and respond to real-world conditions in real time.
        </p>

        {/* ===================== 9 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">9. Dynamic, Intelligent Signage & Information Systems</h2>
        <p className="font-semibold">From static signs to living information</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Static signage is blind. It cannot adapt, learn, or respond.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz replaces traditional signage with intelligent,
        evolving visual systems that can update instantly and adapt contextually.
        </p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Menus and specials</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>QR-driven interactions</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Event announcements</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Wayfinding and guidance</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Merchandising highlights</li>
        </ul>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A restaurant highlights dishes based on time of day</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel adapts signage based on occupancy and events</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail store updates merchandising visuals dynamically</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A corporate lobby displays live, branded information</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        When information adapts, friction disappears.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz turns signage into a responsive interface, not a fixed message.
        </p>

        {/* ===================== 10 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">10. AI Enterprise Assistant Suite (Vizzy)</h2>
        <p className="font-semibold">From display to brand intelligence</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        This is where Deckoviz crosses a special threshold.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        The AI Enterprise Assistant Suite transforms Deckoviz from a visual platform
        into a multimodal, enterprise-aware intelligence layer that lives inside your space.
        </p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Answer questions conversationally</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Explain products, dishes, or services</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Tell brand stories visually and verbally</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Entertain, guide, and assist guests</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Generate visuals dynamically during interactions</li>
        </ul>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Hotel guests ask about amenities and receive visual explanations</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Retail customers get personalized recommendations</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Museums offer interactive, visual storytelling</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Corporate lobbies provide intelligent introductions</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        This turns AI from a novelty into a living brand representative.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">Vizzy becomes:</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Your storyteller</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Your guide</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Your concierge</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Your brand voice and evangelist</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">
        At scale, this redefines customer engagement.
        </p>

        {/* ===================== 11 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">11. Avatars, Narration & Interactive Characters</h2>
        <p className="font-semibold">Giving your brand a face and a voice</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Humans connect to personalities, not interfaces.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Deckoviz enables enterprises to deploy avatars and narrators that represent
        the brand in expressive, interactive ways.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">These avatars can:</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Greet and entertain guests</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Narrate collections or menus</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Guide, explain, or entertain</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Respond via voice, text, and visuals</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">Avatars can be:</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Human-like</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Mascots</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Stylized characters</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Brand-specific creations</li>
        </ul>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A restaurant greets guests with a warm, branded character</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A hotel lobby uses narration for cultural storytelling</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A retail store educates customers interactively</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>A family venue engages kids through playful avatars</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p className="text-lg text-slate-700 leading-relaxed">
        Avatars humanize technology.
        </p>

        <p className="text-lg text-slate-700 leading-relaxed">
        They transform screens into social entities,
        making interactions feel natural and memorable.
        </p>

        {/* ===================== 12 ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">12. Enterprise Ecosystem & Advanced Capabilities</h2>
        <p className="font-semibold">Everything else that makes it powerful at scale</p>

        <p className="text-lg text-slate-700 leading-relaxed">
        Beyond the core suites, Deckoviz offers a growing ecosystem of advanced
        enterprise capabilities, including:
        </p>

        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Guest persona profiles and memory across visits</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Social proof walls displaying reviews and testimonials</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>AI-generated custom brand music and soundscapes</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Multisensory experiences with synced lighting and scent</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Interactive guest contribution walls via QR or app</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Marketplace inspiration and brand asset reuse</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Smart TV functionality for events and broadcasts</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Deckoviz Wall for fully immersive environments</li>
        </ul>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Personalized recognition for repeat guests</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Immersive themed dining or retail experiences</li>
        </ul>


        {/* ===================== Closing Perspective ===================== */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 pt-12">Closing Perspective</h2>

        <p className="text-lg text-slate-700 leading-relaxed">Deckoviz is not about adding screens.</p>

        <p className="text-lg text-slate-700 leading-relaxed">
          It is about making spaces expressive, intelligent, and alive.
        </p>

        <p className="font-semibold">For enterprises, this means:</p>
        <ul className="space-y-3 pl-4">
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Stronger brand memory</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Deeper emotional connection</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Higher engagement without friction</li>
          <li className="flex gap-3 items-start">
<span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Experiences that scale without losing soul</li>
        </ul>

        <p className="text-lg text-slate-700 leading-relaxed">
          Physical spaces are no longer static.
          With Deckoviz, they finally behave like the living systems they were meant to be.
        </p>

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
