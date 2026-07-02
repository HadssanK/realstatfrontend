"use client";

/**
 * @param {{ isOpen: boolean, propertyTitle: string, onConfirm: ()=>void, onCancel: ()=>void }} props
 */
export default function DeleteModal({ isOpen, propertyTitle, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

        {/* Red warning icon */}
        <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
          <span className="text-red-500 text-3xl">🗑️</span>
        </div>

        {/* Heading */}
        <h2 className="text-[#1E293B] text-xl font-bold text-center">
          Delete Property?
        </h2>

        {/* Property name */}
        <p className="text-[#F59E0B] font-semibold text-center text-sm mt-1">
          &ldquo;{propertyTitle}&rdquo;
        </p>

        {/* Warning text */}
        <p className="text-[#64748B] text-sm text-center mt-3 leading-relaxed">
          This action cannot be undone. This property and all its data will be permanently deleted.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-[#E2E8F0] text-[#64748B] font-medium py-3 rounded-xl hover:bg-[#F8FAFC] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors duration-200"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
