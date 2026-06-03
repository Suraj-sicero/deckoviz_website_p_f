// DailyCuratorPage.tsx — the user-facing daily curation feed (Feature 2).
// Mirrors the mobile "Daily Curator" screen: Daily Artworks + Collections tabs.
import { useEffect, useMemo, useState } from "react";
import {
  Curation,
  CollectionRow,
  DailyItem,
  getMyDailyCuration,
  markItemSeen,
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
  const [displayDate, setDisplayDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getMyDailyCuration()
      .then((r) => {
        if (!active) return;
        setArtworks(r.artworks || []);
        setCollections(r.collections || []);
        setDisplayDate(r.displayDate);
      })
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const items = tab === "artworks" ? artworks : collections;

  const heading = useMemo(
    () => (displayDate ? formatDate(displayDate) : ""),
    [displayDate]
  );

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
          label={`Collections (${collections.length})`}
        />
      </div>

      {loading && <p className="mt-8 text-gray-500">Loading your curation…</p>}
      {error && <p className="mt-8 text-red-500">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          Nothing here yet — your curator hasn't added any{" "}
          {tab === "artworks" ? "artworks" : "collections"} for today.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {items.map((item) =>
          tab === "artworks" ? (
            <ArtworkCard key={item.id} item={item} />
          ) : (
            <CollectionCard key={item.id} item={item} />
          )
        )}
      </div>
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

function ArtworkCard({ item }: { item: DailyItem }) {
  const art = item.data as Curation | null;
  const onView = () => {
    markItemSeen(item.id).catch(() => {});
  };
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
        <h3 className="text-lg font-bold text-gray-900">{art.title}</h3>
        {art.artist && (
          <p className="text-sm text-gray-500">by {art.artist}</p>
        )}
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
