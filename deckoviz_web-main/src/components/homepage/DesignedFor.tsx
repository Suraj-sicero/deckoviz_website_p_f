"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

/* ================= FLOATING MINIMALIST BUTTON ================= */

const FloatingMinimalistButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        absolute 
        right-6 
        top-24 
        z-20
        animate-float
      "
    >
      <button
        onClick={() => navigate("/minimalist")}
        className="
          px-6 py-4
          rounded-[36px]
          bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500
          text-white text-sm font-semibold
          shadow-[0_0_20px_rgba(168,85,247,0.7)]
          hover:shadow-[0_0_35px_rgba(236,72,153,0.9)]
          transition-all duration-500
          backdrop-blur-md
        "
      >
        <div className="flex items-center gap-2 text-left leading-tight">
          <span className="text-xl">📱</span>
          <div>
            <p className="text-xs opacity-90">
              If This Is the Only Screen You Keep
            </p>
            <p className="text-[11px] font-light opacity-80">
              — For the Minimalists
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

/* ================= SCROLLING GALLERY ================= */

const ScrollingImageGallery: React.FC = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80", alt: "Abstract art" },
    { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80", alt: "Gradient art" },
    { src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80", alt: "Texture art" },
    { src: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&q=80", alt: "Surreal art" },
    { src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80", alt: "Abstract geometry" }
  ];

  const extendedImages = [...images, ...images];

  return (
    <div className="mt-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800">
        A Glimpse into the Possibilities
      </h2>

      <div
        className="w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="flex flex-nowrap animate-scroll">
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

/* ================= MAIN COMPONENT ================= */

const DesignedFor: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const mainDesignedFor = [
    {
      title: "For those seeking more beauty and meaning",
      description:
        "Spaces that do more than exist — they move you, ground you, and quietly inspire wonder every day.",
      image: "https://i.pinimg.com/736x/e8/28/11/e828112ea1446c27a69ce9fd789804ac.jpg",
    },
    {
      title: "For those who want a personal painter",
      description:
        "An AI artist that translates dreams, moods, memories, and inner worlds into living visual stories.",
      image: "https://i.pinimg.com/736x/13/ab/dc/13abdc4a9b6360c442aba267f4d53386.jpg",
    },
    {
      title: "For those who want to honor their memories",
      description:
        "Moments that deserve more than storage — made visible, alive, and meaningfully revisited.",
      image: "https://i.pinimg.com/736x/d3/2d/cb/d32dcb7469c4b31f7979eb98dbdb557c.jpg",
    },
    {
      title: "For those who see art inside their photos",
      description:
        "Reveal what already exists — elevate everyday images into expressive, emotional art.",
      image: "https://i.pinimg.com/736x/97/da/5c/97da5c3d3494613f730da795965b3d87.jpg",
    },
    {
      title: "For those who want movement in their spaces",
      description:
        "Visuals that evolve, breathe, and shift — bringing novelty without chaos, energy without noise.",
      image: "https://i.pinimg.com/736x/ed/3d/1f/ed3d1f63878a4f606ef8ed170834b330.jpg",
    },
    {
      title: "For spaces that respond to life itself",
      description:
        "Art that adapts to moods, rituals, seasons, and moments — never static, always intentional.",
      image: "https://www.istitutomarangoni.com/marangoni/entities/course/Digital_art_direction.png",
    },
  ];

  const DesignedCard = ({ title, description, image }: any) => (
    <div className="group rounded-2xl overflow-hidden bg-white border shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.03]">
      <div className="h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-6 text-center space-y-3">
        <h3 className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  return (
    <section className="relative py-16 bg-white overflow-hidden">


  <FloatingMinimalistButton />

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* rest of your section */}
  </div>


      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Who have we designed{" "}
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Deckoviz
          </span>{" "}
          for
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainDesignedFor.map((item, i) => (
            <DesignedCard key={i} {...item} />
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Designed for those who want more{" "}
            <span className="text-purple-600 font-semibold">life in their life</span>,
            more{" "}
            <span className="text-pink-600 font-semibold">magic in their moments.</span>
          </p>
          <div className="font-semibold text-indigo-600">
            Deckoviz for You, Deckoviz for All.
          </div>
        </div>

        <ScrollingImageGallery />
      </div>

    </section>
  );
};

export default DesignedFor;
