import { useState } from 'react';
import { ShoppingCart, Eye, X } from 'lucide-react';
import { ConfigurationSteps } from './ConfigurationSteps';
//import { VisualPreview } from './VisualPreview';
import { frameSizeOptions, frameTypeOptions } from './data/productOptions';
import { subscriptionPlans } from './data/subscriptionPlans';

// Define types for the options
interface frameSizeOptions {
  name: string;
  image: string;
  price: number;
  description: string;
}

interface frameTypeOptions {
  name: string;
  description: string;
  image: string;
}

const DeckovizCustomizer = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
const [selectedFrameSize, setSelectedFrameSize] = useState("Default Frame");
const [selectedFrameType, setSelectedFrameType] = useState("Default Type");
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
    const selectedPlan = subscriptionPlans.find(plan => plan.name === subscriptionType);
    let subscriptionCost = 0;
    if (selectedPlan && subscriptionPeriod) {
      subscriptionCost = subscriptionPeriod === 'Yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
    }
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
  const confirmOrder = () => {
    // go to order-confirmed
    window.location.href = 'https://buy.stripe.com/fZu9AU03lfWs3r85Lj5kk00';
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

      {/* FULL SCREEN LAYOUT */}
      <div className="h-screen flex">
        {selectedFrameSize ? (
          // Split Screen Layout - Visual Preview touches top
          <>
            {/* Left Side - Scrollable with stable scrollbar */}
            <div className="flex-1 min-w-0 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Header - now scrollable and centered */}
                <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 text-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 sm:mt-4 font-medium mb-2 sm:mb-3 bg-clip-text text-transparent bg-gray-700">
                    Get Your Deckoviz
                  </h1>
                  <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base mt-3 sm:mt-4 md:mt-6 mb-2 px-4">
                    Follow the simple steps below to customize and place your order.
                  </p>
                  
                </div>
                {/*}

                {/* Configuration Content **
                <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                  <ConfigurationSteps formData={formData} />
                </div>
                */}
                {/* Bottom Button - now scrollable */}
                <div className="py-6 sm:py-8 flex justify-center px-4">
                  <button onClick={confirmOrder}
                    type="button"
                    className="group relative overflow-hidden text-white py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base md:text-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto backdrop-blur-sm border border-white/20"
                    style={{
                      background: "linear-gradient(135deg, #ea580c 0%, #7c3aed 35%, #4338ca 70%, #1e1b4b 100%)",
                      boxShadow: "0 8px 32px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {/* Glass shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
                    
                    {/* Subtle glass overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Check out
                    </span>
                  </button>
                </div>

              </div>
            </div>

            {/* Right Side - Visual Preview touches full top */}
            {/*}
            <div className="hidden lg:block w-80 lg:w-96 xl:w-[32rem] bg-white/95 backdrop-blur-sm flex-shrink-0">
              <VisualPreview formData={formData} />
            </div>
            */}

            {/* Mobile Preview Button - Only show when frame is selected and on smaller screens */}
            <button
              onClick={() => setShowPreviewModal(true)}
              className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 50%, #1e1b4b 100%)",
                boxShadow: "0 8px 32px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <Eye className="w-6 h-6" />
              <span className="text-sm font-medium">Toggle Preview</span>
            </button>
          </>
        ) : (

          
          // Original Single Column Layout - also fully scrollable
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header - now scrollable */}
              <div className="relative z-10 text-center pt-12 sm:pt-16 md:pt-20 pb-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl mt-6 font-medium mb-3 sm:mb-4 bg-clip-text text-transparent bg-gray-700">
                  Get Your Deckoviz
                </h1>
                <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base mb-2 px-4">
                  Bring your walls to life with the world's most advanced AI-powered Smart Art Frame.
                <br />
                <br />
                  Please select a frame size to begin customizing your order.
                </p>
                
              </div>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                <ConfigurationSteps formData={formData} showOnlyFirstTwo={true} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Preview Modal */}
      {/*
      {showPreviewModal && (
        <div className="lg:hidden fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Modal Header **
              
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/30 bg-gradient-to-r from-gray-50/80 to-white/60">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Your Selection</h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content - Scrollable **
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-5">
                  {/* Product Image **
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200/50">
                    {getSelectedSize() && (
                      <img 
                        src={getSelectedSize()?.image} 
                        alt="Product preview" 
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    )}
                    {getSelectedType() && (
                      <div className="absolute inset-0 bg-black/20 flex items-end justify-center p-3">
                        <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-medium shadow-sm border border-white/20">
                          {getSelectedType()?.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Configuration Summary **
                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/40 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-100/50 border-b border-gray-200/30">
                      <h4 className="font-semibold text-gray-900 text-base">Configuration</h4>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-gray-600 text-sm">Size:</span>
                        <span className="font-medium text-gray-900 text-sm text-right max-w-[60%] break-words">
                          {selectedFrameSize || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-600 text-sm">Frame:</span>
                        <span className="font-medium text-gray-900 text-sm text-right max-w-[60%] break-words">
                          {selectedFrameType || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-600 text-sm">Units:</span>
                        <span className="font-medium text-gray-900 text-sm">
                          {selectedUnits || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-600 text-sm">Plan:</span>
                        <span className="font-medium text-gray-900 text-sm text-right max-w-[60%] break-words">
                          {subscriptionType || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-600 text-sm">Delivery:</span>
                        <span className="font-medium text-gray-900 text-sm text-right max-w-[60%] break-words">
                          {deliveryType}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-600 text-sm">Packaging:</span>
                        <span className="font-medium text-gray-900 text-sm">
                          {packagingType}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Breakdown **
                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/40 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-100/50 border-b border-gray-200/30">
                      <h4 className="font-semibold text-gray-900 text-base">Price Breakdown</h4>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-gray-700 text-sm">Frame Cost:</span>
                        <span className="font-semibold text-gray-900 text-sm">
                          ${getSelectedSize()?.price || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-700 text-sm">Subscription:</span>
                        <span className="font-semibold text-gray-900 text-sm">$9.00</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-700 text-sm">Delivery:</span>
                        <span className="font-semibold text-gray-900 text-sm">
                          {deliveryType === "Express Delivery" ? "$19.00" : "$9.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-t border-gray-200">
                        <span className="text-gray-700 text-sm">Packaging:</span>
                        <span className="font-semibold text-gray-900 text-sm">
                          {packagingType === "Eco-Friendly" ? "+$5.00" : "$0.00"}
                        </span>
                      </div>
                      
                      <div className="border-t-2 border-gray-300 pt-3 mt-4">
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-base font-bold text-white">Total:</span>
                            <span className="text-xl font-bold text-white">
                              ${calculateTotal()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 text-center mt-2">All taxes included</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer **
              <div className="flex-shrink-0 bg-gray-50/60 px-4 sm:px-6 py-3 border-t border-gray-200/30">
                <div className="text-center text-xs text-gray-500 space-y-1">
                  <p className="font-medium">30-day Satisfaction Guarantee</p>
                  <p>Free returns • 24/7 support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      )}
      */}
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
            width: 4px;
          }
          
          @media (min-width: 640px) {
            .overflow-y-auto::-webkit-scrollbar {
              width: 6px;
            }
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