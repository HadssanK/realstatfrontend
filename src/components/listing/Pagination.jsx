"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 5 page numbers with ellipsis logic
  function getVisiblePages() {
    if (totalPages <= 5) return pages;
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }

  const visible = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150
          ${
            currentPage === 1
              ? "border-[#E2E8F0] text-[#CBD5E1] cursor-not-allowed bg-white"
              : "border-[#E2E8F0] text-[#64748B] bg-white hover:border-[#F59E0B] hover:text-[#0F172A]"
          }`}
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {visible.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-[#94A3B8] text-sm select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-all duration-150
              ${
                currentPage === p
                  ? "bg-[#F59E0B] text-[#0F172A] border-[#F59E0B]"
                  : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#F59E0B] hover:text-[#0F172A]"
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150
          ${
            currentPage === totalPages
              ? "border-[#E2E8F0] text-[#CBD5E1] cursor-not-allowed bg-white"
              : "border-[#E2E8F0] text-[#64748B] bg-white hover:border-[#F59E0B] hover:text-[#0F172A]"
          }`}
      >
        Next →
      </button>
    </div>
  );
}
