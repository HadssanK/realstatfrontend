import PropertyCard from "./PropertyCard";

const properties = [
  {
    id: 1,
    gradient: "linear-gradient(135deg, #1D9E75, #0F6E56)",
    emoji: "🏡",
    purpose: "sale",
    featured: true,
    liked: false,
    price: "PKR 2.5 Cr",
    priceUnit: "/total",
    title: "Modern 5-Bed House in DHA",
    location: "DHA Phase 6, Karachi",
    beds: 5,
    baths: 4,
    area: 500,
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #185FA5, #0C447C)",
    emoji: "🏢",
    purpose: "rent",
    featured: true,
    liked: true,
    price: "PKR 85k",
    priceUnit: "/month",
    title: "Luxury 3-Bed Apartment Clifton",
    location: "Clifton Block 4, Karachi",
    beds: 3,
    baths: 2,
    area: 2100,
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg, #854F0B, #F59E0B)",
    emoji: "🏖️",
    purpose: "sale",
    featured: true,
    liked: false,
    price: "PKR 8.2 Cr",
    priceUnit: "/total",
    title: "Premium Villa with Pool",
    location: "Bahria Town, Lahore",
    beds: 6,
    baths: 5,
    area: 1200,
  },
];

export default function FeaturedProperties() {
  return (
    <section className="px-8 pt-4 pb-12 max-w-[900px] mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-xs font-bold text-[#F59E0B] tracking-[1.5px] uppercase mb-2">
            Hand-picked Listings
          </div>
          <div className="text-[26px] font-extrabold text-[#0F172A]">
            Featured Properties
          </div>
        </div>
        <a href="/properties" className="text-sm text-[#F59E0B] font-semibold cursor-pointer no-underline hover:text-[#D97706] transition-colors">
          View all →
        </a>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-3 gap-[18px]">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
