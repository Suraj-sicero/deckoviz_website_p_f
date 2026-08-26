import { useState } from "react";
import { Send, Plus, MessageSquare, Bot, Sparkles } from "lucide-react";
import { vgcAgents } from "../enterpriseData";

export default function VGCView() {
  const [message, setMessage] = useState("");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [chatHistory] = useState([
    { id: 1, title: "Hotel lobby art collection", date: "Today", preview: "Created 6 art pieces for..." },
    { id: 2, title: "Summer event posters", date: "Yesterday", preview: "Designed 3 poster templates..." },
    { id: 3, title: "Welcome narration script", date: "Jun 23", preview: "Generated narration for..." },
    { id: 4, title: "Ambient music — Jazz Evening", date: "Jun 22", preview: "Composed a 4-minute jazz..." },
    { id: 5, title: "Restaurant menu signage", date: "Jun 20", preview: "Created digital signage..." },
    { id: 6, title: "Spa wellness visuals", date: "Jun 18", preview: "Generated calming nature..." },
    { id: 7, title: "Brand style exploration", date: "Jun 15", preview: "Explored brand palettes and..." },
  ]);

  return (
    <div className="flex h-[calc(100vh-54px)]">

      {/* Sidebar — Past Chats */}
      <div className="w-[240px] shrink-0 border-r border-[#ebedf2] bg-[#f8f9fb] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#ebedf2]">
          <h3 className="text-[13px] font-bold text-gray-600 flex items-center gap-2">
            <MessageSquare size={14} /> All Chats
          </h3>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white hover:bg-blue-600 transition shadow-sm">
            <Plus size={14} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              className="w-full px-5 py-3 text-left transition hover:bg-white border-b border-[#f0f0f4] last:border-0"
            >
              <p className="text-[12px] font-bold text-gray-700 truncate">{chat.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 truncate">{chat.preview}</p>
              <p className="text-[9px] text-gray-300 mt-0.5">{chat.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ebedf2] px-8 py-4">
          <div>
            <h1 className="font-serif text-xl font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">
              Vizzy Generative Chat
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Create content and media with AI-powered sub-agents
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
        </div>

        {/* Agent Selection */}
        {!activeAgent ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] shadow-xl shadow-[#182a4a]/20">
                <Bot size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Creative Agent</h2>
              <p className="text-sm text-gray-400 max-w-md">Select a specialized AI sub-agent to start generating content, or start a free-form chat below.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-[680px] lg:grid-cols-4">
              {vgcAgents.map((agent) => (
                <button
                  key={agent.name}
                  onClick={() => setActiveAgent(agent.name)}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[#e8eaef] bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110"
                    style={{ background: `${agent.color}15` }}
                  >
                    {agent.icon}
                  </div>
                  <p className="text-xs font-bold text-gray-700">{agent.name}</p>
                  <p className="text-[9px] text-gray-400 text-center leading-relaxed">{agent.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Active Chat Header */}
            <div className="flex items-center gap-3 px-8 py-3 bg-blue-50/50 border-b border-blue-100/50">
              <span className="text-xl">{vgcAgents.find(a => a.name === activeAgent)?.icon}</span>
              <div>
                <p className="text-sm font-bold text-gray-700">{activeAgent}</p>
                <p className="text-[10px] text-gray-400">{vgcAgents.find(a => a.name === activeAgent)?.description}</p>
              </div>
              <button
                onClick={() => setActiveAgent(null)}
                className="ml-auto text-[11px] font-semibold text-[#182a4a] hover:underline"
              >
                Switch Agent
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="flex flex-col gap-4 max-w-[720px] mx-auto">
                {/* Bot Welcome */}
                <div className="flex gap-3 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white text-sm">
                    <Sparkles size={14} />
                  </div>
                  <div className="rounded-2xl rounded-tl-md bg-gray-50 px-5 py-3.5 text-sm text-gray-600 leading-relaxed border border-gray-100">
                    Hello! I'm your <strong>{activeAgent}</strong> agent. How can I help you create something amazing today? Describe what you need, and I'll generate it for you.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="border-t border-[#ebedf2] px-8 py-4">
          <div className="mx-auto max-w-[720px] flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={activeAgent ? `Describe what you'd like ${activeAgent} to create...` : "Start by selecting an agent above, or type here..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-12 w-full rounded-xl border border-[#e2e4ea] bg-[#f8f9fb] pl-5 pr-14 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:shadow-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white transition hover:bg-blue-600 shadow-sm">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
