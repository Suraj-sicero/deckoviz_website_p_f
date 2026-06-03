export default function Contact() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Soft blue blobs so frosted glass cards are clearly visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
        <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
        <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
        <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
        <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Shiny Badge */}
        <div className="flex justify-center pt-20 pb-2 mb-6">
          <div className="relative group cursor-default">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-xl blur opacity-50 group-hover:opacity-80 transition duration-500"></div>
            <div className="relative bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-6 py-1.5 rounded-xl text-sm font-semibold tracking-wide shadow-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
              Reach Out To Us
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-serif italic font-bold text-center mb-6 leading-tight bg-gradient-to-br from-gray-900 via-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
          Contact Our Team
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#2563EB]/50"></div>
          <div className="w-2 h-2 rounded-full bg-[#2563EB]/60"></div>
          <div className="w-3 h-3 rounded-full bg-[#182A4A]/80"></div>
          <div className="w-2 h-2 rounded-full bg-[#2563EB]/60"></div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#182A4A]/50"></div>
        </div>

        {/* Description */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-lg text-gray-600 leading-relaxed mb-3">
            We love hearing from you whether it's feedback, ideas, creative sparks, bugs
            you've noticed, feature suggestions, or simply your experience with Deckoviz.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Every message helps us grow, improve, and create more beautiful, meaningful experiences.
          </p>
        </div>

        {/* Contact Options — glassy pills */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          {[
            { label: 'Fill out the form below' },
            { label: 'Connect with us on Instagram' },
            { label: 'Email us directly' },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgba(37,99,235,0.1)] px-5 py-2.5 rounded-full hover:shadow-[0_6px_28px_rgba(37,99,235,0.2)] hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-5 h-5 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
            </div>
          ))}
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Instagram Card — Frosted Glass */}
          <div className="group relative overflow-hidden rounded-3xl h-80 flex flex-col
            bg-white/40 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-500 p-8 cursor-pointer">
            {/* Shiny top edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
            {/* Diagonal glare */}
            <div className="absolute top-0 left-0 w-2/3 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-tl-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Blue glow on hover */}
            <div className="absolute -inset-2 bg-[#2563EB]/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            {/* Icon - positioned left */}
            <div className="flex justify-start mb-6">
              <img
                src="/images/contact1.png"
                alt="Instagram"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Title with Bricolage Grotesque font */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left flex-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.070-4.85.070-3.204 0-3.584-.012-4.849-.070-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-gray-900">instagram.com/deckoviz</span>
            </div>
          </div>

          {/* Call Us Card — Frosted Glass */}
          <div className="group relative overflow-hidden rounded-3xl h-80 flex flex-col
            bg-white/40 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-500 p-8 cursor-pointer">
            {/* Shiny top edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
            {/* Diagonal glare */}
            <div className="absolute top-0 left-0 w-2/3 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-tl-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Blue glow on hover */}
            <div className="absolute -inset-2 bg-[#2563EB]/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            {/* Icon - positioned left */}
            <div className="flex justify-start mb-6">
              <img
                src="/images/contact2.png"
                alt="Phone"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Title with Bricolage Grotesque font */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-left flex-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Call Us
            </h3>

            {/* Description */}
            <p className="text-gray-700 text-left mb-6">
              Ready to chat? Give us a call and let's
              
              discuss how we can help bring your
              vision to life.
            </p>

            {/* Phone Number with icon - positioned at bottom */}
            <div className="flex items-center space-x-2 mt-auto">
              <svg className="w-4 h-4 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-gray-900 font-medium">+44 744 800 6087</span>
            </div>
          </div>

          {/* Email Us Card — Frosted Glass */}
          <div className="group relative overflow-hidden rounded-3xl h-80 flex flex-col
            bg-white/40 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-500 p-8 cursor-pointer">
            {/* Shiny top edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
            {/* Diagonal glare */}
            <div className="absolute top-0 left-0 w-2/3 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-tl-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Blue glow on hover */}
            <div className="absolute -inset-2 bg-[#2563EB]/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            {/* Icon - positioned left */}
            <div className="flex justify-start mb-6">
              <img
                src="/images/contact3.png"
                alt="Email"
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Title with Bricolage Grotesque font */}
            <h3 className="text-2xl font-bold text-gray-900 mb-1 text-left flex-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Email Us
            </h3>

            {/* Description */}
            <p className="text-gray-700 text-left mb-6">
              Email us at the following for any support, feedback, bug reporting, and more.
            </p>

            {/* Email with icon - positioned at bottom */}
            <div className="flex items-center space-x-2 mt-auto">
              <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-900 font-medium">support@deckoviz.com</span>
            </div>
          </div>

          {/* Join Us Card — Frosted Glass */}
          <div className="group relative overflow-hidden rounded-3xl h-80 flex flex-col bg-white/40 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-500 p-8 cursor-pointer">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
            <div className="absolute top-0 left-0 w-2/3 h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-tl-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -inset-2 bg-[#2563EB]/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            
            <div className="flex justify-start mb-6">
              <img src="/images/contact1.png" alt="Join us" className="w-16 h-16 object-contain hue-rotate-180" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1 text-left flex-1" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Join us.
            </h3>

            <p className="text-gray-700 text-left text-sm mb-6 leading-relaxed">
              If you resonate with what we are building and feel you want to be a part of the mission, reach out to us at vizzy@deckoviz.com or team@deckoviz.com.
            </p>

            <div className="flex items-center space-x-2 mt-auto">
              <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-900 font-medium text-sm">team@deckoviz.com</span>
            </div>
          </div>
        </div>



        {/* Contact Form Section */}
        <div className="relative mt-32 mb-32">
          {/* Gradient glow background */}
          <div
            className="absolute inset-0 transform"
            style={{
              background: "radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, rgba(99,102,241,0.08) 40%, rgba(56,189,248,0.05) 70%, transparent 100%)",
              filter: "blur(60px)",
              zIndex: 1,
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563EB] transition-colors duration-300 text-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] transition-all duration-300 group-focus-within:w-full"></div>
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
                      className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2563EB] transition-colors duration-300 text-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] transition-all duration-300 group-focus-within:w-full"></div>
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
                    className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors duration-300 text-lg"
                  />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
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
                    className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors duration-300 text-lg"
                  />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
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
                    className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors duration-300 text-lg"
                  />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
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
                    className="w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-500  transition-colors duration-300 resize-none text-lg"
                  ></textarea>
                  <div className="absolute right-0 top-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Checkbox - FIXED: Violet rounded checkbox */}
              <div className="flex items-start space-x-3 pt-4">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    className="w-5 h-5 text-violet-600 bg-white border-gray-300 rounded-md focus:ring-blue-100 focus:ring-2 checked:bg-[#2563EB] checked:border-[#2563EB]"
                  />
                </div>
                <label htmlFor="privacy-policy" className="text-sm text-gray-600 cursor-pointer">
                  I Agree to the <span className="text-[#2563EB] hover:text-[#182A4A] transition-colors duration-200">Privacy Policy</span>
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
              background: "radial-gradient(ellipse at center, rgba(186,230,253,0.5) 0%, rgba(147,197,253,0.35) 40%, rgba(37,99,235,0.15) 70%, transparent 100%)",
              filter: "blur(40px)",
              zIndex: 1,
            }}
          />

          <div className="relative max-w-4xl mx-auto px-4" style={{ zIndex: 50 }}>
            {/* Icon - positioned to overlap */}
            <div className="flex justify-center relative z-50 mb-16">
              {/* Octagon Shape Container */}
              <div
  className="w-24 h-24 bg-white shadow-lg flex items-center justify-center"
  style={{
    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  }}
>
  {/* Image inside the octagon */}
  <img
    src="images/FinalLogo.png"
    alt="Get Started Icon"
    className="w-80 h-80 object-contain p-1"
  />
</div>
            </div>
          </div>

          {/* Glass container section */}
          <div
            className="relative -mt-28 pt-16 pb-12 px-8 rounded-3xl"
            style={{
              zIndex: 30,
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              borderTop: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            {/* Content positioned below the icon */}
            <div className="text-center pt-8">
              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                Get Started With Deckoviz
              </h2>

              {/* Description */}
              <div className="text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                <p>
                  If you'd like to share a story or memory about your experience with{' '} <br />
                  <span className="text-gray-900 font-semibold">Deckoviz</span>, we'd love to feature it on{' '}
                  <span className="text-gray-900 font-semibold">Our Wall of Love</span>. Just mention it when{' '} <br />
                  you send us a message! ✨
                </p>
              </div>

              {/* Share Now Button */}
              <button className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2 mx-auto">
                <span>Share Now</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}