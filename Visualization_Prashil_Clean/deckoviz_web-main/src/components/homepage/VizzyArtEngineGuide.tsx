import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Heart, Layers, Lightbulb, 
  Paintbrush, Sparkles, Network, Globe, Mountain
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VizzyArtEngineGuide() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-teal-500/30 font-sans pb-32 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-teal-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] rounded-full bg-cyan-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '11s', animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[40%] w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '13s', animationDelay: '4s' }} />
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(20,184,166,0.3)] mb-8">
            <Paintbrush className="w-8 h-8 text-teal-400" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-white via-teal-100 to-blue-400 bg-clip-text text-transparent leading-[1.1] tracking-tight drop-shadow-lg max-w-4xl mx-auto">
            How Do We Get Vizzy to Be Great At Art
          </h1>
          <p className="text-xl sm:text-3xl text-teal-200/80 font-light tracking-wide pt-6 max-w-3xl mx-auto leading-relaxed">
            The Climb Towards Designing the Ultimate AI Artist
          </p>
        </motion.div>

        {/* Content Container */}
        <div className="space-y-24">

          {/* Intro Section */}
          <SectionBlock 
            title="The Genesis of an Idea"
            icon={<Lightbulb className="w-8 h-8 text-teal-400" />}
          >
            <P className="text-xl font-light text-white/90 leading-relaxed max-w-3xl mb-8">
              As we put sales efforts on hold for the past few months, I thought why don't we do some fun stuff and optimize our art engine performance. Since there wasn't much else to do. 
            </P>
            <P>
              Turns out that constraint became one of the most intellectually fertile periods we've had in a while, the kind where you're not worrying about metrics and dashboards but actually building something that shows the path to something new.
            </P>

            <Divider color="teal" />

            <H2 color="teal">Training an AI to Reach Elite Class in Art</H2>
            <P>
              One of our core considerations is this: how do you train an AI to get genuinely elite at art? Current state-of-the-art image models, straight out of the box, are at about 90% on Art&CreativeBench, a benchmark we have devised for internal use. I say 90% if you want to be gracious, maybe 96% if you don't.
            </P>
            <P>
              Which is already better than most humans at execution, and honestly, better than most at ideation too. The models have absorbed art theory, composition principles, color theory, the works. They understand how to evoke emotion through visual language, how to build tension and release, how to use negative space. They've seen millions of artworks and extracted patterns that most human artists spend decades developing intuition around.
            </P>
            <BlockQuote variant="teal">
              I say this because at this point, it's time to retire the old refrain of "I can't derive meaning if AI gets better than me, or I can't redefine my identity, so I will lash out at inevitable progress."
            </BlockQuote>
            <P>
              Art should be for everyone, period. We need to decouple our self-worth from our unique capabilities because the goalposts keep moving, and they'll keep moving. Just because an AI can beat you at chess doesn't render your chess games meaningless _ enjoy my chess games even more now. The meaning was never in the superiority. It was in the experience, the growth, the human element of struggle and play.
            </P>
          </SectionBlock>

          <SectionBlock 
            title="The Architecture of Creativity"
            icon={<Layers className="w-8 h-8 text-blue-400" />}
          >
            <H2 color="blue">The System Card and Memory Architecture</H2>
            <P>
              We believe a good system card and memory layer can make a significant jump towards our north star. Think of the system card as the accumulated wisdom layer, the part that makes implicit knowledge explicit.
            </P>
            <P>
              It contains instructions, meta-instructions, little tips and tricks, heuristics that apply generally or to different types of creations, styles, user personas, and preferences. We've added notes from the best art classes in the world, distilled chapters and sections from art theory books, transcribed lectures from masters. The kinds of things that aren't implicit in the model weights, the tacit knowledge that separates a fresh art school student from someone who's spent years in the trenches.
            </P>
            <P>
              Now this approach can pass the Chinese Room test, but it won't have art intuition at a deeper level of its neurons, not yet. These system cards can get long, ours is already 230+ pages and growing.
            </P>
            <P>
              The design intuition and artistic sensibility isn't baked in, bolted in, or internalized at this stage. Think of this as a checklist, instructions, reminders, rules a model has to go through before it generates something. It's like having an experienced artist looking over your shoulder, offering guidance. Because these models can process data almost instantly, it feels bolted in or learned, but really it's more like very fast reference checking.
            </P>

            <H3>The Real Magic</H3>
            <P>
              The real magic happens with our dynamic memory layer. This is all about personalizing it, adapting it to you specifically.
            </P>
            <BlockQuote variant="blue">
              Because art without context is just aesthetics, and aesthetics without personal resonance is just decoration.
            </BlockQuote>
            <P>
              The memory layer is what transforms generic art generation into something that might actually move you, that might actually matter in the context of your life.
            </P>
            <P>
              Then you add some peripherals to the mix. Smart watch data, journals, planners, connecting to time and weather, mood rings, Whoop bands, quick check-in chats with Vizzy. You elevate the contextual value, thus the total value, of the art even more. Because art that knows you're going through a breakup hits different than art that doesn't. Art that understands you're celebrating a milestone, or grieving a loss, or just having a weird Tuesday, that art can be calibrated to meet you where you are.
            </P>

            <Divider color="blue" />

            <H2 color="blue">The Finetuning Layer</H2>
            <P>
              This is before we get to finetuning the models, the next step we're gearing up for. We're compiling hundreds of thousands of examples of great art, of refined taste, of sophisticated judgment. We then train the models on these examples, not just to recognize patterns but to internalize what makes something work at a deeper level.
            </P>
            <P>
              Current models are like fresh students just entering an art course, talented but raw. Finetuning would be like giving them a deep dive by the masters, where they don't just learn at the surface level but pick up real patterns and taste intuitions and internalize these in their core layers.
            </P>

            <H3>Defining Great Art</H3>
            <P>
              The challenge here is defining what "great art" even means, which is why we've been meticulous about the curation process. We're not just grabbing whatever hangs in major museums or whatever gets high auction prices. We're looking for pieces that demonstrate particular skills.
            </P>
            <GridList items={[
              "Compositional sophistication", "Emotional depth", "Technical innovation", "Cultural resonance"
            ]} color="blue" />
            
            <P>
              We've compiled around 15,000 examples so far, and let me tell you, looking at thousands of artworks to select the best is soul-crushing work. I didn't have that luxury entirely, so I did a lot of the grunt work myself.
            </P>
            <P>
              What's fascinating is that even some celebrated artworks in major collections don't seem particularly special when you're looking at them in the context of training data. You start to realize how much of art appreciation is cultural context, historical significance, the story around the piece rather than the piece itself.
            </P>
            <P>
              Which actually reinforces why personalized art could be so powerful, because you're cutting through all that noise and creating something that resonates with you directly, without needing the cultural apparatus to tell you it's important.
            </P>

            <P>
              We also plan to deploy some generative adversarial networks and some reinforcement learning from human feedback, to further improve the model. We're also looking at reward modeling with people who have genuinely sophisticated taste, not just popular taste. There's a difference between what gets likes on Instagram and what actually demonstrates artistic merit, and we need to train our systems to understand that distinction.
            </P>
          </SectionBlock>

          <SectionBlock 
            title="Beyond The Frontier"
            icon={<Sparkles className="w-8 h-8 text-cyan-400" />}
          >
            <H2 color="cyan">Beyond the 99.99 Percentile</H2>
            <P>
              But we don't expect all of this to get us beyond the 99.99 percentile. The steps to go from 99.99 to 99.999999 percentile, which is where the absolutely magical things start happening, we have some hunches about but haven't fully mapped out yet. This is the frontier stuff, the experiments that might not work but might crack open entirely new possibilities.
            </P>
            <P>
              AI art, AI creations in general, can be very boring by design. They tend to regress to the mean because that's what minimizes loss during training. The question is, how do you make them go beyond their reversion to the mean? How do you make them experimental, how do you inject that element of creative risk-taking that characterizes the best human artists?
            </P>
            <P>
              Changing the temperature parameter helps, adjusting the sampling methods, but these are crude instruments for what's fundamentally a question about creative agency and artistic vision.
            </P>
            <BlockQuote variant="cyan">
              This is where we start getting into questions about whether current deep learning architectures are even the right paradigm for peak creativity.
            </BlockQuote>
            <P>
              Maybe we need fundamentally different approaches, hybrid systems that combine learned intuition with explicit reasoning, with memory systems, with something approaching genuine curiosity and aesthetic preference. These are open questions, the kind we're maybe three years away from being able to seriously investigate with the resources we'd need.
            </P>
          </SectionBlock>

          <SectionBlock 
            title="The Human Element"
            icon={<Heart className="w-8 h-8 text-pink-400" />}
          >
            <H2 color="pink">Building the Ultimate Art and Storytelling Platform</H2>
            <P>
              In our bid to build the ultimate art and storytelling platform, one of the subgoals of that would obviously be building "the best artist." This can be controversial to many people, and I'm always happy to debate it. For now, suffice it to say that for us, the motivation is multifold, and each strand reinforces the others in ways that make the whole project feel inevitable.
            </P>
            <P>
              One of our meta motivations in this project and in Elinity has been building the best human modeler. The better you can model a person, the better a system can help them design and live their best life. Finding their tribe, building relationships, creating art and self-expression, these all require understanding what makes someone tick at a fundamental level.
            </P>
            <P>
              Art is such a fundamental part of our humanity, maybe the most fundamental part. It's how we process emotion, how we make sense of experience, how we communicate things that language can't quite capture. In order to build the best AI artist, you have to understand and study human mind, psychology, emotions, in depth.
            </P>

            <Divider color="pink" />

            <H2 color="pink">The Empathy Requirement</H2>
            <P>
              A personal artist also requires deep empathy, and this is where it gets interesting. A personal artist is categorically different from your van Gogh or da Vinci, or even an Andy Warhol. Those artists were creating for themselves, or for patrons, or for posterity, but fundamentally they were expressing their own vision.
            </P>
            <P>
              A personal AI artist is not creating for itself because it has no self. It's creating for you. So unlike Francis Bacon, Pablo Picasso, or Michelangelo... you need your personal AI artist to care about you. 
            </P>
            <P>
              I know, I know, I'm pre-anthropomorphizing here, but bear with me. The system needs to be oriented around your emotional reality, your context, your needs in a way that traditional artists never had to be.
            </P>
            <BlockQuote variant="pink">
              For the first time in human history, with AI, we could finally decouple creative genius from a tortured mind. We could have the artistic sophistication without the human cost.
            </BlockQuote>
            <P>
              We believe that embedding this deep empathy and emotional intelligence into our AI artist would also help in our research goals for ASI alignment. If you can build an AI system that genuinely understands and cares about human emotional states, that can model human values and preferences accurately, you're solving some of the hardest problems in alignment.
            </P>

            <Divider color="pink" />

            <H2 color="pink">The Duty to Users</H2>
            <P>
              Thirdly, if you want to provide the best art experience to millions of people, you need to have the best AI artist. You can't do it without. Otherwise, they're getting a subpar experience compared to if you'd set your aim higher.
            </P>
            <P>
              We're not just building a product, we're building something that could be a daily companion, a tool for emotional processing, a way for people to understand themselves better. That deserves the absolute best we can build.
            </P>
            <P>
              And lastly, one of our motivations is very Mallorian. We want to do it because the mountain of the best AI artist stands in front of us. We're not here just for kicks. There's intrinsic value in the climbing, in pushing the boundaries of what's possible, in discovering new perspectives that only become visible from higher altitudes.
            </P>
          </SectionBlock>

          <SectionBlock 
            title="Mechanics & Strategy"
            icon={<Network className="w-8 h-8 text-indigo-400" />}
          >
            <H2 color="indigo">Owning the Stack</H2>
            <P>
              Why would we want to build the art engine ourselves rather than relying on third-party models? You want to own the entire stack.
            </P>
            <P>
              If you don't have your own underlying models or art engine, no matter what else you have done, you're a glorified wrapper. Owning the base layer has fundamental advantages in terms of what we can build, how we can optimize, what kinds of innovations become possible, and even what kinds of questions we can ask.
            </P>
            <P>
              We want to put a Van Gogh in every home. Not a reproduction of his, but something that might matter even more because it's calibrated specifically for you.
            </P>

            <Divider color="indigo" />

            <H2 color="indigo">The Abstract Art Problem</H2>
            <P>
              Here's something interesting: most people in their homes have abstract art. Why? Because most people would find it difficult to find symbolic or representational artwork that resonates deeply with them. Finding figurative art that speaks to your specific emotional reality is incredibly hard.
            </P>
            <BlockQuote variant="indigo">
              Abstract art works because it has a lower floor and a higher floor but a lower ceiling. It's harder to make bad abstract art than bad representational art. It's easier to make good abstract art than good representational art.
            </BlockQuote>
            <P>
              This is what we're trying to change. Personal Vizzy-generated art can be representational, deeply personal, and affordable. You can have art that actually means something specific to you. This isn't about replacing human artists or devaluing human creativity. It's about democratizing access to personally meaningful art.
            </P>

            <Divider color="indigo" />

            <H2 color="indigo">The Technical Roadmap</H2>
            <P>
              So how do we actually train a good AI artist? We've been able to create a small book of little things we can do, refinements and optimizations that we've added to our system card. Our north star is to put a top-tier artist in every home.
            </P>
            <List>
              <ListItem color="indigo">The starting layer: exploring and unlocking latent capabilities of foundational models. Optimizing at the level of the system card and meta prompts.</ListItem>
              <ListItem color="indigo">The next step: finetuning models, for greater control, understanding, and interpretability.</ListItem>
              <ListItem color="indigo">Training a specialized model just for art: almost as broad a domain as general intelligence itself, but optimized for creativity and emotional resonance.</ListItem>
              <ListItem color="indigo">Teaching taste and judgment: distilling decades of practice into training objectives and loss functions.</ListItem>
              <ListItem color="indigo">Exploring new paradigms: hybrid systems, explicit reasoning, memory systems.</ListItem>
            </List>
          </SectionBlock>

          <SectionBlock 
            title="The Grand Vision"
            icon={<Globe className="w-8 h-8 text-violet-400" />}
          >
            <H2 color="violet">The Deeply Personal Layer</H2>
            <P>
              A subset of the main question is: how do we create deeply meaningful personalized experiences? How do we build the best personalized AI artist?
            </P>
            <P>
              This requires understanding art theory and aesthetic universals, but it also requires deeply understanding the user through careful onboarding, through journals and chat conversations, through observing what they create and how they respond...
            </P>
            <P>
              Vizzy learns your visual preferences, your emotional patterns, your values, your fears and hopes. Over thousands of interactions, a genuine model of you as a person emerges.
            </P>
            <P>
              If the system knows you're stressed from your heart rate variability, or that you slept poorly, it can contextualize the art it creates for you. Art that meets you where you are is fundamentally different from generic art.
            </P>

            <Divider color="violet" />

            <H2 color="violet">The Strange Economics</H2>
            <P>
              The strange part about our efforts in this direction is that this is purely marginal to the product value at the moment. It doesn't really drive our business outcomes right now.
            </P>
            <P>
              But it's still worth it. The value lies in the actual climbing, not in flagplanting or getting some treasure at the top.
            </P>
            <BlockQuote variant="violet">
              This is research in the truest sense. We're exploring unknown territory not because we know exactly what we'll find but because we believe there's something worth finding.
            </BlockQuote>
            <P>
              And who knows, maybe the summit isn't even where we think it is. Maybe we'll discover that the real breakthroughs happen at some intermediate altitude, or in some completely different direction.
            </P>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-teal-900/40 via-cyan-900/20 to-blue-900/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 text-center space-y-8">
                <div className="flex justify-center mb-6">
                  <Mountain className="w-12 h-12 text-teal-400" />
                </div>
                <h3 className="text-3xl font-extrabold text-white tracking-wide">The Mountain Is There</h3>
                <div className="h-px w-24 bg-teal-500/50 mx-auto" />
                <p className="text-xl text-white/80 font-light leading-relaxed">
                  This is the work. This is what it looks like to try to build something that might actually matter, that might actually enhance people's lives in meaningful ways.
                </p>
                <p className="text-xl text-teal-200 font-light leading-relaxed">
                  Not just another app, not just another wrapper... but a genuine attempt to solve hard problems and push boundaries and create something that didn't exist before.
                </p>
                <p className="text-2xl pt-4 font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  We're building this because we believe art matters, because we believe personal expression matters, because we believe that technology should serve humanity rather than the other way around.
                </p>
                <div className="pt-8">
                  <p className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-white via-teal-200 to-blue-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
                    And we're building it because the mountain is there, and we can't help but want to climb it.
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

