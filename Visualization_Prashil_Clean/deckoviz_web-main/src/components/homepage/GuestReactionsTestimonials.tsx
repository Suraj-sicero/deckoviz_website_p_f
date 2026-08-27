"use client"

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom"

// --- Type Definition ---
interface Testimonial {
  quote: string;
  author: string;
  tagline: string;
}
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
// --- Testimonial Data ---
const testimonialsData: Testimonial[] = [
  {
    quote:
      "Deckoviz is the best thing since sliced bread… jokes aside, this really has been a magical addition to my home. My living room went from ‘nice’ to ‘wait, what is that?!’ in one evening.",
    author: "  A friend of the founding team",
    tagline: "Early Human 🧠"
  },
  {
    quote:
      "I bought it for the art. I kept it for the vibes. Didn’t expect my walls to become my mood therapist, storyteller, and late-night calm machine. Yet here we are.",
    author: "  Early customer, London",
    tagline: "Real Living Room Energy ✨"
  },
  {
    quote:
      "My kid thinks it’s alive. I kind of agree. Her drawings turning into real art on the wall blew her mind. And honestly, mine too.",
    author: "  Parent tester",
    tagline: "Family Magic 🧡"
  },
  {
    quote:
      "It’s like having a personal artist who never sleeps and never asks for coffee. Every day there’s something new. Sometimes I just stand there staring at it. Worth every second.",
    author: "  Design nerd & beta user",
    tagline: "Design Obsessed 🎨"
  },
  {
    quote:
      "We started using it for date nights. Now it’s part of our relationship. From romantic modes to shared creations, Deckoviz made our evenings feel more intentional.",
    author: "  Couple from Manchester",
    tagline: "Shared Rituals 💕"
  },
  {
    quote:
      "I thought this was a fancy digital frame. Turns out it’s a whole personality. Art, music, rituals, stories, Netflix, all in one. My wall is doing more than any gadget I own.",
    author: "  Tech early adopter",
    tagline: "More Than a Gadget 🚀"
  }
];


// --- The Main Testimonials Component ---
const GuestReactionsTestimonials: React.FC = () => {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Function to calculate the scale and opacity for each slide
  const getScale = useCallback((index: number) => {
    const diff = Math.abs(selectedIndex - index);
    if (diff === 0) return 1;    // Center slide
    if (diff > 2) return 0.8;  // Far away slides
    return 1 - diff * 0.1;       // Adjacent slides
  }, [selectedIndex]);

  // Callback to update the selected index when the carousel settles
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Effect to register event listeners on the carousel
    useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);

    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
    };
  }, [emblaApi, onSelect]);

  return (
<div className="relative bg-primary-50/50 py-16 md:py-24 text-center overflow-x-clip">

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="text-gray-900">Testimonials from our</span>{" "}
          <span className="italic bg-gradient-to-r from-indigo-950 to-blue-600 bg-clip-text text-transparent">
            Users
          </span>{" "}
          😊
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Some words from the curious souls who let Deckoviz into their homes before it was cool.
        </p>
      </div>
      


{/* LEFT ARROW */}
<button
  onClick={() => emblaApi?.scrollPrev()}
  className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20
             p-3 rounded-full bg-white/80 backdrop-blur
             shadow-md hover:scale-110 transition"
>
  ←
</button>

{/* RIGHT ARROW */}
<button
  onClick={() => emblaApi?.scrollNext()}
  className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20
             p-3 rounded-full bg-white/80 backdrop-blur
             shadow-md hover:scale-110 transition"
>
  →
</button>

      {/* --- Embla Carousel Viewport --- */}
       <div
        ref={emblaRef}
        className={`overflow-hidden -my-8 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="flex -ml-4 py-8">
          {testimonialsData.map((t, index) => (
            <motion.div
  key={index}
  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4"
  custom={index}
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  animate={{
    scale: getScale(index),
    opacity: getScale(index) < 0.9 ? 0.7 : 1,
  }}
  transition={{ type: "spring", stiffness: 200, damping: 30 }}
>
              <div
                className={`relative h-full rounded-3xl border backdrop-blur-2xl p-10 flex flex-col transition-all duration-500 cursor-pointer 
                  bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-teal-400/10
                  border-blue-300/40
                  shadow-[0_15px_30px_rgba(30,58,138,0.08),_inset_0_1px_0_rgba(255,255,255,0.8)]
                  hover:shadow-[0_0_60px_rgba(37,99,235,0.45),_0_0_40px_rgba(20,184,166,0.35),_inset_0_1px_0_rgba(255,255,255,1)]
                  hover:border-cyan-300/80
                  hover:-translate-y-3
                  overflow-hidden group/card
                `}
              >
                {/* Stunning light glare effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"
                  style={{
                    background: "linear-gradient(135deg, rgba(34, 211, 238, 0.6) 0%, transparent 45%, rgba(59, 130, 246, 0.5) 100%)"
                  }}
                />
                
                {/* Vivid Teal & Blue Orbs inside card */}
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-teal-400/40 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-blue-500/40 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <p className="text-lg text-gray-800 leading-relaxed mb-6 flex-grow font-medium group-hover/card:text-gray-900 transition-colors duration-300">
                    “{t.quote}”
                  </p>
                  <p className="font-bold text-gray-900">{t.author}</p>
                  <p className={`text-[13px] mt-5 pt-5 border-t border-cyan-400/40 text-[#182A4A] font-extrabold tracking-wide uppercase`}>
                    {t.tagline}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Navigation Dots --- */}
      <div className="flex justify-center gap-3 mt-12 mb-12">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-[#182A4A] scale-125 shadow-[0_0_8px_rgba(24,42,74,0.6)]' : 'bg-[#182A4A]/20 hover:bg-[#182A4A]/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 🫧 BUBBLY CTA MOVED TO BOTTOM */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/designed-for-humans")}
          className="
            relative
            px-8 py-3
            rounded-full
            text-sm font-semibold tracking-wide
            text-[#182A4A]
            bg-gradient-to-r from-teal-200 via-cyan-200 to-sky-200
            shadow-[0_12px_30px_rgba(34,211,238,0.35)]
            hover:shadow-[0_20px_50px_rgba(34,211,238,0.55)]
            transition-all duration-500
            hover:-translate-y-1
            animate-bubble-float
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            Designed for Humans, Not Attention 👱
          </span>

          {/* soft glow bubble */}
          <span
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-r from-teal-200 via-cyan-200 to-sky-200
              blur-lg opacity-60
            "
          />
        </button>
      </div>
    </div>
  );
};
<style>
{`
  @keyframes bubbleFloat {
    0% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0); }
  }

  .animate-bubble-float {
    animation: bubbleFloat 5s ease-in-out infinite;
  }
`}
</style>

export default GuestReactionsTestimonials;
