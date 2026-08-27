import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EnterpriseFeatures({ enterpriseFeatures }: any) {
  const [index, setIndex] = useState(0);

  // Define different gradient colors for each feature
  const gradients = [
    "from-[#182A4A] to-[#2563EB]",      // Feature 1
    "from-blue-600 to-cyan-600",        // Feature 2
    "from-emerald-600 to-teal-600",     // Feature 3
    "from-orange-600 to-red-600",       // Feature 4
    "from-indigo-600 to-indigo-600",    // Feature 5
    "from-[#182A4A] to-[#2563EB]",        // Feature 6
  ];

  const brandGradient = "from-[#1e3a8a] to-[#1e40af]";
  const currentGradient = gradients[index] || brandGradient;

  return (
    <section
      className="relative pt-20 md:pt-32 pb-20 md:pb-32 overflow-hidden bg-white"
    >
      {/* Ambient Glow / Blobs for transparent bg */}
      <div className="absolute top-[5%] right-[5%] w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none opacity-60"
        style={{ background: "radial-gradient(circle, #4f46e5, #6366f1)" }} />
      <div className="absolute top-[40%] left-[5%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, #2563EB, #3b82f6)" }} />
      <div className="absolute bottom-[-5%] right-[25%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #818cf8, #a5b4fc)" }} />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-6xl font-bold pb-2 whitespace-nowrap"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-gray-900">Core Enterprise </span>
            <motion.span
              key={`features-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`italic bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}
            >
              Features
            </motion.span>
          </h2>
          <p className="text-gray-700 mt-4 text-base md:text-lg">
            Built for scale, security, and seamless integration.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Navigation Section - moved above content */}
          <div className="mb-12 md:mb-16">
            {/* Progress bar */}
            <div className="relative w-full max-w-4xl mx-auto mb-8">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${brandGradient}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${((index + 1) / enterpriseFeatures.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Feature selector buttons - horizontal layout */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
              {enterpriseFeatures.map((feature: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                  className={`group relative transition-all duration-500 ${
                    i === index ? 'scale-105' : 'scale-100 hover:scale-105'
                  }`}
                >
                  <div 
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-500 shadow-md
                               ${i === index 
                                 ? `bg-gradient-to-br ${brandGradient} shadow-[#1e3a8a]/40` 
                                 : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                               }`}
                  >
                    {/* Icon */}
                    <div className={`text-2xl ${i === index ? 'animate-pulse text-white' : 'text-gray-700'}`}>
                      {feature.icon}
                    </div>
                    
                    {/* Title - show on larger screens */}
                    <span className={`hidden md:block text-sm font-semibold whitespace-nowrap ${i === index ? 'text-white' : 'text-gray-700'}`}>
                      {feature.title}
                    </span>
                    
                    {/* Number badge */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                   ${i === index 
                                     ? 'bg-white text-[#1e3a8a]' 
                                     : 'bg-gray-100 text-gray-600'
                                   }`}>
                      {i + 1}
                    </div>
                  </div>
                  
                  {/* Active indicator line */}
                  <div
                    className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r ${brandGradient} rounded-full transition-all duration-300 transform origin-center ${
                      i === index ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Pagination dots - minimal style */}
            <div className="flex justify-center mt-10 gap-2">
              {enterpriseFeatures.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index
                      ? `w-8 bg-gradient-to-r ${brandGradient} shadow-lg shadow-[#1e3a8a]/30`
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to feature ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group relative overflow-hidden bg-white/40 backdrop-blur-2xl border-t-2 border-l-2 border-r border-b border-white rounded-[28px] md:rounded-[40px] p-10 md:p-16 text-center min-h-[300px] flex flex-col items-center justify-center mx-4 md:mx-auto max-w-4xl"
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

              <div className="relative z-10 w-full flex flex-col items-center">
                {/* Icon with dark blue gradient */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex justify-center mb-10"
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${brandGradient} 
                                 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)] border border-white/20`}>
                    <div className="scale-[1.3] md:scale-[1.6] text-white">{enterpriseFeatures[index].icon}</div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold text-[#182A4A] mb-8 leading-tight tracking-tight"
                >
                  {enterpriseFeatures[index].title}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-[#334155] leading-relaxed text-lg md:text-xl max-w-3xl mx-auto whitespace-pre-line font-medium"
                >
                  {enterpriseFeatures[index].description}
                </motion.p>
              </div>
            </motion.div>
          </div>

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
    </section>
  );
}