import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e2e4ea] bg-white/50 px-6 py-16 text-center backdrop-blur-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#182a4a]/10 to-blue-500/10 text-blue-600 shadow-inner">
        <Icon size={28} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
