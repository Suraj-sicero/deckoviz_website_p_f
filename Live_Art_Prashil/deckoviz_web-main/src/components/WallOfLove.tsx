import { useEffect, useState } from "react";


export default function WallOfLove() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);

    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);


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
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}>
      {/* Background gradient section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
          <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
          <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
          <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
          <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        
        {/* Top Badge */}
        <div className="flex justify-center pt-8 pb-4 mt-20 mb-2">
          <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">
            Customer Testimonials ✨
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight pb-6">
          <span className="font-serif text-[#182a4a]">Wall of </span>
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] pr-2">Love</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-[#1e3a6e] font-semibold mb-8">
          Real People. Real Spaces. Real Magic.
        </p>

        {/* Description */}
        <div className="relative z-30 max-w-3xl mx-auto px-4 text-center">
          <p className="text-[17px] sm:text-[19px] leading-relaxed text-gray-700 mb-12">
            We love hearing from you - whether it's feedback, ideas, creative sparks, bugs 
            you've noticed, feature suggestions, or simply your experience with Deckoviz. 
            Every message helps us grow, improve, and create more beautiful, 
            meaningful experiences.
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182a4a] mb-6 leading-tight">
            Here, you'll find voices from<br />
            across the world
          </h2>

          <p className="text-[17px] sm:text-[19px] leading-relaxed text-gray-700 font-medium mb-12">
            from design lovers to digital creators, therapists to restaurateurs, 
            <br />families to founders - all using Deckoviz to infuse their lives with magic.
          </p>

          {/* CTA Button */}
          <button className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white font-bold text-lg shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300">
            Join Our Wall of Love
          </button>
        </div>
      </div>

      {/* What Our People Say Section */}
      <div className="relative mt-32 mb-32">
       <div className="relative z-10 w-full px-12">
         {/* Section Title */}
         <div className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#182a4a] mb-8">
             What Our People Say:
           </h2>
         </div>

         
         {/* Mobile Layout */}
<div 
  className="md:hidden rounded-3xl p-6 relative overflow-hidden"
  style={{ 
    background: "linear-gradient(135deg, rgba(147,51,234,0.08) 0%, rgba(236,72,153,0.12) 25%, rgba(255,182,193,0.15) 50%, rgba(230,230,250,0.10) 75%, rgba(255,255,255,0.95) 100%)"
  }}
