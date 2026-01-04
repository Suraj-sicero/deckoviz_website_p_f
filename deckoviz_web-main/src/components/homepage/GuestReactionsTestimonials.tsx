"use client"

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

// --- Type Definition ---
interface Testimonial {
  quote: string;
  author: string;
  tagline: string;
}

// --- Testimonial Data ---
const testimonialsData: Testimonial[] = [
  {
    quote:
      "Deckoviz is the best thing since sliced bread… jokes aside, this really has been a magical addition to my home. My living room went from ‘nice’ to ‘wait, what is that?!’ in one evening.",
    author: "— A friend of the founding team",
    tagline: "Early Human 🧠"
  },
  {
    quote:
      "I bought it for the art. I kept it for the vibes. Didn’t expect my walls to become my mood therapist, storyteller, and late-night calm machine. Yet here we are.",
    author: "— Early customer, London",
    tagline: "Real Living Room Energy ✨"
  },
  {
    quote:
      "My kid thinks it’s alive. I kind of agree. Her drawings turning into real art on the wall blew her mind. And honestly, mine too.",
    author: "— Parent tester",
    tagline: "Family Magic 🧡"
  },
  {
    quote:
      "It’s like having a personal artist who never sleeps and never asks for coffee. Every day there’s something new. Sometimes I just stand there staring at it. Worth every second.",
    author: "— Design nerd & beta user",
    tagline: "Design Obsessed 🎨"
  },
  {
    quote:
      "We started using it for date nights. Now it’s part of our relationship. From romantic modes to shared creations, Deckoviz made our evenings feel more intentional.",
    author: "— Couple from Manchester",
    tagline: "Shared Rituals 💕"
  },
  {
    quote:
      "I thought this was a fancy digital frame. Turns out it’s a whole personality. Art, music, rituals, stories, Netflix, all in one. My wall is doing more than any gadget I own.",
    author: "— Tech early adopter",
    tagline: "More Than a Gadget 🚀"
  }
];


// --- The Main Testimonials Component ---
const GuestReactionsTestimonials: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Testimonials from our Users 😊
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Real words from the curious souls who let Deckoviz into their homes before it was cool.
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
        className={`overflow-hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="flex -ml-4">
          {testimonialsData.map((t, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4"
              animate={{
                scale: getScale(index),
                opacity: getScale(index) < 0.9 ? 0.7 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <div
  className={`h-full rounded-2xl p-[1px] ${
    index % 3 === 0
      ? "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500"
      : index % 3 === 1
      ? "bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600"
      : "bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600"
  }`}
>
  <div className="h-full bg-white/90 backdrop-blur p-8 rounded-2xl shadow-md flex flex-col">
    <p className="text-lg text-gray-700 leading-relaxed mb-6">
      “{t.quote}”
    </p>
    <p className="font-semibold text-gray-800">{t.author}</p>
    <p className="text-sm text-gray-500 mt-4 pt-4 border-t">
      {t.tagline}
    </p>
  </div>
</div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Navigation Dots --- */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-primary-600 scale-125' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestReactionsTestimonials;