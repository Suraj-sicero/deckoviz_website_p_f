export default function AboutUs() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient section */}
      <div className="absolute inset-0 z-0">
        {/* Base white background with subtle pattern */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Subtle dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, #7d39ec 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />

        {/* Enhanced gradient with more depth and animation */}
        <div className="absolute left-0 right-0" style={{ top: "310px", height: "420px" }}>
          <div
            className="mx-4 h-full overflow-hidden relative animate-pulse"
            style={{ 
              borderBottomLeftRadius: "50px", 
              borderBottomRightRadius: "50px",
              animationDuration: '4s'
            }}
          >
            {/* Multi-layered gradient for depth */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-fuchsia-300 to-orange-300" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-200/30 to-yellow-200/40" />
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" 
                 style={{ animationDuration: '3s' }} />

            {/* Top fade with enhanced transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
          </div>
        </div>
      </div>

        {/* Decorative 3D Elements with hover effects */}
      <div className="absolute top-48 left-60 w-20 h-20 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-2xl">
        <img src="/images/text3D.png" alt="3D Text" className="w-full h-full object-contain drop-shadow-lg pointer-events-auto" />
      </div>

      <div className="absolute top-72 right-72 w-20 h-20 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-2xl">
        <img src="/images/rocket3D.png" alt="3D Rocket" className="w-full h-full object-contain drop-shadow-lg pointer-events-auto" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-2 py-8 text-center">
        {/* Top Badge with glow effect */}
        <div className="flex justify-center pt-4 pb-2 mt-24 mb-4">
          <div className="bg-[#7d39ec] text-white px-4 py-1 rounded-lg text-sm font-medium shadow-lg shadow-violet-500/50 hover:shadow-violet-500/80 transition-shadow duration-300">
            About Us
          </div>
        </div>

        {/* Heading with gradient text */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-gray-900 to-violet-500 bg-clip-text text-transparent leading-tight">
          About Us
        </h1>

        {/* Subheading with enhanced styling */}
        <div className="max-w-2xl mx-auto mb-28">
          <p className="text-lg md:text-lg text-gray-700 leading-relaxed font-medium">
            At <span className="text-violet-600 font-semibold">Deckoviz</span>, we are reimagining what it means to live, work,
          </p>
          <p className="text-lg md:text-lg text-gray-700 leading-relaxed font-medium">
            and <span className="text-fuchsia-500 font-semibold">feel</span> within a space.
          </p>
        </div>

        {/* Enhanced Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              src: "/images/ce3552c2-18fd-471f-90ef-1edb442673ab.png",
              alt: "Modern living room with mountain landscape display",
              accent: "violet"
            },
            {
              src: "/images/Gemini_Generated_Image_rgywbsrgywbsrgyw.jpeg",
              alt: "Contemporary space with cosmic night sky display",
              accent: "fuchsia"
            },
            {
              src: "/images/Gemini_Generated_Image_rgywbrrgywbrrgyw.jpeg",
              alt: "Modern interior with ocean sunset display",
              accent: "orange"
            },
          ].map((img, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500"
            >
              {/* Colored accent border on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                img.accent === 'violet' ? 'from-violet-400 to-purple-500' :
                img.accent === 'fuchsia' ? 'from-fuchsia-400 to-pink-500' :
                'from-orange-400 to-red-400'
              }`} />
              
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-3 h-3 rounded-full ${
                  img.accent === 'violet' ? 'bg-violet-400' :
                  img.accent === 'fuchsia' ? 'bg-fuchsia-400' :
                  'bg-orange-400'
                }`} />
              </div>
            </div>
          ))}
        </div>

      

        {/* Space for additional content below images */}
        <div className="mt-12">{/* Your additional content can go here */}</div>
      </div>
    </div>
  )
}