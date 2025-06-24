

const DeckovizOfficesLanding = () => {
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
              Deckoviz For Offices &
              <br />
              Workspaces
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              Build Inspired Teams. Design Emotionally Intelligent Environments.
              <br />
              Make Every Wall Speak.
            </p>
          </div>

          {/* Secondary Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight mb-3">
              Rethink the Modern Workplace
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="max-w-4xl space-y-6 text-gray-900 font-medium leading-relaxed">
            <p className="text-base md:text-lg">
              Today's offices aren't just about desks, emails, and deadlines. They're about culture,
              <br />
              creativity, wellness, connection, and identity. Your environment has the power to energize
              <br />
              your team, communicate your brand, and influence how people feel the moment they walk in.
            </p>
            
            <p className="text-base md:text-lg">
              Deckoviz gives you that power — through a living, AI-powered smart art frame that curates
              <br />
              the emotion, focus, culture, and story of your space.
            </p>
            
            <div className="pt-4 pb-20">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                No more cold corporate walls. No more lifeless break rooms.
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-800">
                Deckoviz brings your workspace to life — dynamically, beautifully, and intelligently.
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
                  Deckoviz is a smart art frame that displays
                  <br />
                  evolving, AI-curated visual collections based on
                  <br />
                  time of day, mood, environment, or intentional
                  <br />
                  design. It acts as:
                </p>
              </div>
            </div>
          </div>

          {/* It Act as section */}
          <div className="mb-16 relative">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12">
              It Act as:
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
                    A dynamic
                    <br />
                    visual
                    <br />
                    designer
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
                    A mood
                    <br />
                    enhancer
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
                    A digital gallery
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
                    A cultural
                    <br />
                    storyteller
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
                    A personalized
                    <br />
                    productivity partner
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="text-center max-w-6xl mx-auto">
            <p className="text-lg text-gray-900 font-medium leading-relaxed">
              It blends seamlessly into any office environment — and adds energy, identity, and emotion to every wall.
            </p>
          </div>
        </div>
      </div>

      {/* Why Offices Need Deckoviz Section */}
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
                Why Offices Need
                <br />
                Deckoviz
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
              {/* Card 1 */}
              <div className="relative group">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
                  <div className="mb-6 flex justify-start">
                    <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
                    Set the Right Emotional Tone
                  </h3>
                  <div className="flex-1">
                    <div className="flex items-start mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-indigo-600 font-medium">
                        Every room has a job. Deckoviz sets the mood to match it — whether that's deep focus, vibrant creativity, team celebration, or meditative calm.
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
                    Enhance Culture & Internal Communication
                  </h3>
                  <div className="flex-1">
                    <div className="flex items-start mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-indigo-600 font-medium">
                        Your walls can communicate your values. Deckoviz lets you.
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
                    Support Focus, Wellness, and Mental Flow
                  </h3>
                  <div className="flex-1">
                    <div className="flex items-start mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-indigo-600 font-medium">
                        The modern workplace doesn't just need open space — they need emotional design. Deckoviz provides.
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
                Deckoviz Use Cases
                <br />
                Across the Office
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
                {/* Card 1 - Meeting Rooms & Think Tanks */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Across the Office
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-900">Meeting Rooms & Think Tanks</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Rotate visual metaphors for ideation and problem-solving
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Display client success stories or past project imagery
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Customize each room to a different value (e.g., Innovation, Empathy, Focus)
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Entryways & Reception */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Across the Office
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-900">Entryways & Reception</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Make a strong first impression with branded welcome visuals
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Show company values, global team reach, or visual testimonials
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row - 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 3 - Open Work Areas */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Across the Office
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">Open Work Areas</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Use soft ambient visuals that don't distract but aid focus
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Rotate artwork that sparks creativity or aids concentration
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Display quotes, reminders, or brand inspiration loops
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 4 - Break Rooms, Cafés & Meditation */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Across the Office
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">Break Rooms, Cafés & Meditation</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Create emotional reset spaces with visuals that promote breath, calm, and recovery
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Use dynamic soundscapes and moodscapes synced to time of day
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 5 - All-Hands & Event Spaces */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Across the Office
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">All-Hands & Event Spaces</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Curate presentations, achievements, or cultural event visuals
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Match to company themes or product launch campaigns
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Use Deckoviz as a narrative anchor for storytelling
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>

      {/* Commercial & Hospitality Design Use Cases Section */}
      <div className="bg-white relative py-24 md:py-24">
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
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
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
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
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
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
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
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>

     {/* Features Tailored for Workspaces Section */}
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
        Smart Features Tailored for Workspaces
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
              Branded collections for your company values and identity
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
              Motion graphics, inspirational quotes, or abstract art
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
              Frame options to match modern, industrial, or creative interiors
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
              Android TV capability for dual use (presentations, screensavers, etc.)
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
              Personalizable per room or department
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
              Control via app or central admin interface
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
              Scheduled content rotation
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
        Business Benefits
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
                    Boost Productivity & Energy
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Studies show ambient visuals can enhance mood, reduce stress, and support focus. Deckoviz turns your office into a productivity-optimized, neuro-aesthetic environment.
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
                    Deepen Team Connection & Belonging
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                When your walls reflect your culture and story, your team feels seen, aligned, and emotionally invested.
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
                    Reinforce Your Brand to Visitors & Clients
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Deckoviz adds a layer of intelligent, emotionally tuned design that clients and partners will notice — instantly positioning your company as innovative, thoughtful, and design-forward.
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
                    Refresh Your Aesthetic Without Renovation
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                Want a seasonal mood change? A different vibe by department? A design update for Q3? No problem — just update the visual programming.
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
        Real Feedback from Workspaces
      </h2>
    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Testimonial 1 */}
      <div className="group">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
          <div className="mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              "We use Deckoviz in our UX studio to rotate mood visuals — from conceptual design metaphors to kinetic energy pieces. It makes the entire floor feel alive."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Creative Director, Design Agency
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
              "Our HR team curates internal culture visuals on Deckoviz. It's made birthdays, wins, and employee shoutouts feel seen in a creative and beautiful way."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — People Ops Lead, SaaS startup
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
              "We added Deckoviz to our meditation and recharge pod. It gives people something meaningful to stare into while they breathe and reset."
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-900 font-semibold">
              — Wellness Coordinator, Fortune 500 HQ
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
      {/* Left Column */}
      <div>
        {/* Badge */}
        <div className="flex justify-start mb-8">
          <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
            Our Product Deckoviz
          </div>
        </div>
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-4xl font-semibold text-gray-900 leading-tight">
          Flexible Packages for Teams
          <br />
          & Workspaces
        </h2>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-lg text-gray-800 leading-relaxed mt-14">
            Whether you have a 10-person design studio or a
            <br />
            1,000-employee office HQ, we offer tailored
            <br />
            packages with:
          </p>
        </div>
      </div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Package Feature 1 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Bulk pricing for multiple frames
            </h3>
          </div>
        </div>

        {/* Package Feature 2 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Customized branded visuals
            </h3>
          </div>
        </div>

        {/* Package Feature 3 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              White-label content creation
            </h3>
          </div>
        </div>

        {/* Package Feature 4 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Visual curation services
            </h3>
          </div>
        </div>

        {/* Package Feature 5 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Frame recommendations for different space types
            </h3>
          </div>
        </div>

        {/* Package Feature 6 */}
        <div className="flex items-start space-x-4 group">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#6670d8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Onboarding & content programming support
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

export default DeckovizOfficesLanding;