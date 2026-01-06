"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, Home, Package, Rocket } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("General")
  const navigate = useNavigate()

  const faqItems: FAQItem[] = [
    {
      question: "What is Deckoviz exactly?",
      answer:
        "Deckoviz is an AI-powered Smart Art Frame built on Android TV. The frame displays immersive, personalized, evolving art curated through our mobile app.",
      category: "General",
    },
    {
      question: "How do I use it?",
      answer:
        "Everything happens through the Deckoviz mobile app — upload images, create collections, use AI features, set preferences, and manage your display.",
      category: "General",
    },
    {
      question: "Is it also a smart TV?",
      answer:
        "Yes! While the core purpose is art, it's built on Android TV — so you can still access Netflix, YouTube, and all your usual apps.",
      category: "General",
    },
    {
      question: "Who is Deckoviz for?",
      answer:
        "Anyone who wants more beauty, personality, and magic in their spaces.",
      category: "General",
    },
    {
      question: "Do I need a subscription?",
      answer:
        "You'll get 6 months free with every Deckoviz device.",
      category: "General",
    },
    {
      question: "How do I set it up?",
      answer:
        "Just unbox, plug in, connect to WiFi, and pair with your mobile app.",
      category: "General",
    },
    {
      question: "What sizes are available?",
      answer:
        "Deckoviz comes in 32, 43, and 55 inches.",
      category: "Product",
    },
  ]

  const categories = [
    {
      name: "General",
      icon: Home,
      color: "from-violet-500 via-purple-500 to-fuchsia-500",
      description: "Get Started",
    },
    {
      name: "Product",
      icon: Package,
      color: "from-blue-500 via-indigo-500 to-cyan-500",
      description: "Features & Specs",
    },
    {
      name: "Advanced",
      icon: Rocket,
      color: "from-pink-500 via-rose-500 to-orange-500",
      description: "AI & Technology",
    },
  ]

  const filteredFAQs = faqItems.filter((item) => item.category === activeCategory)
  const activeIndex2 = categories.findIndex((cat) => cat.name === activeCategory)

  return (
    <section id="faq" className="relative py-16 bg-white overflow-hidden">

      {/* 🌕 Floating Philosophy Bubble */}
      <button
  onClick={() => navigate("/minimalist")}
  className="
    hidden lg:flex
    absolute left-6 top-[10%] -translate-y-1/2
    z-20
    max-w-[350px]
    px-5 py-3
    rounded-[999px]
    text-left
    bg-gradient-to-br from-yellow-200 via-amber-200 to-yellow-300
    shadow-[0_16px_40px_rgba(251,191,36,0.35)]
    hover:shadow-[0_24px_60px_rgba(251,191,36,0.55)]
    transition-all duration-500
    animate-[float_6s_ease-in-out_infinite]
  "
>
  <div className="flex flex-col gap-0.5">
    <span className="text-xs uppercase tracking-widest text-amber-700">
      Philosophy
    </span>

    <span className="text-sm font-medium text-amber-900 leading-snug">
      For Homes That Mean Something
    </span>

    <span className="text-xs text-amber-800 opacity-80">
      A quieter way to live →
    </span>
  </div>
</button>

      {/* Background */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Questions?{" "}
            <span className="bg-gradient-to-r from-[#7d39ec] to-[#ec4899] bg-clip-text text-transparent">
              We've got answers.
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Everything you need to know about Deckoviz.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-8 space-y-2">
              {categories.map((category, index) => {
                const Icon = category.icon
                const isActive = activeCategory === category.name

                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name)
                      setActiveIndex(null)
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      isActive ? "bg-white shadow-lg" : "bg-white/60 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <div>
                        <div className="font-semibold">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="lg:w-3/4 space-y-4">
            {filteredFAQs.map((item, index) => {
              const isOpen = activeIndex === index

              return (
                <div key={index} className="bg-white rounded-xl border shadow-sm">
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full p-6 flex justify-between items-start"
                  >
                    <h3 className="font-semibold text-gray-900">{item.question}</h3>
                    <ChevronDown
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-gray-700">
                      {item.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-55%) translateX(0); }
          100% { transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </section>
  )
}

export default FAQ
