"use client"

import React from 'react';
import { Upload, Truck, CreditCard, Package, Calendar, MapPin, Sparkles, Star, Leaf } from 'lucide-react';
import { EnhancedDropdown } from './EnhancedDropdown';
import { SimpleDropdown } from './SimpleDropdown';
import { SizeSelector } from './SizeSelector';
import { frameTypeOptions, unitOptions } from './data/productOptions';
import { subscriptionPlans } from "./data/subscriptionPlans";

// --- ✅ UPDATED --- Removed insecure card detail types
interface FormData {
  selectedFrameSize: string;
  setSelectedFrameSize: (value: string) => void;
  selectedFrameType: string;
  setSelectedFrameType: (value: string) => void;
  customFrameRequest: string;
  setCustomFrameRequest: (value: string) => void;
  selectedUnits: string;
  setSelectedUnits: (value: string) => void;
  subscriptionType: string;
  setSubscriptionType: (value: string) => void;
  subscriptionPeriod: string;
  setSubscriptionPeriod: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  shippingAddress: string;
  setShippingAddress: (value: string) => void;
  deliveryType: string;
  setDeliveryType: (value: string) => void;
  packagingType: string;
  setPackagingType: (value: string) => void;
  getSelectedSize: () => undefined | { name: string; price: number; image: string; description: string; };
  calculateTotal: () => number;
}

interface ConfigurationStepsProps {
  formData: FormData;
  showOnlyFirstTwo?: boolean;
  stepFilter?: number[];
}

