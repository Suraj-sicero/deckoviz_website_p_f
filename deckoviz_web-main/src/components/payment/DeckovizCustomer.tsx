import React, { useState } from 'react';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { ConfigurationSteps } from './ConfigurationSteps';
import { VisualPreview } from './VisualPreview';
import { frameSizeOptions, frameTypeOptions } from './data/productOptions';

const DeckovizCustomizer = () => {
  const [selectedFrameSize, setSelectedFrameSize] = useState("");
  const [selectedFrameType, setSelectedFrameType] = useState("");
  const [customFrameRequest, setCustomFrameRequest] = useState("");
  const [selectedUnits, setSelectedUnits] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("Standard Delivery");
  const [packagingType, setPackagingType] = useState("Standard");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const getSelectedSize = () => frameSizeOptions.find(opt => opt.name === selectedFrameSize);
  const getSelectedType = () => frameTypeOptions.find(opt => opt.name === selectedFrameType);

  const calculateTotal = () => {
    const basePrice = getSelectedSize()?.price || 0;
    const subscriptionCost = 9;
    const deliveryCost = deliveryType === "Express Delivery" ? 19 : 9;
    const packagingCost = packagingType === "Eco-Friendly" ? 5 : 0;
    const units = parseInt(selectedUnits?.split(' ')[0]) || 1;
    
    return (basePrice * units) + subscriptionCost + deliveryCost + packagingCost;
  };

  const formData = {
    selectedFrameSize,
    setSelectedFrameSize,
    selectedFrameType,
    setSelectedFrameType,
    customFrameRequest,
    setCustomFrameRequest,
    selectedUnits,
    setSelectedUnits,
    subscriptionType,
    setSubscriptionType,
    subscriptionPeriod,
    setSubscriptionPeriod,
    name,
    setName,
    email,
    setEmail,
    shippingAddress,
    setShippingAddress,
    deliveryType,
    setDeliveryType,
    packagingType,
    setPackagingType,
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    cardHolderName,
    setCardHolderName,
    getSelectedSize,
    getSelectedType,
    calculateTotal
  };

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

      {/* FULL SCREEN LAYOUT */}
      <div className="h-screen flex">
        {selectedFrameSize ? (
          // Split Screen Layout - Visual Preview touches top
          <>
            {/* Left Side - Scrollable with stable scrollbar */}
            <div className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Header - now scrollable and centered */}
                <div className="relative z-10 pt-20 pb-8 text-center">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                    Get Your Deckoviz
                  </h1>
                  <p className="text-gray-800  font-normal text-sm sm:text-base mb-2">
                    Bring your walls to life with the world's most advanced AI-powered Smart Art Frame.
                  </p>
                  <p className="text-gray-900 font-normal text-sm sm:text-base">
                    Follow the simple steps below to customize and place your order.
                  </p>
                </div>

                {/* Configuration Content */}
                <div className="space-y-6 py-4">
                  <ConfigurationSteps formData={formData} />
                </div>
                
                {/* Bottom Button - now scrollable */}
                <div className="py-8 flex justify-center">
                  <button
                    type="button"
                    className="group relative overflow-hidden text-white py-3 sm:py-2 px-6 sm:px-5 rounded-2xl font-medium text-base sm:text-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 hover:scale-105 w-full sm:w-auto"
                    style={{
                      background: "linear-gradient(135deg, #ea580c 0%, #7c3aed 35%, #4338ca 70%, #1e1b4b 100%)",
                      boxShadow: "0 8px 32px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Check out
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Preview touches full top */}
            <div className="w-80 lg:w-96 xl:w-[32rem] bg-white/95 backdrop-blur-sm flex-shrink-0">
              <VisualPreview formData={formData} />
            </div>
          </>
        ) : (
          // Original Single Column Layout - also fully scrollable
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header - now scrollable */}
              <div className="relative z-10 text-center pt-20 pb-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 via-pink-400 to-blue-400">
                  Get Your Deckoviz
                </h1>
                <p className="text-gray-800  font-normal text-sm sm:text-base mb-2">
                  Bring your walls to life with the world's most advanced AI-powered Smart Art Frame.
                </p>
                <p className="text-gray-900 font-normal text-sm sm:text-base max-w-2xl mx-auto">
                  Follow the simple steps below to customize and place your order.
                </p>
              </div>

              {/* Content */}
              <div className="space-y-6 py-4">
                <ConfigurationSteps formData={formData} showOnlyFirstTwo={true} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles - FIXED SCROLLBAR */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideInFromTop {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* Custom scrollbar styling - Always visible and stable */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(243, 244, 246, 0.3);
            border-radius: 3px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.5);
            border-radius: 3px;
          }
          
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(156, 163, 175, 0.7);
          }
          
          /* Prevent horizontal overflow */
          .min-w-0 {
            min-width: 0;
          }
        `,
        }}
      />
    </div>
  );
};

export default DeckovizCustomizer;