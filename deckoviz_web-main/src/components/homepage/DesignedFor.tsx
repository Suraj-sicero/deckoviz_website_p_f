"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
/* ================= FLOATING NERVOUS SYSTEM BUTTON (LEFT near gallery) ================= */

const FloatingNervousSystemButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute left-0 -top-[10%] z-30 animate-float">
      <button
        onClick={() => navigate("/nervous-system")}
        className="
          relative group
          px-6 py-2
          rounded-full
          bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400
          text-white
          shadow-[0_15px_40px_rgba(34,197,94,0.45)]
          hover:shadow-[0_25px_60px_rgba(16,185,129,0.7)]
          transition-all duration-500
          backdrop-blur-xl
          max-w-[360px]
          overflow-hidden
        "
      >
        {/* glow aura */}
        <div
          className="
          absolute inset-0
          bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300
          opacity-40 blur-xl
          group-hover:opacity-70
          transition
        "
        />

        {/* shimmer */}
        <div
          className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          -translate-x-full group-hover:translate-x-full
          transition-transform duration-1000
        "
        />

        <div className="relative flex items-center gap-3 text-left">
          {/* Brain bubble */}
          <div
            className="
          
            w-10 h-10 rounded-full
            bg-white/25 backdrop-blur-md
            flex items-center justify-center
            shadow-inner
          "
          >
            <span className="text-xl">🧠</span>
          </div>

          {/* Text */}
          <div className="leading-tight">
            <p className="text-xs opacity-90 tracking-wide">
              What If Your Home Had a
            </p>
            <p className="text-sm font-bold tracking-wide">Nervous System?</p>
          </div>
        </div>
      </button>
    </div>
  );
};

const FloatingMinimalistButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className=" absolute right-6 top-8 z-20 animate-float ">
      {" "}
      <button
        onClick={() => navigate("/minimalist")}
        className=" px-10 py-3 rounded-[36px] bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 text-white text-sm font-semibold shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:shadow-[0_0_35px_rgba(236,72,153,0.9)] transition-all duration-500 backdrop-blur-md "
      >
        {" "}
        <div className="flex items-center gap-2 text-left leading-tight">
          {" "}
          <span className="text-xl">📱</span>{" "}
          <div>
            {" "}
            <p className="text-xs opacity-90">
              {" "}
              the Only Screen You Keep{" "}
            </p>{" "}
            <p className="text-[11px] font-light opacity-80">
              {" "}
              For the Minimalists{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </button>{" "}
    </div>
  );
};
// REFINED: Component for the scrolling image gallery
const ScrollingImageGallery: React.FC = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
      alt: "Abstract art piece",
    },

    {
      src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80",
      alt: "Gradient paint strokes",
    },

    {
      src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80",
      alt: "Close-up of a textured painting",
    },
    {
      src: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&q=80",
      alt: "Surreal digital art composition",
    },
    {
      src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80",
      alt: "Abstract geometric pattern",
    },
  ];

  // Duplicate images for a seamless loop
  const extendedImages = [...images, ...images];

  return (
    <div className="mt-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800">
        A Glimpse into the Possibilities
      </h2>

      {/* This container hides the overflow and applies the fade effect */}
      <div
        className="w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
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
      title: "For those seeking more beauty and meaning, more wonder and joy",
      caption:
        " More intentional living. More love. More presence in everyday moments.",
      gradient: "from-pink-200 via-purple-100 to-pink-300",
      image:
        "https://i.pinimg.com/736x/e8/28/11/e828112ea1446c27a69ce9fd789804ac.jpg",
    },
    {
      title:
        "For those who want a personal painter to paint their inner worlds and dreams, their hopes and their journeys",
      gradient: "from-purple-200 via-blue-100 to-indigo-300",
      caption:
        " More self-expression. More creativity. More inspiration in everyday life.",
      image:
        "https://i.pinimg.com/736x/13/ab/dc/13abdc4a9b6360c442aba267f4d53386.jpg",
    },
    {
      title: "For those who want to write odes to their memories",
      caption:
        " More nostalgia. More sentimentality. More connection to the past.",
      gradient: "from-orange-200 via-pink-100 to-purple-300",
      image:
        "https://i.pinimg.com/736x/d3/2d/cb/d32dcb7469c4b31f7979eb98dbdb557c.jpg",
    },
    {
      title:
        "For those who see the art in their photos, and those who want to see more of it",
      gradient: "from-green-200 via-emerald-100 to-teal-300",
      caption:
        " More aesthetics. More visual poetry. More beauty in everyday scenes.",
      image:
        "https://i.pinimg.com/736x/97/da/5c/97da5c3d3494613f730da795965b3d87.jpg",
    },
    {
      title:
        "For those who want more dynamism, novelty, vividity, animation, in their spaces",
      caption:
        " More energy. More life. More movement in everyday environments.",
      gradient: "from-purple-200 via-pink-100 to-rose-300",
      image:
        "https://i.pinimg.com/736x/ed/3d/1f/ed3d1f63878a4f606ef8ed170834b330.jpg",
    },
    {
      title:
        "For those who want spaces that transform and evolve, according to moods and states, times and dates",
      gradient: "from-blue-200 via-purple-100 to-pink-300",
      caption:
        " More adaptability. More fluidity. More responsiveness in everyday settings.",
      image:
        "https://www.istitutomarangoni.com/marangoni/entities/course/Digital_art_direction.png",
    },
  ];

  const additionalDesignedFor = [
    {
      title: "For those who want more soul, more spirit, in their spaces",
      gradient: "from-indigo-200 via-purple-100 to-blue-300",
      caption:
        " More depth. More meaning. More connection to the transcendent.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
    },
    {
      title: "For lovers of beauty, for lovers of art",
      caption:
        " More aesthetics. More visual poetry. More beauty in everyday scenes.",
      gradient: "from-pink-200 via-rose-100 to-red-300",
      image:
        "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=400&fit=crop",
    },
    {
      title:
        "For those who love exploring and painting around the possibilities of AI and tech",
      gradient: "from-cyan-200 via-blue-100 to-purple-300",
      caption:
        " More innovation. More futurism. More exploration in everyday life.",
      image:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=400&fit=crop",
    },
    {
      title: "For those seeking more intentionality, depth and love",
      gradient: "from-purple-200 via-pink-100 to-orange-300",
      caption:
        " More mindfulness. More presence. More connection in everyday moments.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=400&fit=crop",
    },
    {
      title:
        "For parents and families who want to infuse family time family rituals",
      gradient: "from-yellow-200 via-orange-100 to-pink-300",
      caption: " More bonding. More traditions. More joy in family moments.",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=400&fit=crop",
    },
    {
      title:
        "For couples who want to infuse their relationship with more joy, intimacy, growth, beauty, passion, and romance",
      gradient: "from-rose-200 via-pink-100 to-purple-300",
      caption: " More connection. More love. More shared experiences.",
      image:
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=400&fit=crop",
    },
    {
      title:
        "For those seeking more groundedness or passion, more joy and love, more calm and inspiration",
      gradient: "from-green-200 via-teal-100 to-blue-300",
      caption: " More balance. More harmony. More well-being in everyday life.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop",
    },
    {
      title:
        "For those who want every room in their home, every space, to be evolving and sacred in its own special way",
      gradient: "from-purple-200 via-indigo-100 to-blue-300",
      caption:
        " More sanctity. More uniqueness. More atmosphere in everyday environments.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop",
    },
    {
      title:
        "For those into personal growth and journalling, vision boards and goal setting",
      gradient: "from-orange-200 via-yellow-100 to-pink-300",
      caption:
        " More motivation. More clarity. More focus in everyday pursuits.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop",
    },
    {
      title: "For minimalists who want to pack a thousand things in one frame",
      gradient: "from-gray-200 via-purple-100 to-gray-300",
      caption:
        " More simplicity. More elegance. More functionality in everyday design.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=400&fit=crop",
    },
  ];

  const DesignedCard: React.FC<{
    title: string;
    caption: string;
    gradient: string;
    image: string;
    index: number;
  }> = ({ title, caption, image }) => (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer border border-gray-100`}
      style={{ height: "430px" }}
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
      <div className="p-6 flex flex-col items-center justify-center text-center gap-3">
        <p className="text-lg leading-relaxed bg-gradient-to-r from-gray-700 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
          {title}
        </p>

        <p className="text-sm text-slate-800 leading-relaxed opacity-90">
          {caption}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-purple-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <FloatingMinimalistButton />

      <div className="absolute inset-0">
        <div className="absolute left-1/3 top-1/3 w-[40%] h-[30%] bg-gradient-to-br from-purple-100/30 via-pink-100/20 to-blue-100/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute right-1/4 bottom-1/3 w-[35%] h-[25%] bg-gradient-to-br from-pink-100/25 via-purple-100/15 to-orange-100/25 rounded-full blur-3xl opacity-40"></div>

        {/* Central gradient splash - like your other components */}
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244, 114, 182, 0.6) 0%, rgba(251, 207, 232, 0.4) 30%, rgba(253, 186, 116, 0.3) 60%, rgba(255, 255, 255, 0.1) 85%, transparent 100%)",
          }}
        ></div>
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
              caption={item.caption}
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
                caption={item.caption}
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
              And so, in essence, we have designed Deckoviz to be for those who
              want more{" "}
              <span className="text-purple-600 font-semibold">
                life in their life
              </span>
              , more{" "}
              <span className="text-pink-600 font-semibold">
                magic in their moments.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg font-semibold">
              <span className="text-indigo-600">Deckoviz for You,</span>
              <span className="text-purple-600">Deckoviz for All.</span>
            </div>
          </div>
        </div>

        <div className="relative mt-10">
          <FloatingNervousSystemButton />
          <ScrollingImageGallery />
        </div>
      </div>
    </section>
  );
};

export default DesignedFor;
