import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sitemap: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50">
      <div className="w-full px-6 xl:px-12 2xl:px-20">
        {/* Header */}
        <div className="relative mb-14">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-indigo-200/30"></div>

          <h1
            className="
      relative z-10
      text-5xl md:text-6xl
      font-extrabold
      text-center
      bg-clip-text text-transparent
      bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600
    "
          >
            Site Map
          </h1>

          {/* ✅ Description (like the screenshot) */}
          <div className="relative z-15 max-w-5xl mx-auto mt-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl px-8 py-7">
              <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed text-justify">
                Welcome to the{" "}
                <span className="font-semibold text-gray-900">
                  Deckoviz Sitemap
                </span>{" "}
                — your treasure map to all the good stuff. Think of this as your
                behind-the-scenes guide, minus the dusty corridors. Whether
                you’re hunting for product deep dives, enterprise insights,
                creative tools, or that one page you swear you saw last week,
                this sitemap has your back.
                <br />
                <br />
                It’s the calm, organized friend who always knows where
                everything is, so you can skip the wandering and get straight to
                what inspires you. Dive in — every click here leads somewhere
                worth exploring.
              </p>
            </div>
          </div>
        </div>

        {/* FIRST ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-16">
          {/* PRODUCT */}
          <SitemapBox title="Product" emoji="🖼️">
            <BoxSection title="Product Overview">
              <li>Hardware & Specs</li>
              <li>Setup Guide</li>
              <li>AI-Powered Art</li>
              <li>Mood-Based Creation</li>
              <li>Personal Photo Transformations</li>
              <li>Story & Memory Visuals</li>
              <li>Ambient & Meditation Modes</li>
              <li>Marketplace (Sell & Buy)</li>
              <li>Multi-User & Business Use Cases</li>
            </BoxSection>

            <BoxSection title="Use Case Hubs">
              <li>For Homes</li>
              <li>For Offices</li>
              <li>For Cafes / Restaurants</li>
              <li>For Therapy & Wellness Spaces</li>
              <li>For Schools / Education</li>
            </BoxSection>
          </SitemapBox>

          {/* SUPPORT */}
<SitemapBox title="Support" emoji="🛠️" to="/FAQ">
  <BoxSection title="FAQ" to="/FAQ">

              <li>General Questions</li>
              <li>Technical Support</li>
              <li>Billing Questions</li>
              <li>Troubleshooting</li>
            </BoxSection>

            <BoxSection title="Installation Guide">
              <li>Unboxing</li>
              <li>Wall Mounting</li>
              <li>Initial Setup</li>
              <li>Network Connection</li>
            </BoxSection>

            <BoxSection title="User Manual">
              <li>Getting Started</li>
              <li>Feature Guide</li>
              <li>Settings Configuration</li>
              <li>Maintenance Tips</li>
            </BoxSection>

            <BoxSection title="Troubleshooting">
              <li>Common Issues</li>
              <li>Error Codes</li>
              <li>Reset Instructions</li>
              <li>Performance Optimization</li>
            </BoxSection>
          </SitemapBox>


          {/* HOME */}
          <SitemapBox title="Home" emoji="🏠" to="/AboutDeckoviz">
            <SimpleItem>Hero Header Section</SimpleItem>
            <SimpleItem>Key Features & Capabilities</SimpleItem>
            <SimpleItem>Testimonials Preview</SimpleItem>
            <SimpleItem>Call to Action (CTA)</SimpleItem>
          </SitemapBox>

          {/* LEGAL */}
          <SitemapBox title="Legal" emoji="⚖️" to="/PrivacyPolicy">
              <BoxSection title="Privacy Policy" to="/PrivacyPolicy" />
              <BoxSection title="Terms of Service" to="/TermsOfService" />
            <SimpleItem>Cookie Policy</SimpleItem>
            <SimpleItem>Community Guidelines</SimpleItem>
            <SimpleItem>Accessibility Statement</SimpleItem>
            <BoxSection title="Return Policy" to="/ReturnPolicy" />
  <BoxSection title="Shipping Policy" to="/ShippingPolicy" />
</SitemapBox>


          {/* BLOG & RESOURCES */}
          <SitemapBox title="Blog & Resources" emoji="📝" to="/Blog">
            <BoxSection title="Navbar" />

            <BoxSection title="All Blog Posts">
              <li>Latest Posts</li>
              <li>Art & Technology</li>
              <li>Smart Home Integration</li>
              <li>Customer Stories</li>
            </BoxSection>

            <BoxSection title="Blog Categories">
              <li>Product Tips & Features</li>
              <li>Artist Spotlights</li>
              <li>Inspiration & Interiors</li>
              <li>Tech + Art Innovations</li>
            </BoxSection>

            <SimpleItem>Open Blog View (Individual Post)</SimpleItem>

            <BoxSection title="Guides & Resources">
              <li>Setup Help</li>
              <li>Art Transformation Guides</li>
              <li>Artist Resource Kits</li>
              <li>Meditation Visuals Help</li>
            </BoxSection>
          </SitemapBox>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-16">
          {/* ORDER */}
