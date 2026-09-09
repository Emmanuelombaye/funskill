import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { skating, imgFast, imgHero } from "../data/images";

/* ─── tiny reusable animated entrance hook ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── floating emoji confetti ─── */
const CONFETTI = ["⭐", "🌟", "✨", "🎉", "🎊", "💥", "🔥", "🏆"];

function FloatingEmoji({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <span
      className="absolute pointer-events-none select-none text-2xl"
      style={{ ...style, animation: `float ${3 + Math.random() * 2}s ease-in-out infinite` }}
    >
      {emoji}
    </span>
  );
}

/* ─── skill level data ─── */
const levels = [
  {
    tag: "Ages 4–6",
    name: "Tiny Rollers",
    emoji: "🐣",
    color: "#FFD700",
    items: ["Helmet & pad fitting", "First steps on skates", "Standing balance", "Falling safely", "Rolling fun games"],
    img: skating[1],
    desc: "Pure play and discovery. Children get comfortable on wheels in the most joyful, pressure-free way.",
  },
  {
    tag: "Ages 7–10",
    name: "Gliders",
    emoji: "⚡",
    color: "#FFE84D",
    items: ["Gliding & stopping", "Forward crossovers", "Backward skating", "Slalom cones", "Mini races"],
    img: skating[2],
    desc: "Core technique established. Speed, control, and the first taste of real competition.",
  },
  {
    tag: "Ages 11–14",
    name: "Speedsters",
    emoji: "🚀",
    color: "#ffffff",
    items: ["Speed drills", "Jump introduction", "Ramp basics", "Team relay racing", "Regional showcases"],
    img: skating[3],
    desc: "Serious progression. Advanced footwork, ramp technique, and regional-level competition.",
  },
  {
    tag: "Ages 15+",
    name: "Champions",
    emoji: "🏆",
    color: "#FFD700",
    items: ["Pro-level tricks", "Vert & street", "Race training", "Strength & conditioning", "National competition"],
    img: skating[4],
    desc: "Elite coaching for those chasing medals, records, and their full athletic potential.",
  },
];

const benefits = [
  { icon: "⚖️", title: "Balance & Coordination", desc: "Core skills that transfer to every sport and activity." },
  { icon: "❤️", title: "Fitness & Health", desc: "A full-body workout disguised as the best fun of the week." },
  { icon: "💪", title: "Confidence on Wheels", desc: "Every new trick mastered is real, earned self-belief." },
  { icon: "🤝", title: "Teamwork & Friendship", desc: "Group sessions build friendships that last beyond the rink." },
  { icon: "🎯", title: "Goal Setting", desc: "Clear level progressions give children achievable milestones." },
  { icon: "🏅", title: "Compete & Perform", desc: "Local showcases, leagues, and national pathways." },
];

const faqs = [
  { q: "Do children need their own skates?", a: "No — we provide all skates and safety equipment for trial sessions. We recommend purchasing your own skates once your child joins a term." },
  { q: "What should my child wear?", a: "Comfortable clothing that allows movement — joggers and a long-sleeved top are ideal. We supply helmets, wrist guards, knee and elbow pads." },
  { q: "Is it safe for complete beginners?", a: "Absolutely. Our beginner sessions have 1:4 coach-to-child ratios and are specifically designed for children who have never skated before." },
  { q: "How long before my child can skate independently?", a: "Most children are skating confidently within 4–6 sessions. Progress varies, but our structured approach means every child moves forward." },
];

export default function Skating() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-nav overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO — full-bleed with mosaic images
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center" style={{ backgroundColor: "#000000" }}>
        {/* floating confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <FloatingEmoji emoji="⭐" style={{ top: "12%", left: "6%", animationDelay: "0s" }} />
          <FloatingEmoji emoji="🎉" style={{ top: "20%", right: "8%", animationDelay: "0.7s" }} />
          <FloatingEmoji emoji="🌟" style={{ bottom: "30%", left: "3%", animationDelay: "1.3s" }} />
          <FloatingEmoji emoji="✨" style={{ bottom: "15%", right: "5%", animationDelay: "0.4s" }} />
          <FloatingEmoji emoji="💥" style={{ top: "55%", left: "9%", animationDelay: "1s" }} />
          <FloatingEmoji emoji="🔥" style={{ top: "35%", right: "3%", animationDelay: "1.8s" }} />
          {/* yellow glow blobs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,232,77,0.08) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />
          {/* wavy yellow stripe */}
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.06 }}>
            <path d="M0 40 Q180 0 360 40 Q540 80 720 40 Q900 0 1080 40 Q1260 80 1440 40 V80 H0Z" fill="#FFD700" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-wiggle" style={{ backgroundColor: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>
              ⛸ FunSkill Kids Club
            </div>
            <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3.5rem,9vw,8rem)", color: "#ffffff" }}>
              BALANCE.<br />
              <span style={{ color: "#FFD700" }}>MOVE.</span><br />
              <span style={{ WebkitTextStroke: "2px #FFD700", color: "transparent" }}>FLY.</span>
            </h1>
            <p className="text-lg mb-4 font-display font-bold tracking-wider" style={{ color: "#FFE84D", fontSize: "1.2rem" }}>
              Roller Skating Program
            </p>
            <p className="text-base mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.8" }}>
              Feel the speed, master the balance, and build confidence that moves way beyond the rink. For ages 4 to 15+, beginner to champion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book"
                className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 40px rgba(255,215,0,0.4)", fontSize: "1rem" }}>
                🎉 Book a Free Skating Trial
              </Link>
              <a href="#levels" className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:border-yellow-400"
                style={{ border: "2px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
                See Levels ↓
              </a>
            </div>

            {/* quick stats row */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[["4–15+", "Age range"], ["6 weeks", "To skate solo"], ["1:4", "Coach ratio"], ["Free", "First trial"]].map(([val, lbl]) => (
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
              <img src={skating[1]} alt="Kids roller skating" className="w-full h-full object-cover" {...imgHero} />
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ height: "182px" }}>
              <img src={skating[2]} alt="Kids with roller skates" className="w-full h-full object-cover" {...imgFast} />
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ height: "182px" }}>
              <img src={skating[3]} alt="Children rollerblading" className="w-full h-full object-cover" {...imgFast} />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl" style={{ backgroundColor: "#FFD700", color: "#000000", boxShadow: "0 12px 40px rgba(255,215,0,0.4)" }}>
              <div className="font-display font-black text-2xl leading-none">⛸</div>
              <div className="font-bold text-xs mt-0.5">All Levels Welcome!</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY SKATING — benefits grid with icons
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative" style={{ backgroundColor: "#080808" }}>
        {/* decorative wave top */}
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 V0 H0Z" fill="#000000" />
        </svg>

        <div className="max-w-7xl mx-auto relative">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Why Roller Skating?</p>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#ffffff" }}>
              It's More Than<br />Just Skating 🛼
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 80}>
                <div className="p-7 rounded-3xl h-full transition-all hover:-translate-y-2 hover:shadow-2xl group"
                  style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.1)" }}>
                  <div className="text-4xl mb-4 group-hover:animate-wiggle inline-block">{b.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#FFD700" }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 V60 H0Z" fill="#000000" />
        </svg>
      </section>

      {/* ══════════════════════════════════════════
          PHOTO STRIP — scrolling gallery feel
      ══════════════════════════════════════════ */}
      <section className="py-16 px-6" style={{ backgroundColor: "#000000" }}>
        <FadeIn className="text-center mb-10">
          <h2 className="font-display font-black text-4xl md:text-5xl" style={{ color: "#ffffff" }}>
            See the Fun in Action <span className="animate-wiggle inline-block">🎊</span>
          </h2>
        </FadeIn>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { url: skating[4], alt: "Kids skating practice", h: "h-48 md:h-64" },
            { url: skating[5], alt: "Skater in session", h: "h-64 md:h-80" },
            { url: skating[6], alt: "Group skating outdoors", h: "h-48 md:h-64" },
            { url: skating[7], alt: "Skating champions", h: "h-64 md:h-80" },
          ].map((img, i) => (
            <FadeIn key={img.alt} delay={i * 100}>
              <div className={`rounded-3xl overflow-hidden ${img.h} group`}>
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" {...imgFast} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SKILL LEVELS — interactive tabbed cards
      ══════════════════════════════════════════ */}
      <section id="levels" className="py-24 px-6 relative" style={{ backgroundColor: "#080808" }}>
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 60" fill="none">
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 V0 H0Z" fill="#000000" />
        </svg>

        <div className="max-w-7xl mx-auto relative">
          <FadeIn className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Programs by Age</p>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "#ffffff" }}>
              Find Your Level 🚀
            </h2>
          </FadeIn>

          {/* Level tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {levels.map((l, i) => (
              <button key={l.name} onClick={() => setActiveLevel(i)}
                className="px-5 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={activeLevel === i
                  ? { background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 4px 20px rgba(255,215,0,0.4)" }
                  : { backgroundColor: "#141414", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }
                }>
                {l.emoji} {l.tag}
              </button>
            ))}
          </div>

          {/* Active level card */}
          <div className="grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden"
            style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.15)" }}>
            {/* Image */}
            <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
              <img
                key={activeLevel}
                src={levels[activeLevel].img}
                alt={levels[activeLevel].name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: "opacity 0.5s ease" }}
                {...imgFast}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, #141414 100%)" }} />
              {/* big emoji badge */}
              <div className="absolute top-6 left-6 text-6xl animate-wiggle" style={{ display: "inline-block" }}>
                {levels[activeLevel].emoji}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: levels[activeLevel].color }}>
                {levels[activeLevel].tag}
              </div>
              <h3 className="font-display font-black text-4xl mb-3" style={{ color: "#ffffff" }}>
                {levels[activeLevel].name}
              </h3>
              <p className="text-sm mb-7 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {levels[activeLevel].desc}
              </p>
              <ul className="space-y-3 mb-8">
                {levels[activeLevel].items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold"
                      style={{ backgroundColor: levels[activeLevel].color, color: "#000000" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/book"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm w-fit transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
                Book a Trial for This Level →
              </Link>
            </div>
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" fill="none">
          <path d="M0 30 Q360 60 720 30 Q1080 0 1440 30 V60 H0Z" fill="#000000" />
        </svg>
      </section>

      {/* ══════════════════════════════════════════
          WHAT TO EXPECT — step-by-step visual
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Your First Session</p>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "#ffffff" }}>
              What to Expect 🎈
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "1", emoji: "👟", title: "Gear Up", desc: "We fit your child with skates, helmet, pads — everything included." },
              { num: "2", emoji: "🤝", title: "Meet Your Coach", desc: "A friendly 1:4 ratio session — never lost in a crowd." },
              { num: "3", emoji: "⛸", title: "First Roll!", desc: "Step by step, glide by glide — no rush, just fun." },
              { num: "4", emoji: "🌟", title: "Level Up", desc: "Leave with your first badge and a plan to come back stronger." },
            ].map((s, i) => (
              <FadeIn key={s.num} delay={i * 120}>
                <div className="relative p-6 rounded-3xl text-center"
                  style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.1)" }}>
                  <div className="font-display font-black text-7xl leading-none mb-3 opacity-10 absolute top-4 right-4"
                    style={{ color: "#FFD700" }}>{s.num}</div>
                  <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{s.emoji}</div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#FFD700" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LARGE SPLIT IMAGE SECTION
      ══════════════════════════════════════════ */}
      <section className="py-8 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4">
          <FadeIn className="md:col-span-2 rounded-3xl overflow-hidden" style={{ minHeight: "360px" }}>
            <div className="relative h-full" style={{ minHeight: "360px" }}>
              <img src={skating[5]} alt="Two children rollerblading outdoors" className="absolute inset-0 w-full h-full object-cover" {...imgFast} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#FFD700" }}>Together We Skate</div>
                <div className="font-display font-black text-3xl" style={{ color: "#ffffff" }}>Every child supported.<br />Every milestone celebrated.</div>
              </div>
            </div>
          </FadeIn>
          <div className="flex flex-col gap-4">
            <FadeIn className="rounded-3xl overflow-hidden flex-1" delay={100}>
              <div className="relative h-full" style={{ minHeight: "168px" }}>
                <img src={skating[6]} alt="Ready to skate" className="absolute inset-0 w-full h-full object-cover" {...imgFast} />
                <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 70%)" }} />
                <div className="absolute bottom-4 left-4 font-display font-bold text-lg" style={{ color: "#FFD700" }}>Ready to roll 🛼</div>
              </div>
            </FadeIn>
            <FadeIn className="rounded-3xl overflow-hidden flex-1" delay={200}>
              <div className="relative h-full" style={{ minHeight: "168px" }}>
                <img src={skating[7]} alt="Kids skating outdoors" className="absolute inset-0 w-full h-full object-cover" {...imgFast} />
                <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 70%)" }} />
                <div className="absolute bottom-4 left-4 font-display font-bold text-lg" style={{ color: "#FFE84D" }}>Gear up. Go! ⚡</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#FFD700" }}>Got Questions?</p>
            <h2 className="font-display font-black text-4xl md:text-5xl" style={{ color: "#ffffff" }}>
              Frequently Asked 🙋
            </h2>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 80}>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,215,0,0.1)" }}>
                  <button className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-semibold text-sm" style={{ color: "#ffffff" }}>{faq.q}</span>
                    <span className="text-xl flex-shrink-0 transition-transform" style={{ color: "#FFD700", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,215,0,0.12) 0%, transparent 70%)" }} />
          {CONFETTI.slice(0, 6).map((e, i) => (
            <FloatingEmoji key={i} emoji={e} style={{ top: `${10 + i * 14}%`, left: i % 2 === 0 ? `${3 + i * 2}%` : undefined, right: i % 2 !== 0 ? `${3 + i * 2}%` : undefined, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
        <FadeIn className="relative max-w-3xl mx-auto text-center">
          <div className="text-7xl mb-6 animate-float">⛸</div>
          <h2 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "#ffffff" }}>
            Ready to<br /><span style={{ color: "#FFD700" }}>Start Rolling?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
            Book a free 45-minute taster session — skates and safety gear all included. No experience needed. Just bring the energy!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book"
              className="px-10 py-5 rounded-full font-black text-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000", boxShadow: "0 8px 48px rgba(255,215,0,0.45)" }}>
              🎉 Book a Free Trial
            </Link>
            <Link to="/contact"
              className="px-10 py-5 rounded-full font-semibold text-lg transition-all"
              style={{ border: "2px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
              Ask a Question
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
