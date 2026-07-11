import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// 100 credits for $5 (as requested)
const PACKAGES = [
  { credits: 100, price: 5 },
  { credits: 200, price: 10 },
  { credits: 500, price: 25 },
  { credits: 1000, price: 50 },
];

const ESTIMATOR_TOOLS = [
  { id: "audiobook", name: "Audiobook", unit: "Hour", creditsPerUnit: 5, breakdown: "ElevenLabs TTS (approx $1/hr) + Processing" },
  { id: "visual-audiobook", name: "Visual Audiobook", unit: "Hour", creditsPerUnit: 10, breakdown: "ElevenLabs TTS + Stable Diffusion Images + Sync" },
  { id: "storybook", name: "Storybook", unit: "10 Pages", creditsPerUnit: 5, breakdown: "Gemini Text + Stable Diffusion Images per page" },
  { id: "short-story", name: "Short Story Generator", unit: "10 Pages", creditsPerUnit: 5, breakdown: "Gemini Text Generation" },
  { id: "comic", name: "Comic Book", unit: "10 Pages", creditsPerUnit: 5, breakdown: "Gemini Text + Comic Style Images per page" },
  { id: "storybook-studio", name: "Storybook Studio", unit: "10 Pages", creditsPerUnit: 5, breakdown: "Gemini Text + Editable SD Images" },
  { id: "visual-journal", name: "Visual Journal", unit: "Entry", creditsPerUnit: 2, breakdown: "Gemini Sentiment Analysis + SD Image" },
  { id: "greeting-card", name: "Greeting Card", unit: "Card", creditsPerUnit: 2, breakdown: "Gemini Text + Custom Image Generation" },
  { id: "life-book", name: "Life Book", unit: "10 Pages", creditsPerUnit: 5, breakdown: "Gemini Organization + Image Generations" },
  { id: "visual-book", name: "Visual Book", unit: "10 Pages", creditsPerUnit: 5, breakdown: "Image Captioning + Narrative Generation" },
  { id: "postcard", name: "Postcard", unit: "Card", creditsPerUnit: 2, breakdown: "Image Processing + Overlays" },
  { id: "music", name: "Music Creator", unit: "5 Mins", creditsPerUnit: 5, breakdown: "MusicGen / Suno AI generation" },
  { id: "song", name: "Personalized Song", unit: "5 Mins", creditsPerUnit: 5, breakdown: "Lyrics Generation + Audio Generation" },
  { id: "learning-book", name: "Learning Book", unit: "10 Pages", creditsPerUnit: 5, breakdown: "Structured Content Gen + Illustrations" },
  { id: "learning-portal", name: "Learning Portal", unit: "Hour", creditsPerUnit: 10, breakdown: "Interactive LLM Tutor Session" },
  { id: "daily", name: "Daily Inspiration", unit: "Day", creditsPerUnit: 1, breakdown: "Daily Curated AI Generations" },
];

interface CreditSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditSystemModal: React.FC<CreditSystemModalProps> = ({ isOpen, onClose }) => {
  const { user, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<"recharge" | "estimator">("recharge");
  const [estTool, setEstTool] = useState(ESTIMATOR_TOOLS[0]);
  const [estAmount, setEstAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRecharge = async (credits: number, price: number) => {
    if (!user) {
      onClose();
      openAuthModal();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com"}/create-checkout-session`, {
        email: user.email,
        productName: `${credits} Creative Studio Credits`,
        amount: price,
        metadata: { userId: user.id, credits: credits.toString() }
      });
      
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate payment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Creative Studio Credits</h2>
            <p className="text-violet-100 text-sm mt-1">Manage your balance and estimate costs</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black">{user ? user.credits : 0} 🪙</div>
            <div className="text-violet-200 text-xs uppercase tracking-wider font-bold">Available Balance</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "recharge" ? "text-violet-600 border-b-2 border-violet-600 bg-violet-50/50" : "text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("recharge")}
          >
            Recharge
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "estimator" ? "text-violet-600 border-b-2 border-violet-600 bg-violet-50/50" : "text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setActiveTab("estimator")}
          >
            Cost Estimator
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          {activeTab === "recharge" ? (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-6">Select a package</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PACKAGES.map((pkg) => (
                  <button 
                    key={pkg.credits}
                    disabled={loading}
                    onClick={() => handleRecharge(pkg.credits, pkg.price)}
                    className="flex flex-col items-center justify-center p-6 border-2 border-violet-100 rounded-2xl hover:border-violet-400 hover:bg-violet-50 transition-all group disabled:opacity-50"
                  >
                    <span className="text-3xl font-black text-gray-900 group-hover:text-violet-700 transition-colors mb-2">
                      {pkg.credits} <span className="text-2xl">🪙</span>
                    </span>
                    <span className="text-lg font-bold text-gray-500">${pkg.price}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 text-center mt-6">
                Credits are added immediately. 100 Credits = $5.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-6">Calculate feature costs</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">Select Feature</label>
                  <select 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-violet-500 outline-none"
                    value={estTool.id}
                    onChange={(e) => setEstTool(ESTIMATOR_TOOLS.find(t => t.id === e.target.value)!)}
                  >
                    {ESTIMATOR_TOOLS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Amount (in {estTool.unit}s)
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-violet-500 outline-none"
                    value={estAmount}
                    onChange={(e) => setEstAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <div className="bg-violet-50 rounded-2xl p-6 border border-violet-100">
                  <div className="flex justify-between items-center mb-4 border-b border-violet-100 pb-4">
                    <span className="font-bold text-gray-600">Total Credits Needed:</span>
                    <span className="text-2xl font-black text-violet-700">{estTool.creditsPerUnit * estAmount} 🪙</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 border-b border-violet-100 pb-4">
                    <span className="font-bold text-gray-600">Dollar Equivalent:</span>
                    <span className="text-xl font-bold text-gray-800">${((estTool.creditsPerUnit * estAmount) * 0.05).toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">Model Breakdown (Placeholder)</span>
                    <span className="text-sm text-gray-600">{estTool.breakdown}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-gray-500 font-bold hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
