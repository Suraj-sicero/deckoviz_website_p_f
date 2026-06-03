import React, { useEffect, useRef, useState } from 'react';

interface FeatureProps {
  title: string;
  description: string;
  subtext?: string;
  delay?: number;
}

const FeatureCard = ({ title, description, subtext, delay = 0 }: FeatureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        } else {
          setShow(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 1,
        transform: show
          ? "translateY(0px) scale(1)"
          : "translateY(40px) scale(.98)",
        transition: `all 0.8s cubic-bezier(.23,1,.32,1) ${delay}s`,
        border: "1px solid rgba(59, 130, 246, 0.1)",
        background: "rgba(255, 255, 255, 0.02)",
      }}
      className="group relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:border-[#3B82F6]/40 hover:bg-white/[0.04] lowercase shadow-2xl"
    >
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#3B82F6] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-neutral-400 leading-relaxed mb-3 font-light">{description}</p>
      {subtext && (
        <p className="text-sm font-medium text-[#00D2FF]/70 italic">{subtext}</p>
      )}
    </div>
  );
};

export default function ElinityDiscovery() {
  const lastCardRef = useRef<HTMLDivElement>(null);
  const [showLast, setShowLast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLast(true);
        } else {
          setShowLast(false);
        }
      },
      { threshold: 0.1 }
    );

    if (lastCardRef.current) observer.observe(lastCardRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "🧬 rich profiles",
      description: "we design profiles to reflect the depth of real humans.",
      subtext: "not just prompts and selfies."
    },
    {
      title: "🎯 threshold-based suggestions",
      description: "you never waste time on low-fit connections.",
      subtext: "only those who cross your bar will be recommended."
    },
    {
      title: "🧠 deep, multi-dimensional matching",
      description: "values, goals, beliefs, desires, personality, and preferences.",
      subtext: "not vibes or appearances alone."
    },
    {
      title: "🤝 proactive relationship support",
      description: "lumi doesn’t just react. it helps you flourish proactively.",
    },
    {
      title: "🎲 meaningful play",
      description: "joy, curiosity, novelty, and wonder are essential.",
    },
    {
      title: "✍️ profile creation assistant",
      description: "lumi helps you create a profile that feels like you.",
      subtext: "honest, warm, with a little sparkle."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#03000a] text-white selection:bg-blue-500/30 overflow-x-hidden lowercase pb-24">
      
      <section className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto z-10">
        
        {/* header */}
        <header className="mb-20 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            some other things we have added <br />
            <span style={{
              background: "linear-gradient(to right, #fff, #3B82F6, #7B3FE4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              to create the best experience for you
            </span>
          </h2>
        </header>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} delay={idx * 0.05}/>
          ))}

          {/* last card */}
          <div
            ref={lastCardRef}
            style={{
              opacity: showLast ? 1 : 0,
              transform: showLast
                ? "translateY(0px) scale(1)"
                : "translateY(60px) scale(.98)",
              transition: "all 1s cubic-bezier(.23,1,.32,1)",
              border: "1px solid rgba(123, 63, 228, 0.15)",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(123, 63, 228, 0.02))"
            }}
            className="md:col-span-2 lg:col-span-3 relative p-8 md:p-12 rounded-[2.5rem] backdrop-blur-2xl transition-all duration-500 hover:border-[#3B82F6]/30 shadow-2xl"
          >
            <div className="max-w-3xl relative z-10">
              <span className="text-[#00D2FF] font-mono tracking-widest lowercase mb-6 block text-xl" style={{ textShadow: '0 0 15px rgba(0,210,255,0.4)' }}>
                ✨ one last thing
              </span>
              <p className="text-lg md:text-xl text-neutral-300 font-light mb-8 leading-relaxed">
                we’re adding new experiences every week. there’s a lot waiting behind the scenes. 
                <br/>we just don’t dump everything on you at once.<br/>
                elinity is designed to be discovered slowly.
              </p>
              <h3 className="text-3xl md:text-5xl font-semibold text-white mb-6">
                layer by layer. <span className="text-neutral-500">moment by moment.</span>
              </h3>
              <p className="text-lg md:text-xl text-neutral-400 font-light mb-12">
                <span className="italic text-neutral-600">like relationships should be.</span>
              </p>
              
              <div className="pt-8 border-t border-white/5">
                 <p className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                   welcome to elinity.
                </p>
              </div>
            </div>
            {/* Inner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B3FE4]/10 blur-[100px] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3B82F6]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7B3FE4]/10 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#00D2FF]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}