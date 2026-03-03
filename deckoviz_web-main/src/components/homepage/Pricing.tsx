"use client"

import { useState, ReactNode } from "react"
import { Check, Sparkles, Gift, Star, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Tv } from "lucide-react"

// Custom Button component
interface ButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost"
  onClick?: () => void
  [key: string]: any
}

const Button = ({ children, className = "", variant = "default", onClick, ...props }: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-3"
  const variantClasses = {
    default: "bg-gray-900 hover:bg-gray-800 text-white focus:ring-gray-500",
    outline: "border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-900 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
  }
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

// Custom Card components
interface CardProps {
  children: ReactNode
  className?: string
  [key: string]: any
}

const Card = ({ children, className = "", ...props }: CardProps) => (
  <div className={`rounded-2xl border bg-white shadow-lg ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }: CardProps) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }: CardProps) => (
  <h3 className={`text-2xl font-bold ${className}`} {...props}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = "", ...props }: CardProps) => (
  <p className={`text-gray-600 ${className}`} {...props}>
    {children}
  </p>
)

const CardContent = ({ children, className = "", ...props }: CardProps) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className = "", ...props }: CardProps) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

// Custom Badge component
const Badge = ({ children, className = "", ...props }: CardProps) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`} {...props}>
    {children}
  </span>
)

interface PricingPlan {
  name: string
  price: number
  originalPrice?: number
  gbpPrice?: number
  description: string
  features: string[]
  isPopular?: boolean
  buttonText: string
  image?: string  
}

const pricingTiers: PricingPlan[] = [
  {
    name: "Starter",
    price: 499,
    originalPrice: 649,
    gbpPrice: 399,
    image: "/images/45-inch-dasp.png",
    description: "Your gateway to a smarter, more beautiful world.",
    features: [
      "43-inch HD Smart Display",
      "Basic AI features for smart curation",
      "Advanced AI learning and personalization",
      "Unlimited and expanding art library",
      "Wi-Fi connectivity",
      "6 months of Advanced Subscription included",
      "Perfect for your first immersive art experience",
      "Ideal for bedrooms, cozy living rooms, and home offices",
    ],
    buttonText: "Buy Now",
  },
  {
    name: "Premium",
    price: 749,
    originalPrice: 899,
    gbpPrice: 599,
        image: "/images/55-inch-dasp.png",
    description: "Our most loved choice for art, personalization, and storytelling.",
    features: [
      "55-inch Full HD Smart Display",
      "Advanced AI features with dynamic learning",
      "Expanded storage and customization features",
      "Unlimited and expanding art library",
      "Wi-Fi + Bluetooth connectivity",
      "Motion and light sensors",
      "Get 3 frame options, including 1 fully customized frame",
      "12 months of Advanced Subscription or 6 months of Elite Subscription included",
      "Ideal for living rooms, creative spaces, offices, cafes, and more",
    ],
    isPopular: true,
    buttonText: "Buy Now",
  },
  {
    name: "Professional",
    price: 999,
    originalPrice: 1199,
    gbpPrice: 699,
        image: "/images/55-inch-dasp.png",
    description: "The ultimate Deckoviz experience   breathtaking, personal, extraordinary.",
    features: [
      "55-inch 4K UHD Premium Display",
      "Superior visual quality with advanced color calibration",
      "Premium finish options and custom frame designs",
      "Advanced AI learning, recommendations, curation, and personalization",
      "Priority access to new releases and special collections",
      "Unlimited and expanding art library",
      "Much greater storage for your creations, memories, and curated collections",
      "Wi-Fi + Bluetooth + motion and light sensors",
      "Get 6 frame options, including 1 fully customized frame",
      "24 months of Advanced or 12 months of Elite Subscription included",
      "Marketplace discounts for art, collections, and commissions",
      "Branded content options for businesses and spaces",
    ],
    buttonText: "Buy Now",
  },
  {
    name: "Enterprise",
    price: 0,
        image: "/images/45-inch-dasp.png",
    description: "Custom solutions crafted for businesses, galleries, and larger spaces.",
    features: [
      "Multiple frame network management",
      "Branded content creation and display",
      "API integration capabilities",
      "Dedicated account manager",
      "Custom sizing options",
      "Bulk order discounts",
      "Smart art and ambience solutions tailored for your brand and space",
      "Priority technical support and training",
      "Custom integration and deployment services",
      "Advanced analytics and reporting dashboard",
    ],
    buttonText: "Bulk Order",
  },
]

// New data for the second row of pricing tiers
const largeFormatTiers: PricingPlan[] = [
  {
    name: "Grand",
    price: 1249,
    originalPrice: 1499,
    gbpPrice: 999,
        image: "/images/75-inch-dasp.png",
    description: "A stunning, oversized centrepiece for immersive living spaces.",
    features: [
      "75-inch 4K UHD Premium Display",
      "Exceptional scale and detail for maximum impact",
      "Advanced AI learning, recommendations, and deep personalization",
      "Premium finish options and custom frame designs",
      "Unlimited and expanding art & storytelling library",
      "Priority access to new art drops and exclusive collections",
      "Wi-Fi + Bluetooth + optional Ethernet for ultra-stable connectivity",
      "Enhanced ambient halo lighting system",
      "Gesture and voice control compatibility",
      "12 months of Elite Subscription included",
    ],
    buttonText: "Buy Now",
  },
  {
    name: "Masterpiece",
    price: 1599,
    originalPrice: 1899,
    gbpPrice: 1299,
        image: "/images/85-inch-dasp.png",
    description: "For those who want art to truly dominate their space   bold, beautiful, and unforgettable.",
    features: [
      "85-inch 4K UHD Premium Display",
      "Immense wall presence with gallery-grade visuals",
      "Ultra-accurate colour calibration for lifelike artwork",
      "AI-powered dynamic curation & mood-based transformation",
      "Premium finish options and bespoke frame craftsmanship",
      "Unlimited, expanding art & memory experiences",
      "Multi-sensory pairing with music and ambient effects",
      "Priority access to unreleased collections and features",
      "Wi-Fi + Bluetooth + Ethernet connectivity",
      "Enhanced pro-grade ambient lighting",
      "Dedicated art concierge service",
    ],
    buttonText: "Buy Now",
  },
  {
    name: "Monument",
    price: 1999,
    originalPrice: 2349,
    gbpPrice: 1649,
        image: "/images/95-inch-dasp.png",
    description: "The ultimate Deckoviz   a full-wall digital canvas that redefines how spaces feel, live, and breathe.",
    features: [
      "95-inch 4K UHD Premium Display",
      "Largest and most immersive Deckoviz available",
      "Edge-to-edge ultra-HD performance with cinematic clarity",
      "AI-curated multi-panel storytelling and ambient modes",
      "Premium, hand-crafted frame options and finishes",
      "Unlimited, evolving art & storytelling library",
      "Enterprise-grade performance for high-traffic spaces",
      "Custom content scheduling for business or residential use",
      "Wi-Fi + Bluetooth + Ethernet connectivity",
      "Advanced lighting choreography with colour and motion sync",
      "Priority access to elite art commissions & custom AI features",
      "Bespoke content creation services available",
    ],
    buttonText: "Buy Now",
  },
]

export default function Pricing() {
  const [selectedTier, setSelectedTier] = useState<PricingPlan | null>(null)
  const [showModal, setShowModal] = useState(false)
 const navigate = useNavigate()

  const handleBuyNow = (tier?: PricingPlan): void => {
    if (tier?.name === "Enterprise") {
      window.location.href = "/bulk-orders"
    } else {
      window.location.href = "/place-order"
    }
    console.log("Buy Now clicked")
  }

  const openModal = (tier: PricingPlan) => {
    setSelectedTier(tier)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedTier(null)
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
        rel="stylesheet"
      />
      <section id="pricing" className="py-12 sm:py-16 lg:py-16 bg-white relative overflow-hidden">
        {/* Background Elements */}

        {/* 📺 Floating TV Bubble Button */}
<button
  onClick={() => navigate("/tv")}
  className="
    hidden lg:flex
    absolute left-6 top-[4%] -translate-y-1/2
    z-10
    max-w-[510px]
    px-10 py-1
    rounded-[999px]
    text-left
  bg-gradient-to-br from-[#b7f3f0] via-[#6fd6d4] to-[#1fa9b1]
    shadow-[0_16px_40px_rgba(31,169,177,0.35)]
    hover:shadow-[0_24px_60px_rgba(31,169,177,0.55)]
    transition-all duration-500
    animate-[float_6s_ease-in-out_infinite]
  "
>
  <div className="flex flex-col gap-0.5">
    <span className="text-xs uppercase tracking-widest text-amber-700">
      TV Guide
    </span>

    <span className="text-sm font-medium text-amber-900 leading-snug flex items-center gap-2">
      <Tv className="w-4 h-4" />
      Looking to buy a TV?
    </span>

    <span className="text-xs text-amber-800 opacity-80">
      Here’s why Deckoviz DASP might be the smartest screen you’ll ever bring home.
    </span>
  </div>
</button>
{/* 📘 Floating DASP Guide Button (RIGHT) */}
<button
  onClick={() => navigate("/dasp-guide")}
  className="
    hidden lg:flex
    absolute right-6 top-[4%] -translate-y-1/2
    z-10
    max-w-[520px]
    px-10 py-1
    rounded-[999px]
    text-left
    bg-gradient-to-br from-violet-300 via-fuchsia-400 to-pink-400
    shadow-[0_16px_40px_rgba(168,85,247,0.35)]
    hover:shadow-[0_24px_60px_rgba(168,85,247,0.55)]
    transition-all duration-500
    animate-[float_6s_ease-in-out_infinite]
  "
>
  <div className="flex flex-col gap-0.5">
    

    <span className="text-sm font-medium text-purple-950 leading-snug flex items-center gap-2">
      <Sparkles className="w-4 h-4" />
      Our Founding Thesis
    </span>

    <span className="text-xs text-purple-900 opacity-80">
      Everything you need to know before choosing your perfect smart art frame.
    </span>
  </div>
</button>

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white" />

          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Gradient decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-200/25 via-fuchsia-200/15 to-orange-200/25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-200/20 via-fuchsia-200/25 to-pink-200/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-100/25 via-fuchsia-100/15 to-orange-100/25 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-32 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full opacity-20 blur-2xl"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-12 mb-4 sm:mb-6 relative">
              Simple <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Pricing</span>
            </h2>

            {/* Special Offer Banner */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-fuchsia-500 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gradient-to-r from-orange-400 via-fuchsia-500 to-orange-400 text-white px-7 py-2.5 rounded-lg leading-none flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  <span className="text-sm sm:text-base font-semibold">
                    Special $50 discount for our first 5000 customers - grab it while you can!
                  </span>
                  <Zap className="w-5 h-5 ml-2" />
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed px-4">
              Choose the perfect Deckoviz frame to match your space, your dreams, and your lifestyle.
              <span className="font-semibold text-violet-600"> Enjoy early bird discounts of 20% off</span> while
              discounts still apply!
            </p>
          </div>

          {/* Pricing Cards - Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 sm:mb-12">
            {pricingTiers.map((tier, index) => (
              <Card
  className={`group relative transition-all duration-500 hover:-translate-y-2 flex flex-col backdrop-blur-sm border-2 ${
    tier.isPopular
      ? "border-violet-300 shadow-2xl bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 shadow-violet-200/50"
      : "border-gray-200 hover:shadow-2xl bg-white/80 hover:bg-gradient-to-br hover:from-white hover:via-fuchsia-50 hover:to-orange-50 hover:border-fuchsia-200"
  }`}
>
  {/* ✅ IMAGE */}
  <div className="relative overflow-hidden rounded-t-2xl">
    <img
      src={tier.image}
      alt={tier.name}
      className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
  </div>

  {/* Popular badge */}
  {tier.isPopular && (
    <div className="absolute top-4 left-4 z-20">
      <Badge className="bg-violet-600 text-white px-3 py-1 text-xs font-bold shadow-lg">
        <Star size={12} className="mr-1" />
        Most Popular
      </Badge>
    </div>
  )}
  <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-violet-600 transition-colors duration-300">
                    {tier.name}
                  </CardTitle>

                  <div className="mb-4">
                    {tier.price === 0 ? (
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        Custom
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {/* Original crossed out price */}
                        <div className="flex items-baseline justify-center">
                          <span className="text-xl sm:text-2xl font-bold text-gray-400 relative">
                            ${tier.originalPrice}
                            <div className="absolute inset-0 bg-red-500 h-0.5 top-1/2 transform -translate-y-1/2 rotate-12"></div>
                          </span>
                        </div>

                        {/* Current price with pounds */}
                        <div className="flex items-baseline justify-center flex-wrap">
                          <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">${tier.price}</span>
                          <span className="text-2xl sm:text-3xl font-semibold text-gray-700 ml-2">
                            (£{tier.gbpPrice})
                          </span>
                          <span className="text-gray-500 ml-2 text-base sm:text-lg">/frame</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-3 sm:space-y-4">
                    {tier.features.slice(0, 5).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center mr-3 mt-0.5">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {tier.features.length > 5 && (
                    <Button
                      variant="ghost"
                      onClick={() => openModal(tier)}
                      className="w-full mt-4 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                    >
                      See all {tier.features.length} features
                    </Button>
                  )}
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full py-3 sm:py-4 font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] border-0 ${
                      tier.isPopular
                        ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 hover:from-violet-700 hover:via-fuchsia-700 hover:to-orange-600 text-white shadow-2xl hover:shadow-violet-500/50"
                        : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-xl hover:shadow-2xl"
                    }`}
                    onClick={() => handleBuyNow(tier)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          

          {/* Horizontally Scrollable Pricing Cards - Row 2 */}
          <div className="flex overflow-x-auto space-x-6 lg:space-x-8 pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-gray-100">
            {largeFormatTiers.map((tier, index) => (
              <div key={index} className="flex-shrink-0 w-full max-w-sm sm:w-80">
             <Card
  className={`group relative transition-all duration-500 hover:-translate-y-2 flex flex-col backdrop-blur-sm border-2 ${
    tier.isPopular
      ? "border-violet-300 shadow-2xl bg-gradient-to-br from-white via-violet-50 to-fuchsia-50 shadow-violet-200/50"
      : "border-gray-200 hover:shadow-2xl bg-white/80 hover:bg-gradient-to-br hover:from-white hover:via-fuchsia-50 hover:to-orange-50 hover:border-fuchsia-200"
  }`}
>
  {/* ✅ IMAGE */}
  <div className="relative overflow-hidden rounded-t-2xl">
    <img
      src={tier.image}
      alt={tier.name}
      className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
  </div>

  {/* Popular badge */}
  {tier.isPopular && (
    <div className="absolute top-4 left-4 z-20">
      <Badge className="bg-violet-600 text-white px-3 py-1 text-xs font-bold shadow-lg">
        <Star size={12} className="mr-1" />
        Most Popular
      </Badge>
    </div>
  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-violet-600 transition-colors duration-300">
                      {tier.name}
                    </CardTitle>

                    <div className="mb-4">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {/* Original crossed out price */}
                        <div className="flex items-baseline justify-center">
                          <span className="text-xl sm:text-2xl font-bold text-gray-400 relative">
                            ${tier.originalPrice}
                            <div className="absolute inset-0 bg-red-500 h-0.5 top-1/2 transform -translate-y-1/2 rotate-12"></div>
                          </span>
                        </div>

                        {/* Current price with pounds */}
                        <div className="flex items-baseline justify-center flex-wrap">
                          <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">${tier.price}</span>
                          <span className="text-2xl sm:text-3xl font-semibold text-gray-700 ml-2">
                            (£{tier.gbpPrice})
                          </span>
                          <span className="text-gray-500 ml-2 text-base sm:text-lg">/frame</span>
                        </div>
                      </div>
                    </div>

                    <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="space-y-3 sm:space-y-4">
                      {tier.features.slice(0, 5).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center mr-3 mt-0.5">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {tier.features.length > 5 && (
                      <Button
                        variant="ghost"
                        onClick={() => openModal(tier)}
                        className="w-full mt-4 text-violet-600 hover:text-violet-700 hover:bg-violet-50"
                      >
                        See all {tier.features.length} features
                      </Button>
                    )}
                  </CardContent>

                  <CardFooter>
                    <Button
                      className={`w-full py-3 sm:py-4 font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-xl hover:shadow-2xl`}
                      onClick={() => handleBuyNow(tier)}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          {/* Feature Comparison Link */}
          <div className="text-center mt-8">
            <Button variant="ghost" className="text-violet-600 hover:text-violet-700 text-base sm:text-lg group">
              View complete feature comparison
              <span className="ml-2 transition-all duration-300 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>

        {/* Features Modal */}
        {showModal && selectedTier && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedTier.name} Plan</h3>
                      <p className="text-violet-100 text-sm">Complete feature overview</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {selectedTier.price === 0 ? (
                      <div className="text-xl font-bold">Custom Pricing</div>
                    ) : (
                      <div>
                        <div className="text-3xl font-bold">${selectedTier.price}</div>
                        <div className="text-violet-200 text-sm">per frame</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="mb-6">
                  <p className="text-gray-600 text-lg leading-relaxed">{selectedTier.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-5 h-5 text-violet-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {selectedTier.features.length} Premium Features Included
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTier.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-violet-50 transition-colors duration-200 group"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center mr-4 mt-0.5 group-hover:bg-violet-700 transition-colors">
                          <Check size={14} className="text-white" />
                        </div>
                        <span className="text-gray-700 leading-relaxed font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-8 py-6 flex flex-col sm:flex-row gap-4 border-t border-gray-200">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={closeModal}>
                  Close Details
                </Button>
                <Button
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
                  onClick={() => {
                    closeModal()
                    handleBuyNow()
                  }}
                >
                  {selectedTier.buttonText}
                </Button>
              </div>
            </div>
          </div>
        )}
        <style>{`
  @keyframes float {
    0% { transform: translateY(-50%) translateX(0); }
    50% { transform: translateY(-55%) translateX(0); }
    100% { transform: translateY(-50%) translateX(0); }
  }
`}</style>

      </section>
    </>
  )
}