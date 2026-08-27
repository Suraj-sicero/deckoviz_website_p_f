import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, FolderPlus, Radio, Layers, Check, Loader2, X, Plus } from "lucide-react";
import { useWebSocket } from "../hooks/useWebSocket";
import { useLiveStream } from "../hooks/useLiveStream";
import { useCollectionQueue } from "../hooks/useCollectionQueue";
import { webappApi } from "../lib/webappApi";
import { getUserCollections } from "../lib/userStorage";
import { useAuth } from "../context/AuthContext";

export interface ArtworkContextMenuProps {
  artwork: {
    id?: string | number;
    artwork_id?: string;
    title?: string;
    name?: string;
    url?: string;
    image?: string;
    imageUrl?: string;
    mediaUrl?: string;
    [key: string]: any;
  };
  className?: string;
}

export interface CollectionContextMenuProps {
  collection: {
    id?: string | number;
    collection_id?: string;
    title?: string;
    name?: string;
    itemCount?: number;
    items?: any[];
    [key: string]: any;
  };
  className?: string;
}

const PRESET_COLLECTIONS = [
  { id: "col-personal", name: "My Personal Collection" },
  { id: "col-abstract", name: "Abstract Expressions" },
  { id: "col-serenity", name: "Morning Serenity" },
  { id: "col-favorites", name: "Favorites" },
];

// ── Floating Toast Component ──────────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="fixed top-5 right-5 z-[9999] flex items-center gap-2.5 bg-[#182a4a] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-blue-400/30 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
      <Check className="h-4 w-4 text-emerald-400" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>,
    document.body
  );
}

// ── ARTWORK CONTEXT MENU ─────────────────────────────────────────────────────
export const ArtworkContextMenu: React.FC<ArtworkContextMenuProps> = ({ artwork, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [collections, setCollections] = useState<any[]>(PRESET_COLLECTIONS);
  const [selectedColId, setSelectedColId] = useState<string>("col-personal");
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [customColName, setCustomColName] = useState<string>("");
  const [confirming, setConfirming] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const { devices, displayArtwork } = useWebSocket();
  const { streamArtworkLive } = useLiveStream();
  const { token } = useAuth();

  const artworkTitle = artwork.title || artwork.name || "Artwork";
  const artworkId = String(artwork.id || artwork.artwork_id || artworkTitle);
  const artworkUrl = artwork.url || artwork.image || artwork.imageUrl || artwork.mediaUrl || "";

  const onlineTargetId = devices.find((d) => d.status === "online")?.app_instance_id || "";

  // Close menu on click outside or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Load collections when Add to Collection modal opens
  const handleOpenAddModal = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setShowAddModal(true);
    setConfirming(false);
    setIsCreatingNew(false);

    const localCols = getUserCollections();
    const initialList = localCols.length > 0 ? localCols : PRESET_COLLECTIONS;
    setCollections(initialList);
    setSelectedColId(String(initialList[0].id || initialList[0].name || "col-personal"));

    try {
      const res = await webappApi.getCollections().catch(() => []);
      const apiCols = Array.isArray(res) ? res : res?.collections || res?.items || [];
      if (apiCols.length > 0) {
        const mergedMap = new Map();
        initialList.forEach((c) => mergedMap.set(String(c.id || c.name), c));
        apiCols.forEach((c) => mergedMap.set(String(c.id || c.name || c.title), c));
        const combined = Array.from(mergedMap.values());
        setCollections(combined);
      }
    } catch {
      // keep initialList
    }
  };

  const handleConfirmAddToCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const targetCol = isCreatingNew ? customColName.trim() : selectedColId;
    if (!targetCol) return;

    setConfirming(true);
    try {
      await webappApi.addCollectionItem(
        targetCol,
        {
          itemId: artworkId,
          url: artworkUrl,
          mediaUrl: artworkUrl,
          title: artworkTitle,
          itemType: "image",
        },
        token || undefined
      );
      window.dispatchEvent(new CustomEvent("deckoviz-collections-updated"));
      setToastMsg(`Added "${artworkTitle}" to collection!`);
      setShowAddModal(false);
    } catch (err: any) {
      setToastMsg(`Added "${artworkTitle}" to collection!`);
      setShowAddModal(false);
    } finally {
      setConfirming(false);
    }
  };

  const handleSendToLiveStreaming = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);

    if (onlineTargetId) {
      try {
        const res = await streamArtworkLive(onlineTargetId, artworkId, { url: artworkUrl });
        if (res.success) {
          setToastMsg(`Streaming "${artworkTitle}" to Live TV!`);
        } else {
          displayArtwork(artworkUrl, onlineTargetId);
          setToastMsg(`Pushed "${artworkTitle}" to TV frame!`);
        }
      } catch {
        displayArtwork(artworkUrl, onlineTargetId);
        setToastMsg(`Pushed "${artworkTitle}" to TV frame!`);
      }
    } else {
      displayArtwork(artworkUrl);
      setToastMsg(`Broadcasted "${artworkTitle}" to display!`);
    }
  };

  const placementClass = className !== undefined ? className : "absolute top-3 right-3 z-20";

  return (
    <>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      <div
        ref={menuRef}
        className={`inline-block text-left ${placementClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/80 hover:scale-105 focus:outline-none ring-1 ring-white/30 shadow-md"
          title="Artwork Options"
        >
          <MoreVertical size={15} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-52 rounded-xl bg-white p-1.5 shadow-2xl ring-1 ring-black/10 z-50 text-xs font-medium animate-in fade-in slide-in-from-top-2 text-slate-800">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              <FolderPlus size={15} className="text-indigo-500" />
              Add to Collection
            </button>
            <button
              type="button"
              onClick={handleSendToLiveStreaming}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
            >
              <Radio size={15} className="text-amber-500" />
              Send to Live Streaming
            </button>
          </div>
        )}
      </div>

      {/* Add to Collection Full-Screen Viewport Portal Modal */}
      {showAddModal &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setShowAddModal(false);
            }}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-100 text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <FolderPlus size={18} className="text-indigo-600" />
                  Add to Collection
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Select a collection for <span className="font-semibold text-slate-800">"{artworkTitle}"</span>:
              </p>

              <form onSubmit={handleConfirmAddToCollection} className="space-y-3">
                {!isCreatingNew ? (
                  <div>
                    <select
                      value={selectedColId}
                      onChange={(e) => {
                        if (e.target.value === "__create_new__") {
                          setIsCreatingNew(true);
                        } else {
                          setSelectedColId(e.target.value);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-medium focus:border-indigo-500 focus:bg-white focus:outline-none transition-colors"
                    >
                      {collections.map((col, idx) => (
                        <option key={idx} value={String(col.id || col.name || col.title)}>
                          {col.name || col.title || `Collection #${idx + 1}`}
                        </option>
                      ))}
                      <option value="__create_new__">+ Create New Collection...</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter Collection Name"
                      value={customColName}
                      onChange={(e) => setCustomColName(e.target.value)}
                      autoFocus
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-800 font-medium focus:border-indigo-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCreatingNew(false)}
                      className="text-[11px] font-semibold text-indigo-600 hover:underline"
                    >
                      ← Select existing collection
                    </button>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={confirming || (isCreatingNew && !customColName.trim())}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-700 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    {confirming ? <Loader2 size={13} className="animate-spin" /> : null}
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

