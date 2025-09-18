"use client"

import React from 'react';
import { useState } from 'react';
import { Building, Layers, Code, Headset, BarChart2, Shield, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { DynamicImageGrid } from "../other/DynamicImageGrid";

// --- REUSABLE COMPONENTS (Updated with new styling) ---

const Button = ({ children, variant = 'primary', onClick }: { children: React.ReactNode, variant?: 'primary' | 'secondary', onClick?: () => void }) => {
    // Style matched with the buttons in the first component
    const baseClasses = "px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5";
    const variants = {
        primary: "bg-[#6670d8] text-white hover:bg-indigo-700",
        secondary: "bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-300/50 hover:bg-gray-100"
    };
    return <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>{children}</button>;
};

// --- NEW STYLED FEATURE CARD (Updated with new text styling) ---
const EnterpriseFeatureCard = ({ icon, title, description, themeColor }: { icon: React.ReactNode, title: string, description: string, themeColor: string }) => {
    const themes: { [key: string]: { gradient: string, text: string, accent: string } } = {
        purple: { gradient: "from-purple-500 to-indigo-500", text: "text-purple-600", accent: "group-hover:from-purple-400" },
        blue: { gradient: "from-blue-500 to-cyan-500", text: "text-blue-600", accent: "group-hover:from-blue-400" },
        emerald: { gradient: "from-emerald-500 to-teal-500", text: "text-emerald-600", accent: "group-hover:from-emerald-400" },
    };
    const theme = themes[themeColor] || themes.purple;

    return (
        <div className="relative group cursor-pointer h-full">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${theme.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${theme.gradient} group-hover:scale-110 transition-transform duration-300`}>
                            {icon}
                        </div>
                        <div className={`w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full ${theme.accent} transition-colors duration-300`} />
                    </div>
                    <div className={`text-gray-400 ${theme.text} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                {/* Matched h3 styling */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">{title}</h3>
                {/* Matched p styling with card descriptions from the first file */}
                <p className="text-indigo-700 font-medium text-sm leading-relaxed flex-grow">{description}</p>
                <div className="mt-8 pt-4 border-t border-gray-100">
                    <div className={`h-1 bg-gradient-to-r ${theme.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative transition-all duration-300 ease-in-out transform scale-95 opacity-0 animate-fade-in-scale">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    {/* Matched heading style */}
                    <h3 className="text-xl font-semibold text-gray-900">Request an Enterprise Demo</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" aria-label="Close modal">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Form fields remain the same */}
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
                         {/* Matched button style */}
                        <button type="submit" className="w-full bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const enterpriseImages = [
    { src: '/images/DIGE6.png' },
    { src: '/images/DIGE2.png' },
    { src: '/images/DIGE3.png' },
    { src: '/images/DIGE4.png' },
    { src: '/images/DIGE5.png' },
    { src: '/images/DIGE7.png' },
    { src: '/images/DIGE8.png' },
    { src: '/images/DIGE9.png' },
];

export default function DeckovizForEnterprise() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const enterpriseFeatures = [
        { icon: <Layers size={28} className="text-white" />, title: "Scalable Network Management", description: "Control one or one thousand frames across multiple locations from a single, intuitive dashboard." },
        { icon: <Building size={28} className="text-white" />, title: "Custom Content & Branding", description: "Integrate your brand's logos, color palettes, and marketing visuals directly into the art experience." },
        { icon: <Code size={28} className="text-white" />, title: "API Integration & Control", description: "Utilize our robust API to connect Deckoviz with your existing systems for automated content updates." },
        { icon: <Headset size={28} className="text-white" />, title: "Dedicated Support & Onboarding", description: "Receive white-glove service with a dedicated account manager and comprehensive team training." },
        { icon: <BarChart2 size={28} className="text-white" />, title: "Advanced Analytics", description: "Gain insights into audience engagement and content performance with detailed analytics." },
        { icon: <Shield size={28} className="text-white" />, title: "Enhanced Security", description: "Benefit from enterprise-grade security protocols to protect your network, content, and data integrity." }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section with Gradient Background */}
            <div className="min-h-[120vh] relative overflow-hidden">
                {/* Gradient Background Effects - Only for Hero Section */}
                <div className="absolute inset-0">
                    {/* Animated Gradient Layers */}
                    <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-500/25 via-purple-400/15 to-transparent blur-[40px] animate-[floatLeft_6s_ease-in-out_infinite]"></div>
                    <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-400/10 to-transparent blur-[50px] animate-[floatCenter_8s_ease-in-out_infinite]"></div>
                    <div className="absolute top-1/2 left-0 w-3/5 h-1/2 bg-gradient-to-r from-indigo-500/15 via-purple-400/8 to-transparent blur-[60px] animate-[floatBottom_10s_ease-in-out_infinite]"></div>
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/25 via-purple-400/15 to-transparent blur-[50px] animate-[floatRight_7s_ease-in-out_infinite]"></div>
                    <div className="absolute top-0 left-0 w-1/6 h-1/3 bg-gradient-to-r from-indigo-600/30 via-rose-400/15 to-transparent blur-[30px] animate-[pulse_4s_ease-in-out_infinite]"></div>
                    <div className="absolute top-1/3 left-0 w-1/5 h-1/2 bg-gradient-to-r from-indigo-500/20 via-rose-400/17 to-transparent blur-[35px] animate-[floatLeft_5s_ease-in-out_infinite_1s]"></div>
                    <div className="absolute top-2/3 left-0 w-1/4 h-1/3 bg-gradient-to-r from-indigo-600/35 via-rose-400/20 to-transparent blur-[40px] animate-[floatCenter_6s_ease-in-out_infinite_2s]"></div>
                    <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-indigo-600/30 via-rose-400/15 to-transparent blur-[35px] animate-[floatRight_9s_ease-in-out_infinite_1.5s]"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-300/20 via-pink-300/18 to-transparent blur-[45px] animate-[floatBottom_8s_ease-in-out_infinite_3s]"></div>

                    {/* Curved Grid Pattern - Barrel Distortion Effect */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
                        viewBox="0 0 1000 800"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <g stroke="white" strokeWidth="1" fill="none">
                            {/* Vertical curved lines (longitude-style) */}
                            {Array.from({ length: 25 }).map((_, i) => {
                                const x = (i / 24) * 1000;
                                const curvature = Math.sin((i / 24) * Math.PI) * 120;
                                return (
                                    <path
                                        key={`v-${i}`}
                                        d={`M ${x} 0 Q ${x + curvature} 400 ${x} 800`}
                                    />
                                );
                            })}
                            
                            {/* Horizontal curved lines (latitude-style) */}
                            {Array.from({ length: 20 }).map((_, i) => {
                                const y = (i / 19) * 800;
                                const distanceFromCenter = Math.abs(y - 400) / 400;
                                const compression = 1 - distanceFromCenter * 0.7;
                                const curve = 150 * (1 - compression);
                                
                                return (
                                    <path
                                        key={`h-${i}`}
                                        d={`M 0 ${y} Q ${250 + curve} ${y} 500 ${y} T 1000 ${y}`}
                                    />
                                );
                            })}
                        </g>
                    </svg>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
                    {/* Top Badge */}
                    <div className="mt-28 mb-10 shadow-lg hover:shadow-xl">
                        <span className="inline-flex items-center px-3 py-1 bg-[#6670d8] text-white text-sm font-medium rounded-md">
                            Deckoviz For All
                        </span>
                    </div>

                    {/* Main Heading */}
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-5xl font-semibold text-gray-900 leading-tight">
                            Deckoviz For Enterprises
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <div className="mb-12 max-w-2xl">
                        <p className="text-lg font-medium text-gray-900 leading-relaxed">
                            Deckoviz help hotel business cultural spaces captivate their audience with
                            intelligent ever-evoloving visuals ,blending art brand story-telling and technology into one seamless expereince
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                            Request an Enterprise Demo
                        </Button>
                        <a href="/d(1).pdf" target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary">
                                Download Brochure
                            </Button>
                        </a>
                    </div>

                    {/* Description Paragraphs */}
                </div>
            </div>

            {/* YT and Instagram */}
            <div className="bg-white py-12 md:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Enhanced Heading Section */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-4xl font-semibold text-gray-900 leading-tight mb-7">
                            Learn More About
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {" "}Deckoviz
                            </span>
                        </h2>
                        <p className="text-sm mb-16 md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Dive deeper into the world of AI-powered smart art frames and discover how Deckoviz is 
                            revolutionizing hospitality experiences through immersive visual storytelling.
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
                                        background: "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
                                        filter: "blur(40px)"
                                    }}
                                />
                                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">Watch Deckoviz Transform Spaces</h3>
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
                            </div>
                        </div>

                        <div className="relative group mt-0">
                            <div className="relative p-4 sm:p-6 md:p-8">
                                {/* Background Glow */}
                                <div 
                                    className="absolute -inset-12 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                                    style={{
                                        background: "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
                                        filter: "blur(40px)"
                                    }}
                                />

                                {/* Instagram Container */}
                                <div className="relative bg-white/95 backdrop-blur-sm w-full max-w-md mx-auto rounded-3xl p-3 shadow-2xl border border-white/60 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                                    
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
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Follow Our Journey</h3>
                                        <p className="text-sm text-gray-600">Daily inspiration & updates.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <DynamicImageGrid 
                imageSources={enterpriseImages}
                sectionTitle="A Canvas for Every Environment"
                sectionDescription="From lobbies to luxury suites, see how Deckoviz adapts to any enterprise space."
            />

            {/* Features Section */}
            <section className="relative py-20 md:py-28">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 w-[600px] h-[600px] opacity-30" style={{ background: "radial-gradient(circle at center, rgba(147,51,234,0.4) 0%, rgba(219,39,119,0.25) 40%, transparent 90%)", filter: "blur(140px)" }} />
                    <div className="absolute bottom-20 left-20 w-[500px] h-[500px] opacity-20" style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.2) 50%, transparent 80%)", filter: "blur(120px)" }} />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        {/* UPDATED: font-bold to font-semibold */}
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">Enterprise-Grade Solutions</h2>
                        {/* UPDATED: text-gray-600 to text-gray-800 */}
                        <p className="text-lg text-gray-800 mt-4 max-w-2xl mx-auto leading-relaxed">
                            Powerful tools designed for the scale, security, and customization your business needs.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enterpriseFeatures.map((feature, index) => {
                            const themeColors = ['purple', 'blue', 'emerald', 'purple', 'blue', 'emerald'];
                            return (
                                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                                    <EnterpriseFeatureCard {...feature} themeColor={themeColors[index % themeColors.length]} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6 text-center">
                     {/* UPDATED: font-bold to font-semibold */}
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
                        Ready to Redefine Your Space?
                    </h2>
                    {/* UPDATED: text-gray-600 to text-gray-900, added font-medium */}
                    <p className="text-lg text-gray-900 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
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