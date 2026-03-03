"use client";

import React from "react";
import { useEffect, useState } from "react";
import ProgressBar from "../progressbar.tsx";
import {
  Building,
  Layers,
  Code,
  Headset,
  BarChart2,
  Shield,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicImageGrid } from "../other/DynamicImageGrid";
import { useNavigate } from "react-router-dom";
import { loadBlogs, MarkdownBlog } from "../../lib/blogLoader";
import ShopCarousel from "../other/ShopCarousel.tsx";
import EnterpriseFeatures from "../other/core enterprise features.tsx";

import { Link } from "react-router-dom"

const ENTERPRISE_ARTICLES = {
  core: [
    "deckoviz-for-restaurants",
    "deckoviz-for-retail",
    "deckoviz-for-real-estate",
    "deckoviz-for-hotels",
    "deckoviz-for-wellness",
  ],

  platform: [
    "dasp-users-guide",
    "the-vizzy-magic-for-homes-and-businesses",
    "from-screens-to-spaces",
    "enterprise-control-layer",
  ],

  thought: [
    "why-deckoviz-is-a-must-have-for-modern-enterprises",
    "the-power-of-visual-storytelling-and-custom-art-for-enterprises-with-deckoviz-e-dasp",
    "custom-art-as-a-brand-asset",
    "designing-for-dwell-time-not-distraction",
  ],

  practical: [
    "measuring-experience-without-killing-it",
    "the-future-of-intelligent-physical-spaces",
  ],
}





// --- REUSABLE COMPONENTS (Updated with new styling) ---
type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
};

