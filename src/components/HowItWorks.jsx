const steps = [
  {
    num: 1,
    title: "Search Property",
    desc: "Filter by location, type, price range and find your perfect match",
  },
  {
    num: 2,
    title: "Connect with Agent",
    desc: "Send inquiry directly to verified agents and schedule a visit",
  },
  {
    num: 3,
    title: "Move In!",
    desc: "Finalize the deal and get the keys to your dream property",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-8 py-12 max-w-[900px] mx-auto text-center">
      {/* Section Label */}
      <div className="text-xs font-bold text-[#F59E0B] tracking-[1.5px] uppercase mb-2">
        Simple Process
      </div>

      {/* Section Title */}
      <div className="text-[26px] font-extrabold text-[#0F172A] mb-8">
        How PropFind Works
      </div>

      {/* Steps */}
      <div className="grid grid-cols-3 gap-8 relative">
        {/* Dashed connector line */}
        <div
          className="absolute top-7 left-[20%] right-[20%] h-[2px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #F59E0B 0, #F59E0B 8px, transparent 8px, transparent 16px)",
          }}
        />

        {steps.map((step) => (
          <div key={step.num} className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#F59E0B] text-[#0F172A] text-xl font-extrabold flex items-center justify-center mx-auto mb-4">
              {step.num}
            </div>
            <h3 className="text-[15px] font-bold mb-2">{step.title}</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
