import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TransformWalls() {
  const [showBubble, setShowBubble] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  const timer = setTimeout(() => {
    setShowBubble(true);
  }, 2000); // 2 seconds

  return () => clearTimeout(timer);
}, []);

   
  return (
    
    <section className="py-12 md:py-16 lg:py-20 overflow-hidden relative bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Background gradient effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute left-1/2 top-1/3 w-[80%] md:w-[70%] lg:w-[60%] h-[60%] rounded-full bg-gradient-to-br from-purple-300/60 via-blue-300/50 to-indigo-300/60 blur-3xl opacity-70"></div>
        <div className="absolute left-1/2 bottom-1/3 w-[60%] md:w-[50%] lg:w-[40%] h-[50%] rounded-full bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-blue-300/50 blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Introduction Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 border border-purple-200">
              <span className="text-purple-700 text-sm font-medium">Introduction</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Transform Your Walls
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Transform Your World.
              </h3>
            </div>

            {/* Description */}
            <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
              <p>
                Introducing The World's First AI-Powered Dynamic Art Frame. Deckoviz turns your space into a living
                canvas — a smart art experience that evolves with you. It brings the power of generative AI,
                personalized design, and immersive visuals into your home, workspace, or hospitality space.
              </p>

              <p className="text-purple-600 font-medium">
                Infuse your life with joy, inspiration, calm, and wonder — every single day.
              </p>

              <p>
                From Van Gogh to Ghibli, from personal memories to dreamlike stories, Deckoviz reimagines your walls
                like never before.
              </p>

              <p className="font-semibold text-gray-800">Make your spaces come alive</p>

              <p className="text-purple-600 font-medium">Refreshed. Inspired. Blissed. Tranquil. Content. Excited.</p>
            </div>

            {/* Feature Points */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 md:mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-semibold"> Controlled entirely through a mobile app.</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 md:mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-semibold"> Built on top of Android TV, fully smart and versatile.</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 md:mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-semibold"> Powered by AI, styled by you.</span>
                </p>
              </div>
            </div>

            {/* CTA Button */}
            {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            
            {/* Pre Order */}
            <button 
              onClick={() => window.location.href = '/place-order'}
              className="group relative bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-400 hover:from-indigo-700 hover:via-purple-700 hover:to-fuchsia-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-purple-500/25 text-sm border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
              <span className="relative z-10 flex items-center gap-2">
                Pre Order Now
              </span>
            </button>

            {/* Learn More */}
            <button
  onClick={() => window.location.href = "/about-deckoviz"}
  className="group relative bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 
             hover:from-blue-700 hover:via-sky-700 hover:to-cyan-600
             text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold 
             transition-all duration-300 hover:scale-105 shadow-2xl 
             hover:shadow-blue-500/30 text-sm border border-white/20"
>
  {/* Shimmer */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                  -skew-x-12 -translate-x-full group-hover:translate-x-full 
                  transition-transform duration-1000 rounded-full"></div>

  {/* Inner glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-400/20 to-cyan-400/20 
                  rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

  <span className="relative z-10 flex items-center gap-2">
    Learn More about Deckoviz
  </span>
</button>

{/* Conversation Cloud Button */}
<div className="absolute top-16 right-8 lg:right-14 z-30 hidden lg:block">
  <button
    onClick={() => window.location.href = "/a-message-for-our-visitors"}
    className="relative animate-float group"
  >
    {/* Bubble */}
    <div
      className="
bg-gradient-to-br from-indigo-500/80 via-purple-600/80 to-blue-600/80
backdrop-blur-xl
border border-indigo-400/40
rounded-[28px]
px-6 py-4
max-w-[260px]
shadow-[0_20px_45px_rgba(79,70,229,0.45)]
hover:shadow-[0_30px_70px_rgba(124,58,237,0.55)]
transition-all duration-500

      "
    >
<p className="text-sm font-semibold text-white group-hover:text-indigo-100 transition">
  💬 A Message For Our Visitors
</p>

<p className="text-xs text-indigo-100/90 mt-1">
  From the heart of Deckoviz
</p>

    </div>

    {/* Bubble Tail */}
    <span
      className="
        absolute -bottom-2 right-10
        w-4 h-4
        bg-white/80
        border-r border-b border-purple-200
        rotate-45
        backdrop-blur-xl
      "
    ></span>
  </button>
</div>

          </div>
          </div>



          {/* Right Content - Clean Grid Layout */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
            
            {/* Gradient glow behind artwork */}
            <div
              className="absolute inset-0 transform scale-110"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(147,51,234,0.15) 0%, rgba(59,130,246,0.10) 40%, rgba(168,85,247,0.08) 70%, transparent 100%)",
                filter: "blur(50px)",
                zIndex: -1,
              }}
            />

            {/* Clean Grid Layout - Responsive */}
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]">
              
              {/* Top Row */}
              <div className="absolute top-0 left-0 right-0 flex gap-2 sm:gap-3 md:gap-4">
                {/* Small sculpture - top left */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mt-6 sm:mt-8 md:mt-10 lg:mt-12 ml-4 sm:ml-6 md:ml-8 lg:ml-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://i.pinimg.com/736x/6a/14/5d/6a145d6fd6b80d62d3378ccfb75cbc5f.jpg"
                    alt="Classical Sculpture"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Wide architecture - top right */}
                <div className="w-36 h-20 sm:w-44 sm:h-24 md:w-52 md:h-28 lg:w-60 lg:h-32 mt-6 sm:mt-8 md:mt-10 lg:mt-12 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://i.pinimg.com/736x/1d/76/b8/1d76b855636a65684b11182f0fa99e43.jpg"
                    alt="Ancient Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Middle Row */}
              <div className="absolute top-28 sm:top-36 md:top-44 lg:top-48 left-0 right-0 flex gap-2 sm:gap-3 md:gap-4 items-start">
                {/* Large hero image - left */}
                <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 z-10">
                  <img
                    src="https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sculptural Art"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right column */}
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                  {/* Small sunflower */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <img
                      src="https://i.pinimg.com/736x/7e/a8/88/7ea888763035ff1abe949afca1b4cd51.jpg"
                      alt="Sunflowers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Medium ruins */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 bg-gradient-to-br from-amber-200 to-amber-400 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <img
                      src="https://i.pinimg.com/736x/83/96/9f/83969f41a21032a07b1462d136b8f4b5.jpg"
                      alt="Ancient Ruins"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="absolute ml-6 sm:ml-8 md:ml-10 lg:ml-12 -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 left-0 right-0 flex gap-2 sm:gap-3 md:gap-4 items-end">
                {/* Small purple landscape - bottom left */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 lg:w-28 lg:h-28 mb-2 sm:mb-3 md:mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://i.pinimg.com/736x/b0/3b/8e/b03b8e4a1188d6b68c001cd8e9e8b490.jpg"
                    alt="Purple Landscape"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Wide green landscape - bottom center/right */}
                <div className="w-32 h-20 sm:w-36 sm:h-24 md:w-40 md:h-28 lg:w-48 lg:h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1710787193520-74df05ed7736?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Green Hills"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Deckoviz Modal */}
 


    </section>
  );
}