<SitemapBox title="Order" emoji="🛒" to="/Pricing">

            <SimpleItem>Navbar</SimpleItem>
            <SimpleItem>Pricing Tiers</SimpleItem>
            <SimpleItem>Customize Your Order</SimpleItem>
            <SimpleItem>Add-ons</SimpleItem>
            <SimpleItem>Finalize Order + Checkout</SimpleItem>
            <SimpleItem>Shipping & Delivery Info</SimpleItem>
            <SimpleItem>Warranty & Returns Policy</SimpleItem>
          </SitemapBox>

          {/* ABOUT */}
{/* ABOUT */}
<SitemapBox title="About Us" emoji="ℹ️" to="/AboutDeckoviz">


            <SimpleItem>Navbar</SimpleItem>

            <BoxSection title="About Deckoviz">
              <li>Mission & Vision</li>
              <li>What Makes Us Unique</li>
              <li>Our Philosophy: Living Art, Living Spaces</li>
            </BoxSection>

            <BoxSection title="Join Us">
              <li>Careers & Internships</li>
              <li>Deckoviz Ambassadors</li>
              <li>Artists & Creator Collaborations</li>
              <li>Partner With Us</li>
            </BoxSection>

            <BoxSection title="Investor Inquiries">
              <li>For Aligned Investors</li>
              <li>Contact Email & Pitch Info</li>
            </BoxSection>
          </SitemapBox>

          {/* WEB APP */}
          <SitemapBox
            title="WebApp & Companion App"
            emoji="💻"
            to="/HowItWorks"
          >
            <BoxSection title="Dashboard">
              <li>Art Collections</li>
              <li>Upload & Transform</li>
              <li>Moodboard Controls</li>
              <li>Device Settings</li>
              <li>Shared Frames & Users</li>
              <li>Marketplace Activity</li>
            </BoxSection>

            <SimpleItem>Forum / Community Discussion</SimpleItem>
            <SimpleItem>Artist Upload Portal</SimpleItem>
          </SitemapBox>

          {/* COMMUNITY */}
          <SitemapBox
            title="Community"
            emoji="🤝"
            to="/GuestReactionsTestimonials"
          >
            <BoxSection title="Wall of Love">
              <li>User Photos, Videos, Stories</li>
              <li>Submit Your Story (Form)</li>
            </BoxSection>

            <BoxSection title="Leaderboard">
              <li>Referrals Leaderboard</li>
              <li>Most Engaged Users</li>
              <li>Top Collectors</li>
              <li>University Leaderboards</li>
            </BoxSection>

            <BoxSection title="Contact Us">
              <li>Phone Support</li>
              <li>Contact Section</li>
              <li>Contact Form</li>
              <li>Email Support</li>
            </BoxSection>
          </SitemapBox>

          {/* AI TECH */}
<SitemapBox title="AI Technology" emoji="🤖" to="/Features">
  <BoxSection title="AI Capabilities" to="/Features">

              <li>Machine Learning Features</li>
              <li>Image Recognition</li>
              <li>Smart Curation</li>
              <li>Personalization Engine</li>
            </BoxSection>

            <BoxSection title="Smart Features">
              <li>Adaptive Lighting</li>
              <li>Color Matching</li>
              <li>Time-Based Display</li>
              <li>Mood Detection</li>
            </BoxSection>

            <BoxSection title="Integration Options">
              <li>Smart Home Compatibility</li>
              <li>Voice Assistant Support</li>
              <li>Mobile App Features</li>
              <li>Third-Party APIs</li>
            </BoxSection>

            <BoxSection title="Technical Specifications">
              <li>Processing Power</li>
              <li>Memory & Storage</li>
              <li>Connectivity Standards</li>
              <li>Software Requirements</li>
            </BoxSection>
          </SitemapBox>
        </div>
      </div>
    </section>
  );
};

const SitemapBox = ({
  title,
  emoji,
  to,
  children,
}: {
  title: string;
  emoji: string;
  to?: string; // ✅ ADD THIS
  children: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 180, damping: 16 }}
    className="
      relative
      h-full
      w-full
      rounded-[36px]
      px-8 py-10
      bg-gradient-to-br
      from-pink-200/90
      via-purple-200/85
      to-indigo-200/90
      shadow-[0_25px_60px_rgba(0,0,0,0.15)]
      overflow-hidden
    "
  >
    <motion.h2
      whileHover={{ scale: 1.08 }}
      className="
        relative z-10
        text-2xl font-extrabold
        text-center mb-8
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600
        drop-shadow-md
        flex items-center justify-center gap-2
      "
    >
      {to ? (
        <Link
          to={to}
          className="flex items-center justify-center gap-2 hover:underline"
        >
          <span className="text-2xl">{emoji}</span>
          {title}
        </Link>
      ) : (
        <>
          <span className="text-2xl">{emoji}</span>
          {title}
        </>
      )}
    </motion.h2>

    <div className="space-y-6 relative z-10">{children}</div>
  </motion.div>
);

const BoxSection = ({
  title,
  to,
  children,
}: {
  title: string;
  to?: string;
  children?: React.ReactNode;
}) => (
  <div className="bg-white/70 rounded-2xl px-5 py-4">
    {to ? (
      <Link
        to={to}
        className="block font-medium mb-2 text-gray-800 hover:text-purple-600 transition"
      >
        {title}
      </Link>
    ) : (
      <h3 className="font-medium mb-2 text-gray-800">{title}</h3>
    )}

    {children && (
      <ul className="text-sm text-gray-600 space-y-1 leading-relaxed">
        {children}
      </ul>
    )}
  </div>
);

const SimpleItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/60 rounded-xl px-4 py-2 text-sm text-gray-700">
    {children}
  </div>
);

export default Sitemap;