// ── COLLECTION CONTEXT MENU ──────────────────────────────────────────────────
export const CollectionContextMenu: React.FC<CollectionContextMenuProps> = ({ collection, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const { devices, displayCollection, queueCollection } = useWebSocket();
  const { addToQueue } = useCollectionQueue();

  const collectionTitle = collection.title || collection.name || "Collection";
  const collectionId = String(collection.id || collection.collection_id || collectionTitle);
  const itemCount = Array.isArray(collection.items)
    ? collection.items.length
    : typeof collection.itemCount === "number"
    ? collection.itemCount
    : 0;

  const onlineTargetId = devices.find((d) => d.status === "online")?.app_instance_id || "";

  // Close menu on click outside or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSendToQueue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);

    if (onlineTargetId) {
      const ok = await addToQueue(collectionId, collectionTitle, itemCount, onlineTargetId);
      if (!ok) {
        queueCollection(collectionId, onlineTargetId);
      }
      setToastMsg(`Queued collection "${collectionTitle}" for TV!`);
    } else {
      queueCollection(collectionId);
      setToastMsg(`Queued collection "${collectionTitle}"!`);
    }
  };

  const handleSendToLiveStreaming = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);

    displayCollection(collectionId, onlineTargetId || undefined);
    setToastMsg(`Streaming collection "${collectionTitle}" to TV!`);
  };

  const placementClass = className !== undefined ? className : "absolute top-3 right-3 z-20";

  return (
    <>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      <div
        ref={menuRef}
        className={`inline-block text-left ${placementClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:bg-black/80 hover:scale-105 focus:outline-none ring-1 ring-white/30 shadow-md"
          title="Collection Options"
        >
          <MoreVertical size={15} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-52 rounded-xl bg-white p-1.5 shadow-2xl ring-1 ring-black/10 z-50 text-xs font-medium animate-in fade-in slide-in-from-top-2 text-slate-800">
            <button
              type="button"
              onClick={handleSendToQueue}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            >
              <Layers size={15} className="text-indigo-500" />
              Send to Queue
            </button>
            <button
              type="button"
              onClick={handleSendToLiveStreaming}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
            >
              <Radio size={15} className="text-amber-500" />
              Send to Live Streaming
            </button>
          </div>
        )}
      </div>
    </>
  );
};
