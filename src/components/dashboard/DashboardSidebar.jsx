"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { icon: "📊", label: "Overview",         href: "/dashboard"           },
  { icon: "🏠", label: "My Listings",      href: "/dashboard/listings"  },
  { icon: "➕", label: "Add Property",     href: "/dashboard/add"       },
  { icon: "💬", label: "Inquiries",        href: "/dashboard/inquiries" },
  { icon: "⚙️", label: "Profile Settings", href: "/dashboard/profile"   },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] shrink-0 min-h-screen bg-[#0F172A] flex flex-col sticky top-0 z-40">

      {/* ── Logo ────────────────────────────────── */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <Link href="/">
          <span className="text-[#F59E0B] text-xl font-extrabold tracking-tight">
            Prop<span className="text-white">Find</span>
          </span>
        </Link>
      </div>

      {/* ── Agent Profile ───────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#0F6E56] flex items-center justify-center text-sm font-extrabold text-white shrink-0 select-none">
          AK
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-bold truncate">Ahmed Khan</p>
          <span className="inline-block bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-[10px] font-bold px-2 py-[1px] rounded-full mt-[2px]">
            Agent
          </span>
        </div>
      </div>

      {/* ── Nav Links ───────────────────────────── */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-[10px] rounded-xl text-sm font-medium transition-all duration-150
                ${active
                  ? "bg-[#F59E0B] text-[#0F172A] font-bold"
                  : "text-[#94A3B8] hover:bg-white/[0.05] hover:text-white"
                }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
              {item.label === "Inquiries" && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  5
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ──────────────────────────────── */}
      <div className="px-3 pb-6">
        <button className="w-full flex items-center gap-3 px-3 py-[10px] rounded-xl text-sm font-medium text-[#64748B] hover:bg-white/[0.05] hover:text-red-400 transition-all duration-150">
          <span className="text-base w-5 text-center">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
