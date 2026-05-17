import React from "react";

const Support: React.FC = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden px-6 pt-32 pb-20"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Soft blue blobs so frosted glass cards are clearly visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
        <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
        <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
        <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
        <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.15)" }} />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-center mb-14 pb-2">
        Support Center
      </h1>

      <div className="max-w-5xl mx-auto space-y-12">

        {/* CARD 1 */}
        <div
          className="group rounded-3xl shadow-lg transition-all duration-300 p-10 flex flex-col md:flex-row gap-10 items-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.40)",
            borderTop: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.12), inset 0 1px 0 rgba(255,255,255,0.7)"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)"}
        >
          <img src="/images/support-center.jpg" className="w-48 rounded-xl bg-blue-50 p-4" />

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Deckoviz Support Center
            </h2>

            <p className="font-medium mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
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
        <div
          className="group rounded-3xl shadow-lg transition-all duration-300 p-10 flex flex-col md:flex-row gap-10 items-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.40)",
            borderTop: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.12), inset 0 1px 0 rgba(255,255,255,0.7)"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)"}
        >
          <img src="/images/reach-us.jpg" className="w-48 rounded-xl bg-blue-50 p-4" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">How to Reach Us</h2>

            <p className="text-gray-600 mb-4">
              If you need direct assistance, the fastest way to reach our team is:
            </p>

            {/* EMAIL HIGHLIGHT */}
            <a
              href="mailto:support@deckoviz.com"
              className="inline-block mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white font-medium hover:scale-105 transition shadow-md shadow-blue-500/20"
            >
              📧 support@deckoviz.com
            </a>

            <p className="text-gray-600 mb-2">
              We aim to respond within <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">24 hours on business days</strong>.
            </p>

            <p className="text-gray-600">
              For enterprise customers, priority support channels may be provided separately as part of your onboarding.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div
          className="group rounded-3xl shadow-lg transition-all duration-300 p-10 flex flex-col md:flex-row gap-10 items-center"
          style={{
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.40)",
            borderTop: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(37,99,235,0.35), 0 4px 20px rgba(24,42,74,0.12), inset 0 1px 0 rgba(255,255,255,0.7)"}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)"}
        >
          <img src="/images/help.jpg" className="w-48 rounded-xl bg-blue-50 p-4" />

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
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2563EB]"></span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-gray-600 mt-4">
              If something feels unclear, unexpected, or simply not right   reach out.
              <br />
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] to-[#2563EB]">No question is too small.</strong>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
