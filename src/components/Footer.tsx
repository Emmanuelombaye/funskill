import { Link } from "react-router-dom";

const programs = [
  { label: "Chess", to: "/chess" },
  { label: "Roller Skating", to: "/skating" },
  { label: "Ballet", to: "/ballet" },
  { label: "Taekwondo", to: "/taekwondo" },
  { label: "All Programs", to: "/programs" },
  { label: "Schools", to: "/schools" },
];

const company = [
  { label: "About Us", to: "/about" },
  { label: "Coaches", to: "/coaches" },
  { label: "Locations", to: "/locations" },
  { label: "Contact", to: "/contact" },
  { label: "Portals", to: "/portal/login" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#000000", borderTop: "1px solid rgba(255,215,0,0.15)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
                FS
              </div>
              <span className="font-display font-black text-xl" style={{ color: "#ffffff" }}>
                Fun<span style={{ color: "#FFD700" }}>Skill</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              A premium multi-skill kids club helping children learn, compete, and grow through Chess and Roller Skating.
            </p>
            <div className="flex gap-3">
              {["instagram", "facebook", "youtube", "twitter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all hover:scale-110"
                  style={{ border: "1px solid rgba(255,215,0,0.3)", color: "rgba(255,255,255,0.6)" }}
                >
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-display font-bold text-lg mb-5 tracking-wide" style={{ color: "#FFD700" }}>PROGRAMS</h3>
            <ul className="space-y-3">
              {programs.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-lg mb-5 tracking-wide" style={{ color: "#FFD700" }}>COMPANY</h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-5 tracking-wide" style={{ color: "#FFD700" }}>STAY IN THE LOOP</h3>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>Get updates on new programs, events, and trial offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "#ffffff", border: "1px solid rgba(255,215,0,0.2)" }}
              />
              <button
                className="px-4 py-2 rounded-full text-sm font-semibold shrink-0"
                style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 FunSkill Kids Club. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>Privacy Policy</a>
            <a href="#" className="text-xs hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
