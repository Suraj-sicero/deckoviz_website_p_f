import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import * as vgcApi from "../../lib/vgcApi";


type Message = { role: "user" | "vizzy"; text: string };
type Chat = { id: string; title: string; agentId: string; messages: Message[] };
type Agent = {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  color: "cyan" | "violet" | "rose" | "amber" | "emerald" | "blue";
  placeholder: string;
};

// ── Teacher Agents ───────────────────────────────────────────────
const teacherAgents: Agent[] = [
  {
    id: "lesson",
    emoji: "📋",
    name: "Lesson Planner",
    tagline: "Create detailed lesson plans & curricula",
    color: "cyan",
    placeholder: "e.g. Create a lesson plan for photosynthesis for Grade 8…",
  },
  {
    id: "assessment",
    emoji: "📝",
    name: "Assessment Builder",
    tagline: "Build tests, quizzes & rubrics for your class",
    color: "amber",
    placeholder: "e.g. Build a 10-question quiz on World War II…",
  },
  {
    id: "content",
    emoji: "✏️",
    name: "Content Creator",
    tagline: "Generate teaching material, slides & notes",
    color: "blue",
    placeholder: "e.g. Create a summary sheet on Newton's laws…",
  },
  {
    id: "progress",
    emoji: "📊",
    name: "Progress Analyser",
    tagline: "Understand class performance & flag gaps",
    color: "emerald",
    placeholder: "e.g. Summarise progress for my Grade 9 class this term…",
  },
  {
    id: "adaptive",
    emoji: "🎯",
    name: "Adaptive Coach",
    tagline: "Get strategies for specific students or groups",
    color: "rose",
    placeholder: "e.g. Suggest an approach for a student struggling with fractions…",
  },
];

// ── Student Agents ───────────────────────────────────────────────
const studentAgents: Agent[] = [
  {
    id: "companion",
    emoji: "🤖",
    name: "Study Companion",
    tagline: "Explains concepts step by step, just for you",
    color: "violet",
    placeholder: "e.g. Explain photosynthesis like I'm 12…",
  },
  {
    id: "quiz",
    emoji: "🧠",
    name: "Quiz Practice",
    tagline: "Test yourself and sharpen your knowledge",
    color: "cyan",
    placeholder: "e.g. Quiz me on the French Revolution…",
  },
  {
    id: "creative",
    emoji: "🎨",
    name: "Art & Creative",
    tagline: "Co-create art, stories & creative projects",
    color: "rose",
    placeholder: "e.g. Help me write a short story about space exploration…",
  },
  {
    id: "map",
    emoji: "🗺️",
    name: "Learning Map",
    tagline: "See your strengths and what to focus on next",
    color: "emerald",
    placeholder: "e.g. What topics should I revise before my maths test?…",
  },
  {
    id: "explorer",
    emoji: "🔭",
    name: "Curiosity Explorer",
    tagline: "Dive deep into anything that interests you",
    color: "amber",
    placeholder: "e.g. Why does the universe keep expanding?…",
  },
];

// ── Color map ────────────────────────────────────────────────────
const colorMap = {
  cyan:    { border: "border-cyan-200",    hover: "hover:border-cyan-400 hover:shadow-cyan-100",    badge: "bg-cyan-50 text-cyan-500",    tag: "text-cyan-500",    btn: "bg-cyan-500 hover:bg-cyan-600" },
  violet:  { border: "border-violet-200",  hover: "hover:border-violet-400 hover:shadow-violet-100",  badge: "bg-violet-50 text-violet-500",  tag: "text-violet-500",  btn: "bg-violet-500 hover:bg-violet-600" },
  emerald: { border: "border-emerald-200", hover: "hover:border-emerald-400 hover:shadow-emerald-100", badge: "bg-emerald-50 text-emerald-500", tag: "text-emerald-500", btn: "bg-emerald-500 hover:bg-emerald-600" },
  amber:   { border: "border-amber-200",   hover: "hover:border-amber-400 hover:shadow-amber-100",   badge: "bg-amber-50 text-amber-500",   tag: "text-amber-500",   btn: "bg-amber-500 hover:bg-amber-600" },
  rose:    { border: "border-rose-200",    hover: "hover:border-rose-400 hover:shadow-rose-100",    badge: "bg-rose-50 text-rose-500",    tag: "text-rose-500",    btn: "bg-rose-500 hover:bg-rose-600" },
  blue:    { border: "border-blue-200",    hover: "hover:border-blue-400 hover:shadow-blue-100",    badge: "bg-blue-50 text-blue-500",    tag: "text-blue-500",    btn: "bg-blue-500 hover:bg-blue-600" },
};

