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
          <div className="relative px-6 py-10 sm:px-12 sm:py-14">
            {/* Page container */}
            <div className="max-w-5xl mx-auto">
              {/* Top section */}
              <div className="space-y-3">
                <p className="text-white/80 text-sm font-semibold tracking-wide">
                  Let’s Learn ✨
                </p>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow leading-tight">
                  Partner with Deckoviz
                </h1>

                <p className="text-lg sm:text-xl text-white/90 font-semibold">
                  Bring Life to Spaces. Get Rewarded.
                </p>

                {/* light sass */}
                <p className="text-white/75 text-sm sm:text-base italic">
                  (You bring the taste. We bring the wow.)
                </p>

                <div className="pt-5 space-y-4 text-[16px] sm:text-[18px] leading-8 text-white/95 text-justify">
                  <p>
                    Deckoviz is the world’s first AI-powered dynamic art frame. A portal
                    of expression. A window into soul and space. We’re partnering with
                    creators, tastemakers, retailers, sales professionals to bring this
                    magic to the world — together.
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
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>🎨</span> Interior Designers, Architects & Decorators
                </h2>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  Bring something truly unforgettable into the homes and projects you craft.
                </p>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  Recommend Deckoviz to your clients - post or present - and receive generous
                  referral rewards for every purchase made through you. It’s a win-win: your
                  clients get the most unique design feature on the market, and you get
                  ongoing commission without needing to lift a finger after recommending.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-white/95 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
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
                  <p className="text-[16px] sm:text-[18px] font-bold text-white">
                    Perfect for:
                  </p>
                  <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-white/95 space-y-3 mt-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                    <li>Interior Designers</li>
                    <li>Architects</li>
                    <li>Home Decorators</li>
                    <li>Space Stylists</li>
                  </ul>
                </div>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify pt-2">
                  Bring Deckoviz into the spaces you help shape - and make them truly unforgettable.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Independent Sales Partners */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>💡</span> Independent Sales Partners
                </h2>

                <p className="text-[16px] sm:text-[18px] text-white font-semibold leading-8 text-justify">
                  Be your own boss. Earn unlimited commissions.
                </p>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  This is for the natural connectors, the relationship-builders, the people who love
                  talking about products that wow.
                </p>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  As a Deckoviz Independent Sales Partner, you’ll earn high-value commissions for
                  every sale you close. Whether you’re selling to hotels, homes, offices, cafes, or
                  wellness spaces - we give you the tools and freedom to build your pipeline and
                  unlock real earnings.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-white/95 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                  <li>Up to $15k+ in commissions/month or more — no caps</li>
                  <li>$15-40K base salary for full-time roles, or uncapped earnings as a contractor</li>
                  <li>
                    Full support with product demos, sales decks, onboarding and leads (where applicable)
                  </li>
                  <li>Flexible location & working style - remote, on-ground, hybrid</li>
                </ul>

                <div className="pt-2">
                  <p className="text-[16px] sm:text-[18px] font-bold text-white text-justify">
                    Perfect for freelancers, hustlers, lifestyle sellers, or creative professionals with a strong network
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[16px] sm:text-[18px] font-bold text-white">
                    Your job:
                  </p>
                  <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-white/95 space-y-3 mt-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                    <li>Find leads</li>
                    <li>Build relationships</li>
                    <li>Close sales</li>
                    <li>Earn big</li>
                  </ul>
                </div>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify pt-2">
                  Start part-time or go all in. The opportunity is wide open.
                </p>

                {/* sass */}
                <p className="text-white/80 text-sm sm:text-base italic">
                  (Translation: if you’re ambitious, you’ll LOVE this.)
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Retail Partners */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>🛍️</span> Retail Partners (Home Decor, Electronics & Lifestyle Stores)
                </h2>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  Deckoviz is a head-turner. In-store, it stops people in their tracks.
                </p>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  Our Retail Partner Program is for forward-thinking store owners who want to offer
                  something unlike anything else.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-white/95 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                  <li>Bulk margins and resale opportunities</li>
                  <li>Custom in-store displays available</li>
                  <li>Marketing and training support</li>
                  <li>Smart displays + demo-ready units provided</li>
                  <li>Strong post-sale support for your customers</li>
                </ul>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify pt-2">
                  Add cutting-edge, design-forward tech to your inventory - and watch footfall and
                  margins rise.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Influencers */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>📣</span> Influencers & Content Creators
                </h2>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  If you’re in the lifestyle, home, luxury, tech, or design space - Deckoviz is made for your audience.
                </p>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  Join our affiliate program or create branded collaborations to introduce Deckoviz
                  to your community and get rewarded.
                </p>

                <ul className="list-disc pl-6 text-[16px] sm:text-[18px] text-white/95 space-y-3 leading-8 text-justify bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
                  <li>Generous affiliate commissions for every tracked sale</li>
                  <li>Surprise & delight campaigns</li>
                  <li>Launch features, content kits, and co-branded collabs</li>
                  <li>Creative freedom to tell the Deckoviz story your way</li>
                </ul>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify pt-2">
                  Deckoviz is made to be seen - and felt. Let’s show your audience something
                  they’ve never seen before.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Apply */}
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Apply to Partner
                </h2>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  We’re building a world of immersive, intentional spaces. Join us.
                </p>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  👉 [Partner Application Form Link]
                </p>

                <p className="text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  Let’s create something unforgettable - together.
                </p>
              </section>

              {/* Divider */}
              <div className="my-12 h-px w-full bg-white/35" />

              {/* Blurb Content */}
              <section className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Blurb Content, Pitch/Description Content
                </h2>

                <div className="space-y-2 text-[16px] sm:text-[18px] text-white/95 text-justify">
                  <p>Deckoviz pitch</p>
                  <p>Problem</p>
                  <p>Solution</p>
                  <p>Product</p>
                  <p>Mission</p>
                </div>

                <div className="space-y-7 text-[16px] sm:text-[18px] text-white/95 leading-8 text-justify">
                  <div>
                    <h3 className="font-bold text-white">Problem</h3>
                    <p className="mt-2">
                      We love art, and that’s why we fill our homes with it. It helps us make sense of the world.
                    </p>
                    <p className="mt-2">
                      But art is limited in many ways - one is static art in homes stops having any effect on you after a few days
                    </p>
                    <p className="mt-2">
                      Second is the most impactful art for you would be art displayed when you need it - art is most useful when
                    </p>
                    <p className="mt-2">
                      Third is art that is displayed when you need or want it is much more
                    </p>
                  </div>

                  <p>
                    Art is also been underutilized as a means to deepen bonds between people. This was due to the expensive, and thus inaccessible, nature of it
                  </p>

                  <div>
                    <h3 className="font-bold text-white">Solution</h3>
                    <p className="mt-2">
                      Our lives are all about designing moments and spaces intentionally, curating moments.
                    </p>
                    <p className="mt-2">
                      What we thought was to enhance the art experience, make it personalized, immersive, transformational, and connecting.
                    </p>
                    <p className="mt-2">
                      With generative AI and LLMs that can understand you deeply, your values, desires, hopes, beliefs, states, moods, visual taste, your being, in a nutshell,
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-white">Product</h3>
                    <p className="mt-2">What we have built is</p>
                    <p className="mt-2">It does quite a few things</p>
                    <p className="mt-2">Firstly, our AI understands you, your</p>
                    <p className="mt-2">Then, we have a suite of AI features to enhance</p>
                    <p className="mt-2">
                      Everyone loves the Smart TV experience - so we thought we’d blend the two, to create a device that can, when you so choose, double up as a smart TV
                    </p>
                    <p className="mt-2">Multisensory art</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-white">Mission</h3>
                    <p className="mt-2">
                      Our mission is to infuse people’s homes and spaces with the beauty, magic, creativity, dynamism, love, connection, joy, spark, that we all want more of in our lives.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-white">Additional notes</h3>
                    <p className="mt-2">
                      Beyond homeowners, we also see restaurants, real estate developers, yoga studios, offices, therapist offices, wellness centers, etc being significant users for this product, in different ways, for different uses and features.
                    </p>
                  </div>

                  <div className="pt-6">
                    <h3 className="font-bold text-white">Blurb</h3>
                    <p className="mt-2">
                      Deckoviz is a next-generation company innovating at the frontier of AI personalization, smart home decor, and intelligent space enhancement.
                    </p>
                    <p className="mt-2">
                      We blend cutting-edge AI with beauty, intentionality, and emotional resonance to redefine how people experience personal and professional spaces.
                    </p>
                    <p className="mt-2">
                      Our flagship product — an AI-powered Smart Art Frame — brings dynamic, evolving, and deeply personalized art and ambient experiences into homes, offices, hotels, and businesses worldwide.
                    </p>
                    <p className="mt-2">
                      We believe technology should not just function - it should inspire awe, creativity, peace, and personal connection.
                    </p>
                    <p className="mt-2">
                      Join us on our mission to transform everyday spaces into intentional, expressive, and extraordinary environments.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="mt-12 flex items-center justify-between text-white/70 text-xs">
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
