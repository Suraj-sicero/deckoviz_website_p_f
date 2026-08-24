import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Building2,
  Globe2,
  Mail,
  GraduationCap,
  BookOpen,
  Sparkle,
  Gift,
  Zap,
  Coins,
  Wrench,
  TrendingUp,
  School,
  Target,
  Truck,
  MapPin,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function PartnerProgramSection() {
  return (
    <section id="partner-program" className="relative py-24 sm:py-32 bg-[#060b13] text-white overflow-hidden border-t border-white/10">
      {/* Background Ambient Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[40%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[25%] w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg text-xs font-bold text-blue-300 uppercase tracking-widest mb-6"
          >
            <Sparkle className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span>Partner Program · Deckoviz for Schools</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white mb-6 leading-tight"
          >
            Help Us Bring About a <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent italic">
              Revolution in Education
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed font-medium"
          >
            Every Child Deserves a Classroom Built for How They Actually Learn. This is the portal that brings teaching to life, for the classrooms that need it most.
          </motion.p>
        </div>

        {/* HERO QUOTE / VISION CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] p-8 sm:p-12 mb-20 bg-white/5 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80" />
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg border border-white/30">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            <div>
              <blockquote className="text-xl sm:text-2xl text-white font-serif italic leading-relaxed mb-4">
                "Some of the world's best classrooms don't have the budget for a whiteboard replacement, let alone an AI-powered learning platform. We think that shouldn't be the reason a child misses out on it."
              </blockquote>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
                — The Deckoviz Education Pledge
              </p>
            </div>
          </div>
        </motion.div>

        {/* THE IDEA SECTION */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/20 px-4 py-1.5 rounded-full border border-indigo-400/30">
              The Idea
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-white mt-4 mb-6">
              Personalised Learning for Every Classroom
            </h3>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Deckoviz for Schools brings immersive, personalised, generative, interactive learning to a classroom, delivered through Vizzy and the Deckoviz platform. It's already transforming classrooms that can afford it.
            </p>
            <p className="text-lg sm:text-xl font-bold text-white mt-4 italic">
              We want to bring it to the classrooms that can't.
            </p>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              That's why we've opened up two ways to sponsor a portal for a school that needs one: for companies and organisations, and for individuals.
            </p>
          </motion.div>

          {/* DUAL SPONSORSHIP CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CARD 1: FOR COMPANIES */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] p-8 sm:p-10 bg-white/5 backdrop-blur-2xl border border-white/15 hover:border-blue-400/60 shadow-xl hover:shadow-blue-500/20 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80" />

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                      Corporate Track
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-1">
                      For Companies & Organisations
                    </h4>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 border border-blue-400/30 mt-0.5">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">You fund the hardware</strong>
                      We provide Deckoviz units to schools at cost—no margin built in for us—allowing us to lower sponsorship costs and expand our mission to thousands of schools and millions of kids.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-400/30 mt-0.5">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">We handle the deployment</strong>
                      Setup, onboarding, and classroom integration, all managed end-to-end by our team.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 border border-cyan-400/30 mt-0.5">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">Discounted, ongoing access</strong>
                      Reduced-cost subscriptions keep the platform growing continuously for the students using it.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-400/30 mt-0.5">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">A genuinely different ESG / CSR story</strong>
                      A flagship initiative you can point to, visit, and measure real educational impact from.
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="mailto:vizzy@deckoviz.com?subject=Sponsor%20-%20Company%20Partnership"
                className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-widest text-center shadow-lg hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 border border-white/20 block"
              >
                Partner With Us (Corporate CSR) →
              </a>
            </motion.div>

            {/* CARD 2: FOR INDIVIDUALS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] p-8 sm:p-10 bg-white/5 backdrop-blur-2xl border border-white/15 hover:border-emerald-400/60 shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                      Individual Track
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-1">
                      For Individuals
                    </h4>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-400/30 mt-0.5">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">The best gift for a child</strong>
                      Meaningful learning journeys. A classroom that finally teaches the way children actually love to learn—delighted, engaged, and remembered fondly.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 border border-teal-400/30 mt-0.5">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">Direct classroom sponsorship</strong>
                      You don't need to be a company to make this happen. Individuals can sponsor a Deckoviz portal directly for a public school, funding a single unit or more at cost for a classroom that would otherwise never have access.
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 border border-cyan-400/30 mt-0.5">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">Full Transparency & Connection</strong>
                      You'll know exactly which school and which classroom your sponsorship reached, giving students a real gift that lasts for years.
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="mailto:vizzy@deckoviz.com?subject=Sponsor%20-%20Individual%20Sponsorship"
                className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-widest text-center shadow-lg hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 border border-white/20 block"
              >
                Sponsor a Classroom Portal →
              </a>
            </motion.div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/20 px-4 py-1.5 rounded-full border border-cyan-400/30">
              Transparent Process
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-white mt-4">
              How It Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                num: "01",
                icon: <Target className="w-5 h-5 text-blue-400" />,
                title: "Choose Sponsorship",
                desc: "Choose to sponsor a full portal, or contribute toward one alongside other sponsors."
              },
              {
                num: "02",
                icon: <Truck className="w-5 h-5 text-indigo-400" />,
                title: "We Handle Everything",
                desc: "We handle school selection, deployment, and setup—all you provide is the gift."
              },
              {
                num: "03",
                icon: <MapPin className="w-5 h-5 text-cyan-400" />,
                title: "Exact Tracking",
                desc: "You'll know exactly which school and which classroom your sponsorship reached."
              },
              {
                num: "04",
                icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                title: "At Cost, Zero Margin",
                desc: "Every portal is offered at cost, nothing more, so your contribution goes as far as possible."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                    {step.icon}
                  </div>
                  <span className="text-xs font-extrabold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-400/20">
                    STEP {step.num}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Deep Impact Callout Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-slate-900/80 backdrop-blur-2xl border border-blue-400/30 text-center max-w-4xl mx-auto shadow-xl">
            <p className="text-base sm:text-lg text-blue-200 font-medium leading-relaxed italic">
              This is, genuinely, one of the most meaningful things a single gift can do. This isn’t a donation that disappears into an overhead budget. This is a living, evolving learning companion, present in a real classroom, for years to come.
            </p>
          </div>
        </div>

        {/* WHERE WE'RE STARTING */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/15 text-center max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto mb-6">
              <Globe2 className="w-8 h-8 text-indigo-400" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-3.5 py-1.5 rounded-full border border-indigo-400/30">
              Global Rollout
            </span>

            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-white mt-4 mb-4">
              Where We're Starting
            </h3>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
              We're prioritising government and public schools, starting in <strong className="text-white">India, the UK, and the US</strong>, expanding wherever the need is real and sponsors are ready to help.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-white/10 text-white font-bold text-xs border border-white/20">
                India Government Schools
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white font-bold text-xs border border-white/20">
                UK State Schools
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white font-bold text-xs border border-white/20">
                US Public Schools
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white font-bold text-xs border border-white/20">
                Global Expansion
              </span>
            </div>
          </motion.div>
        </div>

        {/* LET'S TALK / CONVERSION CTA BANNER */}
        <div className="relative rounded-[2.5rem] p-8 sm:p-14 overflow-hidden bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white text-center shadow-2xl border border-white/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
              Let's Talk
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Whether you're a company exploring an ESG or CSR partnership or an individual who wants to sponsor a single classroom, we'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:vizzy@deckoviz.com?subject=Sponsor"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 via-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 border border-white/30 w-full sm:w-auto"
              >
                <Mail className="w-4 h-4" />
                <span>Sponsor a Portal / Partner With Us</span>
              </a>

              <button
                onClick={() => (window.location.href = "/core-reading")}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <BookOpen className="w-4 h-4" />
                <span>Learn More About Deckoviz for Schools</span>
              </button>
            </div>

            <p className="mt-6 text-xs text-slate-400 font-medium">
              Send us an email with the subject line <strong className="text-blue-300 font-bold">"Sponsor"</strong> at <a href="mailto:vizzy@deckoviz.com?subject=Sponsor" className="text-blue-300 underline font-bold">vizzy@deckoviz.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
