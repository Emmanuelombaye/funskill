import { useState } from "react";
import { Link } from "react-router-dom";

const programs = [
  {
    age: "Ages 4–6",
    name: "Tiny Champions",
    desc: "Play-based discovery sessions designed to ignite curiosity. Children explore Chess and Skating in a safe, joyful environment with coach-to-child ratios of 1:4.",
    chess: ["Introduction to pieces", "Basic movement", "Game rules through stories", "Mini games"],
    skating: ["First steps on skates", "Balance fundamentals", "Falling safely", "Rolling games"],
    icon: "★",
    color: "#FFD700",
  },
  {
    age: "Ages 7–10",
    name: "Young Explorers",
    desc: "Structured skill-building with friendly competition. Children develop core techniques and begin entering local club events and friendly matches.",
    chess: ["Opening principles", "Tactical patterns", "Endgame basics", "Tournament play"],
    skating: ["Speed control", "Forward stops", "Crossovers", "Slalom basics"],
    icon: "⚡",
    color: "#FFD700",
  },
  {
    age: "Ages 11–14",
    name: "Rising Stars",
    desc: "Advanced training focused on tactical depth and competitive performance. Rising Stars compete at regional and national level events.",
    chess: ["Advanced openings", "Deep calculation", "Strategic planning", "National tournaments"],
    skating: ["Speed drills", "Advanced manoeuvres", "Ramp introduction", "Regional competition"],
    icon: "◆",
    color: "#ffffff",
  },
  {
    age: "Ages 15+",
    name: "Future Champions",
    desc: "Elite-level coaching for those pursuing competitive excellence. Intensive sessions, sport psychology, and personalized development plans.",
    chess: ["Master-level analysis", "Opening repertoire", "Online & OTB competition", "Rating improvement"],
    skating: ["Pro-level tricks", "Competition training", "Strength & conditioning", "National & international"],
    icon: "▲",
    color: "#FFD700",
  },
];

export default function Programs() {
  const [activeSkill, setActiveSkill] = useState<"chess" | "skating" | "both">("both");

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="relative max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Programs</p>
          <h1 className="font-display font-black text-6xl md:text-7xl mb-6" style={{ color: "#ffffff" }}>Find Your Level</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            From first steps to championship level — we have a program for every age and ability.
          </p>
          <div className="flex justify-center gap-2 mt-8">
            {(["both", "chess", "skating"] as const).map((f) => (
              <button key={f} onClick={() => setActiveSkill(f)} className="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all"
                style={activeSkill === f ? { background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" } : { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {f === "both" ? "All Skills" : f === "chess" ? "Chess" : "Skating"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs grid */}
      <section className="py-16 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto space-y-8">
          {programs.map((p) => (
            <div key={p.name} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="grid md:grid-cols-3">
                <div className="p-8 md:p-10" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="font-display font-black text-5xl mb-2" style={{ color: p.color }}>{p.icon}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{p.age}</div>
                  <h2 className="font-display font-black text-3xl mb-4" style={{ color: "#ffffff" }}>{p.name}</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>{p.desc}</p>
                  <Link to="/book" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
                    Book Trial
                  </Link>
                </div>
                {(activeSkill === "both" || activeSkill === "chess") && (
                  <div className="p-8 md:p-10" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#FFD700", color: "#000000" }}>♟</div>
                      <span className="font-display font-bold text-lg" style={{ color: "#FFD700" }}>CHESS</span>
                    </div>
                    <ul className="space-y-3">
                      {p.chess.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                          <span style={{ color: "#FFD700" }}>→</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(activeSkill === "both" || activeSkill === "skating") && (
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#ffffff", color: "#000000" }}>⛸</div>
                      <span className="font-display font-bold text-lg" style={{ color: "#ffffff" }}>SKATING</span>
                    </div>
                    <ul className="space-y-3">
                      {p.skating.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                          <span style={{ color: "#ffffff" }}>→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