// ── Vizzy replies ────────────────────────────────────────────────
function vizzyReply(agentId: string, input: string): string {
  const replies: Record<string, string> = {
    // Teacher
    lesson:     `Here's a structured lesson plan for "${input}". I've included learning objectives, key activities, and an assessment checkpoint. Want me to expand any section?`,
    assessment: `I've drafted an assessment for "${input}" with a mix of recall, application, and analysis questions. Shall I add a marking rubric too?`,
    content:    `Here's a concise teaching resource on "${input}" — formatted for easy classroom use. Want a version as slides or as student notes?`,
    progress:   `Based on your input about "${input}", here's a breakdown of likely gaps and suggested next steps. Want me to suggest targeted activities?`,
    adaptive:   `For the situation you described — "${input}" — here's a tailored strategy. Want me to build a personalised plan for that student?`,
    // Student
    companion:  `Great question about "${input}"! Let me break it down step by step so it really clicks. Ready to go deeper?`,
    quiz:       `Here's a quick quiz on "${input}". Question 1: Let's start with the basics — tell me what you already know and I'll take it from there!`,
    creative:   `I love this creative direction for "${input}"! Here's a starting concept — let's build it together. What aspect excites you most?`,
    map:        `Looking at "${input}" — here are the core areas to focus on, ordered by importance. Want a study plan built around these?`,
    explorer:   `"${input}" is such a fascinating rabbit hole! Here's the big picture, and then let's zoom into the parts that blow your mind.`,
  };
  return replies[agentId] ?? `Vizzy is thinking about "${input}"…`;
}

// ── Main Component ───────────────────────────────────────────────
export default function VGCPage() {
  // Read role from URL: /school/vgc?role=teacher or ?role=student
  const { token } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role") === "student" ? "student" : "teacher";
  const agents = role === "teacher" ? teacherAgents : studentAgents;

  const roleLabel   = role === "teacher" ? "Teachers" : "Students";
  const accentColor = role === "teacher" ? "text-cyan-500" : "text-violet-500";

  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [showAllChats, setShowAllChats] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  function startChat(agent: Agent) {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `${agent.name} Chat`,
      agentId: agent.id,
      messages: [
        {
          role: "vizzy",
          text: `Hi! I'm your ${agent.name}. ${agent.tagline}. What would you like to work on today?`,
        },
      ],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat);
    setShowAllChats(false);
  }

  const [isSending, setIsSending] = useState(false);

