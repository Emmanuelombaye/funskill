import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TrackPage } from "../portal/track";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCounter({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-black text-6xl md:text-7xl mb-1" style={{ color: "#FFD700" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
    </div>
  );
}

const programs = [
  { age: "Ages 4–6", name: "Tiny Champions", desc: "First steps into Chess and Skating through play-based discovery.", icon: "★" },
  { age: "Ages 7–10", name: "Young Explorers", desc: "Structured skill-building with friendly competition and teamwork.", icon: "⚡" },
  { age: "Ages 11–14", name: "Rising Stars", desc: "Advanced technique, tactical training, and tournament preparation.", icon: "◆" },
  { age: "Ages 15+", name: "Future Champions", desc: "Elite-level coaching for competitive athletes and aspiring champions.", icon: "▲" },
];

const benefits = [
  { icon: "🏆", title: "Professional Coaches", desc: "Certified experts with competitive experience" },
  { icon: "🛡️", title: "Safe Environment", desc: "Purpose-built, fully supervised training spaces" },
  { icon: "📈", title: "Beginner to Advanced", desc: "Structured pathways for every skill level" },
  { icon: "💪", title: "Confidence Building", desc: "Skills that go beyond the sport or game" },
  { icon: "🎯", title: "Competitive Opportunities", desc: "Tournaments, leagues, and championships" },
  { icon: "🎉", title: "Fun & Engaging", desc: "Training that keeps children coming back" },
];

const testimonials = [
  {
    name: "Sarah K.", role: "Parent of Alex, 9",
    text: "My son has completely transformed since joining FunSkill. His focus, confidence and patience have all improved — not just in chess, but in school too.",
    avatar: "SK",
  },
  {
    name: "Priya M.", role: "Parent of twins, 11",
    text: "Both my children joined the skating program and love every session. The coaches are professional, patient and genuinely care about progress.",
    avatar: "PM",
  },
  {
    name: "James O.", role: "Parent of Lily, 7",
    text: "We tried so many activities before FunSkill. This is the first one where Lily asks to go every single week. The energy is incredible.",
    avatar: "JO",
  },
];

const steps = [
  { num: "01", title: "Choose a Skill", desc: "Pick Chess, Roller Skating, or both." },
  { num: "02", title: "Book a Trial", desc: "Free trial session — no commitment needed." },
  { num: "03", title: "Train With Coaches", desc: "Personalized coaching matched to your level." },
  { num: "04", title: "Grow & Compete", desc: "Build confidence, enter competitions, excel." },
];

