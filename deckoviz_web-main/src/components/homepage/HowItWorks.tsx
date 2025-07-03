import React, { useState } from "react"
import {
  CheckCircle,
  Circle,
} from "lucide-react"

const DeckovizSetup: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  // Premium custom SVG icons with sunset theme
  const CustomIcons = {
    Package: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Smartphone: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Palette: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C13.5 2 20 6.5 20 12C20 17.5 16.5 21 12 21C7.5 21 4 17.5 4 12C4 6.5 10.5 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
        <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/>
        <circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/>
        <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/>
      </svg>
    ),
    Upload: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="7,10 12,5 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="5" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Star: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Sunrise: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 18C18.5 16 20 13 20 10C20 5.58 16.42 2 12 2S4 5.58 4 10C4 13 5.5 16 7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="2" x2="12" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="1" y1="18" x2="3" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="21" y1="18" x2="23" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="23" y1="22" x2="1" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="8,6 12,2 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }

  const steps = [
    {
      number: "01",
      title: "Unbox & Power Up",
      description:
        "Take your Deckoviz out of the box, plug it in, and connect to Wi-Fi — just like setting up a smart TV. Instantly comes to life with a calming welcome screen.",
      icon: <CustomIcons.Package />,
      features: ["Simple plug-and-play setup", "Wi-Fi connection in seconds", "Calming welcome experience"],
      color: "from-orange-400 via-pink-400 to-purple-500",
    },
    {
      number: "02",
      title: "Connect to the Mobile App",
      description:
        "Download the Deckoviz app on your phone (iOS & Android). Sign in to personalize your experience, sync your mood, and control what's on display.",
      icon: <CustomIcons.Smartphone />,
      features: ["Available on iOS & Android", "Seamless device pairing", "Personalized experience sync"],
      color: "from-pink-400 via-purple-400 to-indigo-500",
    },
    {
      number: "03",
      title: "Choose Your Mode or Let AI Curate",
      description:
        "Pick from curated modes like Calm, Romantic, Serendipity, Gratitude, and more. Or let Deckoviz auto-curate art, stories, visuals, and music.",
      icon: <CustomIcons.Palette />,
      features: ["Curated mood modes", "AI-powered curation", "Personal interior artist experience"],
      color: "from-orange-500 via-red-400 to-pink-500",
    },
    {
      number: "04",
      title: "Upload and Create",
      description:
        "Upload your own photos and let the AI transform them into beautiful, evolving artworks. Speak or type prompts to create personalized generative art.",
      icon: <CustomIcons.Upload />,
      features: ["AI photo transformation", "Voice and text prompts", "Personalized generative art"],
      color: "from-emerald-400 via-teal-400 to-cyan-500",
    },
    {
      number: "05",
      title: "Curate & Save What You Love",
      description:
        "Like, save, and build collections of your favorite scenes. Deckoviz gets smarter with every interaction — learning your style and preferences.",
      icon: <CustomIcons.Star />,
      features: ["Build personal collections", "AI learns your preferences", "Evolving personalized gallery"],
      color: "from-yellow-400 via-orange-400 to-red-500",
    },
    {
      number: "06",
      title: "Watch Your World Come Alive",
      description:
        "From sunrise to nightfall, Deckoviz adapts and transforms your space. Perfect for living rooms, bedrooms, offices, and more.",
      icon: <CustomIcons.Sunrise />,
      features: ["Adaptive daily transformations", "Perfect for any space", "Feel more present, feel more you"],
      color: "from-purple-400 via-pink-400 to-orange-400",
    },
  ]

  const displayStep = hoveredStep !== null ? hoveredStep : activeStep

  return (
    <section id="how-it-works" className="relative bg-white py-16 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0">
        {/* Left side glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-200/50 via-purple-200/35 to-orange-200/50 rounded-full blur-3xl opacity-60"></div>
        {/* Right side glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-orange-200/60 via-pink-200/45 to-purple-200/60 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
         

          <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold mb-6 text-slate-900 leading-tight">
            How to Set Up{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
              Deckoviz?
            </span>
          </h1>

          <p className="text-lg font-medium text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Transform your space <span className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-orange-600 bg-clip-text text-transparent">in minutes</span> with our simple setup process.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Progress Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-200 to-purple-200">
              {/* Static decorative line, no scroll-based progress */}
            </div>

            {/* Step Navigation */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 cursor-pointer transition-all duration-500 ${
                    hoveredStep === index ? "opacity-100 scale-105" : "opacity-70 hover:opacity-90"
                  }`}
                  onMouseEnter={() => {
                    setHoveredStep(index)
                    setActiveStep(index)
                  }}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Circle */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-500 ${
                        hoveredStep === index || activeStep === index
                          ? `bg-gradient-to-r ${step.color} border-transparent text-white shadow-lg`
                          : "bg-white border-orange-200 text-orange-400"
                      } ${hoveredStep === index ? "scale-110 shadow-2xl" : ""}`}
                    >
                      {hoveredStep === index || activeStep === index ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </div>

                    {/* Enhanced Glow Effect */}
                    {hoveredStep === index && (
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} opacity-30 blur-xl scale-150 animate-pulse`}
                      />
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-orange-400 tracking-wider">{step.number}</span>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          hoveredStep === index ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-orange-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${step.color} transition-all duration-700 ease-out ${
                          hoveredStep === index ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="lg:sticky lg:top-24">
            <div 
              className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-200/50 shadow-2xl p-8 transition-all duration-700 hover:shadow-3xl overflow-hidden"
              style={{
                background: displayStep === 0 
                  ? "radial-gradient(ellipse at top left, rgba(249, 168, 212, 0.55) 0%, rgba(244, 114, 182, 0.45) 30%, rgba(251, 207, 232, 0.35) 60%, rgba(236, 72, 153, 0.5) 100%), rgba(255, 255, 255, 0.7)"
                  : displayStep === 1
                  ? "radial-gradient(ellipse at top right, rgba(196, 181, 253, 0.55) 0%, rgba(167, 139, 250, 0.45) 40%, rgba(221, 214, 254, 0.35) 70%, rgba(139, 92, 246, 0.5) 100%), rgba(255, 255, 255, 0.7)"
                  : displayStep === 2
                  ? "radial-gradient(ellipse at bottom left, rgba(251, 146, 60, 0.55) 0%, rgba(249, 115, 22, 0.45) 35%, rgba(254, 215, 170, 0.35) 65%, rgba(234, 88, 12, 0.5) 100%), rgba(255, 255, 255, 0.7)"
                  : displayStep === 3
                  ? "radial-gradient(ellipse at center, rgba(45, 212, 191, 0.55) 0%, rgba(20, 184, 166, 0.45) 45%, rgba(94, 234, 212, 0.35) 75%, rgba(13, 148, 136, 0.5) 100%), rgba(255, 255, 255, 0.7)"
                  : displayStep === 4
                  ? "radial-gradient(ellipse at top, rgba(251, 191, 36, 0.55) 0%, rgba(245, 158, 11, 0.45) 40%, rgba(254, 240, 138, 0.35) 70%, rgba(217, 119, 6, 0.5) 100%), rgba(255, 255, 255, 0.7)"
                  : "radial-gradient(ellipse at right, rgba(168, 85, 247, 0.55) 0%, rgba(147, 51, 234, 0.45) 35%, rgba(196, 181, 253, 0.35) 70%, rgba(124, 58, 237, 0.5) 100%), rgba(255, 255, 255, 0.7)"
              }}
            >
              {/* White Aura Lines for Pretty Effect */}
              <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>
              
              {/* Content on top of gradient */}
              <div className="relative z-10">
                {/* Step Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${steps[displayStep].color} flex items-center justify-center text-white shadow-lg transition-all duration-500 hover:scale-110`}
                  >
                    {steps[displayStep].icon}
                  </div>
                  <div>
                    <div className="text-sm font-mono text-orange-500 font-semibold tracking-wider mb-1">
                      STEP {steps[displayStep].number}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">{steps[displayStep].title}</h2>
                  </div>
                </div>

                {/* Step Description */}
                <p className="text-slate-600 leading-relaxed mb-8 text-lg">{steps[displayStep].description}</p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {steps[displayStep].features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-r ${steps[displayStep].color} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <CheckCircle size={12} className="text-white" />
                      </div>
                      <span className="text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between text-sm text-slate-600 font-medium mb-6">
                  <span>
                    Step {displayStep + 1} of {steps.length}
                  </span>
                  <span>{Math.round(((displayStep + 1) / steps.length) * 100)}% Complete</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${steps[displayStep].color} transition-all duration-1000 ease-out`}
                    style={{ width: `${((displayStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeckovizSetup