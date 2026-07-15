import { useState } from "react";
import { DynamicImageGrid } from "../other/DynamicImageGrid";
import { motion, AnimatePresence } from "framer-motion";

const wellnessImages = [
  { src: '/images/physical space/1b1af397-dd78-4d17-b097-f3226852c70f.png', tag: 'High-Energy Studio' },
  { src: '/images/physical space/266369a3-d724-41e5-bde3-2a14981d5173.png', tag: 'Calming Therapy' },
  { src: '/images/physical space/545ef712-5313-4287-89b1-9a2ad2c7b5da.png', tag: 'Yoga Flow' },
  { src: '/images/physical space/58aeb318-662f-455a-b823-4fcc17697251.png', tag: 'Wellness Space' },
  { src: '/images/physical space/6bcf3204-a2e5-44ff-90be-a23ec1a7059e.png', tag: 'Recovery Zone' },
  { src: '/images/physical space/c5d47c03-4dbd-4586-832d-fe7c0add53cf.png', tag: 'Mindful Environment' },
];

const fitnessHighlights = [
  { icon: "⚡", title: "High-Energy Visuals That Match the Workout", desc: "Dynamic visuals synced to intensity and tempo, pushing pace exactly when a session needs it most." },
  { icon: "🎯", title: "Visual Rhythm Cues for Pacing and Endurance", desc: "Cues that help clients hold form, hold focus, and hold pace through the hardest sets, without a trainer needing to say a word." },
  { icon: "🌅", title: "Sunrise-to-Sunset Yoga Flow", desc: "Soft sunrise gradients for morning flow, breathing forest visuals for meditation, candlelit calm for evening sessions, an entire day's arc in one frame." },
  { icon: "🔄", title: "Automatic Power-to-Recovery Shifts", desc: "Environments that shift themselves through the day, from high-performance energy to recovery calm, no manual reset required from staff." },
  { icon: "🧘", title: "Immersive Cooldown and Breathwork Visuals", desc: "Guided visual breathing sequences that bring heart rates down and bodies back to baseline faster than silence ever could." },
  { icon: "🏷️", title: "Fully Branded Studio Aesthetics", desc: "Your colors, your logo, your story, woven into every visual. A space that's unmistakably yours, not a generic gym template." },
  { icon: "🎵", title: "Class-Specific Energy Profiles", desc: "Spin gets one visual language, Pilates gets another, boxing gets a third. Every class type, its own atmosphere." },
  { icon: "🏆", title: "Competition and Challenge Mode", desc: "Leaderboards and milestone visuals rendered as motivating art during team challenges and PR attempts." },
  { icon: "🎶", title: "Music-Synced Visual Choreography", desc: "Visuals that move with the beat, turning a playlist into a full sensory experience instead of just background sound." },
  { icon: "🏠", title: "Home Gym and Fitness Corner Mode", desc: "The same tempo-matched, performance-driving visuals, scaled down for a home workout space that deserves studio-level energy." },
  { icon: "📺", title: "Built on Google TV, For Instant Streaming", desc: "Switch from generative content to live sports, workout streams, or any Google TV content instantly, so your gym is training energy and entertainment in a single frame, whenever streaming is required." },
];

const wellnessHighlights = [
  { icon: "🌊", title: "Mood-Mirroring Ambience", desc: "Gentle gradients for grounding, warm tones for safety, cool visuals for reflection, generated live, in tune with the room." },
  { icon: "🎨", title: "AI-Generated Personal and Inner-World Art", desc: "Deeply personal visualisation that helps clients externalise what's hard to put into words, turning feeling into image." },
  { icon: "✨", title: "Multi-Sensory Healing Design", desc: "Visuals paired with ambient soundscapes, and optionally scent and light, coordinated for a full nervous-system reset." },
  { icon: "🏛️", title: "A Practice With Its Own Visual Identity", desc: "Therapists weave their own branding and philosophy into the room, making the space feel as considered as the work done in it." },
  { icon: "💚", title: "Environmental Co-Therapy", desc: "Visual stimuli that support emotional regulation and parasympathetic response, doing part of the healing work before a word is spoken." },
  { icon: "🌿", title: "Grounding Visuals for Anxiety Regulation", desc: "Slow, predictable, gently moving visuals designed specifically to calm a nervous system in real distress." },
  { icon: "💭", title: "Dream and Reflection Visualisation", desc: "AI-generated imagery that helps clients process dreams, memories, or abstract emotional material in session." },
  { icon: "👥", title: "Group Session Collective Mood Ambience", desc: "Shared visuals that reflect the room's overall emotional temperature during group therapy and support circles." },
  { icon: "🏡", title: "Home Wind-Down and Meditation Mode", desc: "The same breath-paced, mood-mirroring calm from a therapy room, available in a bedroom, a reading nook, or a quiet corner at home." },
  { icon: "🔁", title: "Session-Responsive Emotional Modes", desc: "Calm Entry for intake, Reflect for deep work, Integration for closure, each shifting naturally with the arc of a session." },
];

