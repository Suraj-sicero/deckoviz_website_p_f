"use client"
import { useNavigate } from "react-router-dom";
import type React from "react"
import { GraduationCap, Hotel, Building2, Sofa, Coffee, ShoppingBag, Briefcase, Heart, Sparkles } from "lucide-react"
import { motion } from "framer-motion";

const trainContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // wagon timing
    },
  },
};

const trainCard = {
  hidden: {
    opacity: 0,
    x: 300,       // off-screen right
    rotate: 2,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // smooth cinematic easing
    },
  },
};

const WhoIsDeckovizFor: React.FC = () => {
  const navigate = useNavigate();

  const segments = [
    {
      icon: <GraduationCap size={24} />,
      title: "Learning Centres & Schools",
      description:
        "Transform educational spaces with inspiring, dynamic visuals that enhance learning environments. Create focused study atmospheres, spark creativity, and support different learning modes from calm concentration to energetic collaboration.",
      haloColorRgb: "96, 165, 250", // Blue glow
      route: "/deckoviz-for-schools"
    },
    {
      icon: <Hotel size={24} />,
      title: "Hotels and Hospitality Spaces",
      description:
        "Elevate lobbies, suites, lounges, and premium experiences with dynamic, ever-evolving visuals that captivate guests, spark conversation, and express your brand's essence.",
      haloColorRgb: "192, 132, 252", // Purple glow
      route: "/deckoviz-for-hotels"
    },
    {
      icon: <Building2 size={24} />,
      title: "Real Estate Developers",
      description:
        "Bring showrooms and model homes to life with smart art that adapts to buyer personas, elevates staging, and showcases the future of elegant, tech-forward living.",
      haloColorRgb: "244, 114, 182", // Pink glow
      route: "/deckoviz-for-realestate"
    },
    {
      icon: <Sofa size={24} />,
      title: "Electronics & Home Decor Stores",
      description:
        "Add an irresistible edge to your showroom. Demo how tech and decor beautifully blend and sell more by showing what's possible.",
      haloColorRgb: "251, 146, 60", // Orange glow
      route: "/deckoviz-for-retailstores"
    },
    {
      icon: <Coffee size={24} />,
      title: "Restaurants & Cafes",
      description:
        "Create an unforgettable vibe. Use AI-powered visual storytelling to enhance ambiance, reinforce brand identity, and shape customer moods from cozy to high-energy.",
      haloColorRgb: "216, 180, 254", // Lavender glow
      route: "/deckoviz-for-restaurants"
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Shops and Boutiques",
      description:
        "Design your atmosphere like a pro whether it's minimalist chic or artsy and vibrant. Enhance customer experience and stay memorable with every glance.",
      haloColorRgb: "249, 115, 22", // Amber glow
      route: "/deckoviz-for-retailstores"
    },
    {
      icon: <Briefcase size={24} />,
      title: "Offices & Co-Working Spaces",
      description:
        "Boost creativity, calm, and clarity. From focused productivity modes to ambient inspiration, Deckoviz supports emotional and mental wellness at work.",
      haloColorRgb: "129, 140, 248", // Indigo glow
      route: "/deckoviz-for-offices"
    },
    {
      icon: <Heart size={24} />,
      title: "Therapists & Wellness Centers",
      description:
        "Whether you're running a therapy office, wellness center, or healing space Deckoviz helps set the right tone. Calm, uplift, or energize your space, naturally and beautifully.",
      haloColorRgb: "52, 211, 153", // Emerald glow
      route: "/deckoviz-for-therapists"
    },
  ]

  const getComplexGradient = (index: number): string => {
    const gradients = [
      "radial-gradient(ellipse at top left, #dbeafe 0%, #e0e7ff 30%, #dbeafe 60%, #93c5fd 100%)",
      "radial-gradient(ellipse at top right, #e9d5ff 0%, #dbeafe 40%, #e9d5ff 70%, #c4b5fd 100%)",
      "radial-gradient(ellipse at bottom left, #fce7f3 0%, #ffe4e6 35%, #fce7f3 65%, #f9a8d4 100%)",
      "radial-gradient(ellipse at center, #fed7aa 0%, #fce7f3 45%, #fed7aa 75%, #fb923c 100%)",
      "radial-gradient(ellipse at top, #e9d5ff 0%, #fce7f3 40%, #e9d5ff 70%, #c084fc 100%)",
      "radial-gradient(ellipse at bottom right, #fce7f3 0%, #fed7aa 35%, #fce7f3 65%, #f472b6 100%)",
      "radial-gradient(ellipse at left, #dbeafe 0%, #e9d5ff 45%, #dbeafe 75%, #93c5fd 100%)",
      "radial-gradient(ellipse at right, #dcfce7 0%, #d1fae5 35%, #a7f3d0 70%, #6ee7b7 100%)",
    ]
    return gradients[index] || gradients[0]
  }

  const handleLearnMore = (route: string) => {
    window.location.href = route;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative text-center mb-16 flex items-center justify-center">
  
  {/* Floating Philosophy Bubble */}
  <button
    onClick={() => navigate("/your-life-played-back-gently")}
    className="
      hidden lg:flex
      absolute left-0 -top-6
      z-20
      px-6 py-3
      rounded-full
      bg-gradient-to-r from-rose-400 via-red-400 to-pink-500
      text-white
      text-sm font-medium
      shadow-[0_18px_50px_rgba(244,63,94,0.45)]
      hover:shadow-[0_28px_70px_rgba(244,63,94,0.6)]
      transition-all duration-500
      animate-[float_7s_ease-in-out_infinite]
      backdrop-blur
    "
  >
    Your Life, Played Back Gently ⚽
  </button>

  {/* Title */}
  <h2 className="text-4xl font-bold text-gray-900">
    Who is{" "}
    <span className="bg-[#7634e0] bg-clip-text text-transparent">
      Deckoviz
    </span>{" "}
    For?
  </h2>
</div>

<motion.div
  variants={trainContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
>
          {segments.map((segment, index) => (
            <motion.div
  key={index}
  variants={trainCard}
              className="relative group rounded-2xl p-8 py-12 transition-all duration-300 shadow-lg overflow-hidden flex flex-col h-full static-halo-card"
              style={{
                background: getComplexGradient(index),
                '--halo-color-rgb': segment.haloColorRgb,
              } as React.CSSProperties}
            >
              {/* Twinkling sparkle effect */}
              <div className="absolute top-4 right-4">
                <Sparkles 
                  size={40} 
                  className="text-white"
                  style={{
                    animation: 'twinkle 8s ease-in-out infinite'
                  }}
                />
              </div>

              {/* Icon */}
              <div className="bg-white bg-opacity-80 w-12 h-12 rounded-full flex items-center justify-center text-purple-700 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm -mt-3">
                {segment.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-3 text-gray-900 leading-tight">{segment.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{segment.description}</p>
              
              {/* Learn More Link - Bottom Right */}
              <div className="flex justify-end items-end translate-y-4">
                <div 
                  className="group/link cursor-pointer"
                  onClick={() => handleLearnMore(segment.route)}
                >
                  <span className="text-gray-700 hover:text-purple-700 font-medium text-sm transition-all duration-300 hover:font-semibold">
                    Learn more
                  </span>
                  <span className="ml-2 relative inline-block w-4 h-5 overflow-hidden">
                    <span className="absolute text-gray-600 group-hover/link:text-purple-600 group-hover/link:translate-x-6 group-hover/link:opacity-0 transition-all duration-500 ease-out">
                      →
                    </span>
                    <span className="absolute text-purple-600 -translate-x-6 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-500 ease-out delay-200">
                      →
                    </span>
                  </span>
                </div>
              </div>
              
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-xl text-gray-600 font-semibold">
            Deckoviz is for spaces that want to feel <span className="text-purple-600 font-bold">alive</span>.
          </p>
          <p className="text-lg text-gray-500">
            For people who value <span className="text-indigo-600 font-semibold">beauty</span>, <span className="text-purple-600 font-semibold">emotion</span>, and <span className="text-rose-500 font-semibold">expression</span>. For environments that deserve more than <span className="text-gray-700 font-semibold">static walls</span> and spaces.
          </p>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }

          .static-halo-card {
            /* This is the default, fixed glow */
            box-shadow: 0 0 25px 3px rgba(var(--halo-color-rgb), 0.4);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }

          .static-halo-card:hover {
            /* On hover, we intensify the glow and scale the card */
            transform: scale(1.05);
            box-shadow: 0 0 35px 8px rgba(var(--halo-color-rgb), 0.5);
          }

          
        `
      }} />
      <style dangerouslySetInnerHTML={{
  __html: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `
}} />

    </section>
  )
}

export default WhoIsDeckovizFor