"use client"

import React from "react"
import { motion } from "framer-motion"

const Partnership: React.FC = () => {
  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden px-4 py-32 sm:px-10"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Soft blue blobs so frosted glass cards are clearly visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
        <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
        <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
        <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
        <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.15)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        
        {/* TOP SECTION (UNWRAPPED FROM CARD) */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-20 px-4">
          <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">
            Let’s Partner Up ✨
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight pb-2">
            <span className="font-serif text-[#182a4a]">Partner with </span>
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] pr-2">Deckoviz</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#1e3a6e] font-semibold">
            Bring Life to Spaces. Get Rewarded.
          </p>

          <p className="text-gray-500 text-sm sm:text-base italic -mt-2">
            (You bring the taste. We bring the wow.)
          </p>

          <div className="pt-4 space-y-6 text-[17px] sm:text-[19px] leading-relaxed text-gray-700">
            <p>
              Deckoviz is the world’s first AI-powered dynamic art frame. A portal
              of expression. A window into soul and space. We’re partnering with
              creators, tastemakers, retailers, sales professionals to bring this
              magic to the world - together.
            </p>
            <p>
              Whether you’re a designer, content creator, retailer, or sales
              professional, there’s a way for you to earn, create, and inspire with
              Deckoviz.
            </p>
          </div>
        </div>

        {/* INDIVIDUAL CARDS FOR PARTNERSHIP TYPES */}

        {/* Interior Designers */}
        <PartnershipCard 
          emoji="🏛️" 
          title="Interior Designers, Architects & Decorators"
        >
          <div className="space-y-6">
            <p className="text-lg text-[#1e3a6e] font-medium leading-relaxed">
              Bring something truly unforgettable into the homes and projects you craft.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Recommend Deckoviz to your clients - post or present - and receive generous
              referral rewards for every purchase made through you. It’s a win-win: your
              clients get the most unique design feature on the market, and you get
              ongoing commission without needing to lift a finger after recommending.
            </p>

            <ul className="list-none space-y-4 text-lg text-gray-700 leading-relaxed bg-white/30 border border-white/40 rounded-2xl p-6 shadow-[inset_0_2px_15px_rgba(255,255,255,0.7)]">
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Earn commission on each sale made by your referred clients</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Custom ordering links and tracking for effortless referral</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Priority access to our team for demos, integrations, and white-glove service</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Elevate your design offering with the most dynamic and intelligent art frame on the market</li>
            </ul>

            <div className="pt-2">
              <p className="text-lg font-bold text-gray-900 mb-3">Perfect for:</p>
              <div className="flex flex-wrap gap-3">
                {["Interior Designers", "Architects", "Home Decorators", "Space Stylists"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium text-sm border border-indigo-100 shadow-sm">{tag}</span>
                ))}
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed pt-2 font-medium">
              Bring Deckoviz into the spaces you help shape - and make them truly unforgettable.
            </p>
          </div>
        </PartnershipCard>

        {/* Independent Sales Partners */}
        <PartnershipCard 
          emoji="💼" 
          title="Independent Sales Partners"
        >
          <div className="space-y-6">
            <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] font-bold leading-relaxed">
              Be your own boss. Earn unlimited commissions.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              This is for the natural connectors, the relationship-builders, the people who love
              talking about products that wow.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              As a Deckoviz Independent Sales Partner, you’ll earn high-value commissions for
              every sale you close. Whether you’re selling to hotels, homes, offices, cafes, or
              wellness spaces - we give you the tools and freedom to build your pipeline and
              unlock real earnings.
            </p>

            <ul className="list-none space-y-4 text-lg text-gray-700 leading-relaxed bg-white/30 border border-white/40 rounded-2xl p-6 shadow-[inset_0_2px_15px_rgba(255,255,255,0.7)]">
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span><strong>Up to $15k+ in commissions/month</strong> or more - no caps</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span><strong>$15-40K base salary</strong> for full-time roles, or uncapped earnings as a contractor</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Full support with product demos, sales decks, onboarding and leads (where applicable)</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Flexible location & working style - remote, on-ground, hybrid</li>
            </ul>

            <div className="pt-2">
              <p className="text-lg font-bold text-gray-900 mb-3">Your job:</p>
              <div className="flex flex-wrap gap-3">
                {["Find leads", "Build relationships", "Close sales", "Earn big"].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold text-sm border border-blue-100 shadow-sm">{tag}</span>
                ))}
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed pt-2">
              Perfect for freelancers, hustlers, lifestyle sellers, or creative professionals with a strong network. Start part-time or go all in. The opportunity is wide open.
            </p>

            <p className="text-gray-500 text-base italic pt-1">
              (Translation: if you’re ambitious, you’ll LOVE this.)
            </p>
          </div>
        </PartnershipCard>

        {/* Retail Partners */}
        <PartnershipCard 
          emoji="🏬" 
          title="Retail Partners (Home Decor, Electronics & Lifestyle Stores)"
        >
          <div className="space-y-6">
            <p className="text-lg text-[#1e3a6e] font-medium leading-relaxed">
              Deckoviz is a head-turner. In-store, it stops people in their tracks.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our Retail Partner Program is for forward-thinking store owners who want to offer
              something unlike anything else.
            </p>

            <ul className="list-none space-y-4 text-lg text-gray-700 leading-relaxed bg-white/30 border border-white/40 rounded-2xl p-6 shadow-[inset_0_2px_15px_rgba(255,255,255,0.7)]">
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Bulk margins and resale opportunities</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Custom in-store displays available</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Marketing and training support</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Smart displays + demo-ready units provided</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Strong post-sale support for your customers</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold pt-2">
              Add cutting-edge, design-forward tech to your inventory - and watch footfall and margins rise.
            </p>
          </div>
        </PartnershipCard>

        {/* Influencers */}
        <PartnershipCard 
          emoji="🌟" 
          title="Influencers & Content Creators"
        >
          <div className="space-y-6">
            <p className="text-lg text-[#1e3a6e] font-medium leading-relaxed">
              If you’re in the lifestyle, home, luxury, tech, or design space - Deckoviz is made for your audience.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Join our affiliate program or create branded collaborations to introduce Deckoviz
              to your community and get rewarded.
            </p>

            <ul className="list-none space-y-4 text-lg text-gray-700 leading-relaxed bg-white/30 border border-white/40 rounded-2xl p-6 shadow-[inset_0_2px_15px_rgba(255,255,255,0.7)]">
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Generous affiliate commissions for every tracked sale</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Surprise & delight campaigns</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Launch features, content kits, and co-branded collabs</li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>Creative freedom to tell the Deckoviz story your way</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold pt-2">
              Deckoviz is made to be seen - and felt. Let’s show your audience something
              they’ve never seen before.
            </p>
          </div>
        </PartnershipCard>

        {/* Apply CTA Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative rounded-[32px] p-8 md:p-14 text-center mt-16 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.6)",
            borderTop: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 20px 50px rgba(37,99,235,0.15), inset 0 2px 20px rgba(255,255,255,0.8)",
          }}
        >
          {/* subtle shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <h2 className="text-3xl sm:text-4xl font-serif text-[#182a4a] font-extrabold mb-6">
            Apply to Partner
          </h2>

          <p className="text-xl text-gray-700 leading-relaxed mb-10 max-w-2xl mx-auto">
            We’re building a world of immersive, intentional spaces. Let’s create something unforgettable - together.
          </p>

          <a href="/contact" className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white font-bold text-lg shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300">
            Submit Partner Application
          </a>
        </motion.div>

      </div>
    </div>
  )
}

const PartnershipCard = ({ emoji, title, children }: { emoji: string, title: string, children: React.ReactNode }) => {
  return (
    <motion.div
      className="group relative rounded-[32px] p-8 md:p-12 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 100%)",
        backdropFilter: "blur(40px) saturate(200%)",
        WebkitBackdropFilter: "blur(40px) saturate(200%)",
        border: "1px solid rgba(255,255,255,0.50)",
        borderTop: "1px solid rgba(255,255,255,0.90)",
        borderLeft: "1px solid rgba(255,255,255,0.70)",
        boxShadow: "0 10px 40px rgba(31,38,135,0.1), inset 0 2px 20px rgba(255,255,255,0.8)",
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 30px 70px rgba(37,99,235,0.25), 0 15px 30px rgba(24,42,74,0.15), inset 0 2px 25px rgba(255,255,255,1)" 
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background blue light on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Shine Sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />

      <div className="relative z-10 flex items-start gap-5 mb-8">
        <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(37,99,235,0.15),inset_0_1px_3px_rgba(255,255,255,0.9)] border border-white/70 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {emoji}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182a4a] leading-tight pt-2 drop-shadow-sm group-hover:text-blue-900 transition-colors">
          {title}
        </h2>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default Partnership
