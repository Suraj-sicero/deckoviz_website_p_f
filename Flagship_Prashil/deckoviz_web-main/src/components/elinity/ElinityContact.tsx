import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ElinityNavbar from './ElinityNavbar';
import ElinityFooter from './ElinityFooter';

/* =========================
   ANIMATION CONFIG
========================= */

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const glowFloat = {
  animate: {
    y: [0, -20, 0],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

/* ========================= */

const GOOGLE_LOGO = (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <g>
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.07 1.53 7.47 2.81l5.54-5.39C33.64 3.61 29.28 1.5 24 1.5 14.98 1.5 7.13 7.44 4.13 15.09l6.91 5.36C12.83 14.09 17.01 9.5 24 9.5z"/>
      <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.01l7.18 5.59C43.87 37.13 46.1 31.36 46.1 24.55z"/>
      <path fill="#FBBC05" d="M10.96 28.45c-.48-1.44-.76-2.97-.76-4.55s.28-3.11.76-4.55l-6.91-5.36C2.7 17.36 1.5 20.55 1.5 24s1.2 6.64 3.55 9.45l6.91-5.36z"/>
      <path fill="#EA4335" d="M24 46.5c6.48 0 11.92-2.14 15.89-5.84l-7.18-5.59c-2 1.36-4.56 2.18-8.71 2.18-6.99 0-11.17-4.59-12.96-8.86l-6.91 5.36C7.13 40.56 14.98 46.5 24 46.5z"/>
    </g>
  </svg>
);

const GITHUB_URL = 'https://github.com/elinityai/elinityai-main';

const Contact: React.FC = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      setFormStatus({ submitted: true, success: false, message: 'Please fill out all fields' });
      return;
    }
    setTimeout(() => {
      setFormStatus({ submitted: true, success: true, message: 'Thank you for your message! We\'ll get back to you soon.' });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormStatus({ submitted: false, success: false, message: '' }), 5000);
    }, 1000);
  };

  const handleAction = (route: string) => {
    alert(`Navigate to: ${route}`);
  };

  const handleGoogleLogin = () => {
    alert('Google login coming soon!');
  };

  const handleGithub = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="lowercase elinity-page">
      <ElinityNavbar />
      <div className="relative pt-32 pb-24 overflow-hidden bg-[#03000a]">

        {/* Brand Glow */}
        <div className="absolute w-[600px] h-[600px] bg-[#3B82F6]/15 blur-[160px] rounded-full top-[-250px] left-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative text-center max-w-3xl mx-auto px-6"
        >

          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white tracking-tighter">
            Let’s Start a{" "}
            <span style={{ background: "linear-gradient(to right, #3B82F6, #7B3FE4, #00D2FF)", WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Conversation
            </span>
          </h1>

          <p className="text-neutral-400 mt-8 text-lg leading-relaxed font-light">
            We love hearing from you whether it's feedback, ideas, creative sparks,
            bugs you've noticed, feature suggestions, or simply your experience
            with Elinity.
          </p>

          <p className="text-neutral-400 mt-6 text-lg leading-relaxed font-light">
            Every message helps us grow, improve, and create more beautiful,
            meaningful experiences.
          </p>
        </motion.div>
      </div>

      <div className="relative min-h-screen bg-[#03000a] text-white flex items-center justify-center px-6 py-28 overflow-hidden">

        {/* ===== Ambient Background ===== */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[700px] h-[700px] bg-[#3B82F6]/5 blur-[200px] rounded-full top-[-250px] left-[-250px]" />
          <div className="absolute w-[600px] h-[600px] bg-[#7B3FE4]/5 blur-[180px] rounded-full bottom-[-250px] right-[-250px]" />
        </div>

        <div className="relative w-full max-w-6xl">

          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-neutral-200 tracking-tight max-w-4xl mx-auto">
              Questions, ideas, partnerships, or feedback we’d love to hear from you.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"]
            }}
            whileHover={{
              backgroundPosition: "50% 50%"
            }}
            transition={{
              duration: 0.9, 
              backgroundPosition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
            className="relative rounded-[2.5rem] p-[1px]
                       bg-[linear-gradient(135deg,#3B82F6,transparent,#7B3FE4)]
                       bg-[length:300%_300%]"
          >
            {/* Inner Glass */}
            <div className="backdrop-blur-3xl bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 md:p-20 shadow-2xl">

              <div className="grid md:grid-cols-2 gap-20">

                {/* LEFT SIDE */}
                <div className="space-y-12">
                  <h2 className="text-2xl font-semibold flex items-center gap-3">
                    Reach us directly <Sparkles size={20} className="text-[#3B82F6]" />
                  </h2>

                  <div className="space-y-10">

                    <div>
                      <p className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Email</p>
                      <p className="text-xl font-light text-neutral-200">team@elinity.ai</p>
                    </div>

                    <div>
                      <p className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Partnerships</p>
                      <p className="text-xl font-light text-neutral-200">partners@elinity.ai</p>
                    </div>

                    <div>
                      <p className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Location</p>
                      <p className="text-xl font-light text-neutral-200">London</p>
                    </div>

                  </div>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="relative">
                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-[#3B82F6]/50 focus:bg-[#3B82F6]/5 outline-none transition-all duration-300 placeholder:text-neutral-600"
                      />
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-[#3B82F6]/50 focus:bg-[#3B82F6]/5 outline-none transition-all duration-300 placeholder:text-neutral-600"
                      />
                    </div>

                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-[#3B82F6]/50 focus:bg-[#3B82F6]/5 outline-none transition-all duration-300 placeholder:text-neutral-600"
                    />

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-[#3B82F6]/50 focus:bg-[#3B82F6]/5 outline-none transition-all duration-300 placeholder:text-neutral-600"
                    />

                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-[#3B82F6]/50 focus:bg-[#3B82F6]/5 outline-none transition-all duration-300 resize-none placeholder:text-neutral-600"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4] font-bold text-white shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40 transition-all duration-500"
                    >
                      Send Message
                    </motion.button>

                    {formStatus.submitted && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 text-center text-sm ${formStatus.success ? 'text-cyan-400' : 'text-rose-500'}`}
                      >
                        {formStatus.message}
                      </motion.p>
                    )}

                  </form>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ElinityFooter />
    </div>
  );
};

export default Contact;