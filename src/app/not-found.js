import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | PropFind",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <Link href="/" className="mb-10">
        <span className="text-[#F59E0B] text-2xl font-extrabold tracking-tight">
          Prop<span className="text-[#0F172A]">Find</span>
        </span>
      </Link>

      {/* Illustration */}
      <div className="w-28 h-28 rounded-full bg-[#F1F5F9] flex items-center justify-center text-6xl mb-6 select-none">
        🏚️
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-[#0F172A] mb-3">404</h1>
      <h2 className="text-xl font-bold text-[#1E293B] mb-3">Page Not Found</h2>
      <p className="text-sm text-[#64748B] max-w-sm mb-8 leading-relaxed">
        Looks like this property doesn&apos;t exist — or it may have been removed.
        Let&apos;s get you back on the right track.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="bg-[#F59E0B] text-[#0F172A] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#D97706] transition-colors"
        >
          🏠 Go Home
        </Link>
        <Link
          href="/properties"
          className="border border-[#E2E8F0] bg-white text-[#475569] font-semibold text-sm px-6 py-3 rounded-xl hover:border-[#F59E0B] hover:text-[#0F172A] transition-colors"
        >
          Browse Properties
        </Link>
      </div>

      {/* Quick links */}
      <div className="flex items-center gap-4 mt-10 text-xs text-[#94A3B8]">
        <Link href="/agents" className="hover:text-[#F59E0B] transition-colors">Find Agents</Link>
        <span>·</span>
        <Link href="/login" className="hover:text-[#F59E0B] transition-colors">Login</Link>
        <span>·</span>
        <Link href="/register" className="hover:text-[#F59E0B] transition-colors">Register</Link>
      </div>
    </div>
  );
}
