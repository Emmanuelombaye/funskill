import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Stars from "../components/Stars";
import { coachPhoto, formatPrivate, getCoach, relatedCoaches } from "../data/coaches";
import { usePortal } from "../portal/store";
import { TrackCoach } from "../portal/track";

export default function CoachProfile() {
  const { slug } = useParams();
  const { state, trackBookClick } = usePortal();
  const coach = slug ? getCoach(slug) : undefined;
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLightbox(null);
  }, [slug]);

  if (!coach) {
    return <Navigate to="/coaches" replace />;
  }

  const related = relatedCoaches(coach.slug);
  const bookPrivate = `/book?type=private&coach=${coach.slug}`;
  const bookTrial = `/book?coach=${coach.slug}`;

  return (
    <div className="pt-nav">
      <TrackCoach slug={coach.slug} />
      <section className="relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        <img src={coachPhoto(coach.img, 1600, 1000)} alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-50" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000000 8%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.35) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-12 w-full grid lg:grid-cols-[1fr_340px] gap-10 items-end">
          <div>
            <Link to="/coaches" className="text-sm font-medium mb-6 inline-flex" style={{ color: "rgba(255,255,255,0.55)" }}>← All coaches</Link>
            <div className="flex flex-col sm:flex-row gap-6 items-start mt-4">
              <img
                src={coachPhoto(coach.img, 400, 480)}
                alt={coach.name}
                className="w-36 h-44 sm:w-44 sm:h-56 rounded-2xl object-cover object-top shrink-0"
                style={{ border: "2px solid rgba(255,215,0,0.45)", boxShadow: "0 16px 48px rgba(0,0,0,0.45)" }}
              />
              <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: "#FFD700", color: "#000000" }}>{coach.specialty}</span>
              {coach.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ border: "1px solid rgba(255,215,0,0.45)", color: "#FFD700" }}>Featured</span>
              )}
            </div>
            <h1 className="font-display font-black leading-none mb-3" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "#ffffff" }}>{coach.name}</h1>
            <p className="text-lg mb-4" style={{ color: "#FFD700" }}>{coach.role}</p>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Stars rating={coach.rating} size="text-lg" />
              <span className="font-display font-black text-2xl" style={{ color: "#ffffff" }}>{coach.rating.toFixed(1)}</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{coach.reviews} parent reviews</span>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                [String(coach.years), "Years coaching"],
                [`${coach.students}+`, "Students taught"],
                [String(coach.wins.length), "Major titles"],
                [coach.ages, "Age groups"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-black text-xl" style={{ color: "#FFD700" }}>{v}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{l}</div>
                </div>
              ))}
            </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-6" style={{ backgroundColor: "rgba(20,20,20,0.92)", border: "1px solid rgba(255,215,0,0.25)", backdropFilter: "blur(12px)" }}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#FFD700" }}>Private booking</p>
            <div className="font-display font-black text-4xl mb-1" style={{ color: "#ffffff" }}>{formatPrivate(state.pricing[coach.slug]?.privateGbp ?? coach.privateGbp, state.pricing[coach.slug]?.privateKes ?? coach.privateKes)}</div>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>{`${coach.privateMins}-minute 1:1 session · ${coach.location}`}</p>
            <ul className="text-sm space-y-2 mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
              <li>· {coach.availability}</li>
              <li>· Languages: {coach.languages.join(", ")}</li>
              <li>· All equipment provided</li>
            </ul>
            <Link to={bookPrivate} onClick={() => trackBookClick(coach.slug)} className="block text-center px-5 py-3 rounded-full font-semibold mb-3" style={{ background: "linear-gradient(135deg, #FFD700, #FFE84D)", color: "#000000" }}>
              Book private session
            </Link>
            <Link to={bookTrial} onClick={() => trackBookClick(coach.slug)} className="block text-center px-5 py-3 rounded-full font-semibold text-sm" style={{ border: "1px solid rgba(255,255,255,0.18)", color: "#ffffff" }}>
              Or book a group trial
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>About</p>
            <h2 className="font-display font-black text-4xl mb-6" style={{ color: "#ffffff" }}>Coach story</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>{coach.longBio}</p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{coach.bio}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {coach.certs.map((cert) => (
                <span key={cert} className="text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,215,0,0.1)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,215,0,0.2)" }}>{cert}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="font-display font-bold text-2xl mb-5" style={{ color: "#ffffff" }}>Competitions & titles</h3>
            <ul className="space-y-4">
              {coach.wins.map((w) => (
                <li key={`${w.year}-${w.title}`} className="flex gap-4">
                  <div className="font-display font-black text-sm w-12 shrink-0" style={{ color: "#FFD700" }}>{w.year}</div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#ffffff" }}>{w.title}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{w.place}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Gallery</p>
          <h2 className="font-display font-black text-4xl mb-8" style={{ color: "#ffffff" }}>On the floor</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {coach.gallery.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setLightbox(id)}
                className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-square"
              >
                <img src={coachPhoto(id, 600, 700)} alt={`${coach.name} session`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {coach.videoId && (
        <section className="py-20 px-6" style={{ backgroundColor: "#080808" }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>Video</p>
            <h2 className="font-display font-black text-4xl mb-8" style={{ color: "#ffffff" }}>{coach.videoTitle || "Watch this coach"}</h2>
            <div className="rounded-3xl overflow-hidden aspect-video" style={{ border: "1px solid rgba(255,215,0,0.15)" }}>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${coach.videoId}`}
                title={coach.videoTitle || `${coach.name} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#FFD700" }}>More coaches</p>
          <h2 className="font-display font-black text-4xl mb-8" style={{ color: "#ffffff" }}>Also on the team</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((c) => (
              <Link key={c.slug} to={`/coaches/${c.slug}`} className="rounded-2xl overflow-hidden group" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="h-40 overflow-hidden">
                  <img src={coachPhoto(c.img, 500, 360)} alt={c.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-bold text-xl" style={{ color: "#ffffff" }}>{c.name}</h3>
                    <span className="text-xs" style={{ color: "#FFD700" }}>★ {c.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>{c.specialty}</p>
                  <p className="text-sm font-semibold" style={{ color: "#FFD700" }}>{formatPrivate(c.privateGbp, c.privateKes)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <button
          type="button"
          className="fixed inset-0 z-[80] flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          onClick={() => setLightbox(null)}
          aria-label="Close gallery"
        >
          <img src={coachPhoto(lightbox, 1400, 1000)} alt="" className="max-h-[88vh] max-w-full rounded-2xl object-contain" />
        </button>
      )}
    </div>
  );
}
