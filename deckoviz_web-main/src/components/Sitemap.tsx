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
                  Deckoviz Sitemap,
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
                what inspires you. Dive in - every click here leads somewhere
                worth exploring.
              </p>
            </div>
          </div>
        </div>

        {/* FIRST ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-16">
          {/* PRODUCT */}
          <SitemapBox title="Product" icon={<ImageIcon className="w-6 h-6" />} to="/features">
            <BoxSection title="Product Overview" to="/features">
              <LinkItem to="/features">Hardware &amp; Specs</LinkItem>
              <LinkItem to="/how-it-works">Setup Guide</LinkItem>
              <LinkItem to="/features">AI-Powered Art</LinkItem>
              <LinkItem to="/features">Mood-Based Creation</LinkItem>
              <LinkItem to="/features">Personal Photo Transformations</LinkItem>
              <LinkItem to="/features">Story &amp; Memory Visuals</LinkItem>
              <LinkItem to="/features">Ambient &amp; Meditation Modes</LinkItem>
              <LinkItem to="/pricing">Marketplace (Sell &amp; Buy)</LinkItem>
              <LinkItem to="/partnership">Multi-User &amp; Business Use Cases</LinkItem>
            </BoxSection>

            <BoxSection title="Mega Features" to="/features">
              <LinkItem to="/creative-journal">Creative Journal</LinkItem>
              <LinkItem to="/creative-studio">Creative Studio</LinkItem>
              <LinkItem to="/deckoviz-storytelling">Deckoviz Storytelling</LinkItem>
              <LinkItem to="/vizzy-canvas">Vizzy Creation Canvas</LinkItem>
              <LinkItem to="/experimental-art-modes">Experimental Art Modes</LinkItem>
              <LinkItem to="/flagship-games">Flagship Games</LinkItem>
              <LinkItem to="/vizzy-generative-chat">Vizzy Generative Chat</LinkItem>
            </BoxSection>

            <BoxSection title="Use Case Hubs" to="/partnership">
              <LinkItem to="/partnership">For Homes</LinkItem>
              <LinkItem to="/partnership">For Offices</LinkItem>
              <LinkItem to="/partnership">For Cafes / Restaurants</LinkItem>
              <LinkItem to="/partnership">For Therapy &amp; Wellness Spaces</LinkItem>
              <LinkItem to="/partnership">For Schools / Education</LinkItem>
            </BoxSection>
          </SitemapBox>

          {/* SUPPORT */}
          <SitemapBox title="Support" icon={<Wrench className="w-6 h-6" />} to="/faq">
            <BoxSection title="FAQ" to="/faq">
              <LinkItem to="/faq">General Questions</LinkItem>
              <LinkItem to="/support">Technical Support</LinkItem>
              <LinkItem to="/faq">Billing Questions</LinkItem>
              <LinkItem to="/support">Troubleshooting</LinkItem>
            </BoxSection>

            <BoxSection title="Installation Guide" to="/how-it-works">
              <LinkItem to="/how-it-works">Unboxing</LinkItem>
              <LinkItem to="/how-it-works">Wall Mounting</LinkItem>
              <LinkItem to="/how-it-works">Initial Setup</LinkItem>
              <LinkItem to="/how-it-works">Network Connection</LinkItem>
            </BoxSection>

            <BoxSection title="User Manual" to="/support">
              <LinkItem to="/support">Getting Started</LinkItem>
              <LinkItem to="/features">Feature Guide</LinkItem>
              <LinkItem to="/support">Settings Configuration</LinkItem>
              <LinkItem to="/support">Maintenance Tips</LinkItem>
            </BoxSection>

            <BoxSection title="Troubleshooting" to="/support">
              <LinkItem to="/support">Common Issues</LinkItem>
              <LinkItem to="/support">Error Codes</LinkItem>
              <LinkItem to="/support">Reset Instructions</LinkItem>
              <LinkItem to="/support">Performance Optimization</LinkItem>
            </BoxSection>
          </SitemapBox>

          {/* HOME */}
          <SitemapBox title="Home" icon={<Home className="w-6 h-6" />} to="/">
            <SimpleItem to="/">Hero Header Section</SimpleItem>
            <SimpleItem to="/">Key Features &amp; Capabilities</SimpleItem>
            <SimpleItem to="/">Testimonials Preview</SimpleItem>
            <SimpleItem to="/">Call to Action (CTA)</SimpleItem>
          </SitemapBox>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-12">
          {/* LEGAL */}
          <SitemapBox title="Legal" icon={<Scale className="w-6 h-6" />} to="/privacy-policy">
            <BoxSection title="Privacy Policy" to="/privacy-policy" />
            <BoxSection title="Terms of Service" to="/terms-conditions" />
            <BoxSection title="Return Policy" to="/return-policy" />
            <BoxSection title="Shipping Policy" to="/shipping-policy" />
            <SimpleItem to="/privacy-policy">Cookie Policy</SimpleItem>
            <SimpleItem to="/terms-conditions">Community Guidelines</SimpleItem>
            <SimpleItem to="/privacy-policy">Accessibility Statement</SimpleItem>
          </SitemapBox>

          {/* BLOG & RESOURCES */}
          <SitemapBox title="Blog &amp; Resources" icon={<FileText className="w-6 h-6" />} to="/blog">
            <BoxSection title="All Blog Posts" to="/blog">
              <LinkItem to="/blog">Latest Posts</LinkItem>
              <LinkItem to="/blog">Art &amp; Technology</LinkItem>
              <LinkItem to="/blog">Smart Home Integration</LinkItem>
              <LinkItem to="/blog">Customer Stories</LinkItem>
            </BoxSection>

            <BoxSection title="Blog Categories" to="/blog">
              <LinkItem to="/blog">Product Tips &amp; Features</LinkItem>
              <LinkItem to="/blog">Artist Spotlights</LinkItem>
              <LinkItem to="/blog">Inspiration &amp; Interiors</LinkItem>
              <LinkItem to="/blog">Tech + Art Innovations</LinkItem>
            </BoxSection>

            <SimpleItem to="/blog">Open Blog View (Individual Post)</SimpleItem>

            <BoxSection title="Guides &amp; Resources" to="/how-it-works">
              <LinkItem to="/how-it-works">Setup Help</LinkItem>
              <LinkItem to="/features">Art Transformation Guides</LinkItem>
              <LinkItem to="/features">Artist Resource Kits</LinkItem>
              <LinkItem to="/features">Meditation Visuals Help</LinkItem>
            </BoxSection>
          </SitemapBox>

          {/* ORDER */}
          <SitemapBox title="Order" icon={<ShoppingCart className="w-6 h-6" />} to="/pricing">
            <SimpleItem to="/pricing">Pricing Tiers</SimpleItem>
            <SimpleItem to="/pricing">Customize Your Order</SimpleItem>
            <SimpleItem to="/pricing">Add-ons</SimpleItem>
            <SimpleItem to="/pricing">Finalize Order + Checkout</SimpleItem>
            <SimpleItem to="/shipping-policy">Shipping &amp; Delivery Info</SimpleItem>
            <SimpleItem to="/return-policy">Warranty &amp; Returns Policy</SimpleItem>
          </SitemapBox>
        </div>

        {/* THIRD ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 mt-12 mb-16">
          {/* ABOUT */}
          <SitemapBox title="About Us" icon={<Info className="w-6 h-6" />} to="/about">
            <BoxSection title="About Deckoviz" to="/about">
              <LinkItem to="/about">Mission &amp; Vision</LinkItem>
              <LinkItem to="/about">What Makes Us Unique</LinkItem>
              <LinkItem to="/about">Our Philosophy: Living Art, Living Spaces</LinkItem>
            </BoxSection>

            <BoxSection title="Join Us" to="/contact">
              <LinkItem to="https://www.linkedin.com/company/deckoviz-space/jobs/">Careers &amp; Internships</LinkItem>
              <LinkItem to="/partnership">Deckoviz Ambassadors</LinkItem>
              <LinkItem to="/partnership">Artists &amp; Creator Collaborations</LinkItem>
              <LinkItem to="/partnership">Partner With Us</LinkItem>
            </BoxSection>

            <BoxSection title="Investor Inquiries" to="/contact">
              <LinkItem to="/contact">For Aligned Investors</LinkItem>
              <LinkItem to="/contact">Contact Email &amp; Pitch Info</LinkItem>
            </BoxSection>
          </SitemapBox>

          {/* WEB APP */}
          <SitemapBox
            title="WebApp &amp; Companion App"
            icon={<MonitorSmartphone className="w-6 h-6" />}
            to="/how-it-works"
          >
            <BoxSection title="Dashboard" to="/features">
              <LinkItem to="/features">Art Collections</LinkItem>
              <LinkItem to="/features">Upload &amp; Transform</LinkItem>
              <LinkItem to="/features">Moodboard Controls</LinkItem>
              <LinkItem to="/features">Device Settings</LinkItem>
              <LinkItem to="/features">Shared Frames &amp; Users</LinkItem>
              <LinkItem to="/pricing">Marketplace Activity</LinkItem>
            </BoxSection>

            <SimpleItem to="/blog">Forum / Community Discussion</SimpleItem>
            <SimpleItem to="/pricing">Artist Upload Portal</SimpleItem>
          </SitemapBox>

          {/* COMMUNITY */}
          <SitemapBox
            title="Community"
            icon={<Users className="w-6 h-6" />}
            to="/leaderboard"
          >
            <BoxSection title="Wall of Love" to="/leaderboard">
              <LinkItem to="/leaderboard">User Photos, Videos, Stories</LinkItem>
              <LinkItem to="/contact">Submit Your Story (Form)</LinkItem>
            </BoxSection>

            <BoxSection title="Leaderboard" to="/leaderboard">
              <LinkItem to="/leaderboard">Referrals Leaderboard</LinkItem>
              <LinkItem to="/leaderboard">Most Engaged Users</LinkItem>
              <LinkItem to="/leaderboard">Top Collectors</LinkItem>
              <LinkItem to="/leaderboard">University Leaderboards</LinkItem>
            </BoxSection>

            <BoxSection title="Contact Us" to="/contact">
              <LinkItem to="/contact">Phone Support</LinkItem>
              <LinkItem to="/contact">Contact Section</LinkItem>
              <LinkItem to="/contact">Contact Form</LinkItem>
              <LinkItem to="/contact">Email Support</LinkItem>
            </BoxSection>
          </SitemapBox>

          {/* AI TECH */}
          <SitemapBox title="AI Technology" icon={<Bot className="w-6 h-6" />} to="/features">
            <BoxSection title="AI Capabilities" to="/features">
              <LinkItem to="/features">Machine Learning Features</LinkItem>
              <LinkItem to="/features">Image Recognition</LinkItem>
              <LinkItem to="/features">Smart Curation</LinkItem>
              <LinkItem to="/features">Personalization Engine</LinkItem>
            </BoxSection>

            <BoxSection title="Smart Features" to="/features">
              <LinkItem to="/features">Adaptive Lighting</LinkItem>
              <LinkItem to="/features">Color Matching</LinkItem>
              <LinkItem to="/features">Time-Based Display</LinkItem>
              <LinkItem to="/features">Mood Detection</LinkItem>
            </BoxSection>

            <BoxSection title="Integration Options" to="/features">
              <LinkItem to="/features">Smart Home Compatibility</LinkItem>
              <LinkItem to="/features">Voice Assistant Support</LinkItem>
              <LinkItem to="/features">Mobile App Features</LinkItem>
              <LinkItem to="/features">Third-Party APIs</LinkItem>
            </BoxSection>

            <BoxSection title="Technical Specifications" to="/how-it-works">
              <LinkItem to="/how-it-works">Processing Power</LinkItem>
              <LinkItem to="/how-it-works">Memory &amp; Storage</LinkItem>
              <LinkItem to="/how-it-works">Connectivity Standards</LinkItem>
              <LinkItem to="/how-it-works">Software Requirements</LinkItem>
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
        <ul className="text-sm space-y-1.5 leading-relaxed" style={{ color: "#4a5568" }}>
          {children}
        </ul>
      )}
    </div>
  </div>
);

