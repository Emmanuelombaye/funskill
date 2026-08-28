import type { ReactNode } from "react";

export function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
      <div className="font-display font-black text-3xl" style={{ color: "#ffffff" }}>{value}</div>
      {hint && <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{hint}</div>}
    </div>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "green" | "red" | "muted" | "blue" }) {
  const map = {
    gold: { backgroundColor: "rgba(255,215,0,0.12)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.25)" },
    green: { backgroundColor: "rgba(0,175,79,0.12)", color: "#3ddc84", border: "1px solid rgba(0,175,79,0.25)" },
    red: { backgroundColor: "rgba(255,80,80,0.12)", color: "#ff8a8a", border: "1px solid rgba(255,80,80,0.25)" },
    blue: { backgroundColor: "rgba(80,160,255,0.12)", color: "#8ec5ff", border: "1px solid rgba(80,160,255,0.25)" },
    muted: { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" },
  };
  return <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={map[tone]}>{children}</span>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-6 ${className}`} style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
      {children}
    </div>
  );
}

export function GoldBtn({ children, onClick, type = "button", disabled }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-50" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>
      {children}
    </button>
  );
}

export function GhostBtn({ children, onClick, type = "button" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button type={type} onClick={onClick} className="px-5 py-2.5 rounded-full text-sm font-semibold" style={{ border: "1px solid rgba(255,255,255,0.16)", color: "#fff" }}>
      {children}
    </button>
  );
}

export const fieldCls = "w-full px-4 py-3 rounded-xl text-sm outline-none";
export const fieldSt = { backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" } as const;

export function statusTone(s: string): "gold" | "green" | "red" | "muted" | "blue" {
  if (s === "upcoming" || s === "pending" || s === "active") return "gold";
  if (s === "completed" || s === "paid" || s === "approved" || s === "read") return "green";
  if (s === "cancelled" || s === "rejected" || s === "failed" || s === "no-show") return "red";
  if (s === "unread") return "blue";
  return "muted";
}

export function money(gbp: number, kes: number) {
  if (!gbp && !kes) return "Included";
  return `£${gbp} · KES ${kes.toLocaleString()}`;
}
