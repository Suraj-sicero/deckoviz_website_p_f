import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useState } from "react";

export default function EnterpriseFeatures({ enterpriseFeatures }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to toggle between 1 and 3 card logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % enterpriseFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [index, isHovered]);

  const getPosition = (i) => {
    const diff = (i - index + enterpriseFeatures.length) % enterpriseFeatures.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === enterpriseFeatures.length - 1) return "left";
    return "hidden";
  };

  const brandGradient = "from-purple-600 via-pink-500 to-indigo-600";

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-20 md:py-32 overflow-hidden bg-slate-50"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-3xl md:text-6xl font-bold bg-gradient-to-r ${brandGradient} bg-clip-text text-transparent pb-2`}
          >
            Core Enterprise Features
          </motion.h2>
          <p className="text-slate-500 mt-4 text-base md:text-lg">
            Built for scale, security, and seamless integration.
          </p>
        </div>
<br></br>
        {/* Carousel Container */}
        <div className="relative flex items-center justify-center h-[400px] md:h-[500px] perspective-[1500px]">
          <LayoutGroup>
            {enterpriseFeatures.map((feature, i) => {
              const position = getPosition(i);
              const isCenter = position === "center";

              // If it's hidden or (is mobile and not center), don't render/show it
              if (position === "hidden") return null;

              return (
                <motion.div
                  key={i}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50) setIndex((prev) => (prev - 1 + enterpriseFeatures.length) % enterpriseFeatures.length);
                    if (info.offset.x < -50) setIndex((prev) => (prev + 1) % enterpriseFeatures.length);
                  }}
                  animate={{
                    // Logic: On mobile, side cards have 0 x-offset and 0 opacity
                    x: isCenter 
                      ? 0 
                      : isMobile ? 0 : (position === "left" ? -350 : 350),
                    
                    scale: isCenter ? 1 : 0.8,
                    
                    rotateY: isCenter ? 0 : isMobile ? 0 : (position === "left" ? 20 : -20),
                    
                    zIndex: isCenter ? 10 : 5,
                    
                    opacity: isCenter ? 1 : isMobile ? 0 : 0.5,
                    
                    filter: isCenter ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute w-[90%] max-w-[350px] md:max-w-[460px] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] 
                             bg-white border border-slate-100 shadow-xl
                             ${!isCenter && isMobile ? "pointer-events-none" : "pointer-events-auto"}`}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${brandGradient} 
                                 flex items-center justify-center text-white mb-6 md:mb-8 
                                 shadow-lg shadow-purple-500/20 mx-auto md:mx-0`}>
                    <div className="scale-[1.3] md:scale-[1.6]">{feature.icon}</div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 text-center md:text-left">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base text-center md:text-left">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </LayoutGroup>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 md:mt-16 gap-3">
          {enterpriseFeatures.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 md:h-2.5 rounded-full transition-all duration-500 ${
                i === index
                  ? `w-8 md:w-10 bg-gradient-to-r ${brandGradient}`
                  : "w-2 md:w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}