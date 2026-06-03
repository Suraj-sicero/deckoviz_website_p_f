import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import BlogCategoryTabs from './BlogCategoryTabs';
import FeaturedBlogCarousel from './FeaturedBlogCarousel';
import BlogGrid from './BlogGrid';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const BlogList = () => {
  return (
    /* Updated Background: Space Black to Deep Indigo */
    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-[#0a0a2e] text-white flex flex-col">
      
      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="flex-1 max-w-7xl mx-auto px-4 pt-28 md:pt-32 pb-16 w-full overflow-x-hidden"
      >
        
        {/* Tabs Section */}
        <motion.div
          variants={fadeUp}
          whileInView="visible"
          viewport={{ once: false }}
          className="relative mb-8"
        >
          <BlogCategoryTabs />
        </motion.div>
        
        <br />

        {/* Featured Section */}
        <motion.section
          variants={fadeUp}
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mb-12"
        >
          <motion.h1
            variants={fadeUp}
            className="text-2xl md:text-4xl font-bold mb-6 text-left text-white tracking-tight"
          >
            Featured <span className="text-[#3B82F6]">Blogs</span> {/* Updated: Royal Blue */}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <FeaturedBlogCarousel />
          </motion.div>
        </motion.section>
        
        {/* Grid Section */}
        <motion.section
          variants={fadeUp}
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-xl md:text-3xl font-bold mb-8 text-left text-white tracking-tight"
          >
            Stay Updated with <span className="text-[#3B82F6]">Elinity</span> {/* Updated: Royal Blue */}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <BlogGrid />
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default BlogList;