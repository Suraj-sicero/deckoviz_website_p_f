import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { 
  Send, X, Minimize2, Maximize2, Sparkles, 
  ChevronDown, Zap, RotateCcw, Plus 
} from "lucide-react";


// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

import { API_BASE_URL } from "../lib/constants";

const VIZZY_API = `${API_BASE_URL}/api/vizzy`;

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi, I'm Vizzy! Quick question before we dive in - would you like to take a short quiz so I can show you exactly how Deckoviz could work in your space? It takes about two minutes and I'll put together a personalised snapshot for you at the end.",
  timestamp: new Date(),
};

const SUGGESTED_PROMPTS = [
  "Would you like to take a short quiz that will help you understand how Deckoviz might be most useful for you in your space?",
  "What is the core idea behind Deckoviz?",
  "How does it change the vibe of a living space?",
  "Can it be used for commercial spaces like restaurants?",
  "What exactly is 'living' or adaptive art?",
];

const ADDITIONAL_PROMPTS = [
  "How does it function as a smart digital canvas?",
  "What are the ways I can co-create with the AI?",
  "Tell me more about the dynamic poster feature.",
  "How does it adapt to family routines and moods?",
  "How can we use it for interactive bedtime stories?",
  "What benefits does it offer for retail environments?",
];

