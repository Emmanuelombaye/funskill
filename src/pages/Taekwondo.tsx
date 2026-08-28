import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const belts = [
  { name: "White Belt", tag: "Ages 4–6 · Beginners", color: "#ffffff", emoji: "🥋", desc: "First steps — discipline, respect, and the basics of stance and movement." },
  { name: "Yellow Belt", tag: "Ages 6–9 · Foundation", color: "#FFD700", emoji: "⚡", desc: "Core kicks, blocks, and patterns. Building confidence and coordination." },
  { name: "Green Belt", tag: "Ages 9–13 · Intermediate", color: "#4ade80", emoji: "🔥", desc: "Advanced patterns, sparring basics, and tournament preparation." },
  { name: "Black Belt", tag: "Ages 13+ · Advanced", color: "#ffffff", emoji: "🏆", desc: "Elite technical mastery, leadership, and national competition readiness." },
];

const levels = [
  {
    tag: "Ages 4–6", name: "Tiger Cubs", emoji: "🐯",
    color: "#FFD700",
    items: ["Bowing & respect", "Basic stances", "Simple kicks & blocks", "Pattern (Poomsae) intro", "Fun games & coordination"],
    img: "https://images.unsplash.com/photo-1530560643359-6d2fead989b3?w=600&h=500&fit=crop&auto=format",
    desc: "Discipline and fun in equal measure. Tiger Cubs learn focus, respect, and their very first techniques.",
  },
  {
    tag: "Ages 7–11", name: "Junior Warriors", emoji: "⚡",
    color: "#FFE84D",
    items: ["Front & side kicks", "Blocking combinations", "Poomsae patterns 1–3", "Sparring fundamentals", "Grading & belt progression"],
    img: "https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=600&h=500&fit=crop&auto=format",
    desc: "Real technique, real discipline. Junior Warriors build strength, speed, and sportsmanship.",
  },
  {
    tag: "Ages 12–15", name: "Rising Champions", emoji: "🔥",
    color: "#ffffff",
    items: ["Advanced kicking combinations", "Competitive sparring", "Patterns 4–8", "Self-defence techniques", "Regional competitions"],
    img: "https://images.unsplash.com/photo-1541836567455-2d41eb6dd9b4?w=600&h=500&fit=crop&auto=format",
    desc: "Competition-ready training with full sparring, advanced patterns, and tournament coaching.",
  },
  {
    tag: "Ages 15+", name: "Black Belt Track", emoji: "🏆",
    color: "#FFD700",
    items: ["Dan-level techniques", "Olympic-style sparring", "Leadership training", "National & international events", "Instructor pathway"],
    img: "https://images.unsplash.com/photo-1583668023935-b79e1c1af0a2?w=600&h=500&fit=crop&auto=format",
    desc: "The elite pathway — for those pursuing black belt, competitive excellence, and the instructor journey.",
  },
];

const benefits = [
  { icon: "🧘", title: "Discipline & Focus", desc: "Structured training instils concentration that transforms school performance." },
  { icon: "💪", title: "Physical Fitness", desc: "Full-body conditioning — strength, flexibility, speed, and endurance." },
  { icon: "🛡️", title: "Self-Defence", desc: "Practical, age-appropriate skills that build genuine safety awareness." },
  { icon: "🤝", title: "Respect & Values", desc: "The tenets of Taekwondo — courtesy, integrity, perseverance — for life." },
  { icon: "🏅", title: "Belt Progression", desc: "Clear, motivating milestone system that celebrates every step forward." },
  { icon: "💥", title: "Confidence", desc: "Earned through hard work — the most authentic confidence there is." },
];

const faqs = [
  { q: "Is Taekwondo safe for young children?", a: "Yes — our Tiger Cubs program is specifically designed for ages 4–6 with controlled, supervised techniques. Safety is our highest priority and all coaches are fully certified and DBS checked." },
  { q: "What equipment does my child need?", a: "For the trial, nothing — we provide dobok (uniform) and all necessary protection. On joining, we recommend purchasing your own dobok and protective gear which we can advise on." },
  { q: "How quickly do children earn belts?", a: "Belt gradings happen every 3–4 months. Progress depends on the individual child, but most students move up a belt every term with consistent attendance." },
  { q: "Is this the Olympic-style Taekwondo?", a: "Yes — we teach WT (World Taekwondo) style, which is the Olympic format. We also incorporate traditional patterns (Poomsae) for a complete martial arts education." },
];