const Button = ({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {
  // Style matched with the buttons in the first component
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5";
  const variants = {
    primary: "bg-[#6670d8] text-white hover:bg-indigo-700",
    secondary:
      "bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-300/50 hover:bg-gray-100",
  };
  const renderPost = (post: MarkdownBlog) => (
  <Link
    key={post.slug}
    to={`/blog/${post.slug}`}
    className="group relative flex gap-4 pb-6 border-b border-gray-200 hover:border-purple-400 transition"
  >
    <div className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none
      bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-indigo-200/40 blur-xl" />

    <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="relative flex-grow">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">
        {post.title}
      </h3>

      {post.description && (
        <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
          {post.description}
        </p>
      )}

      <div className="mt-2 text-sm text-purple-600 opacity-0 group-hover:opacity-100 transition">
        Read →
      </div>
    </div>
  </Link>
)

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
};

// -- NEW GRADIENT BOX



// --- NEW STYLED FEATURE CARD (Updated with new text styling) ---
const EnterpriseFeatureCard = ({
  icon,
  title,
  description,
  themeColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  themeColor: string;
}) => {
  const themes: {
    [key: string]: { gradient: string; text: string; accent: string };
  } = {
    purple: {
      gradient: "from-purple-500 to-indigo-500",
      text: "text-purple-600",
      accent: "group-hover:from-purple-400",
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      text: "text-blue-600",
      accent: "group-hover:from-blue-400",
    },
    emerald: {
      gradient: "from-emerald-500 to-teal-500",
      text: "text-emerald-600",
      accent: "group-hover:from-emerald-400",
    },
  };

  const theme = themes[themeColor] || themes.purple;



  return (
    <div className="relative group cursor-pointer h-full">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${theme.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}
      />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-2xl bg-gradient-to-r ${theme.gradient} group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
            <div
              className={`w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full ${theme.accent} transition-colors duration-300`}
            />
          </div>
          <div
            className={`text-gray-400 ${theme.text} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Matched h3 styling */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
          {title}
        </h3>
        {/* Matched p styling with card descriptions from the first file */}
        <p className="text-indigo-700 font-medium text-sm leading-relaxed flex-grow">
          {description}
        </p>
        <div className="mt-8 pt-4 border-t border-gray-100">
          <div
            className={`h-1 bg-gradient-to-r ${theme.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
          />
        </div>
      </div>
    </div>
  );
};



const DemoRequestModal = ({ onClose }: { onClose: () => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your demo request has been submitted.");
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
<div className="relative w-full max-w-lg">

  {/* gradient glow border */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>

  <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl w-full transition-all duration-300 ease-in-out transform scale-95 opacity-0 animate-fade-in-scale border border-white/40">
    
    <div className="flex items-center justify-between p-6 border-b border-gray-200/60">
      <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
        Request an Enterprise Demo
      </h3>

      <button
        onClick={onClose}
        className="p-2 rounded-full bg-gray-100/60 hover:bg-gray-200 transition-all duration-300 hover:rotate-90"
        aria-label="Close modal"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-2 block w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6670d8] focus:border-[#6670d8] transition-all duration-300 hover:border-[#6670d8]"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="company"
          required
          className="mt-2 block w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6670d8] focus:border-[#6670d8] transition-all duration-300 hover:border-[#6670d8]"
          placeholder="Enter company name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-2 block w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6670d8] focus:border-[#6670d8] transition-all duration-300 hover:border-[#6670d8]"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
          Message (Optional)
        </label>
        <textarea
          id="message"
          rows={3}
          className="mt-2 block w-full px-4 py-3 bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6670d8] focus:border-[#6670d8] transition-all duration-300 hover:border-[#6670d8]"
          placeholder="Write your message..."
        ></textarea>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full relative overflow-hidden bg-gradient-to-r from-[#6670d8] via-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold tracking-wide shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 group"
        >
          <span className="relative z-10">Submit Request</span>

          {/* shine effect */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl"></span>
        </button>
      </div>

    </form>
  </div>
</div>
    </div>
  );
};

const enterpriseImages = [
  { src: "/images/DIGE6.png" },
  { src: "/images/DIGE2.png" },
  { src: "/images/DIGE3.png" },
  { src: "/images/DIGE4.png" },
  { src: "/images/DIGE5.png" },
  { src: "/images/DIGE7.png" },
  { src: "/images/DIGE8.png" },
  { src: "/images/DIGE9.png" },
];

export default function DeckovizForEnterprise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const [blogs, setBlogs] = useState<MarkdownBlog[]>([])
  const categorizedEnterpriseBlogs = {
  core: blogs.filter(b => ENTERPRISE_ARTICLES.core.includes(b.slug)),
  platform: blogs.filter(b => ENTERPRISE_ARTICLES.platform.includes(b.slug)),
  thought: blogs.filter(b => ENTERPRISE_ARTICLES.thought.includes(b.slug)),
  practical: blogs.filter(b => ENTERPRISE_ARTICLES.practical.includes(b.slug)),
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const [activeCategory, setActiveCategory] = useState("All")

useEffect(() => {
  loadBlogs().then(setBlogs)
}, [])
const enterpriseCategories = [
  "All",
  "Core Industry Pages",
  "Platform & Intelligence",
  "Thought Leadership & Strategy",
  "Practical & Forward-Looking",
]

  const [pos, setPos] = useState("0% 0%");
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let progress = 0;

    const interval = setInterval(() => {
      if (isHover) return; // stop movement on hover

      progress += 0.5;

      if (progress > 100) progress = 0;

      setPos(`${progress}% ${progress}%`);
    }, 30);

    return () => clearInterval(interval);
  }, [isHover]);

const [showMore, setShowMore] = useState(false);

const [showBenefits, setShowBenefits] = useState(false);

const mainFeatures = [
  ["Dynamic Product Display Enhancer", "Turn static product images into animated visuals, artistic loops, or short videos. Showcase products in motion, in use, or reimagined through high-production generative visuals."],
  ["AI Brand-Themed Artwork Engine", "Generate living artworks inspired by your brand identity, location, history, and values. Every space gains a unique visual language that evolves with time and context."],
  ["Generative Marketing & Signage Suite", "Instantly create menus, posters, signage, promotions, and announcements in your brand style. Update content dynamically without design bottlenecks."],
  ["Customer Visual Keepsakes", "Create personalized visuals for guests or customers during special moments and let them take it home digitally. Experiences turn into shareable memories."],
  ["Vizzy for Business (AI Brand Companion)", "Vizzy acts as a brand ambassador, storyteller, and guide. It answers questions, introduces offerings, and shapes experiences with personality and restraint."],
  ["AI Montage & Memory Creator", "Instantly generate artistic montages from photos or events. Ideal for hospitality, celebrations, retail milestones, or real estate walkthroughs."],
];

const extraFeatures = [
  ["Guest & Visitor Personalization", "Remember frequent guests, customer personas, or visitor types. Adapt visuals and ambience subtly to make people feel recognized, not tracked."],
  ["Collections with AI Narration", "Turn products, menus, stories, or spaces into narrated visual collections. Voice adds trust, warmth, and clarity without feeling salesy."],
  ["AI Music & Sound Generator", "Create brand-themed music, product-specific soundscapes, or ambient audio that aligns with time of day, energy, and context."],
  ["Smart Display Scheduling", "Automate displays by time, season, event, audience type, or business rhythm. Morning, evening, weekday, festive, or campaign-specific modes run automatically."],
  ["Adaptive Intelligence Engine","Over time, Deckoviz learns what works in each space. Displays, moods, and stories improve continuously based on real-world interaction patterns."],
  ["Enterprise Control & Admin Suite","Centralized dashboard for multi-location control, scheduling, approvals, branding consistency, and future CRM or POS integrations."],
  ["Marketplace & Commerce Layer","Use Deckoviz as a visual commerce surface. Showcase products, experiences, or digital items directly within the environment."],
  ["Multisensory Moodscapes Engine","Sync visuals with music, adaptive backlighting, and future scent modules to create deeply immersive, emotionally resonant environments."],
  ["Social Proof & Testimonial Displays","Curate reviews, testimonials, and customer moments into ambient, trust-building visual loops without turning the space into a feed."],
  ["Dynamic Visual Menus & Catalogs","Replace static menus or catalogs with living visual systems that rotate items, highlight specials, and tell stories visually."],
];
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {

    if (Math.random() > 0.5) return;

    setSparks(prev => [
      ...prev,
      ...Array.from({ length: 6 }).map(() => ({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 6,
        color: ["#ffffff","#facc15","#a855f7","#ec4899","#38bdf8"]
          [Math.floor(Math.random() * 5)],
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
      }))
    ]);

    setTimeout(() => {
      setSparks(prev => prev.slice(6));
    }, 600);

  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

  const words = ["Deckoviz for Enterprise"]; // words to type
const [text, setText] = useState("");
const [wordIndex, setWordIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);
const [deleting, setDeleting] = useState(false);

useEffect(() => {
  const currentWord = words[wordIndex];
  let speed = deleting ? 40 : 80;

  const timeout = setTimeout(() => {
    if (!deleting) {
      setText(currentWord.slice(0, charIndex + 1));
      setCharIndex(charIndex + 1);

      if (charIndex + 1 === currentWord.length) {
      }
    } else {
      setText(currentWord.slice(0, charIndex - 1));
      setCharIndex(charIndex - 1);

      if (charIndex === 0) {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, speed);

  return () => clearTimeout(timeout);
}, [charIndex, deleting, wordIndex]);

  const navigate = useNavigate();

  const enterpriseFeatures = [
    {
      icon: <Layers size={28} className="text-white" />,
      title: "Adaptive Environments",
      description:
        "Deckoviz creates environments that evolve in real time. Art, visuals, music, lighting, and ambience adapt to the time of day, season, event, and guest context. Morning feels different from evening. Weekdays feel different from weekends. A quiet afternoon does not feel like a celebration night. Your space stops being static and starts feeling alive, intentional, and tuned.",
    },
    {
      icon: <Building size={28} className="text-white" />,
      title: "Products That Come Alive",
      description:
        "Deckoviz turns products, dishes, collections, and offerings into living visuals. Static images become dynamic animations, subtle videos, and narrative-driven displays. Dishes float, textures breathe, products are shown in use, in context, in mood. This increases perceived value, curiosity, and conversion without feeling promotional. Your walls start doing the storytelling your staff cannot repeat endlessly.",
    },
    {
      icon: <Code size={28} className="text-white" />,
      title: "Deep Guest Personalization",
      description:
        "Deckoviz allows you to recognize guests without making it awkward. Frequent visitors can be welcomed with subtle visual cues, personalized menus, memento artworks, or contextual experiences. New guests can be served through persona-based experiences that feel thoughtful, not generic. Personalization becomes atmospheric rather than transactional.",
    },
    {
      icon: <Headset size={28} className="text-white" />,
      title: "Built-in Generative Engine",
      description:
        "Deckoviz removes the friction between creation and display. Custom art, branded visuals, posters, menus, announcements, and campaign material can be generated directly on the platform and instantly deployed across screens. No external tools. No printing. No long design loops. Creation, iteration, and deployment happen in one continuous flow.",
    },
    {
      icon: <BarChart2 size={28} className="text-white" />,
      title: "Memorable Guest Experiences",
      description:
        "Deckoviz turns visits into experiences worth remembering and sharing. Immersive visuals, narrative moments, personalized elements, and multisensory scenes create emotional anchors. Guests remember how the space made them feel. They talk about it. They photograph it. They return. Memorability compounds into loyalty, word of mouth, and organic reach.",
    },
    {
      icon: <Shield size={28} className="text-white" />,
      title: "Vizzy, Your AI Brand Companion",
      description:
        "Vizzy is the intelligence layer behind Deckoviz. For enterprises, Vizzy acts as a brand storyteller, visual curator, experience designer, customer entertainer, campaign assistant, ambience orchestrator, and custom art generator. Vizzy understands your brand, your offerings, your audience, and your goals. And it improves continuously, learning from real-world usage rather than assumptions.",
    },
  ];

const brandGradient = "from-purple-600 via-pink-500 to-indigo-600";
  
const renderPost = (post: MarkdownBlog) => (
  <Link
    key={post.slug}
    to={`/blog/${post.slug}`}
    className="group relative flex gap-4 pb-6 border-b border-gray-200 hover:border-purple-400 transition"
  >
    <div className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none
      bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-indigo-200/40 blur-xl" />

    <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="relative flex-grow">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">
        {post.title}
      </h3>

      {post.description && (
        <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
          {post.description}
        </p>
      )}

      <div className="mt-2 text-sm text-purple-600 opacity-0 group-hover:opacity-100 transition">
        Read →
      </div>
    </div>
  </Link>
)

  return (
    <div className="bg-white">
      
{/* ================= PREMIUM SPLIT HERO ================= */}
<div className="relative z-10 min-h-screen flex items-center px-6 pt-24">

  <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

    {/* ===== LEFT CONTENT ===== */}
    <div className="text-center md:text-left">

      {/* Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center px-4 py-1.5 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        text-white text-xs font-semibold rounded-full shadow-lg">
          ✦ Deckoviz For All
        </span>
      </div>
            <div className="
      absolute inset-0 rounded-[40px] 
      bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 
      blur-3xl opacity-40 
      group-hover:opacity-70 
      transition duration-500
      "></div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6">
        <span
          className="bg-clip-text text-transparent animate-gradient"
          style={{
            backgroundImage:
              "linear-gradient(90deg,#6366f1,#a855f7,#ec4899,#f59e0b,#6366f1)",
            backgroundSize: "300% auto"
          }}
        >
          {text}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
        The AI-powered ambience, storytelling, and personalization layer
        for modern enterprise spaces.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Request an Enterprise Demo
        </Button>

        <a href="/d(1).pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Download Brochure</Button>
        </a>
      </div>
    </div>

    {/* ===== RIGHT IMAGE / CAROUSEL ===== */}
    <div 
    className="relative flex justify-center transition-all duration-500 ease-out group">

      {/* glow on hover */}
      <div className="
      absolute inset-0 rounded-[40px] 
      bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 
      blur-3xl opacity-40 
      group-hover:opacity-70 
      transition duration-500
      "></div>

      {/* glass card */}

<ShopCarousel
  className="
    bg-white/40 backdrop-blur-2xl 
    rounded-[32px] p-6 border border-white/40 
    shadow-[0_20px_60px_rgba(0,0,0,0.12)]
    transition-all duration-500
    hover:-translate-y-2
    hover:scale-[1.02]
    hover:shadow-[0_35px_100px_rgba(80,0,200,0.25)]
  "
  images={[
    "/images/shop.png",
    "/images/wall.png",
    "/images/rest.png",
    "/images/office.png",
  ]}
  interval={3000}
/>
    </div>

  </div>
</div>
      {/* ================= FULL ENTERPRISE OVERVIEW — GLASS CARD ================= */}
      <section className="py-24 bg-white relative overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-500/30 via-pink-500/25 to-indigo-500/20 blur-[160px]"
         />

        <div className="max-w-5xl mx-auto px-6 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount:0.3 }}
            className="relative rounded-[40px] overflow-hidden shadow-[0_60px_160px_rgba(168,85,247,0.35)]"
            
          >
            {/* Glass Card */}
          <div
            className="bg-gradient-to-br from-[#0c0c6d] via-[#a73dc4] to-purple-600 text-white backdrop-blur-xl p-10"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 45%, #f5576c 55%, #4facfe 100%)",
              backgroundSize: "250% 250%",
              backgroundPosition: pos,
            }}
          >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold tracking-wide">
                  Deckoviz for Enterprises
                </h2>

                <div className="px-4 py-1 rounded-full text-sm bg-white/10 border border-white/20">
                  Full Overview
                </div>
              </div>

              {/* Progress */}
              <div className="mb-10">
                <div className="flex justify-between text-sm text-white/70 mb-3">
                  <span>Experience Progress</span>
                  <span>∞</span>
                </div>
                <ProgressBar value={85} />
              </div>

              {/* Content */}
              <div className="space-y-6 text-white/80 leading-relaxed text-[16px]">
                <p>
                  Attention is fragmented. Expectations are higher.
                  Differentiation is harder. Screens are everywhere — yet most
                  spaces still feel forgettable.
                </p>

                <p>
                  Deckoviz was built for this exact problem. It is an AI-powered
                  Dynamic Art, Storytelling, and Spatial Experience Platform
                  designed for enterprises that understand one thing clearly:
                  <span className="text-white font-semibold">
                    {" "}
                    the future of business is experiential, emotional, and
                    adaptive.
                  </span>
                </p>

                <p>
                  Not static signage. Not passive screens. Deckoviz turns walls
                  into living, intelligent canvases that respond to context,
                  brand, time, audience, and intent.
                </p>

                <p>
                  For businesses, Deckoviz becomes the missing layer between
                  brand strategy and real-world experience — the layer customers
                  actually feel.
                </p>
              </div>

              {/* Footer Pills */}
              <div className="mt-10 flex gap-4 flex-wrap">
                <div className="px-4 py-2 rounded-full bg-white/10 text-sm border border-white/20">
                  Dynamic Art
                </div>

                <div className="px-4 py-2 rounded-full bg-white/10 text-sm border border-white/20">
                  Storytelling
                </div>

                <div className="px-4 py-2 rounded-full bg-white/10 text-sm border border-white/20">
                  Spatial Intelligence
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

        <>
          <style>
            {`
              @keyframes moveGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
                /* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
            `}
          </style>
        </>

      {/* ================= SECTION 2: WHAT DECKOVIZ IS AT ITS CORE ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount:0.3 }}
            style={{
                border: "1px solid black",
                borderRadius: "24px",
                padding: "40px",
                background: "linear-gradient(135deg, #9fccfa, transparent, #f093fb)",
                backgroundSize: "300% 300%",
                animation: "moveGradient 5s ease infinite",
                boxShadow: "10px 10px 20px rgba(128,0,128,0.5)"
              }}>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-8">
            What Deckoviz is, at its Core
          </h2>

          <p className="text-[17px] text-gray-700 leading-relaxed text-justify mb-10">
            Deckoviz DASP is an AI-powered Dynamic Art and Storytelling Portal,
            paired with a premium Smart Display system. It functions
            simultaneously as:
          </p>

          <motion.div
          className="mt-10 space-y-6">
            {[
              "A generative visual engine",
              "A brand storytelling system",
              "A dynamic signage and merchandising platform",
              "A multisensory ambience controller",
              "An adaptive, learning companion for physical spaces",
            ].map((item, i) => (
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount:0.3 }}
                key={i}
                className="group flex items-center gap-6 py-5 border-b border-gray-200 hover:border-purple-400 transition"
                style={{
                  cursor:'pointer'
                }}
              >
                {/* Number */}
                <div className="text-xl font-semibold text-purple-500 w-10">
                  0{i + 1}
                </div>

                {/* Text */}
                <p className="text-gray-800 text-lg group-hover:text-purple-600 transition">
                  {item}
                </p>

                {/* Line grow */}
                <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-10 text-[17px] text-gray-700 leading-relaxed text-justify">
            This is not a device you “install and forget”. It is a platform that
            learns your business and grows with it.
          </p>
        </motion.div>
        </div>
      </section>



     {/* ================= CORE ENTERPRISE FEATURES ================= */}


<EnterpriseFeatures enterpriseFeatures={enterpriseFeatures} />


      {/* ================= INTELLIGENT AMBIENCE CARD ================= */}
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 py-28 px-6 md:px-12">
      
      {/* Animated Background Glow */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-6xl mx-auto text-center"
      >

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
        >
          The Intelligent Ambience & Storytelling Layer
          <span className="block bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
            for Enterprise Spaces
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Most enterprise spaces still rely on static frames, screens, and signage.
          <span className="font-semibold text-gray-900"> Deckoviz replaces that with a living system.</span>
          <br /><br />
          Deckoviz for Enterprise is an <strong>AI-powered ambience, storytelling, and personalization platform </strong>that transforms
          physical spaces into adaptive, expressive, revenue-supporting environments.
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="mt-10 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
        />

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-gray-600 max-w-4xl mx-auto text-base md:text-lg leading-relaxed"
        >
          It blends generative visuals, sound, lighting, memory, and intelligence to help businesses tell better stories,
          create stronger emotional connections, and deliver experiences that evolve over time.
          <br></br>
          Below are some of the core, general-purpose capabilities that
          power Deckoviz across retail, hospitality, real estate, wellness,
          offices, and public spaces.
        </motion.p>
      </motion.div>
    </section>

      {/* ================= SECTION 5: ENTERPRISE FEATURES ================= */}
<motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden py-24 mx-5 md:mx-[110px] rounded-3xl"
        style={{
          border: "1px solid rgba(255,255,255,0.4)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(240,147,251,0.15))",
          backdropFilter: "blur(20px)",
        }}
      >

        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/30 via-pink-400/25 to-indigo-400/20 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <h2 className="text-4xl font-semibold text-center mb-14 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
            Core Enterprise Features & Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {mainFeatures.map(([feature, desc], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group rounded-3xl p-7 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-500"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition">
                  {feature}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {desc}
                </p>
                
        <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-500" />
              </motion.div>
            ))}

            <AnimatePresence>
              {showMore &&
                extraFeatures.map(([feature, desc], i) => (
                  <motion.div
                    key={`extra-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group rounded-3xl p-7 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-500"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition">
                      {feature}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {desc}
                    </p>
                    
        <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-500" /> 
                  </motion.div>
                ))}
            </AnimatePresence>

          </div>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-medium shadow-lg hover:scale-105 transition-all duration-300"
            >
              {showMore ? "Show Less" : "View More Features"}
            </button>
          </div>

        </div>
      </motion.section>

      {/* YT and Instagram */}
      <div className="bg-white py-12 md:py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced Heading Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-4xl font-semibold text-gray-900 leading-tight mb-7">
              Learn More About
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Deckoviz
              </span>
            </h2>
            <p className="text-sm mb-16 md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dive deeper into the world of AI-powered smart art frames and
              discover how Deckoviz is revolutionizing customer experiences
              through immersive visual storytelling.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - YouTube Video */}
            <div className="relative group mt-0 md:mt-[-3rem]">
              <div className="relative p-10 sm:p-6 md:p-8">
                <div
                  className="absolute -inset-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
                    filter: "blur(40px)",
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, x: -80 }}   // start from left
                  whileInView={{ opacity: 1, x: 0 }} // move to center
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.3 }} // animate every scroll
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                    
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Watch Deckoviz Transform Spaces
                      </h3>
                    </div>

                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/Rxms0gWUmMs"
                        title="Deckoviz Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>

                    <p className="text-center text-gray-600 mt-4">
                      Experience the magic of Deckoviz and see how it can transform your space.
                    </p>

                  </div>
                </motion.div>
              </div>
            </div>

            <div className="relative group mt-0">
              <div className="relative p-4 sm:p-6 md:p-8">
                {/* Background Glow */}
                <div
                  className="absolute -inset-12 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
                    filter: "blur(40px)",
                  }}
                />

                {/* Instagram Container */}
                <motion.div 
                  initial={{ opacity: 0, x: 160 }}   // start from left
                  whileInView={{ opacity: 1, x: 0 }} // move to center
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.3 }} // animate every scroll
                className="relative bg-white/95 backdrop-blur-sm w-full max-w-md mx-auto rounded-3xl p-3 shadow-2xl border border-white/60 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Responsive Instagram Embed */}
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl">
                    <iframe
                      src="https://www.instagram.com/p/DLM9TrnSibN/embed"
                      className="w-full h-full"
                      frameBorder="0"
                      allowTransparency={true}
                      allow="encrypted-media"
                      title="Instagram Post"
                    ></iframe>
                  </div>

                  {/* Caption */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Follow Our Journey
                    </h3>
                    <p className="text-sm text-gray-600">
                      Daily inspiration & updates.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 6: EXPLORE FURTHER ================= */}


{/* 📘 Floating Business DASP Guide Button */}


      <DynamicImageGrid
        imageSources={enterpriseImages}
        sectionTitle="A Canvas for Every Environment, Every Moment"
        sectionDescription="From lobbies to luxury suites, from restaurants to wellness spaces, see how Deckoviz adapts to any enterprise space."
      />

      {/* Features Section */}
    <section className="relative py-24 md:py-32 px-5 md:px-[110px] bg-white overflow-hidden">
      {/* Brand Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #9333ea, #db2777)' }}
        />
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #3b82f6, #9333ea)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
          >
            Benefits that <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">compound</span>, with enterprise-grade solutions
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="p-8 rounded-3xl border border-purple-100/50 shadow-sm bg-white/40 backdrop-blur-md"
          >
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                Benefits that compound over time Not features you install once,
                but advantages that grow with every guest, every day Deckoviz is
                designed to quietly solve the hardest problems in physical spaces.
                Problems of attention, emotion, memory, differentiation, and
                scale. These are a few core benefits enterprises experience when
                Deckoviz becomes part of their environment.
            </p>
          </motion.div>
        </div>

        {/* The Timeline Layout */}
        <div className="relative">
          {/* Central Vertical Line (Desktop) */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-purple-400 via-pink-400 to-transparent -translate-x-1/2 origin-top" 
          />

          <div className="space-y-16 md:space-y-0">
            {enterpriseFeatures.map((feature, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={feature.title} 
                  className={`flex flex-col md:flex-row items-center w-full md:mb-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content Card with Every-Scroll Animation */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -120 : 120 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    // 'once: false' ensures it animates every time it enters the viewport
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ 
                      duration: 0.7, 
                      type: "spring", 
                      bounce: 0.25,
                      delay: 0.1
                    }}
                    className="w-full md:w-[46%]"
                  >
                    <div className="p-8 rounded-[2.5rem] border border-purple-100 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 bg-white group relative overflow-hidden">
                      <div className="flex items-center gap-5 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-transform">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Bottom Visual Glow */}
                      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>

                  {/* Center Node Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.3 }}
                      className="w-6 h-6 rounded-full bg-white border-[5px] border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                    />
                  </div>

                  <div className="hidden md:block md:w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Context */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="mt-24 text-center text-gray-600 font-medium max-w-3xl mx-auto border-t border-gray-100 pt-10"
        >
          Deckoviz solves problems of attention, emotion, memory, differentiation, and scale for modern environments.
        </motion.div>
      </div>
      <motion.div>
        <div className="flex justify-center my-20">
  <button
    onClick={() => setShowBenefits(!showBenefits)}
    className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-medium shadow-xl hover:scale-105 transition-all duration-300"
  >
    {showBenefits ? "Hide Enterprise Benefits" : "Explore Some Enterprise Benefits"}
  </button>
</div>
      </motion.div>

    </section>

      <AnimatePresence>
        {showBenefits && (
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="relative py-28 overflow-hidden mx-5 md:mx-[110px] rounded-[32px]"
            style={{
              border: "1px solid rgba(255,255,255,0.5)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(240,147,251,0.12))",
              backdropFilter: "blur(24px)",
              boxShadow: "0 40px 120px rgba(168,85,247,0.15)",
            }}
          >

            {/* Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-32 left-20 w-[500px] h-[500px] rounded-full bg-pink-300/30 blur-[140px]" />
              <div className="absolute bottom-0 right-10 w-[450px] h-[450px] rounded-full bg-purple-300/30 blur-[140px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">

              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6 text-gray-900">
                  Other{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Enterprise
                  </span>{" "}
                  Benefits
                </h2>

                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Enterprise-grade advantages designed for scale, consistency, and measurable impact.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  {
                    title: "Multi-location orchestration",
                    desc: "Manage one screen or one thousand from a single intuitive dashboard. Orchestrate content, experiences, and ambience centrally while still enabling local nuance across locations.",
                  },
                  {
                    title: "A living body for your brand",
                    desc: "Deckoviz does not replace your brand strategy — it gives it a living, intelligent body inside your space, continuously evolving with your business.",
                  },
                  {
                    title: "Brand consistency at scale",
                    desc: "Preserve your visual identity everywhere your brand exists — visuals, color systems, tone, narrative style, and experience design remain aligned without sacrificing flexibility.",
                  },
                  {
                    title: "Clean enterprise integrations",
                    desc: "Integrate into existing enterprise systems through APIs and structured controls. Automate updates, enable inventory-aware visuals, and coordinate campaigns without operational overhead.",
                  },
                  {
                    title: "Analytics & measurable impact",
                    desc: "Move beyond guesswork using analytics that link visual experiences to dwell time, engagement patterns, and behavioral signals — enabling teams to optimize for real-world outcomes.",
                  },
                  
                  {
                    title: "Enterprise security & reliability",
                    desc: "Deckoviz is built with enterprise-grade security, reliability, and support. From onboarding to expansion, it remains dependable, low-maintenance, and future-proof.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-purple-400/40 via-pink-400/30 to-indigo-400/40"
                  >
                    <div
                      className="
                        relative
                        rounded-3xl
                        bg-white/70
                        backdrop-blur-2xl
                        p-6 sm:p-8
                        transition-all duration-500
                        group-hover:-translate-y-2
                        group-hover:shadow-[0_30px_100px_rgba(168,85,247,0.2)]
                        min-h-[220px] sm:min-h-[240px] md:min-h-[260px]
                      "
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                      
              <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-500" />
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>
      {/* Bottom CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Ready to Redefine Your Space?
          </h2>

          <p className="text-lg text-gray-900 font-medium mb-4 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how Deckoviz can create a unique, immersive experience
            for your brand.
          </p>

          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Schedule Your Enterprise Demo
          </Button>
        </div>
      </section>

      {isModalOpen && (
        <DemoRequestModal onClose={() => setIsModalOpen(false)} />
      )}

      {/* ================= EXPLORE FURTHER ================= */}  
      <section className="bg-white py-20 border-t border-gray-100"
        style={{
          paddingLeft:'20px',
          paddingRight:'20px'
        }}>
        
        <section className="relative py-28 bg-white border-t border-gray-100 flex justify-center"
        style={{
          padding:'20px'
        }}>

          {/* 📘 Business DASP Guide Button */}
          <button
            onClick={() => navigate("/dasp-business-guide")}
            className="
              flex lg:absolute
              lg:left-1/2 lg:-translate-x-1/2 lg:-top-10
              z-20
              w-full max-w-[560px]
              mx-auto
              px-6 md:px-10 py-4
              rounded-[999px]
              text-center
              items-center justify-center
              bg-gradient-to-br from-violet-300 via-fuchsia-400 to-pink-400
              shadow-[0_12px_30px_rgba(168,85,247,0.35)]
              hover:shadow-[0_24px_60px_rgba(168,85,247,0.55)]
              hover:scale-[1.02]
              transition-all duration-500
            "
          >
            <div className="flex flex-col items-center justify-center text-center gap-1">
              
              <span className="text-xs uppercase tracking-widest text-purple-900">
                Business Guide
              </span>

              <span className="text-sm font-medium text-purple-950 leading-snug">
                The Ultimate Guide for Deckoviz DASP For Business
              </span>

              <span className="text-xs text-purple-900 opacity-80">
                Strategy, platform intelligence, enterprise use-cases & scale.
              </span>

            </div>
          </button>

        </section>
      </section>

      <section className="bg-white py-20 border-t border-gray-100">
{/* ================= EXPLORE FURTHER PREMIUM ================= */}
<section className="relative py-28 bg-gradient-to-b from-white via-purple-50/40 to-white overflow-hidden">

  {/* background glow orbs */}
  <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-400/20 blur-[120px] rounded-full" />
  <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-400/20 blur-[120px] rounded-full" />

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* ===== Header ===== */}
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 
      bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 
      bg-clip-text text-transparent">
        Explore Further
      </h2>

      <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
        Deeper dives into industries, platform intelligence, strategic insights,
        and the future of intelligent enterprise ecosystems.
      </p>
    </div>

    {/* ===== Category Filter (Premium Pills) ===== */}
{/* ===== Category Filter (Responsive) ===== */}
<div className="flex flex-col md:flex-row md:flex-wrap items-center md:justify-center gap-4 mb-20">

  {enterpriseCategories.map(cat => (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      className={`w-full md:w-auto text-center px-7 py-3 rounded-full text-sm font-medium 
      transition-all duration-300 border backdrop-blur-xl
      ${
        activeCategory === cat
          ? "text-white border-transparent shadow-xl scale-[1.02] bg-gradient-to-r from-purple-600 to-pink-500"
          : "bg-white/60 border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md hover:bg-white"
      }`}
    >
      {cat}
    </button>
  ))}

</div>
    {/* ===== Glass Article Container ===== */}
    <div className="relative">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-[0_20px_80px_rgba(0,0,0,0.06)]" />

      <div className="relative p-6 md:p-10">

        {/* ===== Article Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {activeCategory === "All" && (
            <>
              {categorizedEnterpriseBlogs.core.map(renderPost)}
              {categorizedEnterpriseBlogs.platform.map(renderPost)}
              {categorizedEnterpriseBlogs.thought.map(renderPost)}
              {categorizedEnterpriseBlogs.practical.map(renderPost)}
            </>
          )}

          {activeCategory === "Core Industry Pages" &&
            categorizedEnterpriseBlogs.core.map(renderPost)}

          {activeCategory === "Platform & Intelligence" &&
            categorizedEnterpriseBlogs.platform.map(renderPost)}

          {activeCategory === "Thought Leadership & Strategy" &&
            categorizedEnterpriseBlogs.thought.map(renderPost)}

          {activeCategory === "Practical & Forward-Looking" &&
            categorizedEnterpriseBlogs.practical.map(renderPost)}

        </div>

      </div>
    </div>

  </div>
</section>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/more-info")}
            className="
      px-10 py-3 rounded-full
      bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600
      text-white font-medium
      shadow-[0_20px_50px_rgba(168,85,247,0.35)]
      hover:shadow-[0_30px_70px_rgba(236,72,153,0.45)]
      transition-all duration-300 hover:-translate-y-1
    "
          >
            More Information
          </button>
        </div>
      </section>
    </div>
  );
}
