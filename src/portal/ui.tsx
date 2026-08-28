import type { ReactNode } from "react";
import { Spark } from "./charts";

export function Kpi({
  label,
  value,
  hint,
  spark,
}: {
  label: string;
  value: string;
  hint?: string;
  spark?: number[];
}) {
  return (
    <div
      className="rounded-3xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg,#161616 0%,#101010 100%)",
        border: "1px solid rgba(255,215,0,0.14)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.28)",
      }}
    >
      <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg,transparent,#FFD700,transparent)" }} />
      <div className="flex items-start justify-between gap-3">
        <div className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.42)" }}>{label}</div>
        {spark && spark.length > 1 && <Spark values={spark} />}
      </div>
      <div className="font-display font-black text-3xl mt-2" style={{ color: "#ffffff" }}>{value}</div>
      {hint && <div className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{hint}</div>}
    </div>
  );
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "green" | "red" | "muted" | "blue" }) {
  const map = {
    gold: { backgroundColor: "rgba(255,215,0,0.14)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.28)" },
    green: { backgroundColor: "rgba(0,175,79,0.14)", color: "#3ddc84", border: "1px solid rgba(0,175,79,0.28)" },
    red: { backgroundColor: "rgba(255,80,80,0.14)", color: "#ff8a8a", border: "1px solid rgba(255,80,80,0.28)" },
    blue: { backgroundColor: "rgba(80,160,255,0.14)", color: "#8ec5ff", border: "1px solid rgba(80,160,255,0.28)" },
    muted: { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" },
  };
  return <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={map[tone]}>{children}</span>;
}

export function Card({ children, className = "", title, subtitle }: { children: ReactNode; className?: string; title?: string; subtitle?: string }) {
  return (
    <div
      className={`rounded-3xl p-6 ${className}`}
      style={{
        background: "linear-gradient(180deg,#161616 0%,#0e0e0e 100%)",
        border: "1px solid rgba(255,215,0,0.12)",
        boxShadow: "0 20px 48px rgba(0,0,0,0.32)",
      }}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && <h2 className="font-display font-bold text-xl">{title}</h2>}
          {subtitle && <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export function GoldBtn({ children, onClick, type = "button", disabled }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-45 disabled:cursor-not-allowed transition-transform hover:scale-[1.03] active:scale-[0.98]"
      style={{
        background: "linear-gradient(135deg,#FFD700,#FFE84D)",
        color: "#000",
        boxShadow: "0 8px 24px rgba(255,215,0,0.28)",
      }}
    >
      {children}
    </button>
  );
}

export function GhostBtn({ children, onClick, type = "button" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
      style={{ border: "1px solid rgba(255,215,0,0.28)", color: "#FFD700", backgroundColor: "rgba(255,215,0,0.04)" }}
    >
      {children}
    </button>
  );
}

export const fieldCls = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-shadow";
export const fieldSt = {
  backgroundColor: "rgba(255,255,255,0.04)",
  color: "#fff",
  border: "1px solid rgba(255,215,0,0.16)",
} as const;

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

export function PageHead({ kicker, title, copy, action }: { kicker: string; title: string; copy?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-2" style={{ color: "#FFD700" }}>{kicker}</p>
        <h1 className="font-display font-black text-4xl md:text-5xl leading-none">{title}</h1>
        {copy && <p className="text-sm mt-2 max-w-xl" style={{ color: "rgba(255,255,255,0.45)" }}>{copy}</p>}
      </div>
      {action}
    </div>
  );
}
