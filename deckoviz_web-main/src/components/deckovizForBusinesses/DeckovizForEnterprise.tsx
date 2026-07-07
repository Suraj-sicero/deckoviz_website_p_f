"use client";

import React from "react";
import { useEffect, useState } from "react";
import ProgressBar from "../progressbar.tsx";
import { supabase } from "../../lib/supabase";
import { Calendar } from "lucide-react";
import {
  Building,
  Layers,
  Code,
  Headset,
  BarChart2,
  Shield,
  X,
  Info,
  Video,
  Palette,
  Megaphone,
  Camera,
  Bot,
  Image as ImageIcon,
  Users,
  Mic,
  Music,
  Clock,
  Brain,
  Building2,
  ShoppingBag,
  Sparkles,
  Star,
  ClipboardList,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { loadBlogs, MarkdownBlog } from "../../lib/blogLoader";
import ShopCarousel from "../other/ShopCarousel.tsx";
import EnterpriseFeatures from "../other/core enterprise features.tsx";
import { Link } from "react-router-dom";
import DeckovizSectors from "./DeckovizSectors";
import EnterpriseHorizontalScrollingFeatures from "./EnterpriseHorizontalScrollingFeatures";
import EnterpriseWhyDeckoviz from "./EnterpriseWhyDeckoviz";
import EnterpriseVisionMicrosite from "./EnterpriseVisionMicrosite";
import AILayerForBusiness from "./AILayerForBusiness";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  FadeUp,
  SlideLeft,
  SlideRight,
  ScalePop,
  StaggerGrid,
  StaggerItem,
} from "./EnterpriseSectionLoader";


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
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5";

  const variants = {
    primary: "bg-[#6670d8] text-white hover:bg-indigo-700",
    secondary:
      "bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-300/50 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// -- NEW GRADIENT BOX



// --- NEW STYLED FEATURE CARD (Updated with new text styling) ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    violet: {
      gradient: "from-[#4f46e5] to-[#2563EB]",
      text: "text-[#2563EB]",
      accent: "group-hover:from-violet-400",
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

  const theme = themes[themeColor] || themes.violet;



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

interface DemoRequestModalProps {
  onClose: () => void;
}

const DemoRequestModal = ({ onClose }: DemoRequestModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("demo_requests")
        .insert([formData]);

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        setError(error.message);   // show real message
        return;
      }

      setSuccess(true);

      // auto close after 2s
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-lg">

        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-500 rounded-2xl blur opacity-30"></div>

        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full border border-white/40">

          <div className="flex items-center justify-between p-6 border-b border-gray-200/60">
            <h3 className="text-xl font-semibold text-gray-900">
              Request an Enterprise Demo
            </h3>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {success ? (
            <div className="p-8 text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Request Submitted
              </h4>
              <p className="text-gray-600">
                Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Write your message..."
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const enterpriseImages = [
  // { src: "/images/DIGE6.png" },
  { src: "/images/DIGE2.png" },
  { src: "/images/DIGE3.png" },
  { src: "/images/DIGE4.png" },
  // { src: "/images/DIGE5.png" },
  { src: "/images/DIGE7.png" },
  // { src: "/images/DIGE8.png" },
  { src: "/images/DIGE9.png" },
];

const ThesisModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[800px] max-h-[90vh] bg-[#fcfcfc] rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col border border-white/50"
          >
            {/* Elegant Top Gradient Bar */}
            <div className="absolute top-0 inset-x-0 h-[6px] bg-gradient-to-r from-[#182A4A] via-[#2563EB] to-[#60A5FA] opacity-90"></div>

            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-white/80 backdrop-blur-md z-10 sticky top-0">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 font-serif">
                <span className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
                  THE DECKOVIZ THESIS
                </span>
                <span className="text-gray-400 font-light ml-2 tracking-normal">FOR ENTERPRISES</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-800 hover:rotate-90 duration-300">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="px-8 md:px-16 py-10 overflow-y-auto text-gray-700 leading-[1.8] space-y-12 bg-gradient-to-b from-white to-[#fcfcfc]">

              {/* Introduction */}
              <div className="text-center space-y-4">
                <p className="text-2xl md:text-3xl font-serif text-gray-900 leading-tight">
                  From static physical spaces to <br className="hidden md:block" /> narrative-driven, adaptive experiences.
                </p>
                <div className="w-12 h-[2px] bg-[#2563EB]/40 mx-auto mt-6"></div>
              </div>

              {/* Section 1 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">The shift that is already underway</h3>
                <p className="text-lg text-gray-600">We are entering a world where the cost of creation is collapsing.</p>
                <ul className="list-disc pl-6 my-4 space-y-2 text-gray-600">
                  <li>Food can be replicated.</li>
                  <li>Products can be manufactured faster and cheaper.</li>
                  <li>Design can be generated instantly.</li>
                </ul>
                <p>With AI, robotics, and optimized supply chains, almost everything that once felt differentiated is rapidly moving toward commoditisation.</p>
                <p className="mt-4">And when everything becomes available, comparable, and replicable… the question shifts.</p>
                <p className="text-xl font-medium text-[#182A4A] mt-6 border-l-4 border-[#2563EB]/40 pl-6 py-2 bg-blue-50/70 italic">
                  It's no longer "what are you offering?" but "what does it feel like to experience you?"
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">The end of product-led differentiation</h3>
                <p>For decades, businesses competed on product quality, pricing, convenience, and incremental improvements. Those still matter. But they are no longer sufficient.</p>
                <p className="mt-4">Because in most categories today, good food is everywhere, decent products are everywhere, and acceptable service is everywhere.</p>
                <p className="mt-4 font-medium text-gray-900">The baseline has risen. And when the baseline rises, differentiation moves elsewhere.</p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">The rise of experience as the core layer</h3>
                <p>What remains hard to replicate is not the product. It is the experience around the product:</p>
                <ul className="list-disc pl-6 my-4 space-y-2">
                  <li>how a space makes you feel</li>
                  <li>what you remember after you leave</li>
                  <li>whether you tell someone about it</li>
                  <li>whether you come back</li>
                </ul>
                <p>The best restaurants, hotels, and retail brands already understand this intuitively. They are not just serving food. They are not just selling products or services.</p>
                <p className="mt-4 font-medium text-gray-900">They are designing mood, ambiance, memory, and immersion. They are selling experiences, not commodities.</p>
              </div>

              {/* Section 4 */}
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-gray-200 to-gray-100 rounded-full"></div>
                <div className="pl-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">But most spaces are still static</h3>
                  <p>Despite this shift, the tools available to physical businesses are still stuck in an earlier era. Spaces today are largely static, non-adaptive, visually limited, and disconnected from the customer.</p>
                  <p className="mt-4">Walls display the same posters. Screens loop the same content. Ambience is fixed. There is no intelligence. No responsiveness. No evolution.</p>
                  <p className="mt-4 font-bold text-[#182A4A]">This creates a fundamental mismatch: Dynamic customers entering static environments.</p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">The insight that created Deckoviz</h3>
                <p>The breakthrough insight was simple, but powerful:</p>
                <p className="text-xl font-serif text-[#182A4A] mt-4 mb-4">If products are becoming commodities, stories become the differentiator.</p>
                <p>Not just any stories. Coherent, immersive, visually rich narratives that connect the product, the brand, and the customer in a way that feels alive.</p>
                <p className="mt-4">Because stories are what give meaning to things. Money is a story. Nations are stories. Movements are stories. Brands, at their best, are stories.</p>
                <p className="mt-4 font-medium text-gray-900">And the only businesses that will thrive in the future will need to become brands. Your brand must become your business differentiator, not your products or services.</p>
                <p className="mt-6 text-lg font-bold text-center text-[#182A4A] tracking-wide uppercase">
                  In a world where creation is abundant…<br />coherence becomes the moat.
                </p>
              </div>

              {/* Section 6 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">What we believe about spaces</h3>
                <p>We believe that the spaces of the future will not be passive. They will be adaptive, emotionally attuned, context-aware, and continuously evolving.</p>
                <p className="mt-4">They will not just host experiences. They will actively shape them. Spaces will influence how people feel, guide how they move, affect what they choose, and determine what they remember.</p>
                <p className="mt-4 font-bold text-[#182A4A]">In short, spaces will become intelligent experience systems.</p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Deckoviz as the narrative layer</h3>
                <p>Deckoviz was built to become this missing layer. A system that sits between your brand, your space, and your customer.</p>
                <p className="mt-4">And brings them together through visual storytelling, dynamic content, adaptive ambience, and personalised experiences.</p>
                <p className="mt-6 font-medium text-gray-900">Deckoviz is not just a display system. It is a <span className="text-[#2563EB] font-bold">Generative Visual and Ambience Portal (GVAP)</span> - a platform for turning physical spaces into narrative-driven environments.</p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif text-center">What this enables, in practice</h3>

                <div className="grid grid-cols-1 gap-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-bold font-serif">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Storytelling becomes part of the space</h4>
                      <p className="mt-2 text-gray-600">Instead of static menus or displays, you can show the inspiration behind a dish, the journey of an ingredient, the craftsmanship behind a product, or the history of a space.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-bold font-serif">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Products are elevated into experiences</h4>
                      <p className="mt-2 text-gray-600">A dish is no longer just food. It becomes visual, contextual, narrative-driven. A product becomes part of a story: how it was made, how it is used, how it fits into a life.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-bold font-serif">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Ambience becomes dynamic, not fixed</h4>
                      <p className="mt-2 text-gray-600">Spaces can adapt in real time: lunch vs dinner, weekday vs weekend, calm vs energetic. The same space can feel completely different depending on context.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-bold font-serif">4</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Moments become memorable</h4>
                      <p className="mt-2 text-gray-600">Create personalised visuals for guests, celebratory moments, and unexpected delights. Small moments that stay with people and drive recall, sharing, and repeat visits.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-bold font-serif">5</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">The customer journey becomes immersive</h4>
                      <p className="mt-2 text-gray-600">Instead of isolated touchpoints, the entire journey becomes connected: entry, browsing, ordering, waiting, experiencing-all tied together through a coherent visual layer.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 9 */}
              <div className="bg-gradient-to-br from-[#182A4A]/5 to-[#2563EB]/10 rounded-2xl p-8 border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl"></div>
                <div className="absolute left-0 bottom-0 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl"></div>

                <h3 className="text-xl font-bold text-[#182A4A] mb-4 font-serif relative z-10">Vizzy - the brand, made alive</h3>
                <p className="relative z-10">At the center of this is Vizzy. An AI avatar that becomes your brand representative, your storyteller, your guide, and your personality layer.</p>
                <p className="mt-4 relative z-10">Vizzy can communicate your brand voice, interact with customers, guide discovery, and add a human-like layer to the experience.</p>
                <p className="mt-4 font-bold text-[#182A4A] relative z-10">Every space gets its own version of Vizzy. Every brand gets its own personality.</p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Storytelling as a service</h3>
                <p>In the coming decade, storytelling will not be optional. It will be infrastructure.</p>
                <p className="mt-4">Deckoviz enables what we think of as <span className="font-bold text-gray-900">Storytelling as a Service</span>: A system where narratives are created dynamically, visuals are generated instantly, and experiences are continuously updated.</p>
                <p className="mt-4 text-gray-500 italic">Without requiring large teams or long cycles.</p>
              </div>

              {/* Outro */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">What 2030 looks like</h3>
                <p>By 2030, we believe most products will be commoditised, most services will be comparable, and creation will be abundant.</p>
                <p className="mt-4 font-medium">And the businesses that win will be the ones that create meaning, design experiences, and build emotional resonance.</p>
                <p className="mt-4">Physical spaces will no longer be static environments. They will be adaptive, intelligent, and story-driven.</p>
              </div>

              {/* Epic Closing Block */}
              <div className="relative mt-16 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gray-900"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#182A4A]/80 via-gray-900 to-[#0A192F]/80"></div>
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#2563EB] rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#60A5FA] rounded-full blur-[100px] opacity-20"></div>

                <div className="relative p-10 md:p-14 text-center z-10 flex flex-col items-center justify-center min-h-[300px]">
                  <p className="text-lg md:text-xl font-medium text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    Every business today has a product layer, an operational layer, and a marketing layer.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-white mt-4 tracking-wide">
                    Very few have a true experience layer.
                  </p>

                  <div className="w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] mx-auto my-10 rounded-full"></div>

                  <p className="text-2xl md:text-4xl font-serif text-white/90 leading-tight">
                    In a world where anything can be made…
                  </p>
                  <p className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#3B82F6] mt-4 leading-tight">
                    what matters is how it is experienced.
                  </p>

                  <p className="text-lg md:text-xl mt-12 font-medium tracking-widest uppercase text-gray-400">
                    And that is what Deckoviz is for.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function DeckovizForEnterprise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
  const [showEnterpriseMicrosite, setShowEnterpriseMicrosite] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Watch the URL hash and open modals accordingly
  useEffect(() => {
    const hash = location.hash;
    if (hash === '#demo') {
      setIsModalOpen(true);
    } else if (hash === '#thesis') {
      setIsThesisModalOpen(true);
    } else if (hash === '#vision') {
      setShowEnterpriseMicrosite(true);
    } else {
      setIsModalOpen(false);
      setIsThesisModalOpen(false);
      setShowEnterpriseMicrosite(false);
    }
  }, [location.hash]);

  // Helper to remove the hash when a modal is closed, which naturally triggers the effect above
  const handleCloseModal = () => {
    if (window.location.hash) {
      // Remove hash without reloading
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      // Trigger state reset manually to ensure it closes immediately
      setIsModalOpen(false);
      setIsThesisModalOpen(false);
      setShowEnterpriseMicrosite(false);
    } else {
      setIsModalOpen(false);
      setIsThesisModalOpen(false);
      setShowEnterpriseMicrosite(false);
    }
  };
  
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [AutoScroll({ speed: 1, playOnInit: true, stopOnInteraction: false })]
  );
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const retailImages = Array.from(
    { length: 20 },
    (_, i) => `/images/shoppic (${i + 1}).png`
  );

  const hotelImages = Array.from(
    { length: 43 },
    (_, i) => `/images/hootelpic (${i + 1}).png`
  );


  const [retailIndex, setRetailIndex] = useState(0);
  const [hotelIndex, setHotelIndex] = useState(0);
  useEffect(() => {
    const retailInterval = setInterval(() => {
      setRetailIndex((prev) => (prev + 1) % retailImages.length);
    }, 2000);

    const hotelInterval = setInterval(() => {
      setHotelIndex((prev) => (prev + 1) % hotelImages.length);
    }, 2000);

    return () => {
      clearInterval(retailInterval);
      clearInterval(hotelInterval);
    };
  }, [hotelImages.length, retailImages.length]);


  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [showMore, setShowMore] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showBenefits, setShowBenefits] = useState(false);

  const mainFeatures = [
    {
      title: "Dynamic Product Display Enhancer",
      description: "Turn static product images into animated visuals, artistic loops, or short videos. Showcase products in motion, in use, or reimagined through high-production generative visuals.",
      icon: <Video size={28} className="text-[#2563EB]" />
    },
    {
      title: "AI Brand-Themed Artwork Engine",
      description: "Generate living artworks inspired by your brand identity, location, history, and values. Every space gains a unique visual language that evolves with time and context.",
      icon: <Palette size={28} className="text-[#2563EB]" />
    },
    {
      title: "Generative Marketing & Signage Suite",
      description: "Instantly create menus, posters, signage, promotions, and announcements in your brand style. Update content dynamically without design bottlenecks.",
      icon: <Megaphone size={28} className="text-[#2563EB]" />
    },
    {
      title: "Customer Visual Keepsakes",
      description: "Create personalized visuals for guests or customers during special moments and let them take it home digitally. experiences turn into shareable memories.",
      icon: <Camera size={28} className="text-[#2563EB]" />
    },
    {
      title: "Vizzy for Business (AI Brand Companion)",
      description: "Vizzy acts as a brand ambassador, storyteller, and guide. It answers questions, introduces offerings, and shapes experiences with personality and restraint.",
      icon: <Bot size={28} className="text-[#2563EB]" />
    },
    {
      title: "AI Montage & Memory Creator",
      description: "Instantly generate artistic montages from photos or events. ideal for hospitality, celebrations, retail milestones, or real estate walkthroughs.",
      icon: <ImageIcon size={28} className="text-[#2563EB]" />
    }
  ];

  const extraFeatures = [
    {
      title: "Guest & Visitor Personalization",
      description: "Remember frequent guests, customer personas, or visitor types. Adapt visuals and ambience subtly to make people feel recognized, not tracked.",
      icon: <Users size={28} className="text-[#2563EB]" />
    },
    {
      title: "Collections with AI Narration",
      description: "Turn products, menus, stories, or spaces into narrated visual collections. Voice adds trust, warmth, and clarity without feeling salesy.",
      icon: <Mic size={28} className="text-[#2563EB]" />
    },
    {
      title: "AI Music & Sound Generator",
      description: "Create brand-themed music, product-specific soundscapes, or ambient audio that aligns with time of day, energy, and context.",
      icon: <Music size={28} className="text-[#2563EB]" />
    },
    {
      title: "Smart Display Scheduling",
      description: "Automate displays by time, season, event, audience type, or business rhythm. Morning, evening, weekday, festive, or campaign-specific modes run automatically.",
      icon: <Clock size={28} className="text-[#2563EB]" />
    },
    {
      title: "Adaptive Intelligence Engine",
      description: "Over time, Deckoviz learns what works in each space. Displays, moods, and stories improve continuously based on real-world interaction patterns.",
      icon: <Brain size={28} className="text-[#2563EB]" />
    },
    {
      title: "Enterprise Control & Admin Suite",
      description: "Centralized dashboard for multi-location control, scheduling, approvals, branding consistency, and future CRM or POS integrations.",
      icon: <Building2 size={28} className="text-[#2563EB]" />
    },
    {
      title: "Marketplace & Commerce Layer",
      description: "Use Deckoviz as a visual commerce surface. Showcase products, experiences, or digital items directly within the environment.",
      icon: <ShoppingBag size={28} className="text-[#2563EB]" />
    },
    {
      title: "Multisensory Moodscapes Engine",
      description: "Sync visuals with music, adaptive backlighting, and future scent modules to create deeply immersive, emotionally resonant environments.",
      icon: <Sparkles size={28} className="text-[#2563EB]" />
    },
    {
      title: "Social Proof & Testimonial Displays",
      description: "Curate reviews, testimonials, and customer moments into ambient, trust-building visual loops without turning the space into a feed.",
      icon: <Star size={28} className="text-[#2563EB]" />
    },
    {
      title: "Dynamic Visual Menus & Catalogs",
      description: "Replace static menus or catalogs with living visual systems that rotate items, highlight specials, and tell stories visually.",
      icon: <ClipboardList size={28} className="text-[#2563EB]" />
    }
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
          color: ["#ffffff", "#facc15", "#a855f7", "#ec4899", "#38bdf8"][Math.floor(Math.random() * 5)],
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

  // words to type are defined outside or inside
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const words = ["Deckoviz for Enterprise"];
    const currentWord = words[wordIndex];
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
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


  const enterpriseFeatures = [
    {
      icon: <Layers size={28} />,
      title: "Adaptive Environments",
      image: "/images/officenavbar.png",
      description:
        `Deckoviz creates environments that evolve in real time. Art, visuals, music, lighting, and ambience adapt to the time of day, season, event, and guest context. Morning feels different from evening. Weekdays feel different from weekends. \n \n A quiet afternoon does not feel like a celebration night. Your space stops being static and starts feeling alive, intentional, and tuned.`,
    },
    {
      icon: <Building size={28} />,
      title: "Products That Come Alive",
      image: "/images/dish.png",
      description:
        "Deckoviz turns products, dishes, collections, and offerings into living visuals. Static images become dynamic animations, subtle videos, and narrative-driven displays. \n \n Dishes float, textures breathe, products are shown in use, in context, in mood. This increases perceived value, curiosity, and conversion without feeling promotional. Your walls start doing the storytelling your staff cannot repeat endlessly.",
    },
    {
      icon: <Code size={28} />,
      title: "Deep Guest Personalization",
      image: "/images/officenavbar.png",
      description:
        "Deckoviz allows you to recognize guests without making it awkward. Frequent visitors can be welcomed with subtle visual cues, personalized menus, memento artworks, or contextual experiences. \n \n New guests can be served through persona-based experiences that feel thoughtful, not generic. Personalization becomes atmospheric rather than transactional.",
    },
    {
      icon: <Headset size={28} />,
      title: "Built-in Generative Engine",
      image: "/images/officenavbar.png",
      description:
        "Deckoviz removes the friction between creation and display. Custom art, branded visuals, posters, menus, announcements, and campaign material can be generated directly on the platform and instantly deployed across screens. \n \n No external tools. No printing. No long design loops. Creation, iteration, and deployment happen in one continuous flow.",
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Memorable Guest Experiences",
      image: "/images/officenavbar.png",
      description:
        "Deckoviz turns visits into experiences worth remembering and sharing. Immersive visuals, narrative moments, personalized elements, and multisensory scenes create emotional anchors. Guests remember how the space made them feel.  \n \nThey talk about it. They photograph it. They return. Memorability compounds into loyalty, word of mouth, and organic reach.",
    },
    {
      icon: <Shield size={28} />,
      title: "Vizzy, Your AI Brand Companion",
      image: "/images/officenavbar.png",
      description:
        "Vizzy is the intelligence layer behind Deckoviz. For enterprises, Vizzy acts as a brand storyteller, visual curator, experience designer, customer entertainer, campaign assistant, ambience orchestrator, and custom art generator.  \n \n Vizzy understands your brand, your offerings, your audience, and your goals. And it improves continuously, learning from real-world usage rather than assumptions.",
    },
  ];


  const enterprisebenefits = [
    {
      icon: <Layers size={28} className="text-white" />,
      title: "Multi-location orchestration",
      image: "/images/new_images_enterprise/0c4da816-b15f-44cc-8f94-24ef8aae6bcf.png",
      description:
        `Manage one screen or one thousand from a single intuitive dashboard. Orchestrate content, experiences, and ambience centrally while still enabling local nuance across locations.`,
    },
    {
      icon: <Building size={28} className="text-white" />,
      title: "Brand consistency at scale",
      image: "/images/new_images_enterprise/037d50f9-a6c7-49f1-a38a-b91ee362a10a.png",
      description:
        "Preserve your visual identity everywhere your brand exists - visuals, color systems, tone, narrative style, and experience design remain aligned without sacrificing flexibility.",
    },
    {
      icon: <Code size={28} className="text-white" />,
      title: "Clean enterprise integrations",
      image: "/images/new_images_enterprise/df4b0c8e-52d0-489b-814e-8fbb584c893f.png",
      description:
        "Integrate into existing enterprise systems through APIs and structured controls. Automate updates, enable inventory-aware visuals, and coordinate campaigns without operational overhead.",
    },
    {
      icon: <BarChart2 size={28} className="text-white" />,
      title: "Analytics & measurable impact",
      image: "/images/new_images_enterprise/c2f7cc63-d604-42c0-bb2e-93dd9c46f603.png",
      description:
        "Move beyond guesswork using analytics that link visual experiences to dwell time, engagement patterns, and behavioral signals - enabling teams to optimize for real-world outcomes.",
    },
    {
      icon: <Shield size={28} className="text-white" />,
      title: "Enterprise security & reliability",
      image: "/images/new_images_enterprise/b2816367-4c5c-4541-821f-b07acf58e0dd.png",
      description:
        "Deckoviz is built with enterprise-grade security, reliability, and support. From onboarding to expansion, it remains dependable, low-maintenance, and future-proof.",
    },
    {
      icon: <Headset size={28} className="text-white" />,
      title: "A living body for your brand",
      image: "/images/new_images_enterprise/8453308e-d6e6-40b0-81db-a61765ba60cc.png",
      description:
        "Deckoviz does not replace your brand strategy - it gives it a living, intelligent body inside your space, continuously evolving with your business.",
    },
  ];

  const renderPost = (post: MarkdownBlog) => (
    <Link
      key={post.slug}
      to={`/blog/${post.slug}`}
      className="group relative flex gap-5 p-6 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_16px_48px_rgba(37,99,235,0.3)] hover:bg-white/60 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
    >
      {/* Glass Smoke Effect */}
      <div className="absolute inset-0 bg-blue-100/20 rounded-[2rem] blur-[30px] group-hover:bg-blue-200/30 transition-colors pointer-events-none" />
      
      {/* Dynamic Shine */}
      <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shineSweep_1.5s_infinite] pointer-events-none" />

      <div className="relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(37,99,235,0.2)]">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="relative flex flex-col justify-center flex-grow z-10">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors leading-tight">
          {post.title}
        </h3>

        {post.description && (
          <p className="text-sm text-gray-600 font-medium mt-1.5 leading-relaxed line-clamp-2">
            {post.description}
          </p>
        )}

        <div className="mt-2 text-sm text-[#2563EB] opacity-0 group-hover:opacity-100 transition">
          Read →
        </div>
      </div>
    </Link>
  )

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}>
      {/* Enterprise Indigo Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
          <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
          <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
          <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
          <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* ================= PREMIUM SPLIT HERO ================= */}
      <div className="relative z-10 min-h-screen flex items-center px-6 pt-24">

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

          {/* ===== LEFT CONTENT ===== */}
          <SlideLeft className="text-center md:text-left">

            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 
              bg-gradient-to-r from-[#1B2A4A] to-[#2563EB] 
              text-white text-xs font-semibold rounded-full shadow-lg">
                ✦ Elevate your Customer Experience
              </span>
            </div>
            <div className="
            absolute inset-0 rounded-[40px] 
            bg-gradient-to-r from-[#1B2A4A]/20 via-[#2563EB]/20 to-[#0B1220]/20 
            blur-3xl opacity-40 
            group-hover:opacity-70 
            transition duration-500
            "></div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span
                className="bg-clip-text text-transparent animate-gradient"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1B2A4A, #2563EB, #1B2A4A)",
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full">

              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#1B2A4A] to-[#2563EB] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:from-[#0B1220] hover:to-[#1B2A4A] transition-all duration-300 shadow-md"
              >
                <Calendar size={18} />
                <span className="text-center">Schedule Your Enterprise Demo</span>
              </Button>

              <a
                href="/Flyer Deckoviz DASP.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#2563EB] to-[#1B2A4A] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:from-[#1B2A4A] hover:to-[#0B1220] transition-all duration-300 shadow-md"
                >
                  <ShoppingBag size={18} />
                  <span className="text-center">Place Your Enterprise Order Here</span>
                </Button>
              </a>

            </div>
          </SlideLeft>

          {/* ===== RIGHT IMAGE / CAROUSEL ===== */}
          <SlideRight
            className="relative flex justify-center transition-all duration-500 ease-out group">

            {/* glow on hover */}
            <div className="
            absolute inset-0 rounded-[40px] 
            bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-indigo-500/20 
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
                "/images/h2.png",
                "/images/h4.png",
                "/images/h5.png",
                "/images/h6.png",
                "/images/h10.png",
                "/images/h11.png",
                "/images/h12.png",
                "/images/h13.png",
                "/images/h14.png",
                "/images/h15.png",
                "/images/h16.png",
                "/images/h18.png",
                "/images/h19.png"
              ]}
              interval={3000}
            />
          </SlideRight>

        </div>
      </div>
      {/* ================= FULL ENTERPRISE OVERVIEW - GLASS CARD ================= */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">

        {/* Ambient Glow / Blobs for transparent bg */}
        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none opacity-60"
          style={{ background: "radial-gradient(circle, #4f46e5, #6366f1)" }} />
        <div className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, #2563EB, #3b82f6)" }} />
        <div className="absolute bottom-[-5%] left-[25%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, #818cf8, #a5b4fc)" }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            className="group relative rounded-[28px] md:rounded-[40px] overflow-hidden bg-white/40 backdrop-blur-2xl border-t-2 border-l-2 border-r border-b border-white"
            style={{
               boxShadow: "inset 0 4px 20px rgba(255,255,255,1), inset 0 -4px 10px rgba(255,255,255,0.3), 0 20px 60px rgba(24,42,74,0.12)",
            }}
          >

            {/* Dynamic Shine Overlay 1 (Broad Sweep) */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[28px] md:rounded-[40px] mix-blend-overlay"
                 style={{
                   background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 60%, transparent 80%)",
                   backgroundSize: "200% 100%",
                   animation: "glassShine 3s infinite linear"
                 }}
            />

            {/* Dynamic Shine Overlay 2 (Sharp Flare) */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[28px] md:rounded-[40px]"
                 style={{
                   background: "linear-gradient(65deg, transparent 45%, rgba(255,255,255,0.8) 49%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 51%, transparent 55%)",
                   backgroundSize: "300% 100%",
                   animation: "glassShine 4.5s infinite linear reverse"
                 }}
            />

            <div
              className="text-[#182A4A] p-8 md:p-12 relative z-10"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-br from-[#182A4A] via-[#2563EB] to-[#182A4A] bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Deckoviz for Enterprises
                </h2>

                <div className="px-4 py-1.5 rounded-full text-xs md:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 text-[#2563EB] font-medium w-fit shadow-sm">
                  Quick Overview
                </div>
              </div>

              {/* Progress */}
                <div className="flex justify-between text-sm text-[#1e293b] mb-4 font-medium italic">
                  <p className="text-[#182A4A] text-sm md:text-base font-semibold not-italic">
                    Introducing the <span className="italic text-[#2563EB] font-bold">Generative Ambiance And Visual Portal</span> for Enterprises
                  </p>
                </div>
                <ProgressBar value={100} hueOverride={{ start: 170, end: 210 }} />


              {/* Content */}
              <div className="space-y-6 text-[#334155] leading-relaxed text-[15px] md:text-[17px] font-medium">
                <p>
                  Most spaces are designed once - and then left to decay into the background.
                  <strong> Static walls. Stale visuals. Dull posters. Generic experiences. Repetitive screens.</strong>
                </p>

                <p>
                  Meanwhile, customer expectations are shaped by <strong>personalised, adaptive digital worlds</strong>.
                  That gap is where businesses lose <strong>attention, memory, and loyalty</strong>.
                </p>

                <p>
                  <span className="text-[#2563EB] font-bold">Deckoviz fixes that.</span>
                  It transforms your space into a <strong>dynamic experience system</strong> - combining <strong>storytelling, visual design, custom art, and real-time ambience</strong> into one <strong>intelligent and proactive layer</strong>.
                </p>

                <p>
                  Your <span className="text-[#2563EB] font-bold">brand layer</span>. Your <span className="text-[#2563EB] font-bold">mood layer</span>. Your storytelling layer. Your AI layer. Your experience layer.
                  <strong> All adaptive. All evolving.</strong>
                </p>


                <p>
                  An AI-powered <strong>Dynamic Art, Storytelling, and Spatial Experience Platform</strong> designed for enterprises that understand one thing clearly: the future of customer experience is <strong>experiential, emotional, adaptive, personalized, multisensory and immersive</strong>.
                </p>

                <p>
                  So your space doesn't just look good once - Deckoviz <strong>performs, engages, and creates moments</strong> that people remember, turning your walls into <strong>living, intelligent canvases</strong> that respond to context, brand, time, audience, and intent.
                  Because in a world of commodities, <span className="text-[#2563EB] font-bold">experience is the only moat</span>.
                </p>

                <p>
                  Turn your business into an <strong>immersive, personal experience</strong> that your guests will remember long after the meal or the sale.
                </p>
              </div>

              {/* Footer Pills */}
              <div className="mt-10 md:mt-12 flex gap-3 flex-wrap">
                {[
                  "Dynamic Art",
                  "Brand Storyteller",
                  "Ambiance Creator",
                  "Spatial Intelligence",
                  "Space Enhancer",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 md:px-5 py-2 md:py-2.5 rounded-2xl bg-white/60 text-xs md:text-sm border border-white shadow-sm text-[#182A4A] font-semibold hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                  >
                    {item}
                  </div>
                ))}
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
              @keyframes glassShine {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
                /* Hide scrollbar */
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              @keyframes resourceTicker {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .resource-ticker-container:hover .resource-ticker-track {
                animation-play-state: paused;
              }
              @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
              }
              @keyframes shineSweep {
                0% { transform: translateX(-100%) skewX(-20deg); }
                30%, 100% { transform: translateX(200%) skewX(-20deg); }
              }
              .resource-card:hover .shine-element {
                animation: shineSweep 1.5s infinite;
              }
              .floating-icon {
                animation: floating 3s ease-in-out infinite;
              }
            `}
        </style>
      </>
      {/* ================= SECTION 2: WHAT DECKOVIZ IS AT ITS CORE ================= */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        
        {/* Ambient Glow / Blobs for transparent bg */}
        <div className="absolute top-[5%] right-[5%] w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none opacity-60"
          style={{ background: "radial-gradient(circle, #4f46e5, #6366f1)" }} />
        <div className="absolute top-[40%] left-[5%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, #2563EB, #3b82f6)" }} />
        <div className="absolute bottom-[-5%] right-[25%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, #818cf8, #a5b4fc)" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="group relative rounded-[28px] md:rounded-[40px] overflow-hidden bg-white/40 backdrop-blur-2xl border-t-2 border-l-2 border-r border-b border-white"
            style={{
               boxShadow: "inset 0 4px 20px rgba(255,255,255,1), inset 0 -4px 10px rgba(255,255,255,0.3), 0 20px 60px rgba(24,42,74,0.12)",
               padding: "40px",
            }}
          >

            {/* Dynamic Shine Overlay 1 (Broad Sweep) */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[28px] md:rounded-[40px] mix-blend-overlay"
                 style={{
                   background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 60%, transparent 80%)",
                   backgroundSize: "200% 100%",
                   animation: "glassShine 3s infinite linear"
                 }}
            />

            {/* Dynamic Shine Overlay 2 (Sharp Flare) */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[28px] md:rounded-[40px]"
                 style={{
                   background: "linear-gradient(65deg, transparent 45%, rgba(255,255,255,0.8) 49%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 51%, transparent 55%)",
                   backgroundSize: "300% 100%",
                   animation: "glassShine 4.5s infinite linear reverse"
                 }}
            />

            <div className="relative z-10">
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-br from-[#182A4A] via-[#2563EB] to-[#182A4A] bg-clip-text text-transparent mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What Deckoviz is, at its Core
              </h2>

              <p className="text-[17px] text-[#334155] leading-[1.8] mb-10 font-medium">
                Deckoviz DASP is an AI-powered Dynamic Art and Storytelling Portal,
                paired with a premium Smart Display system. It functions
                simultaneously as:
              </p>

              {/* ticker container */}
              <div
                style={{
                  overflow: "hidden",
                  width: "100%",
                  position: "relative"
                }}
              >
                <div
                  className="tickerTrack"
                  style={{
                    display: "inline-flex",
                    gap: "80px",
                    whiteSpace: "nowrap",
                    animation: "tickerMove 20s linear infinite"
                  }}
                >
                  {[
                    "A generative visual engine",
                    "A brand storytelling system",
                    "A dynamic signage and merchandising platform",
                    "A multisensory ambience controller",
                    "An adaptive, learning companion for physical spaces"
                  ]
                    .concat([
                      "A generative visual engine",
                      "A brand storytelling system",
                      "A dynamic signage and merchandising platform",
                      "A multisensory ambience controller",
                      "An adaptive, learning companion for physical spaces"
                    ])
                    .map((item, i) => (
                      <div
                        key={i}
                        className="tickerItem group/item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          fontSize: "18px",
                          color: "#1e293b",
                          cursor: "pointer",
                          position: "relative",
                          transition: "all 0.5s ease"
                        }}
                      >
                        <span
                          style={{
                            color: "#2563EB",
                            fontWeight: "600"
                          }}
                        >
                          {["🎨", "📖", "🏬", "🎧", "🧠"][i % 5]}
                        </span>

                        <span className="font-medium group-hover/item:text-[#2563EB] transition-colors duration-300">{item}</span>

                        {/* animated underline */}
                        <div
                          className="underline"
                          style={{
                            position: "absolute",
                            bottom: "-6px",
                            left: 0,
                            height: "2px",
                            width: "0%",
                            background:
                              "linear-gradient(90deg, #182A4A, #2563EB, #182A4A)",
                            transition: "width 0.6s ease"
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <p className="mt-10 text-[17px] text-[#334155] leading-[1.8] font-medium">
                This is not a device you “install and forget”. It is a platform that
                learns your business and grows with it.
              </p>
            </div>

            <style>
              {`
              
              @keyframes tickerMove{
                0%{ transform:translateX(0); }
                100%{ transform:translateX(-50%); }
              }

              /* hover slows ticker */
              .tickerTrack:hover{
                animation-duration:40s;
              }

              /* premium hover effect */
              .tickerItem:hover{
                transform: scale(1.03);
              }

              /* underline animation */
              .tickerItem:hover .underline{
                width:100%;
              }

              `}
            </style>
          </motion.div>
        </div>
      </section>




      {/* ================= SECTION 6: EXPLORE FURTHER ================= */}


      {/* 📘 Floating Business DASP Guide Button */}


      {/* 📘 Floating Business DASP Guide Button */}


      <EnterpriseHorizontalScrollingFeatures />


      <section className="py-24 bg-transparent">

        <div className="max-w-7xl mx-auto px-6">

          {/* Title */}
          <FadeUp>
            <div className="text-center mb-14">

              <h2 className="text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Canvas for Every Environment, Every Moment
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto">
                From lobbies to luxury suites, from restaurants to wellness spaces, see how Deckoviz adapts to any enterprise space.
              </p>

            </div>
          </FadeUp>

          {/* Images */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">

            {/* RETAIL */}
            <SlideLeft>
              <div className="relative flex justify-center">

                <img
                  src="/images/retail_bgpic.jpeg"
                  className="w-full rounded-[40px] shadow-xl"
                />

                <div className="absolute top-[20.5%] left-1/2 -translate-x-1/2 w-[70%] h-[41%] aspect-video overflow-hidden">

                  {retailImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === retailIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  ))}

                </div>

              </div>
            </SlideLeft>


            {/* RESTAURANT */}
            <SlideRight>
              <div className="relative flex justify-center">

                <img
                  src="/images/restobg.png"
                  className="w-full rounded-[40px] shadow-xl"
                />

                <div className="absolute top-[14.5%] left-1/2 -translate-x-1/2 w-[60%] aspect-video overflow-hidden z-10">

                  {hotelImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${index === hotelIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  ))}

                </div>

              </div>
            </SlideRight>
          </div>


        </div>

      </section>


      {/* ================= INTELLIGENT AMBIENCE CARD ================= */}
      <section className="relative overflow-hidden bg-transparent py-32 px-6 md:px-12">

        {/* Ambient Glow / Blobs */}
        <div className="absolute top-[5%] right-[5%] w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none opacity-60"
          style={{ background: "radial-gradient(circle, #4f46e5, #6366f1)" }} />
        <div className="absolute top-[40%] left-[5%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, #2563EB, #3b82f6)" }} />
        <div className="absolute bottom-[-5%] right-[25%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, #818cf8, #a5b4fc)" }} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-[85rem] mx-auto z-10 px-4"
        >
          {/* Shiny Glass Card */}
          <div
            className="group relative rounded-[28px] md:rounded-[40px] overflow-hidden bg-white/40 backdrop-blur-2xl border-t-2 border-l-2 border-r border-b border-white"
            style={{
               boxShadow: "inset 0 4px 20px rgba(255,255,255,1), inset 0 -4px 10px rgba(255,255,255,0.3), 0 20px 60px rgba(24,42,74,0.12)",
            }}
          >
            {/* Dynamic Shine Overlay 1 (Broad Sweep) */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                 style={{
                   background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 60%, transparent 80%)",
                   backgroundSize: "200% 100%",
                   animation: "glassShine 3s infinite linear"
                 }}
            />
            {/* Dynamic Shine Overlay 2 (Sharp Flare) */}
            <div className="absolute inset-0 z-0 pointer-events-none"
                 style={{
                   background: "linear-gradient(65deg, transparent 45%, rgba(255,255,255,0.8) 49%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 51%, transparent 55%)",
                   backgroundSize: "300% 100%",
                   animation: "glassShine 4.5s infinite linear reverse"
                 }}
            />
            <div className="relative text-center py-8 md:py-16 px-4 sm:px-6 md:px-12 z-10">

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-semibold leading-[1.2] text-gray-900 tracking-tight drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Intelligent{" "}
                <span className="italic bg-gradient-to-r from-[#1B2A4A] via-[#2563EB] to-[#1B2A4A] animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent pr-[2px]">Ambiance</span>,{" "}
                <span className="italic bg-gradient-to-r from-[#1B2A4A] via-[#2563EB] to-[#1B2A4A] animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent pr-2">
                  Storytelling
                </span>
                <br className="hidden md:block" />
                <span className="inline-block mt-2">
                  And{" "}
                  <span className="italic bg-gradient-to-r from-[#1B2A4A] via-[#2563EB] to-[#1B2A4A] animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent pr-2">
                    Brand AI
                  </span>
                  {" "}Layer For Enterprise Spaces
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="mt-12 text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Most enterprise spaces still rely on static frames, screens, and signage.{" "}
                <span className="font-semibold text-gray-900">Deckoviz replaces that with a living system.</span>
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Deckoviz for Enterprise is an{" "}
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] font-semibold">AI-powered ambience, storytelling, and personalization platform</strong>{" "}
                that transforms physical spaces into adaptive, expressive, revenue-supporting environments.
              </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-10 text-gray-600 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              It blends generative visuals, sound, lighting, memory, and intelligence to help businesses tell better stories,
              create stronger emotional connections, and deliver experiences that evolve over time.
            </motion.p>

            {/* Premium Divider - now below description, above label */}
            <motion.div
              variants={fadeUp}
              className="mt-10 mb-8 flex justify-center items-center gap-4"
            >
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#2563EB]/60 to-[#2563EB]"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#182A4A] to-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.6)] animate-pulse"></div>
              <div className="w-24 h-[2px] bg-gradient-to-l from-transparent via-[#2563EB]/60 to-[#2563EB]"></div>
            </motion.div>

            {/* Label */}
            <motion.p
              variants={fadeUp}
              className="text-[#182A4A] font-semibold tracking-widest text-sm uppercase max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Below are some of the core, general-purpose capabilities that power Deckoviz across retail, hospitality, real estate, wellness, offices, and public spaces.
            </motion.p>
            </div>
          </div>
        </motion.div>
      </section>


      {/* ================= CORE ENTERPRISE FEATURES ================= */}


      <EnterpriseFeatures enterpriseFeatures={enterpriseFeatures} />


      {/* ================= SECTION 5: ENTERPRISE FEATURES ================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden py-16 md:py-24 mt-16 lg:mt-24 mx-4 md:mx-10 lg:mx-[110px] rounded-3xl md:rounded-[40px] shadow-[0_20px_60px_rgba(24,42,74,0.12)]"
        style={{
          background: "#f8fafc",
        }}
      >

        {/* Brand-aligned indigo/blue/violet blobs for the background */}
        <div className="absolute top-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full blur-[90px] pointer-events-none opacity-80"
          style={{ background: "radial-gradient(circle, #4f46e5, #6366f1)" }} />
        <div className="absolute top-[10%] right-[-8%] w-[480px] h-[480px] rounded-full blur-[90px] pointer-events-none opacity-75"
          style={{ background: "radial-gradient(circle, #2563EB, #3b82f6)" }} />
        <div className="absolute bottom-[5%] left-[15%] w-[420px] h-[420px] rounded-full blur-[90px] pointer-events-none opacity-70"
          style={{ background: "radial-gradient(circle, #3730a3, #4f46e5)" }} />
        <div className="absolute bottom-[-5%] right-[10%] w-[380px] h-[380px] rounded-full blur-[80px] pointer-events-none opacity-65"
          style={{ background: "radial-gradient(circle, #182A4A, #2563EB)" }} />
        <div className="absolute top-[40%] left-[38%] w-[280px] h-[280px] rounded-full blur-[80px] pointer-events-none opacity-60"
          style={{ background: "radial-gradient(circle, #6366f1, #818cf8)" }} />

        {/* SHINY GLASS OVERLAY covering the entire section */}
        <div className="absolute inset-0 z-0 pointer-events-none rounded-3xl md:rounded-[40px]" 
             style={{
               background: "linear-gradient(115deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 15%, transparent 30%, transparent 80%, rgba(255,255,255,0.4) 100%), radial-gradient(150% 100% at 50% 0%, rgba(255,255,255,0.6) 0%, transparent 40%)",
               backdropFilter: "blur(100px) saturate(220%)",
               WebkitBackdropFilter: "blur(100px) saturate(220%)",
               borderTop: "2px solid rgba(255,255,255,1)",
               borderLeft: "1px solid rgba(255,255,255,0.8)",
               borderRight: "1px solid rgba(255,255,255,0.4)",
               borderBottom: "1px solid rgba(255,255,255,0.3)",
               boxShadow: "inset 0 4px 10px rgba(255,255,255,1), inset 0 -4px 10px rgba(255,255,255,0.4), inset 0 0 60px rgba(255,255,255,0.5)",
             }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <FadeUp>
            <div className="text-center mb-16 relative">
              {/* Soft white halo to ensure the text stands out from the colorful blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-white/60 blur-[40px] rounded-[100%] pointer-events-none z-0" />
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-[#182A4A] via-[#2563EB] to-[#182A4A] bg-clip-text text-transparent pb-2 relative z-10 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 4px 20px rgba(37,99,235,0.15)" }}
              >
                Additional Enterprise Features and Highlights
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent mx-auto mt-6 opacity-60 rounded-full blur-[1px]"></div>
              <div className="w-12 h-[2px] bg-[#182A4A] mx-auto -mt-[3px] rounded-full"></div>
            </div>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {mainFeatures.map((feature, i) => (
              <StaggerItem key={i}>
                <div className="group relative rounded-3xl p-5 md:p-7 h-full overflow-hidden hover:-translate-y-2 transition-all duration-500 bg-white/10 shadow-2xl backdrop-blur-lg border border-white/20"
                     style={{
                       background: "linear-gradient(115deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 25%, transparent 40%, rgba(255,255,255,0.05) 100%)",
                       boxShadow: "inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(255,255,255,0.3)",
                     }}>

                  {/* Back-glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(37,99,235,0.18) 0%, rgba(24,42,74,0.10) 50%, transparent 75%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"
                    style={{ background: "linear-gradient(90deg, transparent, #2563EB, transparent)", boxShadow: "0 0 20px 4px rgba(37,99,235,0.35)" }}
                  />

                  {/* Emoji badge */}
                  <div className="relative mb-5 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                    bg-gradient-to-br from-[#f0f4ff] to-[#e8eeff]
                    border border-[#182A4A]/12
                    shadow-[0_4px_16px_rgba(24,42,74,0.12)]
                    group-hover:shadow-[0_6px_24px_rgba(37,99,235,0.28)]
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-500">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-[#182A4A] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-[#1e293b] leading-relaxed text-[15px] font-medium">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: "linear-gradient(90deg, #182A4A, #2563EB)" }}
                  />
                </div>
              </StaggerItem>
            ))}

            <AnimatePresence>
              {showMore &&
                extraFeatures.map((feature, i) => (
                  <motion.div
                    key={`extra-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative rounded-3xl p-5 md:p-7 overflow-hidden hover:-translate-y-2 transition-all duration-500 bg-white/10 shadow-2xl backdrop-blur-lg border border-white/20"
                    style={{
                      background: "linear-gradient(115deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 25%, transparent 40%, rgba(255,255,255,0.05) 100%)",
                      boxShadow: "inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(255,255,255,0.3)",
                    }}
                  >
                    {/* Back-glow on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                      style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(37,99,235,0.18) 0%, rgba(24,42,74,0.10) 50%, transparent 75%)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"
                      style={{ background: "linear-gradient(90deg, transparent, #2563EB, transparent)", boxShadow: "0 0 20px 4px rgba(37,99,235,0.35)" }}
                    />

                    {/* Emoji badge */}
                    <div
                      className="relative mb-5 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                      style={{
                        background: "rgba(255,255,255,0.40)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.70)",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset",
                      }}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-bold text-[#182A4A] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-[#1e293b] leading-relaxed text-[15px] font-medium">
                      {feature.description}
                    </p>

                    <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                      style={{ background: "linear-gradient(90deg, #182A4A, #2563EB)" }}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>

          </StaggerGrid>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-8 py-3 rounded-full text-white font-medium shadow-lg hover:scale-105 hover:shadow-[0_12px_36px_rgba(37,99,235,0.35)] transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #182A4A, #2563EB)" }}
            >
              {showMore ? "Show Less" : "View More Features"}
            </button>
          </div>

        </div>
      </motion.section>

      {/* ================= WHY DECKOVIZ ================= */}
      <EnterpriseWhyDeckoviz />

      {/* YT and Instagram */}

      <div className="bg-transparent py-12 md:py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced Heading Section */}
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-4xl font-semibold text-gray-900 leading-tight mb-7" style={{ fontFamily: "'Playfair Display', serif" }}>
                Learn More About
                <span className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
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
          </FadeUp>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - YouTube Video */}
            <SlideLeft>
              <div className="relative group mt-0 md:mt-[-3rem]">
                <div className="relative p-10 sm:p-6 md:p-8">
                  <div
                    className="absolute -inset-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(37,99,235,0.4) 0%, rgba(14,165,233,0.3) 25%, rgba(20,184,166,0.25) 50%, rgba(13,148,136,0.2) 75%, transparent 100%)",
                      filter: "blur(40px)",
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: -80 }}   // start from left
                    whileInView={{ opacity: 1, x: 0 }} // move to center
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }} // animate every scroll
                  >
                    <div className="relative bg-white/30 backdrop-blur-2xl rounded-[2.5rem] p-4 shadow-[0_8px_32px_rgba(37,99,235,0.15)] border border-white/60 group-hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)] hover:border-white/90 transition-all duration-500 overflow-hidden group-hover:-translate-y-2">

                      {/* Shiny Glass Overlay */}
                      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                           style={{
                             background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 60%, transparent 80%)",
                             backgroundSize: "200% 100%",
                             animation: "glassShine 3s infinite linear"
                           }}
                      />

                      <div className="text-center mb-4 relative z-10">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Watch Deckoviz Transform Spaces
                        </h3>
                      </div>

                      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg relative z-10">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/zCLi3OTFRFU?si=Yq7cTENdhvaHuMkF"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>

                      <p className="text-center text-gray-800 font-medium mt-4 relative z-10 px-2 lg:px-4">
                        Experience the magic of Deckoviz and see how it can transform your space.
                      </p>

                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideLeft>

            <SlideRight>
              <div className="relative group mt-0">
                <div className="relative p-4 sm:p-6 md:p-8">
                  {/* Background Glow */}
                  <div
                    className="absolute -inset-12 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(37,99,235,0.4) 0%, rgba(14,165,233,0.3) 25%, rgba(20,184,166,0.25) 50%, rgba(13,148,136,0.2) 75%, transparent 100%)",
                      filter: "blur(40px)",
                    }}
                  />

                  {/* Instagram Container */}
                  <motion.div
                    initial={{ opacity: 0, x: 160 }}   // start from left
                    whileInView={{ opacity: 1, x: 0 }} // move to center
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }} // animate every scroll
                    className="relative bg-white/30 backdrop-blur-2xl w-full max-w-md mx-auto rounded-[2.5rem] p-3 shadow-[0_8px_32px_rgba(37,99,235,0.15)] border border-white/60 group-hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)] hover:border-white/90 transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                    
                    {/* Shiny Glass Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                         style={{
                           background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 60%, transparent 80%)",
                           backgroundSize: "200% 100%",
                           animation: "glassShine 3s infinite linear"
                         }}
                    />

                    {/* Responsive Instagram Embed */}
                    <div className="w-full max-w-md mx-auto aspect-[4/5] overflow-hidden rounded-[1.8rem] relative z-10 shadow-md bg-white">
                      <iframe
                        className="w-full h-full"
                        src="https://www.instagram.com/p/DT5DTtdjPmh/embed"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                      ></iframe>
                    </div>
                    {/* Caption */}
                    <div className="mt-4 text-center relative z-10 pb-2">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Follow Our Journey
                      </h3>
                      <p className="text-sm text-gray-700 font-medium">
                        Daily inspiration & updates.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideRight>
          </div>
        </div>
      </div>




      {/* Features Section */}
      <section className="relative pt-24 md:pt-32 px-5 md:px-[110px] bg-transparent overflow-visible">

        {/* Brand Background Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div
            className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, #2563EB, #1e40af)" }}
          />

          <div
            className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
            style={{ background: "radial-gradient(circle, #3b82f6, #1e3a8a)" }}
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
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Benefits that{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#0B1220] via-[#1B2A4A] to-[#2563EB]">
                compound
              </span>
              , with enterprise-grade solutions
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="p-8 rounded-3xl border border-indigo-200/60 shadow-[0_8px_32px_rgba(109,40,217,0.10),0_2px_8px_rgba(79,70,229,0.08)] bg-white/40 backdrop-blur-md"
            >

              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                Deckoviz is designed to quietly solve the hardest and the softest problems in physical spaces.
                <br /><br />
                Problems of attention, emotion, memory, differentiation, narrative design, personalization at scale, and adaptive, intelligent ambiance.
                <br /><br />
                These are a few core benefits enterprises experience when Deckoviz becomes part of their environment.
              </p>

            </motion.div>

          </div>

          {/* Timeline Layout */}
          <div className="relative">

            {/* Timeline Line (Mobile + Desktop) */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="
        absolute left-5 md:left-1/2 top-0
        w-[2px]
        md:-translate-x-1/2
        origin-top
        "
      style={{ background: "linear-gradient(to bottom, #182A4A, #2563EB66, transparent)" }}
            />

            <div className="space-y-16 md:space-y-0">

              {enterprisebenefits.map((feature, index) => {

                const isEven = index % 2 === 0;

                return (

                  <div
                    key={feature.title}
                    className={`flex flex-col md:flex-row items-center w-full py-10 md:py-24 relative md:gap-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >

                    {/* Content Card */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isMobile ? 120 : isEven ? -120 : 120
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{
                        duration: 0.7,
                        type: "spring",
                        bounce: 0.25,
                        delay: 0.1,
                      }}
                      className="w-full md:w-[46%] pl-12 md:pl-0"
                    >

                      <div className="p-6 md:p-8 rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)] hover:border-white/90 transition-all duration-500 bg-white/30 backdrop-blur-2xl group relative overflow-hidden">

                        {/* Shiny Glass Overlay */}
                        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                             style={{
                               background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 60%, transparent 80%)",
                               backgroundSize: "200% 100%",
                               animation: "glassShine 3s infinite linear"
                             }}
                        />

                        <div className="flex items-center gap-5 mb-6 relative z-10">

                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-transform relative"
                                    style={{ background: "linear-gradient(135deg, #182A4A, #2563EB)", boxShadow: "0 4px 20px rgba(24,42,74,0.4)" }}>
                            {/* Inner shine for icon */}
                            <div className="absolute inset-0 rounded-2xl mix-blend-overlay pointer-events-none"
                                 style={{
                                   background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.6) 50%, transparent 80%)",
                                   backgroundSize: "200% 100%",
                                   animation: "glassShine 3s infinite linear"
                                 }}
                            />
                            {feature.icon}
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {feature.title}
                          </h3>

                        </div>

                        <p className="text-gray-700 text-base md:text-lg leading-relaxed relative z-10">
                          {feature.description}
                        </p>

                        {/* Glow */}
                        <div className="absolute bottom-0 left-0 h-1 w-full 
                                  bg-gradient-to-r from-transparent via-blue-500 to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity" />

                      </div>

                    </motion.div>

                    {/* Timeline Dot */}
                    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">

                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.3 }}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white"
                        style={{ border: "4px solid #182A4A", boxShadow: "0 0 20px rgba(24,42,74,0.6)" }}
                      />

                    </div>

                    {/* Image (Desktop Only) */}
                    <div
                      className={`hidden md:flex md:w-[56%] items-center ${isEven ? "justify-start pl-16" : "justify-end pr-16"
                        }`}
                    >

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        onMouseEnter={() => setExpandedImage(feature.image)}
                        className="relative p-3 rounded-[2.5rem] bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.15)] group hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] hover:border-white/90 transition-all duration-500 overflow-hidden cursor-pointer hover:scale-[1.02]"
                      >
                         {/* Shiny Glass Overlay */}
                        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                             style={{
                               background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.4) 60%, transparent 80%)",
                               backgroundSize: "200% 100%",
                               animation: "glassShine 3s infinite linear"
                             }}
                        />
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full max-w-[680px] rounded-[1.8rem] shadow-xl relative z-10 transition-transform duration-500"
                        />
                      </motion.div>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

          <style>
            {`
              @keyframes glassShine {
                0% { background-position: 200% 50%; }
                100% { background-position: -100% 50%; }
              }
            `}
          </style>

        </div>

      </section>

      <AILayerForBusiness />

      {/* DeckovizSectors Component */}
      <DeckovizSectors />

      {/* Bottom CTA Section */}
      <section className="py-8 md:py-8 bg-transparent">
        <FadeUp>
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Redefine Your Space?
            </h2>

            <p className="text-lg text-gray-900 font-medium mb-4 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how Deckoviz can create a unique, immersive experience
              for your brand.
            </p>
          </div>
        </FadeUp>
      </section>



      <section className="flex justify-center items-center px-4 gap-4 flex-col sm:flex-row">
        <ScalePop delay={0.1}>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="
      w-full sm:w-auto
      flex items-center justify-center gap-2
      px-6 py-3 sm:px-10 sm:py-4
      rounded-full
      text-sm sm:text-lg
      bg-gradient-to-r from-[#0B1220] via-[#1B2A4A] to-[#2563EB]
      text-white
      shadow-[0_10px_30px_rgba(37,99,235,0.35)]
      hover:shadow-[0_20px_50px_rgba(37,99,235,0.55)]
      hover:scale-[1.05]
      transition-all duration-300
      whitespace-nowrap
    "
          >
            <Calendar size={18} className="sm:w-5 sm:h-5" />
            Schedule Your Enterprise Demo
          </Button>
        </ScalePop>
        <ScalePop delay={0.2}>
          <Button
            onClick={() => navigate("/more-info")}
            className="
      w-full sm:w-auto
      flex items-center justify-center gap-2
      px-6 py-3 sm:px-10 sm:py-4
      rounded-full
      text-sm sm:text-lg
      bg-gradient-to-r from-[#182A4A] via-[#2563EB] to-[#4f46e5] text-white
      shadow-[0_10px_30px_rgba(79,70,229,0.35)]
      hover:shadow-[0_20px_50px_rgba(79,70,229,0.55)]
      hover:scale-[1.05]
      transition-all duration-300
      whitespace-nowrap
    "
          >
            <Info size={18} className="sm:w-5 sm:h-5 text-white" />
            More Information
          </Button>
        </ScalePop>
      </section>
      <div className="pt-16"></div>

      {isModalOpen && (
        <DemoRequestModal onClose={handleCloseModal} />
      )}

      <ThesisModal isOpen={isThesisModalOpen} onClose={handleCloseModal} />
      {showEnterpriseMicrosite && (
        <EnterpriseVisionMicrosite onClose={handleCloseModal} />
      )}

      {/* ================= FULL PAGE IMAGE EXPANSION MODAL ================= */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[999999] bg-black/80 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setExpandedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(null);
              }}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors duration-300 z-10"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={expandedImage}
              alt="Expanded view"
              className="w-full h-full max-w-[95vw] max-h-[92vh] object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.6)] cursor-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= EXPLORE FURTHER ================= */}
      <section className="bg-transparent py-0 border-t border-gray-100"
        style={{
          paddingLeft: '20px',
          paddingRight: '20px'
        }}>

        <section 
          className="relative mx-4 md:mx-12 my-10 pt-10 pb-12 rounded-[4rem] border border-white/60 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] backdrop-blur-3xl"
          style={{ background: "rgba(255, 255, 255, 0.5)" }}
        >
          {/* Subtle light glows for the white glassy box */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-50/40 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 mb-8 text-center relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-[#182A4A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Enterprise Resource Library
            </h3>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">High-fidelity deep dives into the future of the Deckoviz AI ecosystem</p>
          </div>

          <div className="w-full relative overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex ml-[-40px] touch-pan-y">
              {[1, 2, 3].map((iteration) => (
                <React.Fragment key={iteration}>
                  {/* 📘 Business DASP Guide Button */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={0.2}>
                      <button
                        onClick={() => navigate("/dasp-business-guide")}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        {/* Dynamic Decorative Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -z-10 group-hover:bg-blue-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-colors duration-700" />
                        
                        {/* Shine Sweep */}
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          {/* Floating Icon Badge */}
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-blue-50/80 shadow-[0_8px_16px_rgba(37,99,235,0.1)] border border-blue-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-blue-800/60 font-bold">Strategic Insight</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-blue-700 transition-colors duration-300">DASP Business Guide</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">Strategy, intelligence & enterprise scale.</span>
                          </div>
                          
                          {/* Animated Arrow */}
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-blue-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        {/* Bottom Highlight Line */}
                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* THE DECKOVIZ THESIS BUTTON */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={0.4}>
                      <button
                        onClick={() => {
                          window.location.hash = "thesis";
                        }}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl -z-10 group-hover:bg-teal-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-teal-50/80 shadow-[0_8px_16px_rgba(20,184,166,0.1)] border border-teal-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                              <polyline points="14 2 14 8 20 8"/>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-teal-800/60 font-bold">Philosophy</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-teal-700 transition-colors duration-300">The Deckoviz Thesis</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">Core philosophy & fundamental insights.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-teal-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-teal-400 to-emerald-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* 📙 Pragmatic Enterprise Buyer Guide Button */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={0.6}>
                      <button
                        onClick={() => navigate("/pragmatic-buyer-guide")}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl -z-10 group-hover:bg-purple-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-purple-50/80 shadow-[0_8px_16px_rgba(124,58,237,0.1)] border border-purple-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-purple-800/60 font-bold">Analysis</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-purple-700 transition-colors duration-300">Enterprise Buyer Guide</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">ROI & specific business outcomes.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-purple-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-400 to-indigo-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* ✨ The Problem It Solves Button */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={0.8}>
                      <button
                        onClick={() => {
                          window.location.hash = "vision";
                        }}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl -z-10 group-hover:bg-blue-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-cyan-50/80 shadow-[0_8px_16px_rgba(6,182,212,0.1)] border border-cyan-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600">
                               <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                               <path d="M9 22v-4h6v4"/>
                               <path d="M8 6h.01"/>
                               <path d="M16 6h.01"/>
                               <path d="M12 6h.01"/>
                               <path d="M8 10h.01"/>
                               <path d="M16 10h.01"/>
                               <path d="M12 10h.01"/>
                               <path d="M8 14h.01"/>
                               <path d="M16 14h.01"/>
                               <path d="M12 14h.01"/>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-cyan-800/60 font-bold">Solutions</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-cyan-700 transition-colors duration-300">The Problem It Solves</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">Why static spaces fail & how to fix them.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-cyan-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* 🚀 New Blog: Why The Deckoviz Portal for Enterprises? */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={1.0}>
                      <button
                        onClick={() => navigate("/blog/why-the-deckoviz-portal-for-enterprises")}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl -z-10 group-hover:bg-rose-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 blur-3xl -z-10 group-hover:bg-orange-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-rose-50/80 shadow-[0_8px_16px_rgba(225,29,72,0.1)] border border-rose-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600">
                               <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/>
                               <polyline points="14 2 14 8 20 8"/>
                               <path d="M2 15h10"/>
                               <path d="m9 18 3-3-3-3"/>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-rose-800/60 font-bold">Deep Dive</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-rose-700 transition-colors duration-300">Why Deckoviz for Enterprises?</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">When your space becomes a business asset.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-rose-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-rose-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* 🌟 Alternate Guide to DASPort */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={1.2}>
                      <button
                        onClick={() => navigate("/blog/alternate-guide-deckoviz-dasport")}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -z-10 group-hover:bg-amber-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 blur-3xl -z-10 group-hover:bg-orange-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-amber-50/80 shadow-[0_8px_16px_rgba(245,158,11,0.1)] border border-amber-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-amber-800/60 font-bold">Inspiration</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-amber-700 transition-colors duration-300">DASPort Alternate Use Cases</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">Out-of-the-box non-traditional applications.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-amber-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* 🏡 Long and Evolving Guide to Home Use Cases */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={1.4}>
                      <button
                        onClick={() => navigate("/blog/evolving-guide-deckoviz-use-cases")}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 blur-3xl -z-10 group-hover:bg-green-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-emerald-50/80 shadow-[0_8px_16px_rgba(16,185,129,0.1)] border border-emerald-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-800/60 font-bold">Living Guide</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-emerald-700 transition-colors duration-300">Evolving Guide to Homes</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">A growing anthology of possibilities.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-emerald-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* 📘 The Enterprise Guide to Use Cases, Possibilities & Experiences */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8">
                    <ScalePop delay={1.6}>
                      <button
                        onClick={() => navigate("/blog/enterprise-guide-use-cases-possibilities")}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/10 blur-3xl -z-10 group-hover:bg-slate-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl -z-10 group-hover:bg-blue-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-slate-50/80 shadow-[0_8px_16px_rgba(71,85,105,0.1)] border border-slate-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                              <path d="M2 12h20"></path>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-slate-800/60 font-bold">Ultimate Library</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-blue-700 transition-colors duration-300">Enterprise Use Cases & Experiences</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">Possibilities across all spaces.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-slate-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-slate-400 to-blue-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                  {/* ✨ Companion Guide for Creative Enterprise Use Cases */}
                  <div className="flex-[0_0_auto] min-w-[340px] md:min-w-[480px] pl-[40px] py-8 pr-[40px]">
                    <ScalePop delay={1.8}>
                      <button
                        onClick={() => navigate("/blog/enterprise-companion-guide-creative-use-cases")}
                        className="resource-card group relative flex flex-col items-center justify-center text-center
                        w-full px-8 py-8
                        rounded-[2rem]
                        transition-all duration-700
                        hover:scale-[1.02] hover:-translate-y-2
                        overflow-hidden"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(30px) saturate(200%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255,255,255,0.1)"
                        }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-3xl -z-10 group-hover:bg-fuchsia-500/20 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl -z-10 group-hover:bg-purple-500/20 transition-colors duration-700" />
                        
                        <div className="shine-element absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />

                        <div className="relative flex items-center gap-6 w-full">
                          <div className="floating-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                          bg-gradient-to-br from-white/90 to-fuchsia-50/80 shadow-[0_8px_16px_rgba(217,70,239,0.1)] border border-fuchsia-200/50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-600">
                              <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"></path>
                            </svg>
                          </div>
                          
                          <div className="flex flex-col items-start text-left gap-1.5">
                            <span className="text-[11px] uppercase tracking-[0.25em] text-fuchsia-800/60 font-bold">Creative Possibilities</span>
                            <span className="text-[17px] font-bold text-[#182A4A] leading-tight group-hover:text-fuchsia-700 transition-colors duration-300">Creative Use Cases</span>
                            <span className="text-[13px] text-slate-500 leading-relaxed font-medium">Unexpected experiences for spaces.</span>
                          </div>
                          
                          <div className="shrink-0 self-center ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-fuchsia-600 text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-fuchsia-400 to-purple-500 group-hover:w-full transition-all duration-700 ease-in-out" />
                      </button>
                    </ScalePop>
                  </div>

                </React.Fragment>
              ))}
            </div>
          </div>

        </section>

      </section>


      <section className="bg-transparent py-20 border-t border-gray-100">
        {/* ================= EXPLORE FURTHER PREMIUM ================= */}
        <section className="relative py-28 bg-gradient-to-b from-white via-indigo-50/40 to-white overflow-hidden">

          {/* background glow orbs */}
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-400/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-indigo-400/20 blur-[120px] rounded-full" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">

            {/* ===== Header ===== */}
            <FadeUp>
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 
      bg-gradient-to-r from-[#182A4A] via-indigo-700 to-indigo-600 
      bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Explore Further
                </h2>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                  Deeper dives into industries, platform intelligence, strategic insights,
                  and the future of intelligent enterprise ecosystems.
                </p>
              </div>
            </FadeUp>

            {/* ===== Category Filter (Premium Pills) ===== */}
            {/* ===== Category Filter (Responsive) ===== */}
            <div className="flex flex-col md:flex-row md:flex-wrap items-center md:justify-center gap-4 mb-20">

              {enterpriseCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative overflow-hidden w-full md:w-auto text-center px-7 py-3 rounded-full text-sm font-semibold 
      transition-all duration-500 border backdrop-blur-2xl shadow-[0_8px_20px_rgba(37,99,235,0.12)]
      ${activeCategory === cat
                      ? "text-white border-white/50 bg-gradient-to-r from-[#182A4A]/90 to-[#2563EB]/90 shadow-[0_12px_28px_rgba(37,99,235,0.4)] scale-[1.02]"
                      : "bg-white/40 border-white/50 text-gray-700 hover:text-[#182A4A] hover:border-blue-400 hover:shadow-[0_12px_28px_rgba(37,99,235,0.25)] hover:bg-white/60 hover:-translate-y-0.5"
                    }`}
                >
                  {/* Subtle glass smoke inside button */}
                  <div className="absolute inset-0 bg-blue-100/10 blur-xl pointer-events-none" />
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}

            </div>
            {/* ===== Glass Article Container ===== */}
            <div className="relative mt-8">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-[0_20px_100px_rgba(37,99,235,0.15)] overflow-hidden">
                 {/* Large Smoke Effect behind the grid */}
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/20 blur-[100px] rounded-full pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/20 blur-[100px] rounded-full pointer-events-none" />
              </div>

              <div className="relative p-6 md:p-12">

                {/* ===== Article Grid ===== */}
                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

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

                </StaggerGrid>

              </div>
            </div>

          </div>
        </section>


      </section>

    </div>
  );
}

