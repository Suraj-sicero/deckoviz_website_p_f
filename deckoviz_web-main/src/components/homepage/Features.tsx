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
      description: "Create deeply personal evolving art.",
      longDescription: `Create deeply personal art, endlessly.

Deckoviz acts as your personal painter, dream visualizer, and creative engine, generating abstract, symbolic, emotional, and dynamic artworks and more.

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

  // Unique gradient combinations for each card
  const gradients = [
    "from-violet-100 via-purple-100 to-fuchsia-100",
    "from-rose-100 via-pink-100 to-red-100",
    "from-cyan-100 via-sky-100 to-blue-100",
    "from-amber-100 via-orange-100 to-yellow-100",
    "from-emerald-100 via-teal-100 to-green-100",
    "from-indigo-100 via-blue-100 to-purple-100",
    "from-pink-100 via-rose-100 to-purple-100",
    "from-lime-100 via-green-100 to-emerald-100",
    "from-fuchsia-100 via-pink-100 to-rose-100",
    "from-sky-100 via-cyan-100 to-teal-100",
    "from-orange-100 via-amber-100 to-yellow-100",
    "from-purple-100 via-violet-100 to-indigo-100",
  ];

  const borderColors = [
    "border-violet-200/60",
    "border-rose-200/60",
    "border-cyan-200/60",
    "border-amber-200/60",
    "border-emerald-200/60",
    "border-indigo-200/60",
    "border-pink-200/60",
    "border-lime-200/60",
    "border-fuchsia-200/60",
    "border-sky-200/60",
    "border-orange-200/60",
    "border-purple-200/60",
  ];

  const titleGradients = [
    "from-violet-600 via-purple-600 to-fuchsia-600",
    "from-rose-600 via-pink-600 to-red-600",
    "from-cyan-600 via-sky-600 to-blue-600",
    "from-amber-600 via-orange-600 to-yellow-600",
    "from-emerald-600 via-teal-600 to-green-600",
    "from-indigo-600 via-blue-600 to-purple-600",
    "from-pink-600 via-rose-600 to-purple-600",
    "from-lime-600 via-green-600 to-emerald-600",
    "from-fuchsia-600 via-pink-600 to-rose-600",
    "from-sky-600 via-cyan-600 to-teal-600",
    "from-orange-600 via-amber-600 to-yellow-600",
    "from-purple-600 via-violet-600 to-indigo-600",
  ];

  const buttonGradients = [
    "from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600",
    "from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600",
    "from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
    "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
    "from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
    "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
    "from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600",
    "from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600",
    "from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600",
    "from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
    "from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600",
  ];

  const dividerGradients = [
    "from-transparent via-violet-300 to-transparent",
    "from-transparent via-rose-300 to-transparent",
    "from-transparent via-cyan-300 to-transparent",
    "from-transparent via-amber-300 to-transparent",
    "from-transparent via-emerald-300 to-transparent",
    "from-transparent via-indigo-300 to-transparent",
    "from-transparent via-pink-300 to-transparent",
    "from-transparent via-lime-300 to-transparent",
    "from-transparent via-fuchsia-300 to-transparent",
    "from-transparent via-sky-300 to-transparent",
    "from-transparent via-orange-300 to-transparent",
    "from-transparent via-purple-300 to-transparent",
  ];

  return (
    <motion.div
      custom={index % 2 === 0 ? "left" : "right"}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl p-10 pt-20 shadow-xl border-2 ${borderColors[index]}
      bg-gradient-to-br ${gradients[index]}
      hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 backdrop-blur-md
      ${shouldShowContent ? 'ring-4 ring-purple-300/30' : ''}`}
    >
      {/* Animated gradient overlay on hover */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 rounded-3xl`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${buttonGradients[index].split(' ')[0]} ${buttonGradients[index].split(' ')[1]} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Icon with enhanced animation */}
      <motion.div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 z-50"
        whileHover={{ scale: 1.2, rotate: 5, y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          {/* Icon glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />
          <img
            src={`/images/${getIconForFeature(title)}`}
            className="relative w-24 h-24 object-contain drop-shadow-2xl transition-all duration-500"
          />
        </div>
      </motion.div>

      {/* Plus/Minus Button with enhanced styling */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        className={`absolute top-5 right-5 z-20 p-3 rounded-full 
        bg-gradient-to-r ${buttonGradients[index]}
        text-white shadow-lg hover:shadow-2xl
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
          className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${titleGradients[index]} bg-clip-text text-transparent`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {title}
        </motion.h3>

        <motion.p 
          className="text-gray-700 font-semibold text-lg"
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
                className={`h-1 bg-gradient-to-r ${dividerGradients[index]} my-6 rounded-full`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              
              <motion.p 
                className="whitespace-pre-line text-gray-700 leading-relaxed text-base"
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

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
        <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${buttonGradients[index].split(' ')[0]} ${buttonGradients[index].split(' ')[1]} rounded-full blur-xl`} />
      </div>
    </motion.div>
  );
};
  return (
    <div
      id="features"
      className="min-h-screen bg-white relative overflow-visible"
    >
      {/* Purple to pink spiral gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 60%, 
        rgba(168, 85, 247, 0.4) 0%, /* purple-500 */
        rgba(180, 83, 220, 0.3) 10%, /* purple-pink blend */
        rgba(195, 80, 190, 0.2) 18%, /* purple-pink blend */
        rgba(215, 75, 165, 0.15) 27%, /* purple-pink blend */
        rgba(226, 73, 155, 0.08) 39%, /* purple-pink blend */
        rgba(236, 72, 153, 0.03) 45%, /* pink-500 */
        transparent 50%)`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
       
        {/* Horizontal Scrolling Features Section */}
        <HorizontalScrollingFeatures />

        {/* Intro Card */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-[32px] p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-2xl">
            <div className="bg-white rounded-[30px] p-12 md:p-16 relative">
              {/* soft glow blobs */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
 {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gray-900">Features &</span>{" "}
            <span className="italic bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Highlights
            </span>
          </h1>
        </div>
              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                {/* Gradient Heading */}
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  What Can{" "}
                  <span className="italic bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                    Deckoviz
                  </span>{" "}
                  Do
                </h2>

                {/* Soft underline glow */}
                <div
                  className="mx-auto w-32 h-1 rounded-full
                  bg-gradient-to-r from-purple-400 to-pink-400
                  opacity-60 mb-6"
                ></div>

                {/* Main intro paragraph with colorful background */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 shadow-sm hover:shadow-lg transition-shadow cursor-default"
                >
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                    A whole lot. We set out to build the ultimate art and
                    storytelling platform for living spaces   one that naturally
                    creates abundance of features and experiences. If a feature
                    can deepen emotion, spark imagination, personalize a moment,
                    or turn a wall into a living experience, it belongs here.
                  </p>
                </motion.div>

                {/* Stats paragraph with colorful highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 shadow-sm hover:shadow-lg transition-shadow cursor-default"
                >
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Today, Deckoviz includes{" "}
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="inline-block font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                      hundreds of individual features
                    </motion.span>
                    , spanning{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-orange-600">art</motion.span>,{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-pink-600">creation</motion.span>,{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-indigo-600">storytelling</motion.span>,{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-violet-600">music</motion.span>,{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-blue-600">learning</motion.span>,{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-rose-600">rituals</motion.span>,{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-amber-600">family moments</motion.span>,{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-cyan-600">play</motion.span>, and{" "}
                    <motion.span whileHover={{ scale: 1.15, y: -2 }} className="inline-block font-semibold text-emerald-600">ambient intelligence</motion.span>  
                    organized into{" "}
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="inline-block font-bold text-xl bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent"
                    >
                      12 core themes
                    </motion.span>
                    .
                  </p>
                </motion.div>

                {/* Feature suite explanation with colorful background */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-cyan-200 shadow-sm hover:shadow-lg transition-shadow cursor-default"
                >
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Each theme represents a feature suite, bringing together
                    related capabilities and experiences so you can quickly
                    understand how Deckoviz fits into your life.
                  </p>
                </motion.div>

                {/* Bottom quote with special styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.3 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="pt-6"
                >
                  <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-sm hover:shadow-lg transition-shadow cursor-default">
                    <p className="text-base md:text-lg text-gray-800 italic font-medium leading-relaxed">
                      Deckoviz is becoming a living platform   emotionally
                      intelligent, deeply personalized, and evolving every single
                      week.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
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
               bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
               shadow-xl hover:shadow-purple-500/40
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
