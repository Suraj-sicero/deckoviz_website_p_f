import React from 'react';

const IMAGES = [
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_14_33%20PM.png",
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_14_36%20PM.png",
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_14_39%20PM.png",
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_14_43%20PM.png",
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_14_51%20PM.png",
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_14_55%20PM.png",
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_15_06%20PM.png",
  "/images/hotel_page/ChatGPT%20Image%20May%2021,%202026,%2007_16_02%20PM.png",
];

const ROW_1 = [...IMAGES, ...IMAGES];
const ROW_2 = [...IMAGES].reverse();
const ROW_2_DOUBLED = [...ROW_2, ...ROW_2];
interface HotelAutoScrollProps {
  theme?: "light" | "dark";
}

const HotelAutoScroll: React.FC<HotelAutoScrollProps> = ({ theme = "light" }) => {
  const isDark = theme === "dark";

  return (
    <div className={`relative py-20 overflow-hidden z-20 ${isDark ? 'bg-transparent' : 'bg-white'}`}>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        .scrolling-wrapper-left {
          display: flex;
          width: max-content;
          animation: scroll-left 50s linear infinite;
        }
        .scrolling-wrapper-right {
          display: flex;
          width: max-content;
          animation: scroll-right 50s linear infinite;
        }
        .scrolling-wrapper-left:hover, .scrolling-wrapper-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative gradient glowing behind the images */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[500px] pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(147,51,234,0.3) 0%, rgba(99,102,241,0.2) 25%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Title */}
      <div className="text-center mb-12 relative z-10 px-4">
        <h2 className={`text-3xl md:text-5xl font-semibold mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`} style={isDark ? { fontFamily: "'Playfair Display', 'Georgia', serif" } : undefined}>
          Transforming Hospitality Spaces
        </h2>
        <p className={`text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500 font-medium'}`}>
          From welcoming lobbies to serene suites, see how Deckoviz creates unforgettable, emotion-rich guest experiences.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6 pb-10 pt-4">
        
        {/* Left fade and Right fade masks */}
        <div className={`absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r ${isDark ? 'from-[#050505]' : 'from-white'} to-transparent`} />
        <div className={`absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l ${isDark ? 'from-[#050505]' : 'from-white'} to-transparent`} />

        {/* Row 1 */}
        <div className="scrolling-wrapper-left gap-6 px-3">
          {ROW_1.map((src, index) => (
            <div 
              key={`row1-${index}`} 
              className={`relative w-[280px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 group ${isDark ? 'border border-white/10' : 'border border-gray-100'}`}
            >
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={src} 
                alt="Hotel Ambiance" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="scrolling-wrapper-right gap-6 px-3">
          {ROW_2_DOUBLED.map((src, index) => (
            <div 
              key={`row2-${index}`} 
              className={`relative w-[280px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 group ${isDark ? 'border border-white/10' : 'border border-gray-100'}`}
            >
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={src} 
                alt="Hotel Ambiance" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HotelAutoScroll;