export const ConfigurationSteps: React.FC<ConfigurationStepsProps> = ({ 
  formData, 
  showOnlyFirstTwo = false,
  stepFilter
}) => {
  const allSteps = [
    // Step 1 - Frame Size
    {
      id: "0.1",
      title: "Select Your Frame Size",
      icon: Package,
      color: "blue",
      content: (
        <div className="w-full">
          {formData.selectedFrameSize ? (
            <SizeSelector 
              selectedFrameSize={formData.selectedFrameSize}
              setSelectedFrameSize={formData.setSelectedFrameSize}
            />
          ) : (
            <EnhancedDropdown
              value={formData.selectedFrameSize}
              onChange={formData.setSelectedFrameSize}
              placeholder="Choose Size"
              options={[
                { name: "Starter Unit (43 inches)", image: "images/framesize1.avif", price: 649, description: "Perfect for small to medium rooms" },
                { name: "Premium Unit (55 inches)", image: "images/framesize2.webp", price: 849, description: "Ideal for living rooms and offices" },
                { name: "Ultra Unit (65 inches)", image: "images/framesize3.jpg", price: 1049, description: "Premium choice for large spaces" },
                { name: "Pro Unit (75 inches)", image: "images/framesize4.png", price: 1249, description: "Professional grade for executive spaces" },
                { name: "Elite Unit (85 inches)", image: "images/framesize5.avif", price: 1549, description: "Ultimate luxury for premium installations" }
              ]}
            />
          )}
        </div>
      )
    },
    // Step 2 - Frame Type
    {
      id: "0.2",
      title: "Select Your Frame Type",
      icon: Star,
      color: "purple",
      content: (
        <div className="w-full">
          <EnhancedDropdown
            value={formData.selectedFrameType}
            onChange={formData.setSelectedFrameType}
            placeholder="Choose Frame Type"
            options={frameTypeOptions}
          />
        </div>
      )
    },
    // Step 3 - Custom Frame Request
    {
      id: "0.3",
      title: "Custom Frame Request (Optional)",
      icon: Sparkles,
      color: "pink",
      content: (
        <div className="w-full">
          <textarea
            value={formData.customFrameRequest}
            onChange={(e) => formData.setCustomFrameRequest(e.target.value)}
            placeholder="Describe your Custom Frame request..."
            rows={3}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 resize-none text-gray-700 placeholder-gray-600 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => { console.log('Upload button clicked!'); }}
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-violet-600 text-xs sm:text-sm md:text-base mt-3 cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
          >
            <Upload className="w-4 h-4" />
            Upload Reference Image
          </button>
        </div>
      )
    },
    // Step 4 - Number of Units  
    {
      id: "0.4",
      title: "Select Number of Units",
      icon: Package,
      color: "orange",
      content: (
        <div className="w-full">
          <SimpleDropdown
            value={formData.selectedUnits}
            onChange={formData.setSelectedUnits}
            placeholder="1 Unit"
            options={unitOptions}
          />
        </div>
      )
    },
    // Step 5 - Subscription Plan
    {
      id: "0.5",
      title: "Choose Your Subscription Plan",
      icon: Calendar,
      color: "purple",
      content: (
        <div className="w-full">
          <div className="space-y-4 sm:space-y-6">
            <div className="relative z-40">
              <label className="block text-sm font-medium text-gray-600 mb-2">Subscription Type</label>
              <EnhancedDropdown
                value={formData.subscriptionType}
                onChange={formData.setSubscriptionType}
                placeholder="Select Type"
                options={subscriptionPlans.map(p => ({ 
                 name: p.name, 
  description: `Billed at $${p.monthlyPrice}/month or $${p.yearlyPrice}/year`
                 }))}
              />
            </div>
            <div className="relative z-30">
              <label className="block text-sm font-medium text-gray-600 mb-2">Subscription Period</label>
              <EnhancedDropdown
                value={formData.subscriptionPeriod}
                onChange={formData.setSubscriptionPeriod}
                placeholder="Select Period"
                options={[
                  { name: "Monthly", description: "Billed every month" },
                  { name: "Yearly", description: "Billed annually with savings" }
                ]}
              />
            </div>
          </div>
        </div>
      )
    },
    // Step 6 - Contact & Shipping Information
    {
      id: "0.6",
      title: "Contact & Shipping Information",
      icon: MapPin,
      color: "pink",
      content: (
        <div className="w-full space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => formData.setName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 text-gray-700 placeholder-gray-600 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => formData.setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 text-gray-700 placeholder-gray-600 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
            <textarea
              value={formData.shippingAddress}
              onChange={(e) => formData.setShippingAddress(e.target.value)}
              placeholder="Enter Your Full Shipping Address"
              rows={3}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 resize-none text-gray-700 placeholder-gray-600 text-sm sm:text-base"
            />
          </div>
        </div>
      )
    },
    // Step 7 - Delivery Options
    {
      id: "0.7",
      title: "Delivery & Packaging",
      icon: Truck,
      color: "blue",
      content: (
        <div className="w-full space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">Delivery Type</label>
            <div className="flex flex-col gap-3 sm:gap-4">
              <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input type="radio" name="deliveryType" value="Standard Delivery" checked={formData.deliveryType === "Standard Delivery"} onChange={(e) => formData.setDeliveryType(e.target.value)} className="mr-3 accent-violet-500" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">Standard Delivery</span>
              </label>
              <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input type="radio" name="deliveryType" value="Express Delivery" checked={formData.deliveryType === "Express Delivery"} onChange={(e) => formData.setDeliveryType(e.target.value)} className="mr-3 accent-red-600" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">Express Delivery</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">Packaging Options</label>
            <div className="flex flex-col gap-3 sm:gap-4">
              <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input type="radio" name="packagingType" value="Standard" checked={formData.packagingType === "Standard"} onChange={(e) => formData.setPackagingType(e.target.value)} className="mr-3 accent-violet-500" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">Standard</span>
              </label>
              <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <input type="radio" name="packagingType" value="Eco-Friendly" checked={formData.packagingType === "Eco-Friendly"} onChange={(e) => formData.setPackagingType(e.target.value)} className="mr-3 accent-green-500" />
                <span className="text-gray-700 font-medium text-sm sm:text-base inline-flex items-center gap-2">Eco-Friendly <Leaf className="w-4 h-4" /></span>
              </label>
            </div>
          </div>
        </div>
      )
    },
    // Step 8 - Review Your Total
    {
      id: "0.8",
      title: "Review Your Total",
      icon: Package,
      color: "green",
      content: (
        <div className="w-full bg-white rounded-xl p-3 sm:p-4 md:p-6 space-y-3 border border-gray-100">
          <div className="flex justify-between items-center"><span className="text-gray-900 text-xs sm:text-sm md:text-base">Frame Cost:</span><span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">${formData.getSelectedSize()?.price || 0}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-900 text-xs sm:text-sm md:text-base">Subscription Cost:</span><span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">{(() => { const selectedPlan = subscriptionPlans.find(plan => plan.name === formData.subscriptionType); if (!selectedPlan || !formData.subscriptionPeriod) return "$0.00"; const price = formData.subscriptionPeriod === 'Yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice; return `$${price}.00`; })()}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-900 text-xs sm:text-sm md:text-base">Delivery Cost:</span><span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">{formData.deliveryType === "Express Delivery" ? "$19.00" : "$9.00"}</span></div>
          <div className="flex justify-between items-center"><span className="text-gray-900 text-xs sm:text-sm md:text-base">Packaging:</span><span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">{formData.packagingType === "Eco-Friendly" ? "+$5.00" : "$0.00"}</span></div>
          <hr className="border-gray-200" />
          <div className="flex justify-between items-center"><span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Total Price</span><span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">${formData.calculateTotal()}</span></div>
          <p className="text-xs text-gray-500 text-center">All tax included.</p>
        </div>
      )
    },
    
    // --- 🗑️ REMOVED --- The old, insecure payment step is gone.

    // --- ✨ ADDED --- New step to inform the user about the secure redirect.
    {
      id: "0.9",
      title: "Secure Payment",
      icon: CreditCard,
      color: "purple",
      content: (
        <div className="w-full text-center p-4 bg-gray-50/80 rounded-xl border border-gray-200/80">
          <p className="text-sm sm:text-base text-gray-700">
            You will be redirected to Stripe's secure gateway to complete your purchase.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Your payment information is encrypted and is never stored on our servers.
          </p>
        </div>
      )
    }
  ];

  // Filter steps based on props
  let steps = allSteps;
  if (showOnlyFirstTwo) {
    steps = allSteps.slice(0, 2);
  } else if (stepFilter) {
    steps = stepFilter.map(index => allSteps[index]).filter(Boolean);
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { badge: string, icon: string }> = {
      blue: { badge: "bg-blue-100 text-blue-700 border-blue-200", icon: "text-blue-600" },
      purple: { badge: "bg-purple-100 text-purple-700 border-purple-200", icon: "text-purple-600" },
      pink: { badge: "bg-pink-100 text-pink-700 border-pink-200", icon: "text-pink-600" },
      orange: { badge: "bg-orange-100 text-orange-700 border-orange-200", icon: "text-orange-600" },
      green: { badge: "bg-green-100 text-green-700 border-green-200", icon: "text-green-600" }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {steps.map((step, index) => {
        const colors = getColorClasses(step.color);
        const IconComponent = step.icon;
        
        return (
          <div
            key={step.id}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border border-gray-100 relative"
            style={{ zIndex: 20 - index }}
          >
            <div className="mb-3 sm:mb-4 md:mb-6">
              <div className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full w-fit mb-3 sm:mb-4 ${colors.badge}`}>
                {step.id}
              </div>
            </div>
            
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
                    {step.title}
                  </h3>
                </div>
                {/* Simplified description rendering */}
                <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-4">
                  {
                    {
                      "0.1": "Choose the size that best fits your space.",
                      "0.2": "Choose from our curated collection of premium frame options.",
                      "0.3": "Want something truly unique? Let us know.",
                      "0.4": "Need multiple Deckoviz frames? We've got you covered.",
                      "0.5": "Choose your plan, which is best for you.",
                      "0.6": "Please ensure your information is accurate to avoid delivery issues.",
                      "0.7": "Choose your options according to your needs.",
                      "0.8": "Review your total cost before proceeding to payment.",
                      "0.9": "Your payment is secure and encrypted."
                    }[step.id]
                  }
                </p>
              </div>
              {step.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};