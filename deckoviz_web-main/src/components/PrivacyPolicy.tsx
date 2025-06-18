import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Privacy <span className="text-primary-600">Policy</span>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-gray-600">
                  At Deckoviz, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered art and space enhancement frame and related services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">2.1 Personal Information</h3>
                  <p className="text-gray-600">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>Register for an account</li>
                    <li>Place an order</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact our support team</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Provide and maintain our services</li>
                  <li>Process your orders and payments</li>
                  <li>Send you updates and marketing communications</li>
                  <li>Improve our products and services</li>
                  <li>Respond to your inquiries and support requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="text-gray-600">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Email: privacy@deckoviz.com<br />
                    Address: 123 Innovation Street, Tech Valley, CA 94043
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

export default PrivacyPolicy; 