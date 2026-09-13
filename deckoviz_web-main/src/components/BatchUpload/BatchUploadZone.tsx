import { useState, useRef, useCallback } from "react";
import { Upload, X, CheckCircle, AlertCircle, RefreshCw, Tag, FolderPlus, Loader2, Image as ImageIcon, Music, Video, FileText } from "lucide-react";
import { webappApi } from "../../lib/webappApi";

type LibraryType = "image" | "music" | "video" | "art" | "posters" | "photos" | "art/posters/photos" | "all";
type Destination = "personal" | "global";
type FileStatus = "queued" | "uploading" | "done" | "failed";

interface BatchFile {
  id: string;
  file: File;
  status: FileStatus;
  error?: string;
  media?: any;
}

interface BatchUploadZoneProps {
  libraryType: LibraryType;
  destination: Destination;
  onComplete?: (results: any) => void;
  onClose?: () => void;
}

const LIBRARY_MIMES: Record<string, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  music: ["audio/mpeg", "audio/mp4", "audio/ogg", "audio/wav", "audio/x-wav"],
  video: ["video/mp4", "video/webm"],
  art: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  posters: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  photos: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  "art/posters/photos": ["image/jpeg", "image/png", "image/webp", "image/gif"],
  all: ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "audio/mpeg", "audio/mp4", "audio/ogg", "audio/wav"],
};

function getAllowedMimes(libraryType: string): string[] {
  return LIBRARY_MIMES[libraryType.toLowerCase()] || LIBRARY_MIMES["all"];
}

function validateFileForLibrary(file: File, libraryType: string): string | null {
  const allowed = getAllowedMimes(libraryType);
  // Check mime type
  if (file.type && allowed.length > 0) {
    // For music, also allow audio/* with any subtype
    const mimeLower = file.type.toLowerCase();
    const isAllowed = allowed.some((mime) => {
      if (mime === mimeLower) return true;
      // Handle wildcard like audio/* - check prefix
      if (mime.endsWith("/*")) {
        const prefix = mime.split("/")[0];
        return mimeLower.startsWith(prefix + "/");
      }
      return false;
    });
    // Also allow based on file extension fallback for cases where mime is empty or generic
    if (!isAllowed) {
      // Check extension
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      const extToMime: Record<string, string> = {
        jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif",
        mp4: "video/mp4", webm: "video/webm",
        mp3: "audio/mpeg", wav: "audio/wav", ogg: "audio/ogg", m4a: "audio/mp4",
      };
      const inferred = extToMime[ext];
      if (inferred && allowed.includes(inferred)) {
        return null;
      }
      return `File type ${file.type || ext || "unknown"} not allowed in ${libraryType} library`;
    }
  }
  return null;
}