const fitnessBenefits = [
  { title: "Elevate Mood, Motivation, and Focus", desc: "Environments that train the mind alongside the body, so effort feels less like grinding and more like flow. Clients push harder without realising they're pushing harder." },
  { title: "Longer Sessions, More Repeat Visits", desc: "Spaces people actually want to come back to, session after session. Retention stops being a discounting problem and starts being an experience problem you've already solved." },
  { title: "A Distinct, Modern Brand Identity", desc: "Differentiation that shows the moment someone walks in the door, before a single rep is done or a single class is taught." },
  { title: "Zero Repetition, Ever", desc: "Generative visuals mean no loops, no playlists, no staleness. Members notice, even subconsciously, when a space keeps surprising them." },
  { title: "Higher Perceived Value, Same Square Footage", desc: "A studio that feels premium without a renovation. The room itself starts justifying the price of membership." },
  { title: "Better Class Attendance and Word of Mouth", desc: "Sessions people want to film, post, and bring a friend to. A visually striking space markets itself." },
  { title: "Entertainment on Demand, Same Frame", desc: "Google TV built in means live sports, streaming workouts, or a match on in the background, no extra screen required." },
  { title: "A Space That Scales With Your Programming", desc: "New class formats, new energy profiles, new visual themes, all software, no equipment overhaul needed to keep the room feeling current." },
];

const wellnessBenefits = [
  { title: "Calmer Clients, Faster", desc: "Environments that help clients regulate within minutes of arrival, so more of the session goes toward actual work instead of settling in." },
  { title: "Shorter Time to Emotional Readiness", desc: "Sessions that get to the real work faster because the room is already doing part of the job, quietly, in the background." },
  { title: "Deeper Trust, Higher Retention", desc: "A practice that feels intentional and human, not clinical and static, building the kind of trust that keeps clients coming back." },
  { title: "A Practice That Feels Genuinely Modern", desc: "Positioning that sets a therapist or wellness professional apart in a crowded, increasingly commoditised field." },
  { title: "Lower Pre-Session Anxiety", desc: "Waiting areas and intake rooms that start the regulation process before the session even begins." },
  { title: "A Room That Adapts to Every Client", desc: "No two people need the same environment. Mode-based visuals mean the space can meet each client where they are." },
  { title: "Stronger Outcomes Clients Can Feel", desc: "An environment doing part of the emotional work means sessions go deeper, more consistently, without extending session length." },
  { title: "A Quiet Point of Differentiation", desc: "In referrals and reviews, the space itself becomes something clients mention, a detail that sets a practice apart before anyone books a first session." },
];

const sharedBenefits = [
  { title: "Multi-Sensory, Not Just Visual", desc: "Visuals synchronised with sound, light, and optional scent, built for whichever state the moment calls for, energised or calm." },
  { title: "Effortless Control", desc: "Switch modes, schedule environments, and manage everything straight from the Deckoviz app, no technical setup required." },
];

const fitnessFits = [
  "Spin and cycling studios with tempo-matched visual intensity",
  "Boxing and combat gyms with power-driven energy visuals",
  "Recovery and stretch zones with slow, restorative motion",
  "Pilates studios with precise, calming visual pacing",
  "CrossFit boxes with competitive, high-stakes energy walls",
  "Locker rooms and lobbies with brand-forward welcome visuals",
  "Personal training suites with client-specific mode settings",
  "Group fitness classes with crowd-energy adaptive visuals",
  "Spa and sauna zones with ambient, restorative themes",
  "Dance and movement studios with rhythm-matched visual flow",
];

