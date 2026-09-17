import { DynamicImageGrid } from "../other/DynamicImageGrid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PartnerProgramSection from "./PartnerProgramSection";
import PowerUsesSection from "../PowerUses/PowerUsesSection";

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
            Deckoviz for Schools, Universities & Learning Centres
          </div>

          <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-tight">
            Welcome to the Future of <br className="hidden md:block"/>
            <span className="grad-text">Learning Centres</span>
          </h1>

          <p className="text-lg md:text-xl text-[#4C6A83] max-w-3xl mx-auto font-normal leading-relaxed">
            Picture this. <br className="hidden md:block"/><br className="hidden md:block"/>
            <strong className="text-[#0B2A45]">A wall that teaches.</strong> <br className="hidden md:block"/><br className="hidden md:block"/>
            <strong className="text-[#0B2A45]">A frame that listens.</strong> <br className="hidden md:block"/><br className="hidden md:block"/>
            A space that grows <strong className="text-[#0EA99B]">smarter every single day</strong>, right alongside your students, instilling their learning with more <strong className="text-[#0EA99B]">excitement and deeper engagement</strong>, helping them become more <strong className="text-[#0EA99B]">creative</strong>, and shaping their learning in ways that stick.
            <br className="mb-4" />
            That's the <strong className="text-[#0EA99B]">Deckoviz DASPort</strong>, the learning companion for your classrooms.
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
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-fraunces text-3xl md:text-5xl font-medium text-[#0B2A45] mb-6">Something is about to break in education.<br/><span className="grad-text">In a good way.</span></h2>
          </motion.div>

          <motion.div 
            className="glass-card rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl space-y-6 text-[#4C6A83] text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p>
              By 2027, the kids sitting in your classrooms will have grown up <strong className="text-[#0EA99B]">talking to AI</strong> the way past generations grew up talking to search engines.
              They'll expect <strong className="text-[#0B2A45]">content that responds to them</strong>. Visuals that adapt. Learning that feels like a <strong className="text-[#0B2A45]">conversation</strong>.
            </p>
            <p>
              And then they'll walk into class and open a textbook.
            </p>
            <p>
              <strong className="text-[#0B2A45]">Think about the gap.</strong> These are kids who can generate a video, remix a song, or get a <strong className="text-[#0EA99B]">personalised answer</strong> to any question in seconds.
              The <strong className="text-[#0EA99B]">tools they use to learn</strong> haven't caught up to the tools they use to live.
            </p>
            <div className="p-6 rounded-2xl bg-[#DDF6F0]/60 border border-[#0EA99B]/30 text-[#0B2A45] font-fraunces text-xl font-medium my-6">
              That gap doesn't close on its own. It has to be built.
            </div>
            <p>
              Classrooms built for the age of AI won't look like classrooms built for the age of chalk.
              They'll be <strong className="text-[#0B2A45]">visual, responsive, and alive</strong>, generating material in real time instead of reheating the same slides year after year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section: How Schools Can Use The GeDiPortal, in Practice ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
              IN PRACTICE
            </div>
            <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45] leading-tight">
              How Schools Can Use The GeDiPortal, <span className="grad-text">in Practice</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Give student work a real stage",
                icon: "🎨",
                points: [
                  "Show far more student creativity than one bulletin board by the office was ever able to hold.",
                  "Let creativity become part of the building itself, not just something handed back with a grade and forgotten in a backpack.",
                  "Make the walls reflect the actual students who walk them, not generic posters ordered from a catalog."
                ]
              },
              {
                title: "Bring lessons to life, visually",
                icon: "💡",
                points: [
                  "Use Deckoviz's multimodal generation to match whatever's actually being taught that week—a history unit, a science concept, a piece of literature—instead of decor that never changes no matter the curriculum.",
                  "Add immersive sound where it helps a lesson land, a narrated moment, an atmosphere, not just static images on a screen.",
                  "Give teachers a way to make an idea visually real in the moment, instead of relying on a textbook illustration to do all the work."
                ]
              },
              {
                title: "Give every student a companion that grows with them",
                icon: "🤖",
                points: [
                  "Provide each student their own Vizzy, a learning companion with context that carries forward year to year instead of resetting every September.",
                  "Let that companion notice patterns and growth over time, the kind of long-term picture one teacher juggling thirty students can't fully hold onto alone.",
                  "Make personalization the default for every student, not a special accommodation reserved for a few."
                ]
              },
              {
                title: "Support teachers, don't just impress visitors",
                icon: "👩‍🏫",
                points: [
                  "Give teachers a real assistant for prep and delivery, instead of one more tool competing for their attention.",
                  "Size the hardware to the actual room, larger displays for an auditorium, right-sized options for a standard classroom, so it fits real school infrastructure, not a generic install.",
                  "Build in the guardrails and customization schools actually need from day one, matched to your specific policies and curriculum rather than a one-size-fits-all rollout."
                ]
              },
              {
                title: "Connect the classroom to home",
                icon: "🏠",
                points: [
                  "Give parents a genuine window into what's happening in class, not just a grade report at term's end.",
                  "Let learning continue past the school day without requiring a whole separate app or login parents have to remember.",
                  "Make that connection feel like a natural extension of how the school already communicates, not one more portal competing for attention."
                ]
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-xl space-y-4 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center text-2xl shadow-sm mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="font-fraunces text-2xl font-medium text-[#0B2A45] mb-4 leading-snug">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-3 text-[#4C6A83] text-sm leading-relaxed">
                    {pillar.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#0EA99B] font-bold mt-1 shrink-0">✦</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section: What Kinds of Schools Is The GeDiPortal For? ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
              TARGET INSTITUTIONS
            </div>
            <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45] leading-tight">
              What Kinds of Schools Is <span className="grad-text">The GeDiPortal For?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "You want students' creativity actually seen, not filed away",
                icon: "🖼️",
                points: [
                  "Give student work a real stage beyond the one bulletin board by the office, so more than a fraction of what kids make ever gets seen by anyone.",
                  "Let creativity show up as part of the building itself, not just something handed back with a grade and forgotten.",
                  "Make the walls reflect the students who actually walk them, not generic posters ordered from a catalog."
                ]
              },
              {
                title: "You want lessons to come alive, not stay stuck on a page",
                icon: "📖",
                points: [
                  "Bring history, art, and ideas into the room visually, so a lesson on ancient Rome or a unit on color theory has something real to look at while it's being taught.",
                  "Use Deckoviz's multimodal generation to match what's being taught that week, instead of decor that never changes no matter what's on the curriculum.",
                  "Add immersive sound where it helps a lesson land, a narrated moment, an atmosphere, not just images on a screen."
                ]
              },
              {
                title: "You're investing in who each student becomes, not just this semester's grades",
                icon: "🌱",
                points: [
                  "Give every student their own Vizzy, a learning companion with context that grows over the years instead of resetting every September.",
                  "Let that companion notice patterns, interests, and growth over time, the kind of long-term picture one teacher juggling thirty kids can't fully hold onto alone.",
                  "Make personalization the default, not a special accommodation only some students get."
                ]
              },
              {
                title: "You want to support your teachers, not just impress the people touring the building",
                icon: "🤝",
                points: [
                  "Give teachers a real assistant, one that helps with prep and delivery instead of adding another tool to manage on top of everything else.",
                  "Make the building itself say something to a new family walking in for the first time, before a single word is spoken in a tour.",
                  "Let the school feel considered and alive rather than institutional, the kind of place that makes a stronger first impression than a clean hallway ever could."
                ]
              },
              {
                title: "You want school and home to feel like one continuous story, not two disconnected worlds",
                icon: "🔄",
                points: [
                  "Give parents a real window into what's actually happening in the classroom, not just a grade report at the end of term.",
                  "Let learning continue past the school day, without needing a completely separate app or system to make that happen.",
                  "Make the connection feel like a natural part of how the school already communicates, not one more portal for parents to remember to check."
                ]
              },
              {
                title: "You need it to actually work inside a real school, not just look good in a demo",
                icon: "⚙️",
                points: [
                  "Hardware sized for the room it's actually going in, larger displays for an auditorium, right-sized options for a standard classroom.",
                  "Software and firmware built around school guardrails from day one, not bolted on after something goes wrong.",
                  "Customization per school, so the platform fits your specific policies, culture, and curriculum instead of a one-size-fits-all rollout."
                ]
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-xl space-y-4 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center text-2xl shadow-sm mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-fraunces text-2xl font-medium text-[#0B2A45] mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <ul className="space-y-3 text-[#4C6A83] text-sm leading-relaxed">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#0EA99B] font-bold mt-1 shrink-0">✔</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. 12 Key Highlights & Use Cases ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#0A8378] font-bold tracking-wider uppercase text-xs">Possibilities</span>
            <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">12 Key Highlights & Use Cases</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <motion.div 
              className="col-span-1 lg:sticky lg:top-32 space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">Core Benefits</h2>
              <p className="text-[#4C6A83] text-lg leading-relaxed">
                Develop the most important skill of tomorrow. Creativity is the skill that survives automation. Deckoviz makes cultivating it part of the daily environment.
              </p>
            </motion.div>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx} 
                  className="glass-card rounded-3xl p-6 border border-white/80 shadow-lg flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#DDF6F0] text-[#0EA99B] font-bold text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg font-medium text-[#0B2A45] mb-2">{benefit.title}</h3>
                    <p className="text-[#4C6A83] text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 18 More Ways Deckoviz Fits Your Space ── */}
      <section className="py-24 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto px-6 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-fraunces text-3xl md:text-4xl font-medium text-[#0B2A45]">18 More Ways Deckoviz Fits Your Space</h2>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-6">
          {fits.map((fit, idx) => (
            <motion.div 
              key={idx} 
              className="glass-card px-5 py-3 rounded-full text-[#0B2A45] text-sm font-medium border border-white/80 shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (Math.min(idx, 15)) * 0.03 }}
            >
              <span>✨</span>
              <span>{fit}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Education Partner Program Section ── */}
      <PartnerProgramSection />

      <PowerUsesSection vertical="schools" />

      {/* ── 6. The Bottom Line (CTA) ── */}
      <section className="py-24 relative text-center z-10">
        <motion.div 
          className="max-w-4xl mx-auto px-6 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-fraunces text-4xl sm:text-5xl font-medium text-[#0B2A45]">The Bottom Line</h2>
          <p className="text-lg text-[#4C6A83] leading-relaxed max-w-3xl mx-auto">
            Your students are growing up in a world where learning is about to be transformed dramatically. Your walls shouldn't be the one place learning stands still.
            <br/><br/>
            Deckoviz turns every classroom, corridor, and common area into a space that teaches, inspires, and evolves.
          </p>

          <motion.button 
            onClick={() => window.location.href='/contact'} 
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-[#0EA99B] to-[#123C63] shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Book a demo with our team
            <span>→</span>
          </motion.button>

          <div className="text-center pt-4">
            <Link
              to="/deckoviz-for-schools-features"
              className="inline-flex items-center text-base font-semibold text-[#0EA99B] hover:text-[#0B2A45] transition-colors"
            >
              <span>View GeDiPortal v1 feature list</span>
              <span className="ml-2">→</span>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default DeckovizSchoolsLanding;