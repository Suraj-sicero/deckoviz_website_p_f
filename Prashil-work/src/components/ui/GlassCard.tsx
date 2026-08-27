import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import styles from './GlassCard.module.css';
import { clsx } from 'clsx';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'dark';
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  interactive = false,
  ...props 
}) => {
  return (
    <motion.div 
      className={clsx(
        styles.card,
        styles[`variant-${variant}`],
        interactive && styles.interactive,
        className
      )}
      whileHover={interactive ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
