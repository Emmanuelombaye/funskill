import { coaches } from "../data/coaches";
import type { Application, Booking, CoachView, Invoice, Kid, Message, PageView, PortalState, SchoolOrg, User } from "./types";

export const DEMO_PASSWORD = "funskill";

const U = {
  admin: "u-admin",
  james: "u-james",
  marcus: "u-marcus",
  sofia: "u-sofia",
  tyler: "u-tyler",
  elena: "u-elena",
  kenji: "u-kenji",
  aisha: "u-aisha",
  priyaC: "u-priya-coach",
  maya: "u-maya",
  daniel: "u-daniel",
  sarah: "u-sarah",
  priyaP: "u-priya-parent",
  jamesO: "u-james-o",
  amina: "u-amina",
  school: "u-school",
};

export const seedUsers: User[] = [
  { id: U.admin, role: "admin", name: "Amara Okello", email: "admin@funskill.com", phone: "+44 7700 900001", password: DEMO_PASSWORD, status: "active", avatar: "AO", joined: "2018-03-01" },
  { id: U.james, role: "coach", name: "James Chen", email: "james.chen@funskill.com", phone: "+44 7700 900010", password: DEMO_PASSWORD, status: "active", avatar: "JC", coachSlug: "james-chen", joined: "2018-03-01" },
  { id: U.marcus, role: "coach", name: "Marcus Reid", email: "marcus.reid@funskill.com", phone: "+44 7700 900011", password: DEMO_PASSWORD, status: "active", avatar: "MR", coachSlug: "marcus-reid", joined: "2019-01-12" },
  { id: U.sofia, role: "coach", name: "Sofia Mendes", email: "sofia.mendes@funskill.com", phone: "+44 7700 900012", password: DEMO_PASSWORD, status: "active", avatar: "SM", coachSlug: "sofia-mendes", joined: "2020-06-04" },
  { id: U.tyler, role: "coach", name: "Tyler Brooks", email: "tyler.brooks@funskill.com", phone: "+44 7700 900013", password: DEMO_PASSWORD, status: "active", avatar: "TB", coachSlug: "tyler-brooks", joined: "2019-09-18" },
  { id: U.elena, role: "coach", name: "Elena Rossi", email: "elena.rossi@funskill.com", phone: "+44 7700 900014", password: DEMO_PASSWORD, status: "active", avatar: "ER", coachSlug: "elena-rossi", joined: "2021-02-20" },
  { id: U.kenji, role: "coach", name: "Kenji Tanaka", email: "kenji.tanaka@funskill.com", phone: "+44 7700 900015", password: DEMO_PASSWORD, status: "active", avatar: "KT", coachSlug: "kenji-tanaka", joined: "2020-11-02" },
  { id: U.aisha, role: "coach", name: "Aisha Okonkwo", email: "aisha.okonkwo@funskill.com", phone: "+44 7700 900016", password: DEMO_PASSWORD, status: "active", avatar: "AO", coachSlug: "aisha-okonkwo", joined: "2021-08-09" },
  { id: U.priyaC, role: "coach", name: "Priya Sharma", email: "priya.sharma@funskill.com", phone: "+44 7700 900017", password: DEMO_PASSWORD, status: "active", avatar: "PS", coachSlug: "priya-sharma", joined: "2022-01-15" },
  { id: U.maya, role: "coach", name: "Maya Laurent", email: "maya.laurent@funskill.com", phone: "+44 7700 900018", password: DEMO_PASSWORD, status: "active", avatar: "ML", coachSlug: "maya-laurent", joined: "2022-09-01" },
  { id: U.daniel, role: "coach", name: "Daniel Mwangi", email: "daniel.mwangi@funskill.com", phone: "+44 7700 900019", password: DEMO_PASSWORD, status: "active", avatar: "DM", coachSlug: "daniel-mwangi", joined: "2023-04-11" },
  { id: U.sarah, role: "parent", name: "Sarah K.", email: "sarah.k@email.com", phone: "+44 7700 900201", password: DEMO_PASSWORD, status: "active", avatar: "SK", joined: "2024-02-11" },
  { id: U.priyaP, role: "parent", name: "Priya M.", email: "priya.m@email.com", phone: "+44 7700 900202", password: DEMO_PASSWORD, status: "active", avatar: "PM", joined: "2024-05-03" },
  { id: U.jamesO, role: "parent", name: "James O.", email: "james.o@email.com", phone: "+44 7700 900203", password: DEMO_PASSWORD, status: "active", avatar: "JO", joined: "2025-01-19" },
  { id: U.amina, role: "parent", name: "Amina Yusuf", email: "amina.yusuf@email.com", phone: "+254 712 000 441", password: DEMO_PASSWORD, status: "active", avatar: "AY", joined: "2025-09-08" },
  { id: U.school, role: "school", name: "Claire Bennett", email: "head@stmarys.ac.uk", phone: "+44 20 7946 0888", password: DEMO_PASSWORD, status: "active", avatar: "CB", schoolId: "sch-stmarys", joined: "2023-09-01" },
  { id: "u-noah-app", role: "coach", name: "Noah Adeyemi", email: "noah.adeyemi@gmail.com", phone: "+44 7700 900330", password: DEMO_PASSWORD, status: "pending", avatar: "NA", joined: "2026-08-25" },
  { id: "u-hana-app", role: "coach", name: "Hana Berg", email: "hana.berg@gmail.com", phone: "+44 7700 900331", password: DEMO_PASSWORD, status: "pending", avatar: "HB", joined: "2026-08-26" },
];

