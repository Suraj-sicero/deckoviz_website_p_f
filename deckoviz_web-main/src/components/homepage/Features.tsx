import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, longDescription, index }) => (
<div className="group relative rounded-2xl p-10 pt-20 shadow-lg border border-white/40
bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50
hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 backdrop-blur-md">


{/* Gradient hover */}
<div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100 transition rounded-2xl" />

{/* Icon */}
<div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50">
  <img
    src={`/images/${getIconForFeature(title)}`}
    className="w-20 h-20 object-contain drop-shadow-xl group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500"
  />
</div>

<div className="relative z-10 text-center space-y-4">

<h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
{title}
</h3>

<p className="text-gray-700 font-medium">
{description}
</p>

<div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent my-4" />

<p className="whitespace-pre-line text-gray-600 leading-relaxed">
{longDescription}
</p>

</div>
</div>
);
  return (
    <div
      id="features"
      className="min-h-screen bg-white relative overflow-hidden"
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
       
        {/* Intro Card */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-[32px] p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-2xl">
            <div className="bg-white rounded-[30px] p-12 md:p-16 relative">
              {/* soft glow blobs */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
 {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Features &{" "}
            <span className="bg-gradient-to-r from-[#793ae7] to-[#be37b1] bg-clip-text text-transparent">
              Highlights
            </span>
          </h1>
        </div>
              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                {/* Gradient Heading */}
                <h2
                  className="text-4xl font-extrabold mb-4
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 bg-clip-text text-transparent
                 drop-shadow-sm"
                >
                  What Can Deckoviz Do
                </h2>

                {/* Soft underline glow */}
                <div
                  className="mx-auto w-32 h-1 rounded-full
                  bg-gradient-to-r from-purple-400 to-pink-400
                  opacity-60 mb-6"
                ></div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  A whole lot. We set out to build the ultimate art and
                  storytelling platform for living spaces   one that naturally
                  creates abundance of features and experiences. If a feature
                  can deepen emotion, spark imagination, personalize a moment,
                  or turn a wall into a living experience, it belongs here.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Today, Deckoviz includes{" "}
                  <span className="font-semibold text-purple-600">
                    hundreds of individual features
                  </span>
                  , spanning art, creation, storytelling, music, learning,
                  rituals, family moments, play, and ambient intelligence  
                  organized into{" "}
                  <span className="font-semibold text-pink-500">
                    12 core themes
                  </span>
                  .
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Each theme represents a feature suite, bringing together
                  related capabilities and experiences so you can quickly
                  understand how Deckoviz fits into your life.
                </p>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-gray-700 italic">
                    Deckoviz is becoming a living platform   emotionally
                    intelligent, deeply personalized, and evolving every single
                    week.
                  </p>
                </div>
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
