"use client";

import React from "react";
import { motion } from "framer-motion";
const GradientTable = ({ headers, rows }: any) => {
  const gradients = [
    "from-indigo-500 to-purple-500",
    "from-purple-500 to-pink-500",
    "from-pink-500 to-rose-500",
    "from-orange-400 to-amber-400"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      {headers.map((head: string, col: number) => (
        <div
          key={col}
          className="rounded-2xl overflow-hidden bg-white/90 shadow-lg border border-white/60 backdrop-blur"
        >
          {/* Header */}
          <div className={`py-3 text-center text-white font-medium bg-gradient-to-r ${gradients[col % gradients.length]}`}>
            {head}
          </div>

          {/* Rows */}
          <div className="divide-y text-sm">
            {rows.map((row: any, i: number) => (
              <div key={i} className="p-3 text-center text-gray-700">
                {row[col]}
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
};

export default function MoreInfo() {
  return (
    <div className="relative bg-violet-200 overflow-hidden">

      {/* Fairy Light Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-pink-400/25 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-400/25 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-20">

        {/* ===== GLASS SECTION WRAPPER ===== */}
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            className="rounded-[36px] p-12 
bg-gradient-to-br from-pink-100 to-pink-200
backdrop-blur-lg border border-fuchsia-600
shadow-[0_40px_120px_rgba(168,85,247,0.20)]"

          >

            <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent tracking-wide">
              {section.title}
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
              {section.content}
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}

/* ================= ALL CONTENT (UNCHANGED) ================= */

const sections = [

{
title: "Subscriptions – For Individuals & Homes",
content: `
Deckoviz is designed to be a living part of your everyday life.

Our consumer subscriptions unlock the full depth of the Deckoviz experience, allowing your frame to evolve with you over time. From deeply personalized art and ambient modes to dream visualization, storytelling, mood-aware curation, and creative exploration, your subscription turns Deckoviz into a dynamic expression of your inner world.

As your tastes, emotions, routines, and seasons change, Deckoviz changes with you. It learns. It adapts. It becomes more personal the longer you use it.

This is not a static art frame.
It’s an ongoing relationship with beauty, creativity, and presence.

Designed for homes, families, creators, and anyone who wants their space to feel alive, intentional, and deeply theirs.

Choose the plan that transforms your space, your vibes, and your daily inspiration.
`
},

{
title: "Why Upgrade?",
content: `
Silver: Ideal for personal use with core features and plenty of monthly art.

Gold premium: For art lovers who want video, voice, more storage, and richer curation.

Ultra diamond: The ultimate, deeply personalised Deckoviz experience with human curation, enterprise-grade perks, and premium status.
`
},

{
title: "For Businesses & Enterprises",
content: `
Enterprise subscriptions are built for spaces that serve people.

Deckoviz for enterprise transforms environments into emotionally intelligent, adaptive experiences. Whether it’s hospitality, wellness, healthcare, retail, workplaces, or public spaces, our enterprise plans enable large-scale personalization, brand-aligned visuals, contextual storytelling, and mood-aware ambience across multiple locations.

With centralized control, multi-device management, advanced customization, and tailored content strategies, Deckoviz becomes a powerful layer of spatial intelligence. One that elevates atmosphere, reinforces brand identity, and enhances how people feel the moment they enter a space.

From calming and restorative environments to inspiring and energizing ones, Deckoviz helps organizations design not just how spaces look, but how they are experienced.

Built for scale.
Designed for humans and dynamic enterprise spaces.
`
},


{
title: "Enterprise Subscriptions – Deckoviz",
content: (
<GradientTable
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
<GradientTable
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
content: (
<GradientTable
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
<GradientTable
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
title: "Premium Combinations (Carving + Colour + Hand-Paint)",
content: (
<GradientTable
headers={["Combination", "Extra Cost", "Example"]}
rows={[
["Simple Carving + Colour Finish", "$145", "Waves carved + Matte Black"],
["Ornate Carving + Colour Finish", "$215", "Floral motifs + Gold metallic"],
["Carving + Dual-Tone Finish", "$240", "Inner White, Outer Wood + Carved theme"],
["Carving + Hand-Painted Details", "$250", "Hand-painted cursive text or motifs"],
["Full Custom (Carving + Colour + Hand-Paint)", "$325", "Branded hotel logo carved + dual-tone + painted highlights"]
]}
/>
)
},

{
title: "Lighting Add-Ons",
content: (
<GradientTable
headers={["Lighting Option","Price","Category","Notes"]}
rows={[
["Side Strip Light (4-sided halo)","$60","Halo Lighting","Frame ambient glow"],
["Front Glow Accents","$50","Front Lighting","Highlight edges"],
["Full Dynamic Ambient Light Package","$120","Smart Lighting","Content reactive"]
]}
/>
)
},

{
title: "How Clients Use This Structure",
content: (
<div className="space-y-6 text-sm">

<ul className="list-disc pl-5 space-y-2">
<li>Start from the default minimalist frame.</li>
<li>Add carving, colour finish, hand-painting or combinations.</li>
<li>Clearly see price impact per upgrade or bundle.</li>
</ul>

<div>
<p className="font-semibold mt-4">Peripherals on website</p>
<ul className="list-disc pl-5 mt-2">
<li>180 mount – suggestion</li>
<li>Movable stand</li>
</ul>
</div>

<div>
<p className="font-semibold mt-4">Later</p>
<ul className="list-disc pl-5 mt-2">
<li>Scent diffuser</li>
<li>8D speakers</li>
</ul>
</div>

</div>
)
}


];
