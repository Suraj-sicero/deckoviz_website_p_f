const DeckovizArchitectsLanding = () => {
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
              Deckoviz For Architects, Interior
              <br />
              Designers & Decorators
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              Elevate Every Space. Design with Emotion. Create Living
              <br />
              Atmospheres
            </p>
          </div>

          {/* Secondary Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight mb-3">
              Reimagine What a Wall Can Be
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="max-w-4xl space-y-6 text-gray-900 font-medium leading-relaxed">
            <p className="text-base md:text-lg">
              Architecture is about space. Interior design is about story. Together, they shape how people
              <br />
              live, feel, and remember.
            </p>
            
            <p className="text-base md:text-lg">
              With Deckoviz, you now have a new design dimension — a living, breathing visual frame that
              <br />
              adapts to mood, moment, and meaning. It's the evolution of wall design — emotional,
              <br />
              dynamic, intelligent, and beautiful.
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
            Deckoviz is the world's first AI-powered Smart Art
            <br />
            Frame designed to transform spaces with
            <br />
            personalized, evolving, generative visual art and
            <br />
            ambient experiences.
          </p>
        </div>
        <div className="ml-8">
        
        </div>
      </div>
    </div>

    {/* It combines section */}
    <div className="mb-16 relative">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
        It combines:
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
              Fine design
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
              Aesthetic mood
              <br />
              engineering
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
              Visual
              <br />
              storytelling
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
              Generative AI
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
              Sensory harmony
            </h4>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Description */}
    <div className="text-center max-w-6xl mx-auto">
      <p className="text-lg text-gray-900 font-medium leading-relaxed">
        It's not just a digital screen. It's a mood-setter, a memory-wall, a poetic canvas, and a tool for emotional resonance in your
        <br />
        environments.
      </p>
    </div>
  </div>
</div>

