import { Link } from "react-router-dom";

const features = [
  { title: "Critical Thinking", desc: "Every move teaches children to plan ahead and evaluate consequences." },
  { title: "Pattern Recognition", desc: "Hundreds of tactical patterns that sharpen memory and attention." },
  { title: "Emotional Regulation", desc: "Managing wins and losses builds resilience for life." },
  { title: "Competition Ready", desc: "Regular club and tournament play from the earliest levels." },
];

export default function Chess() {
  return (
    <div className="pt-16">
      <section className="relative min-h-[60vh] flex items-end overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <img src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=1600&h=800&fit=crop&auto=format" alt="Chess" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000000 30%, transparent 100%)" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #FFD700, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 pb-20 w-full">
          <p className="font-display font-bold text-xl tracking-widest mb-3" style={{ color: "#FFD700" }}>THINK. STRATEGIZE. WIN.</p>
          <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: "clamp(3rem,8vw,7rem)", color: "#ffffff" }}>Chess<br />Program</h1>
          <p className="text-lg max-w-xl mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
            From first moves to tournament victories — our Chess program builds champions on and off the board.
          </p>
          <Link to="/book" className="inline-flex px-8 py-4 rounded-full font-semibold text-base" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
            Book a Chess Trial
          </Link>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.1)" }}>
              <div className="w-8 h-1 rounded mb-4" style={{ backgroundColor: "#FFD700" }} />
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#ffffff" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display font-black text-5xl mb-6" style={{ color: "#ffffff" }}>Age-Based Chess Pathways</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-10 text-left">
            {[
              { name: "Tiny Champions (4–6)", items: ["Piece recognition", "Board setup", "Capturing games", "Fun mini-formats"] },
              { name: "Young Explorers (7–10)", items: ["Opening principles", "Checkmate patterns", "Simple endgames", "Club tournaments"] },
              { name: "Rising Stars (11–14)", items: ["Opening repertoire", "Tactical motifs", "Positional play", "Regional events"] },
              { name: "Future Champions (15+)", items: ["Advanced strategy", "Game database analysis", "Rated OTB & online play", "National competition"] },
            ].map((lvl) => (
              <div key={lvl.name} className="p-6 rounded-2xl" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 className="font-display font-bold text-xl mb-4" style={{ color: "#FFD700" }}>{lvl.name}</h3>
                <ul className="space-y-2">
                  {lvl.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      <span style={{ color: "#FFD700" }}>→</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
