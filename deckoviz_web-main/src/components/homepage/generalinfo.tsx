import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const AutoScrollCarousel = () => {
const trackRef = useRef<HTMLDivElement | null>(null);
const conveyorX = useRef(0);
const isPaused = useRef(false); 
  
useEffect(() => {
  const track = trackRef.current;
  if (!track) return;

  const SPEED = 1.2;

  let raf: number;

  const startAnimation = () => {
    const totalWidth = track.scrollWidth / 2;

    const animate = () => {
      if (!isPaused.current) {
        conveyorX.current -= SPEED;
      }

      if (Math.abs(conveyorX.current) >= totalWidth) {
        conveyorX.current = 0;
      }

      track.style.transform = `translateX(${conveyorX.current}px)`;

      raf = requestAnimationFrame(animate);
    };

    animate();
  };

  // âœ… WAIT until images load
  const images = track.querySelectorAll("img");
  let loaded = 0;

  if (images.length === 0) {
    startAnimation();
  } else {
    images.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === images.length) {
            startAnimation();
          }
        };
      }
    });

    if (loaded === images.length) {
      startAnimation();
    }
  }

  return () => cancelAnimationFrame(raf);
}, []);

const moveCarousel = (dir: "next" | "prev") => {
  const track = trackRef.current;
  if (!track) return;

  const cardWidth = 320 + 56; // width + gap

  conveyorX.current += dir === "next" ? -cardWidth : cardWidth;

  if (Math.abs(conveyorX.current) >= track.scrollWidth / 2) {
    conveyorX.current = 0;
  }
};
const frames = [
  {
    file: "Simple Handcarving Symmetrical, minimal motifs (waves, leaves, flowers, geometric patterns).png",
    name: "Handcarving Frames",
  },
  {
    file: "default frame with theme Floral motif (delicate botanicals wrapping around the frame).png",
    name: "Floral Wrap",
  },
  {
    file: "default frame with theme cosmic motif (milky way, galaxies, black hole kind of visuals on the frame).png",
    name: "Cosmic Frame",
  },
  {
    file: "default frame with Pantone Colour dual tone gradient - teal and coral hues intermixed.png",
    name: "Teal Coral",
  },
  {
    file: "default frame with Custom Pantone Colour - striking dual tone - eg gold and black.png",
    name: "Gold & Black",
  },
  { file: "75 inch frame.png", name: "75 Inch" },
  { file: "85 inch frame.png", name: "85 Inch" },

  { file: "boucle.png", name: "Boucle Frame" },
  { file: "wool.png", name: "Wool Frame" },
  { file: "denim.png", name: "Denim Frame" },
  { file: "velvet.png", name: "Velvet Frame" },
  { file: "velvet (2).png", name: "Velvet Dark" },
  { file: "silk.png", name: "Silk Frame" },
  { file: "cashmere.png", name: "Cashmere Frame" },
  { file: "corduroy.png", name: "Corduroy Frame" },
  { file: "fur.png", name: "Fur Frame" },
  { file: "fur (2).png", name: "Soft Fur Frame" },
  { file: "furr.png", name: "Light Fur Frame" },
  { file: "boucle (2).png", name: "Boucle Soft Frame" },
  { file: "cartoon carving.png", name: "Cartoon Carving Frame" },
  { file: "wood crave.png", name: "Wood Carving Frame" }
];

  return (
    <div className="relative overflow-hidden py-10">
  
  {/* LEFT ARROW */}
  <button
onClick={() => moveCarousel("prev")}
  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/70 backdrop-blur-lg shadow-xl rounded-full p-3 hover:scale-110 transition"
>
  â†
</button>

<button
onClick={() => moveCarousel("next")}
  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/70 backdrop-blur-lg shadow-xl rounded-full p-3 hover:scale-110 transition"
>
  →
</button>
      <div className="overflow-hidden px-10">
  <div
    ref={trackRef}
    className="flex gap-14 will-change-transform py-4"
    style={{
  transform: "translateX(0px)",
  transition: "transform 0.05s linear"
}}
    onMouseEnter={() => (isPaused.current = true)}
    onMouseLeave={() => (isPaused.current = false)}
  >
        {[...frames, ...frames].map((frame, index) => (
          <div
            key={index}
onMouseEnter={() => (isPaused.current = true)}
onMouseLeave={() => (isPaused.current = false)}
            className="relative min-w-[320px] flex-shrink-0 p-[2px] rounded-3xl bg-gradient-to-r from-[#182A4A] to-[#2563EB] transition-all duration-500 hover:scale-105"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#182A4A] to-[#2563EB] blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>

            {/* Glass Card */}
            <div className="relative backdrop-blur-xl bg-white/70 rounded-3xl p-6 shadow-2xl border border-indigo-100">
              <img
                src={`/images/${frame.file}`}
                alt={frame.name}
                className="h-64 w-full object-contain rounded-xl"
              />

              {/* BEAUTIFUL TEXT */}
              <h3 className="mt-6 text-center text-lg font-bold tracking-wide bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent drop-shadow-sm">
                {frame.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

const ShippingCard = ({ title, items }: any) => {
  return (
    <div
      className="group rounded-3xl p-10 mb-16 transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.30)",
        borderTop: "1px solid rgba(255,255,255,0.60)",
        boxShadow: "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.50)",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.15), inset 0 1px 0 rgba(255,255,255,0.7)"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)"}
    >
      {/* Glass sheen */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 22%, transparent 40%)" }} />

      {/* Section Title */}
      <h3 className="text-2xl font-semibold italic mb-8 text-center bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
        {title}
      </h3>

      {/* Card Rows */}
      <div className="grid gap-5">
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-start p-5 rounded-2xl transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 100%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderTop: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 2px 12px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">
                {item.name}
              </h4>

              <p className="text-gray-600 text-sm mt-1 max-w-xl">
                {item.desc}
              </p>
            </div>

            <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-lg whitespace-nowrap">
              {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScrollReveal = ({ children, direction = "left" }: any) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -80 : 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const GeneralInfo = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden py-20 px-6"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Soft blue blobs evenly spread so glass is visible throughout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.20)" }} />
        <div className="absolute -top-20 right-[-80px] w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(37, 99, 235, 0.18)" }} />
        <div className="absolute top-[25%] left-[10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.15)" }} />
        <div className="absolute top-[25%] right-[5%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
        <div className="absolute top-[50%] left-[35%] w-[600px] h-[400px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
        <div className="absolute top-[65%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.16)" }} />
        <div className="absolute top-[70%] right-[-60px] w-[550px] h-[550px] rounded-full blur-[110px]" style={{ background: "rgba(79, 70, 229, 0.14)" }} />
        <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(59, 130, 246, 0.16)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* SHINY GRADIENT MAIN HEADING */}
        <h1 className="text-5xl md:text-6xl font-extrabold italic text-center mb-16 tracking-wide bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent drop-shadow-[0_6px_20px_rgba(0,0,0,0.15)]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>

  Subscriptions, Custom Options <br className="hidden md:block"/>
  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
    & Other Info
  </span>

