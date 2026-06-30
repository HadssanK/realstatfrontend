const specs = [
  { icon: "🛏️", label: "Bedrooms", value: "5 Beds" },
  { icon: "🚿", label: "Bathrooms", value: "4 Baths" },
  { icon: "📐", label: "Area", value: "500 sqft" },
  { icon: "🏖️", label: "Type", value: "Villa" },
  { icon: "🏗️", label: "Floor", value: "Ground + 1" },
  { icon: "📅", label: "Year Built", value: "2021" },
];

export default function PropertySpecs() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-center"
        >
          <div className="text-2xl mb-1">{spec.icon}</div>
          <div className="text-xs font-bold text-[#0F172A]">{spec.value}</div>
          <div className="text-[10px] text-[#94A3B8] mt-[2px]">{spec.label}</div>
        </div>
      ))}
    </div>
  );
}
