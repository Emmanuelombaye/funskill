import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePortal } from "./store";
import type { SkillId } from "./types";
import { fieldCls, fieldSt, GoldBtn } from "./ui";

const skills: { id: SkillId; label: string }[] = [
  { id: "chess", label: "Chess" },
  { id: "skating", label: "Skating" },
  { id: "ballet", label: "Ballet" },
  { id: "taekwondo", label: "Taekwondo" },
];

export default function Register() {
  const { registerParent } = usePortal();
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", kidName: "", kidAge: "8", skill: "chess" as SkillId });

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const res = registerParent({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      kidName: form.kidName,
      kidAge: Number(form.kidAge),
      skill: form.skill,
    });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    nav("/portal/login", { state: { registered: true } });
  }

  return (
    <div className="min-h-screen py-16 px-6" style={{ backgroundColor: "#000" }}>
      <form onSubmit={submit} className="max-w-xl mx-auto space-y-5">
        <Link to="/portal/login" className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>← Sign in</Link>
        <h1 className="font-display font-black text-5xl" style={{ color: "#fff" }}>Parent account</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Creates your family login and the first child profile. Then sign in with OTP.</p>
        {[
          ["Your name", "name"],
          ["Email", "email"],
          ["Phone", "phone"],
          ["Password", "password"],
          ["Child's name", "kidName"],
        ].map(([label, key]) => (
          <div key={key}>
            <label className="text-xs font-semibold block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</label>
            <input
              className={fieldCls}
              style={fieldSt}
              type={key === "password" ? "password" : key === "email" ? "email" : "text"}
              value={(form as Record<string, string>)[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              required
            />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Child age</label>
          <input className={fieldCls} style={fieldSt} type="number" min={2} max={18} value={form.kidAge} onChange={(e) => setForm({ ...form, kidAge: e.target.value })} required />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>First skill</label>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((s) => (
              <button key={s.id} type="button" onClick={() => setForm({ ...form, skill: s.id })} className="py-3 rounded-xl text-sm" style={form.skill === s.id ? { border: "2px solid #FFD700", color: "#FFD700" } : { border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>{s.label}</button>
            ))}
          </div>
        </div>
        {error && <p className="text-sm" style={{ color: "#ff8a8a" }}>{error}</p>}
        <GoldBtn type="button" onClick={() => submit()}>Create family account</GoldBtn>
      </form>
    </div>
  );
}
