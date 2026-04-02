"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

/* ---------------- Button Component ---------------- */

type ButtonProps = {
  variant: "primary" | "outline"
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 px-5 py-3 text-base rounded-xl shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[140px]"

  const variantClasses = {
    primary:
      "border border-gray-500 text-white hover:from-[#5a54d1] hover:to-[#3a8bc2] shadow-[0_2px_8px_0_rgba(76,110,245,0.10)]",
    outline:
      "bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100/60 shadow-[0_2px_8px_0_rgba(76,110,245,0.06)]",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/* ---------------- CountUp Animation ---------------- */

type CountUpProps = {
  from: number
  to: number
  duration: number
  decimals?: number
  suffix?: string
}

const CountUp: React.FC<CountUpProps> = ({
  from,
  to,
  duration,
  decimals = 0,
  suffix = "",
}) => {
  const [count, setCount] = useState<number>(from)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const current = from + (to - from) * progress

      setCount(current)

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

/* ---------------- Hero Component ---------------- */

const Hero: React.FC = () => {
  const rotatingTexts = [
    "art canvas",
    "smart photo frame",
    "storytelling portal",
    "mood setter",
    "Google TV",
  ]

  const [rotatingIndex, setRotatingIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const [leftImageIndex, setLeftImageIndex] = useState(0)
  const [rightImageIndex, setRightImageIndex] = useState(0)

  const frameImages = Array.from({ length: 22 }, (_, i) => `/images/herol (${i + 1}).png`)

  const rightImages = [
    "/images/righthero1.png",
    "/images/righthero2.png",
    "/images/righthero4.png",
    "/images/righthero5.png",
    "/images/righthero6.png",
    "/images/righthero7.png",
    "/images/righthero8.png",
    "/images/righthero9.png",
    "/images/righthero10.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImageIndex((prev) => {
        let next
        do {
          next = Math.floor(Math.random() * frameImages.length)
        } while (next === prev)
        return next
      })

      setRightImageIndex((prev) => {
        let next
        do {
          next = Math.floor(Math.random() * rightImages.length)
        } while (next === prev)
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const normalMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 840 560'%3E%3Cpath d='M80 16C80 7.16 87.16 0 96 0H824C832.84 0 840 7.16 840 16V464C840 472.84 832.84 480 824 480H780C751.16 480 744 487.16 744 496V544C744 552.84 736.84 560 728 560H16C7.16 560 0 552.84 0 544V96C0 87.16 7.16 80 16 80H64C72.84 80 80 72.84 80 64V16Z' fill='black'/%3E%3C/svg%3E")`

  const reversedMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 840 560'%3E%3Cpath d='M760 16C760 7.16 752.84 0 744 0H16C7.16 0 0 7.16 0 16V464C0 472.84 7.16 480 16 480H80C88.84 480 96 487.16 96 496V544C96 552.84 103.16 560 112 560H824C832.84 560 840 552.84 840 544V96C840 87.16 832.84 80 824 80H776C767.16 80 760 72.84 760 64V16Z' fill='black'/%3E%3C/svg%3E")`

  const currentMask =
    rightImageIndex % 2 === 0 ? normalMask : reversedMask
  return (
    <section className="py-14 md:py-12 lg:py-10 overflow-x-hidden relative bg-white">

      {/* Glow animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 5px rgba(138,43,226,.2); }
          50% { box-shadow: 0 0 25px rgba(138,43,226,.6); }
          100% { box-shadow: 0 0 5px rgba(138,43,226,.2); }
        }
        .shop-now-glow{
          animation:pulse-glow 3s infinite ease-in-out;
        }`,
        }}
      />

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-violet-200 blur-3xl opacity-70"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center overflow-x-hidden">

        {/* Heading */}
        <h1 className="text-center font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl mb-6 max-w-5xl pt-16 leading-tight">
          <div className="inline">
            <span className="text-black">Make Your Space Come </span>
            <span className="italic bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
              Alive
            </span>
            <span className="text-black">,</span>
          </div>
          <br />
          <div className="inline">
            <span className="text-black">With Your Personal </span>
            <span className="italic bg-gradient-to-r from-[#06B6D4] to-[#14B8A6] bg-clip-text text-transparent">
              Art Frame
            </span>
          </div>
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-600 text-xl mb-10 max-w-3xl leading-relaxed">
          Deckoviz DAS Portal is an{" "}
          <span className="text-purple-600 font-semibold">AI-powered art frame</span>{" "}
          that learns your taste and evolves with you, to paint your{" "}
          <span className="text-indigo-600 font-semibold">
            inner world, memories, and imagination
          </span>{" "}
          on your walls as your evolving{" "}
          <span className="inline-block font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            {rotatingTexts[rotatingIndex]}
          </span>.
        </p>

        {/* Layout */}
  <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 px-2">

          {/* LEFT IMAGE */}
        <div className="relative flex justify-center lg:justify-start w-full lg:w-auto lg:flex-1 max-w-[520px]">
          <div className="relative w-[300px] h-[260px] sm:w-[380px] sm:h-[320px] md:w-[460px] md:h-[380px] lg:w-[480px] lg:h-[420px]">

          {/* Room image */}
          <img
            src="/images/hero_left.png"
            alt="Living room"
            loading="lazy"
            className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[82%] h-auto object-contain rounded-[40px] sm:rounded-[50px] lg:rounded-[60px]"
          />

        {/* Frame artwork */}
          <div className="absolute 
            top-[19%] 
            left-[50.5%] -translate-x-1/2
            w-[50%] 
            h-[30.2%]
            overflow-hidden rounded-sm">

            {frameImages.map((img, index) => (
              <img
                key={index}
                src={img}
                loading="lazy"
                alt={`Frame artwork ${index}`}
                className={`absolute inset-0 w-full h-full object-fill transition-opacity duration-1000 ease-in-out will-change-opacity ${
                  index === leftImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

          </div>

          </div>
        </div>

          {/* CENTER */}
          <div className="flex flex-col items-center gap-9 w-full lg:w-auto max-w-md flex-shrink-0">
            <div className="flex gap-5 flex-wrap justify-center">
              <button
                onClick={() => (window.location.href = "/place-order")}
                className="group relative px-8 py-4 rounded-3xl font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-[length:200%_100%]" style={{ animation: 'gradient-flow 3s ease infinite' }} />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute w-2 h-2 bg-white/40 rounded-full top-1/4 left-1/4" style={{ animation: 'float-particle 3s ease-in-out infinite' }} />
                  <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full top-3/4 left-2/3" style={{ animation: 'float-particle-delayed 4s ease-in-out infinite 1s' }} />
                  <div className="absolute w-2 h-2 bg-white/40 rounded-full top-1/2 right-1/4" style={{ animation: 'float-particle-slow 5s ease-in-out infinite 0.5s' }} />
                </div>
                
                {/* Button text */}
                <span className="relative z-10 text-white drop-shadow-lg">Shop Now</span>
              </button>

              <button
                onClick={() => (window.location.href = "/about")}
                className="group relative px-8 py-4 rounded-3xl font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105"
              >
                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-3xl transition-all duration-300 group-hover:border-purple-400 group-hover:bg-white/90" />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute w-0 h-0 rounded-full bg-purple-400/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:w-full group-hover:h-full group-hover:scale-150 transition-all duration-700" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Button text with arrow */}
                <span className="relative z-10 flex items-center gap-2 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                  Learn More
                  <ArrowRight
                    size={20}
                    className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                  />
                </span>
              </button>
            </div>
            
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes gradient-flow {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                
                @keyframes float-particle {
                  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
                  50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
                }
                
                @keyframes float-particle-delayed {
                  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                  50% { transform: translateY(-15px) translateX(-10px); opacity: 0.7; }
                }
                
                @keyframes float-particle-slow {
                  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
                  50% { transform: translateY(-25px) translateX(5px); opacity: 0.9; }
                }
              `
            }} />

            {/* Stats Card - Enhanced with animations */}
            <div className="relative group w-full max-w-2xl">
              {/* Floating decorative elements */}
              <div className="absolute -left-8 top-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-60 blur-sm animate-float-slow" />
              <div className="absolute -right-6 bottom-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-50 blur-sm animate-float-slower" />
              <div className="absolute -bottom-4 left-1/3 w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 opacity-60 blur-sm animate-float-medium" />
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Main card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-12 py-10 border border-white/50 w-full overflow-hidden">
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                </div>
                
                {/* Top stats - Horizontal layout */}
                <div className="flex items-start justify-center gap-6 mb-10">
                  
                  {/* Items stat */}
                  <div className="relative flex flex-col items-center">
                    <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-2xl blur-lg" />
                    <div className="relative flex flex-col items-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 animate-pulse-slow leading-none">
                        <CountUp from={0} to={3} duration={2} suffix="M+" />
                      </div>
                      <div className="text-gray-600 font-medium text-sm whitespace-nowrap">Items in Library</div>
                    </div>
                  </div>

                  {/* Plus sign */}
                  <div className="text-4xl font-bold text-blue-600 mt-1">+</div>

                  {/* Rating stat */}
                  <div className="relative flex flex-col items-center">
                    <div className="absolute -inset-2 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-2xl blur-lg" />
                    <div className="relative flex flex-col items-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent mb-3 flex items-center gap-2 animate-pulse-slow leading-none">
                        <CountUp from={0} to={4.9} duration={2} decimals={1} />
                        <span className="text-4xl">✨</span>
                      </div>
                      <div className="text-gray-600 font-medium text-sm whitespace-nowrap">Star Rating</div>
                    </div>
                  </div>
                </div>

                {/* Divider with gradient */}
                <div className="relative h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-10" />

                {/* Infinity stat */}
                <div className="text-center relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-purple-400/20 to-indigo-500/20 rounded-2xl blur-xl" />
                  <div className="relative flex flex-col items-center">
                    {/* Animated infinity symbol */}
                    <div className="inline-block relative mb-4">
                      <div className="text-7xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_100%]">
                        ∞
                      </div>
                      {/* Orbiting dots */}
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-500 rounded-full animate-orbit" />
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-500 rounded-full animate-orbit-reverse" />
                    </div>
                    <div className="text-gray-600 font-medium text-base">Ways of Exploring</div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes float-slow {
                  0%, 100% { transform: translateY(0px) translateX(0px); }
                  50% { transform: translateY(-20px) translateX(10px); }
                }
                
                @keyframes float-slower {
                  0%, 100% { transform: translateY(0px) translateX(0px); }
                  50% { transform: translateY(-25px) translateX(-15px); }
                }
                
                @keyframes float-medium {
                  0%, 100% { transform: translateY(0px) translateX(0px); }
                  50% { transform: translateY(-15px) translateX(8px); }
                }
                
                @keyframes pulse-slow {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.9; transform: scale(1.02); }
                }
                
                @keyframes orbit {
                  0% { transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg); }
                  100% { transform: translate(-50%, -50%) rotate(360deg) translateX(40px) rotate(-360deg); }
                }
                
                @keyframes orbit-reverse {
                  0% { transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg); }
                  100% { transform: translate(-50%, -50%) rotate(-360deg) translateX(40px) rotate(360deg); }
                }
                
                .animate-float-slow {
                  animation: float-slow 6s ease-in-out infinite;
                }
                
                .animate-float-slower {
                  animation: float-slower 8s ease-in-out infinite;
                }
                
                .animate-float-medium {
                  animation: float-medium 7s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                  animation: pulse-slow 3s ease-in-out infinite;
                }
                
                .animate-orbit {
                  animation: orbit 8s linear infinite;
                }
                
                .animate-orbit-reverse {
                  animation: orbit-reverse 8s linear infinite;
                }
              `
            }} />
          </div>

          {/* RIGHT IMAGE */}
<div className="relative flex justify-center lg:justify-end w-full lg:w-auto lg:flex-1 max-w-[420px]">

          <div
            className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[260px] overflow-hidden bg-gray-50"
            style={{
              WebkitMaskImage: currentMask,
              maskImage: currentMask,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transition: "all 0.5s ease"
            }}
          >
            {rightImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                loading="lazy"
                style={{
                  // borderRadius:'30px'
                }}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                  index === rightImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

        </div>

        </div>
      </div>
    </section>
  )
}

export default Hero