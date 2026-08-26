import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, ArrowLeft, Star, BookOpen, Layers, 
  Palette, Heart, Compass, Clock, Zap, Infinity 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AlternateUseCasesGuide() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500/30 font-sans pb-32 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] rounded-full bg-indigo-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-white/60 hover:text-white mb-16 transition-all group"
        >
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-105 group-hover:-translate-x-1 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">Go Back</span>
        </button>

        {/* Header Title */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-center mb-28 space-y-8"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(59,130,246,0.3)] mb-8">
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-white via-blue-100 to-indigo-400 bg-clip-text text-transparent leading-[1.1] tracking-tight drop-shadow-lg max-w-4xl mx-auto">
            An Alternate Guide To The Deckoviz DASPort Use Cases
          </h1>
          <p className="text-xl sm:text-3xl text-blue-200/80 font-light tracking-wide pt-6 max-w-3xl mx-auto leading-relaxed">
            Inspiration For How To Make The Most Of Your Home
          </p>
        </motion.div>

        {/* Content Container */}
        <div className="space-y-24">

          {/* PART 1 */}
          <SectionBlock 
            title="Part 1: The Living Canvas"
            subtitle="Art, Mood, Story, and Inner Worlds"
            icon={<Palette className="w-8 h-8 text-blue-400" />}
          >
            <P className="text-xl sm:text-2xl font-light text-white/90 leading-relaxed max-w-3xl mb-8">There was a time when walls were passive.</P>
            <P>You chose something once, put it up, and over time, you stopped seeing it. Art became background noise. Photos became forgotten. Posters became static reminders that slowly lost their meaning.</P>
            <P>That world is over.</P>
            <P className="text-white font-medium text-lg">Now, with Deckoviz, your walls can think, adapt, evolve, respond, and most importantly, mean something again.</P>
            <P>This guide is designed as a long, evolving companion. A place you come back to, not just once, but repeatedly, as you discover new ways to use Deckoviz in your home. As we build new features, and as our users discover new use cases, this will continue to grow.</P>
            <P>This first section focuses on the most foundational layer:</P>
            <BlockQuote>Your home as a living canvas.</BlockQuote>

            <H2>1. Your Personal Art Engine</H2>
            <H3>Art That Is Not Just Seen, But Lived With</H3>
            <P>At the heart of Deckoviz is a simple but powerful shift:</P>
            <P>Art is no longer static. It is alive, adaptive, and personal.</P>
            <P>You are no longer choosing art.</P>
            <P className="font-semibold text-blue-300 text-xl">You are co-creating it, evolving it, and living inside it.</P>
            
            <H4>Deckoviz becomes:</H4>
            <GridList items={[
              "Your personal painter", "Your abstract artist", "Your visual interpreter", 
              "Your dream visualizer", "Your emotional translator", "Your evolving gallery"
            ]} />

            <H4>It can turn:</H4>
            <GridList items={[
              "A memory into a painting", "A feeling into a visual language", "A thought into a symbolic composition", 
              "A song into a living visual system", "A journal entry into a cinematic piece"
            ]} />

            <H4>Use Cases</H4>
            <List>
              <ListItem>A calm abstract artwork that evolves through the day, subtly shifting tones as your mood changes</ListItem>
              <ListItem>A gratitude-inspired piece that appears every morning, never repeating itself</ListItem>
              <ListItem>A rotating gallery of evolving generative artworks that feel alive, not looped</ListItem>
              <ListItem>A child's sketch transformed into a gallery-worthy visual experience</ListItem>
              <ListItem>A photo reinterpreted across different art styles over time</ListItem>
            </List>

            <H4>Why This Matters</H4>
            <InfoBox>
              <P className="text-white/90">Art has always been a mirror of the inner world.<br/>Deckoviz makes that mirror dynamic.<br/>Instead of choosing a single snapshot of identity, your home reflects who you are becoming.</P>
            </InfoBox>

            <Divider />

            <H2>2. Mood as a First-Class Citizen</H2>
            <H3>Your Home as a State-Setter</H3>
            <P>Most people live at the mercy of their environment. Lighting, sound, visual clutter, randomness.</P>
            <P>Deckoviz flips that.</P>
            <P>It allows you to design your emotional state. It becomes a mood engine. A state machine. A way to enter the state you want, when you want.</P>

            <H4>Use Cases</H4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <UseCaseCard title="Creative Mode" icon={<Sparkles className="w-5 h-5 text-purple-400" />}>
                Abstract, fluid, expressive visuals. Music-synced art that stimulates ideation. Moodboards that evolve as you think.
              </UseCaseCard>
              <UseCaseCard title="Focus Mode" icon={<Compass className="w-5 h-5 text-blue-400" />}>
                Minimal, low-noise visual environments. Subtle motion that aids concentration. Soundscapes that deepen attention.
              </UseCaseCard>
              <UseCaseCard title="Calm / Wind-Down" icon={<Heart className="w-5 h-5 text-pink-400" />}>
                Slow, breathing visuals. Nature-inspired environments. Gentle light and motion.
              </UseCaseCard>
              <UseCaseCard title="Energy Mode" icon={<Zap className="w-5 h-5 text-yellow-400" />}>
                High-tempo, vibrant visuals. Music-reactive art. Dynamic color transitions.
              </UseCaseCard>
              <UseCaseCard title="Romantic Mode" icon={<Star className="w-5 h-5 text-red-400" />}>
                Warm tones, slow transitions. Intimate visual storytelling. Music + art synchronization.
              </UseCaseCard>
              <UseCaseCard title="Gratitude / Reflection" icon={<BookOpen className="w-5 h-5 text-indigo-400" />}>
                Memory surfaces. Meaningful quotes. Symbolic, reflective visuals.
              </UseCaseCard>
            </div>

            <H4>Why This Matters</H4>
            <InfoBox>
              <P className="text-white/90">Mood is not accidental. It is designed, whether consciously or not.<br/>Deckoviz gives you control over your internal state by shaping your external environment.</P>
            </InfoBox>

            <Divider />

            <H2>3. Visual Storytelling - Stories That Live With You</H2>
            <H3>From Passive Consumption to Living Narratives</H3>
            <P>Stories are one of the most powerful tools humans have. But somewhere along the way, they got trapped in screens. Deckoviz brings stories back into space. It turns storytelling into a shared, visual, immersive experience.</P>

            <H4>What This Unlocks</H4>
            <GridList items={[
              "Stories that unfold on your walls", "Narratives that move with you", 
              "Books that become environments", "Poetry that becomes atmosphere"
            ]} />

            <H4>Use Cases</H4>
            <List>
              <Subheading>Family Storytelling Rituals</Subheading>
              <ListItem>A parent narrates a story while visuals evolve in real-time</ListItem>
              <ListItem>Bedtime stories that feel cinematic but intimate</ListItem>
              <ListItem>Kids co-creating stories with visual feedback</ListItem>
              
              <Subheading>Reading Companion Mode</Subheading>
              <ListItem>A book visualized chapter by chapter</ListItem>
              <ListItem>Key scenes rendered as ambient art</ListItem>
              
              <Subheading>Personal Story Creation</Subheading>
              <ListItem>Turning your life experiences into visual narratives</ListItem>
              <ListItem>Creating storybooks from memories</ListItem>
            </List>

            <H4>Why This Matters</H4>
            <InfoBox>
              <P className="text-white/90">Stories shape identity.<br/>Deckoviz restores storytelling as something shared, lived, and felt, not just consumed.</P>
            </InfoBox>

            <Divider />

            <H2>4. Your Imagination Gym</H2>
            <H3>Training Visualization, Creativity, and Inner Worlds</H3>
            <P>Most people underestimate how trainable imagination is.</P>
            <P>Visualization is a skill. Creativity is a skill. Symbolic thinking is a skill.</P>
            <P>Deckoviz becomes a tool to train all three.</P>

            <H4>Use Cases</H4>
            <GridList items={[
              "Visualizing future goals in symbolic form",
              "Turning abstract ideas into visual systems",
              "Practicing mental imagery through evolving visuals",
              "Exploring 'what if' scenarios through art",
              "Building inner worlds and landscapes"
            ]} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <UseCaseCard title="For Creators" compact>Rapid prototyping visually. Generating variations. Exploring aesthetics quickly.</UseCaseCard>
              <UseCaseCard title="For Thinkers" compact>Mapping ideas into visual structures. Translating thoughts into symbolic forms.</UseCaseCard>
              <UseCaseCard title="For Dreamers" compact>Visualizing dreams, aspirations. Creating personal mythologies.</UseCaseCard>
            </div>

            <Divider />

            <H2>5. Your Escape, Your Portal</H2>
            <H3>Transport Yourself Without Leaving Your Home</H3>
            <P>Sometimes you don't want information. You want escape. You want to feel somewhere else.</P>
            <P>Deckoviz becomes a portal.</P>

            <H4>Sensory Travel & Escapes</H4>
            <List>
              <ListItem>A beach environment when you need calm.</ListItem>
              <ListItem>Forest immersion when you need grounding.</ListItem>
              <ListItem>Mountain visuals for clarity.</ListItem>
              <ListItem>Rainy window aesthetics for introspection.</ListItem>
              <ListItem>Space, cosmos, and surreal worlds for wonder.</ListItem>
            </List>

            <H4>Why This Matters</H4>
            <InfoBox><P className="text-white/90">Your environment shapes your nervous system. Deckoviz allows you to shift environments instantly.</P></InfoBox>

            <Divider />

            <H2>6. For Couples - Shared Meaning</H2>
            <H3>Turning Your Home Into a Relationship Space</H3>
            <P>Most homes are shared physically. Very few are shared emotionally.</P>

            <H4>Rituals for Couples</H4>
            <GridList items={[
              "Shared memory walls of your relationship",
              "Anniversary visual timelines",
              "Romantic ambience modes",
              "Personalized love notes turned into art",
              "Weekly reflection nights",
              "Future visualization together"
            ]} />

            <Divider />

            <H2>7. For Families & Kids</H2>
            <H3>Play, Learning, Creativity, and Connection</H3>
            <P>For families, Deckoviz becomes a shared canvas. Not just for display, but for interaction.</P>

            <H4>Use Cases</H4>
            <GridList items={[
              "Turning kids' sketches into art",
              "Educational posters that evolve",
              "Learning through visual narratives",
              "Game nights with generative experiences",
              "Celebration modes"
            ]} />

            <H4>Why This Matters</H4>
            <InfoBox><P className="text-white/90">Most digital experiences isolate. Deckoviz brings people together.</P></InfoBox>

            <Divider />

            <H2>8. Posters, Intentions & Life Design</H2>
            <H3>Your Walls as Gentle Guidance Systems</H3>
            <P>Your environment nudges your behavior more than you realize. Deckoviz turns your walls into intentional systems.</P>
            
            <List>
              <ListItem>Vision boards that evolve over time</ListItem>
              <ListItem>Affirmations that appear contextually</ListItem>
              <ListItem>Goals visualized symbolically</ListItem>
            </List>

            <H4>Why This Matters</H4>
            <InfoBox><P className="text-white/90">Most reminders become invisible. Deckoviz keeps them alive.</P></InfoBox>

            <Divider />

            <H2>9. A Living, Breathing Home</H2>
            <P>When you put all of this together, something interesting happens.</P>
            <BlockQuote>Your home stops being static.<br/>It starts responding.<br/>It starts adapting.<br/>It starts participating.</BlockQuote>
            <P className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-6 mb-8">
              You don't just live in your home. You interact with it. You shape it. And it shapes you back.
            </P>
          </SectionBlock>

          {/* PART 2 */}
          <SectionBlock 
            title="Part 2: Memory, Ritual & Intelligence"
            subtitle="The Rhythm of Everyday Life"
            icon={<Clock className="w-8 h-8 text-purple-400" />}
          >
            <P className="text-xl sm:text-2xl font-light text-white/90 leading-relaxed max-w-3xl mb-8">
              If Part 1 was about turning your home into a living canvas, this part is about something deeper: Turning your home into a living system.
            </P>
            <P>Because the real power of Deckoviz is not just in creating beautiful moments. It is in shaping how your days unfold, how your memories surface, how your habits form, and how your home quietly guides your life.</P>

            <H2>10. Memory as a Living Surface</H2>
            <H3>Not Just Stored - Surfaced, Felt, and Re-lived</H3>
            <P>Most of our memories are trapped. Thousands of photos sit buried in camera rolls. Important moments fade into digital archives.</P>
            <H4>Deckoviz turns memory into a living surface.</H4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <UseCaseCard title="Memory of the Day" icon={<Sparkles className="w-5 h-5 text-indigo-400" />}>
                A meaningful moment from your past appears gently in the background. Not random, but context-aware.
              </UseCaseCard>
              <UseCaseCard title="Anniversary & Milestones" icon={<Heart className="w-5 h-5 text-pink-400" />}>
                Wedding memories, birthdays, travel anniversaries. Life events resurfaced automatically.
              </UseCaseCard>
              <UseCaseCard title="Artistic Transformation" icon={<Palette className="w-5 h-5 text-blue-400" />}>
                A simple photo becomes a painting. A series of photos becomes a cinematic sequence.
              </UseCaseCard>
              <UseCaseCard title='"Just Because" Moments' icon={<Star className="w-5 h-5 text-yellow-500" />}>
                Unexpected resurfacing of forgotten memories. Emotional surprise moments that feel human.
              </UseCaseCard>
            </div>

            <H4>Why This Matters</H4>
            <InfoBox><P className="text-white/90">Memory is identity. Deckoviz helps you stay connected to your past without getting stuck in it.</P></InfoBox>

            <Divider />

            <H2>11. Rituals & Daily Life Design</H2>
            <H3>Turning Time Into Meaning</H3>
            <P>Most people don't design their days. They react to them.</P>
            
            <BlockQuote variant="purple">Core Idea: You don't need more discipline. You need better environments.</BlockQuote>

            <H4>Architect Your Time</H4>
            <List>
              <Subheading>Morning Rituals</Subheading>
              <ListItem>Gentle wake-up visuals and intention-setting artwork.</ListItem>
              <ListItem>Light, energizing moodscapes with a "focus of the day".</ListItem>

              <Subheading>Work / Deep Focus Blocks</Subheading>
              <ListItem>Automatic switch to minimal visual noise and subtle motion.</ListItem>

              <Subheading>Evening Wind-Down</Subheading>
              <ListItem>Transition to calm, slower visuals with gratitude prompts.</ListItem>
            </List>

            <Divider />

            <H2>12. Vizzy - Your Home's Intelligence Layer</H2>
            <H3>A System That Learns You</H3>
            <P>At some point, your home should stop feeling like a tool... and start feeling like it knows you.</P>
            <P className="font-medium text-lg text-indigo-300">Vizzy is that layer.</P>

            <GridList items={[
              "Learns your taste", "Understands your preferences", "Tracks patterns in your behavior", 
              "Adapts to your lifestyle", "Curates without being intrusive"
            ]} />

            <H4>Signature Experiences</H4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <UseCaseCard title="Art for the Day" compact>Reflects your evolving taste.</UseCaseCard>
              <UseCaseCard title="Memory for the Day" compact>Connects you to your past.</UseCaseCard>
              <UseCaseCard title="Quote for the Day" compact>Context-aware inspiration.</UseCaseCard>
              <UseCaseCard title="Knowledge for the Day" compact>Subtle learning integrated into space.</UseCaseCard>
            </div>

            <Divider />

            <H2>13. Multi-User Homes</H2>
            <P>Most homes are shared, but everyone is different. Deckoviz unlocks individual profiles for each person, so each user sees what resonates with them, while sharing family modes during communal time.</P>

            <H2>14. Learning Without Trying</H2>
            <H3>Ambient Education</H3>
            <P>Learning does not need to feel like effort. Deckoviz makes learning ambient through visual infographics, visual science concepts, and history timelines seamlessly woven into beautiful art.</P>

            <H2>15. Play, Games & Interaction</H2>
            <P>Games that spark conversation. Play that encourages creativity. Deckoviz flips modern game isolation into shared visual playgrounds for family and friends.</P>

            <H2>16. Your Home as a Creative Studio</H2>
            <P>Idea exploration visualized instantly. A space to experiment with composition, map thoughts, and trigger collaborative creativity at any moment.</P>

            <Divider />

            <H2>17. The Subtle Shift</H2>
            <P>When you combine memory, ritual, intelligence, learning, and creativity...</P>
            <BlockQuote variant="purple">
              Designed for: better mornings, calmer evenings, stronger relationships, deeper thinking, more creativity.
            </BlockQuote>
            <P className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-6 mb-8">
              It becomes aligned with you.
            </P>
          </SectionBlock>


          {/* PART 3 */}
          <SectionBlock 
            title="Part 3: The Future of Living Spaces"
            subtitle="Advanced Use Cases & Edge Experiences"
            icon={<Infinity className="w-8 h-8 text-indigo-400" />}
          >
            <P className="text-xl sm:text-2xl font-light text-white/90 leading-relaxed max-w-3xl mb-8">
              This is where Deckoviz starts to stretch beyond what a "home device" traditionally is, and begins to feel like a layer heavily intertwined with your life.
            </P>
            <P>The most interesting use cases are not designed top-down. They are discovered.</P>

            <H2>18. Advanced & Experimental Use Cases</H2>
            <H3>Where Things Start Getting Interesting</H3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <UseCaseCard title="Dream Visualization" icon={<Sparkles className="w-5 h-5 text-indigo-400" />}>
                Turn fragments of dreams into visual landscapes. Reconstruct symbolic dream narratives and explore subconscious imagery.
              </UseCaseCard>
              <UseCaseCard title="Inner World Mapping" icon={<Compass className="w-5 h-5 text-blue-400" />}>
                Create visual representations of your thoughts, emotions, and belief systems. Map your mental models into evolving visual systems.
              </UseCaseCard>
              <UseCaseCard title="Future Self Visualization" icon={<Star className="w-5 h-5 text-yellow-400" />}>
                Visualize who you want to become. Create evolving representations of long-term goals.
              </UseCaseCard>
              <UseCaseCard title="Emotional Processing" icon={<Heart className="w-5 h-5 text-pink-400" />}>
                Translate complex emotions into visual forms. Use art as a way to process internal states.
              </UseCaseCard>
            </div>

            <H4>Why This Matters</H4>
            <InfoBox><P className="text-white/90">The most valuable tools act as leverage-they unlock entirely new behaviors.</P></InfoBox>

            <Divider />

            <H2>19. Social & Shared Experiences</H2>
            <P>Shared visual sessions across locations. Room-specific celebration experiences for guests. Music + art synced evenings.</P>

            <H2>20. The Ecosystem Layer</H2>
            <P>Multiple units across rooms with coordinated experiences. Integration with sound systems, lighting, and wearables for a deeply coherent environment.</P>

            <H2>22. Long-Tail Use Cases</H2>
            <P>The unexpected phenomena:</P>
            <GridList items={[
              "A writer building fictional worlds visually",
              "A child turning doodles into cinematic stories",
              "A couple using it for reflection rituals",
              "Visualizing complex business ideas",
              "Using it as a mood stabilizer"
            ]} />

            <Divider />

            <H2>24. The Future of Spaces</H2>
            <P>We design our spaces. Then our spaces shape us. For the longest time, our spaces have been static, predictable, emotionally flat.</P>
            
            <BlockQuote variant="indigo">
              The future of homes will be:<br/>Adaptive. Responsive. Emotionally aware. Deeply personal.<br/><br/>Deckoviz is one step in that direction.
            </BlockQuote>

            <Divider />

            <H2>25. A Living, Evolving Guide</H2>
            <P>This guide is not meant to be finished. It is meant to grow with new features, capabilities, and user-discovered ideas.</P>

            <H2>26. What You Should Do With This</H2>
            <P>Do not try to use everything at once. Start simple.</P>
            <div className="flex gap-4 mt-6 mb-8 flex-wrap">
              <span className="px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium tracking-wide">Pick one mode</span>
              <span className="px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-medium tracking-wide">Pick one ritual</span>
              <span className="px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium tracking-wide">Pick one use case</span>
            </div>
            <P>Live with it. Then expand. Because the real magic of Deckoviz is not in using it once. It is in living with it over time.</P>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-indigo-900/40 via-blue-900/20 to-purple-900/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 text-center space-y-8">
                <h3 className="text-3xl font-extrabold text-white tracking-wide">A Thought In Passing</h3>
                <div className="h-px w-24 bg-indigo-500/50 mx-auto" />
                <p className="text-xl text-white/80 font-light">Most things you buy fill space.</p>
                <p className="text-xl text-white/80 font-light">Very few things change how you experience your space.</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Deckoviz does.</p>
                <p className="text-lg text-white/70 italic pt-4">Because it is not just about what you see. It is about:</p>
                
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xl text-white/90 font-medium">
                  <span className="bg-white/5 py-2 px-6 rounded-full border border-white/10 shadow-lg">how you feel</span>
                  <span className="bg-white/5 py-2 px-6 rounded-full border border-white/10 shadow-lg">how you think</span>
                  <span className="bg-white/5 py-2 px-6 rounded-full border border-white/10 shadow-lg">how you remember</span>
                  <span className="bg-white/5 py-2 px-6 rounded-full border border-white/10 shadow-lg">how you create</span>
                  <span className="bg-white/5 py-2 px-6 rounded-full border border-white/10 shadow-lg">how you connect</span>
                </div>
                
                <div className="pt-8">
                  <p className="text-indigo-300 font-semibold text-2xl mb-2 tracking-wide uppercase text-sm">And over time...</p>
                  <p className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-white via-blue-200 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
                    That quietly changes everything.
                  </p>
                </div>
              </div>
            </motion.div>

          </SectionBlock>

        </div>
      </div>
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/*                            REUSABLE COMPONENTS                             */
/* -------------------------------------------------------------------------- */

function SectionBlock({ title, subtitle, children, icon }: { title: string, subtitle?: string, children: React.ReactNode, icon?: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative p-8 sm:p-14 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden group hover:border-white/10 transition-colors duration-700"
    >
      {/* Light sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12 pb-8 border-b border-white/10">
          {icon && (
            <div className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent drop-shadow-md">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-white/50 font-medium tracking-wide mt-2">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-bold text-white mt-16 mb-6 tracking-tight drop-shadow-sm flex items-center gap-3"><div className="w-1.5 h-8 bg-blue-500 rounded-full"/>{children}</h2>;
}

function H3({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <h3 className={`text-2xl font-semibold text-blue-200 mt-10 mb-5 tracking-wide ${className}`}>{children}</h3>;
}

function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="text-lg font-bold text-indigo-300 mt-10 mb-4 uppercase tracking-widest">{children}</h4>;
}

function Subheading({ children }: { children: React.ReactNode }) {
  return <h5 className="font-semibold text-white mt-6 mb-3 border-l-2 border-white/30 pl-4 py-1 text-lg">{children}</h5>;
}

function P({ children, className = "text-white/60 leading-relaxed text-lg" }: { children: React.ReactNode, className?: string }) {
  return <p className={className}>{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-4 mt-4 mb-8">{children}</ul>;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 text-white/70 group bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-colors">
      <div className="w-2 h-2 rounded-full bg-blue-500/70 mt-2.5 shrink-0 group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.8)] transition-all" />
      <span className="leading-relaxed text-[17px] group-hover:text-white/90 transition-colors">{children}</span>
    </li>
  );
}

function GridList({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
          <span className="text-white/80 font-medium text-sm leading-snug">{item}</span>
        </div>
      ))}
    </div>
  );
}

function UseCaseCard({ title, children, icon, compact = false }: { title: string, children: React.ReactNode, icon?: React.ReactNode, compact?: boolean }) {
  return (
    <div className={`bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 rounded-3xl ${compact ? 'p-6' : 'p-8'} hover:border-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group`}>
      <div className="flex items-center gap-4 mb-4">
        {icon && <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">{icon}</div>}
        <h4 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{title}</h4>
      </div>
      <p className="text-white/60 leading-relaxed">{children}</p>
    </div>
  );
}

function BlockQuote({ children, variant = "blue" }: { children: React.ReactNode, variant?: "blue" | "purple" | "indigo" }) {
  const colors = {
    blue: "border-blue-500/40 bg-blue-500/5 text-blue-100 shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    purple: "border-purple-500/40 bg-purple-500/5 text-purple-100 shadow-[0_0_30px_rgba(168,85,247,0.1)]",
    indigo: "border-indigo-500/40 bg-indigo-500/5 text-indigo-100 shadow-[0_0_30px_rgba(99,102,241,0.1)]",
  };
  return (
    <blockquote className={`my-10 p-8 rounded-3xl border ${colors[variant]} border-l-[6px] text-2xl font-medium leading-relaxed italic`}>
      "{children}"
    </blockquote>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 my-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500" />
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="py-16 flex items-center justify-center opacity-30">
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-white to-transparent" />
      <Star className="w-4 h-4 mx-4 text-white" />
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-white via-transparent to-transparent" />
    </div>
  );
}
