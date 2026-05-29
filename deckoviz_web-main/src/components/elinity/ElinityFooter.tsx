import React from "react";
import { Instagram, Linkedin, Twitter, Sparkles, ArrowUpRight, Heart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = ({ className = '' }: { className?: string }) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    const l = name.toLowerCase();
    
    if (l === 'home') {
      if (location.pathname === '/elinity') {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate('/elinity');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
      return;
    }
    
    let scrollTarget = 'elinity-waitlist';
    if (l === 'about us') {
      navigate('/elinity/about');
      return;
    } else if (l === 'ellaris') {
      navigate('/elinity/ellaris');
      return;
    } else if (l === 'contact us') {
      navigate('/elinity/contact');
      return;
    } else if (l === 'manifesto') {
      scrollTarget = 'elinity-statement';
    } else if (l === 'blogs' || l === 'stories' || l === 'elinity podcast') {
      scrollTarget = 'elinity-steps';
    }
    
    if (location.pathname === '/elinity') {
      document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/elinity');
      setTimeout(() => document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  // Brand-aligned Deep Space Gradient
  const deepSpaceGradient = {
    background: 'radial-gradient(circle at bottom right, #0A001F 0%, #03000a 100%)',
  };

  // Silver Streak Animation Variant
  const shineVariants = {
    initial: { x: '-100%', opacity: 0 },
    animate: { 
      x: '200%', 
      opacity: [0, 0.5, 0],
      transition: { 
        repeat: Infinity, 
        duration: 3, 
        ease: "linear",
        repeatDelay: 2 
      } 
    }
  };

  return (
    <footer 
      style={deepSpaceGradient} 
      className={`relative text-white pt-24 pb-12 px-6 md:px-16 overflow-hidden border-t border-white/5 lowercase ${className}`}
    >
      {/* Premium Ambient Glows */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-[140px] -mr-80 -mt-80" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7B3FE4]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Tier: Brand & Social Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Brand Card - Enhanced Glassmorphism with Shine */}
          <div className="lg:col-span-7 relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl flex flex-col justify-between hover:border-white/10 transition-colors duration-500">
            {/* The Silver Streak */}
            <motion.div 
              variants={shineVariants}
              initial="initial"
              animate="animate"
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12 pointer-events-none"
            />

            <div className="space-y-8">
              <Link to="/elinity" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex items-center space-x-3 w-max group">
                <img 
                  src="https://res.cloudinary.com/dge1qccxs/image/upload/v1778672008/04235931-ebaa-4506-8551-d59bd86b6b26-removebg-preview_vyqdqe.png" 
                  alt="elinity" 
                  className="h-14 w-auto transition-all duration-700 group-hover:scale-110" 
                />
              </Link>
              <h2 className="text-3xl md:text-4xl font-light leading-tight max-w-xl text-neutral-200 tracking-tight">
                where{" "}
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#00D2FF] bg-clip-text text-transparent font-semibold italic">
                  amplifying intelligence 
                </span>{" "}
                meets{" "}
                <span className="bg-gradient-to-r from-[#7B3FE4] to-[#3B82F6] bg-clip-text text-transparent font-semibold italic">
                  human connection
                </span>
              </h2>
              <p className="text-neutral-500 text-base max-w-md leading-relaxed">
                find your most resonant people with lumi, your social matchmaker, that understands the whole of you.
              </p>
            </div>
          </div>

          {/* Connect Card with Shine */}
          <div className="lg:col-span-5 relative overflow-hidden bg-gradient-to-br from-[#3B82F6]/5 to-transparent border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between hover:border-[#3B82F6]/20 transition-all duration-500">
            {/* The Silver Streak */}
            <motion.div 
              variants={shineVariants}
              initial="initial"
              animate="animate"
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12 pointer-events-none"
            />

            <div>
              <h3 className="text-2xl font-semibold mb-3 flex items-center gap-3">
                join the circle <Sparkles size={20} className="text-[#3B82F6]" />
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">follow our journey in shaping human flourishing with emotionally intelligent buddies.</p>
            </div>
            
            <div className="flex gap-4 mt-8">
              {[
                { icon: <Instagram size={22} />, href: "https://www.instagram.com/elinityai/" },
                { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/company/elinity/" },
                { icon: <Twitter size={22} />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-16 w-16 flex items-center justify-center rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/30 hover:-translate-y-1.5 transition-all duration-500 text-neutral-400 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Tier: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 px-4">
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3B82F6]">explore</h4>
            <ul className="space-y-4">
              {[
                { n: "Home", p: "/" }, { n: "About Us", p: "/about" }, 
                { n: "Contact Us", p: "/contact" }, { n: "Join Us", p: "/join-us" },
                { n: "Leaderboard", p: "#" }, { n: "Manifesto", p: "#" },
                { n: "Enterprise", p: "/enterprise" }, { n: "AB", p: "/ab" }
              ].map((link) => (
                <li key={link.n} >
                  <Link to="/elinity" onClick={(e) => handleLinkClick(e, link.n)} className="text-neutral-500 hover:text-[#3B82F6] transition-colors text-sm block font-light">
                    {link.n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3B82F6]">legal</h4>
            <ul className="space-y-4">
              {[
                { n: "subscriptions", p: "/get-started" }, 
                { n: "legal center", p: "/legal" },
                { n: "sitemap", p: "/sitemap" },
                { n: "privacy policy", p: "/privacypolicy" }
              ].map((link) => (
                <li key={link.n}>
                  <Link to="/elinity" onClick={(e) => handleLinkClick(e, link.n)} className="text-neutral-500 hover:text-[#3B82F6] transition-colors text-sm block font-light">
                    {link.n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3B82F6]">learn</h4>
            <ul className="space-y-4">
              {[
                { n: "blogs", p: "/blog" }, { n: "elinity podcast", p: "/pod" },
                 { n: "stories", p: "/stories" },
              ].map((link) => (
                <li key={link.n}>
                  <Link to="/elinity" onClick={(e) => handleLinkClick(e, link.n)} className="text-neutral-500 hover:text-[#3B82F6] transition-colors text-sm block font-light">
                    {link.n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3B82F6]">platforms</h4>
            <div className="grid gap-4">
              {['android app', 'ios app'].map((app) => (
                <a key={app} href="#elinity-waitlist" onClick={(e) => { e.preventDefault(); document.getElementById('elinity-waitlist')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/5 transition-all group">
                  <span className="text-xs font-semibold tracking-wider text-neutral-300">{app}</span>
                  <ArrowUpRight size={16} className="text-[#3B82F6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] tracking-[0.2em] font-medium text-neutral-600 uppercase">
          <p>© {currentYear} elinity • 128 city road, london</p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 transition-colors hover:text-neutral-400 cursor-default group">
              crafted with <Heart size={12} className="fill-[#3B82F6]/30 text-[#3B82F6] animate-pulse group-hover:scale-125 transition-transform" /> for human soul
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;