"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DesignedFor: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const mainDesignedFor = [
    {
      title: "For those seeking more beauty and meaning, more wonder and joy",
      gradient: "from-pink-200 via-purple-100 to-pink-300",
      image: "https://i.pinimg.com/736x/e8/28/11/e828112ea1446c27a69ce9fd789804ac.jpg"
    },
    {
      title: "For those who want a personal painter to paint their inner worlds and dreams, their hopes and their journeys",
      gradient: "from-purple-200 via-blue-100 to-indigo-300",
      image: "https://i.pinimg.com/736x/13/ab/dc/13abdc4a9b6360c442aba267f4d53386.jpg"
    },
    {
      title: "For those who want to write odes to their memories",
      gradient: "from-orange-200 via-pink-100 to-purple-300",
      image: "https://i.pinimg.com/736x/d3/2d/cb/d32dcb7469c4b31f7979eb98dbdb557c.jpg"
    },
    {
      title: "For those who see the art in their photos, and those who want to see more of it",
      gradient: "from-green-200 via-emerald-100 to-teal-300",
      image: "https://i.pinimg.com/736x/97/da/5c/97da5c3d3494613f730da795965b3d87.jpg"
    },
    {
      title: "For those who want more dynamism, novelty, vividity, animation, in their spaces",
      gradient: "from-purple-200 via-pink-100 to-rose-300",
      image: "https://i.pinimg.com/736x/ed/3d/1f/ed3d1f63878a4f606ef8ed170834b330.jpg"
    },
    {
      title: "For those who want spaces that transform and evolve, according to moods and states, times and dates",
      gradient: "from-blue-200 via-purple-100 to-pink-300",
      image: "https://www.istitutomarangoni.com/marangoni/entities/course/Digital_art_direction.png"
    }
  ];

  const additionalDesignedFor = [
    {
      title: "For those who want more soul, more spirit, in their spaces",
      gradient: "from-indigo-200 via-purple-100 to-blue-300",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop"
    },
    {
      title: "For lovers of beauty, for lovers of art",
      gradient: "from-pink-200 via-rose-100 to-red-300",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=400&fit=crop"
    },
    {
      title: "For those who love exploring and painting around the possibilities of AI and tech",
      gradient: "from-cyan-200 via-blue-100 to-purple-300",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=400&fit=crop"
    },
    {
      title: "For those seeking more intentionality, depth and love",
      gradient: "from-purple-200 via-pink-100 to-orange-300",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=400&fit=crop"
    },
    {
      title: "For parents and families who want to infuse family time family rituals",
      gradient: "from-yellow-200 via-orange-100 to-pink-300",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=400&fit=crop"
    },
    {
      title: "For couples who want to infuse their relationship with more joy, intimacy, growth, beauty, passion, and romance",
      gradient: "from-rose-200 via-pink-100 to-purple-300",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=400&fit=crop"
    },
    {
      title: "For those seeking more groundedness or passion, more joy and love, more calm and inspiration",
      gradient: "from-green-200 via-teal-100 to-blue-300",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop"
    },
    {
      title: "For those who want every room in their home, every space, to be evolving and sacred in its own special way",
      gradient: "from-purple-200 via-indigo-100 to-blue-300",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop"
    },
    {
      title: "For those into personal growth and journalling, vision boards and goal setting",
      gradient: "from-orange-200 via-yellow-100 to-pink-300",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop"
    },
    {
      title: "For minimalists who want to pack a thousand things in one frame",
      gradient: "from-gray-200 via-purple-100 to-gray-300",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=400&fit=crop"
    }
  ];

  const DesignedCard: React.FC<{ title: string; gradient: string; image: string; index: number }> = ({ 
    title, 
    gradient, 
    image, 
    index 
  }) => (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer border border-gray-100`}
      style={{ height: '380px' }}
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <img 
          src={image}
          alt="Inspiration"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 h-32 flex items-center justify-center">
        <p className="text-lg leading-relaxed text-center bg-gradient-to-r from-gray-700 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-pink-500 group-hover:to-orange-500 transition-all duration-500 font-medium">
          {title}
        </p>
      </div>

      {/* Subtle hover border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-purple-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Subtle background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/3 top-1/3 w-[40%] h-[30%] bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-blue-100/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute right-1/4 bottom-1/3 w-[35%] h-[25%] bg-gradient-to-br from-pink-100/25 via-purple-100/15 to-orange-100/25 rounded-full blur-3xl opacity-40"></div>
        
        {/* Central gradient splash - like your other components */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-3xl opacity-70" 
             style={{
               background: "radial-gradient(ellipse at center, rgba(244, 114, 182, 0.6) 0%, rgba(251, 207, 232, 0.4) 30%, rgba(253, 186, 116, 0.3) 60%, rgba(255, 255, 255, 0.1) 85%, transparent 100%)"
             }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            Who have we designed{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Deckoviz
            </span>{" "}
            for
          </h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mainDesignedFor.map((item, index) => (
            <DesignedCard
              key={index}
              title={item.title}
              gradient={item.gradient}
              image={item.image}
              index={index}
            />
          ))}
        </div>

        {/* See More Button - only show when not expanded */}
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

        {/* Additional Cards (Expandable) */}
        {showMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-500 mb-12">
            {additionalDesignedFor.map((item, index) => (
              <DesignedCard
                key={`additional-${index}`}
                title={item.title}
                gradient={item.gradient}
                image={item.image}
                index={index + 6}
              />
            ))}
          </div>
        )}

        {/* See Less Button - only show when expanded */}
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

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              And so, in essence, we have designed Deckoviz to be for those who want more{" "}
              <span className="text-purple-600 font-semibold">life in their life</span>, more{" "}
              <span className="text-pink-600 font-semibold">magic in their moments</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg font-semibold">
              <span className="text-indigo-600">Deckoviz for You,</span>
              <span className="text-purple-600">Deckoviz for All</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignedFor;