import React from 'react';
import { Truck, Clock, MapPin, AlertCircle } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Shipping <span className="text-primary-600">Policy</span>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Truck className="w-6 h-6 text-primary-600 mr-3" />
                      <h3 className="text-xl font-medium">Shipping Methods</h3>
                    </div>
                    <ul className="list-disc pl-6 text-gray-600">
                      <li>Standard Shipping (3-5 business days)</li>
                      <li>Express Shipping (1-2 business days)</li>
                      <li>International Shipping (5-10 business days)</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-primary-600 mr-3" />
                      <h3 className="text-xl font-medium">Processing Time</h3>
                    </div>
                    <p className="text-gray-600">
                      Orders are typically processed within 1-2 business days after payment confirmation.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Shipping Rates</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>Standard Shipping: $9.99</li>
                    <li>Express Shipping: $19.99</li>
                    <li>International Shipping: $29.99</li>
                    <li>Free shipping on orders over $299</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Shipping Areas</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-6 h-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-medium">We Ship To</h3>
                  </div>
                  <p className="text-gray-600">
                    We currently ship to all 50 US states and select international locations. Please contact us for specific international shipping availability.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="w-6 h-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-medium">Please Note</h3>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>Delivery times may vary during peak seasons</li>
                    <li>International orders may be subject to customs fees</li>
                    <li>Some remote locations may have additional shipping charges</li>
                    <li>Orders placed after 2 PM EST will be processed the next business day</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
                <p className="text-gray-600">
                  Once your order ships, you will receive a tracking number via email. You can track your package's status through our website or the carrier's tracking system.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  For any questions about shipping, please contact our customer service team:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Email: shipping@deckoviz.com<br />
                    Phone: +1 (555) 123-4567
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