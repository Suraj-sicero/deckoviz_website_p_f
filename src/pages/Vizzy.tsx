import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Send, Image as ImageIcon, Map, Activity, Sparkles, BookOpen, Trash2 } from 'lucide-react';
import styles from './Vizzy.module.css';

import { useAppStore } from '../store/useAppStore';

interface Message {
  id: string;
  sender: 'student' | 'vizzy';
  text: string;
  visualContext?: 'physics-trajectory' | 'biology-cell' | 'history-timeline';
}

export const Vizzy: React.FC = () => {
  const user = useAppStore(state => state.user);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3001/api/chat/session?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setSessionId(data.id);
          try {
            setMessages(JSON.parse(data.content));
          } catch (e) {
            console.error("Failed to parse chat history");
          }
        });
    }
  }, [user]);

  const handleSend = (textParam?: string) => {
    const messageText = typeof textParam === 'string' ? textParam : inputValue;
    if (!messageText.trim() || !sessionId || isLoading) return;

    const newMessage: Message = { id: Date.now().toString(), sender: 'student', text: messageText };
    setMessages(prev => [...prev, newMessage]);
    if (typeof textParam !== 'string') setInputValue('');
    setIsLoading(true);

    fetch('http://localhost:3001/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        message: messageText,
        history: messages
      })
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [...prev, data]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const handleClearChat = () => {
    if (!sessionId) return;
    setIsLoading(true);
    fetch('http://localhost:3001/api/chat/session', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, userName: user?.name })
    })
      .then(res => res.json())
      .then(data => {
        try {
          setMessages(JSON.parse(data.content));
        } catch (e) {
          console.error("Failed to parse chat history");
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.vizzyContainer}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Sparkles className={styles.icon} />
          <h1>Vizzy AI Companion</h1>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className={styles.contextBadge}>
            <BookOpen size={16} />
            Current Context: Physics (Kinematics)
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearChat} style={{ color: 'var(--text-secondary)' }}>
            <Trash2 size={16} />
          </Button>
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
                    {(msg.text || '').split(/(?:!\[(.*?)\]\((.*?)\))/g).map((part, i, arr) => {
                      if (i % 3 === 0) return <span key={i}>{part}</span>;
                      if (i % 3 === 1) return null;
                      const alt = arr[i - 1];
                      return (
                        <div key={i} style={{ marginTop: '1rem', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <img src={part} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                      );
                    })}
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
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.messageVizzy}
                >
                  <div className={styles.messageBubble}>
                    <span style={{ fontStyle: 'italic', opacity: 0.7 }}>Vizzy is thinking...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <div className={styles.suggestedActions}>
              <Button variant="ghost" size="sm" onClick={() => handleSend("Can you show this to me visually?")}><ImageIcon size={14} /> Show visually</Button>
              <Button variant="ghost" size="sm" onClick={() => handleSend("Let's practice this with some questions.")}><Activity size={14} /> Practice with me</Button>
              <Button variant="ghost" size="sm" onClick={() => handleSend("Can you explain this differently?")}><Map size={14} /> Explain differently</Button>
            </div>
            
            <div className={styles.inputBox}>
              <input 
                type="text" 
                placeholder="Ask Vizzy to explain, visualize, or challenge you..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button variant="primary" onClick={() => handleSend()}>
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
