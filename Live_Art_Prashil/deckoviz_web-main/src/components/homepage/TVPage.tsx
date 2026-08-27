"use client"

import React, { useEffect, useRef } from "react"

export default function TVPage() {
  
  const sparkLayer = useRef<HTMLDivElement>(null)

  // Mouse sparks (cyan/sky/teal theme)
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return
      if (Math.random() > 0.7) return

      const dot = document.createElement("span")
      dot.className = "theme-spark"
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`

      const colors = ["#22d3ee", "#38bdf8", "#2dd4bf"] // cyan / sky / teal
      const picked = colors[Math.floor(Math.random() * colors.length)]
      dot.style.background = picked
      dot.style.boxShadow = `0 0 18px ${picked}`

      sparkLayer.current.appendChild(dot)
      setTimeout(() => dot.remove(), 1100)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center px-6 py-20
        overflow-hidden
        bg-gradient-to-br from-[#7be7ff] via-[#9fe7ff] to-[#b9fff6]
      "
    >
      {/* Mouse sparks layer */}
      <div ref={sparkLayer} className="absolute inset-0 pointer-events-none z-20" />

      {/* Background fog */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />

        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/30 blur-[75px]" />
        <div className="absolute top-20 left-28 h-[360px] w-[360px] rounded-full bg-cyan-200/35 blur-[85px]" />
        <div className="absolute -top-20 right-0 h-[520px] w-[520px] rounded-full bg-sky-200/35 blur-[90px]" />
        <div className="absolute -bottom-40 left-10 h-[520px] w-[520px] rounded-full bg-teal-200/35 blur-[95px]" />
      </div>

      {/* Floating translucent shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-16 top-24 h-[220px] w-[220px] rounded-full bg-white/25 blur-[1px]" />
        <div className="absolute left-[45%] top-24 h-[90px] w-[90px] rounded-full bg-white/20 blur-[1px]" />
        <div className="absolute left-24 top-[52%] h-[120px] w-[120px] rotate-12 rounded-[36px] bg-white/15 blur-[2px]" />
        <div className="absolute right-20 top-[38%] h-[130px] w-[130px] rounded-full bg-white/18 blur-[2px]" />
        <div className="absolute right-24 top-44 h-[55px] w-[55px] rounded-full bg-cyan-300/50 blur-[0.5px]" />
      </div>

      {/* Glass card */}
      <div
        className="
          relative z-10
          w-full max-w-5xl
          rounded-[26px]
          px-8 sm:px-12 md:px-16 py-14 md:py-16
          bg-white/18 backdrop-blur-[22px]
          border border-white/35
          shadow-[0_60px_160px_rgba(0,0,0,0.14)]
        "
      >
        {/* subtle glass overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/25" />
        <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-b from-white/25 via-transparent to-white/10" />

        {/* Top dots */}
        <div className="mb-8 flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        </div>

        {/* Heading */}
        <h1
          className="
            text-center mb-12
            text-3xl md:text-5xl font-extrabold tracking-tight
            text-slate-900/90
          "
        >
          Looking to buy a TV?
        </h1>

        {/* Content (UNCHANGED TEXT) */}
        <div className="space-y-10 text-slate-800/90 text-[15px] sm:text-[16px] leading-relaxed">
          <div className="space-y-4">
            <p>
              If you’re in the market for a new smart TV, you’re probably comparing sizes, panels, apps, and price tags.
            </p>
            <p>Netflix, YouTube, Prime.</p>
            <p>4K. HDR.</p>
            <p>Good sound. Clean design.</p>

            <p className="mt-6">Deckoviz DASP checks all those boxes.</p>

            <p className="mt-6">And then quietly turns the box into something much bigger.</p>

            <p className="mt-6">
              Because Deckoviz is a <b>full Google TV</b> at heart, and a <b>living art and ambience system</b> when the
              screen is not busy being a TV.
            </p>

            <p className="mt-6">
              So when you’re watching, it’s a stunning, modern smart TV.
              <br />
              When you’re not, it becomes the most beautiful thing on your wall.
            </p>

            <hr className="border-white/35 my-10" />
          </div>

          <div className="space-y-5">
            <h2 className="text-lg font-bold text-slate-900/90">A premium Google TV, first</h2>
            <p>Deckoviz runs natively on Google TV.</p>

            <div className="space-y-4">
              <p className="mt-10">That means:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All your favorite apps. Netflix, YouTube, Prime Video, Disney+, Spotify, and more.</li>
                <li>Familiar interface. Easy setup. Seamless casting.</li>
                <li>Voice control with Google Assistant.</li>
                <li>Regular updates from the Android TV ecosystem.</li>
              </ul>

              <p className="mt-8">
                You’re not giving up anything you expect from a great smart TV.
                <br />
                You’re just starting with it.
              </p>

              <p className="mt-8">
                Crisp 4K visuals.
                <br />
                Large immersive sizes.
                <br />
                Fast, smooth performance.
              </p>

              <p className="mt-6">It’s the TV you already want.</p>
            </div>
          </div>

          <hr className="border-white/35 my-12" />

          <div className="space-y-5">
            <h2 className="text-lg font-bold text-slate-900/90">And when the TV turns off, the magic turns on</h2>

            <div className="space-y-4">
              <p>Most TVs go black when you’re done.</p>
              <p>Deckoviz comes alive.</p>

              <p className="mt-6">Your wall becomes:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>An art frame.</li>
                <li>A photo frame.</li>
                <li>A mood setter.</li>
                <li>An ambience designer.</li>
                <li>A living canvas for memories, beauty, and stories.</li>
              </ul>

              <p className="mt-6">Instead of a dark rectangle, you get:</p>

              <p className="mt-6">
                A glowing forest.
                <br />
                A moving abstract.
                <br />
                Your favorite photo, turned into art.
              </p>
            </div>
          </div>

          <hr className="border-white/35 my-12" />

          <div className="space-y-4">
            <p>
              A calming scene for the evening.
              <br />
              A joyful montage from last weekend.
            </p>

            <p className="mt-6">It means your biggest screen is never wasted.</p>
            <p>It’s beautiful even when you’re not watching anything.</p>

            <hr className="border-white/35 my-12" />
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900/90">A TV that actually looks like art</h2>

            <div className="space-y-4">
              <p>Let’s be honest.</p>
              <p>Most TVs look like… TVs.</p>

              <p className="mt-6">Deckoviz is designed to look like a piece of art on your wall.</p>

              <p className="mt-6">You get:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <b>Custom handcrafted frames</b> in wood and premium finishes.
                </li>
                <li>Curved, minimal edges that feel like a real art frame.</li>
                <li>Options to match your interiors, style, or mood.</li>
                <li>Even carved details or personal touches, if you want</li>
              </ul>

              <p className="mt-6">
                From a distance, it doesn’t scream “screen”.
                <br />
                It feels like a gallery piece.
              </p>

              <p className="mt-6">
                And when paired with synced halo backlights, the wall around it glows softly, matching the colors and
                mood of what’s on display.
              </p>

              <p className="mt-6">
                Movie nights feel more cinematic.
                <br />
                Evenings feel warmer.
                <br />
                Art feels immersive.
              </p>

              <p className="mt-6">Your TV becomes part of your space, not just a device in it.</p>
            </div>
          </div>

          <hr className="border-white/35 my-12" />

          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900/90">Your TV becomes a photo frame too</h2>

            <div className="space-y-4">
              <p>Every home has photos.</p>
              <p>But they usually live on phones, drives, or clouds.</p>

              <p className="mt-6">
                With Deckoviz:
                <br />
                Your photos live on your walls.
              </p>

              <p className="mt-6">Displayed as:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Clean, beautiful photo frames.</li>
                <li>Or transformed into artistic renditions in styles you love.</li>
                <li>Or as gentle montages that play through your memories.</li>
              </ul>

              <p className="mt-8">
                Anniversaries.
                <br />
                Birthdays.
                <br />
                Holidays.
                <br />
                Family moments.
              </p>

              <p className="mt-6">
                Deckoviz brings them up by itself, at the right times.
                <br />
                Not all at once.
                <br />
                Just when they matter.
              </p>

              <p className="mt-6">Your TV becomes a living memory wall.</p>
            </div>
          </div>

          <hr className="border-white/35 my-12" />

          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900/90">A TV that sets the mood, that sets the tone</h2>

            <div className="space-y-4">
              <p>Most TVs entertain you.</p>
              <p>Deckoviz shapes how your room feels.</p>

              <p className="mt-6">
                With synced visuals, music, and ambient lighting, it can turn your space into:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>A calm retreat after a long day.</li>
                <li>A warm, romantic corner in the evening.</li>
                <li>A bright, energetic space in the morning.</li>
                <li>A cozy backdrop for family dinners.</li>
                <li>A serene glow for winding down at night.</li>
              </ul>

              <p className="mt-8">
                You don’t just watch content.
                <br />
                You live inside the ambience.
              </p>

              <p className="mt-6">And you can still switch back to Netflix anytime.</p>
            </div>
          </div>

          <hr className="border-white/35 my-12" />

          <div className="space-y-6">
            <p className="font-semibold text-slate-900/90">Much more than a TV. A 5-in-1 screen.</p>

            <p>With Deckoviz DASP, you’re getting:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>A premium Google TV</li>
              <li>A beautiful art frame</li>
              <li>An AI-powered creative canvas</li>
              <li>A smart photo & memory display</li>
              <li>A mood setter & ambience designer</li>
              <li>And lots more.</li>
            </ul>

            <p className="mt-8">All in one screen.</p>

            <p className="mt-8">
              No extra devices.
              <br />
              No clutter.
              <br />
              No compromises.
            </p>

            <p className="mt-6">Just one stunning display that adapts to your life.</p>

            <hr className="border-white/35 my-12" />

            <p className="font-semibold text-slate-900/90">The smartest use of your biggest screen</p>

            <p className="mt-4">Think about it.</p>

            <p>Your largest screen is usually off for most of the day.</p>

            <p className="mt-6">
              Deckoviz makes sure it’s always doing something meaningful:
              <br />
              Beautifying your space.
              <br />
              Reflecting your life.
              <br />
              Setting the tone.
              <br />
              Telling your story.
            </p>

            <p className="mt-6">
              So even if you came here just to buy a smart TV,
              <br />
              you might leave with something far better.
            </p>

            <p className="mt-6">
              A TV that disappears when you want entertainment.
              <br />
              And becomes art, memory, and atmosphere when you don’t.
            </p>

            <p className="mt-10 font-semibold text-slate-900/90">If you’re buying a TV anyway…</p>

            <hr className="border-white/35 my-12" />

            <p>Why settle for a black rectangle on your wall?</p>

            <p className="mt-6">
              Get a screen that:
              <br />
              looks stunning even when off.
              <br />
              Feels alive.
              <br />
              Matches your interiors.
              <br />
              Grows with new features.
              <br />
              And still gives you all the apps you love.
            </p>

            <p className="mt-6">
              <b>Deckoviz DASP.</b>
              <br />
              The smart TV you wanted.
              <br />
              And the living canvas you didn’t know you needed.
            </p>
          </div>
        </div>
      </div>

      {/* Inline spark styles */}
      <style>
        {`
          .theme-spark {
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            opacity: 0.8;
            animation: sparkFade 1.1s ease-out forwards;
          }

          @keyframes sparkFade {
            from { transform: scale(1); opacity: 0.85; }
            to { transform: scale(3.1); opacity: 0; }
          }
        `}
      </style>
    </section>
  )
}
