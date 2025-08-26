"use client"

import React, { useState } from 'react';
import { Building, Layers, Code, Headset, BarChart2, Shield, X } from 'lucide-react';

// Reusable Button Component with onClick
const Button = ({ children, variant = 'primary', onClick }: { children: React.ReactNode, variant?: 'primary' | 'secondary', onClick?: () => void }) => {
  const baseClasses = "px-8 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105 transform text-base";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg",
    secondary: "bg-transparent text-gray-800 border-2 border-gray-300 hover:bg-gray-100"
  };
  return <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>{children}</button>;
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="mb-4 inline-block p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Demo Request Modal Component
const DemoRequestModal = ({ onClose }: { onClose: () => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your demo request has been submitted.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Request an Enterprise Demo</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" id="company" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
            <textarea id="message" rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default function DeckovizForEnterprise() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const enterpriseFeatures = [
    {
      icon: <Layers size={28} className="text-indigo-600" />,
      title: "Scalable Network Management",
      description: "Control one or one thousand frames across multiple locations from a single, intuitive dashboard. Perfect for chains and large venues."
    },
    {
      icon: <Building size={28} className="text-indigo-600" />,
      title: "Custom Content & Branding",
      description: "Integrate your brand's logos, color palettes, and marketing visuals directly into the art experience for a seamless brand story."
    },
    {
      icon: <Code size={28} className="text-indigo-600" />,
      title: "API Integration & Control",
      description: "Utilize our robust API to connect Deckoviz with your existing systems for automated content updates, scheduling, and dynamic triggers."
    },
    {
      icon: <Headset size={28} className="text-indigo-600" />,
      title: "Dedicated Support & Onboarding",
      description: "Receive white-glove service with a dedicated account manager, priority technical support, and comprehensive team training."
    },
    {
      icon: <BarChart2 size={28} className="text-indigo-600" />,
      title: "Advanced Analytics",
      description: "Gain insights into audience engagement and content performance with detailed analytics to optimize your visual strategy."
    },
    {
      icon: <Shield size={28} className="text-indigo-600" />,
      title: "Enhanced Security",
      description: "Benefit from enterprise-grade security protocols to protect your network, content, and data integrity."
    }
  ];

  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 opacity-60"></div>
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Space into a Living,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Breathing Brand Experience.
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed mb-10">
            Deckoviz helps hotels, businesses, and cultural spaces captivate their audience with intelligent, ever-evolving visuals — blending art, brand storytelling, and technology into one seamless experience.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Request an Enterprise Demo
            </Button>
            
            {/* --- THIS IS THE FIX: Using an <a> tag styled as a button --- */}
            <a
              href="/d(1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105 transform text-base bg-transparent text-gray-800 border-2 border-gray-300 hover:bg-gray-100"
            >
              Download Enterprise Brochure
            </a>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-gray-50/70">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Enterprise-Grade Solutions</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Powerful tools designed for the scale, security, and customization your business needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map(feature => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Redefine Your Space?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how Deckoviz can create a unique, immersive experience for your brand.
          </p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Schedule Your Enterprise Demo
          </Button>
        </div>
      </section>

      {isModalOpen && <DemoRequestModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};