</h1>

{/* Decorative divider */}
<div className="flex justify-center mb-16">
  <div className="w-32 h-[3px] rounded-full bg-gradient-to-r from-[#182A4A] to-[#2563EB]"></div>
</div>

        {/* SINGLE GLASS CARD */}
        <ScrollReveal direction="left">
          <div
            className="relative rounded-3xl p-12 transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.30)",
              borderTop: "1px solid rgba(255,255,255,0.60)",
              boxShadow: "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.50)",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.15), inset 0 1px 0 rgba(255,255,255,0.7)"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)"}
          >
            {/* Diagonal glass reflection */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 22%, transparent 38%)" }} />
            {/* CENTERED SUB HEADING */}
            <h2 className="text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent tracking-wide">
              For Individuals & Homes
            </h2>

            {/* DESCRIPTION */}
            <div className="text-gray-700 leading-relaxed space-y-4 mb-14 text-lg text-center max-w-4xl mx-auto">
              <p>
                Deckoviz is designed to be a living part of your everyday life.
                Our consumer subscriptions unlock the full depth of the Deckoviz
                experience, allowing your frame to evolve with you over time.
              </p>

              <p>
                From deeply personalized art and ambient modes to dream
                visualization, storytelling, mood-aware curation, and creative
                exploration, your subscription turns Deckoviz into a dynamic
                expression of your inner world.
              </p>

              <p>
                As your tastes, emotions, routines, and seasons change, Deckoviz
                changes with you. It learns. It adapts. It becomes more personal
                the longer you use it.
              </p>

              <p className="font-medium text-gray-900">
                This is not a static art frame. It's an ongoing relationship
                with beauty, creativity, and presence.
              </p>

              <p>
                Designed for homes, families, creators, and anyone who wants
                their space to feel alive, intentional, and deeply theirs.
              </p>

              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-xl">
                Choose the plan that transforms your space, your vibes, and your
                daily inspiration ✨
              </p>
            </div>

            {/* TABLE SECTION */}
            <div className="overflow-x-auto mt-6">
  <table className="min-w-full text-sm rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg bg-white/70 border border-indigo-100">

    <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-600 text-white text-sm uppercase tracking-wider">
      <tr>
        <th className="py-4 px-6 text-left">Feature</th>
        <th className="py-4 px-6 text-left">Silver</th>
        <th className="py-4 px-6 text-left">Gold</th>
        <th className="py-4 px-6 text-left">Diamond</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-white/[0.05]">

      <tr className="hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold text-gray-800">Pricing</td>
        <td className="py-4 px-6">$8/mo<br/>$45 / 6-mo<br/>$80 / yr</td>
        <td className="py-4 px-6">$16/mo<br/>$90 / 6-mo<br/>$160 / yr</td>
        <td className="py-4 px-6">$24/mo<br/>$135 / 6-mo<br/>$240 / yr</td>
      </tr>

      <tr className="bg-white/70 hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold text-gray-800">Image Credits</td>
        <td className="py-4 px-6">100/month</td>
        <td className="py-4 px-6">200/month</td>
        <td className="py-4 px-6">20/month</td>
      </tr>

      <tr className="hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold text-gray-800">Video Credits</td>
        <td className="py-4 px-6">–</td>
        <td className="py-4 px-6">3 min/month</td>
        <td className="py-4 px-6">10 min/month</td>
      </tr>

      <tr className="bg-white/70 hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold text-gray-800">Text Tokens</td>
        <td className="py-4 px-6">500k/month</td>
        <td className="py-4 px-6">1m/month</td>
        <td className="py-4 px-6">2m/month</td>
      </tr>

      <tr className="hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold text-gray-800">Storage</td>
        <td className="py-4 px-6">100 GB</td>
        <td className="py-4 px-6">200 GB</td>
        <td className="py-4 px-6">400 GB</td>
      </tr>

      <tr className="bg-white/70 hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold text-gray-800">Customer Care</td>
        <td className="py-4 px-6">Standard email</td>
        <td className="py-4 px-6">Priority support</td>
        <td className="py-4 px-6">Instant voice support</td>
      </tr>

    </tbody>
  </table>
