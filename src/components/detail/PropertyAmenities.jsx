const amenities = [
  { icon: "🚗", label: "Parking" },
  { icon: "🏊", label: "Swimming Pool" },
  { icon: "🏋️", label: "Gym" },
  { icon: "⚡", label: "Generator" },
  { icon: "🔒", label: "24/7 Security" },
  { icon: "❄️", label: "Central AC" },
  { icon: "🌿", label: "Garden" },
  { icon: "🛗", label: "Elevator" },
  { icon: "📡", label: "Internet" },
  { icon: "🍽️", label: "Modular Kitchen" },
  { icon: "🏡", label: "Servant Quarter" },
  { icon: "🔥", label: "Gas Available" },
];

export default function PropertyAmenities() {
  return (
    <div>
      <h2 className="text-lg font-bold text-[#0F172A] mb-4">Amenities</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {amenities.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-3"
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            <span className="text-sm font-medium text-[#1E293B] leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
