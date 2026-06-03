import React, { useState, useRef } from 'react';
import BlogCard from './BlogCard';
import { blogs } from '../constants/blogs';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const INITIAL_COUNT = 6;

// Reveal animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

/**
 * A wrapper component that applies 3D tilt based on the card's column position.
 */
const TiltWrapper = ({ children, isVisible }) => {
  const cardRef = useRef(null);
  
  // Create motion values to store the rotation angles
  const xRotate = useMotionValue(0);
  const yRotate = useMotionValue(0);
  const zPop = useMotionValue(0);

  // Smooth the rotation changes
  const springConfig = { stiffness: 300, damping: 20 };
  const smoothX = useSpring(xRotate, springConfig);
  const smoothY = useSpring(yRotate, springConfig);
  const smoothZ = useSpring(zPop, springConfig);

  const calculateTilt = () => {
    const card = cardRef.current;
    if (!card) return;

    const parent = card.closest('.grid');
    if (!parent) return;

    const parentWidth = parent.offsetWidth;
    const leftOffset = card.offsetLeft; 
    
    const colWidth = parentWidth / 3; 
    
    const middleStart = colWidth - 50; 
    const middleEnd = (colWidth * 2) + 50;

    if (leftOffset < middleStart) {
      // LEFT COLUMN: Tilt RIGHT
      yRotate.set(8);
      xRotate.set(0);
    } else if (leftOffset > middleEnd) {
      // RIGHT COLUMN: Tilt LEFT
      yRotate.set(-8);
      xRotate.set(0);
    } else {
      // CENTER COLUMN: Tilt UP
      xRotate.set(5);
      yRotate.set(0);
    }
    
    zPop.set(40);
  };

  const resetTilt = () => {
    xRotate.set(0);
    yRotate.set(0);
    zPop.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d"
      }}
      className="relative group h-full cursor-pointer"
      onMouseEnter={calculateTilt}
      onMouseLeave={resetTilt}
    >
      {/* Dynamic Glow Background - Updated to Royal Blue */}
      <motion.div
        className="absolute inset-0 rounded-[20px] bg-blue-500/10 blur-2xl z-0 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: (smoothX.get() !== 0 || smoothY.get() !== 0) ? 1 : 0 }}
      />

      {/* The Actual Card - Updated to Space Black */}
      <motion.div
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          z: smoothZ,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full h-full bg-[#030014] rounded-[20px] overflow-hidden border border-white/5 shadow-2xl shadow-black/50"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const BlogContainer = () => {
  const [showAll, setShowAll] = useState(false);
  const filteredBlogs = blogs.filter(blog => blog.id !== 1);
  const visibleBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, INITIAL_COUNT);

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden px-4 sm:px-6 mx-auto">
      <div className='pt-8'></div>

      {/* GRID */}
      <motion.div
        id="blog-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        <AnimatePresence mode="popLayout">
          {visibleBlogs.map((blog) => (
            <TiltWrapper key={blog.id} isVisible={true}>
              <BlogCard
                {...blog}
                highlight={
                  blog.content
                    .replace(/<[^>]*>/g, '')
                    .split(' ')
                    .slice(18, 50)
                    .join(' ') + '...'
                }
              />
            </TiltWrapper>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* BUTTON - Updated to Royal Blue/Electric Indigo Gradient */}
      {blogs.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-16 mb-16 px-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-14 py-4 overflow-hidden rounded-xl bg-black text-white font-bold transition-all border border-blue-500/20 shadow-xl shadow-blue-500/5"
            onClick={() => {
              if (showAll) {
                const element = document.getElementById('blog-start');
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
              setShowAll(prev => !prev);
            }}
          >
            {/* Elinity Brand Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4] opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-xs sm:text-sm tracking-wider">
              {showAll ? 'show less' : 'explore more'}
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default BlogContainer;