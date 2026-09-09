import { useState } from "react";

// ── Types ────────────────────────────────────────────────────────
type Tab = "dashboard" | "classes" | "content" | "tests" | "progress" | "map";

// ── Color map ────────────────────────────────────────────────────
const colorMap = {
  cyan:    { bg: "bg-cyan-50",    text: "text-cyan-600",    border: "border-cyan-200",    btn: "bg-cyan-500 hover:bg-cyan-600" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-600",  border: "border-violet-200",  btn: "bg-violet-500 hover:bg-violet-600" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200",   btn: "bg-amber-500 hover:bg-amber-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", btn: "bg-emerald-500 hover:bg-emerald-600" },
  rose:    { bg: "bg-rose-50",    text: "text-rose-600",    border: "border-rose-200",    btn: "bg-rose-500 hover:bg-rose-600" },
  blue:    { bg: "bg-blue-50",    text: "text-blue-600",    border: "border-blue-200",    btn: "bg-blue-500 hover:bg-blue-600" },
};

type Color = keyof typeof colorMap;

// ── Tab config ───────────────────────────────────────────────────
const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: "dashboard", label: "Dashboard",  emoji: "📊" },
  { id: "classes",   label: "Classes",    emoji: "🗂️" },
  { id: "content",   label: "Content",    emoji: "✏️" },
  { id: "tests",     label: "Tests",      emoji: "📝" },
  { id: "progress",  label: "Progress",   emoji: "📈" },
  { id: "map",       label: "Map",        emoji: "🗺️" },
];

export default function TeachersHome() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-[#f0f2f8] relative overflow-hidden">
      <Dots />

      {/* ── Header ── */}
      <div className="relative z-10 pt-28 pb-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-semibold mb-2">
          School Ground
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Teachers{" "}
          <span className="italic font-light text-cyan-500">Home</span>
        </h1>
        <p className="mt-3 text-gray-400 text-base max-w-md mx-auto">
          Your command centre — classes, content, progress and more.
        </p>
        <a
          href="/school"
          className="inline-flex items-center gap-1 mt-4 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md text-sm font-medium text-gray-500 transition-all"
        >
          {'←'} School Ground
        </a>
      </div>

      {/* ── Tab Bar ── */}
      <div className="relative z-10 flex justify-center px-6 mb-8">
        <div className="flex gap-1 bg-white border border-gray-100 shadow-sm rounded-2xl p-1.5 flex-wrap justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "classes"   && <ClassesTab />}
        {activeTab === "content"   && <ContentTab />}
        {activeTab === "tests"     && <TestsTab />}
        {activeTab === "progress"  && <ProgressTab />}
        {activeTab === "map"       && <MapTab />}
      </div>
    </div>
  );
}

