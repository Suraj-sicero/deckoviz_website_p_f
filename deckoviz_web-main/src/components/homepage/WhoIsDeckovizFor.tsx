"use client"

import type React from "react"
import { Home, Hotel, Building2, Sofa, Coffee, ShoppingBag, Briefcase, Heart, Sparkles } from "lucide-react"

const WhoIsDeckovizFor: React.FC = () => {
  const segments = [
    {
      icon: <Home size={24} />,
      title: "Homeowners and Renters",
      description:
        "For those who want to infuse their homes with the magic of generative AI and deeply personal art. Whether you're craving tranquility, inspiration, or vibrant energy—Deckoviz transforms your space to match your inner world.",
      gradient: "bg-gradient-to-br from-pink-200 via-purple-100 to-pink-300",
    },
    {
      icon: <Hotel size={24} />,
      title: "Hotels and Hospitality Spaces",
      description:
        "Elevate lobbies, suites, lounges, and premium experiences with dynamic, ever-evolving visuals that captivate guests, spark conversation, and express your brand's essence.",
      gradient: "bg-gradient-to-br from-purple-200 via-blue-100 to-purple-300",
    },
    {
      icon: <Building2 size={24} />,
      title: "Real Estate Developers",
      description:
        "Bring showrooms and model homes to life with smart art that adapts to buyer personas, elevates staging, and showcases the future of elegant, tech-forward living.",
      gradient: "bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300",
    },
    {
      icon: <Sofa size={24} />,
      title: "Electronics & Home Decor Stores",
      description:
        "Add an irresistible edge to your showroom. Demo how tech and decor beautifully blend—and sell more by showing what's possible.",
      gradient: "bg-gradient-to-br from-orange-200 via-pink-100 to-orange-300",
    },
    {
      icon: <Coffee size={24} />,
      title: "Restaurants & Cafes",
      description:
        "Create an unforgettable vibe. Use AI-powered visual storytelling to enhance ambiance, reinforce brand identity, and shape customer moods—from cozy to high-energy.",
      gradient: "bg-gradient-to-br from-purple-200 via-pink-100 to-purple-300",
    },
    {
      icon: <ShoppingBag size={24} />,
      title: "Shops and Boutiques",
      description:
        "Design your atmosphere like a pro—whether it's minimalist chic or artsy and vibrant. Enhance customer experience and stay memorable with every glance.",
      gradient: "bg-gradient-to-br from-pink-200 via-orange-100 to-pink-300",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Offices & Co-Working Spaces",
      description:
        "Boost creativity, calm, and clarity. From focused productivity modes to ambient inspiration, Deckoviz supports emotional and mental wellness at work.",
      gradient: "bg-gradient-to-br from-blue-200 via-purple-100 to-blue-300",
    },
    {
      icon: <Heart size={24} />,
      title: "Studios, Clinics & Schools",
      description:
        "Whether you're running a yoga studio, a therapy office, or a classroom—Deckoviz helps set the right tone. Calm, uplift, or energize your space, naturally and beautifully.",
      gradient: "bg-gradient-to-br from-green-200 via-teal-100 to-green-300",
    },
  ]

  const getComplexGradient = (index: number): string => {
    const gradients = [
      // Homeowners - Pink to purple with soft transitions
      "radial-gradient(ellipse at top left, #fce7f3 0%, #f3e8ff 30%, #fce7f3 60%, #f9a8d4 100%)",

      // Hotels - Purple to blue with light tones
      "radial-gradient(ellipse at top right, #e9d5ff 0%, #dbeafe 40%, #e9d5ff 70%, #c4b5fd 100%)",

      // Real Estate - Pink to rose with gentle blending
      "radial-gradient(ellipse at bottom left, #fce7f3 0%, #ffe4e6 35%, #fce7f3 65%, #f9a8d4 100%)",

      // Electronics - Orange to pink with warm tones
      "radial-gradient(ellipse at center, #fed7aa 0%, #fce7f3 45%, #fed7aa 75%, #fb923c 100%)",

      // Restaurants - Purple to pink with vibrant colors
      "radial-gradient(ellipse at top, #e9d5ff 0%, #fce7f3 40%, #e9d5ff 70%, #c084fc 100%)",

      // Shops - Pink to orange with warm transitions
      "radial-gradient(ellipse at bottom right, #fce7f3 0%, #fed7aa 35%, #fce7f3 65%, #f472b6 100%)",

      // Offices - Blue to purple with cool tones
      "radial-gradient(ellipse at left, #dbeafe 0%, #e9d5ff 45%, #dbeafe 75%, #93c5fd 100%)",

      // Studios - Green to teal with fresh, calming colors
      "radial-gradient(ellipse at right, #bbf7d0 0%, #a7f3d0 35%, #5eead4 70%, #2dd4bf 100%)",
    ]

    return gradients[index] || gradients[0]
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Who is <span className="bg-[#7634e0] bg-clip-text text-transparent">Deckoviz</span> For?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="relative group rounded-2xl p-8 py-12 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden flex flex-col h-full"
              style={{
                background: getComplexGradient(index),
              }}
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
 <div className="group/link cursor-pointer">
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
              
            </div>
          ))}
        </div>

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
        `
      }} />
    </section>
  )
}

export default WhoIsDeckovizFor