</div>
          </div>
        </ScrollReveal>

        {/* SECOND GLASS CARD - BUSINESS */}
        <ScrollReveal direction="right">
          <div
            className="relative rounded-3xl p-12 mt-16 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 100%)",
              backdropFilter: "blur(36px) saturate(200%)",
              WebkitBackdropFilter: "blur(36px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderTop: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.15), inset 0 1px 0 rgba(255,255,255,0.7)"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)"}
          >
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 22%, transparent 38%)" }} />
            <h2 className="text-4xl font-semibold italic text-center mb-8 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent tracking-wide" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              For Businesses & Enterprises
            </h2>

            <div className="text-gray-700 leading-relaxed space-y-4 text-lg text-center max-w-4xl mx-auto">
              <p>
                Enterprise subscriptions are built for spaces that serve people.
                Deckoviz for enterprise transforms environments into emotionally
                intelligent, adaptive experiences.
              </p>

              <p>
                Whether it's hospitality, wellness, healthcare, retail,
                workplaces, or public spaces, our enterprise plans enable
                large-scale personalization, brand-aligned visuals, contextual
                storytelling, and mood-aware ambience across multiple locations.
              </p>

              <p>
                With centralized control, multi-device management, advanced
                customization, and tailored content strategies, Deckoviz becomes
                a powerful layer of spatial intelligence. One that elevates
                atmosphere, reinforces brand identity, and enhances how people
                feel the moment they enter a space.
              </p>

              <p>
                From calming and restorative environments to inspiring and
                energizing ones, Deckoviz helps organizations design not just
                how spaces look, but how they are experienced.
              </p>

              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-xl mt-6">
                Built for scale. Designed for humans and dynamic enterprise
                spaces. ✨
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* THIRD GLASS CARD - ENTERPRISE ADD-ON */}
        <ScrollReveal direction="left">
          <div
            className="relative rounded-3xl p-12 mt-16 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 100%)",
              backdropFilter: "blur(36px) saturate(200%)",
              WebkitBackdropFilter: "blur(36px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderTop: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.15), inset 0 1px 0 rgba(255,255,255,0.7)"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)"}
          >
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 22%, transparent 38%)" }} />
            <h2 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent tracking-wide">
              Enterprise Add-On
            </h2>

            <p className="text-center text-gray-600 italic mb-8">
              (Available for Any Tier)
            </p>

            <ul className="space-y-5 text-gray-700 text-lg max-w-4xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Branded Content Packs</strong> custom-created for your
                  brand, hotel, restaurant, or business.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Instant Voice Customer Care</strong> with dedicated
                  account manager.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Unlimited Marketplace Posting</strong> with tailored
                  placement.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Custom AI Feature Development</strong> for your
                  specific use case.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Bulk License Management</strong> for teams and
                  multi-location setups.
                </span>
              </li>
            </ul>
          </div>
        </ScrollReveal>
        {/* FOURTH GLASS CARD - WHY UPGRADE */}
        <ScrollReveal direction="right">
          <div
            className="relative rounded-3xl p-12 mt-16 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 100%)",
              backdropFilter: "blur(36px) saturate(200%)",
              WebkitBackdropFilter: "blur(36px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderTop: "1px solid rgba(255,255,255,0.75)",
              boxShadow: "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.15), inset 0 1px 0 rgba(255,255,255,0.7)"}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.10), inset 0 1px 0 rgba(255,255,255,0.6)"}
          >
            <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 22%, transparent 38%)" }} />
            <h2 className="text-3xl font-semibold italic text-center mb-10 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent tracking-wide" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Why Upgrade?
            </h2>

            <ul className="space-y-6 text-gray-700 text-lg max-w-4xl mx-auto">
              <li className="flex items-start gap-4">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Silver:</strong> Ideal for personal use with core
                  features and plenty of monthly art.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-xl font-bold">•</span>
                <span>
                  <strong>Gold Premium:</strong> For art lovers who want video,
                  voice, more storage, and richer curation.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-xl font-bold">•</span>
                <span>
                  <strong>Ultra Diamond:</strong> The ultimate, deeply
                  personalised Deckoviz experience with human curation,
                  enterprise-grade perks, and premium status.
                </span>
              </li>
            </ul>
          </div>
        </ScrollReveal>
        {/* FIFTH GLASS CARD - ENTERPRISE SUBSCRIPTIONS */}
        <ScrollReveal direction="left">
          <div className="backdrop-blur-xl bg-white/70 border border-indigo-100 shadow-2xl rounded-3xl p-12 mt-16">
            <h2 className="text-3xl font-semibold italic text-center mb-8 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent tracking-wide" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              Enterprise Subscriptions – Deckoviz
            </h2>

            <div className="text-gray-700 text-lg leading-relaxed space-y-6 max-w-4xl mx-auto text-center">
              <p>
                For our enterprise partners – hotels, restaurants, offices,
                galleries, retail, and cultural venues – Deckoviz offers
                tailored subscription solutions designed to transform spaces
                into living, dynamic experiences.
              </p>

              <p>
                With any subscription tier (Basic, Premium, Ultra), enterprise
                clients unlock:
              </p>
            </div>

            <ul className="space-y-5 text-gray-700 text-lg max-w-4xl mx-auto mt-8">
              <li className="flex items-start gap-4">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Branded Content Packs</strong> – custom art, ambient
                  visuals, and storytelling aligned with your brand identity.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-xl font-bold">•</span>
                <span>
                  <strong>Unlimited Marketplace Posting</strong> – premium
                  visibility for your curated content.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-xl font-bold">•</span>
                <span>
                  <strong>Custom AI Features</strong> – developed for your
                  unique use case, audience, and spaces.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-indigo-700 text-xl">•</span>
                <span>
                  <strong>Instant Voice Customer Care</strong> – dedicated
                  account manager and priority resolution.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-xl font-bold">•</span>
                <span>
                  <strong>Multi-Location & Team Licensing</strong> – streamlined
                  access and management.
                </span>
              </li>
            </ul>

            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto mt-10 text-center">
              We work closely with your design, branding, and marketing teams to
              ensure your Deckoviz installations deliver maximum guest
              engagement, brand immersion, and emotional impact.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* CUSTOM FRAME OPTIONS SECTION */}
      <div className="mt-24">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
          Custom Frame Options
        </h2>

        <AutoScrollCarousel />

        {/* SHIPPING SECTION */}
        <ScrollReveal direction="left">
        <div className="mt-32">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
            Shipping & Add-Ons
          </h2>

          {/* CATEGORY 1 */}
          <ShippingCard
            title="Mounts & Stands"
            items={[
              {
                name: "Rotating TV Mount",
                desc: "Heavy-duty wall mount that rotates 90° for portrait/landscape switching.",
                price: "+ $180",
              },
              {
                name: "Metallic Stand",
                desc: "Sleek freestanding stand in brushed aluminium or black steel.",
                price: "+ $220",
              },
              {
                name: "Premium Wooden Stand",
                desc: "Crafted hardwood stand available in multiple finishes.",
                price: "+ $260",
              },
              {
                name: "Robotic Moving Frame Stand",
                desc: "Motorised wheeled base with app control.",
                price: "+ $1,200",
              },
              {
                name: "Simple Mobile Frame Stand",
                desc: "Non-motorised wheeled stand for repositioning.",
                price: "+ $350",
              },
            ]}
          />

          {/* CATEGORY 2 */}
          <ShippingCard
            title="Sensory Enhancements"
            items={[
              {
                name: "Scent Diffuser",
                desc: "App-controlled aroma diffuser synced with visuals.",
                price: "+ $250",
              },
              {
                name: "16D Soundscapes Speaker Set",
                desc: "Immersive multi-directional audio with spatial mapping.",
                price: "+ $1,100",
              },
              {
                name: "Synced Lighting & Speaker Bars",
                desc: "LED light strips synced with visuals and music.",
                price: "+ $480",
              },
            ]}
          />

          {/* CATEGORY 3 */}
          <ShippingCard
            title="Lighting"
            items={[
              {
                name: "Side Strip Light",
                desc: "Four-sided halo lighting kit for frame.",
                price: "+ $45",
              },
              {
                name: "Dual Halo System",
                desc: "Rear + side halo for maximum glow.",
                price: "+ $75",
              },
              {
                name: "Intelligent Mood Lighting Kit",
                desc: "App-controlled lighting that adapts to content.",
                price: "+ $350",
              },
            ]}
          />

          {/* CATEGORY 4 */}
          <ShippingCard
            title="Other Premium Options"
            items={[
              {
                name: "Bespoke Carved Frames",
                desc: "Hand-carved themed or branded designs.",
                price: "From $300",
              },
              {
                name: "Custom Metallic Finish",
                desc: "Gold, bronze or chrome finish frames.",
                price: "+ $120",
              },
              {
                name: "Enterprise Branding Package",
                desc: "Custom animations, logos and startup visuals.",
                price: "From $500",
              },
            ]}
          />
        </div>
        </ScrollReveal>

        {/* COLOUR FINISH OPTIONS */}
        <ScrollReveal direction="right">
        <div className="backdrop-blur-xl bg-white/70 border border-indigo-100 shadow-2xl rounded-3xl p-12 mt-24">
          <h2 className="text-3xl font-semibold text-center mb-12 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
            Colour Finish Options
          </h2>

          <div className="space-y-8">
            {[
              {
                name: "Natural Wood Clear Coat",
                desc: "Preserves original grain with protective matte finish.",
                price: "Included",
              },
              {
                name: "Matte Black",
                desc: "Smooth, deep black finish for a modern aesthetic.",
                price: "+ $35",
              },
              {
                name: "Pure White",
                desc: "Crisp clean look with high-coverage matte paint.",
                price: "+ $35",
              },
              {
                name: "Charcoal Grey",
                desc: "Elegant dark grey with subtle texture.",
                price: "+ $35",
              },
              {
                name: "Custom Pantone Colour",
                desc: "Any Pantone shade for a personalised look.",
                price: "+ $65",
              },
              {
                name: "Dual-Tone (Two Colours)",
                desc: "Outer frame + inner edge combination.",
                price: "+ $85",
              },
              {
                name: "Hand-Painted Custom Art",
                desc: "Artist-painted frame in any motif, branding or abstract theme.",
                price: "From $300",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-b border-indigo-100 pb-4"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 text-sm mt-1 max-w-2xl">
                    {item.desc}
                  </p>
                </div>

                <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] whitespace-nowrap">
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          {/* EXPANSION TEXT */}
          <div className="mt-14 text-center text-gray-700 text-lg max-w-3xl mx-auto">
            <p>
              If you'd like, we can also expand the frame customisation table to
              include carving + colour + hand-painting combinations so clients
              can mix multiple upgrades in one purchase and instantly see the
              total price.
            </p>

            <p className="mt-4">
              Below is an expanded customisation matrix showing how clients can
              combine carving + colour + hand-painting options with incremental
              pricing clarity.
            </p>
          </div>
        </div>
        </ScrollReveal>

        {/* FRAME CUSTOMISATION & ADD-ON OPTIONS */}
        <ScrollReveal direction="left">
        <div className="backdrop-blur-xl bg-white/70 border border-indigo-100 shadow-2xl rounded-3xl p-12 mt-24">
          <h2 className="text-3xl font-semibold text-center mb-14 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
            Frame Customisation & Add-On Options
          </h2>

          {/* BASE FRAME OPTIONS */}
          <div className="mb-14">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] mb-6">
              Base Frame Options
            </h3>

            <ul className="space-y-4 text-gray-700">
              <li>
                • <strong>Default Frame (Included):</strong> Minimalist,
                medium-dark wood, curved edges with halo backlight.
              </li>
              <li>
                • <strong>Wider Frame Upgrade:</strong> +1cm ($25), +2cm ($40),
                +3cm ($60)
              </li>
              <li>
                • <strong>Classic Ornate (European Gallery Style):</strong> +
                $120
              </li>
              <li>
                • <strong>Metallic Finishes (Gold, Silver, Bronze):</strong> +
                $75
              </li>
            </ul>
          </div>

          {/* CARVING OPTIONS */}
          <div className="mb-14 overflow-x-auto">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] mb-6">
              Carving Options
            </h3>

            <div className="overflow-x-auto mt-6">
  <table className="min-w-full rounded-2xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-lg border border-indigo-100">

    <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-600 text-white">
      <tr>
        <th className="py-4 px-6 text-left">Carving Type</th>
        <th className="py-4 px-6 text-left">Description</th>
        <th className="py-4 px-6 text-left">Extra Cost</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-white/[0.05]">

      <tr className="hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold">Simple Carvings</td>
        <td className="py-4 px-6">
          Waves, flowers, geometric patterns
        </td>
        <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
          + $80
        </td>
      </tr>

      <tr className="bg-white/70 hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold">Ornate Carvings</td>
        <td className="py-4 px-6">
          Detailed themes and cursive designs
        </td>
        <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
          + $150
        </td>
      </tr>

      <tr className="hover:bg-white/[0.02] transition">
        <td className="py-4 px-6 font-semibold">Branded Carvings</td>
        <td className="py-4 px-6">
          Logos and brand-themed designs
        </td>
        <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
          + $200
        </td>
      </tr>

    </tbody>
  </table>
