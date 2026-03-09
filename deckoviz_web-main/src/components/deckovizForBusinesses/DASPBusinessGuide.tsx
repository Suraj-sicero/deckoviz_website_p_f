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
          bg-white/25 backdrop-blur-[26px]
          border border-white/40
          shadow-[0_60px_160px_rgba(30,64,175,0.18)]
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
        <div className="max-w-5xl w-full text-gray-900 space-y-16 leading-relaxed">

          <h1 className="text-4xl font-bold">Deckoviz DASP Enterprise Guide</h1>

          <p className="text-xl font-medium">
            Designing Intelligent, Experiential, Brand-Infused Physical Spaces
          </p>
          <h1 className="text-4xl font-bold">Deckoviz DASP Enterprise Guide</h1>

        <p className="text-xl font-medium">
          Designing Intelligent, Experiential, Brand-Infused Physical Spaces
        </p>

        <p>Physical spaces are having an identity crisis.</p>

        <p>
          Screens are present, yet most say nothing meaningful.<br />
          Walls are filled, yet generic and barely few are remembered.<br />
          Ambiance exists, yet it rarely feels intentional or warm.
        </p>

        <p>
          At the same time, enterprises are under more pressure than ever.
          Attention is shrinking and being pulled in all directions, while the desire
          for meaningful experiences is increasing. Digital convenience has raised
          expectations. Customers, guests, and visitors no longer compare your space
          only to your competitors. They compare it to the best experiences they’ve
          had anywhere.
        </p>

        <p>Deckoviz was built for this moment.</p>

        <p>
          Deckoviz is a Dynamic Art & Space Platform (DASP) for enterprises.
          It transforms physical environments into living, adaptive, brand-expressive
          systems that can create, curate, and orchestrate visuals, stories, ambiance,
          and interactive experiences in real time.
        </p>

        <p>
          This is not merely smart digital signage or a content management system,
          or a static display network.
        </p>

        <p>
          Deckoviz is a reimagined spatial intelligence layer for enterprises,
          a generative, intelligent layer for physical spaces, designed to help
          businesses:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Tell richer brand stories</li>
          <li>Create emotional resonance at scale</li>
          <li>Increase dwell time and memorability</li>
          <li>Reduce operational friction in content creation</li>
          <li>Turn spaces into experiences</li>
        </ul>

        <p>
          Below is a deep dive into the 12 core enterprise feature suites or pillars,
          with real, high-leverage use cases that show how Deckoviz changes not just
          how spaces look, but how they work and how they feel.
        </p>

        {/* ===================== 1 ===================== */}
        <h2 className="text-3xl font-bold">1. Core Generative Engine</h2>
        <p className="font-semibold">Instant creation for physical environments</p>

        <p>
          At the heart of Deckoviz lies a powerful, enterprise-ready generative engine
          built specifically for large screens, public spaces, and branded environments.
        </p>

        <p>This engine enables businesses to generate:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Art, visuals, posters, signage, menus</li>
          <li>Product imagery and styled product shots</li>
          <li>Motion loops, ambient videos, and short films</li>
          <li>Audio-reactive visuals and music-driven experiences</li>
        </ul>

        <p>
          All of this can be created in seconds, directly from prompts, brand assets,
          product photos, or simple descriptions, and displayed instantly on Deckoviz Frames.
        </p>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A restaurant group updates daily specials across locations without printing menus</li>
          <li>A retail chain launches a campaign visually in every store the same morning</li>
          <li>A hotel replaces lobby art with evolving, seasonally adaptive visuals</li>
          <li>A real estate showroom generates localized visuals for each development</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p>
          Traditional content pipelines are slow, expensive, and brittle. They require designers,
          agencies, approvals, and production cycles that simply don’t match the pace of modern
          business.
        </p>

        <p>
          Deckoviz collapses that entire pipeline into a living creative engine, giving enterprises
          speed, consistency, and creative freedom without sacrificing quality.
        </p>

        {/* ===================== 2 ===================== */}
        <h2 className="text-3xl font-bold">2. Product & Offering Display Enhancer</h2>
        <p className="font-semibold">Make products feel desirable, alive, and premium</p>

        <p>
          How a product is presented shapes how it is valued.
          Deckoviz dramatically upgrades product and offering presentation through AI-enhanced
          visuals and animations.
        </p>

        <p>Businesses can take a single product photo and transform it into:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Professional, studio-quality imagery</li>
          <li>Contextual lifestyle visuals</li>
          <li>Subtle motion loops and cinematic animations</li>
          <li>Visual narratives showing usage, texture, and detail</li>
        </ul>

        <p>
          No photoshoots. No models. No reshoots. No equipment.
        </p>

        <p className="font-semibold">Enterprise use cases</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A restaurant animates dishes gently, highlighting ingredients and plating</li>
          <li>A fashion store shows garments worn in different contexts without mannequins</li>
          <li>A hotel spa visualizes treatments through calming, abstract product stories</li>
          <li>A luxury retailer displays craftsmanship details dynamically on walls</li>
        </ul>

        <p className="font-semibold">Why this matters</p>
        <p>
          Static product displays fade into the background. Dynamic, tasteful motion draws
          attention naturally, without being intrusive.
        </p>

        <p>
          Deckoviz turns walls into silent sales assets that elevate perceived quality,
          reduce marketing friction, and let offerings speak for themselves.
        </p>
{/* ===================== 3 ===================== */}
<h2 className="text-3xl font-bold">3. AI Video Creation & Display Suite</h2>
<p className="font-semibold">Cinematic storytelling, without production overhead</p>

