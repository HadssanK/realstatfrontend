"use client";

import { useState } from "react";
import FormSection from "@/components/dashboard/add/FormSection";
import FieldLabel from "@/components/dashboard/add/FieldLabel";
import ImageUploader from "@/components/dashboard/add/ImageUploader";

const PROPERTY_TYPES = ["House", "Apartment", "Villa", "Plot", "Commercial"];
const CITIES = [
  "Select City","Karachi","Lahore","Islamabad","Rawalpindi",
  "Faisalabad","Multan","Peshawar","Quetta","Hyderabad","Sialkot",
];
const AMENITIES = [
  { key: "parking",   label: "Parking",        icon: "🚗" },
  { key: "pool",      label: "Swimming Pool",   icon: "🏊" },
  { key: "gym",       label: "Gym",             icon: "🏋️" },
  { key: "generator", label: "Generator",       icon: "⚡" },
  { key: "security",  label: "24/7 Security",   icon: "🔒" },
  { key: "ac",        label: "Central AC",      icon: "❄️" },
  { key: "garden",    label: "Garden",          icon: "🌿" },
  { key: "servant",   label: "Servant Quarter", icon: "🏡" },
];

const iCls = "w-full border border-[#E2E8F0] rounded-xl px-4 py-[11px] text-sm text-[#1E293B] outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all placeholder:text-[#CBD5E1] bg-white";
const eCls = "w-full border border-red-300 rounded-xl px-4 py-[11px] text-sm text-[#1E293B] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-[#CBD5E1] bg-white";

function Stepper({ val, onDec, onInc }) {
  return (
    <div className="flex items-center border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
      <button type="button" onClick={onDec}
        className="w-10 h-11 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors text-lg font-bold border-r border-[#E2E8F0]">−</button>
      <span className="w-12 text-center text-sm font-bold text-[#0F172A]">{val}</span>
      <button type="button" onClick={onInc}
        className="w-10 h-11 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors text-lg font-bold border-l border-[#E2E8F0]">+</button>
    </div>
  );
}

