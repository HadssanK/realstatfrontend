// Reusable section wrapper with numbered heading
export default function FormSection({ number, title, subtitle, children }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-[#F1F5F9]">
        <span className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#0F172A] text-sm font-extrabold flex items-center justify-center shrink-0">
          {number}
        </span>
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">{title}</h2>
          {subtitle && <p className="text-xs text-[#94A3B8] mt-[1px]">{subtitle}</p>}
        </div>
      </div>
      {/* Content */}
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}
