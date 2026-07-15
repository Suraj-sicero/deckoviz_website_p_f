import { DynamicImageGrid } from "../other/DynamicImageGrid";
import { motion } from "framer-motion";

const officeImages = [
  { src: '/images/office/43f8f906-c42a-4be3-9c76-c5e0ec7e93a2.png', tag: 'Creative Studio' },
  { src: '/images/office/7e8ecf9f-422e-4995-bfdf-5eb60bdbd9c6.png', tag: 'Focus Zone' },
  { src: '/images/office/b14c986f-f735-4d91-9c22-1043d6e82e41.png', tag: 'Modern Workspace' },
  { src: '/images/office/c45bd925-09ce-4e36-bbbb-c0602b84c178.png', tag: 'Inspired Environment' },
  { src: '/images/office/fd2f3ca8-b88e-4fbb-8632-2815470c875d.png', tag: 'Dynamic Meeting' },
];

const highlights = [
  { icon: "🔄", title: "Dynamic Focus and Break Cycles", desc: "Immersive visuals for deep work, energising sequences for breaks. Deckoviz shifts intelligently through the day to sustain flow and head off burnout." },
  { icon: "🏛️", title: "The Company Values Wall", desc: "Your mission, milestones, and values, rendered as evolving art. Culture made visible instead of laminated." },
  { icon: "💡", title: "Creative Brainstorm Mode", desc: "Feed Vizzy a project theme and watch it generate a full visual thoughtscape, images, moods, and quotes designed to spark ideas." },
  { icon: "🎉", title: "Team Rituals and Highlights", desc: "Birthdays, weekly wins, shoutouts, turned into art and posters. Syncs with Slack, Notion, and the tools your team already lives in." },
  { icon: "💚", title: "Mood Check-ins and Visual Feedback", desc: "Anonymous sentiment tracking, translated into ambient visuals that reflect the real emotional temperature of the room." },
  { icon: "🧘", title: "Mental Health and Reset Mode", desc: "Dedicated well-being corners with calming multisensory visuals and guided breathing sequences, scent and light integrations optional." },
  { icon: "🎯", title: "Dynamic Meeting Spaces", desc: "Switch a room between Focus, Brainstorm, or Vision mode instantly. Visuals and soundscapes tailored to whatever the meeting actually needs." },
  { icon: "🎨", title: "The Creative Collab Canvas", desc: "A living artboard where teams drop ideas, reflections, and wins. A shared visual memory of the work as it happens." },
  { icon: "🤝", title: "Client-Facing First Impressions", desc: "Reception and lobby walls that tell visitors exactly what kind of company they're walking into, before anyone says a word." },
  { icon: "✨", title: "Creative Studio Inspiration Mode", desc: "For design and creative teams, a constantly evolving visual mood board that keeps the room feeling like a place ideas want to happen." },
  { icon: "🌐", title: "Coworking Community Walls", desc: "Shared spaces that showcase member work, events, and community milestones, giving coworking spaces an identity beyond the wifi password." },
  { icon: "🎵", title: "Personalised Flow Modes", desc: "Individuals and teams set their own mode, Calm, Motivate, Inspire, Reflect, and Deckoviz curates the visual and sonic rhythm around it." },
  { icon: "⚡", title: "Instant Multimodal Generation, On Demand", desc: "Type a prompt, describe a mood, or hum an idea, and Vizzy generates it, such as company-themed art instantly, in any style, for any wall, on the spot." },
  { icon: "👤", title: "Employee-Generated Visuals", desc: "Let your team submit their own ideas, sketches, or prompts and watch them become real, gallery-quality art on the office walls, made by the people who work there." },
  { icon: "🎧", title: "Multisensory Focus Music", desc: "Adaptive soundscapes and focus-tuned music, synced to the visuals on screen, turning any corner of the office into a deep-work zone in seconds." },
  { icon: "🌿", title: "Wellbeing and Focus Art Series", desc: "A rotating library of calming, focus-enhancing visuals designed around attention and emotional regulation, not just aesthetics, for the moments a team needs to reset." },
];

