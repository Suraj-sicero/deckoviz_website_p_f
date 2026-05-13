import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../lib/constants";
import { Button } from "./ui/button";
import { Sparkles, Image as ImageIcon, MessageSquare, Clock } from "lucide-react";

export default function VizzyLibrary() {
  const { token } = useAuth();
  const [images, setImages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeTab, setActiveTab] = useState("images");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const imagesRes = await fetch(`${API_BASE_URL}/api/vizzy-canvas/images`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const imagesData = await imagesRes.json();
        setImages(imagesData.images || []);

        const chatsRes = await fetch(`${API_BASE_URL}/api/vizzy-canvas/chats`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const chatsData = await chatsRes.json();
        setChats(chatsData.chats || []);
      } catch (error) {
        console.error("Failed to fetch library data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex flex-col h-dvh bg-background text-foreground p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative size-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Sparkles className="size-[18px] text-accent" />
          </div>
          <h1 className="text-xl font-bold">Vizzy Library</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "images" ? "default" : "ghost"}
            onClick={() => setActiveTab("images")}
          >
            <ImageIcon className="size-4 mr-2" />
            Images
          </Button>
          <Button
            variant={activeTab === "chats" ? "default" : "ghost"}
            onClick={() => setActiveTab("chats")}
          >
            <MessageSquare className="size-4 mr-2" />
            Chats
          </Button>
        </div>
      </header>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {activeTab === "images" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="group relative rounded-xl overflow-hidden border border-border bg-card">
                  <img src={img.imageUrl} alt={img.prompt} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                    <p className="text-xs text-white line-clamp-2">{img.prompt}</p>
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-12">
                  No images generated yet.
                </div>
              )}
            </div>
          )}

          {activeTab === "chats" && (
            <div className="flex flex-col gap-3">
              {chats.map((chat) => (
                <div key={chat.id} className="p-4 rounded-xl border border-border bg-card hover:bg-accent/5 transition-colors">
                  <h3 className="font-semibold mb-1">{chat.title || "Untitled Chat"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {chat.messages[chat.messages.length - 1]?.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    <span>{new Date(chat.updatedAt).toLocaleString()}</span>
                    <span>•</span>
                    <span>{chat.messages.length} messages</span>
                  </div>
                </div>
              ))}
              {chats.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                  No chats saved yet.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
