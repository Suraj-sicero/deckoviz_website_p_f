import React from 'react';

interface FormData {
  selectedFrameSize: string;
  selectedFrameType: string;
  selectedUnits: string;
  subscriptionType: string;
  deliveryType: string;
  packagingType: string;
  getSelectedSize: () => any;
  getSelectedType: () => any;
  calculateTotal: () => number;
}

interface VisualPreviewProps {
  formData: FormData;
}

export const VisualPreview: React.FC<VisualPreviewProps> = ({ formData }) => {
  const { 
    selectedFrameSize, 
    selectedFrameType, 
    selectedUnits, 
    subscriptionType,
    deliveryType,
    packagingType,
    getSelectedSize,
    getSelectedType,
    calculateTotal
  } = formData;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-100/40">
      {/* Minimal Header */}
      <div className="flex-shrink-0 bg-gradient-to-r pt-12 sm:pt-16 md:pt-20 from-gray-100/40 to-gray-50/60 px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200/30">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Your Selection</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Review your configuration</p>
      </div>

      {/* Main Preview Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {/* Large Product Image */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-gray-200/50">
            {getSelectedSize() && (
              <img 
                src={getSelectedSize().image} 
                alt="Product preview" 
                className="w-full h-full object-cover transition-all duration-500"
              />
            )}
            {getSelectedType() && (
              <div className="absolute inset-0 bg-black/20 flex items-end justify-center p-2 sm:p-3 md:p-4">
                <span className="bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium shadow-sm border border-white/20">
                  {getSelectedType().name}
                </span>
              </div>
            )}
            {!getSelectedSize() && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500 px-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs sm:text-sm font-medium">Preview will appear here</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Configuration Summary */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200/40 overflow-hidden">
            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50/50 border-b border-gray-200/30">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Configuration</h4>
            </div>
            
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center py-1 sm:py-1.5">
                <span className="text-gray-600 text-xs sm:text-sm">Size:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm text-right max-w-[60%] break-words">
                  {selectedFrameSize || 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-600 text-xs sm:text-sm">Frame:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm text-right max-w-[60%] break-words">
                  {selectedFrameType || 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-600 text-xs sm:text-sm">Units:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm">
                  {selectedUnits || 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-600 text-xs sm:text-sm">Plan:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm text-right max-w-[60%] break-words">
                  {subscriptionType || 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-600 text-xs sm:text-sm">Delivery:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm text-right max-w-[60%] break-words">
                  {deliveryType}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-600 text-xs sm:text-sm">Packaging:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm">
                  {packagingType}
                </span>
              </div>
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200/40 overflow-hidden">
            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50/50 border-b border-gray-200/30">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Price Breakdown</h4>
            </div>
            
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center py-1 sm:py-1.5">
                <span className="text-gray-700 text-xs sm:text-sm">Frame Cost:</span>
                <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                  ${getSelectedSize()?.price || 0}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-700 text-xs sm:text-sm">Subscription:</span>
                <span className="font-semibold text-gray-900 text-xs sm:text-sm">$9.00</span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-700 text-xs sm:text-sm">Delivery:</span>
                <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                  {deliveryType === "Express Delivery" ? "$19.00" : "$9.00"}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 sm:py-1.5 border-t border-gray-100">
                <span className="text-gray-700 text-xs sm:text-sm">Packaging:</span>
                <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                  {packagingType === "Eco-Friendly" ? "+$5.00" : "$0.00"}
                </span>
              </div>
              
              <div className="border-t-2 border-gray-200 pt-2 sm:pt-3 mt-3 sm:mt-4">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-md p-2 sm:p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-bold text-white">Total:</span>
                    <span className="text-lg sm:text-xl font-bold text-white">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-1 sm:mt-2">All taxes included</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal Footer */}
      <div className="flex-shrink-0 bg-gray-50/60 px-3 sm:px-4 md:px-6 py-2 sm:py-3 border-t border-gray-200/30">
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p className="font-medium">30-day Satisfaction Guarantee</p>
          <p className="hidden sm:block">Free returns • Eco-friendly packaging • 24/7 support</p>
          <p className="sm:hidden">Free returns • 24/7 support</p>
        </div>
      </div>
    </div>
  );
};