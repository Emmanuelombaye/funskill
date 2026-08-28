import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

type PayMethod = "mpesa" | "paypal" | null;

const SKILLS = [
  { id: "chess",     label: "Chess",      icon: "♟", color: "#FFD700" },
  { id: "skating",   label: "Skating",    icon: "⛸", color: "#FFE84D" },
  { id: "ballet",    label: "Ballet",     icon: "🩰", color: "#FFD700" },
  { id: "taekwondo", label: "Taekwondo",  icon: "🥋", color: "#FFD700" },
  { id: "both",      label: "Multiple",   icon: "⭐", color: "#FFE84D" },
];

const LOCATIONS = [
  "London – Shoreditch Kids Club",
  "London – Brixton Sports Hub",
  "Manchester – Northern Quarter Hub",
  "Birmingham – Digbeth Kids Club",
  "Edinburgh – Old Town Kids Club",
];

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.75)" }}>
        {label} <span style={{ color: "#FFD700" }}>*</span>
      </label>
      {children}
      {error && <p className="mt-1 text-xs" style={{ color: "#ff6b6b" }}>⚠ {error}</p>}
    </div>
  );
}

const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.05)",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.12)",
};
const inputFocus = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-yellow-400";

export default function BookTrial() {
  const [skill, setSkill]         = useState<string>("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge]   = useState("");
  const [parentName, setParentName] = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [location, setLocation]   = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>(null);
  const [mpesaNum, setMpesaNum]   = useState("");
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [paying, setPaying]       = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!skill)      e.skill      = "Please select a skill or program.";
    if (!childName.trim())  e.childName  = "Child's name is required.";
    if (!childAge || isNaN(Number(childAge)) || Number(childAge) < 2 || Number(childAge) > 20)
                     e.childAge   = "Please enter a valid age (2–20).";
    if (!parentName.trim()) e.parentName = "Parent / guardian name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                     e.email      = "A valid email address is required.";
    if (!phone.trim()) e.phone    = "Phone number is required.";
    if (!location)   e.location   = "Please select a location.";
    if (!payMethod)  e.payMethod  = "Please choose a payment method.";
    if (payMethod === "mpesa" && !mpesaNum.trim())
                     e.mpesaNum   = "M-Pesa phone number is required.";
    return e;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setPaying(true);
    setTimeout(() => { setPaying(false); setSubmitted(true); }, 1800);
  }

  if (submitted) {
    return (
      <div className="pt-nav min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#000000" }}>
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6 animate-float">🎉</div>
          <h1 className="font-display font-black text-5xl mb-4" style={{ color: "#ffffff" }}>You're Booked!</h1>
          <p className="text-base mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            We've received your trial booking for <strong style={{ color: "#FFD700" }}>{childName}</strong>.
          </p>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            A FunSkill coach will reach out within 24 hours to confirm your session details and send the payment receipt.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="px-8 py-4 rounded-full font-semibold" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
              Back to Home
            </Link>
            <Link to="/programs" className="px-8 py-4 rounded-full font-semibold" style={{ border: "2px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
              Explore Programs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-nav" style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
      {/* Header */}
      <div className="relative overflow-hidden py-16 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,215,0,0.08) 0%, transparent 70%)" }} />
        {["⭐","🎉","🌟","✨"].map((e, i) => (
          <span key={i} className="absolute text-xl select-none pointer-events-none"
            style={{ top: `${20 + i * 20}%`, left: i % 2 === 0 ? `${5 + i * 3}%` : undefined, right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined, animation: `float ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
            {e}
          </span>
        ))}
        <div className="relative text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Free Trial Session</p>
          <h1 className="font-display font-black mb-3" style={{ fontSize: "clamp(2.5rem,7vw,5rem)", color: "#ffffff" }}>
            Book Your<br /><span style={{ color: "#FFD700" }}>Free Trial!</span>
          </h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            45 minutes of fun. All equipment provided. No experience needed. <br />All fields below are required.
          </p>
        </div>
      </div>

      <div className="px-6 pb-24">
        <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto space-y-8">

          {/* ── STEP 1: Choose Skill ── */}
          <div className="rounded-3xl p-7 space-y-5" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.15)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>1</div>
              <h2 className="font-display font-bold text-xl" style={{ color: "#ffffff" }}>Choose a Program</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SKILLS.map((s) => (
                <button type="button" key={s.id} onClick={() => { setSkill(s.id); setErrors((p) => ({ ...p, skill: "" })); }}
                  className="py-5 rounded-2xl flex flex-col items-center gap-2 text-sm font-bold transition-all hover:scale-105"
                  style={skill === s.id
                    ? { background: `linear-gradient(135deg,${s.color}30,${s.color}15)`, border: `2px solid ${s.color}`, color: s.color, boxShadow: `0 4px 20px ${s.color}30` }
                    : { backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }
                  }>
                  <span className="text-3xl">{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
            {errors.skill && <p className="text-xs" style={{ color: "#ff6b6b" }}>⚠ {errors.skill}</p>}
          </div>

          {/* ── STEP 2: Child & Parent Details ── */}
          <div className="rounded-3xl p-7 space-y-5" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.15)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>2</div>
              <h2 className="font-display font-bold text-xl" style={{ color: "#ffffff" }}>Your Details</h2>
            </div>

            <Field label="Child's First Name" error={errors.childName}>
              <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Amara" className={inputFocus} style={inputStyle} />
            </Field>

            <Field label="Child's Age" error={errors.childAge}>
              <input type="number" min={2} max={20} value={childAge} onChange={(e) => setChildAge(e.target.value)}
                placeholder="e.g. 8" className={inputFocus} style={inputStyle} />
            </Field>

            <Field label="Parent / Guardian Full Name" error={errors.parentName}>
              <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)}
                placeholder="Your full name" className={inputFocus} style={inputStyle} />
            </Field>

            <Field label="Email Address" error={errors.email}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" className={inputFocus} style={inputStyle} />
            </Field>

            <Field label="Phone Number" error={errors.phone}>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 7XX XXX XXX or +44 7XXX XXXXXX" className={inputFocus} style={inputStyle} />
            </Field>

            <Field label="Preferred Location" error={errors.location}>
              <select value={location} onChange={(e) => setLocation(e.target.value)}
                className={inputFocus} style={{ ...inputStyle, color: location ? "#ffffff" : "rgba(255,255,255,0.4)" }}>
                <option value="">Select a location…</option>
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
          </div>

          {/* ── STEP 3: Payment ── */}
          <div className="rounded-3xl p-7 space-y-5" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.15)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg,#FFD700,#FFE84D)", color: "#000" }}>3</div>
              <h2 className="font-display font-bold text-xl" style={{ color: "#ffffff" }}>Payment Method</h2>
            </div>

            <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)" }}>
              <span className="text-lg">🎁</span>
              <div>
                <div className="font-semibold text-sm" style={{ color: "#FFD700" }}>Trial Session Fee: £10 / KES 1,500</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>One-time registration & equipment deposit — fully refundable if you don't continue.</div>
              </div>
            </div>

            {errors.payMethod && <p className="text-xs" style={{ color: "#ff6b6b" }}>⚠ {errors.payMethod}</p>}

            <div className="grid grid-cols-2 gap-4">
              {/* M-Pesa */}
              <button type="button" onClick={() => { setPayMethod("mpesa"); setErrors((p) => ({ ...p, payMethod: "" })); }}
                className="relative p-5 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
                style={payMethod === "mpesa"
                  ? { background: "linear-gradient(135deg,rgba(0,175,79,0.2),rgba(0,175,79,0.08))", border: "2px solid #00af4f", boxShadow: "0 4px 24px rgba(0,175,79,0.25)" }
                  : { backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                }>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg" style={{ backgroundColor: "#00af4f", color: "#ffffff" }}>M</div>
                <div>
                  <div className="font-bold text-sm text-center" style={{ color: payMethod === "mpesa" ? "#00af4f" : "#ffffff" }}>M-Pesa</div>
                  <div className="text-xs text-center" style={{ color: "rgba(255,255,255,0.4)" }}>Mobile Money</div>
                </div>
                {payMethod === "mpesa" && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#00af4f", color: "#fff" }}>✓</span>}
              </button>

              {/* PayPal */}
              <button type="button" onClick={() => { setPayMethod("paypal"); setErrors((p) => ({ ...p, payMethod: "" })); }}
                className="relative p-5 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
                style={payMethod === "paypal"
                  ? { background: "linear-gradient(135deg,rgba(0,112,186,0.2),rgba(0,112,186,0.08))", border: "2px solid #0070ba", boxShadow: "0 4px 24px rgba(0,112,186,0.25)" }
                  : { backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                }>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0070ba" }}>
                  <span className="font-black text-xl" style={{ color: "#ffffff", fontFamily: "serif", fontStyle: "italic" }}>P</span>
                </div>
                <div>
                  <div className="font-bold text-sm text-center" style={{ color: payMethod === "paypal" ? "#0070ba" : "#ffffff" }}>PayPal</div>
                  <div className="text-xs text-center" style={{ color: "rgba(255,255,255,0.4)" }}>Card / Online</div>
                </div>
                {payMethod === "paypal" && <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#0070ba", color: "#fff" }}>✓</span>}
              </button>
            </div>

            {/* M-Pesa number field */}
            {payMethod === "mpesa" && (
              <div className="space-y-3 rounded-2xl p-5" style={{ backgroundColor: "rgba(0,175,79,0.07)", border: "1px solid rgba(0,175,79,0.2)" }}>
                <p className="text-sm font-semibold" style={{ color: "#00af4f" }}>M-Pesa Payment Details</p>
                <Field label="M-Pesa Phone Number" error={errors.mpesaNum}>
                  <input type="tel" value={mpesaNum} onChange={(e) => setMpesaNum(e.target.value)}
                    placeholder="+254 7XX XXX XXX" className={inputFocus}
                    style={{ backgroundColor: "rgba(0,175,79,0.08)", color: "#ffffff", border: "1px solid rgba(0,175,79,0.3)" }} />
                </Field>
                <div className="text-xs space-y-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <p>📱 After submitting, you will receive an <strong style={{ color: "#00af4f" }}>M-Pesa STK Push</strong> to authorise KES 1,500.</p>
                  <p>📋 Paybill: <strong style={{ color: "#ffffff" }}>000000</strong> · Account: <strong style={{ color: "#ffffff" }}>FUNSKILL</strong></p>
                </div>
              </div>
            )}

            {/* PayPal info */}
            {payMethod === "paypal" && (
              <div className="rounded-2xl p-5 space-y-2" style={{ backgroundColor: "rgba(0,112,186,0.07)", border: "1px solid rgba(0,112,186,0.2)" }}>
                <p className="text-sm font-semibold" style={{ color: "#0070ba" }}>PayPal Payment Details</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  🌍 After submitting, you'll be redirected to PayPal to securely pay <strong style={{ color: "#ffffff" }}>£10</strong>. You can use any debit/credit card or your PayPal balance.
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>PayPal.me: <strong style={{ color: "#ffffff" }}>paypal.me/funskillkids</strong></p>
              </div>
            )}
          </div>

          {/* ── SUBMIT ── */}
          <button type="submit" disabled={paying}
            className="w-full py-5 rounded-full font-black text-lg transition-all hover:scale-105 disabled:opacity-70 disabled:scale-100"
            style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 40px rgba(255,215,0,0.35)" }}>
            {paying
              ? <span className="flex items-center justify-center gap-3"><span className="animate-spin">⏳</span> Processing Payment…</span>
              : payMethod === "mpesa" ? "📱 Pay with M-Pesa & Book Trial →"
              : payMethod === "paypal" ? "🌍 Pay with PayPal & Book Trial →"
              : "🎉 Book My Free Trial →"
            }
          </button>

          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            Fully refundable if you choose not to continue. Your data is kept private and secure.
          </p>
        </form>
      </div>
    </div>
  );
}
