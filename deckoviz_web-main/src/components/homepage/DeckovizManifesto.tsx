import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Flame, Sparkles, Compass, Target, 
  Orbit, Gem, Eye, Globe, Zap, Sun, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeckovizManifesto() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-orange-500/30 font-sans pb-32 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[800px] h-[800px] rounded-full bg-orange-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] rounded-full bg-rose-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '14s', animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-white/10 rounded-full shadow-[0_0_60px_rgba(249,115,22,0.3)] mb-8">
            <Flame className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-white via-orange-100 to-rose-400 bg-clip-text text-transparent leading-[1.1] tracking-tight drop-shadow-lg max-w-4xl mx-auto">
            The Manifesto We Live By
          </h1>
          <p className="text-xl sm:text-3xl text-orange-200/80 font-light tracking-wide pt-6 max-w-3xl mx-auto leading-relaxed">
            Some of Our Core Beliefs at Deckoviz Space Labs
          </p>
        </motion.div>

        {/* Content Container */}
        <div className="space-y-24">

          {/* Intro Section */}
          <SectionBlock>
            <P className="text-2xl font-medium text-white/90 leading-relaxed text-center max-w-4xl mx-auto mb-10">
              There are companies that ship products.<br/>
              And then there are companies that ship worldviews disguised as products.
            </P>
            <P className="text-xl text-center max-w-3xl mx-auto leading-relaxed text-white/70 mb-10">
              Deckoviz was never meant to be a device. The first product is meant to be a harbinger - of an argument about what kind of future we want to live inside.
            </P>

            <div className="p-10 rounded-3xl bg-gradient-to-br from-orange-500/5 to-rose-500/5 border border-white/10 relative overflow-hidden my-16">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-400 to-rose-500" />
              <P className="text-xl">
                At the core of that argument is a simple belief: the best art is that which is personal, and the best artist for you is your own tastes and states. It’s not the gallery curator or the algorithm optimizing for engagement. Nor is it the critic writing in some high tower. It’s you. It’s always been you, but the lack of the right technology made this non-obvious. Until now.
              </P>
            </div>

            <H3 className="text-center italic text-orange-200">
              Taste is not a luxury accessory. It is a compass. And it can help you find your promised lands.
            </H3>
            <H3 className="text-center italic text-rose-300">
              State is not a fleeting mood. It is the climate of your inner world. And intentionally designing it can transform those lands into verdant hills.
            </H3>

            <P className="text-center font-semibold text-white/90 mt-10 text-xl max-w-2xl mx-auto">
              When art aligns with both, something rare happens. It does not merely decorate your wall or add your aesthetic flavour to your space, no, it calibrates your being.
            </P>

          </SectionBlock>

          <Divider color="orange" />

          {/* Belief 1 */}
          <SectionBlock 
            title="We design our spaces, and then our spaces design us back."
            icon={<Orbit className="w-8 h-8 text-rose-400" />}
            color="rose"
          >
            <P>
              That reciprocity has always existed, quietly. The lighting in your room, the color of your walls, the objects in your periphery, the images you glance at without consciously noticing. They whisper to your nervous system. They nudge your posture. They tilt your thinking. They shape your actions.
            </P>
            <P>
              Most of that influence today is accidental.
            </P>
            <P className="font-semibold text-rose-200 text-xl">
              We believe it can be intentional. And making it so unlocks a universe of possibilities.
            </P>
            <P>
              When that environmental influence becomes proactive, dynamic, and emotionally intelligent, its power multiplies. If a static room shapes you a little, a responsive room shapes you exponentially. When the walls can respond to your rhythms, your goals, your seasons, your grief, your ambition, the space becomes less background and more collaborator.
            </P>
            <BlockQuote variant="rose">
              You stop being passively shaped by your environment.<br/>
              You start co-authoring it.
            </BlockQuote>
          </SectionBlock>

          {/* Belief 2 */}
          <SectionBlock 
            title="Attention and taste are all you need."
            icon={<Eye className="w-8 h-8 text-amber-400" />}
            color="amber"
          >
            <P>
              In a world drowning in options, curation fatigue has become a silent tax on our cognition. The feed scrolls endlessly. Recommendations multiply. Yet very little lands.
            </P>
            <H3 className="text-amber-200">
              Taste, when refined, cuts through the noise.<br/>
              Attention, when disciplined, becomes generative.
            </H3>
            <P>
              With those two faculties sharpened, you can build a world around you that is coherent, resonant, aligned. Deckoviz is a tool for sharpening both. It is not about infinite choice. It is about precise alignment, and the highest, most attuned filtering of the world and senses.
            </P>
          </SectionBlock>

          {/* Belief 3 */}
          <SectionBlock 
            title="We build in the territory of self-actualization."
            icon={<Target className="w-8 h-8 text-orange-400" />}
            color="orange"
          >
            <P>
              Most products compete in the lower tiers of need. Convenience. Efficiency. Distraction. Status. Hedonism.
            </P>
            <P>
              We care about the highest rung. The space where people stretch toward their potential, wrestle with meaning, chase transcendence, achieve eudaimonia. The place where the magic of human life actually happens.
            </P>
            <P>
              Helping someone access their desired states, spaces, and moments is sacred work. To give someone the tools to sculpt their own psychological climate and topology is not a trivial upgrade. It is a lever on the arc of a life.
            </P>
            <BlockQuote variant="orange">
              There is no work more noble than helping a human being become more fully themselves.
            </BlockQuote>
          </SectionBlock>

          {/* Belief 4 */}
          <SectionBlock 
            title="AI is at its best when it amplifies the human essence."
            icon={<Zap className="w-8 h-8 text-yellow-400" />}
            color="yellow"
          >
            <P>
              We reject the narrative that intelligence must replace. The more interesting direction is enhancement, better yet augmentation. Or it’s ultimate manifestation - amplification.
            </P>
            <H3 className="text-yellow-200">
              An AI that abstracts humans away from the process drains meaning.<br/>
              An AI that enhances our desired states of being deepens it.
            </H3>
            <P>
              The difference lies in intent.
            </P>
            <P>
              At Deckoviz, AI is not here to make art instead of you. It is here to help you see more clearly what you want to express, to surface the aesthetics that resonate with your nervous system, to translate subtle inner weather into visible form.
            </P>
            <BlockQuote variant="yellow">
              The machine does not become the artist.<br/>
              It becomes the instrument. To bring a greater creative spark to your inner world.
            </BlockQuote>
          </SectionBlock>

          {/* Belief 5 */}
          <SectionBlock 
            title="We invent for the long term."
            icon={<Compass className="w-8 h-8 text-red-400" />}
            color="red"
          >
            <P>
              The world is optimized for iteration cycles and quarterly deltas. That logic produces incremental improvements and shallow moats.
            </P>
            <P className="font-semibold text-xl text-red-200">
              We are interested in monumental shots.
            </P>
            <P>
              In life and in business, there are only a few truly era-defining moves. The art of enterprise is recognizing them when they appear and having the courage to commit fully.
            </P>
            <P>
              This moment in history is one of those moments.
            </P>
            <P>
              We are standing at the threshold of artificial general intelligence. The trajectory we set now will echo across decades, even centuries. If we build systems that optimize for comfort without meaning, validation without growth, stimulation without depth, we will get exactly that world.
            </P>
            <P>
              If we build for beauty, agency, self-actualization, and long-term alignment, we open a different branch of the future.
            </P>
            <BlockQuote variant="red">
              It is imperative to rise to the occasion.
            </BlockQuote>
          </SectionBlock>

          {/* Belief 6 */}
          <SectionBlock 
            title="Life is short, but art can be long."
            icon={<Gem className="w-8 h-8 text-pink-400" />}
            color="pink"
          >
            <P>
              We are not here to ship disposable pixels. We are here to build something that endures. A masterpiece creator that itself becomes a kind of masterpiece.
            </P>
            <P>
              When we are gone, the artifacts remain. The ideas persist. The cultural currents continue flowing.
            </P>
            <P>
              The question is not whether we can build something that functions. It’s whether we can build something worthy of the mission, of becoming a life-long companion to those who choose to add the ecosystem to their lives.
            </P>
            <H3 className="text-pink-200">
              We know the answer - now, is the greatest challenge of actualizing the dynamics of that answer in the daily craft.
            </H3>
          </SectionBlock>

          {/* Belief 7 */}
          <SectionBlock 
            title="Our world is starved for beauty and meaning."
            icon={<Sun className="w-8 h-8 text-orange-300" />}
            color="orange"
          >
            <P>
              Apathy is rising. Institutions wobble. Polarization hardens. The center thins out.
            </P>
            <P>
              Beauty and meaning are not ornamental luxuries in such a world. They are stabilizers. They are antidotes. They restore coherence where fragmentation threatens to dominate.
            </P>
            <H3 className="text-orange-200">
              A world richer in beauty is a world richer in care.<br/>
              A world richer in meaning is a world harder to radicalize, harder to hollow out, harder to give up on.
            </H3>
            <BlockQuote variant="orange">
              Art, in the hands of everyone, becomes infrastructure for the soul.
            </BlockQuote>
          </SectionBlock>

          {/* Belief 8 */}
          <SectionBlock 
            title="Passion and purpose will be the primary currencies of the post-AGI world."
            icon={<Sparkles className="w-8 h-8 text-amber-500" />}
            color="amber"
          >
            <P>
              When cognitive labor is commoditized, what remains scarce is conviction. Vision. Inner fire.
            </P>
            <P>
              The differentiator will not be who can process the most data, but who can orient toward something worth building.
            </P>
            <P>
              Art is rehearsal for that orientation. It trains discernment. It sharpens values. It helps people feel what they stand for.
            </P>
          </SectionBlock>

          {/* Belief 9 */}
          <SectionBlock 
            title="Art is a powerful force. It must be democratized."
            icon={<Globe className="w-8 h-8 text-rose-500" />}
            color="rose"
          >
            <P>
              For centuries, art has oscillated between elite patronage and niche subcultures. Meanwhile, every human carries a latent aesthetic intelligence inside them.
            </P>
            <H3 className="text-rose-200">
              Art already lives in everyone’s heart.<br/>
              We want to bring it to their walls, their devices, their daily interfaces.
            </H3>
            <P>
              Taking it from a luxury, converting it to a baseline.
            </P>
            <P>
              When everyone has access to high-quality, deeply personal creation, the floor of cultural experience rises. The average home becomes a living gallery. The average person becomes a curator of their own interior life.
            </P>
            <P className="font-semibold text-rose-100 text-xl">
              That shift alone could alter the texture of society.
            </P>
          </SectionBlock>

          {/* Conclusion */}
          <SectionBlock 
            title="We are not interested in merely existing."
            icon={<Shield className="w-8 h-8 text-orange-500" />}
            color="orange"
          >
            <P>
              We want to shift trajectories. To act as a memetic force at civilizational scale. To shape the rivers of culture, not just drift along their currents.
            </P>
            <P>
              This requires building a long-term entity. One that thinks in decades, not quarters. One that treats itself less as a business and more as a mission.
            </P>
            <P className="text-2xl pt-6 font-medium bg-gradient-to-r from-orange-300 to-rose-300 bg-clip-text text-transparent italic">
              The world can be more beauteous. More joyous. More wondrous.
            </P>
            <P>
              That belief is not naive. It is strategic. And it is self-reinforcing.
            </P>
            <P className="text-xl font-medium pt-4 text-white/90">
              And lastly, we believe it is one of our highest duties to bring this vision into reality.<br/>
              Deliberately. Boldly. With taste. With attention. With conviction.
            </P>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-20 p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-orange-900/40 via-red-900/20 to-rose-900/40 border border-orange-500/20 backdrop-blur-xl shadow-[0_0_80px_rgba(249,115,22,0.15)] relative overflow-hidden group text-center"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 space-y-6">
                <Flame className="w-16 h-16 text-orange-400 mx-auto mb-6" />
                <div className="h-px w-24 bg-orange-500/50 mx-auto" />
                <p className="text-4xl sm:text-6xl font-black bg-gradient-to-br from-white via-orange-200 to-rose-500 bg-clip-text text-transparent drop-shadow-xl tracking-wide uppercase pt-8">
                  That is our climb.
                </p>
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