// ─────────────────────────────────────────────
// Message Bubble
// ─────────────────────────────────────────────
const MessageBubble: React.FC<{ message: Message; isLatest: boolean }> = ({
  message,
  isLatest,
}) => {
  const isUser = message.role === "user";

  // Render markdown-lite: bold **text** and line breaks
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-12 h-12 mt-0.5 relative flex items-center justify-center rounded-full group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4F75FF] via-purple-500 to-fuchsia-400 rounded-full opacity-70 blur-[6px] group-hover:blur-[10px] group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
          <div className="absolute inset-0 bg-white/90 border border-white/60 rounded-full shadow-[inset_0_-3px_8px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300 overflow-hidden">
            <div className="absolute -top-1 left-[15%] right-[15%] h-[40%] bg-gradient-to-b from-white to-transparent rounded-full opacity-90"></div>
          </div>
          <motion.img 
            src="/images/vizzy.jpg" 
            alt="Vizzy" 
            className="relative z-10 w-[92%] h-[92%] object-cover rounded-full mix-blend-multiply drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          />
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-[#4F75FF] to-[#9B51E0] text-white rounded-tr-sm shadow-lg shadow-purple-900/20"
            : "bg-[#252a50] border border-white/5 text-gray-100 rounded-tl-sm shadow-sm"
        }`}
      >
        {renderContent(message.content)}
        <div
          className={`text-[10px] mt-1.5 ${
            isUser ? "text-blue-100" : "text-[#8a91be]"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Typing indicator
// ─────────────────────────────────────────────
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    className="flex items-start gap-3"
  >
    <div className="flex-shrink-0 w-12 h-12 mt-0.5 relative flex items-center justify-center rounded-full group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4F75FF] via-purple-500 to-fuchsia-400 rounded-full opacity-70 blur-[6px] group-hover:blur-[10px] group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      <div className="absolute inset-0 bg-white/90 border border-white/60 rounded-full shadow-[inset_0_-3px_8px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300 overflow-hidden">
        <div className="absolute -top-1 left-[15%] right-[15%] h-[40%] bg-gradient-to-b from-white to-transparent rounded-full opacity-90"></div>
      </div>
      <motion.img 
        src="/images/vizzy.jpg" 
        alt="Vizzy" 
        className="relative z-10 w-[92%] h-[92%] object-cover rounded-full mix-blend-multiply drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
      />
    </div>
    <div className="bg-[#252a50] border border-white/5 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
      <div className="flex gap-1 items-center h-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            className="w-1.5 h-1.5 rounded-full bg-[#8a91be]"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// Main Vizzy Chat Component
// ─────────────────────────────────────────────
const VizzyChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dragControls = useDragControls();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [hasError, setHasError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setHasError(false);
    setShowSuggestions(false);

    try {
      const conversationMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${VIZZY_API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationMessages }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message?.content || "Something went wrong. Let me try that again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Vizzy chat error:", error);
      setHasError(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm, I ran into a little technical hiccup there. Give me a moment and try again? ✨",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowSuggestions(true);
    setHasError(false);
  };

  return (
    <>
      {/* ── Ask Vizzy Button Trigger ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            drag
            dragMomentum={false}
            className="group fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] flex items-end cursor-pointer"
            onClick={() => setIsOpen(true)}
            style={{ touchAction: "none" }}
          >
            {/* Thought Bubble - Shows on hover */}
            <div className="absolute right-full bottom-4 mr-4 z-20 pointer-events-none hidden md:block opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
              <div 
                className="bg-white/95 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(37,99,235,0.2)] rounded-3xl p-5 w-[300px] text-[12px] leading-[1.6] text-[#2c3e50] font-medium relative transform transition-all duration-300"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-bold block mb-1.5 text-[13px]">Hey, I am Vizzy! ✨</span>
                How are you enjoying exploring the magical Vizzyverse? It's pretty awesome, right! Anything I can help you with?
                
                {/* Bubble Tail pointing right */}
                <div className="absolute top-1/2 -right-[7px] -translate-y-1/2 w-4 h-4 bg-white/95 border-t border-r border-white transform rotate-45 z-10"></div>
              </div>
            </div>
            
            {/* Mascot Image - Grows on hover */}
            <div 
              className="w-[70px] sm:w-[80px] md:w-[90px] group-hover:w-[130px] group-hover:sm:w-[150px] group-hover:md:w-[170px] relative z-10 translate-y-2 drop-shadow-xl transition-all duration-500 ease-out group-active:scale-95 origin-bottom"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
              <img 
                src="/images/vizzy.jpg" 
                alt="Ask Vizzy Mascot" 
                className="w-full h-auto object-contain rounded-[30px] mix-blend-multiply brightness-[1.05] pointer-events-none select-none transition-all duration-500" 
                style={{ 
                  maskImage: 'radial-gradient(ellipse at center, black 65%, transparent 75%)', 
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 65%, transparent 75%)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="vizzy-chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 30, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            layout
            className={`fixed bottom-24 right-4 md:bottom-6 md:right-8 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-black/50 bg-[#1a1f3c] ${
              isExpanded
                ? "w-[min(95vw,900px)] h-[min(92vh,1000px)]"
                : "w-[min(95vw,450px)] h-[min(85vh,850px)]"
            }`}
          >
            {/* ── Header ── */}
            <div 
              className="relative flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
              style={{ touchAction: "none" }}
            >

              <div className="relative flex items-center gap-3">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4F75FF] via-purple-500 to-fuchsia-400 rounded-full opacity-70 blur-[6px] group-hover:blur-[10px] group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                  <div className="absolute inset-0 bg-white/90 border border-white/60 rounded-full shadow-[inset_0_-3px_8px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300 overflow-hidden">
                    <div className="absolute -top-1 left-[15%] right-[15%] h-[40%] bg-gradient-to-b from-white to-transparent rounded-full opacity-90"></div>
                  </div>
                  <motion.img 
                    src="/images/vizzy.jpg" 
                    alt="Vizzy" 
                    className="relative z-10 w-[92%] h-[92%] object-cover rounded-full mix-blend-multiply drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]" 
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 8 }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-white tracking-wide">Vizzy</span>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#103031]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                      <span className="text-[9px] font-bold text-[#22c55e] uppercase tracking-widest">Online</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8a91be]">Deckoviz AI Concierge</p>
                </div>
              </div>

              <div className="relative flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-[#7c84b1] hover:text-white transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-[#7c84b1] hover:text-white transition-colors"
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-[#7c84b1] hover:text-white transition-colors"
                  title="Close"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}

              <AnimatePresence>
                {isLoading && <TypingIndicator />}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggested Prompts ── */}
            <AnimatePresence>
              {showSuggestions && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-3 flex gap-2 flex-wrap items-center flex-shrink-0"
                >
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#252a50] border border-white/10 text-[#8a91be] hover:text-white hover:border-[#4F75FF]/50 hover:bg-white/5 transition-all duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                  
                  {/* Plus Button */}
                  {!showAllSuggestions && (
                    <button
                      onClick={() => setShowAllSuggestions(true)}
                      className="text-xs px-2 py-1.5 rounded-full bg-[#252a50] border border-white/10 text-[#4F75FF] hover:text-[#7693FF] hover:border-[#4F75FF]/50 hover:bg-white/5 transition-all duration-200 flex items-center justify-center"
                      title="Show more questions"
                    >
                      <Plus size={14} />
                    </button>
                  )}

                  {/* Additional Prompts */}
                  {showAllSuggestions && ADDITIONAL_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#252a50] border border-white/10 text-[#8a91be] hover:text-white hover:border-[#4F75FF]/50 hover:bg-white/5 transition-all duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input Bar ── */}
            <div className="px-3 pb-3 flex-shrink-0 border-t border-white/5 pt-3 bg-[#1a1f3c]">
              <div className="relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-[#4F75FF]/50 focus-within:ring-2 focus-within:ring-[#4F75FF]/20 focus-within:bg-white/10 transition-all duration-200 shadow-inner">
                <textarea
                  ref={inputRef}
                  id="vizzy-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Vizzy anything…"
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#5e6691] resize-none outline-none max-h-24 min-h-[24px] leading-6"
                  style={{
                    height: "auto",
                    overflowY: input.split("\n").length > 3 ? "auto" : "hidden",
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = target.scrollHeight + "px";
                  }}
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F75FF] to-[#9B51E0] flex items-center justify-center disabled:opacity-30 hover:shadow-[0_0_15px_rgba(79,117,255,0.4)] transition-all duration-200 shadow-md shadow-purple-900/40 self-end mb-0.5"
                  title="Send"
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
              <p className="text-[9px] text-[#5e6691] text-center mt-1.5">
                Powered by Deckoviz AI · Vizzy may occasionally make mistakes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VizzyChat;
