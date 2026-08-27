import { useState, useCallback } from "react";
import { API_BASE_URL } from "../lib/constants";
import { useAuth } from "../context/AuthContext";

export interface QueuedCollectionItem {
  collection_id: string;
  name: string;
  item_count: number;
  added_at: string;
  order_index: number;
}

export interface QueueState {
  app_instance_id: string;
  total_queued: number;
  active_top_20: QueuedCollectionItem[];
  queued_beyond_20: QueuedCollectionItem[];
  items: QueuedCollectionItem[];
}

export function useCollectionQueue(appInstanceId?: string) {
  const { token } = useAuth();
  const [items, setItems] = useState<QueuedCollectionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = useCallback(
    async (targetId?: string) => {
      const aid = targetId || appInstanceId;
      if (!aid || !token) return;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/queue/${aid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to fetch queue");
        setItems(data.items || []);
      } catch (err: any) {
        setError(err.message || "Error fetching queue");
      } finally {
        setLoading(false);
      }
    },
    [appInstanceId, token]
  );

  const addToQueue = useCallback(
    async (collectionId: string, name?: string, itemCount?: number, targetId?: string) => {
      const aid = targetId || appInstanceId;
      if (!aid || !token) return false;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/queue/${aid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            collection_id: collectionId,
            name: name || "Collection",
            item_count: itemCount || 0,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to add collection to queue");
        setItems(data.items || []);
        return true;
      } catch (err: any) {
        setError(err.message || "Error adding collection to queue");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [appInstanceId, token]
  );

  const reorderQueue = useCallback(
    async (collectionIds: string[], targetId?: string) => {
      const aid = targetId || appInstanceId;
      if (!aid || !token) return false;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/queue/${aid}/reorder`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ collection_ids: collectionIds }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to reorder queue");
        setItems(data.items || []);
        return true;
      } catch (err: any) {
        setError(err.message || "Error reordering queue");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [appInstanceId, token]
  );

  const removeFromQueue = useCallback(
    async (collectionId: string, targetId?: string) => {
      const aid = targetId || appInstanceId;
      if (!aid || !token) return false;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/api/queue/${aid}/${collectionId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to remove collection from queue");
        setItems(data.items || []);
        return true;
      } catch (err: any) {
        setError(err.message || "Error removing from queue");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [appInstanceId, token]
  );

  return {
    items,
    activeTop20: items.slice(0, 20),
    queuedBeyond20: items.slice(20),
    loading,
    error,
    fetchQueue,
    addToQueue,
    reorderQueue,
    removeFromQueue,
  };
}
