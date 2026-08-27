import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Users, Layout, Activity, Sparkles, MessageSquare, Maximize2, Mic, Image, FileText, Video, Scale, Send } from 'lucide-react';
import styles from './Classroom.module.css';

type Mode = 'explanation' | 'simulation' | 'activity' | 'multimodal' | 'debate';

export const Classroom: React.FC = () => {
  const [mode, setMode] = useState<Mode>('multimodal');
  const [vizzyState, setVizzyState] = useState<'idle'|'listening'|'generating'>('idle');
  const [micActive, setMicActive] = useState(false);

  const handleMicToggle = () => {
    if (!micActive) {
      setMicActive(true);
      setVizzyState('listening');
      // Simulate intent capture
      setTimeout(() => setVizzyState('generating'), 2000);
      setTimeout(() => {
        setVizzyState('idle');
        setMicActive(false);
      }, 4000);
    }
  };

  return (
    <div className={styles.classroomContainer}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.liveBadge}>LIVE</div>
          <h1>Advanced Physics</h1>
          <span className={styles.topic}>Kinematics & Projectile Motion</span>
        </div>
        <div className={styles.controls}>
          <Button variant={mode === 'multimodal' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('multimodal')}>
            <Sparkles size={16} /> Multimodal Canvas
          </Button>
          <Button variant={mode === 'explanation' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('explanation')}>
            <Layout size={16} /> Explanation
          </Button>
          <Button variant={mode === 'simulation' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('simulation')}>
            <Activity size={16} /> Simulation
          </Button>
          <Button variant={mode === 'activity' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('activity')}>
            <Users size={16} /> Student Activity
          </Button>
          <Button variant={mode === 'debate' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('debate')}>
            <Scale size={16} /> Debate Mode
          </Button>
          <div className={styles.divider}></div>
          <Button variant="ghost" size="sm" title="Spatial Frame & Lighting">
            <Sparkles size={16} color="var(--accent-pink)" /> Ambient
          </Button>
          <Button variant="ghost" size="sm">
            <Maximize2 size={16} />
          </Button>
        </div>
      </header>

      <div className={styles.mainWorkspace}>
        <GlassCard className={styles.canvasArea} variant="dark">
          <AnimatePresence mode="wait">
            {mode === 'simulation' && (
              <motion.div 
                key="simulation"
                className={styles.simulationCanvas}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className={styles.simHeader}>
                  <h3>Interactive Trajectory Explorer</h3>
                  <p>Students are currently interacting with the velocity vector.</p>
                </div>
                
                {/* Visual Canvas Representation */}
                <svg className={styles.simGraphic} viewBox="0 0 800 400">
                  <defs>
                    <linearGradient id="simGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(58, 134, 255, 0.4)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  {/* Grid */}
                  <g className={styles.gridLines}>
                    {Array.from({length: 10}).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i*40} x2="800" y2={i*40} stroke="rgba(255,255,255,0.05)" />
                    ))}
                    {Array.from({length: 20}).map((_, i) => (
                      <line key={`v-${i}`} x1={i*40} y1="0" x2={i*40} y2="400" stroke="rgba(255,255,255,0.05)" />
                    ))}
                  </g>
                  {/* Arc */}
                  <path d="M50,350 Q400,-100 750,350" fill="url(#simGrad)" stroke="var(--accent-blue)" strokeWidth="3" strokeDasharray="5,5" />
                  
                  {/* Vector Arrow */}
                  <g transform="translate(50, 350)">
                    <line x1="0" y1="0" x2="150" y2="-150" stroke="var(--accent-pink)" strokeWidth="4" />
                    <polygon points="150,-150 140,-135 135,-140" fill="var(--accent-pink)" transform="rotate(45 150 -150)"/>
                    <text x="80" y="-80" fill="white" fontSize="16">v₀ (Initial Velocity)</text>
                  </g>
                  
                  {/* Moving Particle */}
                  <circle cx="0" cy="0" r="10" fill="white" filter="drop-shadow(0 0 10px #fff)">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M50,350 Q400,-100 750,350" />
                  </circle>
                </svg>

                <div className={styles.simControls}>
                  <div className={styles.controlGroup}>
                    <label>Velocity (v₀)</label>
                    <input type="range" min="10" max="100" defaultValue="50" />
                  </div>
                  <div className={styles.controlGroup}>
                    <label>Angle (θ)</label>
                    <input type="range" min="0" max="90" defaultValue="45" />
                  </div>
                </div>
              </motion.div>
            )}
            
            {mode === 'multimodal' && (
              <motion.div 
                key="multimodal" 
                className={styles.multimodalCanvas}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className={styles.intentCaptureBar}>
                  <Button 
                    variant={micActive ? 'primary' : 'secondary'} 
                    className={micActive ? styles.micActive : ''}
                    onClick={handleMicToggle}
                  >
                    <Mic size={18} /> {micActive ? 'Listening...' : 'Voice Cue (e.g. "show water cycle")'}
                  </Button>
                  <input type="text" placeholder="Or type an intent..." className={styles.intentInput} />
                </div>

                <div className={styles.multiGrid}>
                  <div className={styles.multiItemPrimary}>
                    <div className={styles.multiHeader}><Image size={16}/> Generated Diagram</div>
                    <div className={styles.mockWaterCycle}></div>
                  </div>
                  <div className={styles.multiSide}>
                    <div className={styles.multiItem}>
                      <div className={styles.multiHeader}><FileText size={16}/> Learning Poster</div>
                      <div className={styles.mockTextLines}>
                        <div className={styles.mLine}></div>
                        <div className={styles.mLine}></div>
                        <div className={styles.mLine} style={{width:'80%'}}></div>
                      </div>
                    </div>
                    <div className={styles.multiItem}>
                      <div className={styles.multiHeader}><Video size={16}/> Short Video</div>
                      <div className={styles.mockVideo}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {mode === 'explanation' && (
              <motion.div key="exp" className={styles.placeholderState}>
                <Layout size={64} opacity={0.2} />
                <h2>Explanation Mode</h2>
                <p>Presenting slides and core concepts to the class.</p>
              </motion.div>
            )}
            
            {mode === 'activity' && (
              <motion.div key="act" className={styles.placeholderState}>
                <Users size={64} opacity={0.2} />
                <h2>Student Activity Mode</h2>
                <p>Students are currently solving practice problems on their devices.</p>
              </motion.div>
            )}

            {mode === 'debate' && (
              <motion.div 
                key="debate" 
                className={styles.debateCanvas}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', color: 'white', padding: '1rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Debate: Renewable Energy vs. Fossil Fuels</h3>
                    <p style={{ margin: '0.25rem 0 0 0', opacity: 0.7, fontSize: '0.9rem' }}>Class Stance: Pro-Renewable | Vizzy Stance: Pro-Fossil Fuels</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,0,110,0.2)', color: '#ff006e', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>Vizzy: 2 Points</div>
                    <div style={{ padding: '0.25rem 0.75rem', background: 'rgba(58,134,255,0.2)', color: '#3a86ff', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>Class: 3 Points</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: 1, minHeight: 0 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontWeight: 500 }}>Debate Log</div>
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ alignSelf: 'flex-start', background: 'rgba(58,134,255,0.1)', padding: '0.75rem 1rem', borderRadius: '12px 12px 12px 0', border: '1px solid rgba(58,134,255,0.3)', maxWidth: '85%' }}>
                        <span style={{ fontSize: '0.7rem', color: '#3a86ff', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>CLASS (Sarah)</span>
                        Solar panels are cheaper than ever and don't produce greenhouse gases during operation.
                      </div>
                      <div style={{ alignSelf: 'flex-end', background: 'rgba(255,0,110,0.1)', padding: '0.75rem 1rem', borderRadius: '12px 12px 0 12px', border: '1px solid rgba(255,0,110,0.3)', maxWidth: '85%' }}>
                        <span style={{ fontSize: '0.7rem', color: '#ff006e', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>VIZZY</span>
                        That's true regarding operation, but the manufacturing and disposal of solar panels produce toxic waste. Plus, they only generate power when the sun shines, requiring massive, environmentally damaging lithium batteries for storage.
                      </div>
                    </div>
                    <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem' }}>
                       <input type="text" placeholder="Counter-argue..." style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', padding: '0.5rem 0.75rem', color: 'white' }} />
                       <Button variant="primary" size="sm" style={{ padding: '0 0.75rem' }}><Send size={16} /></Button>
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', opacity: 0.8 }}><Image size={16}/> Generated Evidence</div>
                       <div style={{ flex: 1, background: 'linear-gradient(45deg, #2b2b2b, #1a1a1a)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                          {/* Placeholder for the chart generated by Vizzy */}
                          <div style={{ width: '80%', height: '60%', borderLeft: '2px solid rgba(255,255,255,0.5)', borderBottom: '2px solid rgba(255,255,255,0.5)', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '0 1rem' }}>
                             <div style={{ width: '30%', height: '40%', background: '#3a86ff', borderRadius: '4px 4px 0 0' }}></div>
                             <div style={{ width: '30%', height: '80%', background: '#ff006e', borderRadius: '4px 4px 0 0' }}></div>
                          </div>
                          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Chart: Lithium Mining Environmental Impact vs. Fossil Fuels</p>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        <div className={styles.sidebar}>
          <GlassCard className={styles.vizzyPanel}>
            <div className={styles.vizzyHeader}>
              <div className={`${styles.vizzyAvatar} ${styles[`avatar-${vizzyState}`]}`}>
                <Sparkles size={18} color="white"/>
              </div>
              <div>
                <h3>Vizzy Assistant</h3>
                <span className={styles.vizzyStatus}>{vizzyState === 'idle' ? 'Present & Ready' : vizzyState === 'listening' ? 'Listening...' : 'Generating...'}</span>
              </div>
            </div>
            <div className={styles.vizzyContent}>
              <p>Alex and 2 others are experimenting with extreme angles (θ &gt; 80°).</p>
              <Button variant="ghost" size="sm">Broadcast Insight to Class</Button>
            </div>
          </GlassCard>

          <GlassCard className={styles.studentsPanel}>
            <div className={styles.panelHeader}>
              <h3>Class (24)</h3>
              <MessageSquare size={16} />
            </div>
            <div className={styles.studentList}>
              {['Alex', 'Sarah', 'Michael', 'Emma', 'David'].map(student => (
                <div key={student} className={styles.studentItem}>
                  <div className={styles.studentAvatar}>{student[0]}</div>
                  <span className={styles.studentName}>{student}</span>
                  <div className={styles.statusDot}></div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
