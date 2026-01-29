import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
  onClick: () => void;
}

const Features: React.FC = () => {
const [activeFeature, setActiveFeature] = useState<any>(null);

  const mainFeatures = [
{
title: "Generative Art Engine",
description: "Create deeply personal evolving art.",
longDescription: `Create deeply personal art, endlessly.

Deckoviz acts as your personal painter, dream visualizer, and creative engine, generating abstract, symbolic, emotional, and dynamic artworks and more.

Turn photos, sketches, music, memories, books, journals, poems, or even inner states into living visuals that evolve over time.`
},
{
title: "Visual Storytelling",
description: "Stories brought to life visually.",
longDescription: `Stories, brought to life.

Transform books, poems, short stories, or ideas into rich visual sequences with narration, music, and cinematic flow.

From bedtime stories for kids to visual audiobooks, storyboards, personalized short films, and story visualizations, Deckoviz turns everyday into magical moments.`
},
{
title: "Poster & Vision Studio",
description: "Design inspiring posters and vision boards.",
longDescription: `Design posters that inspire you, guide your life, and add charm to your walls.

Create quote posters, affirmation boards, vision boards, moodboards, learning posters, reminders, movie-style posters, or personal rules for living.

Dynamic, beautiful, and context-aware, these posters evolve with your goals, moods, and seasons.`
},
{
title: "Moodscapes & Music",
description: "Create immersive visual music moods.",
longDescription: `Enter the state you want to be in.

Sync visuals with music to create calming, energizing, romantic, or reflective moodscapes.

Add your own music or let Vizzy guide you into gratitude, focus, calm, or inspiration.`
},
{
title: "Smart Photo Frame",
description: "Bring memories beautifully alive.",
longDescription: `Your memories, beautifully alive.

Display your photos as they are or reimagined in artistic styles.

Vizzy surfaces memories on birthdays, anniversaries, or unexpected moments and creates intelligent photo montages.`
},
{
title: "Rituals & Modes",
description: "Design meaningful daily rituals.",
longDescription: `Design rhythm into your life.

Set daily, weekly, or monthly rituals and use your DASP in modes like creativity, study, celebration, romance, energy, calm, gratitude, and more.

Vizzy can even activate modes automatically.`
},
{
title: "Vizzy Home Companion",
description: "Your intelligent home presence.",
longDescription: `Your home, curated intelligently.

Vizzy learns your preferences, taste, lifestyle, beliefs, vibes, and family members.

From Art of the Day to Memory Moments, Vizzy makes your home feel alive.`
},
{
title: "Social & Shared Creativity",
description: "Create art together in real time.",
longDescription: `Art is better together.

Share collections with friends and family, gift art, and co-create artworks in real time.

Deckoviz transforms connection into shared creativity.`
},
{
title: "Learning & Kids Experiences",
description: "Magical visual learning for all.",
longDescription: `Learning that feels magical.

Storytelling, concept visualizers, educational posters, creative games, and interactive experiences.

Designed to spark curiosity and imagination.`
},
{
title: "Games & Interactive Play",
description: "Creative play that connects people.",
longDescription: `Play that connects, not consumes.

Enjoy creative and generative games built around imagination, storytelling, collaboration, stimulating challenge, and shared moments.`
},
{
title: "Narrated Experiences",
description: "Stories with voice and emotion.",
longDescription: `See, hear, and feel the story.

Add narration to artworks, stories, poems, meditations, and visual journeys.

Perfect for immersive storytelling.`
},
{
title: "Marketplace & Personalization",
description: "A living personalized ecosystem.",
longDescription: `Experience a living ecosystem.

Discover and trade art, personalize dashboards, and create profiles for every household member.

It grows with you.`
}
];

{/*}
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
      description: "Design daily affirmations or custom quotes in aesthetic, artful frames — tailored to your energy."
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
      description: "Deckoviz adapts to you — however you want it to, wherever you are. Make your spaces come alive, be it homes, offices, cafés, clinics, studios."
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
*/}
  const getIconForFeature = (index: number) => {
    const icons = [
      '3dicons-picture-dynamic-color.png',
      '3dicons-paint-kit-dynamic-color.png', 
      '3dicons-brush-dynamic-color.png',
      '3dicons-video-camera-dynamic-color.png',
      '3dicons-zoom-dynamic-color.png',
      '3dicons-magic-trick-dynamic-color.png'
    ];
    return icons[index % 6];
  };

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, index, onClick }) => (
   <div onClick={onClick} className="group relative bg-white rounded-2xl p-8 pt-16 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      {/* 3D Icon positioned half outside, half inside */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50">
        <img 
          src={`/images/${getIconForFeature(index)}`}
          alt="Feature Icon" 
          className="w-16 h-16 object-contain transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl filter group-hover:brightness-110"
        />
      </div>
      
      <div className="flex flex-col items-center text-center relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-base group-hover:text-gray-800 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Subtle floating particles effect on hover */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-purple-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-bounce transition-all duration-1000 z-30"></div>
      <div className="absolute top-8 left-8 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-ping transition-all duration-500 z-30"></div>
    </div>
  );

  return (
    <div id="features"  className="min-h-screen bg-white relative overflow-hidden">
      {/* Purple to pink spiral gradient background */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 50% 60%, 
        rgba(168, 85, 247, 0.4) 0%, /* purple-500 */
        rgba(180, 83, 220, 0.3) 10%, /* purple-pink blend */
        rgba(195, 80, 190, 0.2) 18%, /* purple-pink blend */
        rgba(215, 75, 165, 0.15) 27%, /* purple-pink blend */
        rgba(226, 73, 155, 0.08) 39%, /* purple-pink blend */
        rgba(236, 72, 153, 0.03) 45%, /* pink-500 */
        transparent 50%)`
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Features & <span className="bg-gradient-to-r from-[#793ae7] to-[#be37b1] bg-clip-text text-transparent">Highlights</span>
          </h1>
                  </div>
        {/* Intro Card */}
<div className="mb-20">
  <div className="relative overflow-hidden rounded-[32px] p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-2xl">

    <div className="bg-white rounded-[30px] p-12 md:p-16 relative">

      {/* soft glow blobs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">


        <p className="text-lg text-gray-700 leading-relaxed">
          A whole lot. We set out to build the ultimate art and storytelling
          platform for living spaces — one that naturally creates abundance of
          features and experiences. If a feature can deepen emotion, spark
          imagination, personalize a moment, or turn a wall into a living
          experience, it belongs here.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Today, Deckoviz includes{" "}
          <span className="font-semibold text-purple-600">
            hundreds of individual features
          </span>
          , spanning art, creation, storytelling, music, learning, rituals,
          family moments, play, and ambient intelligence — organized into{" "}
          <span className="font-semibold text-pink-500">12 core themes</span>.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Each theme represents a feature suite, bringing together related
          capabilities and experiences so you can quickly understand how
          Deckoviz fits into your life.
        </p>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-gray-700 italic">
            Deckoviz is becoming a living platform — emotionally intelligent,
            deeply personalized, and evolving every single week.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>


        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 mb-12">
          {mainFeatures.map((feature, index) => (
  <FeatureCard
    key={index}
    index={index}
    title={feature.title}
    description={feature.description}
    onClick={() => setActiveFeature(feature)}
  />
))}

        </div>

        {/* See More Button */}
        <div className="text-center mt-16">
  <button
    onClick={() => window.location.href = "/all-features"}
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
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                    -skew-x-12 -translate-x-full group-hover:translate-x-full
                    transition-transform duration-1000 rounded-full"></div>
  </button>
</div>


        {/* Additional Features (Expandable) */}
        {activeFeature && (
<div
  className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center px-6"
  onMouseMove={(e) => {
    const spark = document.getElementById("spark");
    if (spark) {
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
    }
  }}
>

{/* Firework sparkle */}
<div
  id="spark"
  className="pointer-events-none fixed w-6 h-6 rounded-full
             bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
             blur-sm animate-ping -translate-x-1/2 -translate-y-1/2"
/>

{/* Fancy Border Wrapper */}
<div className="relative p-[3px] rounded-[32px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient">

<div className="bg-white max-w-3xl w-full rounded-[28px] p-12 shadow-2xl relative overflow-hidden">

{/* Decorative corners */}
<div className="absolute top-3 left-3 w-6 h-6 border-l-4 border-t-4 border-purple-400 rounded-tl-xl"></div>
<div className="absolute top-3 right-3 w-6 h-6 border-r-4 border-t-4 border-pink-400 rounded-tr-xl"></div>
<div className="absolute bottom-3 left-3 w-6 h-6 border-l-4 border-b-4 border-indigo-400 rounded-bl-xl"></div>
<div className="absolute bottom-3 right-3 w-6 h-6 border-r-4 border-b-4 border-purple-400 rounded-br-xl"></div>

{/* Close */}
<button
onClick={() => setActiveFeature(null)}
className="absolute top-6 right-6 text-xl text-gray-400 hover:text-black transition"
>
✕
</button>

{/* Heading */}
<h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
{activeFeature.title}
</h2>

{/* Description */}
<p className="whitespace-pre-line text-center text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto">
{activeFeature.longDescription}
</p>

{/* Back */}
<div className="flex justify-center mt-10">
<button
onClick={() => setActiveFeature(null)}
className="px-10 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 transition"
>
← Back
</button>
</div>

</div>
</div>
</div>
)}


        
      </div>
    </div>
  );
};

export default Features;