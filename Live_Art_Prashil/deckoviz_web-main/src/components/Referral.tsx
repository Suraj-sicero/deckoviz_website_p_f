import React, { useEffect, useRef } from "react";
import { Gift, Send, CheckCircle, CreditCard, DollarSign, Sparkles, ArrowRight } from "lucide-react";
import StarSparkles from "./StarSparkles";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const steps = [
  {
    icon: Send,
    label: "Share your link",
    desc: "Send your unique referral link to anyone who'd love the experience.",
    color: "from-[#182A4A] to-[#2563EB]",
  },
  {
    icon: CreditCard,
    label: "They purchase",
    desc: "They buy a Deckoviz Smart Frame - automatically tagged to you.",
    color: "from-[#182A4A] to-[#2563EB]",
  },
  {
    icon: CheckCircle,
    label: "Confirmed active",
    desc: "Their subscription stays active past the refund window.",
    color: "from-[#182A4A] to-[#2563EB]",
  },
  {
    icon: DollarSign,
    label: "You get paid",
    desc: "We wire $20 directly to your bank or PayPal. Done.",
    color: "from-[#182A4A] to-[#2563EB]",
  },
];

// Tilt card hook
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

const Referral: React.FC = () => {
  const tilt = useTilt();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(150deg, #e0e7ff 0%, #ede9fe 35%, #f5f3ff 60%, #eef2ff 100%)" }}>
      <StarSparkles />

      {/* ── Animated gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-32 -right-32 w-[560px] h-[560px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)" }}
        />
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #4f46e5 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 border border-[#2563EB]/30 shadow-sm shadow-[#2563EB]/20"
            style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)" }}
          >
            <motion.div animate={{ rotate: [0, 15, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}>
              <Gift size={15} className="text-[#2563EB]" strokeWidth={2.5} />
            </motion.div>
            <span className="text-xs font-bold text-[#182A4A] tracking-[0.15em] uppercase">Partner Program</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="bg-gradient-to-br from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
              Deckoviz
            </span>
            <br />
            <span className="italic bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
              Referrals
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto w-24 h-[3px] rounded-full bg-gradient-to-r from-[#182A4A] to-[#2563EB] mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
          >
            Share the joy of beautiful spaces. Earn{" "}
            <span className="font-bold text-[#2563EB] underline decoration-[#182A4A]/30 decoration-2 underline-offset-4">$20 cash</span>{" "}
            for every person you bring to Deckoviz.
          </motion.p>
        </div>

        {/* ── Big reward hero block ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 1000 }}
          className="max-w-2xl mx-auto mb-16"
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          <motion.div
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
            className="relative rounded-3xl overflow-hidden border border-white/40 shadow-[0_30px_80px_rgba(79,70,229,0.35)]"
          >
            {/* card bg */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #182A4A 0%, #2563EB 100%)" }} />
            {/* shine overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)" }} />
            {/* animated shimmer */}
            <motion.div
              animate={{ x: ["-150%", "250%"] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3 rotate-12"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
            />

            <div className="relative z-10 px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-indigo-200 text-xs uppercase tracking-[0.2em] font-semibold mb-2">Per Successful Referral</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white/80 text-4xl font-light">$</span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="text-8xl font-extrabold text-white leading-none tracking-tight"
                    style={{ textShadow: "0 0 40px rgba(255,255,255,0.4)" }}
                  >
                    50
                  </motion.span>
                </div>
                <p className="text-indigo-200 text-sm mt-3 leading-relaxed max-w-xs">
                  Wired directly to your bank or PayPal. No hoops, no delays.
                </p>
              </div>

              <div className="text-center md:text-right">
                <div className="inline-block rounded-2xl border border-white/20 px-6 py-4 mb-4" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                  <p className="text-indigo-200 text-xs uppercase tracking-widest mb-2">Or choose</p>
                  <div className="space-y-1.5 text-sm">
                    {["2 mo. Ultra Premium", "3 mo. Premium", "4 mo. Basic"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-white/90">
                        <CheckCircle size={13} className="text-indigo-300 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-indigo-300 text-xs italic">Subscriptions offer better long-term value ✦</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Steps ── */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-2xl font-bold mb-10 text-gray-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How it works
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ icon: Icon, label, desc, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(99,102,241,0.12)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.22)] transition-all duration-400"
                style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(18px)" }}
              >
                {/* top accent line */}
                <div className={`h-[3px] w-full bg-gradient-to-r ${color}`} />

                {/* hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="p-6 relative z-10">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color} shadow-md shadow-[#2563EB]/20`}>
                      <Icon className="text-white" size={18} />
                    </div>
                    <span className="text-xs font-bold text-[#2563EB] tracking-widest">0{i + 1}</span>
                  </div>

                  <h4 className="font-bold text-gray-900 text-base mb-2">{label}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>

                {/* arrow connector (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 items-center justify-center rounded-full border-2 border-[#2563EB]/30 bg-white shadow-md shadow-[#2563EB]/10">
                    <ArrowRight size={13} className="text-[#2563EB]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <motion.a
            href="mailto:referrals@deckoviz.com?subject=Deckoviz Referral&body=Hi Deckoviz Team,%0D%0A%0D%0AI would like to start referring Deckoviz.%0D%0A%0D%0AThanks!"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-12 py-4 rounded-full font-semibold text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #182A4A, #2563EB)", boxShadow: "0 16px 40px rgba(37,99,235,0.4)" }}
          >
            {/* shimmer */}
            <motion.span
              animate={{ x: ["-200%", "300%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3 rotate-12"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
            />
            <Sparkles className="relative z-10" size={17} />
            <span className="relative z-10 tracking-wide">Start Referring Now</span>
            <Send className="relative z-10" size={16} />
          </motion.a>

          <p className="mt-5 text-gray-400 text-sm">
            By participating, you agree to our{" "}
            <a href="terms-conditions" className="text-[#2563EB] hover:text-[#182A4A] font-medium hover:underline transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Referral;
