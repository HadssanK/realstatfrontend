const stats = [
  { num: "500+", label: "Active Listings" },
  { num: "200+", label: "Verified Agents" },
  { num: "50+", label: "Cities Covered" },
  { num: "98%", label: "Happy Clients" },
];

export default function Stats() {
  return (
    <section className="bg-[#0F172A] py-10 my-4">
      <div className="max-w-[900px] mx-auto grid grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center px-5 ${
              index < stats.length - 1 ? "border-r border-[rgba(255,255,255,0.1)]" : ""
            }`}
          >
            <div className="text-[36px] font-extrabold text-[#F59E0B]">{stat.num}</div>
            <div className="text-sm text-[#94A3B8] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
