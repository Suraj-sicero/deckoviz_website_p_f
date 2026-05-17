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
    <div className="relative min-h-screen pt-24 pb-20 font-inter print:bg-white print:pt-0 print:pb-0" style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}>
      {/* Enterprise Indigo Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 print:hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
          <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
          <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
          <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
          <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 print:px-0">
        {/* Progress Bar */}
        <div className="mb-20 flex justify-center print:hidden">
           <div className="flex items-center space-x-6 p-4 rounded-3xl transition-all"
             style={{
               background: "rgba(255, 255, 255, 0.25)",
               backdropFilter: "blur(24px) saturate(180%)",
               WebkitBackdropFilter: "blur(24px) saturate(180%)",
               border: "1px solid rgba(255, 255, 255, 0.45)",
               borderTop: "1px solid rgba(255, 255, 255, 0.75)",
               boxShadow: "0 12px 40px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.65)"
             }}
           >
              {[
                { id: "ideation", label: "Idea", icon: Bot },
                { id: "builder", label: "Builder", icon: Sparkles },
                { id: "viewer", label: "Final Story", icon: ArrowRight }
              ].map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-500 ${
                    step === s.id ? "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-105" : "text-gray-400"
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
