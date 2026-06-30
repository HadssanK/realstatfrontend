"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";

const ALL_LISTINGS = [
  { id:1,  gradient:"linear-gradient(135deg,#1D9E75,#0F6E56)",  emoji:"🏡", purpose:"sale", featured:true,  liked:false, price:"PKR 2.5 Cr",  priceUnit:"/total", title:"Modern 5-Bed House in DHA",       location:"DHA Phase 6, Karachi",     beds:5, baths:4, area:500  },
  { id:2,  gradient:"linear-gradient(135deg,#185FA5,#0C447C)",  emoji:"🏢", purpose:"rent", featured:true,  liked:false, price:"PKR 85k",     priceUnit:"/month", title:"Luxury Apartment — Clifton",      location:"Clifton Block 4, Karachi", beds:3, baths:2, area:2100 },
  { id:3,  gradient:"linear-gradient(135deg,#854F0B,#F59E0B)",  emoji:"🏖️", purpose:"sale", featured:false, liked:false, price:"PKR 8.2 Cr",  priceUnit:"/total", title:"Premium Villa with Pool",         location:"Bahria Town, Lahore",      beds:6, baths:5, area:1200 },
  { id:4,  gradient:"linear-gradient(135deg,#4F46E5,#7C3AED)",  emoji:"🏘️", purpose:"sale", featured:false, liked:false, price:"PKR 1.8 Cr",  priceUnit:"/total", title:"4-Bed House — Gulshan Block 13",  location:"Gulshan, Karachi",         beds:4, baths:3, area:400  },
  { id:5,  gradient:"linear-gradient(135deg,#065F46,#047857)",  emoji:"🏡", purpose:"sale", featured:true,  liked:false, price:"PKR 3.9 Cr",  priceUnit:"/total", title:"Corner House — Johar Town",       location:"Johar Town, Lahore",       beds:5, baths:5, area:4500 },
  { id:6,  gradient:"linear-gradient(135deg,#0369A1,#075985)",  emoji:"🏢", purpose:"rent", featured:false, liked:false, price:"PKR 55k",     priceUnit:"/month", title:"2-Bed Apartment — F-10",          location:"F-10, Islamabad",          beds:2, baths:2, area:1200 },
  { id:7,  gradient:"linear-gradient(135deg,#BE185D,#9D174D)",  emoji:"🏪", purpose:"rent", featured:false, liked:false, price:"PKR 1.2L",    priceUnit:"/month", title:"Commercial Shop — Main Blvd",     location:"Main Boulevard, Lahore",   beds:0, baths:1, area:800  },
  { id:8,  gradient:"linear-gradient(135deg,#6D28D9,#4C1D95)",  emoji:"🏗️", purpose:"sale", featured:false, liked:false, price:"PKR 45 Lac",  priceUnit:"/total", title:"10 Marla Plot — Bahria Enclave",  location:"Bahria Enclave, Islamabad",beds:0, baths:0, area:2250 },
  { id:9,  gradient:"linear-gradient(135deg,#0F6E56,#064E3B)",  emoji:"🏡", purpose:"sale", featured:false, liked:false, price:"PKR 12 Cr",   priceUnit:"/total", title:"Beachfront Villa — DHA Phase 8",  location:"DHA Phase 8, Karachi",     beds:7, baths:6, area:2000 },
];

const PAGE_SIZE = 6;

