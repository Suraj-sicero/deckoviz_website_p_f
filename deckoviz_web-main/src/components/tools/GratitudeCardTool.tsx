import React, { useState, useRef } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface CardResult {
  imageUrl: string;
  message: string;
  style: string;
  senderDesc?: string;
  recipientDesc?: string;
}

const GratitudeCardTool: React.FC = () => {
  const { deductCredits } = useAuth();
  
  // File inputs state
  const [senderImage, setSenderImage] = useState<File | null>(null);
  const [senderPreview, setSenderPreview] = useState<string>("");
  const [recipientImage, setRecipientImage] = useState<File | null>(null);
  const [recipientPreview, setRecipientPreview] = useState<string>("");

  // Input fields
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("painting");
  
  // UI states
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<CardResult | null>(null);

  // File input refs
  const senderInputRef = useRef<HTMLInputElement>(null);
  const recipientInputRef = useRef<HTMLInputElement>(null);

  const artStyles = [
    { value: "painting", label: "Painting", emoji: "🎨", desc: "Classical textured oil brushstrokes" },
    { value: "anime Ghibli style", label: "Ghibli", emoji: "🎏", desc: "Whimsical soft anime hand-drawn look" },
    { value: "fantasy", label: "Fantasy", emoji: "🦄", desc: "Magical glowing lights and dreamscape" },
    { value: "futurism", label: "Futurism", emoji: "🚀", desc: "Sleek geometric lines, high-tech sheen" },
    { value: "watercolor", label: "Watercolor", emoji: "🌸", desc: "Dreamy paint washes, elegant splatters" },
    { value: "cyberpunk", label: "Cyberpunk", emoji: "🌌", desc: "Glowing neon lights, futuristic street vibe" }
  ];

  const suggestions = [
    "I'm really grateful for you being in my life. Thank you for always being there.",
    "I'm really grateful for the help and support you gave me. It meant the world.",
    "I'm just thinking of you and wanted to send this little reminder of how much you mean to me.",
    "Thank you for being such an incredible friend and bringing so much joy into my life."
  ];

  const handleSenderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSenderImage(file);
      setSenderPreview(URL.createObjectURL(file));
    }
  };

  const handleRecipientFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecipientImage(file);
      setRecipientPreview(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async () => {
    if (!senderImage) {
      setError("Please upload your own photo (Sender).");
      return;
    }
    if (!recipientImage) {
      setError("Please upload the photo of the person you're sending it to (Recipient).");
      return;
    }
    if (!message.trim()) {
      setError("Please write a gratitude or thinking-of-you message.");
      return;
    }
    if (message.length > 250) {
      setError("Please keep your message under 250 characters so it fits on the postcard.");
      return;
    }

    const hasCredits = await deductCredits(5);
    if (!hasCredits) return;

    setError("");
    setStatus("loading");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("senderImage", senderImage);
      formData.append("recipientImage", recipientImage);
      formData.append("style", selectedStyle);
      formData.append("message", message);
      formData.append("senderName", senderName);
      formData.append("recipientName", recipientName);

      const res = await fetch(`${BACKEND_URL}/api/gratitude-card/generate`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(await res.text() || "Failed to generate gratitude card.");
      }

      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Something went wrong during generation.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setSenderImage(null);
    setSenderPreview("");
    setRecipientImage(null);
    setRecipientPreview("");
    setSenderName("");
    setRecipientName("");
    setMessage("");
    setSelectedStyle("painting");
    setResult(null);
    setStatus("idle");
    setError("");
  };

  const handleDownload = () => {
    if (!result) return;
    // Extract filename from URL
    const urlParts = result.imageUrl.split("/");
    const filename = urlParts[urlParts.length - 1];
    
    // Use the backend download endpoint to force download
    const downloadUrl = `${BACKEND_URL}/download/${filename}`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `gratitude_card_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolLayout
      icon="💝"
      title="Gratitude Cards"
      subtitle="Celebrate your connections — turn photos of you and a loved one into a beautiful custom art postcard with a personal message."
      gradient="from-pink-500 via-rose-500 to-red-600"
    >
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Form panel */}
        {status !== "done" && (
          <div className="bg-white/90 backdrop-blur-md border border-white/60 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Create Your Custom Postcard</h2>
            
            {/* Step 1: Upload Photos */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">1. Upload Photos (Required)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Photo */}
                <div 
                  onClick={() => senderInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                    senderPreview ? "border-pink-500 bg-pink-50/20" : "border-gray-300 hover:border-pink-400 hover:bg-gray-50"
                  }`}
                >
                  <input 
                    type="file" 
                    ref={senderInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleSenderFileChange} 
                  />
                  {senderPreview ? (
                    <div className="space-y-2">
                      <img src={senderPreview} alt="Sender preview" className="w-full h-40 object-cover rounded-xl shadow-md mx-auto" />
                      <p className="text-xs font-semibold text-pink-600">✓ Your photo loaded</p>
                    </div>
                  ) : (
                    <div className="py-6 space-y-2">
                      <div className="text-3xl">👤</div>
                      <p className="text-sm font-bold text-gray-700">Upload Your Photo</p>
                      <p className="text-xs text-gray-400">Click to select (Sender)</p>
                    </div>
                  )}
                </div>

                {/* Recipient Photo */}
                <div 
                  onClick={() => recipientInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                    recipientPreview ? "border-pink-500 bg-pink-50/20" : "border-gray-300 hover:border-pink-400 hover:bg-gray-50"
                  }`}
                >
                  <input 
                    type="file" 
                    ref={recipientInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleRecipientFileChange} 
                  />
                  {recipientPreview ? (
                    <div className="space-y-2">
                      <img src={recipientPreview} alt="Recipient preview" className="w-full h-40 object-cover rounded-xl shadow-md mx-auto" />
                      <p className="text-xs font-semibold text-pink-600">✓ Recipient's photo loaded</p>
                    </div>
                  ) : (
                    <div className="py-6 space-y-2">
                      <div className="text-3xl">👥</div>
                      <p className="text-sm font-bold text-gray-700">Upload Recipient's Photo</p>
                      <p className="text-xs text-gray-400">Click to select (Loved one / Friend)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Names (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name (Optional)</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Their Name (Optional)</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Taylor"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm"
                />
              </div>
            </div>

            {/* Step 3: Choose Art Style */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">2. Select Art Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {artStyles.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setSelectedStyle(style.value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center transition-all ${
                      selectedStyle === style.value
                        ? "border-pink-500 bg-pink-50/40 shadow-md"
                        : "border-gray-100 hover:border-pink-200 bg-white"
                    }`}
                  >
                    <span className="text-2xl mb-1">{style.emoji}</span>
                    <span className={`font-bold text-xs ${selectedStyle === style.value ? "text-pink-600" : "text-gray-700"}`}>
                      {style.label}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{style.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Input Message */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">3. Write Your Message</label>
                <span className={`text-xs ${message.length > 250 ? "text-red-500 font-bold" : "text-gray-400"}`}>
                  {message.length} / 250 characters
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your gratitude message here. E.g. I'm really grateful for you being in my life..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm"
              />
              
              {/* Quick suggestions */}
              <div className="mt-2.5">
                <span className="text-xs font-bold text-gray-400 block mb-1.5">Or choose a starting prompt:</span>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMessage(s)}
                      className="text-left text-xs bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-all max-w-full truncate"
                    >
                      "{s}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleGenerate}
              disabled={status === "loading"}
              className={`w-full py-4 rounded-2xl text-white font-bold transition-all shadow-lg hover:shadow-xl ${
                status === "loading"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 hover:scale-[1.01]"
              }`}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Blending photos in Ghibli, watercolor, or chosen art style...
                </span>
              ) : (
                "💝 Create Custom Postcard (5 Credits)"
              )}
            </button>
          </div>
        )}

        {/* Loading Phase details */}
        {status === "loading" && (
          <div className="bg-pink-50/50 border border-pink-200/50 rounded-3xl p-8 text-center space-y-4">
            <div className="text-5xl animate-bounce">🎨✍️✨</div>
            <h3 className="text-lg font-bold text-pink-800">Drafting your masterpiece...</h3>
            <div className="max-w-md mx-auto text-xs text-pink-600/80 leading-relaxed space-y-1">
              <p>1. Analyzing both faces & structures with Gemini Vision...</p>
              <p>2. Formulating painterly prompt for Stable Diffusion XL...</p>
              <p>3. Rendering details in {artStyles.find(a => a.value === selectedStyle)?.label} style...</p>
              <p>4. Compositing glassmorphism postcard border & message overlay...</p>
            </div>
          </div>
        )}

        {/* Result Screen */}
        {status === "done" && result && (
          <div className="space-y-6">
            {/* Postcard Container */}
            <div className="bg-white border border-gray-100 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Custom Postcard is Ready!</h3>
              
              {/* Image Preview */}
              <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl aspect-[3/2] bg-gray-100">
                <img 
                  src={result.imageUrl} 
                  alt="Generated Gratitude Postcard" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Descriptions & details */}
              {(result.senderDesc || result.recipientDesc) && (
                <div className="w-full max-w-2xl mt-5 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left space-y-2">
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">AI Vision Alignment</span>
                  {result.senderDesc && (
                    <p className="text-xs text-gray-600"><strong className="text-gray-700">Sender Description:</strong> {result.senderDesc}</p>
                  )}
                  {result.recipientDesc && (
                    <p className="text-xs text-gray-600"><strong className="text-gray-700">Recipient Description:</strong> {result.recipientDesc}</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-6 w-full max-w-2xl">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm hover:scale-[1.02] shadow-md transition-all flex-1 min-w-[150px]"
                >
                  📥 Download Postcard
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.message);
                    alert("Postcard message copied to clipboard!");
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-pink-200 hover:bg-pink-50 transition-all flex-1 min-w-[150px]"
                >
                  📋 Copy Message
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  🔄 Create Another Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 border border-gray-100 rounded-2xl p-5 text-center space-y-2">
            <div className="text-3xl">🧑‍🎨</div>
            <h4 className="font-bold text-gray-800 text-sm">6 Elegant Art Styles</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Transform your appearance into Painting, Ghibli, Fantasy, Futurism, Watercolor, or Cyberpunk illustrations.
            </p>
          </div>
          <div className="bg-white/60 border border-gray-100 rounded-2xl p-5 text-center space-y-2">
            <div className="text-3xl">✉️</div>
            <h4 className="font-bold text-gray-800 text-sm">Glassmorphic Overlay</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your customized text message is elegantly laid out inside a semi-transparent, frosted-glass container.
            </p>
          </div>
          <div className="bg-white/60 border border-gray-100 rounded-2xl p-5 text-center space-y-2">
            <div className="text-3xl">💝</div>
            <h4 className="font-bold text-gray-800 text-sm">Share the Gratitude</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Download the postcard in high quality, ready to be sent or printed for a beautiful surprise.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default GratitudeCardTool;
