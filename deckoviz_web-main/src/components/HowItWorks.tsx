"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Package, Smartphone, Palette, Upload, Star, Sunrise, Sparkles, CheckCircle, Play } from "lucide-react"

const DeckovizSetup: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: "01",
      title: "Unbox & Power Up",
      description:
        "Take your Deckoviz out of the box, plug it in, and connect to Wi-Fi — just like setting up a smart TV. Instantly comes to life with a calming welcome screen.",
      icon: <Package size={20} />,
      features: ["Simple plug-and-play setup", "Wi-Fi connection in seconds", "Calming welcome experience"],
    },
    {
      number: "02",
      title: "Connect to the Mobile App",
      description:
        "Download the Deckoviz app on your phone (iOS & Android). Sign in to personalize your experience, sync your mood, and control what's on display.",
      icon: <Smartphone size={20} />,
      features: ["Available on iOS & Android", "Seamless device pairing", "Personalized experience sync"],
    },
    {
      number: "03",
      title: "Choose Your Mode or Let AI Curate",
      description:
        "Pick from curated modes like Calm, Romantic, Serendipity, Gratitude, and more. Or let Deckoviz auto-curate art, stories, visuals, and music.",
      icon: <Palette size={20} />,
      features: ["Curated mood modes", "AI-powered curation", "Personal interior artist experience"],
    },
    {
      number: "04",
      title: "Upload and Create",
      description:
        "Upload your own photos and let the AI transform them into beautiful, evolving artworks. Speak or type prompts to create personalized generative art.",
      icon: <Upload size={20} />,
      features: ["AI photo transformation", "Voice and text prompts", "Personalized generative art"],
    },
    {
      number: "05",
      title: "Curate & Save What You Love",
      description:
        "Like, save, and build collections of your favorite scenes. Deckoviz gets smarter with every interaction — learning your style and preferences.",
      icon: <Star size={20} />,
      features: ["Build personal collections", "AI learns your preferences", "Evolving personalized gallery"],
    },
    {
      number: "06",
      title: "Watch Your World Come Alive",
      description:
        "From sunrise to nightfall, Deckoviz adapts and transforms your space. Perfect for living rooms, bedrooms, offices, and more.",
      icon: <Sunrise size={20} />,
      features: ["Adaptive daily transformations", "Perfect for any space", "Feel more present, feel more you"],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.1 })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView, steps.length])

  return (
    <section ref={containerRef} className="relative bg-gradient-to-br from-slate-50 via-white to-violet-50/20 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/15 to-violet-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-l from-teal-200/10 to-violet-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100/60 to-violet-100/60 px-4 py-2 rounded-full text-violet-700 font-medium mb-6">
            <Sparkles size={16} />
            <span>Setup Guide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            How to Set Up{" "}
            <span className="bg-gradient-to-r from-orange-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              Deckoviz
            </span>{" "}
            & How It Works
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            It's as simple as{" "}
            <span className="bg-gradient-to-r from-orange-500 via-violet-500 to-teal-500 bg-clip-text text-transparent font-semibold">
              unboxing magic
            </span>
            . Here's how it works:
          </p>
        </div>

        {/* Serpentine Layout */}
        <div className="relative">
          {/* SVG Smooth Flowing Path - PASSES THROUGH EVERY STEP CIRCLE */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 640">
            <defs>
              <linearGradient id="serpentineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#f97316" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Light dotted background path showing full route through ALL circles */}
            <path
              d="M 150 120 
       C 400 60, 600 60, 850 120
       C 950 180, 900 220, 750 260
       C 600 300, 400 300, 250 260
       C 100 220, 50 260, 150 320
       C 250 380, 400 400, 550 380
       C 700 360, 800 340, 850 320
       C 950 300, 900 380, 750 420
       C 600 460, 400 460, 250 420
       C 100 380, 50 460, 150 520
       C 250 580, 400 600, 550 580
       C 700 560, 800 540, 850 520"
              stroke="url(#serpentineGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="15,10"
              opacity="0.2"
            />

            {/* Progressive solid segments - each passes through step centers */}
            {activeStep >= 1 && (
              <path
                d="M 150 120 C 400 60, 600 60, 850 120"
                stroke="url(#serpentineGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                opacity="1"
              />
            )}

            {activeStep >= 2 && (
              <path
                d="M 850 120 C 950 180, 900 220, 750 260 C 600 300, 400 300, 250 260 C 100 220, 50 260, 150 320"
                stroke="url(#serpentineGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                opacity="1"
              />
            )}

            {activeStep >= 3 && (
              <path
                d="M 150 320 C 250 380, 400 400, 550 380 C 700 360, 800 340, 850 320"
                stroke="url(#serpentineGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                opacity="1"
              />
            )}

            {activeStep >= 4 && (
              <path
                d="M 850 320 C 950 300, 900 380, 750 420 C 600 460, 400 460, 250 420 C 100 380, 50 460, 150 520"
                stroke="url(#serpentineGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                opacity="1"
              />
            )}

            {activeStep >= 5 && (
              <path
                d="M 150 520 C 250 580, 400 600, 550 580 C 700 560, 800 540, 850 520"
                stroke="url(#serpentineGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                opacity="1"
              />
            )}
          </svg>

          {/* Steps Grid - Clean and Spaced */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 relative z-10">
            {/* Row 1 */}
            <div className="lg:col-span-1 lg:justify-self-start">
              <StepCard step={steps[0]} index={0} activeStep={activeStep} setActiveStep={setActiveStep} side="left" />
            </div>
            <div className="lg:col-span-1 lg:justify-self-end">
              <StepCard step={steps[1]} index={1} activeStep={activeStep} setActiveStep={setActiveStep} side="right" />
            </div>

            {/* Row 2 */}
            <div className="lg:col-span-1 lg:justify-self-start">
              <StepCard step={steps[2]} index={2} activeStep={activeStep} setActiveStep={setActiveStep} side="left" />
            </div>
            <div className="lg:col-span-1 lg:justify-self-end">
              <StepCard step={steps[3]} index={3} activeStep={activeStep} setActiveStep={setActiveStep} side="right" />
            </div>

            {/* Row 3 */}
            <div className="lg:col-span-1 lg:justify-self-start">
              <StepCard step={steps[4]} index={4} activeStep={activeStep} setActiveStep={setActiveStep} side="left" />
            </div>
            <div className="lg:col-span-1 lg:justify-self-end">
              <StepCard step={steps[5]} index={5} activeStep={activeStep} setActiveStep={setActiveStep} side="right" />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-400 via-violet-400 to-teal-400 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Play size={20} />
            <span>Start Your Journey</span>
          </div>

          <p className="text-lg text-gray-600 italic max-w-4xl mx-auto leading-relaxed mt-8">
            From sunrise to nightfall, Deckoviz adapts and transforms your space.{" "}
            <span className="bg-gradient-to-r from-orange-500 via-violet-500 to-teal-500 bg-clip-text text-transparent font-semibold">
              Feel more present. Feel more you. Every day.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

// Clean Step Card Component
interface StepCardProps {
  step: any
  index: number
  activeStep: number
  setActiveStep: (index: number) => void
  side: "left" | "right"
}

const StepCard: React.FC<StepCardProps> = ({ step, index, activeStep, setActiveStep, side }) => {
  return (
    <div
      className={`w-full max-w-md transition-all duration-700 group cursor-pointer ${side === "right" ? "text-right" : "text-left"}`}
      onMouseEnter={() => setActiveStep(index)}
    >
      {/* Step Number */}
      <div className={`relative mb-6 ${side === "right" ? "ml-auto" : ""}`}>
        <div
          className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all duration-500 ${
            index <= activeStep
              ? "bg-gradient-to-r from-orange-400 via-violet-400 to-teal-400 border-white text-white scale-110 shadow-2xl"
              : "bg-white border-gray-300 text-gray-500 hover:border-violet-300 hover:text-violet-500"
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Icon and Title */}
        <div className={`flex items-center gap-3 ${side === "right" ? "justify-end" : ""}`}>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${side === "right" ? "order-2" : ""} ${
              index === activeStep
                ? "bg-gradient-to-r from-orange-400 via-violet-400 to-teal-400 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:via-violet-400 group-hover:to-teal-400 group-hover:text-white"
            }`}
          >
            {step.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-violet-500 group-hover:to-teal-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
            {step.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          {step.description}
        </p>

        {/* Features */}
        <div className="space-y-2">
          {step.features.map((feature: string, idx: number) => (
            <div
              key={idx}
              className={`flex items-start gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300 ${side === "right" ? "flex-row-reverse text-right" : ""}`}
            >
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 via-violet-400 to-teal-400 flex items-center justify-center mt-0.5">
                <CheckCircle size={10} className="text-white" />
              </div>
              <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeckovizSetup
