const DeckovizTherapistsLanding = () => {
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
              Deckoviz For Therapists, Yoga
              <br />
              Studios & Wellness Spaces
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              Design Emotionally Supportive Environments. Guide Healing
              <br />
              Through Atmosphere. Create Inner Worlds with Art and AI.
            </p>
          </div>

          {/* Secondary Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight mb-3">
              Support Deeper Presence, Emotional Safety, and
              <br />
              Healing Through Visual Design
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="max-w-4xl space-y-6 text-gray-900 font-medium leading-relaxed">
            <p className="text-base md:text-lg">
              Whether you're guiding clients through therapy, holding space for nervous system regulation,
              <br />
              or leading people into stillness, your physical environment does more than decorate — it
              <br />
              participates.
            </p>
            
            <p className="text-base md:text-lg">
              Deckoviz is a revolutionary AI-powered smart art frame that transforms any room into a mood-
              <br />
              responsive, healing-supportive, visually immersive sanctuary. It creates the emotional
              <br />
              backdrop for your clients, students, or guests to feel safe, held, open, inspired, and grounded.
            </p>
            
            <div className="pt-4 pb-20">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                It's more than a visual display. It's a co-facilitator. A calming companion. A poetic
                <br />
                mirror. A living ritual.
              </p>
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
                  Deckoviz is a Smart Art Frame powered by AI that
                  <br />
                  creates and curates evolving ambient visuals
                  <br />
                  based on mood, time, energy, or theme.
                </p>
              </div>
            </div>
          </div>

          {/* It Can section */}
          <div className="mb-16 relative">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
              It Can:
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
                    Display
                    <br />
                    generative art,
                    <br />
                    nature visuals
                    <br />
                    etc.
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
                    Set the
                    <br />
                    emotional tone
                    <br />
                    of your room
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
                    Curates or
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
                    Help clients feel
                    <br />
                    grounded, inspired,
                    <br />
                    held, or soothed
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
                    Display quotes,
                    <br />
                    intentions, breathing
                    <br />
                    guides, and somatic
                    <br />
                    imagery
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="text-center max-w-6xl mx-auto">
            <p className="text-lg text-gray-900 font-medium leading-relaxed">
              It becomes a visual support system — alive, responsive, and deeply aligned with your healing space.
            </p>
          </div>
        </div>
      </div>

      {/* Why Therapists, Coaches, and Healers Love Deckoviz Section */}
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
              <h2 className="text-4xl md:text-[2.8rem] font-semibold text-gray-900 leading-tight">
                Why Therapists, Coaches,
                <br />
                and Healers Love Deckoviz
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
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
    {/* Card 1 - Emotionally Safe Environments */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
        {/* Icon and Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
          Create Emotionally Safe & Regulating Environments
        </h3>

        <div className="flex-1 space-y-4">
          <p className="text-indigo-700 font-medium text-sm leading-relaxed">
            Trauma-informed design is about <strong>what your space tells the nervous system</strong>. Deckoviz creates flowing, nature-based visuals that reduce tension and guide breath, focus, and self-awareness.
          </p>
          
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Softening with flowing, slow visuals and nature-based motion
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Reducing visual tension and clutter with mindful design
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Creating spaces that say: "There's space for me here"
            </p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>

    {/* Card 2 - Match Session Energy */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
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

        <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
          Match Your Space to the Session's Energy
        </h3>

        <div className="flex-1 space-y-4">
          <p className="text-indigo-700 font-medium text-sm leading-relaxed mb-3">
            Every healing session is different. Deckoviz helps you visually express intention and shift with your flow:
          </p>
          
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              <strong>Beginning:</strong> Earth-toned visuals to settle the nervous system
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              <strong>Body work:</strong> Wave-like animations and somatic metaphors
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              <strong>Integration:</strong> Calm, meditative visuals for reflection
            </p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>

    {/* Card 3 - Ritual and Practice */}
    <div className="relative group cursor-pointer">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        
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
          Bring Depth and Beauty to Ritual and Practice
        </h3>

        <div className="flex-1 space-y-4">
          <p className="text-indigo-700 font-medium text-sm leading-relaxed mb-3">
            Deckoviz becomes your <strong>atmospheric co-facilitator</strong> — elevating sessions from experiential to unforgettable:
          </p>
          
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Moon ritual visuals and seasonal energy themes
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Chakra-themed flows and sacred geometries
            </p>
          </div>
          <div className="flex items-start group/bullet">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
            <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
              Visual breath cycles and sound healing syncs
            </p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-gray-100">
          <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>

      {/* Use Cases by Modality Section */}
      <div className="bg-white relative py-24 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="flex justify-center items-center mb-8">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
                Use Cases by Modality
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
                {/* Card 1 - For Therapists & Coaches */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Modality
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-900">For Therapists & Coaches</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Create emotional safety with slow, natural imagery
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Reflect themes from the session (e.g., grief, transformation, hope, boundaries)
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      
                    </div>
                  </div>
                </div>

                {/* Card 2 - For Yoga Studios */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Modality
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-900">For Yoga Studios</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Match visuals to class energy (Yin, Vinyasa, Restorative, Kundalini, etc.)
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Display slow-moving nature imagery for breathwork sequences
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
                            For Modality
                          </span>
                          <h3 className="text-2xl font-semibold text-gray-900">For Wellness Centers, Spas & Retreats</h3>
                        </div>
                        <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-indigo-600 font-medium">
                            Create a tranquil, deeply immersive waiting area experience
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-indigo-600 font-medium">
                            Show nature loops, firelight visuals, or water-based art during treatments
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
      {/* Features Tailored for Healing Spaces Section */}
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
        Features Tailored for Healing Spaces
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
              App-controlled or scheduled visual transitions
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
              Customizable brightness and ambient auto-adjustment
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
              Dozens of curated emotional and healing-themed art collections
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
              Optional ambient soundscapes for deeper immersion
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
              Visual breath animations, nature-based flows, and emotion-coded gradients
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
              Offline mode for remote retreats or low-EMF environments
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
              Co-curation available for signature experiences or visual libraries
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Business & Practice Benefits Section */}
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
        Business & Practice Benefits
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
                    Enhance the Emotional Quality of Your Space
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Deckoviz deepens presence, reduces tension, and elevates the perceived safety and beauty of your practice environment.
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
                    Improve Client Retention & Reputation
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Clients remember how they felt. A beautiful, supportive, emotionally intelligent space becomes part of the reason they return — and refer others.
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
                    Boost Your Brand Story & Professionalism
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Deckoviz visually communicates your intention, care, and attention to healing design — elevating your brand identity and perceived quality.
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
                    Grow Social and Visual Presence
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Your studio becomes instantly more shareable, photogenic, and story-worthy — without any permanent changes to your physical space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Options & Packages for Wellness Professionals Section */}
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
            Options & Packages for
            <br />
            Wellness Professionals
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            We Offer :
          </p>

          <button className="bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
            Find Out More
          </button>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">Solo practitioner kits (1-2 frames, preset healing collections)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-gray-700">
                Studio and center bundles with curated
                <br />
                mood zones
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

{/* Real-World Feedback Section */}
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
        Real-World Feedback
      </h2>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Testimonial 1 */}
      <div className="group">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              "Clients enter the room and instantly exhale. Deckoviz is like visual sage — it clears and softens the energy for the work to come."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Somatic Therapist, California
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
              "We use Deckoviz to guide our visual meditations in the final 10 minutes of class. It makes savasana feel like a journey."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Yin Yoga Instructor, London
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
              "It's not just a screen. It's a visual prayer, a reminder, a ritual. My clients often stop and just stare — breathing, reflecting, arriving."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Breathwork Guide, Bali
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

export default DeckovizTherapistsLanding;