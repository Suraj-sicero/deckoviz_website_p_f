import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Target, Award, Brain, TrendingUp } from 'lucide-react';
import styles from './Progress.module.css';
import { clsx } from 'clsx';

const milestones = [
  { id: '1', title: 'Algebra Foundations', subject: 'Math', date: 'Aug 12', score: 92, insight: 'Excellent spatial reasoning shown in graph plotting.' },
  { id: '2', title: 'Cell Structures', subject: 'Biology', date: 'Sep 15', score: 88, insight: 'Struggled initially with mitochondria function, but improved after Vizzy 3D simulation.' },
  { id: '3', title: 'Kinematics', subject: 'Physics', date: 'Oct 18', score: 95, insight: 'Mastered projectile motion formulas quickly.' },
  { id: '4', title: 'Literary Devices', subject: 'English', date: 'Oct 22', score: 85, insight: 'Good grasp of metaphors; needs practice on allegories.' },
];

export const Progress: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState(milestones[2]);
  const [filter, setFilter] = useState<string | null>(null);

  const handleFilter = (subject: string) => {
    setFilter(prev => prev === subject ? null : subject);
  };

  return (
    <div className={styles.progressContainer}>
      <header className={styles.header}>
        <h1>Progress & Growth</h1>
        <p className={styles.subtitle}>Your learning trajectory over time</p>
      </header>

      <div className={styles.mainLayout}>
        <div className={styles.visualizationArea}>
          <GlassCard className={styles.trajectoryCard}>
            <div className={styles.chartHeader}>
              <h3>Learning Trajectory</h3>
              <div className={styles.legend}>
                <button onClick={() => handleFilter('Math')} className={clsx(styles.legendItem, styles.colorMath, filter === 'Math' && styles.activeFilter)}>Math</button>
                <button onClick={() => handleFilter('Biology')} className={clsx(styles.legendItem, styles.colorBio, filter === 'Biology' && styles.activeFilter)}>Biology</button>
                <button onClick={() => handleFilter('Physics')} className={clsx(styles.legendItem, styles.colorPhysics, filter === 'Physics' && styles.activeFilter)}>Physics</button>
                <button onClick={() => handleFilter('English')} className={clsx(styles.legendItem, styles.colorEnglish, filter === 'English' && styles.activeFilter)}>English</button>
              </div>
            </div>

            <div className={styles.svgContainer}>
              <svg viewBox="0 0 800 400" className={styles.svgChart}>
                {/* Background grid (vertical lines for timeline) */}
                <path d="M100,50 L100,350 M300,50 L300,350 M500,50 L500,350 M700,50 L700,350" stroke="rgba(43, 30, 112, 0.1)" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Timeline axis labels */}
                <text x="100" y="370" className={styles.axisText} textAnchor="middle">Aug</text>
                <text x="300" y="370" className={styles.axisText} textAnchor="middle">Sep</text>
                <text x="500" y="370" className={styles.axisText} textAnchor="middle">Oct</text>
                <text x="700" y="370" className={styles.axisText} textAnchor="middle">Nov</text>
                
                {/* Connection line */}
                <motion.path 
                  d="M100,300 Q200,280 300,220 T500,150 T700,80" 
                  fill="none" 
                  stroke="rgba(43, 30, 112, 0.15)" 
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Nodes */}
                {milestones.map((m, i) => {
                  const cx = 100 + i * 200;
                  const cy = 300 - (i * 70) + (i % 2 === 0 ? 0 : 20); // staggered
                  const isActive = activeMilestone.id === m.id;
                  const isFaded = filter && m.subject !== filter;
                  
                  return (
                    <motion.g 
                      key={m.id} 
                      className={clsx(styles.nodeGroup, isFaded && styles.fadedNode)}
                      onClick={() => setActiveMilestone(m)}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: isFaded ? 0.3 : 1 }}
                      transition={{ delay: 1 + (i * 0.2) }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <circle cx={cx} cy={cy} r="16" className={clsx(styles.nodeOuter, isActive && styles.nodeActiveOuter)} stroke={`var(--color-${m.subject.toLowerCase()})`} />
                      <circle cx={cx} cy={cy} r="8" className={styles.nodeInner} fill={`var(--color-${m.subject.toLowerCase()})`} />
                      
                      {/* ForeignObject for high-contrast HTML pill label */}
                      <foreignObject x={cx - 75} y={cy + 25} width="150" height="40">
                        <div className={styles.nodeLabelPill}>
                          {m.title}
                        </div>
                      </foreignObject>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </GlassCard>

          <div className={styles.statsGrid}>
            <GlassCard className={styles.statCard}>
              <Target className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statValue}>88%</span>
                <span className={styles.statLabel}>Avg. Mastery</span>
              </div>
            </GlassCard>
            <GlassCard className={styles.statCard}>
              <Brain className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statValue}>14</span>
                <span className={styles.statLabel}>Concepts Unlocked</span>
              </div>
            </GlassCard>
            <GlassCard className={styles.statCard}>
              <TrendingUp className={styles.statIcon} />
              <div className={styles.statInfo}>
                <span className={styles.statValue}>+12%</span>
                <span className={styles.statLabel}>Growth this month</span>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className={styles.sidebar}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ height: '100%' }}
            >
              <GlassCard className={styles.detailCard}>
                <div className={styles.detailHeader}>
                  <Award size={32} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailDate}>{activeMilestone.date}</span>
                    <h2>{activeMilestone.title}</h2>
                    <span className={clsx(styles.detailSubjectTag, styles[`tag${activeMilestone.subject}`])}>{activeMilestone.subject}</span>
                  </div>
                </div>

                <div className={styles.radialContainer}>
                  <div className={styles.scoreRing}>
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(43, 30, 112, 0.05)" strokeWidth="8" />
                      <motion.circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke={`var(--color-${activeMilestone.subject.toLowerCase()})`}
                        strokeWidth="8"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 - (283 * activeMilestone.score) / 100 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="58" textAnchor="middle" className={styles.scoreText}>{activeMilestone.score}%</text>
                    </svg>
                  </div>
                </div>

                <div className={styles.insightSection}>
                  <h3>Vizzy Insight</h3>
                  <p>{activeMilestone.insight}</p>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
