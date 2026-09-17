import React, { useState } from 'react';
import { 
  Palette, 
  SunMedium, 
  MonitorSmartphone, 
  Box, 
  SlidersHorizontal, 
  Wine, 
  Building2, 
  ShoppingBag, 
  Leaf, 
  Building, 
  Ticket, 
  Image as ImageIcon, 
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeckovizSectors: React.FC = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      icon: <Palette className="w-7 h-7 stroke-[#0A8378]" />,
      title: "Generate custom art, visuals, and animations for your space",
    },
    {
      icon: <SunMedium className="w-7 h-7 stroke-[#0A8378]" />,
      title: "Adapt content to time of day, mood, season, or audience",
    },
    {
      icon: <MonitorSmartphone className="w-7 h-7 stroke-[#0A8378]" />,
      title: "Display dynamic signage, product visuals, or brand storytelling",
    },
    {
      icon: <Box className="w-7 h-7 stroke-[#0A8378]" />,
      title: "Create immersive environments instead of static interiors",
    },
    {
      icon: <SlidersHorizontal className="w-7 h-7 stroke-[#0A8378]" />,
      title: "Control everything remotely through a unified system",
    }
  ];

  const sectors = [
    {
      id: "restaurants",
      route: "/deckoviz-for-restaurants",
      icon: <Wine className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Restaurants & Cafés",
      subtitle: "Create dining ambiance",
      category: "FOOD & BEVERAGE"
    },
    {
      id: "hotels",
      route: "/deckoviz-for-hotels",
      icon: <Building2 className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Hotels & Resorts",
      subtitle: "Elevate guest experiences",
      category: "HOSPITALITY"
    },
    {
      id: "schools",
      route: "/deckoviz-for-schools",
      icon: <GraduationCap className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Schools & Learning",
      subtitle: "Educational spaces",
      category: "EDUCATION"
    },
    {
      id: "universities",
      route: "/deckoviz-for-universities",
      icon: <GraduationCap className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Colleges & Universities",
      subtitle: "Higher Education Portal",
      category: "EDUCATION"
    },
    {
      id: "realestate",
      route: "/deckoviz-for-real-estate",
      icon: <Building className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Real Estate",
      subtitle: "Showcase properties",
      category: "REAL ESTATE"
    },
    {
      id: "architects",
      route: "/deckoviz-for-architects",
      icon: <Box className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Architects & Designers",
      subtitle: "Design living spaces",
      category: "DESIGN"
    },
    {
      id: "retail",
      route: "/deckoviz-for-stores",
      icon: <ShoppingBag className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Retail & Showrooms",
      subtitle: "Shopping experiences",
      category: "RETAIL"
    },
    {
      id: "offices",
      route: "/deckoviz-for-offices",
      icon: <Building className="w-7 h-7 stroke-[#0EA99B]" />,
      title: "Offices & Workspaces",
      subtitle: "Inspire productivity",
      category: "ENTERPRISE"
    }
  ];

  return (
    <div 
      className="relative min-h-screen text-[#0E2438] overflow-x-hidden selection:bg-[#5CD9C4] selection:text-[#071B2C]"
      style={{
        background: `
          radial-gradient(ellipse 60% 45% at 15% 0%, #DDF6F0 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at 100% 15%, rgba(14, 169, 155, 0.10) 0%, transparent 55%),
          linear-gradient(180deg, #F6FAF9 0%, #EDF6F4 100%)
        `,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-fraunces {
          font-family: 'Fraunces', serif;
        }

        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 25px) scale(1.05); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -35px) scale(1.1); }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0.6); }
          70% { box-shadow: 0 0 0 9px rgba(14, 169, 155, 0); }
          100% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0); }
        }
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        .animate-float-a { animation: floatA 22s ease-in-out infinite; }
        .animate-float-b { animation: floatB 26s ease-in-out infinite; }
        .animate-float-c { animation: floatC 30s ease-in-out infinite; }
        .animate-pulse-dot { animation: pulseDot 2.2s infinite; }

        .grad-text {
          background: linear-gradient(100deg, #0EA99B, #1B4C79, #2FC2AE);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradShift 7s linear infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.56);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow: 0 20px 60px -25px rgba(11, 42, 69, 0.25);
        }
      `}</style>

      {/* Decorative Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[38vw] h-[38vw] top-[-8%] left-[-10%] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle,#9BE8DB,transparent_70%)] animate-float-a" />
        <div className="absolute w-[34vw] h-[34vw] top-[8%] right-[-8%] rounded-full blur-[90px] opacity-32 bg-[radial-gradient(circle,#5CD9C4,transparent_70%)] animate-float-b" />
        <div className="absolute w-[30vw] h-[30vw] bottom-[6%] left-[20%] rounded-full blur-[90px] opacity-16 bg-[radial-gradient(circle,#1B4C79,transparent_72%)] animate-float-c" />
      </div>

      <main className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-sm font-semibold text-[#0A8378] tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
              DECKOVIZ FOR BUSINESS
            </div>

            <h1 className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-tight">
              Choose Your <span className="grad-text">Industry</span>
            </h1>

            <p className="text-[#4C6A83] text-lg sm:text-2xl font-normal max-w-3xl mx-auto leading-relaxed">
              Discover how Deckoviz transforms your space into a living, intelligent, multi-sensory environment.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {capabilities.map((cap, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between border border-white/80 shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm mb-4">
                  {cap.icon}
                </div>
                <p className="text-sm font-medium text-[#0B2A45] leading-relaxed">
                  {cap.title}
                </p>
              </div>
            ))}
          </div>

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-8">
            {sectors.map((sec) => (
              <div
                key={sec.id}
                onClick={() => navigate(sec.route)}
                className="glass-card rounded-3xl p-6 border border-white/80 shadow-xl hover:-translate-y-1.5 hover:border-[#0EA99B]/40 transition-all duration-300 cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {sec.icon}
                  </div>
                  <div>
                    <h3 className="font-fraunces text-xl text-[#0B2A45] font-medium leading-snug group-hover:text-[#0EA99B] transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-sm text-[#4C6A83] font-normal">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/70 border border-white/90 flex items-center justify-center text-[#0EA99B] group-hover:bg-gradient-to-br group-hover:from-[#0EA99B] group-hover:to-[#123C63] group-hover:text-white transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Contact Note */}
          <div className="text-center text-sm text-[#7C93A6] pt-12">
            Can't find your industry?{' '}
            <button 
              onClick={() => navigate('/contact')} 
              className="text-[#0EA99B] font-semibold underline underline-offset-4 hover:text-[#0B2A45]"
            >
              Contact Us
            </button>{' '}
            for custom enterprise solutions.
          </div>

        </div>
      </main>
    </div>
  );
};

export default DeckovizSectors;
