import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import microsites dynamically to avoid any bundling issues
const HotelsMicrosite = React.lazy(() => import('./microsites/HotelsMicrosite'));
const RetailMicrosite = React.lazy(() => import('./microsites/RetailMicrosite'));
const WellnessMicrosite = React.lazy(() => import('./microsites/WellnessMicrosite'));
const OfficesMicrosite = React.lazy(() => import('./microsites/OfficesMicrosite'));
const EventsMicrosite = React.lazy(() => import('./microsites/EventsMicrosite'));
const ArtsMicrosite = React.lazy(() => import('./microsites/ArtsMicrosite'));
const EducationMicrosite = React.lazy(() => import('./microsites/EducationMicrosite'));
const EnterpriseVisionMicrosite = React.lazy(() => import('./EnterpriseVisionMicrosite'));

const DeckovizSectors: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [showEnterpriseMicrosite, setShowEnterpriseMicrosite] = useState(false);
  
  // Lock body scroll when microsite is open
  React.useEffect(() => {
    if (selectedSector || showEnterpriseMicrosite) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedSector, showEnterpriseMicrosite]);

  const capabilities = [
    {
      icon: "🎨",
      title: "Generate custom art, visuals, and animations for your space",
      gradient: "from-orange-400 to-pink-400"
    },
    {
      icon: "🌅",
      title: "Adapt content to time of day, mood, season, or audience",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      icon: "📱",
      title: "Display dynamic signage, product visuals, or brand storytelling",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: "🎭",
      title: "Create immersive environments instead of static interiors",
      gradient: "from-purple-400 to-indigo-400"
    },
    {
      icon: "🎮",
      title: "Control everything remotely through a unified system",
      gradient: "from-pink-400 to-purple-400"
    }
  ];

  const sectors = [
    {
      id: "restaurants",
      icon: "🍷",
      title: "Restaurants & Fine Dining",
      category: "FOOD & BEVERAGE",
      gradient: "from-red-400 to-pink-400",
      highlighted: false
    },
    {
      id: "hotels",
      icon: "🏨",
      title: "Hotels & Luxury Resorts",
      category: "HOSPITALITY",
      gradient: "from-blue-400 to-cyan-400",
      highlighted: false
    },
    {
      id: "retail",
      icon: "🛍️",
      title: "Retail & Flagship Stores",
      category: "RETAIL",
      gradient: "from-orange-400 to-yellow-400",
      highlighted: true
    },
    {
      id: "wellness",
      icon: "🧘",
      title: "Spas & Wellness Centers",
      category: "WELLNESS",
      gradient: "from-purple-400 to-pink-400",
      highlighted: false
    },
    {
      id: "offices",
      icon: "🏢",
      title: "Corporate Offices & HQs",
      category: "ENTERPRISE",
      gradient: "from-indigo-400 to-blue-400",
      highlighted: false
    },
    {
      id: "events",
      icon: "🎪",
      title: "Events, Galas & Venues",
      category: "EVENTS",
      gradient: "from-pink-400 to-red-400",
      highlighted: false
    },
    {
      id: "arts",
      icon: "🖼️",
      title: "Art Galleries & Museums",
      category: "ARTS",
      gradient: "from-cyan-400 to-blue-400",
      highlighted: false
    },
    {
      id: "education",
      icon: "🎓",
      title: "Schools & Universities",
      category: "EDUCATION",
      gradient: "from-green-400 to-teal-400",
      highlighted: false
    }
  ];

  return (
    <>
      <section className="relative py-32 bg-[#fafcff] overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-purple-300/30 to-indigo-300/30 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-pink-300/30 to-orange-300/30 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Enterprise Vision Microsite Trigger Button */}
          <div className="flex justify-center mb-20">
            <div className="relative group">
              {/* Outer Glow Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-full blur-md opacity-40 group-hover:opacity-75 group-hover:blur-lg transition-all duration-500" />
              
              <button
                onClick={() => setShowEnterpriseMicrosite(true)}
                className="relative flex items-center gap-4 p-2 pr-6 bg-gray-900 border border-white/10 rounded-full shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)]"
              >
                {/* Subtle gradient background inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />
                
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
                  🏢
                </div>

                <div className="text-left relative z-10 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                      Deckoviz For Enterprises
                    </p>
                  </div>
                  <p className="text-white font-medium text-sm md:text-base leading-tight tracking-wide group-hover:text-cyan-100 transition-colors">
                    The Problem It Solves
                  </p>
                </div>
                
                <div className="ml-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 relative z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Badge */}
          <div className="text-center mb-8 relative z-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_8px_16px_rgba(147,51,234,0.1)] text-purple-600 text-sm font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              Built For
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] mb-8 leading-tight tracking-tight text-gray-900 relative z-10 drop-shadow-sm">
            What Businesses <span className="italic text-gray-400">&</span>{" "}
            <span className="italic relative inline-block">
              <span className="absolute -inset-2 bg-gradient-to-r from-purple-100 to-indigo-100 blur-xl opacity-50 rounded-full"></span>
              <span className="relative bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent pb-2">
                Spaces
              </span>
            </span>{" "}
            Is Deckoviz For
          </h2>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-lg md:text-xl max-w-4xl mx-auto mb-20 leading-relaxed font-light relative z-10">
            Deckoviz is a dynamic visual engine designed to bring many kinds of spaces to life. Powered by generative AI, deep customization, and intelligent content orchestration, it allows businesses to create, adapt, and display visual experiences that evolve with their environment, audience, and purpose. From ambient art to marketing visuals, from storytelling to product showcases, Deckoviz turns any wall into a living surface, adapting to enterprises from restaurants to hotels.
          </p>

          {/* Subheading */}
          <div className="text-center mb-10 relative z-10">
            <h3 className="text-indigo-600 text-sm font-bold tracking-[0.2em] uppercase">
              With Deckoviz, You Can
            </h3>
          </div>

          {/* Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-28 relative z-10">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/60 shadow-[0_8px_32px_rgba(109,40,217,0.10),0_2px_8px_rgba(79,70,229,0.07)] hover:shadow-[0_24px_64px_rgba(99,40,217,0.22),0_4px_16px_rgba(109,40,217,0.12)] hover:border-violet-300/80 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    {capability.icon}
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed font-medium">
                    {capability.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sectors Section */}
          <div className="mt-20 relative z-10">
            <div className="text-center mb-16">
              <p className="text-indigo-600/80 text-sm font-bold tracking-[0.15em] uppercase max-w-2xl mx-auto leading-relaxed">
                Below are some of the sectors where Deckoviz can transform the customer experience, brand presence, and atmosphere of a space.
              </p>
            </div>

            {/* Sector Cards — 2-column grid → 4 rows */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`
                    group relative bg-white/80 backdrop-blur-md rounded-3xl p-6 border transition-all duration-500 cursor-pointer overflow-hidden
                    ${sector.highlighted 
                      ? 'border-orange-300 shadow-[0_8px_30px_rgba(251,146,60,0.18),0_2px_8px_rgba(251,146,60,0.10)] hover:shadow-[0_20px_50px_rgba(251,146,60,0.32),0_4px_16px_rgba(251,146,60,0.16)] hover:-translate-y-1' 
                      : 'border-violet-200/60 shadow-[0_8px_32px_rgba(109,40,217,0.10),0_2px_8px_rgba(79,70,229,0.07)] hover:border-violet-300/80 hover:shadow-[0_20px_56px_rgba(99,40,217,0.22),0_4px_16px_rgba(109,40,217,0.12)] hover:-translate-y-1'
                    }
                  `}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500`}>
                        {sector.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
                          {sector.title}
                        </h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                          {sector.category}
                        </p>
                      </div>
                    </div>
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110
                      ${sector.highlighted 
                        ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-500/30' 
                        : 'bg-gray-50 text-gray-400 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-500/30'
                      }
                    `}>
                      <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Message */}
            <div className="mt-24 text-center relative max-w-3xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-12 border border-white/50 shadow-2xl">
                <div className="flex justify-center mb-4">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mx-1"></span>
                  <span className="w-2 h-2 rounded-full bg-pink-400 mx-1"></span>
                  <span className="w-2 h-2 rounded-full bg-orange-400 mx-1"></span>
                </div>
                <h3 className="text-3xl md:text-4xl font-['Playfair_Display'] text-gray-900 mb-6 font-semibold">
                  Don't see your space?
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  Deckoviz solves problems of attention, emotion, memory, differentiation, and scale for modern environments.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Microsites with Suspense */}
      <React.Suspense fallback={<div className="fixed inset-0 z-50 bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
        {selectedSector === 'restaurants' && (
          <RestaurantMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {selectedSector === 'hotels' && (
          <HotelsMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {selectedSector === 'retail' && (
          <RetailMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {selectedSector === 'wellness' && (
          <WellnessMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {selectedSector === 'offices' && (
          <OfficesMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {selectedSector === 'events' && (
          <EventsMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {selectedSector === 'arts' && (
          <ArtsMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {selectedSector === 'education' && (
          <EducationMicrosite onClose={() => setSelectedSector(null)} />
        )}
        {showEnterpriseMicrosite && (
          <EnterpriseVisionMicrosite onClose={() => setShowEnterpriseMicrosite(false)} />
        )}
      </React.Suspense>
    </>
  );
};

// Restaurant Microsite Component
const RestaurantMicrosite: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/place-order');
  };

  const handleScheduleDemo = () => {
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
      {/* Close Button - Enhanced for mobile */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 active:scale-95"
        aria-label="Close microsite"
      >
        <X size={24} />
      </button>

      {/* Content */}
      <div className="relative">
        
        {/* Global floating food emojis for entire page */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Glowing light orbs - Purple/Lavender theme */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-400/15 blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-violet-400/12 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/4 left-1/3 w-36 h-36 rounded-full bg-indigo-400/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-purple-300/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-violet-300/12 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 right-1/3 w-36 h-36 rounded-full bg-purple-400/10 blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }} />
          
          {/* Floating food emojis */}
          <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float-slow">�</div>
          <div className="absolute top-40 right-20 text-5xl opacity-15 animate-float-slower">�</div>
          <div className="absolute top-60 left-1/4 text-3xl opacity-20 animate-float-medium">☕</div>
          <div className="absolute top-80 right-1/4 text-4xl opacity-15 animate-float-slow delay-1000">�</div>
          <div className="absolute top-1/3 left-1/3 text-5xl opacity-10 animate-float-slower delay-2000">🍰</div>
          <div className="absolute top-1/2 left-10 text-3xl opacity-20 animate-float-medium delay-1500">🥗</div>
          <div className="absolute top-2/3 right-1/3 text-4xl opacity-15 animate-float-slow delay-500">🍜</div>
          <div className="absolute bottom-1/3 right-10 text-3xl opacity-15 animate-float-slower delay-3000">�</div>
          <div className="absolute bottom-40 left-1/4 text-4xl opacity-20 animate-float-medium delay-1000">🥘</div>
          <div className="absolute bottom-20 right-1/4 text-3xl opacity-15 animate-float-slow delay-2500">🍱</div>
          
          {/* Additional emojis for more coverage */}
          <div className="absolute top-1/4 right-10 text-4xl opacity-15 animate-float-slower delay-500">🧁</div>
          <div className="absolute top-3/4 left-20 text-3xl opacity-20 animate-float-medium delay-2000">🥐</div>
          <div className="absolute bottom-1/2 right-20 text-4xl opacity-15 animate-float-slow delay-1500">🍝</div>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes float-slow {
              0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
              25% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
              50% { transform: translateY(-40px) translateX(-10px) rotate(-5deg); }
              75% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
            }
            
            @keyframes float-slower {
              0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
              25% { transform: translateY(-30px) translateX(-15px) rotate(-8deg); }
              50% { transform: translateY(-60px) translateX(15px) rotate(8deg); }
              75% { transform: translateY(-30px) translateX(-15px) rotate(-8deg); }
            }
            
            @keyframes float-medium {
              0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
              25% { transform: translateY(-15px) translateX(8px) rotate(3deg); }
              50% { transform: translateY(-30px) translateX(-8px) rotate(-3deg); }
              75% { transform: translateY(-15px) translateX(8px) rotate(3deg); }
            }
            
            .animate-float-slow {
              animation: float-slow 8s ease-in-out infinite;
            }
            
            .animate-float-slower {
              animation: float-slower 12s ease-in-out infinite;
            }
            
            .animate-float-medium {
              animation: float-medium 10s ease-in-out infinite;
            }
            
            .delay-500 {
              animation-delay: 0.5s;
            }
            
            .delay-1000 {
              animation-delay: 1s;
            }
            
            .delay-1500 {
              animation-delay: 1.5s;
            }
            
            .delay-2000 {
              animation-delay: 2s;
            }
            
            .delay-2500 {
              animation-delay: 2.5s;
            }
            
            .delay-3000 {
              animation-delay: 3s;
            }
          `
        }} />
        
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10">
          {/* Badge */}
          <div className="mb-8 relative z-10">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-900/80 to-orange-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
              🍷 RESTAURANTS & FINE DINING 🍷
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] mb-8 relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400">
              Transform Every Meal Into
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300">
              A Multisensory Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 relative z-10">
            Art that shifts from bright brunch vibes to intimate dinner moods 
            automatically, beautifully. Create unforgettable dining atmospheres that evolve
            throughout the day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <button 
              onClick={handleScheduleDemo}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              ✨ Schedule a Demo →
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              Intelligent Features for Modern Dining
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Every feature designed to enhance ambience, engage guests, and elevate your brand
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature Card 1 */}
              <div className="group relative bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm rounded-3xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-3xl mb-6">
                  🕐
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Time-of-Day Ambience</h3>
                <p className="text-gray-300 leading-relaxed">
                  Automatically transition from energetic breakfast vibes to romantic dinner atmospheres. Your walls adapt to the time, mood, and occasion.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="group relative bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-3xl mb-6">
                  🍽️
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Live Menu Displays</h3>
                <p className="text-gray-300 leading-relaxed">
                  Showcase daily specials, chef recommendations, and seasonal dishes with stunning visual presentations that make every item irresistible.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="group relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-6">
                  🖼️
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Chef Storytelling Walls</h3>
                <p className="text-gray-300 leading-relaxed">
                  Share your culinary journey, ingredient sourcing, and kitchen philosophy through immersive visual narratives that build emotional connections.
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="group relative bg-gradient-to-br from-green-900/20 to-teal-900/20 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-3xl mb-6">
                  📅
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Seasonal Visual Drops</h3>
                <p className="text-gray-300 leading-relaxed">
                  Celebrate holidays, seasons, and special events with themed visual environments that keep your space fresh and Instagram-worthy year-round.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dining Concepts Section */}
        <div className="py-20 px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              Perfect For Every Dining Concept
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              From fine dining to casual cafés, we've got you covered
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-900/30 to-black rounded-3xl p-8 text-center border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🍷</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Fine Dining</h3>
                <p className="text-gray-400">Elegant, sophisticated atmospheres</p>
              </div>

              <div className="bg-gradient-to-br from-orange-900/30 to-black rounded-3xl p-8 text-center border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🍔</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Casual Restaurants</h3>
                <p className="text-gray-400">Vibrant, welcoming environments</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/30 to-black rounded-3xl p-8 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">☕</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Cafés & Bistros</h3>
                <p className="text-gray-400">Cozy, Instagram-worthy spaces</p>
              </div>

              <div className="bg-gradient-to-br from-teal-900/30 to-black rounded-3xl p-8 text-center border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Hotel Restaurants</h3>
                <p className="text-gray-400">Luxury hospitality experiences</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-black rounded-3xl p-8 text-center border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🌃</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Rooftop Bars</h3>
                <p className="text-gray-400">Dynamic nightlife ambience</p>
              </div>

              <div className="bg-gradient-to-br from-pink-900/30 to-black rounded-3xl p-8 text-center border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Private Dining</h3>
                <p className="text-gray-400">Exclusive, customizable settings</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-6 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-sm rounded-3xl p-12 border border-orange-500/30">
              <div className="text-4xl mb-6">✨</div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-white mb-6">
                Ready to Transform Your Restaurant?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join leading restaurants worldwide who are creating unforgettable dining experiences with Deckoviz
              </p>
              <button 
                onClick={handleGetStarted}
                className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg rounded-full font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
              >
                ✨ Get Started Today →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeckovizSectors;
