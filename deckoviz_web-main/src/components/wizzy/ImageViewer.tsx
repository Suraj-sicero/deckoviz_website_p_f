import React from "react";
import { StoryStructure } from "../../types/wizzy";
import { Download, Share2, Sparkles, MoveLeft, RefreshCw, Printer } from "lucide-react";

interface ImageViewerProps {
  structure: StoryStructure;
  onBackToBuilder: () => void;
  onRegenerateImage: (pageIndex: number) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ 
  structure, 
  onBackToBuilder, 
  onRegenerateImage 
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-20 px-8 space-y-16">
      {/* Header */}
      <div className="flex justify-between items-end gap-10">
        <div className="space-y-4 flex-1">
          <div className="flex items-center space-x-3 text-purple-600 font-bold tracking-widest text-xs uppercase animate-pulse">
             <Sparkles size={16} />
             <span>Your AI Powered Masterpiece</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 leading-tight">
            {structure.title}
          </h1>
          <p className="text-xl text-gray-400 font-medium italic">
            Style: {structure.style}
          </p>
        </div>
        
        <div className="flex gap-4 print:hidden">
           <button
             onClick={onBackToBuilder}
             className="px-6 py-4 bg-white border border-gray-100 text-gray-600 rounded-2xl font-bold flex items-center space-x-2 hover:bg-gray-50 transition-all shadow-sm"
           >
             <MoveLeft size={20} />
             <span>Back to Builder</span>
           </button>
           <button
             onClick={() => window.print()}
             className="px-6 py-4 bg-purple-600 text-white rounded-2xl font-bold flex items-center space-x-2 hover:bg-purple-700 transition-all shadow-xl shadow-purple-200"
           >
             <Download size={20} />
             <span>Export PDF</span>
           </button>
        </div>
      </div>

      {/* Comic Grid */}
      <div className="space-y-40 print:space-y-0 print:grid print:grid-cols-2 print:gap-6 print:mt-10">
        {structure.pages.map((page, i) => (
          <div key={i} className={`flex flex-col md:flex-row gap-20 items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} print:flex-col print:gap-4 print:break-inside-avoid print:items-start`}>
            {/* Image Container */}
            <div className="relative w-full md:w-1/2 print:w-full aspect-square flex-shrink-0 group overflow-hidden rounded-[2.5rem] print:rounded-2xl shadow-2xl print:shadow-none border-8 print:border-4 border-white print:border-gray-900">
              {page.imageUrl ? (
                <>
                  <img 
                    src={page.imageUrl} 
                    alt={page.description} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-10">
                    <button
                       onClick={() => onRegenerateImage(i)}
                       className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold flex items-center space-x-2 hover:bg-white/30 transition-colors"
                    >
                      <RefreshCw size={18} />
                      <span>Regenerate Image</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center space-y-4">
                   <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                   <p className="text-gray-400 font-bold">Wizzy is drawing...</p>
                </div>
              )}
              {/* Page Number Badge */}
              <div className="absolute top-8 left-8 w-14 h-14 bg-purple-600 text-white flex items-center justify-center font-black text-2xl rounded-2xl shadow-xl rotate-[-4deg] print:hidden">
                 {page.pageNumber}
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 space-y-8 print:space-y-3 print:flex-none print:w-full">
               <div className="space-y-4 print:hidden">
                  <div className="w-12 h-1 bg-purple-600 rounded-full"></div>
                  <h3 className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">Scene Narrative</h3>
               </div>
               <p className="text-3xl font-bold text-gray-800 leading-[1.4] print:text-base print:font-medium print:leading-normal print:bg-gray-100 print:p-4 print:rounded-b-2xl print:border-x-4 print:border-b-4 print:border-gray-900 print:-mt-4 relative z-10 print:text-justify max-w-full">
                 "{page.description}"
               </p>
               <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100/50 print:hidden">
                  <div className="flex items-start space-x-4">
                     <Share2 className="text-purple-400 mt-1" size={24} />
                     <p className="text-gray-500 font-medium italic">
                        Characters in scene: {structure.characters.map(c => c.name).join(", ")}
                     </p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-[3rem] p-20 text-center space-y-10 shadow-2xl relative overflow-hidden print:hidden">
         <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full"></div>
         <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 blur-[100px] rounded-full"></div>
         
         <div className="relative space-y-4">
            <h2 className="text-5xl font-black text-white">Share Your Creation</h2>
            <p className="text-purple-200 text-xl font-medium max-w-2xl mx-auto opacity-80">
              You've just created something magical. Download the full storybook or share it with the world!
            </p>
         </div>
         
         <div className="relative flex justify-center gap-6">
            <button className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform flex items-center space-x-3" onClick={() => window.print()}>
               <Printer size={24} />
               <span>Print Book</span>
            </button>
            <button className="px-10 py-5 bg-indigo-500 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-indigo-600 hover:scale-105 transition-transform flex items-center space-x-3">
               <Share2 size={24} />
               <span>Share Story</span>
            </button>
         </div>
      </div>
    </div>
  );
};

export default ImageViewer;
