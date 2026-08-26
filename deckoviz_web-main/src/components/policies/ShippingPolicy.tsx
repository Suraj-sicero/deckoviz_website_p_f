import React from 'react';
import { Truck, Clock, MapPin, AlertCircle } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
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
            Shipping <span className="bg-gradient-to-r from-[#182a4a] to-[#2563EB] bg-clip-text text-transparent">Policy</span>
          </h1>
          
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-gray-500 mb-8 font-medium text-sm text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                    <div className="flex items-center mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#182a4a]/10 mr-4">
                        <Truck className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Shipping Times</h3>
                    </div>
                    <ul className="list-disc pl-6 text-gray-600 font-medium space-y-1">
                      <li>Standard Shipping: 14 business days</li>
                      <li>Express Shipping: 7 business days</li>
                      <li>Custom order: Adds ~5-7 more business days to the shipping time</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                    <div className="flex items-center mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#182a4a]/10 mr-4">
                        <Clock className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Processing Time</h3>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      Orders are typically processed within 1-2 business days after payment confirmation.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Shipping Rates</h2>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                  <ul className="list-disc pl-6 text-gray-600 font-medium space-y-2">
                    <li>Standard shipping starts from: $39.99</li>
                    <li>Express shipping starts from: $79.99</li>
                    <li>Free shipping on orders over $1,299</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-5 tracking-tight text-[#182a4a]">Shipping Areas</h2>
                <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all">
                  <div className="flex items-center mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#182a4a]/10 mr-4">
                      <MapPin className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">We Ship To</h3>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    We currently ship to the US, the UK, EU, the UAE, India, Japan, Australia, New Zealand, Canada, and other select international locations. Please contact us for specific shipping availability.
                  </p>
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
                    <li>Delivery times may vary during peak seasons</li>
                    <li>International orders may be subject to customs fees</li>
                    <li>Some remote locations may have additional shipping charges</li>
                    <li>Orders placed after 2 PM EST will be processed the next business day</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 tracking-tight text-[#182a4a]">Tracking Your Order</h2>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Once your order ships, you will receive a tracking number via email. You can track your package's status through our website or the carrier's tracking system.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 tracking-tight text-[#182a4a]">Contact Us</h2>
                <p className="text-gray-600 font-medium leading-relaxed">
                  For any questions about shipping, please contact our customer service team:
                </p>
                <div className="mt-4 p-5 rounded-xl bg-[#182a4a]/5 border border-[#182a4a]/10">
                  <p className="text-gray-700 font-bold tracking-wide">
                    Email: <span className="text-[#2563EB] font-medium">shipping@deckoviz.com</span><br />
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

export default ShippingPolicy; 