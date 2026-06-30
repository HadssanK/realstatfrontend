"use client";

export default function ListingTopBar({ total, sort, onSortChange, onFilterOpen }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      {/* Left — result count + mobile filter button */}
      <div className="flex items-center gap-3">
        {/* Mobile filter toggle */}
        <button
          onClick={onFilterOpen}
          className="lg:hidden flex items-center gap-2 bg-[#0F172A] text-white text-sm font-semibold px-4 py-2 rounded-lg"
          aria-label="Open filters"
        >
          <span>⚙️</span> Filters
        </button>

        <p className="text-sm text-[#64748B]">
          <span className="font-bold text-[#0F172A] text-base">{total}</span> properties found
        </p>
      </div>

      {/* Right — sort dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-[#94A3B8] font-semibold uppercase tracking-wider whitespace-nowrap hidden sm:block">
          Sort by
        </label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-[#E2E8F0] bg-white rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] transition-colors cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="most_viewed">Most Viewed</option>
        </select>
      </div>
    </div>
  );
}
