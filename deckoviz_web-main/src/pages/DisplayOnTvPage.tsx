import { useEffect, useMemo, useRef, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MonitorSmartphone, Tv, Upload, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { CollectionQueuePanel } from "../components/CollectionQueuePanel";
import { LiveStreamButton } from "../components/LiveStreamButton";
import { useWebSocket } from "../hooks/useWebSocket";
import { wsClient } from "../lib/wsClient";
import { SAMPLE_DISPLAY_IMAGES, absoluteSampleUrl } from "../lib/sampleDisplayImages";
import { webappApi } from "../lib/webappApi";

type DeliveryStatus = "idle" | "pending" | "delivered" | "failed";

type DeliveryRecord = {
  messageId: string;
  imageId: string;
  imageName: string;
  targetAppInstanceId: string;
  sentTime: string;
  deliveredTime: string | null;
  latencyMs: number | null;
  status: DeliveryStatus;
  reason: string | null;
  ackSource: string | null;
};

interface DisplayItem {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  isUploaded?: boolean;
}

export default function DisplayOnTvPage() {
  const { user, token } = useAuth();
  const { status, devices } = useWebSocket();
  const [selectedId, setSelectedId] = useState<string>(SAMPLE_DISPLAY_IMAGES[0].id);
  const [targetId, setTargetId] = useState<string>("");
  const [delivery, setDelivery] = useState<DeliveryRecord | null>(null);
  const [userImages, setUserImages] = useState<DisplayItem[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "samples" | "uploads">("all");
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingRef = useRef<{ messageId: string; sentMs: number } | null>(null);
  const tvWaitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sampleItems: DisplayItem[] = useMemo(
    () =>
      SAMPLE_DISPLAY_IMAGES.map((img) => ({
        id: img.id,
        name: img.name,
        url: absoluteSampleUrl(img.path),
        thumbnail: img.path,
        isUploaded: false,
      })),
    []
  );

  // Fetch user uploaded media from backend
  useEffect(() => {
    let isSubscribed = true;
    const loadUserMedia = async () => {
      try {
        const res = await webappApi.getMedia({ type: "image" }, token || undefined);
        const list = Array.isArray(res) ? res : res?.items || res?.media || [];
        if (isSubscribed && Array.isArray(list)) {
          const mapped: DisplayItem[] = list
            .filter((m: any) => m && (m.url || m.mediaUrl || m.imageUrl))
            .map((m: any) => {
              const imgUrl = m.url || m.mediaUrl || m.imageUrl;
              return {
                id: String(m.id || m._id || m.fileName || Math.random()),
                name: m.fileName || m.filename || m.title || "Uploaded Image",
                url: imgUrl,
                thumbnail: imgUrl,
                isUploaded: true,
              };
            });
          setUserImages(mapped);
        }
      } catch (err) {
        console.warn("[DisplayOnTvPage] Failed to fetch user media:", err);
      }
    };

    loadUserMedia();
    return () => {
      isSubscribed = false;
    };
  }, [token]);

  const allItems: DisplayItem[] = useMemo(() => {
    if (activeTab === "samples") return sampleItems;
    if (activeTab === "uploads") return userImages;
    return [...userImages, ...sampleItems];
  }, [activeTab, sampleItems, userImages]);

  const onlineDevices = useMemo(
    () => devices.filter((d) => d.status === "online"),
    [devices]
  );

  useEffect(() => {
    if (!targetId && onlineDevices.length > 0) {
      setTargetId(onlineDevices[0].app_instance_id);
    }
  }, [onlineDevices, targetId]);

  useEffect(() => {
    const clearTvWait = () => {
      if (tvWaitTimerRef.current) {
        clearTimeout(tvWaitTimerRef.current);
        tvWaitTimerRef.current = null;
      }
    };

    const unsubAck = wsClient.on("acknowledgement", (payload) => {
      const refId = payload.reference_message_id as string | undefined;
      const pending = pendingRef.current;
      if (!pending || !refId || refId !== pending.messageId) return;

      // Prefer TV-sourced ack for delivery timing; ignore immediate gateway ack
      if (payload.source !== "tv") return;

      clearTvWait();
      const deliveredMs = Date.now();
      const statusValue = (payload.status as string) === "failed" ? "failed" : "delivered";
      setDelivery((prev) =>
        prev && prev.messageId === pending.messageId
          ? {
              ...prev,
              status: statusValue,
              deliveredTime: new Date(deliveredMs).toISOString(),
              latencyMs: deliveredMs - pending.sentMs,
              reason: (payload.reason as string) || null,
              ackSource: "tv",
            }
          : prev
      );
      pendingRef.current = null;
    });

    const unsubErr = wsClient.on("error", (payload) => {
      const refId = payload.reference_message_id as string | undefined;
      const pending = pendingRef.current;
      if (!pending || !refId || refId !== pending.messageId) return;

      clearTvWait();
      const deliveredMs = Date.now();
      setDelivery((prev) =>
        prev && prev.messageId === pending.messageId
          ? {
              ...prev,
              status: "failed",
              deliveredTime: new Date(deliveredMs).toISOString(),
              latencyMs: deliveredMs - pending.sentMs,
              reason: (payload.reason as string) || "error",
              ackSource: "gateway",
            }
          : prev
      );
      pendingRef.current = null;
    });

    return () => {
      clearTvWait();
      unsubAck();
      unsubErr();
    };
  }, []);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // Reset input value so same file can be re-uploaded if needed
    if (fileInputRef.current) fileInputRef.current.value = "";

    setUploading(true);
    setUploadError(null);

    try {
      const uploaded = await webappApi.uploadMedia(file, token || undefined);
      const newItem: DisplayItem = {
        id: uploaded.id,
        name: uploaded.fileName || file.name,
        url: uploaded.url || uploaded.mediaUrl,
        thumbnail: uploaded.url || uploaded.mediaUrl,
        isUploaded: true,
      };

      setUserImages((prev) => [newItem, ...prev]);
      setSelectedId(newItem.id);
      setActiveTab("uploads");
    } catch (err: any) {
      console.error("[DisplayOnTvPage] Upload failed:", err);
      setUploadError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const selected = allItems.find((i) => i.id === selectedId) || allItems[0] || sampleItems[0];

  const onDisplay = () => {
    if (!selected) return;

    if (!targetId) {
      setDelivery({
        messageId: "",
        imageId: selected.id,
        imageName: selected.name,
        targetAppInstanceId: "",
        sentTime: new Date().toISOString(),
        deliveredTime: null,
        latencyMs: null,
        status: "failed",
        reason: "No online TV selected. Pair a device and keep the simulator connected.",
        ackSource: null,
      });
      return;
    }

    if (status !== "connected") {
      setDelivery({
        messageId: "",
        imageId: selected.id,
        imageName: selected.name,
        targetAppInstanceId: targetId,
        sentTime: new Date().toISOString(),
        deliveredTime: null,
        latencyMs: null,
        status: "failed",
        reason: "Browser WebSocket is not connected.",
        ackSource: null,
      });
      return;
    }

    const imageUrl = selected.url;
    const sentMs = Date.now();
    const sentTime = new Date(sentMs).toISOString();

    const messageId = wsClient.send(
      "display_image",
      {
        url: imageUrl,
        image_id: selected.id,
        image_url_or_ref: imageUrl,
        title: selected.name,
        transition: "fade",
        duration: 5000,
      },
      targetId
    );

    if (!messageId) {
      setDelivery({
        messageId: "",
        imageId: selected.id,
        imageName: selected.name,
        targetAppInstanceId: targetId,
        sentTime,
        deliveredTime: null,
        latencyMs: null,
        status: "failed",
        reason: "Failed to send over WebSocket.",
        ackSource: null,
      });
      return;
    }

    pendingRef.current = { messageId, sentMs };
    if (tvWaitTimerRef.current) clearTimeout(tvWaitTimerRef.current);
    tvWaitTimerRef.current = setTimeout(() => {
      const pending = pendingRef.current;
      if (!pending || pending.messageId !== messageId) return;
      setDelivery((prev) =>
        prev && prev.messageId === messageId
          ? {
              ...prev,
              status: "failed",
              deliveredTime: new Date().toISOString(),
              latencyMs: Date.now() - pending.sentMs,
              reason: "TV acknowledgement timeout — is the simulator still connected?",
              ackSource: null,
            }
          : prev
      );
      pendingRef.current = null;
    }, 15000);

    setDelivery({
      messageId,
      imageId: selected.id,
      imageName: selected.name,
      targetAppInstanceId: targetId,
      sentTime,
      deliveredTime: null,
      latencyMs: null,
      status: "pending",
      reason: null,
      ackSource: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#182a4a]">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 sm:px-6">
        <Link to="/webapp" className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-[#2563EB]">
          <ArrowLeft size={14} />
          Webapp
        </Link>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="hidden sm:inline">{user?.email}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              status === "connected" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            WS {status}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white">
              <Tv size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Display on TV
              </h1>
              <p className="text-sm text-slate-500">
                Select or upload an image and stream it live to a paired TV simulator.
              </p>
            </div>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-95 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {uploadError}
          </div>
        )}

        {/* Target Device Section */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Target device</h2>
          {onlineDevices.length === 0 ? (
            <p className="text-sm text-amber-700">
              No online TV. Run the TV Simulator or pair at{" "}
              <Link className="underline font-semibold" to="/pair">
                /pair
              </Link>
              , and keep the simulator connected.
            </p>
          ) : (
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
            >
              {onlineDevices.map((d) => (
                <option key={d.app_instance_id} value={d.app_instance_id}>
                  {d.device_name || "TV"} — {d.app_instance_id.slice(0, 8)}… ({d.status})
                </option>
              ))}
            </select>
          )}
          <p className="mt-2 text-xs text-slate-400">
            Known devices: {devices.length} · Online: {onlineDevices.length}
          </p>
        </section>

        {/* Image Selection Section */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Image Library</h2>
            <div className="flex gap-1 rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-md px-2.5 py-1 transition ${
                  activeTab === "all" ? "bg-white text-[#182a4a] shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                All ({userImages.length + sampleItems.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("uploads")}
                className={`rounded-md px-2.5 py-1 transition ${
                  activeTab === "uploads" ? "bg-white text-[#182a4a] shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Your Uploads ({userImages.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("samples")}
                className={`rounded-md px-2.5 py-1 transition ${
                  activeTab === "samples" ? "bg-white text-[#182a4a] shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Samples ({sampleItems.length})
              </button>
            </div>
          </div>

          {allItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-10 text-center">
              <ImageIcon className="mb-2 h-8 w-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">No images found</p>
              <p className="text-xs text-slate-400">Click &quot;Upload Image&quot; to add your first photo</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {allItems.map((img) => {
                const active = img.id === selectedId;
                return (
                  <div
                    key={img.id}
                    className={`group relative overflow-hidden rounded-xl border p-1 text-left transition ${
                      active ? "border-[#2563EB] ring-2 ring-[#2563EB]/30 bg-blue-50/20" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(img.id)}
                      className="w-full text-left"
                    >
                      <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={img.thumbnail}
                          alt={img.name}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                          onError={(e) => {
                            // Fallback in case of broken remote URL
                            (e.target as HTMLImageElement).src = SAMPLE_DISPLAY_IMAGES[0].path;
                          }}
                        />
                        {img.isUploaded && (
                          <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                            Uploaded
                          </span>
                        )}
                        {active && (
                          <span className="absolute right-1.5 top-1.5 rounded-full bg-[#2563EB] p-0.5 text-white shadow">
                            <CheckCircle2 size={12} />
                          </span>
                        )}
                      </div>
                      <div className="truncate px-1 py-1 text-xs font-medium text-slate-700" title={img.name}>
                        {img.name}
                      </div>
                    </button>

                    <div className="px-1 pb-1 pt-0.5">
                      <LiveStreamButton
                        appInstanceId={targetId}
                        artworkId={img.id}
                        url={img.url}
                        name={img.name}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={onDisplay}
            disabled={!selectedId || !selected}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow transition hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            <MonitorSmartphone size={16} />
            Display on TV {selected ? `— ${selected.name}` : ""}
          </button>
        </section>

        {targetId && (
          <section className="mb-6">
            <CollectionQueuePanel appInstanceId={targetId} />
          </section>
        )}

        {delivery && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Delivery status</h2>
            <dl className="space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">status</dt>
                <dd
                  className={`font-semibold ${
                    delivery.status === "delivered"
                      ? "text-emerald-700"
                      : delivery.status === "failed"
                        ? "text-red-700"
                        : delivery.status === "pending"
                          ? "text-amber-700"
                          : "text-slate-700"
                  }`}
                >
                  {delivery.status}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">image</dt>
                <dd className="text-right truncate max-w-[200px]">{delivery.imageName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">message_id</dt>
                <dd className="truncate font-mono text-xs">{delivery.messageId || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">sent_time</dt>
                <dd className="font-mono text-xs">{delivery.sentTime}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">delivered_time</dt>
                <dd className="font-mono text-xs">{delivery.deliveredTime || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">latency_ms</dt>
                <dd>{delivery.latencyMs != null ? `${delivery.latencyMs} ms` : "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">ack source</dt>
                <dd>{delivery.ackSource || "—"}</dd>
              </div>
              {delivery.reason && (
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">reason</dt>
                  <dd className="text-right text-red-700">{delivery.reason}</dd>
                </div>
              )}
            </dl>
          </section>
        )}
      </main>
    </div>
  );
}
