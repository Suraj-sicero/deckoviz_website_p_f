"use client"

import React from "react"
import { motion } from "framer-motion"
import { Building, Star, Briefcase, Store, ArrowRight } from "lucide-react"

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-10 max-w-4xl mx-auto">
            {[
              { id: "interior-designers", title: "Interior designers &\narchitects", icon: <Building size={22} strokeWidth={1.7} />, iconStyle: "group-hover:-rotate-3" },
              { id: "content-creators", title: "Content creators", icon: <Star size={22} strokeWidth={1.7} />, iconStyle: "group-hover:rotate-6" },
              { id: "sales-partners", title: "Retail sales partnerships", icon: <Briefcase size={22} strokeWidth={1.7} />, iconStyle: "group-hover:-rotate-3" },
              { id: "retail-partners", title: "Retail partner programme", icon: <Store size={22} strokeWidth={1.7} />, iconStyle: "group-hover:rotate-3" }
            ].map((card, i) => (
              <a 
                key={i} 
                href={`#${card.id}`} 
                className="group flex items-center justify-between px-5 py-4 rounded-[28px] hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 100%)",
                  backdropFilter: "blur(32px) saturate(200%)",
                  WebkitBackdropFilter: "blur(32px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  borderTop: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 10px 30px rgba(37,99,235,0.05), inset 0 2px 20px rgba(255,255,255,0.6)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(37,99,235,0.15), inset 0 2px 20px rgba(255,255,255,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(37,99,235,0.05), inset 0 2px 20px rgba(255,255,255,0.6)";
                }}
              >
                <div className={`w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[#f0f4ff]/80 to-[#e0e7ff]/50 border border-white/60 flex shrink-0 items-center justify-center text-[#2563EB] shadow-[0_2px_10px_rgba(37,99,235,0.06)] group-hover:scale-110 transition-transform duration-300 ${card.iconStyle}`}>
                  {card.icon}
                </div>
                <div className="flex-1 flex justify-center px-1">
                  <span className="font-[800] text-[16px] text-[#182a4a] tracking-tight text-center whitespace-pre-wrap leading-snug">
                    {card.title}
                  </span>
                </div>
                <ArrowRight size={20} strokeWidth={2} className="shrink-0 text-gray-300 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* INDIVIDUAL CARDS FOR PARTNERSHIP TYPES */}

        {/* Interior Designers */}
        <PartnershipCard 
          id="interior-designers"
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
          id="sales-partners"
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
          id="retail-partners"
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
          id="content-creators"
          emoji="🌟" 
          title="Influencers & Content Creators"
        >
          <div className="space-y-8">
            {/* Intro */}
            <div className="space-y-4">
              <p className="text-[20px] text-[#2563EB] font-bold leading-relaxed">
                If you're in the lifestyle, home, luxury, tech, or design space - Deckoviz is made for your audience.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Join our affiliate programme or create branded collaborations to introduce Deckoviz to your community and get rewarded.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white/40 border border-white/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(37,99,235,0.05)] space-y-4">
              <h3 className="text-xl font-bold text-[#182a4a] mb-2 flex items-center gap-2">
                <span className="text-[#2563EB]">✨</span> How It Works
              </h3>
              <p className="text-[17px] text-gray-700 leading-relaxed">
                We work with creators across follower sizes. If you have an engaged audience of 2,000 or more on Instagram - or a meaningful presence on TikTok, YouTube, or any other platform - we'd love to hear from you. What matters to us is genuine fit: if your audience cares about how their spaces look and feel, they will love Deckoviz.
              </p>
              <p className="text-[17px] text-gray-700 leading-relaxed">
                Every unit sold through your affiliate link is tracked and credited to you automatically. You earn <strong className="text-[#2563EB]">5% commission</strong> on each sale, with no ongoing effort required beyond your initial content. Post once, earn every time someone buys through your link.
              </p>
            </div>

            {/* What the Partnership Looks Like */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#182a4a] border-b border-white/60 pb-3">
                What the Partnership Looks Like
              </h3>
              <p className="text-lg text-gray-700 font-medium">
                We don't believe in blind partnerships. Here's exactly how we do this:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Step 1 */}
                <div className="bg-gradient-to-b from-white/70 to-white/30 border border-white/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(37,99,235,0.05)] hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-100/90 text-[#2563EB] flex items-center justify-center font-extrabold text-lg mb-4">1</div>
                  <h4 className="font-bold text-[#182a4a] text-lg mb-2">The Intro Call</h4>
                  <p className="text-gray-700 text-[15px] leading-relaxed">
                    We get on a quick call with you, walk you through Deckoviz, show you a live demo of the product in action, and answer any questions. No pressure, no obligation. We want you to genuinely love what you see before you say yes.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="bg-gradient-to-b from-white/70 to-white/30 border border-white/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(37,99,235,0.05)] hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-100/90 text-[#2563EB] flex items-center justify-center font-extrabold text-lg mb-4">2</div>
                  <h4 className="font-bold text-[#182a4a] text-lg mb-2">Your Content</h4>
                  <p className="text-gray-700 text-[15px] leading-relaxed">
                    If you're excited about the product, you create a video or a few posts talking about it honestly - what it is, how it looks, how it made you feel. Direct your audience to our website via your personal link. That's it. Every sale that comes through is yours.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="bg-gradient-to-b from-white/70 to-white/30 border border-white/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(37,99,235,0.05)] hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-100/90 text-[#2563EB] flex items-center justify-center font-extrabold text-lg mb-4">3</div>
                  <h4 className="font-bold text-[#182a4a] text-lg mb-2">Going Deeper</h4>
                  <p className="text-gray-700 text-[15px] leading-relaxed">
                    For creators who want to do more than a one-off post, we offer a few additional options depending on your interest and your audience size.
                  </p>
                </div>
              </div>

              {/* Going deeper details */}
              <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-6 md:p-8 mt-4 shadow-[inset_0_2px_20px_rgba(255,255,255,0.8)]">
                <h4 className="font-bold text-xl text-[#182a4a] mb-6 border-b border-[#2563EB]/20 pb-4">Deeper Collaborations</h4>
                <ul className="space-y-6 text-gray-700 text-[16px]">
                  <li className="flex items-start gap-4">
                    <span className="mt-1 flex-shrink-0 text-[#2563EB] bg-blue-50 border border-blue-100 p-1.5 rounded-lg">✦</span>
                    <div>
                      <strong className="text-[#182a4a] block mb-1 text-[17px]">Heavily discounted Deckoviz unit</strong> 
                      If you want to actually live with the product, use it daily, and create ongoing content from real experience, we can offer you a significantly discounted unit. The content that comes from genuine daily use is always the most compelling - and your audience will feel that.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 flex-shrink-0 text-[#2563EB] bg-blue-50 border border-blue-100 p-1.5 rounded-lg">✦</span>
                    <div>
                      <strong className="text-[#182a4a] block mb-1 text-[17px]">Gifted unit for high-performing partners</strong> 
                      If you drive meaningful growth through your posts, word of mouth, or ongoing content - we will gift you a full Deckoviz unit, no strings attached. You keep it, use it, and if you want to keep creating content from it, all the better. This is our way of saying thank you to partners who genuinely move the needle.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 flex-shrink-0 text-[#2563EB] bg-blue-50 border border-blue-100 p-1.5 rounded-lg">✦</span>
                    <div>
                      <strong className="text-[#182a4a] block mb-1 text-[17px]">Co-created content and launches</strong> 
                      For the right creators, we're open to deeper collaborations - early access to new product drops, co-branded campaigns, behind-the-scenes content, or being featured as a launch partner when we release new features or collections.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* What you get */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-[#182a4a]">What You Get</h3>
              <ul className="list-none space-y-3 text-[17px] text-gray-700 leading-relaxed bg-white/50 border border-white/60 rounded-2xl p-6 shadow-[inset_0_2px_15px_rgba(255,255,255,0.7)]">
                <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></span><strong className="text-[#182a4a]">5% commission</strong> on every sale through your affiliate link, tracked automatically</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></span>A live product demo before you commit to anything</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></span>Content kits and creative assets to support your posts</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></span>Access to the Deckoviz content library, moodscapes, and Vizzy features to inspire your content</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></span>The chance to be among the first creators to introduce a genuinely new product category to your audience</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></span>Potential for a discounted or gifted unit based on your engagement and growth</li>
              </ul>
            </div>

            {/* Ready to Partner / CTA */}
            <div className="bg-gradient-to-br from-[#eef2ff]/80 to-white/90 border border-[#2563EB]/20 rounded-[28px] p-8 md:p-10 mt-8 text-center shadow-[0_8px_30px_rgb(37,99,235,0.06)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent_80%)] pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-[#182a4a] mb-5 tracking-tight">Ready to Partner?</h3>
                <p className="text-[17px] text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
                  Email us at <a href="mailto:affiliates@deckoviz.com" className="font-bold text-[#2563EB] hover:text-[#182a4a] underline transition-colors">affiliates@deckoviz.com</a> with your name, contact details, your platform and follower count, and a brief note about why you think Deckoviz fits your audience. We'll get back to you quickly and set up a call to walk through everything together.
                </p>
                <div className="h-[1px] w-2/3 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent mx-auto mb-6" />
                <p className="text-[19px] font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#182a4a] to-[#2563EB]">
                  Deckoviz is made to be seen - and felt. Let's show your audience something they've never seen before.
                </p>
              </div>
            </div>
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

const PartnershipCard = ({ id, emoji, title, children }: { id?: string, emoji: string, title: string, children: React.ReactNode }) => {
  return (
    <motion.div
      id={id}
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
