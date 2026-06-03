import React, { useState } from 'react';

const GOOGLE_LOGO = (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
    <g>
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.07 1.53 7.47 2.81l5.54-5.39C33.64 3.61 29.28 1.5 24 1.5 14.98 1.5 7.13 7.44 4.13 15.09l6.91 5.36C12.83 14.09 17.01 9.5 24 9.5z"/>
      <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.01l7.18 5.59C43.87 37.13 46.1 31.36 46.1 24.55z"/>
      <path fill="#FBBC05" d="M10.96 28.45c-.48-1.44-.76-2.97-.76-4.55s.28-3.11.76-4.55l-6.91-5.36C2.7 17.36 1.5 20.55 1.5 24s1.2 6.64 3.55 9.45l6.91-5.36z"/>
      <path fill="#EA4335" d="M24 46.5c6.48 0 11.92-2.14 15.89-5.84l-7.18-5.59c-2 1.36-4.56 2.18-8.71 2.18-6.99 0-11.17-4.59-12.96-8.86l-6.91 5.36C7.13 40.56 14.98 46.5 24 46.5z"/>
      <path fill="none" d="M1.5 1.5h45v45h-45z"/>
    </g>
  </svg>
);

const GITHUB_URL = 'https://github.com/elinityai/elinityai-main';

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#a855f7] via-[#3a185a] to-[#181848] py-12 md:py-20 px-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row rounded-3xl shadow-2xl bg-[#181848]/80 backdrop-blur-lg" style={{ boxShadow: '0 8px 40px 0 rgba(168,85,247,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}>
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 py-8 md:py-12" style={{ background: 'linear-gradient(135deg, #b983ff 0%, #a855f7 60%, #3a185a 100%)' }}>
          <span className="text-white text-lg font-semibold mb-2">⦿ Elinity</span>
          <h2 className="text-4xl font-extrabold text-white mb-2 text-center">Get Started with Us</h2>
          <p className="text-purple-100 mb-8 text-center max-w-xs text-base">Got any question about the Product we are here to help you 24/7.</p>
          <div className="w-full max-w-xs space-y-4">
            <button className="w-full flex items-center gap-3 px-6 py-3 rounded-lg bg-white text-[#181848] font-bold text-lg shadow hover:scale-105 transition-transform"><span className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">1</span> Chat With Us</button>
            <button className="w-full flex items-center gap-3 px-6 py-3 rounded-lg bg-[#23235b] text-white font-bold text-lg shadow hover:scale-105 transition-transform"><span className="bg-[#a855f7] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">2</span> Book a call</button>
            <button className="w-full flex items-center gap-3 px-6 py-3 rounded-lg bg-[#23235b] text-white font-bold text-lg shadow hover:scale-105 transition-transform"><span className="bg-[#3a185a] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">3</span> Shoot Us with Email</button>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 bg-[#181848]/90 flex flex-col justify-center px-4 md:px-10 py-8 md:py-12 rounded-r-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Let's Talk with Us</h2>
          <p className="text-purple-100 mb-6 text-base">Let's Talk about what we can do together.</p>
          <div className="flex gap-4 mb-6">
            <button onClick={() => alert('Google login coming soon!')} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full border border-[#33336b] text-white font-semibold bg-transparent hover:bg-[#23235b] transition focus:ring-2 focus:ring-[#a855f7]">
              {GOOGLE_LOGO} Google
            </button>
            <button onClick={() => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full border border-[#33336b] text-white font-semibold bg-transparent hover:bg-[#23235b] transition focus:ring-2 focus:ring-[#a855f7]">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877.617.113.844-.267.844-.595 0-.293-.011-1.07-.017-2.099-3.338.726-4.042-1.61-4.042-1.61-.561-1.426-1.37-1.807-1.37-1.807-1.12-.765.085-.75.085-.75 1.237.087 1.89 1.27 1.89 1.27 1.1 1.888 2.887 1.343 3.593 1.028.112-.797.43-1.343.782-1.653-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.442.381.833 1.134.833 2.287 0 1.651-.015 2.981-.015 3.385 0 .33.225.713.85.592C18.345 21.125 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
              Github
            </button>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-[#a855f7] to-[#23235b]"></div>
            <span className="mx-2 text-purple-300 text-xs">Or</span>
            <div className="flex-1 h-px bg-gradient-to-l from-[#a855f7] to-[#23235b]"></div>
          </div>
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-purple-200 mb-1" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="eg. John"
                  className="w-full px-4 py-3 rounded-lg bg-[#23235b] text-white border border-[#23235b] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-purple-200 mb-1" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="eg. Francisco"
                  className="w-full px-4 py-3 rounded-lg bg-[#23235b] text-white border border-[#23235b] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-purple-200 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="eg. johnfrans@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-[#23235b] text-white border border-[#23235b] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-200 mb-1" htmlFor="phone">Phone No</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+44 755 2546 452"
                className="w-full px-4 py-3 rounded-lg bg-[#23235b] text-white border border-[#23235b] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
              />
            </div>
            <div>
              <label className="block text-sm text-purple-200 mb-1" htmlFor="message">Leave Us Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Leave Us Message"
                className="w-full px-4 py-3 rounded-lg bg-[#23235b] text-white border border-[#23235b] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base min-h-[100px]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#a855f7] to-[#7c4dff] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 