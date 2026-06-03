import React from 'react';
import { motion } from 'framer-motion';

/* ================= ANIMATION CONFIG ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

/* ==================================================== */

const sitemapData = {
  'ROOT': [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Manifesto', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'LeaderBoard', href: '#' },
    { name: 'Stories', href: '#' },
    { name: 'Blog', href: '/blog' },
    { name: 'Join Us', href: '/join-us' },
    { name: 'Contact Us', href: '/contact' },
  ],
  'HOME': [
    { name: "Hero Section", href: '#' },
    { name: 'How Elinity Works', href: '#' },
    { name: 'Why Elinity', href: '#' },
    { name: 'The Vision', href: '#' },
    { name: 'Featured Stories', href: '#' },
    { name: 'LeaderBoard Snapshot', href: '#' },
    { name: 'Community Highlights', href: '#' },
    { name: 'Call to Action', href: '#' },  
  ],
  'ABOUT US': [
    { name: 'Our Mission', href: '#' },
    { name: 'Our Vision', href: '#' },
    { name: 'Our Philosophy', href: '#' },
    { name: "Founder's Note", href: '#' },
    { name: 'The Problem We’re Solving', href: '#' },
    { name: 'How We’re Different', href: '#' },
    { name: 'Press & Media (future-ready)', href: '#' },
  ],
  'ELINITY MANIFESTO': [
    { name: 'Full Manifesto', href: '#' },
    { name: 'Core Beliefs', href: '#' },
    { name: 'What We Stand For', href: '#' },
    { name: 'What We Reject', href: '#' },
    { name: 'The Future We’re Building', href: '#' },
  ],
  'COMMUNITY': [
    { name: 'Community Overview', href: '#' },
    { name: 'Community Guidelines', href: '#' },
    { name: 'Code of Conduct', href: '#' },
    { name: 'Member Spotlight', href: '#' },
    { name: 'Community Events', href: '#' },
    { name: 'Local Chapters (future)', href: '#' },
    { name: 'Moderation & Trust', href: '#' },
  ],
  'ELINITY LEADERBOARD': [
    { name: 'Global Leaderboard', href: '#' },
    { name: 'Monthly Highlights', href: '#' },
    { name: 'Categories (Love, Growth, Creativity, Contribution etc.)', href: '#' },
    { name: 'How Rankings Work', href: '#' },
    { name: 'Hall of Fame ', href: '#' },
  ],
  'ELINITY STORIES': [
    { name: 'Featured Stories', href: '#' },
    { name: 'Love Stories', href: '#' },
    { name: 'Transformation Stories', href: '#' },
    { name: 'Founder Stories', href: '#' },
    { name: 'Community Stories', href: '#' },
    { name: 'Submit Your Story', href: '#' },
  ],
  'BLOG': [
    { type: 'top', text: 'All Blogs' },
    { name: 'Featured Blogs', href: 'blog' },
    { name: 'Product Updates', href: '#' },
    { name: 'Relationship Science', href: '#' },
    { name: 'Social Intelligence', href: '#' },
    { name: 'Personal Growth', href: '#' },
    { name: 'Community Highlights', href: '#' },
    { name: 'AI & Human Connection', href: '#' },
  ],
  'JOIN US': [
    { name: 'Join the Waitlist', href: '/' },
    { name: 'Newsletter Signup', href: '#' },
    { name: 'Early Access Program', href: '#' },
    { name: 'Ambassador Program', href: '#' },
    { name: 'Careers', href: '/join-us' },
  ],
  'CONTACT US': [
    { name: 'General Inquiries', href: '/contact' },
    { name: 'Partnerships', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Report an Issue', href: '#' },
  ],
  'APPS': [
    { type: 'bottom', text: '' },
    { type: 'bottom', text: '' },
    { type: 'top', text: '' },
    { name: 'Overview', href: '#' },
    { name: 'Screenshots', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Download CTA', href: '#' },
  ],
  'IMPORTANT LINKS (Footer Section)': [
    { name: 'Subscription and Payments', href: '/payment' },
    { name: 'Legal', href: '/legal' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '/privacypolicy' },
    { name: 'Data Policy', href: '#' },
    { name: 'Community Guidelines', href: '#' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
  'RESOURCES': [
    { name: 'Getting Started Guide', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Safety & Trust', href: '#' },
    { name: 'Best Practices', href: '#' },
    { name: 'Relationship Playbooks (future premium section)', href: '#' },
  ],
};

const SitemapLink = ({ name, href }: { name: string, href: string }) => (
  <motion.li
    variants={fadeUp}
    whileHover={{ x: 6 }}
  >
    {/* Updated hover color to brand Royal Blue */}
    <a href={href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
      {name}
    </a>
  </motion.li>
);

const SitemapSection = ({ title, links }: { title: string; links: any[] }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Updated section title to brand Royal Blue */}
    <h3 className="text-lg font-medium mb-3 text-blue-400">{title}</h3>

    <motion.ul variants={stagger} className="space-y-2">

      {links.map((item, index) => {

        if (item.type === "top") {
          return (
            <motion.p variants={fadeUp} key={index} className="text-xs text-gray-400 mb-2">
              {item.text}
            </motion.p>
          );
        }

        if (item.type === "bottom") {
          return (
            <motion.p variants={fadeUp} key={index} className="text-xs text-blue-400/80 mt-2">
              {item.text}
            </motion.p>
          );
        }

        return (
          <SitemapLink key={item.name} name={item.name} href={item.href} />
        );
      })}

    </motion.ul>
  </motion.div>
);

const Sitemap = () => {
  return (
    <div style={{background: "linear-gradient(to bottom, #030014, #0a0a23)"}}>
      <div className='pt-32'></div>

      {/* Intro card */}
      <motion.div
        initial={{opacity:0,y:50}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.8}}
        style={{ maxWidth: "800px", margin: "0px auto", padding: "50px 20px", 
          color: "white", background: "rgba(255, 255, 255, 0.03)", 
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)", 
          border: "1px solid rgba(59, 130, 246, 0.1)", // Blue border tint
          borderRadius: "12px", marginTop: "40px", marginBottom: "40px" }}>

        <div style={{ marginBottom: "20px" }}>
          {/* Updated gradient to Royal Blue and Indigo */}
          <h1 style={{ fontSize: "40px", fontWeight: "700", marginBottom: "16px", background: "linear-gradient(to right, #ffffff, #3B82F6, #7B3FE4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Welcome to the Elinity Universe
          </h1>
        </div>

        <div style={{ lineHeight: "1.8", fontSize: "18px", color: "#cfcfe7" }}>
          <p>This is the map of a movement.</p>
          <p>Every link below leads somewhere built to spark connection, curiosity, growth, joy, or meaning.</p>
          <p>We’re here to help you connect, deeply and beautifully, so whether you’re exploring the manifesto,
            diving into community stories, climbing the leaderboard, or just figuring out what Elinity actually is…
            this is your starting point.</p>
          <p>Think of it as the blueprint of a world designed for better relationships.</p>
          <p style={{ fontWeight: "600", marginTop: "18px", color: "#ffffff" }}>Go wander.</p>
        </div>
      </motion.div>

      {/* Sitemap grid */}
      <div className="bg-transparent text-white py-16 px-4 md:px-16 pt-32">
        <div className="max-w-7xl mx-auto">

          <motion.h1
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:0.7}}
            className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12"
          >
            Site<span className="text-blue-500">map</span>
          </motion.h1>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{once:true}}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {Object.entries(sitemapData).map(([title, section]) => (
              <SitemapSection key={title} title={title} links={section} />
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Sitemap;