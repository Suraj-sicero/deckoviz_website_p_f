import React from "react";
import { StoryStructure, StoryPage } from "../../types/wizzy";
import { Plus, Trash2, Home, User, Edit, Sparkles, Loader2, ArrowRight } from "lucide-react";

interface PageBuilderProps {
  structure: StoryStructure;
  onUpdateStructure: (newStructure: StoryStructure) => void;
  onGenerateImages: () => void;
  isGeneratingImages: boolean;
}

const PageBuilder: React.FC<PageBuilderProps> = ({ 
  structure, 
  onUpdateStructure, 
  onGenerateImages,
  isGeneratingImages
}) => {

  const handlePageChange = (index: number, content: string) => {
    const newPages = [...structure.pages];
    newPages[index] = { ...newPages[index], description: content };
    onUpdateStructure({ ...structure, pages: newPages });
  };

  const addPage = () => {
    const newPage: StoryPage = {
      pageNumber: structure.pages.length + 1,
      description: "",
    };
    onUpdateStructure({ ...structure, pages: [...structure.pages, newPage] });
  };

  const removePage = (index: number) => {
    const newPages = structure.pages.filter((_, i) => i !== index);
    // Update page numbers
    const updatedPages = newPages.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    onUpdateStructure({ ...structure, pages: updatedPages });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 py-10 px-6">
      {/* Header & Meta */}
      <div className="rounded-3xl p-10 shadow-2xl space-y-8"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.45)",
          borderTop: "1px solid rgba(255, 255, 255, 0.75)",
          boxShadow: "0 12px 40px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.65)"
        }}
      >
        <div className="flex justify-between items-start">
          <div className="space-y-4 flex-1">
            <label className="text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center space-x-2">
              <Home size={14} />
              <span>Project Title</span>
            </label>
            <input
              className="text-4xl font-extrabold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 w-full hover:bg-violet-50 transition-colors rounded-xl px-2 -ml-2"
              value={structure.title}
              onChange={(e) => onUpdateStructure({ ...structure, title: e.target.value })}
            />
          </div>
          <button 
             onClick={onGenerateImages}
             disabled={isGeneratingImages}
             className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-violet-200 hover:scale-[1.02] hover:-translate-y-1 transition-all flex items-center space-x-3 group disabled:opacity-50"
          >
            {isGeneratingImages ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
                <span>Bring Story to Life</span>
                <ArrowRight size={22} />
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
               <User size={14} />
               <span>Character Reference</span>
            </h3>
            {structure.characters.map((char, i) => (
              <div key={i} className="p-6 bg-violet-50/50 rounded-2xl border border-violet-100 flex items-start space-x-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-violet-600 font-bold border border-violet-100">
                  {char.name[0]}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{char.name}</h4>
                  <textarea
                    className="w-full mt-2 bg-transparent border-none text-sm text-gray-600 focus:outline-none resize-none"
                    rows={3}
                    value={char.description}
                    onChange={(e) => {
                      const newChars = [...structure.characters];
                      newChars[i] = { ...newChars[i], description: e.target.value };
                      onUpdateStructure({ ...structure, characters: newChars });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center space-x-2">
               <Edit size={14} />
               <span>Art Style</span>
            </h3>
            <textarea
              className="w-full p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-sm text-gray-700 font-medium focus:outline-none resize-none h-full"
              value={structure.style}
              onChange={(e) => onUpdateStructure({ ...structure, style: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Page List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
             <span className="p-2 bg-white rounded-xl shadow-sm border border-gray-100"><ArrowRight size={20} className="text-violet-600"/></span>
             <span>Storyboard Sequences</span>
          </h2>
          <button
            onClick={addPage}
            className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-violet-600 font-bold flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Sequence</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {structure.pages.map((p, i) => (
            <div key={i} className="group relative rounded-3xl p-8 hover:shadow-xl transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.45)",
                borderTop: "1px solid rgba(255, 255, 255, 0.75)",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.65)"
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-black text-white px-3 py-1 bg-violet-500 rounded-full shadow-sm">
                  SEQUENCE {p.pageNumber}
                </span>
                <button
                  onClick={() => removePage(i)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <textarea
                className="w-full bg-transparent border-none text-gray-700 text-sm leading-relaxed focus:outline-none resize-none"
                rows={5}
                placeholder="Describe the action in this scene..."
                value={p.description}
                onChange={(e) => handlePageChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;
