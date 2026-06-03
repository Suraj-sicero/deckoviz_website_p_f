import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  isDisappointed?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  { id: 1, content: "i love how rich the app experience is, even without having users. the team told me the single-player mode would be so incredible that i would enjoy the app as is. they were not wrong." },
  { id: 2, content: "wanted to infuse some fun, some spark into my relationship with my bf. boy, has this been a revelation. a ton of fun!" },
  { id: 3, content: "i love meeting cool people, but only if they are my type of people. and my type of people aren't that common, so it hasn't been super easy being social despite the latent desire. i love how Elinity can help with social connections across the board. i am getting the sense this year is going to be my best year socially, and i need that! " },
  { id: 4, isDisappointed: true, content: "elinity promised to find me my soul mate. i have been using it for 3 weeks, and i still haven't found her. major disappointment." },
  { id: 5, content: "i have been wanting to take a step back from the madness of the world and just go inside, explore, and lumi has been such a great companion in my inner life journey. could not recommend more!" },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Memoized navigation to prevent unnecessary effect re-runs
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  }, []);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // --- automatic sliding logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextTestimonial, activeIndex]); 

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-black overflow-hidden lowercase min-h-[500px] flex items-center" style={{height: '700px'}}>
      <div className="container px-4 mx-auto">
        
        {/* section header */}
        <div className="max-w-4xl mx-auto mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{
            background: "linear-gradient(90deg, #ffffff,  #6d5cff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            testimonials 
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-md mx-auto md:mx-0 normal-case">
            here is what some of our early testers have had to say:
          </p>
        </div>

        {/* wide carousel card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-neutral-900/40 rounded-3xl border border-white/5 p-6 md:p-12 min-h-[320px] md:min-h-[280px] flex flex-col justify-between transition-all duration-500">
            
            {/* content section */}
            <div className="relative z-10">
              <p className={`text-lg md:text-2xl leading-relaxed transition-opacity duration-300 ${current.isDisappointed ? 'text-neutral-500 italic' : 'text-neutral-200'}`}>
                "{current.content}"
              </p>
            </div>
            
            {/* navigation controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-6">
              {/* indicators */}
              <div className="flex space-x-3">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      index === activeIndex ? 'w-8 bg-fuchsia-500' : 'w-3 bg-neutral-800'
                    }`}
                    aria-label={`go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* arrow buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-white/5 active:scale-95 hover:text-white transition-all"
                  aria-label="previous"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-white/5 active:scale-95 hover:text-white transition-all"
                  aria-label="next"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;