export default function Taekwondo() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["🥋","💥","⚡","🔥","🏆","⭐"].map((e, i) => (
            <span key={i} className="absolute text-2xl select-none"
              style={{ top: `${10 + i * 14}%`, left: i % 2 === 0 ? `${4 + i * 2}%` : undefined, right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined, animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
              {e}
            </span>
          ))}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,232,77,0.07) 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-wiggle"
              style={{ backgroundColor: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>
              🥋 FunSkill Kids Club
            </div>
            <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3.5rem,9vw,8rem)", color: "#ffffff" }}>
              KICK.<br />
              <span style={{ color: "#FFD700" }}>FOCUS.</span><br />
              <span style={{ WebkitTextStroke: "2px #FFD700", color: "transparent" }}>CONQUER.</span>
            </h1>
            <p className="text-lg mb-4 font-display font-bold tracking-wider" style={{ color: "#FFE84D" }}>Taekwondo Program</p>
            <p className="text-base mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.8" }}>
              Olympic-style Taekwondo for all ages. Build discipline, strength, and unstoppable confidence from White Belt to Black Belt.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 40px rgba(255,215,0,0.4)" }}>
                🥋 Book a Free Trial
              </Link>
              <a href="#levels" className="px-8 py-4 rounded-full font-semibold text-base"
                style={{ border: "2px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
                See Levels ↓
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12">
              {[["4–18+", "Age range"], ["WT Style", "Olympic format"], ["1:8", "Coach ratio"], ["Free", "First trial"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="font-display font-black text-3xl" style={{ color: "#FFD700" }}>{val}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image mosaic */}
          <div className="relative grid grid-cols-2 gap-3 animate-float">
            <div className="rounded-3xl overflow-hidden row-span-2" style={{ minHeight: "380px" }}>
              <img src="https://images.unsplash.com/photo-1530560643359-6d2fead989b3?w=500&h=700&fit=crop&auto=format" alt="Girl in karate gi" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ height: "182px" }}>
              <img src="https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=400&h=280&fit=crop&auto=format" alt="Taekwondo practice" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ height: "182px" }}>
              <img src="https://images.unsplash.com/photo-1541836567455-2d41eb6dd9b4?w=400&h=280&fit=crop&auto=format" alt="Taekwondo uniform" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl" style={{ backgroundColor: "#FFD700", color: "#000000", boxShadow: "0 12px 40px rgba(255,215,0,0.4)" }}>
              <div className="font-display font-black text-2xl leading-none">🥋</div>
              <div className="font-bold text-xs mt-0.5">White to Black Belt!</div>
            </div>
          </div>
        </div>
      </section>

      {/* BELT SYSTEM */}
      <section className="py-20 px-6" style={{ backgroundColor: "#080808" }}>
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 60" fill="none"><path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 V0 H0Z" fill="#000000" /></svg>
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Belt Progression</p>
            <h2 className="font-display font-black text-4xl md:text-5xl" style={{ color: "#ffffff" }}>Your Journey to Black Belt 🏅</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {belts.map((b, i) => (
              <FadeIn key={b.name} delay={i * 100}>
                <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: "#141414", border: `1px solid ${b.color}22` }}>
                  <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>{b.emoji}</div>
                  <div className="w-12 h-2 rounded-full mx-auto mb-3" style={{ backgroundColor: b.color }} />
                  <h3 className="font-display font-bold text-lg mb-1" style={{ color: b.color }}>{b.name}</h3>
                  <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>{b.tag}</div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Why Taekwondo?</p>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#ffffff" }}>More Than a Sport 💪</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 80}>
                <div className="p-7 rounded-3xl h-full transition-all hover:-translate-y-2 group" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.1)" }}>
                  <div className="text-4xl mb-4 inline-block group-hover:animate-wiggle">{b.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#FFD700" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section id="levels" className="py-24 px-6 relative" style={{ backgroundColor: "#080808" }}>
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 60" fill="none"><path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 V0 H0Z" fill="#000000" /></svg>
        <div className="max-w-7xl mx-auto relative">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#ffffff" }}>Training Programs 🔥</h2>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {levels.map((l, i) => (
              <button key={l.name} onClick={() => setActiveLevel(i)} className="px-5 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={activeLevel === i ? { background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 4px 20px rgba(255,215,0,0.4)" } : { backgroundColor: "#141414", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {l.emoji} {l.tag}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.15)" }}>
            <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
              <img key={activeLevel} src={levels[activeLevel].img} alt={levels[activeLevel].name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, #141414 100%)" }} />
              <div className="absolute top-6 left-6 text-6xl animate-wiggle" style={{ display: "inline-block" }}>{levels[activeLevel].emoji}</div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: levels[activeLevel].color }}>{levels[activeLevel].tag}</div>
              <h3 className="font-display font-black text-4xl mb-3" style={{ color: "#ffffff" }}>{levels[activeLevel].name}</h3>
              <p className="text-sm mb-7 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{levels[activeLevel].desc}</p>
              <ul className="space-y-3 mb-8">
                {levels[activeLevel].items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold" style={{ backgroundColor: levels[activeLevel].color, color: "#000000" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/book" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm w-fit transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
                Book a Trial →
              </Link>
            </div>
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" fill="none"><path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 V60 H0Z" fill="#000000" /></svg>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-black text-4xl md:text-5xl" style={{ color: "#ffffff" }}>Got Questions? 🙋</h2>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 80}>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.1)" }}>
                  <button className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-semibold text-sm" style={{ color: "#ffffff" }}>{faq.q}</span>
                    <span className="text-xl flex-shrink-0 transition-transform" style={{ color: "#FFD700", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {openFaq === i && <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{faq.a}</div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,215,0,0.1) 0%, transparent 70%)" }} />
        <FadeIn className="relative max-w-3xl mx-auto text-center">
          <div className="text-7xl mb-6 animate-float">🥋</div>
          <h2 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "#ffffff" }}>
            Ready to<br /><span style={{ color: "#FFD700" }}>Start Kicking?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>Free 45-minute taster class. Uniform and protective gear provided. No experience needed — just courage!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book" className="px-10 py-5 rounded-full font-black text-lg transition-all hover:scale-105 hover:shadow-xl" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 48px rgba(255,215,0,0.45)" }}>
              🎉 Book a Free Trial
            </Link>
            <Link to="/contact" className="px-10 py-5 rounded-full font-semibold text-lg" style={{ border: "2px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>Ask a Question</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
