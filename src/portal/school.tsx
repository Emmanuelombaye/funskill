import { type ReactNode, useState } from "react";
import { coaches } from "../data/coaches";
import PortalLayout, { RequireRole } from "./layout";
import { nameOf, usePortal } from "./store";
import { Badge, Card, GoldBtn, Kpi, fieldCls, fieldSt, statusTone } from "./ui";

function Shell({ children }: { children: ReactNode }) {
  return <RequireRole role="school"><PortalLayout role="school">{children}</PortalLayout></RequireRole>;
}

export function SchoolHome() {
  const { user, state } = usePortal();
  const org = state.schools.find((s) => s.id === user?.schoolId);
  const sessions = state.bookings.filter((b) => b.schoolId === org?.id || (b.type === "school" && b.parentId === user?.id));

  return (
    <Shell>
      <p className="text-xs uppercase tracking-widest" style={{ color: "#FFD700" }}>School partnership</p>
      <h1 className="font-display font-black text-4xl mb-2">{org?.name}</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Signed in as {user?.name}. Term delivery, pupil counts, and invoices for FunSkill in school.</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Kpi label="Pupils on programme" value={String(org?.pupils ?? 0)} />
        <Kpi label="Term fee" value={`£${org?.termFeeGbp.toLocaleString()}`} />
        <Kpi label="Status" value={org?.status === "active" ? "Active" : "Trial"} />
      </div>
      <Card>
        <h2 className="font-display font-bold text-xl mb-3">This term's FunSkill blocks</h2>
        <ul className="space-y-3 text-sm">
          {sessions.map((b) => (
            <li key={b.id} className="flex justify-between gap-3">
              <span>{b.date} {b.time} · {b.skill} · {coaches.find((c) => c.slug === b.coachSlug)?.name}</span>
              <Badge tone={statusTone(b.status)}>{b.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function SchoolProgrammes() {
  const { user, state } = usePortal();
  const org = state.schools.find((s) => s.id === user?.schoolId);

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-8">Programmes</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {org?.programmes.map((p) => {
          const coach = coaches.find((c) => c.skillIds.includes(p));
          return (
            <Card key={p}>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#FFD700" }}>{p}</div>
              <div className="font-display font-black text-3xl capitalize mt-1">{p}</div>
              <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>Lead coach on record: {coach?.name}. Curriculum-aligned weekly block, kit provided.</p>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>{org.pupils} pupils allocated across FunSkill school delivery.</p>
            </Card>
          );
        })}
      </div>
      <Card className="mt-6">
        <h2 className="font-display font-bold text-xl mb-2">Other FunSkill school partners</h2>
        <ul className="text-sm space-y-2">
          {state.schools.filter((s) => s.id !== org?.id).map((s) => (
            <li key={s.id} className="flex justify-between"><span>{s.name}</span><Badge>{s.status}</Badge></li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function SchoolPupils() {
  const { state } = usePortal();
  const sample = state.kids.filter((k) => ["chess", "ballet"].includes(k.skill));

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-2">Pupils on FunSkill</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Anonymised class roll drawn from families who also train in club (demo overlap).</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: "rgba(255,255,255,0.4)" }}>{["Pupil", "Age", "Programme", "Level", "Goal"].map((h) => <th key={h} className="text-left py-2">{h}</th>)}</tr>
          </thead>
          <tbody>
            {sample.map((k) => (
              <tr key={k.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <td className="py-3">{k.name}</td>
                <td>{k.age}</td>
                <td className="capitalize">{k.skill}</td>
                <td>{k.level}</td>
                <td>{k.nextGoal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}

export function SchoolInvoices() {
  const { user, state, payInvoice } = usePortal();
  const org = state.schools.find((s) => s.id === user?.schoolId);
  const rows = state.invoices.filter((inv) => inv.schoolId === org?.id);

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-8">Invoices</h1>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Kpi label="Paid" value={`£${rows.filter((r) => r.status === "paid").reduce((s, r) => s + r.amountGbp, 0).toLocaleString()}`} />
        <Kpi label="Outstanding" value={`£${rows.filter((r) => r.status === "pending").reduce((s, r) => s + r.amountGbp, 0).toLocaleString()}`} />
      </div>
      <Card>
        <ul className="space-y-3 text-sm">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-wrap justify-between gap-3 items-center">
              <span>{r.id} · {r.term} · due {r.due}</span>
              <span className="flex items-center gap-3">
                £{r.amountGbp.toLocaleString()} <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                {r.status === "pending" && <GoldBtn onClick={() => payInvoice(r.id)}>Mark paid</GoldBtn>}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

export function SchoolMessages() {
  const { user, state, sendMessage, markMessageRead } = usePortal();
  const admin = state.users.find((u) => u.role === "admin");
  const mine = state.messages.filter((m) => m.toId === user?.id || m.fromId === user?.id);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <Shell>
      <h1 className="font-display font-black text-4xl mb-6">Messages</h1>
      <Card className="mb-6">
        <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>Write to FunSkill admin ({admin?.name}).</p>
        <input className={`${fieldCls} mb-3`} style={fieldSt} placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea className={`${fieldCls} mb-3`} style={fieldSt} rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
        <GoldBtn onClick={() => { if (admin && subject && body) { sendMessage(admin.id, subject, body); setSubject(""); setBody(""); } }}>Send to admin</GoldBtn>
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
