export type Role = "admin" | "coach" | "parent" | "school";

export type UserStatus = "active" | "pending" | "rejected" | "suspended";

export type SkillId = "chess" | "skating" | "ballet" | "taekwondo";

export type BookingType = "trial" | "private" | "group" | "school";
export type BookingStatus = "upcoming" | "completed" | "cancelled" | "no-show";
export type PayStatus = "paid" | "pending" | "refunded" | "failed";
export type ApplicationStatus = "pending" | "approved" | "rejected";
export type MessageStatus = "unread" | "read";

export type User = {
  id: string;
  role: Role;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: UserStatus;
  avatar: string;
  coachSlug?: string;
  schoolId?: string;
  joined: string;
};

export type Kid = {
  id: string;
  parentId: string;
  name: string;
  age: number;
  skill: SkillId;
  level: string;
  notes: string;
  medical: string;
  nextGoal: string;
};

export type Booking = {
  id: string;
  type: BookingType;
  status: BookingStatus;
  skill: SkillId;
  coachSlug: string;
  parentId: string;
  kidId: string;
  schoolId?: string;
  location: string;
  date: string;
  time: string;
  durationMins: number;
  gbp: number;
  kes: number;
  payStatus: PayStatus;
  payMethod: "mpesa" | "paypal" | "invoice";
  notes: string;
};

export type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  skill: SkillId;
  years: number;
  bio: string;
  certs: string;
  location: string;
  privateGbp: number;
  privateKes: number;
  status: ApplicationStatus;
  submitted: string;
  reviewedBy?: string;
  reviewNote?: string;
  reviewedAt?: string;
};

export type Message = {
  id: string;
  fromId: string;
  toId: string;
  subject: string;
  body: string;
  created: string;
  status: MessageStatus;
};

export type PageView = {
  day: string;
  home: number;
  coaches: number;
  book: number;
  programs: number;
};

export type CoachView = {
  slug: string;
  views: number;
  unique: number;
  bookClicks: number;
};

export type SchoolOrg = {
  id: string;
  name: string;
  contact: string;
  email: string;
  pupils: number;
  programmes: SkillId[];
  termFeeGbp: number;
  status: "active" | "trial";
};

export type Invoice = {
  id: string;
  schoolId: string;
  term: string;
  amountGbp: number;
  status: "paid" | "pending";
  due: string;
};

export type OtpChallenge = {
  email: string;
  code: string;
  channel: "sms" | "email";
  created: number;
  expires: number;
};

export type PortalState = {
  users: User[];
  kids: Kid[];
  bookings: Booking[];
  applications: Application[];
  messages: Message[];
  pageViews: PageView[];
  coachViews: CoachView[];
  schools: SchoolOrg[];
  invoices: Invoice[];
  otp: OtpChallenge | null;
  sessionUserId: string | null;
  pricing: Record<string, { privateGbp: number; privateKes: number }>;
};