<p>
Video is the most powerful medium for storytelling, but also the most expensive
and operationally complex.
</p>

<p>Deckoviz changes that.</p>

<p>Enterprises can create and display:</p>

<ul className="list-disc pl-6 space-y-2">
  <li>In-store product ads and apple-esque video ads</li>
  <li>Brand films or origin stories</li>
  <li>Short lifestyle or usage videos</li>
  <li>Campaign visuals and launch content</li>
</ul>

<p>
These videos can be generated, refined, and looped directly within the platform,
designed specifically for ambient, in-space viewing, not noisy advertising.
</p>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>A café runs subtle, cinematic visuals of coffee being crafted</li>
  <li>A retail store plays brand films that set tone without demanding attention</li>
  <li>A hotel lobby shows slow, atmospheric destination stories</li>
  <li>A flagship store launches new collections visually overnight</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
High-quality video used to be episodic. With Deckoviz, it becomes continuous,
ambient, and adaptive, enhancing experience rather than interrupting it.
</p>

{/* ===================== 4 ===================== */}
<h2 className="text-3xl font-bold">4. Dynamic, Intelligent Ambiance & Mood Control</h2>
<p className="font-semibold">Spaces that adapt, not stagnate</p>

<p>
Most spaces feel the same at 9am as they do at 9pm. Humans don’t.
</p>

<p>
Deckoviz allows enterprises to design time-aware, context-aware, persona-aware
environments that shift automatically based on:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Time of day and day of week</li>
  <li>Seasonality and special occasions</li>
  <li>User personas and frequent visitors</li>
  <li>Events, holidays, and service phases</li>
</ul>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>Restaurants shift from energetic brunch visuals to intimate dinner moods</li>
  <li>Hotels adjust lobby ambiance for arrivals, evenings, and late nights</li>
  <li>Retail stores adapt visuals based on traffic flow and promotions</li>
  <li>Offices create calmer evening environments and energetic mornings</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
Ambiance affects behavior, dwell time, and emotional state. When done well,
it feels invisible. When ignored, it feels off.
</p>

<p>
Deckoviz makes ambiance a designed system, not a static setting.
</p>

{/* ===================== 5 ===================== */}
<h2 className="text-3xl font-bold">5. Custom & Brand-Themed Generative Art</h2>
<p className="font-semibold">Art that belongs to your business</p>

<p>
Generic decor signals generic thinking.
</p>

<p>
Deckoviz enables enterprises to create custom generative art systems that reflect:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Brand colors and visual language</li>
  <li>Company ethos and values</li>
  <li>Location, culture, or architectural context</li>
  <li>Seasonal or campaign themes</li>
</ul>

<p>
These artworks evolve continuously while remaining unmistakably on-brand.
</p>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>A hospitality group creates location-specific art for each property</li>
  <li>A brand visualizes its mission through evolving abstract systems</li>
  <li>A corporate lobby reflects company culture without logos or slogans</li>
  <li>A retail brand reinforces identity subtly through art, not ads</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
