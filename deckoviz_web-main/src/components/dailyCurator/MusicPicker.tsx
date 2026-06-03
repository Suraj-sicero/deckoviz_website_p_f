// MusicPicker.tsx — attach one preset music track to a collection / artwork / curation.
// Self-contained: fetches the system tracks, shows the current attachment,
// previews audio, and attaches/detaches via curatorApi.
import { useEffect, useRef, useState } from "react";
import {
  attachMusic,
  detachMusic,
  getMusicForItem,
  getSystemMusic,
  MusicTargetType,
  MusicTrack,
} from "../../lib/curatorApi";

interface Props {
  targetType: MusicTargetType;
  targetId: string;
  /** compact = small inline button; full = labelled card */
  variant?: "compact" | "full";
  onChange?: (track: MusicTrack | null) => void;
}

export default function MusicPicker({
  targetType,
  targetId,
  variant = "compact",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [current, setCurrent] = useState<MusicTrack | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load the currently-attached track for this item.
  useEffect(() => {
    let active = true;
    getMusicForItem(targetType, targetId)
      .then((r) => active && setCurrent(r.track))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [targetType, targetId]);

  const ensureTracks = async () => {
    if (tracks.length) return;
    try {
      const r = await getSystemMusic();
      setTracks(r.tracks || []);
    } catch (e) {
      console.error("Failed to load music", e);
    }
  };

  const toggleOpen = async () => {
    if (!open) await ensureTracks();
    setOpen((o) => !o);
  };

  const preview = (track: MusicTrack) => {
    if (!audioRef.current) return;
    if (previewId === track.id) {
      audioRef.current.pause();
      setPreviewId(null);
      return;
    }
    audioRef.current.src = track.audioUrl;
    audioRef.current.play().catch(() => {});
    setPreviewId(track.id);
  };

  const choose = async (track: MusicTrack) => {
    setLoading(true);
    try {
      await attachMusic(targetType, targetId, track.id);
      setCurrent(track);
      onChange?.(track);
      setOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    setLoading(true);
    try {
      await detachMusic(targetType, targetId);
      setCurrent(null);
      onChange?.(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const classical = tracks.filter((t) => t.category === "classical");
  const ambient = tracks.filter((t) => t.category !== "classical");

  return (
    <div className="relative inline-block text-left">
      <audio ref={audioRef} onEnded={() => setPreviewId(null)} hidden />

      <button
        type="button"
        onClick={toggleOpen}
        disabled={loading}
        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
      >
        <span aria-hidden>🎵</span>
        {current
          ? variant === "compact"
            ? "Music"
            : current.title
          : "Add music"}
      </button>

      {current && (
        <span className="ml-2 text-xs text-gray-500">
          {current.title}
          <button
            type="button"
            onClick={remove}
            className="ml-1 text-red-500 hover:underline"
          >
            remove
          </button>
        </span>
      )}

      {open && (
        <div className="absolute z-30 mt-2 max-h-80 w-72 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          {tracks.length === 0 && (
            <p className="p-3 text-sm text-gray-500">No tracks available.</p>
          )}
          {[
            { label: "Classical", list: classical },
            { label: "Ambient", list: ambient },
          ].map(
            (group) =>
              group.list.length > 0 && (
                <div key={group.label} className="mb-2">
                  <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {group.label}
                  </p>
                  {group.list.map((t) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50 ${
                        current?.id === t.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => preview(t)}
                        className="mr-2 text-gray-500 hover:text-indigo-600"
                        title="Preview"
                      >
                        {previewId === t.id ? "⏸" : "▶"}
                      </button>
                      <span className="flex-1 truncate">{t.title}</span>
                      <button
                        type="button"
                        onClick={() => choose(t)}
                        className="ml-2 rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        {current?.id === t.id ? "Selected" : "Select"}
                      </button>
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
