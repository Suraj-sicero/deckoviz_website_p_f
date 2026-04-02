import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HotelsMicrositeProps {
  onClose: () => void;
}

const HotelsMicrosite: React.FC<HotelsMicrositeProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/place-order');
  };

  const handleScheduleDemo = () => {
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-900">
      {/* Close Button - Enhanced for mobile */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 active:scale-95"
        aria-label="Close microsite"
      >
        <X size={24} />
      </button>

      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glowing orbs - Blue/Cyan luxury theme */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-cyan-400/15 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-blue-400/12 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/4 w-36 h-36 rounded-full bg-teal-400/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-cyan-300/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Floating hotel/luxury emojis */}
        <div className="absolute top-20 left-10 text-4xl opacity-15 animate-float-slow">🏨</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float-slower">✨</div>
        <div className="absolute top-60 left-1/4 text-3xl opacity-15 animate-float-medium">🛎️</div>
        <div className="absolute top-1/3 right-1/3 text-4xl opacity-10 animate-float-slow delay-1000">🌟</div>
        <div className="absolute top-1/2 left-10 text-3xl opacity-15 animate-float-slower delay-2000">🗝️</div>
        <div className="absolute bottom-1/3 right-10 text-4xl opacity-10 animate-float-medium delay-1500">💎</div>
        <div className="absolute bottom-40 left-1/4 text-3xl opacity-15 animate-float-slow delay-500">🏛️</div>
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
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
          .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 10s ease-in-out infinite; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-1000 { animation-delay: 1s; }
          .delay-1500 { animation-delay: 1.5s; }
          .delay-2000 { animation-delay: 2s; }
        `
      }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
              🏨 HOTELS & LUXURY RESORTS 🏨
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300">
              Five Stars, Infinite Moods
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200">
              Emotionally Intelligent Hospitality
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
            Transform static hotel environments into living, breathing spaces that adapt to every guest's rhythm. From lobby to suite, create unforgettable experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleScheduleDemo}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              ✨ Schedule a Demo →
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-950/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              Elevate Every Guest Journey
            </h2>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
              Excellence is found in the details guests didn't even know they needed
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-3xl mb-6">
                  🛎️
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Personalized Suite Welcomes</h3>
                <p className="text-gray-300 leading-relaxed">
                  Greet VIPs with their name, favorite art style, or family photos already glowing on the walls upon entry - making a hotel room feel like a private residence.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-blue-900/20 to-teal-900/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-3xl mb-6">
                  🧘
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">In-Room Wellness Modes</h3>
                <p className="text-gray-300 leading-relaxed">
                  Provide guests with curated "Sleep," "Focus," or "Revitalize" loops that sync art and light to help them overcome jet lag or prepare for a big meeting.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-teal-900/20 to-cyan-900/20 backdrop-blur-sm rounded-3xl p-8 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-3xl mb-6">
                  🌅
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Lobby Atmosphere Orchestration</h3>
                <p className="text-gray-300 leading-relaxed">
                  Set the tone from the moment of arrival. Transition from an energetic, sun-drenched check-in vibe to a sophisticated, jazz-infused evening lounge atmosphere automatically.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-3xl mb-6">
                  🎭
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Event Space Metamorphosis</h3>
                <p className="text-gray-300 leading-relaxed">
                  Instantly re-skin event spaces for weddings, corporate galas, or intimate workshops without the cost of physical rentals or decor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Types Section */}
        <div className="py-20 px-6 bg-blue-950/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              Perfect For Every Property Type
            </h2>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
              From boutique hotels to luxury resorts
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-950 rounded-3xl p-8 text-center border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Luxury Hotels</h3>
                <p className="text-gray-400">Five-star experiences</p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-950 rounded-3xl p-8 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🏝️</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Resorts & Spas</h3>
                <p className="text-gray-400">Wellness destinations</p>
              </div>

              <div className="bg-gradient-to-br from-teal-900/30 to-blue-950 rounded-3xl p-8 text-center border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Boutique Hotels</h3>
                <p className="text-gray-400">Unique character</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-sm rounded-3xl p-12 border border-cyan-500/30">
              <div className="text-4xl mb-6">✨</div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-white mb-6">
                Ready to Elevate Your Guest Experience?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                A great hotel provides a bed; a legendary hotel provides an atmosphere
              </p>
              <button 
                onClick={handleGetStarted}
                className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
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

export default HotelsMicrosite;
