import React, { useState, useEffect } from "react";
import { Sparkles, Lightbulb, Sun, Palette, Moon, X, RefreshCw, ChevronRight } from "lucide-react";
import { vizzyApi } from "../../lib/webappApi";

export interface ProactiveItem {
  id: string;
  title: string;
  description: string;
  type: "Suggestion" | "Idea" | "Nudge" | string;
  actionText?: string;
  actionView?: string;
  icon?: string;
}

interface VizzyWindowProps {
  onNavigate?: (view: string) => void;
}

export function VizzyWindow({ onNavigate }: VizzyWindowProps) {
  const [items, setItems] = useState<ProactiveItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dismissingId, setDismissingId] = useState<string | null>(null);

  const getLocalDismissed = (): string[] => {
    try {
      const stored = localStorage.getItem("vizzy_proactive_dismissed");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const addLocalDismissed = (id: string) => {
    try {
      const list = getLocalDismissed();
      if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem("vizzy_proactive_dismissed", JSON.stringify(list));
      }
    } catch { /* ignore */ }
  };

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await vizzyApi.getProactiveItems(3);
      if (data && Array.isArray(data.items)) {
        // Also filter out any locally saved dismissals just in case
        const localDismissed = getLocalDismissed();
        setItems(data.items.filter((item: ProactiveItem) => !localDismissed.includes(item.id)));
      } else {
        setItems([]);
      }
    } catch (err: any) {
      console.warn("[VizzyWindow] Failed to fetch proactive items:", err);
      const localDismissed = getLocalDismissed();
      const fallbacks: ProactiveItem[] = [
        {
          id: "proactive-1",
          title: "Morning Ambient Refresh",
          description: "Your living room display has been on the same artwork. Shall I curate a soothing morning collection?",
          type: "Suggestion",
          actionText: "Apply Collection",
          actionView: "daily_queue",
          icon: "Sparkles",
        },
        {
          id: "proactive-2",
          title: "Creative Nudge: Sunset Photography",
          description: "Golden hour approaches! Ready to turn your recent photos into framed art?",
          type: "Nudge",
          actionText: "Open VGC",
          actionView: "vgc",
          icon: "Sun",
        },
        {
          id: "proactive-3",
          title: "Idea: Weekly Memory Digest",
          description: "Combine this week's favorite family photos with gentle background music.",
          type: "Idea",
          actionText: "Create Album",
          actionView: "create_collection",
          icon: "Lightbulb",
        },
      ];
      setItems(fallbacks.filter((i) => !localDismissed.includes(i.id)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDismiss = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissingId(id);
    addLocalDismissed(id);
    try {
      await vizzyApi.dismissProactiveItem(id);
    } catch (err) {
      console.warn("[VizzyWindow] Failed to send dismiss request to backend:", err);
    } finally {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setDismissingId(null);
    }
  };


  const getItemTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "suggestion":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "idea":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "nudge":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200/80";
    }
  };

  const getItemIcon = (icon?: string, type?: string) => {
    const key = icon || type || "";
    switch (key.toLowerCase()) {
      case "sun":
      case "nudge":
        return <Sun size={16} className="text-emerald-600" />;
      case "lightbulb":
      case "idea":
        return <Lightbulb size={16} className="text-amber-600" />;
      case "palette":
        return <Palette size={16} className="text-purple-600" />;
      case "moon":
        return <Moon size={16} className="text-indigo-600" />;
      case "sparkles":
      case "suggestion":
      default:
        return <Sparkles size={16} className="text-blue-600" />;
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(24,42,74,0.08)] transition-all duration-500"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#2563EB] to-[#182a4a]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-md">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-800 tracking-tight">Vizzy Proactive Window</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                Live Nudges
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Proactive ideas & suggestions from your creative assistant</p>
          </div>
        </div>

        <button
          onClick={fetchItems}
          disabled={isLoading}
          className="w-8 h-8 rounded-lg bg-white/80 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#182a4a] hover:border-[#182a4a] hover:bg-white transition-all shadow-sm"
          title="Refresh Vizzy suggestions"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-3">
        {isLoading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
            <RefreshCw size={20} className="animate-spin text-blue-600" />
            <span className="text-xs font-medium">Fetching Proactive Insights...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-gray-50/70 border border-gray-100">
            <Sparkles size={24} className="mx-auto text-blue-500/60 mb-2" />
            <p className="text-sm font-bold text-gray-800">All caught up!</p>
            <p className="text-xs text-gray-500 mt-1">No new proactive suggestions right now. Check back soon.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`group relative p-4 rounded-xl bg-white/70 hover:bg-white border border-gray-100 hover:border-blue-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 ${
                dismissingId === item.id ? "opacity-50 pointer-events-none scale-95" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0 mt-0.5">
                    {getItemIcon(item.icon, item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-bold text-gray-800 group-hover:text-[#182a4a] transition-colors truncate">
                        {item.title}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getItemTypeBadge(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">{item.description}</p>

                    {item.actionText && (
                      <button
                        onClick={() => {
                          if (item.actionView === "vgc") {
                            window.location.href = "/vizzy-canvas";
                          } else if (item.actionView && onNavigate) {
                            onNavigate(item.actionView);
                          }
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/60 transition-all group-hover:translate-x-0.5"
                      >
                        <span>{item.actionText}</span>
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => handleDismiss(item.id, e)}
                  className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 hover:bg-red-50 hover:border-red-200 hover:text-red-600 flex items-center justify-center text-gray-400 transition-all shrink-0 mt-0.5"
                  title="Dismiss suggestion"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

