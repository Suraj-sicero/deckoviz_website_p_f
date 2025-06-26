import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('General');

  const faqItems: FAQItem[] = [
    {
      question: "What is Deckoviz exactly?",
      answer: "Deckoviz is an AI-powered Smart Art Frame built on Android TV. The frame displays immersive, personalized, evolving art curated through our mobile app.",
      category: "General"
    },
    {
      question: "How do I use it?",
      answer: "Everything happens through the Deckoviz mobile app — upload images, create collections, use AI features, set preferences, and manage your display.",
      category: "General"
    },
    {
      question: "Is it also a smart TV?",
      answer: "Yes! While the core purpose is art, it's built on Android TV — so you can still access Netflix, YouTube, and all your usual apps.",
      category: "General"
    },
    {
      question: "Who is Deckoviz for?",
      answer: "Anyone who wants more beauty, personality, and magic in their spaces. Whether you're a homeowner, a hotelier, a designer, a therapist, or a restaurateur — Deckoviz brings life to your walls.",
      category: "General"
    },
    {
      question: "Do I need a subscription?",
      answer: "You'll get 6 months free with every Deckoviz device. After that, we offer affordable subscriptions for premium features, AI upgrades, and exclusive collections.",
      category: "General"
    },
    {
      question: "How do I set it up?",
      answer: "Just unbox, plug in, connect to WiFi, and pair with your mobile app. We guide you through everything in under 5 minutes.",
      category: "General"
    },
    {
      question: "What's the difference between Starter, Premium, and Exquisite models?",
      answer: "Starter is great for a first experience, Premium offers more storage, larger screens, and advanced AI features, and Exquisite brings ultra-premium finishes, superior visual quality, marketplace discounts, and a truly luxurious art experience.",
      category: "Product"
    },
    {
      question: "What sizes are available?",
      answer: "Deckoviz comes in three sizes — 32 inches (Starter), 43 inches (Premium), and 55 inches (Exquisite) — each crafted to fit different spaces, aesthetics, and budgets.",
      category: "Product"
    },
    {
      question: "What makes Deckoviz special?",
      answer: "This section won't do justice, so recommend checking out our blog post on this, but the short version is we have designed a powerful emotionally intelligent AI architecture, that learns about you and from you, to curate, create and present the most attuned and personal art, storytelling and state-setting experiences. Our AI only gets better with time, as it learns who you are, and as its own curatorial and creative abilities get enhanced, even more so with its deep, empathic understanding of you, your mind, your emotions, your being, your life. Our goal is to build the greatest attuned and personalized art experience for people, with an aligned and emotionally intelligent AI buddy, Vizzy.",
      category: "Advanced"
    },
    {
      question: "How does Deckoviz personalize art for me?",
      answer: "Deckoviz uses a proprietary AI that learns from your preferences, moods, feedback, and interaction patterns over time. It doesn't just react to what you like — it actively evolves alongside you, recognizing subtleties in your taste, emotional states, rhythms of your life, and even the aspirations you express.",
      category: "Advanced"
    },
    {
      question: "What is emotional curation?",
      answer: "Emotional curation is the heart of Deckoviz. Rather than simply showing random beautiful images, Deckoviz selects and arranges visuals, moods, and experiences that resonate with your emotional landscape. It aims to uplift you when you need energy, calm you when you seek peace, spark wonder when you feel curious, and nurture awe when you crave inspiration. It's about matching art and atmosphere to the invisible moments and feelings that shape your daily life.",
      category: "Advanced"
    },
    {
      question: "Why is personalization so important for spaces?",
      answer: "We design our spaces, and then, they influence - and design us. Spaces shape our emotions, thoughts, creativity, and well-being — often more than we consciously realize. A truly personalized space doesn't just look good — it feels alive, inspiring, grounding, or energizing, depending on what your soul needs. Deckoviz exists to help you reclaim your environment as an extension of your inner self — dynamic, evolving, uniquely yours.",
      category: "Advanced"
    },
     {
      question: "Can Deckoviz create art specifically for me?",
      answer: "Yes — and it gets better the longer you live with it. Deckoviz's creative AI engines can generate unique artworks inspired by your style, mood, and preferences. Over time, you'll see not just curated images, but wholly new, original creations that feel like they were dreamed up just for you — because in a way, they are.",
      category: "Advanced"
    },
     {
      question: "How is Deckoviz different from a digital photo frame or smart TV?",
      answer: "While digital frames simply rotate pictures, Deckoviz uses our powerful proprietary AI architecture to curate, create, personalize, and even evolve your art over time. It's not just a display — it's an emotionally intelligent art companion that brings true atmosphere and storytelling into your space.",
      category: "Product"
    }
  ];

  const categories = ['General', 'Product', 'Advanced'];
  const filteredFAQs = faqItems.filter(item => item.category === activeCategory);

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient glow in the background */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-200/20 via-purple-200/15 to-pink-200/20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#7d39ec] to-[#6366f1] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about{' '}
            <span className="text-purple-600 font-semibold">Deckoviz</span> and how it can{' '}
            <span className="text-indigo-600 font-semibold">transform your space</span>.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Category Tabs */}
          <div className="flex justify-center gap-6 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveIndex(null);
                }}
                className={`relative px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? 'text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-gray-200/50'
                }`}
                style={
                  activeCategory === category
                    ? {
                        background: index === 0 
                          ? 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)'
                          : index === 1
                          ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                          : 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)'
                      }
                    : {}
                }
              >
                {activeCategory === category && (
                  <div className="absolute -top-1 -right-1">
                    <Sparkles size={16} className="text-white opacity-80 animate-pulse" />
                  </div>
                )}
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            {filteredFAQs.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Gradient accent line */}
                <div 
                  className={`absolute left-0 top-0 w-1 h-full transition-all duration-300 ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: activeCategory === 'General' 
                      ? 'linear-gradient(180deg, #9333ea 0%, #7c3aed 100%)'
                      : activeCategory === 'Product'
                      ? 'linear-gradient(180deg, #3b82f6 0%, #6366f1 100%)'
                      : 'linear-gradient(180deg, #ec4899 0%, #f97316 100%)'
                  }}
                />

                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 group"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <span className="text-lg font-bold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors duration-300">
                    {item.question}
                  </span>
                  <div className={`transition-all duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                    {activeIndex === index ? (
                      <ChevronUp 
                        className="text-purple-600" 
                        size={24} 
                      />
                    ) : (
                      <ChevronDown 
                        className="text-gray-400 group-hover:text-purple-500" 
                        size={24} 
                      />
                    )}
                  </div>
                </button>

                {/* Answer Section with smooth animation */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 py-6 bg-gradient-to-r from-gray-50/80 to-purple-50/30 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our team is here to help you discover how Deckoviz can transform your space.
                </p>
                <button className="bg-gradient-to-r from-[#7d39ec] to-[#6366f1] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;