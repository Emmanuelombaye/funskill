import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { coaches } from "../data/coaches";
import PortalLayout, { RequireRole } from "./layout";
import { bookingsForCoach, nameOf, usePortal } from "./store";
import { Badge, Card, GhostBtn, GoldBtn, Kpi, fieldCls, fieldSt, money, statusTone } from "./ui";

function Shell({ children }: { children: ReactNode }) {
  return <RequireRole role="coach"><PortalLayout role="coach">{children}</PortalLayout></RequireRole>;
}

function useMe() {
  const p = usePortal();
  const slug = p.user?.coachSlug;
  const mine = bookingsForCoach(p.state.bookings, slug);
  const coach = coaches.find((c) => c.slug === slug);
  const price = slug && p.state.pricing[slug] ? p.state.pricing[slug] : coach ? { privateGbp: coach.privateGbp, privateKes: coach.privateKes } : { privateGbp: 0, privateKes: 0 };
  return { ...p, slug, mine, coach, price };
}

export function CoachHome() {
  const { mine, coach, price, state } = useMe();
  const today = mine.filter((b) => b.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const earned = mine.filter((b) => b.payStatus === "paid" && b.status === "completed").reduce((s, b) => s + b.gbp, 0);

  return (
    <Shell>
      <p className="text-xs uppercase tracking-widest" style={{ color: "#FFD700" }}>Coach desk</p>
      <h1 className="font-display font-black text-4xl mb-2">{coach?.name}</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>{coach?.role} · private {money(price.privateGbp, price.privateKes)}</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Kpi label="Upcoming with you" value={String(today.length)} />
        <Kpi label="Completed paid" value={`£${earned}`} />
        <Kpi label="Students in ledger" value={String(new Set(mine.map((b) => b.kidId)).size)} />
      </div>
      <Card>
        <h2 className="font-display font-bold text-xl mb-4">Next on the floor</h2>
        {today.length === 0 && <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No upcoming sessions. Enjoy the quiet — or check applications with admin.</p>}
        <ul className="space-y-4">
          {today.map((b) => {
            const kid = state.kids.find((k) => k.id === b.kidId);
            const parent = state.users.find((u) => u.id === b.parentId);
            return (
              <li key={b.id} className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <div className="flex flex-wrap justify-between gap-2">
                  <div>
                    <div className="font-display font-black text-xl">{kid?.name}</div>
                    <div className="text-sm" style={{ color: "#FFD700" }}>{b.date} · {b.time} · {b.durationMins} min · {b.location}</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Booked by {parent?.name} · {parent?.phone} · {parent?.email}</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Medical: {kid?.medical} · Goal: {kid?.nextGoal}</div>
                    {b.notes && <div className="text-sm mt-2">{b.notes}</div>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge tone={statusTone(b.type)}>{b.type}</Badge>
                    <span className="text-sm">{money(b.gbp, b.kes)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </Shell>
  );
}

export function CoachSessions() {
  const { mine, state, setBookingStatus, addNote } = useMe();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [tab, setTab] = useState("upcoming");
  const list = useMemo(() => mine.filter((b) => tab === "all" || b.status === tab), [mine, tab]);

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-6">Sessions</h1>
      <div className="flex gap-2 mb-6">
        {["upcoming", "completed", "cancelled", "no-show", "all"].map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className="px-3 py-1.5 rounded-full text-xs capitalize" style={tab === t ? { background: "#FFD700", color: "#000" } : { border: "1px solid rgba(255,255,255,0.12)" }}>{t}</button>
        ))}
      </div>
      <div className="space-y-4">
        {list.map((b) => {
          const kid = state.kids.find((k) => k.id === b.kidId);
          const parent = state.users.find((u) => u.id === b.parentId);
          return (
            <Card key={b.id}>
              <div className="flex flex-wrap justify-between gap-3 mb-3">
                <div>
                  <div className="font-display font-black text-2xl">{kid?.name}</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{b.date} {b.time} · {b.skill} · {b.location}</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Parent {parent?.name} booked this {b.type}. {parent?.phone}</div>
                </div>
                <Badge tone={statusTone(b.status)}>{b.status}</Badge>
              </div>
              <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Session note: {b.notes || "—"}</p>
              {b.status === "upcoming" && (
                <div className="space-y-2">
                  <textarea className={fieldCls} style={fieldSt} rows={2} placeholder="Add floor notes" value={notes[b.id] ?? b.notes} onChange={(e) => setNotes({ ...notes, [b.id]: e.target.value })} />
                  <div className="flex flex-wrap gap-2">
                    <GoldBtn onClick={() => addNote(b.id, notes[b.id] ?? b.notes)}>Save notes</GoldBtn>
                    <GoldBtn onClick={() => setBookingStatus(b.id, "completed")}>Mark complete</GoldBtn>
                    <GhostBtn onClick={() => setBookingStatus(b.id, "no-show")}>No-show</GhostBtn>
                    <GhostBtn onClick={() => setBookingStatus(b.id, "cancelled")}>Cancel</GhostBtn>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

export function CoachStudents() {
  const { mine, state } = useMe();
  const kidIds = [...new Set(mine.map((b) => b.kidId))];

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-8">Your students</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {kidIds.map((id) => {
          const kid = state.kids.find((k) => k.id === id);
          const parent = state.users.find((u) => u.id === kid?.parentId);
          const hist = mine.filter((b) => b.kidId === id);
          if (!kid) return null;
          return (
            <Card key={id}>
              <div className="font-display font-black text-2xl">{kid.name}</div>
              <div className="text-sm" style={{ color: "#FFD700" }}>{kid.skill} · {kid.level} · age {kid.age}</div>
              <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>{kid.notes}</p>
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>Parent: {parent?.name} · {parent?.email}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Medical: {kid.medical}</p>
              <div className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{hist.length} sessions · next goal: {kid.nextGoal}</div>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

export function CoachEarnings() {
  const { mine, price, coach } = useMe();
  const paid = mine.filter((b) => b.payStatus === "paid");
  const pending = mine.filter((b) => b.payStatus === "pending");
  const refunded = mine.filter((b) => b.payStatus === "refunded");

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-2">Earnings</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Your public private rate is {money(price.privateGbp, price.privateKes)}. Admin can change this from Coaches & pricing.</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Kpi label="Paid to club (your sessions)" value={`£${paid.reduce((s, b) => s + b.gbp, 0)}`} />
        <Kpi label="Pending" value={`£${pending.reduce((s, b) => s + b.gbp, 0)}`} />
        <Kpi label="Refunded" value={`£${refunded.reduce((s, b) => s + b.gbp, 0)}`} />
      </div>
      <Card>
        <h2 className="font-display font-bold text-xl mb-4">Ledger</h2>
        <ul className="space-y-2 text-sm">
          {mine.map((b) => (
            <li key={b.id} className="flex justify-between gap-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span>{b.date} · {b.type} · {b.skill}</span>
              <span>{money(b.gbp, b.kes)} · <Badge tone={statusTone(b.payStatus)}>{b.payStatus}</Badge></span>
            </li>
          ))}
        </ul>
        {coach && <Link to={`/coaches/${coach.slug}`} className="inline-block mt-4 text-sm" style={{ color: "#FFD700" }}>View public profile →</Link>}
      </Card>
    </Shell>
  );
}

export function CoachMessages() {
  const { state, user, sendMessage, markMessageRead } = useMe();
  const mine = state.messages.filter((m) => m.toId === user?.id || m.fromId === user?.id);
  const parents = state.users.filter((u) => u.role === "parent");
  const [to, setTo] = useState(parents[0]?.id || "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-6">Messages</h1>
      <Card className="mb-6">
        <select className={`${fieldCls} mb-3`} style={fieldSt} value={to} onChange={(e) => setTo(e.target.value)}>
          {parents.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input className={`${fieldCls} mb-3`} style={fieldSt} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea className={`${fieldCls} mb-3`} style={fieldSt} rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
        <GoldBtn onClick={() => { if (to && subject && body) { sendMessage(to, subject, body); setSubject(""); setBody(""); } }}>Message parent</GoldBtn>
      </Card>
      {mine.map((m) => (
        <button key={m.id} type="button" className="block w-full text-left mb-3" onClick={() => markMessageRead(m.id)}>
          <Card>
            <div className="flex justify-between"><strong>{m.subject}</strong><Badge tone={statusTone(m.status)}>{m.status}</Badge></div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{nameOf(state.users, m.fromId)} → {nameOf(state.users, m.toId)}</div>
            <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.65)" }}>{m.body}</p>
          </Card>
        </button>
      ))}
    </Shell>
  );
}
