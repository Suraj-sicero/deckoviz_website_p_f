import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Loader2,
  Send,
  Music,
  Video,
  Download,
  MessageSquare,
  Sparkles,
  FileText,
  Volume2,
  Check
} from "lucide-react";

interface SongVisualsCreatorProps {
  onClose: () => void;
  backendUrl: string;
  token: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Segment {
  section: number;
  lyrics: string;
  imagePrompt: string;
  imageUrl?: string;
}

const ART_STYLE_GUIDE = [
  { id: "watercolor", name: "Watercolor", desc: "Soft paint washes & textures", icon: "🎨" },
  { id: "digital concept art", name: "Concept Art", desc: "Vibrant fantasy & game scene vibe", icon: "🎮" },
  { id: "cyberpunk painting", name: "Cyberpunk", desc: "Neon lights & dark futuristic mood", icon: "🚀" },
  { id: "anime illustration", name: "Anime", desc: "Bright cell-shaded Japanese style", icon: "🌸" },
  { id: "retro comic book", name: "Retro Comic", desc: "Bold lineart & vintage halftone", icon: "💥" },
  { id: "oil painting", name: "Oil Painting", desc: "Classical brush strokes & texture", icon: "🖼️" },
  { id: "cinematic photo", name: "Cinematic", desc: "35mm realistic film photograph", icon: "🎬" },
  { id: "pencil sketch", name: "Pencil Sketch", desc: "Detailed monochrome drawings", icon: "✏️" }
];

export const SongVisualsCreator: React.FC<SongVisualsCreatorProps> = ({ onClose, backendUrl, token }) => {
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Vizzy, your AI songwriter and music director. Let's write a song together! What style, theme, or story do you want to explore?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Configuration State
  const [lyrics, setLyrics] = useState("");
  const [n, setN] = useState(5);
  const [musicStyle, setMusicStyle] = useState("Lofi");
  const [artStyle, setArtStyle] = useState("watercolor");
  const [transitionEffect, setTransitionEffect] = useState("fade-black");
  const [visualFormat, setVisualFormat] = useState<"static" | "video">("static");

  // Rendering State
  const [isRendering, setIsRendering] = useState(false);
  const [renderStep, setRenderStep] = useState<string>("");
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const [outputSong, setOutputSong] = useState<string | null>(null);
  const [outputSegments, setOutputSegments] = useState<Segment[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle send message to chat co-creation endpoint
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userText = inputMessage.trim();
    setInputMessage("");
    
    const newMessages = [...messages, { role: "user" as const, content: userText }];
    setMessages(newMessages);
    setIsSending(true);

    try {
      const res = await fetch(`${backendUrl}/api/vizzy-studio/song-visuals/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ messages: newMessages })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        }
      } else {
        const errorData = await res.json();
        console.error("Lyrics chat response error:", errorData);
      }
    } catch (err) {
      console.error("Failed to send chat message:", err);
    } finally {
      setIsSending(false);
    }
  };

  // Auto-adopt assistant reply as the active lyrics sheet
  const handleAdoptLyrics = (text: string) => {
    // 1. Try <lyrics> tags
    const lyricsMatch = text.match(/<lyrics>([\s\S]*?)<\/lyrics>/i);
    if (lyricsMatch) {
      setLyrics(lyricsMatch[1].trim());
      return;
    }

    // 2. Try markdown code blocks
    const codeBlockMatch = text.match(/```(?:lyrics|text)?([\s\S]*?)```/i);
    if (codeBlockMatch) {
      setLyrics(codeBlockMatch[1].trim());
      return;
    }

    // 3. Fallback: filter out common conversational intros/outros if present
    const lines = text.split("\n");
    const cleanLines = lines.filter(line => {
      const l = line.trim().toLowerCase();
      if (l.startsWith("sure,") || l.startsWith("here are") || l.startsWith("here is") || l.startsWith("hope you") || l.startsWith("let me know")) {
        return false;
      }
      return true;
    });

    setLyrics(cleanLines.join("\n").trim());
  };

  // Helper to render message content with lyrics parsing
  const renderMessageContent = (msg: { role: "user" | "assistant"; content: string }) => {
    if (msg.role !== "assistant") {
      return <div>{msg.content}</div>;
    }

    const lyricsMatch = msg.content.match(/<lyrics>([\s\S]*?)<\/lyrics>/i);
    const codeBlockMatch = msg.content.match(/```(?:lyrics|text)?([\s\S]*?)```/i);

    let mainText = msg.content;
    let lyricsText = "";

    if (lyricsMatch) {
      mainText = msg.content.replace(/<lyrics>[\s\S]*?<\/lyrics>/i, "").trim();
      lyricsText = lyricsMatch[1].trim();
    } else if (codeBlockMatch) {
      mainText = msg.content.replace(/```(?:lyrics|text)?[\s\S]*?```/i, "").trim();
      lyricsText = codeBlockMatch[1].trim();
    }

    return (
      <div className="space-y-3 w-full">
        {mainText && <div className="text-slate-300">{mainText}</div>}
        {lyricsText && (
          <div className="bg-slate-900/60 border border-indigo-500/20 rounded-xl p-3 space-y-2 mt-2 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                🎶 Lyrics Suggestion
              </span>
            </div>
            <div className="text-[11px] leading-relaxed text-slate-200 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto pr-1">
              {lyricsText}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Compile and Merged Song with Visuals
  const handleProcessSongVisuals = async () => {
    if (!lyrics.trim() || isRendering) return;

    setIsRendering(true);
    setOutputVideo(null);
    setOutputSong(null);
    setOutputSegments([]);
    
    // Step indicator simulations
    setRenderStep("1. Segmenting lyrics and designing visual layouts...");

    try {
      const timer = setTimeout(() => {
        setRenderStep("2. Generating custom music track via MusicGen...");
      }, 5000);

      const timer2 = setTimeout(() => {
        setRenderStep(
          visualFormat === "video" 
            ? "3. Animating visual segments to AI video clips in parallel..." 
            : "3. Generating artwork images for each segment in parallel..."
        );
      }, 12000);

      const timer3 = setTimeout(() => {
        setRenderStep("4. Stitching video scenes together and mixing audio track...");
      }, 22000);

      const res = await fetch(`${backendUrl}/api/vizzy-studio/song-visuals/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          lyrics,
          n,
          musicStyle,
          artStyle,
          transitionEffect,
          visualFormat
        })
      });

      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setOutputVideo(data.videoUrl);
          setOutputSong(data.songUrl);
          setOutputSegments(data.segments);
          setRenderStep("Complete!");
        } else {
          setRenderStep(`Failed: ${data.error || "Unknown error"}`);
        }
      } else {
        const data = await res.json();
        setRenderStep(`Failed: ${data.error || "Server error"}`);
      }
    } catch (err: any) {
      console.error("Failed to compile song visuals:", err);
      setRenderStep(`Failed: ${err.message || "Network error"}`);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8 font-sans overflow-hidden h-full">
      {/* Header Back Button */}
      <div className="lg:col-span-12 flex items-center justify-between pb-3 border-b border-white/5 h-[60px] shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl hover:bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
              <Music className="w-5 h-5 text-indigo-400" />
              Song with Visuals Creator
            </h2>
            <p className="text-[11px] text-slate-400">Co-create lyrics, generate custom audio, and stitch dynamic art frames</p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="lg:col-span-12 grid lg:grid-cols-12 gap-6 overflow-hidden" style={{ height: "calc(100% - 70px)" }}>
        
        <div className="lg:col-span-5 bg-slate-950/40 border border-white/5 rounded-3xl flex flex-col overflow-hidden h-full min-h-0">
          <div className="p-4 bg-slate-900/40 border-b border-white/5 flex items-center gap-2 shrink-0">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Vizzy Lyrics Room</h3>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap w-full ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white/5 text-slate-300 border border-white/5 rounded-bl-none"
                  }`}
                >
                  {renderMessageContent(msg)}
                </div>
                
                {msg.role === "assistant" && idx > 0 && (
                  <button
                    onClick={() => handleAdoptLyrics(msg.content)}
                    className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-all"
                  >
                    <Check className="w-3 h-3" />
                    Adopt as active lyrics
                  </button>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center gap-2 text-xs text-slate-500 mr-auto p-2 bg-white/5 border border-white/5 rounded-2xl rounded-bl-none">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                Vizzy is composing lyrics...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Chat bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-900/40 border-t border-white/5 shrink-0 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Vizzy to write or edit lyrics..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* RIGHT PANEL: Settings & Rendering Area (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-5 overflow-y-auto h-full pr-1">
          
          {/* Active Lyrics Sheet */}
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-5 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-indigo-400" />
                Active Lyrics Sheet
              </h3>
              <span className="text-[10px] text-slate-500 font-bold">Editable</span>
            </div>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Paste or co-create lyrics in the left panel to populate this area..."
              className="w-full h-32 px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 resize-none leading-relaxed transition-all"
            />
          </div>

          {/* Config Controls */}
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-5 space-y-4 shrink-0">
            <h3 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Music & Art Room
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Segments count */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Visual Segments (n)</label>
                <select
                  value={n}
                  onChange={(e) => setN(parseInt(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none"
                >
                  <option value={3} className="bg-slate-950">3 Art Cards</option>
                  <option value={5} className="bg-slate-950">5 Art Cards</option>
                  <option value={8} className="bg-slate-950">8 Art Cards</option>
                  <option value={10} className="bg-slate-950">10 Art Cards</option>
                  <option value={12} className="bg-slate-950">12 Art Cards</option>
                </select>
              </div>

              {/* Music Genre */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Music Genre</label>
                <select
                  value={musicStyle}
                  onChange={(e) => setMusicStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="Lofi" className="bg-slate-950">Lofi (Relax/Study)</option>
                  <option value="Synthwave" className="bg-slate-950">Synthwave (Retro)</option>
                  <option value="Pop" className="bg-slate-950">Modern Pop (Upbeat)</option>
                  <option value="Acoustic" className="bg-slate-950">Acoustic (Chilled)</option>
                  <option value="Cinematic" className="bg-slate-950">Cinematic (Epic)</option>
                  <option value="Hip-Hop" className="bg-slate-950">Hip-hop (Chill)</option>
                </select>
              </div>

              {/* Transition Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Transition Effect</label>
                <select
                  value={transitionEffect}
                  onChange={(e) => setTransitionEffect(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="fade-black" className="bg-slate-950">Fade to Black</option>
                  <option value="fade-white" className="bg-slate-950">Fade to White</option>
                  <option value="fade-red" className="bg-slate-950">Fade to Red</option>
                  <option value="fade-blue" className="bg-slate-950">Fade to Blue</option>
                  <option value="none" className="bg-slate-950">None (Cut)</option>
                </select>
              </div>

              {/* Visual Format */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Visual Format</label>
                <select
                  value={visualFormat}
                  onChange={(e) => setVisualFormat(e.target.value as "static" | "video")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none"
                >
                  <option value="static" className="bg-slate-950">Static Images</option>
                  <option value="video" className="bg-slate-950">Video AI (SVD)</option>
                </select>
              </div>
            </div>

            {/* Visual Style Guide */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                <span>Visual Style Guide</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">Unified Style</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ART_STYLE_GUIDE.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setArtStyle(style.id)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      artStyle === style.id
                        ? "bg-indigo-600/20 border-indigo-500 text-slate-100 shadow-md shadow-indigo-500/10"
                        : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span className="text-sm">{style.icon}</span>
                      {style.name}
                    </span>
                    <span className="text-[9px] text-slate-400 line-clamp-1 leading-normal">{style.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleProcessSongVisuals}
              disabled={!lyrics.trim() || isRendering}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all mt-2"
            >
              {isRendering ? "Processing Song & Art..." : "Compile Song with Visuals"}
            </button>
          </div>

          {/* Progress / Outputs Display */}
          {(isRendering || outputVideo) && (
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-5 space-y-4 shrink-0">
              <h3 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                <Video className="w-4 h-4 text-indigo-400" />
                Render Output
              </h3>

              {isRendering && (
                <div className="p-4 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center min-h-[140px] text-center space-y-3 bg-white/5">
                  <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">Processing media assets...</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{renderStep}</p>
                  </div>
                </div>
              )}

              {outputVideo && (
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 relative">
                    <video src={`${backendUrl}${outputVideo}`} controls className="w-full h-full object-cover" />
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`${backendUrl}${outputVideo}`}
                      download={`song-visuals-${Date.now()}.mp4`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download Video File
                    </a>
                  </div>

                  {/* Generated segment cards sequence */}
                  {outputSegments.length > 0 && (
                    <div className="space-y-2.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storyboard Visual Frames</p>
                      <div className="grid grid-cols-5 gap-2">
                        {outputSegments.map((seg) => (
                          <div key={seg.section} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-slate-950 group">
                            {seg.imageUrl && (
                              (seg.imageUrl.toLowerCase().endsWith(".mp4") || seg.imageUrl.toLowerCase().endsWith(".webm")) ? (
                                <video
                                  src={seg.imageUrl.startsWith("http") ? seg.imageUrl : `${backendUrl}${seg.imageUrl}`}
                                  muted
                                  loop
                                  autoPlay
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <img
                                  src={seg.imageUrl.startsWith("http") ? seg.imageUrl : `${backendUrl}${seg.imageUrl}`}
                                  alt={`Section ${seg.section}`}
                                  className="w-full h-full object-cover"
                                />
                              )
                            )}
                            <span className="absolute bottom-1 right-1 bg-slate-900/90 text-[8px] font-bold text-indigo-400 px-1 rounded">
                              #{seg.section}
                            </span>
                            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all p-1 flex items-center justify-center text-center">
                              <p className="text-[8px] text-slate-300 leading-tight line-clamp-3">{seg.lyrics}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
