import React from 'react';
import { RefreshCw, Clock, AlertCircle, Package } from 'lucide-react';

const ReturnPolicy: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-[#f5f6f8] text-[#111827]">
      {/* Enterprise Indigo Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: "rgba(37,99,235,0.08)" }} />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(24,42,74,0.05)" }} />
      </div>
      <div className="container-custom relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-8 mt-4 text-center tracking-tight">
            Return <span className="bg-gradient-to-r from-[#182a4a] to-[#2563EB] bg-clip-text text-transparent">Policy</span>
          </h1>
          
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-gray-500 mb-8 font-medium text-sm text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Return Overview</h2>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                  <div className="flex items-center mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#182a4a]/10 mr-4">
                      <RefreshCw className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Our Return Policy</h3>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    We want you to be completely satisfied with your Deckoviz purchase. If you're not happy with your order, we offer a 30-day return policy for most items.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Return Timeframe</h2>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                  <div className="flex items-center mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#182a4a]/10 mr-4">
                      <Clock className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Return Window</h3>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600 font-medium space-y-2">
                    <li>30 days from the date of delivery</li>
                    <li>Items must be in original condition</li>
                    <li>Original packaging must be included</li>
                    <li>All accessories and documentation must be present</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Return Process</h2>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                  <div className="flex items-center mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#182a4a]/10 mr-4">
                      <Package className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">How to Return</h3>
                  </div>
                  <ol className="list-decimal pl-6 text-gray-600 font-medium space-y-2">
                    <li>Contact our customer service team to initiate a return</li>
                    <li>Receive a return authorization number</li>
                    <li>Package the item securely with all original contents</li>
                    <li>Include the return authorization number in the package</li>
                    <li>Ship the package using a trackable shipping method</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Refund Information</h2>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                  <ul className="list-disc pl-6 text-gray-600 font-medium space-y-2">
                    <li>Refunds will be processed within 5-7 business days</li>
                    <li>Original shipping costs are non-refundable</li>
                    <li>Return shipping costs are the customer's responsibility</li>
                    <li>Refunds will be issued to the original payment method</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Important Notes</h2>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                  <div className="flex items-center mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 mr-4">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Please Note</h3>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600 font-medium space-y-2">
                    <li>Custom or personalized items may not be eligible for return</li>
                    <li>Items must be in new, unused condition</li>
                    <li>Software licenses and digital content are non-refundable</li>
                    <li>Damaged items must be reported within 48 hours of delivery</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 tracking-tight text-[#182a4a]">Contact Us</h2>
                <p className="text-gray-600 font-medium leading-relaxed">
                  For any questions about returns, please contact our customer service team:
                </p>
                <div className="mt-4 p-5 rounded-xl bg-[#182a4a]/5 border border-[#182a4a]/10">
                  <p className="text-gray-700 font-bold tracking-wide">
                    Email: <span className="text-[#2563EB] font-medium">returns@deckoviz.com</span><br />
                    Phone: <span className="text-[#2563EB] font-medium">+1 (555) 123-4567</span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy; 