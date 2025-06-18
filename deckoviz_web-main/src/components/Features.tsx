import React, { useState } from 'react';
import { 
  Image, 
  Palette, 
  Sparkles, 
  Maximize, 
  Search, 
  Music,
  Clock,
  MessageSquare,
  Users,
  Home,
  Tv,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const mainFeatures = [
    {
      icon: <Image className="w-8 h-8" />,
      title: "Reimagine Your Photos",
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Personal Iconic Art", 
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Your Personal Painter",
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      icon: <Maximize className="w-8 h-8" />,
      title: "AI style Transfer + Image to Gif/ Video",
      description: "Turn static images into animations, gifs, or cinematic loops."
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Intelligent Art Search",
      description: "Transform your personal photos into the style of your favorite artists — from Van Gogh to Studio Ghibli."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Create Your Own Collection",
      description: "Curate themed collections, set display preferences, attach music, and crafts."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "Multimodal Art Experiences",
      description: "Every collection has its perfect sonic backdrop, curated or created by Vizzy. Music and art in beautiful sync."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Dynamic Display Engine",
      description: "Deckoviz learns your rhythms, your mind, your life. It changes based on time of day, mood, occasion, emotion, special occasions, rhythms, vibes and more."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Deckoviz Marketplace",
      description: "Explore, buy, or sell art. Digital or physical. Discover new artists and support creativity."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Personalized Quotes & Posters",
      description: "Design daily affirmations or custom quotes in aesthetic, artful frames — tailored to your energy."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Visual Storytelling for Kids and Families",
      description: "Tell bedtime stories visually. Make learning, sharing, and bonding beautifully engaging."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Rituals and Interactive Experiences",
      description: "Set rituals like morning ritual, evening ritual, storytelling etc, family dinner ritual, periodic rituals and actions."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Multi-Space Adaptation",
      description: "Deckoviz adapts to you — however you want it to, wherever you are. Make your spaces come alive, be it homes, offices, cafés, clinics, studios."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Personalized Curator",
      description: "Enjoy the curations from Vizzy, your personal curator, who finds you just the perfect artworks, visuals and more, just for the right moments."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "New, Dynamic Modalities of Art",
      description: "Enjoy new, personalized, dynamic modes of art made possible just now - such as dynamic multiple frame artworks, narration-infused speaking art and visuals."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "More Present, More Connected",
      description: "Become more grounded, more present, more connected, with rituals and interactive experiences like meditation, visualization, mindfulness."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Customized, handcrafted frames, just for you",
      description: "Savour handcrafted ornate frame designs as per your preferences, such as having your favourite phrases carved on the wood."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Set your tone for the day",
      description: "Create and enjoy a dynamic and evolving moodboard or vision board."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Loads of goodies for the kiddies",
      description: "Deckoviz comes with an amazing suite of features for kids, like storytelling visualization, creative storytelling, art creation and narration."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Enjoy multisensory art experiences",
      description: "Immerse yourself in a multisensory state setting and art experience, with just the right music picked for you by your Vizzy."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Co-create artworks with your partner, with your family, with your friends",
      description: "Through our socially modal art features, collaboration features, and more, bring creations to life with your favourite people."
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "A space that to with you, with art that speaks with you",
      description: "Enjoy a new look, a fresh vibe, every day, every hour, with walls and spaces that are alive, intelligent, and always evolving."
    },
    {
      icon: <Tv className="w-8 h-8" />,
      title: "Also... it's a Smart TV",
      description: "Deckoviz runs on Google/Android TV. So yes, you can use your favourite TV apps like YouTube and Netflix when you're not art-scape dreaming."
    }
  ];

  const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="relative bg-white rounded-2xl p-8 pt-16 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* 3D Icon positioned half outside, half inside */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 hover:rotate-6 transition-transform duration-300">
          <div className="text-white transform -rotate-12">
            {icon}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-gray-900 leading-relaxed mb-6 text-base">
          {description}
        </p>
        <button className="px-8 py-2 bg-transparent hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 w-full max-w-[270px]">
          Learn More
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Purple to pink spiral gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500 via-pink-500 to-transparent opacity-60"></div>
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
          <div className="inline-block bg-[#b698fb] text-gray-900 px-4 py-1.5 rounded-xl text-sm font-medium mb-6">
            Product Features & Highlights
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Features & <span className="bg-[#793ae7] bg-clip-text text-transparent">Highlights</span>
          </h1>
          <p className="text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
            What can Deckoviz do? A whole lot. And it's only getting better with time, as we keep shipping 
            new features in the pursuit of creating the greatest emotionally intelligent, dynamic, and 
            personalized art experience.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 mb-12">
          {mainFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

    {/* See More Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowMore(!showMore)}
          className="group inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-gray-700 transition-all duration-200"
        >
          <span
            className={`transform transition-transform duration-200 ${
              showMore ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'
            }`}
          >
            {showMore ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
                icon={feature.icon}
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