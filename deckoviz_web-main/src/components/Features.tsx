import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

const Features: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const mainFeatures = [
    {
      title: "Reimagine Your Photos",
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      title: "Personal Iconic Art", 
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      title: "Your Personal Painter",
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      title: "AI style Transfer + Image to Gif/ Video",
      description: "Turn static images into animations, gifs, or cinematic loops."
    },
    {
      title: "Intelligent Art Search",
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      title: "Create Your Own Collection",
      description: "Curate themed collections, set display preferences, attach music, and crafts."
    }
  ];

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

  const FeatureCard: React.FC<FeatureCardProps & { index: number }> = ({ title, description, index }) => (
    <div className="group relative bg-white rounded-2xl p-8 pt-16 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
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
    <div className="min-h-screen bg-white relative overflow-hidden">
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
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            <span className="text-gray-800">What can </span>
            <span className="text-purple-600 font-semibold">Deckoviz</span>
            <span className="text-gray-800"> do? A whole lot. And it's only getting </span>
            <span className="text-indigo-600 font-semibold">better with time</span>
            <span className="text-gray-800">, as we keep shipping new features in the pursuit of creating the greatest </span>
            <span className="text-fuchsia-500 font-semibold">emotionally intelligent</span>
            <span className="text-gray-800">, </span>
            <span className="text-purple-600 font-semibold">dynamic</span>
            <span className="text-gray-800">, and </span>
            <span className="text-rose-500 font-semibold">personalized art experience</span>
            <span className="text-gray-800">.</span>
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 mb-12">
          {mainFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group inline-flex items-center gap-3 text-gray-900 font-semibold hover:text-purple-700 transition-all duration-300 text-lg"
          >
            <span
              className={`transform transition-transform duration-300 ${
                showMore ? 'group-hover:-translate-y-1' : 'group-hover:translate-y-1'
              }`}
            >
              {showMore ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </span>
            {showMore ? 'See Less' : 'See More'}
          </button>
        </div>

        {/* Additional Features (Expandable) */}
        {showMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 animate-in slide-in-from-top-4 duration-500">
            {additionalFeatures.map((feature, index) => (
              <FeatureCard
                key={`additional-${index}`}
                index={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;