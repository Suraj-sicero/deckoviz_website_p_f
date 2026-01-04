"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// REFINED: Component for the scrolling image gallery
const ScrollingImageGallery: React.FC = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80", alt: "Abstract art piece" },
    
    { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80", alt: "Gradient paint strokes" },
    
    { src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80", alt: "Close-up of a textured painting" },
    { src: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&q=80", alt: "Surreal digital art composition" },
    { src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80", alt: "Abstract geometric pattern" },
  ];

  // Duplicate images for a seamless loop
  const extendedImages = [...images, ...images];

  return (
    <div className="mt-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800">A Glimpse into the Possibilities</h2>
      
      {/* This container hides the overflow and applies the fade effect */}
      <div 
        className="w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)"
        }}
      >
        {/* This container holds and animates the images */}
        <div className="flex flex-nowrap animate-scroll group-hover:[animation-play-state:paused]">
          {extendedImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-80 mx-4">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const DesignedFor: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const mainDesignedFor = [
  {
    title: "For those seeking more beauty and meaning",
    description:
      "Spaces that do more than exist — they move you, ground you, and quietly inspire wonder every day.",
    gradient: "from-pink-200 via-purple-100 to-pink-300",
    image: "https://i.pinimg.com/736x/e8/28/11/e828112ea1446c27a69ce9fd789804ac.jpg"
  },
  {
    title: "For those who want a personal painter",
    description:
      "An AI artist that translates dreams, moods, memories, and inner worlds into living visual stories.",
    gradient: "from-purple-200 via-blue-100 to-indigo-300",
    image: "https://i.pinimg.com/736x/13/ab/dc/13abdc4a9b6360c442aba267f4d53386.jpg"
  },
  {
    title: "For those who want to honor their memories",
    description:
      "Moments that deserve more than storage — made visible, alive, and meaningfully revisited.",
    gradient: "from-orange-200 via-pink-100 to-purple-300",
    image: "https://i.pinimg.com/736x/d3/2d/cb/d32dcb7469c4b31f7979eb98dbdb557c.jpg"
  },
  {
    title: "For those who see art inside their photos",
    description:
      "Reveal what already exists — elevate everyday images into expressive, emotional art.",
    gradient: "from-green-200 via-emerald-100 to-teal-300",
    image: "https://i.pinimg.com/736x/97/da/5c/97da5c3d3494613f730da795965b3d87.jpg"
  },
  {
    title: "For those who want movement in their spaces",
    description:
      "Visuals that evolve, breathe, and shift — bringing novelty without chaos, energy without noise.",
    gradient: "from-purple-200 via-pink-100 to-rose-300",
    image: "https://i.pinimg.com/736x/ed/3d/1f/ed3d1f63878a4f606ef8ed170834b330.jpg"
  },
  {
    title: "For spaces that respond to life itself",
    description:
      "Art that adapts to moods, rituals, seasons, and moments — never static, always intentional.",
    gradient: "from-blue-200 via-purple-100 to-pink-300",
    image: "https://www.istitutomarangoni.com/marangoni/entities/course/Digital_art_direction.png"
  }
];

  const additionalDesignedFor = [
  {
    title: "For those who want more soul, more spirit in their spaces",
    description:
      "More presence. More intention. Less dead space. A home that feels alive and meaningful.",
    gradient: "from-indigo-200 via-purple-100 to-blue-300",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop"
  },
  {
    title: "For lovers of beauty, for lovers of art",
    description:
      "Especially for those who never quite found themselves reflected in traditional art.",
    gradient: "from-pink-200 via-rose-100 to-red-300",
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=400&fit=crop"
  },
  {
    title: "For the curious and the creative",
    description:
      "Those who explore how AI becomes art — when guided by taste, restraint, and human sensitivity.",
    gradient: "from-cyan-200 via-blue-100 to-purple-300",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=400&fit=crop"
  },
  {
    title: "For those seeking more intentionality, depth, and love",
    description:
      "More mindful living. More meaning. More presence in everyday moments.",
    gradient: "from-purple-200 via-pink-100 to-orange-300",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=400&fit=crop"
  },
  {
    title: "For parents and families who want shared rituals",
    description:
      "Moments that happen naturally. Visuals that bring people together without demanding attention.",
    gradient: "from-yellow-200 via-orange-100 to-pink-300",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=400&fit=crop"
  },
  {
    title: "For couples who want their space to support intimacy and growth",
    description:
      "Romance that evolves. Environments that reflect the relationship — not just the furniture.",
    gradient: "from-rose-200 via-pink-100 to-purple-300",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=400&fit=crop"
  },
  {
    title: "For those oscillating between calm and ambition",
    description:
      "Between grounding and passion. Between rest and creation. Between stillness and drive.",
    gradient: "from-green-200 via-teal-100 to-blue-300",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop"
  },
  {
    title: "For those who believe every room carries meaning",
    description:
      "Each space deserves its own character, rhythm, and emotional tone.",
    gradient: "from-purple-200 via-indigo-100 to-blue-300",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop"
  },
  {
    title: "For people invested in personal growth",
    description:
      "Reflection. Journaling. Vision boards. Goals that stay visible, alive, and motivating.",
    gradient: "from-orange-200 via-yellow-100 to-pink-300",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop"
  },
  {
    title: "For minimalists who want less clutter, not less richness",
    description:
      "A thousand expressions. One elegant frame.",
    gradient: "from-gray-200 via-purple-100 to-gray-300",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=400&fit=crop"
  }
];


  const DesignedCard: React.FC<{
  title: string;
  description: string;
  gradient: string;
  image: string;
  index: number;
}> = ({ title, description, image }) => (
  <div
  className="
    group relative rounded-2xl cursor-pointer overflow-hidden
    bg-white
    border border-gray-100
    shadow-md
    transition-all duration-500
    hover:shadow-xl hover:scale-[1.03]
    hover:bg-gradient-to-br 
    hover:from-purple-50/60 
    hover:via-pink-50/40 
    hover:to-white
  "
>

    {/* Image */}
    <div className="relative h-52 overflow-hidden rounded-t-2xl">
      <img
        src={image}
        alt="Inspiration"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
    </div>

    {/* Text */}
    <div className="p-6 flex flex-col gap-3 text-center">
      <h3 className="text-lg font-semibold leading-snug bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        {title}
      </h3>
<p className="
  text-sm 
  leading-relaxed 
  text-gray-500 
  group-hover:text-transparent
  bg-gradient-to-r 
  from-gray-500 
  via-purple-500/80 
  to-pink-500/80
  bg-clip-text
  transition-all 
  duration-500
">
  {description}
</p>


    </div>

    {/* Soft hover outline */}
     <div
      className="
        pointer-events-none
        absolute inset-0 rounded-2xl
        ring-1 ring-purple-200/0
        group-hover:ring-purple-300/40
        transition-all duration-500
      "
    />
  </div>
);

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute left-1/3 top-1/3 w-[40%] h-[30%] bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-blue-100/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute right-1/4 bottom-1/3 w-[35%] h-[25%] bg-gradient-to-br from-pink-100/25 via-purple-100/15 to-orange-100/25 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-3xl opacity-70" 
             style={{
               background: "radial-gradient(ellipse at center, rgba(244, 114, 182, 0.6) 0%, rgba(251, 207, 232, 0.4) 30%, rgba(253, 186, 116, 0.3) 60%, rgba(255, 255, 255, 0.1) 85%, transparent 100%)"
             }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            Who have we designed{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Deckoviz
            </span>{" "}
            for
          </h1>
        </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  {mainDesignedFor.map((item, index) => (
    <DesignedCard
      key={index}
      title={item.title}
      description={item.description}
      gradient={item.gradient}
      image={item.image}
      index={index}
    />
  ))}
</div>


        {!showMore && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowMore(true)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:text-purple-700 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="transform transition-transform duration-300 group-hover:translate-y-1">
                <ChevronDown size={20} />
              </span>
              <span className="text-sm">See More</span>
            </button>
          </div>
        )}

       {showMore && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-500 mb-12">
    {additionalDesignedFor.map((item, index) => (
      <DesignedCard
        key={`additional-${index}`}
        title={item.title}
        description={item.description}
        gradient={item.gradient}
        image={item.image}
        index={index + 6}
      />
    ))}
  </div>
)}

        {showMore && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowMore(false)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:text-purple-700 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="transform transition-transform duration-300 group-hover:-translate-y-1">
                <ChevronUp size={20} />
              </span>
              <span className="text-sm">See Less</span>
            </button>
          </div>
        )}
        
        <div className="text-center mt-16">
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              And so, in essence, we have designed Deckoviz to be for those who want more{" "}
              <span className="text-purple-600 font-semibold">life in their life</span>, more{" "}
              <span className="text-pink-600 font-semibold">magic in their moments.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg font-semibold">
              <span className="text-indigo-600">Deckoviz for You,</span>
              <span className="text-purple-600">Deckoviz for All.</span>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling gallery added here */}
        <ScrollingImageGallery />

      </div>
    </section>
  );
};

export default DesignedFor;