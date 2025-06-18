import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Terms of <span className="text-primary-600">Service</span>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600">
                  By accessing or using Deckoviz's products and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Our services are designed for personal and commercial use, subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>You must be at least 18 years old to use our services</li>
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining the security of your account</li>
                    <li>You agree not to misuse or attempt to manipulate our services</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
                <p className="text-gray-600">
                  All content, features, and functionality of our services, including but not limited to text, graphics, logos, images, and software, are the exclusive property of Deckoviz and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
                <p className="text-gray-600">
                  By using our services, you retain ownership of any content you create or upload. However, you grant Deckoviz a worldwide, non-exclusive license to use, reproduce, and display your content in connection with providing and improving our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    For paid services:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>All payments are processed securely through our payment providers</li>
                    <li>Prices are subject to change with notice</li>
                    <li>Subscriptions will automatically renew unless cancelled</li>
                    <li>Refunds are subject to our refund policy</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-600">
                  Deckoviz shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Email: legal@deckoviz.com<br />
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

export default TermsOfService; 