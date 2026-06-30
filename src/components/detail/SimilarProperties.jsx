import PropertyCard from "@/components/PropertyCard";

const SIMILAR = [
  {
    id: 101,
    gradient: "linear-gradient(135deg, #185FA5, #0C447C)",
    emoji: "🏢",
    purpose: "sale",
    featured: false,
    liked: false,
    price: "PKR 1.9 Cr",
    priceUnit: "/total",
    title: "4-Bed House in DHA Phase 5",
    location: "DHA Phase 5, Karachi",
    beds: 4,
    baths: 3,
    area: 480,
  },
  {
    id: 102,
    gradient: "linear-gradient(135deg, #4F46E5, #7C3AED)",
    emoji: "🏘️",
    purpose: "sale",
    featured: true,
    liked: false,
    price: "PKR 3.1 Cr",
    priceUnit: "/total",
    title: "Luxury Villa — Clifton Block 8",
    location: "Clifton, Karachi",
    beds: 5,
    baths: 4,
    area: 650,
  },
  {
    id: 103,
    gradient: "linear-gradient(135deg, #065F46, #047857)",
    emoji: "🏡",
    purpose: "sale",
    featured: false,
    liked: false,
    price: "PKR 2.2 Cr",
    priceUnit: "/total",
    title: "Corner House — Gulshan Block 7",
    location: "Gulshan-e-Iqbal, Karachi",
    beds: 4,
    baths: 3,
    area: 420,
  },
];

export default function SimilarProperties() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#0F172A]">Similar Properties</h2>
        <a href="/properties" className="text-sm text-[#F59E0B] font-semibold hover:text-[#D97706] transition-colors">
          View all →
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {SIMILAR.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
