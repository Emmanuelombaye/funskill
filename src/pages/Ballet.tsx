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

const levels = [
  {
    tag: "Ages 3–5", name: "Little Swans", emoji: "🩰",
    color: "#FFD700",
    items: ["Introduction to music & rhythm", "Basic positions (1st, 2nd)", "Creative movement", "Mini performances"],
    img: "https://images.unsplash.com/photo-1685339009948-d807094b1457?w=600&h=500&fit=crop&auto=format",
    desc: "Tiny dancers discover grace, rhythm, and the joy of movement in a playful, nurturing environment.",
  },
  {
    tag: "Ages 6–9", name: "Rising Dancers", emoji: "🌟",
    color: "#FFE84D",
    items: ["Classical technique foundations", "Barre exercises", "Centre work", "Simple choreography", "End-of-term shows"],
    img: "https://images.unsplash.com/photo-1677603142181-6e49eb1a3c10?w=600&h=500&fit=crop&auto=format",
    desc: "Building real technique with proper posture, musicality, and growing confidence on stage.",
  },
  {
    tag: "Ages 10–14", name: "Junior Ballerinas", emoji: "💫",
    color: "#ffffff",
    items: ["Advanced barre & centre", "Pointe preparation", "Character dance", "RAD exam preparation", "Festival competitions"],
    img: "https://images.unsplash.com/photo-1621004612697-2b177e183326?w=600&h=500&fit=crop&auto=format",
    desc: "Serious classical training — technique, artistry, and competition readiness.",
  },
  {
    tag: "Ages 15+", name: "Senior Company", emoji: "🏅",
    color: "#FFD700",
    items: ["Professional technique", "Pointe work", "Contemporary fusion", "Full productions", "Audition coaching"],
    img: "https://images.unsplash.com/photo-1595348514401-eca68a3bea33?w=600&h=500&fit=crop&auto=format",
    desc: "Elite ballet training for those pursuing performance, competition, or professional pathways.",
  },
];

const benefits = [
  { icon: "🎵", title: "Musicality", desc: "Children develop a deep connection to music and rhythm that lasts a lifetime." },
  { icon: "🧘", title: "Posture & Grace", desc: "Ballet builds the strongest, most elegant posture of any discipline." },
  { icon: "💪", title: "Core Strength", desc: "Every class builds real functional strength disguised as beautiful movement." },
  { icon: "🎭", title: "Artistic Expression", desc: "A safe space to feel, express, and communicate without words." },
  { icon: "🧠", title: "Focus & Memory", desc: "Learning sequences trains memory, attention, and cognitive flexibility." },
  { icon: "🌸", title: "Confidence", desc: "Performing builds the kind of confidence that shines in every area of life." },
];

const faqs = [
  { q: "Does my child need ballet shoes before the trial?", a: "No — we provide everything needed for the trial session. After joining, we recommend soft leather ballet shoes in the appropriate pink or white colour." },
  { q: "Do boys do ballet too?", a: "Absolutely! Ballet is for everyone. Our boys' classes follow the same technique with additional focus on jumps, turns and partnering at senior levels." },
  { q: "What should my child wear to the trial?", a: "Comfortable clothing they can move in — leggings and a fitted top are perfect. Hair should be tied back. We provide a FunSkill ballet kit list on enrolment." },
  { q: "Do you prepare for RAD exams?", a: "Yes — from Junior Ballerinas level upwards we offer RAD (Royal Academy of Dance) exam preparation alongside our main curriculum." },
];

