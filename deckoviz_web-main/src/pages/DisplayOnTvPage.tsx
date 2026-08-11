import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MonitorSmartphone, Tv } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWebSocket } from "../hooks/useWebSocket";
import { wsClient } from "../lib/wsClient";
import { SAMPLE_DISPLAY_IMAGES, absoluteSampleUrl } from "../lib/sampleDisplayImages";

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

export default function DisplayOnTvPage() {
  const { user } = useAuth();
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

  const selected = SAMPLE_DISPLAY_IMAGES.find((i) => i.id === selectedId) || SAMPLE_DISPLAY_IMAGES[0];

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
    // Use existing display_image action; include image_id for payload clarity
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

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#182a4a]">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 sm:px-6">
        <Link to="/webapp" className="inline-flex items-center gap-1.5 text-sm font-medium">
          <ArrowLeft size={14} />
          Webapp
        </Link>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="hidden sm:inline">{user?.email}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              status === "connected" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            WS {status}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white">
            <Tv size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Display on TV
            </h1>
            <p className="text-sm text-slate-500">
              Pick a sample image and send <code className="text-xs">display_image</code> to a paired simulator.
            </p>
          </div>
        </div>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Target device</h2>
          {onlineDevices.length === 0 ? (
            <p className="text-sm text-amber-700">
              No online TV. Run{" "}
              <code className="rounded bg-slate-100 px-1">python scripts/simulate_tv_pairing.py</code> in{" "}
              <code className="rounded bg-slate-100 px-1">fastapi_backend</code>, pair at{" "}
              <Link className="underline" to="/pair">
                /pair
              </Link>
              , and leave the simulator running.
            </p>
          ) : (
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
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

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Sample images</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SAMPLE_DISPLAY_IMAGES.map((img) => {
              const active = img.id === selectedId;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedId(img.id)}
                  className={`overflow-hidden rounded-xl border text-left transition ${
                    active ? "border-[#2563EB] ring-2 ring-[#2563EB]/30" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img src={img.path} alt={img.name} className="h-28 w-full object-cover" />
                  <div className="px-2 py-1.5 text-xs font-medium text-slate-700">{img.name}</div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onDisplay}
            disabled={!selectedId}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            <MonitorSmartphone size={16} />
            Display on TV
          </button>
        </section>

        {delivery && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
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
      </main>
    </div>
  );
}
