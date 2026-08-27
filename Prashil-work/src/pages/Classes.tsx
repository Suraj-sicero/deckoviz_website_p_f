import React from 'react';

import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Users, AlertTriangle, TrendingUp, Sparkles, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Classes.module.css';

export const Classes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Teacher Dashboard</h1>
        <p className={styles.subtitle}>Insights and Actions for Today</p>
      </header>

      <div className={styles.actionGrid}>
        <GlassCard className={styles.actionCard} variant="highlight">
          <div className={styles.cardHeader}>
            <AlertTriangle className={styles.iconWarning} />
            <h3>Needs Attention</h3>
          </div>
          <p className={styles.actionText}>3 students may need help with <strong>quadratic equations</strong>.</p>
          <div className={styles.actions}>
            <Button variant="ghost" size="sm">View Students</Button>
            <Button variant="primary" size="sm">Generate Remedial Lesson</Button>
          </div>
        </GlassCard>

        <GlassCard className={styles.actionCard}>
          <div className={styles.cardHeader}>
            <TrendingUp className={styles.iconSuccess} />
            <h3>Class Progress</h3>
          </div>
          <p className={styles.actionText}>Class mastery in <strong>Physics</strong> increased 12% this week.</p>
          <div className={styles.actions}>
            <Button variant="ghost" size="sm">View Report</Button>
          </div>
        </GlassCard>

        <GlassCard className={styles.actionCard}>
          <div className={styles.cardHeader}>
            <Sparkles className={styles.iconInfo} />
            <h3>Ready for Challenge</h3>
          </div>
          <p className={styles.actionText}>5 students are ready for the advanced Algebra module.</p>
          <div className={styles.actions}>
            <Button variant="secondary" size="sm">Assign Challenge</Button>
          </div>
        </GlassCard>
      </div>

      <section className={styles.scheduleSection}>
        <h2>Today's Classes</h2>
        <div className={styles.classList}>
          <GlassCard className={styles.classItem}>
            <div className={styles.classInfo}>
              <div className={styles.time}>09:00 AM</div>
              <div>
                <h3>Advanced Physics (Grade 11)</h3>
                <p>Topic: Kinematics & Projectile Motion</p>
              </div>
            </div>
            <div className={styles.classActions}>
              <div className={styles.studentCount}><Users size={16}/> 24 Students</div>
              <Button variant="primary" onClick={() => navigate('/classroom')}>
                <Play size={16} /> Launch Session
              </Button>
            </div>
          </GlassCard>

          <GlassCard className={styles.classItem}>
            <div className={styles.classInfo}>
              <div className={styles.time}>11:00 AM</div>
              <div>
                <h3>Algebra Foundations (Grade 9)</h3>
                <p>Topic: Polynomials</p>
              </div>
            </div>
            <div className={styles.classActions}>
              <div className={styles.studentCount}><Users size={16}/> 28 Students</div>
              <Button variant="secondary">Prepare Lesson</Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};
