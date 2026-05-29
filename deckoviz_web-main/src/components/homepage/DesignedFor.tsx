"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";




// REFINED: Component for the scrolling image gallery
const ScrollingImageGallery: React.FC = () => {
  const navigate = useNavigate();
  
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
const sideContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};
const sideCard = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const DesignedCard: React.FC<{
  title: string;
  caption: string;
  gradient: string;
  image: string;
  index: number;
}> = ({ title, caption, image, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.08 }}
    className={`group relative rounded-3xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer`}
    style={{
      height: "430px",
      background: "rgba(255, 255, 255, 0.45)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      borderTop: "1px solid rgba(255, 255, 255, 1)",
      boxShadow: "0 10px 30px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    }}
    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 22px 50px rgba(37, 99, 235, 0.5), 0 0 25px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)"}
    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.8)"}
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
      <p className="text-lg leading-relaxed bg-gradient-to-r from-[#1B2A4A] to-[#2563EB] bg-clip-text text-transparent font-medium">
        {title}
      </p>

      <p className="text-sm text-slate-800 leading-relaxed opacity-90">
        {caption}
      </p>
    </div>

    <div className="absolute inset-0 rounded-2xl border-2 border-violet-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </motion.div>
);

const DesignedFor: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    setLeftImageIndex((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * frameImages.length);
      } while (next === prev);
      return next;
    });
  }, 4000);

  return () => clearInterval(interval);
}, []);

const frameImages = [
  "/images/frame_l (1).png",
  "/images/frame_l (2).png",
  "/images/frame_l (3).png",
  "/images/frame_l (4).png",
  "/images/frame_l (5).png",
  "/images/frame_l (6).png",
  "/images/frame_l (7).png",
  "/images/frame_l (8).png",
];

  const mainDesignedFor = [
    {
      title: "For those seeking more beauty and meaning, more wonder and joy",
      caption:
        " More intentional living. More love. More presence in everyday moments.",
      gradient: "from-pink-200 via-violet-100 to-pink-300",
      image:
        "https://i.pinimg.com/736x/e8/28/11/e828112ea1446c27a69ce9fd789804ac.jpg",
    },
    {
      title:
        "For those who want a personal painter to paint their inner worlds and dreams, their hopes and their journeys",
      gradient: "from-violet-200 via-blue-100 to-indigo-300",
      caption:
        " More self-expression. More creativity. More inspiration in everyday life.",
      image:
        "https://i.pinimg.com/736x/13/ab/dc/13abdc4a9b6360c442aba267f4d53386.jpg",
    },
    {
      title: "For those who want to write odes to their memories",
      caption:
        " More nostalgia. More sentimentality. More connection to the past.",
      gradient: "from-orange-200 via-pink-100 to-indigo-300",
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
      gradient: "from-violet-200 via-pink-100 to-rose-300",
      image:
        "https://i.pinimg.com/736x/ed/3d/1f/ed3d1f63878a4f606ef8ed170834b330.jpg",
    },
    {
      title:
        "For those who want spaces that transform and evolve, according to moods and states, times and dates",
      gradient: "from-blue-200 via-violet-100 to-pink-300",
      caption:
        " More adaptability. More fluidity. More responsiveness in everyday settings.",
      image:
        "https://www.istitutomarangoni.com/marangoni/entities/course/Digital_art_direction.png",
    },
  ];

  const additionalDesignedFor = [
    {
      title: "For those who want more soul, more spirit, in their spaces",
      gradient: "from-indigo-200 via-violet-100 to-blue-300",
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
      gradient: "from-cyan-200 via-blue-100 to-indigo-300",
      caption:
        " More innovation. More futurism. More exploration in everyday life.",
      image:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=400&fit=crop",
    },
    {
      title: "For those seeking more intentionality, depth and love",
      gradient: "from-violet-200 via-pink-100 to-orange-300",
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
      gradient: "from-rose-200 via-pink-100 to-indigo-300",
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
      gradient: "from-violet-200 via-indigo-100 to-blue-300",
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
      gradient: "from-gray-200 via-violet-100 to-gray-300",
      caption:
        " More simplicity. More elegance. More functionality in everyday design.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=400&fit=crop",
    },
  ];

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >


      {/* Enterprise Indigo Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[90px]" style={{ background: "rgba(99, 102, 241, 0.45)" }} />
        <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: "rgba(37, 99, 235, 0.40)" }} />
        <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[90px]" style={{ background: "rgba(79, 70, 229, 0.35)" }} />
        <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[80px]" style={{ background: "rgba(59, 130, 246, 0.40)" }} />
        <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(99, 102, 241, 0.35)" }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div 
        className="relative z-10 max-w-[85rem] mx-auto px-6 md:px-12 py-12 md:py-16 rounded-[3rem]"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 25px 60px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Who have we designed{" "}
            <span className="italic bg-gradient-to-r from-[#1B2A4A] to-[#2563EB] bg-clip-text text-transparent">
              Deckoviz
            </span>{" "}
            for
          </h1>
        </div>

        {/* Main Grid */}
        <motion.div
  initial="visible"
  animate="visible"
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
>
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
        </motion.div>

        {/* See More Button - only show when not expanded */}
        {!showMore && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowMore(true)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border text-gray-800 font-medium hover:text-violet-800 transition-all duration-300 shadow-sm hover:shadow-md"
              style={{
                background: "rgba(255,255,255,0.30)",
                backdropFilter: "blur(12px) saturate(180%)",
                borderColor: "rgba(255,255,255,0.5)"
              }}
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
          <motion.div
  variants={sideContainer}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
>
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
          </motion.div>
        )}

        {/* See Less Button - only show when expanded */}
        {showMore && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowMore(false)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border text-gray-800 font-medium hover:text-violet-800 transition-all duration-300 shadow-sm hover:shadow-md"
              style={{
                background: "rgba(255,255,255,0.30)",
                backdropFilter: "blur(12px) saturate(180%)",
                borderColor: "rgba(255,255,255,0.5)"
              }}
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
              <span className="text-violet-600 font-semibold">
                life in their life
              </span>
              , more{" "}
              <span className="text-pink-600 font-semibold">
                magic in their moments.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg font-semibold">
              <span className="text-indigo-600">Deckoviz for You,</span>
              <span className="text-violet-600">Deckoviz for All.</span>
            </div>
          </div>
        </div>
        
        <div className="relative mt-8">
          <div className="w-full relative z-20">
            <ScrollingImageGallery />
          </div>
        </div>

{/* Dynamic Frame Showcase */}
<div className="flex justify-center mt-20">
  <div className="relative w-[520px] rounded-2xl overflow-hidden">

    {/* glow */}
    <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-violet-400/30 via-pink-300/30 to-yellow-300/30 blur-2xl opacity-70"></div>

    {/* FULL furniture image */}
    <img
      src="/images/furniture-left.png"
      alt="Living room"
      className="w-full h-auto object-contain rounded-2xl"
    />

    {/* Artwork inside frame */}
    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[57%] h-[57%] overflow-hidden">
      {frameImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Frame artwork ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-1000 ${
            index === leftImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>

  </div>
</div>
      </div>
    </section>
  );
};

export default DesignedFor;
