import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  MonitorSmartphone,
  Terminal,
  Tv,
} from "lucide-react";
import { CollectionQueuePanel } from "../../CollectionQueuePanel";
import { LiveStreamButton } from "../../LiveStreamButton";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { wsClient } from "../../../lib/wsClient";
import {
  SAMPLE_DISPLAY_IMAGES,
  absoluteSampleUrl,
} from "../../../lib/sampleDisplayImages";

/* ─── types ─────────────────────────────────────────────────────────────── */
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

/* ─── [DEV] Simulator setup notice ──────────────────────────────────────── */
// Temporary developer notice. Remove/hide once the production TV system is ready.
const DEV_DIR = "deckoviz_web-main/fastapi_backend";
const DEV_CMD = "python scripts/simulate_tv_pairing.py";

function DevSimulatorNotice({ hasPairedDevice = false }: { hasPairedDevice?: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`cd ${DEV_DIR}\n${DEV_CMD}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-100 transition-colors select-none"
        id="dev-simulator-notice-toggle"
      >
        <Terminal size={13} className="shrink-0 text-slate-400" />
        <span className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          DEV
        </span>
        <span className="text-[12px] text-slate-500">
          {hasPairedDevice ? "Device paired — waiting for TV connection" : "No simulator connected — click for setup command"}
        </span>
        <span className="ml-auto text-slate-300">
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </button>

      {open && (
        <div className="border-t border-slate-200 bg-white px-3 py-3 space-y-2">
          <p className="text-[12px] text-slate-500 leading-relaxed">
            Run the TV simulator from{" "}
            <code className="rounded bg-slate-100 px-1 text-[11px] font-mono">
              {DEV_DIR}
            </code>
            , then pair at{" "}
            <Link className="underline text-blue-600 hover:text-blue-700" to="/pair">
              /pair
            </Link>{" "}
            and keep it running:
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-[#0f172a] px-3 py-2.5">
            <pre className="flex-1 font-mono text-[12px] text-emerald-400 leading-relaxed whitespace-pre">
              {`cd ${DEV_DIR}\n${DEV_CMD}`}
            </pre>
            <button
              type="button"
              onClick={handleCopy}
              id="dev-simulator-copy-btn"
              className="shrink-0 flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-white/20 transition"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            ✦ Temporary dev notice — will be removed when the production TV system is ready.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main view ──────────────────────────────────────────────────────────── */
export default function DisplayOnTvView() {
  const { status, devices } = useWebSocket();
  const [selectedId, setSelectedId] = useState<string>(SAMPLE_DISPLAY_IMAGES[0].id);
  const [targetId, setTargetId] = useState<string>("");
  const [delivery, setDelivery] = useState<DeliveryRecord | null>(null);
  const pendingRef = useRef<{ messageId: string; sentMs: number } | null>(null);
  const tvWaitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const selected =
    SAMPLE_DISPLAY_IMAGES.find((i) => i.id === selectedId) || SAMPLE_DISPLAY_IMAGES[0];

  const onDisplay = () => {
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

    const imageUrl = absoluteSampleUrl(selected.path);
    const sentMs = Date.now();
    const sentTime = new Date(sentMs).toISOString();
    const messageId = wsClient.send(
      "display_image",
      {
        url: imageUrl,
        image_id: selected.id,
        image_url_or_ref: imageUrl,
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

  /* ─── render ─────────────────────────────────────────────────────────── */
  return (
    <div className="text-[#182a4a]">

      {/* ── Page title ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-md">
          <Tv size={18} />
        </div>
        <div>
          <h1
            className="text-xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Display on TV
          </h1>
          <p className="text-[12px] text-slate-500">
            Pick a sample image and send{" "}
            <code className="text-[11px]">display_image</code> to a paired simulator.
          </p>
        </div>
      </div>

      {/* ── Target device ── */}
      <section className="mb-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <h2 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Target Device
        </h2>

        {onlineDevices.length === 0 ? (
          <DevSimulatorNotice hasPairedDevice={devices.length > 0} />
        ) : (
          <select
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
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

        <p className="mt-1.5 text-[11px] text-slate-400">
          Known devices: {devices.length} · Online: {onlineDevices.length}
        </p>
      </section>

      {/* ── Sample images — 2-column, native 16:9 ── */}
      <section className="mb-3 rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Sample Images
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {SAMPLE_DISPLAY_IMAGES.map((img) => {
            const active = img.id === selectedId;
            return (
              <div
                key={img.id}
                className={`group overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all duration-200 ${
                  active
                    ? "border-[#2563EB] shadow-[0_4px_18px_rgba(37,99,235,0.15)]"
                    : "border-slate-100 hover:border-slate-200 hover:shadow-md"
                }`}
              >
                {/* Full-bleed 16:9 image */}
                <button
                  type="button"
                  onClick={() => setSelectedId(img.id)}
                  className="relative block w-full"
                  aria-label={`Select ${img.name}`}
                >
                  <div
                    className="relative w-full overflow-hidden bg-slate-100"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={img.path}
                      alt={img.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {/* Selected-state badge */}
                    {active && (
                      <div className="absolute inset-0 bg-[#2563EB]/10 flex items-start justify-end p-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] shadow ring-2 ring-white">
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                {/* Card footer: title + Stream Live inline */}
                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedId(img.id)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <span className="block truncate text-[13px] font-semibold text-slate-800">
                      {img.name}
                    </span>
                  </button>
                  <div className="shrink-0">
                    <LiveStreamButton
                      appInstanceId={targetId}
                      artworkId={img.id}
                      url={absoluteSampleUrl(img.path)}
                      name={img.name}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Display on TV CTA */}
        <button
          type="button"
          onClick={onDisplay}
          disabled={!selectedId}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-4 py-3 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <MonitorSmartphone size={16} />
          Display on TV
        </button>
      </section>

      {/* ── Collection queue ── */}
      {targetId && (
        <section className="mb-3">
          <CollectionQueuePanel appInstanceId={targetId} />
        </section>
      )}

      {/* ── Delivery status ── */}
      {delivery && (
        <section className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <h2 className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Delivery Status
          </h2>
          <dl className="space-y-1.5">
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
              <dd className="text-right">{delivery.imageName}</dd>
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
    </div>
  );
}