export function BatchUploadZone({ libraryType, destination, onComplete, onClose }: BatchUploadZoneProps) {
  const [batchFiles, setBatchFiles] = useState<BatchFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [showTagging, setShowTagging] = useState(false);
  const [batchTags, setBatchTags] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [perFileTags, setPerFileTags] = useState<Record<string, string>>({});
  const [taggingMode, setTaggingMode] = useState<"batch" | "per-file">("batch");
  const [collections, setCollections] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load collections for tagging (personal vs global)
  const loadCollections = useCallback(async () => {
    try {
      if (destination === "global") {
        // For global, try admin library first, then fallback to personal
        try {
          const { adminGetLibrary } = await import("../../lib/curatorApi");
          const lib = await adminGetLibrary();
          const cols = (lib as any)?.collections || [];
          if (Array.isArray(cols) && cols.length > 0) {
            setCollections(cols);
            return;
          }
        } catch {}
        // Also try enterprise collections for global taxonomy
        try {
          const cols = await webappApi.getCollections();
          const list = Array.isArray(cols) ? cols : (cols as any)?.items || (cols as any)?.rows || [];
          // Filter for system/global collections if available
          setCollections(list);
          return;
        } catch {}
      }
      const cols = await webappApi.getCollections();
      const list = Array.isArray(cols) ? cols : (cols as any)?.items || (cols as any)?.rows || [];
      setCollections(list);
    } catch {
      try {
        const cols = await webappApi.getCollections();
        setCollections(Array.isArray(cols) ? cols : []);
      } catch {}
    }
  }, [destination]);

  const handleFilesSelected = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    // Enforce 200 cap client-side
    const currentCount = batchFiles.length;
    const remaining = 200 - currentCount;
    if (fileArray.length > remaining) {
      setBatchError(`Batch exceeds 200 files limit. You have ${currentCount} already, can add ${remaining} more. Selected ${fileArray.length} would exceed.`);
      // Only add up to remaining
      fileArray.splice(remaining);
      if (remaining <= 0) return;
    } else {
      setBatchError(null);
    }

    // Validate each file against target library
    const newBatchFiles: BatchFile[] = fileArray.map((file) => {
      const error = validateFileForLibrary(file, libraryType);
      return {
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        status: error ? "failed" : "queued",
        error: error || undefined,
      };
    });

    setBatchFiles((prev) => [...prev, ...newBatchFiles]);
  }, [batchFiles.length, libraryType]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  }, [handleFilesSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(e.target.files);
      // Reset input so same file can be selected again if needed
      e.target.value = "";
    }
  }, [handleFilesSelected]);

  const removeFile = useCallback((id: string) => {
    setBatchFiles((prev) => prev.filter((f) => f.id !== id));
    setPerFileTags((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setBatchFiles([]);
    setBatchError(null);
    setPerFileTags({});
    setShowTagging(false);
  }, []);

  const handleUpload = useCallback(async () => {
    const queuedFiles = batchFiles.filter((f) => f.status === "queued");
    const validFiles = batchFiles.filter((f) => f.status !== "failed");
    if (validFiles.length === 0) {
      setBatchError("No valid files to upload. Please check per-file errors.");
      return;
    }
    if (validFiles.length > 200) {
      setBatchError("Batch exceeds 200 files limit");
      return;
    }

    setIsUploading(true);
    setBatchError(null);

    // Mark queued as uploading
    setBatchFiles((prev) => prev.map((f) => (f.status === "queued" ? { ...f, status: "uploading" } : f)));

    try {
      const filesToUpload = batchFiles.filter((f) => f.status === "queued" || f.status === "uploading").map((f) => f.file);
      // Use the batch API which handles parallel/chunked + background tasks server-side
      const result = await webappApi.uploadBatch(filesToUpload, { destination, libraryType });

      // Map results back to per-file status
      const resultsByFilename = new Map<string, any>();
      (result.results || []).forEach((r: any) => {
        // Use filename as key (may have duplicates, but use first)
        if (!resultsByFilename.has(r.filename)) {
          resultsByFilename.set(r.filename, r);
        }
      });

      setBatchFiles((prev) =>
        prev.map((bf) => {
          // Find matching result by filename
          const res = resultsByFilename.get(bf.file.name) || resultsByFilename.get(bf.file.name.replace(/\.[^/.]+$/, "")) || null;
          // Try to find by clean_name
          let matched = res;
          if (!matched) {
            for (const r of result.results || []) {
              if (r.clean_name === bf.file.name || r.filename === bf.file.name) {
                matched = r;
                break;
              }
            }
          }
          if (matched) {
            if (matched.status === "done") {
              return { ...bf, status: "done", media: matched.media, error: undefined };
            } else {
              return { ...bf, status: "failed", error: matched.error || "Upload failed" };
            }
          }
          // If not in results, keep as is (maybe was already failed validation)
          return bf;
        })
      );

      // If at least one succeeded, show tagging step
      const hasDone = result.results?.some((r: any) => r.status === "done");
      if (hasDone) {
        setShowTagging(true);
        loadCollections();
        if (onComplete) onComplete(result);
      }
    } catch (err: any) {
      // Mark all uploading as failed
      setBatchFiles((prev) => prev.map((f) => (f.status === "uploading" ? { ...f, status: "failed", error: err.message || "Batch upload failed" } : f)));
      setBatchError(err.message || "Batch upload failed");
    } finally {
      setIsUploading(false);
    }
  }, [batchFiles, destination, libraryType, loadCollections, onComplete]);

  const handleRetrySingle = useCallback(async (id: string) => {
    const target = batchFiles.find((f) => f.id === id);
    if (!target) return;
    setBatchFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "uploading", error: undefined } : f)));
    try {
      const result = await webappApi.uploadBatchRetry(target.file, { destination, libraryType });
      if (result.status === "done") {
        setBatchFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "done", media: result.media, error: undefined } : f)));
      } else {
        setBatchFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "failed", error: result.error || "Retry failed" } : f)));
      }
    } catch (err: any) {
      setBatchFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "failed", error: err.message || "Retry failed" } : f)));
    }
  }, [batchFiles, destination, libraryType]);

  const handleTaggingSubmit = useCallback(async () => {
    const doneFiles = batchFiles.filter((f) => f.status === "done" && f.media);
    const mediaIds = doneFiles.map((f) => f.media.id || f.media.mediaUrl || f.id);
    if (mediaIds.length === 0) {
      setShowTagging(false);
      return;
    }

    try {
      if (taggingMode === "batch") {
        await webappApi.tagBatch({
          media_ids: mediaIds,
          tags: batchTags,
          collection_id: collectionId || undefined,
          collection_name: collectionName || undefined,
          destination,
          library_type: libraryType,
        });
      } else {
        // Per-file tagging: send each file's tags individually
        for (const bf of doneFiles) {
          const tags = perFileTags[bf.id] || batchTags;
          const mediaId = bf.media.id || bf.media.mediaUrl || bf.id;
          await webappApi.tagBatch({
            media_ids: [mediaId],
            tags,
            collection_id: collectionId || undefined,
            collection_name: collectionName || undefined,
            destination,
            library_type: libraryType,
          });
        }
      }
      setShowTagging(false);
      // Optionally clear or keep the batch for next upload
      // For now, keep the done files visible but clear tagging state
      setBatchTags("");
      setPerFileTags({});
    } catch (err: any) {
      setBatchError(err.message || "Tagging failed");
    }
  }, [batchFiles, batchTags, collectionId, collectionName, perFileTags, taggingMode, destination, libraryType]);

  const queuedCount = batchFiles.filter((f) => f.status === "queued").length;
  const uploadingCount = batchFiles.filter((f) => f.status === "uploading").length;
  const doneCount = batchFiles.filter((f) => f.status === "done").length;
  const failedCount = batchFiles.filter((f) => f.status === "failed").length;

  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case "queued":
        return <div className="w-2 h-2 rounded-full bg-gray-300" />;
      case "uploading":
        return <Loader2 size={14} className="animate-spin text-blue-600" />;
      case "done":
        return <CheckCircle size={14} className="text-emerald-500" />;
      case "failed":
        return <AlertCircle size={14} className="text-rose-500" />;
    }
  };

  const getLibraryIcon = () => {
    switch (libraryType.toLowerCase()) {
      case "music":
        return <Music size={24} />;
      case "video":
        return <Video size={24} />;
      case "image":
      case "art":
      case "photos":
      case "posters":
      case "art/posters/photos":
        return <ImageIcon size={24} />;
      default:
        return <FileText size={24} />;
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all group
          ${isDragging ? "border-blue-400 bg-blue-50/50" : "border-gray-200 bg-gray-50/50 hover:border-blue-300 hover:bg-blue-50/30"}
          ${isUploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={getAllowedMimes(libraryType).join(",") + ",*/*"}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
          <div className="text-blue-600">{getLibraryIcon()}</div>
        </div>
        <h3 className="font-bold text-gray-900 mb-1">
          Drop {libraryType} files here or click to select
        </h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Multi-select up to 200 files at once. Supports drag & drop. Per-file validation for {libraryType} library.
        </p>
        <p className="text-[11px] text-gray-400 mt-2">
          {batchFiles.length} / 200 files selected • {queuedCount} queued, {uploadingCount} uploading, {doneCount} done, {failedCount} failed
        </p>
      </div>

      {batchError && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 flex items-start gap-2 text-sm text-rose-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{batchError}</span>
          <button onClick={() => setBatchError(null)} className="ml-auto text-rose-400 hover:text-rose-600">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Batch Progress View */}
      {batchFiles.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <h4 className="text-sm font-bold text-gray-800">Batch Progress ({batchFiles.length} files)</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:block">
                {doneCount} done • {failedCount} failed • {uploadingCount} uploading • {queuedCount} queued
              </span>
              <button
                onClick={clearAll}
                disabled={isUploading}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-100">
            {batchFiles.map((bf) => (
              <div key={bf.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50">
                <div className="shrink-0">{getStatusIcon(bf.status)}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate" title={bf.file.name}>
                    {bf.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(bf.file.size / 1024).toFixed(1)} KB • {bf.file.type || "unknown"} • <span className={`font-semibold capitalize ${bf.status === "done" ? "text-emerald-600" : bf.status === "failed" ? "text-rose-600" : bf.status === "uploading" ? "text-blue-600" : "text-gray-500"}`}>{bf.status}</span>
                    {bf.error && <span className="text-rose-600"> — {bf.error}</span>}
                  </p>
                  {bf.status === "failed" && bf.error && (
                    <p className="text-xs text-rose-600 mt-1 line-clamp-2">{bf.error}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {bf.status === "failed" && (
                    <button
                      onClick={() => handleRetrySingle(bf.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                    >
                      <RefreshCw size={12} /> Retry
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(bf.id)}
                    disabled={bf.status === "uploading"}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {doneCount > 0 && `${doneCount} uploaded successfully. `}
              {failedCount > 0 && `${failedCount} failed. `}
              {queuedCount > 0 && `${queuedCount} queued.`}
            </p>
            <button
              onClick={handleUpload}
              disabled={isUploading || queuedCount === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {isUploading ? `Uploading ${uploadingCount}...` : `Upload ${queuedCount} files`}
            </button>
          </div>
        </div>
      )}

      {/* Tagging Modal — mandatory/visible after upload completes */}
      {showTagging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Tag size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Tag your batch</h3>
                  <p className="text-xs text-gray-500">
                    {destination === "global" ? "Global taxonomy — assign to Collection/Curation" : "Personal — assign to your collections"} • {doneCount} files ready
                  </p>
                </div>
              </div>
              <button onClick={() => setShowTagging(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="flex gap-2 p-1 rounded-full bg-gray-100 w-fit">
                <button
                  onClick={() => setTaggingMode("batch")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${taggingMode === "batch" ? "bg-white shadow text-blue-700" : "text-gray-600"}`}
                >
                  Batch-level tags
                </button>
                <button
                  onClick={() => setTaggingMode("per-file")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${taggingMode === "per-file" ? "bg-white shadow text-blue-700" : "text-gray-600"}`}
                >
                  Per-file tags
                </button>
              </div>

              {taggingMode === "batch" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={batchTags}
                      onChange={(e) => setBatchTags(e.target.value)}
                      placeholder="e.g. summer, vacation, family"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Applied to all {doneCount} files in this batch.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        {destination === "global" ? "Global Collection" : "Personal Collection"}
                      </label>
                      <select
                        value={collectionId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCollectionId(val);
                          const found = collections.find((c: any) => c.id === val);
                          setCollectionName(found?.name || found?.title || "");
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm"
                      >
                        <option value="">{destination === "global" ? "Select global collection..." : "Select personal collection..."}</option>
                        {collections.map((c: any) => (
                          <option key={c.id} value={c.id}>
                            {c.name || c.title} ({c.itemCount || c.items?.length || 0} items)
                          </option>
                        ))}
                      </select>
                      {destination === "global" && <p className="text-[11px] text-blue-600 mt-1">Global taxonomy — visible to all users</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">New Collection Name (optional)</label>
                      <input
                        type="text"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        placeholder="e.g. Summer 2026"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {batchFiles
                    .filter((f) => f.status === "done")
                    .map((bf) => (
                      <div key={bf.id} className="flex gap-3 items-center p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{bf.file.name}</p>
                          <p className="text-xs text-gray-500 truncate">{bf.file.type}</p>
                        </div>
                        <input
                          type="text"
                          value={perFileTags[bf.id] || ""}
                          onChange={(e) => setPerFileTags((prev) => ({ ...prev, [bf.id]: e.target.value }))}
                          placeholder="Tags for this file"
                          className="flex-1 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                        />
                      </div>
                    ))}
                  {batchFiles.filter((f) => f.status === "done").length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No uploaded files to tag.</p>
                  )}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Also assign all to collection</label>
                    <select
                      value={collectionId}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCollectionId(val);
                        const found = collections.find((c: any) => c.id === val);
                        setCollectionName(found?.name || found?.title || "");
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm"
                    >
                      <option value="">{destination === "global" ? "Select global collection..." : "Select personal collection..."}</option>
                      {collections.map((c: any) => (
                        <option key={c.id} value={c.id}>
                          {c.name || c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setShowTagging(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-white border border-transparent hover:border-gray-200"
              >
                Skip for now
              </button>
              <button
                onClick={handleTaggingSubmit}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-md"
              >
                <FolderPlus size={16} /> Apply Tags & Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchUploadZone;
