import React from "react";

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100 px-6 pt-32 pb-20">

      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-600 text-center mb-14">
        Support Center
      </h1>

      <div className="max-w-5xl mx-auto space-y-12">

        {/* CARD 1 */}
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-purple-200 transition p-10 flex flex-col md:flex-row gap-10 items-center">
          <img src="/images/support-center.jpg" className="w-48 rounded-xl bg-purple-50 p-4" />

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Deckoviz Support Center
            </h2>

            <p className="text-purple-600 font-medium mb-3">
              Help, guidance, and real humans when you need them.
            </p>

            <p className="text-gray-600 mb-3 leading-relaxed">
              Deckoviz is designed to feel effortless, calm, and intuitive.
              Still, whenever you need help, clarity, or a human touch, we are here.
            </p>

            <p className="text-gray-600 leading-relaxed">
              This support center is built for both Deckoviz home users and Deckoviz Enterprise customers, covering setup, usage, troubleshooting, and ongoing support.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-purple-200 transition p-10 flex flex-col md:flex-row gap-10 items-center">
          <img src="/images/reach-us.jpg" className="w-48 rounded-xl bg-purple-50 p-4" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">How to Reach Us</h2>

            <p className="text-gray-600 mb-4">
              If you need direct assistance, the fastest way to reach our team is:
            </p>

            {/* EMAIL HIGHLIGHT */}
            <a
              href="mailto:support@deckoviz.com"
              className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 text-white font-medium hover:scale-105 transition"
            >
              📧 support@deckoviz.com
            </a>

            <p className="text-gray-600 mb-2">
              We aim to respond within <strong className="text-purple-600">24 hours on business days</strong>.
            </p>

            <p className="text-gray-600">
              For enterprise customers, priority support channels may be provided separately as part of your onboarding.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-purple-200 transition p-10 flex flex-col md:flex-row gap-10 items-center">
          <img src="/images/help.jpg" className="w-48 rounded-xl bg-purple-50 p-4" />

          <div>
            <h2 className="text-2xl font-semibold mb-5">What We Can Help You With</h2>

            <ul className="space-y-2 mb-4">
              {[
                "Device setup and installation",
                "App connection and account setup",
                "Art modes, collections, and personalization",
                "Photos, memories, posters, and creative features",
                "Vizzy AI behavior and personalization",
                "Performance or connectivity issues",
                "Software updates and new features",
                "Hardware care and usage guidance",
                "Enterprise configuration, scheduling, and deployments"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-2 w-2 h-2 rounded-full bg-purple-500"></span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-gray-600 mt-4">
              If something feels unclear, unexpected, or simply not right — reach out.
              <br />
              <strong className="text-purple-600">No question is too small.</strong>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