function SectionBlock({ title, children, icon, color = "orange" }: { title?: string, children: React.ReactNode, icon?: React.ReactNode, color?: string }) {
  const borderColors: Record<string, string> = {
    orange: "border-orange-500/20 group-hover:border-orange-500/40",
    rose: "border-rose-500/20 group-hover:border-rose-500/40",
    amber: "border-amber-500/20 group-hover:border-amber-500/40",
    yellow: "border-yellow-500/20 group-hover:border-yellow-500/40",
    red: "border-red-500/20 group-hover:border-red-500/40",
    pink: "border-pink-500/20 group-hover:border-pink-500/40",
  };

  const shadowColors: Record<string, string> = {
    orange: "shadow-[0_8px_32px_rgba(249,115,22,0.05)]",
    rose: "shadow-[0_8px_32px_rgba(244,63,94,0.05)]",
    amber: "shadow-[0_8px_32px_rgba(245,158,11,0.05)]",
    yellow: "shadow-[0_8px_32px_rgba(234,179,8,0.05)]",
    red: "shadow-[0_8px_32px_rgba(239,68,68,0.05)]",
    pink: "shadow-[0_8px_32px_rgba(236,72,153,0.05)]",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative p-8 sm:p-14 bg-black/40 border rounded-[3rem] backdrop-blur-2xl ${borderColors[color] || borderColors.orange} ${shadowColors[color] || shadowColors.orange} overflow-hidden group transition-colors duration-700`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative z-10">
        {title && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12 pb-8 border-b border-white/10">
            {icon && (
              <div className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent drop-shadow-md leading-tight">
                {title}
              </h2>
            </div>
          </div>
        )}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function H3({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <h3 className={`text-2xl font-semibold mt-10 mb-5 tracking-wide leading-relaxed ${className}`}>{children}</h3>;
}

function P({ children, className = "text-white/60 leading-relaxed text-[19px]" }: { children: React.ReactNode, className?: string }) {
  return <p className={className}>{children}</p>;
}

function BlockQuote({ children, variant = "orange" }: { children: React.ReactNode, variant?: "orange" | "rose" | "amber" | "yellow" | "red" | "pink" }) {
  const colors: Record<string, string> = {
    orange: "border-orange-500/40 bg-orange-500/5 text-orange-200 shadow-[0_0_30px_rgba(249,115,22,0.1)]",
    rose: "border-rose-500/40 bg-rose-500/5 text-rose-200 shadow-[0_0_30px_rgba(244,63,94,0.1)]",
    amber: "border-amber-500/40 bg-amber-500/5 text-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.1)]",
    yellow: "border-yellow-500/40 bg-yellow-500/5 text-yellow-200 shadow-[0_0_30px_rgba(234,179,8,0.1)]",
    red: "border-red-500/40 bg-red-500/5 text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.1)]",
    pink: "border-pink-500/40 bg-pink-500/5 text-pink-200 shadow-[0_0_30px_rgba(236,72,153,0.1)]",
  };
  return (
    <blockquote className={`my-10 p-8 rounded-3xl border ${colors[variant] || colors.orange} border-l-[6px] text-2xl font-medium leading-relaxed italic`}>
      "{children}"
    </blockquote>
  );
}

function Divider({ color = "orange" }: { color?: string }) {
  const innerColors: Record<string, string> = {
    orange: "bg-orange-500 text-orange-500",
    rose: "bg-rose-500 text-rose-500",
  };
  return (
    <div className="py-16 flex items-center justify-center opacity-40">
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <Flame className={`w-6 h-6 mx-4 ${innerColors[color] || innerColors.orange}`} />
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-white/50 via-transparent to-transparent" />
    </div>
  );
}
