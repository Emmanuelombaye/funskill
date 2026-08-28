import { Link } from "react-router-dom";

const benefits = [
  { icon: "📋", title: "Curriculum-Aligned", desc: "Sessions designed to complement PSHE, PE, and enrichment goals." },
  { icon: "🏫", title: "On-Site Delivery", desc: "We come to you — no travel, no logistics headaches." },
  { icon: "👩‍🏫", title: "Certified Coaches", desc: "DBS-checked, qualified professionals with school delivery experience." },
  { icon: "📊", title: "Progress Reports", desc: "Termly reporting on participation and individual development." },
  { icon: "🎯", title: "Flexible Formats", desc: "Lunchtime clubs, after-school, curriculum time, and enrichment days." },
  { icon: "🤝", title: "Partnership Support", desc: "Dedicated school liaison from first enquiry through to delivery." },
];

export default function Schools() {
  return (
    <div className="pt-16">
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,215,0,0.15), transparent)", transform: "translate(30%, -30%)" }} />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Schools & Organizations</p>
            <h1 className="font-display font-black text-5xl md:text-6xl mb-6" style={{ color: "#ffffff" }}>Bring FunSkill<br />to Your School</h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
              We partner with primary and secondary schools, academies, trusts, and organizations to deliver world-class Chess and Roller Skating programs — structured, inspiring, and fully managed.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
              Partner With FunSkill
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden h-48">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop&auto=format" alt="School Chess" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 mt-6">
              <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=400&h=300&fit=crop&auto=format" alt="School Skating" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-4xl text-center mb-12" style={{ color: "#ffffff" }}>Why Schools Love FunSkill</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#ffffff" }}>{b.title}</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-black text-4xl text-center mb-4" style={{ color: "#ffffff" }}>Make an Enquiry</h2>
          <p className="text-center mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>Tell us about your school and we'll get back to you within 24 hours.</p>
          <div className="rounded-2xl p-8 space-y-4" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { label: "School / Organization Name", type: "text", placeholder: "e.g. St Mary's Primary School" },
              { label: "Your Name", type: "text", placeholder: "Full name" },
              { label: "Email Address", type: "email", placeholder: "you@school.ac.uk" },
              { label: "Phone Number", type: "tel", placeholder: "+44 7700 000000" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>Interested In</label>
              <div className="flex flex-wrap gap-2">
                {["Chess", "Skating", "Both"].map((opt) => (
                  <button key={opt} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: "rgba(255,215,0,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,215,0,0.2)" }}>{opt}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>Message</label>
              <textarea rows={4} placeholder="Tell us about your school, pupil numbers, and any specific requirements..." className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
            <button className="w-full py-4 rounded-full font-semibold text-base" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
              Send Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
