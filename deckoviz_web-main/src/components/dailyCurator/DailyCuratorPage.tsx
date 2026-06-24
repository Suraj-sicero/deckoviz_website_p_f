// DailyCuratorPage.tsx - the user-facing daily curation feed (Feature 2).
// Mirrors the mobile "Daily Curator" screen: Daily Artworks + Collections tabs.
// Tapping "View" opens a detail modal with Like / Save / Add music. Saved
// artworks persist in the Collections tab until the user removes them.
import { useEffect, useMemo, useState } from "react";
import {
  Curation,
  CollectionRow,
  DailyItem,
  getMyDailyCuration,
  getMySaved,
  markItemSeen,
  saveItem,
  unsaveItem,
  toggleLike,
} from "../../lib/curatorApi";
import MusicPicker from "./MusicPicker";

function formatDate(d: string) {
  try {
    return new Date(d + "T00:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export default function DailyCuratorPage() {
  const [tab, setTab] = useState<"artworks" | "collections">("artworks");
  const [artworks, setArtworks] = useState<DailyItem[]>([]);
  const [collections, setCollections] = useState<DailyItem[]>([]);
  const [saved, setSaved] = useState<DailyItem[]>([]);
  const [displayDate, setDisplayDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // The artwork currently open in the detail modal (null = closed).
  const [selected, setSelected] = useState<DailyItem | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([getMyDailyCuration(), getMySaved()])
      .then(([curation, savedRes]) => {
        if (!active) return;
        setArtworks(curation.artworks || []);
        setCollections(curation.collections || []);
        setSaved(savedRes.items || []);
        setDisplayDate(curation.displayDate);
      })
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // Reflect a save/like change everywhere the item is shown (feed + modal).
  const applyState = (
    item: DailyItem,
    patch: { saved?: boolean; liked?: boolean }
  ) => {
    const matches = (i: DailyItem) =>
      i.itemType === item.itemType && i.itemId === item.itemId;
    const update = (list: DailyItem[]) =>
      list.map((i) => (matches(i) ? { ...i, ...patch } : i));
    setArtworks(update);
    setCollections(update);
    setSelected((s) => (s && matches(s) ? { ...s, ...patch } : s));
  };

  const handleSaveToggle = async (item: DailyItem) => {
    const next = !item.saved;
    applyState(item, { saved: next }); // optimistic
    try {
      if (next) {
        await saveItem(item.itemId, item.itemType);
        // Add to the Collections tab (avoid duplicates).
        setSaved((prev) =>
          prev.some(
            (i) => i.itemType === item.itemType && i.itemId === item.itemId
          )
            ? prev
            : [{ ...item, saved: true }, ...prev]
        );
      } else {
        await unsaveItem(item.itemId, item.itemType);
        setSaved((prev) =>
          prev.filter(
            (i) => !(i.itemType === item.itemType && i.itemId === item.itemId)
          )
        );
      }
    } catch (e) {
      applyState(item, { saved: !next }); // revert on failure
      console.error("Save toggle failed", e);
    }
  };

  const handleLikeToggle = async (item: DailyItem) => {
    const next = !item.liked;
    applyState(item, { liked: next }); // optimistic
    try {
      const res = await toggleLike(item.itemId, item.itemType);
      applyState(item, { liked: res.liked });
    } catch (e) {
      applyState(item, { liked: !next });
      console.error("Like toggle failed", e);
    }
  };

  const openArtwork = (item: DailyItem) => {
    setSelected(item);
    markItemSeen(item.id).catch(() => {});
  };

  const heading = useMemo(
    () => (displayDate ? formatDate(displayDate) : ""),
    [displayDate]
  );

  const collectionsCount = collections.length + saved.length;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-12">
      <h1 className="text-3xl font-bold text-gray-900">Daily Curator</h1>
      <p className="mt-1 text-sm text-gray-500">
        Daily Art Picks, Personalized by AI
      </p>
      {heading && <p className="text-sm text-gray-400">{heading}</p>}

      {/* Tabs */}
      <div className="mt-6 flex gap-6 border-b border-gray-200">
        <TabButton
          active={tab === "artworks"}
          onClick={() => setTab("artworks")}
          label={`Daily Artworks (${artworks.length})`}
        />
        <TabButton
          active={tab === "collections"}
          onClick={() => setTab("collections")}
          label={`Collections (${collectionsCount})`}
        />
      </div>

      {loading && <p className="mt-8 text-gray-500">Loading your curation…</p>}
      {error && <p className="mt-8 text-red-500">{error}</p>}

      {!loading && !error && tab === "artworks" && artworks.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          Nothing here yet - your curator hasn't added any artworks for today.
        </p>
      )}
      {!loading && !error && tab === "collections" && collectionsCount === 0 && (
        <p className="mt-12 text-center text-gray-500">
          No collections yet. Tap “View” on an artwork and hit Save to keep it
          here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {tab === "artworks" &&
          artworks.map((item) => (
            <ArtworkCard
              key={item.id}
              item={item}
              onView={() => openArtwork(item)}
            />
          ))}

        {tab === "collections" && (
          <>
            {collections.map((item) => (
              <CollectionCard key={item.id} item={item} />
            ))}
            {saved.map((item) => (
              <SavedArtworkCard
                key={`saved-${item.itemId}`}
                item={item}
                onView={() => openArtwork(item)}
                onRemove={() => handleSaveToggle({ ...item, saved: true })}
              />
            ))}
          </>
        )}
      </div>

      {selected && (
        <ArtworkDetailModal
          item={selected}
          onClose={() => setSelected(null)}
          onSave={() => handleSaveToggle(selected)}
          onLike={() => handleLikeToggle(selected)}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 pb-3 text-base font-semibold transition ${
        active
          ? "border-indigo-600 text-gray-900"
          : "border-transparent text-gray-400 hover:text-gray-600"
      }`}
    >
      {label}
    </button>
  );
}

function ArtworkCard({
  item,
  onView,
}: {
  item: DailyItem;
  onView: () => void;
}) {
  const art = item.data as Curation | null;
  if (!art) return null;
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {art.imageUrl && (
          <img
            src={art.imageUrl}
            alt={art.title}
            className="h-full w-full object-cover"
          />
        )}
        {item.saved && (
          <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
            ★ Saved
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{art.title}</h3>
        {art.artist && <p className="text-sm text-gray-500">by {art.artist}</p>}
        {art.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {art.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <MusicPicker targetType="curation" targetId={art.id} />
          <button
            onClick={onView}
            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

function CollectionCard({ item }: { item: DailyItem }) {
  const col = item.data as CollectionRow | null;
  if (!col) return null;
  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <h3 className="text-lg font-bold text-gray-900">{col.name}</h3>
      {col.description && (
        <p className="mt-1 text-sm text-gray-500">{col.description}</p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <MusicPicker targetType="collection" targetId={col.id} />
        <button
          onClick={() => markItemSeen(item.id).catch(() => {})}
          className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Open
        </button>
      </div>
    </div>
  );
}

// A saved artwork shown inside the Collections tab, with a Remove action.
function SavedArtworkCard({
  item,
  onView,
  onRemove,
}: {
  item: DailyItem;
  onView: () => void;
  onRemove: () => void;
}) {
  const art = item.data as Curation | null;
  if (!art) return null;
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        {art.imageUrl && (
          <img
            src={art.imageUrl}
            alt={art.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-amber-500">★</span>
          <h3 className="text-lg font-bold text-gray-900">{art.title}</h3>
        </div>
        {art.artist && <p className="text-sm text-gray-500">by {art.artist}</p>}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={onView}
            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            View
          </button>
          <button
            onClick={onRemove}
            className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// Detail modal opened by "View": large image + Like / Save / Add music.
function ArtworkDetailModal({
  item,
  onClose,
  onSave,
  onLike,
}: {
  item: DailyItem;
  onClose: () => void;
  onSave: () => void;
  onLike: () => void;
}) {
  const art = item.data as Curation | null;
  if (!art) return null;
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
          aria-label="Close"
        >
          ✕
        </button>

        {art.imageUrl && (
          <img
            src={art.imageUrl}
            alt={art.title}
            className="max-h-[55vh] w-full object-cover"
          />
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">{art.title}</h2>
          {art.artist && (
            <p className="mt-0.5 text-sm text-gray-500">by {art.artist}</p>
          )}
          {art.description && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {art.description}
            </p>
          )}

          {/* Action bar: Like, Save, Add music */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onLike}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                item.liked
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{item.liked ? "♥" : "♡"}</span>
              {item.liked ? "Liked" : "Like"}
            </button>

            <button
              onClick={onSave}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                item.saved
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <span>{item.saved ? "★" : "☆"}</span>
              {item.saved ? "Saved" : "Save"}
            </button>

            <MusicPicker targetType="curation" targetId={art.id} variant="full" />
          </div>
          {item.saved && (
            <p className="mt-3 text-xs text-gray-400">
              Saved to your Collections tab. Tap Save again to remove it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
