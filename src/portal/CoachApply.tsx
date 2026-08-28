import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { usePortal } from "./store";
import type { SkillId } from "./types";
import { fieldCls, fieldSt, GoldBtn } from "./ui";

const skills: SkillId[] = ["chess", "skating", "ballet", "taekwondo"];

export default function CoachApply() {
  const { applyCoach } = usePortal();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", skill: "chess" as SkillId, years: "5", bio: "", certs: "", location: "London – Shoreditch Kids Club", privateGbp: "45", privateKes: "6800",
  });

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const res = applyCoach({
      name: form.name,
      email: form.email,
      phone: form.phone,
      skill: form.skill,
      years: Number(form.years),
      bio: form.bio,
      certs: form.certs,
      location: form.location,
      privateGbp: Number(form.privateGbp),
      privateKes: Number(form.privateKes),
    });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center" style={{ backgroundColor: "#000" }}>
        <div className="max-w-md">
          <div className="text-6xl mb-4">📋</div>
          <h1 className="font-display font-black text-4xl mb-3" style={{ color: "#fff" }}>Application in review</h1>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>Admin will accept or decline from the Coach applications queue. After approval, sign in with password <strong style={{ color: "#FFD700" }}>funskill</strong> plus OTP.</p>
          <Link to="/portal/login" className="text-sm font-semibold" style={{ color: "#FFD700" }}>Go to login →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6" style={{ backgroundColor: "#000" }}>
      <form onSubmit={submit} className="max-w-xl mx-auto space-y-5">
        <Link to="/portal/login" className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>← Sign in</Link>
        <h1 className="font-display font-black text-5xl" style={{ color: "#fff" }}>Coach application</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>You cannot enter the coach portal until an admin accepts this. Pending apps appear in admin immediately.</p>
        {(["name", "email", "phone", "certs", "location"] as const).map((key) => (
          <div key={key}>
            <label className="text-xs font-semibold block mb-1 capitalize" style={{ color: "rgba(255,255,255,0.6)" }}>{key}</label>
            <input className={fieldCls} style={fieldSt} type={key === "email" ? "email" : "text"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Skill</label>
          <select className={fieldCls} style={fieldSt} value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value as SkillId })}>
            {skills.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Years</label>
            <input className={fieldCls} style={fieldSt} type="number" value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} required />
          </div>
          <div>
            <label className="text-xs block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Private £</label>
            <input className={fieldCls} style={fieldSt} type="number" value={form.privateGbp} onChange={(e) => setForm({ ...form, privateGbp: e.target.value })} required />
          </div>
          <div>
            <label className="text-xs block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Private KES</label>
            <input className={fieldCls} style={fieldSt} type="number" value={form.privateKes} onChange={(e) => setForm({ ...form, privateKes: e.target.value })} required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Why FunSkill</label>
          <textarea className={fieldCls} style={fieldSt} rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />
        </div>
        {error && <p className="text-sm" style={{ color: "#ff8a8a" }}>{error}</p>}
        <GoldBtn type="button" onClick={() => submit()}>Submit for admin review</GoldBtn>
      </form>
    </div>
  );
}
