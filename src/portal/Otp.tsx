import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { usePortal } from "./store";
import { fieldCls, fieldSt, GhostBtn, GoldBtn } from "./ui";

export default function Otp() {
  const { state, user, verifyOtp, resendOtp } = usePortal();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const otp = state.otp;
  if (user?.status === "active") return <Navigate to={`/portal/${user.role}`} replace />;
  if (!otp) return <Navigate to="/portal/login" replace />;

  const secs = Math.max(0, Math.round((otp.expires - Date.now()) / 1000));

  function attempt() {
    const res = verifyOtp(code);
    if (!res.ok) setError(res.error);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    attempt();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#000", backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.1), transparent 50%)" }}>
      <div className="w-full max-w-lg space-y-6">
        <Link to="/portal/login" className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>← Back</Link>
        <h1 className="font-display font-black text-4xl" style={{ color: "#fff" }}>Enter your code</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          We simulated a {otp.channel === "sms" ? "text message" : "email"} to <strong style={{ color: "#FFD700" }}>{otp.email}</strong>. Type the 6 digits. There is no skip button.
        </p>

        <div className="rounded-3xl p-5" style={{ background: "linear-gradient(180deg,#161616,#0e0e0e)", border: "1px solid rgba(255,215,0,0.22)", boxShadow: "0 20px 48px rgba(0,0,0,0.4)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#FFD700" }}>OTP simulator</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{otp.channel === "sms" ? "SMS gateway" : "Mailhog · demo"} · {Math.ceil(secs / 60)} min left</span>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#1a1a1a" }}>
            <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{otp.channel === "sms" ? "From FunSkill" : "Subject: Your FunSkill code"}</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>Your FunSkill sign-in code is</p>
            <p className="font-display font-black text-4xl tracking-[0.35em] mt-2" style={{ color: "#FFD700" }}>{otp.code}</p>
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.35)" }}>Copy it into the field below. One use.</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            className={`${fieldCls} text-center text-2xl tracking-[0.4em] font-display font-black`}
            style={fieldSt}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            placeholder="••••••"
            required
            autoComplete="one-time-code"
          />
          {error && <p className="text-sm" style={{ color: "#ff8a8a" }}>{error}</p>}
          <div className="flex flex-wrap gap-3">
            <GoldBtn type="button" onClick={attempt} disabled={code.length !== 6}>Verify & enter portal</GoldBtn>
            <GhostBtn
              onClick={() => {
                const r = resendOtp();
                setError(r.ok ? "" : r.error);
                setCode("");
              }}
            >
              Resend code
            </GhostBtn>
          </div>
        </form>
      </div>
    </div>
  );
}
