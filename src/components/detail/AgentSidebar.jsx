"use client";

import { useState } from "react";

export default function AgentSidebar() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Hi, I am interested in this property. Please contact me with more details.",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ── Agent Card ───────────────────────── */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
        {/* Agent info */}
        <div className="flex items-center gap-4 mb-5">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#0F6E56] flex items-center justify-center text-2xl shrink-0 font-bold text-white select-none">
            AK
          </div>
          <div>
            <p className="font-bold text-[#0F172A] text-base leading-tight">Ahmed Khan</p>
            <p className="text-xs text-[#64748B] mt-[2px]">DHA Properties</p>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-[#F59E0B] text-xs">★</span>
              ))}
              <span className="text-[10px] text-[#94A3B8] ml-1">4.9 (128 reviews)</span>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-2 mb-5 text-sm text-[#475569]">
          <div className="flex items-center gap-2">
            <span className="text-base">📞</span>
            <span className="font-medium">+92 300 1234567</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">🏢</span>
            <span>DHA Properties, Karachi</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+923001234567"
            className="flex items-center justify-center gap-2 bg-[#0F172A] text-white text-sm font-semibold py-[10px] rounded-xl hover:bg-[#1E293B] transition-colors"
          >
            📞 Call
          </a>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#0F6E56] text-white text-sm font-semibold py-[10px] rounded-xl hover:bg-[#065F46] transition-colors"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* ── Inquiry Form ─────────────────────── */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
        <h3 className="font-bold text-[#0F172A] text-base mb-4">Send Inquiry</h3>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="text-4xl mb-3">✅</span>
            <p className="font-bold text-[#0F6E56] text-sm">Inquiry Sent!</p>
            <p className="text-xs text-[#64748B] mt-1">Ahmed will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Hassan Ali"
                required
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-[9px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] transition-colors placeholder:text-[#CBD5E1]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-[9px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] transition-colors placeholder:text-[#CBD5E1]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+92 300 0000000"
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-[9px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] transition-colors placeholder:text-[#CBD5E1]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-[9px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] transition-colors placeholder:text-[#CBD5E1] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F59E0B] text-[#0F172A] font-bold text-sm py-3 rounded-xl hover:bg-[#D97706] transition-colors duration-150 mt-1"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>

      {/* ── Price breakdown hint ─────────────── */}
      <div className="bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-2xl p-4">
        <p className="text-xs font-bold text-[#92400E] mb-2 uppercase tracking-wider">
          💡 Price Breakdown
        </p>
        <div className="flex flex-col gap-1 text-sm text-[#78350F]">
          <div className="flex justify-between">
            <span>Listed Price</span>
            <span className="font-bold">PKR 2.5 Cr</span>
          </div>
          <div className="flex justify-between text-xs text-[#92400E]">
            <span>Token Amount (~5%)</span>
            <span className="font-semibold">PKR 12.5 Lac</span>
          </div>
          <div className="flex justify-between text-xs text-[#92400E]">
            <span>Registration Fee</span>
            <span className="font-semibold">~PKR 2 Lac</span>
          </div>
        </div>
      </div>
    </div>
  );
}
