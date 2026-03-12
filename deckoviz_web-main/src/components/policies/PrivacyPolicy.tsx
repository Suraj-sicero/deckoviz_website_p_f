import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 px-4 bg-gradient-to-br from-pink-500 via-purple-600 to-fuchsia-600 overflow-hidden">

      {/* LOCK PATTERN */}
      <div className="absolute inset-0 pointer-events-none z-0 grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-6 opacity-20 text-white text-xl sm:text-2xl lg:text-3xl">
        {Array.from({ length: 220 }).map((_, i) => (
          <span key={i} className="flex justify-center">🔐</span>
        ))}
      </div>

      {/* GLOW BLOBS */}
      <div className="absolute -top-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-pink-400 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-400 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto">
        <div className="relative z-10 bg-white/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-10 lg:p-16">

          {/* CENTER LOCK */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="text-[120px] sm:text-[220px] lg:text-[320px]">🔐</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Privacy <span className="text-primary-600">Policy</span>
          </h1>

          <div className="relative z-10 max-w-none text-left sm:text-justify text-[15px] sm:text-[16px] leading-relaxed space-y-8">

            <p>Last updated: 31st Jan., 2026</p>

            <p>
              Deckoviz (“Deckoviz”, “we”, “us”, or “our”) is committed to protecting your privacy and handling your data with care, transparency, and respect. This Privacy Policy explains how we collect, use, store, share, and protect your information when you use our website, mobile applications, hardware products, software services, and related offerings (collectively, the “Services”).
            </p>

            <p>
              By accessing or using Deckoviz, you agree to the practices described in this Privacy Policy.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-4">1. Information We Collect</h2>

            <p>
              We collect information to provide, improve, and personalize our Services. The types of information we collect depend on how you interact with Deckoviz.
            </p>

            <h3 className="text-lg font-semibold pt-4">1.1 Information You Provide Directly</h3>

            <p>You may provide us with information such as:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Uploaded content such as images, artwork, preferences, prompts, or descriptions</li>
              <li>Messages, feedback, or support requests</li>
              <li>Billing and transaction information (processed via third-party payment providers)</li>
            </ul>

            <p>For enterprise or business users, this may also include:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Business name and contact details</li>
              <li>Authorized user accounts</li>
              <li>Configuration preferences and branding assets</li>
            </ul>

            <h3 className="text-lg font-semibold pt-4">1.2 Information Collected Automatically</h3>

            <p>When you use our Services, we may automatically collect:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (device type, operating system, app version)</li>
              <li>Log data (IP address, timestamps, usage events, crash logs)</li>
              <li>Interaction data (features used, settings chosen, performance metrics)</li>
              <li>Approximate location information derived from IP address</li>
            </ul>

            <p>
              We do not collect precise GPS location unless explicitly required for a specific feature and clearly disclosed at the time of collection.
            </p>

            <h3 className="text-lg font-semibold pt-4">1.3 Content and Creative Data</h3>

            <p>
              Deckoviz allows users to create, upload, display, and generate visual content. This may include:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Images and media you upload</li>
              <li>AI-generated artwork or visuals created at your request</li>
              <li>Prompts, descriptions, and preferences associated with content creation</li>
            </ul>

            <p>
              This content remains yours. We do not claim ownership over user-generated content.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">2. How We Use Your Information</h2>

            <p>We use information for the following purposes:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and operate the Services</li>
              <li>To personalize content, experiences, and recommendations</li>
              <li>To enable creative, generative, and interactive features</li>
              <li>To process transactions and manage subscriptions</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To improve performance, reliability, and security</li>
              <li>To develop new features and products</li>
              <li>To comply with legal obligations</li>
            </ul>

            <p>We do not sell your personal data.</p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">3. AI and Automated Processing</h2>

            <p>
              Deckoviz uses artificial intelligence and automated systems to power creative, personalization, and assistance features.
            </p>

            <p>This may include:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Generating artwork, visuals, or prompts</li>
              <li>Adapting experiences based on preferences</li>
              <li>Providing recommendations or assistance</li>
            </ul>

            <p>
              AI processing occurs only to deliver the requested functionality. We do not use AI to make legal, medical, financial, or other high-risk decisions about you.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">4. Data Sharing and Disclosure</h2>

            <p>We share information only when necessary and under strict controls.</p>

            <h3 className="text-lg font-semibold pt-4">4.1 Service Providers</h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Cloud hosting and infrastructure providers</li>
              <li>Payment processors</li>
              <li>Analytics and performance monitoring tools</li>
              <li>Customer support platforms</li>
            </ul>

            <p>
              These providers are contractually required to protect your data and use it only for authorized purposes.
            </p>

            <h3 className="text-lg font-semibold pt-4">4.2 Legal and Safety Requirements</h3>

            <p>We may disclose information if required to do so by law, regulation, or legal process, or if necessary to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Protect the rights, safety, or property of Deckoviz, users, or others</li>
              <li>Prevent fraud, abuse, or security threats</li>
            </ul>

            <h3 className="text-lg font-semibold pt-4">4.3 Business Transfers</h3>

            <p>
              If Deckoviz is involved in a merger, acquisition, restructuring, or sale of assets, your information may be transferred as part of that transaction, subject to continued protection under this Privacy Policy.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">5. Data Retention</h2>

            <p>We retain personal information only as long as necessary to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Provide the Services</li>
              <li>Fulfill the purposes described in this Policy</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>

            <p>
              You may request deletion of your account and associated data, subject to applicable laws and legitimate business needs.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">6. Data Security</h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption in transit and at rest where appropriate</li>
              <li>Access controls and authentication</li>
              <li>Secure infrastructure and monitoring</li>
            </ul>

            <p>
              No system is 100% secure, but we take data protection seriously and continuously improve our safeguards.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">7. Your Rights and Choices</h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Accessing your personal data</li>
              <li>Correcting inaccurate information</li>
              <li>Requesting deletion of your data</li>
              <li>Objecting to or restricting certain processing</li>
              <li>Withdrawing consent where applicable</li>
            </ul>

            <p>You can exercise these rights by contacting us at privacy@deckoviz.com.</p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">8. Children’s Privacy</h2>

            <p>
              Deckoviz is not intended for children under the age of 13 (or the minimum age required by local law). We do not knowingly collect personal data from children.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">9. International Data Transfers</h2>

            <p>
              Deckoviz may operate and store data in multiple countries. When we transfer data internationally, we take steps to ensure appropriate safeguards.
            </p>

            <h3 className="text-lg font-semibold pt-4">9.1 GDPR, UK GDPR, and CCPA Compliance</h3>

            <p>
              This section applies to users located in the European Economic Area (EEA), the United Kingdom, California, and other jurisdictions with similar data protection laws.
            </p>

            <h3 className="text-lg font-semibold pt-4">9.2 Legal Bases for Processing (GDPR / UK GDPR)</h3>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Performance of a contract</strong></li>
              <li><strong>Legitimate interests</strong></li>
              <li><strong>Consent</strong></li>
              <li><strong>Legal obligations</strong></li>
            </ul>

            <h3 className="text-lg font-semibold pt-4">9.3 Your Rights Under GDPR and UK GDPR</h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <p>You also have the right to lodge a complaint with your local data protection authority.</p>

            <h3 className="text-lg font-semibold pt-4">9.4 Your Rights Under the California Consumer Privacy Act (CCPA)</h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Know what personal information we collect</li>
              <li>Request access</li>
              <li>Request deletion</li>
              <li>Opt out of the sale of personal information</li>
            </ul>

            <p>Deckoviz does not sell personal information.</p>

            <p>We will not discriminate against you for exercising your rights.</p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">10. Changes to This Privacy Policy</h2>

            <p>
              We may update this Privacy Policy from time to time. Continued use of the Services constitutes acceptance.
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold pt-6">Contact Us</h2>

            <p>
              Deckoviz<br />
              Email: privacy@deckoviz.com<br />
              Website: https://www.deckoviz.com
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;