
const DeckovizRestaurantLanding = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Gradient Background */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background Effects - Only for Hero Section */}
        <div className="absolute inset-0">
          {/* Animated Gradient Layers */}
          <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-500/25 via-purple-400/15 to-transparent blur-[40px] animate-[floatLeft_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-400/10 to-transparent blur-[50px] animate-[floatCenter_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 left-0 w-3/5 h-1/2 bg-gradient-to-r from-indigo-500/15 via-purple-400/8 to-transparent blur-[60px] animate-[floatBottom_10s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/25 via-purple-400/15 to-transparent blur-[50px] animate-[floatRight_7s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 left-0 w-1/6 h-1/3 bg-gradient-to-r from-indigo-600/30 via-rose-400/15 to-transparent blur-[30px] animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 left-0 w-1/5 h-1/2 bg-gradient-to-r from-indigo-500/20 via-rose-400/17 to-transparent blur-[35px] animate-[floatLeft_5s_ease-in-out_infinite_1s]"></div>
          <div className="absolute top-2/3 left-0 w-1/4 h-1/3 bg-gradient-to-r from-indigo-600/35 via-rose-400/20 to-transparent blur-[40px] animate-[floatCenter_6s_ease-in-out_infinite_2s]"></div>
          <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-indigo-600/30 via-rose-400/15 to-transparent blur-[35px] animate-[floatRight_9s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-300/20 via-pink-300/18 to-transparent blur-[45px] animate-[floatBottom_8s_ease-in-out_infinite_3s]"></div>

          {/* Curved Grid Pattern - Barrel Distortion Effect */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <g stroke="white" strokeWidth="1" fill="none">
              {/* Vertical curved lines (longitude-style) */}
              {Array.from({ length: 25 }).map((_, i) => {
                const x = (i / 24) * 1000;
                const curvature = Math.sin((i / 24) * Math.PI) * 120;
                return (
                  <path
                    key={`v-${i}`}
                    d={`M ${x} 0 Q ${x + curvature} 400 ${x} 800`}
                  />
                );
              })}
              
              {/* Horizontal curved lines (latitude-style) */}
              {Array.from({ length: 20 }).map((_, i) => {
                const y = (i / 19) * 800;
                const distanceFromCenter = Math.abs(y - 400) / 400;
                const compression = 1 - distanceFromCenter * 0.7;
                const curve = 150 * (1 - compression);
                
                return (
                  <path
                    key={`h-${i}`}
                    d={`M 0 ${y} Q ${250 + curve} ${y} 500 ${y} T 1000 ${y}`}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
          {/* Top Badge */}
          <div className="mt-28 mb-10 shadow-lg hover:shadow-xl">
            <span className="inline-flex items-center px-3 py-1 bg-[#6670d8] text-white text-sm font-medium rounded-md">
              Deckoviz For All
            </span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Bring Your Eating Space To
              <br />
              Life With Deckoviz
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              For Restaurants, Cafés, Lounges, and Bars That Want to Delight
              <br />
              Every Sense
            </p>
          </div>

          {/* Secondary Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight mb-3">
              Set the Mood. Tell a Story. Elevate the
            </h2>
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight">
              Experience.
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="max-w-4xl space-y-6 text-gray-900 font-medium leading-relaxed">
            <p className="text-base md:text-lg">
              In a world where people don't just eat out — they seek atmosphere, ritual, beauty, and
              <br />
              memory — the visual identity of your restaurant is as important as your menu.
            </p>
            
            <p className="text-base md:text-lg">
              Deckoviz is the world's first AI-powered Smart Art Frame built for dynamic, emotion-driven,
              <br />
              ambient storytelling — helping you shape how your guests feel, the moment they step into
              <br />
              your space.
            </p>
            
            <div className="pt-4 pb-20">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                This is not a digital display.
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-800">
                It's a living, breathing visual presence that evolves with your food, your culture, your season, and
                <br />
                your story.
              </p>
            </div>
          </div>
        </div>
      </div>

{/* YT and Instagram */}
<div className="bg-white py-12 md:py-12">
  <div className="max-w-7xl mx-auto px-4">
    {/* Enhanced Heading Section */}
    <div className="text-center mb-10">
      <h2 className="text-4xl md:text-4xl font-semibold text-gray-900 leading-tight mb-7">
        Learn More About
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {" "}Deckoviz
        </span>
      </h2>
      <p className="text-sm mb-16 md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Dive deeper into the world of AI-powered smart art frames and discover how Deckoviz is 
        revolutionizing hospitality experiences through immersive visual storytelling.
      </p>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Side - YouTube Video */}
      <div className="relative group mt-0 md:mt-[-3rem]">
        <div className="relative p-10 sm:p-6 md:p-8">
          <div 
            className="absolute -inset-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            style={{
              background: "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
              filter: "blur(40px)"
            }}
          />
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Watch Deckoviz Transform Spaces</h3>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/Rxms0gWUmMs"
                title="Deckoviz Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Experience the magic of Deckoviz and see how it can transform your space.
            </p>
          </div>
        </div>
      </div>

    <div className="relative group mt-0">
  <div className="relative p-4 sm:p-6 md:p-8">
    {/* Background Glow */}
    <div 
      className="absolute -inset-12 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
      style={{
        background: "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
        filter: "blur(40px)"
      }}
    />

    {/* Instagram Container */}
    <div className="relative bg-white/95 backdrop-blur-sm w-full max-w-md mx-auto rounded-3xl p-3 shadow-2xl border border-white/60 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
      
      {/* Responsive Instagram Embed */}
      <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl">
        <iframe
          src="https://www.instagram.com/p/DLM9TrnSibN/embed"
          className="w-full h-full"
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
          title="Instagram Post"
        ></iframe>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Follow Our Journey</h3>
        <p className="text-sm text-gray-600">Daily inspiration & updates.</p>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</div>


{/* What is Deckoviz Section with White Background */}
<div className="bg-white relative py-24 md:py-24">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
      {/* Left Column */}
      <div>
        {/* Badge */}
        <div className="flex justify-start mb-8">
          <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
            What is Deckoviz
          </div>
        </div>
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          What is
          <br />
          Deckoviz
        </h2>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-lg text-gray-800 leading-relaxed mt-14">
            Deckoviz is a Smart Art Frame that displays
            <br />
            evolving, AI-curated, mood-based, and
            <br />
            personalized visual art and ambient scenes.
          </p>
        </div>
        <div className="ml-8">
         
        </div>
      </div>
    </div>

    {/* Think of it as a section */}
    <div className="mb-16 relative">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
        Think of it as a :
      </h3>

      {/* Background gradient glow - positioned behind cards */}
      <div
        className="absolute -top-8 left-1/2 transform -translate-y-1/4 -translate-x-1/2 w-[70rem] h-[60rem]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(147,51,234,0.25) 0%, rgba(219,39,119,0.20) 20%, rgba(236,72,153,0.16) 35%, rgba(168,85,247,0.12) 50%, rgba(168,85,247,0.06) 70%, transparent 85%)",
          filter: "blur(90px)",
          zIndex: 1,
        }}
      />

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
        {/* Card 1 */}
        <div className="relative group">
          <div 
            className="backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col"
            style={{
              background: "linear-gradient(to top, rgba(99,102,241,0.4) 0%, rgba(129,140,248,0.35) 25%, rgba(147,51,234,0.3) 45%, rgba(168,85,247,0.2) 65%, rgba(199,210,254,0.1) 85%, rgba(255,255,255,1) 100%)"
            }}
          >
            <div className="mb-4 flex justify-center">
              <span className="text-3xl">❤️</span>
            </div>
            <h4 className="text-lg font-medium text-gray-900 leading-tight" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Runs on
              <br />
              Google TV
            </h4>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group">
          <div 
            className="backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col"
            style={{
              background: "linear-gradient(to top, rgba(99,102,241,0.4) 0%, rgba(129,140,248,0.35) 25%, rgba(147,51,234,0.3) 45%, rgba(168,85,247,0.2) 65%, rgba(199,210,254,0.1) 85%, rgba(255,255,255,1) 100%)"
            }}
          >
            <div className="mb-4 flex justify-center">
              <span className="text-3xl">❤️</span>
            </div>
            <h4 className="text-lg font-medium text-gray-900 leading-tight" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Controlled by
              <br />
              an intuitive
              <br />
              mobile/web app
            </h4>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group">
          <div 
            className="backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col"
            style={{
              background: "linear-gradient(to top, rgba(99,102,241,0.4) 0%, rgba(129,140,248,0.35) 25%, rgba(147,51,234,0.3) 45%, rgba(168,85,247,0.2) 65%, rgba(199,210,254,0.1) 85%, rgba(255,255,255,1) 100%)"
            }}
          >
            <div className="mb-4 flex justify-center">
              <span className="text-3xl">❤️</span>
            </div>
            <h4 className="text-lg font-medium text-gray-900 leading-tight" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Can be
              <br />
              scheduled by
              <br />
              time of day,
              <br />
              mood, or season
            </h4>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative group">
          <div 
            className="backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col"
            style={{
              background: "linear-gradient(to top, rgba(99,102,241,0.4) 0%, rgba(129,140,248,0.35) 25%, rgba(147,51,234,0.3) 45%, rgba(168,85,247,0.2) 65%, rgba(199,210,254,0.1) 85%, rgba(255,255,255,1) 100%)"
            }}
          >
            <div className="mb-4 flex justify-center">
              <span className="text-3xl">❤️</span>
            </div>
            <h4 className="text-lg font-medium text-gray-900 leading-tight" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Offers themed
              <br />
              collections for
              <br />
              every cuisine,
              <br />
              setting, and story
            </h4>
          </div>
        </div>

        {/* Card 5 */}
        <div className="relative group">
          <div 
            className="backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col"
            style={{
              background: "linear-gradient(to top, rgba(99,102,241,0.4) 0%, rgba(129,140,248,0.35) 25%, rgba(147,51,234,0.3) 45%, rgba(168,85,247,0.2) 65%, rgba(199,210,254,0.1) 85%, rgba(255,255,255,1) 100%)"
            }}
          >
            <div className="mb-4 flex justify-center">
              <span className="text-3xl">❤️</span>
            </div>
            <h4 className="text-lg font-medium text-gray-900 leading-tight" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Comes in premium
              <br />
              wooden, modern, or
              <br />
              minimalistic frames
            </h4>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Description */}
    <div className="text-center max-w-6xl mx-auto">
      <p className="text-lg text-gray-900 font-medium leading-relaxed">
        It's a new kind of visual design — one that emotionally enhances your space, tells your brand story, and gives guests a reason to
        <br />
        pause, feel, and remember.
      </p>
    </div>
  </div>
</div>

{/* Why Deckoviz In Your Restaurant Section */}
<div className="bg-white relative py-24 md:py-24">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
      {/* Left Column */}
      <div>
        {/* Badge */}
        <div className="flex justify-start mb-8">
          <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
            What is Deckoviz
          </div>
        </div>
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Why Deckoviz In Your
          <br />
          Restaurant?
        </h2>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
        </div>
      </div>
    </div>

 {/* Cards Section with Background Gradient */}
    <div className="relative">
      {/* Subtle, wide-radius circular glow near card area */}
      <div
        className="absolute bottom-24 right-16 w-[480px] h-[480px]"
        style={{
          background: "radial-gradient(circle at center, rgba(147,51,234,0.25) 0%, rgba(219,39,119,0.15) 40%, rgba(236,72,153,0.08) 70%, transparent 90%)",
          filter: "blur(120px)",
          zIndex: 1,
        }}
      />
  {/* Feature Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
    {/* Card 1 - Emotionally Elevate */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
        {/* Icon and Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full group-hover:from-amber-400 transition-colors duration-300" />
          </div>
          
          <div className="text-gray-400 group-hover:text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-tight group-hover:text-gray-800">
          Emotionally Elevate Your Space
        </h3>

        <div className="flex-1 space-y-4">
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              A moody, elegant, candle-lit jazz lounge after dark
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              A breezy, bright, Mediterranean escape at brunch
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              A curated art experience for every season and menu cycle
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              A living mural that feels like your story
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>

    {/* Card 2 - Curated Vibes */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6"/>
                <path d="M21 12h-6m-6 0H3"/>
              </svg>
            </div>
            <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full group-hover:from-purple-400 transition-colors duration-300" />
          </div>
          
          <div className="text-gray-400 group-hover:text-purple-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-tight group-hover:text-gray-800">
          Instantly Curated Vibes for Any Hour
        </h3>

        <div className="flex-1 space-y-4">
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              <strong>Morning/Brunch:</strong> sunshine-lit still life, European cafés, crisp florals
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              <strong>Afternoon/Midday:</strong> bright, clean visuals with ambient motion to energize
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              <strong>Dinner:</strong> low-lit moody visuals, abstract textures, romantic scenery
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              <strong>Late Night:</strong> deep ambient tones, neon reflections, sultry animations
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>

    {/* Card 3 - Match Cuisine */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full group-hover:from-emerald-400 transition-colors duration-300" />
          </div>
          
          <div className="text-gray-400 group-hover:text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-tight group-hover:text-gray-800">
          Match the Mood to Your Cuisine
        </h3>

        <div className="flex-1 space-y-4">
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Japanese ryokan-style visuals, sakura blossoms, minimal brush art
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Italian vineyard sunrises, rustic tablescapes, terra-cotta countryside
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              French bistro-style pastels and rainy Parisian streets
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Latin American rhythm-themed color bursts and festival scenes
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Artisan bakery vibes with soft, dreamy food art and light play
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>
  </div>
</div>


  </div>
</div>

{/* Use Case Scenarios Section */}
<div className="bg-white relative py-24 md:py-24">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="text-center mb-20">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Use Cases in
          <br />
          Restaurants, Cafés,
          <br />
          and Bars
        </h2>
      </div>
    </div>

    {/* Cards Section with Background Gradient */}
    <div className="relative">
      {/* Central radial gradient behind all cards */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(147,51,234,0.35) 0%, rgba(219,39,119,0.25) 30%, rgba(236,72,153,0.18) 60%, transparent 90%)",
          filter: "blur(80px)",
          zIndex: 1,
        }}
      />

      <div className="space-y-6 relative z-10">
        {/* Top Row - 2 Wide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 - Dining Area */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Restaurants, Cafés, and Bars
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Dining Area</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Create different moods for lunch vs. dinner vs. brunch
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Rotate visuals for seasonality, local produce, or farm-to-table stories
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Feature abstract visuals that stimulate appetite and color harmony
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Open Kitchen / Counter View */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Restaurants, Cafés, and Bars
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Open Kitchen / Counter View</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Display behind-the-scenes visuals of sourcing, ingredients, or chef philosophy
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Visualize the culinary ritual — from raw ingredients to plated art
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 3 Narrower Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 3 - Lounge / Bar Area */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Restaurants, Cafés, and Bars
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">Lounge / Bar Area</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Set relaxing or energetic mood with abstract motion or city visuals
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Feature drink-themed visuals for cocktails or wine pairings
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Waiting Area / Entrance */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Restaurants, Cafés, and Bars
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">Waiting Area / Entrance</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Offer mood-enhancing visuals to reduce perceived wait times
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Display poetic or philosophical quotes about food, art, or life
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 - Events & Special Nights */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Restaurants, Cafés, and Bars
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">Events & Special Nights</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Curate custom visuals for wine pairings, jazz nights, live music events
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Seasonal or cultural celebrations (Diwali, Halloween, Valentine's, etc.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</div>

{/* Features Tailored for Restaurants Section */}
<div className="bg-white relative py-24 md:py-24">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="mb-16">
      {/* Badge */}
      <div className="flex justify-start mb-8">
        <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
          FEATURES
        </div>
      </div>
      
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
        Custom Features for Your Space
      </h2>
    </div>

    {/* Features Grid */}
    <div className="relative">
      {/* Background gradient glow */}
      <div
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[30rem]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(147,51,234,0.2) 0%, rgba(219,39,119,0.15) 40%, rgba(236,72,153,0.08) 70%, transparent 90%)",
          filter: "blur(100px)",
          zIndex: 1,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
        {/* Feature 1 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☺</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Schedule mood changes throughout the day/week
            </h3>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☻</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Display quotes, visuals, or affirmations tied to your culinary philosophy
            </h3>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☺</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Android TV Integration — optional smart TV use
            </h3>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☻</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Custom Collection Builder: Create room-specific themes
            </h3>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☺</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Upload photos, designs, or custom visuals for seasonal menus or events
            </h3>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☻</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Select from hundreds of curated collections and genres
            </h3>
          </div>
        </div>

        {/* Feature 7 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☺</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Controlled by app, or automated via presets
            </h3>
          </div>
        </div>

        {/* Feature 8 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-lg">☻</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Optional audio support for mood-based soundscapes
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Business Benefit Section */}
<div className="bg-white relative py-24 md:py-24 overflow-hidden">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="mb-16">
      {/* Badge */}
      <div className="flex justify-start mb-8">
        <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
          Business Profit
        </div>
      </div>
      
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
        Business Benefit in Restaurants
      </h2>
    </div>

    {/* Benefits Grid */}
    <div className="relative">
      {/* Background gradient glow */}
      <div
        className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-[35rem] h-[25rem]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(147,51,234,0.15) 0%, rgba(219,39,119,0.12) 40%, rgba(236,72,153,0.06) 70%, transparent 90%)",
          filter: "blur(80px)",
          zIndex: 1,
        }}
      />

      <div className="relative z-10">
        {/* Top Row - 2 boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Benefit 1 - Top Left */}
          <div className="relative group">
            <div className="border-2 border-dashed border-gray-300 hover:border-[#6670d8] rounded-2xl p-6 bg-white/70 backdrop-blur-sm h-auto flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-[#6670d8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                    Enhance Guest Mood & Experience
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Guests will remember how your rooms made them feel. Deckoviz helps you create "wow" moments, emotional atmosphere, and beauty your guests can't get anywhere else.
              </p>
            </div>
          </div>

          {/* Benefit 2 - Top Right */}
          <div className="relative group">
            <div className="border-2 border-dashed border-gray-300 hover:border-[#6670d8] rounded-2xl p-6 bg-white/70 backdrop-blur-sm h-auto flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-[#6670d8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                    Social Media Magnet
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Deckoviz makes your restaurant more "Instagrammable." Guests are more likely to share their meal with stunning, evolving visuals behind them — boosting organic visibility.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 boxes with offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 md:ml-32">
          {/* Benefit 3 - Bottom Left */}
          <div className="relative group">
            <div className="border-2 border-dashed border-gray-300 hover:border-[#6670d8] rounded-2xl p-6 bg-white/70 backdrop-blur-sm h-auto flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-[#6670d8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                    Stay Visually Fresh Year-Round
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Rotate your look and feel by season, event, or menu — without redecorating or investing in expensive interior changes.
              </p>
            </div>
          </div>

          {/* Benefit 4 - Bottom Right */}
          <div className="relative group">
            <div className="border-2 border-dashed border-gray-300 hover:border-[#6670d8] rounded-2xl p-6 bg-white/70 backdrop-blur-sm h-auto flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 bg-[#6670d8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                    Express Your Brand Without Words
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Let guests feel who you are. Deckoviz becomes a visual extension of your brand — subtle, poetic, sophisticated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Real Results: Sample Story Section */}
<div className="relative py-24 md:py-32 overflow-hidden">
  {/* Background Gradient Effect */}
  <div className="absolute inset-0">
    {/* Animated Gradient Layers */}
    <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-500/25 via-purple-400/15 to-transparent blur-[40px] animate-[floatLeft_6s_ease-in-out_infinite]"></div>
    <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-400/10 to-transparent blur-[50px] animate-[floatCenter_8s_ease-in-out_infinite]"></div>
    <div className="absolute top-1/2 left-0 w-3/5 h-1/2 bg-gradient-to-r from-indigo-500/15 via-purple-400/8 to-transparent blur-[60px] animate-[floatBottom_10s_ease-in-out_infinite]"></div>
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/25 via-purple-400/15 to-transparent blur-[50px] animate-[floatRight_7s_ease-in-out_infinite]"></div>
    <div className="absolute top-0 left-0 w-1/6 h-1/3 bg-gradient-to-r from-indigo-600/30 via-rose-400/15 to-transparent blur-[30px] animate-[pulse_4s_ease-in-out_infinite]"></div>
    <div className="absolute top-1/3 left-0 w-1/5 h-1/2 bg-gradient-to-r from-indigo-500/20 via-rose-400/17 to-transparent blur-[35px] animate-[floatLeft_5s_ease-in-out_infinite_1s]"></div>
    <div className="absolute top-2/3 left-0 w-1/4 h-1/3 bg-gradient-to-r from-indigo-600/35 via-rose-400/20 to-transparent blur-[40px] animate-[floatCenter_6s_ease-in-out_infinite_2s]"></div>
    <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-indigo-600/30 via-rose-400/15 to-transparent blur-[35px] animate-[floatRight_9s_ease-in-out_infinite_1.5s]"></div>
    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-300/20 via-pink-300/18 to-transparent blur-[45px] animate-[floatBottom_8s_ease-in-out_infinite_3s]"></div>

    {/* Curved Grid Pattern - Barrel Distortion Effect */}
    <svg
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="white" strokeWidth="1" fill="none">
        {/* Vertical curved lines (longitude-style) */}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = (i / 24) * 1000;
          const curvature = Math.sin((i / 24) * Math.PI) * 120;
          return (
            <path
              key={`v-${i}`}
              d={`M ${x} 0 Q ${x + curvature} 400 ${x} 800`}
            />
          );
        })}
        
        {/* Horizontal curved lines (latitude-style) */}
        {Array.from({ length: 20 }).map((_, i) => {
          const y = (i / 19) * 800;
          const distanceFromCenter = Math.abs(y - 400) / 400;
          const compression = 1 - distanceFromCenter * 0.7;
          const curve = 150 * (1 - compression);
          
          return (
            <path
              key={`h-${i}`}
              d={`M 0 ${y} Q ${250 + curve} ${y} 500 ${y} T 1000 ${y}`}
            />
          );
        })}
      </g>
    </svg>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#9ca4f3] via-pink-600 to-indigo-400 bg-clip-text text-transparent">
        Sample Story: A Café with Character
      </h2>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Testimonial 1 */}
      <div className="group">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              "We're a small artisanal café with Scandinavian roots. Deckoviz gave us the ability to bring that heritage alive
            </p>
            <br />
            <p className="text-gray-800 leading-relaxed text-lg font-medium">
              — with rotating fjord visuals, soft typography quotes, and pine forest"
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Events manager at luxury resort
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-medium">Genuine Compliments</span>
            <span className="text-green-600 text-lg">🌿</span>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="group">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              "Our wedding couple cried seeing their photos reimagined in dreamy AI art and playing on the wall. It was next-level personalization."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Events manager at luxury resort
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-medium">Our Loved Memories</span>
            <span className="text-cyan-500 text-lg">✨</span>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="group">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              imagery on snowy mornings. Our regulars noticed immediately. It's like walking into a space that changes with the seasons and our soul."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Owner, Nord Coffee House (Beta Pilot)
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-medium">Valuable Experiences</span>
            <span className="text-blue-600 text-lg">👍</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Curated Collections Section */}
