import React, { useState } from "react";
import Chat from "./Chat";
import PageBuilder from "./PageBuilder";
import ImageViewer from "./ImageViewer";
import { StoryStructure } from "../../types/wizzy";
import { Sparkles, Bot, ArrowRight } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-demo.onrender.com";

const WizzyPage: React.FC = () => {
  const [step, setStep] = useState<"ideation" | "builder" | "viewer">("ideation");
  const [structure, setStructure] = useState<StoryStructure | null>(null);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  const handleStoryGenerated = (newStructure: StoryStructure) => {
    setStructure(newStructure);
    setStep("builder");
  };

  const handleUpdateStructure = (newStructure: StoryStructure) => {
    setStructure(newStructure);
  };

  const handleGenerateImages = async () => {
    if (!structure) return;
    setStep("viewer");
    setIsGeneratingImages(true);

    try {
      const updatedPages = [...structure.pages];
      const charDesc = structure.characters.map(c => `${c.name}: ${c.description}`).join(". ");
      
      for (let i = 0; i < updatedPages.length; i++) {
        const response = await fetch(`${BACKEND_URL}/api/wizzy/generate-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            characterDescription: charDesc,
            style: structure.style,
            sceneDescription: updatedPages[i].description,
          }),
        });
        
        const data = await response.json();
        updatedPages[i] = { ...updatedPages[i], imageUrl: data.url };
        
        // Update local state incrementally to show progress
        setStructure({ ...structure, pages: [...updatedPages] });
      }
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleRegenerateImage = async (pageIndex: number) => {
    if (!structure) return;
    
    // Clear image URL for that page to show loading
    const updatedPages = [...structure.pages];
    const originalUrl = updatedPages[pageIndex].imageUrl;
    updatedPages[pageIndex] = { ...updatedPages[pageIndex], imageUrl: undefined };
    setStructure({ ...structure, pages: updatedPages });

    try {
      const charDesc = structure.characters.map(c => `${c.name}: ${c.description}`).join(". ");
      const response = await fetch(`${BACKEND_URL}/api/wizzy/generate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterDescription: charDesc,
          style: structure.style,
          sceneDescription: structure.pages[pageIndex].description,
        }),
      });
      
      const data = await response.json();
      updatedPages[pageIndex] = { ...updatedPages[pageIndex], imageUrl: data.url };
      setStructure({ ...structure, pages: updatedPages });
    } catch (error) {
      console.error("Error regenerating image:", error);
      // Restore original URL if failed
      updatedPages[pageIndex].imageUrl = originalUrl;
      setStructure({ ...structure, pages: updatedPages });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-inter print:bg-white print:pt-0 print:pb-0">
      {/* Dynamic Background Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 print:hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-indigo-200/30 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 print:px-0">
        {/* Progress Bar */}
        <div className="mb-20 flex justify-center print:hidden">
           <div className="flex items-center space-x-6 bg-white/60 backdrop-blur p-4 rounded-3xl border border-white shadow-xl shadow-purple-900/5 transition-all">
              {[
                { id: "ideation", label: "Idea", icon: Bot },
                { id: "builder", label: "Builder", icon: Sparkles },
                { id: "viewer", label: "Final Story", icon: ArrowRight }
              ].map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-500 ${
                    step === s.id ? "bg-purple-600 text-white shadow-lg shadow-purple-200 scale-105" : "text-gray-400"
                  }`}>
                    <s.icon size={18} />
                    <span className="font-bold text-sm">{s.label}</span>
                  </div>
                  {i < 2 && <div className="w-10 h-0.5 bg-gray-100 rounded-full"></div>}
                </React.Fragment>
              ))}
           </div>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out fill-mode-forwards">
          {step === "ideation" && <Chat onStoryGenerated={handleStoryGenerated} />}
          
          {step === "builder" && structure && (
            <PageBuilder 
              structure={structure} 
              onUpdateStructure={handleUpdateStructure}
              onGenerateImages={handleGenerateImages}
              isGeneratingImages={isGeneratingImages}
            />
          )}

          {step === "viewer" && structure && (
            <ImageViewer 
              structure={structure} 
              onBackToBuilder={() => setStep("builder")}
              onRegenerateImage={handleRegenerateImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WizzyPage;
