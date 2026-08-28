const coaches = [
  {
    name: "Marcus Reid",
    specialty: "Chess",
    experience: "12 years",
    certs: ["FIDE Instructor", "ECF Level 3", "DBS Checked"],
    bio: "Former national junior champion turned kids club coach. Marcus has trained over 300 students to competitive level.",
    img: "photo-1507003211169-0a1dd7228f2d",
    color: "#FFD700",
  },
  {
    name: "Sofia Mendes",
    specialty: "Chess",
    experience: "8 years",
    certs: ["WIM Title", "FIDE Arbiter", "Youth Specialist"],
    bio: "International Woman Master with a passion for developing young female players and building inclusive chess communities.",
    img: "photo-1494790108377-be9c29b29330",
    color: "#FFD700",
  },
  {
    name: "Tyler Brooks",
    specialty: "Roller Skating",
    experience: "10 years",
    certs: ["UK Coaching Level 3", "First Aid", "DBS Checked"],
    bio: "Three-time national speed champion who brings world-class technique to every beginner session with infectious enthusiasm.",
    img: "photo-1534308143481-c55f00be8bd7",
    color: "#ffffff",
  },
  {
    name: "Aisha Okonkwo",
    specialty: "Roller Skating",
    experience: "7 years",
    certs: ["Artistic Skating Coach", "SEND Qualified", "DBS Checked"],
    bio: "Specialist in artistic and inclusive skating. Aisha's adaptable approach has helped hundreds of children with additional needs thrive.",
    img: "photo-1438761681033-6461ffad8d80",
    color: "#ffffff",
  },
  {
    name: "James Chen",
    specialty: "Chess & Skating",
    experience: "15 years",
    certs: ["ECF Level 4", "UK Coaching Level 2", "Club Director"],
    bio: "FunSkill's founding coach and head of curriculum. James designed both program pathways from beginner through to elite.",
    img: "photo-1472099645785-5658abf4ff4e",
    color: "#FFD700",
  },
  {
    name: "Priya Sharma",
    specialty: "Chess",
    experience: "6 years",
    certs: ["FIDE Trainer", "Schools Specialist", "DBS Checked"],
    bio: "Priya runs all school partnership programs and has delivered FunSkill Chess to over 30 primary schools across the UK.",
    img: "photo-1580489944761-15a19d654956",
    color: "#FFD700",
  },
];

export default function Coaches() {
  return (
    <div className="pt-16">
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#FFD700" }}>Our Team</p>
          <h1 className="font-display font-black text-6xl md:text-7xl mb-6" style={{ color: "#ffffff" }}>Meet the Coaches</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Certified professionals who don't just teach skills — they build champions.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((c) => (
            <div key={c.name} className="rounded-2xl overflow-hidden group" style={{ backgroundColor: "#141414", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="h-64 overflow-hidden relative">
                <img src={`https://images.unsplash.com/${c.img}?w=400&h=400&fit=crop&auto=format`} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 object-top" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: c.color, color: "#000000" }}>
                  {c.specialty}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-black text-2xl mb-1" style={{ color: "#ffffff" }}>{c.name}</h3>
                <div className="text-sm mb-3 font-semibold" style={{ color: c.color }}>{c.experience} experience</div>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{c.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {c.certs.map((cert) => (
                    <span key={cert} className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>{cert}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
