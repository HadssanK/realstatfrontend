"use client";

export default function Navbar() {
  return (
    <nav className="bg-[#0F172A] px-8 flex items-center justify-between h-16 sticky top-0 z-[100]">
      {/* Logo */}
      <div className="text-[#F59E0B] text-xl font-bold tracking-tight">
        Prop<span className="text-white">Find</span>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6 items-center">
        <a href="/properties" className="text-[#94A3B8] text-sm no-underline hover:text-white transition-colors duration-200">
          Buy
        </a>
        <a href="/properties" className="text-[#94A3B8] text-sm no-underline hover:text-white transition-colors duration-200">
          Rent
        </a>
        <a href="#" className="text-[#94A3B8] text-sm no-underline hover:text-white transition-colors duration-200">
          Agents
        </a>
        <a href="#" className="text-[#94A3B8] text-sm no-underline hover:text-white transition-colors duration-200">
          Projects
        </a>
        <a href="/login" className="text-[#94A3B8] text-sm no-underline hover:text-white transition-colors duration-200">
          Login
        </a>
      </div>

      {/* CTA Button */}
      <button className="bg-[#F59E0B] text-[#0F172A] border-none px-[18px] py-2 rounded-md text-sm font-semibold cursor-pointer">
        + Post Property
      </button>
    </nav>
  );
}
