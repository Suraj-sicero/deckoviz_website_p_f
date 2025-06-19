export default function AboutUs() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Background gradient section */}
      <div className="absolute inset-0 z-0">
        {/* Base white background with subtle pattern */}
        <div className="absolute inset-0 bg-white" />

        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Enhanced gradient with more depth and animation */}
        <div className="absolute left-0 right-0" style={{ top: "310px", height: "420px" }}>
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

      {/* Decorative 3D Elements with hover effects */}
      <div className="absolute top-48 left-60 w-20 h-20 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-2xl">
        <img
          src="/images/text3D.png"
          alt="3D Text"
          className="w-full h-full object-contain drop-shadow-lg pointer-events-auto"
        />
      </div>

      <div className="absolute top-72 right-72 w-20 h-20 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-2xl">
        <img
          src="/images/rocket3D.png"
          alt="3D Rocket"
          className="w-full h-full object-contain drop-shadow-lg pointer-events-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-2 py-8 text-center">
        {/* Top Badge with glow effect */}
        <div className="flex justify-center pt-4 pb-2 mt-24 mb-4">
          <div className="bg-[#7d39ec] text-white px-4 py-1 rounded-lg text-sm font-medium shadow-lg shadow-violet-500/50 hover:shadow-violet-500/80 transition-shadow duration-300">
            About Us
          </div>
        </div>

        {/* Heading with gradient text */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-gray-900 to-violet-500 bg-clip-text text-transparent leading-tight">
          About Us
        </h1>

        {/* Subheading with enhanced styling */}
        <div className="max-w-2xl mx-auto mb-28">
          <p className="text-lg md:text-lg text-gray-700 leading-relaxed font-medium">
            At <span className="text-violet-600 font-semibold">Deckoviz</span>, we are reimagining what it means to
            live, work,
          </p>
          <p className="text-lg md:text-lg text-gray-700 leading-relaxed font-medium">
            and <span className="text-fuchsia-500 font-semibold">feel</span> within a space.
          </p>
        </div>

        {/* Enhanced Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              src: "/images/ce3552c2-18fd-471f-90ef-1edb442673ab.png",
              alt: "Modern living room with mountain landscape display",
              accent: "violet",
            },
            {
              src: "/images/Gemini_Generated_Image_rgywbsrgywbsrgyw.jpeg",
              alt: "Contemporary space with cosmic night sky display",
              accent: "fuchsia",
            },
            {
              src: "/images/Gemini_Generated_Image_rgywbrrgywbrrgyw.jpeg",
              alt: "Modern interior with ocean sunset display",
              accent: "orange",
            },
          ].map((img, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500"
            >
              {/* Colored accent border on hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  img.accent === "violet"
                    ? "from-violet-400 to-purple-500"
                    : img.accent === "fuchsia"
                      ? "from-fuchsia-400 to-pink-500"
                      : "from-orange-400 to-red-400"
                }`}
              />

              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <img
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`w-3 h-3 rounded-full ${
                    img.accent === "violet"
                      ? "bg-violet-400"
                      : img.accent === "fuchsia"
                        ? "bg-fuchsia-400"
                        : "bg-orange-400"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Content Section */}
        <div className="mt-20 max-w-6xl mx-auto px-4">
          {/* Company Description Section - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div className="text-left space-y-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight pt-5">
                We are a next-generation
                <br />
                company innovating at
                <br />
                the frontier.
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 pt-9">Our flagship product —</h3>
            </div>
            <div className="text-left space-y-6">
              <p className="text-gray-500 leading-relaxed text-lg pb-6">
                where AI personalization, art, home and office décor, and smart technology converge. Our mission is
                simple yet profound: to infuse everyday environments with more beauty, meaning, emotion, vitality, and
                wonder — powered by the most human-centric technologies ever created.
              </p>
              <p className="text-gray-500 leading-relaxed text-lg pt-6">
                Deckoviz creates deeply personalized, multisensory visual experiences — designed to inspire, soothe,
                energize, or uplift, depending on your intentions and needs. Every piece of art it displays, every
                visual it curates, is attuned to your unique life, spirit, and essence
              </p>
            </div>
          </div>

          {/* Flagship Products Container with Border and Separator */}
          <div className="mb-20">
            <div className="border border-gray-200 rounded-3xl p-12 relative">
              {/* Vertical separator line */}
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gray-200 transform -translate-x-1/2"></div>

              {/* Two Product Cards Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-left pr-6">
                  <div className="text-xs font-semibold text-gray-800 tracking-wider uppercase mb-3 ml-32 bg-gray-100 inline-block px-3 py-1 rounded-lg">
                    FLAGSHIP PRODUCT
                  </div>
                  <h4 className="text-3xl md:text-3xl font-bold text-gray-900 ml-14">Deckoviz AI Smart Art</h4>
                </div>
                <div className="text-left pl-6">
                  <div className="text-xs font-semibold text-gray-800 tracking-wider uppercase mb-3 ml-32 bg-gray-100 inline-block px-3 py-1 rounded-lg">
                    FLAGSHIP PRODUCT
                  </div>
                  <h4 className="text-3xl md:text-3xl font-bold text-gray-900 ml-8">Space Enhancement Frame</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Final Description */}
          <div className="text-left mb-20">
            <p className="text-xl text-gray-900 leading-relaxed font-medium max-w-5xl">
              Through the power of proprietary AI personalization engines, generative creativity, and intelligent
              curation, Deckoviz creates deeply personalized, multisensory visual experiences — designed to inspire,
              soothe, energize, or uplift, depending on your intentions and needs. Every piece of art it displays, every
              visual it curates, is attuned to your unique life, spirit, and essence.
            </p>
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Top Badge - centered like Vision section */}
            <div className="flex justify-start mb-8">
              <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                Our Philosophy
              </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Because we believe technology should not just be functional —
                </h2>
              </div>
              <div className="text-left flex items-center">
                <p className="text-lg text-gray-500 leading-relaxed">
                  At Deckoviz, we are pioneering a new category —<br />
                  AI-powered spatial enhancement — bringing
                  <br />
                  future-ready beauty, personalization, and emotion
                  <br />
                  into homes, offices, cafés, hotels, wellness spaces, and
                  <br />
                  beyond.
                </p>
              </div>
            </div>

            {/* Spiral gradient positioned right below the text and above the 4 boxes */}
            <div className="relative">
              <div
                className="absolute -left-1 transform -translate-x-1/2 w-[150vw] max-w-[120rem] h-[34rem] -top-32"
                style={{
                  background:
                    "conic-gradient(from 0deg at center, rgba(236,72,153,0.32) 0%, rgba(147,51,234,0.22) 90deg, rgba(255,165,0,0.03) 180deg, rgba(236,72,153,0.04) 270deg, rgba(147,51,234,0.06) 360deg)",
                  borderRadius: "60%",
                  filter: "blur(90px)",
                  boxShadow: "0 0 0 120px rgba(236,72,153,0.03), 0 0 0 240px rgba(147,51,234,0.02)",
                }}
              />

              {/* Four Philosophy Cards */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      {/* Icon will be added from public images folder */}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    It should be
                    <br />
                    beautiful.
                  </h3>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      {/* Icon will be added from public images folder */}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    It should be
                    <br />
                    magical.
                  </h3>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      {/* Icon will be added from public images folder */}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    It should be
                    <br />
                    emotionally
                    <br />
                    enriching.
                  </h3>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      {/* Icon will be added from public images folder */}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    It should help us live
                    <br />
                    more intentionally,
                    <br />
                    more expressively,
                    <br />
                    more joyfully
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content Placeholder */}
        <div className="mt-32 mb-32">{/* Future content will go here */}</div>

        {/* Our Vision Section */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Top Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                Our Vision
              </div>
            </div>

             {/* Main Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Our mission is to develop an ecosystem of cutting-edge, artistically rich,
                <br />
                technologically beautiful products that continue to blur the lines between
                <br />
                technology, art, and life — breathing curiosity, wonder, joy, and inspiration into
                <br />
                every corner of your world.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text Content with exact line breaks */}
              <div className="text-left space-y-12">
                <div>
                  <h3 className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight mb-4" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
                    We envision a world where your spaces
                    <br />
                    are not static, but alive with your story.
                    <br />
                    Where art evolves with you.
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Where your home and work environments are
                    <br />
                    extensions of your innermost self — vibrant,
                    <br />
                    dynamic, deeply personal.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight mb-4" style={{fontFamily: 'Bricolage Grotesque, sans-serif'}}>
                    We are building the next generation of
                    <br />
                    products at the crossroads of art, AI,
                    <br />
                    smart technology, and design
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    creating living environments that resonate
                    <br />
                    emotionally, artistically, and intelligently with
                    <br />
                    the people who inhabit them
                  </p>
                </div>
              </div>

              {/* Right Column - Image with Pink Spiral Gradient Background */}
              <div className="relative">
                {/* Pink spiral gradient glow that extends beyond the image */}
                <div
                  className="absolute -inset-16 transform"
                  style={{
                    background:
                      "conic-gradient(from 0deg at center, rgba(236,72,153,0.25) 0%, rgba(147,51,234,0.18) 90deg, rgba(255,165,0,0.08) 180deg, rgba(236,72,153,0.12) 270deg, rgba(147,51,234,0.15) 360deg)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    zIndex: 1,
                  }}
                />

                {/* Image container - with custom padding: equal on top/left/right, more at bottom */}
                <div
                  className="relative bg-white rounded-2xl shadow-lg max-w-sm mx-auto  ml-8 p-4 pb-2 h-[480px]"
                  style={{
                    zIndex: 2,
                    padding: "16px 16px 35px 16px", // 1cm top/left/right, reduced bottom
                    marginLeft: "2rem", // Move image more to the right
                  }}
                >
                  <img
                    src="/images/Gemini_Generated_Image_qcetl0qcetl0qcet.jpeg"
                    alt="AI-Powered Vision That Inspires You"
                    className="w-full h-auto object-cover rounded-xl"
                  />

                  {/* AI Badge - positioned at bottom right, 2cm above, half outside */}
                  <div
                    className="absolute bg-white text-gray-900 px-4 py-3 rounded-lg shadow-lg"
                    style={{
                      zIndex: 50,
                      bottom: "20px", // 2cm above bottom
                      left: "-50%", // Half outside to the left
                      transform: "translateX(50%)",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">AI-Powered</div>
                        <div className="text-xs opacity-70">Vision That Inspires You.</div>
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
  )
}
