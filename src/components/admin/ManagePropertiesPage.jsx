"use client";

import { useState, useMemo } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Pagination from "@/components/listing/Pagination";

/* ── Sample data ──────────────────────────────────────────── */
const INITIAL = [
  { id:1, emoji:"🏡", grad:"from-[#1D9E75] to-[#0F6E56]",  title:"Modern 5-Bed House in DHA",        agent:"Ahmed Khan",  type:"House",      price:"PKR 2.5 Cr",   city:"Karachi",    status:"available", featured:true  },
  { id:2, emoji:"🏢", grad:"from-[#185FA5] to-[#0C447C]",  title:"Luxury Apartment — Clifton Blk 4", agent:"Fatima Noor", type:"Apartment",  price:"PKR 85k/mo",  city:"Karachi",    status:"rented",    featured:false },
  { id:3, emoji:"🏖️", grad:"from-[#854F0B] to-[#F59E0B]",  title:"Premium Villa with Pool",           agent:"Ahmed Khan",  type:"Villa",      price:"PKR 8.2 Cr",  city:"Lahore",     status:"sold",      featured:true  },
  { id:4, emoji:"🏗️", grad:"from-[#4F46E5] to-[#7C3AED]",  title:"10 Marla Residential Plot",         agent:"Nadia Aziz",  type:"Plot",       price:"PKR 45 Lac",  city:"Islamabad",  status:"pending",   featured:false },
  { id:5, emoji:"🏪", grad:"from-[#BE185D] to-[#9D174D]",  title:"Commercial Shop — Main Blvd",       agent:"Nadia Aziz",  type:"Commercial", price:"PKR 1.2L/mo", city:"Lahore",     status:"available", featured:false },
  { id:6, emoji:"🏘️", grad:"from-[#0369A1] to-[#075985]",  title:"4-Bed House — Gulshan Block 13",    agent:"Fatima Noor", type:"House",      price:"PKR 1.8 Cr",  city:"Karachi",    status:"pending",   featured:false },
  { id:7, emoji:"🏡", grad:"from-[#065F46] to-[#047857]",  title:"Corner House — Johar Town",         agent:"Ahmed Khan",  type:"House",      price:"PKR 3.9 Cr",  city:"Lahore",     status:"available", featured:false },
  { id:8, emoji:"🏢", grad:"from-[#6D28D9] to-[#4C1D95]",  title:"2-Bed Flat — F-10 Islamabad",       agent:"Nadia Aziz",  type:"Apartment",  price:"PKR 55k/mo",  city:"Islamabad",  status:"pending",   featured:false },
];

const TYPES    = ["All Types","House","Apartment","Villa","Plot","Commercial"];
const CITIES   = ["All Cities","Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad"];
const STATUSES = ["all","available","pending","sold","rented"];
const ITEMS_PER_PAGE = 6;

/* ── Status config ─────────────────────────────────────────── */
const STATUS_CFG = {
  available: { badge:"bg-emerald-50 text-emerald-700 border-emerald-200", label:"Available" },
  pending:   { badge:"bg-amber-50   text-amber-700   border-amber-200",   label:"Pending"   },
  sold:      { badge:"bg-red-50     text-red-700     border-red-200",     label:"Sold"      },
  rented:    { badge:"bg-blue-50    text-blue-700    border-blue-200",    label:"Rented"    },
};

