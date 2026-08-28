import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Schools", to: "/schools" },
  { label: "Coaches", to: "/coaches" },
  { label: "Contact", to: "/contact" },
];

const skills = [
  { label: "Chess", to: "/chess", icon: "♟" },
  { label: "Skating", to: "/skating", icon: "⛸" },
  { label: "Ballet", to: "/ballet", icon: "🩰" },
  { label: "Taekwondo", to: "/taekwondo", icon: "🥋" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const { pathname } = useLocation();
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillActive = skills.some((s) => pathname === s.to);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (skillsRef.current && !skillsRef.current.contains(e.target as Node)) {
        setSkillsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSkillsOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(8,12,26,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,215,0,0.12)",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between h-16"
        style={{
          paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
          paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
        }}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
            FS
          </div>
          <span className="font-display font-black text-xl tracking-wide" style={{ color: "#ffffff" }}>
            Fun<span style={{ color: "#FFD700" }}>Skill</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.slice(0, 1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium transition-colors"
              style={{ color: (l.to === "/coaches" ? pathname.startsWith("/coaches") : pathname === l.to) ? "#FFD700" : "rgba(255,255,255,0.65)", fontFamily: "Outfit, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}

          <div className="relative" ref={skillsRef}>
            <button
              type="button"
              onClick={() => setSkillsOpen((v) => !v)}
              className="text-sm font-medium transition-colors inline-flex items-center gap-1.5"
              style={{ color: skillActive || skillsOpen ? "#FFD700" : "rgba(255,255,255,0.65)", fontFamily: "Outfit, sans-serif" }}
              aria-expanded={skillsOpen}
              aria-haspopup="true"
            >
              Skills
              <span className="text-[10px] leading-none" style={{ transform: skillsOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.15s" }}>▾</span>
            </button>
            {skillsOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 p-2 grid grid-cols-2 gap-2 rounded-2xl"
                style={{
                  backgroundColor: "rgba(12,16,32,0.98)",
                  border: "1px solid rgba(255,215,0,0.18)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.55)",
                  minWidth: "320px",
                }}
              >
                {skills.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors"
                    style={{
                      backgroundColor: pathname === s.to ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.03)",
                      border: pathname === s.to ? "1px solid rgba(255,215,0,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span className="text-lg w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,215,0,0.12)" }}>{s.icon}</span>
                    <span className="text-sm font-medium" style={{ color: pathname === s.to ? "#FFD700" : "#ffffff", fontFamily: "Outfit, sans-serif" }}>{s.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium transition-colors"
              style={{ color: (l.to === "/coaches" ? pathname.startsWith("/coaches") : pathname === l.to) ? "#FFD700" : "rgba(255,255,255,0.65)", fontFamily: "Outfit, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/portal/login"
            className="text-sm font-medium"
            style={{ color: pathname.startsWith("/portal") ? "#FFD700" : "rgba(255,255,255,0.65)", fontFamily: "Outfit, sans-serif" }}
          >
            Portal
          </Link>
          <Link
            to="/book"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", fontFamily: "Outfit, sans-serif" }}
          >
            Book a Trial
          </Link>
        </div>

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

      {open && (
        <div
          className="lg:hidden pb-6 pt-2 flex flex-col gap-1"
          style={{
            borderTop: "1px solid rgba(255,215,0,0.12)",
            paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
            paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
            paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <Link
            to="/"
            className="text-base font-medium py-2"
            style={{ color: pathname === "/" ? "#FFD700" : "rgba(255,255,255,0.75)", fontFamily: "Outfit, sans-serif" }}
          >
            Home
          </Link>

          <p className="text-xs font-semibold uppercase tracking-widest pt-3 pb-2" style={{ color: "#FFD700" }}>Skills</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {skills.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xl"
                style={{
                  backgroundColor: pathname === s.to ? "rgba(255,215,0,0.12)" : "rgba(255,255,255,0.04)",
                  border: pathname === s.to ? "1px solid rgba(255,215,0,0.35)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-base">{s.icon}</span>
                <span className="text-sm font-medium" style={{ color: pathname === s.to ? "#FFD700" : "rgba(255,255,255,0.85)", fontFamily: "Outfit, sans-serif" }}>{s.label}</span>
              </Link>
            ))}
          </div>

          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-base font-medium py-2"
              style={{ color: (l.to === "/coaches" ? pathname.startsWith("/coaches") : pathname === l.to) ? "#FFD700" : "rgba(255,255,255,0.75)", fontFamily: "Outfit, sans-serif" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/portal/login"
            onClick={() => setOpen(false)}
            className="text-base font-medium py-2"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Outfit, sans-serif" }}
          >
            Portal login
          </Link>
          <Link
            to="/book"
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
