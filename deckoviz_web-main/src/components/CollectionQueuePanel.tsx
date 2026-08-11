import React, { useEffect, useState } from "react";
import { useCollectionQueue, QueuedCollectionItem } from "../hooks/useCollectionQueue";
import { ArrowUp, ArrowDown, Trash2, Plus, Layers, Play, Clock } from "lucide-react";

interface CollectionQueuePanelProps {
  appInstanceId: string;
}

export const CollectionQueuePanel: React.FC<CollectionQueuePanelProps> = ({ appInstanceId }) => {
  const { items, loading, error, fetchQueue, addToQueue, reorderQueue, removeFromQueue } =
    useCollectionQueue(appInstanceId);
  const [newCollectionId, setNewCollectionId] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    if (appInstanceId) {
      void fetchQueue(appInstanceId);
    }
  }, [appInstanceId, fetchQueue]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionId.trim()) return;
    const ok = await addToQueue(
      newCollectionId.trim(),
      newCollectionName.trim() || `Collection ${newCollectionId.slice(0, 6)}`,
      0,
      appInstanceId
    );
    if (ok) {
      setNewCollectionId("");
      setNewCollectionName("");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newOrder = [...items];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    const collectionIds = newOrder.map((item) => item.collection_id);
    await reorderQueue(collectionIds, appInstanceId);
  };

  const handleRemove = async (collectionId: string) => {
    await removeFromQueue(collectionId, appInstanceId);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-slate-800 text-base">Collection Queue</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
            <Play className="h-3 w-3 fill-emerald-600" /> Top 20 Auto-Pushed
          </span>
          <span className="text-xs font-medium text-slate-500">
            Total: {items.length}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Add to Queue Form */}
      <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Collection ID (e.g. col-nature)"
          value={newCollectionId}
          onChange={(e) => setNewCollectionId(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Name (optional)"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          className="w-36 rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !newCollectionId.trim()}
          className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </form>

      {/* Queue List */}
      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-xs text-slate-400">
          No collections queued for this device. Add one above!
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {items.map((item: QueuedCollectionItem, index: number) => {
            const isActive = index < 20;
            return (
              <div
                key={item.collection_id}
                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-xs transition-all ${
                  isActive
                    ? "border-emerald-200 bg-emerald-50/40 text-slate-800"
                    : "border-slate-200 bg-slate-50/60 text-slate-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-300 text-slate-700"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[10px] text-slate-400">
                      ID: {item.collection_id}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                      <Play className="h-2.5 w-2.5 fill-emerald-600" /> Active TV Queue
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      <Clock className="h-2.5 w-2.5" /> Queued (&gt;20)
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0 || loading}
                      onClick={() => handleMove(index, "up")}
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === items.length - 1 || loading}
                      onClick={() => handleMove(index, "down")}
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleRemove(item.collection_id)}
                      className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