const LinkItem = ({ children, to = "#" }: { children: React.ReactNode; to?: string }) => {
  const isExternal = to.startsWith("http");
  if (isExternal) {
    return (
      <li className="group flex items-center transition-all duration-200">
        <a href={to} target="_blank" rel="noopener noreferrer" className="block w-full py-0.5 hover:text-blue-600 transition-colors duration-200">
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">{children}</span>
        </a>
      </li>
    );
  }

  return (
    <li className="group flex items-center transition-all duration-200">
      <Link to={to} className="block w-full py-0.5 hover:text-blue-600 transition-colors duration-200">
        <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">{children}</span>
      </Link>
    </li>
  );
};

const SimpleItem = ({ children, to = "#" }: { children: React.ReactNode, to?: string }) => {
  const isExternal = to.startsWith("http");
  
  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="block group">
        <div
          className="rounded-xl px-4 py-2 text-sm transition-all duration-300 relative overflow-hidden group-hover:scale-[1.02]"
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
          <span className="relative z-10 group-hover:text-blue-600 transition-colors duration-200">{children}</span>
        </div>
      </a>
    );
  }

  return (
    <Link to={to} className="block group">
      <div
        className="rounded-xl px-4 py-2 text-sm transition-all duration-300 relative overflow-hidden group-hover:scale-[1.02]"
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
        <span className="relative z-10 group-hover:text-blue-600 transition-colors duration-200">{children}</span>
      </div>
    </Link>
  );
};

export default Sitemap;
