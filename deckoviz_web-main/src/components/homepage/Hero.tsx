"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { useMediaQuery } from 'react-responsive';

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

  return (
    <section className="py-14 md:py-12 lg:py-10 overflow-hidden relative bg-white">

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

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Heading */}
        <h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl mb-6 max-w-5xl pt-16 leading-tight">
          <span className="text-gray-900">Make Your Space Come Alive,</span>
          <br />
          <span className="bg-gradient-to-r from-[#9a5ffff9] to-indigo-500 bg-clip-text text-transparent">
            With Your Personal Art Frame
          </span>
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
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* LEFT IMAGE */}
          <div className="relative flex-1 flex justify-center lg:justify-start">
  <div className="relative w-[300px] h-[260px] sm:w-[380px] sm:h-[320px] md:w-[460px] md:h-[380px] lg:w-[520px] lg:h-[440px]">

    {/* Room image */}
    <img
      src="/images/hero_left.png"
      alt="Living room"
      className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[82%] h-auto object-contain rounded-[40px] sm:rounded-[50px] lg:rounded-[60px]"
    />

    {/* Frame artwork */}
<div className="absolute 
  top-[19%] 
  left-[50.5%] -translate-x-1/2
  w-[49%] 
  h-[30%]
  overflow-hidden rounded-sm">

  {frameImages.map((img, index) => (
    <img
      key={index}
      src={img}
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
          <div className="flex flex-col items-center gap-9 max-w-md">

            <div className="flex gap-5">

<button
  onClick={() => (window.location.href = "/place-order")}
  className="group relative border border-gray-500 text-black hover:text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all shop-now-glow hover:text-indigo-600 hover:border-blue-600"
>
  Shop Now
</button>

              <Button
                variant="outline"
                onClick={() => (window.location.href = "/about")}
              >
                Learn More
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-2"
                />
              </Button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-xl px-6 py-6 border w-full">

              <div className="grid grid-cols-2 gap-6 text-center">

                <div>
                  <div className="text-4xl font-bold text-indigo-600">
                    <CountUp from={0} to={2.5} duration={2} suffix="M+" />
                  </div>
                  <div className="text-gray-600">Items in Library</div>
                </div>

                <div>
                  <div className="text-4xl font-bold text-indigo-600">
                    <CountUp from={0} to={4.9} duration={2} decimals={1} />
                  </div>
                  <div className="text-gray-600">Star Rating</div>
                </div>
              </div>

              <div className="text-center mt-6">
                <div className="text-6xl font-bold text-indigo-600">∞</div>
                <div className="text-gray-600">Ways of Exploring</div>
              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex-1 flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]">

              {rightImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
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