Art communicates values faster than words. When it’s authentic and intentional,
it becomes a quiet differentiator.
</p>

{/* ===================== 6 ===================== */}
<h2 className="text-3xl font-bold">6. Immersive, Experiential Space Creation</h2>
<p className="font-semibold">Turning visits into journeys</p>

<p>
Deckoviz enables enterprises to move from spaces to experiences.
</p>

<p>
By combining visuals, motion, music, narration, and personalization,
businesses can orchestrate environments that feel cinematic, intentional,
engaging, immersive, and memorable.
</p>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>A restaurant takes guests through the story of its cuisine</li>
  <li>A hotel immerses guests in a sense of place from the moment they enter</li>
  <li>A retail store transforms shopping into exploration</li>
  <li>A flagship space becomes a destination, not just a store</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
In an era of infinite choice, experience is what people remember,
talk about, and return for.
</p>

<p>
Deckoviz gives enterprises the tools to design memory, not just decor.
</p>

{/* ===================== 7 ===================== */}
<h2 className="text-3xl font-bold">7. Personalized Guest & Customer Mementos</h2>
<p className="font-semibold">Turning moments into artifacts people keep</p>

<p>
Most customer experiences disappear the moment someone walks out the door.
</p>

<p>
Deckoviz changes that by enabling enterprises to create personalized,
shareable mementos for guests in real time.
</p>

<p>These are emotional artifacts.</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Personalized artworks featuring guests</li>
  <li>Stylized visuals of their visit, purchase, or meal</li>
  <li>Custom farewell visuals with messages</li>
  <li>Branded memory pieces shared instantly to phones</li>
</ul>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>A restaurant creates a painterly artwork of a couple at their table</li>
  <li>A hotel gifts guests a visual memory of their stay on checkout</li>
  <li>A retail store shares a stylized image of a customer wearing their purchase</li>
  <li>A luxury brand sends a personalized visual after a flagship visit</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
People forget transactions. They remember moments.
</p>

<p>
These mementos extend the experience beyond the space,
drive organic social sharing, build emotional attachment,
and increase repeat visits without discounts.
</p>

<p>
Deckoviz turns customers into carriers of your brand story.
</p>

{/* ===================== 8 ===================== */}
<h2 className="text-3xl font-bold">8. AI Marketing & Campaign Material Creator</h2>
<p className="font-semibold">Marketing that updates itself</p>

<p>Marketing content in physical spaces is usually:</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Expensive to produce</li>
  <li>Slow to update</li>
  <li>Visually inconsistent across locations</li>
</ul>

<p>
Deckoviz replaces this with a real-time, on-brand marketing creation system.
</p>

<p>Enterprises can instantly generate:</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Posters, menus, signage, and announcements</li>
  <li>Campaign visuals and launch materials</li>
  <li>Motion-based promotions and loops</li>
  <li>Text + visual combinations, fully branded</li>
</ul>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>A retail chain launches localized promotions per store</li>
  <li>A restaurant updates menus instantly across locations</li>
  <li>A hotel promotes seasonal offers without printing anything</li>
  <li>A brand tests visual campaigns live, in-space</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
Marketing becomes adaptive instead of static.
</p>

<p>
Deckoviz enables enterprises to remove dependency on agencies,
maintain brand consistency at scale,
and respond to real-world conditions in real time.
</p>

{/* ===================== 9 ===================== */}
<h2 className="text-3xl font-bold">9. Dynamic, Intelligent Signage & Information Systems</h2>
<p className="font-semibold">From static signs to living information</p>

<p>
Static signage is blind. It cannot adapt, learn, or respond.
</p>

<p>
Deckoviz replaces traditional signage with intelligent,
evolving visual systems that can update instantly and adapt contextually.
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Menus and specials</li>
  <li>QR-driven interactions</li>
  <li>Event announcements</li>
  <li>Wayfinding and guidance</li>
  <li>Merchandising highlights</li>
</ul>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>A restaurant highlights dishes based on time of day</li>
  <li>A hotel adapts signage based on occupancy and events</li>
  <li>A retail store updates merchandising visuals dynamically</li>
  <li>A corporate lobby displays live, branded information</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
When information adapts, friction disappears.
</p>