export default function Ballet() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["🩰","🌸","✨","💫","🎵","⭐"].map((e, i) => (
            <span key={i} className="absolute text-2xl select-none"
              style={{ top: `${10 + i * 14}%`, left: i % 2 === 0 ? `${4 + i * 2}%` : undefined, right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined, animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}>
              {e}
            </span>
          ))}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,232,77,0.06) 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 V80 H0Z" fill="rgba(255,215,0,0.04)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-wiggle"
              style={{ backgroundColor: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>
              🩰 FunSkill Kids Club
            </div>
            <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3.5rem,9vw,8rem)", color: "#ffffff" }}>
              GRACE.<br />
              <span style={{ color: "#FFD700" }}>MOVE.</span><br />
              <span style={{ WebkitTextStroke: "2px #FFD700", color: "transparent" }}>SHINE.</span>
            </h1>
            <p className="text-lg mb-4 font-display font-bold tracking-wider" style={{ color: "#FFE84D" }}>Ballet Program</p>
            <p className="text-base mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.8" }}>
              Classical ballet training for all ages — from tiny first steps to stage-ready performances. Elegant, joyful, and transformative.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 40px rgba(255,215,0,0.4)" }}>
                🩰 Book a Free Ballet Trial
              </Link>
              <a href="#levels" className="px-8 py-4 rounded-full font-semibold text-base"
                style={{ border: "2px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
                See Levels ↓
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12">
              {[["3–15+", "Age range"], ["RAD", "Exam ready"], ["1:6", "Coach ratio"], ["Free", "First trial"]].map(([val, lbl]) => (
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
              <img src="https://images.unsplash.com/photo-1685339009948-d807094b1457?w=500&h=700&fit=crop&auto=format" alt="Ballerinas in dance studio" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ height: "182px" }}>
              <img src="https://images.unsplash.com/photo-1677603142181-6e49eb1a3c10?w=400&h=280&fit=crop&auto=format" alt="Ballet shoes" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ height: "182px" }}>
              <img src="https://images.unsplash.com/photo-1621004612697-2b177e183326?w=400&h=280&fit=crop&auto=format" alt="Ballet dancer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl" style={{ backgroundColor: "#FFD700", color: "#000000", boxShadow: "0 12px 40px rgba(255,215,0,0.4)" }}>
              <div className="font-display font-black text-2xl leading-none">🩰</div>
              <div className="font-bold text-xs mt-0.5">All Ages Welcome!</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6 relative" style={{ backgroundColor: "#080808" }}>
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 60" fill="none"><path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 V0 H0Z" fill="#000000" /></svg>
        <div className="max-w-7xl mx-auto relative">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Why Ballet?</p>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#ffffff" }}>More Than Dance 🌸</h2>
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
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" fill="none"><path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 V60 H0Z" fill="#000000" /></svg>
      </section>

      {/* PHOTO STRIP */}
      <section className="py-16 px-6" style={{ backgroundColor: "#000000" }}>
        <FadeIn className="text-center mb-10">
          <h2 className="font-display font-black text-4xl md:text-5xl" style={{ color: "#ffffff" }}>Beautiful Moments <span className="animate-wiggle inline-block">🌟</span></h2>
        </FadeIn>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { url: "https://images.unsplash.com/photo-1685339009948-d807094b1457?w=400&h=500&fit=crop&auto=format", alt: "Ballerinas in studio", h: "h-64 md:h-80" },
            { url: "https://images.unsplash.com/photo-1677603142181-6e49eb1a3c10?w=400&h=300&fit=crop&auto=format", alt: "Ballet shoes", h: "h-48 md:h-64" },
            { url: "https://images.unsplash.com/photo-1621004612697-2b177e183326?w=400&h=500&fit=crop&auto=format", alt: "Ballet dancer", h: "h-64 md:h-80" },
            { url: "https://images.unsplash.com/photo-1595348514401-eca68a3bea33?w=400&h=300&fit=crop&auto=format", alt: "Dance performance", h: "h-48 md:h-64" },
          ].map((img, i) => (
            <FadeIn key={img.alt} delay={i * 100}>
              <div className={`rounded-3xl overflow-hidden ${img.h} group`}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* LEVELS */}
      <section id="levels" className="py-24 px-6 relative" style={{ backgroundColor: "#080808" }}>
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 60" fill="none"><path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 V0 H0Z" fill="#000000" /></svg>
        <div className="max-w-7xl mx-auto relative">
          <FadeIn className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Programs by Age</p>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#ffffff" }}>Find Your Level 🩰</h2>
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
              <img key={activeLevel} src={levels[activeLevel].img} alt={levels[activeLevel].name} className="absolute inset-0 w-full h-full object-cover" style={{ transition: "opacity 0.5s ease" }} />
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
                Book a Trial for This Level →
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
          <div className="text-7xl mb-6 animate-float">🩰</div>
          <h2 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "#ffffff" }}>
            Ready to<br /><span style={{ color: "#FFD700" }}>Start Dancing?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>Free 45-minute taster class — all equipment provided. No experience needed, just the love of movement!</p>
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
