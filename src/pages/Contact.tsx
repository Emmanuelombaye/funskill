export default function Contact() {
  return (
    <div className="pt-nav">
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Get in Touch</p>
              <h1 className="font-display font-black text-5xl md:text-6xl mb-6" style={{ color: "#ffffff" }}>We'd Love<br />to Hear From You</h1>
              <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                Whether you're a parent, a school, or an organization — we're here to help you find the right program.
              </p>
              <div className="space-y-6">
                {[
                  { label: "Email", value: "hello@funskill.co", icon: "✉️" },
                  { label: "Phone", value: "+44 20 0000 0000", icon: "📞" },
                  { label: "Head Office", value: "12 Academy Lane, Shoreditch, London E2 0AB", icon: "📍" },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4 items-start">
                    <div className="text-xl">{c.icon}</div>
                    <div>
                      <div className="text-xs uppercase tracking-wider font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</div>
                      <div className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8 space-y-4" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
              {[
                { label: "Your Name", type: "text", placeholder: "Full name" },
                { label: "Email Address", type: "email", placeholder: "your@email.com" },
                { label: "Phone (optional)", type: "tel", placeholder: "+44 7700 000000" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.08)" }} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>I'm enquiring about</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <option>Children's program</option>
                  <option>School partnership</option>
                  <option>Coaching opportunities</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" placeholder="How can we help?" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
              <button className="w-full py-4 rounded-full font-semibold text-base" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
