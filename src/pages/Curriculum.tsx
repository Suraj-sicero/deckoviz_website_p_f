import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '../components/ui/Button';
import { X, Sparkles, Users, User, ArrowRight, Library } from 'lucide-react';
import styles from './Curriculum.module.css';

import { COURSES, type Course } from '../data/lifeSkills';

const TRACKS = [
  'All', 
  'Emotional Intelligence', 
  'Creativity & Expression', 
  'Thinking & Decision-Making',
  'Communication & Relationships',
  'Practical Life Skills', 
  'World, Culture & Ideas',
  'Design, Invention & Creative Production',
  'Experiences Only Deckoviz Can Offer'
];

export const Curriculum: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [involvementMode, setInvolvementMode] = useState<'vizzy' | 'co-design' | 'teacher'>('co-design');

  const filteredCourses = activeTrack === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.track === activeTrack);

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <h1>A whole curriculum school was never built to teach.</h1>
        <p>
          Bring emotional intelligence, financial literacy, design thinking, and resilience into your classroom. 
          Choose a structured course, set your desired level of involvement, and let Vizzy adapt the sessions to your students.
        </p>
      </header>

      <div className={styles.filters}>
        {TRACKS.map(track => (
          <button
            key={track}
            className={`${styles.filterPill} ${activeTrack === track ? styles.active : ''}`}
            onClick={() => setActiveTrack(track)}
          >
            {track}
          </button>
        ))}
      </div>

      <div className={styles.courseGrid}>
        {filteredCourses.map(course => (
          <div key={course.id} className={styles.courseCard} onClick={() => setSelectedCourse(course)}>
            <div className={styles.courseVisual} style={{ background: course.color }}>
              <course.icon size={48} className={styles.courseIcon} />
            </div>
            <div className={styles.courseInfo}>
              <div className={styles.courseMeta}>
                <span>{course.track}</span>
                <span>{course.gradeLevel}</span>
              </div>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseDesc}>{course.description.substring(0, 100)}...</p>
              <div className={styles.courseFooter}>
                <span className={styles.sessionBadge}>{course.sessions} Sessions</span>
                <ArrowRight size={18} color="var(--accent-navy)" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <div className={styles.overlay}>
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedCourse(null)}>
                <X size={24} />
              </button>
              
              <div className={styles.modalHeader} style={{ background: selectedCourse.color }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{selectedCourse.title}</h1>
                  <span style={{ opacity: 0.9, fontSize: '1.1rem' }}>{selectedCourse.track} &bull; {selectedCourse.gradeLevel}</span>
                </div>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.modalMain}>
                  <h2>Course Overview</h2>
                  <p>{selectedCourse.description}</p>
                  
                  <div className={styles.modeSection}>
                    <h3>Teacher Involvement Mode</h3>
                    <p style={{ fontSize: '0.95rem', marginBottom: '16px' }}>Select how you'd like to deliver this course. You can adjust this setting at any point mid-course.</p>
                    
                    <div className={styles.modeGrid}>
                      <div 
                        className={`${styles.modeCard} ${involvementMode === 'vizzy' ? styles.active : ''}`}
                        onClick={() => setInvolvementMode('vizzy')}
                      >
                        <Sparkles size={24} className={styles.modeIcon} />
                        <div className={styles.modeInfo}>
                          <h4>Vizzy-Led</h4>
                          <p>Vizzy runs the full session independently. You are present but not required to facilitate.</p>
                        </div>
                      </div>

                      <div 
                        className={`${styles.modeCard} ${involvementMode === 'co-design' ? styles.active : ''}`}
                        onClick={() => setInvolvementMode('co-design')}
                      >
                        <Users size={24} className={styles.modeIcon} />
                        <div className={styles.modeInfo}>
                          <h4>Co-Designed</h4>
                          <p>Plan and deliver together. Vizzy proposes structure while you actively facilitate and contribute judgment.</p>
                        </div>
                      </div>

                      <div 
                        className={`${styles.modeCard} ${involvementMode === 'teacher' ? styles.active : ''}`}
                        onClick={() => setInvolvementMode('teacher')}
                      >
                        <User size={24} className={styles.modeIcon} />
                        <div className={styles.modeInfo}>
                          <h4>Teacher-Led, Vizzy-Assisted</h4>
                          <p>You run the session and direct Vizzy to generate specific material or support moments on request.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.sidebarPanel}>
                  <div className={styles.progressSnapshot}>
                    <h4><Library size={18} /> Progress Snapshot</h4>
                    <div className={styles.snapshotMeta}>
                      <span>Class: <span className={styles.snapshotHighlight}>Year 9 Homeroom</span></span>
                      <span>Status: <span className={styles.snapshotHighlight}>New Course</span></span>
                      <span>Total: <span className={styles.snapshotHighlight}>{selectedCourse.sessions} Sessions</span></span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                      Vizzy will automatically track where this class leaves off, preserving all decisions and generated context for the next session.
                    </p>
                  </div>
                  
                  <Button variant="primary" className={styles.startBtn}>
                    Start Session 1
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