</div>          </div>
{/* COLOUR & FINISH OPTIONS */}
<div className="mb-14">
  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] mb-6">
    Colour &amp; Finish Options
  </h3>

  <div className="overflow-x-auto rounded-2xl shadow-xl">
    <table className="min-w-full text-sm text-gray-800 bg-white/70 backdrop-blur-lg border border-indigo-100 rounded-2xl overflow-hidden">

      {/* HEADER */}
      <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-600 text-white">
        <tr>
          <th className="py-4 px-6 text-left font-semibold">Finish Type</th>
          <th className="py-4 px-6 text-left font-semibold">Extra Cost</th>
          <th className="py-4 px-6 text-left font-semibold">Notes</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody className="divide-y divide-white/[0.05]">

        <tr className="hover:bg-white/[0.02] transition">
          <td className="py-4 px-6 font-medium">
            Natural Wood Clear Coat
          </td>
          <td className="py-4 px-6 font-semibold text-emerald-400">
            Included
          </td>
          <td className="py-4 px-6">
            Preserves wood grain with protective finish
          </td>
        </tr>

        <tr className="bg-white/70 hover:bg-white/[0.02] transition">
          <td className="py-4 px-6 font-medium">
            Matte Black / White / Charcoal
          </td>
          <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
            + $35
          </td>
          <td className="py-4 px-6">
            Timeless modern finishes
          </td>
        </tr>

        <tr className="hover:bg-white/[0.02] transition">
          <td className="py-4 px-6 font-medium">
            Custom Pantone Colour
          </td>
          <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
            + $65
          </td>
          <td className="py-4 px-6">
            Choose any Pantone shade
          </td>
        </tr>

        <tr className="bg-white/70 hover:bg-white/[0.02] transition">
          <td className="py-4 px-6 font-medium">
            Dual-Tone (Two Colours)
          </td>
          <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
            + $85
          </td>
          <td className="py-4 px-6">
            Outer frame + inner edge combination
          </td>
        </tr>

        <tr className="hover:bg-white/[0.02] transition">
          <td className="py-4 px-6 font-medium">
            Hand-Painted Artwork
          </td>
          <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
            + $120
          </td>
          <td className="py-4 px-6">
            Premium acrylic & enamel paints
          </td>
        </tr>

        <tr className="bg-white/70 hover:bg-white/[0.02] transition">
          <td className="py-4 px-6 font-medium">
            Colour + Carving Combo
          </td>
          <td className="py-4 px-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
            + $160 / + $230
          </td>
          <td className="py-4 px-6">
            Painted carvings in selected colour
          </td>
        </tr>

      </tbody>
    </table>
  </div>
          </div>

          {/* PREMIUM COMBINATIONS */}
          <div className="overflow-x-auto">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] mb-6">
              Premium Combinations (Carving + Colour + Hand-Paint)
            </h3>

            <table className="min-w-full text-sm text-gray-800">
              <thead>
                <tr className="border-b border-indigo-100 text-left">
                  <th className="py-3 px-4">Combination</th>
                  <th className="py-3 px-4">Extra Cost</th>
                  <th className="py-3 px-4">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                <tr>
                  <td className="py-3 px-4">Simple Carving + Colour</td>
                  <td className="py-3 px-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
                    + $145
                  </td>
                  <td className="py-3 px-4">Waves carved + Matte Black</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Ornate Carving + Colour</td>
                  <td className="py-3 px-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
                    + $215
                  </td>
                  <td className="py-3 px-4">Floral motifs + Gold metallic</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Carving + Dual-Tone Finish</td>
                  <td className="py-3 px-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
                    + $240
                  </td>
                  <td className="py-3 px-4">
                    Inner White, Outer Wood + Carved theme
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Carving + Hand-Painted Details</td>
                  <td className="py-3 px-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
                    + $250
                  </td>
                  <td className="py-3 px-4">Hand-painted cursive or motifs</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    Full Custom (Carving + Colour + Paint)
                  </td>
                  <td className="py-3 px-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
                    + $325
                  </td>
                  <td className="py-3 px-4">
                    Branded hotel logo + dual-tone + painted highlights
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        </ScrollReveal>

        {/* CLIENT FLOW SUMMARY */}
        <div className="backdrop-blur-xl bg-white/70 border border-indigo-100 shadow-2xl rounded-3xl p-10 mt-24 relative">
          {/* Soft Glow Background */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 blur-2xl opacity-20"></div>

          <div className="relative">
            <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
              ⚡ How Clients Build Their Perfect Frame
            </h2>

            <p className="text-gray-700 mb-6 text-lg">
              With this structure, clients (and your sales team) can:
            </p>

            <ol className="space-y-5 text-gray-800 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-xl">🖼️</span>
                <span>
                  Start from the <strong>default minimalist frame</strong>.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-xl">🎨</span>
                <span>
                  Add carving, colour finish, hand-painting or combinations.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-xl">💰</span>
                <span>Clearly see price impact per upgrade or bundle.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;









