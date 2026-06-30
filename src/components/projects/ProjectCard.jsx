"use client";

import Link from "next/link";
import { STATUS_CFG } from "@/data/projects";

export default function ProjectCard({ project, onRegisterInterest }) {
  const statusCfg = STATUS_CFG[project.status];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-[3px] transition-all duration-200 flex flex-col">

      {/* ── Image placeholder ── */}
      <div className={`h-[160px] bg-gradient-to-br ${project.grad} relative flex items-center justify-center shrink-0`}>
        {/* Project logo initial */}
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-extrabold text-white border border-white/30 select-none">
          {project.initial}
        </div>

        {/* Status badge */}
        <span className={`absolute top-3 left-3 text-[11px] font-bold px-[10px] py-1 rounded-md ${statusCfg.cls}`}>
          {statusCfg.label}
        </span>

        {/* Featured */}
        {project.featured && (
          <span className="absolute top-3 right-3 bg-[#F59E0B] text-[#0F172A] text-[11px] font-bold px-[10px] py-1 rounded-md">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col flex-1 gap-3">

        {/* Name + developer */}
        <div>
          <h3 className="font-extrabold text-[#0F172A] text-base leading-tight mb-1">{project.name}</h3>
          <p className="text-xs text-[#64748B] flex items-center gap-1">
            🏢 {project.developer}
            {project.verified && <span className="text-[#0F6E56] font-bold">✓</span>}
          </p>
        </div>

        {/* Location */}
        <p className="text-xs text-[#64748B] flex items-center gap-1">
          📍 {project.location}
        </p>

        {/* Price range */}
        <div className="bg-[#F8FAFC] rounded-xl px-3 py-2">
          <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-[2px]">Price Range</p>
          <p className="text-sm font-extrabold text-[#0F172A]">{project.priceRange}</p>
        </div>

        {/* Type tag */}
        <span className="self-start bg-[#F1F5F9] text-[#475569] text-[11px] font-semibold px-3 py-1 rounded-full border border-[#E2E8F0]">
          {project.type}
        </span>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F1F5F9]">
          <div className="text-center">
            <p className="text-sm font-extrabold text-[#0F172A]">{project.units}</p>
            <p className="text-[10px] text-[#94A3B8]">Units</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-extrabold text-[#0F172A]">{project.floors}</p>
            <p className="text-[10px] text-[#94A3B8]">Floors</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-extrabold text-[#0F172A] leading-tight">{project.completion}</p>
            <p className="text-[10px] text-[#94A3B8]">Completion</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto pt-1">
          <Link href={`/projects/${project.id}`}
            className="flex-1 text-center bg-[#F59E0B] text-[#0F172A] text-xs font-bold py-[9px] rounded-xl hover:bg-[#D97706] transition-colors no-underline">
            View Details
          </Link>
          <button onClick={() => onRegisterInterest(project)}
            className="flex-1 border border-[#F59E0B] text-[#F59E0B] text-xs font-bold py-[9px] rounded-xl hover:bg-[#FFFBEB] transition-colors">
            Register Interest
          </button>
        </div>
      </div>
    </div>
  );
}
