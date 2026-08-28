import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Stars from "../components/Stars";
import { SKILL_FILTERS, coaches, coachPhoto, formatPrivate, type SkillId } from "../data/coaches";
import { usePortal } from "../portal/store";
import { TrackPage } from "../portal/track";

export default function Coaches() {
  const { state } = usePortal();
  const [filter, setFilter] = useState<"all" | SkillId>("all");
  const [sort, setSort] = useState<"featured" | "rating" | "price">("featured");

  function rate(slug: string, gbp: number, kes: number) {
    const o = state.pricing[slug];
    return o ? { privateGbp: o.privateGbp, privateKes: o.privateKes } : { privateGbp: gbp, privateKes: kes };
  }

  const list = useMemo(() => {
    const filtered = filter === "all" ? coaches : coaches.filter((c) => c.skillIds.includes(filter));
    const copy = [...filtered];
    if (sort === "rating") copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    else if (sort === "price") copy.sort((a, b) => rate(a.slug, a.privateGbp, a.privateKes).privateGbp - rate(b.slug, b.privateGbp, b.privateKes).privateGbp);
    else copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.rating - a.rating);
    return copy;
  }, [filter, sort, state.pricing]);

  const featured = list.filter((c) => c.featured);

  return (
    <div className="pt-nav">
      <TrackPage page="coaches" />
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(255,215,0,0.1) 0%, transparent 55%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Our Team</p>
          <h1 className="font-display font-black text-5xl md:text-7xl mb-4" style={{ color: "#ffffff" }}>Meet the Coaches</h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.6)" }}>
            Open any profile for ratings, titles won, a photo gallery, video where we have it, and private booking rates.
          </p>
          <div className="flex flex-wrap gap-8 mt-10">
            <div>
              <div className="font-display font-black text-3xl" style={{ color: "#FFD700" }}>{coaches.length}</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Coaches</div>
            </div>
            <div>
              <div className="font-display font-black text-3xl" style={{ color: "#FFD700" }}>4.9</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Avg rating</div>
            </div>
            <div>
              <div className="font-display font-black text-3xl" style={{ color: "#FFD700" }}>Private</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>From £42 / session</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {SKILL_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={filter === f.id
                  ? { background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }
                  : { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>Sort</span>
            {([
              ["featured", "Featured"],
              ["rating", "Top rated"],
              ["price", "Price"],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSort(id)}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={sort === id
                  ? { backgroundColor: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.35)" }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && filter === "all" && sort === "featured" && (
        <section className="px-6 pb-8" style={{ backgroundColor: "#000000" }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Featured</p>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((c) => (
                <Link
                  key={c.slug}
                  to={`/coaches/${c.slug}`}
                  className="group relative rounded-3xl overflow-hidden block"
                  style={{ minHeight: "280px", border: "1px solid rgba(255,215,0,0.25)" }}
                >
                  <img src={coachPhoto(c.img, 800, 600)} alt={c.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }} />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: "#FFD700", color: "#000000" }}>Featured</div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Stars rating={c.rating} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{c.rating} ({c.reviews})</span>
                    </div>
                    <h2 className="font-display font-black text-3xl" style={{ color: "#ffffff" }}>{c.name}</h2>
                    <p className="text-sm mb-3" style={{ color: "#FFD700" }}>{c.role}</p>
                    <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>Private from {formatPrivate(rate(c.slug, c.privateGbp, c.privateKes).privateGbp, rate(c.slug, c.privateGbp, c.privateKes).privateKes)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-24" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>{list.length} coaches</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((c) => (
              <Link
                key={c.slug}
                to={`/coaches/${c.slug}`}
                className="group rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1"
                style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={coachPhoto(c.img, 600, 500)} alt={c.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: "#FFD700", color: "#000000" }}>
                    {c.specialty}
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#FFD700" }}>
                    ★ {c.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-black text-2xl mb-0.5" style={{ color: "#ffffff" }}>{c.name}</h3>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>{c.role}</p>
                  <p className="text-sm mb-4 leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.55)" }}>{c.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>{c.wins.length} titles</span>
                    <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>{c.years} yrs</span>
                    <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>{c.students}+ students</span>
                  </div>
                  <div className="flex items-end justify-between gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Private session</div>
                      <div className="text-sm font-semibold" style={{ color: "#FFD700" }}>{formatPrivate(rate(c.slug, c.privateGbp, c.privateKes).privateGbp, rate(c.slug, c.privateGbp, c.privateKes).privateKes)}</div>
                    </div>
                    <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform" style={{ color: "#FFD700" }}>View profile →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
