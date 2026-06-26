import { useState } from "react";
import { Bell, Monitor, Palette, Globe, Shield, Sliders, Moon, Sun, Volume2, Eye, ChevronRight } from "lucide-react";

export default function SettingsPreferencesView() {
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: "Enterprise Settings",
      icon: Monitor,
      items: [
        { label: "Organization Name", value: "The Grand Metropolitan", type: "text" },
        { label: "Default Language", value: "English (UK)", type: "select" },
        { label: "Time Zone", value: "GMT +0 (London)", type: "select" },
        { label: "Auto-rotate Collections", value: true, type: "toggle" },
        { label: "Daily Schedule Active", value: true, type: "toggle" },
        { label: "Multi-unit Sync", value: true, type: "toggle" },
      ]
    },
    {
      title: "Vizzy Preferences",
      icon: Palette,
      items: [
        { label: "Default Art Style", value: "Impressionist", type: "select" },
        { label: "Color Temperature", value: "Warm", type: "select" },
        { label: "Content Moderation", value: "Strict", type: "select" },
        { label: "Auto-generate Suggestions", value: true, type: "toggle" },
        { label: "Include Guest Preferences", value: true, type: "toggle" },
        { label: "Music Auto-play", value: false, type: "toggle" },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Event Reminders", value: true, type: "toggle" },
        { label: "New Content Alerts", value: true, type: "toggle" },
        { label: "System Updates", value: false, type: "toggle" },
        { label: "Weekly Usage Report", value: true, type: "toggle" },
      ]
    },
    {
      title: "Display & Accessibility",
      icon: Eye,
      items: [
        { label: "Dark Mode", value: darkMode, type: "toggle", onToggle: () => setDarkMode(!darkMode) },
        { label: "Animation Speed", value: "Normal", type: "select" },
        { label: "Font Size", value: "Medium", type: "select" },
      ]
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Settings & Preferences</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your enterprise and Vizzy preferences</p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="rounded-xl border border-[#e8eaef] bg-white overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[#f0f0f4] px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#182a4a]/10 text-[#182a4a]">
                <section.icon size={16} />
              </div>
              <h2 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">{section.title}</h2>
            </div>
            <div className="divide-y divide-[#f5f5f8]">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-4 transition hover:bg-blue-50/20">
                  <p className="text-sm font-bold text-gray-700">{item.label}</p>
                  {item.type === "toggle" ? (
                    <button
                      onClick={() => {}}
                      className={`relative h-6 w-11 rounded-full transition-all duration-300 ${item.value ? "bg-blue-500" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${item.value ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  ) : item.type === "select" ? (
                    <button className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100">
                      {item.value as string}
                      <ChevronRight size={12} />
                    </button>
                  ) : (
                    <p className="text-sm text-gray-400 font-medium">{item.value as string}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="rounded-xl bg-gradient-to-r from-[#182a4a] to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20 transition hover:scale-[1.02]">
          Save Changes
        </button>
      </div>
    </div>
  );
}
