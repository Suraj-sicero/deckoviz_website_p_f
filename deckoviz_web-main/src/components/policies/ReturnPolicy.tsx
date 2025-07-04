import React from 'react';
import { RefreshCw, Clock, AlertCircle, Package } from 'lucide-react';

const ReturnPolicy: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Return <span className="text-primary-600">Policy</span>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Return Overview</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <RefreshCw className="w-6 h-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-medium">Our Return Policy</h3>
                  </div>
                  <p className="text-gray-600">
                    We want you to be completely satisfied with your Deckoviz purchase. If you're not happy with your order, we offer a 30-day return policy for most items.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Return Timeframe</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Clock className="w-6 h-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-medium">Return Window</h3>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>30 days from the date of delivery</li>
                    <li>Items must be in original condition</li>
                    <li>Original packaging must be included</li>
                    <li>All accessories and documentation must be present</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Package className="w-6 h-6 text-primary-600 mr-3" />
                    <h3 className="text-xl font-medium">How to Return</h3>
                  </div>
                  <ol className="list-decimal pl-6 text-gray-600">
                    <li>Contact our customer service team to initiate a return</li>
                    <li>Receive a return authorization number</li>
                    <li>Package the item securely with all original contents</li>
                    <li>Include the return authorization number in the package</li>
                    <li>Ship the package using a trackable shipping method</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Refund Information</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>Refunds will be processed within 5-7 business days</li>
                    <li>Original shipping costs are non-refundable</li>
                    <li>Return shipping costs are the customer's responsibility</li>
                    <li>Refunds will be issued to the original payment method</li>
                  </ul>
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
                    <li>Custom or personalized items may not be eligible for return</li>
                    <li>Items must be in new, unused condition</li>
                    <li>Software licenses and digital content are non-refundable</li>
                    <li>Damaged items must be reported within 48 hours of delivery</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  For any questions about returns, please contact our customer service team:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Email: returns@deckoviz.com<br />
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

export default ReturnPolicy; 