import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { coaches, formatPrivate } from "../data/coaches";
import { AreaChart, Donut, GroupedBars, HBars } from "./charts";
import PortalLayout, { RequireRole } from "./layout";
import { bookingsForCoach, nameOf, usePortal } from "./store";
import { Badge, Card, GhostBtn, GoldBtn, Kpi, PageHead, fieldCls, fieldSt, money, statusTone } from "./ui";

function Shell({ children }: { children: ReactNode }) {
  return <RequireRole role="admin"><PortalLayout role="admin">{children}</PortalLayout></RequireRole>;
}

export function AdminOverview() {
  const { state, resetDemo } = usePortal();
  const upcoming = state.bookings.filter((b) => b.status === "upcoming");
  const paid = state.bookings.filter((b) => b.payStatus === "paid");
  const revenue = paid.reduce((s, b) => s + b.gbp, 0);
  const pendingApps = state.applications.filter((a) => a.status === "pending").length;
  const views7 = state.pageViews.reduce((s, d) => s + d.home + d.coaches + d.book + d.programs, 0);
  const unread = state.messages.filter((m) => m.status === "unread").length;
  const byType = ["private", "group", "trial", "school"].map((t) => ({
    label: t,
    value: state.bookings.filter((b) => b.type === t).length,
    color: t === "private" ? "#FFD700" : t === "group" ? "#FFE84D" : t === "trial" ? "#8ec5ff" : "#3ddc84",
  }));

  return (
    <Shell>
      <PageHead
        kicker="Admin"
        title="Club control"
        copy="Views, money, people, and hiring — live in this browser."
        action={<GhostBtn onClick={() => { if (confirm("Reset all portal demo data?")) resetDemo(); }}>Reset demo data</GhostBtn>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi label="7-day site views" value={views7.toLocaleString()} hint="Home + coaches + book + programmes" spark={state.pageViews.map((d) => d.home + d.coaches + d.book + d.programs)} />
        <Kpi label="Upcoming sessions" value={String(upcoming.length)} hint={`${state.bookings.filter((b) => b.status === "completed").length} completed`} spark={state.pageViews.map((d) => d.book)} />
        <Kpi label="Collected (GBP)" value={`£${revenue.toLocaleString()}`} hint="Paid bookings only" />
        <Kpi label="Hiring queue" value={String(pendingApps)} hint={`${unread} unread messages`} />
      </div>
      <div className="grid lg:grid-cols-5 gap-5 mb-5">
        <Card className="lg:col-span-3" title="Traffic this week" subtitle="Four public surfaces, one gold line each.">
          <AreaChart
            labels={state.pageViews.map((d) => d.day)}
            series={[
              { label: "Home", color: "#FFD700", values: state.pageViews.map((d) => d.home) },
              { label: "Coaches", color: "#FFE84D", values: state.pageViews.map((d) => d.coaches) },
              { label: "Book", color: "#8ec5ff", values: state.pageViews.map((d) => d.book) },
              { label: "Programmes", color: "#3ddc84", values: state.pageViews.map((d) => d.programs) },
            ]}
          />
        </Card>
        <Card className="lg:col-span-2" title="Session mix" subtitle="Every booking on the ledger.">
          <Donut slices={byType} center={String(state.bookings.length)} />
        </Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card title="Who is booked next" subtitle="Parent name sits under each kid.">
          <ul className="space-y-3">
            {upcoming.slice(0, 6).map((b) => {
              const coach = coaches.find((c) => c.slug === b.coachSlug);
              const parent = nameOf(state.users, b.parentId);
              const kid = state.kids.find((k) => k.id === b.kidId);
              return (
                <li key={b.id} className="flex justify-between gap-3 text-sm rounded-2xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div>
                    <div className="font-semibold">{kid?.name} · {coach?.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)" }}>{b.date} {b.time} · booked by {parent}</div>
                  </div>
                  <Badge tone={statusTone(b.type)}>{b.type}</Badge>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card title="Coach demand" subtitle="Profile views driving book clicks.">
          <HBars
            rows={[...state.coachViews].sort((a, b) => b.views - a.views).slice(0, 6).map((v) => ({
              label: coaches.find((x) => x.slug === v.slug)?.name ?? v.slug,
              value: v.views,
              meta: `${v.views} views · ${v.bookClicks} clicks`,
            }))}
          />
        </Card>
      </div>
    </Shell>
  );
}

export function AdminAnalytics() {
  const { state } = usePortal();
  const totals = state.pageViews.reduce((a, d) => ({ home: a.home + d.home, coaches: a.coaches + d.coaches, book: a.book + d.book, programs: a.programs + d.programs }), { home: 0, coaches: 0, book: 0, programs: 0 });
  const conv = ((totals.book / totals.coaches) * 100).toFixed(1);

  return (
    <Shell>
      <PageHead kicker="Analytics" title="Traffic & conversion" copy="Last 7 days. Coach profile views drive private-book clicks." />
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <Kpi label="Home" value={totals.home.toLocaleString()} spark={state.pageViews.map((d) => d.home)} />
        <Kpi label="Coach pages" value={totals.coaches.toLocaleString()} spark={state.pageViews.map((d) => d.coaches)} />
        <Kpi label="Book funnel" value={totals.book.toLocaleString()} spark={state.pageViews.map((d) => d.book)} />
        <Kpi label="Coach → book" value={`${conv}%`} />
      </div>
      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        <Card className="lg:col-span-3" title="Daily grouped bars" subtitle="Home, coaches, book, programmes.">
          <GroupedBars
            labels={state.pageViews.map((d) => d.day)}
            series={[
              { label: "Home", color: "#FFD700", values: state.pageViews.map((d) => d.home) },
              { label: "Coaches", color: "#C9A227", values: state.pageViews.map((d) => d.coaches) },
              { label: "Book", color: "#8ec5ff", values: state.pageViews.map((d) => d.book) },
              { label: "Programmes", color: "#3ddc84", values: state.pageViews.map((d) => d.programs) },
            ]}
          />
        </Card>
        <Card className="lg:col-span-2" title="Share of traffic" subtitle="Stacked as a donut.">
          <Donut
            slices={[
              { label: "Home", value: totals.home, color: "#FFD700" },
              { label: "Coaches", value: totals.coaches, color: "#C9A227" },
              { label: "Book", value: totals.book, color: "#8ec5ff" },
              { label: "Programmes", value: totals.programs, color: "#3ddc84" },
            ]}
            center="7d"
          />
        </Card>
      </div>
      <Card title="Coach conversion table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "rgba(255,255,255,0.4)" }}>{["Coach", "Views", "Unique", "Book clicks", "Rate"].map((h) => <th key={h} className="text-left py-2 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[...state.coachViews].sort((a, b) => b.views - a.views).map((v) => {
                const c = coaches.find((x) => x.slug === v.slug);
                return (
                  <tr key={v.slug} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td className="py-3">{c?.name}</td>
                    <td>{v.views}</td>
                    <td>{v.unique}</td>
                    <td>{v.bookClicks}</td>
                    <td style={{ color: "#FFD700" }}>{((v.bookClicks / v.views) * 100).toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}

export function AdminCoaches() {
  const { state, updatePricing } = usePortal();
  const [edit, setEdit] = useState<string | null>(null);
  const [gbp, setGbp] = useState("");
  const [kes, setKes] = useState("");

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-2">Coaches & private pricing</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Admin can change 1:1 rates. Overrides persist in this browser. Public profiles read the same numbers when wired through portal pricing.</p>
      <div className="space-y-4">
        {coaches.map((c) => {
          const override = state.pricing[c.slug];
          const g = override?.privateGbp ?? c.privateGbp;
          const k = override?.privateKes ?? c.privateKes;
          const booked = bookingsForCoach(state.bookings, c.slug);
          return (
            <Card key={c.slug}>
              <div className="flex flex-wrap gap-4 justify-between">
                <div>
                  <Link to={`/coaches/${c.slug}`} className="font-display font-black text-2xl" style={{ color: "#fff" }}>{c.name}</Link>
                  <div className="text-sm" style={{ color: "#FFD700" }}>{c.role}</div>
                  <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>{booked.length} sessions in ledger · ★ {c.rating} · {c.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Private</div>
                  <div className="font-display font-black text-2xl">{formatPrivate(g, k)}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{c.privateMins} min</div>
                </div>
              </div>
              {edit === c.slug ? (
                <div className="mt-4 flex flex-wrap gap-3 items-end">
                  <div>
                    <label className="text-xs block mb-1">GBP</label>
                    <input className={fieldCls} style={fieldSt} value={gbp} onChange={(e) => setGbp(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs block mb-1">KES</label>
                    <input className={fieldCls} style={fieldSt} value={kes} onChange={(e) => setKes(e.target.value)} />
                  </div>
                  <GoldBtn onClick={() => { updatePricing(c.slug, Number(gbp), Number(kes)); setEdit(null); }}>Save rate</GoldBtn>
                  <GhostBtn onClick={() => setEdit(null)}>Cancel</GhostBtn>
                </div>
              ) : (
                <button type="button" className="text-sm mt-4" style={{ color: "#FFD700" }} onClick={() => { setEdit(c.slug); setGbp(String(g)); setKes(String(k)); }}>Edit pricing</button>
              )}
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

export function AdminApplications() {
  const { state, reviewApplication } = usePortal();
  const [note, setNote] = useState<Record<string, string>>({});

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-2">Coach applications</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Accept creates a coach login (password still <strong>funskill</strong>). Reject stores your note.</p>
      <div className="space-y-4">
        {state.applications.map((a) => (
          <Card key={a.id}>
            <div className="flex flex-wrap justify-between gap-3 mb-3">
              <div>
                <div className="font-display font-black text-2xl">{a.name}</div>
                <div className="text-sm" style={{ color: "#FFD700" }}>{a.skill} · {a.years} years · {a.location}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{a.email} · {a.phone} · submitted {a.submitted}</div>
              </div>
              <Badge tone={statusTone(a.status)}>{a.status}</Badge>
            </div>
            <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>{a.bio}</p>
            <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Certs: {a.certs} · Wanted private {money(a.privateGbp, a.privateKes)}</p>
            {a.reviewNote && <p className="text-sm mb-3" style={{ color: "#ffb4b4" }}>Note: {a.reviewNote}</p>}
            {a.status === "pending" && (
              <div className="space-y-3">
                <textarea className={fieldCls} style={fieldSt} rows={2} placeholder="Decision note for the applicant" value={note[a.id] || ""} onChange={(e) => setNote({ ...note, [a.id]: e.target.value })} />
                <div className="flex gap-3">
                  <GoldBtn onClick={() => reviewApplication(a.id, "approved", note[a.id] || "Welcome to FunSkill.")}>Accept & create login</GoldBtn>
                  <GhostBtn onClick={() => reviewApplication(a.id, "rejected", note[a.id] || "Not a fit right now.")}>Decline</GhostBtn>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Shell>
  );
}

export function AdminBookings() {
  const { state, setBookingStatus } = usePortal();
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => state.bookings.filter((b) => filter === "all" || b.status === filter || b.type === filter), [state.bookings, filter]);

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-6">Every booking</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "upcoming", "completed", "cancelled", "private", "group", "trial", "school"].map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-full text-xs capitalize" style={filter === f ? { background: "#FFD700", color: "#000" } : { border: "1px solid rgba(255,255,255,0.12)" }}>{f}</button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr style={{ color: "rgba(255,255,255,0.4)" }}>
              {["When", "Kid", "Coach", "Parent", "Type", "Pay", "Status", ""].map((h) => <th key={h} className="text-left py-2 font-medium">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.map((b) => {
              const coach = coaches.find((c) => c.slug === b.coachSlug);
              const kid = state.kids.find((k) => k.id === b.kidId);
              return (
                <tr key={b.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td className="py-3">{b.date}<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>{b.time}</span></td>
                  <td>{kid?.name}</td>
                  <td>{coach?.name}</td>
                  <td>{nameOf(state.users, b.parentId)}</td>
                  <td><Badge>{b.type}</Badge></td>
                  <td>{money(b.gbp, b.kes)}<br /><Badge tone={statusTone(b.payStatus)}>{b.payStatus}</Badge></td>
                  <td><Badge tone={statusTone(b.status)}>{b.status}</Badge></td>
                  <td>
                    {b.status === "upcoming" && (
                      <div className="flex flex-col gap-1">
                        <button type="button" className="text-xs" style={{ color: "#3ddc84" }} onClick={() => setBookingStatus(b.id, "completed")}>Complete</button>
                        <button type="button" className="text-xs" style={{ color: "#ff8a8a" }} onClick={() => setBookingStatus(b.id, "cancelled")}>Cancel</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}

export function AdminClients() {
  const { state } = usePortal();
  const parents = state.users.filter((u) => u.role === "parent");

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-8">Families & kids</h1>
      <div className="space-y-5">
        {parents.map((p) => {
          const kids = state.kids.filter((k) => k.parentId === p.id);
          const books = state.bookings.filter((b) => b.parentId === p.id);
          return (
            <Card key={p.id}>
              <div className="flex justify-between gap-4 mb-3">
                <div>
                  <div className="font-display font-black text-2xl">{p.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{p.email} · {p.phone} · joined {p.joined}</div>
                </div>
                <Badge>{books.length} bookings</Badge>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {kids.map((k) => (
                  <div key={k.id} className="p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                    <div className="font-semibold">{k.name} · {k.age}</div>
                    <div className="text-xs" style={{ color: "#FFD700" }}>{k.skill} · {k.level}</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>{k.nextGoal}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Medical: {k.medical}</div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

export function AdminSchools() {
  const { state } = usePortal();

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-2">Schools & invoices</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Every partner school, their programmes, and what they owe.</p>
      <div className="space-y-5">
        {state.schools.map((s) => {
          const invoices = state.invoices.filter((inv) => inv.schoolId === s.id);
          const contact = state.users.find((u) => u.schoolId === s.id);
          const sessions = state.bookings.filter((b) => b.schoolId === s.id);
          return (
            <Card key={s.id}>
              <div className="flex flex-wrap justify-between gap-3 mb-3">
                <div>
                  <div className="font-display font-black text-2xl">{s.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.contact} · {s.email}{contact ? ` · login ${contact.email}` : ""}</div>
                </div>
                <Badge tone={statusTone(s.status)}>{s.status}</Badge>
              </div>
              <div className="text-sm mb-3" style={{ color: "#FFD700" }}>{s.pupils} pupils · {s.programmes.join(", ")} · term £{s.termFeeGbp.toLocaleString()}</div>
              <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{sessions.length} school sessions on the ledger</div>
              <ul className="text-sm space-y-2">
                {invoices.map((inv) => (
                  <li key={inv.id} className="flex justify-between">
                    <span>{inv.id} · {inv.term} · due {inv.due}</span>
                    <span>£{inv.amountGbp.toLocaleString()} <Badge tone={statusTone(inv.status)}>{inv.status}</Badge></span>
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

export function AdminMessages() {
  const { state, markMessageRead, sendMessage } = usePortal();
  const [to, setTo] = useState(state.users.find((u) => u.role === "school")?.id || "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-6">Inbox</h1>
      <Card className="mb-6">
        <h2 className="font-display font-bold text-xl mb-3">Write as admin</h2>
        <select className={`${fieldCls} mb-3`} style={fieldSt} value={to} onChange={(e) => setTo(e.target.value)}>
          {state.users.filter((u) => u.role !== "admin").map((u) => <option key={u.id} value={u.id}>{u.role} — {u.name}</option>)}
        </select>
        <input className={`${fieldCls} mb-3`} style={fieldSt} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea className={`${fieldCls} mb-3`} style={fieldSt} rows={3} placeholder="Message" value={body} onChange={(e) => setBody(e.target.value)} />
        <GoldBtn onClick={() => { if (to && subject && body) { sendMessage(to, subject, body); setSubject(""); setBody(""); } }}>Send</GoldBtn>
      </Card>
      <div className="space-y-3">
        {state.messages.map((m) => (
          <button key={m.id} type="button" onClick={() => markMessageRead(m.id)} className="block w-full text-left">
            <Card>
              <div className="flex justify-between gap-3">
                <div className="font-semibold">{m.subject}</div>
                <Badge tone={statusTone(m.status)}>{m.status}</Badge>
              </div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{nameOf(state.users, m.fromId)} → {nameOf(state.users, m.toId)} · {m.created.replace("T", " ").slice(0, 16)}</div>
              <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.65)" }}>{m.body}</p>
            </Card>
          </button>
        ))}
      </div>
    </Shell>
  );
}
