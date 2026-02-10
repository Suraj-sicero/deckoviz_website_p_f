"use client"

import React, { useEffect, useRef } from "react"

export default function DASPGuide() {
    
  const sparkLayer = useRef<HTMLDivElement>(null)

    useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!sparkLayer.current) return
      if (Math.random() > 0.75) return

      const dot = document.createElement("span")
      dot.className = "theme-spark"
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`

      const colors = ["#ec4899", "#d946ef", "#a855f7"]
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
        relative min-h-screen px-6 py-20 overflow-hidden
        bg-gradient-to-br from-[#fbcfe8] via-[#e9d5ff] to-[#f5d0fe]
      "
    >
      {/* Mouse sparks */}
      <div ref={sparkLayer} className="absolute inset-0 pointer-events-none z-20" />

      {/* Background fog */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-pink-200/40 blur-[75px]" />
        <div className="absolute top-20 left-28 h-[360px] w-[360px] rounded-full bg-fuchsia-200/40 blur-[85px]" />
        <div className="absolute -top-20 right-0 h-[520px] w-[520px] rounded-full bg-purple-200/40 blur-[90px]" />
        <div className="absolute -bottom-40 left-10 h-[520px] w-[520px] rounded-full bg-pink-300/35 blur-[95px]" />
      </div>

      {/* Floating shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-16 top-24 h-[220px] w-[220px] rounded-full bg-white/25" />
        <div className="absolute left-[45%] top-24 h-[90px] w-[90px] rounded-full bg-white/20" />
        <div className="absolute left-24 top-[52%] h-[120px] w-[120px] rotate-12 rounded-[36px] bg-white/15" />
        <div className="absolute right-20 top-[38%] h-[130px] w-[130px] rounded-full bg-white/18" />
        <div className="absolute right-24 top-44 h-[55px] w-[55px] rounded-full bg-fuchsia-300/50" />
      </div>
        {/* Glass container */}
      <div
        className="
          relative z-10
          max-w-5xl mx-auto
          rounded-[28px]
          px-8 sm:px-12 md:px-16 py-16
          bg-white/22 backdrop-blur-[24px]
          border border-white/35
          shadow-[0_60px_160px_rgba(88,28,135,0.18)]
        "
      >
        {/* Glass overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/25" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/30 via-transparent to-white/10" />

        {/* Top dots */}
        <div className="mb-10 flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        </div>

      <div className="max-w-5xl mx-auto space-y-16">

        {/* Title */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Deckoviz for Homes: A Living Canvas for Life, Meaning, and Expression
          </h1>

          <p className="italic text-gray-600">
            A comprehensive guide to the Deckoviz Dynamic Art & Storytelling Portal (DASP)
          </p>

          <p className="text-gray-700 leading-relaxed">
            Most screens in our lives are extractive.<br />
            They ask for attention, fragment it, and give very little back.
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>Deckoviz was born from a radically different lens altogether:</p>

          <p>
            What if the largest visual surface in your home didn’t demand attention, but returned meaning?
          </p>

          <p>
            What if your walls could help you reflect, feel, learn, create, remember, and grow?
          </p>

          <p>
            Deckoviz is not just a digital frame. It is not just generative art. It is not just a smart display.
          </p>

          <p>
            It is a living visual system for your home, designed to evolve with you, adapt to your rhythms,
            and quietly elevate everyday life.
          </p>

          <p>
            At its core, Deckoviz Dynamic Art & Story Portal, combines generative AI, storytelling, music,
            rituals, curation, and adaptive intelligence into a single, beautifully integrated home experience.
          </p>

          <p>
            Below is a deep dive into the <strong>12 core pillars of Deckoviz for homes</strong>,
            each representing an entire universe of features, use cases, and everyday magic.
          </p>
        </div>

        {/* 1 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">1. The Core Generative Engine</h2>

          <p className="italic text-gray-600">
            Your personal painter, dream visualizer, and creative collaborator
          </p>

          <p className="text-gray-700 leading-relaxed">
            At the heart of Deckoviz lives an extraordinarily powerful generative engine.
            This is the system that turns your home into a living personal art studio,
            one that never runs out of ideas and always speaks your language.
          </p>

          <h3 className="font-semibold">What it does</h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Abstract, symbolic, emotional, and conceptual artworks</li>
            <li>Dreamlike inner landscapes that reflect moods, memories, or states of mind</li>
            <li>AI style transfer to transform your photos into your favorite artistic styles</li>
            <li>Sketch-to-art and sketch-to-video transformations</li>
            <li>Physics-based and generative artworks that evolve continuously over time</li>
            <li>Iterative artworks that change subtly day by day rather than looping</li>
            <li>Dynamic photo animations and image-to-video experiences</li>
            <li>Music-responsive visuals that move and breathe with sound</li>
            <li>Art generated from text, journal entries, poems, books, or even emotions</li>
            <li>Access iconic art or niche art from our ever-expanding library</li>
          </ul>

          <p>You can turn:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>A memory into a painting</li>
            <li>A feeling into a visual language</li>
            <li>A song into a living artwork</li>
            <li>A chapter of a book into a cinematic visual sequence</li>
          </ul>

          <p className="font-semibold">Some uses in the home</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>A calming abstract painting in the morning that slowly evolves throughout the day</li>
            <li>A symbolic artwork reflecting gratitude, intention, or focus</li>
            <li>A child’s sketch transformed into a gallery-worthy artwork</li>
            <li>A photo from a special moment reimagined into a timeless piece of art</li>
            <li>A continuously evolving artwork that never repeats</li>
          </ul>

          <p className="font-semibold">Why it matters</p>
          <p className="text-gray-700 leading-relaxed">
            Art has always been a mirror of the inner world.
            Deckoviz makes that mirror personal, alive, and accessible every day.
            Instead of static decor, your home becomes a space that reflects who you are becoming.
          </p>
        </div>

        {/* 2 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">2. Visual Storytelling & Story Immersion</h2>

          <p className="italic text-gray-600">
            Stories you don’t just read or watch, but stories live with and live in
          </p>

          <p className="text-gray-700 leading-relaxed">
            Deckoviz brings stories out of books and into space.
          </p>

          <p className="font-semibold">What it does</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Real-time story visualization as you read</li>
            <li>Storyboards that unfold scene by scene</li>
            <li>Narrated visual art with voice, music, and imagery</li>
            <li>Visual audiobooks in your preferred voice</li>
            <li>Book-to-Frames mode, turning books into art collections</li>
            <li>Story Sequence Generator for dynamic visual narratives</li>
            <li>Comic-book and art-book creation tools</li>
            <li>Storyboard-to-short-film creation experiences</li>
            <li>Visual chat with books and stories</li>
            <li>Bedtime and learning stories, designed for kids</li>
          </ul>

          <p className="font-semibold">Uses</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Children watching a bedtime story gently come alive on the wall</li>
            <li>A novel visualized chapter by chapter as ambient art</li>
            <li>Learning history, mythology, or science through visual narratives</li>
            <li>Families co-creating story worlds together</li>
            <li>Turning personal life stories into visual memory books</li>
          </ul>

          <p className="font-semibold">Why it matters</p>
          <p className="text-gray-700 leading-relaxed">
            Stories shape identity, values, and imagination.
            Deckoviz restores storytelling to its ritualistic, shared,
            and immersive role in the home, beyond scrolling and passive consumption.
          </p>
        </div>

        {/* Pillars 3–9 continue exactly the same pattern */}
      </div>

      <div className="max-w-5xl mx-auto space-y-14">

        {/* Pillar 3 */}
        <div>
          <h2 className="text-3xl font-bold mb-4">3. Poster Creation & Visual Intention Tools</h2>

          <p className="italic text-gray-600 mb-6">
            Your walls as reminders of your world, of who you want to be, of your dreams
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Deckoviz includes a powerful poster creation suite designed to turn ideas, goals, and inspiration into living visual anchors.
          </p>

          <h3 className="text-xl font-semibold mb-3">What it does</h3>

          <p className="text-gray-700 mb-4 leading-relaxed">
            You can create virtually any type of poster:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Quote posters and text-driven designs</li>
            <li>Affirmation posters that evolve over time</li>
            <li>Vision boards and dynamic moodboards</li>
            <li>Yearly goals, bucket lists, and personal rules</li>
            <li>Educational posters for kids</li>
            <li>Poem posters and literature-inspired designs</li>
            <li>Movie-style posters for personal moments or inspiration</li>
            <li>Smart quote posters that change based on mood or time</li>
          </ul>

          <p className="text-gray-700 mt-6 mb-4 leading-relaxed">
            Posters can be:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Static or dynamic</li>
            <li>Minimalist or cinematic</li>
            <li>Time-based or context-aware</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Use cases in the home</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>A vision board that subtly shifts through the year</li>
            <li>A quote that appears only in the mornings</li>
            <li>Learning posters that adapt as a child grows</li>
            <li>Moodboards for creative workspaces</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Why it matters</h3>

          <p className="text-gray-700 leading-relaxed">
            Your environment shapes behavior. Deckoviz helps turn walls into gentle nudges toward intention, rather than noise or decoration without meaning.
          </p>
        </div>

        {/* Pillar 4 */}
        <div>
          <h2 className="text-3xl font-bold mb-4">4. Moodscapes & Music-Driven Experiences</h2>

          <p className="italic text-gray-600 mb-6">
            Enter your desired state and immerse yourself in multisensory experiences
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Deckoviz understands that visuals alone are only half the experience.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            This pillar combines visuals, music, lights, and soon even scents, to create deeply immersive moodscapes.
          </p>

          <h3 className="text-xl font-semibold mb-3">What it does</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Sync visuals perfectly with your chosen music</li>
            <li>
              Generate original AI music tailored to your mood, dreams and life, and sync it to just the perfect artworks for those songs
            </li>
            <li>Create multisensory collections combining art and sound</li>
            <li>MoodSwings that help you enter states like calm, gratitude, focus, romance, or energy</li>
            <li>Music-responsive generative art that reacts in real time</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Use cases in the home</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>A calming evening wind-down mode</li>
            <li>Energizing visuals synced with music in the morning</li>
            <li>Romantic ambiance for special nights</li>
            <li>Focus-enhancing visuals for work or study</li>
            <li>Gratitude or reflection moments at the end of the day</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Why it matters</h3>

          <p className="text-gray-700 leading-relaxed">
            Mood is not accidental. Deckoviz gives you agency over emotional states, turning your home into an active participant in wellbeing.
          </p>
        </div>

        {/* Pillar 5 */}
        <div>
          <h2 className="text-3xl font-bold mb-4">5. Smart Art Photo Frame & Memory Surfaces</h2>

          <p className="italic text-gray-600 mb-6">
            From your phone to your walls, intelligently, for your memories deserve the centrepiece
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Photos are among our most valuable artifacts, yet most remain buried in camera rolls.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Deckoviz elevates them into living memory surfaces.
          </p>

          <h3 className="text-xl font-semibold mb-3">What it does</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Displays photos as-is or transformed into your favourite art styles</li>
            <li>Creates intelligent AI montages from your photo library</li>
            <li>Surfaces memories automatically on birthdays, anniversaries, or meaningful dates</li>
            <li>Occasionally surprises you with moments “just because”</li>
            <li>Animates photos gently for dynamic displays</li>
            <li>Access photos from our ever-expanding library</li>
            <li>
              Enjoy photos of space, architecture, urbanscapes, nature, landscapes, history, portraits, and lots more
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Use cases in the home</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>A rotating family memory wall</li>
            <li>Artistic reinterpretations of personal photos</li>
            <li>Anniversary montages that appear automatically</li>
            <li>Daily moments of nostalgia and warmth</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Why it matters</h3>

          <p className="text-gray-700 leading-relaxed">
            Memories shape belonging. Deckoviz makes remembering effortless, emotional, and beautiful, without needing you to curate constantly.
          </p>
        </div>

        {/* Pillar 6 */}
        <div>
          <h2 className="text-3xl font-bold mb-4">6. Narration-Based & Voice-Driven Experiences</h2>

          <p className="italic text-gray-600 mb-6">
            Art that speaks, stories that listen
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Deckoviz integrates voice deeply into the visual experience.
          </p>

          <h3 className="text-xl font-semibold mb-3">What it does</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Narrated art experiences</li>
            <li>Poem and book narration in preferred voices</li>
            <li>Visual audiobooks paired with book-themed art</li>
            <li>Guided visualizations, meditation, and voice-based journeys</li>
            <li>Interactive storytelling with preferred voice</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Use cases in the home</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Spoken poetry with evolving visuals</li>
            <li>Calm narrated experiences before sleep</li>
            <li>Learning through narrated visual content</li>
            <li>Interactive storytelling sessions with kids</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Why it matters</h3>

          <p className="text-gray-700 leading-relaxed">
            Voice adds intimacy. Combined with visuals, it creates experiences that feel human, warm, and present, rather than digital.
          </p>
        </div>

        {/* Pillar 7 */}
        <div>
          <h2 className="text-3xl font-bold mb-4">7. Rituals, Modes & Intelligent Scheduling</h2>

          <p className="italic text-gray-600 mb-6">
            Turning time into meaning, adding anchors to your days
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Most home vibes and state changes happen accidentally. Deckoviz lets them change intentionally.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            This pillar is about designing rhythm into life. Daily, weekly, monthly. Quietly powerful, never intrusive.
          </p>

          <h3 className="text-xl font-semibold mb-3">What it does</h3>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Deckoviz lets you create and automate rituals and modes, including:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Daily, weekly, monthly and yearly rituals</li>
            <li>Time-based modes that shift automatically or at your direction</li>
            <li>Lifestyle-aware scheduling that adapts over time</li>
            <li>Manual or proactive activation by Vizzy</li>
          </ul>

          <p className="text-gray-700 mt-6 mb-4 leading-relaxed">
            Built-in modes include:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Creativity mode</li>
            <li>Study mode</li>
            <li>Celebration mode</li>
            <li>Romantic mode</li>
            <li>Energy mode</li>
            <li>Reflection mode</li>
            <li>Gratitude mode</li>
            <li>Calm / wind-down mode</li>
            <li>Focus mode</li>
            <li>Kids mode</li>
            <li>And 20+ evolving modes</li>
          </ul>

          <p className="text-gray-700 mt-6 mb-4 leading-relaxed">
            Each mode can control:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Visual style</li>
            <li>Art type</li>
            <li>Music and narration</li>
            <li>Mood and pacing</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Use cases in the home</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Morning intention visuals without reminders or alarms</li>
            <li>Evening wind-down rituals that feel sacred, not mechanical</li>
            <li>Automatic celebration modes for birthdays or anniversaries</li>
            <li>Creative modes that activate during your usual creative hours</li>
            <li>Study or focus modes for children at predictable times</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Why it matters</h3>

          <p className="text-gray-700 leading-relaxed">
            Ritual is how humans turn time into meaning. Deckoviz helps restore structure without rigidity, rhythm without pressure.
          </p>
        </div>

        {/* Pillar 8 */}
        <div>
          <h2 className="text-3xl font-bold mb-4">8. Social & Shared Creative Experiences</h2>

          <p className="italic text-gray-600 mb-6">
            Art is better when it’s shared
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Deckoviz is not a solitary object. It is a shared creative surface. Designed to help you connect more meaningfully with your family and friends with art and stories.
          </p>

          <h3 className="text-xl font-semibold mb-3">What it does</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Share art and collections with friends and family</li>
            <li>Send art as gifts directly to other Deckoviz frames</li>
            <li>Co-create artworks together in real time</li>
            <li>Family creative spaces</li>
            <li>A private social feed for Deckoviz users</li>
            <li>Shared generative experiences</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Use cases in the home</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Grandparents sending art to their grandchildren’s homes, and vice versa</li>
            <li>Friends gifting personalized artworks instead of objects</li>
            <li>Families creating shared visual memory collections</li>
            <li>Collaborative art creation across cities or countries</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Why it matters</h3>

          <p className="text-gray-700 leading-relaxed">
            Connection deepens when it’s creative. Deckoviz turns social interaction into shared meaning and a tapestry. Art can thus become a part of a family’s traditions.
          </p>
        </div>

        {/* Pillar 9 */}
        <div>
          <h2 className="text-3xl font-bold mb-4">9. Vizzy, Your Home Companion & Vibe Creator-Curator</h2>

          <p className="italic text-gray-600 mb-6">
            A quiet, friendly intelligence that learns your taste, your preferences, your hopes
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Vizzy is the soul of Deckoviz. It is a background intelligence that learns, curates, adapts, and gently guides.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Vizzy understands the emotional state and needs of you and the members of your household, to create, curate and display ever more meaningful experiences for you.
          </p>

          <h3 className="text-xl font-semibold mb-3">What Vizzy does</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Learns your taste, preferences, lifestyle, hopes, dreams</li>
            <li>Understands family members individually</li>
            <li>Curates art, photos, and experiences intelligently</li>
            <li>Adapts visuals based on time of day, mood, and context</li>
            <li>Surfaces meaningful moments and creations proactively</li>
          </ul>

          <p className="text-gray-700 mt-6 mb-4 leading-relaxed">
            Signature features include:
          </p>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Art for the Day</li>
            <li>Quote for the Day</li>
            <li>Memory of the Day</li>
            <li>Knowledge for the Day</li>
            <li>Dynamic mood-aware curation</li>
            <li>Occasion-aware displays</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Use cases in the home</h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Calm visuals in the morning, richer ones at night</li>
            <li>Special memories resurfacing on meaningful dates</li>
            <li>Art that subtly matches your emotional rhythm</li>
            <li>A display that feels alive without being distracting</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-3">Why it matters</h3>

          <p className="text-gray-700 leading-relaxed">
            Curation is an art. Vizzy makes your home feel considered, alive, and deeply personal, without effort. Over time, as its capabilities and attunement grows, so does its presence in your home in being your perfect home curator.
          </p>
        </div>
{/* ===================== 10. Learning, Kids, and Growth Experiences ===================== */}
<div className="space-y-6 mt-16">

  <h2 className="text-3xl font-bold">
    10. Learning, Kids, and Growth Experiences
  </h2>

  <p className="italic text-gray-600">
    Education without friction, with fun, and with frolic and creative flourish
  </p>

  <p className="text-gray-700 leading-relaxed">
    Deckoviz doubles as a powerful visual, story-based and personalized learning companion,
    especially for children, though adults are always welcome in using its suite of learning
    focused features, as follows.
  </p>

  <h3 className="text-xl font-semibold">What it does</h3>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Learning visualizers for concepts and subjects</li>
    <li>Story-driven education</li>
    <li>Dynamic educational posters</li>
    <li>Visual explanations for complex topics</li>
    <li>Creative learning games</li>
    <li>Safe, curiosity-driven exploration</li>
    <li>Create short films and videos to learn topics in an immersive way</li>
    <li>
      Visual chat with books - make the reading process more engaging, more immersive,
      more alive
    </li>
    <li>
      Vizzy as your tutor - Vizzy can take on your favourite avatar and engage in fun lessons
    </li>
    <li>
      Learn concepts by converting them into personalized songs
    </li>
    <li>
      Increase your focus by activating study mode, for visuals and soundscapes that
      inspire the deepest focus
    </li>
  </ul>

  <h3 className="text-xl font-semibold mt-6">Use cases in the home</h3>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Kids learning through visual storytelling</li>
    <li>Educational posters that evolve with age</li>
    <li>Visual explanations for science, history, or art</li>
    <li>Creative games that encourage imagination, not addiction</li>
  </ul>

  <h3 className="text-xl font-semibold mt-6">Why it matters</h3>

  <p className="text-gray-700 leading-relaxed">
    Learning sticks when it’s beautiful, personalized, and vivid. Deckoviz makes
    education ambient, playful, and curiosity-led. It makes learning life-sized,
    by moving it from the small screen to the large portal to curiosity and wonder.
    Make learning more immersive and engaging, make it more fun and more creative.
    For yourself, and for the kids.
  </p>
</div>

{/* ===================== 11. Games & Interactive Generative Experiences ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">
    11. Games & Interactive Generative Experiences
  </h2>

  <p className="italic text-gray-600">
    Play as connection, not consumption, for depth, not distraction
  </p>

  <p className="text-gray-700 leading-relaxed">
    Deckoviz includes a growing suite of 50+ interactive generative games,
    with more added regularly, designed to infuse more fun, more creativity,
    more merriment, and more connection into your home.
  </p>

  <h3 className="text-xl font-semibold">What it does</h3>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Social generative games</li>
    <li>Creativity-based games</li>
    <li>Story-driven experiences</li>
    <li>Collaborative play modes</li>
    <li>Family-friendly/family-focused interactive modes</li>
  </ul>

  <p className="text-gray-700 mt-4">
    These games are designed around:
  </p>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Expression</li>
    <li>Connection</li>
    <li>Curiosity</li>
    <li>Creativity</li>
  </ul>

  <p className="text-gray-700">
    Not dopamine loops or competitive grind.
  </p>

  <h3 className="text-xl font-semibold mt-6">Use cases in the home</h3>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Family game nights with creative twists</li>
    <li>Social play with friends remotely</li>
    <li>Games that spark conversation, not silence</li>
  </ul>

  <h3 className="text-xl font-semibold mt-6">Why it matters</h3>

  <p className="text-gray-700 leading-relaxed">
    Play is fundamental to human flourishing. Deckoviz reclaims play as meaningful,
    shared, and imaginative. Reframing play as life-affirming, not mind-numbing.
  </p>
</div>

{/* ===================== 12. Marketplace, Personalization & Everything Else ===================== */}
<div className="space-y-6 mt-20">

  <h2 className="text-3xl font-bold">
    12. Marketplace, Personalization & Everything Else
  </h2>

  <p className="italic text-gray-600">
    The long tail of Deckoviz magic
  </p>

  <p className="text-gray-700 leading-relaxed">
    The final pillar captures the ecosystem around Deckoviz. This is all the parts
    that didn’t fit in the first 11, the parts that we are adding to expand our
    vision of the ultimate art and storytelling platform, the ultimate home companion.
  </p>

  <h3 className="text-xl font-semibold">What it includes</h3>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Deckoviz marketplace to buy and sell art</li>
    <li>Discover artists and inspirations</li>
    <li>Personalized generative clock faces</li>
    <li>Use Deckoviz as a living clock or timepiece</li>
    <li>Individual profiles for each household member</li>
    <li>Deep personalization per person</li>
    <li>Continuous feature expansion</li>
  </ul>

  <h3 className="text-xl font-semibold mt-6">Use cases in the home</h3>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>A constantly evolving art marketplace on your wall</li>
    <li>A clock that feels like art, not utility</li>
    <li>Personalized experiences for every family member</li>
  </ul>

  <h3 className="text-xl font-semibold mt-6">Why it matters</h3>

  <p className="text-gray-700 leading-relaxed">
    Deckoviz is not static. It is a platform that grows with you,
    expanding over years, not months.
  </p>
</div>

{/* ===================== Closing Section ===================== */}
<div className="space-y-6 mt-20">

  <p className="text-gray-800 font-medium">
    Deckoviz is not about screens.
  </p>

  <p className="text-gray-800">
    It is about spaces, it is about souls, and it is about the soul of your space.
  </p>

  <p className="text-gray-700">
    Spaces that help you:
  </p>

  <ul className="list-disc pl-6 space-y-2 text-gray-700">
    <li>Feel more</li>
    <li>Remember more</li>
    <li>Create more</li>
    <li>Learn more</li>
    <li>Love more</li>
  </ul>

  <p className="text-gray-700 leading-relaxed">
    Your home is the most important interface you have, it’s your sacred space.
    Deckoviz exists to make that interface alive, intentional, and beautiful.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Beyond merely decorating walls, Deckoviz is about designing the emotional
    and experiential fabric of daily life.
  </p>

  <p className="text-gray-900 font-semibold">
    And this is only the beginning.
  </p>
    </div>
</div>

      </div>
      
 {/* Spark styles */}
      <style>
        {`
          .theme-spark {
            position: absolute;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            opacity: 0.85;
            animation: sparkFade 1.1s ease-out forwards;
          }

          @keyframes sparkFade {
            from { transform: scale(1); opacity: 0.9; }
            to { transform: scale(3.2); opacity: 0; }
          }
        `}
      </style>
    </section>
  )
}
