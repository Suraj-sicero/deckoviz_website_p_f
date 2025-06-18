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
  "inline-flex items-center justify-center font-medium transition-all duration-300 px-6 py-3 text-base rounded-xl shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[140px]"
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
  return (
    <section className="py-16 md:py-24 lg:py-32 overflow-hidden relative bg-white">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-violet-200 blur-3xl opacity-70"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl mb-6 max-w-5xl">
            <span className="text-gray-900">Transform YourSpace with </span>
            <span className="bg-[#7c3bec] bg-clip-text text-transparent">
              AI-Powered Art
            </span>
          </h1>
          {/* Subheading */}
          <p className="text-center text-gray-600 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Deckoviz brings your walls to life with a smart art frame that learns your style and evolves with you over
            time.
          </p>

          {/* Main content with images and stats */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
            {/* Left Image */}
            <div className="relative flex-1 flex justify-center">
              <div
                className="w-[340px] h-[230px] md:w-[400px] md:h-[260px] overflow-hidden shadow-xl"
                style={{
                  clipPath:
                    'path("M40,0 Q0,0 0,40 L0,220 Q0,260 40,260 L300,260 Q340,260 340,220 L340,40 Q340,0 300,0 Z")',
                  background: "#222",
                }}
              >
                <img
                  src="/images/ce3552c2-18fd-471f-90ef-1edb442673ab.png"
                  alt="Landscape artwork on frame"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Center content - Buttons and Stats */}
            <div className="flex flex-col items-center gap-8 max-w-md">
              {/* Buttons */}
              <div className="flex gap-5 justify-center">
                <Button
                variant="primary"
                className="five-color-gradient border-2 border-gray-300 ring-1 ring-inset ring-sky-200 shadow-lg hover:shadow-xl shadow-purple-200/30 text-gray-700"
              >
                Shop Now
              </Button>
              <Button 
              variant="outline" 
              className="bg-transparent text-gray-700 hover:bg-gray-50 group learn-more-hover"
            >
              Learn More 
              <ArrowRight 
                size={18} 
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              />
            </Button>
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-3xl shadow-xl px-10 py-8 border border-gray-100 w-full">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#6C63FF]">
                      <CountUp from={0} to={1} duration={2} suffix="M+" />
                    </div>
                    <div className="text-gray-500 text-sm">Artworks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#6C63FF]">
                      <CountUp from={0} to={4.9} duration={2} decimals={1} />
                    </div>
                    <div className="text-gray-500 text-sm">Star Rating</div>
                  </div>
                  <div className="text-center col-span-1">
                    <div className="text-gray-500 text-sm">Happy Customers</div>
                  </div>
                  <div className="text-center col-span-1">
                    <div className="text-3xl font-bold text-[#6C63FF]">
                      <CountUp from={0} to={50} duration={2} suffix="K+" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex-1 flex justify-center">
              <div
                className="w-[340px] h-[230px] md:w-[400px] md:h-[260px] overflow-hidden shadow-xl"
                style={{
                  clipPath:
                    'path("M0,40 Q0,0 40,0 L300,0 Q340,0 340,40 L340,220 Q340,260 300,260 L40,260 Q0,260 0,220 Z")',
                  background: "#222",
                }}
              >
                <img
                  src="/images/e3a93562-042f-4040-b463-80b4c2711bf5.png"
                  alt="Sunset artwork on frame"
                  className="w-full h-full object-cover"
                />
                {/* AI Badge */}
                <div className="absolute bottom-4 right-4 bg-white shadow-xl rounded-2xl px-3 py-2 flex items-center space-x-2">
                  <div className="bg-[#6C63FF] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                    AI
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-gray-900">AI-Powered</div>
                    <div className="text-xs text-gray-500">Learns your style</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