<p>
Deckoviz turns signage into a responsive interface, not a fixed message.
</p>

{/* ===================== 10 ===================== */}
<h2 className="text-3xl font-bold">10. AI Enterprise Assistant Suite (Vizzy)</h2>
<p className="font-semibold">From display to brand intelligence</p>

<p>
This is where Deckoviz crosses a special threshold.
</p>

<p>
The AI Enterprise Assistant Suite transforms Deckoviz from a visual platform
into a multimodal, enterprise-aware intelligence layer that lives inside your space.
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Answer questions conversationally</li>
  <li>Explain products, dishes, or services</li>
  <li>Tell brand stories visually and verbally</li>
  <li>Entertain, guide, and assist guests</li>
  <li>Generate visuals dynamically during interactions</li>
</ul>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>Hotel guests ask about amenities and receive visual explanations</li>
  <li>Retail customers get personalized recommendations</li>
  <li>Museums offer interactive, visual storytelling</li>
  <li>Corporate lobbies provide intelligent introductions</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
This turns AI from a novelty into a living brand representative.
</p>

<p>Vizzy becomes:</p>
<ul className="list-disc pl-6 space-y-2">
  <li>Your storyteller</li>
  <li>Your guide</li>
  <li>Your concierge</li>
  <li>Your brand voice and evangelist</li>
</ul>

<p>
At scale, this redefines customer engagement.
</p>

{/* ===================== 11 ===================== */}
<h2 className="text-3xl font-bold">11. Avatars, Narration & Interactive Characters</h2>
<p className="font-semibold">Giving your brand a face and a voice</p>

<p>
Humans connect to personalities, not interfaces.
</p>

<p>
Deckoviz enables enterprises to deploy avatars and narrators that represent
the brand in expressive, interactive ways.
</p>

<p>These avatars can:</p>
<ul className="list-disc pl-6 space-y-2">
  <li>Greet and entertain guests</li>
  <li>Narrate collections or menus</li>
  <li>Guide, explain, or entertain</li>
  <li>Respond via voice, text, and visuals</li>
</ul>

<p>Avatars can be:</p>
<ul className="list-disc pl-6 space-y-2">
  <li>Human-like</li>
  <li>Mascots</li>
  <li>Stylized characters</li>
  <li>Brand-specific creations</li>
</ul>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>A restaurant greets guests with a warm, branded character</li>
  <li>A hotel lobby uses narration for cultural storytelling</li>
  <li>A retail store educates customers interactively</li>
  <li>A family venue engages kids through playful avatars</li>
</ul>

<p className="font-semibold">Why this matters</p>
<p>
Avatars humanize technology.
</p>

<p>
They transform screens into social entities,
making interactions feel natural and memorable.
</p>

{/* ===================== 12 ===================== */}
<h2 className="text-3xl font-bold">12. Enterprise Ecosystem & Advanced Capabilities</h2>
<p className="font-semibold">Everything else that makes it powerful at scale</p>

<p>
Beyond the core suites, Deckoviz offers a growing ecosystem of advanced
enterprise capabilities, including:
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Guest persona profiles and memory across visits</li>
  <li>Social proof walls displaying reviews and testimonials</li>
  <li>AI-generated custom brand music and soundscapes</li>
  <li>Multisensory experiences with synced lighting and scent</li>
  <li>Interactive guest contribution walls via QR or app</li>
  <li>Marketplace inspiration and brand asset reuse</li>
  <li>Smart TV functionality for events and broadcasts</li>
  <li>Deckoviz Wall for fully immersive environments</li>
</ul>

<p className="font-semibold">Enterprise use cases</p>
<ul className="list-disc pl-6 space-y-2">
  <li>Personalized recognition for repeat guests</li>
  <li>Immersive themed dining or retail experiences</li>
</ul>


        {/* ===================== Closing Perspective ===================== */}
        <h2 className="text-3xl font-bold">Closing Perspective</h2>

        <p>Deckoviz is not about adding screens.</p>

        <p>
          It is about making spaces expressive, intelligent, and alive.
        </p>

        <p className="font-semibold">For enterprises, this means:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Stronger brand memory</li>
          <li>Deeper emotional connection</li>
          <li>Higher engagement without friction</li>
          <li>Experiences that scale without losing soul</li>
        </ul>

        <p>
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
