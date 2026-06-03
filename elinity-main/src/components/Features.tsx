import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function FeaturesPage() {
  const brandColors = {
    indigo: "#7B3FE4",
    royalBlue: "#3B82F6",
    brightCyan: "#00D2FF",
    darkBg: "#03000a"
  };

  const backgroundGradient = {
    background: `radial-gradient(circle at 50% 0%, rgba(123, 63, 228, 0.15) 0%, transparent 50%), 
                 linear-gradient(to bottom, #03000a, #06001a)`,
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const AnimatedCard = ({ children, index }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setShow(entry.isIntersecting),
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0px)" : "translateY(20px)",
          transition: `all 0.6s ease ${index * 0.05}s`,
        }}
      >
        {children}
      </div>
    );
  };

const featureCards = [
  {
    title: 'curated recommendations (no browsing fatigue)',
    features: [
`we connect you in a radically different way.

you don’t scroll endlessly.
you don’t swipe aimlessly.`,

`we only show you people who cross your bar.

if no one crosses it, we show you no one. simple.`,

`every recommendation is vetted by our hand-designed matching system.

powered by ai that understands you deeply:
• your personality
• your values
• your goals
• your preferences
• your direction of life

lumi also helps with vibe checks and ice breakers.`,

`so you never waste time meeting someone you wouldn’t actually gel with.

starting conversations won’t feel awkward or boring again.`
    ]
  },

  {
    title: 'prompt your way to people',
    features: [
`sometimes you don’t want “suggestions”.

you want someone specific.`,

`just tell elinity what you’re looking for.

“i just moved to nyc. find me my kind of people.

into:
• ai/ml
• tennis
• hiking
• astrophysics
• art
• late-night conversations.”

done.`,

`elinity translates human intent into matching logic.

lumi helps narrow, refine, and sense-check the results.`
    ]
  },

  {
    title: 'voice journaling (solo or together)',
    features: [
`this is one of our core experiences.`,

`talk it out. don’t type it out.`,

`voice journaling makes reflection:
• easier
• more natural
• more emotionally honest`,

`you can:
• journal solo
• journal as a couple
• journal about relationships, moods, patterns, growth`,

`lumi listens, reflects, and offers action items and insights.

without judgment. without therapy-speak.`
    ]
  },

  {
    title: 'your life book',
    features: [
`think of this as your:
• visual journal
• highlights book
• private instagram
• personal memory garden

all in one.`,

`you can add:
• photos
• videos
• thoughts
• voice notes

• keep some entries just for you
• share others with friends, family, or your partner`,

`they can respond, reflect, and add their thoughts.

your life, but richer. deeper. intentional.`
    ]
  },

  {
    title: 'connection games (yes, actually good ones)',
    features: [
`connection doesn’t have to be serious all the time.

it can be playful, curious, surprising.`,

`we’ve built a growing suite of connection games:
• some deep and long-form
• some light and funny
• some for self-exploration
• some for couples
• some for friendships and families`,

`they’re designed to create:
• laughter
• emotional closeness
• unexpected conversations
• real moments`
    ]
  },

  {
    title: 'relationship home (your relationship os)',
    features: [
`this is where everything comes together.`,

`your relationship home includes:
• streaks and gentle nudges
• reminders and rituals
• daily relationship cards
• shared life book
• connection games
• skill-building sessions
• prompt-based experiences (like couples visualization)

it’s a living space for your relationships.`
    ]
  },

  {
    title: 'skill learning + growth sessions',
    features: [
`relationships are deepened with skills and skills can be learned.`,

`lumi currently offers 90 guided skill modules, with more on the way.`,

`these help you build skills like:
• listening
• emotional awareness
• boundaries
• communication
• intimacy
• self-understanding
• resilience`,

`sessions adapt to you over time and evolve as you do.`
    ]
  },

  {
    title: 'matching beyond romance',
    features: [
`elinity isn’t just for love.`,

`we offer high-quality curated matching for:
• leisure
• travel
• hobbies
• friendships
• collaborations
• passion projects
• creative projects`,

`each uses different matching logic.

because there is so much flavour and richness in platonic relationships.`
    ]
  }
];

  const visibleCards = isExpanded ? featureCards : featureCards.slice(0, 4);

const renderFeatureBlock = (text, idx) => {
  const lines = text.split('\n').filter(l => l.trim() !== "");

  return (
    <div key={idx} className="flex gap-3">
      
      {/* Dot */}
      <div className="mt-[6px] w-2 h-2 rounded-full bg-[#00D2FF] shrink-0 shadow-[0_0_8px_rgba(0,210,255,0.6)]" />

      {/* Text block */}
      <div className="space-y-2">
        {lines.map((line, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed font-light text-blue-50/80"
          >
            {line.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};
  
  return (
    <div style={backgroundGradient} className="min-h-screen text-white px-6 py-20 lowercase">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span style={{
              background: "linear-gradient(to right, #fff, #3B82F6, #7B3FE4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              how we help you live your best social life
            </span>
          </h1>
          <p className="text-neutral-500 text-lg">
            some core experiences, modes, and features of{" "}
            <span className="text-white font-medium">
              elinity v1.0
            </span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleCards.map((card, index) => (
            <AnimatedCard key={index} index={index}>
              <div className="h-[450px] rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl hover:bg-white/[0.04] hover:border-[#3B82F6]/40 transition-all duration-500 flex flex-col p-7 shadow-2xl">

                <div className="flex justify-between items-start mb-5">
                  <h2 className="text-[18px] font-semibold text-[#3B82F6]">
                    {card.title}
                  </h2>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-6">
                  {card.features.map((feature, fIdx) =>
                    renderFeatureBlock(feature, fIdx)
                  )}
                </div>

                <div className="h-16 bg-gradient-to-t from-[#06001a] to-transparent pointer-events-none" />
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Button */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#00D2FF]/50 hover:scale-105 transition-all duration-500"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-blue-100">
              {isExpanded ? 'collapse' : 'explore all experiences'}
            </span>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
      `}} />
    </div>
  );
}