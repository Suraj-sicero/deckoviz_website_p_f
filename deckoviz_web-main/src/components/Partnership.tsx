"use client"

import type React from "react"

const Partnership: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#8490f9] px-4 py-10 sm:px-10">
      {/* dreamy blobs */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 -left-24 h-[380px] w-[380px] rounded-full bg-white/55 blur-[100px]" />
        <div className="absolute top-28 -right-28 h-[460px] w-[460px] rounded-full bg-blue-500/45 blur-[115px]" />
        <div className="absolute bottom-[-160px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-500/45 blur-[125px]" />
      </div>

      {/* glass card wrapper */}
      <div className="relative mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[44px] border border-white/35 bg-white/25 shadow-[0_40px_140px_rgba(0,0,0,0.26)] backdrop-blur-[10px]">
          {/* gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/45 via-indigo-200/10 to-fuchsia-500/20" />

          {/* glossy highlight */}
          <div className="absolute -top-52 left-[-35%] h-[560px] w-[980px] rotate-12 bg-white/20 blur-2xl" />
          <div className="absolute bottom-[-280px] right-[-220px] h-[520px] w-[520px] rounded-full bg-white/10 blur-2xl" />

          {/* inner padding */}
          <div className="relative px-6 py-10 sm:px-12 sm:py-14 text-gray-900">

            {/* Page container */}
            <div className="max-w-5xl mx-auto">
              {/* Top section */}
              <div className="space-y-3">
                <p className="text-gray-900/80 text-sm font-semibold tracking-wide">
                  Let’s Partner Up ✨
                </p>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 drop-shadow leading-tight">
                  Partner with Deckoviz
                </h1>

                <p className="text-lg sm:text-xl text-gray-700 font-semibold">
                  Bring Life to Spaces. Get Rewarded.
                </p>

                {/* light sass */}
                <p className="text-gray-600 text-sm sm:text-base italic">
                  (You bring the taste. We bring the wow.)
                </p>

                <div className="pt-5 space-y-4 text-[16px] sm:text-[18px] leading-8 text-gray-800 text-justify">
                  <p>
                    Deckoviz is the world’s first AI-powered dynamic art frame. A portal
                    of expression. A window into soul and space. We’re partnering with
                    creators, tastemakers, retailers, sales professionals to bring this
                    magic to the world   together.
                  </p>
                  <p>
                    Whether you’re a designer, content creator, retailer, or sales
                    professional, there’s a way for you to earn, create, and inspire with
                    Deckoviz.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Interior Designers */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>🎨</span> Interior Designers, Architects & Decorators
                </h2>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  Bring something truly unforgettable into the homes and projects you craft.
                </p>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  Recommend Deckoviz to your clients - post or present - and receive generous
                  referral rewards for every purchase made through you. It’s a win-win: your
                  clients get the most unique design feature on the market, and you get
                  ongoing commission without needing to lift a finger after recommending.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-gray-800 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                  <li>Earn commission on each sale made by your referred clients</li>
                  <li>Custom ordering links and tracking for effortless referral</li>
                  <li>
                    Priority access to our team for demos, integrations, and white-glove
                    service
                  </li>
                  <li>
                    Elevate your design offering with the most dynamic and intelligent art
                    frame on the market
                  </li>
                </ul>

                <div className="pt-2">
                  <p className="text-[16px] sm:text-[18px] font-bold text-gray-900">
                    Perfect for:
                  </p>
                  <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-gray-800 space-y-3 mt-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                    <li>Interior Designers</li>
                    <li>Architects</li>
                    <li>Home Decorators</li>
                    <li>Space Stylists</li>
                  </ul>
                </div>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify pt-2">
                  Bring Deckoviz into the spaces you help shape - and make them truly unforgettable.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Independent Sales Partners */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>💡</span> Independent Sales Partners
                </h2>

                <p className="text-[16px] sm:text-[18px] text-gray-900 font-semibold leading-8 text-justify">
                  Be your own boss. Earn unlimited commissions.
                </p>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  This is for the natural connectors, the relationship-builders, the people who love
                  talking about products that wow.
                </p>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  As a Deckoviz Independent Sales Partner, you’ll earn high-value commissions for
                  every sale you close. Whether you’re selling to hotels, homes, offices, cafes, or
                  wellness spaces - we give you the tools and freedom to build your pipeline and
                  unlock real earnings.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-gray-800 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                  <li>Up to $15k+ in commissions/month or more   no caps</li>
                  <li>$15-40K base salary for full-time roles, or uncapped earnings as a contractor</li>
                  <li>
                    Full support with product demos, sales decks, onboarding and leads (where applicable)
                  </li>
                  <li>Flexible location & working style - remote, on-ground, hybrid</li>
                </ul>

                <div className="pt-2">
                  <p className="text-[16px] sm:text-[18px] font-bold text-gray-900 text-justify">
                    Perfect for freelancers, hustlers, lifestyle sellers, or creative professionals with a strong network
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[16px] sm:text-[18px] font-bold text-gray-900">
                    Your job:
                  </p>
                  <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-gray-800 space-y-3 mt-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                    <li>Find leads</li>
                    <li>Build relationships</li>
                    <li>Close sales</li>
                    <li>Earn big</li>
                  </ul>
                </div>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify pt-2">
                  Start part-time or go all in. The opportunity is wide open.
                </p>

                {/* sass */}
                <p className="text-gray-600
 text-sm sm:text-base italic">
                  (Translation: if you’re ambitious, you’ll LOVE this.)
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Retail Partners */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>🛍️</span> Retail Partners (Home Decor, Electronics & Lifestyle Stores)
                </h2>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  Deckoviz is a head-turner. In-store, it stops people in their tracks.
                </p>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  Our Retail Partner Program is for forward-thinking store owners who want to offer
                  something unlike anything else.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-gray-800 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                  <li>Bulk margins and resale opportunities</li>
                  <li>Custom in-store displays available</li>
                  <li>Marketing and training support</li>
                  <li>Smart displays + demo-ready units provided</li>
                  <li>Strong post-sale support for your customers</li>
                </ul>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify pt-2">
                  Add cutting-edge, design-forward tech to your inventory - and watch footfall and
                  margins rise.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Influencers */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>📣</span> Influencers & Content Creators
                </h2>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  If you’re in the lifestyle, home, luxury, tech, or design space - Deckoviz is made for your audience.
                </p>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  Join our affiliate program or create branded collaborations to introduce Deckoviz
                  to your community and get rewarded.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-gray-800 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                  <li>Generous affiliate commissions for every tracked sale</li>
                  <li>Surprise & delight campaigns</li>
                  <li>Launch features, content kits, and co-branded collabs</li>
                  <li>Creative freedom to tell the Deckoviz story your way</li>
                </ul>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify pt-2">
                  Deckoviz is made to be seen - and felt. Let’s show your audience something
                  they’ve never seen before.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Apply */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Apply to Partner
                </h2>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  We’re building a world of immersive, intentional spaces. Join us.
                </p>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  👉 [Partner Application Form Link]
                </p>

                <p className="text-[16px] sm:text-[18px] text-gray-800 leading-8 text-justify">
                  Let’s create something unforgettable - together.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

             
              {/* Footer */}
              <div className="mt-12 flex items-center justify-between text-gray-500 text-xs">
                <p>@deckoviz</p>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                </div>
              </div>
            </div>
          </div>

          {/* outer border */}
          <div className="pointer-events-none absolute inset-0 rounded-[44px] border border-white/40" />
        </div>
      </div>
    </div>
  )
}

export default Partnership