async function sendMessage() {
  if (!input.trim() || !activeChat || isSending) return;

  const userText = input.trim();
  const userMsg: Message = { role: "user", text: userText };
  const optimisticChat: Chat = { ...activeChat, messages: [...activeChat.messages, userMsg] };
  setActiveChat(optimisticChat);
  setChats((prev) => prev.map((c) => (c.id === optimisticChat.id ? optimisticChat : c)));
  setInput("");
  setIsSending(true);

  try {
    const backendMessages = optimisticChat.messages.map((m) => ({
      role: m.role === "vizzy" ? "assistant" as const : "user" as const,
      content: m.text,
    }));

    const res = await vgcApi.sendMessage(token ?? "", backendMessages, activeChat.id);

    const vizzyMsg: Message = { role: "vizzy", text: res.content };
    const finalChat: Chat = { ...optimisticChat, id: res.chatId, messages: [...optimisticChat.messages, vizzyMsg] };
    setActiveChat(finalChat);
    setChats((prev) => prev.map((c) => (c.id === optimisticChat.id ? finalChat : c)));
  } catch (err) {
    const errorMsg: Message = { role: "vizzy", text: "Sorry, I couldn't reach Vizzy right now. Please try again." };
    const errorChat: Chat = { ...optimisticChat, messages: [...optimisticChat.messages, errorMsg] };
    setActiveChat(errorChat);
    setChats((prev) => prev.map((c) => (c.id === optimisticChat.id ? errorChat : c)));
    console.error("VGC sendMessage failed:", err);
  } finally {
    setIsSending(false);
  }
}

  const currentAgent = agents.find((a) => a.id === activeChat?.agentId);

  return (
    <div className="min-h-screen bg-[#f0f2f8] relative overflow-hidden">
      <Dots />

      {/* Header */}
      <div className="relative z-10 pt-28 pb-8 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">
          School Ground · {roleLabel}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Vizzy{" "}
          <span className={`italic font-light ${accentColor}`}>
            Generative Chat
          </span>
        </h1>
        <p className="mt-3 text-gray-400 text-base max-w-md mx-auto">
          {role === "teacher"
            ? "Create lessons, assessments & strategies — powered by AI."
            : "Explore, learn, and create — with your personal AI companion."}
        </p>

        <div className="flex items-center justify-center gap-3 mt-5">
          {/* All Chats */}
          <button
            onClick={() => { setShowAllChats((v) => !v); setActiveChat(null); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md text-sm font-medium text-gray-700 transition-all"
          >
            💬 All Chats
            {chats.length > 0 && (
              <span className={`text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${role === "teacher" ? "bg-cyan-500" : "bg-violet-500"}`}>
                {chats.length}
              </span>
            )}
          </button>

          {/* Back to School */}
          <a
            href="/school"
            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md text-sm font-medium text-gray-500 transition-all"
          >
           {'←'} School Ground
          </a>
        </div>
      </div>

      {/* All Chats Panel */}
      {showAllChats && (
        <div className="relative z-10 max-w-2xl mx-auto px-6 pb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Your Chats</h2>
            {chats.length === 0 ? (
              <p className="text-sm text-gray-400">No chats yet. Pick a sub-agent below to start.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {chats.map((chat) => {
                  const agent = agents.find((a) => a.id === chat.agentId);
                  const c = colorMap[agent?.color ?? "cyan"];
                  return (
                    <button
                      key={chat.id}
                      onClick={() => { setActiveChat(chat); setShowAllChats(false); }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-left transition-all border border-transparent hover:border-gray-100"
                    >
                      <span className={`text-xl w-9 h-9 flex items-center justify-center rounded-xl ${c.badge}`}>
                        {agent?.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{chat.title}</p>
                        <p className="text-xs text-gray-400">{chat.messages.length} messages</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-agent Grid */}
      {!activeChat && !showAllChats && (
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center mb-6">
            {role === "teacher" ? "Teacher sub-agents" : "Your personal sub-agents"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent) => {
              const c = colorMap[agent.color];
              return (
                <button
                  key={agent.id}
                  onClick={() => startChat(agent)}
                  className={`text-left bg-white rounded-2xl border-2 ${c.border} ${c.hover} hover:shadow-lg p-6 transition-all duration-300`}
                >
                  <div className={`text-2xl w-11 h-11 flex items-center justify-center rounded-xl mb-4 ${c.badge}`}>
                    {agent.emoji}
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">{agent.name}</h3>
                  <p className="text-sm text-gray-400 leading-snug">{agent.tagline}</p>
                  <p className={`mt-4 text-xs font-semibold ${c.tag}`}>Start chat →</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chat View */}
      {activeChat && currentAgent && (
        <div className="relative z-10 max-w-3xl mx-auto px-6 pb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className={`text-xl w-10 h-10 flex items-center justify-center rounded-xl ${colorMap[currentAgent.color].badge}`}>
                {currentAgent.emoji}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{currentAgent.name}</p>
                <p className="text-xs text-gray-400">{currentAgent.tagline}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveChat(null)}
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
            >
              {'←'}All agents
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 flex flex-col gap-4 min-h-[380px] max-h-[420px] overflow-y-auto">
            {activeChat.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white rounded-br-sm"
                    : "bg-gray-50 text-gray-700 border border-gray-100 rounded-bl-sm"
                }`}>
                  {msg.role === "vizzy" && (
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${colorMap[currentAgent.color].tag}`}>
                      Vizzy
                    </p>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="mt-3 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={currentAgent.placeholder}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-300 shadow-sm"
            />
            <button
              onClick={sendMessage}
              className={`px-5 py-3 rounded-xl text-white text-sm font-semibold transition-all ${colorMap[currentAgent.color].btn}`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Decorative Dots ──────────────────────────────────────────────
function Dots() {
  const dots = [
    { top: "8%",  left: "4%",  color: "#06b6d4", size: 7 },
    { top: "14%", left: "11%", color: "#8b5cf6", size: 5 },
    { top: "6%",  left: "20%", color: "#06b6d4", size: 4 },
    { top: "18%", left: "33%", color: "#a78bfa", size: 6 },
    { top: "4%",  left: "68%", color: "#22d3ee", size: 5 },
    { top: "11%", left: "79%", color: "#7c3aed", size: 4 },
    { top: "17%", left: "91%", color: "#06b6d4", size: 7 },
    { top: "32%", left: "2%",  color: "#a78bfa", size: 5 },
    { top: "38%", left: "96%", color: "#06b6d4", size: 6 },
    { top: "55%", left: "7%",  color: "#22d3ee", size: 4 },
    { top: "60%", left: "93%", color: "#8b5cf6", size: 5 },
    { top: "72%", left: "14%", color: "#06b6d4", size: 6 },
    { top: "78%", left: "86%", color: "#a78bfa", size: 4 },
    { top: "86%", left: "28%", color: "#22d3ee", size: 5 },
    { top: "90%", left: "62%", color: "#7c3aed", size: 7 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {dots.map((d, i) => (
        <div key={i} className="absolute rounded-full opacity-50"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size, backgroundColor: d.color }} />
      ))}
    </div>
  );
}