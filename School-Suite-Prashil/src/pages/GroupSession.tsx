import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Users, Sparkles, AlertCircle } from 'lucide-react';
import styles from './GroupSession.module.css';

const MOCK_ROSTER = [
  { id: 1, name: 'Emma', engagement: 'high', recent: 'Shared an idea about gravity.' },
  { id: 2, name: 'Liam', engagement: 'low', recent: 'Has not spoken in 5 mins.' },
  { id: 3, name: 'Sophia', engagement: 'medium', recent: 'Listening attentively.' },
  { id: 4, name: 'Noah', engagement: 'medium', recent: 'Working on personal canvas.' }
];

export const GroupSession: React.FC = () => {
  const [vizzyAction, setVizzyAction] = useState<string | null>(null);

  const triggerFacilitation = () => {
    setVizzyAction("Noticing Liam hasn't participated. Generating a low-pressure prompt linking his interest in cars to the physics topic...");
    setTimeout(() => {
      setVizzyAction(null);
    }, 5000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <Users size={32} className={styles.headerIcon} />
          <div>
            <h1>Group Learning Session</h1>
            <p className={styles.subtitle}>Vizzy is facilitating discussion and shared activities</p>
          </div>
        </div>
        <Button variant="secondary" onClick={triggerFacilitation}>
          <Sparkles size={16} /> Simulate Facilitation
        </Button>
      </header>

      <div className={styles.layout}>
        <div className={styles.mainCanvas}>
          <GlassCard className={styles.sharedCanvasCard}>
            <div className={styles.canvasHeader}>
              <h3>Class Shared Canvas: Physics Simulation</h3>
              <span className={styles.badge}>Live Collaboration</span>
            </div>
            
            <div className={styles.canvasWorkspace}>
              {vizzyAction && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className={styles.vizzyIntervention}
                >
                  <Sparkles size={20} color="var(--accent-pink)" />
                  <p>{vizzyAction}</p>
                </motion.div>
              )}
              
              <div className={styles.mockSimulation}>
                <div className={styles.orbitContainer}>
                  <div className={styles.planetCenter}></div>
                  <div className={styles.orbitRing}>
                    <div className={styles.satellite}></div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className={styles.sidebar}>
          <GlassCard className={styles.rosterCard}>
            <h3>Active Roster</h3>
            <p className={styles.rosterDesc}>Vizzy is monitoring participation balance</p>
            
            <div className={styles.studentList}>
              {MOCK_ROSTER.map(student => (
                <div key={student.id} className={styles.studentItem}>
                  <div className={styles.studentAvatar}>{student.name.charAt(0)}</div>
                  <div className={styles.studentInfo}>
                    <div className={styles.studentTop}>
                      <span className={styles.studentName}>{student.name}</span>
                      {student.engagement === 'low' && <span title="Low Engagement" style={{display:'flex'}}><AlertCircle size={14} color="var(--accent-orange)" /></span>}
                    </div>
                    <span className={styles.studentRecent}>{student.recent}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