export default function AgentProfilePage({ agent }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [copied,       setCopied]       = useState(false);

  const visible = ALL_LISTINGS.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_LISTINGS.length;

  function handleCopyEmail() {
    navigator.clipboard.writeText(agent.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      {/* ══ Hero ══ */}
      <section className="relative">
        {/* Cover banner */}
        <div className="h-[220px] sm:h-[260px] w-full relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 55%, #0F6E56 100%)" }}>
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#F59E0B] opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 left-20 w-72 h-40 rounded-full bg-[#0F6E56] opacity-[0.12] blur-3xl" />
          {/* Agency badge */}
          <div className="absolute top-5 right-6 flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2">
            <span className="text-[#F59E0B] font-extrabold text-sm">{agent.agency}</span>
          </div>
        </div>

        {/* Avatar + info */}
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="relative -mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              {/* Left */}
              <div className="flex items-end gap-5">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${agent.grad}
                  flex items-center justify-center text-3xl font-extrabold text-white
                  border-4 border-white shadow-xl select-none shrink-0`}>
                  {agent.initials}
                </div>
                <div className="pb-1 pt-20 position">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-tight">
                      {agent.name}
                    </h1>
                    {agent.verified && (
                      <span className="flex items-center gap-1 bg-[#FFFBEB] border border-[#F59E0B]/40 text-[#92400E] text-[11px] font-bold px-2 py-[2px] rounded-full">
                        ✅ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#64748B] mt-[2px]">{agent.title}</p>
                  <p className="text-xs text-[#94A3B8] mt-[2px] flex items-center gap-1">
                    🏢 {agent.agency} &nbsp;·&nbsp; 📍 {agent.city}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-[#F59E0B] text-xs">★</span>)}
                    <span className="text-[10px] text-[#94A3B8] ml-1">{agent.rating} ({agent.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Right: contact buttons */}
              <div className="flex items-center gap-2 flex-wrap pb-1 sm:pb-0">
                <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0F6E56] text-white text-sm font-bold px-4 py-[10px] rounded-xl hover:bg-[#065F46] transition-colors">
                  💬 WhatsApp
                </a>
                <a href={`tel:${agent.phone}`}
                  className="flex items-center gap-2 bg-[#185FA5] text-white text-sm font-bold px-4 py-[10px] rounded-xl hover:bg-[#0C447C] transition-colors">
                  📞 Call
                </a>
                <button onClick={handleCopyEmail}
                  className="flex items-center gap-2 bg-[#F1F5F9] text-[#475569] text-sm font-bold px-4 py-[10px] rounded-xl hover:bg-[#E2E8F0] transition-colors">
                  {copied ? "✅ Copied!" : "✉️ Email"}
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {agent.stats.map(s => (
                <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-4 flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="text-xl font-extrabold text-[#0F172A] leading-none">{s.value}</p>
                    <p className="text-xs text-[#94A3B8] mt-[2px]">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ About + Sidebar ══ */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 mt-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Bio */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <h2 className="text-base font-bold text-[#0F172A] mb-4">About {agent.name.split(" ")[0]}</h2>
            <div className="text-sm text-[#475569] leading-7 space-y-3">
              {agent.bio.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </div>

        {/* Sticky info cards */}
        <div className="w-full lg:w-[260px] shrink-0">
          <div className="lg:sticky lg:top-20 flex flex-col gap-4">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Specializations</p>
              <div className="flex flex-wrap gap-2">
                {agent.specializations.map(s => (
                  <span key={s} className="bg-[#F1F5F9] text-[#475569] text-xs font-semibold px-3 py-1 rounded-full border border-[#E2E8F0]">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {agent.languages.map(l => (
                  <span key={l} className="bg-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/30 text-xs font-semibold px-3 py-1 rounded-full">🌐 {l}</span>
                ))}
              </div>
            </div>
            <div className="bg-[#0F172A] rounded-2xl p-5">
              <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Contact</p>
              <div className="flex flex-col gap-2 text-sm text-[#CBD5E1]">
                <div className="flex items-center gap-2"><span>📞</span><span>{agent.phone}</span></div>
                <div className="flex items-center gap-2 break-all"><span>✉️</span><span className="text-xs">{agent.email}</span></div>
                <div className="flex items-center gap-2"><span>🏢</span><span>{agent.agency}</span></div>
              </div>
              <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-4 bg-[#0F6E56] text-white text-sm font-bold py-[10px] rounded-xl hover:bg-[#065F46] transition-colors">
                💬 Send a Message
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Listings ══ */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-1">Portfolio</p>
            <h2 className="text-xl font-extrabold text-[#0F172A]">Properties by {agent.name}</h2>
          </div>
          <span className="text-xs font-semibold bg-[#F1F5F9] text-[#475569] px-3 py-1 rounded-full border border-[#E2E8F0]">
            {ALL_LISTINGS.length} listings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map(property => <PropertyCard key={property.id} property={property} />)}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button onClick={() => setVisibleCount(c => Math.min(c + PAGE_SIZE, ALL_LISTINGS.length))}
              className="flex items-center gap-2 border border-[#E2E8F0] bg-white text-[#475569] text-sm font-bold px-8 py-3 rounded-xl hover:border-[#F59E0B] hover:text-[#0F172A] transition-all">
              Load More
              <span className="text-[#94A3B8] text-xs">({ALL_LISTINGS.length - visibleCount} remaining)</span>
            </button>
          </div>
        )}
        {!hasMore && ALL_LISTINGS.length > PAGE_SIZE && (
          <p className="text-center text-sm text-[#94A3B8] mt-8">✓ All {ALL_LISTINGS.length} listings shown</p>
        )}
      </section>

      <div className="mt-auto"><Footer /></div>
    </div>
  );
}