const benefits = [
  {
    title: "Boost Focus and Creativity",
    desc: "Environments designed for how the mind actually works, not just how a floor plan looks."
  },
  {
    title: "Strengthen Culture, Visibly",
    desc: "Shared rituals and aesthetic storytelling that make culture something people see and feel daily, not something buried in a handbook."
  },
  {
    title: "Improve Emotional Climate",
    desc: "Ambient visuals that respond to real sentiment, reducing cognitive fatigue across the team."
  },
  {
    title: "Increase Retention and Performance",
    desc: "People stay longer and do better work in spaces they genuinely want to be in."
  },
  {
    title: "Elevate Your Employer Brand",
    desc: "For offices and coworking spaces competing for talent, the room itself becomes part of the pitch."
  },
  {
    title: "A Creative Partner That Never Clocks Out",
    desc: "Vizzy generates fresh visual material on demand, no repeats, no stale décor, ever."
  },
  {
    title: "Multisensory, Not Just Visual",
    desc: "Synchronised visuals, sound, and light, with optional scent, built for focus, flow, or recovery depending on the moment."
  },
  {
    title: "Zero Repetition, Ever",
    desc: "A generative engine means the art on your walls evolves continuously alongside your people and your projects."
  },
  {
    title: "A Stronger First Impression for Every Visitor",
    desc: "Clients, candidates, and investors read a room in seconds. Give them something worth reading."
  },
  {
    title: "Manage Energy, Not Just Tasks",
    desc: "The best workplaces of the next decade won't just optimise output. They'll actively design for the energy behind it."
  },
];

const fits = [
  "Client meeting rooms with mode-matched visual backdrops",
  "Sales team leaderboards, rendered as art instead of spreadsheets",
  "Product launch walls for big reveal moments",
  "Hybrid meeting backdrops that elevate remote calls",
  "Focus pods and phone booths with calming, distraction-free visuals",
  "Break rooms and kitchens with energising, appetising themes",
  "Agency pitch rooms designed to impress before the deck even opens",
  "Portfolio and case study walls for creative studios",
  "New hire onboarding welcome walls",
  "All-hands and town hall visual backdrops",
  "Anniversary and milestone celebration displays",
  "Investor and board meeting rooms with a polished, considered feel",
  "Podcast and content studio backdrops",
  "Coworking event and community meetup walls",
  "Seasonal and festival decor across shared spaces",
  "Wellness rooms with guided calm and reset sequences",
  "Studio inspiration corners for photographers, designers, and artists",
  "Rooftop or lounge ambience for after-hours team moments",
];

