"use client";

import React, { useEffect, useRef } from "react";

export default function PragmaticBuyerGuide() {
  const sparkLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return;
      if (Math.random() > 0.75) return;

      const dot = document.createElement("span");
      dot.className = "theme-spark";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const colors = ["#8b5cf6", "#a855f7", "#c026d3"];
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
    <>
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-pink-50 to-indigo-50">

      {/* Mouse sparks */}
      <div ref={sparkLayer} className="absolute inset-0 pointer-events-none z-20" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-violet-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.1),transparent_50%)]"></div>

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-600 shadow-lg shadow-violet-500/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        
        {/* Glass morphism container */}
        <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 lg:p-16">
          
          {/* Glass shine effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl shadow-inner shadow-violet-500/10 pointer-events-none"></div>
          
          <div className="relative space-y-12 leading-relaxed">
          
          {/* Header */}
          <div className="space-y-6 text-center relative">
            
            {/* Decorative elements */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Main title with multiple effects */}
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-600 blur-2xl opacity-20"></div>
              
              <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="inline-block bg-gradient-to-r from-violet-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  The Deckoviz Guide
                </span>
                <br />
                <span className="inline-block mt-2 bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]" style={{ animationDelay: '0.5s' }}>
                  for the <span className="italic bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent">Pragmatic</span>
                </span>
                <br />
                <span className="inline-block mt-2 bg-gradient-to-r from-pink-600 via-violet-500 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]" style={{ animationDelay: '1s' }}>
                  Enterprise Buyer
                </span>
              </h1>
            </div>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-400"></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 animate-pulse"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-400"></div>
            </div>
          </div>

          {/* Introduction */}
          <div className="space-y-6 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 rounded-3xl p-8 border border-violet-100/50">
            <p className="text-xl text-slate-700 leading-relaxed">
              This guide is for the rational buyer. The unsentimental one. The person who thinks in practicalities, costs, margins, retention, throughput, and ROI.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              This is for the enterprise buyer who may not care about art for art's sake. Who does not wake up thinking about stories, posters, or ambiance. Who is busy running a business, managing people, watching numbers, and trying to survive in an increasingly competitive, commoditized world.
            </p>

            <p className="text-2xl text-violet-900 leading-relaxed font-semibold text-center py-4">
              And yet.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              You might still be leaning toward Deckoviz because you understand something fundamental: that emotion sells, even when many businesses pretend it doesn't. That experience shapes memory, and memory shapes return behavior. That visuals, mood, and narrative quietly influence how long customers stay, how much they spend, what they remember, and whether they come back.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              You may or may not care about art. We know business is all-consuming. But you care about outcomes.
            </p>

            <p className="text-xl text-violet-900 leading-relaxed font-semibold text-center">
              This guide is written for that mindset.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                The Enterprise Reality: Static Environments Are Quietly Expensive
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Most enterprises underestimate how much they already spend on:
            </p>

            <div className="bg-white/60 rounded-2xl p-6 border border-violet-100">
              <ul className="space-y-3 text-lg text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>printing posters and signage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>seasonal decor</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>product and dish photography</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>videography</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>marketing creatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>models, photographers, agencies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>replacing outdated visuals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>managing multiple vendors</span>
                </li>
              </ul>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              These costs are fragmented, recurring, and rarely tracked as a single line item. But they add up.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              Deckoviz changes the equation by collapsing all of this into one evolving visual system.
            </p>

            <div className="bg-gradient-to-r from-violet-100 to-indigo-100 rounded-2xl p-6 border border-violet-200">
              <p className="text-xl text-violet-900 leading-relaxed font-semibold">
                For enterprises, Deckoviz is not about decoration. It is about eliminating friction, reducing recurring costs, and unlocking new revenue behaviors.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                One Frame, Infinite Outputs, Zero Marginal Cost
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              With Deckoviz, enterprises get:
            </p>

            <div className="bg-white/60 rounded-2xl p-6 border border-indigo-100">
              <ul className="space-y-3 text-lg text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>a continuously evolving ambiance at no incremental cost</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>instant creation of posters, signage, menus, promotions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>on-the-fly product and dish visuals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>high-quality in-store videos and ads</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>seasonal and time-of-day adaptations without reprinting or redecorating</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-100 to-indigo-100 rounded-2xl p-6 border border-indigo-200">
              <p className="text-xl text-indigo-900 leading-relaxed font-semibold text-center">
                No printing. No shipping. No storage. No waste.
              </p>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              One frame becomes:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 flex items-center gap-3">
                <span className="text-indigo-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a merchandising engine</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 flex items-center gap-3">
                <span className="text-indigo-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a marketing surface</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 flex items-center gap-3">
                <span className="text-indigo-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a storytelling medium</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 flex items-center gap-3">
                <span className="text-indigo-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a brand amplifier</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-100 to-indigo-100 rounded-2xl p-6 border border-violet-200">
              <p className="text-xl text-violet-900 leading-relaxed font-semibold text-center">
                And it updates instantly.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                Cost Replacement Is Only the First Layer
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Most enterprise buyers stop their analysis at cost replacement. That alone already justifies Deckoviz.
            </p>

            <div className="bg-gradient-to-r from-pink-100 to-indigo-100 rounded-2xl p-6 border border-pink-200">
              <p className="text-xl text-pink-900 leading-relaxed font-semibold text-center">
                But the real upside is revenue.
              </p>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Deckoviz is designed to change customer behavior inside your space.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              More time spent inside the venue. Higher average order value. More impulse purchases. More social sharing. More return visits and greater loyalty.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed font-semibold">
              Why?
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              Because customers respond to environments that feel:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">alive</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">personalized</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">intentional</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">emotionally coherent</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-100 to-pink-100 rounded-2xl p-6 border border-violet-200">
              <p className="text-xl text-violet-900 leading-relaxed font-semibold text-center">
                Static spaces fade into the background. Dynamic spaces stay in memory.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                New Experiences That Were Not Previously Possible
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Deckoviz enables entirely new classes of experiences that traditional signage and screens simply cannot deliver.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed font-semibold">
              Examples:
            </p>

            <div className="bg-white/60 rounded-2xl p-6 border border-indigo-100">
              <ul className="space-y-3 text-lg text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>personalized memento artworks for customers after a visit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>anniversary or birthday visuals, artworks and montages generated in real time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>Apple-style product videos created in-store, on demand</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>real-time visualization of clothing on customers without trying it on</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>live display of customer stories, reviews, or moments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>dynamic promotions that adapt by time, weather, crowd, or inventory</span>
                </li>
              </ul>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              And lots more.
            </p>

            <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl p-6 border border-indigo-200">
              <p className="text-xl text-indigo-900 leading-relaxed font-semibold">
                These are not gimmicks. They are experience multipliers.
              </p>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              And new use cases emerge weekly because the system is platform-driven.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                Deckoviz as a Revenue-Facing System
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              For enterprises, Deckoviz functions as:
            </p>

            <div className="bg-white/60 rounded-2xl p-6 border border-violet-100">
              <ul className="space-y-3 text-lg text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>a complete visual creation and display engine</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>an adaptive merchandising system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>a living brand surface</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>an in-store marketing channel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1.5 text-xl">•</span>
                  <span>a silent salesperson</span>
                </li>
              </ul>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              It replaces or augments:
            </p>

            <div className="bg-white/60 rounded-2xl p-6 border border-indigo-100">
              <ul className="space-y-3 text-lg text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>static art frames</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>posters and signage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>merchandising displays</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>product and dish photography</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>ambient lighting systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>background visual screens</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1.5 text-xl">•</span>
                  <span>even smart TVs, if that is what you need in your space</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-violet-100 to-indigo-100 rounded-2xl p-6 border border-violet-200">
              <p className="text-xl text-violet-900 leading-relaxed font-semibold text-center">
                But again, replacement is not the headline.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                Vizzy: Your Business's Storyteller and Vibe Curator
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Vizzy is not a novelty AI. Vizzy is your business's:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-4 border border-pink-100 flex items-center gap-3">
                <span className="text-pink-600 text-xl">•</span>
                <span className="text-lg text-slate-700">storyteller</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-pink-100 flex items-center gap-3">
                <span className="text-pink-600 text-xl">•</span>
                <span className="text-lg text-slate-700">brand ambassador</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-pink-100 flex items-center gap-3">
                <span className="text-pink-600 text-xl">•</span>
                <span className="text-lg text-slate-700">mood curator</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-pink-100 flex items-center gap-3">
                <span className="text-pink-600 text-xl">•</span>
                <span className="text-lg text-slate-700">visual marketer</span>
              </div>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              It understands:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">your brand assets</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">your tone</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">your customer context</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">your business rhythms</span>
              </div>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              And it adapts accordingly.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              Morning looks different from evening. Weekdays feel different from weekends. A slow Tuesday is not a busy Saturday.
            </p>

            <div className="bg-gradient-to-r from-pink-100 to-indigo-100 rounded-2xl p-6 border border-pink-200">
              <p className="text-xl text-pink-900 leading-relaxed font-semibold text-center">
                Your visuals shouldn't be static when your business isn't.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-indigo-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                Why Art and Stories Matter, Even for Hard-Nosed Businesses
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Most businesses are commodities.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              Products can be copied. Prices can be undercut. Locations can be replicated.
            </p>

            <div className="bg-gradient-to-r from-indigo-100 to-indigo-100 rounded-2xl p-6 border border-indigo-200">
              <p className="text-xl text-indigo-900 leading-relaxed font-semibold text-center">
                What cannot be easily copied is how a place made someone feel.
              </p>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Art and story are not indulgences. They are memory-shaping tools.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              Art sets mood. Mood affects behavior. Behavior affects revenue.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              Art also becomes identity. Your values. Your ethos. Your legacy.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              With Deckoviz, enterprises can generate custom brand-aligned art instantly by uploading brand assets and intent. No agencies. No delays.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                Art as a Monetizable Asset
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              With Deckoviz, art is no longer passive.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              It becomes:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a loyalty driver</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a differentiation layer</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a social sharing trigger</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-violet-100 flex items-center gap-3">
                <span className="text-violet-600 text-xl">•</span>
                <span className="text-lg text-slate-700">a memory anchor</span>
              </div>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              A customer who receives a personalized visual memento does not forget you. A couple whose anniversary is acknowledged visually does not treat you as interchangeable. A family whose moment is honored tells others.
            </p>

            <div className="bg-gradient-to-r from-violet-100 to-pink-100 rounded-2xl p-6 border border-violet-200">
              <p className="text-xl text-violet-900 leading-relaxed font-semibold text-center">
                Experience becomes marketing. Art becomes revenue-adjacent.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                The Bigger Realization
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              We are entering a world where experience matters as much as product, sometimes more.
            </p>

            <p className="text-xl text-slate-700 leading-relaxed">
              What customers remember is not just what they bought, but:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 flex items-center gap-3">
                <span className="text-indigo-600 text-xl">•</span>
                <span className="text-lg text-slate-700">how they felt</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 flex items-center gap-3">
                <span className="text-indigo-600 text-xl">•</span>
                <span className="text-lg text-slate-700">how intentional the space felt</span>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 flex items-center gap-3">
                <span className="text-indigo-600 text-xl">•</span>
                <span className="text-lg text-slate-700">how seen they felt</span>
              </div>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
              Deckoviz is built for that world.
            </p>

            <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl p-6 border border-indigo-200">
              <p className="text-xl text-indigo-900 leading-relaxed font-semibold text-center">
                Not as decoration. Not as novelty. But as infrastructure.
              </p>
            </div>
          </div>

          {/* Closing */}
          <div className="space-y-6 pt-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 pl-6">
                Closing Thought
              </h2>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-8 border border-violet-100 space-y-6">
              <p className="text-xl text-slate-700 leading-relaxed">
                Deckoviz is not a cost. It is a compression of costs, capabilities, and creative power into a single system.
              </p>

              <p className="text-xl text-slate-700 leading-relaxed">
                For enterprises that understand where differentiation is heading, this is not a question of "why". It is a question of how soon.
              </p>

              <div className="bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl p-6">
                <p className="text-2xl text-white leading-relaxed font-bold text-center">
                  The businesses that win will not be the loudest or the cheapest. They will be the ones that make people feel something worth remembering.
                </p>
              </div>
            </div>
          </div>

        </div>
        
        </div>
      </div>
    </section>
    </>
  );
}
