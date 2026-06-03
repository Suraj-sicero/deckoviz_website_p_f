// AdminDailyCuratorPage.tsx — admin tool to build a user's daily curation (Feature 2).
// Pick a user + date, browse the library, and add/remove artworks & collections.
// Gate this route to admins (see wiring notes); the backend also enforces requireAdmin.
import { useEffect, useState } from "react";
import {
  AdminUser,
  Curation,
  CollectionRow,
  DailyItem,
  adminAddItem,
  adminGetLibrary,
  adminGetUserItems,
  adminListUsers,
  adminRemoveItem,
} from "../../lib/curatorApi";

const today = () => new Date().toISOString().slice(0, 10);

export default function AdminDailyCuratorPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [date, setDate] = useState(today());

  const [artworks, setArtworks] = useState<Curation[]>([]);
  const [collections, setCollections] = useState<CollectionRow[]>([]);
  const [assigned, setAssigned] = useState<DailyItem[]>([]);
  const [tab, setTab] = useState<"artworks" | "collections">("artworks");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Load users + library once.
  useEffect(() => {
    adminListUsers().then((r) => setUsers(r.users || [])).catch((e) => setError(e.message));
    adminGetLibrary()
      .then((r) => {
        setArtworks(r.artworks || []);
        setCollections(r.collections || []);
      })
      .catch((e) => setError(e.message));
  }, []);

  const doSearch = async () => {
    try {
      const r = await adminListUsers(search);
      setUsers(r.users || []);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const loadAssigned = async (user: AdminUser, d: string) => {
    try {
      const r = await adminGetUserItems(user.id, d);
      setAssigned(r.items || []);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const selectUser = (u: AdminUser) => {
    setSelectedUser(u);
    loadAssigned(u, date);
  };

  useEffect(() => {
    if (selectedUser) loadAssigned(selectedUser, date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const add = async (itemType: "artwork" | "collection", itemId: string) => {
    if (!selectedUser) return;
    setBusy(true);
    try {
      await adminAddItem({ userId: selectedUser.id, itemType, itemId, displayDate: date });
      await loadAssigned(selectedUser, date);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    setBusy(true);
    try {
      await adminRemoveItem(id);
      if (selectedUser) await loadAssigned(selectedUser, date);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const assignedIds = new Set(assigned.map((a) => a.itemId));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-12">
      <h1 className="text-3xl font-bold text-gray-900">Daily Curator — Admin</h1>
      <p className="mt-1 text-sm text-gray-500">
        Build a user's daily curation manually until Vizzy takes over.
      </p>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: pick user */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="font-semibold text-gray-800">1. Pick a user</h2>
          <div className="mt-2 flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              placeholder="Search by email…"
              className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
            />
            <button
              onClick={doSearch}
              className="rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white"
            >
              Search
            </button>
          </div>
          <div className="mt-3 max-h-64 space-y-1 overflow-y-auto">
            {users.map((u) => (
              <button
                key={u.id}
                onClick={() => selectUser(u)}
                className={`block w-full truncate rounded-lg px-3 py-2 text-left text-sm ${
                  selectedUser?.id === u.id
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {u.email}
                {u.isAdmin && <span className="ml-1 text-xs">(admin)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: assigned items */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">2. Their curation</h2>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
          {!selectedUser && (
            <p className="mt-3 text-sm text-gray-400">Select a user first.</p>
          )}
          {selectedUser && assigned.length === 0 && (
            <p className="mt-3 text-sm text-gray-400">
              No items for {date} yet — add some from the library.
            </p>
          )}
          <div className="mt-3 space-y-2">
            {assigned.map((a) => {
              const label =
                a.itemType === "artwork"
                  ? (a.data as Curation | null)?.title
                  : (a.data as CollectionRow | null)?.name;
              return (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
                >
                  <span className="truncate">
                    <span className="mr-1 rounded bg-gray-200 px-1 text-xs">
                      {a.itemType}
                    </span>
                    {label || a.itemId}
                  </span>
                  <button
                    onClick={() => remove(a.id)}
                    disabled={busy}
                    className="text-red-500 hover:underline"
                  >
                    remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: library */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="font-semibold text-gray-800">3. Add from library</h2>
          <div className="mt-2 flex gap-4 border-b border-gray-200 text-sm">
            <button
              onClick={() => setTab("artworks")}
              className={`pb-2 ${tab === "artworks" ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-400"}`}
            >
              Artworks ({artworks.length})
            </button>
            <button
              onClick={() => setTab("collections")}
              className={`pb-2 ${tab === "collections" ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-400"}`}
            >
              Collections ({collections.length})
            </button>
          </div>
          <div className="mt-3 max-h-72 space-y-1 overflow-y-auto">
            {tab === "artworks"
              ? artworks.map((a) => (
                  <LibraryRow
                    key={a.id}
                    label={a.title}
                    sub={a.artist}
                    disabled={!selectedUser || busy || assignedIds.has(a.id)}
                    added={assignedIds.has(a.id)}
                    onAdd={() => add("artwork", a.id)}
                  />
                ))
              : collections.map((c) => (
                  <LibraryRow
                    key={c.id}
                    label={c.name}
                    sub={c.description}
                    disabled={!selectedUser || busy || assignedIds.has(c.id)}
                    added={assignedIds.has(c.id)}
                    onAdd={() => add("collection", c.id)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LibraryRow({
  label,
  sub,
  disabled,
  added,
  onAdd,
}: {
  label: string;
  sub?: string;
  disabled?: boolean;
  added?: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50">
      <span className="min-w-0 flex-1">
        <span className="block truncate">{label}</span>
        {sub && <span className="block truncate text-xs text-gray-400">{sub}</span>}
      </span>
      <button
        onClick={onAdd}
        disabled={disabled}
        className="ml-2 rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
      >
        {added ? "Added" : "Add"}
      </button>
    </div>
  );
}
