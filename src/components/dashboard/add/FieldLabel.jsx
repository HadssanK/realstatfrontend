// Reusable labelled field
export default function FieldLabel({ label, id, required, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-[6px]"
      >
        {label}
        {required && <span className="text-red-400 ml-[3px]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-500 mt-[5px] flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
