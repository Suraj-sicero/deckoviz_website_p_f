import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  id: string;
  isStreaming?: boolean;
}

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  hue: number;
  opacity: number;
  blur: number;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const streamIntervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const newOrbs: Orb[] = [
      { id: 0, x: 20, y: 20, size: 180, vx: 0.08, vy: 0.06, hue: 260, opacity: 0.45, blur: 60 },
      { id: 1, x: 75, y: 60, size: 220, vx: -0.07, vy: 0.09, hue: 290, opacity: 0.4, blur: 70 },
      { id: 2, x: 50, y: 80, size: 150, vx: 0.1, vy: -0.05, hue: 320, opacity: 0.35, blur: 50 },
      { id: 3, x: 10, y: 65, size: 130, vx: 0.06, vy: -0.08, hue: 240, opacity: 0.3, blur: 55 },
      { id: 4, x: 85, y: 15, size: 160, vx: -0.09, vy: 0.07, hue: 270, opacity: 0.38, blur: 65 },
    ];
    setOrbs(newOrbs);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }
    const animate = () => {
      setOrbs(prev => prev.map(o => {
        let nx = o.x + o.vx;
        let ny = o.y + o.vy;
        let nvx = o.vx;
        let nvy = o.vy;
        if (nx <= 0 || nx >= 100) nvx *= -1;
        if (ny <= 0 || ny >= 100) nvy *= -1;
        return { ...o, x: Math.max(0, Math.min(100, nx)), y: Math.max(0, Math.min(100, ny)), vx: nvx, vy: nvy };
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setMounted(true), 50);
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, streamingText]);

  const streamText = useCallback((text: string, messageId: string) => {
    const words = text.split(' ');
    let i = 0;
    streamIntervalRef.current = setInterval(() => {
      if (i < words.length) {
        setStreamingText(prev => (i === 0 ? words[0] : prev + ' ' + words[i]));
        i++;
      } else {
        clearInterval(streamIntervalRef.current);
        setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isStreaming: false, text } : m));
        setStreamingText('');
      }
    }, 40);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { sender: 'user', text: input, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    const sentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://sudharsan051006-lumi-ai.hf.space/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: sentInput }),
      });
      const data = await response.json();
      const responseText = data.response || data.message || "I couldn't process that.";
      const aiMsgId = (Date.now() + 1).toString();
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'ai', text: '', id: aiMsgId, isStreaming: true }]);
      setTimeout(() => streamText(responseText, aiMsgId), 100);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Connection error. Please try again.', id: (Date.now() + 1).toString() }]);
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif' }}>

        {/* Chat window */}
        {isOpen && (
          <div style={{
            position: 'relative',
            width: 420,
            height: 620,
            marginBottom: 16,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.94)',
            transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)',
          }}>

            {/* Animated orb background */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: 32, overflow: 'hidden', pointerEvents: 'none' }}>
              {orbs.map(o => (
                <div key={o.id} style={{
                  position: 'absolute',
                  left: `${o.x}%`,
                  top: `${o.y}%`,
                  width: o.size,
                  height: o.size,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 40% 40%, hsla(${o.hue},85%,72%,${o.opacity}), hsla(${o.hue + 30},80%,55%,0))`,
                  filter: `blur(${o.blur}px)`,
                  transform: 'translate(-50%,-50%)',
                  transition: 'left 0.4s linear, top 0.4s linear',
                }} />
              ))}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(0px)',
              }} />
            </div>

            {/* Glass card */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 32,
              background: 'rgba(255,255,255,0.62)',
              backdropFilter: 'blur(48px) saturate(200%)',
              WebkitBackdropFilter: 'blur(48px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 24px 80px rgba(99,74,183,0.18), 0 8px 24px rgba(99,74,183,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>

              {/* Header */}
              <div style={{
                padding: '18px 22px',
                background: 'linear-gradient(135deg, rgba(99,74,183,0.08) 0%, rgba(163,53,126,0.06) 50%, rgba(59,130,246,0.05) 100%)',
                borderBottom: '1px solid rgba(99,74,183,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #a855f7 70%, #c026d3 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                    animation: 'lumi-float 3s ease-in-out infinite',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="white" opacity="0.95"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.2px', color: '#1e1b4b' }}>Lumi</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: isTyping ? '#f59e0b' : '#10b981',
                        boxShadow: isTyping ? '0 0 6px #f59e0b' : '0 0 6px #10b981',
                        animation: 'lumi-pulse-dot 2s ease-in-out infinite',
                      }} />
                      <span style={{ fontSize: 11, color: '#6b7280', letterSpacing: '0.2px' }}>
                        {isTyping ? 'thinking…' : 'online'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    padding: '4px 10px', borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
                    border: '1px solid rgba(99,102,241,0.2)',
                    fontSize: 11, fontWeight: 600, color: '#6366f1', letterSpacing: '0.3px',
                  }}>AI</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer',
                      width: 32, height: 32, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#6b7280', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,74,183,0.12)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3.293 3.293a1 1 0 011.414 0L8 6.586l3.293-3.293a1 1 0 111.414 1.414L9.414 8l3.293 3.293a1 1 0 01-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 8 3.293 4.707a1 1 0 010-1.414z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>

                {messages.length === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '0 24px' }}>
                    <div style={{ fontSize: 52, animation: 'lumi-float 2.5s ease-in-out infinite', marginBottom: 16 }}>✦</div>
                    <div style={{
                      fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #c026d3)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      marginBottom: 8,
                    }}>Hey, I'm Lumi</div>
                    <div style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6, maxWidth: 220 }}>
                      Ask me anything - I'm here to help you out.
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {['How is Elinity different from dating apps?', 'Tell me a fun fact about elinity', 'what are elinity\'s features?'].map((s, i) => (
                        <button
                          key={i}
                          onClick={() => setInput(s)}
                          style={{
                            padding: '7px 13px', borderRadius: 20, border: '1px solid rgba(99,102,241,0.2)',
                            background: 'rgba(99,102,241,0.06)', color: '#6366f1', fontSize: 12,
                            fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                            fontFamily: 'inherit',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div key={msg.id} style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-end',
                    gap: 8,
                    animation: 'lumi-slide-in 0.35s cubic-bezier(0.16,1,0.3,1) both',
                    animationDelay: `${idx * 0.04}s`,
                  }}>
                    {msg.sender === 'ai' && (
                      <div style={{
                        width: 28, height: 28, borderRadius: 9, flexShrink: 0, marginBottom: 2,
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, boxShadow: '0 2px 8px rgba(139,92,246,0.3)',
                      }}>✦</div>
                    )}
                    <div style={{
                      maxWidth: '74%',
                      padding: '12px 16px',
                      borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: 14,
                      lineHeight: 1.6,
                      wordBreak: 'break-word',
                      ...(msg.sender === 'user' ? {
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                        color: '#fff',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                      } : {
                        background: 'rgba(255,255,255,0.9)',
                        color: '#1e1b4b',
                        border: '1px solid rgba(99,74,183,0.1)',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      }),
                    }}>
                      {msg.isStreaming ? (
                        <>{streamingText}<span style={{ opacity: 0.6, animation: 'lumi-blink 1s step-end infinite', marginLeft: 1 }}>|</span></>
                      ) : msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 9, flexShrink: 0,
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, boxShadow: '0 2px 8px rgba(139,92,246,0.3)',
                    }}>✦</div>
                    <div style={{
                      padding: '14px 18px', borderRadius: '18px 18px 18px 4px',
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(99,74,183,0.1)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                      display: 'flex', gap: 5, alignItems: 'center',
                    }}>
                      {[0, 0.18, 0.36].map((d, i) => (
                        <div key={i} style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8b5cf6, #c026d3)',
                          animation: `lumi-dot 1.2s ease-in-out ${d}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input area */}
              <div style={{
                padding: '14px 16px',
                borderTop: '1px solid rgba(99,74,183,0.08)',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(20px)',
                flexShrink: 0,
              }}>
                {/* Shimmer bar above input */}
                <div style={{
                  height: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(168,85,247,0.4), rgba(192,38,211,0.4), transparent)',
                  marginBottom: 12,
                  animation: 'lumi-shimmer 2.5s linear infinite',
                  backgroundSize: '200% 100%',
                }} />
                <div style={{
                  display: 'flex', gap: 10,
                  background: 'rgba(255,255,255,0.85)',
                  borderRadius: 18,
                  padding: '6px 6px 6px 16px',
                  border: '1.5px solid rgba(99,102,241,0.18)',
                  boxShadow: '0 4px 20px rgba(99,74,183,0.08)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Message Lumi…"
                    style={{
                      flex: 1, border: 'none', outline: 'none', fontSize: 14,
                      background: 'transparent', fontFamily: 'inherit', color: '#1e1b4b',
                      padding: '6px 0',
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    style={{
                      width: 38, height: 38, borderRadius: 13, border: 'none', cursor: 'pointer',
                      background: input.trim()
                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)'
                        : 'rgba(0,0,0,0.06)',
                      color: input.trim() ? '#fff' : '#9ca3af',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                      flexShrink: 0,
                      boxShadow: input.trim() ? '0 4px 14px rgba(99,102,241,0.4)' : 'none',
                      transform: input.trim() ? 'scale(1)' : 'scale(0.92)',
                    }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: '#c4b5fd', letterSpacing: '0.3px' }}>
                  Powered by Lumi AI
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trigger button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative',
              width: 62,
              height: 62,
              borderRadius: '50%',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #a855f7 70%, #c026d3 100%)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(99,102,241,0.45), 0 4px 12px rgba(139,92,246,0.3)',
              animation: 'lumi-trigger 2.5s ease-in-out infinite',
              fontSize: 26,
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1) rotate(8deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
          >
            <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', animation: 'lumi-ring 2s ease-in-out infinite', border: '2px solid rgba(99,102,241,0.35)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: -7, borderRadius: '50%', animation: 'lumi-ring 2s ease-in-out 0.4s infinite', border: '1.5px solid rgba(168,85,247,0.2)', pointerEvents: 'none' }} />
            ✦
          </button>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes lumi-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes lumi-slide-in {
          from { opacity: 0; transform: translateY(14px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lumi-dot {
          0%, 60%, 100% { transform: scale(0.5); opacity: 0.4; }
          30% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes lumi-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes lumi-trigger {
          0%, 100% { box-shadow: 0 8px 32px rgba(99,102,241,0.45), 0 4px 12px rgba(139,92,246,0.3); }
          50% { box-shadow: 0 12px 48px rgba(99,102,241,0.65), 0 6px 20px rgba(168,85,247,0.4); }
        }
        @keyframes lumi-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes lumi-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes lumi-pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        *::-webkit-scrollbar { width: 4px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.2); border-radius: 8px; }
        *::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.4); }

        @media (max-width: 480px) {
          .lumi-chat-card {
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
}