export const seedKids: Kid[] = [
  { id: "k-alex", parentId: U.sarah, name: "Alex K.", age: 9, skill: "chess", level: "Young Explorers", notes: "Loves tactics puzzles. Preparing for county U10.", medical: "None", nextGoal: "First ECF rapid" },
  { id: "k-noah", parentId: U.sarah, name: "Noah K.", age: 6, skill: "skating", level: "Tiny Champions", notes: "Still nervous on stops.", medical: "Mild asthma — inhaler in bag", nextGoal: "Independent T-stop" },
  { id: "k-ria", parentId: U.priyaP, name: "Ria M.", age: 11, skill: "skating", level: "Rising Stars", notes: "Twin. Competitive speed.", medical: "None", nextGoal: "Regional slalom" },
  { id: "k-dev", parentId: U.priyaP, name: "Dev M.", age: 11, skill: "skating", level: "Rising Stars", notes: "Twin. Prefers artistic.", medical: "None", nextGoal: "Artistic grade 2" },
  { id: "k-lily", parentId: U.jamesO, name: "Lily O.", age: 7, skill: "ballet", level: "Little Swans", notes: "Asks to go every week.", medical: "None", nextGoal: "RAD Pre-Primary exam" },
  { id: "k-zuri", parentId: U.amina, name: "Zuri Yusuf", age: 8, skill: "taekwondo", level: "Yellow belt", notes: "First grading in October.", medical: "None", nextGoal: "Green stripe" },
];

export const seedSchools: SchoolOrg[] = [
  { id: "sch-stmarys", name: "St Mary's Primary", contact: "Claire Bennett", email: "head@stmarys.ac.uk", pupils: 48, programmes: ["chess", "ballet"], termFeeGbp: 4200, status: "active" },
  { id: "sch-oak", name: "Oakfield Academy", contact: "David Cole", email: "d.cole@oakfield.ac.uk", pupils: 32, programmes: ["taekwondo"], termFeeGbp: 2800, status: "active" },
  { id: "sch-river", name: "Riverside Juniors", contact: "Helen Park", email: "h.park@riverside.sch.uk", pupils: 20, programmes: ["skating"], termFeeGbp: 1900, status: "trial" },
];

