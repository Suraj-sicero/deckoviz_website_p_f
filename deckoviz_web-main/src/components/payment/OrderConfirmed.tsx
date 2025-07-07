
import { Check, Package, Truck, Mail, Phone, ArrowRight } from 'lucide-react';

const OrderConfirmed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-20">
            
            
            <h1 className="text-5xl md:text-5xl font-light text-gray-900 mt-6 mb-4 tracking-tight">
              Order Confirmed
            </h1>
           
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Welcome to the future of art, space, and self-expression
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            
            {/* Order Details - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-10">
              
              {/* Order Summary */}
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-10">
                  <Package className="w-6 h-6 text-gray-700" />
                  <h2 className="text-2xl font-medium text-gray-900">Order Summary</h2>
                </div>
                
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Order Number</p>
                      <p className="font-mono text-xl font-medium text-gray-900">#DVX-902184</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Order Date</p>
                      <p className="text-xl text-gray-900">December 15, 2024</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-8">
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold text-gray-900 text-lg mb-3">Deckoviz 65" Dynamic Smart Art Frame</p>
                        <p className="text-gray-600">Curved Walnut Wood + Soft Ambient Halo Lights</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-500 mb-1">Quantity</p>
                          <p className="text-gray-900 font-semibold text-lg">1</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Total</p>
                          <p className="text-gray-900 font-semibold text-lg">$1,049.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-10">
                  <Truck className="w-6 h-6 text-gray-700" />
                  <h2 className="text-2xl font-medium text-gray-900">Delivery Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Shipping Address</p>
                    <div className="text-gray-900 space-y-1 text-lg">
                      <p className="font-medium">John Smith</p>
                      <p>123 Design Avenue</p>
                      <p>San Francisco, CA 94102</p>
                      <p>United States</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Estimated Delivery</p>
                      <p className="text-2xl font-semibold text-emerald-600">July 18, 2025</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Contact</p>
                      <p className="text-gray-900 text-lg">yourname@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Next Steps - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Order Status */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-8 border border-emerald-200/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-900 mb-3">Payment Confirmed</h3>
                  <p className="text-emerald-700">Your order is being processed</p>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-8">What happens next</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Email confirmation</p>
                      <p className="text-sm text-gray-600">Sent to your inbox</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Preparation</p>
                      <p className="text-sm text-gray-600">2-3 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Shipping notification</p>
                      <p className="text-sm text-gray-600">With tracking details</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Delivery</p>
                      <p className="text-sm text-gray-600">July 18, 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Need assistance?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">support@deckoviz.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">1-800-DECKOVIZ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspirational Message */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-16 text-center text-white mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
              You've just unlocked your portal into the future
            </h2>
            <p className="text-gray-300 text-xl font-light max-w-4xl mx-auto leading-relaxed mb-8">
              Deckoviz isn't just a frame, it's a living window into your evolving world. 
              Every wall it touches becomes more alive, more YOU.
            </p>
            <p className="text-gray-400 font-light">
              Welcome to the revolution of space and self-expression.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/25"
            >
              <Mail className="w-6 h-6" />
              Check Your Email
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-2xl font-semibold text-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/10"
            >
              <Package className="w-6 h-6" />
              Track Your Order
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;