<div className="bg-white relative py-24 md:py-24">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="mb-16">
      {/* Badge */}
      <div className="flex justify-start mb-8">
        <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
          Our Product Deckoviz
        </div>
      </div>
      
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
        Curated Collections Perfect
        <br />
        for Food Spaces
      </h2>
    </div>

    {/* Collections Grid */}
    <div className="relative">
      {/* Background gradient glow */}
      <div
        className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-[40rem] h-[30rem]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(147,51,234,0.15) 0%, rgba(219,39,119,0.12) 40%, rgba(236,72,153,0.06) 70%, transparent 90%)",
          filter: "blur(100px)",
          zIndex: 1,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Collection 1 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Abstract textures that mirror plating styles and culinary artistry.
            </h3>
          </div>
        </div>

        {/* Collection 2 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Hand-painted still lifes of fruits, breads, wines, and utensils.
            </h3>
          </div>
        </div>

        {/* Collection 3 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Festival-based visuals (Oktoberfest, Holi, Lunar New Year, Thanksgiving)
            </h3>
          </div>
        </div>

        {/* Collection 4 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Regional food rituals from around the world
            </h3>
          </div>
        </div>

        {/* Collection 5 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Dynamic quote posters with culinary inspiration
            </h3>
          </div>
        </div>

        {/* Collection 6 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Motion-based atmospheric themes (raindrops, firelight, swirling spices)
            </h3>
          </div>
        </div>

        {/* Collection 7 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Guest spotlight content (birthday visual tribute, proposal ambiance, etc.)
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




    </div>
  );
};

export default DeckovizRestaurantLanding;