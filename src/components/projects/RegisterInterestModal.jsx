"use client";

import { useState, useEffect } from "react";

export default function RegisterInterestModal({ project, onClose }) {
  const [form, setForm]       = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  /* Prevent body scroll while open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1200);
  }

  const iCls = "w-full border border-[#E2E8F0] rounded-xl px-4 py-[10px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all placeholder:text-[#CBD5E1]";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-[#F1F5F9]">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Register Interest</h2>
            <p className="text-xs text-[#64748B] mt-[2px]">{project?.name}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:bg-[#E2E8F0] transition-colors text-sm shrink-0">
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          {sent ? (
            <div className="flex flex-col items-center py-8 text-center">
              <span className="text-5xl mb-4">✅</span>
              <p className="font-bold text-[#0F172A] text-base mb-1">Interest Registered!</p>
              <p className="text-sm text-[#64748B] mb-5">
                Our team will contact you within 24 hours with more details.
              </p>
              <button onClick={onClose}
                className="bg-[#F59E0B] text-[#0F172A] font-bold text-sm px-6 py-2 rounded-xl hover:bg-[#D97706] transition-colors">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Full Name *</label>
                  <input name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="Your name" required className={iCls} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Phone *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                    placeholder="+92 300 ..." required className={iCls} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className={iCls} />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Message</label>
                <textarea name="message" rows={3} value={form.message} onChange={handleChange}
                  placeholder={`I'm interested in ${project?.name}. Please send me more details.`}
                  className={`${iCls} resize-none`} />
              </div>
              <button type="submit" disabled={loading}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all
                  ${loading ? "bg-[#FCD34D] text-[#92400E] cursor-not-allowed" : "bg-[#F59E0B] text-[#0F172A] hover:bg-[#D97706]"}`}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Submitting...
                  </span>
                ) : "Register My Interest"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
