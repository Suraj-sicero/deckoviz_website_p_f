import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
      answer: "Emotional curation is the heart of Deckoviz. Rather than simply showing random beautiful images, Deckoviz selects and arranges visuals, moods, and experiences that resonate with your emotional landscape. It aims to uplift you when you need energy, calm you when you seek peace, spark wonder when you feel curious, and nurture awe when you crave inspiration. It’s about matching art and atmosphere to the invisible moments and feelings that shape your daily life.",
      category: "Advanced"
    },
    {
      question: "Why is personalization so important for spaces?",
      answer: "We design our spaces, and then, they influence - and design us. Spaces shape our emotions, thoughts, creativity, and well-being — often more than we consciously realize. A truly personalized space doesn’t just look good — it feels alive, inspiring, grounding, or energizing, depending on what your soul needs. Deckoviz exists to help you reclaim your environment as an extension of your inner self — dynamic, evolving, uniquely yours.",
      category: "Advanced"
    },
     {
      question: "Can Deckoviz create art specifically for me?",
      answer: "Yes — and it gets better the longer you live with it. Deckoviz’s creative AI engines can generate unique artworks inspired by your style, mood, and preferences. Over time, you’ll see not just curated images, but wholly new, original creations that feel like they were dreamed up just for you — because in a way, they are.",
      category: "Advanced"
    },
     {
      question: "How is Deckoviz different from a digital photo frame or smart TV?",
      answer: "While digital frames simply rotate pictures, Deckoviz uses our powerful proprietary AI architecture to curate, create, personalize, and even evolve your art over time. It's not just a display — it’s an emotionally intelligent art companion that brings true atmosphere and storytelling into your space.",
      category: "Product"
    }
  ];

  const categories = ['General', 'Product', 'Advanced'];
  const filteredFAQs = faqItems.filter(item => item.category === activeCategory);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked <span className="text-primary-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Deckoviz and how it can transform your space.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveIndex(null);
                }}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {item.question}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="text-primary-600" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </button>
                {activeIndex === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 
