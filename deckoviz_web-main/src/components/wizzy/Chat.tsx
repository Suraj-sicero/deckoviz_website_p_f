import React, { useState, useEffect, useRef } from "react";
import { Message } from "../../types/wizzy";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";

interface ChatProps {
  onStoryGenerated: (structure: any) => void;
}

const Chat: React.FC<ChatProps> = ({ onStoryGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Wizzy. I'm here to help you create an amazing comic or storybook. What kind of story do you have in mind today? Tell me about your characters or the world you want to build!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingStructure, setIsGeneratingStructure] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/wizzy/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateStructure = async () => {
    setIsGeneratingStructure(true);
    try {
      const response = await fetch("http://localhost:5000/api/wizzy/generate-structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: messages }),
      });

      const data = await response.json();
      onStoryGenerated(data);
    } catch (error) {
      console.error("Error generating structure:", error);
    } finally {
      setIsGeneratingStructure(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Chat with Wizzy</h2>
            <p className="text-xs text-purple-100 opacity-80">Ideating your masterpiece</p>
          </div>
        </div>
        <button
          onClick={generateStructure}
          disabled={messages.length < 3 || isGeneratingStructure}
          className="px-4 py-2 bg-white text-purple-600 rounded-xl font-semibold text-sm hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isGeneratingStructure ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>Generate Story Structure</span>
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] flex space-x-3 ${
                m.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                m.role === "user" ? "bg-indigo-100 text-indigo-600" : "bg-purple-100 text-purple-600"
              }`}>
                {m.role === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100"
                    : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100"
                }`}
              >
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center animate-pulse">
                <Bot size={18} />
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100 italic text-gray-400 text-sm">
                Wizzy is thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <div className="relative flex items-center">
          <input
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
            placeholder="Type your ideas here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