// ── Dashboard Tab ────────────────────────────────────────────────
function DashboardTab() {
  const stats = [
    { label: "Active Classes",    value: "4",   emoji: "🗂️", color: "cyan"    as Color },
    { label: "Students",          value: "112", emoji: "👩‍🎓", color: "violet"  as Color },
    { label: "Tests This Week",   value: "3",   emoji: "📝", color: "amber"   as Color },
    { label: "Pending Reviews",   value: "8",   emoji: "📋", color: "rose"    as Color },
  ];

  const activity = [
    { text: "Priya submitted her essay on Newton's Laws",         time: "10 min ago",  color: "cyan"    as Color },
    { text: "Grade 9B average score improved by 12% this week",   time: "1 hr ago",   color: "emerald" as Color },
    { text: "New test assigned: World War II — Grade 10A",         time: "2 hrs ago",  color: "amber"   as Color },
    { text: "Ravi flagged as needing support in Algebra",          time: "Yesterday",  color: "rose"    as Color },
    { text: "Lesson plan for Photosynthesis saved",                time: "Yesterday",  color: "blue"    as Color },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const c = colorMap[s.color];
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`text-2xl w-11 h-11 flex items-center justify-center rounded-xl mb-3 ${c.bg} ${c.text}`}>
                {s.emoji}
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "New Lesson Plan",  color: "cyan"    as Color },
            { label: "Create a Test",    color: "amber"   as Color },
            { label: "Open Vizzy VGC",   color: "violet"  as Color, href: "/school/vgc?role=teacher" },
            { label: "View Progress",    color: "emerald" as Color },
          ].map((a) => (
            <a
              key={a.label}
              href={a.href ?? "#"}
              className={`px-4 py-2 rounded-xl text-white text-sm font-medium transition-all ${colorMap[a.color].btn}`}
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <div className="flex flex-col gap-3">
          {activity.map((a, i) => {
            const c = colorMap[a.color];
            return (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${c.bg} border ${c.border}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Classes Tab ──────────────────────────────────────────────────
function ClassesTab() {
  const classes = [
    { name: "Grade 8A — Science",   students: 28, nextClass: "Tomorrow, 9:00 AM",  color: "cyan"    as Color },
    { name: "Grade 9B — History",   students: 30, nextClass: "Today, 2:00 PM",     color: "violet"  as Color },
    { name: "Grade 10A — Maths",    students: 27, nextClass: "Wednesday, 10:00 AM", color: "amber"   as Color },
    { name: "Grade 7C — English",   students: 29, nextClass: "Thursday, 11:00 AM", color: "emerald" as Color },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {classes.map((cls) => {
        const c = colorMap[cls.color];
        return (
          <div key={cls.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${c.bg} ${c.text}`}>
              🗂️ Active
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">{cls.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{cls.students} students</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Next: {cls.nextClass}</p>
              <button className={`px-3 py-1.5 rounded-lg text-white text-xs font-medium ${c.btn}`}>
                Open
              </button>
            </div>
          </div>
        );
      })}
      {/* Add Class */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-cyan-300 transition-all">
        <p className="text-3xl mb-2">➕</p>
        <p className="text-sm font-medium text-gray-500">Add New Class</p>
      </div>
    </div>
  );
}

// ── Content Tab ──────────────────────────────────────────────────
function ContentTab() {
  const items = [
    { title: "Photosynthesis — Full Lesson",   type: "Lesson Plan",  subject: "Science",  color: "cyan"    as Color },
    { title: "Newton's Laws — Summary Sheet",  type: "Notes",        subject: "Physics",  color: "blue"    as Color },
    { title: "World War II — Timeline",        type: "Visual Aid",   subject: "History",  color: "amber"   as Color },
    { title: "Algebra Basics — Student Guide", type: "Student Notes",subject: "Maths",    color: "emerald" as Color },
    { title: "Essay Writing Framework",        type: "Template",     subject: "English",  color: "violet"  as Color },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium transition-all">
          ✏️ Create with Vizzy
        </button>
        <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-all">
          📁 Upload Material
        </button>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {items.map((item, i) => {
          const c = colorMap[item.color];
          return (
            <div
              key={i}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-all cursor-pointer ${i !== 0 ? "border-t border-gray-50" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${c.bg} ${c.text}`}>
                📄
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.type} · {item.subject}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
                {item.subject}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Tests Tab ────────────────────────────────────────────────────
function TestsTab() {
  const tests = [
    { title: "World War II — Chapter 4",  class: "Grade 9B",  due: "Today",          status: "Active",   color: "amber"   as Color },
    { title: "Newton's Laws Quiz",        class: "Grade 8A",  due: "Friday",         status: "Upcoming", color: "cyan"    as Color },
    { title: "Algebra Mid-Term",          class: "Grade 10A", due: "Next Monday",    status: "Draft",    color: "violet"  as Color },
    { title: "Essay: A Character Study",  class: "Grade 7C",  due: "Completed",      status: "Done",     color: "emerald" as Color },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-all">
          📝 Create New Test
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {tests.map((test, i) => {
          const c = colorMap[test.color];
          return (
            <div
              key={i}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-all cursor-pointer ${i !== 0 ? "border-t border-gray-50" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{test.title}</p>
                <p className="text-xs text-gray-400">{test.class} · Due: {test.due}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${c.bg} ${c.text}`}>
                {test.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Progress Tab ─────────────────────────────────────────────────
function ProgressTab() {
  const students = [
    { name: "Priya Sharma",   class: "Grade 8A",  score: 91, trend: "↑", color: "emerald" as Color },
    { name: "Ravi Kumar",     class: "Grade 10A", score: 58, trend: "↓", color: "rose"    as Color },
    { name: "Aisha Patel",    class: "Grade 9B",  score: 74, trend: "→", color: "amber"   as Color },
    { name: "Dev Mehta",      class: "Grade 7C",  score: 83, trend: "↑", color: "cyan"    as Color },
    { name: "Sneha Joshi",    class: "Grade 8A",  score: 66, trend: "↑", color: "blue"    as Color },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Student Progress Overview</h2>
        <div className="flex flex-col gap-4">
          {students.map((s) => {
            const c = colorMap[s.color];
            return (
              <div key={s.name} className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${c.bg} ${c.text}`}>
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800">{s.name}</p>
                    <span className={`text-sm font-bold ${c.text}`}>{s.score}% {s.trend}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${c.btn.split(" ")[0]}`}
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{s.class}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Map Tab ──────────────────────────────────────────────────────
function MapTab() {
  const topics = [
    { subject: "Science",  topic: "Photosynthesis",    pct: 88, color: "cyan"    as Color },
    { subject: "Physics",  topic: "Newton's Laws",     pct: 72, color: "blue"    as Color },
    { subject: "History",  topic: "World War II",      pct: 65, color: "amber"   as Color },
    { subject: "Maths",    topic: "Algebra Basics",    pct: 54, color: "rose"    as Color },
    { subject: "English",  topic: "Essay Writing",     pct: 79, color: "violet"  as Color },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">Class Learning Map</h2>
        <p className="text-xs text-gray-400 mb-6">Average class mastery by topic</p>
        <div className="flex flex-col gap-5">
          {topics.map((t) => {
            const c = colorMap[t.color];
            return (
              <div key={t.topic}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="text-sm font-medium text-gray-800">{t.topic}</span>
                    <span className="text-xs text-gray-400 ml-2">{t.subject}</span>
                  </div>
                  <span className={`text-sm font-bold ${c.text}`}>{t.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${c.btn.split(" ")[0]}`}
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Needs Attention */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          🚨 Needs Attention
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { text: "Algebra Basics — 6 students below 50%",   color: "rose"  as Color },
            { text: "World War II — 4 students not submitted",  color: "amber" as Color },
          ].map((item, i) => {
            const c = colorMap[item.color];
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${c.bg}`}>
                <span className={`text-xs font-semibold ${c.text}`}>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Decorative Dots ──────────────────────────────────────────────
function Dots() {
  const dots = [
    { top: "8%",  left: "4%",  color: "#06b6d4", size: 7 },
    { top: "14%", left: "11%", color: "#8b5cf6", size: 5 },
    { top: "6%",  left: "20%", color: "#06b6d4", size: 4 },
    { top: "18%", left: "33%", color: "#a78bfa", size: 6 },
    { top: "4%",  left: "68%", color: "#22d3ee", size: 5 },
    { top: "11%", left: "79%", color: "#7c3aed", size: 4 },
    { top: "17%", left: "91%", color: "#06b6d4", size: 7 },
    { top: "40%", left: "2%",  color: "#a78bfa", size: 5 },
    { top: "60%", left: "96%", color: "#06b6d4", size: 6 },
    { top: "80%", left: "7%",  color: "#22d3ee", size: 4 },
    { top: "88%", left: "88%", color: "#8b5cf6", size: 5 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {dots.map((d, i) => (
        <div key={i} className="absolute rounded-full opacity-50"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size, backgroundColor: d.color }} />
      ))}
    </div>
  );
}