"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { icon: "grid",     label: "Overview",        href: "/dashboard"             },
  { icon: "list",     label: "My Listings",      href: "/dashboard/listings"    },
  { icon: "plus",     label: "Add Property",     href: "/dashboard/add"},
  { icon: "chat",     label: "Inquiries",        href: "/dashboard/inquiries", badge: 5 },
  { icon: "user",     label: "Profile Settings", href: "/dashboard/profile"    },
];

const PAGE_TITLES = {
  "/dashboard":              "Overview",
  "/dashboard/listings":     "My Listings",
  "/dashboard/add": "Add Property",
  "/dashboard/inquiries":    "Inquiries",
  "/dashboard/profile":      "Profile Settings",
};

function getInitials(name) {
  return (name || "")
    .trim()
    .split(" ")
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join("") || "AK";
}

function NavIcon({ type }) {
  if (type === "grid")  return <span className="text-base">&#9783;</span>;
  if (type === "list")  return <span className="text-base">&#9776;</span>;
  if (type === "plus")  return <span className="text-base">&#43;</span>;
  if (type === "chat")  return <span className="text-base">&#9993;</span>;
  if (type === "user")  return <span className="text-base">&#9786;</span>;
  return null;
}

function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuth();
  const initials = getInitials(user?.name);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const content = (
    <aside className="w-[260px] h-full bg-[#0F172A] flex flex-col overflow-y-auto">

      {/* Logo */}
      <div className="px-6 pt-6 pb-5">
        <Link href="/" className="inline-block no-underline">
          <span className="text-white text-xl font-extrabold tracking-tight">
            Prop<span className="text-[#F59E0B]">Find</span>
          </span>
        </Link>
        <div className="mt-5 h-px bg-white/10" />
      </div>

      {/* Agent profile */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#0F172A] text-base font-extrabold shrink-0 select-none">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-bold truncate leading-tight">
              {user?.name || "Ahmed Khan"}
            </p>
            <span className="inline-block mt-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-[1px] rounded-full">
              Agent
            </span>
            <p className="text-[#64748B] text-[11px] mt-[2px] truncate">
              {user?.agency || "DHA Properties"}
            </p>
          </div>
        </div>
        <div className="mt-4 h-px bg-white/10" />
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 flex flex-col gap-[2px]">
        {NAV.map(item => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-[10px] rounded-xl text-sm font-medium no-underline transition-all duration-150
                ${active
                  ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                  : "text-[#94A3B8] hover:bg-white/[0.06] hover:text-white"}`}
            >
              <NavIcon type={item.icon} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="mx-3 my-2 h-px bg-white/10" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-[10px] rounded-xl text-sm font-medium text-[#64748B] hover:bg-white/[0.06] hover:text-red-400 transition-all duration-150"
        >
          <span className="text-base w-5 text-center">&#10006;</span>
          Logout
        </button>
      </nav>

      {/* Help card */}
      <div className="px-4 py-5">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-4">
          <p className="text-white text-xs font-semibold mb-1">Need Help?</p>
          <p className="text-[#64748B] text-[11px] mb-3 leading-relaxed">
            Having trouble? Our support team is ready.
          </p>
          <a href="mailto:support@propfind.pk"
            className="text-[#F59E0B] text-[11px] font-bold hover:text-[#D97706] transition-colors no-underline">
            Contact Support
          </a>
        </div>
        <p className="text-[#1E293B] text-[10px] text-center mt-3">PropFind v1.0.0</p>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: fixed */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen z-40 w-[260px]">
        {content}
      </div>

      {/* Mobile: overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute left-0 top-0 h-full w-[260px] shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

function Header({ onMenuOpen }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuth();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);
  const initials = getInitials(user?.name);
  const pageTitle = PAGE_TITLES[pathname] || "Dashboard";

  const crumbs = [
    { label: "Dashboard", href: "/dashboard" },
    ...(pathname !== "/dashboard" ? [{ label: pageTitle, href: pathname }] : []),
  ];

  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    if (dropOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropOpen]);

  useEffect(() => { setDropOpen(false); }, [pathname]);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[260px] h-16 z-30
      bg-white border-b border-[#E2E8F0] flex items-center px-5 gap-4">

      {/* Hamburger */}
      <button onClick={onMenuOpen}
        className="lg:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px] rounded-lg hover:bg-[#F1F5F9] transition-colors"
        aria-label="Open menu">
        <span className="w-5 h-[2px] bg-[#475569] rounded" />
        <span className="w-5 h-[2px] bg-[#475569] rounded" />
        <span className="w-5 h-[2px] bg-[#475569] rounded" />
      </button>

      {/* Title + breadcrumb */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-extrabold text-[#0F172A] leading-tight truncate">{pageTitle}</h1>
        <nav className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1">
              {i > 0 && <span>/</span>}
              {i < crumbs.length - 1 ? (
                <Link href={c.href} className="hover:text-[#F59E0B] transition-colors no-underline">{c.label}</Link>
              ) : (
                <span className="text-[#475569] font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#F59E0B] transition-colors text-sm">
          &#128276;
          <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] rounded-full bg-red-500 border-[1.5px] border-white" />
        </button>

        <div className="w-px h-6 bg-[#E2E8F0]" />

        <div className="relative" ref={dropRef}>
          <button onClick={() => setDropOpen(o => !o)}
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-[#F8FAFC] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#0F172A] text-xs font-extrabold select-none">
              {initials}
            </div>
            <span className="hidden sm:block text-sm font-semibold text-[#1E293B] max-w-[120px] truncate">
              {user?.name || "Ahmed Khan"}
            </span>
            <span className={`text-[#94A3B8] text-xs transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}>v</span>
          </button>

          {dropOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-[200px] bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden z-50">
              <Link href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-[10px] text-sm text-[#1E293B] no-underline hover:bg-[#FFFBEB] hover:text-[#F59E0B] transition-colors">
                Profile Settings
              </Link>
              <hr className="border-[#F1F5F9]" />
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-[10px] text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default function AgentDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuOpen={() => setSidebarOpen(true)} />
      <main className="lg:ml-[260px] pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
