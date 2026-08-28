export type SkillId = "chess" | "skating" | "ballet" | "taekwondo";

export type CoachWin = {
  year: string;
  title: string;
  place: string;
};

export type Coach = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  skillIds: SkillId[];
  experience: string;
  years: number;
  rating: number;
  reviews: number;
  students: number;
  certs: string[];
  bio: string;
  longBio: string;
  img: string;
  location: string;
  languages: string[];
  ages: string;
  availability: string;
  privateGbp: number;
  privateKes: number;
  privateMins: number;
  featured?: boolean;
  wins: CoachWin[];
  gallery: string[];
  videoId?: string;
  videoTitle?: string;
};

export const SKILL_FILTERS: { id: "all" | SkillId; label: string; icon: string }[] = [
  { id: "all", label: "All Coaches", icon: "★" },
  { id: "chess", label: "Chess", icon: "♟" },
  { id: "skating", label: "Skating", icon: "⛸" },
  { id: "ballet", label: "Ballet", icon: "🩰" },
  { id: "taekwondo", label: "Taekwondo", icon: "🥋" },
];

export const coaches: Coach[] = [
  {
    slug: "james-chen",
    name: "James Chen",
    role: "Head Coach & Curriculum Director",
    specialty: "Chess & Skating",
    skillIds: ["chess", "skating"],
    experience: "15 years",
    years: 15,
    rating: 5.0,
    reviews: 214,
    students: 480,
    certs: ["ECF Level 4", "UK Coaching Level 2", "Club Director", "DBS Checked"],
    bio: "FunSkill's founding coach. James designed both program pathways from first lesson to elite competition.",
    longBio: "James founded FunSkill in 2018 after a decade coaching national-age-group athletes. He built the club's dual-pathway curriculum so every child — whether they arrive for chess, skating, or both — has a clear route from first session to competition. Parents know him for calm high standards and for remembering every child's name.",
    img: "photo-1472099645785-5658abf4ff4e",
    location: "London – Shoreditch Kids Club",
    languages: ["English", "Mandarin"],
    ages: "Ages 4–18",
    availability: "Weekdays evenings · Sat mornings",
    privateGbp: 65,
    privateKes: 9800,
    privateMins: 60,
    featured: true,
    wins: [
      { year: "2012", title: "British Rapidplay Championship", place: "Gold" },
      { year: "2014", title: "UK Schools Chess Super League (as coach)", place: "Gold" },
      { year: "2019", title: "National Roller Speed Age-Group Finals", place: "Silver" },
      { year: "2024", title: "FunSkill Club of the Year – ECF", place: "Gold" },
    ],
    gallery: [
      "photo-1528819622765-d6bcf132f793",
      "photo-1564989209397-e0aebffb4ce5",
      "photo-1571019613454-1cb2f99b2d8b",
      "photo-1529699211552-207d436b16c7",
    ],
    videoId: "U4ogK0MIzqk",
    videoTitle: "James on how FunSkill trains young champions",
  },
  {
    slug: "marcus-reid",
    name: "Marcus Reid",
    role: "Lead Chess Coach",
    specialty: "Chess",
    skillIds: ["chess"],
    experience: "12 years",
    years: 12,
    rating: 4.9,
    reviews: 168,
    students: 320,
    certs: ["FIDE Instructor", "ECF Level 3", "DBS Checked"],
    bio: "Former national junior champion. Marcus has taken 300+ students to competitive over-the-board play.",
    longBio: "Marcus was a national junior champion before moving into full-time coaching. His sessions mix tactics puzzles, slow games, and match psychology so children learn to think ahead — and to lose well. He specialises in tournament prep for club, county, and national events.",
    img: "photo-1507003211169-0a1dd7228f2d",
    location: "London – Brixton Sports Hub",
    languages: ["English"],
    ages: "Ages 5–16",
    availability: "Tue–Thu after school · Sat",
    privateGbp: 55,
    privateKes: 8200,
    privateMins: 60,
    wins: [
      { year: "2009", title: "English Junior Championships U16", place: "Gold" },
      { year: "2011", title: "London Chess Classic Amateur", place: "Silver" },
      { year: "2023", title: "Students at UK National Schools Finals", place: "12 titles" },
    ],
    gallery: [
      "photo-1528819622765-d6bcf132f793",
      "photo-1580541832626-2a7131ee809f",
      "photo-1529699211552-207d436b16c7",
      "photo-1604940500627-d3f44418c8e0",
    ],
    videoId: "fKxG8KjH1Qg",
    videoTitle: "Tactics workshop with Marcus",
  },
  {
    slug: "sofia-mendes",
    name: "Sofia Mendes",
    role: "Chess Coach · Girls' Pathway Lead",
    specialty: "Chess",
    skillIds: ["chess"],
    experience: "8 years",
    years: 8,
    rating: 4.9,
    reviews: 141,
    students: 210,
    certs: ["WIM Title", "FIDE Arbiter", "Youth Specialist", "DBS Checked"],
    bio: "Woman International Master focused on developing young female players and inclusive chess rooms.",
    longBio: "Sofia holds the WIM title and still competes internationally. At FunSkill she runs the girls' chess pathway and weekend festival events. Her teaching style is warm, structured, and fiercely ambitious — she wants every child to feel they belong at the board.",
    img: "photo-1494790108377-be9c29b29330",
    location: "Manchester – Northern Quarter Hub",
    languages: ["English", "Portuguese", "Spanish"],
    ages: "Ages 4–14",
    availability: "Mon, Wed, Fri · Sun clinics",
    privateGbp: 50,
    privateKes: 7500,
    privateMins: 60,
    wins: [
      { year: "2016", title: "Portuguese Women's Championship", place: "Gold" },
      { year: "2018", title: "Olympiad team bronze (Portugal)", place: "Bronze" },
      { year: "2025", title: "North West Girls' Rapid (as coach)", place: "Gold" },
    ],
    gallery: [
      "photo-1528819622765-d6bcf132f793",
      "photo-1586165368502-1f6dfe4c0c0e",
      "photo-1580541832626-2a7131ee809f",
      "photo-1606092195730-5d7b9af1efc5",
    ],
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "Chess Coach · Schools Lead",
    specialty: "Chess",
    skillIds: ["chess"],
    experience: "6 years",
    years: 6,
    rating: 4.8,
    reviews: 97,
    students: 540,
    certs: ["FIDE Trainer", "Schools Specialist", "DBS Checked"],
    bio: "Runs FunSkill school partnerships and has delivered chess into 30+ UK primary schools.",
    longBio: "Priya is the reason FunSkill chess lives in so many classrooms. She designs 6-week school blocks, trains lunchtime club volunteers, and still coaches after-school groups. Ideal for families who want a patient first coach and a clear homework plan.",
    img: "photo-1580489944761-15a19d654956",
    location: "Birmingham – Digbeth Kids Club",
    languages: ["English", "Hindi"],
    ages: "Ages 4–12",
    availability: "School hours · Thu evenings",
    privateGbp: 45,
    privateKes: 6800,
    privateMins: 45,
    wins: [
      { year: "2022", title: "Birmingham Primary Chess League", place: "Gold" },
      { year: "2024", title: "ECF School Club Award", place: "Gold" },
    ],
    gallery: [
      "photo-1503676260728-1c00da094a0b",
      "photo-1528819622765-d6bcf132f793",
      "photo-1580541832626-2a7131ee809f",
      "photo-1509062522246-3755977927d7",
    ],
  },
  {
    slug: "tyler-brooks",
    name: "Tyler Brooks",
    role: "Lead Roller Skating Coach",
    specialty: "Skating",
    skillIds: ["skating"],
    experience: "10 years",
    years: 10,
    rating: 4.9,
    reviews: 156,
    students: 280,
    certs: ["UK Coaching Level 3", "First Aid", "DBS Checked"],
    bio: "Three-time national speed champion who brings elite technique into beginner-friendly sessions.",
    longBio: "Tyler raced nationally for a decade before coaching full time. He is known for making falling-safely the first skill — then building speed, crossovers, and race craft. His Saturday squads are high-energy; private sessions are the place to fix a specific skill fast.",
    img: "photo-1534308143481-c55f00be8bd7",
    location: "London – Shoreditch Kids Club",
    languages: ["English"],
    ages: "Ages 4–16",
    availability: "Wed–Sat · holiday camps",
    privateGbp: 55,
    privateKes: 8200,
    privateMins: 60,
    wins: [
      { year: "2015", title: "British Indoor Speed Championships", place: "Gold" },
      { year: "2016", title: "British Indoor Speed Championships", place: "Gold" },
      { year: "2018", title: "European Junior Speed Circuit", place: "Silver" },
      { year: "2023", title: "Students at National Age-Group Finals", place: "8 medals" },
    ],
    gallery: [
      "photo-1564989209397-e0aebffb4ce5",
      "photo-1775482767815-3fb3a0fca405",
      "photo-1558618666-fcd25c85f82e",
      "photo-1519861531473-9200262188bf",
    ],
    videoId: "3AtDnEC4zak",
    videoTitle: "Tyler on balance, speed, and first rolls",
  },
  {
    slug: "aisha-okonkwo",
    name: "Aisha Okonkwo",
    role: "Artistic & Inclusive Skating Coach",
    specialty: "Skating",
    skillIds: ["skating"],
    experience: "7 years",
    years: 7,
    rating: 5.0,
    reviews: 122,
    students: 190,
    certs: ["Artistic Skating Coach", "SEND Qualified", "DBS Checked"],
    bio: "Specialist in artistic and inclusive skating. Hundreds of children with additional needs have thrived in her groups.",
    longBio: "Aisha coaches artistic roller and adaptive sessions. She plans every class with visual cues, rest options, and celebration of small wins. Families looking for a coach who will meet their child where they are — then stretch them — book Aisha first.",
    img: "photo-1438761681033-6461ffad8d80",
    location: "Edinburgh – Old Town Kids Club",
    languages: ["English"],
    ages: "Ages 4–14",
    availability: "Tue, Thu, Sat mornings",
    privateGbp: 48,
    privateKes: 7200,
    privateMins: 50,
    wins: [
      { year: "2019", title: "Scottish Artistic Roller Open", place: "Gold" },
      { year: "2021", title: "Inclusive Sport Coach Award", place: "Gold" },
      { year: "2024", title: "Club artistic team nationals", place: "Bronze" },
    ],
    gallery: [
      "photo-1564989209397-e0aebffb4ce5",
      "photo-1518611012118-696072aa579a",
      "photo-1519861531473-9200262188bf",
      "photo-1571019613454-1cb2f99b2d8b",
    ],
  },
  {
    slug: "elena-rossi",
    name: "Elena Rossi",
    role: "Lead Ballet Coach",
    specialty: "Ballet",
    skillIds: ["ballet"],
    experience: "14 years",
    years: 14,
    rating: 4.9,
    reviews: 173,
    students: 260,
    certs: ["RAD RTS", "ISTD Associate", "DBS Checked"],
    bio: "RAD registered teacher. Elena takes tiny first positions through to exam and stage work with real joy.",
    longBio: "Elena trained in Milan and London and has taught RAD graded ballet for fourteen years. Her classes are musical, precise, and kind. She prepares students for exams and the FunSkill summer showcase, and she uses private sessions for posture, pirouettes, and pre-exam polish.",
    img: "photo-1534528741775-53994a69daeb",
    location: "London – Shoreditch Kids Club",
    languages: ["English", "Italian"],
    ages: "Ages 3–16",
    availability: "Mon–Sat · showcase season extra",
    privateGbp: 52,
    privateKes: 7800,
    privateMins: 55,
    featured: true,
    wins: [
      { year: "2010", title: "Prix de Lausanne candidate", place: "Finalist" },
      { year: "2022", title: "RAD School Award – Distinction cohort", place: "Gold" },
      { year: "2025", title: "London Youth Ballet Festival", place: "Silver" },
    ],
    gallery: [
      "photo-1685339009948-d807094b1457",
      "photo-1518834107812-67b0b7c58434",
      "photo-1508807526345-15e9b5f4eaff",
      "photo-1547153760-18fc86324498",
    ],
    videoId: "rY0WxgSXdEE",
    videoTitle: "Elena's introduction to FunSkill ballet",
  },
  {
    slug: "maya-laurent",
    name: "Maya Laurent",
    role: "Ballet Coach · Pre-Primary & Junior",
    specialty: "Ballet",
    skillIds: ["ballet"],
    experience: "9 years",
    years: 9,
    rating: 4.8,
    reviews: 108,
    students: 175,
    certs: ["RAD Pre-Primary–Grade 5", "First Aid", "DBS Checked"],
    bio: "The coach little dancers ask for by name — playful class energy with proper ballet foundations.",
    longBio: "Maya specialises in ages 3–9. She turns pliés into stories without dropping technique, and she works closely with parents on what to wear, when to start pointe conversations, and how to practise at home for ten minutes. Private bookings are popular before a first exam.",
    img: "photo-1544005313-94ddf0286df2",
    location: "Manchester – Northern Quarter Hub",
    languages: ["English", "French"],
    ages: "Ages 3–10",
    availability: "Weekday afternoons · Sat",
    privateGbp: 45,
    privateKes: 6800,
    privateMins: 45,
    wins: [
      { year: "2020", title: "NW Junior Ballet Showcase", place: "Gold" },
      { year: "2023", title: "RAD Grade 3 distinction class", place: "18/18" },
    ],
    gallery: [
      "photo-1518834107812-67b0b7c58434",
      "photo-1508807526345-15e9b5f4eaff",
      "photo-1685339009948-d807094b1457",
      "photo-1518611012118-696072aa579a",
    ],
  },
  {
    slug: "kenji-tanaka",
    name: "Kenji Tanaka",
    role: "Lead Taekwondo Coach",
    specialty: "Taekwondo",
    skillIds: ["taekwondo"],
    experience: "16 years",
    years: 16,
    rating: 5.0,
    reviews: 189,
    students: 310,
    certs: ["WTF 4th Dan", "Kukkiwon Certified", "Safeguarding", "DBS Checked"],
    bio: "Fourth-degree black belt. Kenji builds discipline and confidence without ever shouting a child down.",
    longBio: "Kenji competed on the international circuit before settling in the UK to coach. His FunSkill taekwondo pathway covers poomsae, sparring, and belt grading with a strong emphasis on respect and self-control. Private sessions are used for grading prep, flexibility, and competition sparring.",
    img: "photo-1506794778202-cad84cf45f1d",
    location: "London – Brixton Sports Hub",
    languages: ["English", "Japanese", "Korean"],
    ages: "Ages 4–16",
    availability: "Tue, Thu, Sat · grading weekends",
    privateGbp: 55,
    privateKes: 8200,
    privateMins: 60,
    featured: true,
    wins: [
      { year: "2011", title: "All Japan Collegiate Championships", place: "Gold" },
      { year: "2013", title: "World Taekwondo Grand Prix", place: "Bronze" },
      { year: "2024", title: "British BT Open (as coach, junior team)", place: "5 golds" },
    ],
    gallery: [
      "photo-1530560643359-6d2fead989b3",
      "photo-1555597673-b21d5c935865",
      "photo-1599058917212-d750089bc07e",
      "photo-1555597673-b21d5c935865",
    ],
    videoId: "6p-lDYPR2P8",
    videoTitle: "Kenji on focus, kicks, and first belts",
  },
  {
    slug: "daniel-mwangi",
    name: "Daniel Mwangi",
    role: "Taekwondo Coach · Beginner Pathway",
    specialty: "Taekwondo",
    skillIds: ["taekwondo"],
    experience: "8 years",
    years: 8,
    rating: 4.8,
    reviews: 94,
    students: 160,
    certs: ["WTF 2nd Dan", "Youth Coach Award", "First Aid", "DBS Checked"],
    bio: "High-energy beginner classes and a calm private-session style. Ideal first black-belt mentor.",
    longBio: "Daniel came through FunSkill's own youth pathway and now leads beginner taekwondo. He is the coach families book when a child is nervous, brand new, or preparing for their first grading. He also supports holiday camps across London and Birmingham.",
    img: "photo-1500648767791-00dcc994a43e",
    location: "Birmingham – Digbeth Kids Club",
    languages: ["English", "Swahili"],
    ages: "Ages 4–12",
    availability: "Mon, Wed, Sat",
    privateGbp: 42,
    privateKes: 6300,
    privateMins: 45,
    wins: [
      { year: "2017", title: "East Africa Junior Open", place: "Gold" },
      { year: "2023", title: "Midlands Novice Team Cup (as coach)", place: "Gold" },
    ],
    gallery: [
      "photo-1555597673-b21d5c935865",
      "photo-1530560643359-6d2fead989b3",
      "photo-1599058917212-d750089bc07e",
      "photo-1571019613454-1cb2f99b2d8b",
    ],
  },
];

export function getCoach(slug: string) {
  return coaches.find((c) => c.slug === slug);
}

export function relatedCoaches(slug: string, limit = 3) {
  const current = getCoach(slug);
  if (!current) return coaches.filter((c) => c.slug !== slug).slice(0, limit);
  const same = coaches.filter(
    (c) => c.slug !== slug && c.skillIds.some((s) => current.skillIds.includes(s)),
  );
  const rest = coaches.filter((c) => c.slug !== slug && !same.includes(c));
  return [...same, ...rest].slice(0, limit);
}

export function coachPhoto(id: string, w = 800, h = 800) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

export function formatPrivate(gbp: number, kes: number) {
  return `£${gbp} · KES ${kes.toLocaleString()}`;
}
