"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

// Button component with updated styles
const Button = ({
  variant,
  children,
  className = "",
  ...props
}: {
  variant: "primary" | "outline"
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => {

  // Both buttons: same height, width, font, border-radius, shadow
  const baseClasses =
  "inline-flex items-center justify-center font-medium transition-all duration-300 px-5 py-3 text-base rounded-xl shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[140px]"
  // Variant-specific
  const variantClasses = {
    primary:
      "border-1 border-gray-500 text-white hover:from-[#5a54d1] hover:to-[#3a8bc2] shadow-[0_2px_8px_0_rgba(76,110,245,0.10)]",
    outline:
      "bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100/60 shadow-[0_2px_8px_0_rgba(76,110,245,0.06)]",
  }
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// CountUp animation
const CountUp = ({
  from,
  to,
  duration,
  decimals = 0,
  suffix = "",
}: {
  from: number
  to: number
  duration: number
  decimals?: number
  suffix?: string
}) => {
  const [count, setCount] = useState<number>(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = from + (to - from) * progress
      setCount(currentCount)
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const Hero: React.FC = () => {
  const rotatingTexts = [
  "art canvas",
  "smart photo frame",
  "storytelling portal",
  "mood setter",
  "Google TV",
];

const [rotatingIndex, setRotatingIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setRotatingIndex((prev) => (prev + 1) % rotatingTexts.length);
  }, 2500);

  return () => clearInterval(interval);
}, []);

  const [leftImageIndex, setLeftImageIndex] = useState(0)
  const [rightImageIndex, setRightImageIndex] = useState(0)

 const frameImages = [
  "/images/frame_l (1).png",
  "/images/frame_l (2).png",
  "/images/frame_l (3).png",
  "/images/frame_l (4).png",
  "/images/frame_l (5).png",
  "/images/frame_l (6).png",
  "/images/frame_l (7).png",
  "/images/frame_l (8).png",
  "/images/frame_l (9).png",
  "/images/frame_l (10).png",
  "/images/frame_l (11).png",
  "/images/frame_l (12).png",
  "/images/frame_l (13).png",
  "/images/frame_l (14).png",
  "/images/frame_l (15).png",
  "/images/frame_l (16).png",
  "/images/frame_l (17).png",
  "/images/frame_l (18).png",
  "/images/frame_l (19).png",
  "/images/frame_l (20).png",
  "/images/frame_l (21).png",
  "/images/frame_l (22).png",
  "/images/frame_l (23).png",
  "/images/frame_l (24).png",
  "/images/frame_l (25).png",
  "/images/frame_l (26).png",
  "/images/frame_l (27).png",
  "/images/frame_l (28).png",
]


  const rightImages = [
    "/images/righthero1.png",
    "/images/righthero7.png",
    "/images/righthero8.png",
    "/images/righthero4.png",
    "/images/righthero5.png",
    "/images/righthero6.png",
    "/images/righthero2.png",
    "/images/righthero3.png"
  ]

 useEffect(() => {
  const interval = setInterval(() => {
    // Generate random indices, ensuring they're different from current ones
    setLeftImageIndex((prev) => {
  let next;
  do {
    next = Math.floor(Math.random() * frameImages.length);
  } while (next === prev);
  return next;
});

    
    setRightImageIndex((prev) => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * rightImages.length);
      } while (newIndex === prev && rightImages.length > 1);
      return newIndex;
    });
  }, 4000);

  return () => clearInterval(interval);
}, []);

  return (
    <section className="py-14 md:py-12 lg:py-10 overflow-hidden relative bg-white">
      {/* CSS for the glowing button effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 5px rgba(138, 43, 226, 0.2), 
                        0 0 10px rgba(138, 43, 226, 0.2), 
                        0 0 15px rgba(138, 43, 226, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.6), 
                        0 0 30px rgba(138, 43, 226, 0.6), 
                        0 0 40px rgba(138, 43, 226, 0.4);
          }
          100% {
            box-shadow: 0 0 5px rgba(138, 43, 226, 0.2), 
                        0 0 10px rgba(138, 43, 226, 0.2), 
                        0 0 15px rgba(138, 43, 226, 0.2);
          }
        }
        .shop-now-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
      `}} />

      <div className="absolute inset-0 w-full h-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-violet-200 blur-3xl opacity-70"></div>
      </div>
      <div className="max-w-8xl mx-auto pl-0 pr-4 sm:pl-0 sm:pr-6 lg:pl-0 lg:pr-8 relative z-10">
        <div className="flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl mb-6 max-w-5xl pt-16 leading-tight">
  <span className="text-gray-900">
    Make Your Space Come Alive,
  </span>
  <br />
  <span className="bg-gradient-to-r from-[#9a5ffff9] to-indigo-500 bg-clip-text text-transparent">
    With Your Personal Art Frame
  </span>
</h1>
          {/* Subheading */}
   {/* Subheading */}
<p className="text-center text-gray-600 text-xl mb-3 max-w-3xl mx-auto leading-relaxed">
  Deckoviz DAS Portal is an{" "}
  <span className="text-purple-600 font-semibold">
    AI-powered art frame
  </span>{" "}
  that learns your taste and evolves with you, to paint your{" "}
  <span className="text-indigo-600 font-semibold">
    inner world, memories, and imagination
  </span>{" "}
  on your walls, as your evolving{" "}
  <span className="inline-block font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent transition-all duration-300 whitespace-nowrap">
    {rotatingTexts[rotatingIndex]}
  </span>.
</p>
          {/* Main content with images and stats */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 ml-4">
            {/* Left Image - Fixed container with smooth transitions */}
            <div className="relative flex-1 flex justify-start">
              {/* Gradient glow behind left image */}
              <div
                className="absolute inset-0 transform"
            style={{
  background: "radial-gradient(ellipse at center, rgba(147,51,234,0.4) 0%, rgba(236,72,153,0.3) 40%, rgba(168,85,247,0.25) 70%, transparent 100%)",
  filter: "blur(40px)",
  zIndex: -1,
}}
              />
              {/* Fixed size container to prevent layout shifts */}
              <div className="relative w-[660px] h-[560px]">

  {/* 1️⃣ Furniture / room (STATIC) */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-300/40 via-pink-200/30 to-yellow-200/40 blur-3xl opacity-70 -z-10" />
<img
  src="/images/furniture-left.png"
  alt="Living room"
  className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[122%] h-auto object-contain z-0"
/>

{/* 2️⃣ Artwork inside frame (CHANGES) */}
<div className="absolute top-[155px] left-1/2 -translate-x-1/2 w-[59%] h-[67%] z-10 overflow-hidden rounded-sm">

  {frameImages.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`Frame artwork ${index + 1}`}
      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${
        index === leftImageIndex ? "opacity-100" : "opacity-0"
      }`}
    />
  ))}


</div>
 

</div>

              </div>

            {/* Center content - Buttons and Stats */}
            <div className="flex flex-col items-center gap-9 max-w-md ml-11 mt-11">

              {/* Buttons */}
<div className="flex gap-5 justify-start ">
  <button 
    onClick={() => window.location.href = '/place-order'}
    className="group relative five-color-gradient border-2  border-gray-500 ring-1 ring-inset ring-blue-300 shadow-lg hover:shadow-xl shadow-purple-200/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden text-base min-w-[140px] shop-now-glow"
  >
    {/* Shimmer effect overlay */}
    <div className="absolute inset-0 right-[10%] bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
    
    <span className="relative z-10 flex items-center justify-center gap-2">
      Shop Now
    </span>
  </button>
  
  <Button 
    variant="outline" 
    className="bg-transparent text-gray-700 hover:bg-gray-50 group learn-more-hover"
    onClick={() => window.location.href = '/about'}
  >
    Learn More 
    <ArrowRight 
      size={18} 
      className="ml-2 transition-transform duration-300 group-hover:translate-x-2" 
    />
  </Button>
</div>

            {/* Enhanced Stats Card */}
<div className="relative group max-w-md w-full right-[10%]">
  {/* Subtle glow effect */}
  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
  
  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-6 border border-gray-200/50 w-full">               
    {/* Stats Grid */}
    <div className="space-y-4">
      {/* Top Row - Artworks and Star Rating */}
      <div className="grid grid-cols-2 gap-6">
        {/* Artworks */}
        <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
          <div className="text-4xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] bg-clip-text text-transparent mb-1">
            <CountUp from={0} to={2.5} duration={2} suffix="M+" />
          </div>
          <div className="text-gray-600 text-md font-medium">Items in Library</div>
          <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Star Rating */}
        <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] bg-clip-text text-transparent">
              <CountUp from={0} to={4.9} duration={2} decimals={1} />
            </div>
            <div className="text-yellow-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div className="text-gray-600 text-md font-medium">Star <br/> Rating</div>
          <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Bottom Row - Ways of Exploring (centered) */}
      <div className="flex justify-center">
        <div className="text-center group/stat hover:scale-105 transition-transform duration-300">
          <div className="text-6xl font-bold bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] bg-clip-text text-transparent mb-1">
            ∞
          </div>
          <div className="text-gray-600 text-md font-medium mr-3">Ways of Exploring</div>
          <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-2 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  </div>
</div>
              
            </div>

            {/* Right Image - Fixed container with smooth transitions */}
            <div className="relative flex-1 flex justify-end ml-8">
              {/* Gradient glow behind right image */}
              <div
                className="absolute inset-0 transform"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(147,51,234,0.15) 0%, rgba(236,72,153,0.10) 40%, rgba(168,85,247,0.08) 70%, transparent 100%)",
                  filter: "blur(40px)",
                  zIndex: -1,
                }}
              />
              {/* Fixed size container to prevent layout shifts */}
<div className="relative w-[420px] h-[420px] flex items-center justify-center -ml-9 mt-9">
                {rightImages.map((image, index) => (
                  <img  
                    key={index}
                    src={image}
                    alt={`Right artwork ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${
                      index === rightImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
