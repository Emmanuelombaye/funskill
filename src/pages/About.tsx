import { Link } from "react-router-dom";

const milestones = [
  { year: "2018", event: "FunSkill founded with 3 coaches and 40 students in London." },
  { year: "2020", event: "Online programs launched. Reached 200+ students across the UK." },
  { year: "2022", event: "School partnerships launched. First 10 schools onboarded." },
  { year: "2023", event: "Expanded to Manchester and Birmingham. 500+ active students." },
  { year: "2024", event: "1,000+ students milestone. 25 coaches. 10 locations." },
  { year: "2026", event: "International expansion underway. Edinburgh and Dublin launching." },
];

const values = [
  { title: "Excellence", desc: "We hold ourselves and our students to the highest standards — never ordinary, always exceptional." },
  { title: "Inclusion", desc: "Every child, every background, every ability — FunSkill is built for everyone." },
  { title: "Joy", desc: "If it's not fun, it's not FunSkill. Energy and enthusiasm are at the heart of every session." },
  { title: "Growth", desc: "We measure success not just in trophies, but in confidence gained and obstacles overcome." },
];

export default function About() {
  return (
    <div className="pt-nav">
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.08) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Our Story</p>
            <h1 className="font-display font-black text-5xl md:text-6xl mb-6" style={{ color: "#ffffff" }}>Built by Athletes.<br />For Champions.</h1>
            <p className="text-base mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              FunSkill was born from a simple belief: children learn best when they're having fun, and they perform best when they feel confident. Founded in 2018 by a group of competitive athletes and education specialists, we set out to create the kind of kids club we wished we'd had growing up.
            </p>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Today, FunSkill operates across 10 locations, partners with 50+ schools, and has helped over 1,000 children discover their potential through Chess and Roller Skating.
            </p>
            <Link to="/book" className="inline-flex px-8 py-4 rounded-full font-semibold text-base" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
              Start Your Journey
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ height: "400px" }}>
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=500&fit=crop&auto=format" alt="FunSkill team" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-4xl text-center mb-12" style={{ color: "#ffffff" }}>Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={v.title} className="p-6 rounded-2xl" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="font-display font-black text-5xl mb-4" style={{ color: i % 2 === 0 ? "#FFD700" : "#ffffff", opacity: 0.3 }}>{String(i+1).padStart(2,"0")}</div>
                <h3 className="font-display font-bold text-2xl mb-3" style={{ color: "#ffffff" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-black text-4xl text-center mb-12" style={{ color: "#ffffff" }}>Our Journey</h2>
          <div className="space-y-6 relative">
            <div className="absolute left-14 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, #FFD700, rgba(255,215,0,0.1))" }} />
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 items-start relative">
                <div className="font-display font-black text-sm pt-0.5 w-10 shrink-0 text-right" style={{ color: "#FFD700" }}>{m.year}</div>
                <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 z-10" style={{ backgroundColor: "#FFD700", boxShadow: "0 0 12px rgba(255,215,0,0.5)" }} />
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
