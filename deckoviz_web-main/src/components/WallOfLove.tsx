export default function WallOfLove() {
  // Sample profile data for the CTA section
  const featuredProfiles = [
    {
      id: 1,
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      role: "Top Voice",
      badge: "⭐"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "Featured Creator",
      badge: "🏆"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      role: "Community Star",
      badge: "✨"
    },
    {
      id: 4,
      name: "David Kim",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "Top Contributor",
      badge: "🚀"
    },
    {
      id: 5,
      name: "Aisha Patel",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      role: "Rising Star",
      badge: "💫"
    },
    {
      id: 6,
      name: "Alex Thompson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      role: "Featured Voice",
      badge: "🎯"
    }
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Background gradient section */}
      <div className="absolute inset-0 z-0">
        {/* Base white background with subtle pattern */}
        <div className="absolute inset-0 bg-white" />

        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Enhanced gradient with more depth and animation - extended height */}
        <div className="absolute left-0 right-0" style={{ top: "260px", height: "460px" }}>
          <div
            className="mx-4 h-full overflow-hidden relative animate-pulse"
            style={{
              borderBottomLeftRadius: "50px",
              borderBottomRightRadius: "50px",
              animationDuration: "4s",
            }}
          >
            {/* Multi-layered gradient for depth */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-fuchsia-300 to-orange-300" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-200/30 to-yellow-200/40" />

            {/* Animated gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"
              style={{ animationDuration: "3s" }}
            />

            {/* Top fade with enhanced transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        
        {/* Top Badge with glow effect */}
        <div className="flex justify-center pt-4 pb-2 mt-24 mb-4">
          <div className="bg-[#7d39ec] text-white px-4 py-1 rounded-lg text-sm font-medium shadow-lg shadow-violet-500/50 hover:shadow-violet-500/80 transition-shadow duration-300">
            Wall of Love
          </div>
        </div>

        {/* Heading with gradient text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-gray-900 to-violet-500 bg-clip-text text-transparent leading-tight">
          Wall Of Love
        </h1>

        {/* Subheading with enhanced styling */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-8 px-4">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <span className="text-gray-900 text:4xl  sm:text-2xl md:text-3xl font-medium">Real People. Real Spaces. Real Magic.</span>
          </p>
        </div>

        {/* Description section positioned over the gradient */}
        <div className="relative z-30 max-w-3xl mx-auto px-4 text-center">
          <p className="text-base sm:text-lg text-gray-900 leading-relaxed font-normal mb-12">
            We love hearing from you — whether it's feedback, ideas, creative sparks, bugs 
            you've noticed, feature suggestions, or simply your experience with Deckoviz. 
            Every message helps us grow, improve, and create more beautiful, 
            <br />meaningful 
            experiences.
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6440ac] mb-6 leading-tight">
            Here, you'll find voices from<br />
            across the world
          </h2>

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium mb-12">
            — from design lovers to digital creators, therapists to restaurateurs, 
            <br />families to founders — all using Deckoviz to infuse their lives with:
          </p>

          {/* CTA Button */}
          <button className="group relative px-8 py-3 text-white font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-105 overflow-hidden text-base border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-pink-400 to-orange-300 transition-all duration-300 group-hover:from-violet-600 group-hover:via-pink-500 group-hover:to-orange-400"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center justify-center gap-2 font-light">
             Join Our Wall of love 
            </span>
          </button>
        </div>
      </div>

      {/* What Our People Say Section */}
      <div className="relative mt-32 mb-32">
       <div className="relative z-10 w-full px-12">
         {/* Section Title */}
         <div className="text-center mb-16">
           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-gray-900 to-violet-500 bg-clip-text text-transparent mb-8">
             What Our People Say:
           </h2>
         </div>

         {/* Testimonials Container with Gradient Background */}
         <div 
           className="rounded-3xl p-12 relative overflow-hidden mx-auto"
           style={{ 
             minHeight: "80vh",
             width: "calc(100vw - 6rem)",
             background: "linear-gradient(135deg, rgba(147,51,234,0.08) 0%, rgba(236,72,153,0.12) 25%, rgba(255,182,193,0.15) 50%, rgba(230,230,250,0.10) 75%, rgba(255,255,255,0.95) 100%)"
           }}
         >
           {/* Floating Testimonial Cards */}
           <div className="relative w-full h-full" style={{ minHeight: "70vh" }}>
             
             {/* Simon Lee - Top Left */}
             <div 
               className="absolute bg-white rounded-2xl p-6 shadow-lg testimonial-float"
               style={{ 
                 top: "5%", 
                 left: "5%",
                 width: "280px",
                 animation: "complexFloat1 8s ease-in-out infinite",
                 zIndex: 10
               }}
             >
               <h4 className="font-bold text-[#6670d8] mb-3">—Simon Lee</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 Used it for a post about AI and it's got people having conversations already, more engagement than any of my previous value posts. This is exciting!
               </p>
             </div>

             {/* Amara, Toronto - Top Center */}
             <div 
               className="absolute bg-white rounded-2xl p-6 shadow-lg testimonial-float"
               style={{ 
                 top: "8%", 
                 left: "35%",
                 width: "300px",
                 animation: "complexFloat2 10s ease-in-out infinite",
                 zIndex: 12
               }}
             >
               <h4 className="font-bold text-[#6670d8] mb-3">—Amara, Toronto</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "Deckoviz has changed the way my home feels. It's not just decor — it's dynamic, alive, and responsive to me. Every morning it greets me with something that feels right."
               </p>
             </div>

             {/* Jules, Berlin - Top Right */}
             <div 
               className="absolute bg-white rounded-2xl p-6 shadow-lg testimonial-float"
               style={{ 
                 top: "12%", 
                 right: "5%",
                 width: "280px",
                 animation: "complexFloat3 7s ease-in-out infinite",
                 zIndex: 8
               }}
             >
               <h4 className="font-bold text-[#6670d8] mb-3">—Jules, Berlin</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 Just tested it and it is looking great. I actually published something, and actually learned something new. The writing is pretty good, and with a personal touch, it was fantastic.
               </p>
             </div>

             {/* Maya, Bangalore - Middle Left */}
             <div 
               className="absolute bg-white rounded-2xl p-6 shadow-lg testimonial-float"
               style={{ 
                 top: "35%", 
                 left: "8%",
                 width: "320px",
                 animation: "complexFloat4 9s ease-in-out infinite",
                 zIndex: 15
               }}
             >
               <h4 className="font-bold text-[#6670d8] mb-3">—Maya, Bangalore</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "My favorite memory? Uploading a childhood photo, transforming it into a surreal dreamscape, and watching my daughter gasp in wonder." — Maya, Bangalore
               </p>
             </div>

             {/* Marco, Florence - Middle Center */}
             <div 
               className="absolute bg-white rounded-2xl p-6 shadow-lg testimonial-float"
               style={{ 
                 top: "45%", 
                 left: "40%",
                 width: "290px",
                 animation: "complexFloat5 11s ease-in-out infinite",
                 zIndex: 11
               }}
             >
               <h4 className="font-bold text-[#6670d8] mb-3">—Marco, Florence</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "Guests always ask where I got the 'wall that dances' in my wine bar. Deckoviz has become a centerpiece of experience, not just decor." — Marco, Florence
               </p>
             </div>

             {/* Tashi, LA - Bottom Right */}
             <div 
               className="absolute bg-white rounded-2xl p-6 shadow-lg testimonial-float"
               style={{ 
                 bottom: "5%", 
                 right: "8%",
                 width: "310px",
                 animation: "complexFloat6 6s ease-in-out infinite",
                 zIndex: 13
               }}
             >
               <h4 className="font-bold text-[#6670d8] mb-3">—Tashi, LA</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "We use Deckoviz in our yoga studio. The ambient meditation visuals are unbelievable. It sets the tone for every class — calm, beauty, presence." — Tashi, LA
               </p>
             </div>
           </div>

           {/* Navigation Arrows */}
           <div className="absolute bottom-6 right-6 flex space-x-3">
             <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
               <svg className="w-5 h-5 text-[#6670d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
             </button>
             <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
               <svg className="w-5 h-5 text-[#6670d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </button>
           </div>
         </div>
       </div>
      </div>

     {/* Enhanced CTA Section - Want to be featured */}
<div className="relative mt-32 mb-32">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
   <div
     className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl"
     style={{
       background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
     }}
   >
     {/* Animated background elements */}
     <div className="absolute inset-0 overflow-hidden">
       <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
       <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: "2s"}}></div>
     </div>

     <div className="flex flex-col lg:flex-row items-center justify-between relative z-20">
       {/* Left Content */}
       <div className="flex-1 mb-12 lg:mb-0 lg:pr-12">
         <div className="mb-6">
           <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg mb-4">
             <span className="mr-2">🌍</span>
             Global collage of wonder
           </div>
         </div>

         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
           Want to be featured on our{' '}
           <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
             Wall of Love?
           </span>
         </h2>

         <p className="text-white/90 text-lg mb-6 leading-relaxed max-w-2xl">
           We'd love to see how you use Deckoviz! Tag us on Instagram{' '}
           <span className="font-semibold text-yellow-300">@deckoviz</span>, send us your stories, or drop a memory in our inbox.
         </p>

         <button className="group bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/40 hover:scale-105 flex items-center gap-2 mb-6">
           Submit your story here
           <svg
             className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
           </svg>
         </button>

         <p className="text-white/80 text-base leading-relaxed max-w-2xl">
           Every photo, message, and moment you share becomes part of our shared canvas — a global collage of wonder, connection, and creativity.
         </p>
       </div>

       {/* Right Side - Featured Profiles Grid */}
       <div className="flex-shrink-0 lg:w-96">
         <div className="relative">
           {/* Enhanced background with darker glass effect */}
           <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl"></div>
           
           {/* Header */}
           <div className="relative p-6 text-center border-b border-white/30">
             <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Featured Creators</h3>
             <p className="text-white/90 text-sm">Join our community of storytellers</p>
           </div>

           {/* Profiles Grid */}
           <div className="relative p-6">
             <div className="grid grid-cols-2 gap-4">
               {/* Sarah Chen */}
               <div 
                 className="group bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-black/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 style={{
                   animation: "profileFloat1 3s ease-in-out infinite",
                   animationDelay: "0s"
                 }}
               >
                 <div className="flex items-center space-x-3">
                   <div className="relative">
                     <img 
                       src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" 
                       alt="Sarah Chen"
                       className="w-12 h-12 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-all duration-300"
                     />
                     <div className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-5 h-5 flex items-center justify-center">
                       ⭐
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-white font-medium text-sm truncate">Sarah Chen</p>
                     <div className="flex items-center space-x-1">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                       <p className="text-white/80 text-xs truncate">Top Voice</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Marcus Johnson */}
               <div 
                 className="group bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-black/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 style={{
                   animation: "profileFloat2 3.5s ease-in-out infinite",
                   animationDelay: "0.3s"
                 }}
               >
                 <div className="flex items-center space-x-3">
                   <div className="relative">
                     <img 
                       src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                       alt="Marcus Johnson"
                       className="w-12 h-12 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-all duration-300"
                     />
                     <div className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-5 h-5 flex items-center justify-center">
                       🏆
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-white font-medium text-sm truncate">Marcus Johnson</p>
                     <div className="flex items-center space-x-1">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                       <p className="text-white/80 text-xs truncate">Featured Creator</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Elena Rodriguez */}
               <div 
                 className="group bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-black/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 style={{
                   animation: "profileFloat3 4s ease-in-out infinite",
                   animationDelay: "0.6s"
                 }}
               >
                 <div className="flex items-center space-x-3">
                   <div className="relative">
                     <img 
                       src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
                       alt="Elena Rodriguez"
                       className="w-12 h-12 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-all duration-300"
                     />
                     <div className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-5 h-5 flex items-center justify-center">
                       ✨
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-white font-medium text-sm truncate">Elena Rodriguez</p>
                     <div className="flex items-center space-x-1">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                       <p className="text-white/80 text-xs truncate">Community Star</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* David Kim */}
               <div 
                 className="group bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-black/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 style={{
                   animation: "profileFloat4 4.5s ease-in-out infinite",
                   animationDelay: "0.9s"
                 }}
               >
                 <div className="flex items-center space-x-3">
                   <div className="relative">
                     <img 
                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                       alt="David Kim"
                       className="w-12 h-12 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-all duration-300"
                     />
                     <div className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-5 h-5 flex items-center justify-center">
                       🚀
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-white font-medium text-sm truncate">David Kim</p>
                     <div className="flex items-center space-x-1">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                       <p className="text-white/80 text-xs truncate">Top Contributor</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Aisha Patel */}
               <div 
                 className="group bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-black/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 style={{
                   animation: "profileFloat5 5s ease-in-out infinite",
                   animationDelay: "1.2s"
                 }}
               >
                 <div className="flex items-center space-x-3">
                   <div className="relative">
                     <img 
                       src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" 
                       alt="Aisha Patel"
                       className="w-12 h-12 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-all duration-300"
                     />
                     <div className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-5 h-5 flex items-center justify-center">
                       💫
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-white font-medium text-sm truncate">Aisha Patel</p>
                     <div className="flex items-center space-x-1">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                       <p className="text-white/80 text-xs truncate">Rising Star</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Alex Thompson */}
               <div 
                 className="group bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 hover:bg-black/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 style={{
                   animation: "profileFloat6 5.5s ease-in-out infinite",
                   animationDelay: "1.5s"
                 }}
               >
                 <div className="flex items-center space-x-3">
                   <div className="relative">
                     <img 
                       src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" 
                       alt="Alex Thompson"
                       className="w-12 h-12 rounded-full border-2 border-white/40 group-hover:border-white/70 transition-all duration-300"
                     />
                     <div className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-5 h-5 flex items-center justify-center">
                       🎯
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-white font-medium text-sm truncate">Alex Thompson</p>
                     <div className="flex items-center space-x-1">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                       <p className="text-white/80 text-xs truncate">Featured Voice</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Stats Section */}
             <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
               <div className="flex justify-between items-center">
                 <div className="text-center">
                   <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>2.4K+</div>
                   <div className="text-white/80 text-xs">Stories Shared</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>500+</div>
                   <div className="text-white/80 text-xs">Creators</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>50+</div>
                   <div className="text-white/80 text-xs">Countries</div>
                 </div>
               </div>
             </div>

             {/* CTA Badge */}
             <div className="mt-4 text-center">
               <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-purple-900 text-sm font-semibold shadow-lg">
                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                 </svg>
                 Top Voice Community
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>

<style>
{`
@keyframes profileFloat1 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
}

@keyframes profileFloat2 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.02); }
}

@keyframes profileFloat3 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.02); }
}

@keyframes profileFloat4 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-14px) scale(1.02); }
}

@keyframes profileFloat5 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-11px) scale(1.02); }
}

@keyframes profileFloat6 {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-9px) scale(1.02); }
}
`}
</style>

    
    </div>
  );
}