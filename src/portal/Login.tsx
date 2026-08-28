import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { demoAccounts } from "./seed";
import { usePortal } from "./store";
import { fieldCls, fieldSt, GoldBtn } from "./ui";

export default function Login() {
  const { loginStart, user, state } = usePortal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user?.status === "active") return <Navigate to={`/portal/${user.role}`} replace />;
  if (state.otp) return <Navigate to="/portal/otp" replace />;

  const ready = email.trim().length > 0 && password.length > 0;

  function attempt() {
    if (!email.trim() || !password) {
      setError("Email and password are both required.");
      return;
    }
    const res = loginStart(email, password);
    if (!res.ok) setError(res.error);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    attempt();
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ backgroundColor: "#000" }}>
      <div className="hidden lg:flex flex-col justify-between p-12" style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(255,215,0,0.14), transparent 52%), #080808" }}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>FS</div>
          <span className="font-display font-black text-2xl">FunSkill <span style={{ color: "#FFD700" }}>Portals</span></span>
        </Link>
        <div>
          <h1 className="font-display font-black text-5xl mb-4" style={{ color: "#fff" }}>Four doors.<br />One club.</h1>
          <p className="text-sm max-w-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            You must type the email and the password. Nothing is filled for you. Then type the OTP.
          </p>
          <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            <li>· Meanwhile password for every demo door: <strong style={{ color: "#FFD700" }}>funskill</strong></li>
            <li>· OTP is shown in the simulator — you must type it too</li>
            <li>· Pending coaches cannot enter until admin accepts</li>
          </ul>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Frontend simulation · email + password required</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={submit} className="w-full max-w-md space-y-5" autoComplete="off">
          <div className="lg:hidden mb-6">
            <Link to="/" className="font-display font-black text-2xl">Fun<span style={{ color: "#FFD700" }}>Skill</span></Link>
          </div>
          <h2 className="font-display font-black text-4xl" style={{ color: "#fff" }}>Sign in</h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Type both fields. Send stays locked until email and password are filled.</p>

          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((d) => (
              <div
                key={d.email}
                className="text-left p-3 rounded-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-[10px] uppercase tracking-widest" style={{ color: "#FFD700" }}>{d.role}</div>
                <div className="text-xs mt-1 truncate" style={{ color: "rgba(255,255,255,0.7)" }}>{d.email}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>Reference only — copy these emails yourself. Password for all: funskill</p>

          <div>
            <label className="text-xs font-semibold block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Email <span style={{ color: "#FFD700" }}>*</span></label>
            <input
              className={fieldCls}
              style={fieldSt}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              type="email"
              required
              autoComplete="off"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Password <span style={{ color: "#FFD700" }}>*</span></label>
            <input
              className={fieldCls}
              style={fieldSt}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              type="password"
              required
              minLength={1}
              autoComplete="off"
              placeholder="Required"
            />
          </div>
          {error && <p className="text-sm" style={{ color: "#ff8a8a" }}>{error}</p>}
          <GoldBtn type="button" onClick={attempt} disabled={!ready}>Send one-time code →</GoldBtn>

          <div className="text-sm space-y-2 pt-2" style={{ color: "rgba(255,255,255,0.45)" }}>
            <p><Link to="/portal/register" style={{ color: "#FFD700" }}>Create a parent account</Link></p>
            <p><Link to="/portal/apply" style={{ color: "#FFD700" }}>Apply to coach</Link> — admin must accept before you can log in.</p>
            <p><Link to="/" style={{ color: "rgba(255,255,255,0.4)" }}>← Back to FunSkill</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