function SectionBlock({ title, children, icon }: { title: string, children: React.ReactNode, icon?: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative p-8 sm:p-14 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden group hover:border-white/10 transition-colors duration-700"
    >
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
          </div>
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function H2({ children, color = "teal" }: { children: React.ReactNode, color?: string }) {
  const colors: Record<string, string> = {
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    pink: "bg-pink-500",
    indigo: "bg-indigo-500",
    violet: "bg-violet-500",
  };
  return <h2 className="text-3xl font-bold text-white mt-16 mb-6 tracking-tight drop-shadow-sm flex items-center gap-3"><div className={`w-1.5 h-8 ${colors[color] || colors.teal} rounded-full`}/>{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className={`text-2xl font-semibold text-white mt-10 mb-5 tracking-wide`}>{children}</h3>;
}

function P({ children, className = "text-white/60 leading-relaxed text-lg" }: { children: React.ReactNode, className?: string }) {
  return <p className={className}>{children}</p>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-4 mt-4 mb-8">{children}</ul>;
}

function ListItem({ children, color = "teal" }: { children: React.ReactNode, color?: string }) {
  const colors: Record<string, string> = {
    teal: "bg-teal-500/70 group-hover:bg-teal-400 group-hover:shadow-[0_0_10px_rgba(45,212,191,0.8)]",
    blue: "bg-blue-500/70 group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.8)]",
    indigo: "bg-indigo-500/70 group-hover:bg-indigo-400 group-hover:shadow-[0_0_10px_rgba(129,140,248,0.8)]",
  };

  return (
    <li className="flex items-start gap-4 text-white/70 group bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-colors">
      <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 transition-all ${colors[color] || colors.teal}`} />
      <span className="leading-relaxed text-[17px] group-hover:text-white/90 transition-colors">{children}</span>
    </li>
  );
}

function GridList({ items, color = "teal" }: { items: string[], color?: string }) {
  const bgColors: Record<string, string> = {
    teal: "bg-teal-400",
    blue: "bg-blue-400",
    cyan: "bg-cyan-400",
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-6">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${bgColors[color] || bgColors.teal}`} />
          <span className="text-white/80 font-medium text-[15px] leading-snug">{item}</span>
        </div>
      ))}
    </div>
  );
}

