import { useState, type ReactNode } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { usePortal } from "./store";
import type { Role } from "./types";

const NAV: Record<Role, { to: string; label: string }[]> = {
  admin: [
    { to: "/portal/admin", label: "Overview" },
    { to: "/portal/admin/analytics", label: "Traffic & views" },
    { to: "/portal/admin/coaches", label: "Coaches & pricing" },
    { to: "/portal/admin/applications", label: "Coach applications" },
    { to: "/portal/admin/bookings", label: "All bookings" },
    { to: "/portal/admin/clients", label: "Families & kids" },
    { to: "/portal/admin/schools", label: "Schools & invoices" },
    { to: "/portal/admin/messages", label: "Inbox" },
  ],
  coach: [
    { to: "/portal/coach", label: "My day" },
    { to: "/portal/coach/sessions", label: "Sessions" },
    { to: "/portal/coach/students", label: "Students" },
    { to: "/portal/coach/earnings", label: "Earnings" },
    { to: "/portal/coach/messages", label: "Messages" },
  ],
  parent: [
    { to: "/portal/parent", label: "Family" },
    { to: "/portal/parent/kids", label: "Kids" },
    { to: "/portal/parent/bookings", label: "Bookings" },
    { to: "/portal/parent/payments", label: "Payments" },
    { to: "/portal/parent/messages", label: "Messages" },
  ],
  school: [
    { to: "/portal/school", label: "Partnership" },
    { to: "/portal/school/programmes", label: "Programmes" },
    { to: "/portal/school/pupils", label: "Pupils" },
    { to: "/portal/school/invoices", label: "Invoices" },
    { to: "/portal/school/messages", label: "Messages" },
  ],
};

export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { user } = usePortal();
  if (!user) return <Navigate to="/portal/login" replace />;
  if (user.role !== role) return <Navigate to={`/portal/${user.role}`} replace />;
  return <>{children}</>;
}

export default function PortalLayout({ role, children }: { role: Role; children: ReactNode }) {
  const { user, logout } = usePortal();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  if (!user) return <Navigate to="/portal/login" replace />;

  const items = NAV[role];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#050505", color: "#fff" }}>
      <aside
        className={`${open ? "flex" : "hidden"} lg:flex flex-col w-72 shrink-0 fixed lg:sticky top-0 h-screen z-40`}
        style={{ backgroundColor: "#0b0b0b", borderRight: "1px solid rgba(255,215,0,0.12)", paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="px-5 py-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>FS</div>
          <div>
            <div className="font-display font-black">FunSkill</div>
            <div className="text-[10px] uppercase tracking-widest" style={{ color: "#FFD700" }}>{role} portal</div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.to.split("/").length <= 3}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block px-3 py-2.5 rounded-xl text-sm ${isActive ? "font-bold" : ""}`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#FFD700" : "transparent",
                color: isActive ? "#000" : "rgba(255,255,255,0.65)",
              })}
            >
              {i.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-xs" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>{user.avatar}</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{user.name}</div>
              <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{user.email}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { logout(); nav("/portal/login"); }}
            className="w-full py-2 rounded-full text-sm"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
          >
            Sign out
          </button>
          <Link to="/" className="block text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.35)" }}>← Public site</Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden flex items-center justify-between px-4 h-14" style={{ borderBottom: "1px solid rgba(255,215,0,0.12)", paddingTop: "env(safe-area-inset-top)" }}>
          <span className="font-display font-black">FunSkill {role}</span>
          <button type="button" onClick={() => setOpen(!open)} className="p-2" aria-label="Menu">☰</button>
        </header>
        {open && <button type="button" className="lg:hidden fixed inset-0 z-30" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setOpen(false)} aria-label="Close menu" />}
        <div className="flex-1 px-4 sm:px-8 py-8 max-w-6xl w-full mx-auto">{children}</div>
      </div>
    </div>
  );
}
