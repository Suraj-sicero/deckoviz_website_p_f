import { Check, Mail, Phone, ArrowRight, Building2, Calendar, FileText, Clock, CheckCircle2 } from 'lucide-react';

const BulkConfirm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-emerald-100/20 to-purple-100/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            {/* Success Icon */}
            <div className="w-16 h-16 mt-7 sm:w-20 sm:h-20 md:w-14 md:h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
              <Check className="w-8 h-8 sm:w-8 sm:h-8 md:w-8 md:h-8 text-white" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">
              Thank You, Your Bulk Order Request Has Been Received!
            </h1>
           
            <p className="text-lg sm:text-xl md:text-xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed px-4">
              Your inquiry is now with our specialized bulk solutions team.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-12 md:mb-16">
            
            {/* Request Details - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8 md:space-y-10">
              
              {/* Confirmation Message */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
                  <FileText className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Request Confirmation</h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200/50">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      We've received your bulk order inquiry and our team is reviewing your details. You'll hear from us within the next 
                      <span className="font-semibold text-emerald-700"> 24–48 hours</span> to finalize your quote and guide you through the next steps.
                    </p>
                    
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We're thrilled that you've chosen to bring the magic of 
                      <span className="font-semibold text-purple-600"> Deckoviz</span> to your space — and we're excited to help you craft a powerful visual experience across your environments.
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-6 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-medium text-gray-600">Response Time</p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">24-48 Hours</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-medium text-gray-600">Request Type</p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">Bulk Order</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
                  <Clock className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">What Happens Next</h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-sm sm:text-base">1</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">A Deckoviz representative will get in touch with you shortly</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Our specialized bulk solutions team will review your requirements and contact you within 24-48 hours to discuss your project in detail.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-sm sm:text-base">2</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">You'll receive a personalized proposal</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Including detailed pricing, shipping timelines, customization options, and recommendations specifically tailored to your use case and requirements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-sm sm:text-base">3</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Upon confirmation, we'll initiate everything</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Production scheduling, any requested customization work, quality assurance, and comprehensive logistics coordination for your bulk delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status & Contact - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              
              {/* Request Status */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-200/50">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-900 mb-2 sm:mb-3">Request Received</h3>
                  <p className="text-sm sm:text-base text-emerald-700 font-medium">Our team is reviewing your inquiry!</p>
                </div>
              </div>

              {/* Priority Contact */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-8">Priority Support</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 sm:p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Need to make a change or want to talk to someone now?</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                          <a href="mailto:orders@deckoviz.com" className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            orders@deckoviz.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                          <a href="tel:+44-XXXXXXXXXX" className="text-sm sm:text-base text-green-600 hover:text-green-700 font-medium transition-colors">
                            +44-XXXXXXXXXX
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Benefits */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Your Bulk Order Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm sm:text-base text-gray-700">Exclusive volume pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm sm:text-base text-gray-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm sm:text-base text-gray-700">Custom installation support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm sm:text-base text-gray-700">Priority shipping & handling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspirational Message */}
          <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center text-white mb-8 sm:mb-12 md:mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-blue-600/20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight">
                Welcome to the Future of <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dynamic Spaces.</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-lg font-light max-w-5xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
                You're about to transform your environment with the world's most advanced AI-powered art system. 
                Every space will become more engaging, more alive, and more inspiring than ever before.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light">
                Thank you for choosing Deckoviz for your bulk transformation project.
              </p>
            </div>
          </div>

         {/* Action Buttons */}
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
  <button
    type="button"
    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-md"
  >
    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
    Check Your Email
    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
  </button>

  <button
    type="button"
    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-white text-gray-900 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 hover:shadow-md"
  >
    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
    View Enterprise Solutions
    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
  </button>
</div>




        </div>
      </div>
    </div>
  );
};

export default BulkConfirm;