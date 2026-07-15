import { DynamicImageGrid } from "../other/DynamicImageGrid";
import { motion } from "framer-motion";

const schoolImages = [
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_06 PM.png', tag: 'A Wall That Teaches' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_10 PM.png', tag: 'Visual Learning' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_12 PM.png', tag: 'Creative Companion' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_13 PM.png', tag: 'Gallery for Art' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_15 PM.png', tag: 'History Brought to Life' },
  { src: '/images/school/ChatGPT Image Jul 11, 2026, 07_21_16 PM.png', tag: 'Dynamic Environment' },
];

const highlights = [
  { icon: "💡", title: "The Visual Learning Aid Every Classroom Deserves", desc: "Turn any lesson into a living visual. Diagrams, timelines, and concepts rendered beautifully, in real time, right where students are looking." },
  { icon: "🎨", title: "A Creative Companion for Art Class", desc: "Vizzy becomes a co-creator for young artists. Sketch an idea, describe a mood, watch it come alive on screen. Creativity gets a collaborator." },
  { icon: "📌", title: "The Notice Board Reinvented", desc: "Reception areas and common walls, transformed. Schedules, charts, reminders, and announcements, displayed with polish that makes people stop." },
  { icon: "🖼️", title: "A Gallery for Student Art", desc: "Every masterpiece deserves a spotlight. Rotate student artwork through the frame and give young creators the recognition they deserve." },
  { icon: "🏛️", title: "History, Brought to Life", desc: "No more flat timelines. History lessons become immersive visual narratives, students seeing the past instead of just reading about it." },
  { icon: "📐", title: "Math, Made Visual", desc: "Abstract concepts turned into stunning, interactive visuals generated in real time. Numbers start being understandable." },
  { icon: "🤖", title: "Personalised Learning Plans, On Autopilot", desc: "Vizzy tracks progress and tailors visual learning material to each student. A personal learning assistant for every teacher." },
  { icon: "🏆", title: "Your Walls, Telling Your Story", desc: "Mission statements, school legacy, and achievements, displayed dynamically instead of stuck in a static frame." },
  { icon: "🔬", title: "University Research, Visualised", desc: "Turn dense research and data into compelling visual stories for departments, labs, and open days. Make complex work instantly understandable." },
  { icon: "🗺️", title: "Campus Wayfinding and Event Boards", desc: "Lecture changes, campus events, and wayfinding, displayed dynamically across buildings. No more laminated A4 sheets taped to doors." },
  { icon: "📽️", title: "Lecture Halls That Feel Alive", desc: "University lectures get a visual upgrade. Complex theories and case studies, rendered as real-time visual material that holds attention." },
  { icon: "🎓", title: "Alumni and Legacy Walls", desc: "Celebrate your institution's history, and its graduates with a dynamic wall of achievement. Living heritage, not a dusty plaque." },
];

const benefits = [
  {
    title: "Bring Learning Off the Page",
    desc: "The more visual and immersive learning gets, the deeper it sticks. Deckoviz turns textbook content into experiences students actually remember."
  },
  {
    title: "Unlock Creativity in Every Student",
    desc: "Creativity isn't a subject, it's a skill for life, one of the most foundational ones in the age of AI. Deckoviz gives every student a canvas and a companion to bring their ideas out of their heads and onto the wall."
  },
  {
    title: "A Learning Assistant for Every Teacher",
    desc: "Vizzy creates visual material, narrations, and tailored content in real time. Teachers get a teaching partner who never clocks out, who pays infinite attention, helping the teacher deliver ever more engaging lessons."
  },
  {
    title: "Future-Proof Your Institution",
    desc: "Multi-sensory, immersive learning is where education is heading. Deckoviz gets you there today, not in five years."
  },
  {
    title: "Make School Genuinely Fun",
    desc: "Fun and rigor aren't opposites. Deckoviz makes classrooms, corridors, and common areas feel like places students want to be."
  },
  {
    title: "Context-Aware, Genuinely Personal",
    desc: "Because Vizzy holds context on all students over time, it becomes an increasingly sharp, increasingly useful assistant for every teacher on staff."
  },
  {
    title: "Develop the Most Important Skill of Tomorrow",
    desc: "Creativity is the skill that survives automation. Deckoviz makes cultivating it part of the daily environment, not an extracurricular afterthought."
  },
  {
    title: "Retire the Static Noticeboard for Good",
    desc: "Swap out laminated paper and thumbtacks for something dynamic, adaptive, and genuinely worth looking at."
  },
  {
    title: "Elevate Institutional Prestige",
    desc: "For serious schools & universities, first impressions matter enormously. A Deckoviz-equipped campus signals innovation before a single word is spoken."
  },
  {
    title: "Strengthen Admissions and Campus Tours",
    desc: "Prospective students and parents remember experiences, not brochures. Give your open days a moment that actually lands."
  }
];

