import { useCallback, useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { CheckCircle2, Loader2, MonitorSmartphone, QrCode, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { claimPairingCode, extractPairingCode } from "../lib/pairingApi";

export default function PairDevicePage() {
  const { token, user } = useAuth();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState(() => searchParams.get("code") || "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const autoSubmittedRef = useRef(false);
  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

  const clearStatusOnEdit = () => {
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
      setMessage("");
    }
  };

  const setCodeAndFocus = (next: string, focusIndex?: number) => {
    const digitsOnly = next.replace(/\D/g, "").slice(0, 6);
    setCode(digitsOnly);
    clearStatusOnEdit();
    const idx = focusIndex ?? Math.min(digitsOnly.length, 5);
    requestAnimationFrame(() => digitRefs.current[idx]?.focus());
  };

  const submitCode = useCallback(
    async (raw: string) => {
      if (!token) {
        setStatus("error");
        setMessage("You must be signed in to pair a device.");
        return;
      }
      const resolved = extractPairingCode(raw);
      if (!resolved) {
        setStatus("error");
        setMessage("Enter a valid 6-digit code.");
        return;
      }

      setCode(resolved);
      setStatus("loading");
      setMessage("Pairing your frame…");

      try {
        const result = await claimPairingCode(token, resolved);
        setStatus("success");
        setMessage(
          `Connected to ${result.device.device_name}. Your frame is linked to this account.`
        );
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Pairing failed");
      }
    },
    [token]
  );

  useEffect(() => {
    const fromUrl = searchParams.get("code");
    if (fromUrl && !autoSubmittedRef.current && token) {
      autoSubmittedRef.current = true;
      setCode(fromUrl);
      void submitCode(fromUrl);
    }
  }, [searchParams, token, submitCode]);

  useEffect(() => {
    return () => {
      const scanner = scannerRef.current;
      if (scanner) {
        scanner
          .stop()
          .catch(() => undefined)
          .finally(() => {
            scanner.clear();
            scannerRef.current = null;
          });
      }
    };
  }, []);

  useEffect(() => {
    if (!searchParams.get("code")) {
      requestAnimationFrame(() => digitRefs.current[0]?.focus());
    }
  }, [searchParams]);

  const stopScanner = async () => {
    const scanner = scannerRef.current;
    if (!scanner) {
      setScanning(false);
      return;
    }
    try {
      await scanner.stop();
      scanner.clear();
    } catch {
      // ignore
    }
    scannerRef.current = null;
    setScanning(false);
  };

  const startScanner = async () => {
    setMessage("");
    setStatus("idle");
    setScanning(true);
    try {
      const scanner = new Html5Qrcode("pair-qr-reader");
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 8, qrbox: { width: 240, height: 240 } },
        (decoded) => {
          const extracted = extractPairingCode(decoded);
          if (extracted) {
            void stopScanner().then(() => submitCode(extracted));
          }
        },
        () => undefined
      );
    } catch (err) {
      setScanning(false);
      setStatus("error");
      setMessage(
        err instanceof Error
          ? `Camera error: ${err.message}`
          : "Could not start camera for QR scan"
      );
    }
  };

  const digits = Array.from({ length: 6 }, (_, i) => code[i] || "");

  const onDigitChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 1) {
      setCodeAndFocus(cleaned, Math.min(cleaned.length, 5));
      return;
    }
    const next = digits.map((d, i) => (i === index ? cleaned : d)).join("");
    setCode(next.replace(/\D/g, "").slice(0, 6));
    clearStatusOnEdit();
    if (cleaned && index < 5) {
      requestAnimationFrame(() => digitRefs.current[index + 1]?.focus());
    }
  };

  const onDigitKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        const next = digits.map((d, i) => (i === index ? "" : d)).join("");
        setCode(next);
        clearStatusOnEdit();
      } else if (index > 0) {
        const next = digits.map((d, i) => (i === index - 1 ? "" : d)).join("");
        setCode(next);
        clearStatusOnEdit();
        requestAnimationFrame(() => digitRefs.current[index - 1]?.focus());
      }
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      digitRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      digitRefs.current[index + 1]?.focus();
    }
  };

  const onDigitPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    setCodeAndFocus(pasted, Math.min(pasted.replace(/\D/g, "").length, 5));
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f3f6fb]">
      <header className="relative z-20 flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img src="/images/deckovizlogo.png" alt="" className="h-8 w-8 object-contain" />
          <span className="truncate text-sm font-semibold text-[#182a4a]">Deckoviz</span>
        </Link>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          {user?.email && <span className="hidden max-w-[180px] truncate sm:inline">{user.email}</span>}
          <Link
            to="/webapp"
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-medium text-[#182a4a] transition hover:bg-slate-100"
          >
            <ArrowLeft size={14} />
            Webapp
          </Link>
        </div>
      </header>

      <div
        className="pointer-events-none absolute inset-0 top-14"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(37,99,235,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 80%, rgba(24,42,74,0.08), transparent 50%), linear-gradient(180deg, #eef3fa 0%, #f7f9fc 45%, #f3f6fb 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-5 py-10 sm:py-14">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/25">
          <MonitorSmartphone size={26} strokeWidth={1.75} />
        </div>

        <h1
          className="mb-2 text-center text-3xl font-bold tracking-tight text-[#182a4a] sm:text-4xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Pair a device
        </h1>
        <p className="mb-8 max-w-sm text-center text-sm leading-relaxed text-slate-500">
          Run the TV simulator to get a code, then type it below to link the frame to your account.
        </p>

        <div className="w-full rounded-2xl border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submitCode(code);
            }}
            className="space-y-6"
          >
            <div>
              <p className="mb-3 block text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pairing code
              </p>

              <div className="mx-auto flex max-w-xs justify-center gap-2 sm:gap-2.5">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      digitRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={d}
                    disabled={status === "loading"}
                    aria-label={`Digit ${i + 1} of 6`}
                    onChange={(e) => onDigitChange(i, e.target.value)}
                    onKeyDown={(e) => onDigitKeyDown(i, e)}
                    onPaste={onDigitPaste}
                    onFocus={(e) => e.target.select()}
                    className={`h-12 w-9 rounded-xl border text-center text-xl font-semibold tabular-nums text-[#182a4a] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/35 sm:h-14 sm:w-11 sm:text-2xl ${
                      d ? "border-[#2563EB]/40 bg-blue-50" : "border-slate-200 bg-white"
                    } ${status === "loading" ? "opacity-60" : ""}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading" || code.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#182a4a]/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:brightness-100"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Pairing…
                </>
              ) : (
                "Link device"
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/90 px-3 text-slate-400">or</span>
            </div>
          </div>

          {!scanning ? (
            <button
              type="button"
              onClick={() => void startScanner()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#182a4a] transition hover:border-[#2563EB]/40 hover:bg-[#f8fafc]"
            >
              <QrCode size={16} />
              Scan QR code
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void stopScanner()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Stop scanner
            </button>
          )}

          <div
            id="pair-qr-reader"
            className={`mt-4 w-full overflow-hidden rounded-xl ${scanning ? "border border-slate-200" : ""}`}
          />

          {message && (
            <div
              className={`mt-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-snug ${
                status === "success"
                  ? "bg-emerald-50 text-emerald-800"
                  : status === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-slate-50 text-slate-600"
              }`}
              role="status"
            >
              {status === "success" && <CheckCircle2 size={18} className="mt-0.5 shrink-0" />}
              <span>{message}</span>
            </div>
          )}

          {status === "success" && (
            <Link
              to="/webapp"
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#182a4a] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Continue to webapp
            </Link>
          )}
        </div>

        <p className="mt-6 max-w-sm text-center text-xs leading-relaxed text-slate-400">
          Tip: in the fastapi_backend folder run{" "}
          <code className="rounded bg-slate-200/70 px-1 py-0.5 text-[11px] text-slate-600">
            python scripts/simulate_tv_pairing.py
          </code>{" "}
          to print a fresh 6-digit code.
        </p>
      </div>
    </div>
  );
}
