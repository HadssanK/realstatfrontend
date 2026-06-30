"use client";

import { useState, useRef, useCallback } from "react";

const MAX_IMAGES = 8;

export default function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function processFiles(files) {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const remaining = MAX_IMAGES - images.length;
    const toAdd = valid.slice(0, remaining).map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    if (toAdd.length) onChange([...images, ...toAdd]);
  }

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [images]
  );

  function removeImage(id) {
    onChange(images.filter((img) => img.id !== id));
  }

  function setMain(id) {
    const reordered = [
      images.find((i) => i.id === id),
      ...images.filter((i) => i.id !== id),
    ];
    onChange(reordered);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl px-6 py-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none
          ${dragging
            ? "border-[#F59E0B] bg-[#FFFBEB]"
            : "border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#F59E0B] hover:bg-[#FFFBEB]/40"
          }
          ${images.length >= MAX_IMAGES ? "pointer-events-none opacity-50" : ""}`}
      >
        <span className="text-4xl mb-3">🖼️</span>
        <p className="text-sm font-bold text-[#1E293B] mb-1">
          Click to upload or drag images here
        </p>
        <p className="text-xs text-[#94A3B8]">
          PNG, JPG, WEBP up to 5MB · Max {MAX_IMAGES} images
          {images.length > 0 && ` · ${images.length}/${MAX_IMAGES} added`}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {images.map((img, idx) => (
            <div key={img.id} className="relative group aspect-square">
              {/* Thumbnail */}
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover rounded-xl border border-[#E2E8F0]"
              />

              {/* Main badge */}
              {idx === 0 && (
                <span className="absolute top-1 left-1 bg-[#F59E0B] text-[#0F172A] text-[9px] font-extrabold px-[6px] py-[2px] rounded-md leading-tight">
                  MAIN
                </span>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setMain(img.id); }}
                    title="Set as main"
                    className="text-[10px] font-bold text-white bg-[#F59E0B] rounded px-[6px] py-[2px]"
                  >
                    Set Main
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                  title="Remove"
                  className="text-[10px] font-bold text-white bg-red-500 rounded px-[6px] py-[2px]"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Add more slot */}
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center text-[#94A3B8] hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors"
            >
              <span className="text-xl">➕</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
