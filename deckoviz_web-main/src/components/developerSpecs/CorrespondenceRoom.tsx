"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, PenTool, RefreshCw, ArrowRight, Play, Folder, FileText
} from "lucide-react";

const CorrespondenceRoom: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [archive, setArchive] = useState<Array<{recipient: string, subject: string, date: string}>>([
    { recipient: "My Future Self", subject: "Reflections on today", date: "2026-05-10" },
    { recipient: "An Old Friend", subject: "Thinking of you", date: "2026-05-08" }
  ]);
  const [isSending, setIsSending] = useState(false);

  const sendLetter = () => {
    if (!recipient || !subject || !body) return;
    
    setIsSending(true);
    
    // Simulate API call or save
    setTimeout(() => {
      setArchive([
        { recipient, subject, date: new Date().toISOString().split('T')[0] },
        ...archive
      ]);
      setRecipient("");
      setSubject("");
      setBody("");
      setIsSending(false);
      alert("Letter archived in the Correspondence Room.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <PixelatedBackground variant={variant} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <a href="/deckoviz-storytelling" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowRight size={16} className="transform rotate-180" /> Back to Storytelling
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Writing Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-stone-500/10 to-stone-900/30 border border-stone-500/20 backdrop-blur-md"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/5">
                <PenTool size={32} className="text-stone-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Creative / Storytelling</span>
                <h1 className="text-4xl font-bold">The Correspondence Room</h1>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">To:</label>
                <input 
                  type="text" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient name or role"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Subject:</label>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="The topic of your correspondence"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">Body:</label>
                <textarea 
                  value={body} 
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your letter here..."
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[200px]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={sendLetter}
                disabled={!recipient || !subject || !body || isSending}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-stone-500 hover:bg-stone-600 text-white transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(120,113,108,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>Archiving... <RefreshCw size={14} className="animate-spin" /></>
                ) : (
                  <>Archive Letter <Play size={14} /></>
                )}
              </button>
            </div>
          </motion.div>

          {/* Archive Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Folder size={20} className="text-stone-400" />
              <h2 className="text-xl font-bold">Archive</h2>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {archive.map((letter, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-stone-400 truncate max-w-[150px]">{letter.recipient}</span>
                    <span className="text-xs text-gray-600">{letter.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white truncate">{letter.subject}</h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenceRoom;
