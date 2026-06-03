import React, { useEffect, useRef, useState } from 'react';

const AnimatedBlock = ({ children, delay = 0 }) => {
  const ref = useRef(null);
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
          ? "translateY(0px)"
          : "translateY(50px)",
        transition: `all 0.9s cubic-bezier(.23,1,.32,1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const ElinityHowToUse = () => {
  const useCases = [
    {
      id: "01",
      title: "to find their person",
      content: `we won’t promise “the one”.
                unless we have every human on earth on the platform, that would be dishonest.
                but we can promise this:
                your odds of meeting someone deeply aligned are far higher here than almost anywhere else.
                because we optimize for fit across the rich dimensions of your being, not volume.`,
    },
    {
      id: "02",
      title: "to find their tribe",
      content: "people to play, create, build, and learn with. friendships, leisure companions, collaborators, creative companions. the people who make life feel fuller, lighter, more alive.",
    },
    {
      id: "03",
      title: "to build better relationships",
      content: `
                with your partner.
                with your family.
                with your closest friends.
                using tools, games, rituals, prompts, and guided experiences
                that help relationships stay intentional, playful, and emotionally rich`,
    },
    {
      id: "04",
      title: "to explore and grow the self-relationship",
      content: `
      through voice journaling, reflection, skill-building, and self-exploration.
building emotional intelligence, communication skills, and inner clarity over time.
because relationships don’t just improve on their own.
they improve when you do.`,
    }
  ];

  return (
    <div className="bg-[#03000a] text-neutral-300 py-24 px-6 font-sans antialiased lowercase relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* header */}
        <AnimatedBlock>
          <header className="mb-24 border-b border-white/5 pb-12">
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
              style={{
                background: "linear-gradient(to right, #fff, #3B82F6, #7B3FE4)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              how people use elinity
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
              elinity isn’t a single-use app. <br/>
              it’s a relationship platform you grow into. 
              most people use it in <span className="text-white">four core ways</span>.
            </p>
          </header>
        </AnimatedBlock>

        {/* use cases container */}
        <AnimatedBlock delay={0.1}>
          <div 
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(59, 130, 246, 0.1)",
              borderRadius: "2rem",
              padding: "3rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
              {useCases.map((item, idx) => (
                <AnimatedBlock key={item.id} delay={idx * 0.1}>
                  <div className="space-y-5 group">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-[#00D2FF] border border-[#00D2FF]/30 px-2 py-0.5 rounded tracking-widest uppercase">
                        {item.id}
                      </span>
                      <h2 className="text-xl font-semibold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors duration-300">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-neutral-400 leading-relaxed font-light whitespace-pre-line text-sm md:text-base">
                      {item.content}
                    </p>
                  </div>
                </AnimatedBlock>
              ))}
            </div>
          </div>
        </AnimatedBlock>

        {/* footer */}
        <AnimatedBlock delay={0.2}>
          <footer className="mt-32 pt-16 border-t border-white/5">
            <div className="max-w-2xl">
              <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 font-light">
                elinity is not for everyone. and that’s intentional. it’s for people who take connection 
                <span className="text-white italic"> seriously</span>, 
                <span className="text-white italic"> and playfully</span>, and 
                <span className="text-white italic"> with heart</span>.
              </p>
              <h2 className="text-3xl font-bold tracking-tighter" style={{
                background: "linear-gradient(to right, #fff, #3B82F6)",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                welcome to elinity.
              </h2>
            </div>
          </footer>
        </AnimatedBlock>

      </div>
    </div>
  );
};

export default ElinityHowToUse;