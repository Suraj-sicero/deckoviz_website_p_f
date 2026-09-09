import { useState } from "react";

type Role = "teacher" | "student" | null;

export default function SchoolHome() {
  const [role, setRole] = useState<Role>(null);

  return (
    <div className="min-h-screen bg-[#f0f2f8] relative overflow-hidden">
      {/* Decorative dots — matches Deckoviz homepage */}
      <Dots />

      {/* ── Hero ── */}
      <div className="relative z-10 pt-32 pb-12 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-semibold mb-4">
          Deckoviz Space Labs
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          School{" "}
          <span className="italic font-light text-cyan-500">Ground</span>
        </h1>
        <p className="mt-5 text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
          A unified learning and teaching hub — built for classrooms, powered by AI.
        </p>
      </div>

      {/* ── Role Selector ── */}
      {!role && (
        <div className="relative z-10 flex flex-col items-center gap-8 mt-4 pb-32 px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
            Who are you?
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            <RoleCard
              emoji="🎓"
              label="Teacher"
              sub="Manage classes, content & students"
              color="cyan"
              onClick={() => setRole("teacher")}
            />
            <RoleCard
              emoji="📚"
              label="Student"
              sub="Learn, explore & track progress"
              color="violet"
              onClick={() => setRole("student")}
            />
          </div>
        </div>
      )}

      {/* ── Teacher Dashboard ── */}
      {role === "teacher" && (
        <Dashboard
          title="Teachers Home"
          color="cyan"
          cards={teacherCards}
          onBack={() => setRole(null)}
        />
      )}

      {/* ── Student Dashboard ── */}
      {role === "student" && (
        <Dashboard
          title="Students Home"
          color="violet"
          cards={studentCards}
          onBack={() => setRole(null)}
        />
      )}
    </div>
  );
}

// ── Role Card ────────────────────────────────────────────────────
function RoleCard({
  emoji,
  label,
  sub,
  color,
  onClick,
}: {
  emoji: string;
  label: string;
  sub: string;
  color: "cyan" | "violet";
  onClick: () => void;
}) {
  const border =
    color === "cyan"
      ? "border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-100"
      : "border-violet-200 hover:border-violet-400 hover:shadow-violet-100";
  const badge =
    color === "cyan"
      ? "bg-cyan-50 text-cyan-600"
      : "bg-violet-50 text-violet-600";

  return (
    <button
      onClick={onClick}
      className={`group w-64 text-left rounded-3xl border-2 ${border} bg-white shadow-md hover:shadow-xl transition-all duration-300 p-8`}
    >
      <div className={`text-4xl mb-5 w-14 h-14 flex items-center justify-center rounded-2xl ${badge}`}>
        {emoji}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{label}</h3>
      <p className="text-sm text-gray-400 leading-snug">{sub}</p>
      <div className={`mt-6 text-xs font-semibold tracking-wide ${color === "cyan" ? "text-cyan-500" : "text-violet-500"}`}>
        Enter →
      </div>
    </button>
  );
}

// ── Dashboard ────────────────────────────────────────────────────
function Dashboard({
  title,
  color,
  cards,
  onBack,
}: {
  title: string;
  color: "cyan" | "violet";
  cards: CardProps[];
  onBack: () => void;
}) {
  const accent = color === "cyan" ? "text-cyan-500" : "text-violet-500";
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
      <div className="flex items-center justify-between mb-10">
        <h2 className={`text-3xl font-bold text-gray-900`}>
          {title.split(" ")[0]}{" "}
          <span className={`italic font-light ${accent}`}>
            {title.split(" ").slice(1).join(" ")}
          </span>
        </h2>
        <button
          onClick={onBack}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          ← Switch role
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <DashCard key={card.title} {...card} color={color} />
        ))}
      </div>
    </div>
  );
}

// ── Dash Card ────────────────────────────────────────────────────
type CardProps = {
  icon: string;
  title: string;
  desc: string;
  link?: string;
};


 function DashCard({ icon, title, desc, color, link }: CardProps & { color: "cyan" | "violet" }) {
  const iconBg = color === "cyan" ? "bg-cyan-50 text-cyan-500" : "bg-violet-50 text-violet-500";
  const hover = color === "cyan"
    ? "hover:border-cyan-300 hover:shadow-cyan-50"
    : "hover:border-violet-300 hover:shadow-violet-50";

  return (
    <div
      onClick={() => link && (window.location.href = link)}
      className={`bg-white rounded-2xl border border-gray-100 ${hover} hover:shadow-lg p-6 cursor-pointer transition-all duration-300`}
    >
      <div className={`text-2xl w-11 h-11 flex items-center justify-center rounded-xl mb-4 ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-400 leading-snug">{desc}</p>
    </div>
  );
}

// ── Decorative Dots ──────────────────────────────────────────────
function Dots() {
  const dots = [
    { top: "10%", left: "5%", color: "#06b6d4", size: 7 },
    { top: "15%", left: "12%", color: "#8b5cf6", size: 5 },
    { top: "8%", left: "22%", color: "#06b6d4", size: 4 },
    { top: "20%", left: "35%", color: "#a78bfa", size: 6 },
    { top: "5%", left: "70%", color: "#22d3ee", size: 5 },
    { top: "12%", left: "80%", color: "#7c3aed", size: 4 },
    { top: "18%", left: "90%", color: "#06b6d4", size: 7 },
    { top: "30%", left: "3%", color: "#a78bfa", size: 5 },
    { top: "35%", left: "95%", color: "#06b6d4", size: 6 },
    { top: "50%", left: "8%", color: "#22d3ee", size: 4 },
    { top: "55%", left: "92%", color: "#8b5cf6", size: 5 },
    { top: "70%", left: "15%", color: "#06b6d4", size: 6 },
    { top: "75%", left: "85%", color: "#a78bfa", size: 4 },
    { top: "85%", left: "25%", color: "#22d3ee", size: 5 },
    { top: "88%", left: "60%", color: "#7c3aed", size: 7 },
    { top: "92%", left: "75%", color: "#06b6d4", size: 4 },
    { top: "40%", left: "50%", color: "#a78bfa", size: 3 },
    { top: "60%", left: "45%", color: "#22d3ee", size: 4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-60"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            backgroundColor: d.color,
          }}
        />
      ))}
    </div>
  );
}

// ── Card Data ────────────────────────────────────────────────────
const teacherCards: CardProps[] = [
{ icon: "🗂️", title: "My Classes", desc: "View and manage all your active classes.", link: "/school/teachers" },
  { icon: "✏️", title: "Content", desc: "Create and organise lesson content." },
 { icon: "🤖", title: "Vizzy (VGC)", desc: "Generate content or media with AI sub-agents.", link: "/school/vgc?role=teacher" },
  { icon: "📊", title: "Dashboard", desc: "Overview of class activity and performance." },
  { icon: "📝", title: "Tests", desc: "Create, assign, and review tests." },
  { icon: "📈", title: "Progress", desc: "Track student progress and learning maps." },
];

const studentCards: CardProps[] = [
  { icon: "🏠", title: "My Classes", desc: "See your enrolled classes and schedules.", link: "/school/students"  },
  { icon: "📖", title: "Content", desc: "Access all learning material for your classes." },
  { icon: "🤖", title: "Vizzy (VGC)", desc: "Chat with AI to explore and create.", link: "/school/vgc?role=student" },
  { icon: "📊", title: "Dashboard", desc: "Your personal learning overview." },
  { icon: "📝", title: "Tests", desc: "Take assigned tests and view results." },
  { icon: "🗺️", title: "Learning Map", desc: "Visualise your progress through topics." },
];