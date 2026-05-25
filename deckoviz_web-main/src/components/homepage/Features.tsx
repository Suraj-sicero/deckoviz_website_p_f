import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import HorizontalScrollingFeatures from "./HorizontalScrollingFeatures";
interface FeatureCardProps {
  title: string;
  description: string;
  longDescription: string;
  index: number;
}

const Features: React.FC = () => {
  const mainFeatures = [
    {
      title: "Generative Art Engine",
      description: "Create deeply personal evolving art, endlessly.",
      longDescription: `Deckoviz acts as your personal painter, dream visualizer, and creative engine, generating abstract, symbolic, emotional, and dynamic artworks and more.

Turn photos, sketches, music, memories, books, journals, poems, or even inner states into living visuals that evolve over time.`,
    },
    {
      title: "Visual Storytelling",
      description: "Stories brought to life visually.",
      longDescription: `Stories, brought to life.

Transform books, poems, short stories, or ideas into rich visual sequences with narration, music, and cinematic flow.

From bedtime stories for kids to visual audiobooks, storyboards, personalized short films, and story visualizations, Deckoviz turns everyday into magical moments.`,
    },
    {
      title: "Poster & Vision Studio",
      description: "Design inspiring posters and vision boards.",
      longDescription: `Design posters that inspire you, guide your life, and add charm to your walls.

Create quote posters, affirmation boards, vision boards, moodboards, learning posters, reminders, movie-style posters, or personal rules for living.

Dynamic, beautiful, and context-aware, these posters evolve with your goals, moods, and seasons.`,
    },
    {
      title: "Moodscapes & Music",
      description: "Create immersive visual music moods.",
      longDescription: `Enter the state you want to be in.

Sync visuals with music to create calming, energizing, romantic, or reflective moodscapes.

Add your own music or let Vizzy guide you into gratitude, focus, calm, or inspiration.`,
    },
    {
      title: "Smart Photo Frame",
      description: "Bring memories beautifully alive.",
      longDescription: `Your memories, beautifully alive.

Display your photos as they are or reimagined in artistic styles.

Vizzy surfaces memories on birthdays, anniversaries, or unexpected moments and creates intelligent photo montages.`,
    },
    {
      title: "Rituals & Modes",
      description: "Design meaningful daily rituals.",
      longDescription: `Design rhythm into your life.

Set daily, weekly, or monthly rituals and use your DASP in modes like creativity, study, celebration, romance, energy, calm, gratitude, and more.

Vizzy can even activate modes automatically.`,
    },
    {
      title: "Vizzy Home Companion",
      description: "Your intelligent home presence.",
      longDescription: `Your home, curated intelligently.

Vizzy learns your preferences, taste, lifestyle, beliefs, vibes, and family members.

From Art of the Day to Memory Moments, Vizzy makes your home feel alive.`,
    },
    {
      title: "Social & Shared Creativity",
      description: "Create art together in real time.",
      longDescription: `Art is better together.

Share collections with friends and family, gift art, and co-create artworks in real time.

Deckoviz transforms connection into shared creativity.`,
    },
    {
      title: "Learning & Kids Experiences",
      description: "Magical visual learning for all.",
      longDescription: `Learning that feels magical.

Storytelling, concept visualizers, educational posters, creative games, and interactive experiences.

Designed to spark curiosity and imagination.`,
    },
    {
      title: "Games & Interactive Play",
      description: "Creative play that connects people.",
      longDescription: `Play that connects, not consumes.

Enjoy creative and generative games built around imagination, storytelling, collaboration, stimulating challenge, and shared moments.`,
    },
    {
      title: "Narrated Experiences",
      description: "Stories with voice and emotion.",
      longDescription: `See, hear, and feel the story.

Add narration to artworks, stories, poems, meditations, and visual journeys.

Perfect for immersive storytelling.`,
    },
    {
      title: "Marketplace & Personalization",
      description: "A living personalized ecosystem.",
      longDescription: `Experience a living ecosystem.

Discover and trade art, personalize dashboards, and create profiles for every household member.

It grows with you.`,
    },
  ];

  {
    /*}
  const additionalFeatures = [
    {
      title: "Multimodal Art Experiences",
      description: "Every collection has its perfect sonic backdrop, curated or created by Vizzy. Music and art in beautiful sync."
    },
    {
      title: "Dynamic Display Engine",
      description: "Deckoviz learns your rhythms, your mind, your life. It changes based on time of day, mood, occasion, emotion, special occasions, rhythms, vibes and more."
    },
    {
      title: "Deckoviz Marketplace",
      description: "Explore, buy, or sell art. Digital or physical. Discover new artists and support creativity."
    },
    {
      title: "Personalized Quotes & Posters",
      description: "Design daily affirmations or custom quotes in aesthetic, artful frames   tailored to your energy."
    },
    {
      title: "Visual Storytelling for Kids and Families",
      description: "Tell bedtime stories visually. Make learning, sharing, and bonding beautifully engaging."
    },
    {
      title: "Rituals and Interactive Experiences",
      description: "Set rituals like morning ritual, evening ritual, storytelling etc, family dinner ritual, periodic rituals and actions."
    },
    {
      title: "Multi-Space Adaptation",
      description: "Deckoviz adapts to you   however you want it to, wherever you are. Make your spaces come alive, be it homes, offices, cafés, clinics, studios."
    },
    {
      title: "Personalized Curator",
      description: "Enjoy the curations from Vizzy, your personal curator, who finds you just the perfect artworks, visuals and more, just for the right moments."
    },
    {
      title: "New, Dynamic Modalities of Art",
      description: "Enjoy new, personalized, dynamic modes of art made possible just now - such as dynamic multiple frame artworks, narration-infused speaking art and visuals."
    },
    {
      title: "More Present, More Connected",
      description: "Become more grounded, more present, more connected, with rituals and interactive experiences like meditation, visualization, mindfulness."
    },
    {
      title: "Customized, handcrafted frames, just for you",
      description: "Savour handcrafted ornate frame designs as per your preferences, such as having your favourite phrases carved on the wood."
    },
    {
      title: "Set your tone for the day",
      description: "Create and enjoy a dynamic and evolving moodboard or vision board."
    },
    {
      title: "Loads of goodies for the kiddies",
      description: "Deckoviz comes with an amazing suite of features for kids, like storytelling visualization, creative storytelling, art creation and narration."
    },
    {
      title: "Enjoy multisensory art experiences",
      description: "Immerse yourself in a multisensory state setting and art experience, with just the right music picked for you by your Vizzy."
    },
    {
      title: "Co-create artworks with your partner, with your family, with your friends",
      description: "Through our socially modal art features, collaboration features, and more, bring creations to life with your favourite people."
    },
    {
      title: "A space that to with you, with art that speaks with you",
      description: "Enjoy a new look, a fresh vibe, every day, every hour, with walls and spaces that are alive, intelligent, and always evolving."
    },
    {
      title: "Also... it's a Smart TV",
      description: "Deckoviz runs on Google/Android TV. So yes, you can use your favourite TV apps like YouTube and Netflix when you're not art-scape dreaming."
    }
  ];
*/
  }
const getIconForFeature = (title: string) => {
  const map: Record<string, string> = {
    "Generative Art Engine": "3dicons-brush-dynamic-color.png",
    "Visual Storytelling": "3dicons-video-camera-dynamic-color.png", // already png
    "Poster & Vision Studio": "3dicons-picture-dynamic-color.png",   // already png
    "Moodscapes & Music": "3dicons-music-dynamic-color.png",
    "Smart Photo Frame": "3dicons-smart-photo-frame.png",
    "Rituals & Modes": "3dicons-magic-trick-dynamic-color.png",      // already png
    "Vizzy Home Companion": "3dicons-home-dynamic-color.png",
    "Social & Shared Creativity": "3dicons-users-dynamic-color.png",
    "Learning & Kids Experiences": "3dicons-book-dynamic-color.png",
    "Games & Interactive Play": "3dicons-controller-dynamic-color.png",
    "Narrated Experiences": "3dicons-microphone-dynamic-color.png",
    "Marketplace & Personalization": "3dicons-shop-dynamic-color.png",
  };

  return map[title] || "3dicons-brush-dynamic-color.png";
};

const cardVariants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -120 : 120,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], // smooth luxury easing
    },
  },
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, longDescription, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const shouldShowContent = isExpanded || isHovered;

  return (
    <motion.div
      custom={index % 2 === 0 ? "left" : "right"}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-[28px] p-5 sm:p-8 pt-14 sm:pt-20
      border border-white/70 bg-white/25 shadow-[0_24px_80px_rgba(15,23,42,0.10)]
      backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300
      hover:-translate-y-1 hover:border-blue-200/90 hover:bg-white/35 hover:shadow-[0_28px_90px_rgba(15,23,42,0.12),0_0_72px_rgba(37,99,235,0.34)]
      ring-1 ring-slate-900/5
      ${shouldShowContent ? 'ring-blue-200/70' : ''}`}
      style={{
        willChange: 'transform, box-shadow',
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.54) 0%, rgba(255,255,255,0.22) 48%, rgba(255,255,255,0.36) 100%)",
        backdropFilter: "blur(28px) saturate(165%)",
        WebkitBackdropFilter: "blur(28px) saturate(165%)",
      }}
    >
      <div className="pointer-events-none absolute -inset-8 rounded-[42px] bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.52),rgba(14,165,233,0.32)_34%,transparent_70%)] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,255,255,0.08)_44%,rgba(255,255,255,0.34))]" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.60) 0 1px, transparent 1px 5px)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/90" />

      {/* Soft glass wash on hover */}
      <motion.div 
        className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/55 via-sky-100/25 to-slate-100/20 opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-1px_0_rgba(15,23,42,0.05)]" />

      {/* Icon with enhanced animation */}
      <motion.div 
        className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        whileHover={{ scale: 1.2, rotate: 5, y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          {/* Icon glow - using radial gradient instead of blur */}
          <div 
            className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none scale-150"
            style={{ background: `radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)` }}
          />
          <img
            src={`/images/${getIconForFeature(title)}`}
            className="relative w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-xl transition-all duration-300"
            alt={title}
          />
        </div>
      </motion.div>

      {/* Plus/Minus Button with enhanced styling */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        className={`absolute top-5 right-5 z-20 p-3 rounded-full 
        border border-white/70 bg-slate-900/80 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]
        backdrop-blur-md hover:bg-blue-600/85 hover:shadow-[0_18px_36px_rgba(37,99,235,0.18)]
        transition-all duration-300`}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
        </motion.div>
      </motion.button>

      <div className="relative z-10 text-center space-y-4">
        <motion.h3 
          className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {title}
        </motion.h3>

        <motion.p 
          className="text-slate-700 font-semibold text-lg"
          whileHover={{ scale: 1.02 }}
        >
          {description}
        </motion.p>

        <AnimatePresence>
          {shouldShowContent && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent my-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              
              <motion.p 
                className="whitespace-pre-line text-slate-700 leading-relaxed text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {longDescription}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner decoration - using radial gradient for performance */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-25 pointer-events-none overflow-hidden rounded-tr-[28px]">
        <div 
          className="absolute -top-4 -right-4 w-24 h-24" 
          style={{ background: `radial-gradient(circle, rgba(14,165,233,0.24) 0%, transparent 70%)` }}
        />
      </div>
    </motion.div>
  );
};
  return (
    <div
      id="features"
      className="min-h-screen relative overflow-visible"
      style={{ 
        backgroundColor: "#f8fbff",
        backgroundImage: `
          radial-gradient(circle at 18% 12%, rgba(37,99,235,0.16) 0%, transparent 32%),
          radial-gradient(circle at 86% 82%, rgba(14,165,233,0.14) 0%, transparent 36%),
          linear-gradient(160deg, rgba(255,255,255,0.96) 0%, rgba(236,246,255,0.92) 48%, rgba(248,251,255,0.98) 100%),
          repeating-linear-gradient(0deg, rgba(37,99,235,0.045) 0 1px, transparent 1px 78px),
          repeating-linear-gradient(90deg, rgba(14,165,233,0.04) 0 1px, transparent 1px 92px)
        `
      }}
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
       
        {/* Horizontal Scrolling Features Section */}
        <div className="mb-16 md:mb-24"><HorizontalScrollingFeatures /></div>

        {/* Intro Card */}
        <div className="mb-20 relative z-10">
          <div className="relative overflow-hidden rounded-[32px] p-[1px] bg-white/20 shadow-2xl">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[31px] p-6 sm:p-12 md:p-16 relative overflow-hidden">
              {/* soft glow blobs - using radial gradients */}
              <div className="absolute -top-24 -left-24 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(191,219,254,0.4) 0%, transparent 70%)' }}></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(165,243,252,0.4) 0%, transparent 70%)' }}></div>
 {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gray-900">Features &</span>{" "}
            <span className="italic bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Highlights
            </span>
          </h1>
        </div>
              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                {/* Gradient Heading */}
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  What can the{" "}
                  <span className="italic bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                    DASPort
                  </span>{" "}
                  do?
                </h2>

                {/* Intro paragraph 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative overflow-hidden backdrop-blur-xl backdrop-saturate-[180%] bg-white/40 rounded-[28px] p-6 md:p-8 border border-white/60 shadow-[0_12px_48px_rgba(79,70,229,0.08),0_2px_8px_rgba(79,70,229,0.04),inset_0_1.5px_0_rgba(255,255,255,1)] hover:shadow-[0_0_80px_rgba(37,99,235,0.45),0_12px_48px_rgba(79,70,229,0.2),inset_0_1.5px_0_rgba(255,255,255,1)] transition-all duration-300 cursor-default"
                >
                  <div className="absolute inset-0 pointer-events-none rounded-[28px] mix-blend-overlay opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.60) 0 1px, transparent 1px 5px)" }}></div>
                  <p className="relative z-10 text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                    A whole lot. We set out to build the ultimate art & story platform for living spaces, and today, the DASPort includes many individual modes and features, spanning art, creation, storytelling, mood-setting, sound ambiance, rituals, family moments, play, creativity, learning, and ambient intelligence, organized into 12 core themes.
                  </p>
                </motion.div>

                {/* Intro paragraph 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative overflow-hidden backdrop-blur-xl backdrop-saturate-[180%] bg-white/40 rounded-[28px] p-6 md:p-8 border border-white/60 shadow-[0_12px_48px_rgba(79,70,229,0.08),0_2px_8px_rgba(79,70,229,0.04),inset_0_1.5px_0_rgba(255,255,255,1)] hover:shadow-[0_0_80px_rgba(37,99,235,0.45),0_12px_48px_rgba(79,70,229,0.2),inset_0_1.5px_0_rgba(255,255,255,1)] transition-all duration-300 cursor-default"
                >
                  <div className="absolute inset-0 pointer-events-none rounded-[28px] mix-blend-overlay opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.60) 0 1px, transparent 1px 5px)" }}></div>
                  <p className="relative z-10 text-base md:text-lg text-gray-800 leading-relaxed">
                    Each theme represents a feature suite, bringing together related capabilities and experiences so you can quickly understand how the DASPort can add to your life. It is designed as a living platform, evolving with you and your life every single week, as we keep adding new experiences, modes, possibilities, artworks and content.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          {mainFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
              longDescription={feature.longDescription}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => (window.location.href = "/all-features")}
            className="group relative inline-flex items-center gap-4 px-10 py-4
               rounded-full font-bold text-white text-lg
               bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500
               hover:from-blue-700 hover:via-indigo-600 hover:to-cyan-600
               shadow-xl hover:shadow-blue-500/40
               transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10"> See More Magic 🌟</span>

            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              <ChevronDown size={22} />
            </span>

            {/* shimmer */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                    -skew-x-12 -translate-x-full group-hover:translate-x-full
                    transition-transform duration-1000 rounded-full"
            ></div>
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Features;

