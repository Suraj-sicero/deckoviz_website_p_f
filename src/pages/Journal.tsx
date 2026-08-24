import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { BookOpen, Mic, Send, Sparkles, Smile, BatteryMedium } from 'lucide-react';
import styles from './Journal.module.css';
import { useAppStore } from '../store/useAppStore';

interface JournalEntry {
  id: string;
  createdAt: string;
  content: string;
  sentiment: string;
  tags: string;
}

export const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppStore(state => state.user);
  const [newEntry, setNewEntry] = useState('');

  React.useEffect(() => {
    if (user?.id) {
      fetchJournals();
    }
  }, [user]);

  const fetchJournals = () => {
    setLoading(true);
    fetch(`http://localhost:3001/api/journals?studentId=${user?.id}`)
      .then(res => res.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSaveEntry = () => {
    if (!newEntry.trim() || !user) return;
    
    fetch('http://localhost:3001/api/journals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: user.id,
        content: newEntry,
        sentiment: 'positive',
        tags: ['focus', 'learning']
      })
    })
    .then(res => res.json())
    .then(() => {
      setNewEntry('');
      fetchJournals();
    });
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
          {loading ? (
            <div style={{ color: 'white', textAlign: 'center', padding: '1rem' }}>Loading journals...</div>
          ) : entries.length === 0 ? (
            <div style={{ color: 'white', textAlign: 'center', padding: '1rem' }}>No journal entries yet.</div>
          ) : entries.map((entry) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${styles.messageBubble} ${styles.userBubble}`}
            >
              <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '4px' }}>
                {new Date(entry.createdAt).toLocaleString()}
              </div>
              <p>{entry.content}</p>
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
            value={newEntry}
            onChange={e => setNewEntry(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSaveEntry()}
          />
          <Button variant="primary" onClick={handleSaveEntry}>
            <Send size={18} />
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};
