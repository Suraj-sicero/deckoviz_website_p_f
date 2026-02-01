import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-pink-500 via-purple-600 to-fuchsia-600 overflow-hidden">
      {/* Lock Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 grid grid-cols-12 gap-8 opacity-20 text-white text-3xl">
        {Array.from({ length: 400 }).map((_, i) => (
          <span key={i} className="flex justify-center">
            📃
          </span>
        ))}
      </div>

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-40" />

      <div className="container-custom relative z-10">
        <div className="relative max-w-5xl mx-auto bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl p-14 border border-white/40">
          {/* Big Lock */}
          <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
            <span className="text-[300px]">🔐</span>
          </div>

          <h1 className="text-4xl font-bold mb-8 text-center">
            Terms of <span className="text-primary-600">Service</span>
          </h1>

          <div className="prose prose-lg max-w-none relative z-10 text-justify">
            <p>
              <strong>Last updated:</strong> 31st January, 2026
            </p>
            <p>
              These Terms of Service (“Terms”) govern your access to and use of
              Deckoviz’s website, applications, hardware products, software, and
              services (collectively, the “Services”).
            </p>
            <p>
              By accessing or using Deckoviz, you agree to these Terms. If you
              do not agree, do not use the Services.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>1. Who Can Use Deckoviz</h2>
            <p>
              You must be at least 13 years old, or the minimum age required by
              law in your jurisdiction, to use Deckoviz.
            </p>
            <p>
              If you are using Deckoviz on behalf of a company or organization,
              you represent that you have authority to bind that entity to these
              Terms.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>2. Accounts and Access</h2>
            <p>You are responsible for:</p>
            <ul>
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activity that occurs under your account</li>
              <li>Providing accurate and up-to-date information</li>
            </ul>
            <p>
              Deckoviz may suspend or terminate accounts that violate these
              Terms or pose security or legal risks.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>3. Use of the Services</h2>
            <p>
              You agree to use Deckoviz only for lawful purposes and in
              accordance with these Terms.
            </p>
            <p>You may not:</p>
            <ul>
              <li>° Misuse the Services</li>
              <li>° Attempt to access systems or data without authorization</li>
              <li>° Interfere with or disrupt the Services</li>
              <li>
                ° Reverse engineer, copy, or resell the Services without
                permission
              </li>
              <li>
                ° Use the Services to generate or distribute illegal or harmful
                content
              </li>
            </ul>
            <p>
              Enterprise users may use the Services internally and commercially,
              subject to any additional agreements.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>4. User Content</h2>
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
            <br />
            <br /> <br />
            <br />
            <h2>5. AI and Generated Content</h2>
            <p>
              Deckoviz may generate content using AI systems at your request.
            </p>
            <p>Generated content:</p>
            <ul>
              <li>Is provided “as is”</li>
              <li>May vary in output and quality</li>
              <li>Should be reviewed before commercial or critical use</li>
            </ul>
            <p>You are responsible for how you use generated content.</p>
            <p>
              Deckoviz does not guarantee that AI-generated content is
              error-free, unique, or suitable for any specific purpose.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>6. Payments, Subscriptions, and Hardware</h2>
            <p>Certain Services require payment.</p>
            <ul>
              <li>
                Prices and billing terms will be disclosed before purchase
              </li>
              <li>Payments are processed through third-party providers</li>
              <li>
                Hardware products may have separate warranty and return terms
              </li>
            </ul>
            <p>
              Failure to pay may result in suspension or termination of access.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>7. Intellectual Property</h2>
            <p>
              All Deckoviz software, designs, trademarks, and branding are owned
              by Deckoviz or its licensors.
            </p>
            <p>
              You may not use Deckoviz intellectual property except as permitted
              under these Terms.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>8. Enterprise Use</h2>
            <p>
              Enterprise customers may be subject to additional terms,
              service-level agreements, or contracts.
            </p>
            <p>In the event of a conflict, those agreements take precedence.</p>
            <br />
            <br /> <br />
            <br />
            <h2>9. Disclaimers</h2>
            <p>
              The Services are provided on an “as is” and “as available” basis.
            </p>
            <p>
              To the maximum extent permitted by law, Deckoviz disclaims all
              warranties, including implied warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>10. Limitation of Liability</h2>
            <p>
              Deckoviz will not be liable for indirect, incidental,
              consequential, or special damages.
            </p>
            <p>
              Our total liability will not exceed the amount you paid to
              Deckoviz in the 12 months preceding the claim.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify and hold Deckoviz harmless from claims
              arising out of:
            </p>
            <ul>
              <li>Your use of the Services</li>
              <li>Your content</li>
              <li>Your violation of these Terms</li>
            </ul>
            <br />
            <br /> <br />
            <br />
            <h2>12. Termination</h2>
            <p>You may stop using Deckoviz at any time.</p>
            <p>
              We may suspend or terminate access if you violate these Terms or
              if required by law.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the United Kingdom,
              without regard to conflict-of-law principles, unless otherwise
              required by local law.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>14. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              Services after updates constitutes acceptance.
            </p>
            <br />
            <br /> <br />
            <br />
            <h2>15. Contact</h2>
            <p>If you have questions about these Terms, contact us at:</p>
            <br />
            <br />
            <p>
              legal@deckoviz.com
              <br />
              https://www.deckoviz.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