const DeckovizOfficesLanding = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      {/* ── 1. Immersive Hero ── */}
      <div className="relative pt-32 pb-20 overflow-hidden lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-blue-50/30 to-white"></div>
          {/* Subtle animated blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#182A4A]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-[#182A4A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 border border-gray-200 text-[#182A4A] font-semibold text-sm tracking-wide mb-6 shadow-sm backdrop-blur-sm">
            Deckoviz for Offices, Coworking Spaces & Creative Studios
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight font-serif">
            Where Work Feels <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-transparent bg-clip-text">Inspired</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6 font-medium leading-relaxed">
            Most offices run on productivity software. Almost none run on mood, creativity, or flow, the actual human engines behind great work.
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Deckoviz fixes that, by bringing a smart, evolving, performance- and culture-attuned architecture for inspired work to your space.
          </p>
        </motion.div>
      </div>

      {/* ── Dynamic Image Grid ── */}
      <div className="relative z-20 pb-16">
        <DynamicImageGrid 
          imageSources={officeImages}
          sectionTitle="Workspaces Reimagined"
          sectionDescription="Intelligent art for inspired work. From focus zones to collaborative hubs."
        />
      </div>

      {/* ── 2. The Longer Story ── */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 mb-6">Work is about to change faster<br/>than most offices are <span className="text-[#2563EB]">built for.</span></h2>
          </motion.div>
          <motion.div 
            className="prose prose-lg prose-indigo mx-auto text-gray-600 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              By 2027, the best people won't just be choosing companies. They'll be choosing environments, choosing how they feel. Talent that's spent years working from kitchen tables and coffee shops has gotten used to spaces that feel considered, personal, alive. Then they walk into an office that hasn't changed since 2015. Beige walls. A motivational poster. Lighting that sucks the joy. All in all, just another example of a boring, uninspired place.
            </p>
            <motion.p 
              className="text-xl leading-relaxed font-medium text-gray-900 border-l-4 border-[#2563EB] pl-6 my-8"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              The tools we use to manage work have gotten radically smarter. The rooms we do that work in mostly haven't.
            </motion.p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              That gap is exactly what's costing companies focus, creativity, and the kind of culture people actually want to be part of. Deep work needs an environment that supports it. Creative work needs a space that provokes it. Team culture needs somewhere to live besides a Slack channel.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Deckoviz helps create that space. With the AI-powered Generative Ambiance and Visual Portal running Vizzy, your always-on generative and experience companion, turning static walls into living, breathing environments that adapt to how your team actually works, thinks, and feels throughout the day.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300 font-medium">
              This is what offices, studios, and coworking spaces are supposed to feel like in the age of AI - spaces as inspired, as generative, as the people in them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3. 16 Key Highlights & Use Cases ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#182A4A] font-bold tracking-wider uppercase text-sm">Possibilities</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold font-serif text-gray-900">12 Key Highlights & Use Cases</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {highlights.slice(0, 12).map((item, idx) => (
              <motion.div 
                key={idx} 
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 hover:border-[#2563EB]/40 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#182A4A] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="group-hover:grayscale brightness-200 group-hover:drop-shadow-md transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 leading-snug group-hover:text-[#2563EB] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional 4 highlights in a 2-col layout for variety */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.slice(12).map((item, idx) => (
              <motion.div 
                key={idx + 12} 
                className="group flex gap-6 p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-1 hover:border-[#2563EB]/40 transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="text-4xl bg-blue-50 w-16 h-16 min-w-[4rem] rounded-2xl flex items-center justify-center group-hover:bg-[#182A4A] group-hover:scale-110 transition-all duration-300">
                  <span className="group-hover:grayscale brightness-200 group-hover:drop-shadow-md">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 leading-snug group-hover:text-[#2563EB] transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Core Benefits ── */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(37,99,235,0.15),_transparent_40%),_radial-gradient(circle_at_top_right,_rgba(24,42,74,0.3),_transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <motion.div 
              className="col-span-1 lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">Core Benefits</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                The best workplaces of the next decade won't just optimise output. They'll actively design for the energy behind it.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#2563EB] to-[#182A4A] rounded-full" />
            </motion.div>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx} 
                  className="relative group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#2563EB] font-bold text-sm group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    {idx + 1}
                  </div>
                  <div className="pl-12 group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 18 More Ways Deckoviz Fits Your Space ── */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-200 overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto px-6 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">18 More Ways Deckoviz Fits Your Space</h2>
        </motion.div>
        
        {/* Continuous scroll layout for the fits items */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {fits.map((fit, idx) => (
            <motion.div 
              key={idx} 
              className="px-6 py-3 bg-white border border-gray-200 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-700 font-medium hover:bg-blue-50 hover:border-[#2563EB]/40 hover:text-[#182A4A] hover:-translate-y-1 transition-all duration-300 text-sm md:text-base cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.4, delay: (Math.min(idx, 15)) * 0.05 }}
            >
              ✨ {fit}
            </motion.div>
          ))}
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
          <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium cursor-default">
            The best offices of tomorrow won't just manage tasks. They'll manage energy, they'll inspire creativity, and they will feel as alive as the work being done in these spaces.
            <br/><br/>
            Deckoviz turns any workspace into a living, intelligent environment built for focus, creativity, and connection. As core infrastructure for how great work actually happens.
            <br/><br/>
            The companies that make this shift now won't just have nicer walls. They'll have spaces people love to work in, where people create masterpieces just as rich as the ones they will see on their walls.
          </p>
          <motion.button 
            onClick={() => window.location.href='/contact'} 
            className="group px-10 py-5 bg-[#182A4A] text-white rounded-full font-bold text-lg hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-[#182A4A]/20 flex items-center justify-center mx-auto gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Book a demo and see your workspace go from functional to phenomenal.
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
};

export default DeckovizOfficesLanding;