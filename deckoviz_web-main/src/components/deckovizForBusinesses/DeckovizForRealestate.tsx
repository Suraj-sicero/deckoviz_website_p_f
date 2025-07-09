const DeckovizForRealEstate = () => {
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
              Deckoviz For Real Estate
              <br />
              Developers
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              Add Emotional Intelligence, Visual Luxury, and Instant
              <br />
              Differentiation to Your Properties
            </p>
          </div>

          {/* Secondary Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight mb-3">
              Sell More Than Spaces — Sell Emotion, Atmosphere,
              <br />
              and Imagination
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="max-w-4xl space-y-6 text-gray-900 font-medium leading-relaxed">
            <p className="text-base md:text-lg">
              In real estate today, the difference between good and unforgettable is no longer granite
              <br />
              countertops or bigger balconies. It's emotional resonance. It's what the space makes people
              <br />
              feel.
            </p>
            
            <p className="text-base md:text-lg">
              With Deckoviz, you give buyers and tenants something extraordinary — a living, evolving
              <br />
              visual presence in the home or property that brings art, story, and soul into every room.
            </p>
            
            <div className="pt-4 pb-20">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                This is how you go from showing units... to showing people the life they'll live
                <br />
                inside those units.
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

      {/* What is Deckoviz Section */}
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
                  Deckoviz is a Smart Art Frame powered by AI.
                  <br />
                  Creates and curates personalized, mood-aware,
                  <br />
                  and context-sensitive art and visual storytelling
                  <br />
                  experiences — turning blank walls into dynamic
                  <br />
                  reflections of personality, style, and season.
                </p>
              </div>
            </div>
          </div>

          {/* Each Frame section */}
          <div className="mb-16 relative">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
              Each Frame:
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
                    Android TV
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
                    Is app-
                    <br />
                    controlled or
                    <br />
                    voice-enabled
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
                    Curates &
                    <br />
                    generates visual
                    <br />
                    art based on
                    <br />
                    mood
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
                    Offers
                    <br />
                    personalization,
                    <br />
                    ambient display,
                    <br />
                    & TV streaming
                    <br />
                    features
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
                    Comes in beautifully
                    <br />
                    finished custom
                    <br />
                    frames
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="text-center max-w-6xl mx-auto">
            <p className="text-lg text-gray-900 font-medium leading-relaxed">
              It's a plug-and-play tool to elevate your property's value, presence, and emotional appeal — instantly.
            </p>
          </div>
        </div>
      </div>

     {/* Why Real Estate Developers Love Deckoviz Section */}
<div className="bg-white relative py-24 md:py-24">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
      {/* Left Column */}
      <div>
        {/* Badge */}
        <div className="flex justify-start mb-8">
          <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
            Why Real Estate
          </div>
        </div>
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Why Real Estate
          <br />
          Developers Love Deckoviz
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
    {/* Card 1 - Property Value */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
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

        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
          Increase Perceived Property Value Instantly
        </h3>

        <div className="flex-1">
          <p className="text-indigo-700 font-medium text-sm leading-relaxed">
            A home that comes alive feels worth more. Deckoviz adds <strong>aura, design sophistication, and emotional warmth</strong> without costly interventions.
          </p>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>

    {/* Card 2 - Market Differentiation */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M6 9l6 6 6-6"/>
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

        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
          Differentiate Your Property in a Competitive Market
        </h3>

        <div className="flex-1">
          <p className="text-indigo-700 font-medium text-sm leading-relaxed">
            Living room walls that respond to mood. Bedrooms that shift energy. Children's rooms with ambient dreamscapes. Deckoviz becomes your <strong>signature visual differentiator</strong> that competitors don't offer.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>

    {/* Card 3 - Lifestyle Sales */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </div>
            <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full group-hover:from-blue-400 transition-colors duration-300" />
          </div>
          
          <div className="text-gray-400 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
          Sell a Lifestyle, Not Just Square Footage
        </h3>

        <div className="flex-1">
          <p className="text-indigo-700 font-medium text-sm leading-relaxed">
            Buyers want to feel something. Deckoviz helps show homes feel lived-in, warm, and dynamic. Instead of asking buyers to imagine how they'll live there… you can <strong>show them.</strong>
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>

    {/* Card 4 - Customization for Luxury */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                <circle cx="12" cy="12" r="3"/>
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

        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
          Offer a Customization Layer for High-End Buyers
        </h3>

        <div className="flex-1">
          <p className="text-indigo-700 font-medium text-sm leading-relaxed mb-3">
            Every buyer gets personalized aesthetic identity, seasonal mood changes, and room transformations with zero renovation. This level of personalization sets luxury developments apart — without added labor or materials.
          </p>
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

{/* Use Cases for Developers Section */}
<div className="bg-white relative py-24 md:py-24">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="text-center mb-20">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Use Cases for
          <br />
          Developers
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
        {/* Top Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 - Show Homes / Sample Apartments */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Developers
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">In Show Homes / Sample Apartments</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Curate a different visual story for each room (focus, family, intimacy, play)
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Display local artwork, landscapes, or cultural visuals tied to the community
                  </p>
                </div>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          </div>

          {/* Card 2 - Lobby or Amenity Spaces */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Developers
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">In Lobby or Amenity Spaces</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Turn shared spaces into rotating galleries with curated art loops
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Reinforce property branding and storytelling (eco-conscious, heritage, luxury)
                  </p>
                </div>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 1 Card centered */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                      For Developers
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-900">In Premium Units / Penthouses</h3>
                  </div>
                  <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-indigo-600 font-medium">
                      Include Deckoviz as a featured amenity for high-value buyers
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-indigo-600 font-medium">
                      Offer personalized collections as part of VIP packages
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-indigo-600 font-medium">
                      Co-brand Deckoviz collections with your luxury branding or partner architects
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</div>

{/* Features Designed for Real Estate Projects Section */}
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
        Features Designed for Real Estate Projects
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
              Frame options to match every interior style
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
              Scalable for multi-unit residential or commercial projects
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
              Smart brightness, auto-scheduling, and mood modes
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
              White-label options for custom-branded experiences
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
              Option to include as part of amenity or upsell package
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
              Pre-loaded visual plans for show units or staging
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
              Offline mode for remote locations
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
              Central app-based control
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Key Business Benefits Section */}
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
        Key Business Benefits
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
                    Command Higher Prices with Low Additional Cost
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Deckoviz dramatically enhances a property's perceived value and sensory impact — with minimal cost and no structural changes.
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
                    Make Your Properties More Visually Shareable
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Showrooms with Deckoviz become Instagram-worthy. Visual content from your walkthroughs becomes more dynamic, layered, and magnetic.
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
                    Close Buyers on Emotion, Not Specs
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                When buyers emotionally connect to a space — when they feel inspired — conversion rates soar. Deckoviz speaks that silent language of emotional design.
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
                    Refresh Without Renovation
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Need to update showrooms, seasonal appeal, or visual identity? Just update the visuals in your Deckoviz — no painting, no construction, no redesign fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* First Section - Ideal Projects for Deckoviz Integration */}
<div className="relative mt-20 mb-20">
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    {/* Top Badge - White bg with gray border */}
    <div className="flex justify-start mb-8">
      <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 shadow-md">
        Our Product Deckoviz
      </div>
    </div>

    {/* Two Column Layout - Text Left, Image Right */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Left Column - Text Content */}
      <div className="text-left space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Ideal Projects for Deckoviz
            <br />
            Integration
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            Ideal Projects for Deckoviz Integration
          </p>

          <button className="bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
            Find Out More
          </button>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">Luxury high-rises and branded residences</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Senior living or wellness-oriented
                <br />
                developments
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Smart homes and tech-integrated
                <br />
                dwellings
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Themed or design-forward properties
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image with Browser Frame */}
      <div className="relative">
        {/* Pink/Purple gradient background */}
        <div
          className="absolute -inset-20 transform"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,192,203,0.8) 0%, rgba(221,160,221,0.6) 40%, rgba(230,230,250,0.4) 80%, transparent 100%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            zIndex: 1,
          }}
        />

        {/* Browser mockup container - WHITE with shadow */}
        <div
          className="relative bg-white rounded-3xl overflow-hidden max-w-xs sm:max-w-md mx-auto border border-gray-200"
          style={{
            zIndex: 2,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Browser header */}
          <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* URL bar with lock icon */}
            <div className="flex items-center bg-gray-300 px-3 py-1.5 rounded-lg">
              <svg className="w-3 h-3 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-700 font-medium">Deckoviz.Com</span>
            </div>

            <div></div>
          </div>

          {/* Image content */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src="/images/aboutusimg1.png"
              alt="Deckoviz AI Art Frame showing cosmic space scene"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Second Section - Our Developer Partnership Offers */}
<div className="relative mt-32 mb-32">
  <div className="relative z-10 max-w-6xl mx-auto px-4">
    {/* Top Badge - White bg with gray border - positioned center-left */}
    <div className="flex justify-center mb-8 ml-60">
      <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 shadow-md">
        Product Features
      </div>
    </div>

    {/* Two Column Layout - Image Left, Text Right */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Left Column - Image with Browser Frame */}
      <div className="relative">
        {/* Pink/Purple gradient background */}
        <div
          className="absolute -inset-20 transform"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,192,203,0.8) 0%, rgba(221,160,221,0.6) 40%, rgba(230,230,250,0.4) 80%, transparent 100%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            zIndex: 1,
          }}
        />

        {/* Browser mockup container - WHITE with shadow */}
        <div
          className="relative bg-white rounded-3xl overflow-hidden max-w-xs sm:max-w-md mx-auto border border-gray-200"
          style={{
            zIndex: 2,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Browser header */}
          <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* URL bar with lock icon */}
            <div className="flex items-center bg-gray-300 px-3 py-1.5 rounded-lg">
              <svg className="w-3 h-3 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-700 font-medium">Deckoviz.com</span>
            </div>

            <div></div>
          </div>

          {/* Image content */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src="/images/aboutusimg2.png"
              alt="Deckoviz showing mountain landscape with cosmic elements"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Column - Text Content */}
      <div className="text-left space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Our Developer
            <br />
            Partnership Offers
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            Our Developer Partnership Offers
          </p>

          <button className="bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
            Find Out More
          </button>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">Trade pricing and volume discounts</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                White-labeled collections aligned with your
                <br />
                brand
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Optional monthly visual content refresh
                <br />
                subscriptions
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                PR and storytelling support for project
                <br />
                launches
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Real Impact: Developer Testimonials Section */}
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
        Real Impact: Developer Testimonials
      </h2>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Testimonial 1 */}
      <div className="group">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              "We integrated Deckoviz into 3 model homes and saw a 28% increase in emotional engagement during walkthroughs. People stayed longer. Asked more questions. We sold all three units within the month."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Project Director, Urban Luxury Living
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
              "It gave our team a new way to tell our brand story. Deckoviz helped us go from 'high-tech interiors' to 'emotionally intelligent homes' — and it landed."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Marketing Lead, Premium High-Rise Developer
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
              "Deckoviz became the most talked-about part of our show units. It's like giving each space a personality."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Principal Architect, Design+Build Firm
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

    </div>
  );
};

export default DeckovizForRealEstate;