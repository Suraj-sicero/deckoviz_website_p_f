import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WellnessMicrositeProps {
  onClose: () => void;
}

const WellnessMicrosite: React.FC<WellnessMicrositeProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/place-order');
  };

  const handleScheduleDemo = () => {
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-violet-950 via-pink-950 to-indigo-900">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 active:scale-95"
        aria-label="Close microsite"
      >
        <X size={24} />
      </button>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-violet-400/15 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-pink-400/12 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-violet-300/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="absolute top-20 left-10 text-4xl opacity-15 animate-float-slow">🧘</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float-slower">🌸</div>
        <div className="absolute top-60 left-1/4 text-3xl opacity-15 animate-float-medium">🕉️</div>
        <div className="absolute top-1/3 right-1/3 text-4xl opacity-10 animate-float-slow delay-1000">💆</div>
        <div className="absolute bottom-1/3 right-10 text-4xl opacity-10 animate-float-medium delay-1500">🌿</div>
        <div className="absolute bottom-40 left-1/4 text-3xl opacity-15 animate-float-slow delay-500">✨</div>
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
        `
      }} />

      <div className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-violet-900/80 to-pink-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
              🧘 SPAS & WELLNESS CENTERS 🧘
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300">
              Spaces That Support
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-violet-200 to-pink-200">
              Energy, Focus, and Calm
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
            Design wellness spaces that support biological well-being. Create environments that help clients find stillness, energy, and restoration through adaptive visual experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleScheduleDemo}
              className="px-8 py-4 bg-gradient-to-r from-[#4f46e5] to-[#2563EB] text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
            >
              ✨ Schedule a Demo →
            </button>
          </div>
        </div>

        <div className="py-20 px-6 bg-gradient-to-b from-transparent to-indigo-950/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              Transform Wellness Spaces Into Sensory Experiences
            </h2>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
              Support your clients' journey to well-being with intelligent, adaptive environments
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative bg-gradient-to-br from-violet-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4f46e5] to-[#2563EB] rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#2563EB] flex items-center justify-center text-3xl mb-6">
                  🧘
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Calming Visuals for Yoga & Meditation</h3>
                <p className="text-gray-300 leading-relaxed">
                  Display nature scenes, abstract flows, or immersive visuals that support mindfulness practices and deepen the meditative experience.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-pink-900/20 to-indigo-900/20 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-3xl mb-6">
                  💪
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Dynamic Workout Visuals</h3>
                <p className="text-gray-300 leading-relaxed">
                  Display energizing motion loops, motivational scenes, and high-energy visuals that inspire movement and enhance workout intensity.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-violet-900/20 to-indigo-900/20 backdrop-blur-sm rounded-3xl p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4f46e5] to-[#2563EB] rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#2563EB] flex items-center justify-center text-3xl mb-6">
                  🌅
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Circadian Synchronicity</h3>
                <p className="text-gray-300 leading-relaxed">
                  Automatically shift visual tones and light intensity from "Sunrise Vitality" to "Evening Rest," reinforcing wellness-led design and biological rhythms.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-pink-900/20 to-rose-900/20 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-3xl mb-6">
                  📅
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Class Schedules & Announcements</h3>
                <p className="text-gray-300 leading-relaxed">
                  Show class schedules, programs, and announcements dynamically, keeping clients informed while maintaining the aesthetic integrity of your space.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-6 bg-violet-950/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              Perfect For Every Wellness Space
            </h2>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
              From yoga studios to luxury spas
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-violet-900/30 to-indigo-950 rounded-3xl p-8 text-center border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">🧘</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Yoga Studios</h3>
                <p className="text-gray-400">Mindful, calming environments</p>
              </div>

              <div className="bg-gradient-to-br from-pink-900/30 to-indigo-950 rounded-3xl p-8 text-center border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">💆</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Luxury Spas</h3>
                <p className="text-gray-400">Restorative, serene spaces</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-950 rounded-3xl p-8 text-center border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">💪</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Fitness Centers</h3>
                <p className="text-gray-400">Energizing, motivational spaces</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-violet-900/40 to-pink-900/40 backdrop-blur-sm rounded-3xl p-12 border border-violet-500/30">
              <div className="text-4xl mb-6">✨</div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-white mb-6">
                Ready to Transform Your Wellness Space?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Turn wellness spaces into sensory experiences that support healing and growth
              </p>
              <button 
                onClick={handleGetStarted}
                className="px-10 py-5 bg-gradient-to-r from-[#4f46e5] to-[#2563EB] text-white text-lg rounded-full font-semibold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
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

export default WellnessMicrosite;
