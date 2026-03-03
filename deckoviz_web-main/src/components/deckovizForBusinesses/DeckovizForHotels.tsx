import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import { DynamicImageGrid } from "../other/DynamicImageGrid"; // ADDED

// ADDED: A specific image array for this page
const hotelImages = [
  { src: '/images/hotel1.png', tag: 'Lobby Ambiance' },
  { src: '/images/hotel2.png', tag: 'Luxury Suites' },
  { src: '/images/hotel3.png', tag: 'Restaurant Atmosphere' },
  { src: '/images/hotel4.png', tag: 'Spa & Wellness' },
  { src: '/images/hotel5.png', tag: 'Personalized Welcome' },
  { src: '/images/hotel6.png', tag: 'Event Spaces' },
];


const DeckovizLanding: React.FC = () => {
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


        {/* hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        
          <div className="mt-28 mb-10 shadow-lg hover:shadow-xl ">
            <span className="inline-flex items-center px-3 py-1 bg-[#6670d8] text-white text-sm font-medium rounded-md">
              Deckoviz For All
            </span>
          </div>

          {/* main heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Transform Your Guest
              <br />
              Experience With Deckoviz
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              The World's First AI-Powered Smart Art Frame, for Hotels, Resorts &
              <br />
              Hospitality Spaces
            </p>
          </div>

          {/* Secondary Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight mb-3">
              Elevate Atmosphere, Deepen Emotion, and Create a
            </h2>
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight">
              Stay That's Unforgettable
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="max-w-4xl space-y-6 text-gray-900 font-medium leading-relaxed">
            <p className="text-base md:text-lg">
              In today's hyper-competitive hospitality landscape, experience is everything. Guests no
              <br />
              longer just look for comfort and service   they want story, beauty, meaning, and memory.
              <br />
              They want to feel something.
            </p>
            
            <p className="text-base md:text-lg">
              Deckoviz helps you give them all of that   through a breathtaking, emotion-rich, AI-powered
              <br />
              visual frame that transforms your hotel's interiors into living, evolving expressions of luxury,
              <br />
              atmosphere, and personal connection.
            </p>
            
            <div className="pt-4 pb-20">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                This isn't just décor.
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-800">
                This is emotional ambiance as a service   smart, responsive, curated, and always beautiful.
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
                    <InstagramEmbed url="https://www.instagram.com/p/DLM9TrnSibN/embed" width="100%" height="100%" />
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

      {/* ===== DYNAMIC IMAGE GRID ADDED HERE ===== */}
      <DynamicImageGrid 
        imageSources={hotelImages}
        sectionTitle="Transforming Hospitality Spaces"
        sectionDescription="From welcoming lobbies to serene suites, see how Deckoviz creates unforgettable guest experiences."
      />

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
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight ">
                What is
                <br />
                Deckoviz?
              </h2>
            </div>

            {/* Right Column */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg text-gray-800 leading-relaxed mt-14">
                  Deckoviz is an AI-powered Smart Art Frame
                  <br />
                  designed to turn any wall into a living, breathing
                  <br />
                  canvas of evolving art, ambience, and emotion.
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
                    Personalized
                    <br />
                    art gallery for
                    <br />
                    every room
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
                    Mood-aware
                    <br />
                    ambient
                    <br />
                    visual system
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
                    Storytelling
                    <br />
                    canvas for your
                    <br />
                    hotel's brand
                    <br />
                    and spirit
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
                    Curated guest
                    <br />
                    experience
                    <br />
                    enhancer
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
                    Next-generation
                    <br />
                    design feature that
                    <br />
                    combines beauty +
                    <br />
                    intelligence
                  </h4>
                </div>
              </div>
            </div>
            
          </div>

          {/* Bottom Description */}
          <div className="text-center max-w-6xl mx-auto">
            <p className="text-lg text-gray-900 font-medium leading-relaxed">
              It runs on Android TV, connects with an intuitive mobile app, and gives you the ability to curate, control, and personalize the
              <br />
              entire visual atmosphere of your property   across rooms, lobbies, lounges, spas, restaurants, and suites.
            </p>
          </div>
        </div>
      </div>
      
      {/* Why Should Hotels Use Deckoviz Section */}
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
                Why Should Hotels
                <br />
                Use Deckoviz?
              </h2>
            </div>

            {/* Right Column */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg text-gray-800 leading-relaxed mt-14">
                  In hospitality, ambience is currency. How a space
                  <br />
                  makes someone feel is what brings them back.
                  <br />
                  With Deckoviz, you gain a powerful new tool to:
                </p>
              </div>
              <div className="ml-8">

              </div>
            </div>
          </div>

          {/* Cards Section with Background Gradient */}
          <div className="relative">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Primary glow */}
              <div
                className="absolute top-20 right-20 w-[600px] h-[600px] opacity-30"
                style={{
                  background: "radial-gradient(circle at center, rgba(147,51,234,0.4) 0%, rgba(219,39,119,0.25) 40%, rgba(236,72,153,0.15) 70%, transparent 90%)",
                  filter: "blur(140px)",
                }}
              />
              {/* Secondary glow */}
              <div
                className="absolute bottom-20 left-20 w-[500px] h-[500px] opacity-20"
                style={{
                  background: "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.2) 50%, transparent 80%)",
                  filter: "blur(120px)",
                }}
              />
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {/* Card 1 - Emotional Tone */}
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
                          <circle cx="12" cy="12" r="5"/>
                          <line x1="12" y1="1" x2="12" y2="3"/>
                          <line x1="12" y1="21" x2="12" y2="23"/>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                          <line x1="1" y1="12" x2="3" y2="12"/>
                          <line x1="21" y1="12" x2="23" y2="12"/>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
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
                    Set the Emotional Tone of Every Room
                  </h3>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Morning: golden hour visuals, gentle soundscapes, nature-based serenity
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Evening: romantic tones, moody ambient light, soft twilight scenes
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Night: calming dreamscapes for sleep rituals
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </div>

              {/* Card 2 - Personal Experiences */}
              <div className="relative group cursor-pointer">
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
                />
                
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
                  
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
                          <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
                          <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
                          <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"/>
                          <circle cx="12" cy="12" r="7"/>
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
                    Offer Dynamic, Personal, and Memorable Guest Experiences
                  </h3>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Display personalized welcome messages, guest names, or curated themes
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Match visuals to guest mood, purpose (honeymoon, business, family), or profile
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Surprise and delight with seasonal visuals, holiday art, or special-event backdrops
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </div>

              {/* Card 3 - Market Differentiation */}
              <div className="relative group cursor-pointer">
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
                />
                
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
                  
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M6 9l6 6 6-6"/>
                          <circle cx="12" cy="12" r="3"/>
                          <path d="M12 1v6m0 6v6"/>
                          <path d="M21 12h-6m-6 0H3"/>
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

                  <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-tight group-hover:text-gray-800">
                    Differentiate Your Property in the Market
                  </h3>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Deliver an immersive experience no other hotel offers
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Build a signature design style with curated visuals and collections
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Present as a modern, art-forward, emotionally intelligent brand
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </div>

              {/* Card 4 - Monetization */}
              <div className="relative group cursor-pointer">
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
                />
                
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
                  
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 bg-opacity-10 group-hover:scale-110 transition-transform duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <line x1="12" y1="1" x2="12" y2="23"/>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
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
                    Monetize New Storytelling & Art Channels
                  </h3>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Partner with local or global artists to create exclusive Deckoviz hotel content
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Rotate your chef's story, spa experiences, or behind-the-scenes process
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Offer guests access to your own curated content collections   art, poetry, culture
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </div>

              {/* Card 5 - Design Upgrade */}
              <div className="relative group cursor-pointer">
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
                />
                
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
                  
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 bg-opacity-10 group-hover:scale-110 transition-transform duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                        </svg>
                      </div>
                      <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full group-hover:from-rose-400 transition-colors duration-300" />
                    </div>
                    
                    <div className="text-gray-400 group-hover:text-rose-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-tight group-hover:text-gray-800">
                    Upgrade Design Without Renovation
                  </h3>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Change the mood of a room instantly   no paint, no wallpaper, no redesign
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Rotate entire aesthetic themes by the day, season, or event
                      </p>
                    </div>
                    <div className="flex items-start group/bullet">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/bullet:scale-125 transition-transform duration-200" />
                      <p className="text-indigo-700 font-medium text-sm leading-relaxed group-hover/bullet:text-indigo-800 transition-colors duration-200">
                        Impress interior designers, influencers, and visual storytellers
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
                Use Case Scenarios for
                <br />
                Deckoviz in Hotels &
                <br />
                Resorts
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
                {/* Card 1 - Guest Rooms */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Hotel & Resorts
                        </span>


                        <h3 className="text-2xl font-semibold text-gray-900">In Guest Rooms</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Greet guests with a personalized welcome message or ambient art reflecting their preferences
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Curate dynamic, time-based visual schedules (calm mornings, energizing afternoons, tranquil evenings)
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Offer guest mood modes: "Relax," "Focus," "Romance," "Sleep," "Inspiration"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Lobbies and Lounges */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Hotel & Resorts
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-900">In Lobbies and Lounges</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Display regional art, historical visual narratives, or seasonally themed ambient collections
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Welcome international guests with visuals from their home country or culture
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Create a high-design moment that guests photograph, remember, and share
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row - 3 Narrower Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 3 - Restaurants & Bars */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Hotel & Resorts
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">In Restaurants & Bars</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Match visual ambience to cuisine: Italian vineyard scenes, Tokyo night lights, Mediterranean coastlines
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Rotate visuals to complement the menu theme, time of day, or music
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4 - Spas & Wellness Areas */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Hotel & Resorts
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">In Spas & Wellness Areas</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Visualize healing   flowing water, slow-moving clouds, fractal breath animations
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Use moodscapes and soundscapes to deepen emotional immersion during massage or treatment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 5 - Event Spaces */}
                <div className="relative group">
                  <div className="bg-[#faebf8] backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block bg-white text-black text-sm font-semibold mb-2 px-3 py-[1px] rounded-md shadow-sm">
                          For Hotel & Resorts
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">In Event Spaces</h3>
                      </div>
                      <img src="images/crown.png" alt="Crown" className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Offer custom Deckoviz visual modes for weddings, corporate events, or VIP bookings
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-indigo-600 font-medium">
                          Set up motion-graphic visuals, ambient loops, or poetic displays matching the event's theme
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

      {/* Features Tailored for Hotels Section */}
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
              Features Tailored for Hotels
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
                    Portrait & Landscape Modes
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
                    Rotating Frame Options (classic wood, modern, bezelless, luxury frame add-ons)
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
                    Android TV Integration   optional smart TV use
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
                    Voice & App Control (via mobile)
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
                    Scheduled Display Routines
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
                    Mood-Based Visual Triggers
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
                    Personalized Welcome Modes
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
              Business Benefit
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
                          <span className="text-white text-sm">✧˖</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                          Enhanced Guest Experience = Higher Reviews & Loyalty
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
                          <span className="text-white text-sm">✧˖</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                          Social Media & Content Shareability
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      People love beautiful things. Deckoviz becomes the most Instagrammable spot in the room   generating organic reach and impressions every day.
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
                          <span className="text-white text-sm">✧˖</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                          Enhanced Guest Experience = Higher Reviews & Loyalty
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      Guests will remember how your rooms made them feel. Deckoviz helps you create "wow" moments, emotional atmosphere, and beauty your guests can't get anywhere else.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 - Bottom Right */}
                <div className="relative group">
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#6670d8] rounded-2xl p-6 bg-white/70 backdrop-blur-sm h-auto flex flex-col shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 bg-[#6670d8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-sm">✧˖</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#6670d8] leading-tight mb-3">
                          Social Media & Content Shareability
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      People love beautiful things. Deckoviz becomes the most Instagrammable spot in the room   generating organic reach and impressions every day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Results: Sample Guest Reactions Section */}
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
              Testimonials From our users💥
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="group">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/60">
                <div className="mb-6">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    "The moment I entered my room and saw the frame welcome me with my name and sunset visuals, I literally gasped. Most peaceful sleep I've had in months."
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-900 font-semibold">
                      Guest at boutique hotel pilot
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
                      Events manager at luxury resort
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
                    "We've had multiple guests ask where they could buy it. Deckoviz has become a silent ambassador for our design and brand experience."
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-900 font-semibold">
                      General Manager, design-forward city hotel
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

export default DeckovizLanding;

