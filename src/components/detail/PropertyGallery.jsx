"use client";

import { useState } from "react";

const THUMBNAILS = [
  { id: 1, bg: "linear-gradient(135deg, #1D9E75, #0F6E56)", emoji: "🏡" },
  { id: 2, bg: "linear-gradient(135deg, #185FA5, #0C447C)", emoji: "🛋️" },
  { id: 3, bg: "linear-gradient(135deg, #854F0B, #F59E0B)", emoji: "🍳" },
  { id: 4, bg: "linear-gradient(135deg, #4F46E5, #7C3AED)", emoji: "🛁" },
];

export default function PropertyGallery() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div
        className="w-full h-[360px] sm:h-[440px] rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{ background: THUMBNAILS[active].bg }}
      >
        <span className="text-[100px] select-none">{THUMBNAILS[active].emoji}</span>

        {/* View All Photos button */}
        <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#0F172A] text-xs font-bold px-4 py-2 rounded-lg shadow transition-colors duration-150 flex items-center gap-2">
          <span>🖼️</span> View All Photos (12)
        </button>

        {/* Badge on main */}
        <span className="absolute top-4 left-4 bg-[#0F6E56] text-white text-xs font-bold px-3 py-1 rounded-md">
          For Sale
        </span>
        <span className="absolute top-4 right-4 bg-[#F59E0B] text-[#0F172A] text-xs font-bold px-3 py-1 rounded-md">
          ⭐ Featured
        </span>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 mt-3">
        {THUMBNAILS.map((thumb, idx) => (
          <button
            key={thumb.id}
            onClick={() => setActive(idx)}
            className={`h-20 sm:h-24 rounded-xl flex items-center justify-center text-3xl transition-all duration-150 overflow-hidden border-2
              ${active === idx ? "border-[#F59E0B] scale-[0.97]" : "border-transparent hover:border-[#F59E0B]/50"}`}
            style={{ background: thumb.bg }}
            aria-label={`View photo ${idx + 1}`}
          >
            {thumb.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
