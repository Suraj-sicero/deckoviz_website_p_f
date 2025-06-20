export default function Contact() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Background gradient section */}
      <div className="absolute inset-0 z-0">
        {/* Base white background */}
        <div className="absolute inset-0 bg-white" />

        {/* Enhanced gradient with more depth and animation */}
        <div className="absolute left-0 right-0" style={{ top: "260px", height: "550px" }}>
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
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Top Badge */}
        <div className="flex justify-center pt-16 pb-2 mb-8">
          <div className="bg-[#7441dd] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
            Contact Us
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight text-center mb-8">
          Contact Our Team
        </h1>

        {/* Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We love hearing from you — whether it's feedback, ideas, creative sparks, bugs
            <br />
            you've noticed, feature suggestions, or simply your experience with Deckoviz.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Every message helps us grow, improve, and create more beautiful, meaningful
            <br />
            experiences.
          </p>
        </div>

        {/* Contact Options */}
        <div className="flex justify-center items-center space-x-8 mb-16 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Fill out the form below</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Connect with us on Instagram</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>Email us directly</span>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Instagram Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-80 flex flex-col">
            {/* Icon - positioned left */}
            <div className="flex justify-start mb-6">
              <img
                src="/images/contact1.png"
                alt="Instagram"
                className="w-16 h-16 object-contain"
              />
            </div>
            
            {/* Title with Bricolage Grotesque font */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left flex-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Connect with us on
              <br />
              Instagram
            </h3>
            
            {/* Description */}
            <p className="text-gray-700 text-left mb-6">
              We love DMs and comments!
            </p>
            
            {/* Link with icon - positioned at bottom */}
            <div className="flex items-center space-x-2 text-[#6670d8] font-medium mt-auto">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.070-4.85.070-3.204 0-3.584-.012-4.849-.070-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-gray-900">instagram.com/deckoviz</span>
            </div>
          </div>

          {/* Call Us Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-80 flex flex-col">
            {/* Icon - positioned left */}
            <div className="flex justify-start mb-6">
              <img
                src="/images/contact2.png"
                alt="Phone"
                className="w-16 h-16 object-contain"
              />
            </div>
            
            {/* Title with Bricolage Grotesque font */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left flex-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Call Us
            </h3>
            
            {/* Description */}
            <p className="text-gray-700 text-left mb-6">
              Ready to chat? Give us a call and let's
              <br />
              discuss how we can help bring your
              <br />
              vision to life.
            </p>
            
            {/* Phone Number with icon - positioned at bottom */}
            <div className="flex items-center space-x-2 mt-auto">
              <svg className="w-4 h-4 text-[#6670d8]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-gray-900 font-medium">(01) 000 123 44+</span>
            </div>
          </div>

          {/* Email Us Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 h-80 flex flex-col">
            {/* Icon - positioned left */}
            <div className="flex justify-start mb-6">
              <img
                src="/images/contact3.png"
                alt="Email"
                className="w-16 h-16 object-contain"
              />
            </div>
            
            {/* Title with Bricolage Grotesque font */}
            <h3 className="text-2xl font-bold text-gray-900 mb-1 text-left flex-1" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
              Email Us
            </h3>
            
            {/* Description */}
            <p className="text-gray-700 text-left mb-6">
              At [support@deckoviz.com] for any
              <br />
              support or feedback.
            </p>
            
            {/* Email with icon - positioned at bottom */}
            <div className="flex items-center space-x-2 mt-auto">
              <svg className="w-4 h-4 text-[#6670d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-900 font-medium">Support@decoviz.com</span>
            </div>
          </div>
        </div>



{/* Contact Form Section */}
<div className="relative mt-32 mb-32">
  {/* Gradient glow background */}
  <div
    className="absolute inset-0 transform"
    style={{
      background: "radial-gradient(ellipse at center, rgba(147,51,234,0.15) 0%, rgba(99,102,241,0.10) 40%, rgba(168,85,247,0.05) 70%, transparent 100%)",
      filter: "blur(60px)",
      zIndex: 1,
    }}
  />

  <div className="relative z-10 max-w-2xl mx-auto px-4">
    {/* Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
        Fill Out the Form Below
      </h2>
      <p className="text-gray-600 leading-relaxed">
        For feedback, bugs, issues, complaints,
        <br />
        suggestions, ideas, or sharing your experience.
      </p>
    </div>

    {/* Form Container - NO WHITE BOX */}
    <div className="space-y-8">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="John"
              className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-lg"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
          </div>
        </div>
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Last Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Smith"
              className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-lg"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="business@mail.com"
            className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-lg"
          />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
        </div>
      </div>

      {/* Phone Number Field */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Phone Number
        </label>
        <div className="relative">
          <input
            type="tel"
            placeholder="+1 234 567 89 00"
            className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-lg"
          />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
        </div>
      </div>

      {/* Company Name Field */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Company Name
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Online Shopping Business"
            className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 text-lg"
          />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
        </div>
      </div>

      {/* Message Field - FIXED: Single line with proper gradient line */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Message
        </label>
        <div className="relative">
          <textarea
            rows={4}
            placeholder="Leave us a message..."
            className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500  transition-colors duration-300 resize-none text-lg"
          ></textarea>
          <div className="absolute right-0 top-4">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Privacy Policy Checkbox - FIXED: Purple rounded checkbox */}
      <div className="flex items-start space-x-3 pt-4">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            id="privacy-policy"
            className="w-5 h-5 text-purple-600 bg-white border-gray-300 rounded-md focus:ring-purple-100 focus:ring-2 checked:bg-purple-600 checked:border-purple-600"
          />
        </div>
        <label htmlFor="privacy-policy" className="text-sm text-gray-600 cursor-pointer">
          I Agree to the <span className="text-purple-600 hover:text-purple-700 transition-colors duration-200">Privacy Policy</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-8">
        <button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
          <span>Send Message</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

{/* Get Started Section */}
<div className="relative mt-32 mb-32">
  {/* Gradient glow behind the entire section */}
  <div
    className="absolute inset-0 transform"
    style={{
      background: "radial-gradient(ellipse at center, rgba(255,182,193,0.4) 0%, rgba(221,160,221,0.3) 40%, rgba(168,85,247,0.2) 70%, transparent 100%)",
      filter: "blur(40px)",
      zIndex: 1,
    }}
  />

  <div className="relative max-w-4xl mx-auto px-4" style={{ zIndex: 10 }}>
    {/* Icon - positioned to overlap */}
    <div className="flex justify-center relative z-50 mb-16">
      <img
        src="/images/getstartedcontact.png"
        alt="Get Started Icon"
        className="w-24 h-24 object-contain"
      />
    </div>

    {/* Black container section - SOLID BLACK */}
    <div className="relative -mt-28 pt-16 pb-12 px-8 rounded-3xl bg-gray-900" style={{ zIndex: 20 }}>
      {/* Content positioned below the icon */}
      <div className="text-center pt-8">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
          Get Started With Deckoviz
        </h2>

        {/* Description */}
        <div className="text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
          <p>
            If you'd like to share a story or memory about your experience with{' '} <br />
            <span className="text-white font-semibold">Deckoviz</span>, we'd love to feature it on{' '}
            <span className="text-white font-semibold">Our Wall of Love</span>. Just mention it when{' '} <br />
            you send us a message! ✨
          </p>
        </div>

        {/* Share Now Button */}
        <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 hover:bg-gray-50 transform transition-all duration-300 flex items-center justify-center space-x-2 mx-auto">
          <span>Share Now</span>
          <span>→</span>
        </button>
      </div>
    </div>
  </div>
</div>

        
      </div>
    </div>
  )
}