"use client"
import { useState, useEffect } from "react"

export default function TransformWalls() {
  const [currentSet, setCurrentSet] = useState(0)

  // Different sets of artwork arrangements
  const artworkSets = [
    {
      image1: "/placeholder.svg?height=120&width=120", // Top left - small square
      image2: "/placeholder.svg?height=160&width=200", // Top right - large rectangle
      image3: "/placeholder.svg?height=200&width=200", // Center left - large square
      image4: "/placeholder.svg?height=100&width=100", // Center right top - small square
      image5: "/placeholder.svg?height=120&width=120", // Center right bottom - medium square
      image6: "/placeholder.svg?height=100&width=100", // Bottom left - small square
      image7: "/placeholder.svg?height=140&width=140", // Bottom right - medium square
    },
    {
      image1: "/placeholder.svg?height=120&width=120",
      image2: "/placeholder.svg?height=160&width=200",
      image3: "/placeholder.svg?height=200&width=200",
      image4: "/placeholder.svg?height=100&width=100",
      image5: "/placeholder.svg?height=120&width=120",
      image6: "/placeholder.svg?height=100&width=100",
      image7: "/placeholder.svg?height=140&width=140",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % artworkSets.length)
    }, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const currentArtwork = artworkSets[currentSet]

  return (
    <section className="py-20 md:py-24 lg:py-28 overflow-hidden relative bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Background gradient effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute left-1/4 top-1/3 w-[60%] h-[50%] rounded-full bg-gradient-to-br from-purple-200/40 via-blue-200/30 to-indigo-200/40 blur-3xl opacity-60"></div>
        <div className="absolute right-1/4 bottom-1/3 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30 blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Introduction Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 border border-purple-200">
              <span className="text-purple-700 text-sm font-medium">Introduction</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your Walls
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Transform Your World.
              </h3>
            </div>

            {/* Description */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Introducing The World's First AI-Powered Dynamic Art Frame. Deckoviz turns your space into a living
                canvas — a smart art experience that evolves with you. It brings the power of generative AI,
                personalized design, and immersive visuals into your home, workspace, or hospitality space.
              </p>

              <p className="text-purple-600 font-medium">
                Infuse your life with joy, inspiration, calm, and wonder — every single day.
              </p>

              <p>
                From Van Gogh to Ghibli, from personal memories to dreamlike stories, Deckoviz reimagines your walls
                like never before.
              </p>

              <p className="font-semibold text-gray-800">Make your spaces come alive</p>

              <p className="text-purple-600 font-medium">Refreshed. Inspired. Blissed. Tranquil. Content. Excited.</p>
            </div>

            {/* Feature Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <span className="font-semibold">📱 Controlled entirely through a mobile app.</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <span className="font-semibold">📺 Built on top of Android TV, fully smart and versatile.</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-3 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <span className="font-semibold">🤖 Powered by AI, styled by you.</span>
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => (window.location.href = "/place-order")}
                className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-purple-200/50 text-lg"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>

                <span className="relative z-10">🛒 Pre Order Now</span>
              </button>
            </div>
          </div>

          {/* Right Content - Artistic Grid Layout */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Gradient glow behind artwork */}
            <div
              className="absolute inset-0 transform scale-110"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(147,51,234,0.15) 0%, rgba(59,130,246,0.10) 40%, rgba(168,85,247,0.08) 70%, transparent 100%)",
                filter: "blur(50px)",
                zIndex: -1,
              }}
            />

            {/* Custom Grid Layout matching your reference */}
            <div className="relative w-full max-w-md">
              <div className="grid grid-cols-4 grid-rows-4 gap-3 h-[500px]">
                {/* Image 1 - Top left small square */}
                <div className="col-span-1 row-span-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src={currentArtwork.image1 || "/placeholder.svg"}
                    alt="Artwork 1"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image 2 - Top right large rectangle */}
                <div className="col-span-3 row-span-1 bg-gradient-to-br from-amber-200 to-amber-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src={currentArtwork.image2 || "/placeholder.svg"}
                    alt="Artwork 2"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image 3 - Center left large square */}
                <div className="col-span-2 row-span-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src={currentArtwork.image3 || "/placeholder.svg"}
                    alt="Artwork 3"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image 4 - Center right top small square */}
                <div className="col-span-1 row-span-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src={currentArtwork.image4 || "/placeholder.svg"}
                    alt="Artwork 4"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image 5 - Center right bottom medium square */}
                <div className="col-span-1 row-span-1 bg-gradient-to-br from-amber-200 to-amber-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src={currentArtwork.image5 || "/placeholder.svg"}
                    alt="Artwork 5"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image 6 - Bottom left small square */}
                <div className="col-span-1 row-span-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src={currentArtwork.image6 || "/placeholder.svg"}
                    alt="Artwork 6"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image 7 - Bottom right medium square */}
                <div className="col-span-2 row-span-1 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img
                    src={currentArtwork.image7 || "/placeholder.svg"}
                    alt="Artwork 7"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating elements for extra visual interest */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-50 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
