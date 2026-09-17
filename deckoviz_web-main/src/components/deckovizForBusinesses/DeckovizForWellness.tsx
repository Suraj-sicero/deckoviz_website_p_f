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
    <div 
      className="relative min-h-screen text-[#0E2438] overflow-x-hidden selection:bg-[#5CD9C4] selection:text-[#071B2C]"
      style={{
        background: `
          radial-gradient(ellipse 60% 45% at 15% 0%, #DDF6F0 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at 100% 15%, rgba(14, 169, 155, 0.10) 0%, transparent 55%),
          linear-gradient(180deg, #F6FAF9 0%, #EDF6F4 100%)
        `,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-fraunces {
          font-family: 'Fraunces', serif;
        }

        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 25px) scale(1.05); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -35px) scale(1.1); }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0.6); }
          70% { box-shadow: 0 0 0 9px rgba(14, 169, 155, 0); }
          100% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0); }
        }
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        .animate-float-a { animation: floatA 22s ease-in-out infinite; }
        .animate-float-b { animation: floatB 26s ease-in-out infinite; }
        .animate-float-c { animation: floatC 30s ease-in-out infinite; }
        .animate-pulse-dot { animation: pulseDot 2.2s infinite; }

        .grad-text {
          background: linear-gradient(100deg, #0EA99B, #1B4C79, #2FC2AE);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradShift 7s linear infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.56);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow: 0 20px 60px -25px rgba(11, 42, 69, 0.25);
        }
      `}</style>

      {/* Decorative Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[38vw] h-[38vw] top-[-8%] left-[-10%] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle,#9BE8DB,transparent_70%)] animate-float-a" />
        <div className="absolute w-[34vw] h-[34vw] top-[8%] right-[-8%] rounded-full blur-[90px] opacity-32 bg-[radial-gradient(circle,#5CD9C4,transparent_70%)] animate-float-b" />
        <div className="absolute w-[30vw] h-[30vw] bottom-[6%] left-[20%] rounded-full blur-[90px] opacity-16 bg-[radial-gradient(circle,#1B4C79,transparent_72%)] animate-float-c" />
      </div>

      {/* ── 1. Immersive Hero ── */}
      <div className="relative pt-32 pb-20 overflow-hidden lg:pt-40 lg:pb-32 z-10">
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
            Gyms, Spas, Salons, Therapist Offices, & More
          </div>

          <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-tight">
            Deckoviz for Physical Fitness <br className="hidden md:block"/>
            and <span className="grad-text">Mental Wellness</span>
          </h1>

          <p className="text-lg md:text-xl text-[#4C6A83] max-w-3xl mx-auto font-normal leading-relaxed">
            Welcome to the future of physical fitness and mental wellness. <br className="hidden md:block"/><br className="hidden md:block"/>
            The <strong className="text-[#0B2A45]">space you're in shapes the transformation</strong> you're capable of — your <strong className="text-[#0EA99B]">environment decides how far and how deep you go.</strong>
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
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Fitness Story */}
          <div>
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-fraunces text-3xl md:text-5xl font-medium text-[#0B2A45] mb-4">
                For the body, <span className="grad-text">for inspiring fitness.</span>
              </h2>
            </motion.div>
            <motion.div
              className="glass-card rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl space-y-6 text-[#4C6A83] text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p>
                Every gym, studio, and fitness space exists to help people leave better than they arrived. Everything about the fitness experience keeps moving forward, except the one thing surrounding it: the room itself.
              </p>
              <p>
                <strong className="text-[#0B2A45]">Mood, tempo, and intensity</strong> are not background details in fitness. They're the whole game. A space that demands peak performance should feel like it's training alongside you.
              </p>
            </motion.div>
          </div>

          {/* Wellness Story */}
          <div>
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-fraunces text-3xl md:text-5xl font-medium text-[#0B2A45] mb-4">
                For the mind, <span className="grad-text">for nurturing wellness.</span>
              </h2>
            </motion.div>
            <motion.div
              className="glass-card rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl space-y-6 text-[#4C6A83] text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p>
                Every therapy room, counseling office, spa, salon, and wellness space carries something quiet. These rooms hold people at some of their most vulnerable moments. Emotions inside them shift by the minute, session to session, sometimes breath to breath. Safety, trust, and reflection depend enormously on how a space feels, not only on what gets said inside it.
              </p>
              <p>
                And yet most of these rooms stay visually frozen while the person inside them is <strong className="text-[#0EA99B]">anything but frozen</strong>.
              </p>
              <div className="p-6 rounded-2xl bg-[#DDF6F0]/60 border border-[#0EA99B]/30 text-[#0B2A45] font-fraunces text-xl font-medium">
                Research has shown for decades that environment directly shapes emotional regulation and a sense of safety. Environment is one of the most powerful co-therapists in the room.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. 21 Key Highlights & Use Cases ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#0A8378] font-bold tracking-wider uppercase text-xs">Possibilities</span>
            <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">21 Key Highlights & Use Cases</h2>
          </motion.div>

          {/* Physical Fitness */}
          <motion.h3
            className="font-fraunces text-2xl md:text-3xl font-medium text-[#0B2A45] mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-10 h-1 bg-gradient-to-r from-[#0EA99B] to-[#1B4C79] rounded-full inline-block" />
            For Physical Fitness Spaces
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {fitnessHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <div className="text-3xl mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-3 leading-snug">{item.title}</h3>
                <p className="text-[#4C6A83] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mental Wellness */}
          <motion.h3
            className="font-fraunces text-2xl md:text-3xl font-medium text-[#0B2A45] mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-10 h-1 bg-gradient-to-r from-[#2FC2AE] to-[#0EA99B] rounded-full inline-block" />
            For Mental Wellness Spaces
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wellnessHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <div className="text-3xl mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-3 leading-snug">{item.title}</h3>
                <p className="text-[#4C6A83] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Core Benefits ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-20">

          {/* Physical Fitness Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-fraunces text-3xl md:text-4xl font-medium text-[#0B2A45] mb-3">Physical Fitness</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0EA99B] to-[#1B4C79] rounded-full mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fitnessBenefits.map((b, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className="w-9 h-9 rounded-full bg-[#DDF6F0] text-[#0A8378] font-bold text-sm flex items-center justify-center shrink-0 border border-white">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-2">{b.title}</h3>
                    <p className="text-[#4C6A83] text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mental Wellness Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-fraunces text-3xl md:text-4xl font-medium text-[#0B2A45] mb-3">Mental Wellness</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#2FC2AE] to-[#0EA99B] rounded-full mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wellnessBenefits.map((b, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className="w-9 h-9 rounded-full bg-[#DDF6F0] text-[#0A8378] font-bold text-sm flex items-center justify-center shrink-0 border border-white">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-2">{b.title}</h3>
                    <p className="text-[#4C6A83] text-sm leading-relaxed">{b.desc}</p>
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
            <h2 className="font-fraunces text-3xl md:text-4xl font-medium text-[#0B2A45] mb-3">Shared Across Every Space</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#0EA99B] to-[#1B4C79] rounded-full mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sharedBenefits.map((b, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-3">{b.title}</h3>
                  <p className="text-[#4C6A83] text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. 20 More Ways ── */}
      <section className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-fraunces text-4xl font-medium text-[#0B2A45]">20 More Ways Deckoviz Fits Your Space</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Fitness */}
            <div>
              <h3 className="font-fraunces text-2xl font-medium text-[#0B2A45] mb-6 flex items-center gap-2">
                <span className="w-6 h-1 bg-[#0EA99B] rounded-full inline-block" /> Fitness & Physical Wellness
              </h3>
              <div className="space-y-3">
                {fitnessFits.map((fit, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card rounded-2xl px-5 py-3.5 text-[#0B2A45] font-medium border border-white/80 text-sm shadow-sm flex items-center gap-3 hover:-translate-y-0.5 transition-all"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                  >
                    <span className="text-[#0EA99B]">⚡</span>
                    <span>{fit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Wellness */}
            <div>
              <h3 className="font-fraunces text-2xl font-medium text-[#0B2A45] mb-6 flex items-center gap-2">
                <span className="w-6 h-1 bg-[#2FC2AE] rounded-full inline-block" /> Mental & Emotional Wellness
              </h3>
              <div className="space-y-3">
                {wellnessFits.map((fit, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card rounded-2xl px-5 py-3.5 text-[#0B2A45] font-medium border border-white/80 text-sm shadow-sm flex items-center gap-3 hover:-translate-y-0.5 transition-all"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                  >
                    <span className="text-[#0EA99B]">🌿</span>
                    <span>{fit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. The Bottom Line (CTA) ── */}
      <section className="py-24 relative z-10 text-center">
        <motion.div
          className="max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card rounded-3xl p-10 sm:p-14 border border-white/80 shadow-2xl space-y-8">
            <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">The Bottom Line</h2>
            <div className="text-[#4C6A83] text-lg leading-relaxed space-y-4 text-left sm:text-center">
              <p>
                Transformation isn't only physical, and it isn't only mental, and it isn't only something that happens in a studio or a clinic. It happens everywhere someone is trying to become a little more focused, a little calmer, or a little stronger than they were yesterday, whether that's a gym floor, a therapy room, or a corner of their own living room.
              </p>
              <p>
                Deckoviz gives fitness spaces the energy to push harder. It gives wellness spaces the calm to go deeper. And it gives homes the same intelligence, scaled to fit whatever room needs it most, whenever they need it most.
              </p>
              <div className="p-4 rounded-xl bg-[#DDF6F0]/60 border border-[#0EA99B]/30 text-[#0B2A45] font-fraunces text-xl font-medium">
                Your space isn't static. It's alive. It's intentional. It's Deckoviz.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <motion.button
                onClick={() => window.location.href='/contact'}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-[#0EA99B] to-[#1B4C79] text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a demo and see the future of wellness design.
                <span>→</span>
              </motion.button>
              <motion.button
                onClick={() => setShowHomePopup(true)}
                className="w-full sm:w-auto px-8 py-5 rounded-full glass-card border border-[#0EA99B]/40 text-[#0B2A45] font-semibold text-base shadow-md hover:border-[#0EA99B] transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                🏡 For Home & Personal Spaces
              </motion.button>
            </div>
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
            <div className="absolute inset-0 bg-[#0B2A45]/40 backdrop-blur-md" onClick={() => setShowHomePopup(false)} />

            {/* Modal */}
            <motion.div
              className="relative z-10 glass-card bg-white/95 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-white/90"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-[#DDF6F0] via-white to-[#DDF6F0] border-b border-[#0EA99B]/20 rounded-t-3xl px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="font-fraunces text-2xl md:text-3xl font-medium text-[#0B2A45]">🏡 For Home & Personal Spaces</h2>
                  <p className="text-[#0A8378] text-sm mt-1">The same intelligence, scaled for your home</p>
                </div>
                <button
                  onClick={() => setShowHomePopup(false)}
                  className="w-10 h-10 rounded-full bg-[#0EA99B]/10 hover:bg-[#0EA99B]/20 text-[#0B2A45] flex items-center justify-center font-bold transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Intro */}
                <div className="space-y-4 text-[#4C6A83] text-base leading-relaxed">
                  <p>
                    Here's what ties all of this together: none of this stops at the studio door or the therapy office wall. The same principles that help a gym push harder or a therapy room hold space more gently apply just as much to the home.
                  </p>
                  <p>
                    Home workout corners deserve the same tempo-matched energy as a studio floor. Home meditation nooks deserve the same breath-paced calm as a therapist's office.
                  </p>
                  <p className="font-medium text-[#0B2A45]">
                    Deckoviz was built for all three of these worlds at once. An AI-powered smart art frame running Vizzy, your always-on adaptive companion.
                  </p>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-4">Some use cases and highlights</h3>
                  <div className="space-y-2">
                    {homeHighlights.map((item, idx) => (
                      <div key={idx} className="px-5 py-3 glass-card rounded-xl text-[#0B2A45] font-medium text-sm flex items-center gap-3 border border-white/80">
                        <span className="text-[#0EA99B] font-bold">✨</span> {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Benefits */}
                <div>
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45] mb-6">Core Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {homeBenefits.map((b, idx) => (
                      <div key={idx} className="p-5 rounded-2xl glass-card border border-white/80">
                        <h4 className="font-fraunces text-lg font-medium text-[#0B2A45] mb-2">{b.title}</h4>
                        <p className="text-[#4C6A83] text-sm leading-relaxed">{b.desc}</p>
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
