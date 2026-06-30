export default function PropertyLocation() {
  return (
    <div>
      <h2 className="text-lg font-bold text-[#0F172A] mb-1">Location</h2>
      <p className="text-sm text-[#64748B] mb-4 flex items-center gap-1">
        📍 DHA Phase 6, Karachi, Sindh, Pakistan
      </p>

      {/* Map placeholder */}
      <div className="w-full h-[220px] rounded-2xl bg-[#E2E8F0] flex flex-col items-center justify-center border border-[#CBD5E1] relative overflow-hidden">
        {/* Fake map grid lines */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Map pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-xl shadow-lg mb-2">
            📍
          </div>
          <span className="text-sm font-semibold text-[#0F172A] bg-white px-3 py-1 rounded-full shadow">
            DHA Phase 6, Karachi
          </span>
        </div>
        {/* Map attribution label */}
        <span className="absolute bottom-3 right-3 text-[10px] text-[#94A3B8]">
          Map preview
        </span>
      </div>

      {/* Nearby tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {["School nearby", "Hospital 2km", "Mall 1.5km", "Metro Station", "Airport 15km"].map(
          (tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-[#475569] bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}
