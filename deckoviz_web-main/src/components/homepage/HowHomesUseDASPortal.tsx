import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Heart, Sun, Sparkles, Home, Layers } from 'lucide-react';

const HOME_PRACTICE_PILLARS = [
  {
    icon: <Palette className="w-6 h-6 stroke-[#0EA99B]" />,
    title: "Choose or create art that's actually yours",
    items: [
      'Pick from a massive, constantly expanding global art library instead of the same handful of prints everyone seems to have.',
      "Go further and create personal pieces with Vizzy, art built around your own taste, your own moments, your own aesthetic, not someone else's idea of what belongs on your wall.",
      'Rotate through styles and moods whenever you want, so the art in your home stops being a one-time decorating decision and becomes something you keep curating.'
    ]
  },
  {
    icon: <Heart className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Turn memories into art, not backlog',
    items: [
      'Bring the thousands of photos sitting on your phone into something you and your family actually see, instead of a folder nobody scrolls back through.',
      'Give family milestones and history an actual place in the home: the people, the places, the moments that made this family what it is.',
      'Let multiple generations show up in the same story, a home that feels like it belongs to grandparents and kids alike, not just whoever picked the decor.'
    ]
  },
  {
    icon: <Sun className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Set the mood, and let it shift with your day',
    items: [
      'Set the room on purpose: calm for a slow morning, focused for a work session, warm for guests, instead of walls that say nothing no matter the hour.',
      'Build small rituals around it: a specific look and feel for winding down at night or starting the day right.',
      'Layer music in alongside the visuals, so the room shifts on more than one sense, sound and sight working together rather than one and not the other.'
    ]
  },
  {
    icon: <Sparkles className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Make it a creative practice, not just a display',
    items: [
      'Use Vizzy as an actual creative partner: write a poem, sketch an idea, work through something together, instead of only browsing a gallery someone else filled.',
      'Build a small daily habit around it: a few minutes of self-expression that compounds over weeks, rather than a hobby that never quite starts.',
      'Turn what you make into something real and visible, not a note left in a drawer or buried three thousand photos deep on your phone.'
    ]
  },
  {
    icon: <Home className="w-6 h-6 stroke-[#0EA99B]" />,
    title: "Set the scene when you're hosting",
    items: [
      'Match the mood to the actual occasion: a holiday dinner, a game night, a quiet Sunday brunch, instead of a room that looks the same no matter who\'s coming over.',
      'Give guests something to notice the moment they walk in: a piece, a playlist, a visual that sets the tone for the evening.',
      'Make hosting feel considered without extra effort on the day itself: the space does part of the work for you.'
    ]
  }
];

const WHAT_KINDS_OF_HOMES = [
  {
    icon: <Palette className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Deeply Meaningful Art, Not Just Whatever Came With the Walls',
    bullets: [
      "Choose from tens of thousands of artworks in Deckoviz's global library instead of settling for the same three prints everyone else has.",
      "Go further and create personal pieces with Vizzy, art that reflects your own taste, your own moments, your own aesthetic rather than someone else's idea of what belongs in a living room.",
      "Rotate through styles and moods as often as you like, so the art in your home stops being a one-time decorating decision and becomes something you actually curate."
    ]
  },
  {
    icon: <Heart className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Built on Memory & Story (Visible Heritage)',
    bullets: [
      "Turn the thousands of photos sitting on your phone into something you and your family actually see, instead of a backlog nobody scrolls through.",
      "Give family history and milestones a real place in the home: the people, the places, the moments that made this family what it is.",
      "Bring grandparents, kids, and everyone in between into the same story, a home that feels like it belongs to more than one generation at once."
    ]
  },
  {
    icon: <Sun className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Different Depending on the Day, Mood, & Life',
    bullets: [
      "Set a mood on purpose: calm for a Sunday morning, focused for a work session, warm for guests, instead of leaving the walls to say nothing at all.",
      "Build rituals around it: a morning mode, an evening wind-down, a specific state you want to step into when you walk in the door.",
      "Layer in music and sound alongside the visuals, so the room shifts on more than one sense at a time."
    ]
  },
  {
    icon: <Sparkles className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Alive, Personal, Attuned, & Emotionally Intelligent',
    bullets: [
      "Let Vizzy act as a creative companion, not just a display — someone to make something with, not just something to look at.",
      "Give hosting a different edge: a space that feels curated and considered the moment guests walk in, not just tidied up.",
      "Keep the home from ever fully settling into \"finished,\" there's always another piece, another mood, another day's version of the space to discover."
    ]
  },
  {
    icon: <Layers className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'A Daily Creative Practice (Not Just Something to Admire)',
    bullets: [
      "Use Vizzy as an actual creative muse: write a poem, sketch an idea, work through a piece together, instead of just browsing a gallery someone else filled.",
      "Build a small daily habit around it, a few minutes of self-expression that compounds over months and decades.",
      "Turn what makes your life into something real and visible, not a note left in a drawer or a photo buried three layers deep on your phone."
    ]
  },
  {
    icon: <Home className="w-6 h-6 stroke-[#0EA99B]" />,
    title: 'Fits the Actual Shape of Your Life',
    bullets: [
      "Working from home, and want the room to feel different for a focused Tuesday than it does on a Friday afternoon.",
      "Living alone, and want the space to feel considered and yours.",
      "Sharing your life, you want the most photogenic, or most ridiculous, moments actually to show up somewhere."
    ]
  }
];

