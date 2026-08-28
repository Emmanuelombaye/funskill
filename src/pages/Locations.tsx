import { useState } from "react";

const locations = [
  { city: "London", venues: ["Shoreditch Academy", "Brixton Sports Hub", "Canary Wharf Centre", "North London Arena"], img: "photo-1513635269975-59663e0ac1ad" },
  { city: "Manchester", venues: ["Northern Quarter Hub", "Salford Skills Centre"], img: "photo-1529655683826-aba9b3e77383" },
  { city: "Birmingham", venues: ["Digbeth Academy", "Edgbaston Sports Complex"], img: "photo-1570168007204-dfb528c6958f" },
  { city: "Edinburgh", venues: ["Old Town Academy"], img: "photo-1506377711776-dbdc2f3c20d9" },
];

export default function Locations() {
  const [search, setSearch] = useState("");

  const filtered = locations.filter((l) =>
    l.city.toLowerCase().includes(search.toLowerCase()) ||
    l.venues.some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-nav">
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Find Us</p>
          <h1 className="font-display font-black text-6xl md:text-7xl mb-6" style={{ color: "#ffffff" }}>Find a FunSkill<br />Kids Club Near You</h1>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>10+ locations across the UK and growing.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="text"
              placeholder="Search city or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full text-sm outline-none"
              style={{ backgroundColor: "#141414", color: "#ffffff", border: "1px solid rgba(255,215,0,0.2)" }}
            />
            <button className="px-6 py-3 rounded-full font-semibold text-sm" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: "rgba(255,255,255,0.4)" }}>No locations found. Try a different search.</div>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((l) => (
              <div key={l.city} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="h-48 overflow-hidden">
                  <img src={`https://images.unsplash.com/${l.img}?w=700&h=300&fit=crop&auto=format`} alt={l.city} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="font-display font-black text-3xl mb-4" style={{ color: "#ffffff" }}>{l.city}</h2>
                  <ul className="space-y-2">
                    {l.venues.map((v) => (
                      <li key={v} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                        <span style={{ color: "#FFD700" }}>📍</span> {v}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-5 px-5 py-2 rounded-full text-sm font-semibold" style={{ border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
