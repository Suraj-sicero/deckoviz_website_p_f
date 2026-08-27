import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { FileSearch, Settings, Play, CheckCircle, BarChart2 } from 'lucide-react';
import styles from './Evaluation.module.css';

export const Evaluation: React.FC = () => {
  const [sessionState, setSessionState] = useState<'setup' | 'analysis'>('setup');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <FileSearch size={32} className={styles.headerIcon} />
          <div>
            <h1>Evaluation & Mapping</h1>
            <p className={styles.subtitle}>AI-guided, adaptive student assessments</p>
          </div>
        </div>
      </header>

      {sessionState === 'setup' && (
        <div className={styles.setupGrid}>
          <GlassCard className={styles.configCard}>
            <div className={styles.cardHeader}>
              <h3><Settings size={18}/> New Session Setup</h3>
            </div>
            
            <div className={styles.formGroup}>
              <label>Target Student</label>
              <select className={styles.selectInput}>
                <option>Emma T. (8th Grade Math)</option>
                <option>Liam P. (8th Grade Math)</option>
              </select>
              <p className={styles.helpText}>Questions will be dynamically calibrated against their Deep Student Profile.</p>
            </div>

            <div className={styles.formGroup}>
              <label>Feedback Timing</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="feedback" defaultChecked />
                  <span>Withheld (End of test)</span>
                </label>
                <label className={styles.radioLabel}>
                  <input type="radio" name="feedback" />
                  <span>Instant (Per question)</span>
                </label>
              </div>
            </div>

            <Button variant="primary" onClick={() => setSessionState('analysis')}>
              <Play size={16} /> Launch Assessment
            </Button>
          </GlassCard>

          <GlassCard className={styles.recentCard}>
            <div className={styles.cardHeader}>
              <h3>Recent Analyses</h3>
            </div>
            <div className={styles.historyList}>
              <div className={styles.historyItem} onClick={() => setSessionState('analysis')} style={{ cursor: 'pointer' }}>
                <CheckCircle size={16} color="var(--accent-green)"/>
                <div>
                  <h4>Sophia M. - Linear Equations</h4>
                  <span>Completed 2 hours ago</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {sessionState === 'analysis' && (
        <div className={styles.analysisView}>
          <div className={styles.analysisHeader}>
            <Button variant="ghost" onClick={() => setSessionState('setup')}>Back to Setup</Button>
            <h2>Deep Analysis: Sophia M. (Linear Equations)</h2>
          </div>

          <div className={styles.analysisGrid}>
            <GlassCard className={styles.scoreCard}>
              <h3>Reasoning Quality</h3>
              <div className={styles.scoreValue}>High</div>
              <p>Sophia successfully identified isolating variables across all standard structures.</p>
            </GlassCard>
            
            <GlassCard className={styles.scoreCard}>
              <h3>Pattern Recognition</h3>
              <div className={styles.scoreValue}>Emerging</div>
              <p>Struggled slightly when constants were negative. Pattern recognition dropped under cognitive load.</p>
            </GlassCard>

            <GlassCard className={styles.actionCard}>
              <div className={styles.cardHeader}>
                <h3><BarChart2 size={18}/> Actionable Observations</h3>
              </div>
              <ul className={styles.observationList}>
                <li><strong>Strength:</strong> Arithmetic execution is flawless. No simple calculation errors.</li>
                <li><strong>Gap:</strong> Hesitates on distributing negative signs across parentheses.</li>
                <li><strong>Next Step:</strong> Vizzy will introduce low-stakes negative distribution puzzles in her next Daily Journal.</li>
              </ul>
              <div className={styles.overrideSection}>
                <label>Teacher Override / Notes</label>
                <textarea className={styles.overrideInput} placeholder="Add your own observations to Sophia's profile..."></textarea>
                <Button variant="secondary" size="sm">Save Note</Button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};