export const seedBookings: Booking[] = [
  { id: "b-001", type: "private", status: "upcoming", skill: "chess", coachSlug: "marcus-reid", parentId: U.sarah, kidId: "k-alex", location: "London – Brixton Sports Hub", date: "2026-08-29", time: "16:30", durationMins: 60, gbp: 55, kes: 8200, payStatus: "paid", payMethod: "paypal", notes: "County prep — openings" },
  { id: "b-002", type: "group", status: "upcoming", skill: "skating", coachSlug: "tyler-brooks", parentId: U.sarah, kidId: "k-noah", location: "London – Shoreditch Kids Club", date: "2026-08-30", time: "10:00", durationMins: 45, gbp: 18, kes: 2700, payStatus: "paid", payMethod: "paypal", notes: "Saturday beginners" },
  { id: "b-003", type: "private", status: "upcoming", skill: "ballet", coachSlug: "elena-rossi", parentId: U.jamesO, kidId: "k-lily", location: "London – Shoreditch Kids Club", date: "2026-09-01", time: "15:00", durationMins: 55, gbp: 52, kes: 7800, payStatus: "pending", payMethod: "paypal", notes: "Exam polish" },
  { id: "b-004", type: "group", status: "upcoming", skill: "taekwondo", coachSlug: "kenji-tanaka", parentId: U.amina, kidId: "k-zuri", location: "London – Brixton Sports Hub", date: "2026-08-29", time: "17:00", durationMins: 60, gbp: 16, kes: 2400, payStatus: "paid", payMethod: "mpesa", notes: "Belt class" },
  { id: "b-005", type: "school", status: "upcoming", skill: "chess", coachSlug: "priya-sharma", parentId: U.school, kidId: "k-alex", schoolId: "sch-stmarys", location: "St Mary's Primary", date: "2026-09-02", time: "13:30", durationMins: 50, gbp: 0, kes: 0, payStatus: "paid", payMethod: "invoice", notes: "Year 4 lunch club" },
  { id: "b-006", type: "private", status: "completed", skill: "chess", coachSlug: "james-chen", parentId: U.sarah, kidId: "k-alex", location: "London – Shoreditch Kids Club", date: "2026-08-22", time: "16:00", durationMins: 60, gbp: 65, kes: 9800, payStatus: "paid", payMethod: "paypal", notes: "Head-coach assessment" },
  { id: "b-007", type: "group", status: "completed", skill: "skating", coachSlug: "aisha-okonkwo", parentId: U.priyaP, kidId: "k-ria", location: "Edinburgh – Old Town Kids Club", date: "2026-08-23", time: "11:00", durationMins: 50, gbp: 18, kes: 2700, payStatus: "paid", payMethod: "paypal", notes: "" },
  { id: "b-008", type: "group", status: "completed", skill: "skating", coachSlug: "aisha-okonkwo", parentId: U.priyaP, kidId: "k-dev", location: "Edinburgh – Old Town Kids Club", date: "2026-08-23", time: "11:00", durationMins: 50, gbp: 18, kes: 2700, payStatus: "paid", payMethod: "paypal", notes: "" },
  { id: "b-009", type: "trial", status: "completed", skill: "ballet", coachSlug: "maya-laurent", parentId: U.jamesO, kidId: "k-lily", location: "Manchester – Northern Quarter Hub", date: "2026-08-16", time: "10:30", durationMins: 45, gbp: 10, kes: 1500, payStatus: "paid", payMethod: "paypal", notes: "First trial — converted" },
  { id: "b-010", type: "private", status: "cancelled", skill: "taekwondo", coachSlug: "daniel-mwangi", parentId: U.amina, kidId: "k-zuri", location: "Birmingham – Digbeth Kids Club", date: "2026-08-21", time: "16:00", durationMins: 45, gbp: 42, kes: 6300, payStatus: "refunded", payMethod: "mpesa", notes: "Family travel" },
  { id: "b-011", type: "private", status: "upcoming", skill: "skating", coachSlug: "james-chen", parentId: U.sarah, kidId: "k-noah", location: "London – Shoreditch Kids Club", date: "2026-09-03", time: "09:30", durationMins: 60, gbp: 65, kes: 9800, payStatus: "paid", payMethod: "paypal", notes: "Confidence on falls" },
  { id: "b-012", type: "group", status: "upcoming", skill: "chess", coachSlug: "sofia-mendes", parentId: U.sarah, kidId: "k-alex", location: "Manchester – Northern Quarter Hub", date: "2026-09-06", time: "11:00", durationMins: 90, gbp: 22, kes: 3300, payStatus: "pending", payMethod: "paypal", notes: "Girls' Sunday clinic — guest" },
  { id: "b-013", type: "school", status: "completed", skill: "ballet", coachSlug: "elena-rossi", parentId: U.school, kidId: "k-lily", schoolId: "sch-stmarys", location: "St Mary's Primary", date: "2026-08-20", time: "14:00", durationMins: 45, gbp: 0, kes: 0, payStatus: "paid", payMethod: "invoice", notes: "Year 2 movement" },
  { id: "b-014", type: "private", status: "no-show", skill: "chess", coachSlug: "marcus-reid", parentId: U.priyaP, kidId: "k-dev", location: "London – Brixton Sports Hub", date: "2026-08-18", time: "17:30", durationMins: 60, gbp: 55, kes: 8200, payStatus: "paid", payMethod: "paypal", notes: "No-show — charge kept" },
  { id: "b-015", type: "trial", status: "upcoming", skill: "taekwondo", coachSlug: "kenji-tanaka", parentId: U.amina, kidId: "k-zuri", location: "London – Brixton Sports Hub", date: "2026-09-05", time: "12:00", durationMins: 45, gbp: 10, kes: 1500, payStatus: "pending", payMethod: "mpesa", notes: "Brother observing" },
];

