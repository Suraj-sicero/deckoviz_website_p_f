import React, { useState, useEffect } from "react";
import {
  Tv,
  Radio,
  Wifi,
  WifiOff,
  RefreshCw,
  Sliders,
  Send,
  Play,
  Pause,
  RotateCw,
  Power,
  Volume2,
  Maximize2,
  CheckCircle,
  AlertTriangle,
  Monitor,
  Flame,
  Shield
} from "lucide-react";
import { API_BASE_URL } from "../../lib/constants";


export interface SmartFrameDevice {
  id: string;
  name: string;
  code: string;
  location: string;
  status: "online" | "offline" | "syncing";
  activeArtwork: string;
  resolution: string;
  brightness: number;
  lastPing: string;
}

const DEFAULT_DEVICES: SmartFrameDevice[] = [
  {
    id: "dev_101",
    name: "Living Room Frame 4K",
    code: "TV-8821",
    location: "Main Residence • Living Room",
    status: "online",
    activeArtwork: "Starry Night Over the Rhône",
    resolution: "3840 x 2160 (4K)",
    brightness: 85,
    lastPing: "Just now"
  },
  {
    id: "dev_102",
    name: "Executive Suite Frame",
    code: "TV-4019",
    location: "Grand Hotel • Presidential Suite",
    status: "online",
    activeArtwork: "Prismatic Horizon #4",
    resolution: "3840 x 2160 (4K)",
    brightness: 90,
    lastPing: "12 secs ago"
  },
  {
    id: "dev_103",
    name: "Gallery Hallway Display",
    code: "TV-7712",
    location: "Deckoviz Space Labs • Lobby",
    status: "online",
    activeArtwork: "Neo-Tokyo Cyber Alley",
    resolution: "3840 x 2160 (4K)",
    brightness: 75,
    lastPing: "1 min ago"
  },
  {
    id: "dev_104",
    name: "Master Suite Wall Frame",
    code: "TV-1092",
    location: "Residence • Master Bedroom",
    status: "offline",
    activeArtwork: "Alpine Mist & Golden Hour",
    resolution: "1920 x 1080 (FHD)",
    brightness: 60,
    lastPing: "2 hours ago"
  }
];

