"use client"

import type React from "react"

import { useState } from "react"
import { Check, X, Sparkles } from "lucide-react"

interface PricingPlan {
  name: string
  price: number
  description: string
  features: string[]
  isPopular?: boolean
  buttonText: string
}

// Custom Button component to avoid import issues
const CustomButton = ({
  children,
  className = "",
  variant = "default",
  onClick,
  ...props
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
  onClick?: () => void
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variantClasses = {
    default: "bg-gray-900 hover:bg-gray-800 text-white focus:ring-gray-500",
    outline: "border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-900 focus:ring-gray-500",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState<PricingPlan | null>(null)
  const [showModal, setShowModal] = useState(false)

  const pricingTiers: PricingPlan[] = [
    {
      name: "Starter",
      price: 699,
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
      price: 949,
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
      price: 1199,
      description: "The ultimate Deckoviz experience — breathtaking, personal, extraordinary.",
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
      buttonText: "Contact Sales",
    },
  ]

  const handleBuyNow = (tier: PricingPlan) => {
    console.log("Navigating to place order with tier:", tier)
  }

  const openModal = (tier: PricingPlan) => {
    setSelectedTier(tier)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedTier(null)
  }

  const FeaturesModal = () => {
    if (!selectedTier) return null

    return (
      <div  id="pricing" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div id="pricing" className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
          <div
            className="p-4 sm:p-6 text-white"
            style={{
              background: "linear-gradient(135deg, #7d39ec 0%, #9d5aff 100%)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex-1">
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {selectedTier.name}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  {selectedTier.price === 0 ? (
                    <span className="text-xl sm:text-2xl font-bold">Custom Pricing</span>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl font-bold">${selectedTier.price}</span>
                      <span className="text-white/80 text-base sm:text-lg">/frame</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="self-end sm:self-auto p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">{selectedTier.description}</p>

            <div className="border-t border-gray-200 pt-6">
              <h4
                className="font-bold text-lg sm:text-xl mb-4 text-gray-900 flex items-center"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                <Sparkles className="mr-2 text-[#7d39ec] flex-shrink-0" size={24} />
                Complete Feature List ({selectedTier.features.length} features)
              </h4>
              <div className="grid gap-3 sm:gap-4">
                {selectedTier.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5"
                      style={{ backgroundColor: "#7d39ec" }}
                    >
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <CustomButton variant="outline" className="flex-1 py-3 px-4 font-medium" onClick={closeModal}>
                Close
              </CustomButton>
              <CustomButton
                className="flex-1 py-3 px-4 font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #7d39ec 0%, #9d5aff 100%)",
                }}
                onClick={() => {
                  closeModal()
                  handleBuyNow(selectedTier)
                }}
              >
                {selectedTier.buttonText}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
        rel="stylesheet"
      />

      <section
        id="pricing"
        className="py-12 sm:py-16 lg:py-20"
        style={{
          background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-12 mb-4 sm:mb-6">
              Simple{" "}
              <span className="relative" style={{ color: "#7d39ec" }}>
                Pricing
                <div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 rounded-full"
           
                ></div>
              </span>
            </h2>
            <p className="text-lg sm:text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed px-4">
              Choose the perfect Deckoviz frame to match your space, your dreams, and your lifestyle.
              <span className="font-semibold" style={{ color: "#7d39ec" }}>
                {" "}
                Enjoy early bird discounts of 20% off
              </span>{" "}
              while discounts still apply!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 sm:mb-12 mt-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-visible group ${
                  tier.isPopular
                    ? "border-2 shadow-xl"
                    : "bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:shadow-gray-200/50"
                }`}
                style={
                  tier.isPopular
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(125, 57, 236, 0.05) 0%, rgba(157, 90, 255, 0.05) 100%)",
                        borderColor: "rgba(125, 57, 236, 0.3)",
                        boxShadow: "0 25px 50px -12px rgba(125, 57, 236, 0.1)",
                      }
                    : {}
                }
              >
                {tier.isPopular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div
                        className="text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center whitespace-nowrap"
                        style={{
                          background: "linear-gradient(135deg, #7d39ec 0%, #9d5aff 100%)",
                        }}
                      >
                        <Sparkles size={14} className="mr-1 sm:mr-2" />
                        Most Popular
                      </div>
                    </div>
                    <div
                      className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"
                      style={{
                        background: "linear-gradient(135deg, rgba(125, 57, 236, 0.1) 0%, transparent 100%)",
                      }}
                    ></div>
                  </>
                )}

                <div className="text-center mb-6 sm:mb-8 relative z-10">
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-[#7d39ec] transition-colors duration-300"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {tier.name}
                  </h3>
                  <div className="mb-4 sm:mb-6">
                    {tier.price === 0 ? (
                      <div
                        className="text-3xl sm:text-4xl font-bold group-hover:text-[#7d39ec] transition-colors duration-300"
                        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                      >
                        Custom
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-center flex-wrap">
                        <span
                          className="text-4xl sm:text-5xl font-bold group-hover:text-[#7d39ec] transition-colors duration-300"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          ${tier.price}
                        </span>
                        <span className="text-gray-500 ml-2 text-base sm:text-lg">/frame</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                  {tier.features.slice(0, 5).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start group/item">
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover/item:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: "#7d39ec" }}
                      >
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed group-hover/item:text-gray-900 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {tier.features.length > 5 && (
                  <button
                    onClick={() => openModal(tier)}
                    className="font-semibold text-sm mb-4 sm:mb-6 flex items-center justify-center w-full group/button py-2 rounded-lg transition-all duration-300"
                    style={{
                      color: "#7d39ec",
                      backgroundColor: "rgba(125, 57, 236, 0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(125, 57, 236, 0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(125, 57, 236, 0.05)"
                    }}
                  >
                    <span className="group-hover/button:underline">See all {tier.features.length} features</span>
                  </button>
                )}

                <div className="mt-auto">
                  <CustomButton
                    className={`w-full py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                      tier.isPopular ? "text-white" : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                    style={
                      tier.isPopular
                        ? {
                            background: "linear-gradient(135deg, #7d39ec 0%, #9d5aff 100%)",
                            boxShadow: "0 10px 25px -5px rgba(125, 57, 236, 0.25)",
                          }
                        : {}
                    }
                    onClick={() => handleBuyNow(tier)}
                  >
                    {tier.buttonText}
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="font-semibold text-base sm:text-lg hover: transition-all duration-300 inline-flex items-center group px-4 py-2"
              style={{ color: "#7d39ec" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#6d2bd4"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#7d39ec"
              }}
            >
              View complete feature comparison
              <div className="ml-2 w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">→</div>
            </button>
          </div>
        </div>

        {showModal && <FeaturesModal />}
      </section>
    </>
  )
}

export default Pricing
