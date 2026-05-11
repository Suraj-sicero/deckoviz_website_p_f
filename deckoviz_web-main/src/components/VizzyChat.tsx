import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, X, Minimize2, Maximize2, Sparkles, 
  ChevronDown, Zap, RotateCcw 
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const VIZZY_API = `${API_BASE}/api/wizzy`;

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: `Hey, welcome to Deckoviz ✨\n\nI'm **Vizzy** — your guide to adaptive spaces, evolving art, mood-driven environments, and all the wonderfully futuristic ways spaces can come alive.\n\nSo… what kind of atmosphere are you dreaming about lately? Cozy? Immersive? Inspiring? Calm? Something your guests never forget?`,
  timestamp: new Date(),
};

const SUGGESTED_PROMPTS = [
  "What is Deckoviz?",
  "How can it transform my home?",
  "I run a restaurant — how can this help?",
  "Tell me about adaptive art",
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
      className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Sparkles size={14} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-sm shadow-lg shadow-indigo-500/20"
            : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm backdrop-blur-sm"
        }`}
      >
        {renderContent(message.content)}
        <div
          className={`text-[10px] mt-1.5 ${
            isUser ? "text-indigo-200" : "text-gray-600"
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
    className="flex items-end gap-3"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
      <Sparkles size={14} className="text-white" />
    </div>
    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 backdrop-blur-sm">
      <div className="flex gap-1 items-center h-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            className="w-1.5 h-1.5 rounded-full bg-violet-400"
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
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
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
      {/* ── Floating Trigger Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="vizzy-chat-trigger"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Open Vizzy Chat"
          >
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300 scale-110" />
            {/* Button */}
            <span className="relative flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 shadow-xl shadow-indigo-900/50 hover:shadow-indigo-700/60 transition-all duration-300 border border-white/10">
              <Sparkles size={18} className="text-white" />
              <span className="text-sm font-semibold text-white tracking-wide">Ask Vizzy</span>
            </span>
          </motion.button>
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
            className={`fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60 backdrop-blur-2xl bg-[#0a0a14]/95 transition-all duration-300 ${
              isExpanded
                ? "w-[min(90vw,680px)] h-[80vh]"
                : "w-[min(90vw,400px)] h-[600px]"
            }`}
          >
            {/* ── Header ── */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-r from-violet-900/40 to-indigo-900/40 flex-shrink-0">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5" />

              <div className="relative flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/40">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-wide">Vizzy</span>
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-widest">Online</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">Deckoviz AI Concierge</p>
                </div>
              </div>

              <div className="relative flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
                  title="Close"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                  className="px-4 pb-3 flex gap-2 flex-wrap"
                >
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input Bar ── */}
            <div className="px-3 pb-3 flex-shrink-0 border-t border-white/5 pt-3">
              <div className="relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-violet-500/50 focus-within:bg-white/[0.07] transition-all duration-200">
                <textarea
                  ref={inputRef}
                  id="vizzy-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Vizzy anything…"
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 resize-none outline-none max-h-24 min-h-[24px] leading-6"
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
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center disabled:opacity-30 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-md shadow-violet-900/50 self-end mb-0.5"
                  title="Send"
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
              <p className="text-[9px] text-gray-700 text-center mt-1.5">
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
