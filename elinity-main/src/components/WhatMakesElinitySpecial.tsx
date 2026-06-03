import { useState } from 'react';
import { useEffect, useRef } from "react";

const brandColors = {
  indigo: "#7B3FE4",
  royalBlue: "#3B82F6",
  brightCyan: "#00D2FF",
  darkBg: "#03000a"
};

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
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, show];
}

export default function ElinityScreen() {
  return (
    <div style={{
      border:'1px solid rgba(123, 63, 228, 0.15)',
      borderRadius:"0px", 
      boxShadow:"0 10px 40px rgba(0, 0, 0, 0.5)",
      background: `
        radial-gradient(circle at 15% 20%, #0a001f 0%, transparent 40%),
        radial-gradient(circle at 85% 80%, #030014 0%, transparent 40%),
        linear-gradient(to bottom, #03000a, #05001a 40%, #03000a)
      `,
    }}  className="min-h-screen text-white p-8 lowercase">
      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <center>
        <h1 className="text-5xl font-bold mb-16 mt-8">
          what makes{' '}
          <span style={{
            background: "linear-gradient(180deg, #fff 30%, #3B82F6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            elinity
          </span>
          <br />
          special (and why it exists)
        </h1>

          <div
            className="max-w-3xl mx-auto mb-12"
            style={{
              borderRadius: "24px",
              padding: "28px",
              position: "relative",
              background: `
                linear-gradient(145deg, rgba(123, 63, 228, 0.08), rgba(3, 0, 10, 0.65)),
                radial-gradient(circle at top left, rgba(0, 210, 255, 0.05), transparent 45%)
              `,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(123, 63, 228, 0.15)",
              boxShadow: `
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255,255,255,0.03)
              `,
              transition: "all .4s ease"
            }}
          >
          <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed mb-12">
            elinity exists because connection is not a single problem to be solved.
            it’s a lifelong practice. finding the right person is only the beginning.
            the real magic happens when people have the tools, self-awareness, emotional skill, and shared joy to build something lasting.
            that belief shapes everything we’ve built.
          </p>
        </div>
        </center>

        {/* first row of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FeatureCard
            number="🤝"
            title="one platform for every kind of connection."
            content={
              <>
                <div className=" max-w-lg mx-auto p-6 bg-black/40 rounded-2xl border border-white/5 text-neutral-300">
                  <p className="text-sm mb-4 leading-relaxed">
                    most platforms slice your life into categories. one app for dating. 
                    another for friends. another for work. another for growth. <span className="text-white font-medium">real life doesn’t work that way.</span>
                  </p>

                  <div className="space-y-4 border-l border-[#3B82F6]/50 pl-4">
                    <p className="text-sm text-neutral-200">
                      elinity brings romantic connections, social, and leisure relationships and purposeful collaborations into 
                      <span className="text-white"> one unified experience.</span>
                    </p>

                    <div className="text-lg font-bold text-white tracking-tight">
                      <p>one evolving self.</p>
                      <p className="opacity-60 text-base">three profiles. one social universe that adapts as your life changes.</p>
                    </div>

                    <p className="text-[12px] text-neutral-500 italic leading-snug">
                      because in one season you may be seeking deep love.
                      <br></br>in another, new friends.
                      <br></br>in another, collaborators, adventure companions, or people who share your obsessions
                    </p>

                    <p className="text-[12px] text-neutral-500 italic leading-snug">
                      humans are complex. your relationships should be too.
                    </p>
                  </div>
                </div>
              </>
            }
          />
          <FeatureCard
            number="🌊"
            title="deep matching, not shallow sorting"
            content={
              <>
                <div className="max-w-lg mx-auto p-6 bg-black/40 rounded-2xl border border-white/5 text-neutral-300">
                  <p className="text-sm font-bold text-white mb-2">Elinity doesn’t match you on surface traits or swipe-friendly summaries.<br></br>
                   it learns how you think, feel, relate, and move through the world.
                   <br></br> 
                  </p>  
                  <p className="text-sm text-neutral-400 mb-6">using psychometric, behavioral, and psychological insight, combined with emotionally intelligent AI, Elinity looks at:</p>

                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#00D2FF] rounded-full" />
                      <span>values and goals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#00D2FF] rounded-full" />
                      <span>communication and attachment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#00D2FF] rounded-full" />
                      <span>relational needs and attachment dynamics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#00D2FF] rounded-full" />
                      <span>energy, rhythm, and intent</span>
                    </li>
                  </ul>

                  <div className="mt-8 pt-4 border-t border-white/5 italic leading-snug">
                    <p className="text-[11px] tracking-[0.01em] text-neutral-500">
                      this isn’t similarity for convenience.
                      <br></br>it’s alignment for depth.
                      <br></br>because everyone deserves meaningful connection, not transactional encounters.<br></br>people are not commodities.they’re worlds.
                    </p>
                  </div>
                </div>
              </>
            }
          />
        </div>

        {/* second row of cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            number="🤖"
            title="emotionally intelligent, personalized ai"
            content={
              <>
                <div className="max-w-md mx-auto p-5 bg-black/40 rounded-xl border border-white/5 text-neutral-300">
                  <div className="mb-4">
                    <p className="text-[11px] text-[#00D2FF] font-medium">
                      elinity’s ai, lumi, is here to amplify human connection.
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-neutral-400 mb-4">
                    it’s here to help you actualize your relationship potential. 
                    trained on psychology, relational science, and communication theory, 
                    lumi learns from you and alongside you.
                  </p>
                  <p className="text-xs leading-relaxed text-neutral-400 mb-4">
                    it helps you:
                  </p>
                  <div className="space-y-1 text-[12px] text-neutral-200 border-l border-white/10 pl-3 mb-4">
                    <p>• understand yourself more clearly</p>
                    <p>• connect more thoughtfully</p>
                    <p>• communicate more honestly</p>
                    <p>• build relationships with intention</p>
                    <p>• infuse life with wonder, delight, and curiosity</p>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <p className="text-[11px] leading-relaxed text-neutral-500 italic">
                      over time, it becomes a quiet companion for life design and relationship flourishing.
                      one that understands your values, desires, hopes, fears, and patterns, and helps you make better choices without ever forcing them.
                    </p>
                  </div>
                </div>
              </>
            }
          />
          <FeatureCard
            number="🌱"
            title="tools for both finding and flourishing"
            content={
              <>
                <div className="max-w-md mx-auto p-5 bg-black/40 rounded-xl border border-white/5 text-neutral-300">
                  <div className="mb-4">
                    <p className="text-xs text-neutral-500 bold">
                      most platforms stop at the introduction.(and what do you know, they suck at that too).
                    </p>
                  </div>

                  <div className="mb-4 text-xs leading-relaxed">
                    <p className="text-white font-medium">elinity doesn’t.</p>
                    <p className="text-neutral-400">
                      because meeting someone is easy. building something meaningful is not.
                    </p>
                  </div>

                  <div className="space-y-2 border-l border-[#7B3FE4]/30 pl-3 mb-4">
                    <p className="text-[10px] text-neutral-500 tracking-widest font-semibold uppercase">elinity gives you a rich suite of connection tools:</p>
                    <ul className="text-[12px] space-y-1 text-neutral-200">
                      <li>• playful and deep connection games</li>
                      <li>• relationship-building experiences</li>
                      <li>• reflection and journaling</li>
                      <li>• skill-building for eq, listening, and presence</li>
                    </ul>
                  </div>

                  <br></br>

                  <div className="pt-3 border-t border-white/5">
                    <p className="text-[11px] leading-relaxed text-neutral-400">
                      whether it’s a partner, a friend, a family member, or yourself, 
                      elinity helps relationships grow instead of stagnate or fade away.
                    </p>
                  </div>
                  </div>
              </>
            }
          />
          <FeatureCard
            number="🧑"
            title="designed for real humans, not algorithms or npcs"
            content={
              <>
                <div className="max-w-md mx-auto p-5 bg-black/40 rounded-xl border border-white/5 text-neutral-300">
                  <div className="space-y-4">
                    <p className="text-xs leading-relaxed text-neutral-400">
                      elinity is not optimized for endless scrolling, shallow dopamine, or algorithmic noise. 
                      it’s designed for people who care about depth. about presence. about meaning.
                    </p>

                    <div className="space-y-1 text-[11px] leading-relaxed border-l border-[#3B82F6]/30 pl-3">
                      <p>we are building more than an app.</p>
                      <p className="text-neutral-200">we’re building a culture of connection, a vehicle for transformation.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-1 text-[11px] text-neutral-400 italic">
                      <p>• one where quality matters more than quantity</p>
                      <p>• where alignment beats attention</p>
                      <p>• where relationships are treated as something to be nurtured, not gamified</p>
                    </div>
                  </div>

                  <div className='pt-10'></div>

                  <div className="mt-5 pt-3 border-t border-white/5">
                    <p className="text-[11px] text-white/70">
                      that’s what makes elinity special. and that’s why it exists.
                    </p>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ number, title, content }) {
  const [ref, show] = useReveal();

  return (
    <div
      ref={ref}
      className="rounded-xl p-6 h-full text-white flex flex-col"
      style={{
        background: `
          linear-gradient(145deg, rgba(123, 63, 228, 0.05), rgba(3, 0, 20, 0.85)),
          radial-gradient(circle at bottom, rgba(59, 130, 246, 0.05), transparent 40%)
        `,
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(123, 63, 228, 0.12)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
        opacity: 1,  
        transform: show
    ? "translateY(0px) scale(1)"
    : "translateY(0px) scale(.96)",
  transition:
    "transform .7s cubic-bezier(.23,1,.32,1), box-shadow .4s ease",
      }}
    >
      <div>
        <h2
          className="text-xl font-bold mb-4"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span style={{ fontSize: "22px", filter: "drop-shadow(0 0 8px rgba(123, 63, 228, 0.4))" }}>{number}</span>

          <span
            style={{
              background: "linear-gradient(to right, #fff, #3B82F6, #00D2FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </span>
        </h2>

        <div className="text-sm text-white">{content}</div>
      </div>
    </div>
  );
}