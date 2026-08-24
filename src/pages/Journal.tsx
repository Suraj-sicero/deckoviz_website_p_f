import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { BookOpen, Mic, Send, Sparkles, Smile, BatteryMedium } from 'lucide-react';
import styles from './Journal.module.css';

export const Journal: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'vizzy', text: "Hey! You mentioned struggling with those quadratic equations yesterday. How did today's practice go?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    // Adaptive response logic
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'vizzy', text: "That makes sense. It's totally okay to feel stuck. I've adjusted tomorrow's math review to be a bit gentler so we can build up your confidence. Anything else on your mind today?" }]);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <BookOpen size={32} className={styles.headerIcon} />
          <div>
            <h1>Daily Study Journal</h1>
            <p className={styles.subtitle}>A quiet space to reflect on your learning</p>
          </div>
        </div>
        
        <div className={styles.moodIndicators}>
          <div className={styles.moodBadge}><Smile size={16} /> Relaxed Tone</div>
          <div className={styles.moodBadge}><BatteryMedium size={16} /> Low Energy Detected</div>
        </div>
      </header>

      <GlassCard className={styles.chatArea}>
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${styles.messageBubble} ${msg.role === 'vizzy' ? styles.vizzyBubble : styles.userBubble}`}
            >
              {msg.role === 'vizzy' && <Sparkles size={16} className={styles.bubbleIcon} />}
              <p>{msg.text}</p>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.inputArea}>
          <Button variant="secondary" className={styles.micBtn} title="Voice entry">
            <Mic size={20} />
          </Button>
          <input 
            type="text" 
            placeholder="Type your reflection here..." 
            className={styles.textInput}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <Button variant="primary" onClick={handleSend}>
            <Send size={18} />
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};
