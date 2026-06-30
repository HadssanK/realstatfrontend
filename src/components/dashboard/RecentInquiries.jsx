"use client";

import { useState } from "react";

const INITIAL = [
  {
    id: 1,
    buyer: "Usman Tariq",
    initials: "UT",
    avatarGrad: "from-[#185FA5] to-[#0C447C]",
    property: "Modern 5-Bed House in DHA",
    date: "Today, 10:24 AM",
    message: "Hi, I'm very interested in this property. Can we schedule a visit this weekend? Please let me know a suitable time.",
    read: false,
  },
  {
    id: 2,
    buyer: "Sara Malik",
    initials: "SM",
    avatarGrad: "from-[#BE185D] to-[#9D174D]",
    property: "Luxury Apartment Clifton",
    date: "Yesterday, 3:15 PM",
    message: "Is the apartment still available for rent? I'm looking for immediate possession. Kindly share more photos.",
    read: false,
  },
  {
    id: 3,
    buyer: "Bilal Raza",
    initials: "BR",
    avatarGrad: "from-[#0F6E56] to-[#064E3B]",
    property: "10 Marla Residential Plot",
    date: "28 Jun, 11:00 AM",
    message: "What is the exact location of the plot? Is it near the main gate? Also, is the price negotiable?",
    read: true,
  },
];

export default function RecentInquiries() {
  const [inquiries, setInquiries] = useState(INITIAL);

  function markRead(id) {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: true } : i))
    );
  }

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-[#0F172A]">Recent Inquiries</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <a href="#" className="text-xs font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors">
          View all →
        </a>
      </div>

      {/* Inquiry list */}
      <div className="divide-y divide-[#F1F5F9]">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className={`px-6 py-4 transition-colors ${inq.read ? "" : "bg-[#FFFBEB]/40"}`}
          >
            <div className="flex items-start gap-4">

              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${inq.avatarGrad} flex items-center justify-center text-xs font-extrabold text-white shrink-0 select-none`}>
                {inq.initials}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F172A]">{inq.buyer}</span>
                      {!inq.read && (
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] mt-[1px]">
                      Re:{" "}
                      <span className="text-[#475569] font-medium">{inq.property}</span>
                    </p>
                  </div>
                  <span className="text-[11px] text-[#94A3B8] whitespace-nowrap shrink-0">{inq.date}</span>
                </div>

                {/* Message preview */}
                <p className="text-sm text-[#64748B] mt-2 leading-relaxed line-clamp-2">
                  {inq.message}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <button className="text-xs font-semibold text-white bg-[#0F172A] px-3 py-[6px] rounded-lg hover:bg-[#1E293B] transition-colors">
                    Reply
                  </button>
                  {!inq.read && (
                    <button
                      onClick={() => markRead(inq.id)}
                      className="text-xs font-semibold text-[#F59E0B] border border-[#F59E0B]/40 px-3 py-[6px] rounded-lg hover:bg-[#FFFBEB] transition-colors"
                    >
                      ✓ Mark as Read
                    </button>
                  )}
                  {inq.read && (
                    <span className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                      ✓ Read
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
