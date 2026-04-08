import React from "react";
import { Link } from "react-router-dom";

interface ToolLayoutProps {
  icon: string;
  title: string;
  subtitle: string;
  gradient: string; // tailwind gradient classes
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  icon,
  title,
  subtitle,
  gradient,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafaff] via-white to-[#f5f0ff]">
      {/* Page header */}
      <div className={`relative pt-24 pb-16 px-6 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Decoration */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_left,_white_0%,_transparent_60%)]" />
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-[#fafaff] to-transparent" />

        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 text-sm mb-8">
            <Link
              to="/creative-studio"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Creative Studio
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{title}</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{title}</h1>
              <p className="text-white/75 text-base md:text-lg mt-1">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
};

export default ToolLayout;