const fits = [
  "Exam schedules, displayed clearly and updated instantly",
  "Staff rooms with mood-setting, calming visual environments",
  "Science labs visualising experiments and data in real time",
  "Language classes with immersive cultural visuals",
  "Cafeteria and canteen walls with rotating, appetising visual themes",
  "Library reading corners with mood-matched literary visuals",
  "Mindfulness and quiet corners with calming generative art",
  "Graduation ceremony backdrops and highlight reels",
  "Career fairs with dynamic company and pathway displays",
  "Parent-teacher meeting waiting areas with a polished first impression",
  "Dormitory and residence hall common rooms",
  "Research poster and thesis defense displays",
  "Guided campus tour visual storytelling",
  "Esports and gaming society spaces",
  "Sports team walls celebrating wins and milestones",
  "Alumni reunion and fundraising event backdrops",
  "Seasonal and festival decor across common areas",
  "Open day and orientation week welcome walls"
];

const DeckovizSchoolsLanding = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      {/* ── 1. Immersive Hero ── */}
      <div className="relative pt-32 pb-20 overflow-hidden lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white"></div>
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
            Deckoviz for Schools, Universities & Learning Centres
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight font-serif">
            Welcome to the Future of <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-transparent bg-clip-text">Learning Centres</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Picture this. A wall that teaches. A frame that listens. A space that grows smarter every single day, right alongside your students, instilling their learning with more excitement and deeper engagement, helping them become more creative, and shaping their learning in ways that will stick, for the best learning is the kind where you are having fun while exploring new landscapes.
            <br className="mb-4" />
            That's the Deckoviz DASPort, the learning companion for your classrooms.
            <br className="mb-4" />
            A living, learning surface for the next generation of learning centres.
          </p>
        </motion.div>
      </div>

      {/* ── Dynamic Image Grid ── */}
      <div className="relative z-20 pb-16">
        <DynamicImageGrid 
          imageSources={schoolImages}
          sectionTitle="Classrooms Reimagined"
          sectionDescription="Visuals that adapt. Learning that feels less like a lecture and more like a conversation."
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
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 mb-6">Something is about to break in education.<br/><span className="text-[#2563EB]">In a good way.</span></h2>
          </motion.div>
          <motion.div 
            className="prose prose-lg prose-indigo mx-auto text-gray-600 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              By 2027, the kids sitting in your classrooms will have grown up talking to AI the way past generations grew up talking to search engines. They'll expect content that responds to them. Visuals that adapt. Learning that feels less like a lecture and more like a conversation.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              And then they'll walk into class and open a textbook.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Think about the gap. These are kids who can generate a video, remix a song, or get a personalised answer to any question in seconds. Then they sit down for history and get a photocopied worksheet. They sit down for art and get a box of pastels and a bell that rings in forty minutes. The tools they use to learn haven't caught up to the tools they use to live.
            </p>
            <motion.p 
              className="text-xl leading-relaxed font-medium text-gray-900 border-l-4 border-[#2563EB] pl-6 my-8"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              That gap doesn't close on its own. It has to be built.
            </motion.p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Classrooms built for the age of AI won't look like classrooms built for the age of chalk. They'll be visual, responsive, and alive, generating material in real time instead of reheating the same slides year after year. The schools that make this shift early won't just teach better. They'll feel like they belong to the world their students are actually growing up in.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              Every learning space has walls. Most of them are wasted. 
              Faded posters. Outdated timetables. A notice board nobody's updated since last term. Meanwhile, the kids on the other side of those walls are growing up on TikTok, YouTube, and interactive everything. The gap between how they learn and how your walls look has never been wider. 
              <strong className="text-[#182A4A]"> Deckoviz closes these gaps - gaps that can prevent students from reaching their fullest potential.</strong>
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300">
              It's an AI-powered Dynamic Art and Storytelling Portal, running Vizzy, your always-on creative and learning companion. Point it at a history lesson and it becomes a storyteller. Point it at art class and it becomes a canvas. Point it at your reception and it becomes the most compelling first impression your school has ever made.
            </p>
            <p className="text-xl leading-relaxed cursor-default hover:text-gray-900 transition-colors duration-300 font-medium">
              The DASPort helps teach, inspire, and remember, in ways that keep getting better with every class, every student, every day.
              <br/><br/>
              This is what a 2027 learning environment is supposed to feel like.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3. 12 Key Highlights & Use Cases ── */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, idx) => (
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
                Develop the most important skill of tomorrow. Creativity is the skill that survives automation. Deckoviz makes cultivating it part of the daily environment, not an extracurricular afterthought.
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
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
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
            Your students are growing up in a world where learning is about to be transformed dramatically. Your walls shouldn't be the one place learning stands still.
            <br/><br/>
            Deckoviz turns every classroom, corridor, and common area into a space that teaches, inspires, and evolves. It's infrastructure for how learning happens next.
            <br/><br/>
            The schools and universities that adopt this now won't just look different. They'll feel different, shaping an environment that brings the joy of learning alive for every student who walks through the door. And they’ll help shape confident kids who are ready and excited for tomorrow’s challenges and possibilities.
          </p>
          <motion.button 
            onClick={() => window.location.href='/contact'} 
            className="group px-10 py-5 bg-[#182A4A] text-white rounded-full font-bold text-lg hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-[#182A4A]/20 flex items-center justify-center mx-auto gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Bring your learning centre into the future today. Book a demo with our team.
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
};

export default DeckovizSchoolsLanding;