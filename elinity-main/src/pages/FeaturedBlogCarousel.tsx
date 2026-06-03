import React, { useState, useEffect, useRef } from "react";
import { blogs } from "../constants/blogs";
import { Link } from "react-router-dom";

const targetIndices = [0, 2, 3, 4, 5];

const featuredBlogs = blogs
  .filter((_, i) => targetIndices.includes(i))
  .map((b) => ({ ...b, tag: "Featured" }));

const ANIMATION_DURATION = 500;
const AUTO_DELAY = 4500;

const n = featuredBlogs.length;

/* clones for infinite loop */
const slides = [
  featuredBlogs[n - 1],
  ...featuredBlogs,
  featuredBlogs[0],
];

const FeaturedBlogCarousel = () => {
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const timerRef = useRef<any>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  /* dot index */
  const dotIndex = (index - 1 + n) % n;

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIndex((prev) => prev - 1);
  };

  const goTo = (i: number) => {
    setIndex(i + 1);
  };

  /* autoplay */
  useEffect(() => {
    clearTimer();
    timerRef.current = setTimeout(next, AUTO_DELAY);
    return clearTimer;
  }, [index]);

  /* infinite reset */
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, ANIMATION_DURATION);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(n);
      }, ANIMATION_DURATION);
    }
  }, [index]);

  /* re-enable transition */
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

  /* swipe */
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!startX.current) return;

    const diff = startX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }

    startX.current = null;
  };

  return (
    <div className="w-full flex flex-col items-center">

      {/* carousel */}
      <div className="relative w-full max-w-2xl">

        <div
          className="overflow-hidden rounded-3xl"
          style={{ height: "clamp(160px,40vw,260px)" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex h-full"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${index * (100 / slides.length)}%)`,
              transition: transition
                ? `transform ${ANIMATION_DURATION}ms ease`
                : "none",
            }}
          >
            {slides.map((b, i) => (
              <div
                key={i}
                style={{ width: `${100 / slides.length}%` }}
              >
              <Link to={`/blog/${b.id}`}>
                <div className="relative h-full group">

                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay updated to deeper black/indigo */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(3,0,20,.9), rgba(3,0,20,.2))",
                    }}
                  />

                  <div className="absolute bottom-4 left-4 text-white pr-6">

                    <p className="text-xs text-blue-400 opacity-80 mb-1">{b.date}</p>

                    <h2 className="text-lg font-bold leading-tight mb-2">
                      {b.title}
                    </h2>

                    {/* Read More - Updated color to Royal Blue */}
                    <div className="flex items-center gap-1 text-sm font-semibold text-blue-300 group-hover:text-white transition">
                      <span>Read more</span>

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        <path
                          d="M2 7h9M7 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                  </div>

                </div>
              </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow - Updated Gradient to Elinity Blue/Indigo */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-20
          w-9 h-9 sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-full
          backdrop-blur-md
          shadow-lg hover:shadow-blue-500/20
          hover:scale-110
          transition-all duration-300
          bg-gradient-to-l from-[#0a0a2e] to-[#3B82F6] hover:from-[#1e1e4a] hover:to-[#60a5fa]"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7l5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right Arrow - Updated Gradient to Elinity Blue/Indigo */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-20
          w-9 h-9 sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-full
          backdrop-blur-md
          shadow-lg hover:shadow-blue-500/20
          hover:scale-110
          transition-all duration-300
          bg-gradient-to-l from-[#0a0a2e] to-[#3B82F6] hover:from-[#1e1e4a] hover:to-[#60a5fa]"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2l5 5-5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

      </div>

      {/* dots - Updated to Royal Blue / Space Blue */}
      <div className="flex gap-2 mt-4">
        {featuredBlogs.map((_, i) => (
          <div
            key={i}
            onClick={() => goTo(i)}
            className="cursor-pointer rounded-full transition-all"
            style={{
              width: dotIndex === i ? 24 : 8,
              height: 4,
              background: dotIndex === i ? "#3B82F6" : "#1e1e4a",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogCarousel;