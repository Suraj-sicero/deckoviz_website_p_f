"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, Sparkles, Layers, Box, Settings, Zap } from "lucide-react";

// Modern, Glassmorphic Premium Table
const PremiumTable = ({ headers, rows }: any) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white/20 backdrop-blur-[24px] border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] relative mt-6">
      {/* Specular highlight for table */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 pointer-events-none" />
      <div className="relative overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b border-indigo-100/50">
              {headers.map((head: string, col: number) => (
                <th key={col} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50/50">
            {rows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-white/50 transition-colors duration-200 group">
                {row.map((cell: any, col: number) => (
                  <td key={col} className={`px-6 py-4 text-[15px] ${col === 0 ? 'font-semibold text-gray-800 group-hover:text-[#2563EB] transition-colors' : 'text-gray-600'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function MoreInfo() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50/50 via-white to-blue-50 overflow-hidden min-h-screen">

      {/* Premium Orb Backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] left-1/3 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-[1000px] mx-auto px-6 py-32 space-y-20">
        
        {/* Header Text */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent inline-block mb-6 tracking-tight">
            Structure & Options
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Everything you need to know about customizing, upgrading, and maximizing your Deckoviz experience.
          </p>
        </div>

        {/* ===== GLASS SECTION WRAPPER ===== */}
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] p-10 md:p-14 
bg-white/30 backdrop-blur-[40px] border border-white/50
shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)]
transition-all duration-500 relative overflow-hidden group"
          >
            {/* Ultra-glassy glare reflections */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/5 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/50 rounded-[2.5rem] pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-indigo-500 flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {section.icon || <Info className="w-6 h-6 text-white" />}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#182A4A] tracking-tight group-hover:text-[#2563EB] transition-colors duration-300">
                {section.title}
              </h2>
            </div>

            <div className="relative z-10 text-gray-600 leading-relaxed text-[16px] whitespace-pre-line space-y-6">
              {section.content}
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}

/* ================= ALL CONTENT ================= */
const sections = [
  {
    title: "How Clients Use This Structure",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    content: (
      <div>
        <p className="text-lg font-medium text-gray-800 mb-6">A straightforward pathway from simplicity to full immersion.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/50 p-6 rounded-2xl border border-white text-center shadow-sm">
            <div className="w-10 h-10 mx-auto bg-indigo-100 text-[#2563EB] rounded-full flex items-center justify-center font-bold mb-4">1</div>
            <p className="font-medium text-gray-800">Start from the default minimalist frame.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-2xl border border-white text-center shadow-sm relative">
            <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-indigo-100" />
            <div className="w-10 h-10 mx-auto bg-indigo-100 text-[#2563EB] rounded-full flex items-center justify-center font-bold mb-4">2</div>
            <p className="font-medium text-gray-800">Add carving, colour finish, hand-painting or combinations.</p>
          </div>
          <div className="bg-white/50 p-6 rounded-2xl border border-white text-center shadow-sm relative">
            <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-indigo-100" />
            <div className="w-10 h-10 mx-auto bg-indigo-100 text-[#2563EB] rounded-full flex items-center justify-center font-bold mb-4">3</div>
            <p className="font-medium text-gray-800">Clearly see price impact per upgrade or bundle.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100/50">
            <p className="font-bold text-[#182A4A] text-lg mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-[#2563EB]"/> Peripherals on website
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> 180° mount (recommended)</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> Movable stand</li>
            </ul>
          </div>

          <div className="bg-teal-50/50 p-8 rounded-3xl border border-teal-100/50">
            <p className="font-bold text-[#182A4A] text-lg mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-teal-600"/> Later Enhancements
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Scent diffuser</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> 8D spatial speakers</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Subscriptions – For Individuals & Homes",
    content: `Deckoviz is designed to be a living part of your everyday life.

Our consumer subscriptions unlock the full depth of the Deckoviz experience, allowing your frame to evolve with you over time. From deeply personalized art and ambient modes to dream visualization, storytelling, mood-aware curation, and creative exploration, your subscription turns Deckoviz into a dynamic expression of your inner world.

As your tastes, emotions, routines, and seasons change, Deckoviz changes with you. It learns. It adapts. It becomes more personal the longer you use it.

This is not a static art frame.
It’s an ongoing relationship with beauty, creativity, and presence.

Designed for homes, families, creators, and anyone who wants their space to feel alive, intentional, and deeply theirs.

Choose the plan that transforms your space, your vibes, and your daily inspiration.`
  },
  {
    title: "Why Upgrade?",
    content: (
      <div className="grid grid-cols-1 gap-4">
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-xl border border-white shadow-sm">S</div>
          <div>
            <h4 className="font-bold text-lg text-slate-700">Silver</h4>
            <p className="text-gray-600 mt-1">Ideal for personal use with core features and plenty of monthly art.</p>
          </div>
        </div>
        <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center font-bold text-yellow-900 text-xl border border-white shadow-sm">G</div>
          <div>
            <h4 className="font-bold text-lg text-yellow-900">Gold Premium</h4>
            <p className="text-yellow-800 mt-1">For art lovers who want video, voice, more storage, and richer curation.</p>
          </div>
        </div>
        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 rounded-full flex items-center justify-center font-bold text-white text-xl border border-white shadow-sm">D</div>
          <div>
            <h4 className="font-bold text-lg text-[#2563EB]">Ultra Diamond</h4>
            <p className="text-blue-800/80 mt-1">The ultimate, deeply personalised Deckoviz experience with human curation, enterprise-grade perks, and premium status.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "For Businesses & Enterprises",
    content: `Enterprise subscriptions are built for spaces that serve people.

Deckoviz for enterprise transforms environments into emotionally intelligent, adaptive experiences. Whether it’s hospitality, wellness, healthcare, retail, workplaces, or public spaces, our enterprise plans enable large-scale personalization, brand-aligned visuals, contextual storytelling, and mood-aware ambience across multiple locations.

With centralized control, multi-device management, advanced customization, and tailored content strategies, Deckoviz becomes a powerful layer of spatial intelligence. One that elevates atmosphere, reinforces brand identity, and enhances how people feel the moment they enter a space.

From calming and restorative environments to inspiring and energizing ones, Deckoviz helps organizations design not just how spaces look, but how they are experienced.

Built for scale. Designed for humans and dynamic enterprise spaces.`
  },
  {
    title: "Enterprise Subscriptions – Deckoviz",
    icon: <Layers className="w-6 h-6 text-white" />,
    content: (
      <PremiumTable
        headers={["Feature", "Details", "Benefit", "Notes"]}
        rows={[
          ["Branded Content Packs","Custom visuals","Brand immersion","Included"],
          ["Marketplace Posting","Premium visibility","Higher reach","Unlimited"],
          ["Custom AI Features","Tailored models","Personalization","Enterprise"],
          ["Voice Customer Care","Dedicated manager","Fast resolution","Priority"],
          ["Multi-Location Licensing","Central control","Scale easily","Included"]
        ]}
      />
    )
  },
  {
    title: "Deckoviz Add-Ons & Enhancements",
    content: (
      <PremiumTable
        headers={["Add-On","Price","Type","Notes"]}
        rows={[
          ["Rotating TV Mount","$180","Mount","Hardware"],
          ["Metallic Stand","$220","Stand","Premium"],
          ["Wooden Stand","$260","Stand","Natural"],
          ["Robotic Frame","$1200","Mobile","Motorised"],
          ["Mobile Stand","$350","Mobile","Manual"],
          ["Scent Diffuser","$250","Sensory","Optional"],
          ["16D Speakers","$1100","Audio","Immersive"],
          ["Lighting Bars","$480","Lighting","Synced"]
        ]}
      />
    )
  },
  {
    title: "Colour Finish Options",
    icon: <Settings className="w-6 h-6 text-white" />,
    content: (
      <PremiumTable
        headers={["Finish","Cost","Style","Notes"]}
        rows={[
          ["Natural Wood","Included","Classic","Default"],
          ["Matte Black","$35","Modern","Popular"],
          ["Pure White","$35","Clean","Minimal"],
          ["Charcoal Grey","$35","Elegant","Neutral"],
          ["Pantone Custom","$65","Custom","Any shade"],
          ["Dual Tone","$85","Designer","Two colours"]
        ]}
      />
    )
  },
  {
    title: "Frame Customisation",
    content: (
      <PremiumTable
        headers={["Option","Cost","Category","Notes"]}
        rows={[
          ["Default Frame","Included","Base","Standard"],
          ["Wider Frame","$25–60","Upgrade","Size"],
          ["Classic Ornate","$120","Style","Decorative"],
          ["Metallic Finish","$75","Finish","Gold/Silver"],
          ["Simple Carving","$80","Carving","Patterns"],
          ["Ornate Carving","$150","Carving","Detailed"],
          ["Branded Carving","$200","Brand","Logo"],
          ["Hand Painted","$120","Art","Custom"]
        ]}
      />
    )
  },
  {
    title: "Premium Combinations",
    content: (
      <div>
        <p className="text-gray-500 mb-4">(Carving + Colour + Hand-Paint)</p>
        <PremiumTable
          headers={["Combination", "Extra Cost", "Example"]}
          rows={[
            ["Simple Carving + Colour Finish", "$145", "Waves carved + Matte Black"],
            ["Ornate Carving + Colour Finish", "$215", "Floral motifs + Gold metallic"],
            ["Carving + Dual-Tone Finish", "$240", "Inner White, Outer Wood + Carved theme"],
            ["Carving + Hand-Painted Details", "$250", "Hand-painted cursive text or motifs"],
            ["Full Custom", "$325", "Branded hotel logo carved + dual-tone + painted highlights"]
          ]}
        />
      </div>
    )
  },
  {
    title: "Lighting Add-Ons",
    content: (
      <PremiumTable
        headers={["Lighting Option","Price","Category","Notes"]}
        rows={[
          ["Side Strip Light (4-sided halo)","$60","Halo Lighting","Frame ambient glow"],
          ["Front Glow Accents","$50","Front Lighting","Highlight edges"],
          ["Full Dynamic Ambient Light Package","$120","Smart Lighting","Content reactive"]
        ]}
      />
    )
  }
];
