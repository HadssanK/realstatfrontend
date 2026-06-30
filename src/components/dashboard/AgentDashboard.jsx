"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ListingsTable from "@/components/dashboard/ListingsTable";
import RecentInquiries from "@/components/dashboard/RecentInquiries";

export default function AgentDashboard() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      {/* ══ Mobile nav backdrop ═══════════════════════════ */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* ══ Sidebar ══════════════════════════════════════ */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300
        ${mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <DashboardSidebar />
      </div>

      {/* ══ Main content ═════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top bar ─────────────────────────────────── */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] transition-colors"
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-[#0F172A] leading-tight">
                {greeting}, Ahmed! 👋
              </h1>
              <p className="text-xs text-[#94A3B8] hidden sm:block">
                Here&apos;s what&apos;s happening with your listings today.
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="hidden sm:flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#94A3B8] hover:border-[#F59E0B] transition-colors">
              🔍 <span className="text-xs">Search...</span>
            </button>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] transition-colors relative"
                aria-label="Notifications"
              >
                🔔
                {/* Unread dot */}
                <span className="absolute top-[6px] right-[6px] w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
              </button>

              {/* Notif dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-[#F1F5F9]">
                    <p className="text-sm font-bold text-[#0F172A]">Notifications</p>
                  </div>
                  {[
                    { icon: "💬", text: "New inquiry on DHA House",     time: "2 min ago",  dot: true  },
                    { icon: "👁️", text: "Your listing got 50 new views", time: "1 hr ago",   dot: true  },
                    { icon: "✅", text: "Profile verified successfully",  time: "Yesterday",  dot: false },
                  ].map((n, i) => (
                    <div key={i} className={`flex items-start gap-3 px-4 py-3 hover:bg-[#F8FAFC] cursor-pointer ${n.dot ? "bg-[#FFFBEB]/40" : ""}`}>
                      <span className="text-lg mt-[1px]">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1E293B] leading-snug">{n.text}</p>
                        <p className="text-[11px] text-[#94A3B8] mt-[2px]">{n.time}</p>
                      </div>
                      {n.dot && <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0 mt-2" />}
                    </div>
                  ))}
                  <div className="px-4 py-3 border-t border-[#F1F5F9]">
                    <button className="text-xs font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors">
                      View all notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#0F6E56] flex items-center justify-center text-xs font-extrabold text-white select-none cursor-pointer">
              AK
            </div>
          </div>
        </header>

        {/* ── Page body ───────────────────────────────── */}
        <main className="flex-1 px-6 py-6 flex flex-col gap-6">

          {/* Stats */}
          <DashboardStats />

          {/* Quick actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "➕", label: "Add Property",  color: "bg-[#F59E0B] text-[#0F172A]" },
              { icon: "💬", label: "View Inquiries", color: "bg-[#0F172A] text-white" },
              { icon: "📊", label: "Analytics",      color: "bg-white text-[#0F172A] border border-[#E2E8F0]" },
              { icon: "⚙️", label: "Settings",       color: "bg-white text-[#0F172A] border border-[#E2E8F0]" },
            ].map((a) => (
              <button
                key={a.label}
                className={`${a.color} flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity`}
              >
                <span>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>

          {/* Listings table */}
          <ListingsTable />

          {/* Recent inquiries */}
          <RecentInquiries />
        </main>
      </div>
    </div>
  );
}
