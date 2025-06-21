import React from 'react';

const DeckovizLanding: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Gradient Background */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background Effects - Only for Hero Section */}
        <div className="absolute inset-0">
          {/* Single continuous left side gradient with varying widths */}
          <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-500/25 via-purple-400/15 to-transparent blur-[40px]"></div>
          
          {/* Additional center flow */}
          <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-400/10 to-transparent blur-[50px]"></div>
          
          {/* Additional bottom flow */}
          <div className="absolute top-1/2 left-0 w-3/5 h-1/2 bg-gradient-to-r from-indigo-500/15 via-purple-400/8 to-transparent blur-[60px]"></div>
          
          {/* Right side vertical gradient - ends much earlier */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/25 via-purple-400/15 to-transparent blur-[50px]"></div>
          
          {/* Left edge accents for smoothness */}
          <div className="absolute top-0 left-0 w-1/6 h-1/3 bg-gradient-to-r from-indigo-600/30 via-rose-400/15 to-transparent blur-[30px]"></div>
          
          <div className="absolute top-1/3 left-0 w-1/5 h-1/2 bg-gradient-to-r from-indigo-500/20 via-rose-400/17 to-transparent blur-[35px]"></div>
          
          <div className="absolute top-2/3 left-0 w-1/4 h-1/3 bg-gradient-to-r from-indigo-600/35 via-rose-400/20 to-transparent blur-[40px]"></div>
          
          {/* Right edge vertical accent */}
          <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-indigo-600/30 via-rose-400/15 to-transparent blur-[35px]"></div>
          
          {/* Bottom gradient with more pink/rose */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-300/20 via-pink-300/18 to-transparent blur-[45px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
          {/* Top Badge */}
          <div className="mt-28 mb-10 shadow-lg hover:shadow-xl ">
            <span className="inline-flex items-center px-3 py-1 bg-[#6670d8] text-white text-sm font-medium rounded-md">
              Deckoviz For All
            </span>
          </div>

          {/* Main Heading */}
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
              longer just look for comfort and service — they want story, beauty, meaning, and memory.
              <br />
              They want to feel something.
            </p>
            
            <p className="text-base md:text-lg">
              Deckoviz helps you give them all of that — through a breathtaking, emotion-rich, AI-powered
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
                This is emotional ambiance as a service — smart, responsive, curated, and always beautiful.
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
       <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight ">
         What is
         <br />
         Deckoviz
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
       entire visual atmosphere of your property — across rooms, lobbies, lounges, spas, restaurants, and suites.
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      {/* Card 1 */}
      <div className="relative group">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
          <div className="mb-6 flex justify-start">
            
              <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
            
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
            Set the Emotional Tone of Every Room
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
            Offer Dynamic, Personal, and Memorable Guest Experiences
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
            Differentiate Your Property in the Market
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

      {/* Card 4 */}
      <div className="relative group">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 h-full flex flex-col hover:bg-purple-100">
          <div className="mb-6 flex justify-start">
           
              <img src="images/bullethotel.png" alt="" className="w-12 h-8 object-contain" />
            
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
            Monetize New Storytelling & Art Channels
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
            Upgrade Design Without Renovation
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
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[50rem]"
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
                 <p className="text-sm text-gray-600 mb-2">For Hotel & Resorts</p>
                 <h3 className="text-2xl font-semibold text-gray-900">In Guest Rooms</h3>
               </div>
               <img src="images/crown.png" alt="Crown" className="w-8 h-8 object-contain" />
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
                 <p className="text-sm text-gray-600 mb-2">For Hotel & Resorts</p>
                 <h3 className="text-2xl font-semibold text-gray-900">In Lobbies and Lounges</h3>
               </div>
               <img src="images/crown.png" alt="Crown" className="w-8 h-8 object-contain" />
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
                 <p className="text-sm text-gray-600 mb-2">For Hotel & Resorts</p>
                 <h3 className="text-xl font-semibold text-gray-900">In Restaurants & Bars</h3>
               </div>
               <img src="images/crown.png" alt="Crown" className="w-8 h-8 object-contain" />
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
                 <p className="text-sm text-gray-600 mb-2">For Hotel & Resorts</p>
                 <h3 className="text-xl font-semibold text-gray-900">In Spas & Wellness Areas</h3>
               </div>
               <img src="images/crown.png" alt="Crown" className="w-8 h-8 object-contain" />
             </div>
             
             <div className="space-y-3">
               <div className="flex items-start">
                 <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                 <p className="text-indigo-600 font-medium">
                   Visualize healing — flowing water, slow-moving clouds, fractal breath animations
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
                 <p className="text-sm text-gray-600 mb-2">For Hotel & Resorts</p>
                 <h3 className="text-xl font-semibold text-gray-900">In Event Spaces</h3>
               </div>
               <img src="images/crown.png" alt="Crown" className="w-8 h-8 object-contain" />
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

      
    </div>
  );
};

export default DeckovizLanding;