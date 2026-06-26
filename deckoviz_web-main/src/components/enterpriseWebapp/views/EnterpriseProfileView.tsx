import { Building2, MapPin, Globe, Mail, Phone, Shield, Users, Monitor, Calendar, Edit2 } from "lucide-react";
import { enterpriseProfile } from "../enterpriseData";

export default function EnterpriseProfileView() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      {/* Banner */}
      <div className="relative mb-8">
        <div className="overflow-hidden rounded-2xl h-[240px]">
          <img src={enterpriseProfile.banner} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Card — sits outside the overflow-hidden wrapper */}
        <div className="relative -mt-16 mx-8 flex items-end justify-between rounded-2xl border border-[#e8eaef] bg-white/95 px-8 py-5 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-lg -mt-10">
              <img src={enterpriseProfile.avatar} alt="" className="h-14 w-14 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{enterpriseProfile.name}</h1>
              <p className="text-sm text-gray-400 font-medium">{enterpriseProfile.subtitle} · {enterpriseProfile.location}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20 transition hover:scale-[1.02]">
            <Edit2 size={14} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — Company Info */}
        <div className="lg:col-span-1 space-y-5">
          <div className="rounded-xl border border-[#e8eaef] bg-white p-6">
            <h3 className="mb-4 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Company Details</h3>
            <div className="space-y-4">
              {[
                { icon: Building2, label: "Industry", value: "Luxury Hospitality" },
                { icon: MapPin, label: "Location", value: enterpriseProfile.location },
                { icon: Globe, label: "Website", value: "grandmetropolitan.com" },
                { icon: Mail, label: "Contact", value: "hello@grandmet.com" },
                { icon: Phone, label: "Phone", value: "+44 20 7946 0958" },
                { icon: Shield, label: "Plan", value: "Enterprise Premium" },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#182a4a]/10 text-[#182a4a]">
                    <info.icon size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{info.label}</p>
                    <p className="text-sm font-bold text-gray-700">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#e8eaef] bg-white p-6">
            <h3 className="mb-4 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Team Members</h3>
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", role: "General Manager", avatar: "/images/webapp/figma/artist-1.jpg" },
                { name: "Michael Chen", role: "Art Director", avatar: "/images/webapp/figma/artist-2.jpg" },
                { name: "Emma Williams", role: "Events Coordinator", avatar: "/images/webapp/figma/artist-3.jpg" },
                { name: "David Kim", role: "Tech Manager", avatar: "/images/webapp/figma/artist-4.jpg" },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <img src={member.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-gray-700">{member.name}</p>
                    <p className="text-[10px] text-gray-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Stats & Usage */}
        <div className="lg:col-span-2 space-y-5">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Monitor, label: "Active Units", value: enterpriseProfile.units, color: "#3b82f6" },
              { icon: Monitor, label: "Active Frames", value: enterpriseProfile.activeFrames, color: "#8b5cf6" },
              { icon: Calendar, label: "Total Events", value: "156", color: "#f59e0b" },
              { icon: Users, label: "Frequent Guests", value: "24", color: "#10b981" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[#e8eaef] bg-white p-5">
                <stat.icon size={18} style={{ color: stat.color }} />
                <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-[11px] text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="rounded-xl border border-[#e8eaef] bg-white p-6">
            <h3 className="mb-4 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">About</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              The Grand Metropolitan is a distinguished luxury hotel and residences located in the heart of London. With {enterpriseProfile.units} uniquely designed units, each featuring Deckoviz-powered digital frames, we deliver an unparalleled art and ambiance experience to our discerning guests.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our digital art programme transforms the guest experience through curated collections that rotate throughout the day, creating dynamic atmospheres perfectly matched to each moment — from energizing morning displays to calming evening ambiances.
            </p>
          </div>

          {/* Subscription Info */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)" }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-blue-300/80 font-semibold uppercase tracking-wider">Current Plan</p>
                  <h3 className="text-lg font-bold text-white">Enterprise Premium</h3>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/30">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Content Generations", value: "Unlimited" },
                  { label: "Storage", value: "500 GB" },
                  { label: "Renewal", value: "Aug 15, 2025" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <p className="text-[10px] text-white/40 font-semibold">{item.label}</p>
                    <p className="text-sm font-bold text-white mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