export const MasterAdminDevices: React.FC = () => {
  const [devices, setDevices] = useState<SmartFrameDevice[]>(DEFAULT_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<SmartFrameDevice>(DEFAULT_DEVICES[0]);
  const [broadcastCode, setBroadcastCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch real paired connected devices from API
  const loadConnectedDevices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/pairing/devices`).then((r) => r.json()).catch(() => null);
      if (res && res.devices && Array.isArray(res.devices)) {
        const fetched: SmartFrameDevice[] = res.devices.map((d: any, idx: number) => ({
          id: d.id || d.app_instance_id || `dev_${idx}`,
          name: d.device_name || d.name || `Smart Frame ${d.app_instance_id || idx + 1}`,
          code: d.app_instance_id || d.code || `TV-${1000 + idx}`,
          location: d.location || (d.platform ? `Connected ${d.platform.toUpperCase()} Display` : "Connected Smart Display"),
          status: d.status || "online",
          activeArtwork: d.activeArtwork || "Starry Night Over the Rhône",
          resolution: d.resolution || "3840 x 2160 (4K)",
          brightness: d.brightness || 85,
          lastPing: "Active Session"
        }));

        const combinedMap = new Map<string, SmartFrameDevice>();
        [...fetched, ...DEFAULT_DEVICES].forEach((item) => {
          if (!combinedMap.has(item.code)) {
            combinedMap.set(item.code, item);
          }
        });

        const merged = Array.from(combinedMap.values());
        setDevices(merged);
        if (merged.length > 0) setSelectedDevice(merged[0]);
      }
    } catch (e) {
      console.warn("Connected device query notice:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConnectedDevices();
  }, []);

  const handlePairNewDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastCode.trim()) return;

    const newDev: SmartFrameDevice = {
      id: `dev_${Date.now()}`,
      name: `Smart Frame (${broadcastCode.toUpperCase()})`,
      code: broadcastCode.toUpperCase(),
      location: "Newly Paired Smart Display",
      status: "online",
      activeArtwork: "Bauhaus Symmetry",
      resolution: "3840 x 2160 (4K)",
      brightness: 80,
      lastPing: "Just paired"
    };

    setDevices([newDev, ...devices]);
    setSelectedDevice(newDev);
    setBroadcastCode("");
    alert(`Successfully paired Smart Frame ${newDev.code}!`);
  };

  const handleTogglePower = (id: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: d.status === "online" ? "offline" : "online" } : d
      )
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn font-sans pt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 flex items-center gap-1.5 whitespace-nowrap">
              <Radio className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
              Live Frame Stream Active
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#182A4A] tracking-tight">Smart Frame Devices</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Remote control management for connected Deckoviz Smart Frames.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadConnectedDevices}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#2563EB] ${loading ? "animate-spin" : ""}`} />
            Refresh Devices
          </button>
          <span className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Online: {devices.filter((d) => d.status === "online").length}
          </span>
          <span className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
            Total Paired: {devices.length}
          </span>
        </div>
      </div>

      {/* PAIR DEVICE FORM */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#182A4A] text-white flex items-center justify-center font-bold shadow-md shadow-[#182A4A]/20">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Pair New Smart Display</h3>
              <p className="text-xs text-slate-500">Enter the 6-digit TV code displayed on the frame screen.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePairNewDevice} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={broadcastCode}
            onChange={(e) => setBroadcastCode(e.target.value.toUpperCase())}
            placeholder="e.g. TV-8821"
            maxLength={8}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm uppercase tracking-wider focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#2563EB]/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Radio className="w-4 h-4" /> Pair & Stream Live
          </button>
        </form>
      </div>

      {/* DEVICE MANAGEMENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-[#182A4A] text-sm uppercase tracking-wider">Connected Frames ({devices.length})</h3>

          <div className="space-y-3">
            {devices.map((dev) => (
              <div
                key={dev.id}
                onClick={() => setSelectedDevice(dev)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedDevice.id === dev.id
                    ? "bg-blue-50/60 border-[#2563EB] shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{dev.name}</span>
                  {dev.status === "online" ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> ONLINE
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                      OFFLINE
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 font-medium">{dev.location}</div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                  <span>Code: {dev.code}</span>
                  <span>Ping: {dev.lastPing}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Remote Control Screen */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{selectedDevice.name}</h3>
              <p className="text-xs text-slate-500">{selectedDevice.location} • Code: {selectedDevice.code}</p>
            </div>

            <button
              onClick={() => handleTogglePower(selectedDevice.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedDevice.status === "online"
                  ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                  : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
              }`}
            >
              <Power className="w-4 h-4" />
              {selectedDevice.status === "online" ? "Turn Off Frame" : "Turn On Frame"}
            </button>
          </div>

          {/* Virtual Display Preview */}
          <div className="relative aspect-video rounded-2xl bg-slate-900 border-8 border-slate-800 shadow-xl overflow-hidden flex items-center justify-center group">
            <img
              src={`https://picsum.photos/seed/${selectedDevice.code}/1280/720`}
              alt="Active Frame Preview"
              className={`w-full h-full object-cover transition-all ${
                selectedDevice.status === "offline" ? "grayscale opacity-20" : ""
              }`}
            />

            {selectedDevice.status === "offline" && (
              <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white space-y-2">
                <WifiOff className="w-8 h-8 text-slate-500" />
                <span className="text-xs font-bold text-slate-400">Display Standby Mode</span>
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-between text-xs">
              <span className="font-bold">Now Playing: {selectedDevice.activeArtwork}</span>
              <span className="font-mono text-slate-300">{selectedDevice.resolution}</span>
            </div>
          </div>

          {/* Remote Control Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Frame Brightness ({selectedDevice.brightness}%)</label>
              <input
                type="range"
                min={10}
                max={100}
                value={selectedDevice.brightness}
                onChange={(e) =>
                  setSelectedDevice({ ...selectedDevice, brightness: parseInt(e.target.value, 10) })
                }
                className="w-full accent-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Rotation / Orientation</label>
              <select className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900">
                <option>Landscape (16:9 Standard)</option>
                <option>Portrait (9:16 Vertical)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterAdminDevices;
