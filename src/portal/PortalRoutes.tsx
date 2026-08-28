import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Otp from "./Otp";
import Register from "./Register";
import CoachApply from "./CoachApply";
import { AdminOverview, AdminAnalytics, AdminCoaches, AdminApplications, AdminBookings, AdminClients, AdminSchools, AdminMessages } from "./admin";
import { CoachHome, CoachSessions, CoachStudents, CoachEarnings, CoachMessages } from "./coach";
import { ParentHome, ParentKids, ParentBookings, ParentPayments, ParentMessages } from "./parent";
import { SchoolHome, SchoolProgrammes, SchoolPupils, SchoolInvoices, SchoolMessages } from "./school";

export default function PortalRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="otp" element={<Otp />} />
      <Route path="register" element={<Register />} />
      <Route path="apply" element={<CoachApply />} />
      <Route path="admin" element={<AdminOverview />} />
      <Route path="admin/analytics" element={<AdminAnalytics />} />
      <Route path="admin/coaches" element={<AdminCoaches />} />
      <Route path="admin/applications" element={<AdminApplications />} />
      <Route path="admin/bookings" element={<AdminBookings />} />
      <Route path="admin/clients" element={<AdminClients />} />
      <Route path="admin/schools" element={<AdminSchools />} />
      <Route path="admin/messages" element={<AdminMessages />} />
      <Route path="coach" element={<CoachHome />} />
      <Route path="coach/sessions" element={<CoachSessions />} />
      <Route path="coach/students" element={<CoachStudents />} />
      <Route path="coach/earnings" element={<CoachEarnings />} />
      <Route path="coach/messages" element={<CoachMessages />} />
      <Route path="parent" element={<ParentHome />} />
      <Route path="parent/kids" element={<ParentKids />} />
      <Route path="parent/bookings" element={<ParentBookings />} />
      <Route path="parent/payments" element={<ParentPayments />} />
      <Route path="parent/messages" element={<ParentMessages />} />
      <Route path="school" element={<SchoolHome />} />
      <Route path="school/programmes" element={<SchoolProgrammes />} />
      <Route path="school/pupils" element={<SchoolPupils />} />
      <Route path="school/invoices" element={<SchoolInvoices />} />
      <Route path="school/messages" element={<SchoolMessages />} />
      <Route path="*" element={<Navigate to="/portal/login" replace />} />
    </Routes>
  );
}
