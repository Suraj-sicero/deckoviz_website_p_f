import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  Wrench,
  Home,
  Scale,
  FileText,
  ShoppingCart,
  Info,
  MonitorSmartphone,
  Users,
  Bot
} from "lucide-react";

const Sitemap: React.FC = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Soft blue blobs evenly spread so glass cards are clearly visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.20)" }} />
        <div className="absolute -top-20 right-[-80px] w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(37, 99, 235, 0.18)" }} />
        <div className="absolute top-[30%] left-[10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.15)" }} />
        <div className="absolute top-[30%] right-[5%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
        <div className="absolute top-[60%] left-[35%] w-[600px] h-[400px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
        <div className="absolute bottom-[-80px] left-[20%] w-[800px] h-[400px] rounded-full blur-[130px]" style={{ background: "rgba(59, 130, 246, 0.16)" }} />
      </div>

      <div className="w-full px-6 xl:px-12 2xl:px-20 relative z-10">
        {/* Header */}
        <div className="relative mb-14">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-300/20 via-blue-200/20 to-indigo-200/20" />

          {/* Serif indigo gradient title */}
          <h1
            className="
              relative z-10
              text-5xl md:text-6xl
              font-extrabold
              font-serif
              text-center
              bg-clip-text text-transparent
              tracking-tight
              pb-4
            "
            style={{
              backgroundImage:
                "linear-gradient(135deg, #182a4a 0%, #1e3a6e 35%, #2563eb 70%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Site Map
          </h1>

          {/* Description card – frosted glass + blue shadow */}
          <div className="relative z-20 max-w-5xl mx-auto mt-8">
            <div
              className="
                bg-white/40
                backdrop-blur-2xl
                border border-white/50
                rounded-3xl px-8 py-7
              "
              style={{
                boxShadow:
                  "0 8px 40px rgba(37, 99, 235, 0.22), 0 2px 16px rgba(24, 42, 74, 0.14), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed text-justify">
                Welcome to the{" "}
                <span className="font-semibold text-gray-900">
                  Deckoviz Sitemap
                </span>{" "}
                  your treasure map to all the good stuff. Think of this as your
                behind-the-scenes guide, minus the dusty corridors. Whether
                you're hunting for product deep dives, enterprise insights,
                creative tools, or that one page you swear you saw last week,
                this sitemap has your back.
                <br />
                <br />
                It's the calm, organized friend who always knows where
                everything is, so you can skip the wandering and get straight to
                what inspires you. Dive in   every click here leads somewhere
                worth exploring.
              </p>
            </div>
          </div>
        </div>

        {/* FIRST ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-16">
          {/* PRODUCT */}
          <SitemapBox title="Product" icon={<ImageIcon className="w-6 h-6" />}>
            <BoxSection title="Product Overview">
              <li>Hardware &amp; Specs</li>
              <li>Setup Guide</li>
              <li>AI-Powered Art</li>
              <li>Mood-Based Creation</li>
              <li>Personal Photo Transformations</li>
              <li>Story &amp; Memory Visuals</li>
              <li>Ambient &amp; Meditation Modes</li>
              <li>Marketplace (Sell &amp; Buy)</li>
              <li>Multi-User &amp; Business Use Cases</li>
            </BoxSection>

            <BoxSection title="Use Case Hubs">
              <li>For Homes</li>
              <li>For Offices</li>
              <li>For Cafes / Restaurants</li>
              <li>For Therapy &amp; Wellness Spaces</li>
              <li>For Schools / Education</li>
            </BoxSection>
          </SitemapBox>

          {/* SUPPORT */}
          <SitemapBox title="Support" icon={<Wrench className="w-6 h-6" />} to="/FAQ">
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
          <SitemapBox title="Home" icon={<Home className="w-6 h-6" />} to="/AboutDeckoviz">
            <SimpleItem>Hero Header Section</SimpleItem>
            <SimpleItem>Key Features &amp; Capabilities</SimpleItem>
            <SimpleItem>Testimonials Preview</SimpleItem>
            <SimpleItem>Call to Action (CTA)</SimpleItem>
          </SitemapBox>

          {/* LEGAL */}
          <SitemapBox title="Legal" icon={<Scale className="w-6 h-6" />} to="/PrivacyPolicy">
            <BoxSection title="Privacy Policy" to="/PrivacyPolicy" />
            <BoxSection title="Terms of Service" to="/TermsOfService" />
            <SimpleItem>Cookie Policy</SimpleItem>
            <SimpleItem>Community Guidelines</SimpleItem>
            <SimpleItem>Accessibility Statement</SimpleItem>
            <BoxSection title="Return Policy" to="/ReturnPolicy" />
            <BoxSection title="Shipping Policy" to="/ShippingPolicy" />
          </SitemapBox>

          {/* BLOG & RESOURCES */}
          <SitemapBox title="Blog &amp; Resources" icon={<FileText className="w-6 h-6" />} to="/Blog">
            <BoxSection title="Navbar" />

            <BoxSection title="All Blog Posts">
              <li>Latest Posts</li>
              <li>Art &amp; Technology</li>
              <li>Smart Home Integration</li>
              <li>Customer Stories</li>
            </BoxSection>

            <BoxSection title="Blog Categories">
              <li>Product Tips &amp; Features</li>
              <li>Artist Spotlights</li>
              <li>Inspiration &amp; Interiors</li>
              <li>Tech + Art Innovations</li>
            </BoxSection>

            <SimpleItem>Open Blog View (Individual Post)</SimpleItem>

            <BoxSection title="Guides &amp; Resources">
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
          <SitemapBox title="Order" icon={<ShoppingCart className="w-6 h-6" />} to="/Pricing">
            <SimpleItem>Navbar</SimpleItem>
            <SimpleItem>Pricing Tiers</SimpleItem>
            <SimpleItem>Customize Your Order</SimpleItem>
            <SimpleItem>Add-ons</SimpleItem>
            <SimpleItem>Finalize Order + Checkout</SimpleItem>
            <SimpleItem>Shipping &amp; Delivery Info</SimpleItem>
            <SimpleItem>Warranty &amp; Returns Policy</SimpleItem>
          </SitemapBox>

          {/* ABOUT */}
          <SitemapBox title="About Us" icon={<Info className="w-6 h-6" />} to="/AboutDeckoviz">
            <SimpleItem>Navbar</SimpleItem>

            <BoxSection title="About Deckoviz">
              <li>Mission &amp; Vision</li>
              <li>What Makes Us Unique</li>
              <li>Our Philosophy: Living Art, Living Spaces</li>
            </BoxSection>

            <BoxSection title="Join Us">
              <li>Careers &amp; Internships</li>
              <li>Deckoviz Ambassadors</li>
              <li>Artists &amp; Creator Collaborations</li>
              <li>Partner With Us</li>
            </BoxSection>

            <BoxSection title="Investor Inquiries">
              <li>For Aligned Investors</li>
              <li>Contact Email &amp; Pitch Info</li>
            </BoxSection>
          </SitemapBox>

          {/* WEB APP */}
          <SitemapBox
            title="WebApp &amp; Companion App"
            icon={<MonitorSmartphone className="w-6 h-6" />}
            to="/HowItWorks"
          >
            <BoxSection title="Dashboard">
              <li>Art Collections</li>
              <li>Upload &amp; Transform</li>
              <li>Moodboard Controls</li>
              <li>Device Settings</li>
              <li>Shared Frames &amp; Users</li>
              <li>Marketplace Activity</li>
            </BoxSection>

            <SimpleItem>Forum / Community Discussion</SimpleItem>
            <SimpleItem>Artist Upload Portal</SimpleItem>
          </SitemapBox>

          {/* COMMUNITY */}
          <SitemapBox
            title="Community"
            icon={<Users className="w-6 h-6" />}
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
          <SitemapBox title="AI Technology" icon={<Bot className="w-6 h-6" />} to="/Features">
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
              <li>Memory &amp; Storage</li>
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
  icon,
  to,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  to?: string;
  children: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ 
      y: -6, 
      scale: 1.012,
      boxShadow: "0 20px 60px rgba(37, 99, 235, 0.4), 0 4px 20px rgba(24, 42, 74, 0.2), inset 0 0 40px rgba(255,255,255,0.9)"
    }}
    transition={{ type: "spring", stiffness: 180, damping: 16 }}
    className="relative h-full w-full rounded-[36px] px-8 py-10 overflow-hidden group"
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
      backdropFilter: "blur(40px) saturate(200%)",
      WebkitBackdropFilter: "blur(40px) saturate(200%)",
      border: "1px solid rgba(255,255,255,0.3)",
      borderTop: "1px solid rgba(255,255,255,0.8)",
      borderLeft: "1px solid rgba(255,255,255,0.6)",
      boxShadow:
        "0 25px 50px rgba(31, 38, 135, 0.15), inset 0 2px 20px rgba(255,255,255,0.6)",
    }}
  >
    {/* Diagonal glass reflection */}
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 22%, transparent 35%)"
      }}
    />

    {/* Glass top-edge highlight */}
    <div
      className="absolute top-0 left-6 right-6 h-px pointer-events-none rounded-full"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)" }}
    />

    <motion.h2
      whileHover={{ scale: 1.06 }}
      className="
        relative z-10
        text-2xl font-extrabold font-serif
        text-center mb-8
        flex items-center justify-center gap-2
        tracking-tight
      "
      style={{
        backgroundImage:
          "linear-gradient(135deg, #182a4a 0%, #1e3a6e 45%, #2563eb 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter: "drop-shadow(0 1px 4px rgba(37,99,235,0.20))",
      }}
    >
      {to ? (
        <Link
          to={to}
          className="flex items-center justify-center gap-2 hover:underline decoration-indigo-400"
        >
          <span className="text-indigo-600 drop-shadow-md group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">
            {icon}
          </span>
          {title}
        </Link>
      ) : (
        <>
          <span className="text-indigo-600 drop-shadow-md group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">
            {icon}
          </span>
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
  <div
    className="rounded-2xl px-5 py-4 transition-colors duration-300 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 100%)",
      backdropFilter: "blur(25px) saturate(180%)",
      WebkitBackdropFilter: "blur(25px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.4)",
      borderTop: "1px solid rgba(255,255,255,0.8)",
      boxShadow: "0 8px 32px rgba(31, 38, 135, 0.08), inset 0 2px 15px rgba(255,255,255,0.7)",
    }}
  >
    {/* Subtle inner reflection */}
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/30 to-transparent" />
    
    <div className="relative z-10">
      {to ? (
        <Link
          to={to}
          className="block font-semibold mb-2 transition hover:text-blue-600"
          style={{ color: "#1e3a6e" }}
        >
          {title}
        </Link>
      ) : (
        <h3 className="font-semibold mb-2" style={{ color: "#1e3a6e" }}>{title}</h3>
      )}

      {children && (
        <ul className="text-sm space-y-1 leading-relaxed" style={{ color: "#4a5568" }}>
          {children}
        </ul>
      )}
    </div>
  </div>
);

const SimpleItem = ({ children }: { children: React.ReactNode }) => (
  <div
    className="rounded-xl px-4 py-2 text-sm transition-colors duration-300 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
      backdropFilter: "blur(20px) saturate(150%)",
      WebkitBackdropFilter: "blur(20px) saturate(150%)",
      border: "1px solid rgba(255,255,255,0.3)",
      borderTop: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "0 4px 16px rgba(31, 38, 135, 0.06), inset 0 2px 8px rgba(255,255,255,0.5)",
      color: "#374151",
    }}
  >
    {/* Subtle inner reflection */}
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 to-transparent" />
    <span className="relative z-10">{children}</span>
  </div>
);

export default Sitemap;
