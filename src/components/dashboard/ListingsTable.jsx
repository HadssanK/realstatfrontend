"use client";

import { useState } from "react";

const INITIAL_LISTINGS = [
  {
    id: 1,
    emoji: "🏡",
    gradient: "from-[#1D9E75] to-[#0F6E56]",
    title: "Modern 5-Bed House in DHA",
    location: "DHA Phase 6, Karachi",
    type: "House",
    price: "PKR 2.5 Cr",
    status: "Available",
    views: 342,
  },
  {
    id: 2,
    emoji: "🏢",
    gradient: "from-[#185FA5] to-[#0C447C]",
    title: "Luxury Apartment Clifton",
    location: "Clifton Block 4, Karachi",
    type: "Apartment",
    price: "PKR 85k/mo",
    status: "Rented",
    views: 518,
  },
  {
    id: 3,
    emoji: "🏖️",
    gradient: "from-[#854F0B] to-[#F59E0B]",
    title: "Premium Villa with Pool",
    location: "Bahria Town, Lahore",
    type: "Villa",
    price: "PKR 8.2 Cr",
    status: "Sold",
    views: 671,
  },
  {
    id: 4,
    emoji: "🏗️",
    gradient: "from-[#4F46E5] to-[#7C3AED]",
    title: "10 Marla Residential Plot",
    location: "Bahria Enclave, Islamabad",
    type: "Plot",
    price: "PKR 45 Lac",
    status: "Available",
    views: 189,
  },
  {
    id: 5,
    emoji: "🏪",
    gradient: "from-[#BE185D] to-[#9D174D]",
    title: "Commercial Shop Main Blvd",
    location: "Main Boulevard, Lahore",
    type: "Commercial",
    price: "PKR 1.2L/mo",
    status: "Available",
    views: 94,
  },
];

const STATUS_STYLES = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Sold:      "bg-red-50    text-red-700    border-red-200",
  Rented:    "bg-blue-50   text-blue-700   border-blue-200",
};

export default function ListingsTable() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [deleteId, setDeleteId] = useState(null);

  function confirmDelete(id) {
    setListings((prev) => prev.filter((l) => l.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">My Listings</h2>
          <p className="text-xs text-[#94A3B8] mt-[2px]">{listings.length} active properties</p>
        </div>
        <button className="flex items-center gap-2 bg-[#F59E0B] text-[#0F172A] text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#D97706] transition-colors">
          ➕ Add New
        </button>
      </div>

      {/* Table — scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              {["Property", "Location", "Type", "Price", "Status", "Views", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider px-5 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {listings.map((l) => (
              <tr key={l.id} className="hover:bg-[#F8FAFC] transition-colors group">

                {/* Property */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${l.gradient} flex items-center justify-center text-lg shrink-0`}>
                      {l.emoji}
                    </div>
                    <span className="font-semibold text-[#1E293B] whitespace-nowrap max-w-[160px] truncate block">
                      {l.title}
                    </span>
                  </div>
                </td>

                {/* Location */}
                <td className="px-5 py-3 text-[#64748B] whitespace-nowrap">{l.location}</td>

                {/* Type */}
                <td className="px-5 py-3">
                  <span className="bg-[#F1F5F9] text-[#475569] text-[11px] font-semibold px-2 py-[3px] rounded-md">
                    {l.type}
                  </span>
                </td>

                {/* Price */}
                <td className="px-5 py-3 font-bold text-[#0F172A] whitespace-nowrap">{l.price}</td>

                {/* Status */}
                <td className="px-5 py-3">
                  <span className={`text-[11px] font-bold px-[10px] py-1 rounded-full border ${STATUS_STYLES[l.status]}`}>
                    {l.status}
                  </span>
                </td>

                {/* Views */}
                <td className="px-5 py-3 text-[#64748B]">
                  <span className="flex items-center gap-1">
                    👁️ {l.views.toLocaleString()}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    {/* View */}
                    <button
                      title="View"
                      className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-blue-50 hover:text-blue-600 text-[#64748B] flex items-center justify-center transition-colors text-sm"
                    >
                      👁️
                    </button>
                    {/* Edit */}
                    <button
                      title="Edit"
                      className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-amber-50 hover:text-amber-600 text-[#64748B] flex items-center justify-center transition-colors text-sm"
                    >
                      ✏️
                    </button>
                    {/* Delete */}
                    <button
                      title="Delete"
                      onClick={() => setDeleteId(l.id)}
                      className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-red-50 hover:text-red-600 text-[#64748B] flex items-center justify-center transition-colors text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {listings.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="text-5xl mb-3">🏠</span>
            <p className="font-bold text-[#0F172A]">No listings yet</p>
            <p className="text-sm text-[#64748B] mt-1">Add your first property to get started.</p>
          </div>
        )}
      </div>

      {/* ── Delete confirm modal ─────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="text-center mb-5">
              <span className="text-4xl">🗑️</span>
              <h3 className="font-extrabold text-[#0F172A] mt-3 mb-1">Delete Listing?</h3>
              <p className="text-sm text-[#64748B]">This action cannot be undone.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="py-[10px] rounded-xl border border-[#E2E8F0] text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deleteId)}
                className="py-[10px] rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
