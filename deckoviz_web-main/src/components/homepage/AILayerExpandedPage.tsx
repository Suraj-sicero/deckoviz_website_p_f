import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Home, Layers, Activity, Heart, Mic, Sunrise } from "lucide-react";
import { Link } from "react-router-dom";

export default function AILayerExpandedPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/60" />
        <div className="absolute top-0 -left-1/4 w-[80%] h-[80%] bg-blue-100/50 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-0 -right-1/4 w-[80%] h-[80%] bg-cyan-100/50 blur-[150px] rounded-full mix-blend-multiply" />
      </div>

      {/* Navigation Bar (Minimal) */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 md:px-12 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </nav>

      <main className="relative z-10 pt-32 pb-32 max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Article Header */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-blue-900 uppercase">The Vision</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight font-serif tracking-tight">
            Deckoviz: The AI Layer<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 italic font-medium">for Your Home</span>
          </h1>
          <p className="text-2xl text-gray-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Beyond a frame, into a warm presence.
          </p>
        </motion.header>

        {/* Content Layout */}
        <div className="max-w-3xl mx-auto">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="prose prose-lg md:prose-xl prose-indigo max-w-none text-gray-700 leading-relaxed mb-24">
            <p className="text-xl md:text-2xl font-light text-gray-800 mb-8 leading-relaxed">
              There's a version of your home that exists right now, fully formed in possibility, that you haven't met yet.
            </p>
            <p>
              It's the version where the walls respond to how your day went. Where the morning has its own light and its own sound, designed for the person you're trying to be before the world gets to you. Where a difficult evening is met with something that helps, without you having to ask.
            </p>
            <p>
              Where the art on your wall isn't just art, it's a mirror, a mood, a memory, a small daily act of care that someone, or something, took on your behalf.
            </p>
            <p>
              That's what Deckoviz is building. Not a smarter screen but a comprehensive intelligence layer for your home, one that thinks in moods, in moments, in the texture of an ordinary Tuesday.
            </p>
            <p>
              And we believe this is where every home is headed. Smart homes promised intelligence and delivered switches, lights that turn on by schedule, thermostats that learn your temperature preferences. Useful, sure, but none of it knows you. None of it has any idea what kind of day you've had, what you're hoping for, what the room actually needs right now, and the rich contours of your life, the textures of your imagination.
            </p>
            <p className="font-medium text-gray-900 border-l-4 border-indigo-200 pl-6 my-10 py-2">
              The next layer of the home won't be about control. It'll be about understanding. That's the layer Deckoviz is built to be: the emotionally intelligent, context-aware, mood-attuned AI presence at the centre of your home, the layer that adapts not just to you, but to everyone who lives there with you. This is the heart and the hearth of your home. The thing that was always missing from "smart."
            </p>
          </motion.div>

          <Section
            icon={<Home className="w-8 h-8 text-indigo-500" />}
            title="Your personal artist, storyteller, and designer, all at once"
            content={[
              "Think of Deckoviz as several people who happen to live in your home, compressed into one quiet presence.",
              "It's your personal artist, generating original work from your conversations, your moods, your memories, and displaying it where you'll actually see it every day. It's your storyteller, weaving narrative into ordinary moments, narrating an artwork's history over morning coffee, reading a bedtime story to your kids in a voice they recognise. It's your mood setter, shifting the emotional register of a room before you've consciously registered that the room needs shifting. It's your home designer, curating not just what's on the wall but how the whole space feels, season to season, hour to hour. And it's your ritual architect, building the small repeated structures, morning routines, wind-down sequences, family dinners, that quietly become the shape of a life.",
              "No single one of these is the point. The point is that they're the same intelligence, working from the same understanding of who you are."
            ]}
          />

          <Section
            icon={<Layers className="w-8 h-8 text-sky-500" />}
            title="The Home Emotional OS: mood architecture, state design, life design"
            content={[
              "Every home runs on something, even if nobody designed it. A rhythm. A set of unspoken moods that shift through the day, mostly by accident, mostly by whoever got to the thermostat or the speaker first.",
              "Deckoviz becomes the layer that actually designs that rhythm. Call it the Generative Home Emotional Operating System, the Creative Operating System, the thing running quietly underneath everything else, deciding what the home feels like at any given moment and adjusting it with intention. It's the AI pulse of your home. The heartbeat. Not because it's loud or constant, but because it's the thing that's always there, always slightly aware, always making small decisions in service of how you and the people you live with actually want to feel.",
              "This shows up in three layers, stacked on top of each other:",
              "• Mood architecture means the emotional tone of your home is shaped, deliberately, room by room, hour by hour, the way a great building is shaped by light and space.",
              "• State setting means Deckoviz can shift your internal state, calm, focus, creativity, connection, through a coordinated layer of visuals, sound, and narrative, the way a film score shapes how you feel about a scene without you ever noticing the music.",
              "• Life design means all of this accumulates. The rituals, the modes, the small daily moments Deckoviz creates and holds for you become the actual architecture of how your days, and eventually your years, feel.",
              "This isn't decoration. It's the operating system for how your home makes you feel, running continuously, adjusting constantly, getting better the longer it knows you."
            ]}
          />

          <Section
            icon={<Heart className="w-8 h-8 text-cyan-600" />}
            title="An AI that feels like a presence, not a product"
            content={[
              "Vizzy isn't an app you open. It's an intelligence that lives in your space, quietly paying attention, learning, and acting, woven into the walls themselves.",
              "It knows the difference between your Monday and your Friday. It knows when your partner's been stressed this week and when your kid has had a big day at school. It holds a model, gently and privately, with deep understanding, of each person in your home: their patterns, their aesthetics, their moods, their rhythms, what helps them and when. And it uses that understanding to do something almost no home technology has ever attempted: make the space itself respond emotionally.",
              "This is proactive by design. You don't ask Deckoviz to set a mood. It notices that you've walked in tense, and the room starts to soften before you've said a word. It notices the kids are restless before dinner, and something shifts, light, art, sound, that meets that energy rather than fighting it. It notices it's been a long week, and Sunday morning arrives with exactly the kind of stillness you didn't know you needed until it was already there.",
              "That's the magic. Not magic as a gimmicky trick, magic as the feeling of being deeply, quietly understood by the space you live in."
            ]}
          />

          <Section
            icon={<Activity className="w-8 h-8 text-blue-500" />}
            title="Ambient intelligence, built for everyone in the room"
            content={[
              "Here's another way it gets genuinely different from everything else claiming to be a \"smart home\" product.",
              "Most smart home technology is reactive and shallow. It knows the temperature. It knows whether a light is on. It doesn't know you. Deckoviz is built around the opposite premise: deep context, built over time, about you and everyone else who lives in your space.",
              "It learns your patterns. Your aesthetics. Your goals, your schedules, the moods that tend to show up on Mondays versus Fridays. And crucially, it learns the same about your partner, your kids, whoever shares the home with you, and it learns the difference between what the household needs collectively and what each person needs individually.",
              "Most technology either ignores this entirely or picks one profile and applies it to everyone. Deckoviz holds all of you at once, finding the shared emotional ground when the family is together, and shifting seamlessly into individual context when the moment calls for it, your focus mode in your office, your partner's wind-down in the bedroom, the kids' bedtime story in theirs. A frame in a shared space might reflect something that works for everyone. A frame in your office might be entirely, specifically yours.",
              "A home that's emotionally intelligent for one person is a personalisation feature. A home that's emotionally intelligent for an entire household, simultaneously, dynamically, is something genuinely new. That's the layer we're building. And over time, this isn't a product you configure. It's a presence that understands, the way a thoughtful person who's lived with you for years understands, without needing to be told, that you're having one of those weeks."
            ]}
          />

          <Section
            icon={<Sunrise className="w-8 h-8 text-emerald-500" />}
            title="A home that's alive"
            content={[
              "This is the part that's hard to describe until you've felt it, but let's try anyway.",
              "Most homes are static. The walls don't know what day it is. The art doesn't know you got bad news this morning. The room you come home to at 7pm is identical, materially, to the room you left at 8am, even though you are not the same person who left it.",
              "Deckoviz makes the home adaptive. Attuned, not just to the time of day, but to your moods, your values, your hopes, the life you're actually trying to build. The frame shifts. The light will shift. The sound in the room shifts, nature sounds settling in when you need to decompress, focus tones rising when you sit down to work, a piece of music arriving alongside an artwork because the two were always saying the same thing in different languages.",
              "It can open a meditation when the day has been too much. It can start a story for your kids without anyone reaching for a device. It can narrate the context of the painting you've walked past forty times without really seeing. None of this requires you to operate anything. It requires only that you live in the space, and the space starts living back."
            ]}
          />

          <Section
            icon={<Mic className="w-8 h-8 text-teal-600" />}
            title="A voice that knows your day, and a character worth knowing"
            content={[
              "Beyond the visual, Deckoviz becomes a voice in your home, one that knows what's actually on your plate.",
              "Your morning meeting. The thing you said you'd do today and probably won't unless someone mentions it. The priority you keep meaning to get to. Deckoviz can surface these, gently, by voice and on the frame, woven into the visual and emotional fabric of the room rather than barked out like a notification. Less \"you have three unread emails,\" more a presence that knows your day's shape and helps you hold it. It's the difference between a home assistant that interrupts you and one that simply knows, the way someone who really pays attention to you knows what kind of day it's going to be before you've said a word.",
              "All of this could feel clinical. It doesn't, because Deckoviz has a personality, and you choose it. This is your home assistant on the wall, but not in the beige, robotic sense that phrase usually implies. It's playful. Warm. Genuinely fun to talk to. Choose the avatar and the voice that feels right for your home, and Vizzy becomes a character in your household's life, the presence that makes a Tuesday evening a little more interesting, that has opinions, that remembers what you talked about last week, that occasionally surprises you.",
              "Vizzy talks to you. Reminds you, by voice and on the frame, of the plan you made with someone you love. Narrates the art on your walls. Starts a story for your kids. Drops into a focus soundscape the second you sit down to work, or nature sounds the moment you walk in needing to decompress. All of it arriving the way a thoughtful person would offer it, at the right moment, without being asked, then getting quietly out of the way.",
              "A home assistant should feel like having someone delightful living quietly in the walls. Not a search bar with a microphone."
            ]}
          />

          <Section
            icon={<Sparkles className="w-8 h-8 text-indigo-400" />}
            title="The foundation for everything your home will become"
            content={[
              "This is the part that should genuinely excite anyone thinking about where home technology is headed: Deckoviz is built to be the core layer, the intelligence that everything else in your smart home eventually plugs into.",
              "Today, that means a visual and ambient intelligence layer running through your frame and your phone, learning, adapting, creating. Some of it lives on the frame. Some of it lives in your pocket, the mobile app extending the same intelligence into the parts of your day the frame can't reach, your commute, your errands, the moments before you're even home.",
              "And the frame itself is only the beginning of the hardware story. We're building toward a fuller sensory and perceptual layer: cameras and sensors that let Deckoviz understand the room and its inhabitants without you lifting a finger, speakers that carry spatial sound design as rich as the visual design, and, in time, scent, fragrance diffusion that completes the sensory picture the same way sound completes a film. And lots more in the pipeline.",
              "Every new capability doesn't sit beside this AI layer. It plugs into it, gets smarter because of it, and makes the whole home more attuned because of it."
            ]}
          />

          <Section
            icon={<Home className="w-8 h-8 text-blue-600" />}
            title="This is the layer that was always missing"
            content={[
              "Every home will have a core AI layer. That future is coming whether or not any individual product gets it right.",
              "The question is what kind of intelligence you want at the centre of your home: something that controls devices, or something that understands you. Something reactive, or something proactive. Something generic, or something that becomes, over months and years, unmistakably and specifically yours, and your family's.",
              "Deckoviz is built for people who see where this is going, and who want to be there first. The emotionally intelligent home isn't a future concept. It's available now, and it's going to feel like nothing else in your home ever has."
            ]}
          />

          {/* Callout / Final Block */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={fadeIn}
            className="mt-32 p-12 rounded-[3rem] bg-indigo-50 border border-indigo-100 shadow-xl relative overflow-hidden text-center max-w-4xl mx-auto"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100/50 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl font-bold font-serif text-gray-900 mb-6 relative z-10">Built to grow with you</h2>
            <p className="text-lg text-gray-700 leading-relaxed font-medium relative z-10 max-w-2xl mx-auto">
              What's here today runs through your frame and your phone. What's coming: sensors and cameras that let Vizzy perceive your home directly, spatial sound design as considered as the visuals, and eventually scent, the final sensory layer. Every new capability plugs into the same intelligence, making the whole home more attuned, automatically, over time.
            </p>

            <h3 className="mt-12 text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-700 font-bold italic relative z-10">
              The heart and the hearth of your home, powered by AI that actually knows you.
            </h3>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

function Section({ title, content, icon }: { title: string, content: string[], icon: React.ReactNode }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }} 
      variants={fadeIn}
      className="mb-24 relative"
    >
      <div className="flex items-start gap-6 mb-8 group">
        <div className="hidden sm:flex mt-1 w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(37,99,235,0.05)] items-center justify-center shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 leading-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed pl-0 sm:pl-[5.5rem]">
        {content.map((paragraph, idx) => (
          <p key={idx} className={paragraph.startsWith("•") ? "pl-6 mb-2" : "mb-6"}>
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  );
}
