import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createSeedState, DEMO_PASSWORD } from "./seed";
import type { Application, ApplicationStatus, Booking, BookingStatus, Kid, Message, PortalState, Role, SkillId, User } from "./types";

const KEY = "funskill.portal.v1";

function load(): PortalState {
  const seed = createSeedState();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PortalState;
      if (parsed?.users?.length) {
        return { ...seed, ...parsed, pricing: parsed.pricing ?? {}, invoices: parsed.invoices?.length ? parsed.invoices : seed.invoices };
      }
    }
  } catch {
    /* ignore */
  }
  return seed;
}

function persist(state: PortalState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function genOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

type PortalApi = {
  state: PortalState;
  user: User | null;
  loginStart: (email: string, password: string) => { ok: true; channel: "sms" | "email"; masked: string } | { ok: false; error: string };
  verifyOtp: (code: string) => { ok: true; role: Role } | { ok: false; error: string };
  resendOtp: () => { ok: true; codeShown: string } | { ok: false; error: string };
  logout: () => void;
  registerParent: (input: { name: string; email: string; phone: string; password: string; kidName: string; kidAge: number; skill: SkillId }) => { ok: true } | { ok: false; error: string };
  applyCoach: (input: Omit<Application, "id" | "status" | "submitted">) => { ok: true; id: string } | { ok: false; error: string };
  reviewApplication: (id: string, status: Extract<ApplicationStatus, "approved" | "rejected">, note: string) => void;
  updatePricing: (slug: string, privateGbp: number, privateKes: number) => void;
  setBookingStatus: (id: string, status: BookingStatus) => void;
  addNote: (bookingId: string, notes: string) => void;
  sendMessage: (toId: string, subject: string, body: string) => void;
  markMessageRead: (id: string) => void;
  addKid: (kid: Omit<Kid, "id">) => void;
  createBooking: (input: Omit<Booking, "id">) => string;
  payBooking: (id: string) => void;
  payInvoice: (id: string) => void;
  trackPage: (key: "home" | "coaches" | "book" | "programs") => void;
  trackCoachView: (slug: string) => void;
  trackBookClick: (slug: string) => void;
  resetDemo: () => void;
  homePath: (role: Role) => string;
};

const Ctx = createContext<PortalApi | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(() => load());

  function commit(next: PortalState) {
    persist(next);
    flushSync(() => setState(next));
  }

  const raw = state.users.find((u) => u.id === state.sessionUserId) ?? null;
  const user = raw?.status === "active" ? raw : null;

  const api: PortalApi = useMemo(() => ({
    state,
    user,
    homePath: (role) => `/portal/${role}`,
    loginStart: (email, password) => {
      const em = email.trim().toLowerCase();
      const pw = password;
      if (!em || !pw) return { ok: false, error: "Enter both email and password." };
      const found = state.users.find((u) => u.email.toLowerCase() === em);
      if (!found || found.password !== pw) return { ok: false, error: "Email or password is wrong." };
      if (found.status === "pending") return { ok: false, error: "This coach account is waiting for admin approval." };
      if (found.status === "rejected") return { ok: false, error: "This application was declined. Check your email for the note." };
      if (found.status === "suspended") return { ok: false, error: "Account suspended. Contact FunSkill admin." };
      if (found.status !== "active") return { ok: false, error: "This account cannot sign in." };
      const code = genOtp();
      const channel: "sms" | "email" = found.phone.startsWith("+254") ? "sms" : "email";
      commit({
        ...state,
        otp: { email: found.email, code, channel, created: Date.now(), expires: Date.now() + 5 * 60 * 1000 },
        sessionUserId: null,
      });
      return { ok: true, channel, masked: channel === "sms" ? found.phone.replace(/.(?=.{4})/g, "•") : found.email.replace(/(.{2}).*(@.*)/, "$1•••$2") };
    },
    verifyOtp: (code) => {
      const otp = state.otp;
      if (!otp) return { ok: false, error: "No code was sent. Start login again." };
      if (Date.now() > otp.expires) return { ok: false, error: "Code expired. Request a new one." };
      const typed = code.replace(/\D/g, "");
      if (typed.length !== 6) return { ok: false, error: "Enter the full 6-digit code." };
      if (typed !== otp.code) return { ok: false, error: "That code does not match." };
      const found = state.users.find((u) => u.email === otp.email);
      if (!found || found.status !== "active") return { ok: false, error: "This account cannot sign in." };
      commit({ ...state, otp: null, sessionUserId: found.id });
      return { ok: true, role: found.role };
    },
    resendOtp: () => {
      if (!state.otp) return { ok: false, error: "Start login first." };
      const code = genOtp();
      commit({ ...state, otp: { ...state.otp, code, created: Date.now(), expires: Date.now() + 5 * 60 * 1000 } });
      return { ok: true, codeShown: code };
    },
    logout: () => commit({ ...state, sessionUserId: null, otp: null }),
    registerParent: (input) => {
      if (state.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
        return { ok: false, error: "That email is already registered." };
      }
      const parentId = id("u");
      const kidId = id("k");
      const parent: User = {
        id: parentId,
        role: "parent",
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: input.password,
        status: "active",
        avatar: input.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
        joined: new Date().toISOString().slice(0, 10),
      };
      const kid: Kid = {
        id: kidId,
        parentId,
        name: input.kidName,
        age: input.kidAge,
        skill: input.skill,
        level: "New",
        notes: "Registered via parent portal",
        medical: "Not provided",
        nextGoal: "First trial",
      };
      commit({ ...state, users: [...state.users, parent], kids: [...state.kids, kid] });
      return { ok: true };
    },
    applyCoach: (input) => {
      if (state.users.some((u) => u.email.toLowerCase() === input.email.toLowerCase()) || state.applications.some((a) => a.email.toLowerCase() === input.email.toLowerCase() && a.status === "pending")) {
        return { ok: false, error: "An account or pending application already uses this email." };
      }
      const app: Application = { ...input, id: id("app"), status: "pending", submitted: new Date().toISOString().slice(0, 10) };
      const pending: User = {
        id: id("u"),
        role: "coach",
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: DEMO_PASSWORD,
        status: "pending",
        avatar: input.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
        joined: new Date().toISOString().slice(0, 10),
      };
      commit({ ...state, applications: [app, ...state.applications], users: [...state.users, pending] });
      return { ok: true, id: app.id };
    },
    reviewApplication: (appId, status, note) => {
      const app = state.applications.find((a) => a.id === appId);
      if (!app || !user) return;
      const applications = state.applications.map((a) =>
        a.id === appId
          ? { ...a, status, reviewNote: note, reviewedBy: user.id, reviewedAt: new Date().toISOString().slice(0, 10) }
          : a,
      );
      const slug = app.name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
      const exists = state.users.some((u) => u.email.toLowerCase() === app.email.toLowerCase());
      let users = state.users.map((u) => {
        if (u.email.toLowerCase() !== app.email.toLowerCase()) return u;
        return {
          ...u,
          status: status === "approved" ? "active" as const : "rejected" as const,
          coachSlug: status === "approved" ? slug : u.coachSlug,
        };
      });
      if (status === "approved" && !exists) {
        users = [
          ...users,
          {
            id: id("u"),
            role: "coach",
            name: app.name,
            email: app.email,
            phone: app.phone,
            password: DEMO_PASSWORD,
            status: "active",
            avatar: app.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
            coachSlug: slug,
            joined: new Date().toISOString().slice(0, 10),
          },
        ];
      }
      commit({ ...state, applications, users });
    },
    updatePricing: (slug, privateGbp, privateKes) => {
      commit({ ...state, pricing: { ...state.pricing, [slug]: { privateGbp, privateKes } } });
    },
    setBookingStatus: (bookingId, status) => {
      commit({
        ...state,
        bookings: state.bookings.map((b) => (b.id === bookingId ? { ...b, status, payStatus: status === "cancelled" ? "refunded" : b.payStatus } : b)),
      });
    },
    addNote: (bookingId, notes) => {
      commit({ ...state, bookings: state.bookings.map((b) => (b.id === bookingId ? { ...b, notes } : b)) });
    },
    sendMessage: (toId, subject, body) => {
      if (!user) return;
      const msg: Message = {
        id: id("m"),
        fromId: user.id,
        toId,
        subject,
        body,
        created: new Date().toISOString(),
        status: "unread",
      };
      commit({ ...state, messages: [msg, ...state.messages] });
    },
    markMessageRead: (msgId) => {
      commit({ ...state, messages: state.messages.map((m) => (m.id === msgId ? { ...m, status: "read" } : m)) });
    },
    addKid: (kid) => {
      commit({ ...state, kids: [...state.kids, { ...kid, id: id("k") }] });
    },
    createBooking: (input) => {
      const booking: Booking = { ...input, id: id("b") };
      commit({ ...state, bookings: [booking, ...state.bookings] });
      return booking.id;
    },
    payBooking: (bookingId) => {
      commit({
        ...state,
        bookings: state.bookings.map((b) => (b.id === bookingId ? { ...b, payStatus: "paid" } : b)),
      });
    },
    payInvoice: (invoiceId) => {
      commit({
        ...state,
        invoices: state.invoices.map((inv) => (inv.id === invoiceId ? { ...inv, status: "paid" } : inv)),
      });
    },
    trackPage: (key) => {
      const day = new Date().toISOString().slice(0, 10);
      const pageViews = [...state.pageViews];
      const i = pageViews.findIndex((d) => d.day === day);
      if (i >= 0) pageViews[i] = { ...pageViews[i], [key]: pageViews[i][key] + 1 };
      else pageViews.push({ day, home: 0, coaches: 0, book: 0, programs: 0, [key]: 1 });
      commit({ ...state, pageViews });
    },
    trackCoachView: (slug) => {
      const coachViews = state.coachViews.some((v) => v.slug === slug)
        ? state.coachViews.map((v) => (v.slug === slug ? { ...v, views: v.views + 1, unique: v.unique + 1 } : v))
        : [...state.coachViews, { slug, views: 1, unique: 1, bookClicks: 0 }];
      commit({ ...state, coachViews });
    },
    trackBookClick: (slug) => {
      const coachViews = state.coachViews.map((v) => (v.slug === slug ? { ...v, bookClicks: v.bookClicks + 1 } : v));
      commit({ ...state, coachViews });
    },
    resetDemo: () => commit(createSeedState()),
  }), [state, user]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function usePortal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePortal must be inside PortalProvider");
  return ctx;
}

export function bookingsForCoach(bookings: Booking[], slug?: string) {
  return slug ? bookings.filter((b) => b.coachSlug === slug) : [];
}

export function kidsForParent(kids: Kid[], parentId: string) {
  return kids.filter((k) => k.parentId === parentId);
}

export function nameOf(users: User[], id: string) {
  return users.find((u) => u.id === id)?.name ?? "Unknown";
}
