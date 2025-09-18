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
    quote: "The moment I entered my room and saw the frame welcome me with my name and sunset visuals, I literally gasped. Most peaceful sleep I've had in months.",
    author: "— Guest at boutique hotel pilot",
    tagline: "Genuine Compliments 🌿"
  },
  {
    quote: "Our wedding couple cried seeing their photos reimagined in dreamy AI art and playing on the wall. It was next-level personalization.",
    author: "— Events manager at luxury resort",
    tagline: "Our Loved Memories ✨"
  },
  {
    quote: "We've had multiple guests ask where they could buy it. Deckoviz has become a silent ambassador for our design and brand experience.",
    author: "— General Manager, design-forward city hotel",
    tagline: "Valuable Experiences 👍"
  },
  {
    quote: "The morning affirmations feature is a game-changer. It sets such a positive tone for the entire day. I felt incredibly refreshed.",
    author: "— Wellness retreat attendee",
    tagline: "Mindful Mornings 🧘‍♀️"
  },
  {
    quote: "Seeing our family photos beautifully animated was the highlight of our stay. It transformed our hotel room into a personal sanctuary.",
    author: "— Family on vacation",
    tagline: "A Personal Touch 👨‍👩‍👧‍👦"
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

    // Listen for slide changes
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // Listen for mouse drag events to change the cursor
    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);
    emblaApi.on('pointerDown', handlePointerDown);
    emblaApi.on('pointerUp', handlePointerUp);

    // Cleanup function to remove listeners on component unmount
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('pointerDown', handlePointerDown);
      emblaApi.off('pointerUp', handlePointerUp);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="bg-primary-50/50 py-16 md:py-24 text-center overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Real Results, Genuine Reactions
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          From boutique hotels to luxury resorts, see what people are saying about their Deckoviz experience.
        </p>
      </div>

      {/* --- Embla Carousel Viewport --- */}
      <div
        className={`w-full overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        ref={emblaRef}
      >
        {/* --- Container for Slides --- */}
        <div className="flex -ml-4">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4"
              animate={{
                scale: getScale(index),
                opacity: getScale(index) < 0.9 ? 0.7 : 1,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              <div className="h-full bg-white p-8 rounded-2xl shadow-card flex flex-col text-left select-none">
                <div className="flex-grow">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                </div>
                <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
                  {testimonial.tagline}
                </p>
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