>

  <div className="flex flex-col gap-6">

    {/* Card */}
    <div className="bg-white rounded-2xl p-5 shadow-lg">
      <h4 className="font-bold text-[#2563EB] mb-2">Simon Lee</h4>
      <p className="text-gray-700 text-sm leading-relaxed">
        Used it for a post about AI and it's got people having conversations already, more engagement than any of my previous value posts. This is exciting!
      </p>
    </div>

    <div className="bg-white rounded-2xl p-5 shadow-lg">
      <h4 className="font-bold text-[#2563EB] mb-2">Amara, Toronto</h4>
      <p className="text-gray-700 text-sm leading-relaxed">
        "Deckoviz has changed the way my home feels. It's not just decor it's dynamic, alive, and responsive to me. Every morning it greets me with something that feels right."
      </p>
    </div>

    <div className="bg-white rounded-2xl p-5 shadow-lg">
      <h4 className="font-bold text-[#2563EB] mb-2">Jules, Berlin</h4>
      <p className="text-gray-700 text-sm leading-relaxed">
        Just tested it and it is looking great. I actually published something, and actually learned something new. The writing is pretty good, and with a personal touch, it was fantastic.
      </p>
    </div>

    <div className="bg-white rounded-2xl p-5 shadow-lg">
      <h4 className="font-bold text-[#2563EB] mb-2">Maya, Bangalore</h4>
      <p className="text-gray-700 text-sm leading-relaxed">
        "My favorite memory? Uploading a childhood photo, transforming it into a surreal dreamscape, and watching my daughter gasp in wonder."
      </p>
    </div>

    <div className="rounded-2xl p-5 backdrop-blur-xl border-t shadow-lg"
      style={{
        background: "rgba(255, 255, 255, 0.25)",
        borderTopColor: "rgba(255, 255, 255, 0.8)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
      <h4 className="font-bold text-[#2563EB] mb-2">Marco, Florence</h4>
      <p className="text-gray-700 text-sm leading-relaxed">
        "Guests always ask where I got the 'wall that dances' in my wine bar. Deckoviz has become a centerpiece of experience, not just decor."
      </p>
    </div>

    <div className="rounded-2xl p-5 backdrop-blur-xl border-t shadow-lg"
      style={{
        background: "rgba(255, 255, 255, 0.25)",
        borderTopColor: "rgba(255, 255, 255, 0.8)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
        borderRight: "1px solid rgba(255, 255, 255, 0.5)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
      <h4 className="font-bold text-[#2563EB] mb-2">Tashi, LA</h4>
      <p className="text-gray-700 text-sm leading-relaxed">
        "We use Deckoviz in our yoga studio. The ambient meditation visuals are unbelievable. It sets the tone for every class calm, beauty, presence."
      </p>
    </div>

  </div>
</div>
         {/* Testimonials Container with Gradient Background */}
         
         <div  
           className="rounded-3xl p-12 relative overflow-hidden mx-auto"
           style={{ 
             minHeight: "80vh",
             width: "calc(100vw - 6rem)",
             background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(59,130,246,0.12) 25%, rgba(96,165,250,0.15) 50%, rgba(239,246,255,0.10) 75%, rgba(255,255,255,0.95) 100%)",
             display:isMobile ? 'none' :'block'
           }}
         >
           {/* Floating Testimonial Cards */}
           <div className="relative w-full h-full" style={{ minHeight: "70vh" }}>
             
             {/* Simon Lee - Top Left */}
             <div 
               className="absolute rounded-2xl p-6 shadow-lg testimonial-float backdrop-blur-xl border-t"
               style={{ 
                 background: "rgba(255, 255, 255, 0.25)",
                 borderTopColor: "rgba(255, 255, 255, 0.8)",
                 borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                 borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                 borderBottom: "1px solid rgba(255, 255, 255, 0.5)", 
                 top: "5%", 
                 left: "5%",
                 width: "280px",
                 animation: "complexFloat1 8s ease-in-out infinite",
                 zIndex: 10
               }}
             >
               <h4 className="font-bold text-[#2563EB] mb-3"> Simon Lee</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 Used it for a post about AI and it's got people having conversations already, more engagement than any of my previous value posts. This is exciting!
               </p>
             </div>

             {/* Amara, Toronto - Top Center */}
             <div 
               className="absolute rounded-2xl p-6 shadow-lg testimonial-float backdrop-blur-xl border-t"
               style={{ 
                 background: "rgba(255, 255, 255, 0.25)",
                 borderTopColor: "rgba(255, 255, 255, 0.8)",
                 borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                 borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                 borderBottom: "1px solid rgba(255, 255, 255, 0.5)", 
                 top: "8%", 
                 left: "35%",
                 width: "300px",
                 animation: "complexFloat2 10s ease-in-out infinite",
                 zIndex: 12
               }}
             >
               <h4 className="font-bold text-[#2563EB] mb-3"> Amara, Toronto</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "Deckoviz has changed the way my home feels. It's not just decor   it's dynamic, alive, and responsive to me. Every morning it greets me with something that feels right."
               </p>
             </div>

             {/* Jules, Berlin - Top Right */}
             <div 
               className="absolute rounded-2xl p-6 shadow-lg testimonial-float backdrop-blur-xl border-t"
               style={{ 
                 background: "rgba(255, 255, 255, 0.25)",
                 borderTopColor: "rgba(255, 255, 255, 0.8)",
                 borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                 borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                 borderBottom: "1px solid rgba(255, 255, 255, 0.5)", 
                 top: "12%", 
                 right: "5%",
                 width: "280px",
                 animation: "complexFloat3 7s ease-in-out infinite",
                 zIndex: 8
               }}
             >
               <h4 className="font-bold text-[#2563EB] mb-3"> Jules, Berlin</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 Just tested it and it is looking great. I actually published something, and actually learned something new. The writing is pretty good, and with a personal touch, it was fantastic.
               </p>
             </div>

             {/* Maya, Bangalore - Middle Left */}
             <div 
               className="absolute rounded-2xl p-6 shadow-lg testimonial-float backdrop-blur-xl border-t"
               style={{ 
                 background: "rgba(255, 255, 255, 0.25)",
                 borderTopColor: "rgba(255, 255, 255, 0.8)",
                 borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                 borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                 borderBottom: "1px solid rgba(255, 255, 255, 0.5)", 
                 top: "35%", 
                 left: "8%",
                 width: "320px",
                 animation: "complexFloat4 9s ease-in-out infinite",
                 zIndex: 15
               }}
             >
               <h4 className="font-bold text-[#2563EB] mb-3"> Maya, Bangalore</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "My favorite memory? Uploading a childhood photo, transforming it into a surreal dreamscape, and watching my daughter gasp in wonder."   Maya, Bangalore
               </p>
             </div>

             {/* Marco, Florence - Middle Center */}
             <div 
               className="absolute rounded-2xl p-6 shadow-lg testimonial-float backdrop-blur-xl border-t"
               style={{ 
                 background: "rgba(255, 255, 255, 0.25)",
                 borderTopColor: "rgba(255, 255, 255, 0.8)",
                 borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                 borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                 borderBottom: "1px solid rgba(255, 255, 255, 0.5)", 
                 top: "45%", 
                 left: "40%",
                 width: "290px",
                 animation: "complexFloat5 11s ease-in-out infinite",
                 zIndex: 11
               }}
             >
               <h4 className="font-bold text-[#2563EB] mb-3"> Marco, Florence</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "Guests always ask where I got the 'wall that dances' in my wine bar. Deckoviz has become a centerpiece of experience, not just decor."   Marco, Florence
               </p>
             </div>

             {/* Tashi, LA - Bottom Right */}
             <div 
               className="absolute rounded-2xl p-6 shadow-lg testimonial-float backdrop-blur-xl border-t"
               style={{ 
                 background: "rgba(255, 255, 255, 0.25)",
                 borderTopColor: "rgba(255, 255, 255, 0.8)",
                 borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                 borderRight: "1px solid rgba(255, 255, 255, 0.5)",
                 borderBottom: "1px solid rgba(255, 255, 255, 0.5)", 
                 bottom: "5%", 
                 right: "8%",
                 width: "310px",
                 animation: "complexFloat6 6s ease-in-out infinite",
                 zIndex: 13
               }}
             >
               <h4 className="font-bold text-[#2563EB] mb-3"> Tashi, LA</h4>
               <p className="text-gray-700 text-sm leading-relaxed">
                 "We use Deckoviz in our yoga studio. The ambient meditation visuals are unbelievable. It sets the tone for every class   calm, beauty, presence."   Tashi, LA
               </p>
             </div>
           </div>

           {/* Navigation Arrows */}
           <div className="absolute bottom-6 right-6 flex space-x-3">
             <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
               <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
             </button>
             <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
               <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
       background: "linear-gradient(135deg, #182A4A 0%, #1e40af 50%, #3b82f6 100%)",
     }}
   >
     {/* Animated background elements */}
     <div className="absolute inset-0 overflow-hidden">
       <div className="absolute -top-4 -right-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
       <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-violet-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: "2s"}}></div>
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

         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
           Want to be featured on our{' '}
           <span className="font-serif italic text-blue-200 block mt-2">
             Wall of Love?
           </span>
         </h2>

         <p className="text-white/90 text-lg mb-6 leading-relaxed max-w-2xl">
           We'd love to see how you use Deckoviz! Tag us on Instagram{' '}
           <span className="font-semibold text-yellow-300">@deckoviz</span>, send us your stories, or drop a memory in our inbox.
         </p>

         <button className="group bg-white text-blue-600 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/40 hover:scale-105 flex items-center gap-2 mb-6">
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
           Every photo, message, and moment you share becomes part of our shared canvas   a global collage of wonder, connection, and creativity.
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
               <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-violet-900 text-sm font-semibold shadow-lg">
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