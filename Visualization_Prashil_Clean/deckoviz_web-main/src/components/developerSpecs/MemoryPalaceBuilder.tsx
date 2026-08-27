"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Folder, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Grid
} from "lucide-react";

const MemoryPalaceBuilder: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [rooms, setRooms] = useState<Array<{id: number, name: string, memory: string}>>([
    { id: 1, name: "Entrance Hall", memory: "The smell of rain on the day I arrived." },
    { id: 2, name: "Library", memory: "The heavy silence of old books." },
    { id: 3, name: "Courtyard", memory: "Golden light filtering through leaves." },
    { id: 4, name: "Attic", memory: "Dust motes dancing in a single sunbeam." }
  ]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [newMemory, setNewMemory] = useState("");

  const updateMemory = () => {
    if (selectedRoom === null || !newMemory) return;
    setRooms(rooms.map(r => r.id === selectedRoom ? { ...r, memory: newMemory } : r));
    setNewMemory("");
    setSelectedRoom(null);
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 to-stone-900/30 border border-rose-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Folder size={32} className="text-rose-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Creative / Storytelling / Memory</span>
              <h1 className="text-4xl font-bold">The Memory Palace Builder</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Construct a spatial architecture for your memories. Click a room to place or update a memory.
          </p>

          {/* Grid of Rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {rooms.map((room) => (
              <div 
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedRoom === room.id 
                    ? "bg-rose-500/20 border-rose-500" 
                    : "bg-black/40 border-white/5 hover:border-white/10"
                } border flex flex-col items-center justify-center min-h-[120px] text-center`}
              >
                <span className="text-sm font-semibold text-rose-400 mb-1">{room.name}</span>
                <span className="text-xs text-gray-500 truncate max-w-[150px]">
                  {room.memory ? "Memory stored" : "Empty"}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {selectedRoom !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-xl bg-black/60 border border-rose-500/20 mb-8"
              >
                <h3 className="text-sm font-semibold text-rose-400 mb-4 uppercase tracking-wider">
                  Edit Memory: {rooms.find(r => r.id === selectedRoom)?.name}
                </h3>
                <div className="space-y-4">
                  <textarea 
                    value={newMemory} 
                    onChange={(e) => setNewMemory(e.target.value)}
                    placeholder="Describe the memory you want to place in this room..."
                    className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[100px]"
                  />
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setSelectedRoom(null)}
                      className="px-4 py-2 rounded-full border border-white/10 text-xs hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={updateMemory}
                      disabled={!newMemory}
                      className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs bg-rose-500 hover:bg-rose-600 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Memory
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Palace Summary */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Grid size={20} className="text-rose-400" /> Palace Overview
            </h2>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room.id} className="text-sm">
                  <span className="font-semibold text-rose-300">{room.name}:</span>{" "}
                  <span className="text-gray-400">{room.memory || "No memory placed yet."}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    
      {/* ALWAYS VISIBLE EXIT BUTTON */}
      <div className="absolute top-8 right-24 pointer-events-auto z-[9999]">
        <button 
          onClick={() => {
            if (typeof navigate !== 'undefined') {
              navigate('/experimental-art-modes');
            } else {
              window.location.href = '/experimental-art-modes';
            }
          }}
          className="p-3.5 bg-black/20 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
          title="Exit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
</div>
  );
};

export default MemoryPalaceBuilder;
