"use client";

import { useState, useEffect, useCallback, useRef } from "react";



// --- INTERFACES ---
interface ImageSource {
  src: string;
  tag?: string;
}

interface DynamicImageGridProps {
  imageSources: ImageSource[];

  sectionTitle?: string;
  sectionDescription?: string;
}

// --- UPDATED COMPONENT ---
export const DynamicImageGrid: React.FC<DynamicImageGridProps> = ({
  imageSources,

  sectionTitle = "Explore Our Gallery",
  sectionDescription = "Discover inspiring visuals that spark joy and creativity.",
}) => {
  const [displayedImages, setDisplayedImages] = useState<ImageSource[]>([]);

  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Scroll functions
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  const updateDisplayedImages = useCallback(() => {
    // Always triplicate the array for seamless infinite scrolling
    setDisplayedImages([...imageSources, ...imageSources, ...imageSources]);
  }, [imageSources]);

  useEffect(() => {
    updateDisplayedImages();
  }, [updateDisplayedImages]);

  // Continuous Auto-Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scrollStep = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 0.8;

        // When we've scrolled past the first copy, jump back seamlessly
        const oneThird = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= oneThird) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, displayedImages]);

  const getImageKey = useCallback((image: ImageSource, index: number) => {
    return `${image.src}-${index}`;
  }, []);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0B] -z-10 w-full h-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-4 tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          {sectionTitle}
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {sectionDescription}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
        
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white border border-white/20 backdrop-blur rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
        >
          ←
        </button>
<style>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white border border-white/20 backdrop-blur rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
        >
          →
        </button>

        {/* Pause Indicator */}
        <div className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white border border-white/20 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transform group-hover:scale-105">
          <svg
            className="w-5 h-5 text-gray-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-7 overflow-x-auto scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayedImages.map((image, index) => {
            const delayClasses = ["delay-0", "delay-100", "delay-200", "delay-300"];

            return (
              <div
                key={getImageKey(image, index)}
                className="relative min-w-[320px] md:min-w-[420px] aspect-[16/10] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group/item"
              >
                <img
                  src={image.src}
                  alt={
                    image.tag
                      ? `Image for ${image.tag}`
                      : `Dynamic grid image ${index + 1}`
                  }
                  className={`
                    w-full h-full object-cover
                    transition-all duration-700 ease-in-out
                    opacity-100 scale-100
                    ${delayClasses[index % delayClasses.length]}
                    group-hover/item:scale-110
                  `}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover/item:opacity-100 flex items-end p-4">
                  {image.tag && (
                    <span className="text-white text-base font-semibold translate-y-2 group-hover/item:translate-y-0 transition-transform duration-500 ease-out">
                      {image.tag}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};