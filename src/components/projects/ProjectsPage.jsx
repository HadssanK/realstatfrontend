"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import RegisterInterestModal from "@/components/projects/RegisterInterestModal";
import { PROJECTS, DEVELOPERS, FILTER_TABS } from "@/data/projects";

const PROJECT_TYPES = ["All Types", "Apartments", "Villas", "Plots", "Commercial"];
const STATUSES      = ["All Status", "Under Construction", "Ready to Move", "Launching Soon"];
const STATUS_MAP    = {
  "Under Construction": "under-construction",
  "Ready to Move":      "ready",
  "Launching Soon":     "launching-soon",
};

export default function ProjectsPage() {
  const [activeTab,    setActiveTab]    = useState("all");
  const [search,       setSearch]       = useState("");
  const [typeFilter,   setTypeFilter]   = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalProject, setModalProject] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PROJECTS.filter(p => {
      const matchTab    = activeTab === "all" || p.category === activeTab || p.status === activeTab;
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.developer.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      const matchType   = typeFilter   === "All Types"  || p.type   === typeFilter;
      const matchStatus = statusFilter === "All Status" || p.status === STATUS_MAP[statusFilter];
      return matchTab && matchSearch && matchType && matchStatus;
    });
  }, [activeTab, search, typeFilter, statusFilter]);

  const dropCls = "border border-[#E2E8F0] rounded-xl px-3 py-[9px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] bg-white cursor-pointer appearance-none pr-8";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 pt-16 pb-14 text-center"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 55%, #0F6E56 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#F59E0B] opacity-[0.06] blur-3xl" />

        <div className="relative z-10 max-w-[700px] mx-auto">
          <span className="inline-block bg-[rgba(245,158,11,0.15)] border border-[rgba(245,158,11,0.3)] text-[#F59E0B] text-xs font-semibold px-4 py-1 rounded-full mb-5 uppercase tracking-wider">
            🏗️ New Developments
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white mb-3 leading-tight">
            Explore New <span className="text-[#F59E0B]">Projects</span>
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base mb-8 leading-relaxed">
            Discover the latest residential and commercial developments across Pakistan
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-[6px] flex flex-wrap gap-[6px] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="relative flex-1 min-w-[180px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-sm">🔍</span>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by project, developer, city..."
                className="w-full pl-9 pr-3 py-[10px] text-sm text-[#1E293B] outline-none bg-transparent placeholder:text-[#CBD5E1]" />
            </div>
            <div className="w-px bg-[#E2E8F0] my-1 hidden sm:block" />
            <div className="relative">
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                className="border-none outline-none text-sm text-[#1E293B] bg-transparent cursor-pointer py-[10px] pl-3 pr-7 appearance-none">
                {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-xs">▾</span>
            </div>
            <div className="w-px bg-[#E2E8F0] my-1 hidden sm:block" />
            <div className="relative">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="border-none outline-none text-sm text-[#1E293B] bg-transparent cursor-pointer py-[10px] pl-3 pr-7 appearance-none">
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-xs">▾</span>
            </div>
            <button className="bg-[#F59E0B] text-[#0F172A] font-bold text-sm px-6 py-[10px] rounded-xl hover:bg-[#D97706] transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ══ FILTER TABS ═══════════════════════════════════════ */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-[68px] z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {FILTER_TABS.map(tab => {
              const active = activeTab === tab.key;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition-all duration-150 whitespace-nowrap
                    ${active ? "text-[#F59E0B]" : "text-[#64748B] hover:text-[#0F172A]"}`}>
                  {tab.label}
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#F59E0B]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ PROJECTS GRID ═════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#64748B]">
            <span className="font-bold text-[#0F172A]">{filtered.length}</span> project{filtered.length !== 1 ? "s" : ""} found
          </p>
          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative hidden sm:block">
              <select className={`${dropCls} text-xs`}>
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Featured First</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-xs">▾</span>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} onRegisterInterest={setModalProject} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-24 text-center bg-white rounded-2xl border border-[#E2E8F0]">
            <span className="text-5xl mb-4">🏗️</span>
            <p className="font-bold text-[#0F172A] text-base mb-1">No projects found</p>
            <p className="text-sm text-[#64748B]">Try adjusting your filters or search term</p>
            <button onClick={() => { setActiveTab("all"); setSearch(""); setTypeFilter("All Types"); setStatusFilter("All Status"); }}
              className="mt-4 text-sm font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors">
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* ══ TOP DEVELOPERS ════════════════════════════════════ */}
      <section className="bg-white border-y border-[#E2E8F0] py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-1">Trusted Partners</p>
              <h2 className="text-xl font-extrabold text-[#0F172A]">Top Developers</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors">View all →</a>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {DEVELOPERS.map(dev => (
              <div key={dev.id}
                className="shrink-0 w-[200px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#F59E0B] hover:shadow-[0_4px_20px_rgba(245,158,11,0.12)] transition-all duration-200 cursor-pointer">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${dev.grad} flex items-center justify-center text-lg font-extrabold text-white mb-3 select-none`}>
                  {dev.initial}
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-sm font-bold text-[#0F172A] leading-tight">{dev.name}</p>
                  {dev.verified && <span className="text-[#0F6E56] text-xs font-bold">✓</span>}
                </div>
                <p className="text-xs text-[#94A3B8] mb-3">{dev.projects} Projects</p>
                <a href="#" className="text-[11px] font-bold text-[#F59E0B] hover:text-[#D97706] transition-colors">
                  View Projects →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY INVEST ════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-2">Smart Investing</p>
          <h2 className="text-2xl font-extrabold text-[#0F172A]">Why Invest in New Projects?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: "🛡️", title: "Verified Developers", desc: "Every developer on PropFind is thoroughly vetted. Only verified and licensed developers can list projects — giving you complete peace of mind." },
            { icon: "📈", title: "High ROI Potential",  desc: "Pre-launch pricing offers the best entry points. Many buyers see 30-60% appreciation before handover in Pakistan's top developments." },
            { icon: "🔑", title: "Easy Payment Plans",  desc: "3 to 10 year installment plans available on most projects. Book your unit with as little as 10% down payment." },
          ].map(item => (
            <div key={item.title} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#F59E0B]/40 hover:shadow-[0_4px_20px_rgba(245,158,11,0.08)] transition-all duration-200">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] flex items-center justify-center text-2xl mb-4">{item.icon}</div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">{item.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════ */}
      <section className="mx-4 sm:mx-6 mb-12 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #0F172A 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#F59E0B] opacity-[0.06] blur-3xl" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">Are you a Developer?</h2>
            <p className="text-[#94A3B8] text-sm max-w-md">
              List your project on PropFind and reach thousands of serious buyers across Pakistan. Get verified and boost your sales.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/register"
              className="bg-[#F59E0B] text-[#0F172A] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#D97706] transition-colors no-underline whitespace-nowrap">
              🏗️ List Your Project
            </Link>
            <a href="#"
              className="border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* ══ MODAL ══════════════════════════════════════════════ */}
      {modalProject && (
        <RegisterInterestModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </div>
  );
}