const HowHomesUseDASPortal: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#EBF5F8] via-[#F4FAF9] to-white relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&display=swap');
        .home-serif {
          font-family: 'Fraunces', Georgia, serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">

        {/* SECTION 1: HOW HOMES USE THE DECKOVIZ DASPORTAL IN PRACTICE */}
        <div className="space-y-16">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-teal-500/20 shadow-sm text-xs font-semibold text-[#0EA99B] tracking-wide uppercase"
            >
              <Home className="w-3.5 h-3.5" /> Personal & Home Use
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="home-serif text-3xl sm:text-5xl lg:text-6xl text-[#0B2A45] font-medium leading-[1.15]"
            >
              How Homes Use The Deckoviz <br className="hidden sm:block" />
              DASPortal, <span className="bg-gradient-to-r from-[#0EA99B] to-[#1B4C79] bg-clip-text text-transparent">in Practice</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#4C6A83] text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Some of our users like to use the DASPortal as a pure personal art frame and home atmosphere engine.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOME_PRACTICE_PILLARS.map((hPillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(14,169,155,0.15)" }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/90 shadow-xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-teal-500/20 flex items-center justify-center shadow-sm mb-6">
                    {hPillar.icon}
                  </div>

                  <h3 className="home-serif text-xl text-[#0B2A45] font-medium mb-4 leading-snug">
                    {hPillar.title}
                  </h3>

                  <div className="space-y-3">
                    {hPillar.items.map((hText, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0EA99B] mt-2 flex-shrink-0" />
                        <p className="text-[#4C6A83] text-sm leading-relaxed">
                          {hText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: WHAT KINDS OF HOMES IS THE DECKOVIZ DASPORTAL DESIGNED FOR? */}
        <div className="pt-12 border-t border-[#0B2A45]/10 space-y-16">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-teal-500/20 shadow-sm text-xs font-semibold text-[#0EA99B] tracking-wide uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" /> Home Philosophy
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="home-serif text-3xl sm:text-5xl lg:text-6xl text-[#0B2A45] font-medium leading-[1.15]"
            >
              What Kinds of Homes Is The Deckoviz <br className="hidden sm:block" />
              DASPortal <span className="bg-gradient-to-r from-[#0EA99B] to-[#1B4C79] bg-clip-text text-transparent">Designed For?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#4C6A83] text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              For homes that demand living art, personal legacy, intelligent ambient moods, and daily creative inspiration.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHAT_KINDS_OF_HOMES.map((kHome, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(14,169,155,0.15)" }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/90 shadow-xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-teal-500/20 flex items-center justify-center shadow-sm mb-6">
                    {kHome.icon}
                  </div>

                  <h3 className="home-serif text-xl text-[#0B2A45] font-medium mb-4 leading-snug">
                    {kHome.title}
                  </h3>

                  <div className="space-y-3">
                    {kHome.bullets.map((bulletText, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0EA99B] mt-2 flex-shrink-0" />
                        <p className="text-[#4C6A83] text-sm leading-relaxed">
                          {bulletText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowHomesUseDASPortal;
