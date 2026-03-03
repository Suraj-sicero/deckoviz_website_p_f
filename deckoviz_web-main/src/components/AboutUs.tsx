import InteractiveParticleGraphic from "./other/InteractiveParticleGraphic";

export default function AboutUs() {
  return (
    <div id="about" className="relative min-h-screen bg-white">
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
        <div className="absolute left-0 right-0" style={{ top: "260px", height: "480px" }}>
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
      <div className="absolute top-48 left-4 sm:left-12 md:left-60 w-16 h-16 sm:w-20 sm:h-20 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-2xl">
        <img
          src="/images/text3D.png"
          alt="3D Text"
          className="w-full h-full object-contain drop-shadow-lg pointer-events-auto"
        />
      </div>

      <div className="absolute top-72 right-4 sm:right-12 md:right-72 w-16 h-16 sm:w-20 sm:h-20 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-2xl">
        <img
          src="/images/rocket3D.png"
          alt="3D Rocket"
          className="w-full h-full object-contain drop-shadow-lg pointer-events-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        {/* Top Badge with glow effect */}
        <div className="flex justify-center pt-4 pb-2 mt-24 mb-4">
          <div className="bg-[#7d39ec] text-white px-4 py-1 rounded-lg text-sm font-medium shadow-lg shadow-violet-500/50 hover:shadow-violet-500/80 transition-shadow duration-300">
            About Us
          </div>
        </div>

        {/* Heading with gradient text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-violet-900 to-violet-500 bg-clip-text text-transparent leading-tight">
          About Us
        </h1>

        {/* Subheading with enhanced styling */}
        <div className="max-w-2xl mx-auto mb-20 sm:mb-28 px-4">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            At <span className="text-violet-600 font-semibold">Deckoviz</span>, we are reimagining what it means to
            live, work,
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            and <span className="text-fuchsia-500 font-semibold">feel</span> within a space.
          </p>
        </div>

        {/* Enhanced Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-20">
          {[
            {
              src: "/images/about1.png",
              alt: "Modern living room with mountain landscape display",
              accent: "violet",
            },
            {
              src: "/images/about2.png",
              alt: "Contemporary space with cosmic night sky display",
              accent: "fuchsia",
            },
            {
              src: "/images/about3.png",
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            <div className="text-left space-y-12 lg:space-y-20">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                We are a next-generation
                <br />
                company innovating at
                <br />
                the frontier.
              </h2>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl  font-bold text-gray-900">Our flagship product  </h3>
            </div>
            <div className="text-left space-y-6">
              <p className="text-gray-500 leading-relaxed text-base sm:text-lg">
                where AI personalization, art, home and office décor, and smart technology converge. Our mission is
                simple yet profound: to infuse everyday environments with more beauty, meaning, emotion, vitality, and
                wonder   powered by the most human-centric technologies ever created.
              </p>
              <p className="text-gray-500 leading-relaxed text-base sm:text-lg">
                Deckoviz creates deeply personalized, multisensory visual experiences   designed to inspire, soothe,
                energize, or uplift, depending on your intentions and needs. Every piece of art it displays, every
                visual it curates, is attuned to your unique life, spirit, and essence
              </p>
            </div>
          </div>


{/* Interactive Particle Graphic */}
<InteractiveParticleGraphic />


          {/* Flagship Products Container with Border and Separator */}
          <div className="mb-20">
            <div className="border border-gray-200 rounded-3xl p-6 mt-8 sm:p-8 lg:p-12 relative">
              {/* Vertical separator line - hidden on mobile */}
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gray-200 transform -translate-x-1/2 hidden lg:block"></div>

              {/* Two Product Cards Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="text-center lg:text-left lg:pr-6">
                  <div className="text-xs font-semibold text-gray-800 tracking-wider uppercase mb-3 bg-gray-100 inline-block px-3 py-1 rounded-lg">
                    FLAGSHIP PRODUCT
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Deckoviz AI Smart Art</h4>
                </div>
                <div className="text-center lg:text-left lg:pl-6">
                  <div className="text-xs font-semibold text-gray-800 tracking-wider uppercase mb-3 bg-gray-100 inline-block px-3 py-1 rounded-lg">
                    FLAGSHIP PRODUCT
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Space Enhancement Frame</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Final Description */}
          <div className="text-left mb-20">
            <p className="text-lg sm:text-xl text-gray-900 leading-relaxed font-medium max-w-5xl mx-auto">
              Through the power of proprietary AI personalization engines, generative creativity, and intelligent
              curation, Deckoviz creates deeply personalized, multisensory visual experiences   designed to inspire,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Because we believe technology should not just be functional  
                </h2>
              </div>
              <div className="text-left flex items-center">
                <p className="text-lg text-gray-500 leading-relaxed">
                  At Deckoviz, we are pioneering a new category  <br />
                  AI-powered spatial enhancement   bringing
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
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="">
                      <img
                        src="/images/3dicons-notify-heart-dynamic-color.png"
                        alt="Beautiful Icon"
                        className="w-15 h-15"
                      />
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
                    <div className="">
                      <img
                        src="/images/3dicons-magic-trick-dynamic-color.png"
                        alt="Intelligent Icon"
                        className="w-15 h-14"
                      />
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
                    <div className="">
                      <img
                        src="/images/3dicons-thumb-up-dynamic-color.png"
                        alt="Beautiful Icon"
                        className="w-15 h-15"
                      />
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
                    <div className="">
                      <img src="/images/3dicons-heart-dynamic-color.png" alt="Beautiful Icon" className="w-15 h-15" />
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Our mission is to develop an ecosystem of cutting-edge, artistically rich,
                <br />
                technologically beautiful products that continue to blur the lines between
                <br />
                technology, art, and life   breathing curiosity, wonder, joy, and inspiration into
                <br />
                every corner of your world.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column - Text Content with exact line breaks */}
              <div className="text-left space-y-12">
                <div>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-4"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
                    We envision a world where your spaces
                    <br />
                    are not static, but alive with your story.
                    <br />
                    Where art evolves with you.
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Where your home and work environments are
                    <br />
                    extensions of your innermost self   vibrant,
                    <br />
                    dynamic, deeply personal.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-4"
                    style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                  >
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
                  className="relative bg-gradient-to-b from-orange-300 via-[#ff5bb8] to-[#dbbbff] rounded-2xl shadow-lg max-w-sm mx-auto  ml-8 p-4 pb-2 h-[480px]"
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
                    className="absolute bg-white text-gray-900 px-2 py-5 rounded-xl shadow-lg"
                    style={{
                      zIndex: 50,
                      bottom: "20px", // 2cm above bottom
                      left: "-50%", // Half outside to the left
                      transform: "translateX(50%)",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-9 h-9 bg-[#6670d8] rounded-full flex items-center justify-center ">
                        <span className="text-white text- font-light">AI</span>
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

        {/* Product Section 1 - Our Product Deckoviz */}
        <div className="relative mt-32 mb-32">
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
                    Our Product :
                    <br />
                    <span className="text-[#6670d8]">Deckoviz</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    Deckoviz is a personalized AI art frame that curates,
                    <br />
                    creates, and displays a continually evolving collection of
                    <br />
                    artworks, paintings, photography, and visuals   all tailored
                    <br />
                    precisely to your tastes, moods, goals, intentions, and inner
                    <br />
                    world.
                  </p>

                  <button onClick={() => (window.location.href = "/transform-walls")} className="bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 mb-8">
                    Find Out More
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">It evolves hourly, daily, or at any pace you choose.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">
                        It curates art that feels like it was made
                        <br />
                        for you   because, in a sense, it was.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image with Browser Frame */}
              <div className="relative">
                {/* Pink/Purple gradient background like in your image */}
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

        {/* Product Section 2 - Think of Deckoviz */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Top Badge - White bg with gray border */}
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Think of Deckoviz as a
                    <br />
                    new kind of art:
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    With stunning frame options, customizable collections,
                    <br />
                    evolving AI art styles, and endless possibilities for
                    <br />
                    expression, Deckoviz ensures that your space never feels
                    <br />
                    stale   only ever more you.
                  </p>

                  <button className="bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
                    Find Out More
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">Not static, but alive.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">Not generic, but deeply personal.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-[#6670d8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">
                        Not merely decorative, but emotionally
                        <br />
                        intelligent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Technology Section */}
        <div className="relative mt-32 mb-32">
          {/* Radial gradient background - moved down and slightly darker */}
          <div
            className="absolute inset-0 transform translate-y-16"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,182,193,0.5) 0%, rgba(221,160,221,0.35) 25%, rgba(230,230,250,0.25) 50%, rgba(240,248,255,0.15) 75%, transparent 100%)",
              filter: "blur(40px)",
              zIndex: 1,
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Top Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                Our Technology
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Our Technology
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                At the heart of Deckoviz lies our proprietary AI personalization architecture,
                <br />
                built from the ground up to understand you intimately
              </p>
            </div>

            {/* Three Technology Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Card 1 - Taste & Preference */}
              <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Image container with exact gradient background */}
                <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-2xl p-4 mb-6 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/doodle1.png"
                    alt="AI character representing taste and preferences"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Single tag aligned left */}
                <div className="mb-4 flex justify-start">
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                    Taste & Preference
                  </span>
                </div>

                {/* Title with exact line breaks - left aligned with Bricolage Grotesque font */}
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight text-left"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Your tastes, your preferences,
                  <br />
                  your emotional states.
                </h3>

                {/* Learn More Button with exact styling */}
                <button className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-300 shadow-sm">
                  Learn More
                </button>
              </div>

              {/* Card 2 - Dream & Moods */}
              <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Image container with purple gradient */}
                <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-2xl p-4 mb-6 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/doodle2.png"
                    alt="AI character representing dreams and moods"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Two tags aligned left */}
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">Dream</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">Moods</span>
                </div>

                {/* Title with exact line breaks - left aligned with Bricolage Grotesque font */}
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight text-left"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Your intentions, your
                  <br />
                  dreams, your moods.
                </h3>

                {/* Learn More Button */}
                <button className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-300 shadow-sm">
                  Learn More
                </button>
              </div>

              {/* Card 3 - Beauty, Growth, Connection */}
              <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Image container with pink gradient */}
                <div className="bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl p-4 mb-6 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/doodle3.png"
                    alt="AI character representing beauty, growth and connection"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Three tags aligned left */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">Beauty</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">Growth</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                    Connection
                  </span>
                </div>

                {/* Title with exact line breaks - left aligned with Bricolage Grotesque font */}
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight text-left"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Your desire for beauty, growth,
                  <br />
                  expression, and connection.
                </h3>

                {/* Learn More Button */}
                <button className="w-full bg-white border border-gray-300 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-300 shadow-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Learning Section */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            {/* Cloud Image */}
            <div className="flex justify-center mb-8">
              <img src="/images/cloud.png" alt="AI Cloud" className="w-16 h-16 object-contain" />
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Our AI doesn't just recommend. It
              <br />
              learns. It grows.
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-700 leading-relaxed mb-16 max-w-3xl mx-auto">
              It evolves with you   helping you craft a living environment that
              <br />
              feels more alive, more inspiring, more aligned with your true self.
            </p>

            {/* Systems Description with Bricolage Grotesque font */}
            <h3
              className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-16"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              We leverage multi-layered AI systems to:
            </h3>

            {/* Four AI Capabilities with enhanced design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {/* Capability 1 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-purple-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Understand and model
                      <br />
                      your emotional
                      <br />
                      landscape.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Capability 2 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8-2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Curate dynamically
                      <br />
                      evolving, personalized
                      <br />
                      multisensory art
                      <br />
                      experiences.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Capability 3 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-pink-200/30 to-red-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, rgba(239, 68, 68, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-pink-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Generate original
                      <br />
                      visuals tuned to your
                      <br />
                      unique aesthetic
                      <br />
                      fingerprint.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Capability 4 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 60%, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Keep your spaces
                      <br />
                      vibrant, fresh, and
                      <br />
                      deeply reflective of
                      <br />
                      your journey.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Future Section */}
        <div className="relative mt-32 mb-32">
          {/* Radial gradient background glowing from center */}
          <div
            className="absolute inset-0 transform"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,182,193,0.4) 0%, rgba(221,160,221,0.3) 30%, rgba(230,230,250,0.2) 60%, transparent 100%)",
              filter: "blur(50px)",
              zIndex: 1,
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            {/* Top Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                Our Future
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Our Future
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-800 leading-relaxed mb-4 max-w-2xl mx-auto">
              Deckoviz is just the beginning.
            </p>

            {/* Description */}
            <div className="text-gray-800 leading-relaxed mb-16 max-w-3xl mx-auto">
              <p className="mb-2">
                We are committed to creating a future where personalization, beauty, technology, and
                <br />
                human emotion are not separate realms   but one seamless experience.
                <br />
                We are building an ecosystem of products that reimagine:
              </p>
            </div>

            {/* Three Future Cards */}
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Card 1 - Home Spaces */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img src="/images/ourfuture1.png" alt="Home Spaces Icon" className="w-12 h-12 object-contain" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Home Spaces
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      As dynamic expressions of identity and
                      <br />
                      mood.
                    </p>
                    <button onClick={() => (window.location.href = "/features")}
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2 - Offices */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img src="/images/ourfuture2.png" alt="Offices Icon" className="w-12 h-12 object-contain" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Offices
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      As environments that foster creativity,
                      <br />
                      alignment, and vitality.
                    </p>
                    <button onClick={() => (window.location.href = "/deckoviz-for-offices")}
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3 - Restaurants, hotels, and public spaces */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img src="/images/ourfuture3.png" alt="Public Spaces Icon" className="w-12 h-12 object-contain" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Restaurants, hotels, and
                      <br />
                      public spaces
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">As immersive emotional experiences.</p>
                    <button onClick={() => (window.location.href = "/deckoviz-for-restaurants")}
                      className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Our Community Section */}
        <div className="relative mt-32 mb-32">
          {/* Main content container - made wider */}
          <div className="relative max-w-6xl mx-auto px-4">
            {/* Large Mail Icon - positioned to overlap */}
            <div className="flex justify-center relative z-50 mb-16">
              <img src="/images/mailnoti.png" alt="Mail Notification" className="w-32 h-32 object-contain" />
            </div>

            {/* Purple background section with dotted texture - wider and more faint */}
            <div
              className="relative -mt-32 pt-20 pb-16 px-12 rounded-3xl"
              style={{
                background: "#faf9ff",
                backgroundImage: "radial-gradient(circle, rgba(147,51,234,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* Content positioned below the icon */}
              <div className="text-center pt-12">
                {/* Welcome Text */}
                <div className="mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed">Welcome to a more beautiful future.</p>
                  <p className="text-lg text-[#6670d8] font-semibold">Welcome to Deckoviz.</p>
                </div>

                {/* Main Heading */}
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Join our community
                </h2>

                {/* Description */}
                <div className="text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto space-y-4">
                  <p>
                    If you believe that the spaces where we live and work should inspire us  
                    <br />
                    If you dream of living in environments that feel, grow, respond, and reflect
                    <br />
                    who you are  
                  </p>
                  <p>
                    If you believe that beauty, art, and technology can and should work together
                    <br />
                    to make life more vivid, joyful, and meaningful  
                  </p>
                </div>

                {/* Enhanced Email Signup Form */}
                <div className="max-w-sm sm:max-w-md mx-auto">
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                    {/* Form container */}
                    <div className="relative bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        {/* Email input */}
                        <div className="flex-1 relative">
                          <input
                            type="email"
                            placeholder="Email address..."
                            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          />
                          {/* Subtle icon */}
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Submit button */}
                        <button className="bg-gradient-to-r from-[#6670d8] to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center space-x-2">
                          <span>Submit</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>No spam</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Privacy protected</span>
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
