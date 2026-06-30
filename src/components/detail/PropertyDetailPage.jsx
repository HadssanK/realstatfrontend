"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/detail/PropertyGallery";
import PropertySpecs from "@/components/detail/PropertySpecs";
import PropertyAmenities from "@/components/detail/PropertyAmenities";
import PropertyLocation from "@/components/detail/PropertyLocation";
import SimilarProperties from "@/components/detail/SimilarProperties";
import AgentSidebar from "@/components/detail/AgentSidebar";

export default function PropertyDetailPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">

        {/* ── Breadcrumb ──────────────────────────────── */}
        <nav className="flex items-center gap-2 text-xs text-[#94A3B8] mb-5 flex-wrap">
          <a href="/" className="hover:text-[#F59E0B] transition-colors">Home</a>
          <span>›</span>
          <a href="/properties" className="hover:text-[#F59E0B] transition-colors">Karachi</a>
          <span>›</span>
          <a href="/properties" className="hover:text-[#F59E0B] transition-colors">DHA</a>
          <span>›</span>
          <span className="text-[#475569] font-medium truncate max-w-[200px]">
            Modern 5-Bed House in DHA Phase 6
          </span>
        </nav>

        {/* ── Gallery ─────────────────────────────────── */}
        <PropertyGallery />

        {/* ── Title bar (price + actions) ─────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-6 mb-6">
          <div>
            {/* Sale badge + featured */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#0F6E56] text-white text-[11px] font-bold px-3 py-1 rounded-md">
                For Sale
              </span>
              <span className="bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/40 text-[11px] font-bold px-3 py-1 rounded-md">
                ⭐ Featured
              </span>
              <span className="bg-[#F1F5F9] text-[#475569] text-[11px] font-medium px-3 py-1 rounded-md">
                ID: #PF-10241
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] leading-tight">
              Modern 5-Bed House in DHA Phase 6
            </h1>
            <p className="text-sm text-[#64748B] mt-1 flex items-center gap-1">
              📍 DHA Phase 6, Karachi, Sindh
            </p>
          </div>

          {/* Price + actions */}
          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <div className="text-3xl font-extrabold text-[#0F172A]">
              PKR 2.5 Cr
            </div>
            <div className="text-xs text-[#94A3B8]">PKR 50,000 / sqft</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-[7px] rounded-lg border transition-all duration-150
                  ${saved
                    ? "bg-[#FFFBEB] border-[#F59E0B] text-[#92400E]"
                    : "bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#F59E0B]"
                  }`}
              >
                {saved ? "❤️ Saved" : "🤍 Save"}
              </button>
              <button className="flex items-center gap-1 text-xs font-semibold px-3 py-[7px] rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#F59E0B] transition-colors">
                🔗 Share
              </button>
            </div>
          </div>
        </div>

        {/* ── 2-col layout ────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left — wide content column */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            {/* Key Specs */}
            <PropertySpecs />

            {/* Divider */}
            <hr className="border-[#E2E8F0]" />

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] mb-3">About This Property</h2>
              <div className="text-sm text-[#475569] leading-7 space-y-3">
                <p>
                  This stunning <strong className="text-[#0F172A]">5-bedroom villa</strong> is
                  located in the heart of DHA Phase 6, one of Karachi&apos;s most prestigious
                  residential areas. Built in 2021, the property combines modern architecture
                  with thoughtful design, offering an unparalleled lifestyle experience for
                  discerning families.
                </p>
                <p>
                  The spacious living and dining areas feature floor-to-ceiling windows that
                  flood the interiors with natural light. A fully fitted modular kitchen,
                  dedicated servant quarters, and a beautifully landscaped private garden
                  make this home truly exceptional.
                </p>
                <p>
                  The property sits on a <strong className="text-[#0F172A]">500 sqft</strong>{" "}
                  plot with a built-up area of 4,000 sqft spread over ground + first floor.
                  Ample covered parking for 3 cars, a backup generator, and 24/7 security
                  ensure complete peace of mind.
                </p>
              </div>

              {/* Key highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                {[
                  "Corner plot advantage",
                  "Main boulevard access",
                  "Gated community",
                  "Near DHA Golf Club",
                  "Possession available",
                  "Freehold property",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm text-[#475569]">
                    <span className="text-[#0F6E56] font-bold text-base">✓</span>
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-[#E2E8F0]" />

            {/* Amenities */}
            <PropertyAmenities />

            <hr className="border-[#E2E8F0]" />

            {/* Location */}
            <PropertyLocation />

            <hr className="border-[#E2E8F0]" />

            {/* Similar Properties */}
            <SimilarProperties />
          </div>

          {/* Right — sticky sidebar */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="lg:sticky lg:top-20">
              <AgentSidebar />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
