import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Users, Settings, Database, BookOpen, ShieldCheck } from 'lucide-react';
import styles from './Admin.module.css';

export const Admin: React.FC = () => {
  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>School Administration</h1>
        <p className={styles.subtitle}>System Overview & Management</p>
      </header>

      <div className={styles.statsRow}>
        <GlassCard className={styles.statCard}>
          <Users size={24} className={styles.statIcon} />
          <div>
            <div className={styles.statValue}>1,248</div>
            <div className={styles.statLabel}>Total Students</div>
          </div>
        </GlassCard>
        <GlassCard className={styles.statCard}>
          <ShieldCheck size={24} className={styles.statIcon} />
          <div>
            <div className={styles.statValue}>84</div>
            <div className={styles.statLabel}>Active Teachers</div>
          </div>
        </GlassCard>
        <GlassCard className={styles.statCard}>
          <BookOpen size={24} className={styles.statIcon} />
          <div>
            <div className={styles.statValue}>32</div>
            <div className={styles.statLabel}>Curriculum Modules</div>
          </div>
        </GlassCard>
      </div>

      <div className={styles.mainGrid}>
        <GlassCard className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>System Settings</h3>
            <Settings size={18} color="var(--text-secondary)" />
          </div>
          <div className={styles.settingItem}>
            <div>
              <h4>AI Features (Vizzy)</h4>
              <p>Allow students to access generative AI tools</p>
            </div>
            <div className={styles.toggleActive}></div>
          </div>
          <div className={styles.settingItem}>
            <div>
              <h4>Global Audio Cues</h4>
              <p>Enable interaction sounds across the platform</p>
            </div>
            <div className={styles.toggleActive}></div>
          </div>
          <div className={styles.settingItem}>
            <div>
              <h4>Strict Mode Testing</h4>
              <p>Lock down interface during assessments</p>
            </div>
            <div className={styles.toggleInactive}></div>
          </div>
        </GlassCard>

        <GlassCard className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Data & Reports</h3>
            <Database size={18} color="var(--text-secondary)" />
          </div>
          <p className={styles.panelDesc}>Generate school-wide analytics and compliance reports.</p>
          <div className={styles.reportActions}>
            <Button variant="secondary" size="sm" fullWidth>Export Student Progress</Button>
            <Button variant="secondary" size="sm" fullWidth>Export Teacher Activity</Button>
            <Button variant="secondary" size="sm" fullWidth>System Health Log</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
