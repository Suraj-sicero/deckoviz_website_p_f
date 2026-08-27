import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Palette, Music, Image as ImageIcon, Video, FileText, Sparkles, MessageSquare, Save, ArrowLeft } from 'lucide-react';
import styles from './Creative.module.css';

export const Creative: React.FC = () => {
  const [activeProject, setActiveProject] = React.useState<string | null>(null);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <Palette size={32} className={styles.headerIcon} />
          <div>
            <h1>Creative Studio</h1>
            <p className={styles.subtitle}>Explore ideas and build with Vizzy</p>
          </div>
        </div>
      </header>

      <section className={styles.modesSection}>
        <h2>What would you like to create today?</h2>
        <div className={styles.modeGrid}>
          {[
            { icon: ImageIcon, label: 'Create Art', color: 'pink' },
            { icon: FileText, label: 'Create Story', color: 'blue' },
            { icon: Music, label: 'Create Music', color: 'green' },
            { icon: Video, label: 'Presentation', color: 'orange' },
            { icon: Sparkles, label: 'Explore Idea', color: 'purple' },
          ].map((mode) => (
            <motion.div 
              key={mode.label}
              whileHover={{ y: -5 }}
              onClick={() => setActiveProject(mode.label)}
              style={{ cursor: 'pointer' }}
            >
              <GlassCard interactive className={styles.modeCard}>
                <div className={`${styles.iconWrapper} ${styles[`bg-${mode.color}`]}`}>
                  <mode.icon size={24} />
                </div>
                <h3>{mode.label}</h3>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.recentSection}>
        <h2>Recent Creations</h2>
        <div className={styles.recentGrid}>
          <GlassCard className={styles.creationCard}>
            <div className={styles.creationPreviewBox}>
              <div className={styles.artMockup}></div>
            </div>
            <div className={styles.creationInfo}>
              <h3>Solar System Model</h3>
              <span className={styles.creationType}>Explore Idea • 2 days ago</span>
            </div>
          </GlassCard>

          <GlassCard className={styles.creationCard}>
            <div className={styles.creationPreviewBox}>
              <div className={styles.textMockup}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line} style={{width: '60%'}}></div>
              </div>
            </div>
            <div className={styles.creationInfo}>
              <h3>The Martian Colony</h3>
              <span className={styles.creationType}>Create Story • 1 week ago</span>
            </div>
          </GlassCard>
        </div>
      </section>

      {activeProject && (
        <div className={styles.workspaceOverlay}>
          <div className={styles.workspaceHeader}>
            <Button variant="ghost" onClick={() => setActiveProject(null)}>
              <ArrowLeft size={16} /> Back to Studio
            </Button>
            <h2>{activeProject} - Draft 3</h2>
            <Button variant="primary">
              <Save size={16} /> Save Project
            </Button>
          </div>
          
          <div className={styles.workspaceContent}>
            <GlassCard className={styles.draftArea}>
              <textarea 
                className={styles.editor} 
                defaultValue={"The neon lights reflected off the slick pavement of Sector 4. Kael pulled his collar up against the stinging rain. This was the spot. The drop was supposed to happen at midnight, but the alley was empty."}
              />
            </GlassCard>
            
            <GlassCard className={styles.feedbackArea}>
              <div className={styles.vizzyCoachHeader}>
                <Sparkles size={18} color="var(--accent-navy)"/>
                <h3>Vizzy Creative Coach</h3>
              </div>
              <div className={styles.feedbackMessage}>
                <p><strong>Strong start!</strong> You've established the cyberpunk atmosphere really well with the sensory details (neon, slick pavement, stinging rain).</p>
                <p><strong>A question for you:</strong> Why is Kael nervous? Is it the buyer, or the item he's carrying? Let's try adding one sentence about how he feels gripping the package.</p>
              </div>
              
              <div className={styles.feedbackActions}>
                <Button variant="secondary" size="sm">Accept Suggestion</Button>
                <Button variant="secondary" size="sm">Let's try a different angle</Button>
              </div>
              
              <div className={styles.chatInputRow}>
                <input type="text" placeholder="Reply to Vizzy..." className={styles.coachInput} />
                <Button variant="primary" size="sm"><MessageSquare size={16}/></Button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};
