import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Users, AlertTriangle, TrendingUp, Sparkles, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Classes.module.css';
import { useAppStore } from '../store/useAppStore';

interface ClassData {
  id: string;
  name: string;
  subject: string;
  gradeLevel: string;
  teacherId: string;
}

export const Classes: React.FC = () => {
  const navigate = useNavigate();
  const { user, role } = useAppStore();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetch(`http://localhost:3001/api/classes?userId=${user.id}&role=${role}`)
        .then(res => res.json())
        .then(data => {
          setClasses(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, role]);

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
          {loading ? (
            <div style={{ color: 'white', padding: '1rem' }}>Loading classes...</div>
          ) : classes.length === 0 ? (
            <div style={{ color: 'white', padding: '1rem' }}>No classes assigned today.</div>
          ) : classes.map((c) => (
            <GlassCard key={c.id} className={styles.classItem}>
              <div className={styles.classInfo}>
                <div className={styles.time}>09:00 AM</div>
                <div>
                  <h3>{c.name} ({c.gradeLevel})</h3>
                  <p>Topic: {c.subject} Lesson</p>
                </div>
              </div>
              <div className={styles.classActions}>
                <div className={styles.studentCount}><Users size={16}/> 24 Students</div>
                <Button variant="primary" onClick={() => navigate('/classroom')}>
                  <Play size={16} /> Launch Session
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};
