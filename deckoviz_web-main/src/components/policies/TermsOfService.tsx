import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-pink-500 via-purple-600 to-fuchsia-600 overflow-hidden">

      {/* Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-6 opacity-20 text-white text-xl sm:text-2xl lg:text-3xl">
        {Array.from({ length: 200 }).map((_, i) => (
          <span key={i} className="flex justify-center">📃</span>
        ))}
      </div>

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-pink-400 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-400 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto">
        <div className="relative bg-white/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-10 lg:p-14">

          {/* Center lock */}
          <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
            <span className="text-[120px] sm:text-[220px] lg:text-[300px]">🔐</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Terms of <span className="text-primary-600">Service</span>
          </h1>

          <div className="relative z-10 text-left sm:text-justify leading-relaxed space-y-8 text-[15px] sm:text-[16px]">

            <p><strong>Last updated:</strong> 31st January, 2026</p>

            <p>
              These Terms of Service (“Terms”) govern your access to and use of
              Deckoviz’s website, applications, hardware products, software, and
              services (collectively, the “Services”).
            </p>

            <p>
              By accessing or using Deckoviz, you agree to these Terms. If you
              do not agree, do not use the Services.
            </p>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">1. Who Can Use Deckoviz</h2>
              <p>
                You must be at least 13 years old, or the minimum age required by
                law in your jurisdiction, to use Deckoviz.
              </p>
              <p>
                If you are using Deckoviz on behalf of a company or organization,
                you represent that you have authority to bind that entity to these
                Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">2. Accounts and Access</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activity that occurs under your account</li>
                <li>Providing accurate and up-to-date information</li>
              </ul>
              <p>
                Deckoviz may suspend or terminate accounts that violate these
                Terms or pose security or legal risks.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">3. Use of the Services</h2>
              <p>
                You agree to use Deckoviz only for lawful purposes and in
                accordance with these Terms.
              </p>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Misuse the Services</li>
                <li>Attempt to access systems or data without authorization</li>
                <li>Interfere with or disrupt the Services</li>
                <li>Reverse engineer, copy, or resell the Services without permission</li>
                <li>Use the Services to generate or distribute illegal or harmful content</li>
              </ul>
              <p>
                Enterprise users may use the Services internally and commercially,
                subject to any additional agreements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">4. User Content</h2>
              <p>
                You retain ownership of any content you upload, create, or
                generate through Deckoviz.
              </p>
              <p>
                By using the Services, you grant Deckoviz a limited, non-exclusive
                license to process and display your content solely for the purpose
                of providing the Services.
              </p>
              <p>We do not claim ownership over your content.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">5. AI and Generated Content</h2>
              <p>Deckoviz may generate content using AI systems at your request.</p>
              <p>Generated content:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Is provided “as is”</li>
                <li>May vary in output and quality</li>
                <li>Should be reviewed before commercial or critical use</li>
              </ul>
              <p>You are responsible for how you use generated content.</p>
              <p>
                Deckoviz does not guarantee that AI-generated content is
                error-free, unique, or suitable for any specific purpose.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">6. Payments, Subscriptions, and Hardware</h2>
              <p>Certain Services require payment.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prices and billing terms will be disclosed before purchase</li>
                <li>Payments are processed through third-party providers</li>
                <li>Hardware products may have separate warranty and return terms</li>
              </ul>
              <p>
                Failure to pay may result in suspension or termination of access.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">7. Intellectual Property</h2>
              <p>
                All Deckoviz software, designs, trademarks, and branding are owned
                by Deckoviz or its licensors.
              </p>
              <p>
                You may not use Deckoviz intellectual property except as permitted
                under these Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">8. Enterprise Use</h2>
              <p>
                Enterprise customers may be subject to additional terms,
                service-level agreements, or contracts.
              </p>
              <p>In the event of a conflict, those agreements take precedence.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">9. Disclaimers</h2>
              <p>
                The Services are provided on an “as is” and “as available” basis.
              </p>
              <p>
                To the maximum extent permitted by law, Deckoviz disclaims all
                warranties, including implied warranties of merchantability,
                fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">10. Limitation of Liability</h2>
              <p>
                Deckoviz will not be liable for indirect, incidental,
                consequential, or special damages.
              </p>
              <p>
                Our total liability will not exceed the amount you paid to
                Deckoviz in the 12 months preceding the claim.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold Deckoviz harmless from claims
                arising out of:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of the Services</li>
                <li>Your content</li>
                <li>Your violation of these Terms</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">12. Termination</h2>
              <p>You may stop using Deckoviz at any time.</p>
              <p>
                We may suspend or terminate access if you violate these Terms or
                if required by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">13. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the United Kingdom,
                without regard to conflict-of-law principles, unless otherwise
                required by local law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">14. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. Continued use of the
                Services after updates constitutes acceptance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">15. Contact</h2>
              <p>If you have questions about these Terms, contact us at:</p>
              <p>
                legal@deckoviz.com <br />
                https://www.deckoviz.com
              </p>
            </section>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;