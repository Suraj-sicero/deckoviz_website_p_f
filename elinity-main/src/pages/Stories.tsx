import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Stories = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoClick = () => {
    if (isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  /* ======================
      ANIMATION VARIANTS
  =======================*/

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white pt-28 md:pt-32 pb-16 font-sans relative overflow-hidden">

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="container mx-auto text-center px-6"
      >
        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {/* Updated: Royal Blue to Indigo Gradient */}
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4] bg-clip-text text-transparent">
            Elinity Stories :
          </span>
          <br className="md:hidden" /> Our Bridge of Love
        </motion.h1>

        <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-4 text-blue-100/80">
          Real People. Real Stories. Real Connection.
        </motion.p>

        <motion.p variants={fadeUp} className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-400 leading-relaxed">
          Every day, someone finds their person on Elinity.
          A soulmate. A serendipitous new friend. A travel buddy. A once-in-a-lifetime collaborator. A creative companion.
          Someone to dance with. To build with. To travel with. To play with. To muse with. To love.
        </motion.p>

        {/* Bridge of Love Card - Updated to Indigo/Blue Glassmorphism */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 mb-16 relative overflow-hidden bg-cover bg-center bg-[url('/heroimage1.jpg')] border border-[#3B82F6]/20 shadow-lg shadow-[#3B82F6]/10"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                This is our Bridge of Love
              </h3>
              {/* Updated: Blue Text */}
              <p className="text-[#3B82F6] mb-4 font-medium">
                - A living archive of human connection made possible by Elinity.
              </p>
              <p className="text-lg text-gray-200">
                Because this isn't just an app.<br />
                It's an ecosystem built to help you<br />
                meet the people who change your life.
              </p>
            </div>

            <div className="flex-1 max-w-[280px] md:max-w-[320px] shrink-0">
              <motion.div
                whileHover={{ rotate: 1, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-black rounded-[40px] p-2 shadow-2xl shadow-[#3B82F6]/30"
              >
                <div className="bg-white rounded-[32px] h-[500px] flex flex-col">
                  <div className="w-24 h-5 bg-black rounded-b-lg self-center"></div>
                  <div className="p-4 text-gray-800 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-black">Elinity</h4>
                      <div
  className="w-10 h-10 rounded-full bg-cover bg-center"
  style={{ backgroundImage: "url('/userlogo.png')" }}
></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stories Title - Updated to Indigo */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUp}
          className="text-3xl font-bold mb-12 text-[#7B3FE4]"
        >
          Elinity Stories
        </motion.h2>

        {/* Story Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={scaleIn}
          className="flex items-center justify-center space-x-4"
        >
          {/* Updated: Blue Arrow */}
          <button className="text-[#3B82F6] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="max-w-3xl w-full bg-white/5 rounded-2xl p-6 border border-[#3B82F6]/20 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 relative">
                <video
                  ref={videoRef}
                  src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
                  poster="/workimg2.png"
                  className="rounded-xl w-full h-[300px] object-cover cursor-pointer"
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onClick={handleVideoClick}
                />

                {!isPlaying && (
                  <motion.button
                    onClick={handlePlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    {/* Updated: Blue Glow Play Button */}
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-[#3B82F6]/70 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 8.168A1 1 0 008 9v2a1 1 0 001.555.832l3-1a1 1 0 000-1.664l-3-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.button>
                )}
              </div>

              <div className="w-full md:w-1/2 text-left">
                <h3 className="text-xl font-bold mb-4">
                  "We met as strangers. Now we're cofounders."
                </h3>
                <p className="text-gray-300 mb-4">
                  "I wanted to find someone to build something meaningful with. I matched with Mika through the Purpose Mode on Elinity. We instantly clicked, sparked, and found a purpose that fuels both of us."
                </p>
                {/* Updated: Blue Text */}
                <p className="text-sm text-[#3B82F6] font-medium"> - Jay, 31, New York</p>
              </div>
            </div>
          </motion.div>

          {/* Updated: Blue Arrow */}
          <button className="text-[#3B82F6] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* Share Story Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-2xl mx-auto text-left mt-24"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Share Your Story<br />with us
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-300 mb-6 text-lg leading-relaxed">
            {/* Updated: Blue Link */}
            Tag us on Instagram <a href="https://instagram.com/elinity.world" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] font-semibold hover:underline">@elinity.world</a> with your screenshots,
            love notes, selfies, or soul reflections.
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-300 mb-16 text-lg leading-relaxed">
            Or slide into our DMs - if you're open to it, we'll feature your story (with permission, always) here
            on Our Bridge of Love.
          </motion.p>

          <motion.p variants={fadeUp} className="text-3xl md:text-4xl font-semibold leading-snug">
            We believe in real stories, shared with heart.
            <br />
            Your journey could inspire someone else's.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Updated: Blue/Indigo Gradient Glow */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#3B82F6]/10 via-[#7B3FE4]/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Stories;