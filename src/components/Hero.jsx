"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type,     setType]     = useState("");
  const [purpose,  setPurpose]  = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (location) params.set("city",     location);
    if (type && type !== "All Types")         params.set("category", type.toLowerCase());
    if (purpose && purpose !== "Buy or Rent") params.set("purpose",  purpose.toLowerCase());
    router.push(`/properties${params.toString() ? `?${params}` : ""}`);
  }
  return (
    <section
      className="relative px-8 pt-[72px] pb-20 text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #0F6E56 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-block bg-[rgba(245,158,11,0.15)] border border-[rgba(245,158,11,0.3)] text-[#F59E0B] text-xs font-semibold px-[14px] py-1 rounded-[20px] mb-5 tracking-[1px] uppercase">
          🏆 Pakistan&apos;s #1 Property Platform
        </div>

        {/* Heading */}
        <h1 className="text-white text-[42px] font-extrabold leading-tight mb-3">
          Find Your <span className="text-[#F59E0B]">Dream</span>
          <br />
          Property Today
        </h1>

        <p className="text-[#94A3B8] text-base mb-9">
          Search from 500+ verified properties across Pakistan
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-[14px] p-[6px] flex gap-[6px] max-w-[680px] mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          {/* Location */}
          <div className="flex-1 flex flex-col px-3 py-2">
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.5px] mb-[2px]">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Karachi, Lahore, Islamabad..."
              className="border-none outline-none text-sm text-[#1E293B] bg-transparent font-sans"
            />
          </div>

          <div className="w-px bg-[#E2E8F0] my-2" />

          {/* Type */}
          <div className="flex-1 flex flex-col px-3 py-2">
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.5px] mb-[2px]">
              Type
            </label>
            <select value={type} onChange={e => setType(e.target.value)} className="border-none outline-none text-sm text-[#1E293B] bg-transparent font-sans">
              <option>All Types</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
              <option>Commercial</option>
            </select>
          </div>

          <div className="w-px bg-[#E2E8F0] my-2" />

          {/* Purpose */}
          <div className="flex-1 flex flex-col px-3 py-2">
            <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.5px] mb-[2px]">
              Purpose
            </label>
            <select value={purpose} onChange={e => setPurpose(e.target.value)} className="border-none outline-none text-sm text-[#1E293B] bg-transparent font-sans">
              <option>Buy or Rent</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>
          </div>

          {/* Search Button */}
          <button onClick={handleSearch} className="bg-[#F59E0B] border-none rounded-[10px] px-6 text-[#0F172A] font-bold text-sm cursor-pointer whitespace-nowrap">
            🔍 Search
          </button>
        </div>
      </div>
    </section>
  );
}
