import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { coaches } from "../data/coaches";
import { Donut } from "./charts";
import PortalLayout, { RequireRole } from "./layout";
import { kidsForParent, nameOf, usePortal } from "./store";
import { Badge, Card, GoldBtn, Kpi, PageHead, fieldCls, fieldSt, money, statusTone } from "./ui";
import type { SkillId } from "./types";

function Shell({ children }: { children: ReactNode }) {
  return <RequireRole role="parent"><PortalLayout role="parent">{children}</PortalLayout></RequireRole>;
}

export function ParentHome() {
  const { user, state } = usePortal();
  const kids = kidsForParent(state.kids, user!.id);
  const books = state.bookings.filter((b) => b.parentId === user!.id);
  const next = books.filter((b) => b.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date))[0];
  const spent = books.filter((b) => b.payStatus === "paid").reduce((s, b) => s + b.gbp, 0);
  const pending = books.filter((b) => b.payStatus === "pending").reduce((s, b) => s + b.gbp, 0);

  return (
    <Shell>
      <PageHead kicker="Family" title={`Hi ${user!.name}`} copy="Your kids, their coaches, what you have paid, and what is next." />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Kpi label="Kids" value={String(kids.length)} />
        <Kpi label="Upcoming" value={String(books.filter((b) => b.status === "upcoming").length)} />
        <Kpi label="Paid to FunSkill" value={`£${spent}`} spark={books.filter((b) => b.payStatus === "paid").map((b) => b.gbp)} />
      </div>
      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        {next && (
          <Card className="lg:col-span-3" title="Next session">
            <div className="font-display font-black text-4xl">{state.kids.find((k) => k.id === next.kidId)?.name}</div>
            <div className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>{next.date} at {next.time} with {coaches.find((c) => c.slug === next.coachSlug)?.name}</div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{next.location} · {next.type} · {money(next.gbp, next.kes)}</div>
          </Card>
        )}
        <Card className={`${next ? "lg:col-span-2" : "lg:col-span-5"}`} title="Spend mix">
          <Donut
            slices={[
              { label: "Paid", value: spent || 0, color: "#3ddc84" },
              { label: "Pending", value: pending || 0, color: "#FFD700" },
            ].filter((s) => s.value > 0)}
            center={`£${spent}`}
          />
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {kids.map((k) => (
          <Card key={k.id}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>{k.name.slice(0, 1)}</div>
              <div>
                <div className="font-display font-black text-2xl">{k.name}</div>
                <div className="text-sm" style={{ color: "#FFD700" }}>{k.skill} · {k.level} · {k.age} yrs</div>
                <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>{k.notes}</p>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>Next goal: {k.nextGoal}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Link to="/portal/parent/bookings" className="inline-block mt-8 text-sm font-semibold" style={{ color: "#FFD700" }}>Book another session in your family portal →</Link>
    </Shell>
  );
}

export function ParentKids() {
  const { user, state, addKid } = usePortal();
  const kids = kidsForParent(state.kids, user!.id);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", age: "7", skill: "chess" as SkillId, medical: "None", nextGoal: "" });

  return (
    <Shell>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display font-black text-4xl">Kids</h1>
        <GoldBtn onClick={() => setOpen(!open)}>{open ? "Close" : "Add a child"}</GoldBtn>
      </div>
      {open && (
        <Card className="mb-6">
          <div className="grid sm:grid-cols-2 gap-3">
            <input className={fieldCls} style={fieldSt} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={fieldCls} style={fieldSt} type="number" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            <select className={fieldCls} style={fieldSt} value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value as SkillId })}>
              {["chess", "skating", "ballet", "taekwondo"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <input className={fieldCls} style={fieldSt} placeholder="Medical notes" value={form.medical} onChange={(e) => setForm({ ...form, medical: e.target.value })} />
          </div>
          <input className={`${fieldCls} mt-3`} style={fieldSt} placeholder="Next goal" value={form.nextGoal} onChange={(e) => setForm({ ...form, nextGoal: e.target.value })} />
          <div className="mt-3">
            <GoldBtn onClick={() => {
              if (!form.name) return;
              addKid({ parentId: user!.id, name: form.name, age: Number(form.age), skill: form.skill, level: "New", notes: "Added in parent portal", medical: form.medical, nextGoal: form.nextGoal || "First trial" });
              setOpen(false);
            }}>Save child</GoldBtn>
          </div>
        </Card>
      )}
      <div className="space-y-4">
        {kids.map((k) => {
          const hist = state.bookings.filter((b) => b.kidId === k.id);
          return (
            <Card key={k.id}>
              <div className="font-display font-black text-3xl">{k.name}</div>
              <div className="text-sm mb-3" style={{ color: "#FFD700" }}>{k.skill} · {k.level} · age {k.age}</div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{k.notes}</p>
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>Medical: {k.medical} · Goal: {k.nextGoal}</p>
              <h3 className="font-semibold mt-4 mb-2 text-sm">History</h3>
              <ul className="text-sm space-y-1">
                {hist.map((b) => (
                  <li key={b.id} className="flex justify-between">
                    <span>{b.date} · {coaches.find((c) => c.slug === b.coachSlug)?.name} · {b.type}</span>
                    <Badge tone={statusTone(b.status)}>{b.status}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

export function ParentBookings() {
  const { user, state, setBookingStatus, createBooking } = usePortal();
  const books = state.bookings.filter((b) => b.parentId === user!.id);
  const kids = kidsForParent(state.kids, user!.id);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    kidId: kids[0]?.id || "",
    coachSlug: coaches[0]?.slug || "james-chen",
    type: "private" as "private" | "group" | "trial",
    date: "2026-09-08",
    time: "16:00",
    location: "London – Shoreditch Kids Club",
  });

  const coach = coaches.find((c) => c.slug === form.coachSlug);
  const price = form.coachSlug && state.pricing[form.coachSlug]
    ? state.pricing[form.coachSlug]
    : { privateGbp: coach?.privateGbp ?? 45, privateKes: coach?.privateKes ?? 6800 };
  const gbp = form.type === "trial" ? 10 : form.type === "group" ? 18 : price.privateGbp;
  const kes = form.type === "trial" ? 1500 : form.type === "group" ? 2700 : price.privateKes;
  const kid = kids.find((k) => k.id === form.kidId);

  return (
    <Shell>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
        <h1 className="font-display font-black text-4xl">Bookings</h1>
        <GoldBtn onClick={() => setOpen(!open)}>{open ? "Close" : "Book a session"}</GoldBtn>
      </div>
      {open && (
        <Card className="mb-6">
          <h2 className="font-display font-bold text-xl mb-4">New session</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <select className={fieldCls} style={fieldSt} value={form.kidId} onChange={(e) => setForm({ ...form, kidId: e.target.value })}>
              {kids.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
            </select>
            <select className={fieldCls} style={fieldSt} value={form.coachSlug} onChange={(e) => setForm({ ...form, coachSlug: e.target.value })}>
              {coaches.map((c) => <option key={c.slug} value={c.slug}>{c.name} · {c.specialty}</option>)}
            </select>
            <select className={fieldCls} style={fieldSt} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "private" | "group" | "trial" })}>
              <option value="private">Private 1:1</option>
              <option value="group">Group class</option>
              <option value="trial">Trial</option>
            </select>
            <select className={fieldCls} style={fieldSt} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
              {["London – Shoreditch Kids Club", "London – Brixton Sports Hub", "Manchester – Northern Quarter Hub", "Birmingham – Digbeth Kids Club", "Edinburgh – Old Town Kids Club"].map((l) => <option key={l}>{l}</option>)}
            </select>
            <input className={fieldCls} style={fieldSt} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <input className={fieldCls} style={fieldSt} type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </div>
          <p className="text-sm mt-3" style={{ color: "#FFD700" }}>{money(gbp, kes)} · {form.type} with {coach?.name}</p>
          <div className="mt-4">
            <GoldBtn onClick={() => {
              if (!form.kidId || !user) return;
              createBooking({
                type: form.type,
                status: "upcoming",
                skill: kid?.skill ?? coach?.skillIds[0] ?? "chess",
                coachSlug: form.coachSlug,
                parentId: user.id,
                kidId: form.kidId,
                location: form.location,
                date: form.date,
                time: form.time,
                durationMins: form.type === "private" ? (coach?.privateMins ?? 60) : 45,
                gbp,
                kes,
                payStatus: "pending",
                payMethod: "paypal",
                notes: "Booked from parent portal",
              });
              setOpen(false);
            }}>Hold session · pay next</GoldBtn>
          </div>
        </Card>
      )}
      <div className="space-y-4">
        {books.map((b) => {
          const kidRow = state.kids.find((k) => k.id === b.kidId);
          const coachRow = coaches.find((c) => c.slug === b.coachSlug);
          return (
            <Card key={b.id}>
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <div className="font-display font-black text-2xl">{kidRow?.name}</div>
                  <div className="text-sm" style={{ color: "#FFD700" }}>{coachRow?.name} · {b.skill}</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{b.date} {b.time} · {b.location} · {b.durationMins} min</div>
                  {b.notes && <p className="text-sm mt-2">{b.notes}</p>}
                </div>
                <div className="text-right space-y-2">
                  <Badge tone={statusTone(b.status)}>{b.status}</Badge>
                  <div className="text-sm">{money(b.gbp, b.kes)}</div>
                  {b.status === "upcoming" && (
                    <button type="button" className="text-xs" style={{ color: "#ff8a8a" }} onClick={() => setBookingStatus(b.id, "cancelled")}>Cancel session</button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

export function ParentPayments() {
  const { user, state, payBooking } = usePortal();
  const books = state.bookings.filter((b) => b.parentId === user!.id);
  const paid = books.filter((b) => b.payStatus === "paid").reduce((s, b) => s + b.gbp, 0);
  const pending = books.filter((b) => b.payStatus === "pending").reduce((s, b) => s + b.gbp, 0);
  const refunded = books.filter((b) => b.payStatus === "refunded").reduce((s, b) => s + b.gbp, 0);

  return (
    <Shell>
      <PageHead kicker="Family" title="Payments" />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Kpi label="Paid" value={`£${paid}`} spark={books.filter((b) => b.payStatus === "paid").map((b) => b.gbp)} />
        <Kpi label="Pending" value={`£${pending}`} />
        <Kpi label="Refunded" value={`£${refunded}`} />
      </div>
      <div className="grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-2" title="Balance">
          <Donut
            slices={[
              { label: "Paid", value: paid, color: "#3ddc84" },
              { label: "Pending", value: pending, color: "#FFD700" },
              { label: "Refunded", value: refunded, color: "#ff8a8a" },
            ].filter((s) => s.value > 0)}
            center={`£${paid}`}
          />
        </Card>
        <Card className="lg:col-span-3" title="Receipts">
          <ul className="text-sm space-y-3">
            {books.map((b) => (
              <li key={b.id} className="flex flex-wrap justify-between gap-3 items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
                <span>{b.date} · {b.payMethod} · {state.kids.find((k) => k.id === b.kidId)?.name}</span>
                <span className="flex items-center gap-3">
                  {money(b.gbp, b.kes)} <Badge tone={statusTone(b.payStatus)}>{b.payStatus}</Badge>
                  {b.payStatus === "pending" && b.status !== "cancelled" && (
                    <GoldBtn onClick={() => payBooking(b.id)}>Pay now</GoldBtn>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Shell>
  );
}

export function ParentMessages() {
  const { user, state, sendMessage, markMessageRead } = usePortal();
  const coachesU = state.users.filter((u) => u.role === "coach");
  const mine = state.messages.filter((m) => m.toId === user?.id || m.fromId === user?.id);
  const [to, setTo] = useState(coachesU[0]?.id || "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-6">Messages</h1>
      <Card className="mb-6">
        <select className={`${fieldCls} mb-3`} style={fieldSt} value={to} onChange={(e) => setTo(e.target.value)}>
          {coachesU.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input className={`${fieldCls} mb-3`} style={fieldSt} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea className={`${fieldCls} mb-3`} style={fieldSt} rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
        <GoldBtn onClick={() => { if (to && subject && body) { sendMessage(to, subject, body); setSubject(""); setBody(""); } }}>Send to coach</GoldBtn>
      </Card>
      {mine.map((m) => (
        <button key={m.id} type="button" className="block w-full text-left mb-3" onClick={() => markMessageRead(m.id)}>
          <Card>
            <div className="flex justify-between"><strong>{m.subject}</strong><Badge tone={statusTone(m.status)}>{m.status}</Badge></div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{nameOf(state.users, m.fromId)} → {nameOf(state.users, m.toId)}</div>
            <p className="text-sm mt-2">{m.body}</p>
          </Card>
        </button>
      ))}
    </Shell>
  );
}
