"use client"

import { useState } from 'react';
import { ShoppingCart, Eye, X } from 'lucide-react';
import { ConfigurationSteps } from './ConfigurationSteps';
import { VisualPreview } from './VisualPreview';
import { frameSizeOptions, frameTypeOptions } from './data/productOptions';
import { subscriptionPlans } from './data/subscriptionPlans';

// Interfaces are correctly defined at the top level
interface FrameSizeOption {
  name: string;
  image: string;
  price: number;
  description: string;
}

interface FrameTypeOption {
  name: string;
  description: string;
  image: string;
}

const DeckovizCustomizer = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
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

  const getSelectedSize = (): FrameSizeOption | undefined => frameSizeOptions.find(opt => opt.name === selectedFrameSize);
  const getSelectedType = (): FrameTypeOption | undefined => frameTypeOptions.find(opt => opt.name === selectedFrameType);

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
    selectedFrameSize, setSelectedFrameSize,
    selectedFrameType, setSelectedFrameType,
    customFrameRequest, setCustomFrameRequest,
    selectedUnits, setSelectedUnits,
    subscriptionType, setSubscriptionType,
    subscriptionPeriod, setSubscriptionPeriod,
    name, setName,
    email, setEmail,
    shippingAddress, setShippingAddress,
    deliveryType, setDeliveryType,
    packagingType, setPackagingType,
    getSelectedSize,
    getSelectedType,
    calculateTotal
  };

  const handleCheckout = async () => {
    const selectedSize = getSelectedSize();
    
    // --- ✅ FIX #2 --- Added a check for the 'selectedSize' object to prevent a crash.
    // This now guarantees `selectedSize` is a valid object before we proceed.
    if (!email || !name || !shippingAddress || !selectedSize) {
      alert("Please fill in your name, email, shipping address, and select a frame size to continue.");
      return;
    }

    const orderDetails = {
      email: email,
      // This line is now safe because of the check above
      productName: `Deckoviz ${selectedSize.name} (${selectedFrameType || 'Standard'})`,
      amount: calculateTotal(),
      metadata: {
        frameSize: selectedFrameSize,
        frameType: selectedFrameType,
        units: selectedUnits || '1 Unit',
        subscription: `${subscriptionType} - ${subscriptionPeriod}`,
        delivery: deliveryType,
        packaging: packagingType,
        customerName: name,
        shipping: shippingAddress,
      }
    };
    


    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        alert('Error: Could not start the payment process.');
        console.error('Backend Error:', session.error);
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
      console.error('Fetch Error:', error);
    }
  };

  

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background JSX */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-48 w-[110%] h-60 sm:h-80 bg-gradient-to-r from-pink-300 via-orange-100 to-transparent rounded-full blur-3xl rotate-8"></div>
        <div className="absolute top-1/4 -right-64 w-[120%] h-48 sm:h-64 bg-gradient-to-l from-orange-100 via-pink-100 to-transparent rounded-full blur-3xl -rotate-[35deg]"></div>
        <div className="absolute -bottom-32 -left-32 w-[125%] h-60 sm:h-72 bg-gradient-to-r from-purple-200 via-orange-100 to-purple-100 rounded-full blur-3xl rotate-[4deg]"></div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-[12%] left-[18%] w-[600px] sm:w-[900px] h-32 sm:h-40 bg-gradient-to-r from-pink-100 to-transparent rounded-full blur-2xl rotate-[28deg] opacity-80"></div>
        <div className="absolute bottom-[65%] right-[25%] w-[700px] sm:w-[1100px] h-36 sm:h-48 bg-gradient-to-l from-purple-200 to-transparent rounded-full blur-2xl -rotate-[42deg] opacity-70"></div>
        <div className="absolute top-[55%] left-[45%] w-[550px] sm:w-[850px] h-28 sm:h-36 bg-gradient-to-r from-orange-100 to-transparent rounded-full blur-2xl rotate-[62deg] opacity-65"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none"></div>

      <div className="h-screen flex">
        {selectedFrameSize ? (
          <>
            <div className="flex-1 min-w-0 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 text-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 sm:mt-4 font-medium mb-2 sm:mb-3 bg-clip-text text-transparent bg-gray-700">Get Your Deckoviz</h1>
                  <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base mt-3 sm:mt-4 md:mt-6 mb-2 px-4">Follow the simple steps below to customize and place your order.</p>
                </div>
                <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                  <ConfigurationSteps formData={formData} />
                </div>
                <div className="py-6 sm:py-8 flex justify-center px-4">
                  <button onClick={handleCheckout} type="button" className="group relative overflow-hidden text-white py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base md:text-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200/50 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto backdrop-blur-sm border border-white/20" style={{ background: "linear-gradient(135deg, #ea580c 0%, #7c3aed 35%, #4338ca 70%, #1e1b4b 100%)", boxShadow: "0 8px 32px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Proceed to Payment
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-80 lg:w-96 xl:w-[32rem] bg-white/95 backdrop-blur-sm flex-shrink-0">
              <VisualPreview formData={formData} />
            </div>
            <button onClick={() => setShowPreviewModal(true)} className="lg:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm flex items-center gap-2" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 50%, #1e1b4b 100%)", boxShadow: "0 8px 32px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}>
              <Eye className="w-6 h-6" />
              <span className="text-sm font-medium">Toggle Preview</span>
            </button>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative z-10 text-center pt-12 sm:pt-16 md:pt-20 pb-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl mt-6 font-medium mb-3 sm:mb-4 bg-clip-text text-transparent bg-gray-700">Get Your Deckoviz</h1>
                <p className="text-gray-800 font-medium text-xs sm:text-sm md:text-base mb-2 px-4">Bring your walls to life with the world's most advanced AI-powered Smart Art Frame.<br /><br />Please select a frame size to begin customizing your order.</p>
              </div>
              <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                <ConfigurationSteps formData={formData} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- ✅ FIX #1 --- Restored the modal JSX, which uses the <X /> icon. */}
      {showPreviewModal && (
        <div className="lg:hidden fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md h-[80vh] flex flex-col shadow-2xl border border-gray-200/50 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Your Selection</h3>
                    <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <VisualPreview formData={formData} />
                </div>
            </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .overflow-y-auto::-webkit-scrollbar { width: 6px; }
            .overflow-y-auto::-webkit-scrollbar-track { background: rgba(243, 244, 246, 0.3); }
            .overflow-y-auto::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.5); border-radius: 3px; }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: rgba(156, 163, 175, 0.7); }
            .min-w-0 { min-width: 0; }
          `,
        }}
      />
    </div>
  );
};

export default DeckovizCustomizer;