const locations = [
  { city: "London", count: 4, img: "photo-1513635269975-59663e0ac1ad" },
  { city: "Manchester", count: 2, img: "photo-1529655683826-aba9b3e77383" },
  { city: "Birmingham", count: 2, img: "photo-1570168007204-dfb528c6958f" },
  { city: "Edinburgh", count: 1, img: "photo-1506377711776-dbdc2f3c20d9" },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<"all" | "chess" | "skating">("all");

  return (
    <div>
      <TrackPage page="home" />
      <section className="relative min-h-screen flex items-center pt-nav overflow-hidden" style={{ backgroundColor: "#000000" }}>
        {/* bg shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFD700 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(-40%, 40%)" }} />
          {/* diagonal accent */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 60%, rgba(255,215,0,0.04) 100%)" }} />
          {/* grid lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,215,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px"
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6" style={{ backgroundColor: "rgba(255,215,0,0.12)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Learn · Play · Master
            </div>
            <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: "clamp(3.5rem,8vw,7rem)", color: "#ffffff", letterSpacing: "-0.02em" }}>
              Turn Skills<br />
              <span style={{ color: "#FFD700", WebkitTextStroke: "0" }}>Into</span>{" "}
              <span style={{ WebkitTextStroke: "2px #ffffff", color: "transparent" }}>Confidence.</span>
            </h1>
            <p className="text-lg mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.7" }}>
              FunSkill helps children learn, compete and grow through Chess and Roller Skating — in a professional, energetic, and supportive environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-xl" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 32px rgba(255,215,0,0.35)" }}>
                Book a Free Trial
              </Link>
              <Link to="/programs" className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:border-orange-400" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}>
                Explore Programs →
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div>
                <div className="font-display font-black text-3xl" style={{ color: "#FFD700" }}>1,000+</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Students</div>
              </div>
              <div className="h-8 w-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              <div>
                <div className="font-display font-black text-3xl" style={{ color: "#FFD700" }}>25+</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Coaches</div>
              </div>
              <div className="h-8 w-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              <div>
                <div className="font-display font-black text-3xl" style={{ color: "#FFD700" }}>10+</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Locations</div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block animate-float">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl overflow-hidden h-64" style={{ border: "1px solid rgba(255,215,0,0.2)" }}>
                <img src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&h=400&fit=crop&auto=format" alt="Children playing chess" className="w-full h-full object-cover" style={{ filter: "saturate(1.1)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, rgba(8,12,26,0.6) 0%, transparent 50%)" }} />
              </div>
              <div className="rounded-2xl overflow-hidden h-48" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                <img src="https://images.unsplash.com/photo-1564989209397-e0aebffb4ce5?w=400&h=400&fit=crop&auto=format" alt="Roller skating" className="w-full h-full object-cover" style={{ filter: "saturate(1.2)" }} />
              </div>
              <div className="rounded-2xl overflow-hidden h-48" style={{ border: "1px solid rgba(255,208,0,0.2)" }}>
                <img src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400&h=400&fit=crop&auto=format" alt="Young athlete" className="w-full h-full object-cover" style={{ filter: "saturate(1.2)" }} />
              </div>
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.3)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}>
              <div className="text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Next Trial Batch</div>
              <div className="font-display font-bold text-lg" style={{ color: "#FFD700" }}>Sep 15, 2026</div>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll</div>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, rgba(255,215,0,0.6), transparent)" }} />
        </div>
      </section>

      {/* CORE PROGRAMS */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>What We Teach</p>
            <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: "#ffffff" }}>Four Skills.<br />One Kids Club. 🎉</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Chess */}
            <Link to="/chess" className="group relative rounded-3xl overflow-hidden block" style={{ minHeight: "420px" }}>
              <img src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&h=600&fit=crop&auto=format" alt="Chess" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: "#FFD700", color: "#000000" }}>♟ Chess</div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="font-display font-bold text-base tracking-widest mb-2" style={{ color: "#FFD700" }}>THINK. STRATEGIZE. WIN.</p>
                <h3 className="font-display font-black text-4xl mb-4" style={{ color: "#ffffff" }}>Chess Program</h3>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {["Critical Thinking", "Strategy", "Competition", "Ages 4+"].map((t) => (
                    <li key={t} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,215,0,0.15)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,215,0,0.2)" }}>{t}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-4 transition-all" style={{ color: "#FFD700" }}>Explore Chess →</span>
              </div>
            </Link>

            {/* Skating */}
            <Link to="/skating" className="group relative rounded-3xl overflow-hidden block" style={{ minHeight: "420px" }}>
              <img src="https://images.unsplash.com/photo-1775482767815-3fb3a0fca405?w=800&h=600&fit=crop&auto=format" alt="Roller Skating" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: "#FFD700", color: "#000000" }}>⛸ Skating</div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="font-display font-bold text-base tracking-widest mb-2" style={{ color: "#FFD700" }}>BALANCE. MOVE. FLY.</p>
                <h3 className="font-display font-black text-4xl mb-4" style={{ color: "#ffffff" }}>Roller Skating</h3>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {["Balance & Coordination", "Fitness", "Confidence", "Ages 4+"].map((t) => (
                    <li key={t} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,215,0,0.15)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,215,0,0.2)" }}>{t}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-4 transition-all" style={{ color: "#FFD700" }}>Explore Skating →</span>
              </div>
            </Link>

            {/* Ballet */}
            <Link to="/ballet" className="group relative rounded-3xl overflow-hidden block" style={{ minHeight: "420px" }}>
              <img src="https://images.unsplash.com/photo-1685339009948-d807094b1457?w=800&h=600&fit=crop&auto=format" alt="Ballet" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: "#FFD700", color: "#000000" }}>🩰 Ballet</div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="font-display font-bold text-base tracking-widest mb-2" style={{ color: "#FFD700" }}>GRACE. MOVE. SHINE.</p>
                <h3 className="font-display font-black text-4xl mb-4" style={{ color: "#ffffff" }}>Ballet Program</h3>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {["Posture & Grace", "Musicality", "RAD Exams", "Ages 3+"].map((t) => (
                    <li key={t} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,215,0,0.15)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,215,0,0.2)" }}>{t}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-4 transition-all" style={{ color: "#FFD700" }}>Explore Ballet →</span>
              </div>
            </Link>

            {/* Taekwondo */}
            <Link to="/taekwondo" className="group relative rounded-3xl overflow-hidden block" style={{ minHeight: "420px" }}>
              <img src="https://images.unsplash.com/photo-1530560643359-6d2fead989b3?w=800&h=600&fit=crop&auto=format" alt="Taekwondo" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: "#FFD700", color: "#000000" }}>🥋 Taekwondo</div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="font-display font-bold text-base tracking-widest mb-2" style={{ color: "#FFD700" }}>KICK. FOCUS. CONQUER.</p>
                <h3 className="font-display font-black text-4xl mb-4" style={{ color: "#ffffff" }}>Taekwondo Program</h3>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {["Discipline", "Self-Defence", "Belt Progression", "Ages 4+"].map((t) => (
                    <li key={t} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,215,0,0.15)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,215,0,0.2)" }}>{t}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-4 transition-all" style={{ color: "#FFD700" }}>Explore Taekwondo →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY FUNSKILL */}
      <section className="py-24 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Our Edge</p>
              <h2 className="font-display font-black text-5xl md:text-6xl mb-6" style={{ color: "#ffffff" }}>Why Families<br />Choose FunSkill</h2>
              <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>
                We've built a system where every child thrives — from their very first lesson to their first competition. Here's what makes us different.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: "#FFD700" }}>
                Learn about our approach →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="p-6 rounded-2xl transition-all hover:-translate-y-1" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#ffffff" }}>{b.title}</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Simple Journey</p>
            <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: "#ffffff" }}>How FunSkill Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute top-8 left-full w-full h-px hidden lg:block" style={{ background: "linear-gradient(to right, rgba(255,215,0,0.4), transparent)" }} />
                )}
                <div className="font-display font-black text-7xl mb-4 leading-none" style={{ color: "rgba(255,215,0,0.12)" }}>{s.num}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm mb-4" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
                  {parseInt(s.num)}
                </div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#ffffff" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS BY AGE */}
      <section className="py-24 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Programs</p>
              <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: "#ffffff" }}>Find Your Level</h2>
            </div>
            <div className="flex gap-2">
              {(["all", "chess", "skating"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-2 rounded-full text-sm font-medium capitalize transition-all"
                  style={activeFilter === f
                    ? { background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }
                    : { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {f === "all" ? "All Programs" : f === "chess" ? "Chess" : "Skating"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((p, i) => (
              <Link to="/programs" key={p.name} className="group p-6 rounded-2xl transition-all hover:-translate-y-2 hover:shadow-2xl block" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="font-display font-black text-4xl mb-4 group-hover:scale-110 transition-transform inline-block" style={{ color: i % 2 === 0 ? "#FFD700" : "#ffffff" }}>
                  {p.icon}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{p.age}</div>
                <h3 className="font-display font-bold text-2xl mb-3" style={{ color: "#ffffff" }}>{p.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(135deg, #141414 0%, #1e1e1e 100%)", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,215,0,0.08) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Our Impact</p>
            <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: "#ffffff" }}>FunSkill in Numbers</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <StatCounter value={1000} label="Students" />
            <StatCounter value={25} label="Coaches" />
            <StatCounter value={50} label="Schools" />
            <StatCounter value={10} label="Locations" />
          </div>
        </div>
      </section>

      {/* SCHOOLS CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #141414 0%, #1e1e1e 50%, #141414 100%)", border: "1px solid rgba(255,215,0,0.15)" }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFD700, transparent)", transform: "translate(40%, -40%)" }} />
            </div>
            <div className="relative p-10 md:p-16 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>For Schools & Organizations</p>
                <h2 className="font-display font-black text-4xl md:text-5xl mb-4" style={{ color: "#ffffff" }}>Bring FunSkill to Your School</h2>
                <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                  We deliver structured Chess and Roller Skating programs directly into schools and organizations — structured, curriculum-aligned, and fully coached.
                </p>
                <Link to="/schools" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 32px rgba(255,215,0,0.3)" }}>
                  Partner With FunSkill
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["50+ Schools", "Chess & Skating", "Curriculum-aligned", "Turnkey delivery"].map((f) => (
                  <div key={f} className="px-4 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: "rgba(255,215,0,0.1)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,215,0,0.15)" }}>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Testimonials</p>
            <h2 className="font-display font-black text-5xl md:text-6xl" style={{ color: "#ffffff" }}>What Families Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 rounded-2xl" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map((s) => <span key={s} className="text-lg" style={{ color: "#FFD700" }}>★</span>)}
                </div>
                <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#ffffff" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Locations</p>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-4" style={{ color: "#ffffff" }}>Find a FunSkill Kids Club<br />Near You</h2>
            <div className="max-w-sm mx-auto mt-6 flex gap-2">
              <input type="text" placeholder="Search city..." className="flex-1 px-5 py-3 rounded-full text-sm outline-none" style={{ backgroundColor: "#141414", color: "#ffffff", border: "1px solid rgba(255,215,0,0.2)" }} />
              <button className="px-6 py-3 rounded-full font-semibold text-sm" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>Search</button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {locations.map((l) => (
              <Link to="/locations" key={l.city} className="group rounded-2xl overflow-hidden relative block" style={{ height: "200px" }}>
                <img src={`https://images.unsplash.com/${l.img}?w=400&h=300&fit=crop&auto=format`} alt={l.city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,12,26,0.9) 0%, rgba(8,12,26,0.2) 60%, transparent 100%)" }} />
                <div className="absolute bottom-4 left-4">
                  <div className="font-display font-black text-2xl" style={{ color: "#ffffff" }}>{l.city}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{l.count} academies</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,215,0,0.15) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3rem,7vw,6rem)", color: "#ffffff" }}>
            Ready to Discover<br />
            <span style={{ color: "#FFD700" }}>Your Skill?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>Start your FunSkill journey today. No experience required — just the desire to grow.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book" className="px-10 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-xl" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 40px rgba(255,215,0,0.4)" }}>
              Book a Free Trial
            </Link>
            <Link to="/contact" className="px-10 py-4 rounded-full font-semibold text-base transition-all hover:border-orange-400" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
