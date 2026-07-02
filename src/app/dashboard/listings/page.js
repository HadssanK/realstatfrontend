"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { agentListings } from "@/data/agentListings";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DeleteModal from "@/components/dashboard/DeleteModal";

// Status pill config
const PILL_CFG = {
  All:       { active: "bg-[#0F172A] text-white border-[#0F172A]",    inactive: "bg-white text-[#64748B] border-[#E2E8F0]" },
  Available: { active: "bg-green-500 text-white border-green-500",    inactive: "bg-white text-[#64748B] border-[#E2E8F0]" },
  Pending:   { active: "bg-yellow-400 text-white border-yellow-400",  inactive: "bg-white text-[#64748B] border-[#E2E8F0]" },
  Sold:      { active: "bg-red-500 text-white border-red-500",        inactive: "bg-white text-[#64748B] border-[#E2E8F0]" },
  Rented:    { active: "bg-blue-500 text-white border-blue-500",      inactive: "bg-white text-[#64748B] border-[#E2E8F0]" },
};

export default function MyListingsPage() {
  const router = useRouter();
  const [listings,     setListings]     = useState(agentListings);
  const [viewMode,     setViewMode]     = useState("grid");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter,   setTypeFilter]   = useState("All");
  const [deleteModal,  setDeleteModal]  = useState({ isOpen: false, id: null, title: "" });

  // Computed stats
  const stats = useMemo(() => ({
    All:       listings.length,
    Available: listings.filter(l => l.status === "Available").length,
    Pending:   listings.filter(l => l.status === "Pending").length,
    Sold:      listings.filter(l => l.status === "Sold").length,
    Rented:    listings.filter(l => l.status === "Rented").length,
  }), [listings]);

  // Filtered listings
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return listings.filter(l => {
      const matchSearch = !q || l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) || l.area.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || l.status === statusFilter;
      const matchType   = typeFilter   === "All" || l.type   === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [listings, searchQuery, statusFilter, typeFilter]);

  // Delete handlers
  function openDelete(id, title) { setDeleteModal({ isOpen: true, id, title }); }
  function confirmDelete() {
    setListings(prev => prev.filter(l => l.id !== deleteModal.id));
    setDeleteModal({ isOpen: false, id: null, title: "" });
  }
  function cancelDelete() { setDeleteModal({ isOpen: false, id: null, title: "" }); }

  // Status change
  function changeStatus(id, newStatus) {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  }

  const inputCls = "border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all bg-white";

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E293B]">My Listings</h1>
          <p className="text-sm text-[#64748B] mt-[2px]">Manage all your property listings</p>
        </div>
        <Link href="/dashboard/add"
          className="flex items-center gap-2 bg-[#F59E0B] text-[#0F172A] font-bold text-sm px-5 py-[10px] rounded-xl hover:bg-[#D97706] transition-colors no-underline">
          + Add Property
        </Link>
      </div>

      {/* Status pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {Object.entries(PILL_CFG).map(([status, cls]) => (
          <button key={status} onClick={() => setStatusFilter(status)}
            className={`px-4 py-[7px] rounded-full text-xs font-semibold border transition-all duration-200
              ${statusFilter === status ? cls.active : cls.inactive}`}>
            {status}
            <span className="ml-1 opacity-80">({stats[status] ?? 0})</span>
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-sm">&#128269;</span>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, city or area..."
            className={`${inputCls} w-full pl-9 pr-3`} />
        </div>
        <div className="relative">
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className={`${inputCls} pr-8 appearance-none cursor-pointer`}>
            <option value="All">All Types</option>
            {["House","Apartment","Villa","Plot","Commercial"].map(t =>
              <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none text-xs">v</span>
        </div>
        <div className="flex rounded-xl overflow-hidden border border-[#E2E8F0]">
          <button onClick={() => setViewMode("grid")}
            className={`px-3 py-2 text-sm transition-colors duration-200
              ${viewMode === "grid" ? "bg-[#0F172A] text-white" : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"}`}
            title="Grid view">Grid</button>
          <button onClick={() => setViewMode("table")}
            className={`px-3 py-2 text-sm border-l border-[#E2E8F0] transition-colors duration-200
              ${viewMode === "table" ? "bg-[#0F172A] text-white" : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"}`}
            title="Table view">Table</button>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-[#94A3B8]">
        Showing <span className="font-semibold text-[#475569]">{filtered.length}</span> of{" "}
        <span className="font-semibold text-[#475569]">{listings.length}</span> properties
      </p>

      {/* Grid view */}
      {viewMode === "grid" && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(l => (
            <div key={l.id}
              className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-200 flex flex-col">
              <div className="h-[160px] relative flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${l.gradientFrom}, ${l.gradientTo})` }}>
                <span className="absolute top-3 left-3 bg-[#0F172A]/80 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                  For {l.listingType}
                </span>
                {l.isFeatured && (
                  <span className="absolute top-3 right-3 text-[#F59E0B] text-lg" title="Featured">*</span>
                )}
                <span className="text-5xl select-none">{l.emoji}</span>
                <div className="absolute bottom-3 left-3">
                  <StatusBadge status={l.status} />
                </div>
                <span className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  {l.views} views
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-lg font-extrabold text-[#0F172A] leading-tight">{l.price}</p>
                  {l.inquiries > 0 && (
                    <span className="shrink-0 bg-[#F59E0B] text-[#0F172A] text-[10px] font-bold px-2 py-[2px] rounded-full">
                      {l.inquiries} inquiries
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-[#1E293B] truncate">{l.title}</p>
                <p className="text-xs text-[#64748B]">
                  {l.area}, {l.city}
                </p>
                {l.type !== "Plot" && (
                  <p className="text-xs text-[#94A3B8] flex items-center gap-3">
                    <span>{l.bedrooms} Beds</span>
                    <span>{l.areaSqft} sqft</span>
                  </p>
                )}
                <p className="text-[10px] text-[#CBD5E1] mt-auto">
                  Posted {new Date(l.postedDate).toLocaleDateString("en-PK", { day:"numeric", month:"short", year:"numeric" })}
                </p>
                <hr className="border-[#F1F5F9] my-1" />
                <div className="flex items-center justify-between gap-2">
                  <select value={l.status} onChange={e => changeStatus(l.id, e.target.value)}
                    className="flex-1 border border-[#E2E8F0] rounded-lg px-2 py-[6px] text-xs text-[#475569] outline-none focus:border-[#F59E0B] bg-white cursor-pointer">
                    {["Available","Pending","Sold","Rented"].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <div className="flex items-center gap-1">
                    <button onClick={() => router.push(`/dashboard/edit-property/${l.id}`)}
                      title="Edit" className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center text-sm transition-colors">Edit</button>
                    <Link href={`/properties/${l.id}`}
                      title="View" className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center text-sm transition-colors no-underline">View</Link>
                    <button onClick={() => openDelete(l.id, l.title)}
                      title="Delete" className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center text-sm transition-colors">Del</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table view */}
      {viewMode === "table" && filtered.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {["Property","Price","Status","Views","Inquiries","Posted","Actions"].map(h => (
                    <th key={h} className="text-left text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, idx) => (
                  <tr key={l.id}
                    className={`hover:bg-[#F8FAFC] transition-colors ${idx < filtered.length - 1 ? "border-b border-[#F1F5F9]" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                          style={{ background: `linear-gradient(135deg, ${l.gradientFrom}, ${l.gradientTo})` }}>
                          {l.emoji}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1E293B] truncate max-w-[180px]">
                            {l.title}{l.isFeatured ? " *" : ""}
                          </p>
                          <p className="text-[11px] text-[#94A3B8]">{l.area}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#0F172A] whitespace-nowrap">{l.price}</td>
                    <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                    <td className="px-4 py-3 text-[#64748B] whitespace-nowrap">{l.views}</td>
                    <td className="px-4 py-3 text-[#64748B] whitespace-nowrap">{l.inquiries}</td>
                    <td className="px-4 py-3 text-[#94A3B8] text-xs whitespace-nowrap">
                      {new Date(l.postedDate).toLocaleDateString("en-PK", { day:"numeric", month:"short", year:"numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => router.push(`/dashboard/edit-property/${l.id}`)}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center text-xs transition-colors">Edit</button>
                        <Link href={`/properties/${l.id}`}
                          className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center text-xs transition-colors no-underline">View</Link>
                        <button onClick={() => openDelete(l.id, l.title)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center text-xs transition-colors">Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-[#E2E8F0]">
          <span className="text-6xl mb-4">&#127968;</span>
          {listings.length === 0 ? (
            <>
              <p className="font-bold text-[#1E293B] text-lg mb-1">You have not added any listings yet</p>
              <p className="text-sm text-[#64748B] mb-5">Start by adding your first property listing</p>
              <Link href="/dashboard/add-property"
                className="bg-[#F59E0B] text-[#0F172A] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#D97706] transition-colors no-underline">
                + Add Your First Property
              </Link>
            </>
          ) : (
            <>
              <p className="font-bold text-[#1E293B] text-lg mb-1">No properties found</p>
              <p className="text-sm text-[#64748B]">Try adjusting your search or filters</p>
              <button onClick={() => { setSearchQuery(""); setStatusFilter("All"); setTypeFilter("All"); }}
                className="mt-4 text-sm font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors">
                Clear all filters
              </button>
            </>
          )}
        </div>
      )}

      {/* Delete modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        propertyTitle={deleteModal.title}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