export const seedApplications: Application[] = [
  {
    id: "app-001",
    name: "Noah Adeyemi",
    email: "noah.adeyemi@gmail.com",
    phone: "+44 7700 900330",
    skill: "skating",
    years: 6,
    bio: "Ex-club speed skater. I want to coach FunSkill Saturday beginners in London and run SEND-friendly sessions.",
    certs: "UK Coaching Level 2, First Aid, DBS in progress",
    location: "London – Brixton Sports Hub",
    privateGbp: 46,
    privateKes: 6900,
    status: "pending",
    submitted: "2026-08-25",
  },
  {
    id: "app-002",
    name: "Hana Berg",
    email: "hana.berg@gmail.com",
    phone: "+44 7700 900331",
    skill: "ballet",
    years: 11,
    bio: "RAD registered. Looking to lead Pre-Primary at Edinburgh.",
    certs: "RAD RTS, DBS Checked",
    location: "Edinburgh – Old Town Kids Club",
    privateGbp: 48,
    privateKes: 7200,
    status: "pending",
    submitted: "2026-08-26",
  },
  {
    id: "app-003",
    name: "Omar Farouk",
    email: "omar.farouk@gmail.com",
    phone: "+254 722 110 882",
    skill: "chess",
    years: 4,
    bio: "FIDE 1980. Schools chess in Nairobi — happy to run UK holiday camps.",
    certs: "FIDE Instructor",
    location: "Birmingham – Digbeth Kids Club",
    privateGbp: 40,
    privateKes: 6000,
    status: "rejected",
    submitted: "2026-08-10",
    reviewedBy: "u-admin",
    reviewNote: "Need UK DBS and right-to-work before we can proceed. Re-apply when documents are ready.",
    reviewedAt: "2026-08-14",
  },
];

export const seedMessages: Message[] = [
  { id: "m-001", fromId: U.sarah, toId: U.marcus, subject: "Alex before Saturday", body: "Can we focus on the Sicilian lines you mentioned? He's been practising puzzles every night.", created: "2026-08-27T18:12:00", status: "unread" },
  { id: "m-002", fromId: U.marcus, toId: U.sarah, subject: "Re: Alex before Saturday", body: "Yes — I'll bring a mini repertoire sheet. Please have him arrive 5 minutes early.", created: "2026-08-27T19:01:00", status: "read" },
  { id: "m-003", fromId: U.admin, toId: U.james, subject: "September showcase", body: "Need a headcount of private students performing. Can you flag names by Friday?", created: "2026-08-26T09:40:00", status: "read" },
  { id: "m-004", fromId: U.jamesO, toId: U.elena, subject: "Lily shoes", body: "Do we buy canvas or leather for the trial-to-term conversion?", created: "2026-08-24T11:05:00", status: "read" },
  { id: "m-005", fromId: U.school, toId: U.admin, subject: "Autumn term chess block", body: "We'd like to add a second Year 5 group on Thursdays. Invoice to the usual cost centre.", created: "2026-08-28T08:15:00", status: "unread" },
];

export const seedPageViews: PageView[] = [
  { day: "2026-08-22", home: 420, coaches: 188, book: 64, programs: 110 },
  { day: "2026-08-23", home: 510, coaches: 240, book: 81, programs: 132 },
  { day: "2026-08-24", home: 390, coaches: 160, book: 52, programs: 98 },
  { day: "2026-08-25", home: 470, coaches: 210, book: 73, programs: 121 },
  { day: "2026-08-26", home: 560, coaches: 275, book: 96, programs: 148 },
  { day: "2026-08-27", home: 610, coaches: 301, book: 104, programs: 155 },
  { day: "2026-08-28", home: 480, coaches: 226, book: 88, programs: 140 },
];

export const seedCoachViews: CoachView[] = coaches.map((c, i) => ({
  slug: c.slug,
  views: 180 + i * 37 + (c.featured ? 220 : 0),
  unique: 90 + i * 18 + (c.featured ? 110 : 0),
  bookClicks: 12 + i * 3 + (c.featured ? 24 : 0),
}));

export const seedInvoices: Invoice[] = [
  { id: "INV-0826", schoolId: "sch-stmarys", term: "Summer 2026", amountGbp: 4200, status: "paid", due: "2026-07-01" },
  { id: "INV-1126", schoolId: "sch-stmarys", term: "Autumn 2026", amountGbp: 4200, status: "pending", due: "2026-09-15" },
  { id: "INV-0826-oak", schoolId: "sch-oak", term: "Summer 2026", amountGbp: 2800, status: "paid", due: "2026-07-01" },
  { id: "INV-1126-oak", schoolId: "sch-oak", term: "Autumn 2026", amountGbp: 2800, status: "pending", due: "2026-09-12" },
  { id: "INV-TRIAL-riv", schoolId: "sch-river", term: "Trial block", amountGbp: 480, status: "pending", due: "2026-09-01" },
];

export function createSeedState(): PortalState {
  return {
    users: seedUsers,
    kids: seedKids,
    bookings: seedBookings,
    applications: seedApplications,
    messages: seedMessages,
    pageViews: seedPageViews,
    coachViews: seedCoachViews,
    schools: seedSchools,
    invoices: seedInvoices,
    otp: null,
    sessionUserId: null,
    pricing: {},
  };
}
