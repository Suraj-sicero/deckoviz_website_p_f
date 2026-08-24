import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/ui/Button';
import { Sparkles, Flame, Bell } from 'lucide-react';
import { TeacherDashboard } from '../components/home/TeacherDashboard';
import { StudentCompanions } from '../components/home/StudentCompanions';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const role = useAppStore(state => state.role);

  return (
    <motion.div 
      className={styles.homeContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <div>
          <div className={styles.greetingRow}>
            <h1 className={styles.greeting}>
              Good morning, {role === 'student' ? 'Alex' : role === 'teacher' ? 'Mr. Smith' : 'Admin'}
            </h1>
            {role === 'student' && (
              <div className={styles.streakBadge}>
                <Flame size={16} className={styles.flameIcon} />
                <span>5 Days</span>
              </div>
            )}
          </div>
          <p className={styles.subtitle}>
            {role === 'student' 
              ? "Let's explore something new today." 
              : "Your classes are ready. 3 students might need attention today."}
          </p>
        </div>
        <div className={styles.headerActions}>
          {role === 'student' && (
            <div className={styles.goalPill}>
              <span className={styles.goalText}>2/3 Tasks Done</span>
            </div>
          )}
          <button className={styles.bellButton}>
            <Bell size={20} />
            <span className={styles.notificationDot}></span>
          </button>
          <Button variant="primary">
            <Sparkles size={18} />
            Ask Vizzy
          </Button>
        </div>
      </header>

      {/* Adaptive visual environment placeholder */}
      {role === 'teacher' ? (
        <TeacherDashboard />
      ) : (
        <section className={styles.adaptiveEnvironment}>
          <div className={styles.environmentVisual}>
            <div className={styles.orbitContainer}>
              <div className={styles.orbitRing1}></div>
              <div className={styles.orbitRing2}></div>
              <div className={styles.particleCore}></div>
              <div className={styles.particle1}></div>
              <div className={styles.particle2}></div>
            </div>
            <div className={styles.envGlow}></div>
          </div>
          <div className={styles.envContent}>
            <div className={styles.focusPill}>Module 4 &bull; In Progress</div>
            <h2>Current Focus: Quantum Physics</h2>
            <p>You left off exploring subatomic particles. Vizzy has been tracking your interest in this since 8th grade! Ready to see the simulation?</p>
            <Button variant="primary" className={styles.envButton}>Resume Simulation</Button>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressFill} style={{ width: '65%' }}></div>
          </div>
        </section>
      )}

      {role !== 'teacher' && (
        <StudentCompanions />
      )}
    </motion.div>
  );
};
