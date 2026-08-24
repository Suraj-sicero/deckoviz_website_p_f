import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Send, Image as ImageIcon, Map, Activity, Sparkles, BookOpen } from 'lucide-react';
import styles from './Vizzy.module.css';

interface Message {
  id: string;
  sender: 'student' | 'vizzy';
  text: string;
  visualContext?: 'physics-trajectory' | 'biology-cell' | 'history-timeline';
}

export const Vizzy: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'vizzy',
      text: "Hi Alex! I noticed you were looking at polynomial functions earlier. Would you like to visualize how changing the coefficients affects the curve?",
    }
  ]);
  const [inputValue, setInputValue] = useState('');


  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = { id: Date.now().toString(), sender: 'student', text: inputValue };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate Vizzy thinking and returning a visual answer
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          sender: 'vizzy', 
          text: "Here is a visualization of the trajectory. Notice how gravity curves the path. What do you think happens if we double the initial velocity?",
          visualContext: 'physics-trajectory' 
        }
      ]);
    }, 1500);
  };

  return (
    <div className={styles.vizzyContainer}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Sparkles className={styles.icon} />
          <h1>Vizzy AI Companion</h1>
        </div>
        <div className={styles.contextBadge}>
          <BookOpen size={16} />
          Current Context: Physics (Kinematics)
        </div>
      </header>

      <div className={styles.mainArea}>
        <GlassCard className={styles.chatArea}>
          <div className={styles.messageList}>
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={msg.sender === 'vizzy' ? styles.messageVizzy : styles.messageStudent}
                >
                  <div className={styles.messageBubble}>
                    {msg.text}
                  </div>
                  
                  {msg.visualContext === 'physics-trajectory' && (
                    <motion.div 
                      className={styles.visualContainer}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Placeholder for actual physics simulation */}
                      <div className={styles.simulationMock}>
                        <div className={styles.trajectoryPath}></div>
                        <div className={styles.particle}></div>
                      </div>
                      <div className={styles.visualLabel}>Trajectory Simulation</div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className={styles.inputArea}>
            <div className={styles.suggestedActions}>
              <Button variant="ghost" size="sm"><ImageIcon size={14} /> Show visually</Button>
              <Button variant="ghost" size="sm"><Activity size={14} /> Practice with me</Button>
              <Button variant="ghost" size="sm"><Map size={14} /> Explain differently</Button>
            </div>
            
            <div className={styles.inputBox}>
              <input 
                type="text" 
                placeholder="Ask Vizzy to explain, visualize, or challenge you..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button variant="primary" onClick={handleSend}>
                <Send size={18} />
              </Button>
            </div>
          </div>
        </GlassCard>

        <div className={styles.sidePanel}>
          <GlassCard className={styles.learningStateCard}>
            <h3>Learning State</h3>
            <div className={styles.stateDetail}>
              <span>Pace:</span>
              <div className={styles.paceBar}><div className={styles.paceFill} style={{ width: '75%' }}></div></div>
            </div>
            <div className={styles.stateDetail}>
              <span>Focus:</span>
              <span className={styles.focusTag}>High</span>
            </div>
            <p className={styles.insightText}>
              You seem to learn best when presented with spatial diagrams. Vizzy will prioritize visual answers.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
