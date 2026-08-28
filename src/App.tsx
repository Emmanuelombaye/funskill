import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Chess from "./pages/Chess";
import Skating from "./pages/Skating";
import Ballet from "./pages/Ballet";
import Taekwondo from "./pages/Taekwondo";
import Schools from "./pages/Schools";
import About from "./pages/About";
import Coaches from "./pages/Coaches";
import CoachProfile from "./pages/CoachProfile";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import BookTrial from "./pages/BookTrial";
import { PortalProvider } from "./portal/store";
import PortalRoutes from "./portal/PortalRoutes";

function PublicShell() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <PortalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/chess" element={<Chess />} />
            <Route path="/skating" element={<Skating />} />
            <Route path="/ballet" element={<Ballet />} />
            <Route path="/taekwondo" element={<Taekwondo />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/about" element={<About />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/coaches/:slug" element={<CoachProfile />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<BookTrial />} />
          </Route>
          <Route path="/portal/*" element={<PortalRoutes />} />
        </Routes>
      </BrowserRouter>
    </PortalProvider>
  );
}