function BlockQuote({ children, variant = "teal" }: { children: React.ReactNode, variant?: "teal" | "blue" | "cyan" | "pink" | "indigo" | "violet" }) {
  const colors: Record<string, string> = {
    teal: "border-teal-500/40 bg-teal-500/5 text-teal-100 shadow-[0_0_30px_rgba(20,184,166,0.1)]",
    blue: "border-blue-500/40 bg-blue-500/5 text-blue-100 shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    cyan: "border-cyan-500/40 bg-cyan-500/5 text-cyan-100 shadow-[0_0_30px_rgba(6,182,212,0.1)]",
    pink: "border-pink-500/40 bg-pink-500/5 text-pink-100 shadow-[0_0_30px_rgba(236,72,153,0.1)]",
    indigo: "border-indigo-500/40 bg-indigo-500/5 text-indigo-100 shadow-[0_0_30px_rgba(99,102,241,0.1)]",
    violet: "border-violet-500/40 bg-violet-500/5 text-violet-100 shadow-[0_0_30px_rgba(139,92,246,0.1)]",
  };
  return (
    <blockquote className={`my-10 p-8 rounded-3xl border ${colors[variant] || colors.teal} border-l-[6px] text-2xl font-medium leading-relaxed italic`}>
      "{children}"
    </blockquote>
  );
}

function Divider({ color = "teal" }: { color?: string }) {
  const innerColors: Record<string, string> = {
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    pink: "bg-pink-500",
    indigo: "bg-indigo-500",
    violet: "bg-violet-500",
  };
  return (
    <div className="py-16 flex items-center justify-center opacity-40">
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className={`w-1.5 h-1.5 rounded-full mx-4 shadow-[0_0_10px_currentColor] ${innerColors[color] || innerColors.teal}`} />
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-white/50 via-transparent to-transparent" />
    </div>
  );
}
