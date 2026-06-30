"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { icon: "🏡", name: "House",      slug: "house",      count: "142 listings" },
  { icon: "🏢", name: "Apartment",  slug: "apartment",  count: "89 listings"  },
  { icon: "🏖️", name: "Villa",      slug: "villa",      count: "34 listings"  },
  { icon: "🏗️", name: "Plot",       slug: "plot",       count: "211 listings" },
  { icon: "🏪", name: "Commercial", slug: "commercial", count: "67 listings"  },
];

export default function Categories() {
  const [active, setActive] = useState(null);
  const router = useRouter();

  function handleClick(index, slug) {
    setActive(index);
    router.push(`/properties?category=${slug}`);
  }

  return (
    <section className="px-8 pt-12 pb-8 max-w-[900px] mx-auto">
      <div className="text-xs font-bold text-[#F59E0B] tracking-[1.5px] uppercase mb-2">
        Browse By Type
      </div>
      <div className="text-[26px] font-extrabold text-[#0F172A] mb-7">
        What are you looking for?
      </div>
      <div className="grid grid-cols-5 gap-3">
        {categories.map((cat, index) => (
          <div
            key={cat.name}
            onClick={() => handleClick(index, cat.slug)}
            className={`border-[1.5px] rounded-xl p-5 px-3 text-center cursor-pointer transition-all duration-200
              ${active === index
                ? "border-[#F59E0B] bg-[#FFFBEB]"
                : "border-[#E2E8F0] bg-white hover:border-[#F59E0B] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(245,158,11,0.15)]"
              }`}
          >
            <div className="text-[28px] mb-2">{cat.icon}</div>
            <div className="text-sm font-semibold text-[#1E293B]">{cat.name}</div>
            <div className="text-[11px] text-[#94A3B8] mt-[2px]">{cat.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