const wellnessFits = [
  "Group therapy rooms with collective, shared-mood visuals",
  "Meditation and mindfulness studios with breath-paced generative art",
  "Salon and spa treatment rooms with relaxation-focused ambience",
  "Psychiatry and intake offices with anxiety-reducing entry modes",
  "Corporate wellness rooms for workplace mental health support",
  "Couples and family therapy rooms with neutral, grounding tones",
  "Waiting areas designed to lower pre-session anxiety",
  "Addiction recovery centers with calm, hope-forward visual themes",
  "Grief and loss counseling spaces with gentle, non-intrusive art",
  "Psychiatric and inpatient common areas with soothing, low-stimulation visuals",
];

const homeHighlights = [
  "Home gyms with studio-level tempo and energy visuals",
  "Home yoga corners with sunrise-to-sunset flow visuals",
  "Bedrooms with evening wind-down and sleep-priming ambience",
  "Home offices shifting from focused work mode to end-of-day calm",
  "Living rooms with mood-matched ambience for guests and downtime",
  "Reading nooks with calm, literary, mood-matched visuals",
  "Nurseries and kids' rooms with gentle, soothing generative art",
  "Home meditation and breathwork corners",
  "Guest rooms that double as flexible wellness spaces",
  "Kitchen and dining areas with mealtime ambience and daily rhythm cues",
];

const homeBenefits = [
  { title: "A Home That Adapts to How You Actually Feel", desc: "Morning energy, midday focus, evening calm, all supported by the same wall, without lifting a finger." },
  { title: "Bring Studio-Grade and Clinic-Grade Design Home", desc: "The same principles professionals pay thousands to install, available for a bedroom corner, a home gym, or a reading chair." },
  { title: "Turn Everyday Spaces Into Wellness Spaces", desc: "Your living room, bedroom, office, or home gym becomes an environment that actively supports your mind and body throughout the day." },
  { title: "Reduce Mental Clutter Without Adding More Apps", desc: "Gentle visual guidance, calming environments, and purposeful experiences help create moments to reset, refocus, and breathe." },
  { title: "Stay Consistent Without Relying on Motivation", desc: "Personalized routines, visual prompts, and adaptive experiences make healthy habits easier to maintain, even on busy days." },
  { title: "Wellness That Learns With You", desc: "As your goals, routines, preferences, and energy levels evolve, your environment evolves alongside you, becoming more personal and more effective over time." },
];

