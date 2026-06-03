import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";

function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;
        lastScrollY.current = currentScrollY;

        if (entry.isIntersecting && scrollingDown) {
          setShow(true);
        }
        if (!entry.isIntersecting) {
          setShow(false);
        }
      },
      { threshold: 0.05 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, show];
}

function AnimatedStep({ step, index, isLast }) {
  const [ref, show] = useReveal();

  return (
    <div
      ref={ref}
      className="space-y-8"
      style={{
        opacity: 1,
        transform: show
          ? "translateY(0px) scale(1)"
          : "translateY(60px) scale(.98)",
        transition: "all .8s cubic-bezier(.23,1,.32,1)",
      }}
    >
      <div className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl bg-white/[0.02] backdrop-blur-2xl border border-white/10">
        
        <div className="md:w-1/2 p-4 md:p-6 lg:p-8 flex items-center justify-center bg-black/20">
          <img
            src={step.image}
            alt={`step ${step.number}`}
            className="rounded-2xl w-[90%] max-h-[400px] object-contain shadow-2xl"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-xs font-mono text-[#00D2FF] mb-4 tracking-[0.2em] border border-[#00D2FF]/30 w-fit px-3 py-1 rounded-full">
            {step.number}
          </div>

          <h3 className="text-2xl md:text-4xl font-bold mb-6 text-white tracking-tight">
            {step.title}
          </h3>

          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
            {step.content || step.description}
          </p>
        </div>
      </div>

      {!isLast && (
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
      )}
    </div>
  );
}

export default function ElinityWorks() {
  const brandGradient = {
    background: 'radial-gradient(circle at top, #0A001F 0%, #03000a 100%)',
  };

  const steps = [
    {
      number: "01",
      title: "create your deep profile",
      description: `elinity begins by helping you express who you really are.
it’s an onboarding journey, not a form.
      
you’ll share things like:

- what you’re here for right now: love, friendship, collaboration, growth, or a mix
- your values, beliefs, rhythms, and lifestyle
- your passions, curiosities, quirks, and edges
- how you communicate, connect, and attach
- what makes you feel safe, excited, seen, and alive

the result is a living profile that evolves with you.
representing not just what you do.
but who you are becoming.`,
      image: "/deep.jpeg",
    },
    {
      number: "02",
      title: "let lumi truly understand you",
      description: `behind elinity is lumi, your emotionally intelligent ai companion.
lumi doesn’t rush to match. it listens first.

by combining:
- psychometrics
- behavioral patterns
- psychological and emotional insight
- your journals, reflections, and preferences

lumi builds a deep understanding of you, your values, your goals, and the kind of people and relationships that actually fit your life.
this is alignment, not search.`,
      image: "/22.jpeg",
    },
    {
      number: "03",
      title: "choose your intention",
      description: `connection looks different in different seasons.
      
so you choose the mode you’re in:
💕 romantic connection
🧩 leisure & friendship
🚀 collaboration & projects
🌱 relationship deepening
🪞 self-relationship and growth

you can toggle modes on or off anytime.
romantic mode can be paused once you’ve found your person.
leisure and collaboration can run alongside everything else.
your life isn’t one-dimensional. elinity isn’t either.
`,
      image: "/24.jpeg",
    },
    {
      number: "04",
      title: "meet only the people who cross your bar",
      description: `this is again where elinity is radically different.
we don’t show you endless profiles.
we don’t ask you to swipe through noise.
lumi only introduces someone if they cross your compatibility threshold.
by default, that bar is high. you can raise or lower it.

if no one crosses the bar, you see no one.
simple. respectful. intentional.

when a match happens:

- both people are told they’ve been intentionally recommended
- alignment exists on both sides
- consent and readiness matter

this alone changes how connection feels.`,
      image: "/26.jpeg",
    },
    { 
      number: "05",
      title: "connect with ease and intention",
      description: `once, there’s a mutual yes, elinity helps you take the next step naturally.

through:
- gentle icebreakers
- vibe checks
- prompts that actually spark conversation
- games and rituals that remove awkwardness

no forced small talk.
no guessing what to say.
      
just momentum, with care.`,
      image: "/20.jpeg",
    },
    { 
      number: "06",
      title: "grow yourself and your relationships",
      description: `elinity doesn’t disappear once you meet someone.

this is where it really begins.

you get access to a rich suite of tools for:
- deepening romantic relationships
- strengthening friendships and family bonds
- building emotional intelligence and communication skills
- reflection, journaling, and self-exploration
- playful connection through games and shared experiences

because great relationships don’t run on autopilot.
they’re designed, tended, repaired, and celebrated.
elinity is not just about meeting the right people.
it’s about becoming the kind of person who builds beautiful relationships, again and again.`,
      image: "/17.jpeg",
    },
  ];

  const tourSteps = [
    { title: "enter your space", description: "Sign in to continue your journey and access your personalized experience", image: "/13.jpeg" },
    { title: "you’re in.", description: `Explore, connect, and experience something meaningful today`, image: "/15.jpeg" },
    { title: "daily recommendations", description: "Fresh connections and meaningful possibilities, curated just for you.", image: "/12.jpeg" },
    { title: "your connections", description: "Everything meaningful, organized in one place", image: "/17.jpeg" },
    { title: "My Profile", description: "Your personal space to express who you are and what you’re looking for.", image: "/deep.jpeg" },
    { title: "know yourself. know others.", description: "your deeper identity shapes every meaningful connection.", image: "/18.jpeg" },
    { title: "Conversations", description: "Where connections turn into meaningful conversations.", image: "/20.jpeg" },
    { title: "Your Circle", description: "Meaningful people. Real connections. One space.", image: "/21.jpeg" },
    { title: "Prompt Your Way to Your People", description: "Choose a mode. Find your vibe. Meet your people.", image: "/24.jpeg" },
    { title: "It’s a Match!", description: "Two paths just aligned.Take the first step and begin something real.", image: "/23.jpeg" },
  ];

  const [infoRef, infoShow] = useReveal();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollSync = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScrollSync);
    }
    return () => scrollEl?.removeEventListener('scroll', handleScrollSync);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 20;
        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollManual = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const moveAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: moveAmount, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({ left: index * clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen text-white py-20 px-4 md:px-12 lg:px-20 lowercase relative overflow-hidden"
      style={brandGradient}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />

      {/* header */}
      <motion.div className="text-center mb-24 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
          <span className="text-white">how </span>
          <span style={{ background: "linear-gradient(to right, #3B82F6, #7B3FE4, #00D2FF)", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            elinity works
          </span>
        </h1>
        <div className="max-w-3xl mx-auto text-neutral-400 font-light text-lg space-y-6">
          <p>
            from finding your purpose or your people, to building boundless relationships 
            that actually grow, elinity is designed to move with you through every phase of connection.
          </p>
          <div className="space-y-2">
            <p className="text-white font-medium text-xl">not in a rush.</p>
            <p className="text-neutral-500 font-medium text-xl">not randomly.</p>
            <p className="text-[#3B82F6] font-bold text-2xl mt-4">and never below your bar.</p>
          </div>
          <p className="text-neutral-500 pt-8 italic">here's how it works, end to end.</p>
        </div>
      </motion.div>

      {/* steps cards */}
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        {steps.map((step, index) => (
          <AnimatedStep
            key={index}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>

      {/* -------- INFO SECTION -------- */}
      <div
        ref={infoRef}
        className="relative py-24 px-6 md:px-16 mt-32 bg-white/[0.01] backdrop-blur-3xl border border-white/5 overflow-hidden"
        style={{
          borderRadius: "3rem",
          opacity: 1,
          transform: infoShow ? "translateY(0px)" : "translateY(120px)",
          transition: "all 1s cubic-bezier(.23,1,.32,1)",
        }}
      >
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full h-[400px] bg-[#3B82F6]/10 blur-[150px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            quick tour - inside <span className="text-[#3B82F6]">elinity</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-[#00D2FF] tracking-wider text-sm">What you’ll find inside</h2>
              <ul className="space-y-4 text-neutral-400 font-light">
                {["Intentional profiles that go deeper", "Dynamic compatibility insights", "Warm conversation prompts", "Rituals and shared goals", "Weekly reflection moments", "Playful connection games", "Visual intention tracking", "AI-guided conversations"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-[#00D2FF] tracking-wider text-sm">What it feels like</h2>
              <div className="space-y-6 text-xl text-neutral-300 font-light">
                <p>It feels intentional, not noisy.</p>
                <p>It feels human, not transactional.</p>
                <p className="text-white font-medium border-l-2 border-[#3B82F6] pl-6 py-2">
                  It feels like building something, not browsing or swiping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div 
        className="relative py-32 px-6 md:px-16 mt-24 group" 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* <p className="text-neutral-500 font-light">Hover to pause, scroll to explore.</p> */}
          </div>

          {/* Nav Arrows */}
          <button 
            onClick={() => scrollManual('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:bg-[#3B82F6]/20 hover:border-[#3B82F6]/40"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button 
            onClick={() => scrollManual('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:bg-[#3B82F6]/20 hover:border-[#3B82F6]/40"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Carousel */}
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            {tourSteps.map((step, index) => (
              <div 
                key={index} 
                className="min-w-[85%] md:min-w-[70%] lg:min-w-[900px] snap-center shrink-0"
              >
                <div className="flex flex-col md:flex-row bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl mx-2">
                  <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-black/40">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-[260px] md:w-[340px] h-auto rounded-[3.5rem] shadow-[0_0_50px_rgba(59,130,246,0.15)] border-[10px] border-[#03000a] object-contain"
                    />
                  </div>

                  {/* Hide content on mobile to focus on image */}
                  <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-center text-left">
                    <h2 className="text-3xl font-bold mb-6 tracking-tight leading-tight" style={{ background: 'linear-gradient(90deg, #fff, #3B82F6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                      {step.title}
                    </h2>
                    <p className="text-neutral-400 text-lg leading-relaxed font-light">
                      <span className="inline-flex mr-3 w-6 h-6 rounded-full bg-[#3B82F6]/10 items-center justify-center border border-[#3B82F6]/30 text-[#3B82F6] text-[10px] font-bold">✓</span>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {tourSteps.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-500 rounded-full h-1 ${
                  activeIndex === idx ? "w-12 bg-[#3B82F6]" : "w-2 bg-white/10 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}