import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RetailMicrositeProps {
  onClose: () => void;
}

const RetailMicrosite: React.FC<RetailMicrositeProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/place-order');
  };

  const handleScheduleDemo = () => {
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-orange-950 via-yellow-950 to-orange-900">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 active:scale-95"
        aria-label="Close microsite"
      >
        <X size={24} />
      </button>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-orange-400/15 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-yellow-400/12 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-orange-300/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="absolute top-20 left-10 text-4xl opacity-15 animate-float-slow">🛍️</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float-slower">�-</div>
        <div className="absolute top-60 left-1/4 text-3xl opacity-15 animate-float-medium">👔</div>
        <div className="absolute top-1/3 right-1/3 text-4xl opacity-10 animate-float-slow delay-1000">👠</div>
        <div className="absolute bottom-1/3 right-10 text-4xl opacity-10 animate-float-medium delay-1500">💼</div>
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
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-900/80 to-yellow-900/80 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
              🛍️ RETAIL & FLAGSHIP STORES 🛍️
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300">
              Elevate the Aisle
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-200">
              The Future of Retail Experience
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
            Transform your shop from a static floor plan into a living canvas. Create sensory, immersive brand worlds that turn browsing into unforgettable experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleScheduleDemo}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              ✨ Schedule a Demo →
            </button>
          </div>
        </div>

        <div className="py-20 px-6 bg-gradient-to-b from-transparent to-orange-950/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              The Future of the Shop Floor
            </h2>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
              Physical retail must offer something the internet cannot: a sensory, immersive brand world
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative bg-gradient-to-br from-orange-900/20 to-yellow-900/20 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-3xl mb-6">
                  🪟
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Dynamic Storefront Storytelling</h3>
                <p className="text-gray-300 leading-relaxed">
                  Turn your window into a high-signal experience that evolves from morning energy to evening sophistication, stopping foot traffic without manual updates.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-3xl mb-6">
                  �-
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Living Lookbooks</h3>
                <p className="text-gray-300 leading-relaxed">
                  Replace static posters with breathing visuals that show your collections in motion - helping customers visualize the drape, texture, and lifestyle of every piece.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl mb-6">
                  🎨
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Instant Campaign Deployment</h3>
                <p className="text-gray-300 leading-relaxed">
                  Launch sales, new drops, or holiday themes across one store or an entire global fleet instantly. No printing, no shipping, no waste.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-t-3xl" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-3xl mb-6">
                  📱
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">In-Store to Social Bridge</h3>
                <p className="text-gray-300 leading-relaxed">
                  Generate beautiful, high-resolution marketing videos directly from your Deckoviz content, cross-posted to Instagram and TikTok for unified brand voice.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-6 bg-orange-950/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-center mb-6 text-white">
              The Strategic Advantage
            </h2>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
              Core benefits for modern retail
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-900/30 to-orange-950 rounded-3xl p-8 text-center border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Higher Conversion</h3>
                <p className="text-gray-400">Lifestyle context triggers purchase confidence</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/30 to-orange-950 rounded-3xl p-8 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">⏱️</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Increased Dwell Time</h3>
                <p className="text-gray-400">Longer stays correlate with higher revenue</p>
              </div>

              <div className="bg-gradient-to-br from-amber-900/30 to-orange-950 rounded-3xl p-8 text-center border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Premium Perception</h3>
                <p className="text-gray-400">Tech-forward positioning justifies premium pricing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 backdrop-blur-sm rounded-3xl p-12 border border-orange-500/30">
              <div className="text-4xl mb-6">✨</div>
              <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-white mb-6">
                Ready to Redefine Your Retail Space?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                In a world of infinite digital choice, provide an infinite sensory experience
              </p>
              <button 
                onClick={handleGetStarted}
                className="px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-lg rounded-full font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
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

export default RetailMicrosite;