export default function AddPropertyPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const [savedDraft,    setSavedDraft]    = useState(false);
  const [errors,        setErrors]        = useState({});
  const [images,        setImages]        = useState([]);

  const [form, setForm] = useState({
    title: "", description: "", propertyType: "",
    listingType: "sale", price: "",
    bedrooms: 0, bathrooms: 0, area: "",
    amenities: [],
    address: "", city: "Select City", country: "Pakistan",
    lat: "", lng: "",
  });

  function set(field, value) {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: "" }));
  }
  function step(field, dir, min = 0, max = 20) {
    const v = parseInt(form[field]) || 0;
    set(field, Math.min(max, Math.max(min, v + dir)));
  }
  function toggleAmenity(key) {
    setForm(p => ({
      ...p,
      amenities: p.amenities.includes(key)
        ? p.amenities.filter(a => a !== key)
        : [...p.amenities, key],
    }));
  }
  function validate() {
    const e = {};
    if (!form.title.trim())          e.title        = "Required";
    if (!form.description.trim())    e.description  = "Required";
    if (!form.propertyType)          e.propertyType = "Select a type";
    if (!form.price)                 e.price        = "Enter a price";
    if (!form.address.trim())        e.address      = "Required";
    if (form.city === "Select City") e.city         = "Select a city";
    return e;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  }
  function handleDraft() {
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2500);
  }

  return (
    <div className="flex flex-col min-w-0">

      {/* Toast */}
      {(submitted || savedDraft) && (
          <div className={`mx-6 mt-4 flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold
            ${submitted ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        : "bg-blue-50 border border-blue-200 text-blue-700"}`}>
            <span className="text-lg">{submitted ? "✅" : "📝"}</span>
            {submitted ? "Property posted! It will go live after review." : "Draft saved. Continue editing anytime."}
          </div>
        )}

        {/* ── 2-col page layout: form left, summary right ── */}
        <div className="flex-1 px-6 py-6 flex gap-6 items-start max-w-[1200px] w-full mx-auto">

          {/* LEFT — main form */}
          <form onSubmit={handleSubmit} noValidate className="flex-1 min-w-0 flex flex-col gap-6">

            {/* ══ Section 1 — Basic Info ══ */}
            <FormSection number="1" title="Basic Information" subtitle="Title, type, listing mode and price">
              <div className="flex flex-col gap-5">

                {/* Title — full width */}
                <FieldLabel label="Property Title" id="title" required error={errors.title}>
                  <input id="title" type="text" value={form.title}
                    onChange={e => set("title", e.target.value)}
                    placeholder="e.g. Modern 5-Bed House in DHA Phase 6"
                    className={errors.title ? eCls : iCls} />
                </FieldLabel>

                {/* Type + Listing Type — 2 col */}
                <div className="grid grid-cols-2 gap-4">
                  <FieldLabel label="Property Type" id="propertyType" required error={errors.propertyType}>
                    <select id="propertyType" value={form.propertyType}
                      onChange={e => set("propertyType", e.target.value)}
                      className={`${errors.propertyType ? eCls : iCls} appearance-none cursor-pointer`}>
                      <option value="">Select type...</option>
                      {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </FieldLabel>

                  <FieldLabel label="Listing Type" id="listingType">
                    <div className="flex h-[46px] rounded-xl border border-[#E2E8F0] overflow-hidden bg-white">
                      {[{val:"sale",label:"🏷️ For Sale"},{val:"rent",label:"🔑 For Rent"}].map(opt => (
                        <button key={opt.val} type="button" onClick={() => set("listingType", opt.val)}
                          className={`flex-1 text-sm font-bold transition-all duration-150
                            ${form.listingType === opt.val ? "bg-[#F59E0B] text-[#0F172A]" : "text-[#94A3B8] hover:bg-[#F8FAFC]"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </FieldLabel>
                </div>

                {/* Price — full width with PKR prefix */}
                <FieldLabel label="Price (PKR)" id="price" required error={errors.price}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#94A3B8] pointer-events-none">PKR</span>
                    <input id="price" type="number" value={form.price}
                      onChange={e => set("price", e.target.value)}
                      placeholder="e.g. 25000000"
                      className={`${errors.price ? eCls : iCls} pl-14`} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">
                      {form.listingType === "rent" ? "/month" : "/total"}
                    </span>
                  </div>
                </FieldLabel>

                {/* Description — full width */}
                <FieldLabel label="Description" id="description" required error={errors.description}>
                  <textarea id="description" rows={4} value={form.description}
                    onChange={e => set("description", e.target.value)}
                    placeholder="Describe the property — highlights, nearby amenities, condition..."
                    className={`${errors.description ? eCls : iCls} resize-none`} />
                  <p className="text-[11px] text-[#94A3B8] mt-1 text-right">{form.description.length}/1000</p>
                </FieldLabel>
              </div>
            </FormSection>

            {/* ══ Section 2 — Property Details ══ */}
            <FormSection number="2" title="Property Details" subtitle="Rooms, area and available amenities">
              <div className="flex flex-col gap-6">

                {/* Beds + Baths + Area — 3 col */}
                <div className="grid grid-cols-3 gap-4">
                  <FieldLabel label="Bedrooms" id="bedrooms">
                    <Stepper val={form.bedrooms}
                      onDec={() => step("bedrooms",-1)} onInc={() => step("bedrooms",1,0,15)} />
                  </FieldLabel>
                  <FieldLabel label="Bathrooms" id="bathrooms">
                    <Stepper val={form.bathrooms}
                      onDec={() => step("bathrooms",-1)} onInc={() => step("bathrooms",1,0,10)} />
                  </FieldLabel>
                  <FieldLabel label="Area (sqft)" id="area">
                    <input id="area" type="number" value={form.area}
                      onChange={e => set("area", e.target.value)}
                      placeholder="e.g. 2250" className={iCls} />
                  </FieldLabel>
                </div>

                {/* Amenities grid — 4 col */}
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Amenities</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {AMENITIES.map(a => {
                      const on = form.amenities.includes(a.key);
                      return (
                        <label key={a.key}
                          className={`flex items-center gap-2 px-3 py-3 rounded-xl border cursor-pointer transition-all duration-150 select-none
                            ${on ? "border-[#F59E0B] bg-[#FFFBEB] text-[#92400E]"
                                 : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#F59E0B]/50"}`}>
                          <input type="checkbox" checked={on} onChange={() => toggleAmenity(a.key)} className="hidden" />
                          <span className="text-base shrink-0">{a.icon}</span>
                          <span className="text-xs font-medium leading-tight">{a.label}</span>
                          {on && <span className="ml-auto text-[#F59E0B] text-xs font-bold shrink-0">✓</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </FormSection>

            {/* ══ Section 3 — Location ══ */}
            <FormSection number="3" title="Location" subtitle="Help buyers find your property on the map">
              <div className="flex flex-col gap-4">

                {/* Address — full width */}
                <FieldLabel label="Street Address" id="address" required error={errors.address}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">📍</span>
                    <input id="address" type="text" value={form.address}
                      onChange={e => set("address", e.target.value)}
                      placeholder="e.g. Plot 42, Street 5, DHA Phase 6"
                      className={`${errors.address ? eCls : iCls} pl-10`} />
                  </div>
                </FieldLabel>

                {/* City + Country — 2 col */}
                <div className="grid grid-cols-2 gap-4">
                  <FieldLabel label="City" id="city" required error={errors.city}>
                    <select id="city" value={form.city} onChange={e => set("city", e.target.value)}
                      className={`${errors.city ? eCls : iCls} appearance-none cursor-pointer`}>
                      {CITIES.map(c => <option key={c} value={c} disabled={c==="Select City"}>{c}</option>)}
                    </select>
                  </FieldLabel>
                  <FieldLabel label="Country" id="country">
                    <input id="country" type="text" value={form.country}
                      onChange={e => set("country", e.target.value)}
                      placeholder="Pakistan" className={iCls} />
                  </FieldLabel>
                </div>

                {/* Lat + Lng — 2 col */}
                <div className="grid grid-cols-2 gap-4">
                  <FieldLabel label="Latitude" id="lat">
                    <input id="lat" type="number" step="any" value={form.lat}
                      onChange={e => set("lat", e.target.value)}
                      placeholder="e.g. 24.8607" className={iCls} />
                  </FieldLabel>
                  <FieldLabel label="Longitude" id="lng">
                    <input id="lng" type="number" step="any" value={form.lng}
                      onChange={e => set("lng", e.target.value)}
                      placeholder="e.g. 67.0011" className={iCls} />
                  </FieldLabel>
                </div>

                {/* Map placeholder */}
                <div className="w-full h-[160px] rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9] flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage:"linear-gradient(#94A3B8 1px,transparent 1px),linear-gradient(90deg,#94A3B8 1px,transparent 1px)",
                    backgroundSize:"36px 36px"}} />
                  <span className="relative z-10 text-3xl">🗺️</span>
                  <p className="relative z-10 text-xs font-semibold text-[#64748B]">Map preview — enter coordinates above</p>
                </div>
              </div>
            </FormSection>

            {/* ══ Section 4 — Images ══ */}
            <FormSection number="4" title="Property Images" subtitle="Upload up to 8 photos · First image = main cover">
              <ImageUploader images={images} onChange={setImages} />
            </FormSection>

            {/* ══ Submit bar ══ */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#0F172A]">Ready to publish?</p>
                <p className="text-xs text-[#94A3B8] mt-[2px]">Listing goes live after a quick review (~2 hours).</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button type="button" onClick={handleDraft}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-[#E2E8F0] bg-white text-[#475569] text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#F8FAFC] transition-all">
                  📝 Save Draft
                </button>
                <button type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#F59E0B] text-[#0F172A] text-sm font-bold px-7 py-3 rounded-xl hover:bg-[#D97706] active:scale-[0.98] transition-all">
                  🚀 Post Property
                </button>
              </div>
            </div>

          </form>{/* end LEFT */}

          {/* RIGHT — sticky summary sidebar */}
          <aside className="hidden xl:flex flex-col gap-4 w-[280px] shrink-0">
            <div className="sticky top-20 flex flex-col gap-4">

              {/* Live Preview Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] h-[120px] flex items-center justify-center text-5xl relative">
                  {form.propertyType === "House"      ? "🏡" :
                   form.propertyType === "Apartment"  ? "🏢" :
                   form.propertyType === "Villa"      ? "🏖️" :
                   form.propertyType === "Plot"       ? "🏗️" :
                   form.propertyType === "Commercial" ? "🏪" : "🏠"}
                  {form.propertyType && (
                    <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-[3px] rounded-md
                      ${form.listingType === "sale" ? "bg-[#0F6E56]" : "bg-[#185FA5]"}`}>
                      {form.listingType === "sale" ? "For Sale" : "For Rent"}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold text-[#0F172A] text-sm leading-snug mb-1 line-clamp-2">
                    {form.title || <span className="text-[#CBD5E1] font-normal">Property title will appear here</span>}
                  </p>
                  {form.price && (
                    <p className="text-[#F59E0B] font-extrabold text-base mb-1">
                      PKR {parseInt(form.price).toLocaleString()}
                      <span className="text-[#94A3B8] text-xs font-normal ml-1">
                        {form.listingType === "rent" ? "/month" : "/total"}
                      </span>
                    </p>
                  )}
                  {(form.city !== "Select City" || form.address) && (
                    <p className="text-xs text-[#64748B] flex items-center gap-1">
                      📍 {[form.address, form.city !== "Select City" ? form.city : ""].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {(form.bedrooms > 0 || form.bathrooms > 0 || form.area) && (
                    <div className="flex gap-3 mt-3 pt-3 border-t border-[#F1F5F9]">
                      {form.bedrooms > 0  && <span className="text-xs text-[#64748B]">🛏️ {form.bedrooms}</span>}
                      {form.bathrooms > 0 && <span className="text-xs text-[#64748B]">🚿 {form.bathrooms}</span>}
                      {form.area          && <span className="text-xs text-[#64748B]">📐 {form.area} sqft</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4">
                <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Listing Checklist</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Title added",        done: !!form.title.trim() },
                    { label: "Type selected",       done: !!form.propertyType },
                    { label: "Price set",           done: !!form.price },
                    { label: "Description written", done: form.description.length > 30 },
                    { label: "Address provided",    done: !!form.address.trim() },
                    { label: "City selected",       done: form.city !== "Select City" },
                    { label: "Photos uploaded",     done: images.length > 0 },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                        ${item.done ? "bg-[#0F6E56] text-white" : "bg-[#F1F5F9] text-[#CBD5E1]"}`}>
                        {item.done ? "✓" : "·"}
                      </span>
                      <span className={`text-xs ${item.done ? "text-[#1E293B] font-medium" : "text-[#94A3B8]"}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Completion bar */}
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-[#94A3B8] font-semibold">Completeness</span>
                    <span className="text-[10px] font-bold text-[#0F172A]">
                      {Math.round(([!!form.title.trim(),!!form.propertyType,!!form.price,form.description.length>30,!!form.address.trim(),form.city!=="Select City",images.length>0].filter(Boolean).length / 7) * 100)}%
                    </span>
                  </div>
                  <div className="h-[6px] bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                      style={{width:`${Math.round(([!!form.title.trim(),!!form.propertyType,!!form.price,form.description.length>30,!!form.address.trim(),form.city!=="Select City",images.length>0].filter(Boolean).length/7)*100)}%`}} />
                  </div>
                </div>
              </div>

              {/* Tips card */}
              <div className="bg-[#FFFBEB] border border-[#F59E0B]/30 rounded-2xl p-4">
                <p className="text-xs font-bold text-[#92400E] mb-2">💡 Tips for better listings</p>
                <ul className="flex flex-col gap-1">
                  {["Add at least 5 clear photos","Write 100+ word description","Include exact address for more views"].map(t => (
                    <li key={t} className="text-[11px] text-[#78350F] flex items-start gap-1">
                      <span className="mt-[2px] shrink-0">•</span>{t}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>{/* end RIGHT */}

        </div>{/* end 2-col */}
      </div>
    
  );
}
