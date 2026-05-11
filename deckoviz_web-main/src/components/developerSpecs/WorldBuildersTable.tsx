"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Globe
} from "lucide-react";

const WorldBuildersTable: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [categories, setCategories] = useState<{ [key: string]: string[] }>({
    "Factions": ["The Glass Weaver Guild", "The Obsidian Guard"],
    "Locations": ["The Floating Gardens", "The Whispering Desert"],
    "Rules": ["Magic requires a physical sacrifice", "No metal can be used in the capital"],
    "History": ["The Great Shattering", "The Age of Silence"]
  });
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Factions");

  const addItem = () => {
    if (!newItem) return;
    setCategories({
      ...categories,
      [selectedCategory]: [...categories[selectedCategory], newItem]
    });
    setNewItem("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 to-stone-900/30 border border-orange-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Globe size={32} className="text-orange-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Creative / Storytelling / World Building</span>
              <h1 className="text-4xl font-bold">The World-Builder's Table</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Construct the elements of your world. Organize factions, locations, rules, and history in a centralized matrix.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.keys(categories).map((category) => (
              <div 
                key={category}
                className="p-6 rounded-xl bg-black/40 border border-white/5"
              >
                <h3 className="text-sm font-semibold text-orange-400 mb-4 uppercase tracking-wider">{category}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {categories[category].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-orange-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Add Item Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Element</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                >
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Element Name</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={newItem} 
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter faction, location, rule, or history event..."
                    className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                  />
                  <button 
                    onClick={addItem}
                    disabled={!newItem}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-bold text-black disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorldBuildersTable;
