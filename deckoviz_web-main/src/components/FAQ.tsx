"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, Home, Package, Rocket, Sparkles } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("General")

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
        "Anyone who wants more beauty, personality, and magic in their spaces. Whether you're a homeowner, a hotelier, a designer, a therapist, or a restaurateur — Deckoviz brings life to your walls.",
      category: "General",
    },
    {
      question: "Do I need a subscription?",
      answer:
        "You'll get 6 months free with every Deckoviz device. After that, we offer affordable subscriptions for premium features, AI upgrades, and exclusive collections.",
      category: "General",
    },
    {
      question: "How do I set it up?",
      answer:
        "Just unbox, plug in, connect to WiFi, and pair with your mobile app. We guide you through everything in under 5 minutes.",
      category: "General",
    },
    {
      question: "What's the difference between Starter, Premium, and Exquisite models?",
      answer:
        "Starter is great for a first experience, Premium offers more storage, larger screens, and advanced AI features, and Exquisite brings ultra-premium finishes, superior visual quality, marketplace discounts, and a truly luxurious art experience.",
      category: "Product",
    },
    {
      question: "What sizes are available?",
      answer:
        "Deckoviz comes in three sizes — 32 inches (Starter), 43 inches (Premium), and 55 inches (Exquisite) — each crafted to fit different spaces, aesthetics, and budgets.",
      category: "Product",
    },
    {
      question: "What makes Deckoviz special?",
      answer:
        "This section won't do justice, so recommend checking out our blog post on this, but the short version is we have designed a powerful emotionally intelligent AI architecture, that learns about you and from you, to curate, create and present the most attuned and personal art, storytelling and state-setting experiences. Our AI only gets better with time, as it learns who you are, and as its own curatorial and creative abilities get enhanced, even more so with its deep, empathic understanding of you, your mind, your emotions, your being, your life. Our goal is to build the greatest attuned and personalized art experience for people, with an aligned and emotionally intelligent AI buddy, Vizzy.",
      category: "Advanced",
    },
    {
      question: "How does Deckoviz personalize art for me?",
      answer:
        "Deckoviz uses a proprietary AI that learns from your preferences, moods, feedback, and interaction patterns over time. It doesn't just react to what you like — it actively evolves alongside you, recognizing subtleties in your taste, emotional states, rhythms of your life, and even the aspirations you express.",
      category: "Advanced",
    },
    {
      question: "What is emotional curation?",
      answer:
        "Emotional curation is the heart of Deckoviz. Rather than simply showing random beautiful images, Deckoviz selects and arranges visuals, moods, and experiences that resonate with your emotional landscape. It aims to uplift you when you need energy, calm you when you seek peace, spark wonder when you feel curious, and nurture awe when you crave inspiration. It's about matching art and atmosphere to the invisible moments and feelings that shape your daily life.",
      category: "Advanced",
    },
    {
      question: "Why is personalization so important for spaces?",
      answer:
        "We design our spaces, and then, they influence - and design us. Spaces shape our emotions, thoughts, creativity, and well-being — often more than we consciously realize. A truly personalized space doesn't just look good — it feels alive, inspiring, grounding, or energizing, depending on what your soul needs. Deckoviz exists to help you reclaim your environment as an extension of your inner self — dynamic, evolving, uniquely yours.",
      category: "Advanced",
    },
    {
      question: "Can Deckoviz create art specifically for me?",
      answer:
        "Yes — and it gets better the longer you live with it. Deckoviz's creative AI engines can generate unique artworks inspired by your style, mood, and preferences. Over time, you'll see not just curated images, but wholly new, original creations that feel like they were dreamed up just for you — because in a way, they are.",
      category: "Advanced",
    },
    {
      question: "How is Deckoviz different from a digital photo frame or smart TV?",
      answer:
        "While digital frames simply rotate pictures, Deckoviz uses our powerful proprietary AI architecture to curate, create, personalize, and even evolve your art over time. It's not just a display — it's an emotionally intelligent art companion that brings true atmosphere and storytelling into your space.",
      category: "Product",
    },
  ]

  const categories = [
    {
      name: "General",
      icon: Home,
      color: "from-violet-500 via-purple-500 to-fuchsia-500",
      bgColor: "from-violet-50 to-purple-50",
      description: "Get Started",
    },
    {
      name: "Product",
      icon: Package,
      color: "from-blue-500 via-indigo-500 to-cyan-500",
      bgColor: "from-blue-50 to-indigo-50",
      description: "Features & Specs",
    },
    {
      name: "Advanced",
      icon: Rocket,
      color: "from-pink-500 via-rose-500 to-orange-500",
      bgColor: "from-pink-50 to-rose-50",
      description: "AI & Technology",
    },
  ]

  const filteredFAQs = faqItems.filter((item) => item.category === activeCategory)
  const activeIndex2 = categories.findIndex((cat) => cat.name === activeCategory)

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[80%] h-[40%] rounded-full bg-gradient-to-br from-blue-200/15 via-purple-200/10 to-pink-200/15 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-[60%] h-[30%] rounded-full bg-gradient-to-tl from-purple-300/10 via-pink-200/8 to-orange-200/12 blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Questions?{" "}
            <span className="bg-gradient-to-r from-[#7d39ec] via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">
              We've got answers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about <span className="text-purple-600 font-semibold">Deckoviz</span> and how it
            can <span className="text-indigo-600 font-semibold">revolutionize your space</span> with{" "}
            <span className="text-fuchsia-500 font-semibold">AI-powered art</span>.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left Sidebar - Redesigned Interactive Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              {/* Navigation Title */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Browse Topics</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>

              {/* Interactive Category Navigation */}
              <div className="relative">
                {/* Animated Background Indicator */}
                <div
                  className={`absolute left-0 w-full h-20 bg-gradient-to-r ${categories[activeIndex2]?.color} rounded-2xl transition-all duration-500 ease-out opacity-10 blur-sm`}
                  style={{
                    transform: `translateY(${activeIndex2 * 88}px)`,
                  }}
                />

                {/* Active Category Glow */}
                <div
                  className={`absolute left-0 w-full h-20 bg-gradient-to-r ${categories[activeIndex2]?.color} rounded-2xl transition-all duration-500 ease-out opacity-5`}
                  style={{
                    transform: `translateY(${activeIndex2 * 88}px)`,
                    filter: "blur(20px)",
                  }}
                />

                {/* Category Buttons */}
                <div className="relative space-y-2">
                  {categories.map((category, index) => {
                    const isActive = activeCategory === category.name
                    const Icon = category.icon
                    const questionCount = faqItems.filter((item) => item.category === category.name).length

                    return (
                      <button
                        key={category.name}
                        onClick={() => {
                          setActiveCategory(category.name)
                          setActiveIndex(null)
                        }}
                        className={`relative w-full group transition-all duration-300 ${
                          isActive ? "scale-105" : "hover:scale-102"
                        }`}
                      >
                        {/* Main Button Container */}
                        <div
                          className={`relative p-5 rounded-2xl transition-all duration-300 ${
                            isActive
                              ? "bg-white shadow-xl border-2 border-transparent"
                              : "bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-lg border border-gray-200/50"
                          }`}
                        >
                          {/* Active Border Gradient */}
                          {isActive && (
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} p-[2px]`}>
                              <div className="w-full h-full bg-white rounded-2xl" />
                            </div>
                          )}

                          {/* Content */}
                          <div className="relative flex items-center space-x-4">
                            {/* Icon Container */}
                            <div
                              className={`relative flex-shrink-0 transition-all duration-300 ${
                                isActive ? "scale-110" : "group-hover:scale-105"
                              }`}
                            >
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                  isActive
                                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                                }`}
                              >
                                <Icon size={20} />
                              </div>

                              {/* Active Sparkle Effect */}
                              {isActive && (
                                <div className="absolute -top-1 -right-1">
                                  <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                                </div>
                              )}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 text-left">
                              <div
                                className={`font-bold text-base transition-colors duration-300 ${
                                  isActive ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"
                                }`}
                              >
                                {category.name}
                              </div>
                              <div
                                className={`text-sm transition-colors duration-300 ${
                                  isActive ? "text-gray-600" : "text-gray-500"
                                }`}
                              >
                                {category.description}
                              </div>
                              <div
                                className={`text-xs font-medium mt-1 transition-colors duration-300 ${
                                  isActive
                                    ? "text-transparent bg-gradient-to-r bg-clip-text " + category.color
                                    : "text-gray-400"
                                }`}
                              >
                                {questionCount} questions
                              </div>
                            </div>

                            {/* Active Indicator */}
                            <div
                              className={`flex-shrink-0 transition-all duration-300 ${
                                isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                              }`}
                            >
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                            </div>
                          </div>

                          {/* Hover Glow Effect */}
                          <div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                          />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - FAQ Items */}
          <div className="lg:w-3/4">
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => {
                const isOpen = activeIndex === index
                const activeCategoryData = categories.find((cat) => cat.name === activeCategory)

                return (
                  <div
                    key={index}
                    className={`group relative bg-white rounded-2xl border transition-all duration-500 ${
                      isOpen
                        ? "border-purple-200 shadow-xl"
                        : "border-gray-100 shadow-md hover:shadow-lg hover:border-purple-100"
                    }`}
                  >
                    {/* Gradient accent bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${activeCategoryData?.color} rounded-t-2xl transition-all duration-500 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Question Button */}
                    <button
                      className="w-full p-6 text-left transition-all duration-300"
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-purple-700 transition-colors duration-300 flex-1">
                          {item.question}
                        </h3>
                        <div className={`flex-shrink-0 transition-all duration-500 ${isOpen ? "rotate-180" : ""}`}>
                          <div
                            className={`p-2 rounded-xl transition-all duration-300 ${
                              isOpen
                                ? `bg-gradient-to-r ${activeCategoryData?.color} text-white shadow-lg`
                                : "bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600"
                            }`}
                          >
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Answer Section */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed text-sm">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
