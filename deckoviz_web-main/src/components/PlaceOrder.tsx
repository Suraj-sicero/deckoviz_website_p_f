"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, Upload, Truck, CreditCard, Package, Calendar, MapPin, Sparkles, Star } from "lucide-react"

const PlaceOrder: React.FC = () => {
  const [selectedFrameSize, setSelectedFrameSize] = useState("")
  const [selectedFrameType, setSelectedFrameType] = useState("")
  const [customFrameRequest, setCustomFrameRequest] = useState("")
  const [selectedUnits, setSelectedUnits] = useState("")
  const [subscriptionType, setSubscriptionType] = useState("")
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const [deliveryType, setDeliveryType] = useState("Standard Delivery")
  const [packagingType, setPackagingType] = useState("Standard Packaging")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")

  const getStepGradient = (stepNumber: string): string => {
    const gradients = {
      "0.1": "radial-gradient(ellipse at top left, #dbeafe 0%, #e0e7ff 30%, #dbeafe 60%, #93c5fd 100%)",
      "0.2": "radial-gradient(ellipse at top right, #e9d5ff 0%, #dbeafe 40%, #e9d5ff 70%, #c4b5fd 100%)",
      "0.3": "radial-gradient(ellipse at bottom left, #fce7f3 0%, #ffe4e6 35%, #fce7f3 65%, #f9a8d4 100%)",
      "0.4": "radial-gradient(ellipse at center, #fed7aa 0%, #fce7f3 45%, #fed7aa 75%, #fb923c 100%)",
      "0.5": "radial-gradient(ellipse at top, #e9d5ff 0%, #fce7f3 40%, #e9d5ff 70%, #c084fc 100%)",
      "0.6": "radial-gradient(ellipse at bottom right, #fce7f3 0%, #fed7aa 35%, #fce7f3 65%, #f472b6 100%)",
      "0.7": "radial-gradient(ellipse at left, #dbeafe 0%, #e9d5ff 45%, #dbeafe 75%, #93c5fd 100%)",
      "0.8": "radial-gradient(ellipse at right, #bbf7d0 0%, #a7f3d0 35%, #5eead4 70%, #2dd4bf 100%)",
      "0.9": "radial-gradient(ellipse at center, #e9d5ff 0%, #fce7f3 40%, #e9d5ff 70%, #c084fc 100%)",
    }
    return gradients[stepNumber as keyof typeof gradients] || gradients["0.1"]
  }

  const Dropdown: React.FC<{
    value: string
    onChange: (value: string) => void
    placeholder: string
    options: string[]
    className?: string
  }> = ({ value, onChange, placeholder, options, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <div className={`relative ${className}`}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-5 py-4 text-left bg-gradient-to-br from-white/90 via-white/95 to-white/80 backdrop-blur-md border border-gray-200/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300/60 focus:border-purple-300/60 transition-all duration-300 hover:border-purple-200/60 hover:bg-gradient-to-br hover:from-white/95 hover:via-white/100 hover:to-white/90 hover:shadow-xl hover:shadow-purple-100/50 flex justify-between items-center group relative overflow-hidden"
          >
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 -skew-x-12"></div>

            <span
              className={`${value ? "text-gray-900 font-medium" : "text-gray-500"} transition-all duration-200 relative z-10`}
            >
              {value || placeholder}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-all duration-300 relative z-10 ${isOpen ? "rotate-180 text-purple-600" : ""}`}
            />
          </button>
        </div>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
            <div
              className="fixed z-[9999] bg-white/98 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl shadow-purple-100/20 max-h-64 overflow-y-auto"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: "220px",
                maxWidth: "90vw",
                width: "max-content",
                animation: "dropdownSlideIn 0.2s ease-out forwards",
              }}
            >
              <div className="p-2">
                {options.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option)
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-purple-50/80 hover:via-pink-50/60 hover:to-purple-50/80 transition-all duration-200 rounded-xl whitespace-nowrap group relative overflow-hidden my-1"
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animation: "slideInFromTop 0.3s ease-out forwards",
                    }}
                  >
                    {/* Hover shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500 -skew-x-12"></div>

                    <span className="group-hover:text-purple-700 group-hover:font-medium transition-all duration-200 relative z-10">
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced Creative Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-48 w-[110%] h-60 sm:h-80 bg-gradient-to-r from-pink-300 via-orange-100 to-transparent rounded-full blur-3xl rotate-8"></div>
        <div className="absolute top-1/4 -right-64 w-[120%] h-48 sm:h-64 bg-gradient-to-l from-orange-100 via-pink-100 to-transparent rounded-full blur-3xl -rotate-[35deg]"></div>
        <div className="absolute -bottom-32 -left-32 w-[125%] h-60 sm:h-72 bg-gradient-to-r from-purple-200 via-orange-100 to-purple-100 rounded-full blur-3xl rotate-[4deg]"></div>
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-[12%] left-[18%] w-[600px] sm:w-[900px] h-32 sm:h-40 bg-gradient-to-r from-pink-100 to-transparent rounded-full blur-2xl rotate-[28deg] opacity-80"></div>
        <div className="absolute bottom-[65%] right-[25%] w-[700px] sm:w-[1100px] h-36 sm:h-48 bg-gradient-to-l from-purple-200 to-transparent rounded-full blur-2xl -rotate-[42deg] opacity-70"></div>
        <div className="absolute top-[55%] left-[45%] w-[550px] sm:w-[850px] h-28 sm:h-36 bg-gradient-to-r from-orange-100 to-transparent rounded-full blur-2xl rotate-[62deg] opacity-65"></div>
        <div className="absolute top-[38%] right-[8%] w-[800px] sm:w-[1200px] h-40 sm:h-52 bg-gradient-to-l from-pink-200 to-transparent rounded-full blur-3xl -rotate-[18deg] opacity-60"></div>
        <div className="absolute bottom-[38%] left-[12%] w-[650px] sm:w-[1000px] h-36 sm:h-44 bg-gradient-to-r from-purple-100 to-transparent rounded-full blur-3xl rotate-[75deg] opacity-55"></div>
        <div className="absolute top-[72%] right-[35%] w-[600px] sm:w-[950px] h-32 sm:h-40 bg-gradient-to-l from-purple-300 to-transparent rounded-full blur-2xl -rotate-[55deg] opacity-70"></div>
        <div className="absolute top-[85%] left-[28%] w-[500px] sm:w-[800px] h-24 sm:h-32 bg-gradient-to-r from-pink-100 to-transparent rounded-full blur-xl rotate-[15deg] opacity-50"></div>
        <div className="absolute top-[25%] right-[45%] w-[450px] sm:w-[750px] h-28 sm:h-36 bg-gradient-to-l from-purple-100 to-transparent rounded-full blur-xl -rotate-[68deg] opacity-45"></div>
        <div className="absolute bottom-[18%] left-[55%] w-[400px] sm:w-[700px] h-20 sm:h-28 bg-gradient-to-r from-orange-100 to-transparent rounded-full blur-xl rotate-[38deg] opacity-60"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-10 sm:mt-20 mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-600">
              Get Your Deckoviz
            </h1>
            <p className="text-gray-800 text-sm sm:text-base">
              Bring your walls to life with the world's most advanced AI-powered
            </p>
            <p className="text-gray-800 mb-8 sm:mb-14 text-sm sm:text-base">Smart Art Frame.</p>
          </div>
          <div className="text-left">
            <p className="text-gray-900 font-normal mt-4 sm:mt-5 text-sm sm:text-base">
              Follow the simple steps below to customize and place your order.
            </p>
          </div>
        </div>

        <div className="space-y-6 relative z-0">
          {/* Step 0.1 - Frame Size */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.1")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-blue-200 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                0.1
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Select Your Frame</h3>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Size</h3>
                <p className="text-gray-600 text-sm">Choose the size that best fits your space.</p>
              </div>

              <div className="w-full lg:w-[40rem]">
                <Dropdown
                  value={selectedFrameSize}
                  onChange={setSelectedFrameSize}
                  placeholder="Choose Size"
                  options={["Small (8x10)", "Medium (11x14)", "Large (16x20)", "X-Large (20x24)"]}
                />
              </div>
            </div>
          </div>

          {/* Step 0.2 - Frame Type */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.2")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-purple-200 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                0.2
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Select Your Frame</h3>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Type</h3>
                <p className="text-gray-600 text-sm">Choose from our curated collection of premium</p>
                <p className="text-gray-600 text-sm">frame options.</p>
              </div>

              <div className="w-full lg:w-[40rem]">
                <Dropdown
                  value={selectedFrameType}
                  onChange={setSelectedFrameType}
                  placeholder="Choose Frame Type"
                  options={["Classic Wood", "Modern Metal", "Vintage Ornate", "Minimalist"]}
                />
              </div>
            </div>
          </div>

          {/* Step 0.3 - Custom Frame Request */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-10 shadow-lg border border-gray-100 relative z-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.3")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-pink-200 group-hover:from-pink-200 group-hover:to-rose-200 transition-all duration-300">
                0.3
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-pink-600 group-hover:text-pink-700 transition-colors duration-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Custom Frame</h3>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-8">Request (Optional)</h3>
                <p className="text-gray-600 text-sm">Want something truly</p>
                <p className="text-gray-600 text-sm">unique?</p>
              </div>

              <div className="w-full lg:w-[40rem]">
                <textarea
                  value={customFrameRequest}
                  onChange={(e) => setCustomFrameRequest(e.target.value)}
                  placeholder="Describe your Custom Frame request..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 resize-none transition-all duration-300 mb-3 text-gray-700 placeholder-gray-600 hover:bg-white/90 hover:shadow-md"
                />
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-medium transition-all duration-300 hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base group"
                >
                  <Upload className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Upload Reference Image
                </button>
              </div>
            </div>
          </div>

          {/* Step 0.4 - Number of Units */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.4")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-orange-200 group-hover:from-orange-200 group-hover:to-pink-200 transition-all duration-300">
                0.4
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Select Number of</h3>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Units</h3>
                <p className="text-gray-600 text-sm">Need multiple Deckoviz frames? We've got you</p>
                <p className="text-gray-600 text-sm">covered.</p>
              </div>

              <div className="w-full lg:w-[40rem]">
                <Dropdown
                  value={selectedUnits}
                  onChange={setSelectedUnits}
                  placeholder="1 Unit"
                  options={["1 Unit", "2 Units", "3 Units", "4 Units", "5+ Units"]}
                />
              </div>
            </div>
          </div>

          {/* Step 0.5 - Subscription Plan */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 relative z-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.5")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-purple-200 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                0.5
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Choose Your</h3>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Subscription Plan</h3>
                <p className="text-gray-600 text-sm">Choose your plan, which is best</p>
                <p className="text-gray-600 text-sm">for you.</p>
              </div>

              <div className="w-full lg:w-[40rem] lg:-mt-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-3">Subscription Type</label>
                    <Dropdown
                      value={subscriptionType}
                      onChange={setSubscriptionType}
                      placeholder="Select Type"
                      options={["Basic Plan", "Premium Plan", "Pro Plan"]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-3">Subscription Period</label>
                    <Dropdown
                      value={subscriptionPeriod}
                      onChange={setSubscriptionPeriod}
                      placeholder="Select Period"
                      options={["Monthly", "Quarterly", "Yearly"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 0.6 - Shipping Address */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.6")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-pink-200 group-hover:from-pink-200 group-hover:to-orange-200 transition-all duration-300">
                0.6
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-6 h-6 text-pink-600 group-hover:text-pink-700 transition-colors duration-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Enter Shipping</h3>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Address</h3>
                <p className="text-gray-600 text-sm">Please ensure your address is accurate to</p>
                <p className="text-gray-600 text-sm">avoid delivery issues.</p>
              </div>

              <div className="w-full lg:w-[40rem] lg:mt-7">
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter Your Full Shipping Address"
                  rows={3}
                  className="w-full h-32 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 resize-none transition-all duration-300 text-gray-700 placeholder-gray-600 hover:bg-white/90 hover:shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Step 0.7 - Delivery Options */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.7")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-blue-200 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                0.7
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Delivery</h3>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Options</h3>
                <p className="text-gray-600 text-sm">Choose your options according</p>
                <p className="text-gray-600 text-sm">to your needs.</p>
              </div>

              <div className="w-full lg:w-[40rem] lg:-mt-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-3">Delivery Type</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                      <label className="flex items-center cursor-pointer group/radio">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="Standard Delivery"
                          checked={deliveryType === "Standard Delivery"}
                          onChange={(e) => setDeliveryType(e.target.value)}
                          className="mr-3 accent-violet-500 transition-transform duration-200 checked:scale-125"
                        />
                        <span className="text-gray-700 font-medium text-sm sm:text-base group-hover/radio:text-violet-600 transition-colors duration-200">
                          Standard Delivery
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer group/radio">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="Express Delivery"
                          checked={deliveryType === "Express Delivery"}
                          onChange={(e) => setDeliveryType(e.target.value)}
                          className="mr-3 accent-red-600 transition-transform duration-200 checked:scale-125"
                        />
                        <span className="text-gray-700 font-medium text-sm sm:text-base group-hover/radio:text-red-600 transition-colors duration-200">
                          Express Delivery
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-3">Packaging Options</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                      <label className="flex items-center cursor-pointer group/radio">
                        <input
                          type="radio"
                          name="packagingType"
                          value="Standard Packaging"
                          checked={packagingType === "Standard Packaging"}
                          onChange={(e) => setPackagingType(e.target.value)}
                          className="mr-3 accent-violet-500 transition-transform duration-200 checked:scale-125"
                        />
                        <span className="text-gray-700 font-medium text-sm sm:text-base group-hover/radio:text-violet-600 transition-colors duration-200">
                          Standard Packaging
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer group/radio">
                        <input
                          type="radio"
                          name="packagingType"
                          value="Express Packaging"
                          checked={packagingType === "Express Packaging"}
                          onChange={(e) => setPackagingType(e.target.value)}
                          className="mr-3 accent-red-500 transition-transform duration-200 checked:scale-125"
                        />
                        <span className="text-gray-700 font-medium text-sm sm:text-base group-hover/radio:text-red-600 transition-colors duration-200">
                          Express Packaging
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 0.8 - Review Total */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.8")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-green-100 to-teal-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-green-200 group-hover:from-green-200 group-hover:to-teal-200 transition-all duration-300">
                0.8
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Review Your</h3>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Total</h3>
              </div>
              <div className="w-full lg:w-[45rem]">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-3 border border-gray-100/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-sm sm:text-base">Frame Cost:</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">$849.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-sm sm:text-base">Subscription Cost:</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">$9.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-sm sm:text-base">Delivery Cost:</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">$9.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-sm sm:text-base">Packaging Surcharge:</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">$0.00</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Price</span>
                    <span className="text-lg font-bold text-gray-900">$849.00</span>
                  </div>
                  <p className="text-xs text-gray-500 text-center">All tax included.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 0.9 - Payment Details */}
          <div
            className="group bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-200/50"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = getStepGradient("0.9")
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
            }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full w-fit mb-4 border border-purple-200 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                0.9
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1 max-w-full lg:max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">Payment</h3>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Details</h3>
                <p className="text-gray-600 text-sm">Your payment is secure and</p>
                <p className="text-gray-600 text-sm">encrypted.</p>
              </div>

              <div className="w-full lg:w-[40rem] lg:-mt-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 567 8910 1234"
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 text-gray-700 placeholder-gray-600 hover:bg-white/90 hover:shadow-md"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Expiry Date</label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YYYY"
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 text-gray-700 placeholder-gray-600 hover:bg-white/90 hover:shadow-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 text-gray-700 placeholder-gray-600 hover:bg-white/90 hover:shadow-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
                    <input
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 text-gray-700 placeholder-gray-600 hover:bg-white/90 hover:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="pt-6 sm:pt-8 flex justify-center">
            <button
              type="button"
              className="group relative overflow-hidden bg-gradient-to-br from-orange-600 via-purple-700 to-indigo-800 text-white py-3 sm:py-4 px-8 sm:px-12 rounded-2xl font-medium text-base sm:text-lg transition-all duration-500 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 transform hover:scale-105 w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #ea580c 0%, #7c3aed 35%, #4338ca 70%, #1e1b4b 100%)",
                boxShadow: "0 8px 32px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700"></div>

              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Confirm and Place Order
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 text-xs sm:text-sm text-gray-500 space-y-1">
            <p>30-day Satisfaction Guarantee</p>
            <p>Free returns for damaged items</p>
            <p>Eco-friendly commitment on packaging</p>
            <p>24/7 customer support available</p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes sparkleFloat {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-20px) scale(0.5); }
          }
          
          @keyframes slideInFromTop {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes dropdownSlideIn {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        `,
        }}
      />
    </div>
  )
}

export default PlaceOrder
