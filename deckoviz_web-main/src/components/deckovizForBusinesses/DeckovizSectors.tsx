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

const DeckovizSectors: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  
  // Lock body scroll when microsite is open
  React.useEffect(() => {
    if (selectedSector) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedSector]);

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
              ✦ DECKOVIZ - BUILT FOR
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] mb-6 leading-tight">
            <span className="text-black">What Businesses </span>
            <span className="text-black italic">& </span>
            <span className="italic bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Spaces
            </span>
            <span className="text-black"> Is Deckoviz For</span>
          </h2>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-lg md:text-xl max-w-4xl mx-auto mb-16 leading-relaxed">
            Deckoviz is a dynamic visual engine designed to bring many kinds of spaces to life. Powered by generative AI, deep customization, and intelligent content orchestration, it allows businesses to create, adapt, and display visual experiences that evolve with their environment, audience, and purpose. From ambient art to marketing visuals, from storytelling to product showcases, Deckoviz turns any wall into a living surface, adapting to enterprises from restaurants to hotels.
          </p>

          {/* Subheading */}
          <div className="text-center mb-12">
            <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">
              WITH DECKOVIZ, YOU CAN
            </p>
          </div>

          {/* Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {capability.icon}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {capability.title}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Sectors Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <p className="text-gray-400 text-sm font-medium tracking-wider uppercase">
                Below are some of the sectors where Deckoviz can transform the customer experience, brand presence, and atmosphere of a space.
              </p>
            </div>

            {/* Sector Cards */}
            <div className="max-w-4xl mx-auto space-y-4">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`
                    group relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer
                    ${sector.highlighted 
                      ? 'border-orange-400 shadow-lg shadow-orange-100' 
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-2xl shadow-md`}>
                        {sector.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {sector.title}
                        </h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">
                          {sector.category}
                        </p>
                      </div>
                    </div>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${sector.highlighted 
                        ? 'bg-orange-400 text-white' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600'
                      }
                    `}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Bottom Message */}
            <div className="mt-16 text-center bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 rounded-3xl p-12">
              <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] text-gray-900 mb-4">
                • Don't see your space? •
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Deckoviz solves problems of attention, emotion, memory, differentiation, and scale for modern environments.
              </p>
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
