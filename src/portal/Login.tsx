import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
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
            Sign in with your FunSkill account. We will send a one-time code to verify it is you.
          </p>
          <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            <li>· Parents manage kids, bookings, and payments</li>
            <li>· Coaches see their sessions and earnings</li>
            <li>· Schools and admin run programmes from here</li>
          </ul>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Secure sign-in · email + password + OTP</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={submit} className="w-full max-w-md space-y-5" autoComplete="off">
          <div className="lg:hidden mb-6">
            <Link to="/" className="font-display font-black text-2xl">Fun<span style={{ color: "#FFD700" }}>Skill</span></Link>
          </div>
          <h2 className="font-display font-black text-4xl" style={{ color: "#fff" }}>Sign in</h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Enter your email and password to continue.</p>

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
