import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { TOOLS } from '../data/tools';
import { ArrowRight } from 'lucide-react';
import styles from './ToolLibrary.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export const ToolLibrary: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Prompt-Based Tools</h1>
          <p>
            Explore our curated library of specialized teaching modes and interactive sessions designed to build critical thinking, engagement, and deep learning.
          </p>
        </motion.div>
      </header>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {TOOLS.map((tool) => (
          <motion.div key={tool.id} variants={itemVariants}>
            <GlassCard className={styles.card} interactive>
              <div 
                className={styles.iconWrapper}
                style={{ background: tool.color }}
              >
                <tool.icon size={24} />
              </div>
              <h3 className={styles.title}>{tool.title}</h3>
              <p className={styles.description}>{tool.description}</p>
              
              <div className={styles.cardFooter}>
                Launch Session <ArrowRight size={14} style={{ marginLeft: '4px' }} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
