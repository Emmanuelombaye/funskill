import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Chess", to: "/chess" },
  { label: "Skating", to: "/skating" },
  { label: "Ballet", to: "/ballet" },
  { label: "Taekwondo", to: "/taekwondo" },
  { label: "Schools", to: "/schools" },
  { label: "Coaches", to: "/coaches" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "rgba(8,12,26,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,215,0,0.12)" }}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
            FS
          </div>
          <span className="font-display font-black text-xl tracking-wide" style={{ color: "#ffffff" }}>
            Fun<span style={{ color: "#FFD700" }}>Skill</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium transition-colors"
              style={{ color: pathname === l.to ? "#FFD700" : "rgba(255,255,255,0.65)", fontFamily: "Outfit, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/book"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", fontFamily: "Outfit, sans-serif" }}
          >
            Book a Trial
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 transition-all" style={{ backgroundColor: "#FFD700", transform: open ? "rotate(45deg) translate(4px,4px)" : "none" }} />
          <span className="block w-6 h-0.5 transition-all" style={{ backgroundColor: "#FFD700", opacity: open ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-all" style={{ backgroundColor: "#FFD700", transform: open ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden px-4 pb-6 pt-2 flex flex-col gap-3" style={{ borderTop: "1px solid rgba(255,215,0,0.12)" }}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-base font-medium py-2"
              style={{ color: pathname === l.to ? "#FFD700" : "rgba(255,255,255,0.75)", fontFamily: "Outfit, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 rounded-full text-sm font-semibold text-center"
            style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}
          >
            Book a Trial
          </Link>
        </div>
      )}
    </header>
  );
}
