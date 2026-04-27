import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EnterpriseFeatures({ enterpriseFeatures }: any) {
  const [index, setIndex] = useState(0);

  // Define different gradient colors for each feature
  const gradients = [
    "from-purple-600 to-pink-600",      // Feature 1
    "from-blue-600 to-cyan-600",        // Feature 2
    "from-emerald-600 to-teal-600",     // Feature 3
    "from-orange-600 to-red-600",       // Feature 4
    "from-indigo-600 to-purple-600",    // Feature 5
    "from-rose-600 to-pink-600",        // Feature 6
  ];

  const brandGradient = "from-[#1e3a8a] to-[#1e40af]";
  const currentGradient = gradients[index] || brandGradient;

  return (
    <section
      className="relative pt-20 md:pt-32 pb-20 md:pb-32 overflow-hidden bg-white"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        
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

          {/* Feature Display - Clean centered layout */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center px-4 md:px-8 min-h-[300px] flex flex-col items-center justify-center"
          >
            {/* Icon with dark blue gradient */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-10"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${brandGradient} 
                             flex items-center justify-center shadow-2xl shadow-[#1e3a8a]/40`}>
                <div className="scale-[1.3] md:scale-[1.6] text-white">{enterpriseFeatures[index].icon}</div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            >
              {enterpriseFeatures[index].title}
            </motion.h3>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-700 leading-relaxed text-lg md:text-xl max-w-3xl mx-auto whitespace-pre-line"
            >
              {enterpriseFeatures[index].description}
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}