const DeckovizForWellness = () => {
  const [showHomePopup, setShowHomePopup] = useState(false);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      {/* ── 1. Immersive Hero ── */}
      <div className="relative pt-32 pb-20 overflow-hidden lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-slate-50 to-white"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#182A4A]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-[#2563EB]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 border border-gray-200 text-[#182A4A] font-semibold text-sm tracking-wide mb-6 shadow-sm backdrop-blur-sm">
            Gyms, Spas, Salons, Therapist Offices, & More
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight font-serif">
            Deckoviz for Physical Fitness <br className="hidden md:block"/>
            and <span className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-transparent bg-clip-text">Mental Wellness</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-4 font-medium leading-relaxed">
            Welcome to the future of physical fitness and mental wellness.
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Different rooms. Different work. One shared truth: the space you're in shapes the transformation you're capable of - your environment decides how far and how deep you go.
          </p>
        </motion.div>
      </div>

      {/* ── Dynamic Image Grid ── */}
      <div className="relative z-20 pb-16">
        <DynamicImageGrid
          imageSources={wellnessImages}
          sectionTitle="Spaces That Transform"
          sectionDescription="From high-energy studios to calming therapy rooms, environments that work as hard as you do."
        />
      </div>

      {/* ── 2. The Longer Story ── */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          {/* Fitness Story */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 mb-6">For the body, <span className="text-[#2563EB]">for inspiring fitness.</span></h2>
          </motion.div>
          <motion.div
            className="prose prose-lg mx-auto text-gray-600 space-y-6 mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Every gym, studio, and fitness space exists to help people leave better than they arrived. Trainers evolve their programs constantly. Clients push new limits every week. Music gets curated. Equipment gets upgraded.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Everything about the fitness experience keeps moving forward, except the one thing surrounding it the entire time: the room itself.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Walk into most gyms, and the walls look exactly like they did five years ago. Same posters. Same mirrors. Same static motivation quote that stopped registering after the first visit. But mood, tempo, and intensity are not background details in fitness.
            </p>
            <motion.p
              className="text-xl leading-relaxed font-medium text-gray-900 border-l-4 border-[#2563EB] pl-6 my-8"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              They're the whole game. A space that demands peak performance should feel like it's training alongside you, not sitting frozen while everything else in the room is dynamic.
            </motion.p>
          </motion.div>

          {/* Wellness Story */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 mb-6">For the mind, <span className="text-[#2563EB]">for nurturing wellness.</span></h2>
          </motion.div>
          <motion.div
            className="prose prose-lg mx-auto text-gray-600 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Every therapy room, counseling office, spa, saloon, and wellness space carries something quiet. These rooms hold people at some of their most vulnerable moments. Emotions inside them shift by the minute, session to session, sometimes breath to breath. Safety, trust, and reflection depend enormously on how a space feels, not only on what gets said inside it.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              And yet most of these rooms stay visually frozen while the person inside them is anything but frozen. Research has shown for decades that environment directly shapes emotional regulation and a sense of safety. <strong className="text-[#182A4A]">Environment is one of the most powerful co-therapists in the room, and right now, almost nobody is putting it to work.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3. 21 Key Highlights & Use Cases ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#182A4A] font-bold tracking-wider uppercase text-sm">Possibilities</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold font-serif text-gray-900">20 Key Highlights & Use Cases</h2>
          </motion.div>

          {/* Physical Fitness */}
          <motion.h3
            className="text-2xl font-bold font-serif text-[#182A4A] mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-10 h-1 bg-gradient-to-r from-[#2563EB] to-[#182A4A] rounded-full inline-block" />
            For Physical Fitness Spaces
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {fitnessHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 hover:border-[#2563EB]/40 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#182A4A] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="group-hover:grayscale brightness-200 group-hover:drop-shadow-md transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 leading-snug group-hover:text-[#2563EB] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mental Wellness */}
          <motion.h3
            className="text-2xl font-bold font-serif text-[#182A4A] mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-10 h-1 bg-gradient-to-r from-teal-500 to-[#2563EB] rounded-full inline-block" />
            For Mental Wellness Spaces
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wellnessHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 hover:border-teal-300/60 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <div className="text-4xl mb-6 bg-teal-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-teal-700 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="group-hover:grayscale brightness-200 group-hover:drop-shadow-md transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Core Benefits ── */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.15),_transparent_40%),_radial-gradient(circle_at_top_right,_rgba(24,42,74,0.3),_transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Physical Fitness Benefits */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">Physical Fitness</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#2563EB] to-teal-400 rounded-full mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {fitnessBenefits.map((b, idx) => (
                <motion.div
                  key={idx}
                  className="relative group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#2563EB] font-bold text-sm group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">{idx + 1}</div>
                  <div className="pl-12 group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold font-serif text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">{b.title}</h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mental Wellness Benefits */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">Mental Wellness</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-[#2563EB] rounded-full mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {wellnessBenefits.map((b, idx) => (
                <motion.div
                  key={idx}
                  className="relative group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-teal-400 font-bold text-sm group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">{idx + 1}</div>
                  <div className="pl-12 group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold font-serif text-white mb-2 group-hover:text-teal-200 transition-colors duration-300">{b.title}</h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Shared Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">Shared Across Every Space</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#2563EB] to-[#182A4A] rounded-full mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sharedBenefits.map((b, idx) => (
                <motion.div
                  key={idx}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 group cursor-default hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">{b.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. 20 More Ways ── */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-200 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">20 More Ways Deckoviz Fits Your Space</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Fitness */}
          <div>
            <h3 className="text-xl font-bold font-serif text-[#182A4A] mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-[#2563EB] rounded-full inline-block" /> Fitness & Physical Wellness
            </h3>
            <div className="space-y-3">
              {fitnessFits.map((fit, idx) => (
                <motion.div
                  key={idx}
                  className="px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-700 font-medium hover:bg-blue-50 hover:border-[#2563EB]/40 hover:text-[#182A4A] hover:-translate-y-0.5 transition-all duration-300 text-sm cursor-default"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  ⚡ {fit}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Wellness */}
          <div>
            <h3 className="text-xl font-bold font-serif text-[#182A4A] mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-teal-500 rounded-full inline-block" /> Mental & Emotional Wellness
            </h3>
            <div className="space-y-3">
              {wellnessFits.map((fit, idx) => (
                <motion.div
                  key={idx}
                  className="px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-700 font-medium hover:bg-teal-50 hover:border-teal-300/60 hover:text-teal-800 hover:-translate-y-0.5 transition-all duration-300 text-sm cursor-default"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  🌿 {fit}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. The Bottom Line (CTA) ── */}
      <section className="py-32 relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-blue-100/50 -z-10" />
        <motion.div
          className="max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-8">The Bottom Line</h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium cursor-default text-left md:text-center">
            Transformation isn't only physical, and it isn't only mental, and it isn't only something that happens in a studio or a clinic. It happens everywhere someone is trying to become a little more focused, a little calmer, or a little stronger than they were yesterday, whether that's a gym floor, a therapy room, or a corner of their own living room.
            <br/><br/>
            Deckoviz gives fitness spaces the energy to push harder. It gives wellness spaces the calm to go deeper. And it gives homes the same intelligence, scaled to fit whatever room needs it most, whenever they need it most. One platform, endlessly adaptive, built around a simple idea: the environment around you should be working as hard as you are.
            <br/><br/>
            This isn't decoration. It isn't background noise. It's an active participant in every workout, every session, and every quiet moment at home that adds up to real change.
            <br/><br/>
            <strong className="text-[#182A4A]">Your space isn't static. It's alive. It's intentional. It's Deckoviz.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => window.location.href='/contact'}
              className="group px-10 py-5 bg-[#182A4A] text-white rounded-full font-bold text-lg hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-[#182A4A]/20 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a demo and see the future of wellness design.
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </motion.button>
            <motion.button
              onClick={() => setShowHomePopup(true)}
              className="group px-8 py-4 bg-white text-[#182A4A] rounded-full font-bold text-base border-2 border-[#182A4A]/20 hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              🏡 For Home & Personal Spaces
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Home & Personal Spaces Popup ── */}
      <AnimatePresence>
        {showHomePopup && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowHomePopup(false)} />

            {/* Modal */}
            <motion.div
              className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(37,99,235,0.3) transparent' }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-t-3xl px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">🏡 For Home & Personal Spaces</h2>
                  <p className="text-blue-200 text-sm mt-1">The same intelligence, scaled for your home</p>
                </div>
                <button
                  onClick={() => setShowHomePopup(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 space-y-10">
                {/* Intro */}
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p className="text-lg leading-relaxed">
                    Here's what ties all of this together: none of this stops at the studio door or the therapy office wall. The same principles that help a gym push harder or a therapy room hold space more gently apply just as much to the home.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Home workout corners deserve the same tempo-matched energy as a studio floor. Home meditation nooks deserve the same breath-paced calm as a therapist's office. The guest room that doubles as a yoga space, the living room that becomes a wind-down zone every evening, the home office that needs to shift from focused work to genuine rest, all of it benefits from an environment that adapts instead of one that just sits there.
                  </p>
                  <p className="text-lg leading-relaxed font-medium text-gray-900">
                    Deckoviz was built for all three of these worlds at once. An AI-powered smart art frame running Vizzy, your always-on adaptive companion, shifting with intensity in the gym, shifting with emotion in the therapy room, and shifting with whatever a home actually needs, morning, noon, and night. Same intelligence. Many different jobs. All of them done beautifully.
                  </p>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#182A4A] mb-4">Some use cases and highlights</h3>
                  <div className="space-y-2">
                    {homeHighlights.map((item, idx) => (
                      <div key={idx} className="px-5 py-3 bg-blue-50/50 border border-blue-100 rounded-xl text-gray-700 font-medium text-sm flex items-center gap-3">
                        <span className="text-[#2563EB] font-bold">✨</span> {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Benefits */}
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#182A4A] mb-6">Core Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {homeBenefits.map((b, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                        <h4 className="font-bold text-gray-900 mb-2 font-serif">{b.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DeckovizForWellness;