/* ── Confirm modal ─────────────────────────────────────────── */
function ConfirmModal({ title, message, confirmLabel, confirmStyle, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
        <div className="text-center mb-5">
          <span className="text-4xl">⚠️</span>
          <h3 className="font-extrabold text-[#0F172A] mt-3 mb-1">{title}</h3>
          <p className="text-sm text-[#64748B]">{message}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onCancel}
            className="py-[10px] rounded-xl border border-[#E2E8F0] text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`py-[10px] rounded-xl text-sm font-bold text-white transition-colors ${confirmStyle}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManagePropertiesPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [props,         setProps]         = useState(INITIAL);
  const [search,        setSearch]        = useState("");
  const [typeFilter,    setTypeFilter]    = useState("All Types");
  const [statusFilter,  setStatusFilter]  = useState("all");
  const [cityFilter,    setCityFilter]    = useState("All Cities");
  const [currentPage,   setCurrentPage]   = useState(1);
  const [modal,         setModal]         = useState(null);
  const [reviewMode,    setReviewMode]    = useState(false);

  /* ── Derived ── */
  const pendingCount = props.filter(p => p.status === "pending").length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return props.filter(p => {
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.agent.toLowerCase().includes(q);
      const matchType   = typeFilter   === "All Types"  || p.type === typeFilter;
      const matchStatus = statusFilter === "all"        || p.status === statusFilter;
      const matchCity   = cityFilter   === "All Cities" || p.city === cityFilter;
      const matchReview = !reviewMode || p.status === "pending";
      return matchSearch && matchType && matchStatus && matchCity && matchReview;
    });
  }, [props, search, typeFilter, statusFilter, cityFilter, reviewMode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  function resetPage() { setCurrentPage(1); }

  /* ── Actions ── */
  function approveProperty(id) {
    setProps(prev => prev.map(p => p.id === id ? { ...p, status: "available" } : p));
    setModal(null);
  }
  function rejectProperty(id) {
    setProps(prev => prev.map(p => p.id === id ? { ...p, status: "sold" } : p)); // mark as rejected via sold for demo
    setModal(null);
  }
  function deleteProperty(id) {
    setProps(prev => prev.filter(p => p.id !== id));
    setModal(null);
  }
  function toggleFeatured(id) {
    setProps(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  }

  const dropCls = "border border-[#E2E8F0] rounded-xl px-3 py-[9px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all bg-white cursor-pointer appearance-none pr-8";

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {mobileNavOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileNavOpen(false)} />
      )}
      <div className={`fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300
        ${mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileNavOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569]">☰</button>
            <div>
              <h1 className="text-lg font-extrabold text-[#0F172A]">Manage Properties</h1>
              <p className="text-xs text-[#94A3B8]">Total: {props.length} properties</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <span className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-[6px]">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-semibold text-amber-700">{pendingCount} pending</span>
              </span>
            )}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-xs font-extrabold text-[#0F172A] select-none">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6 flex flex-col gap-5">

          {/* ── Pending Approval Banner ── */}
          {pendingCount > 0 && (
            <div className="flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl shrink-0">
                  ⏳
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-800">
                    {pendingCount} propert{pendingCount === 1 ? "y" : "ies"} awaiting approval
                  </p>
                  <p className="text-xs text-amber-600 mt-[1px]">
                    Review and approve or reject agent-submitted listings
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setReviewMode(true); setStatusFilter("all"); resetPage(); }}
                className="shrink-0 bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-600 transition-colors whitespace-nowrap">
                Review Now →
              </button>
            </div>
          )}

          {/* Review mode pill */}
          {reviewMode && (
            <div className="flex items-center gap-3 bg-[#0F172A] rounded-xl px-5 py-3">
              <span className="text-white text-sm font-semibold">📋 Showing pending properties only</span>
              <button onClick={() => { setReviewMode(false); resetPage(); }}
                className="ml-auto text-[#94A3B8] hover:text-white text-sm transition-colors">✕ Exit review</button>
            </div>
          )}

          {/* ── Filter bar ── */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-sm">🔍</span>
              <input type="text" value={search} onChange={e => { setSearch(e.target.value); resetPage(); }}
                placeholder="Search by title or agent..."
                className="w-full border border-[#E2E8F0] rounded-xl pl-9 pr-9 py-[9px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all placeholder:text-[#CBD5E1] bg-white" />
              {search && (
                <button onClick={() => { setSearch(""); resetPage(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] text-sm">✕</button>
              )}
            </div>

            {/* Type */}
            <div className="relative">
              <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); resetPage(); }} className={dropCls}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-xs">▾</span>
            </div>

            {/* Status */}
            <div className="relative">
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); resetPage(); }} className={dropCls}>
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-xs">▾</span>
            </div>

            {/* City */}
            <div className="relative">
              <select value={cityFilter} onChange={e => { setCityFilter(e.target.value); resetPage(); }} className={dropCls}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-xs">▾</span>
            </div>

            <span className="text-sm text-[#94A3B8] ml-auto shrink-0 hidden sm:block">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ── Table ── */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
                    {["Property","Agent","Type","Price","City","Status","Featured","Actions"].map(h => (
                      <th key={h}
                        className="text-left text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider px-4 py-3 whitespace-nowrap first:px-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {paginated.map(p => {
                    const scfg = STATUS_CFG[p.status];
                    const isPending = p.status === "pending";
                    return (
                      <tr key={p.id}
                        className={`transition-colors hover:bg-[#F8FAFC]
                          ${isPending ? "bg-amber-50/40" : ""}`}>

                        {/* Property thumbnail + title */}
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.grad}
                              flex items-center justify-center text-lg shrink-0`}>
                              {p.emoji}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-[#1E293B] truncate max-w-[180px]">{p.title}</p>
                              <p className="text-[10px] text-[#94A3B8] mt-[1px]">ID #{p.id.toString().padStart(4,"0")}</p>
                            </div>
                          </div>
                        </td>

                        {/* Agent */}
                        <td className="px-4 py-3 text-[#64748B] whitespace-nowrap text-xs">{p.agent}</td>

                        {/* Type */}
                        <td className="px-4 py-3">
                          <span className="bg-[#F1F5F9] text-[#475569] text-[11px] font-semibold px-2 py-[3px] rounded-md whitespace-nowrap">
                            {p.type}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3 font-bold text-[#0F172A] whitespace-nowrap text-xs">{p.price}</td>

                        {/* City */}
                        <td className="px-4 py-3 text-[#64748B] whitespace-nowrap text-xs">{p.city}</td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className={`text-[11px] font-bold px-[10px] py-1 rounded-full border ${scfg.badge}`}>
                            {scfg.label}
                          </span>
                        </td>

                        {/* Featured toggle */}
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleFeatured(p.id)}
                            title={p.featured ? "Remove from featured" : "Mark as featured"}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all duration-150 text-base
                              ${p.featured
                                ? "bg-[#FFFBEB] text-[#F59E0B] hover:bg-amber-100"
                                : "bg-[#F1F5F9] text-[#CBD5E1] hover:bg-[#FFFBEB] hover:text-[#F59E0B]"}`}>
                            ⭐
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {/* View */}
                            <button title="View Property"
                              className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-blue-50 hover:text-blue-600 text-[#64748B] flex items-center justify-center transition-colors text-sm">
                              👁️
                            </button>

                            {/* Approve — only for pending */}
                            {isPending && (
                              <button title="Approve"
                                onClick={() => setModal({ type:"approve", payload: p.id })}
                                className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors text-sm font-bold">
                                ✓
                              </button>
                            )}

                            {/* Reject — only for pending */}
                            {isPending && (
                              <button title="Reject"
                                onClick={() => setModal({ type:"reject", payload: p.id })}
                                className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors text-sm font-bold">
                                ✕
                              </button>
                            )}

                            {/* Delete */}
                            <button title="Delete"
                              onClick={() => setModal({ type:"delete", payload: p.id })}
                              className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-red-50 hover:text-red-500 text-[#64748B] flex items-center justify-center transition-colors text-sm">
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {paginated.length === 0 && (
                <div className="flex flex-col items-center py-16 text-center">
                  <span className="text-5xl mb-3">🏠</span>
                  <p className="font-bold text-[#0F172A]">No properties found</p>
                  <p className="text-sm text-[#64748B] mt-1">Adjust your search or filters</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages}
              onPageChange={p => { setCurrentPage(p); window.scrollTo({ top:0, behavior:"smooth" }); }} />
          )}

        </main>
      </div>

      {/* ── Modals ── */}
      {modal?.type === "approve" && (
        <ConfirmModal title="Approve Property?" message="This listing will go live on the platform."
          confirmLabel="Yes, Approve" confirmStyle="bg-[#0F6E56] hover:bg-[#065F46]"
          onConfirm={() => approveProperty(modal.payload)} onCancel={() => setModal(null)} />
      )}
      {modal?.type === "reject" && (
        <ConfirmModal title="Reject Property?" message="This listing will be marked as rejected and hidden."
          confirmLabel="Yes, Reject" confirmStyle="bg-red-500 hover:bg-red-600"
          onConfirm={() => rejectProperty(modal.payload)} onCancel={() => setModal(null)} />
      )}
      {modal?.type === "delete" && (
        <ConfirmModal title="Delete Property?" message="This is permanent and cannot be undone."
          confirmLabel="Yes, Delete" confirmStyle="bg-red-500 hover:bg-red-600"
          onConfirm={() => deleteProperty(modal.payload)} onCancel={() => setModal(null)} />
      )}

    </div>
  );
}
