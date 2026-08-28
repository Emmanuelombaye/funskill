import type { CSSProperties } from "react";

const GOLD = "#FFD700";
const MUTED = "rgba(255,255,255,0.12)";

function niceMax(n: number) {
  if (n <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(n));
  return Math.ceil(n / p) * p;
}

export function AreaChart({
  labels,
  series,
  height = 220,
}: {
  labels: string[];
  series: { label: string; color: string; values: number[] }[];
  height?: number;
}) {
  const w = 640;
  const h = height;
  const pad = { t: 16, r: 12, b: 28, l: 36 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const max = niceMax(Math.max(...series.flatMap((s) => s.values), 1));
  const n = Math.max(labels.length - 1, 1);

  function pts(values: number[]) {
    return values.map((v, i) => {
      const x = pad.l + (i / n) * innerW;
      const y = pad.t + innerH - (v / max) * innerH;
      return `${x},${y}`;
    }).join(" ");
  }

  function area(values: number[]) {
    const line = values.map((v, i) => {
      const x = pad.l + (i / n) * innerW;
      const y = pad.t + innerH - (v / max) * innerH;
      return `${x},${y}`;
    });
    const lastX = pad.l + innerW;
    const firstX = pad.l;
    const base = pad.t + innerH;
    return `${firstX},${base} ${line.join(" ")} ${lastX},${base}`;
  }

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} role="img">
        {[0, 0.5, 1].map((t) => {
          const y = pad.t + innerH * (1 - t);
          return (
            <g key={t}>
              <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke={MUTED} strokeWidth="1" />
              <text x={pad.l - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="10">{Math.round(max * t)}</text>
            </g>
          );
        })}
        {series.map((s) => (
          <g key={s.label}>
            <polygon points={area(s.values)} fill={s.color} opacity="0.16" />
            <polyline points={pts(s.values)} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {s.values.map((v, i) => {
              const x = pad.l + (i / n) * innerW;
              const y = pad.t + innerH - (v / max) * innerH;
              return <circle key={i} cx={x} cy={y} r="3.5" fill="#050505" stroke={s.color} strokeWidth="2" />;
            })}
          </g>
        ))}
        {labels.map((lab, i) => {
          const x = pad.l + (i / n) * innerW;
          return <text key={lab} x={x} y={h - 8} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">{lab.slice(5)}</text>;
        })}
      </svg>
      <div className="flex flex-wrap gap-4 mt-2 px-1">
        {series.map((s) => (
          <span key={s.label} className="text-xs flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  labels,
  values,
  color = GOLD,
  height = 180,
}: {
  labels: string[];
  values: number[];
  color?: string;
  height?: number;
}) {
  const max = niceMax(Math.max(...values, 1));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {values.map((v, i) => (
        <div key={labels[i] || i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div className="text-[10px] font-semibold" style={{ color }}>{v}</div>
          <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: `${(v / max) * 100}%`, minHeight: 6, background: `linear-gradient(180deg,${color},${color}88)` }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.25),transparent 40%)" }} />
          </div>
          <div className="text-[10px] text-center leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

export function GroupedBars({
  labels,
  series,
  height = 200,
}: {
  labels: string[];
  series: { label: string; color: string; values: number[] }[];
  height?: number;
}) {
  const max = niceMax(Math.max(...series.flatMap((s) => s.values), 1));
  return (
    <div>
      <div className="flex items-end gap-3" style={{ height }}>
        {labels.map((lab, i) => (
          <div key={lab} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <div className="flex-1 w-full flex items-end justify-center gap-1">
              {series.map((s) => (
                <div
                  key={s.label}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${(s.values[i] / max) * 100}%`,
                    minHeight: 4,
                    background: `linear-gradient(180deg,${s.color},${s.color}99)`,
                  }}
                />
              ))}
            </div>
            <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>{lab.slice(5)}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {series.map((s) => (
          <span key={s.label} className="text-xs flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Donut({
  slices,
  size = 168,
  center,
}: {
  slices: { label: string; value: number; color: string }[];
  size?: number;
  center?: string;
}) {
  const list = slices.filter((s) => s.value > 0);
  const total = list.reduce((s, x) => s + x.value, 0) || 1;
  const r = 56;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const draw = list.length ? list : [{ label: "None", value: 1, color: "rgba(255,255,255,0.12)" }];
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
          {draw.map((s) => {
            const len = (s.value / total) * c;
            const dash = `${len} ${c - len}`;
            const el = (
              <circle
                key={s.label}
                cx="80"
                cy="80"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="18"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        {center && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-display font-black text-2xl">{center}</div>
          </div>
        )}
      </div>
      <ul className="space-y-2 text-sm w-full">
        {(list.length ? list : []).map((s) => (
          <li key={s.label} className="flex justify-between gap-3">
            <span className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="font-semibold" style={{ color: s.color }}>{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HBars({
  rows,
}: {
  rows: { label: string; value: number; meta?: string }[];
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-4">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex justify-between text-sm mb-1.5">
            <span>{r.label}</span>
            <span style={{ color: GOLD }}>{r.meta ?? r.value}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${(r.value / max) * 100}%`,
                background: "linear-gradient(90deg,#FFD700,#FFE84D)",
                boxShadow: "0 0 12px rgba(255,215,0,0.35)",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Spark({ values, color = GOLD }: { values: number[]; color?: string }) {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const d = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 80;
    const y = 28 - ((v - min) / span) * 24;
    return `${i === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 80 32" className="w-20 h-8" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export const goldGlow: CSSProperties = {
  boxShadow: "0 0 0 1px rgba(255,215,0,0.16), 0 18px 40px rgba(0,0,0,0.35)",
};
