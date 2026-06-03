import React, { useState, forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
        else setShow(false);
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, show] as const;
}

const WaitlistSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardRef, show] = useReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("waitlist")
      .insert([{ name, email }]);

    if (!error) {
      alert("You're on the waitlist 🚀");
      setName("");
      setEmail("");
    } else if (error.code === "23505") {
      alert("You're already on the waitlist 🙂");
    } else {
      console.error(error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#03000a] py-32 px-6 overflow-hidden lowercase"
    >
      {/* Brand Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7B3FE4]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00D2FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        ref={cardRef}
        initial={false}
        animate={{ 
          opacity: show ? 1 : 0, 
          y: show ? 0 : 60,
          scale: show ? 1 : 0.98 
        }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="relative max-w-5xl mx-auto text-center z-10"
      >
        {/* The Main Brand Glass Card */}
        <div className="relative group overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl p-8 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#00D2FF]/5 opacity-40" />
          
          {/* Header */}
          <h2 className="text-4xl sm:text-7xl font-bold mb-12 tracking-tighter text-white leading-tight">
            join the{" "}
            <span style={{ 
              background: "linear-gradient(to right, #3B82F6, #7B3FE4, #00D2FF)", 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              elinity waitlist
            </span>{" "}
            ✨
          </h2>

          {/* Narrative Content */}
          <div className="text-neutral-400 text-lg md:text-xl space-y-8 mb-16 leading-relaxed max-w-2xl mx-auto font-light">
            <p>
              we’re building something special, <br className="hidden sm:block" />
              and we’re doing it carefully.
            </p>
            <p className="text-neutral-300">
              we’re onboarding in small, thoughtful batches so every new member
              gets the full <span className="text-[#3B82F6] font-medium">elinity experience</span> not a rushed one.
            </p>
            <p className="text-neutral-500 text-base">
              add your name and email below. we’ll reach out as soon as we’re
              ready to welcome you in and help you experience the elinity magic.
            </p>
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto mb-16 p-2.5 
                       rounded-[2rem] bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-2xl"
          >
            {/* Name Input */}
            <div className="relative flex-1 group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#3B82F6] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <input
                disabled={loading}
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-none rounded-2xl pl-14 pr-4 py-5 text-white placeholder-white/10 outline-none focus:ring-0 transition-all font-light"
              />
            </div>

            {/* Email Input */}
            <div className="relative flex-[1.2] group border-t md:border-t-0 md:border-l border-white/5">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#3B82F6] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <input
                disabled={loading}
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-none rounded-2xl pl-14 pr-4 py-5 text-white placeholder-white/10 outline-none focus:ring-0 transition-all font-light"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-10 py-5 font-bold rounded-2xl text-white
                         bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4]
                         shadow-[0_10px_25px_rgba(59,130,246,0.2)]
                         hover:shadow-[0_15px_35px_rgba(59,130,246,0.4)]
                         transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "joining..." : "join now"}
            </motion.button>
          </form>

          {/* Footer Note */}
          <div className="max-w-xl mx-auto border-t border-white/5 pt-12">
            <p className="text-neutral-500 text-sm mb-6 tracking-wide font-light">
              in the meantime, join our newsletter for behind-the-scenes updates,
              new features, and early glimpses of what’s coming.
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-transparent bg-gradient-to-r from-[#3B82F6] to-[#00D2FF] bg-clip-text font-medium italic">
                good things grow best when they’re nurtured.
              </span>
              <span className="grayscale opacity-50">🌱</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

WaitlistSection.displayName = "WaitlistSection";
export default WaitlistSection;