{/* Why Designers & Architects Love Deckoviz Section */}
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
          Why Designers &
          <br />
          Architects Love Deckoviz
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-6">
        {/* Card 1 */}
        <div className="relative group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
            <div className="mb-6 flex justify-start">
              <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
              Add Soul to Modern Spaces
            </h3>
            <div className="flex-1">
              <div className="flex items-start mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-indigo-600 font-medium">
                  Morning: golden hour visuals, gentle soundscapes, nature-based serenity
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <div className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
            <div className="mb-6 flex justify-start">
              <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
              Dynamic Walls = Timeless Design
            </h3>
            <div className="flex-1">
              <div className="flex items-start mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-indigo-600 font-medium">
                  Morning: golden hour visuals, gentle soundscapes, nature-based serenity
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <div className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
            <div className="mb-6 flex justify-start">
              <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
              Personalized Design at Scale
            </h3>
            <div className="flex-1">
              <div className="flex items-start mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-indigo-600 font-medium">
                  Morning: golden hour visuals, gentle soundscapes, nature-based serenity
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <div className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - 2 Cards aligned to left */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10" style={{maxWidth: '66.666667%'}}>
        {/* Card 4 */}
        <div className="relative group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
            <div className="mb-6 flex justify-start">
              <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
              Smart Meets Soulful
            </h3>
            <div className="flex-1">
              <div className="flex items-start mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-indigo-600 font-medium">
                  Morning: golden hour visuals, gentle soundscapes, nature-based serenity
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <div className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className="relative group">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
            <div className="mb-6 flex justify-start">
              <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
              Dynamic Walls = Timeless Design
            </h3>
            <div className="flex-1">
              <div className="flex items-start mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-indigo-600 font-medium">
                  Morning: golden hour visuals, gentle soundscapes, nature-based serenity
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <div className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
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
          Residential Design
          <br />
          Use Cases
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
          {/* Card 1 - Make Every Home an Art Gallery */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Residential Design
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Make Every Home an Art Gallery</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Offer clients an evolving personal gallery — powered by their mood, story, and memories.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Match art to the color palette of each room with AI-curated harmony.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Display generative visuals that shift through day/night, season and event.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          </div>

          {/* Card 2 - Transform Dead Walls into Emotional Anchors */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    For Residential Design
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Transform Dead Walls into Emotional Anchors</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Replace static art or blank walls with a dynamic visual connection
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Use Deckoviz to reflect transitions — sunrise light, sunset warmth, rainy introspection
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
                      For Residential Design
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-900">Customize Mood-Mode Rooms</h3>
                  </div>
                  <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-indigo-600 font-medium">
                      "Romantic mode" in the bedroom with poetic art and dimmed tones
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-indigo-600 font-medium">
                      "Focus mode" in the study with minimalist visuals and light gradients
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-indigo-600 font-medium">
                      "Celebration mode" for holidays, birthdays, rituals
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

{/* Commercial & Hospitality Design Use Cases Section */}
<div className="bg-white relative py-18 md:py-18">
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Header Section */}
    <div className="text-center mb-20">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
          Commercial & Hospitality
          <br />
          Design Use Cases
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
          {/* Card 1 - Hotels & Resorts */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    Commercial & Hospitality Design
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Hotels & Resorts</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Offer clients an evolving personal gallery — powered by their mood, story, and memories.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Match art to the color palette of each room with AI-curated harmony.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Display generative visuals that shift through day/night, season and event.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          </div>

          {/* Card 2 - Cafés & Restaurants */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    Commercial & Hospitality Design
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Cafés & Restaurants</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Replace static art or blank walls with a dynamic visual connection
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Use Deckoviz to reflect transitions — sunrise light, sunset warmth, rainy introspection
                  </p>
                </div>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 3 - Wellness & Therapy Spaces */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    Commercial & Hospitality Design
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Wellness & Therapy Spaces</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Introduce calming visuals and soundscapes to support healing and regulation.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Offer breath-guided animations, affirmations, or ambient meditations.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                
              </div>
            </div>
          </div>

          {/* Card 4 - Office & Workspace Design */}
          <div className="relative group">
            <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                    Commercial & Hospitality Design
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900">Office & Workspace Design</h3>
                </div>
                <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Design team-specific mood zones — creative inspiration rooms, calm break zones, client welcome lobbies
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-indigo-600 font-medium">
                    Use Deckoviz as a digital art installation that also supports wellness, focus, or cultural storytelling.
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
    
{/* Features Tailored for Design Section */}
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
        Design Integration Features
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
              Multiple sizes for small nooks or large statement walls
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
              Built on Google TV — doubles as a smart TV if needed
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
              Wide range of frame styles: classic, minimalist, modern, rustic, custom
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
              Smart brightness and ambient light adaptation
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
              Scheduled visual routines and ambient transitions
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
              Portrait or landscape orientation
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
          Business ROI
        </div>
      </div>
      
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
        Why Add Deckoviz to Your Projects?
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
                    Enhanced Aesthetic Value
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Deckoviz is a statement piece — without dominating the design. It subtly transforms a space while letting your interior vision remain in focus.
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
                    Increased Client Delight
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Clients will love that you gave them an evolving, personalized, luxury visual experience. It becomes one of the most memorable parts of their home or space.
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
                    Perfect for Portfolios
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Imagine photographing a space where the wall itself evolves, glows, and emotes. Your future case studies will feel alive.
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
                    Adds Premium Perceived Value
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

{/* For Interior Designers Section */}
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
            For Interior Designers,
            <br />
            Stylists, and Curators
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            If you create curated atmospheres for a living — you'll love
            <br />
            how Deckoviz helps you:
          </p>

          <button className="bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
            Find Out More
          </button>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">Offer your clients a visual identity that evolves</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Build rituals and rhythms into space
                <br />
                (morning/evening, meditation, celebration)
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Tell deeper stories (family visuals, seasonal
                <br />
                metaphors, thematic moods)
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Choose from a massive library of
                <br />
                collections or build your own
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
              <span className="text-sm text-gray-700 font-medium">Deckoviz.com</span>
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

{/* Second Section - Deckoviz Support for Architects & Designers */}
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
            Deckoviz Support for
           
            
            Architects & Designer
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            If you create curated atmospheres for a living — you'll
            <br />
            love how Deckoviz helps you:
          </p>

          <button className="bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
            Find Out More
          </button>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">Dedicated design consultation</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                White-label collection creation for your
                <br />
                clients or brand
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Custom frame finishes and design-
                <br />
                matching support
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Bulk pricing for multi-property or multi-
                <br />
                room implementation
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
        Sample Story: An Alive Interior
      </h2>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Testimonial 1 */}
      <div className="group">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              "It's like giving a room a consciousness. Deckoviz makes static walls feel sentient — it brings emotional storytelling into spatial design."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Principal Architect, boutique studio
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
              "Instead of having to choose one painting that fits the whole space, I can now give my clients art that changes with their mood. That's revolutionary."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — High-end residential interior designer
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
              "Deckoviz lets me design for seasonality, emotion, and identity — all in one frame."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Design consultant, hotel chain
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
<div className="bg-white relative py-20 md:py-18">
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
        Imagine These Use
        <br />
        Cases:
      </h2>
    </div>

    {/* Use Cases Grid */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Use Case 1 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              A Scandinavian loft with minimal tones and AI art that changes from sunrise gold to winter gray.
            </h3>
          </div>
        </div>

        {/* Use Case 2 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              A bohemian-chic guest house where quotes, poetry, and desert colors cycle through day and night.
            </h3>
          </div>
        </div>

        {/* Use Case 3 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              A modern luxury penthouse with black-and-white photography by day, immersive ambient nightscapes after dark.
            </h3>
          </div>
        </div>

        {/* Use Case 4 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              A spiritual healing room where breath-guided visuals create emotional safety and reflection.
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

export default DeckovizArchitectsLanding;