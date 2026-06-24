import React, { useState, useRef, useEffect } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "explanation" | "quiz" | "roadmap" | "text";
  quiz?: { question: string; options: string[]; answer: string; explanation: string };
  roadmap?: { topic: string; steps: { step: number; title: string; duration: string; resources: string[] }[] };
}

const LearningPortalTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answeredQuiz, setAnsweredQuiz] = useState<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startSession = async () => {
    if (!topic.trim()) return;
    setSessionStarted(true);
    setMessages([]);

    const welcomeMsg: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Welcome! I'm Vizzy, your AI tutor for **${topic}**. 🎓\n\nI can help you with:\n• **📖 Explanations** - Ask me to explain any concept\n• **🧪 Quizzes** - Type "quiz me" for practice questions\n• **🗺️ Roadmap** - Type "show roadmap" for a learning path\n\nWhat would you like to explore first?`,
      type: "text",
    };
    setMessages([welcomeMsg]);
  };

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const userInput = input.trim();
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/learning-portal/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          message: userInput,
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        type: data.type,
        quiz: data.quiz,
        roadmap: data.roadmap,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        type: "text",
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const renderMessage = (msg: Message) => {
    if (msg.role === "user") {
      return (
        <div key={msg.id} className="flex justify-end mb-4">
          <div className="max-w-[80%] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-3xl rounded-tr-md text-sm font-medium shadow-lg">
            {msg.content}
          </div>
        </div>
      );
    }

    return (
      <div key={msg.id} className="flex justify-start mb-4">
        <div className="max-w-[85%] space-y-3">
          {/* Text content */}
          <div className="bg-white/90 backdrop-blur border border-white/60 px-5 py-4 rounded-3xl rounded-tl-md shadow-md">
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {msg.content.split("**").map((part, i) =>
                i % 2 === 1
                  ? <strong key={i} className="font-bold text-gray-900">{part}</strong>
                  : part
              )}
            </div>
          </div>

          {/* Quiz card */}
          {msg.quiz && (
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-50 border border-indigo-200 rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3">🧪 Quiz Question</p>
              <p className="font-bold text-gray-900 mb-4">{msg.quiz.question}</p>
              <div className="space-y-2">
                {msg.quiz.options.map((opt, i) => {
                  const isAnswered = answeredQuiz.has(msg.id);
                  const isCorrect = opt === msg.quiz?.answer;
                  const isSelected = selectedAnswer === opt && answeredQuiz.has(msg.id);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (!answeredQuiz.has(msg.id)) {
                          setSelectedAnswer(opt);
                          setAnsweredQuiz(prev => new Set([...prev, msg.id]));
                        }
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                        !isAnswered
                          ? "border-indigo-100 bg-white hover:border-indigo-400 hover:bg-indigo-50"
                          : isCorrect
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                          : isSelected
                          ? "border-red-400 bg-red-50 text-red-800"
                          : "border-gray-100 bg-gray-50 text-gray-400"
                      }`}
                    >
                      {isAnswered && isCorrect && "✅ "}{isAnswered && isSelected && !isCorrect && "❌ "}
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answeredQuiz.has(msg.id) && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-indigo-100">
                  <p className="text-sm text-indigo-800"><span className="font-bold">Explanation:</span> {msg.quiz.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Roadmap card */}
          {msg.roadmap && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">🗺️ Learning Roadmap: {msg.roadmap.topic}</p>
              <div className="space-y-3">
                {msg.roadmap.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-sm text-gray-900">{step.title}</p>
                        <span className="text-xs text-gray-400">· {step.duration}</span>
                      </div>
                      {step.resources.length > 0 && (
                        <p className="text-xs text-gray-500">{step.resources.join(" · ")}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <ToolLayout
      icon="🎓"
      title="Visual Learning Portal"
      subtitle="Chat with Vizzy AI tutor - get explanations, quizzes, and learning roadmaps"
      gradient="from-indigo-600 via-blue-700 to-cyan-800"
    >
      <div className="space-y-6">

        {/* Topic selector (pre-session) */}
        {!sessionStarted && (
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Your Learning Topic</h2>
            <p className="text-sm text-gray-500 mb-6">Vizzy will become your expert AI tutor for this subject.</p>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Topic *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startSession()}
                placeholder="e.g. Quantum Computing, Spanish Language, Chess Strategy, React.js…"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-base"
              />
            </div>

            {/* Quick topics */}
            <div className="mb-7">
              <p className="text-xs text-gray-400 mb-2">Popular topics:</p>
              <div className="flex flex-wrap gap-2">
                {["Machine Learning", "History of Rome", "Guitar Basics", "Python Programming", "Astronomy", "Philosophy"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startSession}
              disabled={!topic.trim()}
              className="w-full py-4 rounded-2xl font-bold text-white text-base bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 hover:shadow-xl hover:scale-[1.02] shadow-lg transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              🎓 Start Learning Session
            </button>
          </div>
        )}

        {/* Chat window */}
        {sessionStarted && (
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-xl overflow-hidden">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center text-white text-lg">🎓</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Vizzy AI Tutor</p>
                  <p className="text-xs text-gray-500">{topic}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => send()}
                  className="hidden"
                />
                <button
                  onClick={() => {
                    setSessionStarted(false);
                    setMessages([]);
                    setTopic("");
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all"
                >
                  Change Topic
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="px-6 py-3 border-b border-gray-50 flex gap-2 overflow-x-auto">
              {["Explain the basics", "Quiz me", "Show roadmap", "Give an example", "Summarize"].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => { setInput(prompt); }}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-2">
              {messages.map(renderMessage)}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white/90 border border-white/60 px-5 py-4 rounded-3xl rounded-tl-md shadow-md">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about the topic…"
                  className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || isLoading}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-blue-500 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
                >
                  Send →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        {!sessionStarted && (
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "💬", title: "Chat-Based Learning", desc: "Ask questions naturally - Vizzy adapts to your pace and learning style" },
              { icon: "🧪", title: "Interactive Quizzes", desc: "Type 'quiz me' anytime for instant knowledge checks with explanations" },
              { icon: "🗺️", title: "Learning Roadmap", desc: "Get a structured step-by-step path from beginner to expert" },
            ].map((c) => (
              <div key={c.title} className="bg-white/60 border border-gray-100 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{c.title}</h4>
                <p className="text-sm text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default LearningPortalTool;
